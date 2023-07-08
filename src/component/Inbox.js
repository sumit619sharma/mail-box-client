import React, { useEffect, useState } from 'react'

import Cards from './UI/Card';
import { Button } from 'react-bootstrap';
import MailItem from './MailItem';
import { useNavigate } from 'react-router-dom';
const Inbox = () => {
    const fromMail = localStorage.getItem('email').replace(/[@.]/g, '');
   const [mailList,setMailList] = useState();
   const [isRead,setIsRead] = useState(false);
    const navigate =  useNavigate();
   const mailLen =  mailList!=undefined ? Object.keys(mailList).length : 0
   
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
     await  updateGetMail(item,id);
     
    
     setIsRead(true);
   
    }
  
   const receivedMails =async (item)=>{
   
        try {
          const resp=  await fetch(`https://react-http-2f680-default-rtdb.firebaseio.com/mails/to/${fromMail}.json`)
           if(!resp.ok){
            throw new Error("succesful request but no response ")
           }
           const resArr = await resp.json();
         console.log('get to mail success', resArr);
       setMailList(resArr);
       setIsRead(false);

        } catch (error) {
          console.log("post error==",error);   
        }
       }


useEffect(()=>{
console.log('check if it renders')
receivedMails();
},[])

useEffect(()=>{
  if(isRead){
    receivedMails();
  }
},[isRead])

  return (
    <div style={{marginTop: '8%'}} >{
        mailLen>0 ? 
     Object.keys( mailList).map((key)=>{
        const curMail = mailList[key];
        return (
            <MailItem curMail={curMail} id={key}  onClick={updateReadState} />
        )
     })
     : <div>no one send's you mail </div> 
    }
       </div>
  )
}

export default Inbox
