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
        <div className='flex m-auto items-center justify-center border-b'>
          <div className='mx-auto max-w-2xl py-10 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
            <h1 className='text-md font-medium tracking-tight text-gray-900 mb-10 sm:text-md'>
              Comer
            </h1>
            <p className='mb-3 font-light'>About</p>
            <p className='mb-3 font-light'>Newsroom</p>
            <p className='mb-3 font-light'>Careers</p>
          </div>
          <div className='mx-auto max-w-2xl py-10 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
            <h1 className='text-md font-medium tracking-tight text-gray-900 mb-10 sm:text-md'>
              Hosting
            </h1>
            <p className='mb-3 font-light'>Explore how to make experiences</p>
            <p className='mb-3 font-light'>Hosting resources</p>
            <p className='mb-3 font-light'>Host community forum</p>
          </div>
          <div className='mx-auto max-w-2xl py-10 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
            <h1 className='text-md font-medium tracking-tight text-gray-900 mb-10 sm:text-md'>
              Support
            </h1>
            <p className='mb-3 font-light'>Help center</p>
            <p className='mb-3 font-light'>Cancellation options</p>
            <p className='mb-3 font-light'>Report concerns</p>
          </div>
        </div>
        <div className='flex justify-between mx-auto max-w-2xl py-5 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8'>
          <div className='flex'>
            <div>© 2023 Comer, Inc</div>
            <div>Terms</div>
            <div>privacy</div>
            <div></div>
          </div>
          <div className='flex justify-between items-baseline'>
            <div className='flex'>
              <GrLanguage />
              Language
            </div>
            <div className='flex'>
              <GrCurrency />
              Currency
            </div>
            <div className='flex'>
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
