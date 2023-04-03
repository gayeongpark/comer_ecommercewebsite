import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Delete() {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const authUser = useSelector((state) => state.authUser.value);
  console.log(authUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`/delete/${id}`);
      setMessage(response.data);
      alert('You account is successfully deleted!');

    } catch (error) {
      setMessage(error.response.data);
    }
  };

  return (
    <div className='isolate bg-white py-24 px-6 sm:py-32 lg:px-8'>
      <div className='mx-auto max-w-xl text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Are you sure to delete your account?
        </h1>
        <p className='mt-7 text-lg leading-8 text-gray-600'>
          {message && message}
        </p>
        <div>
          <form onSubmit={handleSubmit}>
            <button
              type='submit'
              className='mt-8 w-full justify-center text-white bg-red-700 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-semibold rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2'
            >
              Delete account
            </button>
          </form>
          <button
            type='button'
            className='mt-8 w-full justify-center text-gray-700 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-semibold rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
