import React, { useContext } from 'react';
import Firebase from '../../funcs/firebase';

const firebase = new Firebase();

export function FirebaseProvider({ children }) {
  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const FirebaseContext = React.createContext(null);
export const FirebaseConsumer = FirebaseContext.Consumer;
export const useFirebase = () => useContext(FirebaseContext);
