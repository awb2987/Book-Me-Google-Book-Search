const { User } = require('../models');

const BookController = {
  saveBook: async (userId, bookData) => {
    return await User.findByIdAndUpdate(
      userId,
      { $addToSet: { savedBooks: bookData } },
      { new: true }
    );
  },
  removeBook: async (userId, bookId) => {
    return await User.findByIdAndUpdate(
      userId,
      { $pull: { savedBooks: { bookId } } },
      { new: true }
    );
  },
};

module.exports = BookController;
