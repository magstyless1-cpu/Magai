
export interface Model {
  id: string;
  name: string;
  description: string;
  category: 'General' | 'Coding' | 'Creative' | 'Scientific' | 'Analytical';
  icon: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  thinking?: string;
}

export interface ChatSession {
  id: string;
  modelId: string;
  messages: Message[];
  isThinkingMode: boolean;
}
