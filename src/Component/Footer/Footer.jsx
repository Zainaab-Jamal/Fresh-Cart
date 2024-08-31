import style from './Footer.module.css'
import amazon from '../../assets/images/Amazon_Pay_logo.png'
import express from '../../assets/images/AmericanExpress.png'
import master from '../../assets/images/MasterCard.png'
import paypal from '../../assets/images/PayPal.png'
import appStore from '../../assets/images/AppStoreLogo.png'
import googlePlay from '../../assets/images/GooglePlayLogo.png'

export default function Footer() {

  return <>
    <div className={style.footerComponent}>
      <div className='container'>
        <h4>Get the FreshCart app</h4>
        <p>We will send you a link, Open it on you phone to download the app</p>

        <div className='d-flex align-items-center justify-content-center gap-4 border border-top-0 border-start-0 border-end-0 pb-4' >

          <input type='email' placeholder='Email..' className='form-control ms-3' />
          <button className='btn bg-main text-light px-5 flex-shrink-0'>Share App link</button>

        </div>

        <div className='row align-items-center justify-content-between mt-3 border border-top-0 border-start-0 border-end-0 pb-4'>
          <div className='col-md-4'>

            <div className='d-flex align-items-center justify-content-center'>

              <span className='me-3 flex-shrink-0'>Payment partners</span>

              <img src={amazon} alt='amazon' width={35} height={15} />
              <img src={express} alt='express' width={50} height={30} />
              <img src={master} alt='master' width={50} height={30} />
              <img src={paypal} alt='paypal' width={50} height={30} />

            </div>

          </div>

          <div className='col-md-4'>

            <div className='d-flex gap-2 align-items-center justify-content-center'>
              <span className='flex-shrink-0'>Get deliveries with FreshCart</span>
              <img src={appStore} width={80} height={26} alt='app store' />
              <img src={googlePlay} width={80} height={30} alt='google play'/>

            </div>

          </div>

        </div>

      </div>
    </div>
  </>
}
