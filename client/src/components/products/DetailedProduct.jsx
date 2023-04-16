import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

export default function DetailedProduct() {
  const { id } = useParams();
  const [detailedProductData, setDetailedProductData] = useState();
  const [isLiked, setIsLiked] = useState(false);

  const [showAllPhotos, setShowAllPhotos] = useState(false);

  function handleClick() {
    setIsLiked(!isLiked);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/experiences/${id}`);
        const productsDetailed = response.data;
        console.log(productsDetailed);
        setDetailedProductData(productsDetailed);
        // console.log(detailedProductData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id]);

  if (showAllPhotos) {
    return (
      <div className='absolute inset-0 bg-black text-white min-h-screen'>
        <div className='bg-black p-8 grid gap-4'>
          <div>
            {/* <h2 className="text-3xl mr-48">Photos of {place.title}</h2> */}
            <button
              onClick={() => setShowAllPhotos(false)}
              className='fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='w-6 h-6'
              >
                <path
                  fillRule='evenodd'
                  d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
                  clipRule='evenodd'
                />
              </svg>
              Close photos
            </button>
          </div>
          {detailedProductData?.experience?.files?.length > 0 &&
            detailedProductData?.experience?.files.map((photo) => (
              <div>
                <img src={`http://localhost:8000/${photo}`} alt='allImage' />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white'>
      <div className='mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8'>
        <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
          {detailedProductData?.experience?.title}
        </h1>
        <div className='flex items-center justify-between mt-2'>
          <div className='flex items-center'>
            <div className='text-red-600'>
              <MdLocationOn />
            </div>
            <p className='ml-1 text-gray-500 text-sm'>
              {detailedProductData?.experience?.city},{' '}
              {detailedProductData?.experience?.country}
            </p>
          </div>
          <div className='flex flex-row-reverse items-center'>
            <div className='text-3xl text-red-700' onClick={handleClick}>
              {isLiked ? <BsHeartFill /> : <BsHeart />}
            </div>
          </div>
        </div>
      </div>
      <div className='pt-3'>
        {/* Image gallery */}
        {detailedProductData?.experience?.files && (
          <>
            {' '}
            <div className='mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8'>
              <div className='aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block'>
                <img
                  src={`http://localhost:8000/${detailedProductData.experience.files[0]}`}
                  alt='productImage1'
                  className='h-full w-full object-cover object-center'
                />
              </div>
              <div className='hidden lg:grid lg:grid-cols-1 lg:gap-y-8'>
                <div className='aspect-h-2 aspect-w-3 overflow-hidden rounded-lg'>
                  <img
                    src={`http://localhost:8000/${detailedProductData.experience.files[1]}`}
                    alt='productImage2'
                    className='h-full w-full object-cover object-center'
                  />
                </div>
                <div className='aspect-h-2 aspect-w-3 overflow-hidden rounded-lg'>
                  <img
                    src={`http://localhost:8000/${detailedProductData.experience.files[2]}`}
                    alt='productImage3'
                    className='h-full w-full object-cover object-center'
                  />
                </div>
              </div>
              <div className='aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg'>
                <img
                  src={`http://localhost:8000/${detailedProductData.experience.files[3]}`}
                  alt='productImage4'
                  className='h-full w-full object-cover object-center'
                />
                <div>
                  <button
                    onClick={() => setShowAllPhotos(true)}
                    className='flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='w-6 h-6'
                    >
                      <path
                        fillRule='evenodd'
                        d='M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                    Show more photos
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        <div className='mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16'>
          <div className='lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'></div>

          {/* Options */}
          <div className='mt-4 lg:row-span-3 lg:mt-0'>
            <h2 className='sr-only'>Product information</h2>
            <p className='text-3xl tracking-tight text-gray-900'>
              {detailedProductData?.experience?.currency}
              {detailedProductData?.experience?.price}
            </p>

            {/* Reviews */}
            <div className='mt-6'>
              <h3 className='sr-only'>Reviews</h3>
              <div className='flex items-center'>
                <div className='flex items-center'>
                  {/* {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))} */}
                </div>
                {/* <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {reviews.totalCount} reviews
                </a> */}
              </div>
            </div>

            <form className='mt-10'>
              <button
                type='submit'
                className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-red-700 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
              >
                Make appointment
              </button>
            </form>
          </div>

          <div className='py-8 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-1'>
            {/* Owner information */}
            {detailedProductData?.owner?.profilePicture && (
              <div className='flex items-center gap-2 justify-between border-b border-gray-200 py-5'>
                <div className='flex items-center gap-3'>
                <div >
                  <img
                    className='h-20 w-20 rounded-full'
                    src={`http://localhost:8000/${detailedProductData.owner.profilePicture}`}
                    alt='profileImage'
                  />
                </div>
                <div>
                  <div className='flex text-lg'>
                    <p>{detailedProductData.owner.firstName}</p>
                    <p>{detailedProductData.owner.lastName}</p>
                  </div>
                  <div className='flex text-gray-500 items-center text-sm'>
                    <p>
                      <MdLocationOn />
                    </p>
                    <p>{detailedProductData.owner.city}, </p>
                    <p>{detailedProductData.owner.country}</p>
                  </div>
                </div>
                </div>
                <div>
                  <button
                    type='button'
                    className='flex-inline rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                  >
                    Message
                  </button>
                </div>
              </div>
            )}

            {/* Description and details */}
            <div>
              <h3 className='sr-only'>Description</h3>
              <div className='space-y-6'>
                <p className='text-base text-gray-900'>
                  {detailedProductData?.experience?.description}
                </p>
              </div>
            </div>

            <div className='mt-10'>
              <h3 className='text-sm font-medium text-gray-900'>Highlights</h3>

              <div className='mt-4'>
                {/* <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul> */}
              </div>
            </div>

            <div className='mt-10'>
              <h2 className='text-sm font-medium text-gray-900'>Notice</h2>
              <div className='mt-4 space-y-6'>
                <p className='text-sm text-gray-600'>
                  {' '}
                  {detailedProductData?.experience?.notice}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
