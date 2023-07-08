import React from 'react'
import { Button } from 'react-bootstrap'
import Cards from './UI/Card'
import "./ExpenseItem.css"

const MailItem = (props) => {
    const curMail = props.curMail;
 
    

  return (
    <Cards  className='expense-item' >
          
            <div  style={{cursor: 'pointer'}}  onClick={()=> props.onClick(curMail,props.id)} className='expense-item__description'>
            {!curMail.read && <Button variant='warning' ></Button> }
            <div   style={{}} className="expense-item__price">{curMail.subject}</div>
      <h4  >{curMail.from} </h4>
      <h2  >{curMail.text} </h2>
         </div>
    </Cards>
  )
}

export default MailItem
