import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, MessageCircle, Send, CheckCheck, ArrowRight } from 'lucide-react';
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

  // The EXACT, uncompressed, 1-to-1 original conversation!
  const messages: ChatMessage[] = [
    {
      id: 'm1',
      sender: 'melan',
      text: 'mchn oya ara muthushay samadhi ekka hitiya girl neda',
      time: 'Feb 10, 1:16 AM',
      isStoryReply: true,
    },
    {
      id: 'm2',
      sender: 'shashi',
      text: 'Ooo',
      time: 'Feb 12, 6:27 PM',
    },
    {
      id: 'm3',
      sender: 'shashi',
      text: 'oya kauda 🥲',
      time: 'Feb 12, 6:27 PM',
    },
    {
      id: 'm4',
      sender: 'melan',
      text: 'ah ekane dekala purudu gathiyak thibba hinda ahwe',
      time: 'Feb 13, 1:28 AM',
    },
    {
      id: 'm5',
      sender: 'shashi',
      text: 'Aaah',
      time: 'Feb 13, 4:19 AM',
    },
    {
      id: 'm6',
      sender: 'shashi',
      text: 'oya ape wayaseda',
      time: 'Feb 13, 4:19 AM',
    },
    {
      id: 'm7',
      sender: 'shashi',
      text: 'Anee mt mathaka nane',
      time: 'Feb 13, 4:20 AM',
    },
    {
      id: 'm8',
      sender: 'melan',
      text: 'niyamay 🥲😂',
      time: 'Feb 13, 4:25 AM',
    },
    {
      id: 'm9',
      sender: 'melan',
      text: 'komahari ub (ub kiwwata awlak nhne pit ekata ah) 9 di giya ned',
      time: 'Feb 13, 4:26 AM',
    },
    {
      id: 'm10',
      sender: 'shashi',
      text: 'Anee sorry 🥲',
      time: 'Feb 13, 4:26 AM',
    },
    {
      id: 'm11',
      sender: 'shashi',
      text: 'Ow bn',
      time: 'Feb 13, 4:26 AM',
    },
    {
      id: 'm12',
      sender: 'melan',
      text: 'mata mataka widiyata itapasse missing 😂',
      time: 'Feb 13, 4:27 AM',
    },
    {
      id: 'm13',
      sender: 'shashi',
      text: 'Ape clz ekeda hitiye',
      time: 'Feb 13, 4:27 AM',
    },
    {
      id: 'm14',
      sender: 'shashi',
      text: 'Danna kattiya danan hitiye ithin mn aaai yana bawa 😁',
      time: 'Feb 13, 4:27 AM',
    },
    {
      id: 'm15',
      sender: 'shashi',
      text: 'Mokadda 9di hitapu clz eka',
      time: 'Feb 13, 4:28 AM',
    },
    {
      id: 'm16',
      sender: 'melan',
      text: 'F',
      time: 'Feb 13, 4:31 AM',
    },
    {
      id: 'm17',
      sender: 'shashi',
      text: 'Eeee 🥲',
      time: 'Feb 13, 4:31 AM',
    },
    {
      id: 'm18',
      sender: 'shashi',
      text: 'Ape eked',
      time: 'Feb 13, 4:31 AM',
    },
    {
      id: 'm19',
      sender: 'melan',
      text: '😌😂 nh nh neme',
      time: 'Feb 13, 4:32 AM',
    },
    {
      id: 'm20',
      sender: 'melan',
      text: 'wihiluwak kre',
      time: 'Feb 13, 4:32 AM',
    },
    {
      id: 'm21',
      sender: 'melan',
      text: 'mn E eke idiye 😂',
      time: 'Feb 13, 4:32 AM',
    },
    {
      id: 'm22',
      sender: 'shashi',
      text: 'Aaah 🥲',
      time: 'Feb 13, 4:32 AM',
    },
    {
      id: 'm23',
      sender: 'melan',
      text: 'ow ow penw sujathian kiyala bio eke dan innw',
      time: 'Feb 13, 4:32 AM',
    },
    {
      id: 'm24',
      sender: 'shashi',
      text: 'Mn eee kale ubw danan hitiyd bn 🥲',
      time: 'Feb 13, 4:32 AM',
    },
    {
      id: 'm25',
      sender: 'melan',
      text: '😂',
      time: 'Feb 13, 4:32 AM',
    },
    {
      id: 'm26',
      sender: 'shashi',
      text: 'Aneee meee 😅',
      time: 'Feb 13, 4:33 AM',
    },
    {
      id: 'm27',
      sender: 'melan',
      text: 'nh bn mn dekala thiyanawa e puruddata kawda me baladdi matak une',
      time: 'Feb 13, 4:33 AM',
    },
  ];

  // Look ahead to see who is sending the next message for 2-sided typing!
  const nextSender = messages[visibleMessages]?.sender || 'shashi';

  // Auto-scroll to the bottom cleanly as new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleMessages, isTyping]);

  // Comfortable 2.6 second delay between messages for easy reading!
  useEffect(() => {
    if (visibleMessages < messages.length) {
      setIsTyping(true);
      const typingTimer = setTimeout(() => {
        setIsTyping(false);
        setVisibleMessages((prev) => prev + 1);
        audio.playBubblePop(); // Play crisp iOS bubble pop!
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

  // Trigger final transition into Memory Gallery!
  const handleFinalProceed = () => {
    triggerBurst();
    audio.playGoldenChime();
    onProceed();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto min-h-[85vh] px-4 py-8 flex flex-col justify-between" id="ios-chat-stage">
      
      {/* Sweet Transition Modal over the chat when clicking the button! */}
      <AnimatePresence>
        {showTransitionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md rounded-3xl glass-panel-dark p-8 text-center border border-gold-500/30 shadow-[0_0_50px_rgba(212,175,55,0.2)] relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
              
              <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Heart className="text-gold-400 animate-pulse" size={32} fill="currentColor" />
              </div>

              <span className="font-mono text-[10px] tracking-[0.3em] text-gold-400 font-semibold uppercase block mb-2">
                HOW IT STARTED VS. NOW ✨
              </span>
              <h3 className="font-display text-2xl text-white font-bold mb-4">
                From DMs to Lifetime Memories
              </h3>
              <p className="font-serif italic text-sm text-gold-100/80 leading-relaxed mb-8">
                "That was how our story first started back in February... Now, let's take a look at some of my absolute favorite memories with you since that exact day!"
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowTransitionModal(false)}
                  className="w-full sm:w-1/3 py-3 rounded-xl glass-panel-light text-gold-300 font-sans text-xs uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Back
                </button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleFinalProceed}
                  className="w-full sm:w-2/3 py-3 rounded-xl bg-gradient-to-r from-gold-600 via-amber-400 to-gold-500 text-black font-sans font-bold text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Let's Go! 🚀</span>
                  <ArrowRight size={14} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
      <div className="flex-1 space-y-3 my-4 px-2 overflow-y-auto max-h-[60vh] pr-2">
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
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
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
                  className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-2.5 text-xs md:text-sm shadow-md leading-relaxed ${
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

        {/* Live 2-Sided Typing Indicator (Switches sides based on who is replying next!) */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`flex flex-col ${nextSender === 'melan' ? 'items-end' : 'items-start'} w-full my-1`}
          >
            <div
              className={`flex items-center gap-1 px-4 py-3 rounded-2xl w-16 shadow-md ${
                nextSender === 'melan'
                  ? 'bg-gradient-to-r from-gold-600 to-amber-500 rounded-br-xs'
                  : 'glass-panel-dark border border-gold-500/20 rounded-bl-xs'
              }`}
            >
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} className={`w-1.5 h-1.5 rounded-full ${nextSender === 'melan' ? 'bg-black' : 'bg-gold-400'}`} />
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className={`w-1.5 h-1.5 rounded-full ${nextSender === 'melan' ? 'bg-black' : 'bg-gold-400'}`} />
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} className={`w-1.5 h-1.5 rounded-full ${nextSender === 'melan' ? 'bg-black' : 'bg-gold-400'}`} />
            </div>
          </motion.div>
        )}

        {/* Auto-scroll target anchor */}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Footer Action Button to Open Transition Pop-Up */}
      <div className="mt-6 pt-4 border-t border-white/5 text-center">
        <AnimatePresence>
          {chatComplete ? (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowTransitionModal(true)}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-600 via-amber-400 to-gold-500 text-black font-sans font-bold text-xs tracking-widest uppercase shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] transition-all cursor-pointer inline-flex items-center gap-2"
              id="proceed-from-chat-btn"
            >
              <Sparkles size={14} className="animate-spin-slow" />
              <span>See Our Memories Now 💖</span>
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
