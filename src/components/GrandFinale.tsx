import { motion } from 'motion/react';
import { Heart, Sparkles, Flower2 } from 'lucide-react';

export default function GrandFinale() {
  return (
    <div className="relative w-full min-h-[85vh] flex flex-col items-center justify-center p-4 select-none" id="grand-finale-stage">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.5, type: 'spring', damping: 20 }}
        className="w-full max-w-2xl bg-white/10 backdrop-blur-2xl rounded-[3rem] p-8 md:p-14 text-center border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden"
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

        {/* Decorative corner pieces */}
        <Flower2 className="absolute bottom-6 left-6 text-white/20" size={24} />
        <Sparkles className="absolute top-6 right-6 text-cyan-200/40" size={24} />
      </motion.div>
    </div>
  );
}
