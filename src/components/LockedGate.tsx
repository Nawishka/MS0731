import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Lock, Heart, Flower, Sparkles } from 'lucide-react';

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
          className="px-5 py-2.5 text-[10px] font-mono font-bold tracking-widest uppercase rounded-full bg-[#130b2e]/60 backdrop-blur-md text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 hover:bg-[#1a0f3c]/80 cursor-pointer transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]"
        >
          Enter
        </motion.button>
      </div>

      {/* Magical Floating Environment: Bioluminescent particles and deep forest flora */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -60, 0],
              x: [0, i % 2 === 0 ? 20 : -20, 0],
              opacity: [0.1, 0.5, 0.1],
              rotate: [0, i % 2 === 0 ? 45 : -45, 0]
            }}
            transition={{ duration: 7 + i, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute"
            style={{ top: `${(i * 12) % 85 + 5}%`, left: `${(i * 23) % 90 + 5}%` }}
          >
            {i % 3 === 0 ? (
              <Flower size={18 + i * 2} className="text-fuchsia-500/20 drop-shadow-[0_0_8px_rgba(217,70,239,0.3)]" />
            ) : i % 3 === 1 ? (
              <Sparkles size={14 + i * 2} className="text-cyan-400/30 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]" />
            ) : (
              <Heart size={12 + i * 2} className="text-purple-500/20 fill-purple-600/10" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Main Enchanted Frosted Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-lg rounded-[2.5rem] bg-[#130b2e]/60 backdrop-blur-xl p-8 md:p-12 relative overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] border border-purple-500/20"
      >
        {/* Bioluminescent corner glows */}
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        
        {/* Magical Motif */}
        <div className="mx-auto w-24 h-24 rounded-full bg-[#0a0514]/80 border border-purple-500/30 flex items-center justify-center mb-8 relative shadow-[inset_0_0_20px_rgba(168,85,247,0.1)]">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-fuchsia-400 flex items-center justify-center relative drop-shadow-[0_0_10px_rgba(217,70,239,0.5)]"
          >
            <Flower size={44} className="opacity-80" strokeWidth={1.5} />
            <div className="absolute">
              <Lock size={16} className="text-cyan-300 mt-1 drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
            </div>
          </motion.div>
          {/* Subtle spinning outer ring */}
          <div className="absolute inset-0 border border-dashed border-cyan-500/20 rounded-full animate-spin-slow" />
        </div>

        <span className="font-mono text-[10px] tracking-[0.4em] text-cyan-400 font-bold uppercase block mb-3 drop-shadow-[0_0_5px_rgba(6,182,212,0.4)]">
          COUNTDOWN TO 18
        </span>
        <h2 className="font-display text-3xl md:text-4xl text-purple-50 font-medium mb-4 tracking-wide">
          Shashi's 18th Birthday
        </h2>
        <p className="font-serif italic text-sm text-purple-200/60 max-w-sm mx-auto mb-8 leading-relaxed">
          "Counting down the seconds until July 31st. A magical celebration waiting just for you, Shashi."
        </p>

        {/* Deep Glowing Countdown Container */}
        <div className="grid grid-cols-4 gap-3 p-5 rounded-3xl bg-[#0a0514]/60 border border-purple-500/20 shadow-inner relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-500/5 to-transparent pointer-events-none" />
          {Object.entries(timeLeft).map(([unit, val]) => (
            <div key={unit} className="text-center relative z-10">
              <div className="font-display text-3xl md:text-4xl text-cyan-400 font-medium tracking-tight drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                {String(val).padStart(2, '0')}
              </div>
              <div className="font-mono font-semibold text-[9px] text-purple-400/60 uppercase tracking-widest mt-1">
                {unit}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-purple-400/40 font-mono tracking-widest">
          <Lock size={12} className="text-cyan-500/40" />
          <span>Unlocking July 31, 2026 at Midnight</span>
        </div>
      </motion.div>
    </div>
  );
}
