import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function DetailedProduct() {
  const { id } = useParams();
  const [detailedProductData, setDetailedProductData] = useState();

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

  return (
    <div className='bg-white'>
      <h3>{detailedProductData?.experience.title}</h3>
      <p>{detailedProductData?.experience.description}</p>
    </div>
  );
}
