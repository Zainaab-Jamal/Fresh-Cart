import { useFormik } from 'formik'
import React, { useState } from 'react'
import style from './Register.module.css'
import * as Yup from 'yup'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Register() {

  const [apiError, setApiError] = useState('')
  const [loading, setlLoading] = useState(false)
  const [registered, setRegistered] = useState(false)

  let validationSchema = Yup.object({
    name: Yup.string().required('Name is required').min(2, 'Min char is 2').max(20, 'Max char is 20'),
    email: Yup.string().required('Email is required').email('Enter a valid email'),
    password: Yup.string().required('Password is required').matches(/^[A-Z][a-zA-z@_0-9]{4,10}$/, 'Enter a valid Password'),
    rePassword: Yup.string().oneOf([Yup.ref('password')]).required('Repassword is required'),
    phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, 'Enter Valid phone number')
  })

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    }, onSubmit: submitForm
    , validationSchema
  })

  async function submitForm(values) {
    setRegistered(false)
    setlLoading(true)
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      .catch((error) => {
        setApiError(error.response.data.message)
        setlLoading(false)
      })

    if (data.message === 'success') {
      setApiError('')
      setlLoading(false)
      setRegistered(true)
    }
  }

  function showAndHidePass(eye) {
    if (eye.classList.contains('fa-eye')) {
      document.querySelector('#pass input').setAttribute('type', 'text')
      eye.classList.add('fa-eye-slash')
      eye.classList.remove('fa-eye')
    } else {
      document.querySelector('#pass input').setAttribute('type', 'password')
      eye.classList.remove('fa-eye-slash')
      eye.classList.add('fa-eye')
    }
  }

  function showAndHideRePass(eye) {
    if (eye.classList.contains('fa-eye')) {
      document.querySelector('#repass input').setAttribute('type', 'text')
      eye.classList.add('fa-eye-slash')
      eye.classList.remove('fa-eye')
    } else {
      document.querySelector('#repass input').setAttribute('type', 'password')
      eye.classList.remove('fa-eye-slash')
      eye.classList.add('fa-eye')
    }

  }

  return <>

    <Helmet>
      <title>Register</title>
    </Helmet>

    <div className={style.register}>
      <div className='container d-flex align-items-center justify-content-center'>

        <form onSubmit={formik.handleSubmit} className='mt-5'>
          <h2 className='mt-4 text-center text-secondary fw-bold'>Register</h2>

          {apiError !== '' ? <div className="alert alert-danger" role="alert">{apiError}</div> : ''}

          <div>
            {formik.errors.name && formik.touched.name ? <div className="alert alert-danger" role="alert">{formik.errors.name}</div> : ''}
            <label htmlFor='name'>Name:</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='text' id='name' name='name' className='form-control' />
          </div>

          <div className='mt-3'>

            {formik.errors.email && formik.touched.email ? <div className="alert alert-danger" role="alert">{formik.errors.email}</div> : ''}
            <label htmlFor='email'>Email:</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='email' id='email' name='email' className='form-control' />
          </div>

          <div className='mt-3'>

            {formik.errors.password && formik.touched.password ? <div className="alert alert-danger" role="alert">{formik.errors.password}</div> : ''}
            <label htmlFor='password'>Password:</label>
            <div id='pass' className='position-relative mb-3'>

              <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='password' id='password' name='password' className='form-control' />
              <i onClick={(e) => showAndHidePass(e.target)} className="fa-solid fa-eye cursor-pointer"></i>

            </div>
          </div>

          <div className='mt-3'>

            {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger" role="alert">{formik.errors.rePassword}</div> : ''}
            <label htmlFor='rePassword'>Repassword:</label>

            <div id='repass' className='position-relative mb-3'>

              <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='password' id='rePassword' name='rePassword' className='form-control' />
              <i onClick={(e) => showAndHideRePass(e.target)} className="fa-solid fa-eye cursor-pointer"></i>

            </div>
          </div>

          <div className='mt-3'>

            {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger" role="alert">{formik.errors.phone}</div> : ''}
            <label htmlFor='phone'>Phone:</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='tel' id='phone' name='phone' className='form-control mb-4' />
          </div>

          {registered ? <div className="text-success text-center fw-bold mt-4 mb-3" role="alert">Your account registered successfully</div> : ''}


          <div className='d-flex align-items-center justify-content-center w-100'>

            {loading ? <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn formBtn'> <i className='fa-solid fa-spinner fa-spin'></i> </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn formBtn'> Submit </button>}

          </div>
          <div className='d-flex align-items-center justify-content-center w-100'>
            <Link to={'/login'} className='mt-3'>Already have account? Login</Link>
          </div>

        </form>

      </div>
    </div>

  </>
}
