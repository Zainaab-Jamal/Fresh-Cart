import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Home from './Component/Home/Home'
import Layout from './Component/Layout/Layout'
import Products from './Component/Products/Products'
import Categories from './Component/Categories/Categories'
import NotFound from './Component/NotFound/NotFound'
import Register from './Component/Register/Register'
import Cart from './Component/Cart/Cart'
import Login from './Component/Login/Login'
import Brands from './Component/Brands/Brands'
import { UserContextProvider } from './Context/userContext'
import ProtectedGuard from './Component/ProtectedGuard/ProtectedGuard'
import { QueryClient, QueryClientProvider } from 'react-query'
import ProductDetails from './Component/ProductDetails/ProductDetails'
import CartContextProvider from './Context/cartContext'
import CheckOut from './Component/CheckOut/CheckOut'
import AllOrders from './Component/AllOrders/AllOrders'
import SubCategories from './Component/SubCategories/SubCategories'
import WishlistContextProvider from './Context/wishlistContext'
import Wishlist from './Component/Wishlist/Wishlist'
import ForgetPassword from './Component/ForgetPassword/ForgetPassword'
import VerifyCode from './Component/VerifyCode/VerifyCode'
import ResetPassword from './Component/ResetPassword/ResetPassword'
import UserProfile from './Component/UserProfile/UserProfile'

export default function App() {

  let Client = new QueryClient()

  let Routes = createHashRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectedGuard><Home /></ProtectedGuard> },
        { path: 'products', element: <ProtectedGuard><Products /></ProtectedGuard> },
        { path: 'productDetails/:id', element: <ProtectedGuard><ProductDetails /></ProtectedGuard> },
        { path: 'categories', element: <ProtectedGuard><Categories /></ProtectedGuard> },
        { path: 'categories/:id', element: <ProtectedGuard><SubCategories /></ProtectedGuard> },
        { path: 'checkout/:id', element: <ProtectedGuard><CheckOut /></ProtectedGuard> },
        { path: 'allorders', element: <ProtectedGuard><AllOrders /></ProtectedGuard> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'cart', element: <ProtectedGuard> <Cart /></ProtectedGuard> },
        { path: 'userProfile', element: <ProtectedGuard> <UserProfile /></ProtectedGuard> },
        { path: 'wishlist', element: <ProtectedGuard> <Wishlist /></ProtectedGuard> },
        { path: 'brands', element: <ProtectedGuard><Brands /></ProtectedGuard> },
        { path: 'forgetPassword', element: <ForgetPassword /> },
        { path: 'verifycode', element: <VerifyCode /> },
        { path: 'resetpassword', element: <ResetPassword /> },
        { path: '*', element: <NotFound /> },
      ]
    },
  ])

  return <>
    <QueryClientProvider client={Client}>
      <UserContextProvider>
        <CartContextProvider>
          <WishlistContextProvider>
            <RouterProvider router={Routes}></RouterProvider>
          </WishlistContextProvider>
        </CartContextProvider>
      </UserContextProvider>
    </QueryClientProvider>

  </>
}

