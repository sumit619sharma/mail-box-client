import React from 'react'
import SignUp from './SignUp'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
const Root = () => {
  return (
    <Router>
    <Routes>
      <Route exact path="/home" element={<Home/>} >
        
      </Route>
      <Route path="/" element ={<SignUp/> } />
      <Route path="/login" element= <Login/> >
        
      </Route>
      </Routes>
  </Router>
  )
}

export default Root
