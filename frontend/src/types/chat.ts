export interface ChatMessage {
  id: string;
  conversationId: string;
  sender: "user" | "bot" | "admin";
  userId: string;
  userName: string;
  message: string;
  timestamp: string;
  read: boolean;
  attachments?: ChatAttachment[];
}

export interface ChatAttachment {
  id: string;
  type: "image" | "file" | "link";
  url: string;
  name: string;
  size?: number;
}

export interface Conversation {
  conversationId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: "active" | "closed" | "pending";
  assignedTo?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatResponse {
  success: boolean;
  data: {
    userMessage: ChatMessage;
    botMessage: ChatMessage;
  };
  message?: string;
}

export interface TypingIndicator {
  conversationId: string;
  userId: string;
  userName: string;
  typing: boolean;
}
