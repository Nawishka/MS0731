import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Lock, Heart, Flower2, Sparkles } from 'lucide-react';

interface LockedGateProps {
  targetDate: Date;
  onOpenBypass: () => void;
  onTimerExpire?: () => void;
}

export default function LockedGate({ targetDate, onOpenBypass, onTimerExpire }: LockedGateProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const hasExpiredRef = useRef(false);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (!hasExpiredRef.current && onTimerExpire) {
          hasExpiredRef.current = true;
          onTimerExpire();
        }
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };
    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate, onTimerExpire]);

  return (
    <div className="relative w-full min-h-[90vh] flex flex-col items-center justify-center text-center p-4" id="locked-gate-stage">
      
      <div className="absolute top-4 right-4 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onOpenBypass}
          className="px-5 py-2.5 text-[10px] font-sans font-bold tracking-widest uppercase rounded-full bg-white/10 backdrop-blur-xl text-white border border-white/20 hover:bg-white/20 cursor-pointer transition-all shadow-[0_4px_15px_rgba(0,0,0,0.1)]"
        >
          Enter
        </motion.button>
      </div>

      {/* 🦋 COZY ANIMATIONS: Butterflies, Fireflies, and Flowers 🦋 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -80, 0],
              x: [0, i % 2 === 0 ? 30 : -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{ duration: 8 + i, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute"
            style={{ top: `${(i * 15) % 85 + 5}%`, left: `${(i * 27) % 90 + 5}%` }}
          >
            {i % 4 === 0 ? (
              // Flapping Butterfly
              <motion.div animate={{ rotateY: [0, 60, 0] }} transition={{ duration: 0.3, repeat: Infinity }} className="text-xl drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
                🦋
              </motion.div>
            ) : i % 4 === 1 ? (
              <Flower2 size={18 + i * 2} className="text-fuchsia-300/60 drop-shadow-md" />
            ) : i % 4 === 2 ? (
              // Glowing Firefly
              <div className="w-1.5 h-1.5 rounded-full bg-amber-200 shadow-[0_0_12px_4px_rgba(251,191,36,0.6)] animate-pulse" />
            ) : (
              <Sparkles size={14 + i * 2} className="text-cyan-300/40 drop-shadow-sm" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Main Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
        className="w-full max-w-lg rounded-[2.5rem] bg-white/10 backdrop-blur-2xl p-8 md:p-12 relative overflow-hidden shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20 z-10"
      >
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-fuchsia-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
        
        {/* Glass Motif */}
        <div className="mx-auto w-24 h-24 rounded-full bg-white/5 border border-white/20 flex items-center justify-center mb-8 relative shadow-inner backdrop-blur-md">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-white flex items-center justify-center relative drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
          >
            <Flower2 size={44} className="opacity-90" strokeWidth={1.5} />
            <div className="absolute">
              <Lock size={16} className="text-white mt-1" />
            </div>
          </motion.div>
          <div className="absolute inset-0 border border-dashed border-white/30 rounded-full animate-spin-slow" />
        </div>

        <span className="font-sans text-[10px] tracking-[0.4em] text-fuchsia-200 font-bold uppercase block mb-3 drop-shadow-md">
          COUNTDOWN TO 18
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-white font-medium mb-4 tracking-wide drop-shadow-md">
          Shashi's 18th Birthday
        </h2>
        <p className="font-sans text-sm text-purple-100/80 max-w-sm mx-auto mb-8 leading-relaxed">
          Counting down the seconds until July 31st. A beautiful, magical celebration waiting just for you.
        </p>

        {/* Frosted Countdown Container */}
        <div className="grid grid-cols-4 gap-3 p-5 rounded-3xl bg-black/10 border border-white/10 shadow-inner backdrop-blur-md">
          {Object.entries(timeLeft).map(([unit, val]) => (
            <div key={unit} className="text-center">
              <div className="font-serif text-3xl md:text-4xl text-white font-medium tracking-tight drop-shadow-sm">
                {String(val).padStart(2, '0')}
              </div>
              <div className="font-sans font-semibold text-[9px] text-purple-200/70 uppercase tracking-widest mt-1">
                {unit}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-white/50 font-sans tracking-widest">
          <Heart size={12} className="text-fuchsia-300/50" />
          <span>Unlocking July 31, 2026 at Midnight</span>
        </div>
      </motion.div>
    </div>
  );
}
