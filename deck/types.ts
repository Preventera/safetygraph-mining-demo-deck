export interface RunOfShowEntry {
  duration: number; // minutes: 3, 7, 12
  timing: string;   // e.g., "0:00 - 0:30"
  script: string;
  actions: string[];
  transition?: string; // Quick response to common questions
}

export type SlideMedia =
  | { kind: 'image'; src: string; alt?: string }
  | { kind: 'video'; src: string; poster?: string }
  | { kind: 'iframe'; src: string; title?: string };

export interface SlideContent {
  id: number;
  title: string;
  subtitle?: string;
  bullets: string[];
  type: 'title' | 'content' | 'demo' | 'chart' | 'faq' | 'cta';
  speakerNotes: string;
  demoSteps?: string[];
  visualType?: 'dashboard' | 'map' | 'chart' | 'xai' | 'warning';
  runOfShow: RunOfShowEntry[];

  // ✅ Nouveau : média affiché au centre (image / vidéo / iframe)
  media?: SlideMedia;
}

export interface RiskData {
  type: string;
  percentage: number;
  color: string;
}
