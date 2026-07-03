import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Lock, Sparkles, Shield, Flower, Heart } from 'lucide-react';

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
      
      {/* Absolute Bypass Entry (Unobtrusive Corner Button) */}
      <div className="absolute top-4 right-4 z-50">
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(212, 175, 55, 0.15)' }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenBypass}
          className="px-4 py-2 text-[10px] font-mono tracking-widest uppercase rounded-full glass-panel-light text-gold-300 border border-gold-500/20 hover:border-gold-400/50 cursor-pointer transition-all shadow-[0_0_15px_rgba(212, 175, 55, 0.15)]"
          id="test-bypass-trigger-btn"
        >
          Enter
        </motion.button>
      </div>

      {/* Floating Rose Petals and Sparkles for romantic magic */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -40, 0],
              x: [0, i % 2 === 0 ? 15 : -15, 0],
              opacity: [0.15, 0.6, 0.15],
              rotate: [0, i % 2 === 0 ? 45 : -45, 0]
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute text-gold-400/20"
            style={{
              top: `${(i * 12) % 85 + 5}%`,
              left: `${(i * 23) % 90 + 5}%`,
            }}
          >
            {i % 3 === 0 ? (
              <Flower size={16 + i * 3} className="text-gold-300/30" />
            ) : i % 3 === 1 ? (
              <Heart size={14 + i * 2} className="text-gold-400/20 fill-gold-500/10" />
            ) : (
              <Sparkles size={12 + i * 2} className="text-amber-300/45" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Main Locked Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-lg rounded-3xl glass-panel-dark p-8 md:p-12 relative overflow-hidden shadow-[0_25px_60px_-15px_rgba(212, 175, 55, 0.12)] border border-gold-500/15"
        id="locked-stage-card"
      >
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
        <div className="absolute -top-16 -left-16 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-gold-400/10 rounded-full blur-2xl" />
        
        {/* Flower & Lock Motif */}
        <div className="mx-auto w-24 h-24 rounded-full bg-gold-500/5 border border-gold-400/20 flex items-center justify-center mb-8 relative">
          <motion.div
            animate={{ scale: [1, 1.06, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-gold-400 flex items-center justify-center relative"
          >
            <Flower size={48} className="filter drop-shadow-[0_0_10px_rgba(212, 175, 55, 0.3)] text-gold-300" />
            <div className="absolute">
              <Lock size={18} className="text-[#2d1d0c] mt-1" />
            </div>
          </motion.div>
          {/* Circular rotating dashes */}
          <div className="absolute inset-0 border border-dashed border-gold-400/20 rounded-full animate-spin-slow" />
        </div>

        {/* Text Details - REPLACED WITH NORMAL, SWEET WORDS! */}
        <span className="font-sans text-[10px] tracking-[0.4em] text-gold-300 font-bold uppercase block mb-3">
          COUNTDOWN TO 18
        </span>
        <h2 className="font-display text-2xl md:text-3.5xl text-gold-50 tracking-wider font-semibold mb-4">
          Shashi's 18th Birthday
        </h2>
        <p className="font-serif italic text-base text-gold-100/70 max-w-sm mx-auto mb-8">
          "Counting down the seconds until July 31st. A special celebration waiting just for you, Shashi."
        </p>

        {/* Massive Ticking Countdown */}
        <div className="grid grid-cols-4 gap-3 p-5 rounded-2xl glass-panel-gold border border-gold-500/20 shadow-[inset_0_0_20px_rgba(212, 175, 55, 0.05)]" id="locked-countdown">
          {Object.entries(timeLeft).map(([unit, val]) => (
            <div key={unit} className="text-center">
              <div className="font-display text-3xl md:text-4xl text-gold-300 font-bold tracking-tight filter drop-shadow-[0_0_10px_rgba(212, 175, 55, 0.3)]">
                {String(val).padStart(2, '0')}
              </div>
              <div className="font-mono text-[9px] text-gold-100/40 uppercase tracking-widest mt-1">
                {unit}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info - REPLACED WITH NORMAL WORDS! */}
        <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-gold-300/50 font-mono tracking-wider">
          <Shield size={12} className="text-gold-400/70" />
          <span>Birthday Portal • Unlocking July 31, 2026 at Midnight</span>
        </div>
      </motion.div>
    </div>
  );
}
