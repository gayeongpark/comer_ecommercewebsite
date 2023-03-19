import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../api/firebase';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AuthNav from './AuthNav';
import { loginGoogle } from '../../api/firebase';
import { BiShow } from 'react-icons/bi';
import { BiHide } from 'react-icons/bi';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [userGoogle] = useAuthState(auth);

  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = {
        email,
        password,
      };
      console.log(response);
      await axios.post('/auth/login', response, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      navigate('/');
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div>
      <div>
        <AuthNav />
        <div className='isolate bg-white py-24 px-6 sm:py-32 lg:px-8'>
          <div className='mx-auto max-w-xl text-center'>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Log in
            </h1>
            <p className='mt-2 text-lg leading-8 text-gray-600'>
              Explore thousands of experiences and make friends as a member.
            </p>
            {userGoogle ? (
              navigate('/')
            ) : (
              <button
                type='button'
                className='mt-8 w-full justify-center text-white bg-red-700 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-semibold rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2'
                onClick={() => loginGoogle()}
              >
                <svg
                  className='w-4 h-4 mr-2 -ml-1'
                  aria-hidden='true'
                  focusable='false'
                  data-prefix='fab'
                  data-icon='google'
                  role='img'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 488 512'
                >
                  <path
                    fill='currentColor'
                    d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z'
                  ></path>
                </svg>
                Sign up with Google
              </button>
            )}
            <p className='mt-5'>or</p>
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
              <div className='sm:col-span-2' id='password'>
                <label className='block text-sm font-semibold leading-6 text-gray-900'>
                  Password
                </label>
                <div className='relative mt-2.5'>
                  <input
                    type={open === false ? 'password' : 'text'}
                    name='password'
                    id='password'
                    autoComplete='off'
                    onChange={(e) => setPassowrd(e.target.value)}
                    className='block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-700'
                    required
                  />
                  <div className='text-2xl absolute top-2 right-5 text-gray-300'>
                    {open === false ? (
                      <BiHide onClick={toggle} />
                    ) : (
                      <BiShow className='text-gray-900' onClick={toggle} />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-10'>
              <button
                type='submit'
                className='block w-full rounded-md bg-red-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700'
              >
                Continue
              </button>
              {error && error}
              <div className='mx-auto max-w-2xl text-center'>
                <p className='mt-8 text-md leading-8 text-gray-600'>
                  Don't have an Account?{' '}
                  <Link to='/signup'>
                    <button>Create One</button>
                  </Link>
                </p>
              </div>
              <div className='mx-auto max-w-2xl text-center'>
                <p className='mt-4 text-md leading-8 text-gray-600'>
                  <Link to='/forgotPassword'>
                    <button>Forgot password?</button>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
