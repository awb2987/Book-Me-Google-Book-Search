// Helper function to handle errors
const handleResponse = async (response) => {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }
    return response.json();
  };

  // Route to get logged in user's info (needs the token)
  export const getMe = async (token) => {
    const response = await fetch('/api/users/me', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  };

  export const createUser = async (userData) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  };

  export const loginUser = async (userData) => {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  };

  // Save book data for a logged in user
  export const saveBook = async (bookData, token) => {
    const response = await fetch('/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookData),
    });
    return handleResponse(response);
  };

  // Remove saved book data for a logged in user
  export const deleteBook = async (bookId, token) => {
    const response = await fetch(`/api/users/books/${bookId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  };

  // Make a search to Google Books API
  export const searchGoogleBooks = async (query) => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    return handleResponse(response);
  };
  