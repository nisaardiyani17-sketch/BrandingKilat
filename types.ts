export interface BrandProfile {
  name: string;
  type: string;
  tags: string[];
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  lastUpdated: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  chips?: string[];
}

export interface Asset {
  id: string;
  name: string;
  type: string;
  date: string;
  status: 'Ready' | 'Processing' | 'Draft';
  iconColor: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'success' | 'info' | 'warning';
}

export enum Page {
  DASHBOARD = 'dashboard',
  GENERATOR = 'generator',
  EDITOR = 'editor',
}
