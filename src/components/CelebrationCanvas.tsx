import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  type: 'heart' | 'star' | 'balloon';
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  swaySpeed: number;
  swayOffset: number;
  balloonRadius?: number;
}

interface CelebrationCanvasProps {
  active: boolean;
  triggerBurst: boolean;
  onBurstComplete?: () => void;
}

export default function CelebrationCanvas({ active, triggerBurst, onBurstComplete }: CelebrationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Palettes
  const colors = [
    '#F43F5E', // Rose
    '#FDA4AF', // Rose Light
    '#EC4899', // Pink
    '#F472B6', // Peach Pink
    '#E11D48', // Crimson Red
    '#F53FBF', // Bright Pink
    '#FB7185', // Soft Rose
    '#FFFFFF', // Alabaster White
  ];

  const spawnParticles = (count: number, isInitialBurst: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const typeRand = Math.random();
      let type: 'heart' | 'star' | 'balloon' = 'heart';
      if (typeRand < 0.4) {
        type = 'heart';
      } else if (typeRand < 0.75) {
        type = 'star';
      } else {
        type = 'balloon';
      }

      const size = type === 'balloon' 
        ? Math.random() * 15 + 15 
        : type === 'heart' 
          ? Math.random() * 10 + 10 
          : Math.random() * 8 + 6;

      const color = colors[Math.floor(Math.random() * colors.length)];

      newParticles.push({
        x: isInitialBurst ? canvas.width / 2 + (Math.random() * 120 - 60) : Math.random() * canvas.width,
        y: isInitialBurst ? canvas.height / 2 + (Math.random() * 100 - 50) : canvas.height + 40,
        vx: isInitialBurst ? (Math.random() * 10 - 5) : (Math.random() * 2 - 1),
        vy: isInitialBurst ? (Math.random() * -12 - 4) : (Math.random() * -3 - 1.5),
        size,
        color,
        type,
        opacity: 1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() * 0.04 - 0.02),
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayOffset: Math.random() * Math.PI * 2,
        balloonRadius: type === 'balloon' ? size * 0.7 : undefined,
      });
    }

    particlesRef.current = [...particlesRef.current, ...newParticles];
  };

  useEffect(() => {
    if (triggerBurst) {
      spawnParticles(75, true);
      if (onBurstComplete) {
        onBurstComplete();
      }
    }
  }, [triggerBurst]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Continuous ambient floating when active
    let ambientTimer: number | null = null;
    if (active) {
      ambientTimer = window.setInterval(() => {
        if (particlesRef.current.length < 50) {
          spawnParticles(2, false);
        }
      }, 500);
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, s: number, color: string, alpha: number) => {
      c.save();
      c.globalAlpha = alpha;
      c.beginPath();
      c.translate(x, y);
      c.moveTo(0, -s / 4);
      c.bezierCurveTo(-s / 2, -s * 3/4, -s, -s / 3, -s, s / 4);
      c.bezierCurveTo(-s, s * 3/4, -s / 2, s, 0, s * 1.2);
      c.bezierCurveTo(s / 2, s, s, s * 3/4, s, s / 4);
      c.bezierCurveTo(s, -s / 3, s / 2, -s * 3/4, 0, -s / 4);
      c.fillStyle = color;
      c.shadowColor = color;
      c.shadowBlur = 8;
      c.fill();
      c.restore();
    };

    const drawStar = (c: CanvasRenderingContext2D, cx: number, cy: number, s: number, color: string, alpha: number) => {
      let rot = Math.PI / 2 * 3;
      let x = cx;
      let y = cy;
      const spikes = 5;
      const outerRadius = s;
      const innerRadius = s * 0.4;
      const step = Math.PI / spikes;

      c.save();
      c.globalAlpha = alpha;
      c.beginPath();
      c.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        c.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        c.lineTo(x, y);
        rot += step;
      }
      c.lineTo(cx, cy - outerRadius);
      c.closePath();
      c.fillStyle = color;
      c.shadowColor = color;
      c.shadowBlur = 10;
      c.fill();
      c.restore();
    };

    const drawBalloon = (c: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, alpha: number, rot: number) => {
      c.save();
      c.globalAlpha = alpha;
      c.translate(x, y);
      c.rotate(rot * 0.1); // subtle tilt

      // Draw standard balloon string
      c.beginPath();
      c.moveTo(0, r * 1.2);
      c.bezierCurveTo(-4, r * 1.2 + 15, 4, r * 1.2 + 30, 0, r * 1.2 + 45);
      c.strokeStyle = 'rgba(244, 241, 2EA, 0.4)';
      c.lineWidth = 1.5;
      c.stroke();

      // Balloon knot (triangle at base)
      c.beginPath();
      c.moveTo(-4, r * 1.05);
      c.lineTo(4, r * 1.05);
      c.lineTo(0, r * 1.2);
      c.closePath();
      c.fillStyle = color;
      c.fill();

      // Balloon body (oval shape)
      c.beginPath();
      c.scale(1, 1.2);
      c.arc(0, 0, r, 0, Math.PI * 2);
      c.fillStyle = color;
      c.shadowColor = color;
      c.shadowBlur = 15;
      c.fill();
      c.scale(1, 1 / 1.2); // reset scale

      // Glass shine ellipse
      c.beginPath();
      c.ellipse(-r / 2, -r / 2, r / 3, r / 6, -Math.PI / 4, 0, Math.PI * 2);
      c.fillStyle = 'rgba(255, 255, 255, 0.35)';
      c.fill();

      c.restore();
    };

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        // Apply forces
        p.swayOffset += p.swaySpeed;
        p.x += Math.sin(p.swayOffset) * 0.6 + p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        // Decelerate initial burst velocities
        p.vx *= 0.98;
        if (p.type !== 'balloon') {
          p.vy += 0.05; // gravity pulling down mini particles slowly
        } else {
          p.vy *= 0.98; // ease into steady rising
          if (p.vy > -1.2) p.vy = -1.2; // constant rising speed
        }

        // Fade out
        if (p.type !== 'balloon') {
          p.opacity -= 0.006;
        } else {
          // Balloons only fade out as they reach the very top
          if (p.y < 120) {
            p.opacity -= 0.01;
          }
        }

        // Remove out of bounds or dead particles
        if (p.opacity <= 0 || p.y < -60 || p.x < -30 || p.x > canvas.width + 30) {
          particles.splice(i, 1);
          continue;
        }

        // Draw individual particle types
        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.opacity);
        } else if (p.type === 'star') {
          drawStar(ctx, p.x, p.y, p.size, p.color, p.opacity);
        } else if (p.type === 'balloon') {
          drawBalloon(ctx, p.x, p.y, p.balloonRadius || p.size, p.color, p.opacity, p.rotation);
        }
      }

      animationFrameRef.current = requestAnimationFrame(updateAndDraw);
    };

    updateAndDraw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (ambientTimer) clearInterval(ambientTimer);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-40"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
