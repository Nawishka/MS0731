import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, RefreshCw, Sparkles, Flower2 } from 'lucide-react';

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

  // 🌟 NEW FIX: Automatically scroll to the top smoothly whenever the phase changes! 🌟
  useEffect(() => {
    const scrollTimer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100); // 100ms delay gives the old page time to fade out first
    
    return () => clearTimeout(scrollTimer);
  }, [currentPhase]);

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
    }, 2500);
  };

  const handleReset = () => {
    setIsBypassed(false);
    setCurrentPhase('LOCKED');
  };

  return (
    <div className="relative min-h-screen font-sans text-purple-50 selection:bg-fuchsia-500/30 overflow-x-hidden" id="main-odyssey-wrapper">
      
      {/* 🌟 Rich Background: Beautiful forest image with cozy, colorful glass blurs 🌟 */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-purple-900/50 to-fuchsia-900/60 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b041a] via-transparent to-transparent opacity-80" />
        <div className="absolute inset-0 backdrop-blur-[14px]" />
      </div>

      <CelebrationCanvas 
        active={currentPhase === 'GALLERY' || currentPhase === 'FINALE'} 
        triggerBurst={particleTrigger}
        onBurstComplete={() => setParticleTrigger(false)}
      />

      {/* Global Frosted Glass Header */}
      <header className="sticky top-0 w-full z-40 bg-white/5 backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]" id="global-header">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          
          <div className="flex items-center gap-2 text-fuchsia-300">
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}>
              <Flower2 size={20} className="drop-shadow-[0_0_8px_rgba(217,70,239,0.6)]" strokeWidth={1.5} />
            </motion.div>
            <h1 className="font-serif text-lg md:text-xl font-medium tracking-[0.15em] uppercase text-white drop-shadow-md">
              For You, Shashi.
            </h1>
          </div>

          <div className="hidden sm:flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 shadow-inner text-[10px] font-sans font-medium tracking-widest text-purple-200/50">
            <span className={`${currentPhase === 'LOCKED' ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]' : ''}`}>Gatekeeper</span>
            <span className="text-white/20">•</span>
            <span className={`${currentPhase === 'THRESHOLD' ? 'text-fuchsia-300 animate-pulse' : ''}`}>Threshold</span>
            <span className="text-white/20">•</span>
            <span className={`${currentPhase === 'PLAYFUL' ? 'text-white' : ''}`}>Interlude</span>
            <span className="text-white/20">•</span>
            <span className={`${currentPhase === 'FIRST_CHAT' ? 'text-fuchsia-300' : ''}`}>Origins</span>
            <span className="text-white/20">•</span>
            <span className={`${currentPhase === 'GALLERY' ? 'text-white' : ''}`}>Gallery</span>
            <span className="text-white/20">•</span>
            <span className={`${currentPhase === 'FINALE' ? 'text-fuchsia-300' : ''}`}>Covenant</span>
          </div>

          <div className="flex items-center gap-3">
            {isBypassed && (
              <span className="text-[9px] font-sans font-bold tracking-widest text-emerald-300 uppercase px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                Unlocked
              </span>
            )}
            {currentPhase !== 'LOCKED' && (
              <motion.button
                whileHover={{ scale: 1.05, rotate: 180 }} whileTap={{ scale: 0.95 }} onClick={handleReset}
                className="p-2 rounded-full bg-white/10 text-white hover:text-fuchsia-300 border border-white/20 shadow-sm transition-all cursor-pointer"
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
              <PlayfulInterlude onSuccess={() => { setCurrentPhase('FIRST_CHAT'); }} triggerBurst={triggerParticleBurst} />
            </motion.div>
          )}

          {currentPhase === 'FIRST_CHAT' && (
            <motion.div key="first-chat" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.8 }}>
              <FirstChat onProceed={() => { setCurrentPhase('GALLERY'); }} triggerBurst={triggerParticleBurst} />
            </motion.div>
          )}

          {currentPhase === 'GALLERY' && (
            <motion.div key="memory-gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
              <MemoryGallery onProceed={() => { setCurrentPhase('FINALE'); }} />
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

      <footer className="w-full text-center py-8 text-[11px] font-sans text-white/50 border-t border-white/10 mt-12 bg-black/20 backdrop-blur-md select-none">
        <div className="flex justify-center items-center gap-2">
          <Heart size={12} className="text-fuchsia-400/60 animate-pulse fill-fuchsia-500/20" />
          <span>Formed with Pure Love • Melan to Shashi • July 31, 2026</span>
          <Heart size={12} className="text-cyan-400/60 animate-pulse fill-cyan-500/20" />
        </div>
      </footer>
    </div>
  );
}
