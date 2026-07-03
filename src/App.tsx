import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Compass, ShieldAlert, Key, RefreshCw, Star } from 'lucide-react';

import { Phase } from './types';
import LockedGate from './components/LockedGate';
import BypassModal from './components/BypassModal';
import TeakwoodDoor from './components/TeakwoodDoor';
import PlayfulInterlude from './components/PlayfulInterlude';
import MemoryGallery from './components/MemoryGallery';
import GrandFinale from './components/GrandFinale';
import CelebrationCanvas from './components/CelebrationCanvas';
import { audio } from './utils/audio';

export default function App() {
  const [currentPhase, setCurrentPhase] = useState<Phase>('LOCKED');
  const [isBypassed, setIsBypassed] = useState(false);
  const [isBypassModalOpen, setIsBypassModalOpen] = useState(false);
  const [particleTrigger, setParticleTrigger] = useState(false);

  // Shashi's exact 18th Birthday: July 31, 2026 at midnight
  const targetDate = new Date('2026-07-03T18:52:00');

  // Check if current date is past the target date on mount (Fixed loop trap!)
  useEffect(() => {
    const now = new Date();
    if (now >= targetDate && currentPhase === 'LOCKED') {
      setCurrentPhase('THRESHOLD');
    }
  }, [targetDate, currentPhase]);

  // Handle successful bypass authentication
  const handleBypassSuccess = () => {
    setIsBypassed(true);
    setIsBypassModalOpen(false);
    setCurrentPhase('THRESHOLD');
  };

  const triggerParticleBurst = () => {
    setParticleTrigger(true);
  };

  // What happens when the timer reaches 00:00:00!
  const handleTimerExpire = () => {
    triggerParticleBurst();
    audio.playGoldenChime();
    
    setTimeout(() => {
      setCurrentPhase('THRESHOLD');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2500);
  };

  // Reset helper for testing/debugging purposes (essential for Melan)
  const handleReset = () => {
    setIsBypassed(false);
    setCurrentPhase('LOCKED');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#08090b] bg-radial-dark bg-grid-glow overflow-x-hidden font-sans text-gold-100 selection:bg-gold-500/30 selection:text-white" id="main-odyssey-wrapper">
      
      {/* Celebration Particle System Canvas (Active during Gallery, Finale, or as a burst) */}
      <CelebrationCanvas 
        active={currentPhase === 'GALLERY' || currentPhase === 'FINALE'} 
        triggerBurst={particleTrigger}
        onBurstComplete={() => setParticleTrigger(false)}
      />

      {/* Global Sleek Glassmorphic Header */}
      <header className="sticky top-0 w-full z-40 bg-black/30 backdrop-blur-md border-b border-white/5 px-6 py-4" id="global-header">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-2">
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="text-gold-400"
            >
              <Star size={18} fill="currentColor" className="opacity-70" />
            </motion.div>
            <h1 className="font-display text-base md:text-lg text-gold-200 font-semibold tracking-[0.25em] uppercase">
              For You, Shashi.
            </h1>
          </div>

          {/* Core Phase Progress Indicator (iPhone style) */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-wider text-gold-300/40">
            <span className={`${currentPhase === 'LOCKED' ? 'text-gold-400 font-bold' : ''}`}>Gatekeeper</span>
            <span>•</span>
            <span className={`${currentPhase === 'THRESHOLD' ? 'text-gold-400 font-bold animate-pulse' : ''}`}>Threshold</span>
            <span>•</span>
            <span className={`${currentPhase === 'PLAYFUL' ? 'text-gold-400 font-bold' : ''}`}>Interlude</span>
            <span>•</span>
            <span className={`${currentPhase === 'GALLERY' ? 'text-gold-400 font-bold' : ''}`}>Gallery</span>
            <span>•</span>
            <span className={`${currentPhase === 'FINALE' ? 'text-gold-400 font-bold' : ''}`}>Covenant</span>
          </div>

          {/* Action Tools (Bypass/Reset Indicators) */}
          <div className="flex items-center gap-3">
            {isBypassed && (
              <span className="text-[9px] font-mono tracking-widest text-emerald-400/80 uppercase px-3 py-1 rounded-full bg-emerald-950/20 border border-emerald-900/30">
                Bypassed
              </span>
            )}
            
            {/* Reset button shown once out of LOCKED phase */}
            {currentPhase !== 'LOCKED' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="p-2 rounded-full glass-panel-light text-gold-400/60 hover:text-gold-400 border border-white/5 transition-colors cursor-pointer"
                title="Reset Portal State"
                id="reset-state-btn"
              >
                <RefreshCw size={14} />
              </motion.button>
            )}
          </div>
        </div>
      </header>

      {/* Primary Phase Rendering Arena */}
      <main className="relative w-full z-10" id="phase-arena">
        <AnimatePresence mode="wait">
          {currentPhase === 'LOCKED' && (
            <motion.div
              key="locked-gate"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <LockedGate 
                targetDate={targetDate} 
                onOpenBypass={() => setIsBypassModalOpen(true)} 
                onTimerExpire={handleTimerExpire}
              />
            </motion.div>
          )}

          {currentPhase === 'THRESHOLD' && (
            <motion.div
              key="teakwood-threshold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              <TeakwoodDoor 
                isBypassed={isBypassed} 
                targetDate={targetDate} 
                onUnlock={() => {
                  setCurrentPhase('PLAYFUL');
                  triggerParticleBurst();
                }} 
              />
            </motion.div>
          )}

          {currentPhase === 'PLAYFUL' && (
            <motion.div
              key="playful-game"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              <PlayfulInterlude 
                onSuccess={() => {
                  setCurrentPhase('GALLERY');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
                triggerBurst={triggerParticleBurst}
              />
            </motion.div>
          )}

          {currentPhase === 'GALLERY' && (
            <motion.div
              key="memory-gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <MemoryGallery 
                onProceed={() => {
                  setCurrentPhase('FINALE');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
              />
            </motion.div>
          )}

          {currentPhase === 'FINALE' && (
            <motion.div
              key="grand-finale"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <GrandFinale />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Secret Bypass Password Modal */}
      <BypassModal 
        isOpen={isBypassModalOpen} 
        onClose={() => setIsBypassModalOpen(false)} 
        onSuccess={handleBypassSuccess} 
      />

      {/* Decorative Traditional Border Rings in corners */}
      <footer className="w-full text-center py-8 text-[10px] font-mono text-gold-400/20 border-t border-white/5 mt-12 bg-black/10 select-none" id="footer-decor">
        <div className="flex justify-center items-center gap-1.5">
          <Heart size={10} className="text-gold-500/30 animate-pulse" />
          <span>Formed with Pure Love • Melan to Shashi • July 31, 2026</span>
          <Heart size={10} className="text-gold-500/30 animate-pulse" />
        </div>
      </footer>
    </div>
  );
}
