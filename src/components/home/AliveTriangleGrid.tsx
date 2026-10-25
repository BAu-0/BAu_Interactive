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
}

interface Pulse {
  id: number;
  startTime: number;
  speed: number;
  strength: number;
  halfWidth: number;
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
    let lastPulseTime = 0;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Inicializar geometría de la malla triangular equilátera
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
      maxDist = Math.hypot(centerX, centerY) + 100;

      // Tamaño de lado según escala de pantalla
      const s = width < 640 ? 54 : width < 1024 ? 68 : 80;
      const h = s * (Math.sqrt(3) / 2); // Altura de triángulo equilátero

      // Alinear vértice con el centro exacto del logo
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

          // 1. Barra horizontal
          addSegment(x, y, x + s, y);

          // 2. Barra diagonal hacia abajo-izquierda
          addSegment(x, y, x - s / 2, y + h);

          // 3. Barra diagonal hacia abajo-derecha
          addSegment(x, y, x + s / 2, y + h);
        }
      }
    };

    const addSegment = (x1: number, y1: number, x2: number, y2: number) => {
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
      });
    };

    // Disparar onda concéntrica estilo gota de agua
    const triggerRipple = () => {
      pulseCounter += 1;
      pulses.push({
        id: pulseCounter,
        startTime: performance.now(),
        speed: 250, // Velocidad serena y pausada (px/s)
        strength: 1.0,
        halfWidth: 150, // Ancho de onda amplio para entrada y salida suave
      });
    };

    // Bucle principal de animación a 60 FPS
    const render = (now: number) => {
      if (!isVisible) return;

      // Intervalo de latidos pausados (cada ~3.6 segundos)
      if (!prefersReducedMotion) {
        if (lastPulseTime === 0 || now - lastPulseTime >= 3600) {
          lastPulseTime = now;
          triggerRipple();
        }
      }

      // Actualizar ondas activas y descartar las que ya salieron de pantalla
      pulses = pulses.filter((pulse) => {
        const elapsed = (now - pulse.startTime) / 1000;
        const currentRadius = elapsed * pulse.speed;
        return currentRadius - pulse.halfWidth < maxDist;
      });

      // Limpiar lienzo
      ctx.clearRect(0, 0, width, height);

      // 1. DIBUJAR MALLA BASE (Siempre visible pero tenue y elegante)
      ctx.beginPath();
      for (let i = 0; i < segments.length; i++) {
        const seg = segments[i];
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x2, seg.y2);
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.026)';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // 2. EFECTO GOTA DE AGUA (Encendido y apagado gradual, sutil y de fondo)
      if (!prefersReducedMotion && pulses.length > 0) {
        // Almacenar intensidad combinada de cada barra calculada por onda
        const litSegments: { seg: Segment; intensity: number }[] = [];

        for (let i = 0; i < segments.length; i++) {
          const seg = segments[i];
          let maxIntensity = 0;

          for (let p = 0; p < pulses.length; p++) {
            const pulse = pulses[p];
            const elapsed = (now - pulse.startTime) / 1000;
            const currentRadius = elapsed * pulse.speed;
            const diff = Math.abs(seg.dist - currentRadius);

            // Si la barra está dentro del ancho de la onda
            if (diff < pulse.halfWidth) {
              // Curva suave coseno: 0 -> sube suave a 1 -> baja suave a 0 (campana de onda pura)
              const u = diff / pulse.halfWidth;
              const waveShape = 0.5 * (1 + Math.cos(u * Math.PI));

              // Atenuación natural de la onda con la distancia recorrida
              const distanceAttenuation = Math.max(0.35, 1 - (seg.dist / maxDist) * 0.4);

              const intensity = waveShape * pulse.strength * distanceAttenuation;
              if (intensity > maxIntensity) {
                maxIntensity = intensity;
              }
            }
          }

          if (maxIntensity > 0.01) {
            litSegments.push({ seg, intensity: maxIntensity });
          }
        }

        // Capa de resplandor morado suave (halo sutil)
        ctx.beginPath();
        for (let i = 0; i < litSegments.length; i++) {
          const { seg } = litSegments[i];
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x2, seg.y2);
        }
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.12)';
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Núcleo blanco leve y gradual (destello suave que se enciende y desvanece de fondo)
        for (let i = 0; i < litSegments.length; i++) {
          const { seg, intensity } = litSegments[i];
          ctx.beginPath();
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x2, seg.y2);

          // Intensidad controlada: destello blanco suave (máx ~0.26 de opacidad)
          const whiteAlpha = Math.min(intensity * 0.26, 0.26);
          ctx.strokeStyle = `rgba(255, 255, 255, ${whiteAlpha})`;
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      initGrid();
    };

    window.addEventListener('resize', handleResize);
    initGrid();
    animationFrameId = requestAnimationFrame(render);

    // Pausar animación cuando la sección quede fuera de pantalla
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          lastPulseTime = performance.now();
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
