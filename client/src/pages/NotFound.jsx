import React from 'react';
import { Container } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container className="text-center">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </Container>
  );
};

export default NotFound;
