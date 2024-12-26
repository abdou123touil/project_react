const BASE_URL = 'http://localhost:3000/posts';

export const postService = {
  // Create a new post
  createPost: async (authorId: string, content: string) => {
    console.log('Sending payload:', { authorId, content }); // Log payload for debugging

    const token = localStorage.getItem('token'); // Retrieve Bearer token
    const response = await fetch(`${BASE_URL}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ authorId, content }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Error response:', error); // Log response error
      throw new Error(error.message || 'Failed to create post');
    }
    return await response.json();
  },
  // Get all posts
  getPosts: async () => {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    return response.json();
  },

  // Add a comment to a post
  addComment: async (postId: string, content: string) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}'); // Get user data from localStorage
    const authorId = user._id; // Extract authorId
  
    console.log('Sending comment payload:', { postId, content, authorId }); // Log the payload
  
    const response = await fetch(`${BASE_URL}/${postId}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content, authorId }), // Include authorId in the payload
    });
  
    if (!response.ok) {
      const error = await response.json();
      console.error('Error adding comment:', error); // Log detailed error
      throw new Error(error.message || 'Failed to add comment');
    }
  
    return response.json();
  }
  
  
};
