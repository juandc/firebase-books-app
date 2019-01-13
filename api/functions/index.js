const functions = require('firebase-functions');
const firebase = require('firebase-admin') // Trabajar con la base de datos
const config = require('./firebase-config.json')

firebase.initializeApp({
  credential: firebase.credential.cert(config),
  databaseURL: 'https://juandc-firebase-books-app.firebaseio.com',
});

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.API_GET_BOOKS = functions.https.onRequest((request, response) => {
  const firestore = firebase.firestore();
  firestore.settings({ timestampsInSnapshots: true });

  const booksRef = firestore.collection('books');

  booksRef.get()
    .then(docs => {
      const books = [];

      docs.forEach(doc => books.push({
        id: doc.id,
        title: doc.data().title,
        author: doc.data().author,
      }));

      return response.json({
        message: 'Latest Books from JuanDC!',
        data: books,
      });
    })
    .catch(err => {
      return response.json({ message: 'Error!', error: err });
    });
});
