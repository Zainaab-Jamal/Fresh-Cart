import { Helmet } from "react-helmet";
import { UserContext } from "../../Context/userContext";
import { useContext, useEffect } from "react";

export default function UserProfile() {
  
  let {userName} = useContext(UserContext)

  return <>
  <Helmet>
    <title>
      Profile
    </title>
  </Helmet>

      <h2 className="text-center mt-3">
        Welcome {userName}
      </h2>
  </>
  
}
