import React, { useState } from 'react'
import style from './VerifyCode.module.css'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

export default function VerifyCode() {

  let navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  async function postCode(values) {
    setLoading(true)
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values)

    if (data.status === "Success") {
      setLoading(false)
      navigate('/resetpassword')
    }

  }

  let formik = useFormik({
    initialValues: {
      resetCode: ''
    }, onSubmit: postCode
  })

  return <>

    <Helmet>
      <title>Verify Code</title>
    </Helmet>

    <div className={style.code}>
      <div className='container d-flex align-items-center justify-content-center'>
        <form onSubmit={formik.handleSubmit} className='mt-5'>
          <h2 className='mt-4 text-center text-secondary fw-bold'>Verify your code</h2>

          <input onChange={formik.handleChange} type='text' name='resetCode' placeholder='code' className='form-control mt-3 mb-4' />

          {loading ? <button disabled={!formik.dirty} type='submit' className='btn formBtn'> <i className='fa-solid fa-spinner fa-spin'></i> </button> : <><button disabled={!formik.dirty} type='submit' className='btn formBtn'> Verify </button></>}

        </form>
      </div>
    </div>




  </>
}
