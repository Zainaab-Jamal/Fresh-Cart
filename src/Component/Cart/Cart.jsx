import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/cartContext'
import { BeatLoader } from 'react-spinners'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Cart() {

  let { getUserCart, removeCartItem, clearCart, setItemsNum, updateCart } = useContext(CartContext)

  let [cartData, setCartData] = useState({})

  let [loading, setLoading] = useState(true)

  useEffect(() => {
    
  async function getCartItems() {
    setLoading(true)

    let data = await getUserCart()
      .catch((err) => {
        console.log(err)
        setLoading(false)
        if (err.response.data?.statusMsg === 'fail') {
          setCartData(null)
        }
      })

    if (data?.data.status === 'success') {
      setLoading(false)
      setCartData(data?.data.data)
    }
  }
    getCartItems()
  }, [])

  async function removeItem(id) {
    setLoading(true)
    let data = await removeCartItem(id)
      .catch((err) => console.log(err))

    if (data.data.status === 'success') {
      setLoading(false)
      setCartData(data?.data.data)
      setItemsNum(data.data.numOfCartItems)
    }

    if (data.data.data.totalCartPrice === 0) {
      setCartData(null)
    }
  }

  async function clearAllItems() {
    setLoading(true)
    let data = await clearCart()
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })

    if (data.data.message === 'success') {
      setLoading(false)
      setCartData(null)
      setItemsNum(0)
    }

  }

  async function updateCartItem(id, count) {
    let data = await updateCart(id, count)
      .catch((err) => console.log(err))

    if (count === 0) {
      removeItem(id)
    } else {
      if (data.data.status === 'success') {
        setCartData(data?.data.data)
      }
    }

    if (data.data.data.totalCartPrice === 0) {
      setCartData(null)
    }

  }

  return <>

    <Helmet>
      <title>Cart</title>
    </Helmet>

    {loading ? <div className='d-flex align-items-center justify-content-center w-100 mt-5 h-50'>
      <BeatLoader color="#009b00" />
    </div> : <>
      <div className='container py-2 px-4 w-75'>

        <div className='d-flex align-items-center justify-content-between px-4'>
          {cartData ? <h5 className='my-3 text-main fw-bold'>Total price : {cartData.totalCartPrice} EGP</h5> : <h5 className='my-3 text-main fw-bold'>Total price : 0 EGP</h5>}

          {cartData ? <button onClick={() => clearAllItems()} className='btn btn-danger'>Clear Cart</button> : ''}
        </div>
        {cartData ? <>
          {cartData.products.map((item) => <div key={item._id} className='row align-items-center justify-content-between border-bottom border-light mb-2 p-2 bg-body-secondary'>
            <div className='col-md-10'>

              <div className='row align-items-center justify-content-center'>
                <div className='col-md-2'>
                  <img src={item.product.imageCover} alt='product' className='w-100' />
                </div>
                <div className='col-md-10'>
                  <div>
                    <h5>{item.product.title.split(' ').splice(0, 5).join(' ')}</h5>
                    <h6 className='fw-bold'>Price : {item.price} EGP</h6>
                    <span onClick={() => removeItem(item.product._id)} className='cursor-pointer text-danger mt-2'><i className='fa-solid fa-trash me-2'></i>Remove</span>
                  </div>
                </div>
              </div>

            </div>
            <div className='col-md-2'>
              <span onClick={() => updateCartItem(item.product._id, item.count += 1)} className='btn btn-success btn-sm'>
                <i className="fa-solid fa-plus fa-xs"></i>
              </span>
              <span className='mx-2'>{item.count}</span>
              <span onClick={() => updateCartItem(item.product._id, item.count -= 1)} className='btn btn-danger btn-sm'>
                <i className="fa-solid fa-minus fa-xs"></i>
              </span>

            </div>
          </div>)}
          <div className='d-flex align-items-center justify-content-center'>
            <Link to={`/checkout/${cartData._id}`} className='btn btn-success text-light'>Check Out Payment</Link>
          </div>
        </> : <div className='alert alert-danger text-center fs-4'>Cart is empty</div>}
      </div>

    </>}
  </>
}
