import React, { useState } from 'react'
import { Button, Container, NavDropdown, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
//import CartContext from '../store/cart-context'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import { authAction } from '../redux-store/auth-reducer';
import { expenseAction } from '../redux-store/expense-reducer';
//import AuthContext from '../store/auth-context'

const NavBar = () => {
   
       const navigate = useNavigate();
     const dispatch = useDispatch();
       
    const onLogOut = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    dispatch(authAction.onLogOut());
    dispatch(expenseAction.defaultState());
      navigate('/login');
    }


    const emailExist = useSelector(state=> state.auth.isLoggedIn);
  console.log('emailExist',emailExist);
    return (
    <Navbar  fixed='top'   bg="light" className="bg-body-tertiary">
    <Container >
      <Navbar.Brand >Mail-Box</Navbar.Brand>
     <Navbar.Toggle />
      

      <Navbar.Collapse className="justify-content-end">
      {emailExist && <Button variant="outline-success"  onClick={onLogOut} >LogOut</Button>}
        </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavBar
