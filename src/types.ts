/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Phase = 'LOCKED' | 'THRESHOLD' | 'PLAYFUL' | 'GALLERY' | 'FINALE';

export interface MemoryItem {
  id: string;
  date: string;
  title: string;
  description: string;
  quote: string;
  gradient: string; // Scenic, high-fidelity color palette gradient representing the memory
  illustrationType: 'waves' | 'constellation' | 'heart' | 'temple' | 'healing-pulse' | 'stars';
  type: 'REAL' | 'SURREAL'; // REAL memory or the custom surreal healing milestone
}

export interface DiyaState {
  id: number;
  isLit: boolean;
  x: number; // percentage width
  y: number; // percentage height
}
