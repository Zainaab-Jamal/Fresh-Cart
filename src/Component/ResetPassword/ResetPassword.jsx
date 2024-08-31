import React, { useContext, useState } from 'react'
import style from './ResetPassword.module.css'
import axios from 'axios'
import { useFormik } from 'formik'
import { Helmet } from 'react-helmet'
import { UserContext } from '../../Context/userContext'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function ResetPassword() {

    let { setUserToken } = useContext(UserContext)

    const [loading, setLoading] = useState(false)

    let navigate = useNavigate()

    async function updatePassword(values) {
        setLoading(true)
        let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)

        if (data.token) {
            localStorage.setItem('userToken', data.token)
            setUserToken(data.token)
            setLoading(false)
            Swal.fire({
                title: "Success",
                text: "Your password reset successfully",
                icon: "success",
                confirmButtonColor: '#00a400'
            });
            navigate('/')
        }
    }

    let formik = useFormik({
        initialValues: {
            email: '',
            newPassword: ''
        }, onSubmit: updatePassword
    })

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

    return <>

        <Helmet>
            <title>Reset Password</title>
        </Helmet>
        <div className={style.reset}>
            <div className='container d-flex align-items-center justify-content-center'>
                <form onSubmit={formik.handleSubmit} className='mt-5'>
                    <h2 className='mt-4 text-center text-secondary fw-bold'>Reset Your Password</h2>

                    <input onChange={formik.handleChange} type='email' name='email' placeholder='email' className='form-control mb-3 mt-4' />

                    <div id='pass' className='position-relative mb-3'>
                        <input onChange={formik.handleChange} type='password' name='newPassword' placeholder='New Password' className='form-control' />
                        <i onClick={(e) => showAndHidePass(e.target)} className="fa-solid fa-eye cursor-pointer"></i>
                    </div>

                    {loading ? <button disabled={!formik.dirty} type='submit' className='btn formBtn'> <i className='fa-solid fa-spinner fa-spin'></i> </button> : <><button disabled={!formik.dirty} type='submit' className='btn formBtn'> Reset Password </button></>}

                </form>
            </div>
        </div>


    </>
}
