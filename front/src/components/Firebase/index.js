import React from 'react';
import Firebase from '../../funcs/firebase';

const firebase = new Firebase();

export const FirebaseContext = React.createContext(null);

export function FirebaseProvider({ children }) {
  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const FirebaseConsumer = FirebaseContext.Consumer;
