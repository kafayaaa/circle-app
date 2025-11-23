export interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
}

export interface WebSocketHook {
  isConnected: boolean;
  sendMessage: (message: string) => void;
  messages: Message[];
}
