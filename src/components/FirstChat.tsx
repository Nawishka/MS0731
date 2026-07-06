import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, MessageCircle, Send, CheckCheck } from 'lucide-react';
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

  // The conversation sorted in proper chronological order!
  const messages: ChatMessage[] = [
    {
      id: 'm1',
      sender: 'melan',
      text: 'mchn oya ara muthushay samadhi ekka hitiya girl neda 👀',
      time: 'Feb 10, 1:16 AM',
      isStoryReply: true,
    },
    {
      id: 'm2',
      sender: 'shashi',
      text: 'Ooo... oya kauda 🥲',
      time: 'Feb 12, 6:27 PM',
    },
    {
      id: 'm3',
      sender: 'melan',
      text: 'ah ekane dekala purudu gathiyak thibba hinda ahwe 😌',
      time: 'Feb 13, 1:28 AM',
    },
    {
      id: 'm4',
      sender: 'shashi',
      text: 'Aaah... oya ape wayaseda?',
      time: 'Feb 13, 4:19 AM',
    },
    {
      id: 'm5',
      sender: 'shashi',
      text: 'Anee mt mathaka nane 🥲',
      time: 'Feb 13, 4:20 AM',
    },
    {
      id: 'm6',
      sender: 'melan',
      text: 'niyamay 🥲😂 komahari ub (ub kiwwata awlak nhne pit ekata ah) 9 di giya ned',
      time: 'Feb 13, 4:25 AM',
    },
    {
      id: 'm7',
      sender: 'shashi',
      text: 'Anee sorry 🥲 Ow bn!',
      time: 'Feb 13, 4:26 AM',
    },
    {
      id: 'm8',
      sender: 'melan',
      text: 'mata mataka widiyata itapasse missing 😂',
      time: 'Feb 13, 4:27 AM',
    },
    {
      id: 'm9',
      sender: 'shashi',
      text: 'Ape clz ekeda hitiye? Danna kattiya danan hitiye ithin mn aaai yana bawa 😁 Mokadda 9di hitapu clz eka?',
      time: 'Feb 13, 4:27 AM',
    },
    {
      id: 'm10',
      sender: 'melan',
      text: 'F... E eke idiye 😂 wihiluwak kre, nh nh neme!',
      time: 'Feb 13, 4:31 AM',
    },
    {
      id: 'm11',
      sender: 'shashi',
      text: 'Eeee 🥲 Ape eked! Mn eee kale ubw danan hitiyd bn 🥲',
      time: 'Feb 13, 4:32 AM',
    },
    {
      id: 'm12',
      sender: 'melan',
      text: 'nh bn mn dekala thiyanawa e puruddata kawda me baladdi matak une 😂',
      time: 'Feb 13, 4:33 AM',
    },
    {
      id: 'm13',
      sender: 'shashi',
      text: 'Aneee meee 😅',
      time: 'Feb 13, 4:33 AM',
    },
  ];

  // Animated message revealing loop with iOS sound triggers
  useEffect(() => {
    if (visibleMessages < messages.length) {
      setIsTyping(true);
      const typingTimer = setTimeout(() => {
        setIsTyping(false);
        setVisibleMessages((prev) => prev + 1);
        audio.playBubblePop(); // Play crisp iOS bubble pop!
      }, 1200); // 1.2s delay between messages

      return () => clearTimeout(typingTimer);
    } else {
      const completeTimer = setTimeout(() => {
        setChatComplete(true);
        audio.playGoldenChime();
        triggerBurst();
      }, 800);
      return () => clearTimeout(completeTimer);
    }
  }, [visibleMessages, messages.length, triggerBurst]);

  return (
    <div className="relative w-full max-w-2xl mx-auto min-h-[85vh] px-4 py-8 flex flex-col justify-between" id="ios-chat-stage">
      
      {/* iOS-Style Header Bar */}
      <div className="sticky top-16 z-30 glass-panel-dark border-b border-gold-500/20 px-6 py-4 rounded-3xl mb-6 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold-600 to-amber-300 flex items-center justify-center text-black font-display font-bold text-lg shadow-md">
              S
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-black rounded-full" />
          </div>
          <div>
            <h3 className="font-sans font-bold text-sm text-white flex items-center gap-1.5">
              <span>Shashi</span>
              <Sparkles size={12} className="text-gold-400" />
            </h3>
            <span className="font-mono text-[10px] text-gold-300/60 block">Instagram • Feb 2026</span>
          </div>
        </div>
        <div className="font-mono text-[10px] text-gold-400/80 bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20">
          Where It All Began ✨
        </div>
      </div>

      {/* Chat Messages Arena */}
      <div className="flex-1 space-y-4 my-4 px-2 overflow-y-auto max-h-[60vh] pr-2">
        <div className="text-center my-4">
          <span className="font-mono text-[10px] text-gold-300/40 bg-white/5 px-3 py-1 rounded-full uppercase tracking-widest">
            February 10, 2026
          </span>
        </div>

        <AnimatePresence>
          {messages.slice(0, visibleMessages).map((msg) => {
            const isMe = msg.sender === 'melan';
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} w-full`}
              >
                {msg.isStoryReply && (
                  <span className="text-[10px] font-mono text-gold-400/60 mb-1 px-2 flex items-center gap-1">
                    <MessageCircle size={10} /> Replied to their story
                  </span>
                )}
                
                <div
                  className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 text-xs md:text-sm shadow-md leading-relaxed ${
                    isMe
                      ? 'bg-gradient-to-r from-gold-600 to-amber-500 text-black font-medium rounded-br-xs'
                      : 'glass-panel-dark text-gold-100 border border-gold-500/20 rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                </div>

                <div className="flex items-center gap-1 mt-1 px-1">
                  <span className="text-[9px] font-mono text-gold-200/40">{msg.time}</span>
                  {isMe && <CheckCheck size={12} className="text-gold-400" />}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Live Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-1 glass-panel-dark px-4 py-3 rounded-2xl rounded-bl-xs w-16 border border-gold-500/20"
          >
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-gold-400" />
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-gold-400" />
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-gold-400" />
          </motion.div>
        )}
      </div>

      {/* Footer Action Button to Memory Gallery */}
      <div className="mt-6 pt-4 border-t border-white/5 text-center">
        <AnimatePresence>
          {chatComplete ? (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onProceed}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-gold-600 via-amber-400 to-gold-500 text-black font-sans font-bold text-xs tracking-widest uppercase shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_45px_rgba(212,175,55,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2"
              id="proceed-from-chat-btn"
            >
              <span>And Look Where We Are Now... See The Memories!</span>
              <Heart size={14} fill="currentColor" />
            </motion.button>
          ) : (
            <div className="text-[11px] font-mono text-gold-400/50 animate-pulse flex items-center justify-center gap-2 py-3">
              <Send size={12} className="animate-bounce" />
              <span>Reliving our first conversations...</span>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
