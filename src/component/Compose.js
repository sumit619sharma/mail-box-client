import React, { useState } from 'react'
import { Button, Container,Form } from 'react-bootstrap';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from 'react-redux';
import { themeAction } from '../redux-store/theme-reducer';

const Compose = () => {
  const dispatch = useDispatch();
  const error = useSelector((state)=> state.theme.error);
    const fromMail = localStorage.getItem('email').replace(/[@.]/g, ''); 
        const [formData, setFormData] = useState({
            from: localStorage.getItem('email') || '',
          email: '',
          subject: '',
          text:'',
          read: false,
          
        });

        const sendMailFrom =async (item)=>{
   
            try {
              const resp=  await fetch(`https://react-http-2f680-default-rtdb.firebaseio.com/mails/from/${fromMail}.json`,{
                method:'POST',
                body: JSON.stringify(item),
                headers:{
                  'Content-Type': 'application/json'
                }
               })
               if(!resp.ok){
                dispatch(themeAction.toggleError());
                return;
               }
               const resArr = await resp.json();
             console.log('from mail success')
              
            } catch (error) {
              dispatch(themeAction.toggleError);
              console.log("post error==",error);   
            }
           }
           const sendMailTo =async (item)=>{
                const toMail = item.email.replace(/[@.]/g, '');
            try {
              const resp=  await fetch(`https://react-http-2f680-default-rtdb.firebaseio.com/mails/to/${toMail}.json`,{
                method:'POST',
                body: JSON.stringify(item),
                headers:{
                  'Content-Type': 'application/json'
                }
               })
               if(!resp.ok){
                throw new Error("succesful request but no response ")
               }
               const resArr =await  resp.json();
               console.log('from mail success')
              
            } catch (error) {
              console.log("post error to==",error);   
            }
           } 

    const handleEditorChange=(e)=>{
     //   console.log( "value", e.blocks)
       const textArray = e.blocks || [];
       let textValue='';
     textArray.forEach((ele)=>{
        textValue+= ele.text+" "
     })
     
     setFormData((prevData) => ({
        ...prevData,
        text: textValue
      }));
    }

    const handleSubmit=(e)=>{
  e.preventDefault();
  if(error){
    dispatch(themeAction.toggleError());
  }
  console.log('check form===',formData);
 if(!formData.email.includes('@gmail.com')){
   return;
 }

      sendMailFrom(formData);
      sendMailTo(formData);
  
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
              }));
        
        
    
        };



  return (
<Container >
<Container   style={{ width: '800px',
          marginTop: '5%', height: '600px', border: '1px solid #000000' , borderRadius: '10px', alignContent:'centre' }}>
        <Form onSubmit={handleSubmit}  >
        <Form.Group  className='my-3' controlId="formBasicEmail">
          <Form.Control type="email" placeholder="To:" name='email'
            value={formData.email}
          onChange={handleChange}
          required />
           </Form.Group>
           <Form.Group  className='my-3' controlId="formBasicEmail">
          <Form.Control type="text" placeholder="Subject:" name='subject'
            value={formData.subject}
          onChange={handleChange}
          required />
           </Form.Group>
  
           <Container   style={{ width: '780px',marginTop:'3%',
         height: '400px', border: '1px solid #ccc' , borderRadius: '10px', alignContent:'centre' }}>
      <Editor  editorStyle={{height: '280px'}}
      toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  editorClassName="editorClassName"
   onChange={handleEditorChange}
/>
</Container>
     

        {error && <div>"failed to send mail</div>}
        <Button  className='my-3 w-100'  variant="primary" type="submit">
          Send
        </Button>
       
      </Form>
          
</Container>
    </Container>
  )
}

export default Compose;

