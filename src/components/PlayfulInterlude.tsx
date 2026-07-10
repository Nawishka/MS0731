import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, MessageCircle, Moon, Flower } from 'lucide-react';
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
      
      {/* Deep Magical Atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -40, 0], x: [0, Math.sin(i) * 20, 0], opacity: [0.1, 0.4, 0.1], scale: [1, 1.1, 1] }}
            transition={{ duration: 6 + (i % 3) * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            className="absolute"
            style={{ top: `${(i * 17) % 90}%`, left: `${(i * 23) % 95}%` }}
          >
            {i % 2 === 0 ? <Flower size={16 + (i % 2) * 8} className="text-cyan-500/20 drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]" /> : <Moon size={14 + i * 2} className="text-fuchsia-500/20" />}
          </motion.div>
        ))}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            animate={{ y: [0, -60, 0], rotate: [0, 15, -15, 0], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 7 + i * 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
            className="absolute text-purple-400/20"
            style={{ top: `${(i * 21) % 80 + 10}%`, left: `${(i * 31) % 85 + 5}%` }}
          >
            <Heart size={24} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 120 }}
        className="w-full max-w-xl rounded-[2.5rem] bg-[#130b2e]/60 backdrop-blur-xl p-8 md:p-12 text-center relative z-20 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-purple-500/20"
      >
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none" />

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div key="game-play" initial={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
              <div className="space-y-2">
                <span className="font-mono text-[10px] tracking-[0.3em] text-cyan-400 font-bold uppercase flex items-center justify-center gap-1.5 drop-shadow-[0_0_5px_rgba(6,182,212,0.4)]">
                  <Sparkles size={12} className="text-fuchsia-400" />
                  <span>A Quick Question</span>
                </span>
                <h3 className="font-display text-3xl md:text-4xl text-purple-50 font-medium mt-1 tracking-wide">
                  Ready for Memory Lane?
                </h3>
              </div>

              <div className="relative py-4 flex justify-center">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-20 h-20 rounded-full bg-[#0a0514]/80 border border-purple-500/30 flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.2)]"
                >
                  <Heart className="text-fuchsia-400 drop-shadow-[0_0_10px_rgba(217,70,239,0.6)]" size={36} fill="currentColor" />
                </motion.div>
                <div className="absolute -top-1 right-1/3 text-cyan-400 animate-bounce drop-shadow-[0_0_5px_rgba(6,182,212,0.6)]">
                  <Sparkles size={16} />
                </div>
              </div>

              <div className="space-y-3 relative z-10">
                <p className="font-serif italic text-lg text-purple-100/90 leading-relaxed max-w-sm mx-auto">
                  "Are you ready to take a look back at some of our favorite memories together?"
                </p>
              </div>

              <div className="relative min-h-[140px] flex items-center justify-center gap-6 mt-8 z-20">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePositiveClick}
                  className="px-8 py-4 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-600 text-white font-mono font-bold rounded-2xl text-xs tracking-widest uppercase shadow-[0_0_20px_rgba(192,38,211,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.4)] transition-all cursor-pointer flex items-center gap-2 border border-white/10"
                >
                  <Heart size={14} fill="currentColor" />
                  <span>Yes, let's go! 💖</span>
                </motion.button>

                <motion.div animate={{ x: evasionOffset.x, y: evasionOffset.y }} transition={{ type: 'spring', damping: 10, stiffness: 180 }} className="relative">
                  <button
                    onMouseEnter={handleNegativeApproach} onTouchStart={handleNegativeApproach} onClick={handleNegativeApproach}
                    className="px-6 py-3.5 rounded-2xl bg-[#0a0514]/80 text-purple-300/60 hover:text-cyan-300 border border-purple-500/30 hover:border-cyan-500/50 font-mono font-semibold text-xs tracking-widest transition-all cursor-pointer select-none shadow-sm"
                  >
                    No, not yet... 🤫
                  </button>
                </motion.div>

                <AnimatePresence>
                  {showTooltip && (
                    <motion.div
                      key={clickCount}
                      initial={{ opacity: 0, scale: 0.8, y: 15 }} animate={{ opacity: 1, scale: 1, y: -45 }} exit={{ opacity: 0, scale: 0.8, y: -60 }}
                      className="absolute bg-[#0a0514]/95 text-fuchsia-300 font-sans text-[11px] font-bold py-2 px-4 rounded-full border border-fuchsia-500/30 flex items-center gap-1.5 pointer-events-none shadow-[0_0_15px_rgba(217,70,239,0.2)] z-40"
                      style={{ transform: `translate(${evasionOffset.x}px, ${evasionOffset.y}px)` }}
                    >
                      <MessageCircle size={12} className="text-cyan-400" />
                      <span>{tooltip}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div key="game-success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 py-8">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-6xl drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]">
                ✨💖✨
              </motion.div>
              <h3 className="font-display text-3xl text-cyan-400 font-medium tracking-wide drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]">
                I Knew You'd Say Yes! 😄
              </h3>
              <p className="font-serif italic text-sm text-purple-200/80 max-w-sm mx-auto leading-relaxed">
                "Get ready for some of my absolute favorite moments with you..."
              </p>
              <div className="pt-4">
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} className="font-mono text-[10px] tracking-[0.4em] text-fuchsia-400 uppercase font-bold block drop-shadow-[0_0_5px_rgba(217,70,239,0.4)]">
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
