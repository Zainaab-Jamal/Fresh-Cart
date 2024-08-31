import { useContext } from "react";
import { Helmet } from "react-helmet";
import { UserContext } from "../../Context/userContext";

export default function AllOrders() {
  let { setUserToken } = useContext(UserContext)

  if(localStorage.getItem('userToken')){
    setUserToken('userToken')
  }

  return <>
    <Helmet>
      <title>All Orders</title>
    </Helmet>

<div className="container mt-4">
<div className='alert alert-danger text-center fs-4'>No Orders Yet</div>
</div>

  </>
}
