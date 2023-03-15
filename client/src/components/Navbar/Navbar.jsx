import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../api/firebase';
import { logoutGoogle } from '../../api/firebase';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../../redux/authSlice';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const [userGoogle] = useAuthState(auth);
  const [user, setUser] = useState('');
  const [authenticate, setAuthenticate] = useState(false);
  const authUser = useSelector((state) => state.authUser.value);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      if (authUser) {
        try {
          const response = await axios.get('/auth/authenticatedUser', {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          });
          const user = response.data;
          setAuthenticate(true);
          setUser(user);
          dispatch(setAuthUser(true));
          console.log(user);
        } catch (error) {
          setAuthenticate(false);
          dispatch(setAuthUser(false));
        }
      }
    })();
  }, [authUser, dispatch]);
  const logout = async () => {
    await axios.post('/auth/logout');
    window.location.reload();
  };

  return (
    <>
      <div className='min-h-full'>
        <Disclosure as='nav' className='bg-800'>
          {({ open }) => (
            <>
              <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='flex h-16 items-center justify-between'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                      <h1>Comer</h1>
                    </div>
                    <div className='hidden md:block'></div>
                  </div>
                  <div className='hidden md:block'>
                    <div className='ml-4 flex items-center md:ml-6 space-x-4'>
                      <button
                        type='button'
                        className='flex-inline rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                      >
                        Be a host
                      </button>
                      <button
                        type='button'
                        className='rounded-full p-1 text-red-400 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-800'
                      >
                        <span className='sr-only'>View notifications</span>
                        <BellIcon className='h-6 w-6' aria-hidden='true' />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as='div' className='relative ml-3'>
                        {!userGoogle && !authenticate && (
                          <div>
                            <Menu.Button className='flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-800'>
                              <span className='sr-only'>Open user menu</span>
                              <img
                                className='h-8 w-8 rounded-full'
                                src='https://images.unsplash.com/photo-1468657988500-aca2be09f4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                                alt=''
                              />
                            </Menu.Button>
                          </div>
                        )}
                        {userGoogle && (
                          <div>
                            <Menu.Button className='flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-800'>
                              <span className='sr-only'>Open user menu</span>
                              <img
                                className='h-8 w-8 rounded-full'
                                src={userGoogle.photoURL}
                                alt=''
                              />
                            </Menu.Button>
                          </div>
                        )}
                        {authenticate && (
                          <div>
                            <Menu.Button className='flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-800'>
                              <span className='sr-only'>Open user menu</span>
                              <img
                                className='h-8 w-8 rounded-full'
                                src='https://images.unsplash.com/photo-1673454343632-b8bd0e0754a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                                alt=''
                              />
                            </Menu.Button>
                          </div>
                        )}
                        <Transition
                          as={Fragment}
                          enter='transition ease-out duration-100'
                          enterFrom='transform opacity-0 scale-95'
                          enterTo='transform opacity-100 scale-100'
                          leave='transition ease-in duration-75'
                          leaveFrom='transform opacity-100 scale-100'
                          leaveTo='transform opacity-0 scale-95'
                        >
                          <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                            {!authenticate && !userGoogle && (
                              <Link to='/login'>
                                <Menu.Item>
                                  {({ active }) => (
                                    <div
                                      href='#'
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                      )}
                                    >
                                      Log in
                                    </div>
                                  )}
                                </Menu.Item>
                              </Link>
                            )}
                            {authenticate && (
                              <Menu.Item>
                                {({ active }) => (
                                  <div
                                    onClick={logoutGoogle}
                                    href='#'
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Welcome {user.email}!
                                  </div>
                                )}
                              </Menu.Item>
                            )}
                            {userGoogle && (
                              <Menu.Item>
                                {({ active }) => (
                                  <div
                                    onClick={logoutGoogle}
                                    href='#'
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Welcome {userGoogle.email}!
                                  </div>
                                )}
                              </Menu.Item>
                            )}
                            {(authenticate || userGoogle) && (
                              <Menu.Item>
                                {({ active }) => (
                                  <div
                                    onClick={logout}
                                    href='#'
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Log out
                                  </div>
                                )}
                              </Menu.Item>
                            )}
                            {/* {userGoogle && (
                              <Menu.Item>
                                {({ active }) => (
                                  <div
                                    onClick={logoutGoogle}
                                    href='#'
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Log out
                                  </div>
                                )}
                              </Menu.Item>
                            )} */}
                            {(authenticate || userGoogle) && (
                              <Menu.Item>
                                {({ active }) => (
                                  <div
                                    onClick={logoutGoogle}
                                    href='#'
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Your profile
                                  </div>
                                )}
                              </Menu.Item>
                            )}
                            {/* {userGoogle && (
                              <Menu.Item>
                                {({ active }) => (
                                  <div
                                    onClick={logoutGoogle}
                                    href='#'
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Your profile
                                  </div>
                                )}
                              </Menu.Item>
                            )} */}
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  href='#'
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  Language
                                </div>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className='-mr-2 flex md:hidden'>
                    {/* Mobile menu button */}
                    <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                      <span className='sr-only'>Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className='block h-6 w-6'
                          aria-hidden='true'
                        />
                      ) : (
                        <Bars3Icon
                          className='block h-6 w-6'
                          aria-hidden='true'
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
              <Disclosure.Panel className='md:hidden'>
                <div className='space-y-1 px-2 pt-2 pb-3 sm:px-3'></div>
                <div className='border-t border-gray-700 pt-4 pb-3'>
                  <div className='flex items-center px-5'>
                    <div className='flex-shrink-0'>
                      <img
                        className='h-10 w-10 rounded-full'
                        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                        alt=''
                      />
                    </div>
                    <div className='ml-3'>
                      {userGoogle && (
                        <div className='text-sm font-medium leading-none text-gray-400'>
                          {userGoogle.email}
                        </div>
                      )}
                      {authenticate && (
                        <div className='text-sm font-medium leading-none text-gray-400'>
                          {user.email}
                        </div>
                      )}
                    </div>
                    <button
                      type='button'
                      className='ml-auto flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-700'
                    >
                      <span className='sr-only'>View notifications</span>
                      <BellIcon className='h-6 w-6' aria-hidden='true' />
                    </button>
                  </div>
                  <div className='mt-3 space-y-1 px-2'>
                    {!authenticate && !userGoogle && (
                      <Link to={'/login'}>
                        <Disclosure.Button className='block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'>
                          Log in
                        </Disclosure.Button>
                      </Link>
                    )}
                    {(authenticate || userGoogle) && (
                      <Disclosure.Button className='block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'>
                        Log out
                      </Disclosure.Button>
                    )}
                    <Disclosure.Button className='block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'>
                      Your profile
                    </Disclosure.Button>
                    <Disclosure.Button className='block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'>
                      Settings
                    </Disclosure.Button>
                    <Disclosure.Button className='block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'>
                      Be a host
                    </Disclosure.Button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}
