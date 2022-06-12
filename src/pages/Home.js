import React, { useContext } from 'react';
import { UserContext } from '../context/userContext'
import {Navigate } from 'react-router-dom'

export default function Home() {

   const { currentUser } = useContext(UserContext)

   if (currentUser) {
      return <Navigate to="/private/private-home" />
   }

   return (
      <div className='container p-5'>
         <h1 className="display-3">Sign up or sign In</h1>
      </div>
   )

}
