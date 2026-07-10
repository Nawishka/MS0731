import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Key, ShieldAlert, X, Sparkles, Lock, CheckCircle2 } from 'lucide-react';
import { audio } from '../utils/audio';

interface BypassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BypassModal({ isOpen, onClose, onSuccess }: BypassModalProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const VALID_PASSWORDS = ['SHASHI18', 'JULY31', 'MELAN'];

  useEffect(() => {
    if (isOpen) {
      setInput('');
      setError(false);
      setSuccess(false);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = input.trim().toUpperCase();

    if (VALID_PASSWORDS.includes(cleanInput)) {
      setError(false);
      setSuccess(true);
      audio.playGoldenChime();
      setTimeout(() => {
        onSuccess();
      }, 1000);
    } else {
      setError(true);
      audio.playBubblePop();
      setInput('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070514]/80 backdrop-blur-md select-none"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-md rounded-[2rem] bg-[#110826]/95 backdrop-blur-xl p-6 md:p-8 border border-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.15)] relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-fuchsia-600/10 rounded-full blur-2xl pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-purple-400/50 hover:text-cyan-400 hover:bg-[#1a0f3c] transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="text-center space-y-2 mb-6">
              <div className="w-14 h-14 rounded-full bg-[#0a0514] border border-cyan-500/30 flex items-center justify-center mx-auto mb-3 shadow-[inset_0_0_15px_rgba(6,182,212,0.1)]">
                {success ? (
                  <CheckCircle2 className="text-emerald-400 animate-bounce drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" size={28} />
                ) : (
                  <Lock className="text-fuchsia-400 animate-pulse drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]" size={26} />
                )}
              </div>
              <span className="font-mono text-[10px] tracking-[0.3em] text-cyan-400 font-bold uppercase block drop-shadow-[0_0_5px_rgba(6,182,212,0.3)]">
                GATEKEEPER ACCESS
              </span>
              <h3 className="font-display text-2xl text-purple-50 font-medium">
                Enter Secret Portal
              </h3>
              <p className="font-serif italic text-xs text-purple-200/60 max-w-xs mx-auto leading-relaxed">
                "Enter the secret password to bypass the magical countdown clock."
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div className="relative">
                <input
                  type="password"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder="Enter secret password..."
                  disabled={success}
                  className={`w-full px-5 py-3.5 rounded-2xl bg-[#070314]/80 border text-center font-mono font-semibold text-sm tracking-widest text-cyan-300 placeholder:text-purple-500/30 placeholder:tracking-normal focus:outline-none transition-all shadow-inner ${
                    error
                      ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)] animate-shake'
                      : success
                      ? 'border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)] text-emerald-400'
                      : 'border-purple-500/30 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                  }`}
                  autoFocus
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-500/50 pointer-events-none">
                  <Key size={16} />
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-1.5 text-red-400 font-sans text-xs font-medium">
                    <ShieldAlert size={14} />
                    <span>Incorrect password! Try again.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {success && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-1.5 text-emerald-400 font-sans text-xs font-semibold drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]">
                    <Sparkles size={14} className="animate-spin-slow" />
                    <span>Access Granted! Opening Portal...</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={!success ? { scale: 1.02 } : {}}
                whileTap={!success ? { scale: 0.98 } : {}}
                type="submit"
                disabled={!input.trim() || success}
                className={`w-full py-3.5 rounded-2xl font-mono font-bold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  success
                    ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                    : !input.trim()
                    ? 'bg-[#0a0514] border border-purple-900/30 text-purple-600/30 cursor-not-allowed'
                    : 'bg-gradient-to-r from-fuchsia-600/80 via-purple-600/80 to-cyan-600/80 text-white shadow-[0_0_20px_rgba(192,38,211,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] border border-white/10'
                }`}
              >
                <span>{success ? 'Unlocking...' : 'Unlock Portal'}</span>
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
