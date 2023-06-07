import React from 'react'
import { Spinner } from 'react-bootstrap'

function LoadingSpinner() {
  return (
    <div style={{width:'100%' ,height:'40vh'}} className='d-flex justify-content-center align-item-center m-5'>
        <Spinner animation="border" variant="primary" /><span className='ms-2'>Loading</span>
    </div>
  )
}

export default LoadingSpinner