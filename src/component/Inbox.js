import React, { useEffect, useState } from 'react'

import Cards from './UI/Card';
import { Button } from 'react-bootstrap';
import MailItem from './MailItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { expenseAction } from '../redux-store/expense-reducer';
import { themeAction } from '../redux-store/theme-reducer';
const Inbox = () => {
    const fromMail = localStorage.getItem('email').replace(/[@.]/g, '');
    console.log("email",fromMail);
   const [mailList,setMailList] = useState();
   const [isRead,setIsRead] = useState(false);
   const dispatch = useDispatch();
   const navigate =  useNavigate();
   const mailLen =  mailList!=undefined ? Object.keys(mailList).length : 0
   const error = useSelector(state=> state.theme.error); 
   console.log('error state===',error);
   let errorMessage = 'Failed to Retrieve Mail;'

   const deleteMailHandler =async (id)=>{
  
    try {
      const resp=  await fetch(`https://react-http-2f680-default-rtdb.firebaseio.com/mails/to/${fromMail}/${id}.json`,{
        method:'DELETE',
          })
       if(!resp.ok){
        dispatch(themeAction.toggleError());
        return;
       }
       const resArr =await  resp.json();
       console.log('delete Mail successful')
       
      
    } catch (error) {
      errorMessage = 'Failed To delete mail'
      dispatch(themeAction.toggleError());
        console.log("delete error to==",error);   
    
    }
    }

const deleteMail=async (id)=>{
 console.log('mail ready to delete', id);
 dispatch(expenseAction.removeMail({id: id}));
 if(error){
  dispatch(themeAction.toggleError());
 }
 await deleteMailHandler(id);
  receivedMails();
}


   const updateGetMail =async (item,id)=>{
   
try {
  const resp=  await fetch(`https://react-http-2f680-default-rtdb.firebaseio.com/mails/to/${fromMail}/${id}.json`,{
    method:'PUT',
    body: JSON.stringify({...item,read: true}),
    headers:{
      'Content-Type': 'application/json'
    }
   })
   if(!resp.ok){
    throw new Error("succesful request but no response ")
   }
   const resArr =await  resp.json();
   console.log('update read successful')
  
} catch (error) {
  console.log("put error to==",error);   
}
}

   const updateReadState= async (item,id)=>{
    console.log('access before')
    
    const enItem = encodeURIComponent(JSON.stringify(item));
    navigate(`/inbox/${enItem}`);
    console.log("is this accessible");
    if(item.read){

        return;
    }
    dispatch(expenseAction.decreaseUnread());
     await  updateGetMail(item,id);
     
    
     setIsRead(true);
   
    }
  
   const receivedMails =async (item)=>{
   
        try {
          const resp=  await fetch(`https://react-http-2f680-default-rtdb.firebaseio.com/mails/to/${fromMail}.json`)
          
          if(!resp.ok){
            dispatch(themeAction.toggleError());
            return ;
           }
           const resArr = await resp.json();
         console.log('get to mail success', resArr);
       setMailList(resArr);
       setIsRead(false);
         dispatch(expenseAction.resetGetMail(resArr))
        } catch (error) {
          dispatch(themeAction.toggleError());
          console.log("post error==",error);   
        }
       }


useEffect(()=>{
console.log('check if it renders')
if(error){
  dispatch(themeAction.toggleError());
}
receivedMails();
},[])

useEffect(()=>{
  if(isRead){
    if(error){
      dispatch(themeAction.toggleError());
    }
    receivedMails();
  }
},[isRead])

useEffect(()=>{
console.log("setInterval");
  const intervalId = setInterval(receivedMails, 2000); // Execute fetchData every 2 seconds

  return () => {
    clearInterval(intervalId); // Cleanup the interval when the component unmounts
  };
},[])

  return (
    <div style={{marginTop: '8%'}} >{
        mailLen>0 ? 
     Object.keys( mailList).map((key)=>{
        console.log('show key==',key);
        const curMail = mailList[key];
        return (
            <MailItem curMail={curMail} id={key}  onClick={updateReadState} deleteMail={deleteMail} />
        )
     })
     : <div>no one send's you mail </div> 
    }
     {error && <div>{errorMessage}</div>} 

       </div>
  )
}

export default Inbox;
