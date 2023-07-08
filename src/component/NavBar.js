import React, { useState } from 'react'
import { Button, Container, NavDropdown, Navbar } from 'react-bootstrap'
//import { useDispatch, useSelector } from 'react-redux';
//import CartContext from '../store/cart-context'
import {Link, NavLink, useNavigate} from 'react-router-dom'
//import { authAction } from '../redux-store/auth-reducer';
//import AuthContext from '../store/auth-context'

const NavBar = () => {
   const  [title,setTitle]=  useState('Inbox');
       const navigate = useNavigate();
  //   const dispatch = useDispatch();
       
    const onLogOut = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('email');
 //   dispatch(authAction.onLogOut());
      navigate('/login');
    }

  const changeTitle=(e)=>{
    console.log('event===',e);
//setTitle(getTitle);
  }

    const emailExist = localStorage.getItem('email') || null;
  console.log('emailExist',emailExist);
    return (
    <Navbar  fixed='top'   bg="light" className="bg-body-tertiary">
    <Container >
      <Navbar.Brand >Mail-Box</Navbar.Brand>
     <Navbar.Toggle />
      
     <NavDropdown title={title} id="basic-nav-dropdown" onChange={changeTitle} >
              <NavDropdown.Item  > <NavLink  style={{textDecoration: 'none', color: 'black'}} to='/inbox'  >Inbox</NavLink>  </NavDropdown.Item>
              <NavDropdown.Item  > <NavLink  style={{textDecoration: 'none', color: 'black'}} to='/compose'  >Compose</NavLink>  </NavDropdown.Item>
                   </NavDropdown>

      <Navbar.Collapse className="justify-content-end">
      {emailExist && <Button variant="outline-success"  onClick={onLogOut} >LogOut</Button>}
        </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavBar
