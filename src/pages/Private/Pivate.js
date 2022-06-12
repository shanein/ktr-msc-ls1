import React, {useContext} from 'react'
import { UserContext } from '../../context/userContext'
import { Outlet, Navigate } from 'react-router-dom'

export default function Private() {

   const {currentUser} = useContext(UserContext)
   console.log("Private :", currentUser.uid)

   if (!currentUser) {
      return <Navigate to="/"/>
   }

   return (
      <div className="container">
         <Outlet />
      </div>
   )
}
