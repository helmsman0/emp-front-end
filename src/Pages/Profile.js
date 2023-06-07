import React, { useEffect, useState } from 'react'
import { Card, Row } from 'react-bootstrap'
import LoadingSpinner from '../Component/LoadingSpinner';
import {useParams} from 'react-router-dom';
import { viewprofile } from '../services/allApi';
import { BASE_URL } from '../services/base_url';


function Profile() {


  //use useparams to get path parameter of routse
  const {id} = useParams()
  // console.log(id);


   //create state to display spinner
   const [spinShow,setspinShow] = useState(true)

   //create state to hold userdetails
   const [userDetails,setuserDetails] = useState({})


   //define function to get specific user
   const getprofile = async ()=>{
    //api call
    const {data} = await viewprofile(id)
    setuserDetails(data);
   }
   console.log(userDetails);

   useEffect(()=>{
    //call getprofile function
    getprofile()

    //set showspin as false after 2 sec
    setTimeout(()=>{
      setspinShow(false)
    },2000)
  },[])
  return (

  <>
   {spinShow?
    <LoadingSpinner/>:
    <div className='conatainer mt-5'>
      <Card className='shadow col-lg-6 mx-auto'>
        <Card.Body>
          <Row>
            <div className='col'>
              <div className='profile_img d-flex justify-content-center'>

              <img className="border p-1 rounded-circle" 
              width={'250px'} height={'250px'} 
              src={`${BASE_URL}/uploads/${userDetails.profile}`}
               alt="profile" />
              </div>
            </div>
          </Row>

          <div className="text-center mt-3">
            <h3>{userDetails.fname} &nbsp;{userDetails.lname}</h3>
            <h5><i className='fa-solid fa-envelope text-primary'></i>:-{userDetails.email}</h5>
            <h5><i className='fa-solid fa-mobile text-success'></i>:-{userDetails.mobile}</h5>
            <h5><i className='fa-solid fa-venus text-dark'></i>:-{userDetails.gender}</h5>
            <h5><i className='fa-solid fa-location text-danger'></i>:-{userDetails.location}</h5>
            <h5><i className='fa-solid fa-chart-line text-primary'></i>:- {userDetails.status}</h5>
          </div>
        </Card.Body>
      </Card>
    </div>}
  </>
  )
}

export default Profile