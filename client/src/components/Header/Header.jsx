import React, { useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { FaSearchLocation } from 'react-icons/fa';
import { RiSubtractFill } from 'react-icons/ri';
import { RiAddFill } from 'react-icons/ri';
import { FaCalendarDay } from 'react-icons/fa';
import { SlPeople } from 'react-icons/sl';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css files
import { DateRangePicker } from 'react-date-range';
import { format } from 'date-fns';

export default function Header() {
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adults: 0,
    children: 0,
  });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]:
          operation === 'increase' ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  return (
    <div className='relative overflow-hidden bg-white'>
      <div className='pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48'>
        <div className='relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8'>
          <div className='sm:max-w-lg'>
            <h1 className='font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
              Enjoy foods and explore cultures
            </h1>
            <p className='mt-4 text-xl text-gray-500'>
              No longer grab a bite alone! Just make friends and explore new
              cultures having delicious foods you like.
            </p>
          </div>
          <div>
            <div className='mt-10'>
              {/* Decorative image grid */}
              <div
                aria-hidden='true'
                className='pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl'
              >
                <div className='absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8'>
                  <div className='flex items-center space-x-6 lg:space-x-8'>
                    <div className='grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8'>
                      <div className='h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100'>
                        <img
                          src='https://images.unsplash.com/photo-1561539623-7535bd275eed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
                          alt='image1'
                          className='h-full w-full object-cover object-center'
                        />
                      </div>
                      <div className='h-64 w-44 overflow-hidden rounded-lg'>
                        <img
                          src='https://images.unsplash.com/photo-1569937715496-0ccf6012b1a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80'
                          alt='image2'
                          className='h-full w-full object-cover object-center'
                        />
                      </div>
                    </div>
                    <div className='grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8'>
                      <div className='h-64 w-44 overflow-hidden rounded-lg'>
                        <img
                          src='https://images.unsplash.com/photo-1594916107106-4837e3ed0e6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
                          alt='image3'
                          className='h-full w-full object-cover object-center'
                        />
                      </div>
                      <div className='h-64 w-44 overflow-hidden rounded-lg'>
                        <img
                          src='https://images.unsplash.com/photo-1581954548218-415cd6ee5f4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80'
                          alt='image4'
                          className='h-full w-full object-cover object-center'
                        />
                      </div>
                      <div className='h-64 w-44 overflow-hidden rounded-lg'>
                        <img
                          src='https://images.unsplash.com/photo-1588123190131-1c3fac394f4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80'
                          alt='image5'
                          className='h-full w-full object-cover object-center'
                        />
                      </div>
                    </div>
                    <div className='grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8'>
                      <div className='h-64 w-44 overflow-hidden rounded-lg'>
                        <img
                          src='https://images.unsplash.com/photo-1561539623-f8091d2c2b20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
                          alt='image6'
                          className='h-full w-full object-cover object-center'
                        />
                      </div>
                      <div className='h-64 w-44 overflow-hidden rounded-lg'>
                        <img
                          src='https://images.unsplash.com/photo-1542675432-01256604c232?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80'
                          alt='image7'
                          className='h-full w-full object-cover object-center'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex relative justify-between px-2 pl-7 py-1 items-center text-center h-auto w-4/5 h-auto shadow-md shadow-gray-400 bg-white border rounded-full sm:text-xs'>
                <div className='flex text-lg items-center gap-0.3'>
                  <FaSearchLocation className='text-gray-300' />
                  <input
                    type='text'
                    placeholder='Where are you now?'
                    className='border-none outline-none sm:placeholder-opacity-25 focus:border-none focus:outline-none focus:ring-0'
                  />
                </div>
                <div className='border-l border-gray-300'></div>
                <div className='flex text-lg items-center gap-1.5'>
                  <FaCalendarDay className='text-gray-300' />
                  <span
                    onClick={() => setOpenDate(!openDate)}
                    className='text-gray-400 cursor-pointer'
                  >
                    {`${format(date[0].startDate, 'MM/dd/yyyy')} to 
                    ${format(date[0].endDate, 'MM/dd/yyyy')}`}
                  </span>
                  {openDate && (
                    <div className='z-40'>
                    <DateRangePicker
                      rangeColors={['#b91c1c']}
                      onChange={(item) => setDate([item.selection])}
                      minDate={new Date()}
                      ranges={date}
                      className='absolute top-16'
                    />
                    </div>
                  )}
                </div>

                <div className='border-l border-gray-300'></div>
                <div className='flex text-lg items-center gap-1.5'>
                  <SlPeople className='text-gray-300' />
                  <span
                    onClick={() => setOpenOptions(!openOptions)}
                    className='text-gray-400 cursor-pointer'
                  >{`${options.adults} adult · ${options.children} children`}</span>
                  {openOptions && (
                    <div className='absolute top-16 bg-white border text-gray-400 rounded shadow-md'>
                      <div className='flex w-30 m-6 justify-between m-8'>
                        <span className='w-auto justify-between m-1'>
                          Adult
                        </span>
                        <div className='flex items-center gap-7 text-xl text-gray-900 ml-5'>
                          <button
                            onClick={() => handleOption('adults', 'decrease')}
                            className='bg-red-700 p-1 flex-row-reverse rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2'
                            disabled={options.adults <= 1}
                          >
                            <RiSubtractFill className='text-white font-bold text-xl' />
                          </button>
                          <span>{options.adults}</span>
                          <button
                            onClick={() => handleOption('adults', 'increase')}
                            className='bg-red-700 p-1 flex-row-reverse rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2'
                          >
                            <RiAddFill className='text-white font-bold text-xl' />
                          </button>
                        </div>
                      </div>
                      <div className='flex w-30 m-6 justify-between m-8'>
                        <span>Children</span>
                        <div className='flex items-center gap-7 text-xl text-gray-900 ml-5'>
                          <button
                            onClick={() => handleOption('children', 'decrease')}
                            className='bg-red-700 p-1 flex-row-reverse rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2'
                            disabled={options.children <= 0}
                          >
                            <RiSubtractFill className='text-white font-bold text-xl' />
                          </button>
                          <span>{options.children}</span>
                          <button
                            onClick={() => handleOption('children', 'increase')}
                            className='bg-red-700 p-1 flex-row-reverse rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2'
                          >
                            <RiAddFill className='text-white font-bold text-xl' />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <button className='flex bg-red-700 p-4 flex-row-reverse rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2'>
                  <GoSearch className='text-white font-bold text-xl' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
