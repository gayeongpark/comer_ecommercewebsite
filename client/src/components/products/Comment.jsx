import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Comment({ comment }) {
  const [commentOwner, setCommentOwner] = useState({});
  const [dateString, setDateString] = useState('');
  //   console.log(comment);

  useEffect(() => {
    const fetchCommentOwner = async () => {
      if (!comment.userId) {
        throw new Error('Comment does not have an userId property.');
      }
      const response = await axios.get(`/users/${comment.userId}`);
      setCommentOwner(response.data);
    };
    fetchCommentOwner();
  }, [comment.userId]);

  useEffect(() => {
    const now = new Date();
    const createdAt = new Date(comment.createdAt);
    const diff = Math.round((now - createdAt) / (1000 * 60 * 60 * 24));

    if (diff === 0) {
      setDateString('Today');
    } else if (diff === 1) {
      setDateString('Yesterday');
    } else {
      setDateString(`${diff} days ago`);
    }
  }, [comment.createdAt]);

  const handleDelete = async () => {
    try {
      if (!comment._id) {
        throw new Error('Comment does not have an _id property.');
      }
      const response = await axios.delete(`/comments/delete/${comment._id}`);
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex gap-4 my-4 border-b pb-2'>
      {commentOwner?.profilePicture ? (
        <img
          className='w-12 h-12 rounded-full'
          src={`http://localhost:8000/${commentOwner.profilePicture}`}
          alt='avatar'
        />
      ) : (
        <img
          className='w-12 h-12 rounded-full'
          src='https://www.donut.app/assets/donut.png'
          alt='avatar'
        />
      )}
      <div className='flex flex-col text-gray-800'>
        <span className='font-semibold'>
          {commentOwner?.firstName} {commentOwner?.lastName}
          <span className='ml-2 text-sm text-gray-400'>{dateString}</span>
        </span>
        <span className='text-sm'>{comment?.description}</span>
      </div>
      <div className='flex flex-col-reverse'>
        <button onClick={handleDelete} className='text-red-600 ml-5'>
          Delete
        </button>
      </div>
    </div>
  );
}
