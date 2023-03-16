import React from 'react';
import { FaFacebookF } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { GrLanguage } from 'react-icons/gr';
import { GrCurrency } from 'react-icons/gr';

export default function Footer() {
  return (
    <div className='bg-gray-100'>
      <div>
        <div className='flex justify-between mx-auto max-w-2xl py-2 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8 border-b'>
          <div className='max-w-2xl py-5 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8'>
            <h1 className='text-md font-medium tracking-tight text-gray-900 mb-10 sm:text-md'>
              Comer
            </h1>
            <p className='mb-3 font-light cursor-pointer'>About</p>
            <p className='mb-3 font-light cursor-pointer'>Newsroom</p>
            <p className='mb-3 font-light cursor-pointer'>Careers</p>
          </div>
          <div className='max-w-2xl py-5 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8'>
            <h1 className='text-md font-medium tracking-tight text-gray-900 mb-10 sm:text-md'>
              Hosting
            </h1>
            <p className='mb-3 font-light cursor-pointer'>
              Explore how to make experiences
            </p>
            <p className='mb-3 font-light cursor-pointer'>Hosting resources</p>
            <p className='mb-3 font-light cursor-pointer'>
              Host community forum
            </p>
          </div>
          <div className='max-w-2xl py-5 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8'>
            <h1 className='text-md font-medium tracking-tight text-gray-900 mb-10 sm:text-md'>
              Support
            </h1>
            <p className='mb-3 font-light cursor-pointer'>Help center</p>
            <p className='mb-3 font-light cursor-pointer'>
              Cancellation options
            </p>
            <p className='mb-3 font-light cursor-pointer'>Report concerns</p>
          </div>
        </div>
        <div className='flex justify-between mx-auto max-w-2xl py-3 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8'>
          <div className='flex gap-3'>
            <div>© 2023 Comer, Inc</div>
            <div className='flex cursor-pointer gap-3'>
              <div>·</div> Terms
            </div>
            <div className='flex cursor-pointer gap-3'>
              <div>·</div> privacy
            </div>
            <div></div>
          </div>
          <div className='flex justify-baseline items-baseline gap-12'>
            <div className='flex gap-6'>
              <div className='flex items-center gap-3 cursor-pointer'>
                <GrLanguage />
                Language
              </div>
              <div className='flex items-center gap-3 cursor-pointer'>
                <GrCurrency />
                Currency
              </div>
            </div>
            <div className='flex items-center gap-3 cursor-pointer'>
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
