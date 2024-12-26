import React from 'react';
import CreatePost from '../components/Post/CreatePost';
import PostList from '../components/Post/PostList';

export default function Home() {
  const token=localStorage.getItem("token");
  return (
    <div className="max-w-2xl mx-auto">
      <CreatePost authorId= {token} />
      <PostList />
    </div>
  );
}