import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BeatLoader } from 'react-spinners';
import Slider from "react-slick";
import { CartContext } from '../../Context/cartContext';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    let { addCart, setItemsNum } = useContext(CartContext)
    let [loading, setLoding] = useState(true)
    let [datails, setDetails] = useState({})

    let { id } = useParams()

    useEffect(() => {
        getProDetails(id)
    }, [])

    async function getProDetails(ProId) {
        setLoding(true)
        let data = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${ProId}`)
        setDetails(data.data.data)
        setLoding(false)
    }

    async function addToCart(id) {
        let data = await addCart(id)
            .catch((err) => { console.log(err) })

        if (data.data.status === 'success') {
            setItemsNum(data.data.numOfCartItems)
            Swal.fire({
                title: "Success",
                text: "Your product added successfully to your cart",
                icon: "success",
                confirmButtonColor: '#00a400'
            });
        }
    }

    return <>

        <Helmet>
            <title>Product Details</title>
        </Helmet>

        {loading ? <div className='d-flex align-items-center justify-content-center w-100 vh-100'>
            <BeatLoader color="#009b00" />
        </div> : <div className='container'>
            <div className='row align-items-center justify-content-center my-4'>
                <div className='col-md-3'>
                    <div>
                        <Slider {...settings}>
                            {datails.images.map((img, index) => <img key={index} src={img} alt='product' />)}
                        </Slider>

                    </div>
                </div>
                <div className='col-md-9'>
                    <div>
                        <h4 className='fw-bold'>{datails.title}</h4>
                        <p className='text-secondary fs-5'>{datails.description}</p>
                        <h5 className='font-sm fw-bold text-main'>{datails.category.name}</h5>
                        <div className='d-flex align-items-center justify-content-between'>
                            <span className='fs-5'>{datails.price} EGP</span>
                            <span><i className="fa-solid fa-star rating-color fs-5"></i> {datails.ratingsAverage}</span>
                        </div>

                        <button onClick={() => { addToCart(datails.id) }} className='btn bg-main text-light w-100 mt-4'>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
        }


    </>
}
