import { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col, Spinner } from 'react-bootstrap';
import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
          return false;
        }

        const response = await getMe(token);
        if (!response.ok) {
          throw new Error('Failed to fetch user data.');
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
        setError('Failed to load saved books.');
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      const response = await deleteBook(bookId, token);
      if (!response.ok) {
        throw new Error('Failed to delete book.');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
      setError('Failed to delete the book.');
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status" />
        <span> Loading...</span>
      </div>
    );
  }

  if (error) {
    return <h2 className="text-danger">{error}</h2>;
  }

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks && userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks && userData.savedBooks.map((book) => (
            <Col md="4" key={book.bookId}>
              <Card border='dark'>
                {book.image && <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
