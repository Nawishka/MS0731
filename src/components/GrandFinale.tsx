import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Flower2, Gift } from 'lucide-react';
import { audio } from '../utils/audio';

export default function GrandFinale() {
  const [showSurprise, setShowSurprise] = useState(false);
  const [elements, setElements] = useState<{ id: number; type: string; left: number; delay: number; duration: number }[]>([]);

  // Generate random floating background elements (hearts, butterflies, flowers)
  useEffect(() => {
    const newElements = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      type: i % 3 === 0 ? 'heart' : i % 3 === 1 ? 'butterfly' : 'flower',
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 12 + Math.random() * 10,
    }));
    setElements(newElements);
  }, []);

  const handleSurpriseClick = () => {
    setShowSurprise(true);
    audio.playGoldenChime();
    setTimeout(() => audio.playHeartbeat(), 800);
  };

  return (
    <div className="relative w-full min-h-[85vh] flex flex-col items-center justify-center p-4 select-none" id="grand-finale-stage">
      
      {/* 🌟 Floating Background Elements just for this page 🌟 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {elements.map((el) => (
          <motion.div
            key={`bg-${el.id}`}
            initial={{ y: '110vh', opacity: 0, x: 0 }}
            animate={{ 
              y: '-10vh', 
              opacity: [0, 0.6, 0.6, 0],
              x: Math.sin(el.id) * 40
            }}
            transition={{ duration: el.duration, delay: el.delay, repeat: Infinity, ease: 'linear' }}
            className="absolute"
            style={{ left: `${el.left}%` }}
          >
            {el.type === 'heart' && <Heart size={14} className="text-fuchsia-400/40 fill-fuchsia-500/20 drop-shadow-[0_0_5px_rgba(217,70,239,0.5)]" />}
            {el.type === 'butterfly' && <span className="text-lg opacity-50 drop-shadow-md">🦋</span>}
            {el.type === 'flower' && <Flower2 size={16} className="text-cyan-300/40 drop-shadow-sm" />}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.5, type: 'spring', damping: 20 }}
        className="w-full max-w-2xl bg-white/10 backdrop-blur-2xl rounded-[3rem] p-8 md:p-14 text-center border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden z-10"
      >
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-fuchsia-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
        
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }} 
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="mx-auto w-20 h-20 bg-white/10 border border-white/30 rounded-full flex items-center justify-center mb-8 shadow-inner backdrop-blur-md"
        >
          <Heart className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" size={36} fill="currentColor" />
        </motion.div>

        <span className="font-sans text-[10px] tracking-[0.4em] text-fuchsia-200 font-bold uppercase block mb-3 drop-shadow-sm">
          LEVEL 18 UNLOCKED
        </span>
        
        <h1 className="font-serif text-4xl md:text-5xl text-white font-medium mb-8 drop-shadow-md tracking-wide">
          Happy Birthday, Shashi!
        </h1>
        
        <div className="space-y-6 font-sans text-sm md:text-base text-purple-50/90 leading-relaxed max-w-lg mx-auto relative z-10">
          <p>
            You finally made it to 18! Watching you grow into the amazing, beautiful person you are today has been the greatest privilege. 
          </p>
          <p>
            Thank you for being my safe haven, for the endless laughter, and for making every single day brighter just by being in it. Welcome to the best chapter of your life yet.
          </p>
          <p>
            I can't wait to see all the incredible things you are going to do, and I promise to be right here cheering you on every step of the way.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
          <p className="font-serif italic text-xl text-fuchsia-200 drop-shadow-sm mb-2">
            With all my love,
          </p>
          <p className="font-sans font-bold tracking-widest uppercase text-white text-sm drop-shadow-sm">
            Melan
          </p>
        </div>

        {/* The Final Interactive Button */}
        <div className="mt-10 relative z-20">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSurpriseClick}
            className="px-8 py-3.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-sans font-bold text-xs tracking-widest uppercase shadow-[0_4px_15px_rgba(0,0,0,0.2)] border border-white/30 transition-all cursor-pointer inline-flex items-center gap-2 backdrop-blur-md"
          >
            <Gift size={16} className="animate-pulse text-fuchsia-200" />
            <span>I've finished reading 💖</span>
          </motion.button>
        </div>

        {/* Decorative corner pieces */}
        <Flower2 className="absolute bottom-6 left-6 text-white/20" size={24} />
        <Sparkles className="absolute top-6 right-6 text-cyan-200/40" size={24} />
      </motion.div>

      {/* 💖 THE HEART-MELTING SURPRISE MODAL 💖 */}
      <AnimatePresence>
        {showSurprise && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
          >
            {/* Cute exploding stickers in the background of the modal */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={`sticker-${i}`}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0], 
                    scale: Math.random() * 1.5 + 0.8,
                    x: (Math.random() - 0.5) * window.innerWidth, 
                    y: (Math.random() - 0.5) * window.innerHeight 
                  }}
                  transition={{ duration: 3 + Math.random() * 2, delay: Math.random() * 0.5, ease: 'easeOut', repeat: Infinity }}
                  className="absolute top-1/2 left-1/2 text-3xl md:text-5xl drop-shadow-lg"
                >
                  {['🫂', '💋', '👩‍❤️‍👨', '🥺', '💖', '🥰', '🦋', '✨'][Math.floor(Math.random() * 8)]}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.2 }}
              className="w-full max-w-md bg-white/10 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-12 text-center border border-white/30 shadow-[0_10px_50px_rgba(217,70,239,0.3)] relative z-10"
            >
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-6xl mb-6 drop-shadow-xl"
              >
                👩‍❤️‍💋‍👨
              </motion.div>
              
              <h2 className="font-serif text-3xl md:text-4xl text-white font-medium mb-4 drop-shadow-md">
                I Love You Endlessly
              </h2>
              
              <p className="font-sans text-sm text-fuchsia-100/90 leading-relaxed mb-8">
                Thank you for being my absolute favorite person in the entire world. Here is to a lifetime of beautiful moments, crazy adventures, and endless love together.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSurprise(false)}
                className="w-full py-4 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-sans font-bold text-xs uppercase tracking-widest shadow-inner border border-white/40 transition-all backdrop-blur-md flex items-center justify-center gap-2"
              >
                <span>Love you too 🥺💖</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
