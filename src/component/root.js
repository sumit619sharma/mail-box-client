import React from 'react'
import SignUp from './SignUp'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import NavBar from './NavBar';
import Compose from './Compose';
import Inbox from './Inbox';
import MailDetail from './MailDetail';
import VerticalNavbar from './VerticalNavBar';
import { useSelector } from 'react-redux';
import Send from './Send';
const Root = () => {
  const email = localStorage.getItem('email') || null;
   const loggedIn = useSelector(state=> state.auth.isLoggedIn)
  return (
    <Router>
    <NavBar/>  
    <div className='d-flex ' >
   {loggedIn &&  <VerticalNavbar />  }  

    <Routes>
      <Route exact path="/home" element={<Home/>} ></Route>
      <Route path="/" element ={<SignUp/> } />
      <Route path="/login" element= <Login/> />
      <Route path="/compose" element= <Compose/> />
      <Route exact path="/inbox" element= <Inbox/> />
      <Route  path="/inbox/:item" element= <MailDetail/> />
      <Route exact path="/send" element= <Send/> />
         </Routes>
         </div>
  </Router>
  
  )
}

export default Root
