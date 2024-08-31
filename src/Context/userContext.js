import { createContext, useState } from "react";

export let UserContext = createContext()

export function UserContextProvider({children}){

    let [userToken, setUserToken] = useState()

    let [userName, setUserName] = useState(null)

    return<UserContext.Provider value={{userToken, setUserToken, userName, setUserName}}>
        {children}
    </UserContext.Provider>
}