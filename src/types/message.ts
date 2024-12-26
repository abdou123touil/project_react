export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  read: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participants: {
    id: string;
    firstName: string;
    lastName: string;
    profileImage?: string;
  }[];
  lastMessage?: Message;
  unreadCount: number;
}