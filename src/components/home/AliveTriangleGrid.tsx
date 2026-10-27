'use client';

import React, { useEffect, useRef } from 'react';

interface Vertex {
  x: number;
  y: number;
  dist: number;
  seed: number;
}

interface Segment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  midX: number;
  midY: number;
  dist: number;
  seed: number;
}

interface Pulse {
  id: number;
  startTime: number;
  speed: number;
  strength: number;
  frontWidth: number;
  tailWidth: number;
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
    let vertices: Vertex[] = [];
    let pulses: Pulse[] = [];
    let pulseCounter = 0;
    let lastBeatTime = 0;
    let beatStep = 0; // 0: latido inicial, 1: eco secundario, 2: pausa de reposo
    let isBaseDrawn = false;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Generador pseudo-aleatorio determinista para sutiles variaciones de circuito
    const pseudoRandom = (x: number, y: number) => {
      const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
      return n - Math.floor(n);
    };

    // Inicializar geometría de la malla triangular holográfica (Estilo Auntie DOT)
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
      maxDist = Math.hypot(centerX, centerY) + 120;

      // Escala geométrica equilibrada para viewport
      const s = width < 640 ? 54 : width < 1024 ? 68 : 80;
      const h = s * (Math.sqrt(3) / 2); // Altura de triángulo equilátero

      // Alinear vértice central directamente detrás del isotipo
      const x0 = (centerX % s) - s * 2;
      const y0 = (centerY % h) - h * 2;

      const rows = Math.ceil(height / h) + 4;
      const cols = Math.ceil(width / s) + 4;

      segments = [];
      const vertexMap = new Map<string, Vertex>();

      const registerVertex = (x: number, y: number) => {
        const key = `${Math.round(x)},${Math.round(y)}`;
        if (!vertexMap.has(key)) {
          const dist = Math.hypot(x - centerX, y - centerY);
          vertexMap.set(key, {
            x,
            y,
            dist,
            seed: pseudoRandom(x, y),
          });
        }
      };

      for (let r = -2; r <= rows; r++) {
        const y = y0 + r * h;
        const rowShift = ((r % 2 + 2) % 2) * (s / 2);

        for (let c = -2; c <= cols; c++) {
          const x = x0 + c * s + rowShift;

          registerVertex(x, y);

          // 1. Barra horizontal hacia la derecha
          addSegment(x, y, x + s, y);
          registerVertex(x + s, y);

          // 2. Barra diagonal hacia abajo-izquierda
          addSegment(x, y, x - s / 2, y + h);
          registerVertex(x - s / 2, y + h);

          // 3. Barra diagonal hacia abajo-derecha
          addSegment(x, y, x + s / 2, y + h);
          registerVertex(x + s / 2, y + h);
        }
      }

      vertices = Array.from(vertexMap.values());
      isBaseDrawn = false;
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
        seed: pseudoRandom(midX, midY),
      });
    };

    // Lanzar pulso de onda con envolvente holográfica estilo Auntie DOT
    const triggerPulse = (strength: number, speed: number) => {
      isBaseDrawn = false;
      pulseCounter += 1;
      pulses.push({
        id: pulseCounter,
        startTime: performance.now(),
        speed,
        strength,
        frontWidth: 110, // Entrada gradual suave (ataque progresivo)
        tailWidth: 200,  // Salida gradual extendida (desvanecimiento fósforo/holograma)
      });
    };

    // Curva de envolvente Auntie DOT: entrada suave, cumbre luminosa y desvanecimiento progresivo
    const calculateWaveFactor = (dist: number, currentRadius: number, frontWidth: number, tailWidth: number) => {
      const diff = dist - currentRadius;
      if (diff > 0) {
        // Frente de onda aproximándose: subida gradual suave (Smoothstep)
        if (diff < frontWidth) {
          const u = 1 - diff / frontWidth;
          return u * u * (3 - 2 * u);
        }
        return 0;
      } else {
        // Cola de onda alejándose: caída gradual orgánica (estilo fósforo holográfico)
        const behind = -diff;
        if (behind < tailWidth) {
          const v = 1 - behind / tailWidth;
          return Math.pow(v, 1.85);
        }
        return 0;
      }
    };

    // Bucle de renderizado continuo a 60 FPS
    const render = (now: number) => {
      if (!isVisible) return;

      // Ritmo de latidos pausados (Latido principal -> Eco secundario -> Pausa de reposo)
      if (!prefersReducedMotion) {
        if (lastBeatTime === 0) {
          lastBeatTime = now;
          triggerPulse(1.0, 240); // Latido base sereno
          beatStep = 1;
        } else if (beatStep === 1 && now - lastBeatTime >= 420) {
          triggerPulse(0.58, 270); // Eco armónico sutil
          beatStep = 2;
        } else if (beatStep === 2 && now - lastBeatTime >= 3500) {
          // Pausa amplia antes del siguiente ciclo
          lastBeatTime = now;
          triggerPulse(1.0, 240);
          beatStep = 1;
        }
      }

      // Filtrar pulsos que hayan recorrido todo el radio visible
      pulses = pulses.filter((pulse) => {
        const elapsed = (now - pulse.startTime) / 1000;
        const currentRadius = elapsed * pulse.speed;
        return currentRadius - pulse.tailWidth < maxDist;
      });

      // Si no hay pulsos activos y la malla base ya está dibujada de forma estática,
      // evitamos re-dibujar en cada fotograma para liberar el hilo principal del navegador.
      if (pulses.length === 0 && isBaseDrawn) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Limpiar lienzo
      ctx.clearRect(0, 0, width, height);

      // 1. MALLA BASE DORMIDA (Siempre presente, tenue, nítida y no invasiva)
      ctx.beginPath();
      for (let i = 0; i < segments.length; i++) {
        const seg = segments[i];
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x2, seg.y2);
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.024)';
      ctx.lineWidth = 0.75;
      ctx.stroke();

      // Puntos nodales base muy sutiles en las intersecciones (los "Dots" de la matriz)
      ctx.beginPath();
      for (let i = 0; i < vertices.length; i++) {
        const v = vertices[i];
        ctx.moveTo(v.x + 0.7, v.y);
        ctx.arc(v.x, v.y, 0.7, 0, Math.PI * 2);
      }
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.fill();

      if (pulses.length === 0) {
        isBaseDrawn = true;
      }

      // 2. EFECTO AUNTIE DOT (Encendido y apagado gradual de fondo)
      if (!prefersReducedMotion && pulses.length > 0) {
        // A) Calcular iluminación progresiva de las barras
        const litSegments: { seg: Segment; intensity: number }[] = [];

        for (let i = 0; i < segments.length; i++) {
          const seg = segments[i];
          let maxIntensity = 0;

          for (let p = 0; p < pulses.length; p++) {
            const pulse = pulses[p];
            const elapsed = (now - pulse.startTime) / 1000;
            const currentRadius = elapsed * pulse.speed;

            const factor = calculateWaveFactor(seg.dist, currentRadius, pulse.frontWidth, pulse.tailWidth);
            if (factor > 0) {
              const distanceAttenuation = Math.max(0.35, 1 - (seg.dist / maxDist) * 0.45);
              // Sutil variación analógica de circuito
              const circuitVariance = 0.9 + 0.2 * seg.seed;
              const intensity = factor * pulse.strength * distanceAttenuation * circuitVariance;

              if (intensity > maxIntensity) {
                maxIntensity = intensity;
              }
            }
          }

          if (maxIntensity > 0.01) {
            litSegments.push({ seg, intensity: maxIntensity });
          }
        }

        // Trazado de halo morado tenue de las barras activas
        ctx.beginPath();
        for (let i = 0; i < litSegments.length; i++) {
          const { seg } = litSegments[i];
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x2, seg.y2);
        }
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.14)';
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Trazado del núcleo blanco leve y gradual (destello suave que no compite con el logo)
        for (let i = 0; i < litSegments.length; i++) {
          const { seg, intensity } = litSegments[i];
          ctx.beginPath();
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x2, seg.y2);

          // Intensidad controlada: blanco suave y translúcido (máx ~0.28)
          const whiteAlpha = Math.min(intensity * 0.28, 0.28);
          ctx.strokeStyle = `rgba(255, 255, 255, ${whiteAlpha})`;
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }

        // B) Puntos nodales reactivos en las intersecciones (Signatura visual Auntie DOT)
        for (let i = 0; i < vertices.length; i++) {
          const v = vertices[i];
          let maxVIntensity = 0;

          for (let p = 0; p < pulses.length; p++) {
            const pulse = pulses[p];
            const elapsed = (now - pulse.startTime) / 1000;
            const currentRadius = elapsed * pulse.speed;

            const factor = calculateWaveFactor(v.dist, currentRadius, pulse.frontWidth, pulse.tailWidth);
            if (factor > 0) {
              const distanceAttenuation = Math.max(0.35, 1 - (v.dist / maxDist) * 0.45);
              const intensity = factor * pulse.strength * distanceAttenuation;
              if (intensity > maxVIntensity) {
                maxVIntensity = intensity;
              }
            }
          }

          if (maxVIntensity > 0.04) {
            // Nodo nodal brillante sutil
            ctx.beginPath();
            ctx.arc(v.x, v.y, 1.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(maxVIntensity * 0.38, 0.38)})`;
            ctx.fill();

            // Halo nodal morado
            ctx.beginPath();
            ctx.arc(v.x, v.y, 2.4, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(168, 85, 247, ${Math.min(maxVIntensity * 0.22, 0.22)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      initGrid();
    };

    let startTimer: ReturnType<typeof setTimeout>;
    window.addEventListener('resize', handleResize);
    startTimer = setTimeout(() => {
      initGrid();
      animationFrameId = requestAnimationFrame(render);
    }, 40);

    // Pausar animación cuando la sección quede fuera de la vista para 0% uso de GPU/CPU
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          lastBeatTime = performance.now();
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);

    return () => {
      clearTimeout(startTimer);
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
