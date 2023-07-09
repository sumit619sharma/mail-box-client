import React from 'react';
import { Button, Nav, NavLink, Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const VerticalNavbar = () => {
 const navigate =  useNavigate();
 const inboxCnt = useSelector(state => state.expense.unread)
  return (
    <Navbar bg="danger" variant="dark" expand="lg" className="flex-column vh-100 fixed-left" style={{width:'15%' , maxWidth:'300px', backgroundColor: 'grey' ,marginRight:'50px'}} >
      <Navbar.Toggle aria-controls="vertical-nav" />
      <Navbar.Collapse id="vertical-nav">
        <Nav className="flex-column">
  <Button  onClick={()=> navigate('/Inbox')  } className='m-3 ' variant='light' >Inbox {inboxCnt>0 ? inboxCnt: ''} </Button>
  <Button  onClick={()=> navigate('/compose')  } className='m-3 ' variant='light' >Compose</Button>
  <Button  onClick={()=> navigate('/Send')  } className='m-3 ' variant='light' >Send</Button>
            </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default VerticalNavbar;
