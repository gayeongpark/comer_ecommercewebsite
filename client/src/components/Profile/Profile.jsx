import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Profile() {
  const [openInputImage, setOpenInputImage] = useState(false);
  const [openInputName, setOpenInputName] = useState(false);
  const [openInputEmail, setOpenInputEmail] = useState(false);
  const [openInputPhone, setOpenInputPhone] = useState(false);
  const [openInputAddress, setOpenInputAddress] = useState(false);
  return (
    <div className='mx-auto mb-20 max-w-7xl px-4 sm:px-6 lg:px-8 overflow-hidden bg-white py-5 sm:rounded-lg'>
      <div className='px-4 py-6'>
        <p className='mt-1 max-w-2xl text-sm text-gray-500'>
          <Link to='/'>Home</Link> &#60; Personal info
        </p>
        <h3 className='mt-10 mb-5 text-3xl font-semibold leading-6 text-gray-900'>
          Person info
        </h3>
      </div>

      <div className='w-2/3'>
        <dl>
          <div className='border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Profile image</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              <span className='inline-block h-36 w-36 mb-2 overflow-hidden rounded-full bg-gray-100'>
                <svg
                onClick={() => setOpenInputImage(!openInputImage)}
                  className='flex h-full w-full text-gray-300'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                </svg>
              </span>
            </dd>
            {openInputImage && (
            <div className='flex items-center space-x-4 mt-3 mt-4'>
              <button
                type='button'
                className='flex-inline rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
              >
                Save
              </button>
            </div>
            )}
          </div>
          <div className='px-4 py-10 border-b sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Legal name</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              Margot Foster
            </dd>
            <div
              onClick={() => setOpenInputName(!openInputName)}
              className='font-medium text-red-600 cursor-pointer'
            >
              Edit
            </div>
            {openInputName && (
              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='first-name'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  First name
                </label>
                <input
                  type='text'
                  name='first-name'
                  id='first-name'
                  autoComplete='given-name'
                  className='mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                />
              </div>
            )}
            {openInputName && (
              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='last-name'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Last name
                </label>
                <input
                  type='text'
                  name='last-name'
                  id='last-name'
                  autoComplete='family-name'
                  className='mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                />
              </div>
            )}
            {openInputName && (
              <div className='flex items-center space-x-4 mt-4'>
                <button
                  type='button'
                  className='flex-inline rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                >
                  Save
                </button>
              </div>
            )}
          </div>

          <div className='border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Email address</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              margotfoster@example.com
            </dd>
            <div
              onClick={() => setOpenInputEmail(!openInputEmail)}
              className='font-medium text-red-600 cursor-pointer'
            >
              Edit
            </div>
            {openInputEmail && (
              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='last-name'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Email Address
                </label>
                <input
                  type='text'
                  name='last-name'
                  id='last-name'
                  autoComplete='family-name'
                  className='mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                />
              </div>
            )}
            {openInputEmail && (
              <div className='flex items-center space-x-4 mt-4'>
                <button
                  type='button'
                  className='flex-inline rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                >
                  Save
                </button>
              </div>
            )}
          </div>
          <div className='border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Phone Number</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              +82 10 1234 1234
            </dd>
            <div
              onClick={() => setOpenInputPhone(!openInputPhone)}
              className='font-medium text-red-600 cursor-pointer'
            >
              Edit
            </div>
            {openInputPhone && (
            <div className='col-span-6 sm:col-span-3'>
              <label
                htmlFor='first-name'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Phone Number
              </label>
              <input
                type='text'
                name='phone-number'
                id='phone-number'
                autoComplete='off'
                className='mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
              />
            </div>
            )}
            {openInputPhone && (
            <div className='flex items-center space-x-4 mt-4'>
              <button
                type='button'
                className='flex-inline rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
              >
                Save
              </button>
            </div>
            )}
          </div>
          <div className='border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Address</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
              incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
              consequat sint. Sit id mollit nulla mollit nostrud in ea officia
              proident. Irure nostrud pariatur mollit ad adipisicing
              reprehenderit deserunt qui eu.
            </dd>
            <div
              onClick={() => setOpenInputAddress(!openInputAddress)}
              className='font-medium text-red-600 cursor-pointer'
            >
              Edit
            </div>
            {openInputAddress && (
              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='country'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  country
                </label>
                <select
                  id='country'
                  name='country'
                  autoComplete='country-name'
                  className='mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            )}
            {openInputAddress && (
              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='city'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  City
                </label>
                <input
                  type='text'
                  name='city'
                  id='city'
                  autoComplete='address-level2'
                  className='mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                />
              </div>
            )}
            {openInputAddress && (
              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='region'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  State / Province
                </label>
                <input
                  type='text'
                  name='region'
                  id='region'
                  autoComplete='address-level1'
                  className='mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                />
              </div>
            )}
            {openInputAddress && (
              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='postal-code'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  ZIP / Postal code
                </label>
                <input
                  type='text'
                  name='postal-code'
                  id='postal-code'
                  autoComplete='postal-code'
                  className='mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                />
              </div>
            )}
            {openInputAddress && (
              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='street-address'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Street address
                </label>
                <input
                  type='text'
                  name='street-address'
                  id='street-address'
                  autoComplete='street-address'
                  className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            )}
            {openInputAddress && (
              <div className='flex items-center space-x-4 mt-4'>
                <button
                  type='button'
                  className='flex-inline rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </dl>
      </div>
    </div>
  );
}
