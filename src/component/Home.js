import React, { useEffect, useState } from 'react'
import { Button, Container,Form } from 'react-bootstrap';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch } from 'react-redux';
import { expenseAction } from '../redux-store/expense-reducer';

const Home = () => {
  const fromMail = localStorage.getItem('email').replace(/[@.]/g, '');
  const dispatch = useDispatch();
  const receivedMails =async ()=>{
   
    try {
      const resp=  await fetch(`https://react-http-2f680-default-rtdb.firebaseio.com/mails/to/${fromMail}.json`)
      
      if(!resp.ok){
        //dispatch(themeAction.toggleError());
        return ;
       }
       const resArr = await resp.json();
     console.log('get to mail success', resArr);
   
   
     dispatch(expenseAction.resetGetMail(resArr))
    } catch (error) {
      //dispatch(themeAction.toggleError());
      console.log("post error==",error);   
    }
   }
useEffect(()=>{
  receivedMails();
},[])

  return (
<Container  style={{marginTop: '15%'}} >
  Welcome to Mail-Box , you  can send  ,retreive ,delete mails
  <div>To use features Navigate to vertical NavBar</div> 
</Container>

  )
}

export default Home

