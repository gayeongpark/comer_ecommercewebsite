import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { GiForkKnifeSpoon, GiSodaCan, GiCookingPot } from 'react-icons/gi';
import { BiDrink } from 'react-icons/bi';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker, NavigationControl } from 'react-map-gl';

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
        <h1 className='text-5xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
          {detailedProductData?.experience?.title}
        </h1>
        <div className='flex items-center justify-between mt-2'>
          <div className='flex items-center'>
            <div className='text-red-700'>
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
          <div className='lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
            <div className='flex flex-row mt-2'>
              {detailedProductData?.experience?.tags.map((tag) => {
                return (
                  <div className='flex flex-row bg-red-700 rounded-full mr-2 text-white p-1'>
                    <div className='px-2 py-1'>#{tag}</div>
                  </div>
                );
              })}
            </div>
          </div>

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
              <div>
                <div className='flex items-center gap-2 justify-between py-5'>
                  <div className='flex items-center gap-3'>
                    <div>
                      <img
                        className='h-20 w-20 rounded-full'
                        src={`http://localhost:8000/${detailedProductData.owner.profilePicture}`}
                        alt='profileImage'
                      />
                    </div>
                    <div>
                      <div className='flex text-5xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
                        <p className='mr-1'>Experience hosted by</p>
                        <p className='mr-1'>
                          {detailedProductData.owner.firstName}
                        </p>
                        <p>{detailedProductData.owner.lastName}</p>
                      </div>
                      <div className='flex text-gray-500 items-center text-sm'>
                        <p className='text-red-700'>
                          <MdLocationOn />
                        </p>
                        <p>{detailedProductData.owner.city}, </p>
                        <p>{detailedProductData.owner.country}</p>
                      </div>
                    </div>
                  </div>
                  <div className='flex'>
                    <button
                      type='button'
                      className='flex-inline rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                    >
                      Message
                    </button>
                  </div>
                </div>
                <div
                  style={{ whiteSpace: 'pre-line' }}
                  className='border-b border-gray-200'
                >
                  {detailedProductData.owner.description}
                  <div className='mt-2'>
                    user joined since{' '}
                    {new Date(
                      detailedProductData.owner.createdAt
                    ).getFullYear()}
                  </div>
                </div>
              </div>
            )}

            {/* Description and details */}
            <div className='mt-10'>
              <div className='space-y-6'>
                <h3 className='text-lg font-medium text-gray-900'>
                  What you'll do
                </h3>
                <p
                  className='text-base text-gray-900'
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {detailedProductData?.experience?.description}
                </p>
              </div>
            </div>

            {/* Language */}
            <div className='mt-10'>
              <h3 className='text-lg font-medium text-gray-900'>Hosted in</h3>
              <div className='flex mt-5'>
                {detailedProductData?.experience?.language.map((lan) => {
                  return (
                    <div className='flex border-2 border-red-700 mr-4 justify-center items-center p-2 bg-red-700 rounded-full'>
                      <p className='text-base justify-center items-center text-white'>
                        {lan}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Perks */}
            <div className='flex-row mt-10'>
              <h3 className='text-lg font-medium text-gray-900'>
                What's included
              </h3>
              <div className='mt-5'>
                <ul className='grid grid-cols-4 gap-4 text-sm'>
                  {detailedProductData?.experience?.perks?.food && (
                    <li
                      key={detailedProductData?.experience?._id}
                      className='items-center text-gray-400 border-2 p-4 rounded-md'
                    >
                      <span className='flex justify-center text-red-700 text-3xl mb-2 font-bold'>
                        <GiForkKnifeSpoon />
                      </span>
                      <span className='flex justify-center text-lg mb-2 text-gray-900 font-bold'>
                        Food
                      </span>
                      <span className='flex text-gray-600 text-md justify-center'>
                        {detailedProductData?.experience?.perks?.food}
                      </span>
                    </li>
                  )}
                  {detailedProductData?.experience?.perks?.beverage && (
                    <li
                      key={detailedProductData?.experience?._id}
                      className='items-center text-gray-400 border-2 p-4 rounded-md'
                    >
                      <span className='flex justify-center text-red-700 text-3xl mb-2 font-bold'>
                        <GiSodaCan />
                      </span>
                      <span className='flex justify-center text-lg mb-2 text-gray-900 font-bold'>
                        Beverage
                      </span>
                      <span className='flex text-gray-600 text-md justify-center'>
                        {detailedProductData?.experience?.perks?.beverage}
                      </span>
                    </li>
                  )}
                  {detailedProductData?.experience?.perks?.equipment && (
                    <li
                      key={detailedProductData?.experience?._id}
                      className='items-center text-gray-400 border-2 p-4 rounded-md'
                    >
                      <span className='flex justify-center text-red-700 text-3xl mb-2 font-bold'>
                        <GiCookingPot />
                      </span>
                      <span className='flex justify-center text-lg mb-2 text-gray-900 font-bold'>
                        Equipment
                      </span>
                      <span className='flex text-gray-600 text-md justify-center'>
                        {detailedProductData?.experience?.perks.equipment}
                      </span>
                    </li>
                  )}
                  {detailedProductData?.experience?.perks?.alcohol && (
                    <li
                      key={detailedProductData?.experience?._id}
                      className='items-center text-gray-400 border-2 p-4 sm:p-2 rounded-md'
                    >
                      <span className='flex justify-center text-red-700 text-3xl mb-2 font-bold'>
                        <BiDrink />
                      </span>
                      <span className='flex justify-center text-lg mb-2 text-gray-900 font-bold'>
                        Alcohol
                      </span>
                      <span className='flex text-gray-600 text-md justify-center'>
                        {detailedProductData?.experience?.perks?.alcohol}
                      </span>
                    </li>
                  )}
                  {detailedProductData?.experience?.perks?.others && (
                    <li
                      key={detailedProductData?.experience?._id}
                      className='items-center text-gray-400 border-2 p-4 rounded-md'
                    >
                      <span className='flex justify-center text-red-700 text-3xl mb-2 font-bold'>
                        <GiForkKnifeSpoon />
                      </span>
                      <span className='flex justify-center text-lg mb-2 text-gray-900 font-bold'>
                        Others
                      </span>
                      <span className='flex text-gray-600 text-md justify-center'>
                        {detailedProductData?.experience?.perks?.others}
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Location */}
            <div className='mt-10'>
              <h3 className='text-lg font-medium text-gray-900'>
                Where we will meet
              </h3>
              <div className='flex mt-5'>
                {detailedProductData?.experience?.coordinates && (
                  <Map
                    key={detailedProductData?.owner?._id}
                    mapboxAccessToken={process.env.REACT_APP_MAPBOXAPIKEY}
                    initialViewState={{
                      longitude: detailedProductData?.experience?.longitude,
                      latitude: detailedProductData?.experience?.latitude,
                      zoom: 15,
                    }}
                    style={{ width: 600, height: 400 }}
                    mapStyle='mapbox://styles/mapbox/streets-v11'
                  >
                    <Marker
                      longitude={detailedProductData?.experience?.longitude}
                      latitude={detailedProductData?.experience?.latitude}
                      anchor='bottom'
                      zoom={15}
                    >
                      <MdLocationOn />
                    </Marker>
                    <NavigationControl />
                  </Map>
                )}
              </div>
              <p>{detailedProductData?.experience?.fullAddress}</p>
            </div>

            {/* Things to know */}
            <div className='mt-10'>
              <h3 className='text-lg font-medium text-gray-900'>
                Things to know
              </h3>
              <div className='grid grid-cols-2 gap-4 mt-2'>
                <div>
                  <p className='text-md text-gray-600 text-bold'>
                    Requirement
                  </p>
                  {detailedProductData?.experience?.kidsAllowed === true && (
                    <p className='mt-4'>
                      Guest can bring kids under 4 years
                    </p>
                  )}
                  {detailedProductData?.experience?.petsAllowed === true && (
                    <p className='mt-4'>Guest can bring their pets</p>
                  )}
                </div>
                <div>
                  <p className='text-md text-gray-600 text-bold'>
                    Cancellation policy
                  </p>
                  {detailedProductData?.experience?.cancellation1 === true && (
                    <p className='mt-4'>
                      Guests can cancel until 7 days before the Experience start
                      time for a full refund, or within 24 hours of booking as
                      long as the booking is made more than 48 hours before the
                      start time.
                    </p>
                  )}
                  {detailedProductData?.experience?.cancellation2 === true && (
                    <p className='mt-4'>
                      Guests can cancel until 24 hours before the Experience
                      start time for a full refund.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}