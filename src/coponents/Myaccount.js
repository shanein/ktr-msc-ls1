import React, { useContext, useEffect, useState } from 'react'
import { getDatabase, ref, get, child, onValue } from "firebase/database";
import { UserContext } from '../context/userContext'

const db = getDatabase();

export default function Myaccount() {

   const { toggleModals } = useContext(UserContext)
   const { currentUser } = useContext(UserContext)

   // const starCountRef = ref(db, 'posts/' + postId + '/starCount');

   // onValue(ref(db, 'users/' + currentUser.uid + '/cards'), (snapshot) => {
   //    const data = snapshot.val();
   //    console.log(data)
   // }, {
   //    onlyOnce: true
   // });

   // console.log(data)

    const dbRef = ref(getDatabase());
   // const db = firebase.database();


   let liste = []


   function loadUser () {
      get(child(dbRef, 'users/' + currentUser.uid))
         .then((snapshot) => {
            if (snapshot.exists()) {
               liste = []
               const data = snapshot.val();
               snapshot.forEach((childSnapshot) => {
                  const childKey = childSnapshot.key;
                  const childData = childSnapshot.val();
                  liste.push(childData)
                  console.log(childData)
               });
               console.log("Childdd", liste[0])
               console.log("Childdd", liste)

               setAccounts([...users, liste])
            } else {
               console.log("No data available");
            }
         }).catch((error) => {
            console.error(error);
         });
   }

   const [users, setAccounts] = useState([]);

   useEffect(() => {
     loadUser()
   }, [])

  return (
     <div className="">
        {/* <div>{console.log(users[0][2])}</div> */}
        <div>{console.log(users[0][1])}</div>

         <div>
            <div>Email : {users[0][2]}{console.log(users[0][2])}</div>
            <div>Name : {users[0][1]}{console.log(users[0][1])}</div>
            <div>Agency Name : {users[0][3]}{console.log(users[0][3])}</div>
            <div>Tel : {users[0][4]}{console.log(users[0][4])}</div>
         </div>


     </div>
  )
}

