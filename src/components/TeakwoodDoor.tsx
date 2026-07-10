import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Wind, Flame, Heart } from 'lucide-react';
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

  // Initialize 5 soft romantic candles (keeping the 'diyas' variable name so the code works perfectly)
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
            className="fixed inset-0 bg-gradient-to-r from-rose-100 via-white to-pink-100 z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="text-center mb-6 z-10">
        <span className="font-sans text-[10px] tracking-[0.3em] text-rose-400 font-bold uppercase block mb-2">
          JULY 31 IS HERE
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-slate-800 font-medium mb-4 drop-shadow-sm">
          Happy 18th, Shashi!
        </h2>
        <p className="font-sans text-sm text-slate-500 max-w-sm mx-auto mb-6 leading-relaxed">
          The wait is finally over. Let's step into this new chapter together.
        </p>

        {!isMidnight ? (
          <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto p-4 rounded-3xl bg-white/70 border border-white shadow-[0_10px_30px_rgba(255,192,203,0.3)]">
            {Object.entries(timeLeft).map(([key, val]) => (
              <div key={key} className="text-center">
                <div className="font-serif text-3xl text-rose-500 font-medium">
                  {String(val).padStart(2, '0')}
                </div>
                <div className="font-sans text-[9px] text-slate-400 uppercase tracking-widest mt-1 font-semibold">
                  {key}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-rose-50 border border-rose-200 text-rose-500 font-sans text-xs uppercase tracking-widest font-bold shadow-sm animate-pulse"
          >
            <Heart size={14} className="fill-rose-200" />
            <span>IT'S TIME</span>
            <Heart size={14} className="fill-rose-200" />
          </motion.div>
        )}
      </div>

      {/* Elegant White French Doors */}
      <div className="relative w-full max-w-[320px] aspect-[3/4.5] md:max-w-[360px] rounded-t-[100px] border-[10px] border-white/90 overflow-hidden shadow-[0_25px_60px_-15px_rgba(255,192,203,0.5)] bg-rose-50/50 flex mb-8">
        
        {/* LEFT DOOR */}
        <motion.div
          animate={isOpening ? { x: '-100%', rotateY: -45, skewY: -5, opacity: 0.1 } : { x: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="relative w-1/2 h-full bg-white/80 backdrop-blur-sm border-r border-rose-100 origin-left flex items-center justify-end pr-2 overflow-hidden shadow-inner"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-4 border border-rose-200/50 rounded-tl-[70px] pointer-events-none flex flex-col justify-between p-4">
            <span className="text-[10px] text-rose-300 font-sans font-bold">✦</span>
            <span className="text-[10px] text-rose-300 font-sans font-bold">✦</span>
          </div>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 rounded-full border border-rose-200 bg-white flex items-center justify-center shadow-md z-20 cursor-pointer"
          >
            <div className="w-4 h-4 rounded-full bg-rose-100 border border-rose-200" />
          </motion.div>
        </motion.div>

        {/* RIGHT DOOR */}
        <motion.div
          animate={isOpening ? { x: '100%', rotateY: 45, skewY: 5, opacity: 0.1 } : { x: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="relative w-1/2 h-full bg-white/80 backdrop-blur-sm border-l border-rose-100 origin-right flex items-center justify-start pl-2 overflow-hidden shadow-inner"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-4 border border-rose-200/50 rounded-tr-[70px] pointer-events-none flex flex-col justify-between p-4">
            <span className="text-[10px] text-rose-300 font-sans font-bold">✦</span>
            <span className="text-[10px] text-rose-300 font-sans font-bold">✦</span>
          </div>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 rounded-full border border-rose-200 bg-white flex items-center justify-center shadow-md z-20 cursor-pointer"
          >
            <div className="w-4 h-4 rounded-full bg-rose-100 border border-rose-200" />
          </motion.div>
        </motion.div>

        {/* Ambient Void Behind Doors (Soft glowing light) */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-rose-50 to-pink-100 -z-10 flex flex-col items-center justify-center p-6 text-center">
          <Sparkles className="text-rose-400 animate-spin-slow mb-4 opacity-60" size={48} />
          <h4 className="font-serif text-2xl text-rose-500 font-medium">Shashi's 18th</h4>
          <p className="font-sans text-xs text-rose-400/80 mt-2">A beautiful journey awaits...</p>
        </div>
      </div>

      {/* Soft Candles Stage */}
      <div className="relative w-full max-w-md h-24 mb-8">
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-rose-200 to-transparent blur-sm" />
        
        {diyas.map((diya) => (
          <div
            key={diya.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 transition-all cursor-crosshair group"
            style={{ left: `${diya.x}%`, top: `${diya.y}%` }}
            onMouseEnter={() => extinguishDiya(diya.id)}
            onTouchStart={() => extinguishDiya(diya.id)}
            onClick={() => extinguishDiya(diya.id)}
          >
            {/* White/Pink Candle Base */}
            <div className="relative w-8 h-10 bg-gradient-to-b from-white to-rose-50 rounded-sm border border-rose-100 shadow-[0_4px_10px_rgba(255,192,203,0.3)] flex items-center justify-center">
              <div className="absolute -top-[2px] w-8 h-[4px] bg-rose-100 rounded-full" />
              <div className="w-1 h-2 bg-slate-800/40 rounded-full absolute -top-1" />
            </div>

            <AnimatePresence>
              {diya.isLit ? (
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: [1, 1.1, 0.9, 1.05, 1] }} exit={{ scale: 0, y: -10, opacity: 0, transition: { duration: 0.3 } }}
                  className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-6 origin-bottom flex flex-col items-center"
                >
                  <div className="w-2.5 h-5 bg-gradient-to-t from-orange-300 via-yellow-200 to-white rounded-full animate-flicker relative shadow-[0_0_10px_rgba(255,165,0,0.5)]" />
                  <div className="absolute -inset-3 rounded-full bg-orange-200/20 blur-md pointer-events-none transition-all" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0.8, y: -5, scale: 0.8 }} animate={{ opacity: 0, y: -25, scale: 1.4, x: Math.random() * 8 - 4 }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 text-slate-400 pointer-events-none"
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
              className="w-full py-4 rounded-2xl font-sans font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-3 cursor-pointer bg-white text-rose-500 border border-white hover:border-rose-200 shadow-[0_8px_30px_rgba(255,192,203,0.4)]"
            >
              <span>{isMidnight || isBypassed ? 'Open the Door' : 'Step Inside'}</span>
              <Sparkles size={14} className="text-pink-400 animate-pulse" />
            </motion.button>
          ) : (
            <motion.div
              key="prompt-overlay" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-5 text-center border border-white shadow-[0_10px_30px_rgba(255,192,203,0.3)]"
            >
              <h5 className="font-sans text-xs text-rose-500 font-bold uppercase tracking-widest flex items-center justify-center gap-2 mb-2">
                <Flame size={14} className="text-orange-400 animate-pulse" />
                <span>Quick Step</span>
                <Flame size={14} className="text-orange-400 animate-pulse" />
              </h5>
              <p className="font-sans text-xs text-slate-500 leading-relaxed">
                Swipe, hover, or tap the little candles to blow out the flames and open the door!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
