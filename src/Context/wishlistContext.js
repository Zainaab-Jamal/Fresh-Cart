import axios from "axios";
import { createContext, useState } from "react";

export let WishlistContext = createContext()

export default function WishlistContextProvider({ children }) {

    let [wishItems, setWishItems] = useState(0)
    const [wishlistItems, setWishlistItems] = useState([])


    function addWishlist(id) {
        let headers = {
            token: localStorage.getItem('userToken')
        }

        let body = {
            productId: id
        }
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, body, { headers })
    }

    function removeWishlist(id) {
        let headers = {
            token: localStorage.getItem('userToken')
        }

        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers })
    }

    async function getWishlist() {
        let headers = {
            token: localStorage.getItem('userToken')
        }

        return await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', { headers })
            .then((response) => response)
            .catch((err) => err)
    }

    return <WishlistContext.Provider value={{ addWishlist, removeWishlist, getWishlist, setWishItems, wishItems, setWishlistItems, wishlistItems }}>
        {children}
    </WishlistContext.Provider>
}