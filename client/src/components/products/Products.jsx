import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BsSuitHeartFill } from 'react-icons/bs';
import { AiOutlineLeft } from 'react-icons/ai';
import { AiOutlineRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export default function Products() {
  const [newProductData, setNewProductData] = useState();
  const [slideNumber, setSlideNumber] = useState(0);

  const handleMove = (direction, lastIndex) => {
    // console.log('slideNumber before move:', slideNumber);

    let newSlideNumber;

    if (direction === 'l') {
      newSlideNumber = slideNumber === 0 ? lastIndex : slideNumber - 1;
    } else if (direction === 'r') {
      newSlideNumber = slideNumber === lastIndex ? 0 : slideNumber + 1;
    }

    // console.log('newSlideNumber:', newSlideNumber);

    setSlideNumber(newSlideNumber);

    // console.log('slideNumber after move:', slideNumber);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/experiences/');
        const products = response.data;
        console.log(products);
        setNewProductData(products);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);
  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h1 className='text-3xl font-bold tracking-tight text-gray-900 mb-16 sm:text-4xl'>
          New this week
        </h1>
        <h2 className='sr-only'>Products</h2>

        <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
          {newProductData?.map((product) => {
            // console.log('Product:', product);
            return (
              <a key={product.id} href={product.href} className='group'>
                <div className='relative aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8'>
                  <div className='w-full h-full flex transition-transform ease-in-out duration-700'>
                    <img
                      src={product.files[slideNumber]}
                      alt='experiencesImage'
                      className='absolute block w-full h-full'
                    />
                    <div className='hidden group-hover:flex group-hover:opacity-100 mx-1 absolute top-0 bottom-0 left-0 flex items-center'>
                      <button
                        onClick={() => {
                          // console.log('left button clicked');
                          handleMove('l', product.files.length - 1);
                        }}
                        className='z-10 p-1 bg-gray-100 text-xl text-red-700 font-bold cursor-pointer rounded-full hover:bg-white'
                      >
                        <AiOutlineLeft className='mx-auto' />
                      </button>
                    </div>
                    <div className='hidden group-hover:flex group-hover:opacity-100 mx-1 absolute top-0 bottom-0 right-0 flex items-center'>
                      <button
                        onClick={() => {
                          // console.log('right button clicked');
                          handleMove('r', product.files.length - 1);
                        }}
                        className='z-10 p-1 bg-gray-100 text-xl text-red-700 font-bold cursor-pointer rounded-full hover:bg-white'
                      >
                        <AiOutlineRight className='mx-auto' />
                      </button>
                    </div>
                  </div>
                  <div className='flex absolute justify-end mt-3 mr-4'>
                    <button className='flex absolute justify-end mt-2 mr-5'>
                      <BsSuitHeartFill className=' float-right text-3xl text-white hover:text-red-700 focus:text-indigo' />
                    </button>
                  </div>
                </div>
                <Link to={`/product/${product._id}`}>
                  <div>
                    <h1 className='mt-2 text-xl text-gray-700'>
                      {product.title}
                    </h1>
                    <div className='flex-line flex-baseline'>
                      <p className='inline mt-1 text-lg font-medium text-gray-900'>
                        From {product.currency}
                        {product.price}
                      </p>
                      <p>
                        {product.city}, {product.country}
                      </p>
                    </div>
                  </div>
                </Link>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
