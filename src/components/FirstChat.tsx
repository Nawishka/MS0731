import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, MessageCircle, Send, CheckCheck, ArrowRight, Flower2 } from 'lucide-react';
import { audio } from '../utils/audio';

interface FirstChatProps {
  onProceed: () => void;
  triggerBurst: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'melan' | 'shashi';
  text: string;
  time: string;
  isStoryReply?: boolean;
}

export default function FirstChat({ onProceed, triggerBurst }: FirstChatProps) {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [chatComplete, setChatComplete] = useState<boolean>(false);
  const [showTransitionModal, setShowTransitionModal] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages: ChatMessage[] = [
    { id: 'm1', sender: 'melan', text: 'mchn oya ara muthushay samadhi ekka hitiya girl neda', time: 'Feb 10, 1:16 AM', isStoryReply: true },
    { id: 'm2', sender: 'shashi', text: 'Ooo', time: 'Feb 12, 6:27 PM' },
    { id: 'm3', sender: 'shashi', text: 'oya kauda 🥲', time: 'Feb 12, 6:27 PM' },
    { id: 'm4', sender: 'melan', text: 'ah ekane dekala purudu gathiyak thibba hinda ahwe', time: 'Feb 13, 1:28 AM' },
    { id: 'm5', sender: 'shashi', text: 'Aaah', time: 'Feb 13, 4:19 AM' },
    { id: 'm6', sender: 'shashi', text: 'oya ape wayaseda', time: 'Feb 13, 4:19 AM' },
    { id: 'm7', sender: 'shashi', text: 'Anee mt mathaka nane', time: 'Feb 13, 4:20 AM' },
    { id: 'm8', sender: 'melan', text: 'niyamay 🥲😂', time: 'Feb 13, 4:25 AM' },
    { id: 'm9', sender: 'melan', text: 'komahari ub (ub kiwwata awlak nhne pit ekata ah) 9 di giya ned', time: 'Feb 13, 4:26 AM' },
    { id: 'm10', sender: 'shashi', text: 'Anee sorry 🥲', time: 'Feb 13, 4:26 AM' },
    { id: 'm11', sender: 'shashi', text: 'Ow bn', time: 'Feb 13, 4:26 AM' },
    { id: 'm12', sender: 'melan', text: 'mata mataka widiyata itapasse missing 😂', time: 'Feb 13, 4:27 AM' },
    { id: 'm13', sender: 'shashi', text: 'Ape clz ekeda hitiye', time: 'Feb 13, 4:27 AM' },
    { id: 'm14', sender: 'shashi', text: 'Danna kattiya danan hitiye ithin mn aaai yana bawa 😁', time: 'Feb 13, 4:27 AM' },
    { id: 'm15', sender: 'shashi', text: 'Mokadda 9di hitapu clz eka', time: 'Feb 13, 4:28 AM' },
    { id: 'm16', sender: 'melan', text: 'F', time: 'Feb 13, 4:31 AM' },
    { id: 'm17', sender: 'shashi', text: 'Eeee 🥲', time: 'Feb 13, 4:31 AM' },
    { id: 'm18', sender: 'shashi', text: 'Ape eked', time: 'Feb 13, 4:31 AM' },
    { id: 'm19', sender: 'melan', text: '😌😂 nh nh neme', time: 'Feb 13, 4:32 AM' },
    { id: 'm20', sender: 'melan', text: 'wihiluwak kre', time: 'Feb 13, 4:32 AM' },
    { id: 'm21', sender: 'melan', text: 'mn E eke idiye 😂', time: 'Feb 13, 4:32 AM' },
    { id: 'm22', sender: 'shashi', text: 'Aaah 🥲', time: 'Feb 13, 4:32 AM' },
    { id: 'm23', sender: 'melan', text: 'ow ow penw sujathian kiyala bio eke dan innw', time: 'Feb 13, 4:32 AM' },
    { id: 'm24', sender: 'shashi', text: 'Mn eee kale ubw danan hitiyd bn 🥲', time: 'Feb 13, 4:32 AM' },
    { id: 'm25', sender: 'melan', text: '😂', time: 'Feb 13, 4:32 AM' },
    { id: 'm26', sender: 'shashi', text: 'Aneee meee 😅', time: 'Feb 13, 4:33 AM' },
    { id: 'm27', sender: 'melan', text: 'nh bn mn dekala thiyanawa e puruddata kawda me baladdi matak une', time: 'Feb 13, 4:33 AM' },
  ];

  const nextSender = messages[visibleMessages]?.sender || 'shashi';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleMessages, isTyping]);

  useEffect(() => {
    if (visibleMessages < messages.length) {
      setIsTyping(true);
      const typingTimer = setTimeout(() => {
        setIsTyping(false);
        setVisibleMessages((prev) => prev + 1);
        audio.playBubblePop();
      }, 2600); 

      return () => clearTimeout(typingTimer);
    } else {
      const completeTimer = setTimeout(() => {
        setChatComplete(true);
        audio.playGoldenChime();
      }, 800);
      return () => clearTimeout(completeTimer);
    }
  }, [visibleMessages, messages.length]);

  const handleFinalProceed = () => {
    triggerBurst();
    audio.playGoldenChime();
    onProceed();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto min-h-[85vh] px-4 py-8 flex flex-col justify-between" id="ios-chat-stage">
      
      <AnimatePresence>
        {showTransitionModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md rounded-[2rem] bg-white/10 backdrop-blur-2xl p-8 text-center border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-fuchsia-400/20 rounded-full blur-2xl pointer-events-none" />

              <div className="w-16 h-16 rounded-full bg-white/10 border border-white/30 flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Heart className="text-white animate-pulse drop-shadow-md" size={32} />
              </div>
              <span className="font-sans text-[10px] tracking-[0.3em] text-fuchsia-200 font-bold uppercase block mb-2 drop-shadow-sm">
                HOW IT STARTED VS. NOW ✨
              </span>
              <h3 className="font-serif text-2xl text-white font-medium mb-4">
                From DMs to Magical Memories
              </h3>
              <p className="font-sans text-sm text-purple-100/80 leading-relaxed mb-8">
                That was how our story first started back in February... Now, let's take a look at some of my absolute favorite memories with you since that exact day!
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowTransitionModal(false)}
                  className="w-full sm:w-1/3 py-3 rounded-xl bg-black/20 text-white/80 border border-white/10 font-sans text-xs uppercase font-bold tracking-widest hover:bg-black/30 transition-colors"
                >
                  Back
                </button>
                <motion.button
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleFinalProceed}
                  className="w-full sm:w-2/3 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-sans font-bold text-xs uppercase tracking-widest shadow-[0_4px_15px_rgba(0,0,0,0.2)] flex items-center justify-center gap-2 border border-white/30 backdrop-blur-md"
                >
                  <span>Let's Go! 🚀</span>
                  <ArrowRight size={14} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="sticky top-16 z-30 bg-white/10 backdrop-blur-2xl border border-white/20 px-6 py-4 rounded-[2rem] mb-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-fuchsia-400 to-rose-400 flex items-center justify-center text-white font-serif text-lg font-medium shadow-md border border-white/30">
              S
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-transparent rounded-full drop-shadow-sm" />
          </div>
          <div>
            <h3 className="font-serif text-sm text-white flex items-center gap-1.5 tracking-wide drop-shadow-sm">
              <span>Shashi</span>
              <Sparkles size={12} className="text-white" />
            </h3>
            <span className="font-sans text-[10px] text-white/60 block">Instagram • Feb 2026</span>
          </div>
        </div>
        <div className="font-sans font-semibold text-[9px] uppercase tracking-widest text-fuchsia-100 bg-white/10 px-3 py-1.5 rounded-full border border-white/20 shadow-inner backdrop-blur-sm">
          Where It All Began ✨
        </div>
      </div>

      <div className="flex-1 space-y-3 my-4 px-2 overflow-y-auto max-h-[60vh] pr-2">
        <div className="text-center my-4">
          <span className="font-sans font-semibold text-[9px] text-white/70 bg-black/10 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-widest border border-white/10">
            February 10, 2026
          </span>
        </div>

        <AnimatePresence>
          {messages.slice(0, visibleMessages).map((msg) => {
            const isMe = msg.sender === 'melan';
            return (
              <motion.div
                key={msg.id} initial={{ opacity: 0, y: 15, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} w-full`}
              >
                {msg.isStoryReply && (
                  <span className="text-[9px] font-sans font-medium text-white/60 mb-1 px-2 flex items-center gap-1">
                    <MessageCircle size={10} /> Replied to their story
                  </span>
                )}
                <div
                  className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-2.5 text-xs md:text-sm shadow-md leading-relaxed backdrop-blur-md ${
                    isMe
                      ? 'bg-white/20 text-white font-medium rounded-br-xs border border-white/30'
                      : 'bg-black/20 text-white border border-white/10 rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <div className="flex items-center gap-1 mt-1 px-1">
                  <span className="text-[9px] font-sans font-medium text-white/40">{msg.time}</span>
                  {isMe && <CheckCheck size={12} className="text-white/80" />}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
            className={`flex flex-col ${nextSender === 'melan' ? 'items-end' : 'items-start'} w-full my-1`}
          >
            <div
              className={`flex items-center gap-1 px-4 py-3 rounded-2xl w-16 shadow-sm border backdrop-blur-md ${
                nextSender === 'melan'
                  ? 'bg-white/20 border-white/30 rounded-br-xs'
                  : 'bg-black/20 border-white/10 rounded-bl-xs'
              }`}
            >
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-white/80" />
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-white/80" />
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-white/80" />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      <div className="mt-6 pt-4 text-center">
        <AnimatePresence>
          {chatComplete ? (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setShowTransitionModal(true)}
              className="px-8 py-3.5 rounded-full bg-white/20 text-white font-sans font-bold text-xs tracking-widest uppercase shadow-[0_4px_15px_rgba(0,0,0,0.2)] border border-white/30 transition-all cursor-pointer inline-flex items-center gap-2 hover:bg-white/30 backdrop-blur-md"
            >
              <Sparkles size={14} className="animate-spin-slow text-white" />
              <span>See Our Memories Now 💖</span>
            </motion.button>
          ) : (
            <div className="text-[10px] font-sans font-semibold text-white/60 animate-pulse flex items-center justify-center gap-2 py-3">
              <Send size={12} className="animate-bounce text-white/50" />
              <span>Reliving our first conversations...</span>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
