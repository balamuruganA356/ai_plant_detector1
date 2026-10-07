import React, { useEffect, useRef, useState } from 'react';
import { Zap, Sparkles, Activity, Eye, EyeOff } from 'lucide-react';

interface NeuralBackgroundProps {
  isDark?: boolean;
}

interface Neuron {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  pulsePhase: number;
  pulseSpeed: number;
  color: string;
  glowColor: string;
  energy: number; // 0 to 1, boosts glow on stimulation
}

interface Pulse {
  fromIndex: number;
  toIndex: number;
  progress: number; // 0 to 1
  speed: number;
  intensity: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const NeuralBackground: React.FC<NeuralBackgroundProps> = ({ isDark = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const triggerPulseRef = useRef<(() => void) | null>(null);
  const [hudMinimized, setHudMinimized] = useState<boolean>(false);
  const [ultraGlow, setUltraGlow] = useState<boolean>(true);
  const [synapseCount, setSynapseCount] = useState<number>(180);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const neuronCount = isMobile ? 25 : 45;
    const connectionDistance = isMobile ? 130 : 165;

    // Subtle bio-agricultural color palette
    const darkPalette = [
      { core: '#10b981', glow: 'rgba(16, 185, 129, 0.15)' }, // emerald
      { core: '#34d399', glow: 'rgba(52, 211, 153, 0.15)' }, // mint
      { core: '#06b6d4', glow: 'rgba(6, 182, 212, 0.15)' },  // cyan
      { core: '#a3e635', glow: 'rgba(163, 230, 53, 0.12)' }, // lime green
    ];

    // Subdued palette for light mode
    const lightPalette = [
      { core: '#047857', glow: 'rgba(4, 120, 87, 0.12)' },
      { core: '#065f46', glow: 'rgba(6, 95, 70, 0.12)' },
      { core: '#0f766e', glow: 'rgba(15, 118, 110, 0.12)' },
      { core: '#15803d', glow: 'rgba(21, 128, 61, 0.12)' },
    ];

    const palette = isDark ? darkPalette : lightPalette;

    const neurons: Neuron[] = [];
    for (let i = 0; i < neuronCount; i++) {
      const p = palette[i % palette.length];
      const baseRadius = Math.random() * 1.5 + 1.2;
      neurons.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: baseRadius,
        baseRadius,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.02,
        color: p.core,
        glowColor: p.glow,
        energy: 0.2,
      });
    }

    const pulses: Pulse[] = [];
    const shockwaves: Shockwave[] = [];
    const maxPulses = isMobile ? 10 : 20;

    // Mouse coordinates
    const mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // Click triggers subtle neural shockwave ripple
    const handleClick = (e: MouseEvent) => {
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 8,
        maxRadius: Math.max(width, height) * 0.35,
        alpha: 0.45,
      });

      // Energize nearest neurons softly
      neurons.forEach((n, idx) => {
        const dist = Math.hypot(n.x - e.clientX, n.y - e.clientY);
        if (dist < 200) {
          n.energy = 0.6;
          for (let targetIdx = 0; targetIdx < neurons.length; targetIdx++) {
            if (targetIdx !== idx) {
              const d2 = Math.hypot(n.x - neurons[targetIdx].x, n.y - neurons[targetIdx].y);
              if (d2 < connectionDistance && pulses.length < maxPulses) {
                pulses.push({
                  fromIndex: idx,
                  toIndex: targetIdx,
                  progress: 0,
                  speed: 0.02 + Math.random() * 0.02,
                  intensity: 0.6,
                });
              }
            }
          }
        }
      });
    };

    // Manual neural pulse function
    triggerPulseRef.current = () => {
      shockwaves.push({
        x: width / 2,
        y: height / 2,
        radius: 8,
        maxRadius: Math.max(width, height) * 0.4,
        alpha: 0.5,
      });
      for (let i = 0; i < 8; i++) {
        const from = Math.floor(Math.random() * neurons.length);
        const to = (from + 1 + Math.floor(Math.random() * 4)) % neurons.length;
        pulses.push({
          fromIndex: from,
          toIndex: to,
          progress: 0,
          speed: 0.02 + Math.random() * 0.02,
          intensity: 0.6,
        });
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    document.addEventListener('mouseleave', handleMouseLeave);

    let activeSynapseCount = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      activeSynapseCount = 0;
      const axonColorBase = isDark ? '52, 211, 153' : '4, 120, 87';

      // 1. Draw Shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += 6;
        sw.alpha *= 0.95;

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(52, 211, 153, ${sw.alpha * 0.3})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (sw.radius >= sw.maxRadius || sw.alpha <= 0.02) {
          shockwaves.splice(s, 1);
        }
      }

      // 2. Draw Synapses (Axon pathways)
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const n1 = neurons[i];
          const n2 = neurons[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDistance) {
            activeSynapseCount++;
            const proximityFactor = 1 - dist / connectionDistance;
            const energyFactor = (n1.energy + n2.energy) * 0.5;
            const alpha = Math.min(proximityFactor * (isDark ? 0.20 : 0.15) + energyFactor * 0.15, 0.35);

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(${axonColorBase}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Spontaneous synaptic impulse firing
            if (pulses.length < maxPulses && Math.random() < 0.003) {
              pulses.push({
                fromIndex: i,
                toIndex: j,
                progress: 0,
                speed: 0.015 + Math.random() * 0.02,
                intensity: 0.5,
              });
            }
          }
        }
      }

      // 3. Connect Mouse Cursor as an active Neuro-Transmitter Node
      if (mouse.active) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(110, 231, 183, 0.6)';
        ctx.fill();

        let connections = 0;
        for (let i = 0; i < neurons.length && connections < 4; i++) {
          const n = neurons[i];
          const dist = Math.hypot(n.x - mouse.x, n.y - mouse.y);
          if (dist < 160) {
            connections++;
            const alpha = (1 - dist / 160) * 0.25;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(n.x, n.y);
            ctx.strokeStyle = `rgba(110, 231, 183, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            n.energy = Math.max(n.energy, 0.4);
          }
        }
      }

      // 4. Update and render Neurons
      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i];

        // Move neuron
        n.x += n.vx;
        n.y += n.vy;

        // Bounce from walls
        if (n.x < 0) { n.x = 0; n.vx *= -1; }
        else if (n.x > width) { n.x = width; n.vx *= -1; }

        if (n.y < 0) { n.y = 0; n.vy *= -1; }
        else if (n.y > height) { n.y = height; n.vy *= -1; }

        // Dissipate energy
        n.energy = Math.max(0.1, n.energy * 0.98);

        // Pulse phase
        n.pulsePhase += n.pulseSpeed;
        const currentRadius = (n.baseRadius + Math.sin(n.pulsePhase) * 0.5) * (1 + n.energy * 0.3);

        // Draw Outer Bio-Luminescent Halo
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = n.glowColor;
        ctx.fill();

        // Draw Neuron Core Body
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();

        // White nucleus center dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fill();
      }

      // 5. Update and render running Electrical Impulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed;

        const from = neurons[pulse.fromIndex];
        const to = neurons[pulse.toIndex];

        if (!from || !to || pulse.progress >= 1) {
          if (to) to.energy = 0.5;
          pulses.splice(p, 1);
          continue;
        }

        const curX = from.x + (to.x - from.x) * pulse.progress;
        const curY = from.y + (to.y - from.y) * pulse.progress;

        // Subtle Electrical Impulse Spark
        ctx.beginPath();
        ctx.arc(curX, curY, 1.8 * pulse.intensity, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(curX, curY, 3.5 * pulse.intensity, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(52, 211, 153, 0.25)';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const telemetryInterval = setInterval(() => {
      setSynapseCount(activeSynapseCount);
    }, 2000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(telemetryInterval);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDark, ultraGlow]);

  return (
    <>
      {/* Running Neurons Full-Screen Canvas (Subtle Background Layer) */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-30 dark:opacity-35 transition-opacity duration-700"
        style={{ willChange: 'transform' }}
      />

      {/* Interactive Neural HUD Floating Widget */}
      <div className="fixed bottom-4 right-4 z-40">
        {hudMinimized ? (
          <button
            onClick={() => setHudMinimized(false)}
            className="p-2.5 rounded-full bg-stone-900/90 text-emerald-400 border border-emerald-500/40 shadow-lg backdrop-blur-md hover:scale-105 transition-transform flex items-center justify-center cursor-pointer"
            title="Expand Neural Network HUD"
          >
            <Activity className="w-4 h-4 animate-pulse text-emerald-400" />
          </button>
        ) : (
          <div className="p-3 rounded-2xl bg-stone-900/90 dark:bg-stone-950/90 border border-emerald-500/40 shadow-xl backdrop-blur-md text-stone-100 text-xs flex flex-col gap-2 max-w-[280px]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-extrabold text-[11px] tracking-wider text-emerald-300 uppercase">
                  Neural Intelligence Grid
                </span>
              </div>
              <button
                onClick={() => setHudMinimized(true)}
                className="text-stone-400 hover:text-white p-0.5 rounded-md"
                title="Minimize HUD"
              >
                <EyeOff className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-[10px] text-stone-400 flex items-center justify-between">
              <span>Synaptic Connections:</span>
              <span className="font-mono text-emerald-400 font-bold">~{synapseCount} Axons</span>
            </div>

            <div className="text-[10px] text-stone-400 italic">
              💡 Click anywhere on the screen to trigger an electric neural shockwave!
            </div>

            {/* Interactive Buttons */}
            <div className="flex items-center gap-1.5 pt-1">
              <button
                onClick={() => triggerPulseRef.current?.()}
                className="flex-1 py-1.5 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] transition-all flex items-center justify-center gap-1 cursor-pointer shadow-xs active:scale-95"
              >
                <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
                <span>Fire Synapse</span>
              </button>

              <button
                onClick={() => setUltraGlow(!ultraGlow)}
                className={`py-1.5 px-2 rounded-xl text-[10px] font-semibold border transition-all cursor-pointer ${
                  ultraGlow
                    ? 'bg-emerald-950/70 border-emerald-400 text-emerald-300'
                    : 'bg-stone-800 border-stone-700 text-stone-400'
                }`}
                title="Toggle Ultra Bio-Luminescence"
              >
                <Sparkles className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
