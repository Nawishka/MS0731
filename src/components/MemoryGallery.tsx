import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Compass, HeartPulse, Sparkle } from 'lucide-react';
import { MemoryItem } from '../types';
import { audio } from '../utils/audio';

interface MemoryGalleryProps {
  onProceed: () => void;
}

export default function MemoryGallery({ onProceed }: MemoryGalleryProps) {
  const [clickedHeartId, setClickedHeartId] = useState<string | null>(null);

  const memories: MemoryItem[] = [
    {
      id: 'mem1', date: 'July 2024', title: 'Our First Big Adventure',
      description: 'Walking together and talking for hours. Everything felt so easy and natural, and I knew right then how special you were to me.',
      quote: '"Time always seems to fly by whenever I am with you."',
      gradient: 'linear-gradient(135deg, #0f0826 0%, #1a0f3c 100%)',
      illustrationType: 'temple', type: 'REAL',
      // image: '/photos/memory1.jpg',
    },
    {
      id: 'mem2', date: 'October 2024', title: 'Late Night Talks & Tea',
      description: 'Just hanging out, sipping tea, and sharing our biggest dreams and silly secrets while the world outside went quiet.',
      quote: '"Some of my favorite memories are just the quiet moments with you."',
      gradient: 'linear-gradient(135deg, #070514 0%, #130b2e 100%)',
      illustrationType: 'waves', type: 'REAL',
    },
    {
      id: 'mem3', date: 'January 2025', title: 'Shelter from the Rainy Days',
      description: 'Even when things get chaotic or stressful around us, being with you always feels like a safe, peaceful place.',
      quote: '"You always know how to bring warmth to the rainiest days."',
      gradient: 'linear-gradient(135deg, #0a0514 0%, #1a0f3c 100%)',
      illustrationType: 'constellation', type: 'REAL',
    },
    {
      id: 'surreal-healing', date: 'Always & Forever', title: 'My Safe Haven',
      description: 'No matter what happens in life, I always want to be someone who supports you, protects your peace, and brings you happiness.',
      quote: '"A promise to always stand by your side through every chapter of life."',
      gradient: 'linear-gradient(135deg, #0f0826 0%, #3b0764 50%, #083344 100%)',
      illustrationType: 'healing-pulse', type: 'SURREAL',
    },
    {
      id: 'mem4', date: 'April 2025', title: 'Endless Laughter',
      description: 'Lost in our own little world, laughing at things nobody else would understand. Your smile is genuinely my favorite thing to see.',
      quote: '"Here is to all the inside jokes and endless laughter still ahead of us."',
      gradient: 'linear-gradient(135deg, #070514 0%, #1e1b4b 100%)',
      illustrationType: 'stars', type: 'REAL',
    },
    {
      id: 'mem5', date: 'July 31, 2026', title: 'Welcome to 18!',
      description: 'Watching you step into adulthood with so much grace, kindness, and beauty. I am so lucky to celebrate this amazing milestone with you.',
      quote: '"Happy 18th Birthday, Shashi! The best is yet to come."',
      gradient: 'linear-gradient(135deg, #1a0f3c 0%, #4a044e 100%)',
      illustrationType: 'heart', type: 'REAL',
    },
  ];

  const triggerHeartBurst = (id: string) => {
    setClickedHeartId(id);
    if (id === 'surreal-healing') audio.playHeartbeat();
    else audio.playGoldenChime();
    setTimeout(() => setClickedHeartId(null), 1000);
  };

  const renderIllustration = (type: string) => {
    switch (type) {
      case 'temple':
        return (
          <svg className="w-full h-full opacity-40" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="80" stroke="#e879f9" strokeWidth="1" strokeDasharray="4 4" />
            <rect x="50" y="50" width="100" height="100" rx="10" stroke="#22d3ee" strokeWidth="1" />
            <polygon points="100,20 160,80 40,80" stroke="#e879f9" strokeWidth="1" fill="rgba(232,121,249,0.1)" />
          </svg>
        );
      case 'waves':
        return (
          <svg className="w-full h-full opacity-40 animate-pulse-gold" viewBox="0 0 200 200" fill="none">
            <path d="M10,100 C50,60 70,140 100,100 C130,60 150,140 190,100" stroke="#22d3ee" strokeWidth="1.5" />
            <path d="M10,120 C50,80 70,160 100,120 C130,80 150,160 190,120" stroke="#c084fc" strokeWidth="1" opacity="0.5" />
            <circle cx="100" cy="100" r="30" stroke="#e879f9" strokeWidth="1" strokeDasharray="6 3" />
          </svg>
        );
      case 'constellation':
        return (
          <svg className="w-full h-full opacity-50" viewBox="0 0 200 200" fill="none">
            <circle cx="50" cy="60" r="3" fill="#22d3ee" />
            <circle cx="150" cy="80" r="4" fill="#e879f9" className="animate-pulse" />
            <circle cx="90" cy="140" r="3" fill="#22d3ee" />
            <line x1="50" y1="60" x2="150" y2="80" stroke="#c084fc" strokeWidth="1" />
            <line x1="150" y1="80" x2="90" y2="140" stroke="#c084fc" strokeWidth="1" />
            <circle cx="100" cy="100" r="60" stroke="#22d3ee" strokeWidth="1" strokeDasharray="2 4" />
          </svg>
        );
      case 'healing-pulse':
        return (
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <div className="absolute w-44 h-44 rounded-full border border-cyan-500/30 animate-ping" style={{ animationDuration: '3s' }} />
            <svg className="w-full h-full opacity-60" viewBox="0 0 300 200" fill="none">
              <path d="M10,100 L80,100 L95,80 L105,130 L115,100 L140,100 L155,50 L170,160 L185,100 L210,100 L290,100" stroke="#e879f9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        );
      case 'stars':
        return (
          <svg className="w-full h-full opacity-40" viewBox="0 0 200 200" fill="none">
            <polygon points="100,40 105,55 120,55 108,65 112,80 100,70 88,80 92,65 80,55 95,55" fill="#e879f9" />
            <circle cx="100" cy="60" r="40" stroke="#22d3ee" strokeWidth="1" />
            <line x1="40" y1="60" x2="160" y2="60" stroke="#22d3ee" strokeWidth="1" />
          </svg>
        );
      case 'heart':
        return (
          <svg className="w-full h-full opacity-40 animate-float-medium" viewBox="0 0 200 200" fill="none">
            <path d="M100,140 C100,140 40,90 40,55 C40,30 60,15 80,15 C92,15 100,25 100,25 C100,25 108,15 120,15 C140,15 160,30 160,55 C160,90 100,140 100,140 Z" stroke="#e879f9" strokeWidth="1.5" fill="rgba(232,121,249,0.1)" />
          </svg>
        );
      default: return null;
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 py-16" id="memory-gallery-stage">
      
      <div className="text-center max-w-2xl mx-auto mb-20 z-10 relative">
        <span className="font-mono text-[10px] tracking-[0.35em] text-cyan-400 font-bold uppercase flex items-center justify-center gap-2 mb-3 drop-shadow-[0_0_5px_rgba(6,182,212,0.4)]">
          <Compass className="animate-spin-slow text-fuchsia-400" size={14} />
          <span>FAVORITE MOMENTS</span>
        </span>
        <h2 className="font-display text-4xl md:text-5xl text-purple-50 font-medium mb-4 tracking-wide drop-shadow-[0_0_10px_rgba(217,70,239,0.3)]">
          Our Magical Memories
        </h2>
        <p className="font-serif italic text-sm text-purple-200/70 leading-relaxed max-w-md mx-auto">
          "Looking back at some of my favorite times with you, from the quiet laughs to the big milestones in our enchanted forest."
        </p>
      </div>

      <div className="space-y-24 md:space-y-36 relative z-10 max-w-4xl mx-auto">
        <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-20 w-[2px] bg-gradient-to-b from-cyan-500/30 via-fuchsia-500/20 to-transparent hidden md:block" />
        
        {memories.map((item, index) => {
          const isLeft = index % 2 === 0;
          const isSurreal = item.type === 'SURREAL';

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50, rotateY: isLeft ? -10 : 10, z: -50 }} whileInView={{ opacity: 1, y: 0, rotateY: 0, z: 0 }}
              viewport={{ once: true, margin: '-80px' }} transition={{ type: 'spring', damping: 20, stiffness: 80, delay: 0.1 }}
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              <div className="w-full md:w-1/2 flex justify-center perspective-[1200px]">
                <motion.div
                  whileHover={{ scale: 1.02, rotateY: isLeft ? 3 : -3, rotateX: 2, boxShadow: '0 25px 50px rgba(6,182,212,0.2)' }}
                  transition={{ type: 'spring', damping: 15, stiffness: 150 }}
                  className={`w-full max-w-[380px] rounded-[2rem] overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.6)] border ${
                    isSurreal ? 'bg-[#0f0826] border-fuchsia-500/40 shadow-[0_0_30px_rgba(217,70,239,0.15)]' : 'bg-[#130b2e]/60 backdrop-blur-md border-cyan-500/20'
                  }`}
                >
                  <div className="relative w-full aspect-[4/3] flex items-center justify-center overflow-hidden border-b border-purple-500/20" style={{ background: item.gradient }}>
                    <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-700 blend-luminosity" />
                      ) : (
                        <div className="absolute inset-4 flex items-center justify-center">{renderIllustration(item.illustrationType)}</div>
                      )}
                    </div>
                    <button
                      onClick={() => triggerHeartBurst(item.id)}
                      className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[#0a0514]/80 shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:bg-[#130b2e] border border-cyan-500/30 flex items-center justify-center group/btn transition-transform active:scale-90 z-10"
                    >
                      <Heart className={`text-cyan-400 group-hover/btn:text-fuchsia-400 group-hover/btn:scale-110 transition-all drop-shadow-[0_0_5px_rgba(6,182,212,0.5)] ${clickedHeartId === item.id ? 'text-fuchsia-400 scale-125' : ''}`} size={16} fill={clickedHeartId === item.id ? 'currentColor' : 'none'} />
                    </button>
                    <span className="absolute top-4 left-4 py-1.5 px-3 rounded-full bg-[#070514]/80 backdrop-blur-md border border-fuchsia-500/30 font-mono font-bold text-[9px] text-fuchsia-400 uppercase tracking-widest z-10 shadow-sm drop-shadow-[0_0_5px_rgba(217,70,239,0.3)]">
                      {item.date}
                    </span>
                    <AnimatePresence>
                      {clickedHeartId === item.id && [...Array(6)].map((_, pi) => (
                        <motion.div key={pi} initial={{ x: 120, y: 110, opacity: 1, scale: 0.5 }} animate={{ x: 120 + (Math.random() * 80 - 40), y: 110 - (Math.random() * 80 + 30), opacity: 0, scale: 1.2, rotate: Math.random() * 45 - 22.5 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="absolute text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] pointer-events-none z-20">
                          <Heart size={14} fill="currentColor" />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                  <div className="p-6 md:p-8 space-y-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 to-transparent pointer-events-none" />
                    <div className="flex items-center gap-2 relative z-10">
                      {isSurreal ? (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-fuchsia-950/40 border border-fuchsia-500/30 text-[9px] font-mono font-bold uppercase text-fuchsia-400 tracking-wider shadow-[0_0_10px_rgba(217,70,239,0.2)]">
                          <HeartPulse size={10} className="animate-pulse" /><span>Special Promise</span>
                        </div>
                      ) : (
                        <span className="font-mono font-semibold text-[9px] text-cyan-500/60 uppercase tracking-[0.2em]">Milestone Memory</span>
                      )}
                    </div>
                    <h4 className="font-display text-xl md:text-2xl text-purple-50 font-medium tracking-wide relative z-10">{item.title}</h4>
                    <p className="font-sans text-xs md:text-sm text-purple-200/70 leading-relaxed relative z-10">{item.description}</p>
                    <div className="relative pt-4 border-t border-purple-500/20 z-10">
                      <p className="font-serif italic text-xs text-cyan-100/60 leading-relaxed pr-6 pl-3 border-l-2 border-cyan-500/40">
                        {item.quote}
                      </p>
                      <Sparkle className="absolute right-0 bottom-0 text-fuchsia-500/40 animate-pulse" size={14} />
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="w-full md:w-1/2 hidden md:flex flex-col items-center justify-center p-6 text-center select-none">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} className="w-10 h-10 rounded-full border border-cyan-500/30 bg-[#0a0514] flex items-center justify-center relative shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                  <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
                  <div className="absolute inset-0 rounded-full border border-fuchsia-500/40 animate-ping opacity-30" style={{ animationDuration: '3s' }} />
                </motion.div>
                <div className="mt-4 font-mono font-bold text-[10px] text-fuchsia-400/60 uppercase tracking-[0.2em]">
                  {item.date}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="text-center mt-24 z-10 relative">
        <p className="font-serif italic text-sm text-purple-200/50 max-w-sm mx-auto mb-6">
          "And the best part is, our magical story is just getting started..."
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onProceed}
          className="px-10 py-4 rounded-full font-mono font-bold text-xs tracking-widest uppercase text-white bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-600 shadow-[0_0_25px_rgba(192,38,211,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] transition-all cursor-pointer inline-flex items-center gap-2 border border-white/10"
        >
          <span>See My Birthday Wish for You</span>
          <Heart size={14} fill="currentColor" />
        </motion.button>
      </div>
    </div>
  );
}
