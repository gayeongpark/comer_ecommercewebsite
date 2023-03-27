import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Posting() {
  const [openInputImage, setOpenInputImage] = useState(false);
  const [openInputName, setOpenInputName] = useState(false);
  const [openInputAddress, setOpenInputAddress] = useState(false);
  const [openInputIntro, setOpenInputIntro] = useState(false);

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
            <dt className='text-sm font-medium text-gray-500'>Experience image</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              <span className='inline-block h-36 w-36 mb-2 overflow-hidden rounded-full'>
                <img
                  alt='Update profileImage'
                  className='flex h-full w-full text-gray-300'
                  src=''
                ></img>
              </span>
            </dd>
            <input
              type='file'
              name='profilePicture'
              accept='/image/*'
              onClick={() => setOpenInputImage(!openInputImage)}
            />
            {/* <div className='font-medium text-red-600 cursor-pointer'>Edit</div> */}

            {openInputImage && (
              <div className='flex items-center space-x-4 mt-3 mt-4'>
                <button
                  type='submit'
                  className='flex-inline rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                >
                  Save
                </button>
              </div>
            )}
          </div>

          <div className='px-4 py-10 border-b sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Title</dt>

            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>Enjoy Miami's Sunset with Luxury Picnic By the Water</dd>

            <div
              onClick={() => setOpenInputName(!openInputName)}
              className='font-medium text-red-600 cursor-pointer'
            >
              Edit
            </div>
            {openInputName && (
              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='firstName'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Title
                </label>
                <div>Plase input the catched title of your activity</div>
                <input
                  type='text'
                  name='firstName'
                  id='firstName'
                  autoComplete='off'
                  className='mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                />
              </div>
            )}
            {openInputName && (
              <div className='flex items-center space-x-4 mt-4'>
                <button
                  type='submit'
                  className='flex-inline rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                >
                  Save
                </button>
              </div>
            )}
          </div>


          <div className='border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>
              What you'll do
            </dt>

            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'></dd>

            <div
              onClick={() => setOpenInputIntro(!openInputIntro)}
              className='font-medium text-red-600 cursor-pointer'
            >
              Edit
            </div>
            {openInputIntro && (
              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='description'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Description
                </label>
                <div>Please add detailed information about your activity</div>
                <textarea
                  type='text'
                  name='description'
                  id='description'
                  autoComplete='off'
                  className='mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                />
              </div>
            )}
            {openInputIntro && (
              <div className='flex items-center space-x-4 mt-4'>
                <button
                  type='submit'
                  className='flex-inline rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                >
                  Save
                </button>
              </div>
            )}
          </div>

          <div className='px-4 py-10 border-b sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>What's includes</dt>

            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>Korean food in K-town</dd>

            <div
              onClick={() => setOpenInputName(!openInputName)}
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
                  Type of perks
                </label>
                <select
                  id='country'
                  name='country'
                  autoComplete='off'
                  className='mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                >
                  <option>Select what you'll offer</option>
                  <option value='Food'>Food</option>
                  <option value='Transporation'>Transporation</option>
                  <option value='Beverage'>Beverage</option>
                  <option value='Alchohol'>Alchohol</option>
                </select>
                <div>
                <textarea
                  type='text'
                  name='description'
                  id='description'
                  autoComplete='off'
                  className='mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                />
                </div>
                <select
                  id='country'
                  name='country'
                  autoComplete='off'
                  className='mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                >
                  <option>Select what you'll offer</option>
                  <option value='Food'>Food</option>
                  <option value='Transporation'>Transporation</option>
                  <option value='Beverage'>Beverage</option>
                  <option value='Alchohol'>Alchohol</option>
                </select>
                <div>
                <textarea
                  type='text'
                  name='description'
                  id='description'
                  autoComplete='off'
                  className='mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                />
                </div>
                <select
                  id='country'
                  name='country'
                  autoComplete='off'
                  className='mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                >
                  <option>Select what you'll offer</option>
                  <option value='Food'>Food</option>
                  <option value='Transporation'>Transporation</option>
                  <option value='Beverage'>Beverage</option>
                  <option value='Alchohol'>Alchohol</option>
                </select>
                <div>
                <textarea
                  type='text'
                  name='description'
                  id='description'
                  autoComplete='off'
                  className='mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                />
                </div>
                <select
                  id='country'
                  name='country'
                  autoComplete='off'
                  className='mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                >
                  <option>Select what you'll offer</option>
                  <option value='Food'>Food</option>
                  <option value='Transporation'>Transporation</option>
                  <option value='Beverage'>Beverage</option>
                  <option value='Alchohol'>Alchohol</option>
                </select>
                <div>
                <textarea
                  type='text'
                  name='description'
                  id='description'
                  autoComplete='off'
                  className='mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                />
                </div>
              </div>
            )}
            {openInputName && (
              <div className='flex items-center space-x-4 mt-4'>
                <button
                  type='submit'
                  className='flex-inline rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                >
                  Save
                </button>
              </div>
            )}
          </div>

          <div className='border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Where you'll be</dt>

            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'></dd>

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
                  autoComplete='off'
                  className='mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                >
                  <option>Select country</option>
                  <option value='United State'>United State</option>
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
                  autoComplete='off'
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
                  name='province'
                  id='province'
                  autoComplete='off'
                  className='mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                />
              </div>
            )}
            {openInputAddress && (
              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='zip'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  ZIP / Postal code
                </label>
                <input
                  type='number'
                  name='zip'
                  id='zip'
                  autoComplete='off'
                  className='mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                />
              </div>
            )}
            {openInputAddress && (
              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='street'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Street address
                </label>
                <input
                  type='text'
                  name='street'
                  id='street'
                  autoComplete='off'
                  className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            )}
            {openInputAddress && (
              <div className='flex items-center space-x-4 mt-4'>
                <button
                  type='submit'
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
