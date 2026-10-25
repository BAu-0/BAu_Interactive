'use client';

import React, { useEffect, useRef } from 'react';

interface Segment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  midX: number;
  midY: number;
  dist: number;
  intensity: number;
  lastPulseId: number;
}

interface Pulse {
  id: number;
  startTime: number;
  speed: number;
  strength: number;
}

export function AliveTriangleGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;
    let maxDist = 0;

    let segments: Segment[] = [];
    let pulses: Pulse[] = [];
    let pulseCounter = 0;
    let lastBeatTime = 0;
    let beatStep = 0; // 0: primer latido fuerte, 1: segundo latido eco, 2: espera

    // Soporte para preferencias de movimiento reducido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Inicializar geometría de la malla triangular (Alive 2007 pyramid style)
    const initGrid = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      centerX = width / 2;
      centerY = height / 2;
      maxDist = Math.hypot(centerX, centerY) + 80;

      // Tamaño de lado según viewport (responsive)
      const s = width < 640 ? 52 : width < 1024 ? 64 : 76;
      const h = s * (Math.sqrt(3) / 2); // Altura de triángulo equilátero

      // Alinear para que un vértice coincida exactamente con el centro (origen de latidos)
      const x0 = (centerX % s) - s * 2;
      const y0 = (centerY % h) - h * 2;

      const rows = Math.ceil(height / h) + 4;
      const cols = Math.ceil(width / s) + 4;

      segments = [];

      for (let r = -2; r <= rows; r++) {
        const y = y0 + r * h;
        const rowShift = ((r % 2 + 2) % 2) * (s / 2);

        for (let c = -2; c <= cols; c++) {
          const x = x0 + c * s + rowShift;

          // 1. Barra horizontal hacia la derecha
          const xH = x + s;
          const yH = y;
          addSegment(x, y, xH, yH);

          // 2. Barra diagonal hacia abajo-izquierda
          const xDL = x - s / 2;
          const yDL = y + h;
          addSegment(x, y, xDL, yDL);

          // 3. Barra diagonal hacia abajo-derecha
          const xDR = x + s / 2;
          const yDR = y + h;
          addSegment(x, y, xDR, yDR);
        }
      }
    };

    const addSegment = (x1: number, y1: number, x2: number, y2: number) => {
      // Filtrar si el segmento está completamente fuera del área visible extendida
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);
      if (maxX < -60 || minX > width + 60 || maxY < -60 || minY > height + 60) return;

      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      const dist = Math.hypot(midX - centerX, midY - centerY);

      segments.push({
        x1,
        y1,
        x2,
        y2,
        midX,
        midY,
        dist,
        intensity: 0,
        lastPulseId: -1,
      });
    };

    // Agregar un pulso expansivo desde el centro hacia afuera
    const triggerPulse = (strength: number, speed: number) => {
      pulseCounter += 1;
      pulses.push({
        id: pulseCounter,
        startTime: performance.now(),
        speed,
        strength,
      });
    };

    let lastFrameTime = performance.now();

    // Bucle principal de animación a 60 FPS
    const render = (now: number) => {
      if (!isVisible) return;

      const dt = Math.min((now - lastFrameTime) / 1000, 0.1);
      lastFrameTime = now;

      // Gestor de latidos pausados (ritmo biológico: tum... tum... pausa)
      if (!prefersReducedMotion) {
        if (lastBeatTime === 0) {
          lastBeatTime = now;
          triggerPulse(1.0, 480); // Primer latido fuerte
          beatStep = 1;
        } else if (beatStep === 1 && now - lastBeatTime >= 340) {
          triggerPulse(0.65, 540); // Segundo latido de eco
          beatStep = 2;
        } else if (beatStep === 2 && now - lastBeatTime >= 2800) {
          // Reiniciar ciclo de latido pausado tras la pausa
          lastBeatTime = now;
          triggerPulse(1.0, 480);
          beatStep = 1;
        }
      }

      // Propagar frentes de onda y activar barras (encendido digital progresivo)
      pulses = pulses.filter((pulse) => {
        const elapsed = (now - pulse.startTime) / 1000;
        const waveRadius = elapsed * pulse.speed;

        for (let i = 0; i < segments.length; i++) {
          const seg = segments[i];
          if (seg.lastPulseId !== pulse.id && waveRadius >= seg.dist) {
            // Encendido digital: enciende instantáneamente al cruzar la onda
            seg.intensity = Math.max(seg.intensity, pulse.strength);
            seg.lastPulseId = pulse.id;
          }
        }

        // Descartar pulso cuando ha superado el radio visible máximo
        return waveRadius < maxDist;
      });

      // Decaimiento exponencial de la intensidad de cada barra
      const decay = Math.pow(0.18, dt);
      for (let i = 0; i < segments.length; i++) {
        if (segments[i].intensity > 0.005) {
          segments[i].intensity *= decay;
        } else {
          segments[i].intensity = 0;
        }
      }

      // Dibujar en Canvas
      ctx.clearRect(0, 0, width, height);

      // 1. Trazado de toda la malla en estado ambiente (muy sutil y de un solo golpe)
      ctx.beginPath();
      for (let i = 0; i < segments.length; i++) {
        const seg = segments[i];
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x2, seg.y2);
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 2. Trazado de las barras iluminadas por el latido (destello blanco Alive 2007)
      if (!prefersReducedMotion) {
        // Capa de halo morado de las barras encendidas
        ctx.beginPath();
        for (let i = 0; i < segments.length; i++) {
          const seg = segments[i];
          if (seg.intensity > 0.04) {
            ctx.moveTo(seg.x1, seg.y1);
            ctx.lineTo(seg.x2, seg.y2);
          }
        }
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.45)';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Núcleo blanco nítido tipo tubo LED / neón
        for (let i = 0; i < segments.length; i++) {
          const seg = segments[i];
          if (seg.intensity > 0.02) {
            ctx.beginPath();
            ctx.moveTo(seg.x1, seg.y1);
            ctx.lineTo(seg.x2, seg.y2);
            // Destello blanco leve y progresivo
            ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(seg.intensity * 0.95, 0.95)})`;
            ctx.lineWidth = 1.4;
            ctx.stroke();
          }
        }

        // Nodos en los vértices del centro para acentuar el origen
        const centerSegGlow = segments.find((s) => s.dist < 60)?.intensity || 0;
        if (centerSegGlow > 0.05) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${centerSegGlow})`;
          ctx.shadowColor = '#a855f7';
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Configurar observadores de rendimiento y redimensionamiento
    const handleResize = () => {
      initGrid();
    };

    window.addEventListener('resize', handleResize);
    initGrid();
    animationFrameId = requestAnimationFrame(render);

    // Pausar animación cuando la sección no esté a la vista
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          lastFrameTime = performance.now();
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
