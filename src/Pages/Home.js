import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import HomeTable from '../Component/HomeTable'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../Component/LoadingSpinner'
import {deleteContext, regContext,editContext} from '../Component/ContextShare'
import { getuserapi, removeuser } from '../services/allApi'

function Home() {
  const {editData,seteditData} = useContext(editContext)


   //get register context using usecontext
   const {deleleData,setdeleteData} = useContext(deleteContext)


   //state to search
  const [searchkey,setsearchkey] = useState("")
  // console.log(search);

  //state to hold all user
  const [allemp,setallemp] = useState([])

  //define delete emp
  const Deleteuser = async (id)=>{
    console.log('inside delete function: '+id);
   //make api call to services
   const res = await removeuser(id)
    console.log(res);
    if(res.status===200){
      //data successfuly deleted
      setdeleteData(res.data)
      //data removed
      //call getuser api
      getuserDetails()
    }  
    else{
      console.log("Error");
    }
  }

  //define a funtion to call getalluser api
  const getuserDetails = async ()=>{
    const serverResponse  = await getuserapi(searchkey)
    // console.log(serverResponse);
    setallemp(serverResponse.data)
  }

  console.log(allemp);
  //get register context using usecontext
  const {regData,setregData} = useContext(regContext)

  //create state to display spinner
  const [spinnerShow,setspinnerShow] = useState(true)

  // navigate to another page-usenavigate 
  const navigate = useNavigate()

  // to redirect to register page when add btn clicked
  const addUser=()=>{

    //navigate to register
    navigate('/register')
  };


  useEffect(()=>{
    //call getuser api
    getuserDetails()
   //set showspinn
    setTimeout(()=>{
      setspinnerShow(false)
    },2000)
  },[searchkey])
  console.log(regData);
  return (
    <>  
    {
      regData?<Alert className="bg-info fw-bolder" variant="dark" onClose={()=>setregData("")} dismissible>{regData.fname.toUpperCase()} Successfully Registered..
      </Alert> :""
    }
    {
      editData?<Alert className="bg-info fw-bolder" variant="dark" onClose={()=>seteditData("")} dismissible>{editData.fname.toUpperCase()} Successfully Updtated..
      </Alert> :""
    }
    {
      deleleData?<Alert className="bg-danger fw-bolder" variant="dark" onClose={()=>setdeleteData("")} dismissible>{deleleData.fname.toUpperCase()} has been removed...
      </Alert> :""
    }
    

  <div className='container mt-5'>
    <div className='div_1'>
      {/* search button  */}
      <div className='search_add d-flex justify-content-between'>
        {/* search  */}
        <div className='search col-md-4'>
          <Form className='d-flex'>
            <Form.Control onChange={e=>setsearchkey(e.target.value)}
             required type='text'
              placeholder='search employee name here' />
              <Button className='ms-2' variant="dark">search</Button>
          </Form>
        </div>

        {/* add btn  */}
        <div className='add'>
          <button onClick={addUser} className='btn btn-info'><i className="fa-solid fa-user-plus fa-fade me-2"></i>Add</button>
        </div>
      </div>
    </div>

{spinnerShow ?(
   <div>
   <LoadingSpinner />
 </div>
) : (
  <div className='div_2'>
    <h2 className='mt-4 text-primary fw-bolder'>Employees List</h2>
  {/* table  */}
  <HomeTable displayData={allemp} 
  handleDelete={Deleteuser}
  />
</div>
)}
  </div>

  </>
  
  )
}

export default Home