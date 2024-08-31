import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { BeatLoader } from 'react-spinners';

export default function CategorySlider() {

  let [loading, setLoading] = useState(true)

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 5,
    arrows: false
  };

  let [categories, setCategories] = useState([])

  useEffect(() => {
    getAllCategories()
  }, [])

  async function getAllCategories() {
    setLoading(true)
    let data = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    setCategories(data.data.data)
    setLoading(false)
  }

  return <>

    {loading ? <div className='d-flex align-items-center justify-content-center w-100 mt-5 h-50'>
      <BeatLoader color="#009b00" />
    </div> : <div className='container mt-5'>
      <h3 className='mb-2'>Shop popular categories</h3>
      <Slider {...settings}>
        {categories.map((category) => <div key={category._id}>
          <img src={category.image} alt='category' className='w-100' height={200} />
          <span className='fw-bold'>{category.name}</span>
        </div>)}
      </Slider>
    </div>}


  </>
}
