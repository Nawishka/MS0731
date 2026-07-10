import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, MessageCircle, Flower2 } from 'lucide-react';
import { audio } from '../utils/audio';

interface PlayfulInterludeProps {
  onSuccess: () => void;
  triggerBurst: () => void;
}

export default function PlayfulInterlude({ onSuccess, triggerBurst }: PlayfulInterludeProps) {
  const [evasionOffset, setEvasionOffset] = useState({ x: 0, y: 0 });
  const [tooltip, setTooltip] = useState('Are you sure? 👀');
  const [showTooltip, setShowTooltip] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const playfulPhrases = [
    "Are you sure? ",
    "Not an option! 😉",
    "Nope, try again! ",
    "You have to click Yes! ",
    "Try clicking the other one! 😉",
    "Nice try! 😄",
    "No escaping the memories! ",
    "Hehe, you know you want to say Yes! 🤭"
  ];

  const handleNegativeApproach = () => {
    audio.playBubblePop();
    const rangeX = 220;
    const rangeY = 120;
    
    let newX = (Math.random() - 0.5) * rangeX;
    let newY = (Math.random() - 0.5) * rangeY;

    if (Math.abs(newX - evasionOffset.x) < 60) {
      newX += newX > 0 ? 60 : -60;
    }
    if (Math.abs(newY - evasionOffset.y) < 40) {
      newY += newY > 0 ? 40 : -40;
    }

    setEvasionOffset({ x: newX, y: newY });
    
    const randomPhrase = playfulPhrases[Math.floor(Math.random() * playfulPhrases.length)];
    setTooltip(randomPhrase);
    setShowTooltip(true);
    setClickCount((prev) => prev + 1);
  };

  const handlePositiveClick = () => {
    setIsSuccess(true);
    audio.playGoldenChime();
    triggerBurst();
    
    setTimeout(() => {
      onSuccess();
    }, 2500);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[80vh] px-4 py-12" id="playful-interlude-stage">
      
      {/* 🦋 Butterflies and Glowing Flowers 🦋 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(14)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -40, 0], x: [0, Math.sin(i) * 20, 0], opacity: [0.3, 0.7, 0.3], scale: [1, 1.1, 1] }}
            transition={{ duration: 6 + (i % 3) * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            className="absolute"
            style={{ top: `${(i * 17) % 90}%`, left: `${(i * 23) % 95}%` }}
          >
            {i % 3 === 0 ? (
              <motion.div animate={{ rotateY: [0, 60, 0] }} transition={{ duration: 0.3, repeat: Infinity }} className="text-xl drop-shadow-[0_0_5px_rgba(255,255,255,0.6)]">
                🦋
              </motion.div>
            ) : i % 3 === 1 ? (
              <Flower2 size={16 + (i % 2) * 8} className="text-fuchsia-300/60 drop-shadow-md" />
            ) : (
              <div className="w-2 h-2 rounded-full bg-cyan-200 shadow-[0_0_10px_3px_rgba(34,211,238,0.5)] animate-pulse" />
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', damping: 25, stiffness: 120 }}
        className="w-full max-w-xl rounded-[2.5rem] bg-white/10 backdrop-blur-2xl p-8 md:p-12 text-center relative z-20 overflow-hidden shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20"
      >
        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-fuchsia-400/20 rounded-full blur-3xl pointer-events-none" />

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div key="game-play" initial={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
              <div className="space-y-2">
                <span className="font-sans text-[10px] tracking-[0.3em] text-fuchsia-200 font-bold uppercase flex items-center justify-center gap-1.5 drop-shadow-sm">
                  <Sparkles size={12} className="text-white" />
                  <span>A Quick Question</span>
                </span>
                <h3 className="font-serif text-3xl md:text-4xl text-white font-medium mt-1 tracking-wide drop-shadow-md">
                  Ready for Memory Lane?
                </h3>
              </div>

              <div className="relative py-4 flex justify-center">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-20 h-20 rounded-full bg-white/10 border border-white/30 flex items-center justify-center shadow-inner backdrop-blur-md"
                >
                  <Heart className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" size={36} fill="currentColor" />
                </motion.div>
                <div className="absolute -top-1 right-1/3 text-fuchsia-300 animate-bounce drop-shadow-md">
                  <Sparkles size={16} />
                </div>
              </div>

              <div className="space-y-3 relative z-10">
                <p className="font-sans text-base text-purple-100/90 leading-relaxed max-w-sm mx-auto">
                  "Are you ready to take a look back at some of our favorite memories together?"
                </p>
              </div>

              <div className="relative min-h-[140px] flex items-center justify-center gap-6 mt-8 z-20">
                <motion.button
                  whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} onClick={handlePositiveClick}
                  className="px-8 py-4 bg-white/20 hover:bg-white/30 text-white font-sans font-bold rounded-2xl text-xs tracking-widest uppercase shadow-[0_4px_15px_rgba(0,0,0,0.2)] transition-all cursor-pointer flex items-center gap-2 border border-white/40 backdrop-blur-md"
                >
                  <Heart size={14} fill="currentColor" />
                  <span>Yes, let's go! 💖</span>
                </motion.button>

                <motion.div animate={{ x: evasionOffset.x, y: evasionOffset.y }} transition={{ type: 'spring', damping: 10, stiffness: 180 }} className="relative">
                  <button
                    onMouseEnter={handleNegativeApproach} onTouchStart={handleNegativeApproach} onClick={handleNegativeApproach}
                    className="px-6 py-3.5 rounded-2xl bg-black/10 text-white/60 hover:text-white border border-white/10 hover:border-white/30 font-sans font-semibold text-xs tracking-widest transition-all cursor-pointer select-none shadow-inner backdrop-blur-md"
                  >
                    No, not yet... 🤫
                  </button>
                </motion.div>

                <AnimatePresence>
                  {showTooltip && (
                    <motion.div
                      key={clickCount}
                      initial={{ opacity: 0, scale: 0.8, y: 15 }} animate={{ opacity: 1, scale: 1, y: -45 }} exit={{ opacity: 0, scale: 0.8, y: -60 }}
                      className="absolute bg-white/90 text-fuchsia-500 font-sans text-[11px] font-bold py-2 px-4 rounded-full border border-white flex items-center gap-1.5 pointer-events-none shadow-lg z-40"
                      style={{ transform: `translate(${evasionOffset.x}px, ${evasionOffset.y}px)` }}
                    >
                      <MessageCircle size={12} className="text-pink-400" />
                      <span>{tooltip}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div key="game-success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 py-8">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-6xl drop-shadow-lg">
                ✨💖✨
              </motion.div>
              <h3 className="font-serif text-3xl text-white font-medium tracking-wide drop-shadow-md">
                I Knew You'd Say Yes! 😄
              </h3>
              <p className="font-sans text-sm text-purple-100/80 max-w-sm mx-auto leading-relaxed">
                Get ready for some of my absolute favorite moments with you...
              </p>
              <div className="pt-4">
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} className="font-sans text-[10px] tracking-[0.4em] text-fuchsia-200 uppercase font-bold block drop-shadow-sm">
                  Loading Our Story...
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
