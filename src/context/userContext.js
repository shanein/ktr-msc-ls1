import { createContext, useState, useEffect } from "react";

import {
   signInWithEmailAndPassword,
   createUserWithEmailAndPassword,
   onAuthStateChanged,
} from "firebase/auth"
import { auth } from "../firebase-config";
import { getDatabase, ref, push, set } from "firebase/database";

export const UserContext = createContext()

export function UserContextProvider(props) {

   /*log*/
   const signUp = (email, pwd) => createUserWithEmailAndPassword(auth, email, pwd)
   const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd)

   /*database*/
   const db = getDatabase();

   /*Add info to account*/
   const createInfo = (id, email, name, company, tel) => set(ref(db, 'users/' + id), {
      email: email,
      name: name,
      company: company,
      tel: tel
   });

   /*Create card*/
   const createCard = (email, name, company, tel) => push(ref(db, 'users/' + currentUser.uid + '/cards'), {
      email: email,
      name: name,
      company: company,
      tel: tel
   });

   const [currentUser, setCurrentUser] = useState()
   const [loadingData, setLoadingData] = useState(true)


   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         setCurrentUser(currentUser)
         setLoadingData(false)
      })

      return unsubscribe;
   }, [])

   //Modal
   const [modalState, setModalState] = useState({
      signUpModal: false,
      signInModal: false,
      createCardModal: false
   })

   const toggleModals = modal => {
      if (modal === "signIn") {
         setModalState({
            signUpModal: false,
            signInModal: true,
            createCardModal: false
         })
      }
      if (modal === "signUp") {
         setModalState({
            signUpModal: true,
            signInModal: false,
            createCardModal: false
         })
      }
      if (modal === "createCard") {
         setModalState({
            signUpModal: false,
            signInModal: false,
            createCardModal: true
         })
      }
      if (modal === "close") {
         setModalState({
            signUpModal: false,
            signInModal: false,
            createCardModal: false
         })
      }
   }

   return (
      <UserContext.Provider value={{modalState, toggleModals, signUp, currentUser, signIn, createCard, createInfo}}>
         {/* If we have data we can see the app */}
         {!loadingData && props.children}
      </UserContext.Provider>
   )
}
