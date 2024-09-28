export const getSavedBookIds = () => {
    try {
      const savedBookIds = localStorage.getItem('saved_books')
        ? JSON.parse(localStorage.getItem('saved_books'))
        : [];
      return savedBookIds;
    } catch (err) {
      console.error('Error parsing saved book IDs:', err);
      return [];
    }
  };

  export const saveBookIds = (bookIdArr) => {
    if (bookIdArr.length) {
      localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
    } else {
      localStorage.removeItem('saved_books');
    }
  };

  export const removeBookId = (bookId) => {
    const savedBookIds = getSavedBookIds();

    if (!savedBookIds.length) {
      return false;
    }

    const updatedSavedBookIds = savedBookIds.filter((savedBookId) => savedBookId !== bookId);
    saveBookIds(updatedSavedBookIds);

    return true;
  };
