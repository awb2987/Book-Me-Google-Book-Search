const { Schema } = require('mongoose');

// This is a subdocument schema for the User's `savedBooks` array in User.js
const bookSchema = new Schema({
  authors: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
    minlength: 10,
  },
  // Saved book id from GoogleBooks
  bookId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+\..+/i.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    },
  },
  link: {
    type: String,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+\..+/i.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    },
  },
  title: {
    type: String,
    required: true,
    minlength: 1,
  },
});

module.exports = bookSchema;
