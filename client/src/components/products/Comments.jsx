import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Comment from './Comment';

export default function Comments({ experienceId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  const authUser = useSelector((state) => state.authUser.value);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axios.get(`/comments/${experienceId}`, {
          withCredentials: true,
        });
        // console.log(data);
        setComments(data);
        // console.log(comments);
      } catch (error) {}
    };
    fetchComments();
  }, [experienceId]);

  const handleCommentSubmit = async (event) => {
    if (event.key === 'Enter') {
      try {
        const response = await axios.post(
          '/comments/',
          {
            description: newComment,
            experienceId: experienceId,
          },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );
        console.log(response.data);
        // fetchComments();
        setComments((comments) => [response.data, ...comments]);
        setNewComment('');
        setError('');
      } catch (error) {
        console.log(error);
        setError(error.response.data);
      }
    }
  };

  return (
    <div className='w-full items-center mt-5'>
      <div className='flex w-full items-center space-x-2'>
        {authUser.profilePicture ? (
          <img
            src={`http://localhost:8000/${authUser.profilePicture}`}
            alt='Avatar'
            className='w-10 h-10 rounded-full items-center'
          />
        ) : (
          <img
            className='h-10 w-10 rounded-full items-center'
            src='https://www.donut.app/assets/donut.png'
            alt='profileImage'
          />
        )}
        <input
          type='text'
          name='comment'
          id='comment'
          autoComplete='off'
          placeholder='Add a comment here...'
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyUp={handleCommentSubmit}
          className='flex justify-center w-full input text-3xl rounded-full border-1 py-3 px-5 border-red-600 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
        />
      </div>
      <div className='flex ml-2 text-red-600'>{error && error}</div>
      <div className='flex-col'>
        {comments.map((comment) => (
          <div className='flex-block' key={comment._id}>
            <Comment comment={comment} />
          </div>
        ))}
      </div>
    </div>
  );
}
