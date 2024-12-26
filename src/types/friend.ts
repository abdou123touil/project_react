export interface FriendRequest {
  id: string;
  senderId: string;
  receiverId: string;
  status: 'pending' | 'accepted' | 'rejected';
  sender: {
    firstName: string;
    lastName: string;
    profileImage?: string;
  };
  createdAt: string;
}

export interface Friend {
  id: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  status: 'online' | 'offline';
}