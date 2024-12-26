import React, { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Comment } from '../../types/post';
import { postService } from '../../services/postService'; // Import postService

interface PostCommentsProps {
  postId: string;
  comments: Comment[];
}

export default function PostComments({ postId, comments }: PostCommentsProps) {
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();

  const createCommentMutation = useMutation({
    mutationFn: async (content: string) => {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      console.log('authorId in mutation:', user._id); // Log the authorId to check if it's correct
      return await postService.addComment(postId, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setContent('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      createCommentMutation.mutate(content);
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Ajouter un commentaire..."
          className="input"
        />
      </form>

      <div className="space-y-3">
        {comments.map((comment) => (
          <div key={comment._id} className="flex space-x-3">
            <div className="flex-1">
              <p className="text-sm font-medium">
                {comment._id || 'Anonymous'}{' '}
                {comment.author?.lastName || ''}
              </p>
              <p className="text-sm text-gray-600">{comment.content}</p>
              <p className="text-xs text-gray-400">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
