import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlinePhotograph } from 'react-icons/hi';

export default function Posting() {
  const [openInputImage, setOpenInputImage] = useState(false);
  const [openInputTitle, setOpenInputTitle] = useState(false);
  const [openInputAddress, setOpenInputAddress] = useState(false);
  const [openInputIntro, setOpenInputIntro] = useState(false);
  const [openInputPerks, setOpenInputPerks] = useState(false);
  const [openInputNotice, setOpenInputNotice] = useState(false);
  const [openInputAge, setOpenInputAge] = useState(false);
  const [openInputCancel, setOpenInputCancel] = useState(false);
  const [openInputTime, setOpenInputTime] = useState(false);
  const [openInputPrice, setOpenInputPrice] = useState(false);
  const [openInputLanguage, setOpenInputLanguage] = useState(false);
  const [openInputTags, setOpenInputTags] = useState(false);

  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSaveTags = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      setTags([...tags, inputValue]);
      setInputValue('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSaveTags(event);
    }
  };

  const handleDeleteTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className='mx-auto mb-20 max-w-7xl px-4 sm:px-6 lg:px-8 overflow-hidden bg-white py-5 sm:rounded-lg'>
      <div className='px-4 py-6'>
        <p className='mt-1 max-w-2xl text-sm text-gray-500'>
          <Link to='/'>Home</Link> &#60; Be a host
        </p>
        <h3 className='mt-10 mb-5 text-3xl font-semibold leading-6 text-gray-900'>
          Be a host
        </h3>
      </div>
      {/* image */}
      <div className='w-2/3'>
        <dl>
          <div className='border-b py-5 sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>
              Experience image
            </dt>
            <div className='flex mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
              <div className='text-center'>
                <HiOutlinePhotograph
                  className='mx-auto h-12 w-12 text-gray-300'
                  aria-hidden='true'
                />
                <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                  <label
                    htmlFor='file-upload'
                    className='relative cursor-pointer rounded-md bg-white font-semibold text-red-600 '
                  >
                    <span onClick={() => setOpenInputImage(!openInputImage)}>
                      Upload files
                    </span>
                    <input
                      id='file-upload'
                      name='file-upload'
                      type='file'
                      className='sr-only'
                    />
                  </label>
                  <p className='pl-1'>or drag and drop</p>
                </div>
                <p className='text-xs leading-5 text-gray-600'>
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>

            {/* <div className='font-medium text-red-600 cursor-pointer'>Edit</div> */}
            {openInputImage && (
              <div className='flex items-center space-x-4 mt-3 mt-4'>
                <button
                  type='submit'
                  className='flex-inline rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                >
                  Save
                </button>
                <button
                  type='button'
                  onClick={() => setOpenInputImage(false)}
                  className='inline-flex items-center px-6 py-2 text-md font-medium text-gray-900 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2'
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          {/* Title */}
          <div className='px-4 py-10 border-b sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Title</dt>

            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              Enjoy Miami's Sunset with Luxury Picnic By the Water
            </dd>

            <div
              onClick={() => setOpenInputTitle(!openInputTitle)}
              className='font-medium text-red-600 cursor-pointer'
            >
              Edit
            </div>
            {openInputTitle && (
              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='firstName'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Title
                </label>
                <div className='text-gray-500'>
                  please input the catched title of your activity
                </div>
                <input
                  type='text'
                  name='firstName'
                  id='firstName'
                  autoComplete='off'
                  className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            )}
            {openInputTitle && (
              <div className='flex items-center space-x-4 mt-4'>
                <button
                  type='submit'
                  className='flex-inline rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                >
                  Save
                </button>
                <button
                  type='button'
                  onClick={() => setOpenInputTitle(false)}
                  className='inline-flex items-center px-6 py-2 text-md font-medium text-gray-900 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2'
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          {/* What you'll do */}
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
                <div className='text-gray-500'>
                  Please add detailed information about your activity
                </div>
                <textarea
                  type='text'
                  name='description'
                  id='description'
                  autoComplete='off'
                  className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
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
                <button
                  type='button'
                  onClick={() => setOpenInputIntro(false)}
                  className='inline-flex items-center px-6 py-2 text-md font-medium text-gray-900 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2'
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          {/* What's includes */}
          <div className='px-4 py-10 border-b sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>
              What's includes
            </dt>

            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              Korean food in K-town
            </dd>

            <div
              onClick={() => setOpenInputPerks(!openInputPerks)}
              className='font-medium text-red-600 cursor-pointer'
            >
              Edit
            </div>
            {openInputPerks && (
              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='country'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Type of perks
                </label>
                <div className='text-gray-500'>
                  please add what you would offer to your guests
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
                  <option value='Equipment'>Equipment</option>
                </select>
                <div>
                  <textarea
                    type='text'
                    name='description'
                    id='description'
                    autoComplete='off'
                    className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
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
                  <option value='Equipment'>Equipment</option>
                </select>
                <div>
                  <textarea
                    type='text'
                    name='description'
                    id='description'
                    autoComplete='off'
                    className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
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
                  <option value='Equipment'>Equipment</option>
                </select>
                <div>
                  <textarea
                    type='text'
                    name='description'
                    id='description'
                    autoComplete='off'
                    className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
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
                  <option value='Equipment'>Equipment</option>
                </select>
                <div>
                  <textarea
                    type='text'
                    name='description'
                    id='description'
                    autoComplete='off'
                    className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
            )}
            {openInputPerks && (
              <div className='flex items-center space-x-4 mt-4'>
                <button
                  type='submit'
                  className='flex-inline rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                >
                  Save
                </button>
                <button
                  type='button'
                  onClick={() => setOpenInputPerks(false)}
                  className='inline-flex items-center px-6 py-2 text-md font-medium text-gray-900 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2'
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* requirement of the guest */}
          <div className='px-4 py-10 border-b sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>
              Guest requirements
            </dt>

            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              Minimum age: 20 years-old, Maximum number of guest: 10
            </dd>

            <div
              onClick={() => setOpenInputAge(!openInputAge)}
              className='font-medium text-red-600 cursor-pointer'
            >
              Edit
            </div>
            {openInputAge && (
              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='age'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Minimum age of the guest
                </label>
                <div className='text-gray-500'>
                  please set age limits for guests. Minors can only attend with
                  their legal guardian.
                </div>
                <select
                  id='age'
                  name='age'
                  autoComplete='off'
                  className='mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                >
                  <option>Select minimum age</option>
                  <option value='5'>5</option>
                  <option value='10'>10</option>
                  <option value='12'>12</option>
                  <option value='15'>15</option>
                  <option value='18'>18</option>
                  <option value='20'>20</option>
                  <option value='21'>21</option>
                  <option value='30'>30</option>
                  <option value='40'>40</option>
                  <option value='50'>50</option>
                  <option value='60'>60</option>
                </select>
                <div className='mt-6 space-y-6'>
                  <div className='flex items-center gap-x-3'>
                    <input
                      id='kids'
                      name='kids'
                      type='radio'
                      className='h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600'
                    />
                    <label
                      htmlFor='kids'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Guest can bring kids under 4 years
                    </label>
                  </div>
                  <div className='flex items-center gap-x-3'>
                    <input
                      id='pets'
                      name='pets'
                      type='radio'
                      className='h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600'
                    />
                    <label
                      htmlFor='pets'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Guest can bring their pets
                    </label>
                  </div>
                </div>
                <label
                  htmlFor='age'
                  className='block mt-6 text-sm font-medium leading-6 text-gray-900'
                >
                  Maximum group size
                </label>
                <div className='text-gray-500'>
                  please set age limits for size of group. Remember: If only one
                  person books, you'll still be expected to host. legal
                  guardian.
                </div>
                <select
                  id='size'
                  name='size'
                  autoComplete='off'
                  className='mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                >
                  <option>Select maximum size of group</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                  <option value='9'>9</option>
                  <option value='10'>10</option>
                </select>
              </div>
            )}
            {openInputAge && (
              <div className='flex items-center space-x-4 mt-4'>
                <button
                  type='submit'
                  className='flex-inline rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                >
                  Save
                </button>
                <button
                  type='button'
                  onClick={() => setOpenInputAge(false)}
                  className='inline-flex items-center px-6 py-2 text-md font-medium text-gray-900 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2'
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Language */}
          <div className='px-4 py-10 border-b sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Language</dt>

            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              English
            </dd>

            <div
              onClick={() => setOpenInputLanguage(!openInputLanguage)}
              className='font-medium text-red-600 cursor-pointer'
            >
              Edit
            </div>
            {openInputLanguage && (
              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='age'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Language
                </label>
                <div className='text-gray-500'>
                  please set language that you can speak for guests.
                </div>
                <select
                  id='time'
                  name='time'
                  autoComplete='off'
                  className='mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                >
                  <option>Select language</option>
                  <option value='English'>English</option>
                  <option value='Korean'>Korean</option>
                  <option value='Español'>Español</option>
                </select>
              </div>
            )}
            {openInputLanguage && (
              <div className='flex items-center space-x-4 mt-4'>
                <button
                  type='submit'
                  className='flex-inline rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                >
                  Save
                </button>
                <button
                  type='button'
                  onClick={() => setOpenInputLanguage(false)}
                  className='inline-flex items-center px-6 py-2 text-md font-medium text-gray-900 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2'
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          {/* General availiability */}
          <div className='px-4 py-10 border-b sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>
              General availability
            </dt>

            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              Start time: 13:00 AM, end time: 15:00
            </dd>

            <div
              onClick={() => setOpenInputTime(!openInputTime)}
              className='font-medium text-red-600 cursor-pointer'
            >
              Edit
            </div>
            {openInputTime && (
              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='age'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Experience start time
                </label>
                <div className='text-gray-500'>
                  please set time experience start time for guests.
                </div>
                <select
                  id='time'
                  name='time'
                  autoComplete='off'
                  className='mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                >
                  <option>Select start time</option>
                  <option value='12:00 AM'>12:00 AM</option>
                  <option value='12:30 AM'>12:30 AM</option>
                  <option value='1:00 AM'>1:00 AM</option>
                  <option value='1:30 AM'>1:30 AM</option>
                  <option value='2:00 AM'>2:00 AM</option>
                  <option value='2:30 AM'>2:30 AM</option>
                  <option value='3:00 AM'>3:00 AM</option>
                  <option value='3:30 AM'>3:30 AM</option>
                  <option value='4:00 AM'>4:00 AM</option>
                  <option value='4:30 AM'>4:30 AM</option>
                  <option value='5:00 AM'>5:00 AM</option>
                  <option value='5:30 AM'>5:30 AM</option>
                  <option value='6:00 AM'>6:00 AM</option>
                  <option value='6:30 AM'>6:30 AM</option>
                  <option value='7:00 AM'>7:00 AM</option>
                  <option value='7:30 AM'>7:30 AM</option>
                  <option value='8:00 AM'>8:00 AM</option>
                  <option value='8:30 AM'>8:30 AM</option>
                  <option value='9:00 AM'>9:00 AM</option>
                  <option value='9:30 AM'>9:30 AM</option>
                  <option value='10:00 AM'>10:00 AM</option>
                  <option value='10:00 AM'>10:30 AM</option>
                  <option value='11:00 AM'>11:00 AM</option>
                  <option value='11:00 AM'>11:30 AM</option>
                  <option value='12:00 PM'>12:00 PM</option>
                  <option value='12:00 PM'>12:30 PM</option>
                  <option value='1:00 PM'>1:00 PM</option>
                  <option value='1:00 PM'>1:30 PM</option>
                  <option value='2:00 PM'>2:00 PM</option>
                  <option value='2:00 PM'>2:30 PM</option>
                  <option value='3:00 PM'>3:00 PM</option>
                  <option value='3:30 PM'>3:30 PM</option>
                  <option value='4:00 PM'>4:00 PM</option>
                  <option value='4:30 PM'>4:30 PM</option>
                  <option value='5:00 PM'>5:00 PM</option>
                  <option value='5:30 PM'>5:30 PM</option>
                  <option value='6:00 PM'>6:00 PM</option>
                  <option value='6:30 PM'>6:30 PM</option>
                  <option value='7:00 PM'>7:00 PM</option>
                  <option value='7:30 PM'>7:30 PM</option>
                  <option value='8:00 PM'>8:00 PM</option>
                  <option value='8:30 PM'>8:30 PM</option>
                  <option value='9:00 PM'>9:00 PM</option>
                  <option value='9:30 PM'>9:30 PM</option>
                  <option value='10:00 PM'>10:00 PM</option>
                  <option value='10:30 PM'>10:30 PM</option>
                  <option value='11:00 PM'>11:00 PM</option>
                  <option value='11:30 PM'>11:30 PM</option>
                </select>
                <label
                  htmlFor='age'
                  className='mt-6 block text-sm font-medium leading-6 text-gray-900'
                >
                  Experience end time
                </label>
                <div className='text-gray-500'>
                  please set time experience end time for guests.
                </div>
                <select
                  id='time'
                  name='time'
                  autoComplete='off'
                  className='mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                >
                  <option>Select end time</option>
                  <option value='12:00 AM'>12:00 AM</option>
                  <option value='12:30 AM'>12:30 AM</option>
                  <option value='1:00 AM'>1:00 AM</option>
                  <option value='1:30 AM'>1:30 AM</option>
                  <option value='2:00 AM'>2:00 AM</option>
                  <option value='2:30 AM'>2:30 AM</option>
                  <option value='3:00 AM'>3:00 AM</option>
                  <option value='3:30 AM'>3:30 AM</option>
                  <option value='4:00 AM'>4:00 AM</option>
                  <option value='4:30 AM'>4:30 AM</option>
                  <option value='5:00 AM'>5:00 AM</option>
                  <option value='5:30 AM'>5:30 AM</option>
                  <option value='6:00 AM'>6:00 AM</option>
                  <option value='6:30 AM'>6:30 AM</option>
                  <option value='7:00 AM'>7:00 AM</option>
                  <option value='7:30 AM'>7:30 AM</option>
                  <option value='8:00 AM'>8:00 AM</option>
                  <option value='8:30 AM'>8:30 AM</option>
                  <option value='9:00 AM'>9:00 AM</option>
                  <option value='9:30 AM'>9:30 AM</option>
                  <option value='10:00 AM'>10:00 AM</option>
                  <option value='10:00 AM'>10:30 AM</option>
                  <option value='11:00 AM'>11:00 AM</option>
                  <option value='11:00 AM'>11:30 AM</option>
                  <option value='12:00 PM'>12:00 PM</option>
                  <option value='12:00 PM'>12:30 PM</option>
                  <option value='1:00 PM'>1:00 PM</option>
                  <option value='1:00 PM'>1:30 PM</option>
                  <option value='2:00 PM'>2:00 PM</option>
                  <option value='2:00 PM'>2:30 PM</option>
                  <option value='3:00 PM'>3:00 PM</option>
                  <option value='3:30 PM'>3:30 PM</option>
                  <option value='4:00 PM'>4:00 PM</option>
                  <option value='4:30 PM'>4:30 PM</option>
                  <option value='5:00 PM'>5:00 PM</option>
                  <option value='5:30 PM'>5:30 PM</option>
                  <option value='6:00 PM'>6:00 PM</option>
                  <option value='6:30 PM'>6:30 PM</option>
                  <option value='7:00 PM'>7:00 PM</option>
                  <option value='7:30 PM'>7:30 PM</option>
                  <option value='8:00 PM'>8:00 PM</option>
                  <option value='8:30 PM'>8:30 PM</option>
                  <option value='9:00 PM'>9:00 PM</option>
                  <option value='9:30 PM'>9:30 PM</option>
                  <option value='10:00 PM'>10:00 PM</option>
                  <option value='10:30 PM'>10:30 PM</option>
                  <option value='11:00 PM'>11:00 PM</option>
                  <option value='11:30 PM'>11:30 PM</option>
                </select>
              </div>
            )}
            {openInputTime && (
              <div className='flex items-center space-x-4 mt-4'>
                <button
                  type='submit'
                  className='flex-inline rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                >
                  Save
                </button>
                <button
                  type='button'
                  onClick={() => setOpenInputTime(false)}
                  className='inline-flex items-center px-6 py-2 text-md font-medium text-gray-900 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2'
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          {/* Tag */}
          <div className='px-4 py-10 border-b sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Tags</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className='inline-flex items-center justify-center py-1 px-2 bg-gray border rounded-full'
                >
                  <span className='mr-2'>{tag}</span>
                  <span
                    onClick={() => handleDeleteTag(index)}
                    className='inline-flex items-center justify-center w-5 h-5 pb-1 border rounded-full bg-red-600 text-white text-lg cursor-pointer'
                  >
                    &times;
                  </span>
                </div>
              ))}
            </dd>
            <div
              onClick={() => setOpenInputTags(!openInputTags)}
              className='font-medium text-red-600 cursor-pointer'
            >
              Edit
            </div>
            {openInputTags && (
              <form
                onSubmit={handleSaveTags}
                className='col-span-6 sm:col-span-3'
              >
                <label
                  htmlFor='tags'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Tags
                </label>
                <div className='text-gray-500'>
                  Please input relevant tags about your experience up to six
                </div>
                <div className='relative mt-2'>
                  <div className='absolute top-0 items-center justify-center left-0 flex flex-wrap items-center p-1'></div>
                  <input
                    type='text'
                    id='tags'
                    onKeyDown={handleKeyDown}
                    placeholder='please enter to add tags'
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    autoComplete='off'
                    className='block w-full rounded-md p-4 border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 focus:ring-opacity-50 focus:ring-2 sm:text-sm'
                  />
                </div>
                <div className='flex items-center space-x-4 mt-4'>
                  <button
                    type='submit'
                    className='flex-inline rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                  >
                    Save
                  </button>
                  <button
                    type='button'
                    onClick={() => setOpenInputTags(false)}
                    className='inline-flex items-center px-6 py-2 text-md font-medium text-gray-900 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Price */}
          <div className='px-4 py-10 border-b sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Price</dt>

            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              $500
            </dd>

            <div
              onClick={() => setOpenInputPrice(!openInputPrice)}
              className='font-medium text-red-600 cursor-pointer'
            >
              Edit
            </div>
            {openInputPrice && (
              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='price'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Price
                </label>
                <div className='text-gray-500'>please set the price</div>
                <div className='relative mt-2 rounded-md shadow-sm'>
                  <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                    <span className='text-gray-500 sm:text-sm'>$</span>
                  </div>
                  <input
                    type='text'
                    name='price'
                    id='price'
                    className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
                    placeholder='0.00'
                  />
                  <div className='absolute inset-y-0 right-0 flex items-center'>
                    <label htmlFor='currency' className='sr-only'>
                      Currency
                    </label>
                    <select
                      id='currency'
                      name='currency'
                      className='h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm'
                    >
                      <option>USD</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            {openInputPrice && (
              <div className='flex items-center space-x-4 mt-4'>
                <button
                  type='submit'
                  className='flex-inline rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                >
                  Save
                </button>
                <button
                  type='button'
                  onClick={() => setOpenInputPrice(false)}
                  className='inline-flex items-center px-6 py-2 text-md font-medium text-gray-900 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2'
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Address */}
          <div className='border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>
              Where you'll be
            </dt>

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
                <button
                  type='button'
                  onClick={() => setOpenInputAddress(false)}
                  className='inline-flex items-center px-6 py-2 text-md font-medium text-gray-900 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2'
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Notice */}
          <div className='border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Notice</dt>

            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'></dd>

            <div
              onClick={() => setOpenInputNotice(!openInputNotice)}
              className='font-medium text-red-600 cursor-pointer'
            >
              Edit
            </div>
            {openInputNotice && (
              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='description'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Notice
                </label>
                <div className='text-gray-500'>
                  please add detailed notice that your guest should be informed
                </div>
                <textarea
                  type='text'
                  name='description'
                  id='description'
                  autoComplete='off'
                  className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            )}
            {openInputNotice && (
              <div className='flex items-center space-x-4 mt-4'>
                <button
                  type='submit'
                  className='flex-inline rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                >
                  Save
                </button>
                <button
                  type='button'
                  onClick={() => setOpenInputNotice(false)}
                  className='inline-flex items-center px-6 py-2 text-md font-medium text-gray-900 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2'
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          {/* Cancellation policy */}
          <div className='px-4 py-10 border-b sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>
              Cancellation policy
            </dt>

            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              Cancellation policy
            </dd>

            <div
              onClick={() => setOpenInputCancel(!openInputCancel)}
              className='font-medium text-red-600 cursor-pointer'
            >
              Edit
            </div>
            {openInputCancel && (
              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='age'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Cancellation policy
                </label>
                <div className='text-gray-500'>
                  please choose a cancellation policy
                </div>
                <div className='mt-6 space-y-6'>
                  <div className='flex items-center gap-x-3'>
                    <input
                      id='cancel'
                      name='cancel'
                      type='radio'
                      className='h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600'
                    />
                    <label
                      htmlFor='cancel'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Guests can cancel until 7 days before the Experience start
                      time for a full refund, or within 24 hours of booking as
                      long as the booking is made more than 48 hours before the
                      start time.
                    </label>
                  </div>
                  <div className='flex items-center gap-x-3'>
                    <input
                      id='cancel'
                      name='cancel'
                      type='radio'
                      className='h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600'
                    />
                    <label
                      htmlFor='cancel'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Guests can cancel until 24 hours before the Experience
                      start time for a full refund.
                    </label>
                  </div>
                </div>
              </div>
            )}
            {openInputCancel && (
              <div className='flex items-center space-x-4 mt-4'>
                <button
                  type='submit'
                  className='flex-inline rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                >
                  Save
                </button>
                <button
                  type='button'
                  onClick={() => setOpenInputCancel(false)}
                  className='inline-flex items-center px-6 py-2 text-md font-medium text-gray-900 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2'
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </dl>
      </div>
      <div className='flex items-center space-x-4 mt-4'>
        <button
          type='submit'
          className='rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
        >
          Submit
        </button>
      </div>
    </div>
  );
}
