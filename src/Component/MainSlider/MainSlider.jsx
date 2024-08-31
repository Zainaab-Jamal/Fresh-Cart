import React from 'react'
import Slider from "react-slick";
import slider1 from '../../assets/images/slider1.jpeg'
import slider2 from '../../assets/images/slider2.jpeg'
import slider3 from '../../assets/images/slider3.jpeg'
import img1 from '../../assets/images/SmallImg1.jpeg'
import img2 from '../../assets/images/SmallImage2.jpeg'

export default function MainSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };

    return <>
        <div className='container'>
            <div className='row g-0'>
                <div className='col-md-9'>
                    <Slider {...settings}>
                        <img src={slider1} alt='slider' className='w-100' height={380} />
                        <img src={slider2} alt='slider' className='w-100' height={380} />
                        <img src={slider3} alt='slider' className='w-100' height={380} />
                    </Slider>
                </div>

                <div className='col-md-3'>
                    <img src={img1} alt='slider' className='w-100' height={190} />
                    <img src={img2} alt='slider' className='w-100' height={190} />
                </div>
            </div>
        </div>
    </>
}
