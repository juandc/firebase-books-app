import Firebase from 'firebase/app';
import authAPI from './auth';
import dbAPI from './db';
// import storageAPI from './storage';

let firebase = null;

export default function api(config) {
  if (!firebase) {
    firebase = Firebase.initializeApp(config);
  }

  const auth = authAPI(firebase);
  const db = dbAPI(firebase);
  // const storage = storageAPI(firebase);
  
  return {
    auth,
    db,
    // storage,
  };
}
