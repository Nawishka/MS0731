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

  const VALID_PASSWORDS = ['696969'];

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
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md select-none"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-md rounded-[2rem] bg-white/10 backdrop-blur-2xl p-6 md:p-8 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-fuchsia-400/20 rounded-full blur-2xl pointer-events-none" />

            <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
              <X size={18} />
            </button>

            <div className="text-center space-y-2 mb-6">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/20 flex items-center justify-center mx-auto mb-3 shadow-inner">
                {success ? (
                  <CheckCircle2 className="text-emerald-400 animate-bounce drop-shadow-md" size={28} />
                ) : (
                  <Lock className="text-white animate-pulse drop-shadow-md" size={26} />
                )}
              </div>
              <span className="font-sans text-[10px] tracking-[0.3em] text-fuchsia-200 font-bold uppercase block drop-shadow-sm">
                GATEKEEPER ACCESS
              </span>
              <h3 className="font-serif text-2xl text-white font-medium">
                Enter Secret Portal
              </h3>
              <p className="font-sans text-xs text-purple-100/70 max-w-xs mx-auto leading-relaxed">
                Enter the secret password to bypass the magical countdown clock.
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
                  className={`w-full px-5 py-3.5 rounded-2xl bg-black/20 border text-center font-sans font-semibold text-sm tracking-widest text-white placeholder:text-white/30 placeholder:tracking-normal focus:outline-none transition-all shadow-inner ${
                    error
                      ? 'border-red-400/50 shadow-[0_0_15px_rgba(239,68,68,0.2)] animate-shake'
                      : success
                      ? 'border-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.2)] text-emerald-300'
                      : 'border-white/20 focus:border-white focus:bg-black/30'
                  }`}
                  autoFocus
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
                  <Key size={16} />
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-1.5 text-red-300 font-sans text-xs font-medium">
                    <ShieldAlert size={14} />
                    <span>Incorrect password! Try again.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {success && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-1.5 text-emerald-300 font-sans text-xs font-semibold drop-shadow-md">
                    <Sparkles size={14} className="animate-spin-slow" />
                    <span>Access Granted! Opening Portal...</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={!success ? { scale: 1.02 } : {}} whileTap={!success ? { scale: 0.98 } : {}} type="submit" disabled={!input.trim() || success}
                className={`w-full py-3.5 rounded-2xl font-sans font-bold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  success
                    ? 'bg-emerald-500/30 border border-emerald-400/50 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                    : !input.trim()
                    ? 'bg-white/5 border border-white/10 text-white/30 cursor-not-allowed'
                    : 'bg-white/20 hover:bg-white/30 border border-white/30 text-white shadow-[0_4px_15px_rgba(0,0,0,0.2)]'
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
