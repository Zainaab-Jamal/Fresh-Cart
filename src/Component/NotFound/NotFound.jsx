import React from 'react'
import NotFoundImg from '../../assets/images/error.svg'

export default function NotFound() {
  
  return <>
  <div className='container d-flex align-items-center justify-content-center v-100 mt-5'>
   <img src={NotFoundImg} alt='Not Found'/>
  </div>

  </>
}
