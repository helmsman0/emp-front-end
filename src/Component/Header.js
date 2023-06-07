import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

function Header() {
  return (
    <div>
    <Navbar bg="light">
    <Container>
      <Navbar.Brand href="/" className='text-dark'> <i class="fa-solid fa-solid fa-graduation-cap"></i> Emp management</Navbar.Brand>
    </Container>
  </Navbar>
  </div>
  )
}

export default Header