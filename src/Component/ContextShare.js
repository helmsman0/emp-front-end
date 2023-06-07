import React, { createContext, useState } from 'react'
export const regContext = createContext();
export const deleteContext = createContext();
export const editContext = createContext();
 
function ContextShare({children}) {

    //register data state
    const [regData,setregData] = useState("")

    //delete data state
    const [deleleData,setdeleteData] = useState("")

    //edit data state
    const [editData,seteditData] = useState("")

  return (

    <>

    <regContext.Provider value={{regData,setregData}}>
      <editContext.Provider value={{editData,seteditData}} >
    <deleteContext.Provider value={{deleleData,setdeleteData}}>
    {children}
    </deleteContext.Provider>
    </editContext.Provider>
    </regContext.Provider>

    </>
  )
}

export default ContextShare