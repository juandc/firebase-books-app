import app from 'firebase/app';
import 'firebase/auth';

export default class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
  }

  // Auth
  setAuthListener = (callback) => {
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
}

const firebaseConfig = {
  
};

