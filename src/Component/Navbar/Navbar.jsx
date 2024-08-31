import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/freshcart-logo.svg'
import { UserContext } from '../../Context/userContext'
import { CartContext } from '../../Context/cartContext'
import { WishlistContext } from '../../Context/wishlistContext'
import style from './Navbar.module.css'

export default function Navbar() {

  let { itemsNum } = useContext(CartContext)

  let { wishItems } = useContext(WishlistContext)

  let navigate = useNavigate()
  let { userToken, setUserToken, setUserName } = useContext(UserContext)

  function logOut() {
    localStorage.removeItem('userToken')
    setUserToken('')
    localStorage.removeItem('userName')
    setUserName(null)
    navigate('/login')
  }

  window.addEventListener('scroll', function () {
    if (window.scrollY > 250) {
      document.getElementById('navbarContainer').classList.remove('px-5', 'py-3')
      document.getElementById('navbarContainer').classList.add('px-5', 'py-3')
      document.getElementById('topUp').style.opacity = 1
    } else {
      document.getElementById('navbarContainer').classList.add('px-5', 'py-3')
      document.getElementById('navbarContainer').classList.remove('px-5', 'py-3')
      document.getElementById('topUp').style.opacity = 0
    }
  })

  function topUp() {
    window.scrollTo(0, 0)
  }

  return <>
    <nav id='navbarContainer' className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to={'home'}><img src={logo} alt='logo' /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {userToken ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <NavLink className="nav-link" to={''}>Home</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to={'products'}>Products</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to={'categories'}>Categories</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to={'cart'}>Cart</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to={'brands'}>Brands</NavLink>
            </li>

          </ul> : ''}

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">

            {userToken ?
              <>

                <li className="nav-item">
                  <div className="dropdown me-2">
                    <i className="fa-solid fa-user fa-sm text-main personBorder dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
                    <ul className="dropdown-menu text-center">
                      <li><Link className="dropdown-item" to={'/userProfile'}>Profile</Link></li>
                      <li><Link className="dropdown-item" to={'/allorders'}>My Orders</Link></li>
                      <li><Link className="dropdown-item" to={'/forgetPassword'}>ForgetPassword</Link></li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item">
                  <Link to={'/cart'}>
                    <span className="nav-link position-relative" role='button'>
                      <i className="fa-solid fa-basket-shopping fa-xl text-dark me-1"></i>
                      <span className='cartItemsNum'>{itemsNum}</span>
                    </span>
                  </Link>

                </li>

                <li className="nav-item">
                  <Link to={'/wishlist'}>
                    <span className="nav-link position-relative" role='button'>
                      <i className="fa-solid fa-heart fa-xl text-dark me-4"></i>
                      <span className='wishItemsNum'>{wishItems}</span>
                    </span>
                  </Link>

                </li>

                <li className="nav-item d-flex align-items-center">
                  <i className="fa-brands fa-facebook mx-1 fa-lg" role='button'></i>
                  <i className="fa-brands fa-instagram mx-1 fa-lg" role='button'></i>
                  <i className="fa-brands fa-whatsapp mx-1 fa-lg" role='button'></i>
                </li>

                <li className="nav-item">
                  <span className="nav-link ms-1 btn bg-main text-light" role='button' onClick={() => logOut()}>Logout</span>
                </li>
              </> : <>

                <li className="nav-item d-flex align-items-center">
                  <i className="fa-brands fa-facebook mx-1 fa-lg" role='button'></i>
                  <i className="fa-brands fa-instagram mx-1 fa-lg" role='button'></i>
                  <i className="fa-brands fa-whatsapp mx-1 fa-lg" role='button'></i>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to={'/login'}>Login</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to={'/register'}>Register</Link>
                </li>
              </>
            }
          </ul>
        </div>
      </div>
    </nav>

    <div id='topUp' onClick={() => topUp()} className={style.topUp}>
      <i className="fa-solid fa-angles-up fa-xl text-light"></i>
    </div>
  </>
}
