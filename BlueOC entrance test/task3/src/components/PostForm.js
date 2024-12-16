import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../actions/postActions';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { title, body };
    dispatch(addPost(newPost));
    setTitle('');
    setBody('');
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      </div>
      <div>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
      />
      </div>
      <button type="submit">Add Post</button>
    </form>
    </div>
  );
};

export default PostForm;