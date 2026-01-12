export interface WorkItem {
  id: string;
  title: string;
  year: string;
  description: string;
  category: 'Essay' | 'Book' | 'Lecture';
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}