const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Ensure req is defined
  if (!req) {
    return next();
  }

  // Check for token in the request headers
  const token = req.headers.authorization ? req.headers.authorization.split(' ').pop().trim() : null;

  if (token) {
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('Token verification failed:', err);
        return next();
      }

      // Attach the user data to the request object
      req.user = decoded.data;
    });
  }

  // Proceed to the next middleware
  next();
};

module.exports = { authMiddleware };
