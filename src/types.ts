export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export enum Tab {
  CONTEXT = 'Context',
  TRANSCRIPT = 'Transcript',
  NOTE = 'Note'
}

export interface Patient {
  name: string;
  initials: string;
  email: string;
}
