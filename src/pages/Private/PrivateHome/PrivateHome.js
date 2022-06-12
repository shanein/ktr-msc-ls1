import React, { useContext } from 'react'
import { UserContext } from '../../../context/userContext'
import ListCards from '../../../coponents/ListCards';

export default function PrivateHome() {
  return (
   <div className="container p-5">
        <h1 className="display-3 mb-4">Liste of cards :</h1>
        <div className="container">
          <ListCards />
        </div>
   </div>
  )
}

