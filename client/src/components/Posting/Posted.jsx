import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function Posted() {
  const [userPosts, setUserPosts] = useState([]);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [deletingPostId, setDeletingPostId] = useState('');

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

  const handleDelete = async (postId) => {
    try {
      if (!postId) {
        throw new Error('Post does not have an _id property.');
      }
      setLoadingDelete(true); // set loading state to true
      setDeletingPostId(postId);
      await axios.delete(`/experiences/updateAExperience/${postId}`, {
        withCredentials: true,
      });
      setUserPosts((oldValues) => {
        return oldValues.filter((post) => post._id !== postId);
      });
      setLoadingDelete(false); // set loading state to false after successful delete
      setDeletingPostId(''); // clear deletingPostId after successful delete
      // console.log(response.data);
    } catch (error) {
      console.error(error);
      setLoadingDelete(false);
      setDeletingPostId('');
    }
  };

  return (
    <div className='mx-auto mb-20 max-w-5xl px-4 sm:px-6 lg:px-8 overflow-hidden bg-white py-5 sm:rounded-lg'>
      {userPosts.map((post) => (
        <div
          key={post._id}
          className='flex justify-between mx-auto max-w-2xl p-5 ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none'
        >
          <div className='flex text-2xl items-center justify-center'>
            <h2>{post.title}</h2>
          </div>
          <div className='flex flex-col justify-between gap-4 items-center'>
            <div>
              <Link to={'/myExperience/edit'} state={{ experience: post }}>
                <button className='flex rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'>
                  Edit
                </button>
              </Link>
            </div>
            <div>
              <button
                onClick={() => handleDelete(post._id)}
                disabled={loadingDelete} // disable button while loading
                className='flex rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
              >
                {loadingDelete && deletingPostId === post._id ? (
                  <div className='flex rounded-md border border-transparent bg-red-700 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'>
                    <div role='status'>
                      <svg
                        aria-hidden='true'
                        className='w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-600 items-center'
                        viewBox='0 0 100 101'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                          fill='currentColor'
                        />
                        <path
                          d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                          fill='currentFill'
                        />
                      </svg>
                      <span className='sr-only'>Loading...</span>
                    </div>
                  </div>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
