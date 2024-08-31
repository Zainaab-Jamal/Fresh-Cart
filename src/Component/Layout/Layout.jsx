import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { CartContext } from '../../Context/cartContext'
import { UserContext } from '../../Context/userContext'
import { WishlistContext } from '../../Context/wishlistContext'
import React, { useContext, useEffect } from 'react'

export default function Layout() {

  let { getUserCart, setItemsNum } = useContext(CartContext)

  let { setWishItems, getWishlist, setWishlistItems } = useContext(WishlistContext)

  let { setUserToken, setUserName } = useContext(UserContext)

  async function getCart() {
    let data = await getUserCart()
      .catch((err) => {
        console.log(err)
      })
      console.log(data);
    if (data?.data?.status === 'success') {
      setItemsNum(data.data.numOfCartItems)
    }
  }
  async function getWishlistItems() {
    let data = await getWishlist()
      .catch((err) => {
        console.log(err);
      })
      console.log(data?.data?.data);
    if (data?.data?.status === 'success') {
      setWishItems(data.data.count)
      console.log(data.data.data);
      setWishlistItems(data.data.data)
    }

  }

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      setUserToken(localStorage.getItem('userToken'))
      getCart()
      getWishlistItems()
    }
    if(localStorage.getItem('userName')){
      setUserName(localStorage.getItem('userName'))
    }

  }, [])


  return <>
    <Navbar />

    <div className='mt-5 pt-4'>
      <Outlet></Outlet>
    </div>

    <Footer />
  </>
}
