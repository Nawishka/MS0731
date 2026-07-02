import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Gift, Star, Calendar, ArrowUpRight, Flower, Sparkle } from 'lucide-react';
import { audio } from '../utils/audio';

// Silhouettes of a traditional Indian dancer representing the royal temple courtyard
const Dancer = ({ delay = 0, scaleX = 1 }: { delay?: number; scaleX?: number }) => (
  <motion.div
    initial={{ rotate: -4, y: 0 }}
    animate={{ 
      rotate: [4, -4, 4], 
      y: [0, -4, 0] 
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: delay
    }}
    style={{ transformOrigin: 'bottom center' }}
    className="w-16 h-28 text-gold-400/35 relative hidden sm:block select-none"
  >
    <svg className="w-full h-full filter drop-shadow-[0_0_10px_rgba(212,175,55,0.25)]" viewBox="0 0 100 150" fill="currentColor">
      {/* Crown / Head dress */}
      <path d="M50,15 C45,20 40,30 50,35 C60,30 55,20 50,15 Z" className="text-gold-300" />
      <circle cx="50" cy="35" r="9" />
      {/* Arms in classical pose */}
      <path d="M50,45 C30,50 15,45 10,60 C10,65 20,60 30,55 L35,70 L25,100 L45,125 L55,125 L75,100 L65,70 L70,55 C80,60 90,65 90,60 C90,45 70,50 50,45 Z" />
      {/* Skirt folds */}
      <path d="M25,100 C35,115 65,115 75,100 C70,95 30,95 25,100 Z" className="text-gold-300" opacity="0.6" />
      <circle cx="45" cy="127" r="3" className="text-amber-300" />
      <circle cx="55" cy="127" r="3" className="text-amber-300" />
    </svg>
  </motion.div>
);

export default function GrandFinale() {
  const [proposalAccepted, setProposalAccepted] = useState(false);

  const paragraphs = [
    "To Shashi, my absolute world,",
    "Today, on the thirty-first of July, the stars align over the temple arches to celebrate a moment eighteen years in the making. You have crossed the sacred threshold of adulthood with the same quiet grace, infinite warmth, and radiant elegance that you bring into my life every single day.",
    "Looking back at our journey, every shared walk, every cup of tea, and even the storms we sheltered from feel like deliberate brushstrokes in a cosmic masterpiece. You are my safe harbor, my guiding constellation, and my deepest joy. Even in the surreal spaces of my dreams, my soul chooses to protect, heal, and cherish you across every lifetime.",
    "As you stand on this beautiful new threshold, remember that eighteen is not just a number—it is the opening of a grand teakwood door into a world of limitless horizons. I promise to stand by you, to whisper courage when you doubt, to laugh with you in the quiet mornings, and to build a sanctuary of pure care, absolute peace, and eternal love.",
    "May your year be as radiant as temple gold, as deep as the midnight ocean, and as filled with magic as the stars over July. Happy 18th Birthday, my queen.",
    "With all my heart, forever and always,",
    "— Melan"
  ];

  const handleAcceptProposal = () => {
    setProposalAccepted(true);
    audio.playGoldenChime();
    // Re-play a second soft chime arpeggio for deeper resonance
    setTimeout(() => {
      audio.playDoorUnlock();
    }, 400);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-16 text-gold-100 flex flex-col items-center justify-center min-h-[95vh]" id="grand-finale-stage">
      {/* Background Soft Golden Bokeh Field */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '100%', x: `${Math.random() * 100}%`, opacity: 0, scale: Math.random() * 0.8 + 0.4 }}
            animate={{
              y: '-10%',
              opacity: [0, 0.4, 0.4, 0],
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.5,
            }}
            className="absolute w-4 h-4 md:w-6 md:h-6 rounded-full bg-gradient-to-t from-gold-500/20 to-amber-400/5 blur-sm"
          />
        ))}
      </div>

      {/* Main Layout Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start z-10 relative">
        
        {/* Left Column: The Media Monolith (Portrait Container A4 proportion) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', damping: 20, stiffness: 90 }}
            className="relative w-full max-w-[340px] aspect-[1/1.414] rounded-3xl overflow-hidden glass-panel-gold p-1.5 shadow-[0_30px_70px_rgba(212,175,55,0.12)] border border-gold-500/30"
            id="shashi-media-monolith"
          >
            {/* Inner rim glow */}
            <div className="absolute inset-0 rounded-3xl border border-gold-400/20 pointer-events-none z-20 m-1.5" />

            {/* Artistic Vector Poster representing Shashi (Queen of July) */}
            <div className="w-full h-full rounded-[20px] bg-gradient-to-b from-[#1c1208] via-[#0d0905] to-black relative flex flex-col items-center justify-between p-8 overflow-hidden">
              {/* Palace background texture */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:20px_20px]" />
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />

              {/* Top Details */}
              <div className="w-full flex justify-between items-center z-10 border-b border-gold-500/20 pb-4">
                <span className="font-mono text-[9px] text-gold-200 tracking-[0.2em] flex items-center gap-1">
                  <Calendar size={10} />
                  JULY 31, 2026
                </span>
                <span className="font-mono text-[9px] text-gold-400 tracking-[0.2em] font-semibold">
                  EST. 2008
                </span>
              </div>

              {/* Beautiful Center Vector Silhouette / Lotus Ornament */}
              <div className="relative py-8 flex flex-col items-center z-10">
                <motion.div
                  animate={{ 
                    rotate: 360,
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  className="w-32 h-32 rounded-full border border-gold-500/20 flex items-center justify-center relative"
                >
                  {/* Decorative nested rings */}
                  <div className="absolute inset-2 rounded-full border border-dashed border-gold-500/15" />
                  <div className="absolute inset-5 rounded-full border border-gold-500/10" />
                  
                  {/* Tiny stars on ring */}
                  <Star size={10} className="absolute -top-1 text-gold-400 animate-pulse" />
                  <Star size={10} className="absolute -bottom-1 text-gold-400 animate-pulse" style={{ animationDelay: '1s' }} />
                </motion.div>

                {/* Royal Lotus Vector Icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-gold-400">
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Heart className="text-gold-500" size={36} fill="currentColor" />
                  </motion.div>
                  <span className="font-display text-[11px] tracking-[0.4em] text-gold-300 font-bold uppercase mt-2">
                    SHASHI
                  </span>
                </div>
              </div>

              {/* Poster Footer */}
              <div className="w-full text-center z-10 pt-4 border-t border-gold-500/15">
                <h4 className="font-display text-xl text-gold-200 tracking-[0.25em] uppercase font-semibold">
                  The Queen Of July
                </h4>
                <p className="font-serif italic text-xs text-gold-100/50 mt-1">
                  "Perfect grace, age eighteen"
                </p>
              </div>
            </div>
          </motion.div>

          <p className="font-sans text-[10px] text-gold-400/40 text-center max-w-xs mt-4">
            * Melan can easily swap this vector with a beautiful portrait photo inside `GrandFinale.tsx` later.
          </p>
        </div>

        {/* Right Column: The Long-Form Chronological Letter */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-10">
          
          {/* Section Indicator */}
          <div className="space-y-1.5" id="finale-letter-header">
            <span className="font-sans text-[10px] tracking-[0.35em] text-gold-400 font-bold uppercase block">
              PHASE 04: THE COVENANT
            </span>
            <h3 className="font-display text-2xl md:text-4xl text-white tracking-wide font-semibold">
              Eighteen Years of Grace
            </h3>
            <div className="h-[1px] w-20 bg-gold-500/30" />
          </div>

          {/* Letter Content Blocks */}
          <div className="space-y-8 font-serif leading-relaxed text-sm md:text-base text-gold-100/90 max-w-2xl">
            {paragraphs.map((pText, pIdx) => {
              const isHeader = pIdx === 0;
              const isSign = pIdx === 5;
              const isAuthor = pIdx === 6;

              return (
                <motion.p
                  key={pIdx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.8, delay: pIdx * 0.15 }}
                  className={`${
                    isHeader 
                      ? 'font-display text-lg md:text-xl text-gold-300 tracking-wide font-semibold mb-6' 
                      : isSign
                        ? 'italic font-sans text-xs tracking-widest uppercase text-gold-400 font-semibold pt-4'
                        : isAuthor
                          ? 'font-display text-lg md:text-xl text-gold-300 font-bold tracking-widest pl-2 border-l-2 border-gold-500/40'
                          : 'text-justify text-xs md:text-[15px] font-light leading-loose tracking-wide'
                  }`}
                >
                  {pText}
                </motion.p>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sweet Proposals with Dancers Ceremony Block */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full max-w-3xl mt-24 p-8 md:p-12 rounded-3xl glass-panel-dark border border-gold-500/20 shadow-[0_20px_50px_rgba(212,175,55,0.06)] relative overflow-hidden text-center"
        id="proposal-dancers-block"
      >
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
        
        {/* Floating Dancers flanking the Proposal Container */}
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none opacity-80 sm:opacity-100">
          <Dancer delay={0} />
        </div>
        <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none opacity-80 sm:opacity-100">
          <Dancer delay={1.5} scaleX={-1} />
        </div>

        {/* Central Proposal Message */}
        <div className="max-w-md mx-auto space-y-6 relative z-10">
          <span className="font-sans text-[9px] tracking-[0.4em] text-gold-400 font-bold uppercase block">
            A SACRED COVENANT PROPOSAL
          </span>
          <h4 className="font-serif italic text-2xl md:text-3xl text-gold-50 leading-relaxed">
            "Did you ready to go memories with me forever, Shashi?"
          </h4>
          <p className="font-sans text-xs text-gold-200/50 leading-relaxed max-w-xs mx-auto">
            The temple dancers sway to ancient rhythm. Let our hearts align as you make your lifelong choice.
          </p>

          <div className="pt-4 min-h-[120px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {!proposalAccepted ? (
                <motion.button
                  key="accept-btn"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAcceptProposal}
                  className="px-10 py-4.5 bg-gradient-to-r from-gold-600 via-amber-500 to-gold-400 text-black font-sans font-extrabold text-xs tracking-[0.25em] uppercase rounded-2xl shadow-[0_8px_32px_rgba(212,175,55,0.25)] hover:shadow-[0_8px_40px_rgba(212,175,55,0.45)] cursor-pointer flex items-center gap-2 border border-gold-300/20"
                >
                  <Heart size={14} fill="currentColor" />
                  <span>Yes, I Will! 💖</span>
                </motion.button>
              ) : (
                <motion.div
                  key="confession-revealed"
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="space-y-4 p-6 rounded-2xl glass-panel-gold border border-gold-400/20 shadow-inner"
                >
                  <span className="text-3xl block">💍✨💛</span>
                  <h5 className="font-display text-lg text-gold-300 font-bold tracking-wider">
                    Our Hearts Sealed in Light!
                  </h5>
                  <p className="font-serif italic text-sm text-gold-100 leading-relaxed max-w-sm">
                    "From this beautiful 18th milestone onwards, every step I take will be to cherish, support, and protect you. Let us write our next chapter together, hand-in-hand."
                  </p>
                  <span className="font-sans text-[9px] tracking-widest text-gold-400/70 block uppercase">
                    — Melan's Eternal Promise
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* The Final Surprise Anchor Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 1 }}
        className="w-full text-center mt-20 pt-10 border-t border-white/5 z-10 relative"
        id="finale-surprise-section"
      >
        <p className="font-serif italic text-xs text-gold-200/40 max-w-sm mx-auto mb-5">
          "At the end of this journey, a final secret awaits Shashi's exploration..."
        </p>

        <motion.a
          whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(212,175,55,0.25)' }}
          whileTap={{ scale: 0.95 }}
          href="" // Exactly empty anchor as requested by Melan to manually inject surprise link
          className="inline-flex items-center gap-3 px-12 py-5 rounded-2xl bg-gradient-to-r from-gold-600 via-amber-500 to-gold-400 text-black font-sans font-extrabold text-sm tracking-[0.25em] uppercase hover:opacity-95 shadow-[0_8px_32px_rgba(212,175,55,0.25)] transition-all cursor-pointer"
          id="surprise-surprise-btn"
        >
          <Gift size={16} fill="currentColor" />
          <span>Our Sacred Gift</span>
          <ArrowUpRight size={16} />
        </motion.a>
      </motion.div>
    </div>
  );
}
