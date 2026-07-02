/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class BirthdayAudioEngine {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Premium iOS-style Keyboard Click / Tock
   * Extremely brief, crisp, and tactile.
   */
  playBubblePop() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      // High to low rapid pitch sweep characteristic of a premium haptic click
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.04);

      // Fast exponential decay
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {
      console.warn("Audio failed:", e);
    }
  }

  /**
   * Minimal iOS "Tick" for extinguishing candles / diyas
   * Extremely crisp and delicate.
   */
  playWindPuff() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Delicate high-frequency bell-like tick
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2200, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.02);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch (e) {
      console.warn("Audio failed:", e);
    }
  }

  /**
   * Premium crystalline iOS-style glass chime chord
   * Shimmering, elegant pentatonic chord (A5, D6, E6, A6)
   */
  playGoldenChime() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Crystalline pure bell frequencies (A5, D6, E6, A6, D7)
      const freqs = [880.00, 1174.66, 1318.51, 1760.00, 2349.32];
      
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const noteDelay = idx * 0.04; // Very tight, fast arpeggiation for a unified splash
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine'; // Pure glassy tones
        osc.frequency.setValueAtTime(freq, now + noteDelay);

        // Gentle strike, smooth ring
        gain.gain.setValueAtTime(0.0, now + noteDelay);
        gain.gain.linearRampToValueAtTime(0.04, now + noteDelay + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + noteDelay + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + noteDelay);
        osc.stop(now + noteDelay + 0.9);
      });
    } catch (e) {
      console.warn("Audio failed:", e);
    }
  }

  /**
   * Premium sliding luxury lock release / pneumatic swipe
   * Followed by a delicate glass chime.
   */
  playDoorUnlock() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      // Deep premium low-frequency breath
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(95, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.55);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, now);
      filter.frequency.exponentialRampToValueAtTime(60, now + 0.55);

      gain.gain.setValueAtTime(0.0, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.65);

      // Trigger the elegant chord arpeggio at the climax
      setTimeout(() => this.playGoldenChime(), 350);
    } catch (e) {
      console.warn("Audio failed:", e);
    }
  }

  /**
   * Soft organic heartbeat (Lub-dub pulse)
   * Deep, warm, low-frequency pressure wave.
   */
  playHeartbeat() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const playPulse = (time: number, volume: number) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(48, time);
        osc.frequency.exponentialRampToValueAtTime(25, time + 0.12);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(80, time);

        gain.gain.setValueAtTime(0.0, time);
        gain.gain.linearRampToValueAtTime(volume, time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.15);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(time);
        osc.stop(time + 0.2);
      };

      playPulse(now, 0.18);
      playPulse(now + 0.20, 0.10);
    } catch (e) {
      console.warn("Audio failed:", e);
    }
  }
}

export const audio = new BirthdayAudioEngine();
