const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// IMPORT schema from Book.js
const bookSchema = require('./Book');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    // SET savedBooks to be an array of data that adheres to the bookSchema
    savedBooks: [bookSchema],
  },
  // SET this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// NORMALIZE email before saving it
userSchema.pre('save', function (next) {
  this.email = this.email.toLowerCase();
  next();
});

// HASH user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// When we query a user, we'll also get another field called `bookCount` with the number of saved books
userSchema.virtual('bookCount').get(function () {
  return this.savedBooks.length;
});

const User = model('User', userSchema);

module.exports = User;
