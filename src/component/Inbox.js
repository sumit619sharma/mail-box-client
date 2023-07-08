import React, { useEffect, useState } from 'react'

const Inbox = () => {
    const fromMail = localStorage.getItem('email').replace(/[@.]/g, '');
   const [mailList,setMailList] = useState({});
    const receivedMails =async (item)=>{
   
        try {
          const resp=  await fetch(`https://react-http-2f680-default-rtdb.firebaseio.com/mails/to/${fromMail}.json`)
           if(!resp.ok){
            throw new Error("succesful request but no response ")
           }
           const resArr = await resp.json();
         console.log('get to mail success', resArr);
       setMailList(resArr);

        } catch (error) {
          console.log("post error==",error);   
        }
       }


useEffect(()=>{
console.log('check if it renders')
receivedMails();
},[])

  return (
    <div style={{marginTop: '15%'}} >{
     Object.keys( mailList).map((key)=>{
        const curMail = mailList[key];
        return <div style={{}} key={key} >
          <div>{curMail.from}</div>
          <div>{curMail.subject}</div>
          <div>{curMail.text}</div>
        </div>
     }) 
    }
       </div>
  )
}

export default Inbox
