import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Smile, MessageCircle, Flower } from 'lucide-react';
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
    // Play evasive bubble/pop sound
    audio.playBubblePop();

    // Leap the button to a new random coordinate relative to its origin
    const rangeX = 220; // safe horizontal distance
    const rangeY = 120; // safe vertical distance
    
    let newX = (Math.random() - 0.5) * rangeX;
    let newY = (Math.random() - 0.5) * rangeY;

    // Guarantee the button moves at least 60px from current offset to feel snappy
    if (Math.abs(newX - evasionOffset.x) < 60) {
      newX += newX > 0 ? 60 : -60;
    }
    if (Math.abs(newY - evasionOffset.y) < 40) {
      newY += newY > 0 ? 40 : -40;
    }

    setEvasionOffset({ x: newX, y: newY });
    
    // Rotate playful phrases
    const randomPhrase = playfulPhrases[Math.floor(Math.random() * playfulPhrases.length)];
    setTooltip(randomPhrase);
    setShowTooltip(true);
    setClickCount((prev) => prev + 1);
  };

  const handlePositiveClick = () => {
    setIsSuccess(true);
    audio.playGoldenChime();
    triggerBurst(); // Spawn beautiful particles
    
    // Wait briefly for particles to fill the screen, then transition to Gallery
    setTimeout(() => {
      onSuccess();
    }, 2500);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[80vh] px-4 py-12" id="playful-interlude-stage">
      {/* Floating starry elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0.15, 0.4, 0.15],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5 + (i % 3) * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
            className="absolute text-gold-400/20"
            style={{
              top: `${(i * 17) % 90}%`,
              left: `${(i * 23) % 95}%`,
            }}
          >
            <Flower size={16 + (i % 2) * 8} />
          </motion.div>
        ))}

        {/* Small floating hearts */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            animate={{
              y: [0, -60, 0],
              rotate: [0, 15, -15, 0],
              opacity: [0.1, 0.35, 0.1],
            }}
            transition={{
              duration: 6 + i * 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.7,
            }}
            className="absolute text-gold-500/10"
            style={{
              top: `${(i * 21) % 80 + 10}%`,
              left: `${(i * 31) % 85 + 5}%`,
            }}
          >
            <Heart size={24} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Main Glassmorphic Challenge Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 120 }}
        className="w-full max-w-xl rounded-3xl glass-panel-dark p-8 md:p-12 text-center relative z-20 overflow-hidden shadow-[0_20px_50px_rgba(212,175,55,0.12)] border border-gold-500/25"
        id="playful-game-card"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-gold-500/5 rounded-full blur-2xl" />
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="game-play"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Header Info */}
              <div className="space-y-2">
                <span className="font-sans text-[10px] tracking-[0.3em] text-gold-400 font-semibold uppercase flex items-center justify-center gap-1.5">
                  <Flower size={12} className="text-gold-400" />
                  <span>A Quick Question</span>
                </span>
                <h3 className="font-display text-2xl md:text-4xl text-white tracking-wide font-semibold mt-1">
                  Ready for Memory Lane?
                </h3>
              </div>

              {/* Heart Graphic */}
              <div className="relative py-4 flex justify-center">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-20 h-20 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center shadow-[0_0_24px_rgba(212,175,55,0.25)] animate-pulse-gold"
                >
                  <Heart className="text-gold-400" size={36} fill="currentColor" />
                </motion.div>
                <div className="absolute -top-1 right-1/3 text-gold-300 animate-bounce">
                  <Sparkles size={16} />
                </div>
              </div>

              {/* The Question */}
              <div className="space-y-3">
                <p className="font-serif italic text-2xl text-gold-100 leading-relaxed">
                  "Are you ready to take a look back at some of our favorite memories together?"
                </p>
                <p className="font-sans text-xs text-gold-200/45">
                  Let's take a little walk down memory lane.
                </p>
              </div>

              {/* Interactive Button Group */}
              <div className="relative min-h-[140px] flex items-center justify-center gap-6 mt-8">
                {/* YES (Positive Button) */}
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePositiveClick}
                  className="px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-400 text-black font-sans font-bold rounded-2xl text-xs tracking-wider uppercase shadow-[0_8px_32px_rgba(212,175,55,0.25)] hover:shadow-[0_8px_40px_rgba(212,175,55,0.45)] transition-all cursor-pointer z-30 flex items-center gap-2"
                  id="love-yes-btn"
                >
                  <Heart size={14} fill="currentColor" />
                  <span>Yes, let's go! 💖</span>
                </motion.button>

                {/* NO (Evasive Negative Button) */}
                <motion.div
                  animate={{ x: evasionOffset.x, y: evasionOffset.y }}
                  transition={{ type: 'spring', damping: 10, stiffness: 180 }}
                  className="relative z-20"
                >
                  <button
                    onMouseEnter={handleNegativeApproach}
                    onTouchStart={handleNegativeApproach}
                    onClick={handleNegativeApproach}
                    className="px-6 py-3.5 rounded-2xl glass-panel-dark text-gold-200 hover:text-gold-400 border border-gold-500/20 hover:border-gold-400/50 hover:bg-amber-950/20 font-sans font-medium text-xs tracking-wider transition-all cursor-pointer select-none"
                    id="love-no-btn"
                  >
                    No, not yet... 🤫
                  </button>
                </motion.div>

                {/* Playful Floating Evasion Tooltip */}
                <AnimatePresence>
                  {showTooltip && (
                    <motion.div
                      key={clickCount}
                      initial={{ opacity: 0, scale: 0.8, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: -45 }}
                      exit={{ opacity: 0, scale: 0.8, y: -60 }}
                      className="absolute bg-black/95 text-gold-300 font-sans text-[11px] font-semibold py-1.5 px-3 rounded-full border border-gold-500/35 flex items-center gap-1.5 pointer-events-none shadow-lg z-40"
                      style={{
                        transform: `translate(${evasionOffset.x}px, ${evasionOffset.y}px)`,
                      }}
                    >
                      <MessageCircle size={10} className="text-gold-400 fill-gold-500/20" />
                      <span>{tooltip}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            /* Succession Celebration Screen */
            <motion.div
              key="game-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 py-8"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-6xl"
              >
                ✨💛✨
              </motion.div>
              <h3 className="font-display text-3xl text-gold-300 font-bold tracking-wide">
                I Knew You'd Say Yes! 😄
              </h3>
              <p className="font-serif italic text-lg text-gold-100/90 max-w-sm mx-auto">
                "Get ready for some of my absolute favorite moments with you..."
              </p>
              
              <div className="pt-4">
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="font-sans text-[10px] tracking-[0.25em] text-gold-400 uppercase font-semibold block"
                >
                  Loading Our Memories...
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
