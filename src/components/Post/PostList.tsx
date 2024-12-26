import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Heart, MessageCircle } from 'lucide-react';
import { postService } from '../../services/postService'; // Import postService
import PostComments from './PostComments';

export default function PostList() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      return await postService.getPosts(); // Use postService to fetch posts
    },
  });

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      {posts?.map((post) => (
        <article key={post._id} className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-3 mb-4">
          
          
            <div>
              <h3 className="font-medium">
                {post.firstName} {post.authorId || 'Anonymous'}
              </h3>
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <p className="mb-4">{post.content}</p>

          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt="Post"
              className="rounded-lg mb-4 max-h-96 w-full object-cover"
            />
          )}

          <div className="flex items-center space-x-4 text-gray-500">
            <button className="flex items-center space-x-1 hover:text-red-500">
              <Heart className="w-5 h-5" />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-500">
              <MessageCircle className="w-5 h-5" />
              <span>{post.comments.length}</span>
            </button>
          </div>

          <PostComments postId={post._id} comments={post.comments} />
        </article>
      ))}
    </div>
  );
}
