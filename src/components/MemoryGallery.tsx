import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Compass, Sparkle, Clock } from 'lucide-react';
import { MemoryItem } from '../types';
import { audio } from '../utils/audio';

interface MemoryGalleryProps {
  onProceed: () => void;
}

// We extend your MemoryItem type right here so we can add the exact precise second!
type ExactMemoryItem = MemoryItem & { exactTime: string };

export default function MemoryGallery({ onProceed }: MemoryGalleryProps) {
  const [burstHeartId, setBurstHeartId] = useState<string | null>(null);
  const [likedHearts, setLikedHearts] = useState<string[]>([]);

  const memories: ExactMemoryItem[] = [
    {
      id: 'mem1', 
      date: 'Feb 07, 2026', 
      exactTime: '4:35:10 PM',
      title: 'A Glance That Changed Everything',
      description: 'මේ වෙලාව තමයි මගේ ජීවිතයෙ ලොකු වෙනසක් කලේ, එදත් මම මේ වෙලාවෙ නිකමට insta open කරේ reel එකක් බලල යන්න.. ඒත් app එක open කරපු ගමන් මම දැක්කෙ මේ පේන video එකයි ඒත් එක්කම යටින් photo collage එකයි.. ඒක දැක්ක ගමන් මම ආපු වැඩෙත් අමතක වෙල් බලන් ඉදියෙ ඒ විඩියෝ එකේ ඉන්න ලස්සන කෙල්ලයි ඒ ලස්සන සින්දුවයි මට දුන්න ලස්සන හැඟීම දිහා.. අදටත් ඒ සින්දුවේ මේ කොටස මට ඒ ලස්සන මොහොත මතක් කරනවා..\n\nඅනිවාරෙන් ආයෙත් එතනට ගිහින් ඒ video ඒක බලන්න..!',
      quote: `"Teri Nazron Ka Dil Pe Hua Hai Asar\nTu Mera Mehboob Hai Jaana\nTeri Ulfat Mein Jeeta Har Pal\nTu Ik Tohfa Hai Khuda Ka\n\nTujhe Pa Ke Jawab Mila Hai Asal\nTu Hai Woh Sawaal Khuda Ka\nTu Mila Hai Yeh Meri Dua Ka Asar\nTu Mujhse Door Na Jaana"`,
      gradient: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      illustrationType: 'temple', 
      type: 'REAL',
      image: '/Photos/Pic01.PNG',
    },
    {
      id: 'mem2', 
      date: 'May 03, 2026', 
      exactTime: '9:24:47 AM',
      title: 'Stolen Glances & Shy Smiles',
      description: 'කලින් දවසෙ මටත් හිනාවෙවී ඉදල අවිල්ල bus එකෙන් බැහැපු වෙලේ ඉදන් හැන්ගි හැන්ගි ඉදල අන්තිමට තංගල්ල bus එකට නැගලත් මගෙ මූනවත් බලන්නැතුව යද්දි මම ගත්ත අපි දෙන්නම ඉන්න පළවෙනි photo එක.. එදා ඒ රතුවෙලා තිබ්බ මූන, ගැහි ගැහි ලැජ්ජාවෙ අනිත් පැත්ත බලන් එන විදිය මන් හරි ආසාවෙන් බලන් ඉදියහ්..!',
      quote: '"එදා ඒ රතුවෙලා තිබ්බ මූන, ගැහි ගැහි ලැජ්ජාවෙ බලන් හිටිය විදිය මන් හරි ආසාවෙන් බලන් ඉදියහ්..!"',
      gradient: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 100%)',
      illustrationType: 'waves', 
      type: 'REAL',
      image: '/Photos/Pic02.jpeg',
    },
    {
      id: 'mem3', 
      date: 'May 03, 2026', 
      exactTime: '10:25:46 AM',
      title: 'When the World Faded Away',
      description: 'පළමු ස්පර්ෂයම මේ විදියට capture කරගන්න පුලුවන් උන එකනම් මාර පුදුමයක්.. කෝමහරි ඒ දේත් හරි ලස්සනට capture කරගන්න පුලුවන් උනා.. ඒ මොහොත ගැනනම් අමුතුවෙන් කියන්න දෙයක් නැහ්නේ.. හරි ලස්සන feelings ගොන්නක්..!',
      quote: '"හරි ලස්සන feelings ගොන්නක්..!"',
      gradient: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      illustrationType: 'constellation', 
      type: 'REAL',
      image: '/Photos/Pic03.jpeg',
    },
    {
      id: 'mem4', 
      date: 'May 03, 2026', 
      exactTime: '10:36:25 AM',
      title: "Where 'You and I' Became 'We'",
      description: 'අපි අද මේ වෙනකන් selfies කීයක්නම් ගන්න ඇද්ද ඒත් ඒ කිසිම එකක නැති value එකක් මේකෙ තියනව.. මොකද මේ තියෙන්නෙ අපි දෙන්න ගත්ත පළවෙනි selfie එක..',
      quote: '"The very first frame of our lifetime together."',
      gradient: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 100%)',
      illustrationType: 'stars', 
      type: 'REAL',
      image: '/Photos/Pic04.jpeg',
    }
  ];

  const triggerHeartBurst = (id: string) => {
    if (likedHearts.includes(id)) {
      setLikedHearts((prev) => prev.filter((heartId) => heartId !== id));
    } else {
      setLikedHearts((prev) => [...prev, id]);
      setBurstHeartId(id);
      audio.playGoldenChime();
      setTimeout(() => setBurstHeartId(null), 1000);
    }
  };

  const renderIllustration = (type: string) => {
    switch (type) {
      case 'temple':
        return (
          <svg className="w-full h-full opacity-60" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="80" stroke="#ffffff" strokeWidth="1" strokeDasharray="4 4" />
            <rect x="50" y="50" width="100" height="100" rx="10" stroke="#fbcfe8" strokeWidth="1" />
            <polygon points="100,20 160,80 40,80" stroke="#ffffff" strokeWidth="1" fill="rgba(255,255,255,0.1)" />
          </svg>
        );
      case 'waves':
        return (
          <svg className="w-full h-full opacity-60 animate-pulse" viewBox="0 0 200 200" fill="none">
            <path d="M10,100 C50,60 70,140 100,100 C130,60 150,140 190,100" stroke="#ffffff" strokeWidth="1.5" />
            <path d="M10,120 C50,80 70,160 100,120 C130,80 150,160 190,120" stroke="#fbcfe8" strokeWidth="1" opacity="0.5" />
            <circle cx="100" cy="100" r="30" stroke="#ffffff" strokeWidth="1" strokeDasharray="6 3" />
          </svg>
        );
      case 'constellation':
        return (
          <svg className="w-full h-full opacity-70" viewBox="0 0 200 200" fill="none">
            <circle cx="50" cy="60" r="3" fill="#ffffff" />
            <circle cx="150" cy="80" r="4" fill="#fbcfe8" className="animate-pulse" />
            <circle cx="90" cy="140" r="3" fill="#ffffff" />
            <line x1="50" y1="60" x2="150" y2="80" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
            <line x1="150" y1="80" x2="90" y2="140" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
            <circle cx="100" cy="100" r="60" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 4" />
          </svg>
        );
      case 'stars':
        return (
          <svg className="w-full h-full opacity-60" viewBox="0 0 200 200" fill="none">
            <polygon points="100,40 105,55 120,55 108,65 112,80 100,70 88,80 92,65 80,55 95,55" fill="#ffffff" />
            <circle cx="100" cy="60" r="40" stroke="#fbcfe8" strokeWidth="1" />
            <line x1="40" y1="60" x2="160" y2="60" stroke="#fbcfe8" strokeWidth="1" opacity="0.5" />
          </svg>
        );
      default: return null;
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 py-16" id="memory-gallery-stage">
      
      <div className="text-center max-w-2xl mx-auto mb-20 z-10 relative">
        <span className="font-sans text-[10px] tracking-[0.35em] text-fuchsia-200 font-bold uppercase flex items-center justify-center gap-2 mb-3 drop-shadow-sm">
          <Compass className="animate-spin-slow text-white" size={14} />
          <span>FAVORITE MOMENTS</span>
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-white font-medium mb-4 tracking-wide drop-shadow-md">
          Our Magical Memories
        </h2>
        <p className="font-sans text-sm text-purple-100/80 leading-relaxed max-w-md mx-auto">
          Looking back at some of my favorite times with you, down to the exact second these beautiful moments were frozen in time.
        </p>
      </div>

      <div className="space-y-24 md:space-y-36 relative z-10 max-w-4xl mx-auto">
        <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-20 w-[2px] bg-gradient-to-b from-white/30 via-white/10 to-transparent hidden md:block" />
        
        {memories.map((item, index) => {
          const isLeft = index % 2 === 0;
          const isLiked = likedHearts.includes(item.id);
          const isBursting = burstHeartId === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50, rotateY: isLeft ? -10 : 10, z: -50 }} whileInView={{ opacity: 1, y: 0, rotateY: 0, z: 0 }}
              viewport={{ once: true, margin: '-80px' }} transition={{ type: 'spring', damping: 20, stiffness: 80, delay: 0.1 }}
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              <div className="w-full md:w-1/2 flex justify-center perspective-[1200px]">
                <motion.div
                  whileHover={{ scale: 1.02, rotateY: isLeft ? 3 : -3, rotateX: 2, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
                  transition={{ type: 'spring', damping: 15, stiffness: 150 }}
                  className="w-full max-w-[380px] rounded-[2rem] overflow-hidden shadow-[0_8px_32px_rgba(31,38,135,0.37)] border bg-white/10 backdrop-blur-xl border-white/20"
                >
                  <div className="relative w-full aspect-[4/3] flex items-center justify-center overflow-hidden border-b border-white/10" style={{ background: item.gradient }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-700" />
                      ) : (
                        <div className="absolute inset-4 flex items-center justify-center">{renderIllustration(item.illustrationType)}</div>
                      )}
                    </div>
                    
                    {/* Glowing Heart Button */}
                    <button
                      onClick={() => triggerHeartBurst(item.id)}
                      className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/20 shadow-sm hover:bg-white/20 border border-white/30 flex items-center justify-center group/btn transition-transform active:scale-90 z-10 backdrop-blur-md"
                    >
                      <Heart className={`text-white group-hover/btn:scale-110 transition-all drop-shadow-sm ${isLiked || isBursting ? 'scale-125 fill-white' : ''}`} size={16} fill={isLiked || isBursting ? 'currentColor' : 'none'} />
                    </button>
                    
                    {/* Exact Time & Date Floating Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                      <span className="py-1 px-3 rounded-full bg-black/40 backdrop-blur-md border border-white/20 font-sans font-bold text-[9px] text-white uppercase tracking-widest shadow-sm drop-shadow-sm w-fit">
                        {item.date}
                      </span>
                      <div className="py-1 px-3 rounded-full bg-fuchsia-900/60 backdrop-blur-md border border-fuchsia-400/50 font-mono font-bold text-[9.5px] text-fuchsia-50 tracking-widest shadow-[0_0_15px_rgba(217,70,239,0.5)] flex items-center gap-1.5 w-fit">
                        <Clock size={10} className="text-fuchsia-300 animate-pulse" />
                        <span>{item.exactTime}</span>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isBursting && [...Array(6)].map((_, pi) => (
                        <motion.div key={pi} initial={{ x: 120, y: 110, opacity: 1, scale: 0.5 }} animate={{ x: 120 + (Math.random() * 80 - 40), y: 110 - (Math.random() * 80 + 30), opacity: 0, scale: 1.2, rotate: Math.random() * 45 - 22.5 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="absolute text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] pointer-events-none z-20">
                          <Heart size={14} fill="currentColor" />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                  <div className="p-6 md:p-8 space-y-4 relative">
                    <div className="flex items-center gap-2 relative z-10">
                      <span className="font-sans font-semibold text-[9px] text-white/60 uppercase tracking-[0.2em]">Milestone Memory</span>
                    </div>
                    <h4 className="font-serif text-xl md:text-2xl text-white font-medium tracking-wide relative z-10 drop-shadow-sm">{item.title}</h4>
                    <p className="font-sans text-xs md:text-sm text-purple-100/80 leading-relaxed relative z-10 whitespace-pre-line">{item.description}</p>
                    <div className="relative pt-4 border-t border-white/10 z-10">
                      <p className="font-sans italic text-xs text-white/70 leading-relaxed pr-6 pl-3 border-l-2 border-fuchsia-400/50 whitespace-pre-line">
                        {item.quote}
                      </p>
                      <Sparkle className="absolute right-0 bottom-0 text-fuchsia-300/40 animate-pulse" size={14} />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Desktop Center Timeline Badges */}
              <div className="w-full md:w-1/2 hidden md:flex flex-col items-center justify-center p-6 text-center select-none">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} className="w-10 h-10 rounded-full border border-fuchsia-400/40 bg-black/20 backdrop-blur-md flex items-center justify-center relative shadow-[0_0_15px_rgba(217,70,239,0.2)]">
                  <div className="w-3 h-3 rounded-full bg-white animate-pulse drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
                  <div className="absolute inset-0 rounded-full border border-fuchsia-400/50 animate-ping opacity-40" style={{ animationDuration: '3s' }} />
                </motion.div>
                <div className="mt-4 flex flex-col items-center gap-1.5">
                  <span className="font-sans font-bold text-[10px] text-white/60 uppercase tracking-[0.2em]">
                    {item.date}
                  </span>
                  <span className="font-mono font-bold text-[11px] text-fuchsia-200 drop-shadow-[0_0_8px_rgba(217,70,239,0.6)]">
                    {item.exactTime}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="text-center mt-24 z-10 relative">
        <p className="font-sans italic text-sm text-white/60 max-w-sm mx-auto mb-6">
          "And the best part is, our magical story is just getting started..."
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onProceed}
          className="px-10 py-4 rounded-full font-sans font-bold text-xs tracking-widest uppercase text-white bg-white/20 hover:bg-white/30 shadow-[0_4px_15px_rgba(0,0,0,0.2)] transition-all cursor-pointer inline-flex items-center gap-2 border border-white/30 backdrop-blur-md"
        >
          <span>See My Birthday Wish for You</span>
          <Heart size={14} fill="currentColor" />
        </motion.button>
      </div>
    </div>
  );
}
