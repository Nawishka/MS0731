export type Phase = 'LOCKED' | 'THRESHOLD' | 'PLAYFUL' | 'FIRST_CHAT' | 'GALLERY' | 'FINALE';

export interface DiyaState {
  id: number;
  isLit: boolean;
  x: number;
  y: number;
}

export interface MemoryItem {
  id: string;
  date: string;
  title: string;
  description: string;
  quote: string;
  gradient: string;
  illustrationType: 'waves' | 'constellation' | 'heart' | 'temple' | 'healing-pulse' | 'stars';
  type: 'REAL' | 'SURREAL';
  image?: string;
}
