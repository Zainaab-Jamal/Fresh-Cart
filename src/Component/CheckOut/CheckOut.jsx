import style from './CheckOut.module.css'
import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { CartContext } from '../../Context/cartContext'
export default function CheckOut() {

    let { checkOutPayment } = useContext(CartContext)

    let [loading, isLoading] = useState(false)
    let validationSchema = Yup.object({
        details: Yup.string().required('Details is required'),
        phone: Yup.string().required('Phone is required').matches(/^[0-9]{11}$/, 'Enter a valid Phone Number'),
        city: Yup.string().required('City is required')
    })

    let { id } = useParams()

    let formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: ""
        }, onSubmit: checkOut
        , validationSchema
    })

    async function checkOut(values) {
        isLoading(true)
        let data = await checkOutPayment(id, values)
        if (data.data.status === 'success') {
            isLoading(false)
            // window.open(data.data.session.url)
            window.location.href = data.data.session.url
        }
    }
    return <>
        <div className={style.checkOut}>
            <div className='container d-flex align-items-center justify-content-center'>

                <form className='mt-5' onSubmit={formik.handleSubmit}>
                    <h2 className='mt-4 text-center text-secondary fw-bold'>Check out</h2>

                    <div className='mt-4'>
                        <label htmlFor='details'>Details:</label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type='text' id='details' name='details' className='form-control' />
                        {formik.touched.details && formik.errors.details ? <p className='alert alert-danger mt-2'>{formik.errors.details}</p> : ''}

                    </div>

                    <div className='mt-3'>
                        <label htmlFor='phone'>Phone:</label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type='tel' id='phone' name='phone' className='form-control mb-3' />
                        {formik.touched.phone && formik.errors.phone ? <p className='alert alert-danger mt-2'>{formik.errors.phone}</p> : ''}

                    </div>

                    <div className='mt-3'>
                        <label htmlFor='city'>City:</label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type='text' id='city' name='city' className='form-control mb-3' />
                        {formik.touched.city && formik.errors.city ? <p className='alert alert-danger mt-2'>{formik.errors.city}</p> : ''}

                    </div>

                    <div className='d-flex align-items-center justify-content-center w-100'>
                      {loading ? <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn formBtn'> <i className='fa-solid fa-spinner fa-spin'></i> </button> : <button disabled={!(formik.dirty && formik.isValid)} type='submit' className='btn formBtn'>Pay <i className="fa-brands fa-cc-visa"></i></button>} 
                    </div>
                </form>
            </div>
        </div>

    </>
}
