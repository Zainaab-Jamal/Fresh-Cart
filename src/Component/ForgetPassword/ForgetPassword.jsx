import React, { useState } from 'react'
import style from './ForgetPassword.module.css'
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function ForgetPassword() {

    let navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    async function postEmail(values) {
        setLoading(true)

        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords `, values)

        console.log(data)
        if (data.statusMsg === 'success') {
            setLoading(false)
            navigate('/verifycode')
        }
    }

    let formik = useFormik({
        initialValues: {
            email: '',
        }, onSubmit: postEmail
    })

    return <>

        <Helmet>
            <title>Forget Passsword</title>
        </Helmet>

        <div className={style.password}>
            <div className='container d-flex align-items-center justify-content-center'>
                <form onSubmit={formik.handleSubmit} className='mt-5'>
                    <h2 className='mt-4 text-center text-secondary fw-bold'>Please enter your email</h2>

                    <input onChange={formik.handleChange} type='email' name='email' placeholder='Email' className='form-control mt-4 mb-4' />

                    {loading ? <button disabled={!formik.dirty} type='submit' className='btn formBtn'> <i className='fa-solid fa-spinner fa-spin'></i> </button> : <><button disabled={!formik.dirty} type='submit' className='btn formBtn'> Verify </button></>}

                </form>
            </div>
        </div>
    </>
}
