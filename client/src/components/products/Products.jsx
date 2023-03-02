import React, { useEffect, useState } from 'react';
import { BsSuitHeartFill } from 'react-icons/bs';

export default function Products() {
  const [newProductData, setNewProductData] = useState([{}]);

  useEffect(() => {
    fetch('/getNewProductList')
      .then((response) => response.json())
      .then((products) => {
        console.log(products);
        setNewProductData(products);
      });
  }, []);
  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h1 className='text-3xl font-bold tracking-tight text-gray-900 mb-16 sm:text-4xl'>
          New this week
        </h1>
        <h2 className='sr-only'>Products</h2>

        <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
          {newProductData.map((product) => (
            <a key={product.id} href={product.href} className='group'>
              <div className='relative aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8'>
                <img
                  src={product.image_url}
                  alt='images'
                  className='h-full w-full object-cover object-center group-hover:opacity-75'
                />
                <div className='flex absolute justify-end mt-3 mr-4'>
                  <button className='flex absolute justify-end mt-2 mr-5'>
                    <BsSuitHeartFill className=' float-right text-3xl text-white hover:text-red-700 focus:text-indigo' />
                  </button>
                </div>
              </div>
              <h1 className='mt-4 text-l text-gray-700'>{product.title}</h1>
              <div className='flex-line flex-baseline'>
                <p className='inline mt-1 text-lg font-medium text-gray-900'>
                  From {product.currency}
                  {product.price}
                </p>
                <p className='inline ml-2'>/person</p>
                <p>
                  {product.city}, {product.country}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
