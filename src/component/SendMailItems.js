import React from 'react'
import { Button } from 'react-bootstrap'
import Cards from './UI/Card'
import "./ExpenseItem.css"

const SendMailItems = (props) => {
    const curMail = props.curMail;
  
    
    

  return (
    <Cards  className='expense-item' >
          
            <div  style={{cursor: 'pointer'}}  onClick={()=> props.onClick(curMail,props.id)} className='expense-item__description'>
           
            <div   style={{}} className="expense-item__price">{curMail.subject}</div>
      <h4  >{curMail.email} </h4>
      <h2  >{curMail.text} </h2>
      <Button variant='danger' onClick={ (event)=> {
          event.stopPropagation(); 
          
          props.deleteMail(props.id)}
      }  >Delete</Button>
         </div>
    </Cards>
  )
}

export default SendMailItems;
