import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../graphql/mutations';
import Auth from '../utils/auth';

const SignupForm = ({ handleModalClose }) => {
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // Define mutation for adding a user
  const [addUser] = useMutation(ADD_USER, {
    onCompleted(data) {
      const { token } = data.addUser;
      Auth.login(token);
      handleModalClose();
    },
    onError(err) {
      console.error("Signup error:", err.message);
      setShowAlert(true);
    },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    // Validate form input
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      try {
        // Attempt to add the user
        await addUser({ variables: { ...userFormData } });
        setUserFormData({ username: '', email: '', password: '' });
      } catch (err) {
        console.error("Error during signup mutation:", err);
        setShowAlert(true);
      }
    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
      <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
        Something went wrong with your signup!
      </Alert>

      <Form.Group className='mb-3'>
        <Form.Label htmlFor='username'>Username</Form.Label>
        <Form.Control
          type='text'
          placeholder='Your username'
          name='username'
          onChange={handleInputChange}
          value={userFormData.username}
          required
        />
        <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label htmlFor='email'>Email</Form.Label>
        <Form.Control
          type='email'
          placeholder='Your email address'
          name='email'
          onChange={handleInputChange}
          value={userFormData.email}
          required
        />
        <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label htmlFor='password'>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Your password'
          name='password'
          onChange={handleInputChange}
          value={userFormData.password}
          required
        />
        <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
      </Form.Group>

      <Button
        disabled={!(userFormData.username && userFormData.email && userFormData.password)}
        type='submit'
        variant='success'>
        Submit
      </Button>
    </Form>
  );
};

export default SignupForm;
