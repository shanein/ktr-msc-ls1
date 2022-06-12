import React, { useContext, useRef, useState } from 'react'
import { UserContext } from "../context/userContext"
import { useNavigate } from 'react-router-dom'

export default function SignUpModal() {
   const { modalState, toggleModals, signIn } = useContext(UserContext)

   const navigate = useNavigate();
   // console.log(signUp)
   const [validation, setValidation] = useState("");

   const inputs = useRef([])
   // console.log("Inputs", inputs)
   const addInputs = el => {
      if (el && !inputs.current.includes(el)) {
         inputs.current.push(el)
      }
   }

   const fromRef = useRef();

   const closeModal = () => {
      setValidation("")
      toggleModals("close")
   }

   const handleForm = async (e) => {
      e.preventDefault()

      try {
         const cred = await signIn(
            inputs.current[0].value,
            inputs.current[1].value
         )
         fromRef.current.reset();
         inputs.current = [];
         // console.log("Inputssss2", inputs)
         console.log(cred)
         closeModal()
         navigate("/private/private-home")
      } catch (err) {
         setValidation("Email or password incorrect")
         // console.dir(err)
      }
   }


   // console.log(modalState, toggleModals)
   return (
      <>
         {modalState.signInModal && (
            <div className="position-fixed top-0 vw-100 vh-100">
               <div
                  onClick={() => { closeModal(); inputs.current = []; }}
                  className="w-100 h-100 bg-dark bg-opacity-75">
               </div>

               <div className="position-absolute start-50 top-50 translate-middle min-width bg-white p-3 rounded">
                  <div className="modal-dialog">
                     <div className="modal-content">
                        <div className="modal-header pb-2">
                           <h5 className="modal-title">Sign In</h5>
                           <button
                              onClick={() => { closeModal(); inputs.current = []; }}
                              className="btn-close"></button>
                        </div>
                        <div className="modal-body">
                           <form
                              ref={fromRef}
                              onSubmit={handleForm}>
                              <div className="mb-3">
                                 <label htmlFor="signInEmail" className="form-label">Email Adress</label>
                                 <input
                                    ref={addInputs}
                                    name="email" required type="email" className="form-control" id="signInEmail"></input>
                              </div>

                              <div className="mb-3">
                                 <label htmlFor="signInPwd" className="form-label">Password</label>
                                 <input
                                    ref={addInputs}
                                    name="pwd" required type="password" className="form-control" id="signInPwd"></input>
                              </div>
                              <p className="text-danger mt-1">{validation}</p>

                              <button className="btn btn-primary">Submit</button>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </>
   )
}
