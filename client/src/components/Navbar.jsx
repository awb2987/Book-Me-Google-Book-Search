import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import Auth from '../utils/auth';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeKey, setActiveKey] = useState('login');

  const handleModalClose = () => {
    setShowModal(false);
    setActiveKey('login');
  };

  return (
    <>
      <BootstrapNavbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <BootstrapNavbar.Brand as={Link} to='/'>Google Books Search</BootstrapNavbar.Brand>
          <BootstrapNavbar.Toggle aria-controls='navbar' />
          <BootstrapNavbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to='/search'>Search For Books</Nav.Link>
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/saved'>See Your Books</Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link onClick={() => { setShowModal(true); setActiveKey('signup'); }}>Sign Up</Nav.Link>
                  <Nav.Link onClick={() => { setShowModal(true); setActiveKey('login'); }}>Login</Nav.Link>
                </>
              )}
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>

      <Modal show={showModal} onHide={handleModalClose}>
        <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
          <Modal.Header closeButton>
            <Modal.Title>{activeKey === 'login' ? 'Login' : 'Sign Up'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={handleModalClose} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignupForm handleModalClose={handleModalClose} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default Navbar;
