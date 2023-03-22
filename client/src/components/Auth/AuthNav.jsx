import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

export default function AuthNav() {
  return (
    <div className='flex justify-between h-14 min-h-full border-b-2 px-1 sm:px-6 lg:px-8'>
      <Link to='..'>
        <button>
          <BsArrowLeft className='text-lg' />
        </button>
      </Link>
      <div className='flex items-center justify-center'>
        <h1 className=''>Comer</h1>
      </div>
      <div></div>
    </div>
  );
}
