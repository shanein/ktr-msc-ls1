import React, { useContext, useRef, useState } from 'react'
import { UserContext } from "../context/userContext"

export default function SignUpModal() {
   const { modalState, toggleModals, createCard } = useContext(UserContext)

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
         const cred = await createCard(
            inputs.current[0].value,
            inputs.current[1].value,
            inputs.current[2].value,
            inputs.current[3].value
         )
         fromRef.current.reset();
         inputs.current = [];
         // console.log("Inputssss2", inputs)
         console.log(cred)
         closeModal()
      } catch (err) {
         console.log(inputs.current)

         console.dir(err)
      }
   }


   // console.log(modalState, toggleModals)
   return (
      <>
         {modalState.createCardModal && (
            <div className="position-fixed top-0 vw-100 vh-100">
               <div
                  onClick={() => { closeModal(); inputs.current = []; }}
                  className="w-100 h-100 bg-dark bg-opacity-75">
               </div>

               <div className="position-absolute start-50 top-50 translate-middle min-width bg-white p-3 rounded">
                  <div className="modal-dialog">
                     <div className="modal-content">
                        <div className="modal-header pb-2">
                           <h5 className="modal-title">Create Card</h5>
                           <button
                              onClick={() => { closeModal(); inputs.current = []; }}
                              className="btn-close"></button>
                        </div>
                        <div className="modal-body">
                           <form
                              ref={fromRef}
                              onSubmit={handleForm}
                              className="sign-up-form">
                              <div className="mb-3">
                                 <label htmlFor="createCardEmail" className="form-label">Email Adress</label>
                                 <input
                                    ref={addInputs}
                                    name="email" required type="email" className="form-control" id="CreateCardEmail"></input>
                              </div>

                              <div className="mb-3">
                                 <label htmlFor="createCardName" className="form-label">Name (optional)</label>
                                 <input
                                    ref={addInputs}
                                    name="text" type="text" className="form-control" id="CreateCardName"></input>
                              </div>

                              <div className="mb-3">
                                 <label htmlFor="createCardCompanyName" className="form-label">Company name (optional)</label>
                                 <input
                                    ref={addInputs}
                                    name="text" type="text" className="form-control" id="CreateCardCompanyName"></input>
                              </div>

                              <div className="mb-3">
                                 <label htmlFor="createCardNumber" className="form-label">Telephone number (optional)</label>
                                 <input
                                    ref={addInputs}
                                    name="number" type="number" className="form-control" id="CreateCardNumber"></input>
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
