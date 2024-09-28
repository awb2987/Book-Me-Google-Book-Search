# BOOK-ME-GOOGLE-BOOK-SEARCH

## Description
BOOK-ME-GOOGLE-BOOK-SEARCH is a web application that allows users to search for books using the Google Books API. Users can create an account, log in, and save their favorite books for future reference.

## Features
- User authentication (sign up, login, logout)
- Search for books using various criteria
- Save books to a user’s account
- Responsive design with Bootstrap

## Technologies Used
- **Frontend**: React, React Router, Bootstrap
- **Backend**: Node.js, Express, MongoDB (or other database)
- **API**: Google Books API
- **Authentication**: JSON Web Tokens (JWT)

## Installation

### Prerequisites
- Node.js and npm installed
- MongoDB (or a database of your choice)

### Clone the Repository
```bash
git clone https://github.com/yourusername/BOOK-ME-GOOGLE-BOOK-SEARCH.git
cd BOOK-ME-GOOGLE-BOOK-SEARCH
```

### Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `client` directory with the following content:
   ```plaintext
   REACT_APP_API_URL=http://localhost:5000/api
   ```

### Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory with your configuration, for example:
   ```plaintext
   JWT_SECRET=mysecretkey
   MONGODB_URI=mongodb://localhost:27017/bookme
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Running the Application
1. Start the backend server (if not already running):
   ```bash
   cd server
   npm start
   ```
2. In another terminal, start the frontend:
   ```bash
   cd client
   npm start
   ```
3. Open your browser and go to `http://localhost:3000` to view the application.

## Usage
- **Sign Up**: Create a new account.
- **Login**: Access your account to search for books and save them.
- **Search**: Use the search feature to find books.
- **Save Books**: Save your favorite books for easy access later.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- [Google Books API](https://developers.google.com/books)
- [React](https://reactjs.org/)
- [Bootstrap](https://getbootstrap.com/)
