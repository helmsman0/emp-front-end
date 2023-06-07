import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Card, Form, Row } from 'react-bootstrap'
import Select from 'react-select';
import LoadingSpinner from '../Component/LoadingSpinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { empRegister } from '../services/allApi';
import { useNavigate } from 'react-router-dom';
import {regContext} from '../Component/ContextShare'


function Register() {

  //error message
  const [errorMsg,seterrorMsg] = useState("")

  //to get context
   const {regData,setregData} =  useContext(regContext)
  
  // use navigae hook 
  const navigate = useNavigate()

  //create state to display spinner
  const [spinShow,setspinShow] = useState(true)

  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'In Active', label: 'In Active' },
  ];

  //Create state to hold input data
  const [userdata,setuserdata] = useState({

    fname:"",
    lname:"",
    email:"",
    mobile:"",
    gender:"",
    location:""

  })

  //create state for status
  const[status,setStatus] = useState("Active")

  // create state for hold img
  const [image,setimage] = useState("")

  //create state to hold profile picture
  const [preview,setPreview] = useState("")

  //to upadate userdata when user enter the input html
  const userDetails = (e)=>{
    const{name,value} = e.target
    setuserdata({...userdata,[name]:value})
  }

  //to update status state
  const updateState = (e)=>{
    setStatus(e.value)
  }

  //update img state
  const setProfile = (e)=>{
    setimage(e.target.files[0])
  }

  // console.log(userdata);
  // console.log(status);
  // console.log(image);


  useEffect(()=>{

    if(image){
      //update preview picture
      setPreview(URL.createObjectURL(image))
    }

    setTimeout(()=>{
      setspinShow(false)
    },2000)
  },[image])

  //define register submission
  const submit = async (e)=>{

    //prevent click event to stop autorefresh
    e.preventDefault()

    //get user input data from the form
    const {fname,lname,email,mobile,gender,location} = userdata
     if(fname===""){
      toast.error("First Name required..")
     }  
     else if (lname===""){
      toast.error("Last Name required..")
     }
     else if (email===""){
      toast.error(" Email required..")
     }
     else if (mobile===""){
      toast.error(" Mobile required..")
     }
     else if (gender===""){
      toast.error(" gender required..")
     }
     else if (image===""){
      toast.error(" image required..")
     }
     else if (location===""){
      toast.error("location required..")
     }
     else{
      //make register api call
      //headerconfig
      const headerconfig = {
        "Content-Type":"multipart/form-data"
      }
      //body - formdata
      const data = new FormData()
      data.append("user_profile",image)
      data.append("fname",fname)
      data.append("lname",lname)
      data.append("email",email)
      data.append("mobile",mobile)
      data.append("gender",gender)
      data.append("status",status)
      data.append("location",location)

      //api call
      const response =  await empRegister(data,headerconfig)
      if(response.status===200){

        //reset all status
        setuserdata({...userdata,
          fname:"",
          lname:"",
          email:"",
          mobile:"",
          gender:"",
          location:""
        })
        setStatus("")
        setimage("")

        //share response data to other component via context
        setregData(response.data)

        //navigae to home page
        navigate('/')
      }
      else{
        seterrorMsg("Error")
      }
     }
  }


  return (
    <>
    {
      errorMsg?<Alert variant="dark" className="bg-danger fw-bolder" onClose={()=>
        seterrorMsg("")} dismissible> {errorMsg} </Alert> :""
    }
     {spinShow?(<LoadingSpinner />):(
       <div className='container mt-5'>
        <h2 className='text-center mt-3 fw-bolder text-primary'>Register Employee Details</h2>
        <Card className='shadow mt-3 p-3'>
          <div className='text-center mb-3'>
          <img className="roun p-1 rounded-circle" 
              width={'90px'} height={'90px'} 
              src={preview?preview:"https://cdn-icons-png.flaticon.com/512/4128/4128349.png"}
               alt="profile" />
          </div>


          <Form>
            <Row>

              {/* first name  */}
            <Form.Group className='col-lg-6 mb-2'>
                <Form.Label className='fw-bolder text-dark'>First Name</Form.Label>
                <Form.Control  required type='email' placeholder='Fist Name'  name='fname' value={userdata.fname} onChange={userDetails}/>
              </Form.Group>


              {/* last name  */}
              <Form.Group className='col-lg-6 mb-2'>
                <Form.Label className='fw-bolder text-dark'>Last Name</Form.Label>
                <Form.Control required type='email' placeholder='Last Name'  name='lname' value={userdata.lname} onChange={userDetails}/>
              </Form.Group>
    

              {/* email  */}
              <Form.Group className='col-lg-6 mb-2'>
                <Form.Label className='fw-bolder text-dark'>E mail Address</Form.Label>
                <Form.Control required type='email' placeholder='Email'  name='email' value={userdata.email} onChange={userDetails}/>
              </Form.Group>


              {/* mobile */}
              <Form.Group className='col-lg-6 mb-2'>
                <Form.Label className='fw-bolder text-dark'>Mobile Number</Form.Label>
                <Form.Control required type='text' placeholder='Mobile'  name='mobile' value={userdata.mobile} onChange={userDetails}/>
              </Form.Group>


               {/* gender  */}
              <Form.Group className='col-lg-6 mb-2'>
                <Form.Label className='fw-bolder text-dark'>Gender</Form.Label>
                <Form.Check type={'radio'} label={'Male'} name='gender' value={'Male'} onChange={userDetails}/>
                <Form.Check type={'radio'} label={'Female'} name='gender' value={'Female'} onChange={userDetails}/>
              </Form.Group>


              {/* Employee Status */}
              <Form.Group className='col-lg-6 mb-2'>
                <Form.Label className='fw-bolder text-dark'>Select Employee Status</Form.Label>
                <Select options={options} defaultInputValue={status} onChange={updateState}/>
              </Form.Group>


              {/* Profile Picture */}
              <Form.Group className='col-lg-6 mb-2'>
                <Form.Label className='fw-bolder text-dark'>Choose Profile Picture</Form.Label>
                <Form.Control name="user_profile" required type='file'onChange={setProfile}/>
              </Form.Group>

              {/* Location */}
              <Form.Group className='col-lg-6 mb-2'>
                <Form.Label className='fw-bolder text-dark'>Enter Location</Form.Label>
                <Form.Control className='text' required type='text' placeholder='Enter Location' name='location' value={userdata.location} onChange={userDetails}/>
              </Form.Group>

                {/* submit button  */}
                <Button onClick={submit} className='btn btn-primary mt-3'>Submit</Button>
              
            </Row>
          </Form>
        </Card>

      </div>
      )}
      <ToastContainer position='top-center' />
    </>
  )
}

export default Register