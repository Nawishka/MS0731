import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, HelpCircle, Wind, Flame } from 'lucide-react';
import { DiyaState } from '../types';
import { audio } from '../utils/audio';

interface TeakwoodDoorProps {
  isBypassed: boolean;
  targetDate: Date;
  onUnlock: () => void;
}

export default function TeakwoodDoor({ isBypassed, targetDate, onUnlock }: TeakwoodDoorProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMidnight, setIsMidnight] = useState(false);
  const [showInteractionPrompt, setShowInteractionPrompt] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [flashActive, setFlashActive] = useState(false);

  // Initialize 5 traditional diyas with positions
  const [diyas, setDiyas] = useState<DiyaState[]>([
    { id: 1, isLit: true, x: 20, y: 85 },
    { id: 2, isLit: true, x: 35, y: 88 },
    { id: 3, isLit: true, x: 50, y: 90 },
    { id: 4, isLit: true, x: 65, y: 88 },
    { id: 5, isLit: true, x: 80, y: 85 },
  ]);

  // Calculate Countdown
  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0 || isBypassed) {
        setIsMidnight(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
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
  }, [targetDate, isBypassed]);

  // Handle Diya extinguishing
  const extinguishDiya = (id: number) => {
    if (!showInteractionPrompt && !isMidnight) return;

    // Only play sound and update if the diya is still lit
    setDiyas((prev) => {
      const target = prev.find(d => d.id === id);
      if (target && target.isLit) {
        audio.playWindPuff();
      }
      return prev.map((diya) => (diya.id === id ? { ...diya, isLit: false } : diya));
    });
  };

  // Check if all diyas are extinguished
  useEffect(() => {
    const litDiyas = diyas.filter((d) => d.isLit);
    if (litDiyas.length === 0 && (isMidnight || isBypassed)) {
      triggerCinematicUnlock();
    }
  }, [diyas, isMidnight, isBypassed]);

  const triggerCinematicUnlock = () => {
    setFlashActive(true);
    setIsOpening(true);
    audio.playDoorUnlock();

    // After bright flash peak, proceed to next phase
    setTimeout(() => {
      setFlashActive(false);
      onUnlock();
    }, 1800);
  };

  const handleOpenDoorClick = () => {
    if (isMidnight || isBypassed) {
      setShowInteractionPrompt(true);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[75vh] px-4 py-8 select-none" id="teakwood-door-stage">
      {/* Cinematic Flash Overlay */}
      <AnimatePresence>
        {flashActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, times: [0, 0.4, 0.8, 1] }}
            className="fixed inset-0 bg-gradient-to-r from-gold-200 via-white to-gold-300 z-50 mix-blend-screen pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Title Header with Countdown */}
      <div className="text-center mb-6 z-10">
        <span className="font-sans text-[11px] tracking-[0.25em] text-gold-400 font-semibold uppercase block mb-2">
          JULY 31 IS HERE
        </span>
        <h2 className="font-display text-3xl md:text-5xl text-gold-100 tracking-wider font-semibold mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          Happy 18th, Shashi!
        </h2>
        <p className="font-serif italic text-lg text-gold-200/60 max-w-md mx-auto mb-6">
          "The wait is finally over. Let's celebrate your special day together."
        </p>

        {/* Live Countdown in Gold Script */}
        {!isMidnight ? (
          <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto p-4 rounded-2xl glass-panel-gold border border-gold-500/20" id="countdown-timer">
            {Object.entries(timeLeft).map(([key, val]) => (
              <div key={key} className="text-center">
                <div className="font-display text-2xl md:text-3xl text-gold-300 font-bold tracking-tight">
                  {String(val).padStart(2, '0')}
                </div>
                <div className="font-mono text-[9px] text-gold-100/50 uppercase tracking-widest mt-1">
                  {key}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block py-2 px-6 rounded-full glass-panel-gold border border-gold-500/40 text-gold-300 font-display text-sm uppercase tracking-widest font-semibold animate-pulse"
          >
            ✦ IT'S TIME ✦
          </motion.div>
        )}
      </div>

      {/* Traditional Palace Door Container */}
      <div className="relative w-full max-w-[320px] aspect-[3/4.5] md:max-w-[360px] rounded-t-[100px] border-8 border-amber-950/60 overflow-hidden shadow-[0_25px_60px_-15px_rgba(212,175,55,0.2)] bg-black/60 flex mb-8">
        {/* Door frame shadows & glow */}
        <div className="absolute inset-0 ring-1 ring-gold-500/20 rounded-t-[92px] pointer-events-none z-10" />

        {/* LEFT DOOR */}
        <motion.div
          animate={isOpening ? { x: '-100%', rotateY: -45, skewY: -5, opacity: 0.1 } : { x: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="relative w-1/2 h-full bg-gradient-to-r from-amber-950 via-[#2d1d0c] to-amber-950 border-r border-gold-500/20 origin-left flex items-center justify-end pr-2 overflow-hidden"
          style={{ transformStyle: 'preserve-3d' }}
          id="left-door-panel"
        >
          {/* Teak wood panels, grooves, and brass dots */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
          
          {/* Custom Filigree details */}
          <div className="absolute inset-4 border border-gold-400/20 rounded-tl-[70px] opacity-60 pointer-events-none flex flex-col justify-between p-4">
            <span className="text-[10px] text-gold-400/40 font-mono">✦</span>
            <span className="text-[10px] text-gold-400/40 font-mono">✦</span>
          </div>

          {/* Left Golden Knocker Handle */}
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 rounded-full border-2 border-gold-400 bg-amber-900/80 flex items-center justify-center shadow-lg z-20 cursor-pointer"
          >
            <div className="w-4 h-4 rounded-full bg-gold-400 border border-black/40" />
          </motion.div>
        </motion.div>

        {/* RIGHT DOOR */}
        <motion.div
          animate={isOpening ? { x: '100%', rotateY: 45, skewY: 5, opacity: 0.1 } : { x: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="relative w-1/2 h-full bg-gradient-to-l from-amber-950 via-[#2d1d0c] to-amber-950 border-l border-gold-500/20 origin-right flex items-center justify-start pl-2 overflow-hidden"
          style={{ transformStyle: 'preserve-3d' }}
          id="right-door-panel"
        >
          {/* Teak wood panels, grooves, and brass dots */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
          
          {/* Custom Filigree details */}
          <div className="absolute inset-4 border border-gold-400/20 rounded-tr-[70px] opacity-60 pointer-events-none flex flex-col justify-between p-4">
            <span className="text-[10px] text-gold-400/40 font-mono">✦</span>
            <span className="text-[10px] text-gold-400/40 font-mono">✦</span>
          </div>

          {/* Right Golden Knocker Handle */}
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 rounded-full border-2 border-gold-400 bg-amber-900/80 flex items-center justify-center shadow-lg z-20 cursor-pointer"
          >
            <div className="w-4 h-4 rounded-full bg-gold-400 border border-black/40" />
          </motion.div>
        </motion.div>

        {/* Ambient Void Behind Doors */}
        <div className="absolute inset-0 bg-radial-dark -z-10 flex flex-col items-center justify-center p-6 text-center">
          <Sparkles className="text-gold-400 animate-spin-slow mb-4 opacity-40" size={48} />
          <h4 className="font-display text-xl text-gold-300">Shashi's 18th</h4>
          <p className="font-serif text-xs text-gold-100/60 mt-1">A beautiful alternate realm awaits...</p>
        </div>
      </div>

      {/* Interaction Stage: Clay Oil Lamps (Diyas) and Candles at the base */}
      <div className="relative w-full max-w-md h-24 mb-8">
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent blur-xs" />
        
        {diyas.map((diya) => (
          <div
            key={diya.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 transition-all cursor-crosshair group"
            style={{ left: `${diya.x}%`, top: `${diya.y}%` }}
            onMouseEnter={() => extinguishDiya(diya.id)}
            onTouchStart={() => extinguishDiya(diya.id)}
            onClick={() => extinguishDiya(diya.id)}
            id={`diya-${diya.id}`}
          >
            {/* Traditional Clay Diya Base */}
            <div className="relative w-12 h-6 bg-gradient-to-b from-amber-800 to-amber-950 rounded-b-xl border-t border-gold-500/30 shadow-[0_6px_12px_rgba(0,0,0,0.5)] flex items-center justify-center">
              <div className="absolute -top-[3px] w-6 h-[4px] bg-gold-400 rounded-full" />
              <div className="w-2 h-1 bg-gold-900 rounded-full" />
            </div>

            {/* Glowing Golden Flame with Particle dissipate */}
            <AnimatePresence>
              {diya.isLit ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.08, 0.96, 1.02, 1] }}
                  exit={{ 
                    scale: 0,
                    y: -15,
                    opacity: 0,
                    transition: { duration: 0.4 } 
                  }}
                  className="absolute -top-7 left-1/2 -translate-x-1/2 w-4 h-8 origin-bottom flex flex-col items-center"
                >
                  {/* Flicker Core */}
                  <div className="w-3 h-6 bg-gradient-to-t from-amber-600 via-yellow-400 to-gold-100 rounded-full animate-flicker relative">
                    {/* Inner intense light */}
                    <div className="absolute inset-x-0.5 bottom-1 h-3 bg-white rounded-full opacity-80" />
                  </div>
                  {/* Outer light glow */}
                  <div className="absolute -inset-2 rounded-full bg-gold-500/20 blur-md pointer-events-none group-hover:bg-gold-500/30 transition-all" />
                </motion.div>
              ) : (
                /* Subtle smoke vapor on extinguish */
                <motion.div
                  initial={{ opacity: 0.8, y: -8, scale: 0.8 }}
                  animate={{ opacity: 0, y: -25, scale: 1.4, x: Math.random() * 8 - 4 }}
                  className="absolute -top-10 left-1/2 -translate-x-1/2 text-gold-300/40 pointer-events-none"
                >
                  <Wind size={12} className="animate-pulse" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Main Glassmorphic Action Controls */}
      <div className="z-10 w-full max-w-sm">
        <AnimatePresence mode="wait">
          {!showInteractionPrompt ? (
            <motion.button
              key="initial-btn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={handleOpenDoorClick}
              disabled={!isMidnight && !isBypassed}
              className={`w-full py-4 rounded-2xl font-sans font-semibold text-xs tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-3 cursor-pointer ${
                isMidnight || isBypassed
                  ? 'glass-panel-gold text-gold-300 hover:text-white border border-gold-500/30 shadow-[0_8px_32px_0_rgba(212,175,55,0.15)] hover:shadow-[0_8px_32px_0_rgba(212,175,55,0.35)]'
                  : 'bg-white/5 border border-white/5 text-gold-200/20 cursor-not-allowed'
              }`}
              id="open-door-primary-btn"
            >
              <span>
                {isMidnight || isBypassed ? 'Open the Door' : 'Waiting for Midnight'}
              </span>
              <Sparkles size={14} className={isMidnight || isBypassed ? 'text-gold-400 animate-pulse' : 'text-gold-200/10'} />
            </motion.button>
          ) : (
            <motion.div
              key="prompt-overlay"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel-gold rounded-2xl p-5 text-center border border-gold-500/30 shadow-[0_0_20px_rgba(212,175,55,0.1)]"
              id="interaction-instruction-panel"
            >
              <h5 className="font-display text-sm text-gold-300 font-semibold uppercase tracking-widest flex items-center justify-center gap-2 mb-2">
                <Flame size={14} className="text-gold-400 animate-pulse" />
                <span>Quick Step</span>
                <Flame size={14} className="text-gold-400 animate-pulse" />
              </h5>
              <p className="font-serif italic text-xs text-gold-100/80 leading-relaxed">
                "Just swipe, hover, or tap the little lamps to blow out the flames and open the door!"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
