// IMPORT user model
const { User } = require('../models');
// IMPORT sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {
  // GET a single user
  getSingleUser: async (parent, { username }, context) => {
    if (context.user) {
      const foundUser = await User.findOne({
        $or: [{ _id: context.user._id }, { username }],
      });

      if (!foundUser) {
        throw new Error('No user by that username found!');
      }

      return foundUser;
    }
    throw new Error('Not yet authenticated!');
  },

  // CREATE a new user
  createUser: async (parent, { username, email, password }) => {
    const user = await User.create({ username, email, password });

    if (!user) {
      throw new Error('Something went wrong while creating the user.');
    }

    const token = signToken(user);
    return { token, user };
  },

  // LOGIN as a user
  login: async (parent, { email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    const correctPw = await user.isCorrectPassword(password);
    if (!correctPw) {
      throw new Error('Password incorrect');
    }

    const token = signToken(user);
    return { token, user };
  },

  // SAVE a book to user's savedBooks
  saveBook: async (parent, { bookInput }, context) => {
    if (context.user) {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { savedBooks: bookInput } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (err) {
        throw new Error('Error saving book: ' + err.message);
      }
    }
    throw new Error('Not yet authenticated!');
  },

  // REMOVE a book from savedBooks
  deleteBook: async (parent, { bookId }, context) => {
    if (context.user) {
      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );

      if (!updatedUser) {
        throw new Error('No user with this id found!');
      }
      return updatedUser;
    }
    throw new Error('Not yet authenticated!');
  },
};
