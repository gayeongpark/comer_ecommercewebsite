import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BsSuitHeartFill } from 'react-icons/bs';
import { AiOutlineLeft } from 'react-icons/ai';
import { AiOutlineRight } from 'react-icons/ai';

export default function Products() {
  const [newProductData, setNewProductData] = useState();

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

        <div
          id='imagesContainer'
          className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'
          // style={{ transform: `translateX(-${currentImageIndex * 100}%)` }} // Initial position of the images
        >
          {newProductData?.map((product) => (
            <a key={product.id} href={product.href} className='group'>
              <div className='relative aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8'>
                {product?.files?.map((file, index) => (
                  <div key={index} className='w-full h-full'>
                    <img
                      key={index}
                      src={`${file}`}
                      alt='experiencesImage'
                      className='object-contain w-full h-full'
                    />
                    <div className='mx-1 absolute top-0 bottom-0 left-0 flex items-center'>
                      <button
                        // onClick={prevImage}
                        className='p-1 bg-gray-100 text-xl text-red-700 rounded-full hover:bg-white'
                      >
                        <AiOutlineLeft className='mx-auto' />
                      </button>
                    </div>
                    <div className='mx-1 absolute top-0 bottom-0 right-0 flex items-center'>
                      <button
                        // onClick={nextImage}
                        className='p-1 bg-gray-100 text-xl text-red-700 rounded-full hover:bg-white'
                      >
                        <AiOutlineRight className='mx-auto' />
                      </button>
                    </div>
                  </div>
                ))}
                <div className='flex absolute justify-end mt-3 mr-4'>
                  <button className='flex absolute justify-end mt-2 mr-5'>
                    <BsSuitHeartFill className=' float-right text-3xl text-white hover:text-red-700 focus:text-indigo' />
                  </button>
                </div>
              </div>
              <h1 className='mt-2 text-xl text-gray-700'>{product.title}</h1>
              <div className='flex-line flex-baseline'>
                <p className='inline mt-1 text-lg font-medium text-gray-900'>
                  From {product.currency}
                  {product.price}
                </p>
                <p>
                  {product.city}, {product.country}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className='flex items-center justify-center my-8'>
        <button className='flex rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'>
          Load more
        </button>
      </div>
    </div>
  );
}
