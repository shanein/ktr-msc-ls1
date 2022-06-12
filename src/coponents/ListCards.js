import React, { useContext, useEffect, useState } from 'react'
import { getDatabase, ref, get, child, onValue } from "firebase/database";
import { UserContext } from '../context/userContext'

const db = getDatabase();

export default function ListCards() {

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


   function loadUser () {
      get(child(dbRef, 'users/' + currentUser.uid + '/cards'))
         .then((snapshot) => {
            if (snapshot.exists()) {
               const data = snapshot.val()
               let liste = []
               snapshot.forEach((childSnapshot) => {
                  const childKey = childSnapshot.key;
                  const childData = childSnapshot.val();
                  liste.push(childData)
                  console.log(childData)
               });
               console.log("Childdd", liste[0])
               console.log("Childdd", liste)

               setCards([...cards, liste])
            } else {
               console.log("No data available");
            }
         }).catch((error) => {
            console.error(error);
         });
   }

   const [cards, setCards] = useState([]);

   useEffect(() => {
     loadUser()
   }, [])

   let i = 0
   // printData()
   // console.log(data)

   /* {data.map((card) => (
               <div>{card.email}</div>
             ))} */

  // const data = onValue()
  // console.log("data", data)

  return (
     <div className="list-cards">
      {console.log(cards[0])}
      {console.log(cards[1])}
      {console.log(cards)}
      {cards.map((card, index) => (
         <div key={card[index].email}>
            <div>{card[index].email}{console.log(card[index].email)}</div>
            <div>{card[index].name}{console.log(card[index].name)}</div>
            <div>{card[index].company}{console.log(card[index].company)}</div>
            <div>{card[index].tel}{console.log(card[index].tel)}</div>
         </div>
      ))}

        <button
           onClick={() => toggleModals("createCard")}
           className='btn btn-primary'>
           +
        </button>
     </div>
  )
}

