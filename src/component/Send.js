import React, { useEffect, useState } from 'react'

import Cards from './UI/Card';
import { Button } from 'react-bootstrap';
import MailItem from './MailItem';

import { useDispatch, useSelector } from 'react-redux';
import { expenseAction } from '../redux-store/expense-reducer';
import { themeAction } from '../redux-store/theme-reducer';
import SendMailItems from './SendMailItems';
import { useNavigate } from 'react-router-dom';
const Send = () => {
    const fromMail = localStorage.getItem('email').replace(/[@.]/g, '');
    console.log("email",fromMail);
   const [mailList,setMailList] = useState();
   const dispatch = useDispatch();
     const navigate = useNavigate();
   const mailLen =  mailList!=undefined ? Object.keys(mailList).length : 0
   const error = useSelector(state=> state.theme.error); 
   console.log('error state===',error);
   let errorMessage = 'Failed to Retrieve Mail;'

   const deleteMailHandler =async (id)=>{
  
    try {
      const resp=  await fetch(`https://react-http-2f680-default-rtdb.firebaseio.com/mails/from/${fromMail}/${id}.json`,{
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
 dispatch(expenseAction.removeSendMail({id: id}));
 if(error){
  dispatch(themeAction.toggleError());
 }
 await deleteMailHandler(id);
  receiveSendMails();
}


  
   const receiveSendMails =async (item)=>{
   
        try {
          const resp=  await fetch(`https://react-http-2f680-default-rtdb.firebaseio.com/mails/from/${fromMail}.json`)
          
          if(!resp.ok){
            dispatch(themeAction.toggleError());
            return ;
           }
           const resArr = await resp.json();
         console.log('get to mail success', resArr);
       setMailList(resArr);

         dispatch(expenseAction.resetSendMail(resArr))
        } catch (error) {
          dispatch(themeAction.toggleError());
          console.log("post error==",error);   
        }
       }

       const updateReadState= async (item,id)=>{
        console.log('access before')
        
        const enItem = encodeURIComponent(JSON.stringify(item));
        navigate(`/inbox/${enItem}`);
       
        }

useEffect(()=>{
console.log('check if it renders')
if(error){
  dispatch(themeAction.toggleError());
}
receiveSendMails();
},[])


  return (
    <div style={{marginTop: '8%'}} >{
        mailLen>0 ? 
     Object.keys( mailList).map((key)=>{
        console.log('show key==',key);
        const curMail = mailList[key];
        return (
            <SendMailItems curMail={curMail} id={key}  onClick={updateReadState} deleteMail={deleteMail} />
        )
     })
     : <div>you haven't send any mail yet </div> 
    }
     {error && <div>{errorMessage}</div>} 

       </div>
  )
}

export default Send;
