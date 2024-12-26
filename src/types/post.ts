export interface Post {
  id: string;
  content: string;
  imageUrl?: string;
  authorId: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    profileImage?: string;
  };
  likes: number;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  author: {
    firstName: string;
    lastName: string;
    profileImage?: string;
  };
  createdAt: string;
}