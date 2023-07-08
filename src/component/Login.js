import React, { useContext, useState, } from 'react';
import { Card, Container } from 'react-bootstrap';
//import { useDispatch, useSelector } from 'react-redux';
import {Link, Navigate, useNavigate} from 'react-router-dom'
//import { authAction } from '../redux-store/auth-reducer';
//import { themeAction } from '../redux-store/theme-reducer';
//import AuthContext from '../store/auth-context';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
      const navigate =  useNavigate();
    //   const dispatch = useDispatch();
    //  const error = useSelector(state=> state.theme.error); 
      
   //const authCtx= useContext(AuthContext);
  const handleUsernameChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

const getUserLogin = async (userDetail) =>{
  console.log('inside login');
  try {
    const resp = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4Old42pkOxqkr1jsyq_dYLAFonOwLHJ4',{
      method: 'POST',
      body: JSON.stringify(userDetail),
       headers: {
        'Content-Type': 'application/json',
       }   
    })
        if(!resp.ok){
          console.log('request send but failed to fetch')
        
      //  dispatch(themeAction.toggleError());
        return;
        }

    const res = await resp.json();
    const passData = {idToken: res.idToken,email: res.email}
   console.log('use details onLogin',res);
  //  dispatch( authAction.onLogIn({data: passData}));
    navigate('/home');
    
  } catch (err) {
    // dispatch(themeAction.toggleError());
    console.log("request failed", err);
   
  }
  
}

  const handleSubmit =async (e) => {
    e.preventDefault();
    // if(error){
    //   dispatch(themeAction.toggleError());
    // }
     
    const detail = {
      email: email,
      password: password,
      returnSecureToken: true,
    }
    await getUserLogin(detail);
 
 
   
  // authCtx.onLogIn(resp.idToken,resp.email);
  // localStorage.setItem('email',resp.email);
  // localStorage.setItem('token',resp.idToken); 
 
  
    
  };

  return (
    <Container  style={{marginTop: '15%'}} >
   
   <Card>
        <Card.Body>
          <Card.Title>Login:</Card.Title>
          <div>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="email"
            id="username"
            value={email}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {/* {error && <div>{"failed to login"}</div>} */}
        <button type="submit">Login</button>
        <div style={{display:'flex' , justifyContent:'space-between'}}>
          <Link to='/forgot'>forgott password?</Link>
          <Link to='/'>sign Up?</Link>
        </div>
      </form>
    </div>
                
        </Card.Body>
      </Card>
   

    </Container>
  );
};

export default Login;
