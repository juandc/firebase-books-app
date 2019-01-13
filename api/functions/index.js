const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.API_GET_BOOKS = functions.https.onRequest((request, response) => {
 response.json({
   message: 'Hello from Firebase!',
  });
});
