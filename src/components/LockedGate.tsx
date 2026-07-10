import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Lock, Heart, Cloud, Flower2 } from 'lucide-react';

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
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenBypass}
          className="px-5 py-2.5 text-[10px] font-sans font-bold tracking-widest uppercase rounded-full bg-white/70 backdrop-blur-md text-rose-500 border border-white hover:border-rose-200 hover:bg-white cursor-pointer transition-all shadow-[0_4px_15px_rgba(255,192,203,0.4)]"
        >
          Enter
        </motion.button>
      </div>

      {/* Romantic Floating Environment: Clouds, Petals, Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -60, 0],
              x: [0, i % 2 === 0 ? 20 : -20, 0],
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, i % 2 === 0 ? 45 : -45, 0]
            }}
            transition={{ duration: 7 + i, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute"
            style={{ top: `${(i * 12) % 85 + 5}%`, left: `${(i * 23) % 90 + 5}%` }}
          >
            {i % 3 === 0 ? (
              <Flower2 size={18 + i * 2} className="text-rose-300/40" />
            ) : i % 3 === 1 ? (
              <Heart size={14 + i * 2} className="text-pink-400/30 fill-pink-100/20" />
            ) : (
              <Cloud size={24 + i * 4} className="text-white/60 mix-blend-overlay" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Main Frosted Romantic Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-lg rounded-[2.5rem] bg-white/60 backdrop-blur-xl p-8 md:p-12 relative overflow-hidden shadow-[0_20px_60px_-15px_rgba(255,192,203,0.5)] border border-white/80"
      >
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-pink-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-rose-200/40 rounded-full blur-3xl" />
        
        {/* Lock Motif */}
        <div className="mx-auto w-24 h-24 rounded-full bg-white/80 border border-rose-100 flex items-center justify-center mb-8 relative shadow-[0_8px_20px_rgba(255,192,203,0.3)]">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-rose-400 flex items-center justify-center relative"
          >
            <Heart size={44} className="fill-rose-50" strokeWidth={1.5} />
            <div className="absolute">
              <Lock size={16} className="text-rose-600 mt-1" />
            </div>
          </motion.div>
          {/* Soft spinning outer ring */}
          <div className="absolute inset-0 border border-dashed border-rose-300/50 rounded-full animate-spin-slow" />
        </div>

        <span className="font-sans text-[10px] tracking-[0.3em] text-rose-500 font-bold uppercase block mb-3">
          COUNTDOWN TO 18
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-slate-800 font-medium mb-4">
          Shashi's 18th Birthday
        </h2>
        <p className="font-sans text-sm text-slate-500 max-w-sm mx-auto mb-8 leading-relaxed">
          Counting down the seconds until July 31st. A beautiful celebration waiting just for you, Shashi.
        </p>

        {/* Soft Pink Countdown Container */}
        <div className="grid grid-cols-4 gap-3 p-5 rounded-3xl bg-white/70 border border-white shadow-inner">
          {Object.entries(timeLeft).map(([unit, val]) => (
            <div key={unit} className="text-center">
              <div className="font-serif text-3xl md:text-4xl text-rose-600 font-medium tracking-tight">
                {String(val).padStart(2, '0')}
              </div>
              <div className="font-sans font-semibold text-[9px] text-slate-400 uppercase tracking-widest mt-1">
                {unit}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-rose-400/80 font-sans font-medium tracking-wide">
          <Heart size={12} className="fill-rose-100" />
          <span>Unlocking July 31, 2026 at Midnight</span>
        </div>
      </motion.div>
    </div>
  );
}
