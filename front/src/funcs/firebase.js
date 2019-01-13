import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export default class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.firestore = app.firestore();

    this.firestore.settings({ timestampsInSnapshots: true })
  }

  // Auth
  listenAuthChanges = (callback) => {
    return this.auth.onAuthStateChanged(callback);
  }
  
  createUserWithEmailAndPassword = ({ email, password }) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signInWithEmailAndPassword = ({ email, password }) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut = () => {
    return this.auth.signOut();
  }

  // Firestore
  createBook = ({ title, author, userId }) => {
    const booksRef = this.firestore.collection('books');
    
    return booksRef.add({
      title,
      author,
      userId,
    });
  }

  getBooks = () => {
    const booksRef = this.firestore.collection('books');
    
    return new Promise((resolve, reject) => {
      booksRef.get()
        .then(docs => resolve(getFormattedDocs(docs)))
        .catch(reject);
    });
  }
}

function getFormattedDocs(docs) {
  const formattedDocs = [];
  
  docs.forEach(doc => {
    const id = doc.id;
    const data = doc.data();

    return formattedDocs.push({ id, ...data });
  });

  return formattedDocs;
}

const firebaseConfig = {
  
};
