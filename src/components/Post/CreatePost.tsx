import React, { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { postService } from '../../services/postService'; // Import postService

export default function CreatePost({ authorId }: { authorId: string }) {
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: async (content: string) => {
      // Pass the `authorId` to `postService.createPost`
      return await postService.createPost(authorId, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setContent('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      createPostMutation.mutate(content); // Mutate content
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Quoi de neuf ?"
        className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows={3}
      />
      <button
        type="submit"
        disabled={!content.trim()}
        className="btn btn-primary disabled:opacity-50"
      >
        Publier
      </button>
    </form>
  );
}
