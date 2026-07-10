import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Wind, Flame, Heart, Moon } from 'lucide-react';
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

  // Initialize 5 magical glowing candles
  const [diyas, setDiyas] = useState<DiyaState[]>([
    { id: 1, isLit: true, x: 20, y: 85 },
    { id: 2, isLit: true, x: 35, y: 88 },
    { id: 3, isLit: true, x: 50, y: 90 },
    { id: 4, isLit: true, x: 65, y: 88 },
    { id: 5, isLit: true, x: 80, y: 85 },
  ]);

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

  const extinguishDiya = (id: number) => {
    setDiyas((prev) => {
      const target = prev.find(d => d.id === id);
      if (target && target.isLit) {
        audio.playWindPuff();
      }
      return prev.map((diya) => (diya.id === id ? { ...diya, isLit: false } : diya));
    });
  };

  useEffect(() => {
    const litDiyas = diyas.filter((d) => d.isLit);
    if (litDiyas.length === 0) {
      triggerCinematicUnlock();
    }
  }, [diyas]);

  const triggerCinematicUnlock = () => {
    setFlashActive(true);
    setIsOpening(true);
    audio.playDoorUnlock();

    setTimeout(() => {
      setFlashActive(false);
      onUnlock();
    }, 1800);
  };

  const handleOpenDoorClick = () => {
    setShowInteractionPrompt(true);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[75vh] px-4 py-8 select-none" id="teakwood-door-stage">
      <AnimatePresence>
        {flashActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, times: [0, 0.4, 0.8, 1] }}
            className="fixed inset-0 bg-gradient-to-r from-cyan-900 via-white to-fuchsia-900 z-50 pointer-events-none mix-blend-screen"
          />
        )}
      </AnimatePresence>

      <div className="text-center mb-6 z-10">
        <span className="font-mono text-[10px] tracking-[0.4em] text-cyan-400 font-bold uppercase block mb-2 drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]">
          JULY 31 IS HERE
        </span>
        <h2 className="font-display text-4xl md:text-5xl text-purple-50 font-medium mb-4 drop-shadow-[0_0_15px_rgba(217,70,239,0.3)]">
          Happy 18th, Shashi!
        </h2>
        <p className="font-serif italic text-sm text-purple-200/70 max-w-sm mx-auto mb-6 leading-relaxed">
          "The wait is finally over. Let's step into this magical new chapter together."
        </p>

        {!isMidnight ? (
          <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto p-4 rounded-3xl bg-[#0a0514]/80 border border-purple-500/20 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]">
            {Object.entries(timeLeft).map(([key, val]) => (
              <div key={key} className="text-center relative">
                <div className="font-display text-3xl text-fuchsia-400 font-medium drop-shadow-[0_0_8px_rgba(217,70,239,0.4)]">
                  {String(val).padStart(2, '0')}
                </div>
                <div className="font-mono text-[9px] text-purple-400/60 uppercase tracking-widest mt-1 font-semibold">
                  {key}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-[#130b2e]/80 border border-cyan-500/40 text-cyan-400 font-mono text-xs uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)] animate-pulse"
          >
            <Sparkles size={14} className="text-fuchsia-400" />
            <span>IT'S TIME</span>
            <Sparkles size={14} className="text-fuchsia-400" />
          </motion.div>
        )}
      </div>

      {/* Enchanted Dark Glass Portal */}
      <div className="relative w-full max-w-[320px] aspect-[3/4.5] md:max-w-[360px] rounded-t-[100px] border-[6px] border-[#1a0f3c]/90 overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] bg-[#070514] flex mb-8 ring-1 ring-cyan-500/20">
        
        {/* LEFT DOOR */}
        <motion.div
          animate={isOpening ? { x: '-100%', rotateY: -45, skewY: -5, opacity: 0.1 } : { x: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="relative w-1/2 h-full bg-[#0a0514]/90 backdrop-blur-md border-r border-cyan-500/30 origin-left flex items-center justify-end pr-2 overflow-hidden shadow-inner"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-4 border border-fuchsia-500/20 rounded-tl-[70px] pointer-events-none flex flex-col justify-between p-4">
            <span className="text-[10px] text-cyan-500/50 font-mono font-bold">✦</span>
            <span className="text-[10px] text-cyan-500/50 font-mono font-bold">✦</span>
          </div>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 rounded-full border border-cyan-500/40 bg-[#130b2e] flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.2)] z-20 cursor-pointer"
          >
            <div className="w-4 h-4 rounded-full bg-cyan-400/80 border border-cyan-300 drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
          </motion.div>
        </motion.div>

        {/* RIGHT DOOR */}
        <motion.div
          animate={isOpening ? { x: '100%', rotateY: 45, skewY: 5, opacity: 0.1 } : { x: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="relative w-1/2 h-full bg-[#0a0514]/90 backdrop-blur-md border-l border-cyan-500/30 origin-right flex items-center justify-start pl-2 overflow-hidden shadow-inner"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-4 border border-fuchsia-500/20 rounded-tr-[70px] pointer-events-none flex flex-col justify-between p-4">
            <span className="text-[10px] text-cyan-500/50 font-mono font-bold">✦</span>
            <span className="text-[10px] text-cyan-500/50 font-mono font-bold">✦</span>
          </div>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 rounded-full border border-cyan-500/40 bg-[#130b2e] flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.2)] z-20 cursor-pointer"
          >
            <div className="w-4 h-4 rounded-full bg-cyan-400/80 border border-cyan-300 drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
          </motion.div>
        </motion.div>

        {/* Ambient Void Behind Doors */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#130b2e] via-[#0a0514] to-[#070514] -z-10 flex flex-col items-center justify-center p-6 text-center">
          <Moon className="text-cyan-400 animate-pulse mb-4 opacity-60 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" size={48} />
          <h4 className="font-display text-2xl text-purple-100 font-medium tracking-wide">Shashi's 18th</h4>
          <p className="font-serif italic text-xs text-fuchsia-400/80 mt-2">A magical realm awaits...</p>
        </div>
      </div>

      {/* Magical Bioluminescent Candles Stage */}
      <div className="relative w-full max-w-md h-24 mb-8">
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent blur-sm" />
        
        {diyas.map((diya) => (
          <div
            key={diya.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 transition-all cursor-crosshair group"
            style={{ left: `${diya.x}%`, top: `${diya.y}%` }}
            onMouseEnter={() => extinguishDiya(diya.id)}
            onTouchStart={() => extinguishDiya(diya.id)}
            onClick={() => extinguishDiya(diya.id)}
          >
            {/* Dark Enchanted Candle Base */}
            <div className="relative w-8 h-10 bg-gradient-to-b from-[#1a0f3c] to-[#0a0514] rounded-sm border border-cyan-500/20 shadow-[0_4px_10px_rgba(0,0,0,0.5)] flex items-center justify-center">
              <div className="absolute -top-[2px] w-8 h-[4px] bg-purple-900 rounded-full" />
              <div className="w-1 h-2 bg-cyan-900 rounded-full absolute -top-1" />
            </div>

            <AnimatePresence>
              {diya.isLit ? (
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: [1, 1.1, 0.9, 1.05, 1] }} exit={{ scale: 0, y: -10, opacity: 0, transition: { duration: 0.3 } }}
                  className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-6 origin-bottom flex flex-col items-center"
                >
                  {/* Bioluminescent blue/purple flame */}
                  <div className="w-2.5 h-6 bg-gradient-to-t from-cyan-400 via-fuchsia-400 to-white rounded-full animate-flicker relative shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
                  <div className="absolute -inset-4 rounded-full bg-cyan-500/20 blur-md pointer-events-none transition-all" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0.8, y: -5, scale: 0.8 }} animate={{ opacity: 0, y: -25, scale: 1.4, x: Math.random() * 8 - 4 }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 text-purple-400/50 pointer-events-none"
                >
                  <Wind size={12} className="animate-pulse" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="z-10 w-full max-w-sm">
        <AnimatePresence mode="wait">
          {!showInteractionPrompt ? (
            <motion.button
              key="initial-btn" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} onClick={handleOpenDoorClick}
              className="w-full py-4 rounded-2xl font-mono font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-3 cursor-pointer bg-[#130b2e]/80 text-cyan-400 border border-purple-500/30 hover:border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] backdrop-blur-md"
            >
              <span>{isMidnight || isBypassed ? 'Open the Portal' : 'Step Inside'}</span>
              <Sparkles size={14} className="text-fuchsia-400 animate-pulse drop-shadow-[0_0_5px_rgba(217,70,239,0.8)]" />
            </motion.button>
          ) : (
            <motion.div
              key="prompt-overlay" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0a0514]/90 backdrop-blur-md rounded-2xl p-5 text-center border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.15)]"
            >
              <h5 className="font-mono text-xs text-fuchsia-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2 mb-2">
                <Flame size={14} className="text-cyan-400 animate-pulse" />
                <span>Quick Step</span>
                <Flame size={14} className="text-cyan-400 animate-pulse" />
              </h5>
              <p className="font-serif italic text-xs text-purple-200/70 leading-relaxed">
                "Swipe, hover, or tap the magical flames to blow them out and open the portal!"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
