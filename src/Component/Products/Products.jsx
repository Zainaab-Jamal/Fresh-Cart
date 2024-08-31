import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import { CartContext } from '../../Context/cartContext'
import Swal from 'sweetalert2'
import { WishlistContext } from '../../Context/wishlistContext'
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet'

export default function Products() {
  const [page, setPage] = useState(1)
  const [searchProducts, setSearchProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  const { addCart, setItemsNum } = useContext(CartContext)
  const { addWishlist, removeWishlist, setWishItems, getWishlist, wishlistItems } = useContext(WishlistContext)

  function getProducts(queryData) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${queryData.queryKey[1]}`)
  }

  const { data, isLoading } = useQuery(['productsApi', page], getProducts)

  function getPageNumber(event) {
    const pageNum = event.target.getAttribute('pagenum')
    if (pageNum) {
      setPage(Number(pageNum))
    } else if (event.target.innerHTML === 'First') {
      setPage(1)
    } else if (event.target.innerHTML === 'Last') {
      setPage(2)
    }
    window.scrollTo(0, 0)
  }

  async function addToCart(id) {
    try {
      const response = await addCart(id)
      if (response?.data.status === "success") {
        setItemsNum(response.data.numOfCartItems)
        Swal.fire({
          title: "Success",
          text: "Your product added successfully to your cart",
          icon: "success",
          confirmButtonColor: '#00a400'
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function controlWishlist(productId, e) {
    try {
      if (e.target.classList.contains('fa-heart')) {
        const response = await addWishlist(productId)
        if (response?.data.status === "success") {
          setWishItems(response.data.data.length)
          toast('The Product successfully added to your wishlist', {
            duration: 4000,
            position: 'bottom-right',
            style: { backgroundColor: '#0aad0a', color: 'white' },
          });
          e.target.classList.add('fa-heart-crack')
          e.target.classList.remove('fa-heart')
        }
      } else if (e.target.classList.contains('fa-heart-crack')) {
        const response = await removeWishlist(productId)
        if (response.data.status === "success") {
          setWishItems(response.data.data.length)
          toast('The Product successfully removed from your wishlist', {
            duration: 4000,
            position: 'bottom-right',
            style: { backgroundColor: '#0aad0a', color: 'white' },
          });
          e.target.classList.remove('fa-heart-crack')
          e.target.classList.add('fa-heart')
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (searchQuery) {
      setSearchProducts(data?.data.data.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase())))
    } else {
      setSearchProducts(data?.data.data)
    }
  }, [data, searchQuery])

  function searchByName(name) {
    setSearchQuery(name)
  }

  return <>

    <Helmet>
      <title>Products</title>
    </Helmet>

    {isLoading ? (
      <div className='d-flex align-items-center justify-content-center w-100 vh-100'>
        <BeatLoader color="#009b00" />
      </div>
    ) : (
      <div className='container-fluid'>
        <div className='mt-5 d-flex align-items-center justify-content-center'>
          <input onChange={(e) => searchByName(e.target.value)} type='text' placeholder='Search...' className='form-control w-75' />
        </div>
        <div className='row g-3 mt-4'>
          {searchProducts?.map((product) => (
            <div key={product.id} className='col-md-2'>
              <div className='product position-relative'>
                <Link to={`/productDetails/${product.id}`}>
                  <img src={product.imageCover} alt='product' className='w-100' />
                  <h6 className='text-main mt-2'>{product.category.name}</h6>
                  <h6 className='fw-bold'>{product.title.split(' ').splice(0, 2).join(' ')}</h6>
                  <div className='d-flex align-items-center justify-content-between mt-2'>
                    <span>{product.price} EGP</span>
                    <span><i className="fa-solid fa-star rating-color "></i> {product.ratingsAverage}</span>
                  </div>
                </Link>
                {wishlistItems?.some(obj => obj.id === product.id) ? (
                  <i onClick={(e) => controlWishlist(product.id, e)} className="fa-solid fa-heart-crack cursor-pointer"></i>
                ) : (
                  <i onClick={(e) => controlWishlist(product.id, e)} className="fa-solid fa-heart cursor-pointer"></i>
                )}
                <button onClick={() => { addToCart(product.id) }} className='btn bg-main w-100 text-light mt-3'>Add to cart</button>
              </div>
            </div>
          ))}
          <Toaster />
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center my-4">
            <li className="page-item">
              <span className="page-link" aria-label="Previous">
                <span aria-hidden="true" role='button' onClick={getPageNumber}>First</span>
              </span>
            </li>
            <li className="page-item"><span className="page-link cursor-pointer" pagenum='1' onClick={getPageNumber}>1</span></li>
            <li className="page-item"><span className="page-link cursor-pointer" pagenum='2' onClick={getPageNumber}>2</span></li>
            <li className="page-item">
              <span className="page-link" aria-label="Next">
                <span aria-hidden="true" role='button' onClick={getPageNumber}>Last</span>
              </span>
            </li>
          </ul>
        </nav>
      </div>
    )}
  </>

}







