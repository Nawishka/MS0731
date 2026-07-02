import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Key, Lock, X, AlertCircle, Sparkles } from 'lucide-react';
import { audio } from '../utils/audio';

interface BypassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BypassModal({ isOpen, onClose, onSuccess }: BypassModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const normalized = password.trim().toLowerCase();
    
    // Accept standard romantic/custom bypass keys
    if (normalized === '00005' || normalized === 'shashi18' || normalized === 'july31') {
      setError(false);
      audio.playGoldenChime();
      onSuccess();
    } else {
      setError(true);
      setAttempts((prev) => prev + 1);
      // Reset shake animation after 500ms
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          {/* Frosted dark overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Frosted Glass Passcode Dialog */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              y: 0,
              x: error ? [0, -10, 10, -10, 10, -5, 5, 0] : 0
            }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{
              type: 'spring',
              stiffness: error ? 500 : 300,
              damping: error ? 15 : 25,
            }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl glass-panel-dark p-8 text-center z-10 border border-gold-500/20"
            id="bypass-modal-card"
          >
            {/* Ambient Background Gold Glow */}
            <div className="absolute -top-12 -left-12 w-40 h-40 bg-gold-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header Controls */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-gold-200/60 hover:text-gold-200 transition-colors"
              aria-label="Close"
              id="close-bypass-btn"
            >
              <X size={18} />
            </button>

            {/* Icon */}
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/25 flex items-center justify-center mb-6">
              <Lock className="text-gold-400 animate-pulse" size={28} />
            </div>

            {/* Title */}
            <h3 className="font-display text-2xl text-white tracking-wide mb-2">
              Melan's Gatekeeper
            </h3>
            <p className="font-sans text-xs text-gold-100/70 max-w-xs mx-auto mb-6">
              Enter the sacred code to unlock Shashi's 18th Birthday portal instantly.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-400/50">
                  <Key size={18} />
                </span>
                <input
                  type="password"
                  placeholder="Enter access code..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full bg-black/40 border ${
                    error ? 'border-red-500/50 focus:ring-red-500/20' : 'border-gold-500/25 focus:border-gold-400/50 focus:ring-gold-500/10'
                  } rounded-xl py-3 pl-12 pr-4 text-sm text-gold-50 placeholder-gold-200/30 font-mono tracking-widest focus:outline-none focus:ring-4 transition-all`}
                  autoFocus
                  id="bypass-passcode-input"
                />
              </div>

              {/* Error Alert */}
              <AnimatePresence>
                {attempts > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 text-xs text-red-400/80 justify-center bg-red-950/20 border border-red-900/30 rounded-lg p-2"
                  >
                    <AlertCircle size={14} />
                    <span>The ancient teak door remains sealed. Try again.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-gold-600 to-gold-400 text-black font-sans font-semibold rounded-xl text-xs tracking-wider uppercase shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_4px_24px_rgba(212,175,55,0.45)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                id="submit-bypass-btn"
              >
                <span>Authorize Unlocking</span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
