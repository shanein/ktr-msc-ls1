import React, {useContext} from 'react'
import { UserContext } from '../context/userContext'
import {Link} from 'react-router-dom'
import {signOut} from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import {auth} from "../firebase-config"

export default function Navbar() {

   const {toggleModals} = useContext(UserContext)
   const {currentUser} = useContext(UserContext)

   const navigate = useNavigate()

   const logOut = async () => {
      try {
         await signOut(auth)
         navigate("/")
      } catch(err) {
         alert("error disconnected")
         console.log(err)
      }
   }

   const account = () => {
      navigate("/private/my-account")
   }

  return (
     <nav className="navbar navbar-light bg-dark px-4">
      <Link
      to={currentUser ? "/private/private-home" : "/"}
      className="navbar-brand text-white">Cards</Link>

   {!currentUser &&
    <div>
      <button
      onClick={() => toggleModals("signUp")}
      className='btn btn-primary'>
         Sign Up
      </button>
      <button
      onClick={() => toggleModals("signIn")}
      className='btn btn-primary ms-2'>
         Sign In
      </button>
    </div>
   }

   {currentUser &&
      <div>
         <button
         onClick={account}
         className='btn btn-secondary ms-2'>
            My account
         </button>
         <button
         onClick={logOut}
         className='btn btn-danger ms-2'>
            Log Out
         </button>
      </div>
   }
   </nav>

  )
}

