import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext()

export default function CartContextProvider({ children }) {

    let [itemsNum, setItemsNum] = useState(0)

    function addCart(prodId) {

        let headers = {
            token: localStorage.getItem('userToken')
        }

        let body = {
            productId: prodId
        }
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart', body, { headers })
    }

    function getUserCart() {

        let headers = {
            token: localStorage.getItem('userToken')
        }

        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
    }

    function removeCartItem(id) {

        let headers = {
            token: localStorage.getItem('userToken')
        }

        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers })
    }

    function clearCart() {

        let headers = {
            token: localStorage.getItem('userToken')
        }

        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
    }

    function updateCart(id, count) {

        let headers = {
            token: localStorage.getItem('userToken')
        }

        let body = {
            count
        }
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, body, { headers })
    }



    function checkOutPayment(id, data) {

        let header = {
            headers:{
                token: localStorage.getItem('userToken')
            }
        }
        let body = {
            shippingAddress: data
        }
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`, body, header)
    }

    return <CartContext.Provider value={{ checkOutPayment, addCart, itemsNum, setItemsNum, getUserCart, removeCartItem, clearCart, updateCart }}>
        {children}
    </CartContext.Provider>
}