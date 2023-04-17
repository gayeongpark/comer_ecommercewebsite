import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Posted() {
  const [userPosts, setUserPosts] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(`/experiences/profile/${id}`);
        setUserPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserPosts();
  }, [id]);

  return (
    <div>
      {userPosts.map((post) => (
        <div
          key={post._id}
          className='flex justify-between mx-auto mt-8 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none'
        >
          <div>
            <h2>{post.title}</h2>
          </div>
          <div>
            <button className='flex rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'>
              Update
            </button>
            <button className='flex rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
