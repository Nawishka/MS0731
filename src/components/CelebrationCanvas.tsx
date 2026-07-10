import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  shape: 'circle' | 'star';
}

interface CelebrationCanvasProps {
  active: boolean;
  triggerBurst: boolean;
  onBurstComplete: () => void;
}

export default function CelebrationCanvas({ active, triggerBurst, onBurstComplete }: CelebrationCanvasProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (triggerBurst) {
      // Cozy, magical color palette!
      const colors = ['#ffffff', '#f472b6', '#22d3ee', '#fde047']; 
      
      const newParticles = Array.from({ length: 60 }).map((_, i) => ({
        id: Date.now() + i,
        x: 50,
        y: 50,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 4,
        shape: Math.random() > 0.7 ? 'star' : 'circle' as const
      }));
      
      setParticles(newParticles);
      
      setTimeout(() => {
        setParticles([]);
        onBurstComplete();
      }, 3500);
    }
  }, [triggerBurst, onBurstComplete]);

  if (!active && !triggerBurst) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
       <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, x: '50vw', y: '50vh', scale: 0 }}
            animate={{ 
              opacity: [1, 1, 0], 
              x: `calc(50vw + ${Math.random() * 800 - 400}px)`, 
              y: `calc(50vh + ${Math.random() * 800 - 400}px)`,
              scale: Math.random() * 1.5 + 0.5,
              rotate: Math.random() * 360
            }}
            transition={{ duration: 2 + Math.random(), ease: 'easeOut' }}
            className={`absolute shadow-[0_0_12px_rgba(255,255,255,0.6)] ${p.shape === 'circle' ? 'rounded-full' : 'clip-star'}`}
            style={{ 
              backgroundColor: p.color, 
              width: p.size, 
              height: p.size,
              clipPath: p.shape === 'star' ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' : 'none'
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
