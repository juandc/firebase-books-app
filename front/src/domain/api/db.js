export default function db(firebase) {
  const db = firebase.firestore();

  const createBook = addBookToBooksCollection(db);
  const getBooks = getBooksFromTheirCollection(db);

  return {
    createBook,
    getBooks,
  };
}

const addBookToBooksCollection = db => payload => {
  const { title, author, userId } = payload;
  
  const booksRef = db.collection('books');

  return booksRef.add({
    title,
    author,
    userId,
  });
}

const getBooksFromTheirCollection = db => () => {
  const booksRef = db.collection('books');

  return new Promise((resolve, reject) => {
    booksRef.get()
      .then(docs => resolve(getFormattedDocs(docs)))
      .catch(reject);
  });
}

// Utils
function getFormattedDocs(docs) {
  const formattedDocs = [];

  docs.forEach(doc => {
    const id = doc.id;
    const data = doc.data();

    return formattedDocs.push({ id, ...data });
  });

  return formattedDocs;
}
