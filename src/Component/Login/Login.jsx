import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import style from './Login.module.css'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/userContext'
import { Helmet } from 'react-helmet'
import { jwtDecode } from "jwt-decode";

export default function Login() {

  let { setUserToken, setUserName } = useContext(UserContext)

  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  let navigate = useNavigate()
  let validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Enter a valid email'),
    password: Yup.string().required('Password is required').matches(/^[A-Z][a-zA-z@_0-9]{4,10}$/, 'Enter a valid Password'),
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    }, onSubmit: submitForm
    , validationSchema
  })

  async function submitForm(values) {
    setLoading(true)
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      .catch((error) => {
        setApiError(error.response.data.message)
        setLoading(false)
      })
    if (data.message === 'success') {
      setApiError('')
      setLoading(false)
      setUserToken(data.token)
      localStorage.setItem('userToken', data.token)
      setUserName(jwtDecode(data.token).name)
      localStorage.setItem('userName', jwtDecode(data.token).name)
      navigate('/');
    }
  }

  function showAndHidePass(eye) {
    if (eye.classList.contains('fa-eye')) {
      document.querySelector('#password').setAttribute('type', 'text')
      eye.classList.add('fa-eye-slash')
      eye.classList.remove('fa-eye')
    } else {
      document.querySelector('#password').setAttribute('type', 'password')
      eye.classList.remove('fa-eye-slash')
      eye.classList.add('fa-eye')
    }

  }

  return <>

    <Helmet>
      <title>Login</title>
    </Helmet>

    <div className={style.login}>
      <div className='container d-flex align-items-center justify-content-center'>

        <form onSubmit={formik.handleSubmit} className='mt-5'>
          <h2 className='mt-4 text-center text-secondary fw-bold'>Login</h2>

          {apiError !== '' ? <div className="alert alert-danger" role="alert">{apiError}</div> : ''}


          <div className='mt-4'>

            {formik.errors.email && formik.touched.email ? <div className="alert alert-danger" role="alert">{formik.errors.email}</div> : ''}
            <label htmlFor='email'>Email:</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='email' id='email' name='email' className='form-control' />
          </div>

          <div className='mt-3'>

            {formik.errors.password && formik.touched.password ? <div className="alert alert-danger" role="alert">{formik.errors.password}</div> : ''}
            <label htmlFor='password'>Password:</label>
            <div className='position-relative mb-3'>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='password' id='password' name='password' className='form-control' />
              <i onClick={(e) => showAndHidePass(e.target)} className="fa-solid fa-eye cursor-pointer"></i>
            </div>

          </div>

          <div className='d-flex align-items-center justify-content-between w-100'>

            {loading ? <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn formBtn'> <i className='fa-solid fa-spinner fa-spin'></i> </button> : <><button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn formBtn'> Submit </button></>} <Link to={'/forgetPassword'} role='button'>Forget Password?</Link>

          </div>

          <div className='d-flex align-items-center justify-content-center w-100'>
            <Link to={'/register'} className='mt-4'>Don't have account? Register</Link>
          </div>

        </form>

      </div>
    </div>

  </>
}
