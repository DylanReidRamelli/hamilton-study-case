// Message model for the UI and ChatGPT (OCP)
export interface Message {
  role: 'user' | 'assistant' | 'system' | 'error';
  content: string;
}
