import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Compass, ShieldAlert, HeartPulse, Sparkle, Flower } from 'lucide-react';
import { MemoryItem } from '../types';
import { audio } from '../utils/audio';

interface MemoryGalleryProps {
  onProceed: () => void;
}

export default function MemoryGallery({ onProceed }: MemoryGalleryProps) {
  const [clickedHeartId, setClickedHeartId] = useState<string | null>(null);

  const memories: MemoryItem[] = [
    {
      id: 'mem1',
      date: 'July 2024',
      title: 'The Golden Canopy Walk',
      description: 'A serene stroll through traditional South Indian palace archways, where sunlight filtered through hand-carved mahogany, bathing us in warm temple gold and soft teakwood shadows.',
      quote: '"Time slowed down to match the heavy cadence of the ancient chimes, echoing our footsteps."',
      gradient: 'linear-gradient(135deg, #1e130c 0%, #9a7a35 100%)',
      illustrationType: 'temple',
      type: 'REAL',
    },
    {
      id: 'mem2',
      date: 'October 2024',
      title: 'Midnight Chai & Stardust',
      description: 'Cuddled close under a single blanket, sipping aromatic masala tea. The heat of the clay cups keeping our fingers warm while we whispered secrets to the cool, deep October breeze.',
      quote: '"The universe shrunk to the size of a single clay cup, brimming with spice and silent promises."',
      gradient: 'linear-gradient(135deg, #0f1016 0%, #2b1810 100%)',
      illustrationType: 'waves',
      type: 'REAL',
    },
    {
      id: 'mem3',
      date: 'January 2025',
      title: 'Under the Monsoon Canopy',
      description: 'Sought shelter under an overgrown banyan tree as torrential rains washed the streets. The heavy, warm earth scent and the steady drumming of water drops creating a shelter of pure peace.',
      quote: '"The storm outside only highlighted the perfect, quiet safety inside our small green sanctuary."',
      gradient: 'linear-gradient(135deg, #09101d 0%, #152238 100%)',
      illustrationType: 'constellation',
      type: 'REAL',
    },
    {
      id: 'surreal-healing',
      date: 'The Dream-Timeline',
      title: 'The Cosmic Sanctuary of Healing',
      description: 'An unforgettable encounter in an alternate reality of pure care. Hand-in-hand in a quiet pavilion where floating golden lifelines synchronized to a celestial heartbeat. A profound moment where all physical frailties dissolved, and a serene light of healing, absolute comfort, and perfect peace enveloped your soul across lifetimes.',
      quote: '"A profound covenant of pure protection, care, and total relief—where our breathing aligned and every burden melted into warm embers."',
      gradient: 'linear-gradient(135deg, #0d1215 0%, #451212 50%, #d4af37 100%)',
      illustrationType: 'healing-pulse',
      type: 'SURREAL',
    },
    {
      id: 'mem4',
      date: 'April 2025',
      title: 'The Whispering Bamboo Grove',
      description: 'Lost in conversation as towering bamboo reeds swayed gently like traditional silk fans. We watched fireflies trace random glowing orbits of amber light in the velvet dark.',
      quote: '"Every soft creak of the bamboo felt like an ancient blessing, congratulating us on a love that grows quietly."',
      gradient: 'linear-gradient(135deg, #101912 0%, #533e14 100%)',
      illustrationType: 'stars',
      type: 'REAL',
    },
    {
      id: 'mem5',
      date: 'July 30, 2026',
      title: 'The Threshold of the 18th',
      description: 'Standing hand-in-hand, looking up at the July sky just hours before the transition. A constellation of wishes aligning over Shashi, welcoming her into the grand elegance of adulthood.',
      quote: '"Eighteen years of grace, distilled into a single starlit night, waiting to burst into celebration."',
      gradient: 'linear-gradient(135deg, #150909 0%, #6e1c1c 100%)',
      illustrationType: 'heart',
      type: 'REAL',
    },
  ];

  const triggerHeartBurst = (id: string) => {
    setClickedHeartId(id);
    if (id === 'surreal-healing') {
      audio.playHeartbeat();
    } else {
      audio.playGoldenChime();
    }
    setTimeout(() => setClickedHeartId(null), 1000);
  };

  // Render high-end geometric abstract art based on illustration type
  const renderIllustration = (type: string) => {
    switch (type) {
      case 'temple':
        return (
          <svg className="w-full h-full opacity-35" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="80" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4 4" />
            <rect x="50" y="50" width="100" height="100" rx="10" stroke="#D4AF37" strokeWidth="0.5" />
            <polygon points="100,20 160,80 40,80" stroke="#D4AF37" strokeWidth="0.75" fill="rgba(212,175,55,0.05)" />
            <circle cx="100" cy="100" r="15" stroke="#D4AF37" strokeWidth="1" />
            <line x1="100" y1="20" x2="100" y2="180" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="2 2" />
          </svg>
        );
      case 'waves':
        return (
          <svg className="w-full h-full opacity-35 animate-pulse-gold" viewBox="0 0 200 200" fill="none">
            <path d="M10,100 C50,60 70,140 100,100 C130,60 150,140 190,100" stroke="#D4AF37" strokeWidth="1" />
            <path d="M10,120 C50,80 70,160 100,120 C130,80 150,160 190,120" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
            <path d="M10,80 C50,40 70,120 100,80 C130,40 150,120 190,80" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
            <circle cx="100" cy="100" r="30" stroke="#F0C243" strokeWidth="0.5" strokeDasharray="6 3" />
          </svg>
        );
      case 'constellation':
        return (
          <svg className="w-full h-full opacity-40" viewBox="0 0 200 200" fill="none">
            <circle cx="50" cy="60" r="3" fill="#D4AF37" />
            <circle cx="150" cy="80" r="4" fill="#F0C243" className="animate-pulse" />
            <circle cx="90" cy="140" r="3" fill="#D4AF37" />
            <circle cx="110" cy="40" r="2" fill="#F4F1EA" />
            <line x1="50" y1="60" x2="110" y2="40" stroke="#D4AF37" strokeWidth="0.5" />
            <line x1="110" y1="40" x2="150" y2="80" stroke="#D4AF37" strokeWidth="0.5" />
            <line x1="150" y1="80" x2="90" y2="140" stroke="#F0C243" strokeWidth="0.5" />
            <line x1="90" y1="140" x2="50" y2="60" stroke="#D4AF37" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="60" stroke="#F4F1EA" strokeWidth="0.25" strokeDasharray="2 4" />
          </svg>
        );
      case 'healing-pulse':
        return (
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            {/* Pulsing circular geometric waves representing cosmic healing */}
            <div className="absolute w-44 h-44 rounded-full border border-gold-500/10 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute w-32 h-32 rounded-full border border-amber-500/15 animate-ping" style={{ animationDuration: '4s' }} />
            
            {/* Heartbeat lifeline grid */}
            <svg className="w-full h-full opacity-65" viewBox="0 0 300 200" fill="none">
              <path 
                d="M10,100 L80,100 L95,80 L105,130 L115,100 L140,100 L155,50 L170,160 L185,100 L210,100 L220,90 L225,110 L230,100 L290,100" 
                stroke="#D4AF37" 
                strokeWidth="1.5" 
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-lifeline"
                style={{
                  strokeDasharray: '300%',
                  strokeDashoffset: '300%',
                }}
              />
              <circle cx="162" cy="105" r="8" fill="rgba(212,175,55,0.2)" className="animate-pulse" />
              {/* Star sparkles over lifeline */}
              <circle cx="100" cy="100" r="2" fill="#F0C243" />
              <circle cx="162" cy="105" r="2.5" fill="#D4AF37" />
              <circle cx="225" cy="100" r="2" fill="#F0C243" />
            </svg>
          </div>
        );
      case 'stars':
        return (
          <svg className="w-full h-full opacity-30" viewBox="0 0 200 200" fill="none">
            <polygon points="100,40 105,55 120,55 108,65 112,80 100,70 88,80 92,65 80,55 95,55" fill="#F0C243" />
            <circle cx="100" cy="60" r="40" stroke="#D4AF37" strokeWidth="0.5" />
            <circle cx="100" cy="60" r="50" stroke="#D4AF37" strokeWidth="0.25" strokeDasharray="3 3" />
            <line x1="40" y1="60" x2="160" y2="60" stroke="#D4AF37" strokeWidth="0.5" />
          </svg>
        );
      case 'heart':
        return (
          <svg className="w-full h-full opacity-35 animate-float-medium" viewBox="0 0 200 200" fill="none">
            <path d="M100,140 C100,140 40,90 40,55 C40,30 60,15 80,15 C92,15 100,25 100,25 C100,25 108,15 120,15 C140,15 160,30 160,55 C160,90 100,140 100,140 Z" stroke="#D4AF37" strokeWidth="0.75" fill="rgba(212,175,55,0.03)" />
            <circle cx="100" cy="55" r="15" stroke="#F0C243" strokeWidth="0.5" strokeDasharray="4 2" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 py-16 text-white" id="memory-gallery-stage">
      {/* Dynamic ambient header */}
      <div className="text-center max-w-2xl mx-auto mb-20 z-10 relative">
        <span className="font-sans text-[10px] tracking-[0.35em] text-gold-400 font-bold uppercase flex items-center justify-center gap-2 mb-3">
          <Compass className="animate-spin-slow text-gold-400" size={14} />
          <span>PHASE 03: THE CHRONOLOGICAL STREAM</span>
        </span>
        <h2 className="font-display text-3xl md:text-5xl tracking-widest font-bold mb-4 bg-gradient-to-r from-gold-100 via-amber-300 to-gold-400 bg-clip-text text-transparent">
          Bespoke Memories
        </h2>
        <p className="font-serif italic text-lg text-gold-100/70 leading-relaxed">
          "Each card floats in weightless time—capturing fragments of laughter, warm whispers, and celestial covenants that bind us."
        </p>
      </div>

      {/* Floating Sparkles in Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(8)].map((_, idx) => (
          <div
            key={idx}
            className="absolute w-2 h-2 rounded-full bg-gold-400/20 animate-pulse-gold"
            style={{
              top: `${(idx * 14) % 85 + 5}%`,
              left: `${(idx * 27) % 90 + 5}%`,
              animationDelay: `${idx * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* The Scroll-Driven Chronological Sequence */}
      <div className="space-y-24 md:space-y-36 relative z-10 max-w-4xl mx-auto">
        {/* Visual Connector Timeline Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-20 w-[1px] bg-gradient-to-b from-gold-500/40 via-amber-500/20 to-gold-500/5 hidden md:block" />

        {memories.map((item, index) => {
          const isLeft = index % 2 === 0;
          const isSurreal = item.type === 'SURREAL';

          return (
            <motion.div
              key={item.id}
              initial={{ 
                opacity: 0, 
                y: 50, 
                rotateY: isLeft ? -15 : 15,
                z: -50
              }}
              whileInView={{ 
                opacity: 1, 
                y: 0, 
                rotateY: 0,
                z: 0
              }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ type: 'spring', damping: 20, stiffness: 80, delay: 0.1 }}
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Card Container with custom 3D Perspective Depth */}
              <div className="w-full md:w-1/2 flex justify-center perspective-[1200px]" id={`memory-card-wrap-${item.id}`}>
                <motion.div
                  whileHover={{ 
                    scale: 1.03, 
                    rotateY: isLeft ? 5 : -5,
                    rotateX: 3,
                    boxShadow: isSurreal 
                      ? '0 20px 50px rgba(212,175,55,0.15), 0 0 30px rgba(69,18,18,0.4)' 
                      : '0 20px 40px rgba(0,0,0,0.6)'
                  }}
                  transition={{ type: 'spring', damping: 15, stiffness: 150 }}
                  className={`w-full max-w-[380px] rounded-3xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.5)] border ${
                    isSurreal 
                      ? 'glass-panel-gold border-gold-500/35 bg-gradient-to-b from-[#150a0a] via-[#220d0d] to-[#0c0d10]' 
                      : 'glass-panel-dark border-gold-500/20 hover:border-gold-400/40'
                  }`}
                  id={`memory-${item.id}`}
                >
                  {/* Visual Artwork Box with Scenic Gradients */}
                  <div 
                    className="relative w-full aspect-[4/3] flex items-center justify-center overflow-hidden border-b border-white/10"
                    style={{ background: item.gradient }}
                  >
                    <div className="absolute inset-0 bg-black/20" />
                    {/* Render high-end vectors */}
                    <div className="absolute inset-4 flex items-center justify-center">
                      {renderIllustration(item.illustrationType)}
                    </div>

                    {/* Floating Heart Button */}
                    <button
                      onClick={() => triggerHeartBurst(item.id)}
                      className="absolute bottom-4 right-4 w-10 h-10 rounded-full glass-panel-dark hover:bg-white/10 border border-gold-500/20 flex items-center justify-center group/btn transition-transform active:scale-90"
                      aria-label="Send love"
                      id={`like-memory-btn-${item.id}`}
                    >
                      <Heart 
                        className={`text-gold-300 group-hover/btn:text-gold-500 group-hover/btn:scale-110 transition-all ${
                          clickedHeartId === item.id ? 'text-gold-500 scale-125' : ''
                        }`}
                        size={16} 
                        fill={clickedHeartId === item.id ? 'currentColor' : 'none'}
                      />
                    </button>

                    {/* Left corner tag */}
                    <span className="absolute top-4 left-4 py-1 px-3 rounded-full bg-black/45 backdrop-blur-md border border-white/10 font-mono text-[9px] text-gold-300 uppercase tracking-widest">
                      {item.date}
                    </span>

                    {/* Micro heart floating bursts on click */}
                    <AnimatePresence>
                      {clickedHeartId === item.id && (
                        [...Array(6)].map((_, pi) => (
                          <motion.div
                            key={pi}
                            initial={{ x: 120, y: 110, opacity: 1, scale: 0.5 }}
                            animate={{ 
                              x: 120 + (Math.random() * 80 - 40), 
                              y: 110 - (Math.random() * 80 + 30), 
                              opacity: 0,
                              scale: 1.2,
                              rotate: Math.random() * 45 - 22.5
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="absolute text-gold-500 pointer-events-none z-20"
                          >
                            <Heart size={14} fill="currentColor" />
                          </motion.div>
                        ))
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Card Content block */}
                  <div className="p-6 md:p-8 space-y-4">
                    <div className="flex items-center gap-2">
                      {isSurreal ? (
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-gold-500/10 border border-gold-500/30 text-[9px] font-sans font-semibold uppercase text-gold-300 tracking-wider">
                          <HeartPulse size={10} className="animate-pulse" />
                          <span>Ethereal Dream Element</span>
                        </div>
                      ) : (
                        <span className="font-mono text-[9px] text-gold-400 uppercase tracking-[0.2em]">
                          Milestone Memory
                        </span>
                      )}
                    </div>

                    <h4 className="font-display text-xl md:text-2xl text-white font-semibold tracking-wide">
                      {item.title}
                    </h4>

                    <p className="font-sans text-xs md:text-sm text-gold-100/70 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="relative pt-4 border-t border-white/5">
                      <p className="font-serif italic text-xs text-gold-200/80 leading-relaxed pr-6 pl-2 border-l border-gold-500/30">
                        {item.quote}
                      </p>
                      <Sparkle className="absolute right-0 bottom-0 text-gold-500/25 animate-pulse" size={14} />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Text spacer/Timeline Indicator for desktop alignment */}
              <div className="w-full md:w-1/2 hidden md:flex flex-col items-center justify-center p-6 text-center select-none">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  className="w-10 h-10 rounded-full border border-gold-500/30 bg-black/60 flex items-center justify-center relative shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                >
                  <div className="w-3 h-3 rounded-full bg-gold-500 animate-pulse" />
                  {/* Glowing ring */}
                  <div className="absolute inset-0 rounded-full border border-gold-500 animate-ping opacity-25" style={{ animationDuration: '3s' }} />
                </motion.div>
                <div className="mt-4 font-display text-xs text-gold-400/50 uppercase tracking-[0.3em]">
                  {item.date}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Gallery Proceed Control */}
      <div className="text-center mt-24 z-10 relative">
        <p className="font-serif italic text-sm text-gold-100/60 max-w-sm mx-auto mb-6">
          "The chronological stream settles here. Melan whispers his ultimate vow at the threshold..."
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onProceed}
          className="px-10 py-4 rounded-2xl font-sans font-bold text-xs tracking-[0.25em] uppercase text-black bg-gradient-to-r from-gold-600 via-amber-500 to-gold-400 shadow-[0_8px_32px_rgba(212,175,55,0.25)] hover:shadow-[0_8px_40px_rgba(212,175,55,0.45)] transition-all cursor-pointer inline-flex items-center gap-2"
          id="proceed-to-finale-btn"
        >
          <span>Reveal Melan’s Finale Wish</span>
          <Heart size={14} fill="currentColor" />
        </motion.button>
      </div>
    </div>
  );
}
