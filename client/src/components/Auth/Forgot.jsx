import React, { useState } from 'react';
import AuthNav from './AuthNav';
import axios from 'axios';

export default function Forgot() {
  const [email, setEmail] = useState('');
  const [notify, setNotify] = useState({
    show: false,
    error: false,
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        '/auth/forgotPassword',
        { email },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      setNotify({
        show: true,
        error: false,
        message: 'Please check out your email box',
      });
    } catch (error) {
      setNotify({
        show: true,
        error: true,
        message: 'Please check out your email address!',
      });
    }
  };
  return (
    <div>
      <div>
        <AuthNav />
        <div className='isolate bg-white py-24 px-6 sm:py-32 lg:px-8'>
          <div className='mx-auto max-w-xl text-center'>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Forgot password
            </h1>
          </div>

          <form
            className='mx-auto mt-5 max-w-xl sm:mt-5'
            onSubmit={handleSubmit}
          >
            <div className='grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2'>
              <div className='sm:col-span-2' id='email'>
                <label
                  htmlFor='email'
                  className='block text-sm font-semibold leading-6 text-gray-900'
                >
                  Email
                </label>
                <div className='mt-2.5'>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    autoComplete='off'
                    onChange={(e) => setEmail(e.target.value)}
                    className='block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-700'
                    required
                  />
                </div>
              </div>
            </div>
            <div className='mt-10'>
              <button
                type='submit'
                className='block w-full rounded-md bg-red-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700'
              >
                Submit
              </button>
              <div>{notify.show && notify.message}</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
