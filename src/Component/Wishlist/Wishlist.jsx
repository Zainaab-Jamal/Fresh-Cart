import { useContext, useEffect, useState } from "react"
import { WishlistContext } from "../../Context/wishlistContext"
import { CartContext } from "../../Context/cartContext"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
import { BeatLoader } from "react-spinners"
import { Helmet } from "react-helmet"

export default function Wishlist() {

  let { getWishlist, removeWishlist, setWishItems } = useContext(WishlistContext)

  let [wishlistItems, setWishlistItems] = useState([])

  let [loading, setLoading] = useState(false)

  let { addCart, setItemsNum } = useContext(CartContext)

  async function getWishlistItems() {
    setLoading(true)
    let data = await getWishlist()

    if (data?.data.count === 0) {
      setWishItems(0)
      setWishlistItems(null)
    } else {
      setWishlistItems(data?.data.data)
      setWishItems(data.data.count)
    }
    setLoading(false)
  }

  useEffect(() => {
    getWishlistItems()
  }, [])

  async function addToCart(id) {
    let data = await addCart(id)
      .catch((err) => { console.log(err); })

    if (data?.data.status === "success") {
      setItemsNum(data.data.numOfCartItems)
      console.log(data.data.numOfCartItems);
      Swal.fire({
        title: "Success",
        text: "Your product added successfully to your cart",
        icon: "success",
        confirmButtonColor: '#00a400'
      });
    }
  }

  async function removeWishlistItem(productId, e) {
    let data = await removeWishlist(productId)
      .catch((err) => { console.log(err) })

    if (data.data.status === "success") {
      getWishlistItems()
      setWishItems(data.data.count)
    }
  }

  return <>

    <Helmet>
      <title>Wishlist</title>
    </Helmet>

    {loading ? <div className='d-flex align-items-center justify-content-center w-100 vh-100'>
      <BeatLoader color="#009b00" />
    </div> : <div className="container">
      <div className="row align-items-center justify-content-center g-2 mt-5">

        {wishlistItems ? <>
          {wishlistItems.map((item) => <div key={item.id} className='col-md-2'>
            <div className='product position-relative'>
              <Link to={`/productDetails/${item.id}`}>
                <img src={item.imageCover} alt='product' className='w-100' />
                <h6 className='text-main mt-2'>{item.category.name}</h6>
                <h6 className='fw-bold'>{item.title.split(' ').splice(0, 2).join(' ')}</h6>
                <div className='d-flex align-items-center justify-content-between mt-2'>
                  <span>{item.price} EGP</span>
                  <span><i className="fa-solid fa-star rating-color "></i> {item.ratingsAverage}</span>
                </div>

              </Link>

              <i onClick={(e) => removeWishlistItem(item.id, e)} className="fa-solid fa-heart-crack cursor-pointer"></i>

              <button onClick={() => { addToCart(item.id) }} className='btn bg-main w-100 text-light mt-3'>Add to cart</button>
            </div>
          </div>

          )}
        </> : <div className='alert alert-danger text-center fs-4'>Wishlist is empty</div>}

      </div>
    </div>}


  </>
}
