import React, { useState } from 'react';

 import { Link , useNavigate} from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { themeAction } from '../redux-store/theme-reducer';
import { Button, Container, Form } from 'react-bootstrap';

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirm: '',
  });
 
   const navigate = useNavigate();
// const dispatch = useDispatch();
//const error = useSelector(state=> state.theme.error);  
const addUserToFirebase = async (userDetail) =>{
    
    try {
      const resp = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA4Old42pkOxqkr1jsyq_dYLAFonOwLHJ4',{
        method: 'POST',
        body: JSON.stringify(userDetail),
         headers: {
          'Content-Type': 'application/json',
         }   
      })
          if(!resp.ok){
  
            const err=await resp.json();
            console.log("sign up failed with response")
         //  dispatch(themeAction.toggleError());
            return ;
            
          }
  
      const res = await resp.json();
      console.log("sign up succcessFul");
      navigate('/login');
      
    } catch (err) {
      console.log("request to sign up failed");
  //    dispatch(themeAction.toggleError());
     
    }
    
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
          }));
    
    
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    // if(error){
    //   dispatch(themeAction.toggleError());
    // }



    console.log(formData); // Perform signup logic or API call here
     if(formData.password!=formData.confirm){
        
        return;
     }
    

    const detail = {
        email: formData.email,
        password: formData.password,
        returnSecureToken: true,
      }
      const resp = await addUserToFirebase(detail);
    // console.log("inside check",resp)
     
     
      
    
    setFormData({
      email: '',
      password: '',
      confirm: '',
    });
  };

  return (
    <div  style={{ maxWidth: '400px'  ,
      margin: ' auto' ,
      marginTop: '8%',
       padding: '20px' ,
        border: '1px solid #ccc' ,
      borderRadius: '5px' }} className="signup-container">
  
         <Container>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit}   >
        <Form.Group  className='my-3' controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name='email'
            value={formData.email}
          onChange={handleChange}
          required />
           </Form.Group>

        <Form.Group  className='my-2' controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name='password'
            value={formData.password}
          onChange={handleChange}
          required
           />
        </Form.Group>

        <Form.Group  className='my-2' controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" name='confirm'
            value={formData.confirm}
          onChange={handleChange}
          required
           />
        </Form.Group>

        {/* {error && <div>"failed to sign Up</div>} */}
        <Button  className='my-3' variant="primary" type="submit">
          Sign Up
        </Button>
        <div >
            already have an account? <Link to='/login' >login</Link>
        </div>
      </Form>
    </Container>
    
    </div>
  );
}

export default SignUp;
