import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, RefreshCw, Flower2 } from 'lucide-react';

import { Phase } from './types';
import LockedGate from './components/LockedGate';
import BypassModal from './components/BypassModal';
import TeakwoodDoor from './components/TeakwoodDoor';
import PlayfulInterlude from './components/PlayfulInterlude';
import FirstChat from './components/FirstChat';
import MemoryGallery from './components/MemoryGallery';
import GrandFinale from './components/GrandFinale';
import CelebrationCanvas from './components/CelebrationCanvas';
import { audio } from './utils/audio';

export default function App() {
  const [currentPhase, setCurrentPhase] = useState<Phase>('LOCKED');
  const [isBypassed, setIsBypassed] = useState(false);
  const [isBypassModalOpen, setIsBypassModalOpen] = useState(false);
  const [particleTrigger, setParticleTrigger] = useState(false);

  const targetDate = new Date('2026-07-31T00:00:00');

  useEffect(() => {
    const now = new Date();
    if (now >= targetDate && currentPhase === 'LOCKED') {
      setCurrentPhase('THRESHOLD');
    }
  }, [targetDate, currentPhase]);

  const handleBypassSuccess = () => {
    setIsBypassed(true);
    setIsBypassModalOpen(false);
    setCurrentPhase('THRESHOLD');
  };

  const triggerParticleBurst = () => {
    setParticleTrigger(true);
  };

  const handleTimerExpire = () => {
    triggerParticleBurst();
    audio.playGoldenChime();
    setTimeout(() => {
      setCurrentPhase('THRESHOLD');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2500);
  };

  const handleReset = () => {
    setIsBypassed(false);
    setCurrentPhase('LOCKED');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    // NEW ROMANTIC BACKGROUND: Soft pinks, white clouds, elegant text
    <div className="relative min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-100 overflow-x-hidden font-sans text-slate-700 selection:bg-rose-200 selection:text-rose-900" id="main-odyssey-wrapper">
      
      {/* Soft overlay gradient to blend everything */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/60 via-transparent to-rose-100/30 z-0" />

      <CelebrationCanvas 
        active={currentPhase === 'GALLERY' || currentPhase === 'FINALE'} 
        triggerBurst={particleTrigger}
        onBurstComplete={() => setParticleTrigger(false)}
      />

      {/* Light Frosted Glass Header */}
      <header className="sticky top-0 w-full z-40 bg-white/50 backdrop-blur-xl border-b border-white/80 px-6 py-4 shadow-[0_4px_20px_rgba(255,192,203,0.3)]" id="global-header">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-2 text-rose-500">
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            >
              <Flower2 size={20} className="drop-shadow-sm" strokeWidth={1.5} />
            </motion.div>
            <h1 className="font-serif text-lg md:text-xl font-medium tracking-[0.15em] uppercase text-rose-800">
              For You, Shashi.
            </h1>
          </div>

          <div className="hidden sm:flex items-center gap-3 px-5 py-2 rounded-full bg-white/60 border border-rose-100 shadow-inner text-[10px] font-sans font-semibold tracking-widest text-slate-400">
            <span className={`${currentPhase === 'LOCKED' ? 'text-rose-500 drop-shadow-sm' : ''}`}>Gatekeeper</span>
            <span className="text-rose-200">•</span>
            <span className={`${currentPhase === 'THRESHOLD' ? 'text-rose-500 animate-pulse' : ''}`}>Threshold</span>
            <span className="text-rose-200">•</span>
            <span className={`${currentPhase === 'PLAYFUL' ? 'text-rose-500' : ''}`}>Interlude</span>
            <span className="text-rose-200">•</span>
            <span className={`${currentPhase === 'FIRST_CHAT' ? 'text-rose-500' : ''}`}>Origins</span>
            <span className="text-rose-200">•</span>
            <span className={`${currentPhase === 'GALLERY' ? 'text-rose-500' : ''}`}>Gallery</span>
            <span className="text-rose-200">•</span>
            <span className={`${currentPhase === 'FINALE' ? 'text-rose-500' : ''}`}>Covenant</span>
          </div>

          <div className="flex items-center gap-3">
            {isBypassed && (
              <span className="text-[9px] font-sans font-bold tracking-widest text-pink-500 uppercase px-3 py-1 rounded-full bg-pink-50 border border-pink-200 shadow-sm">
                Unlocked
              </span>
            )}
            {currentPhase !== 'LOCKED' && (
              <motion.button
                whileHover={{ scale: 1.05, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="p-2 rounded-full bg-white/80 text-rose-400 hover:text-rose-600 border border-rose-100 shadow-sm transition-all cursor-pointer"
                title="Reset Portal State"
              >
                <RefreshCw size={14} />
              </motion.button>
            )}
          </div>
        </div>
      </header>

      <main className="relative w-full z-10" id="phase-arena">
        <AnimatePresence mode="wait">
          {currentPhase === 'LOCKED' && (
            <motion.div key="locked-gate" initial={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }}>
              <LockedGate targetDate={targetDate} onOpenBypass={() => setIsBypassModalOpen(true)} onTimerExpire={handleTimerExpire} />
            </motion.div>
          )}

          {currentPhase === 'THRESHOLD' && (
            <motion.div key="teakwood-threshold" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.8 }}>
              <TeakwoodDoor isBypassed={isBypassed} targetDate={targetDate} onUnlock={() => { setCurrentPhase('PLAYFUL'); triggerParticleBurst(); }} />
            </motion.div>
          )}

          {currentPhase === 'PLAYFUL' && (
            <motion.div key="playful-game" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.8 }}>
              <PlayfulInterlude onSuccess={() => { setCurrentPhase('FIRST_CHAT'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} triggerBurst={triggerParticleBurst} />
            </motion.div>
          )}

          {currentPhase === 'FIRST_CHAT' && (
            <motion.div key="first-chat" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.8 }}>
              <FirstChat onProceed={() => { setCurrentPhase('GALLERY'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} triggerBurst={triggerParticleBurst} />
            </motion.div>
          )}

          {currentPhase === 'GALLERY' && (
            <motion.div key="memory-gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
              <MemoryGallery onProceed={() => { setCurrentPhase('FINALE'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
            </motion.div>
          )}

          {currentPhase === 'FINALE' && (
            <motion.div key="grand-finale" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              <GrandFinale />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BypassModal isOpen={isBypassModalOpen} onClose={() => setIsBypassModalOpen(false)} onSuccess={handleBypassSuccess} />

      <footer className="w-full text-center py-8 text-[11px] font-sans font-medium text-slate-400 border-t border-white/60 mt-12 bg-white/30 backdrop-blur-sm select-none">
        <div className="flex justify-center items-center gap-1.5">
          <Heart size={12} className="text-rose-400 animate-pulse fill-rose-100" />
          <span>Formed with Pure Love • Melan to Shashi • July 31, 2026</span>
          <Heart size={12} className="text-rose-400 animate-pulse fill-rose-100" />
        </div>
      </footer>
    </div>
  );
}
