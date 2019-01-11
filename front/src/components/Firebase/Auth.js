import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from './';

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const firebase = useContext(FirebaseContext);
  const { user, isLoading } = useAuth(firebase.setAuthListener);
  
  return (
    <AuthContext.Provider value={{ isLoading, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const AuthConsumer = AuthContext.Consumer;

const useAuth = (authListener) => {
  const [authState, setState] = useState({
    isLoading: true,
    user: null,
  });

  useEffect(() => {
    const unsubscribe = authListener(authState => {
      return setState({
        isLoading: false,
        user: authState,
      });
    });

    return unsubscribe;
  }, []);

  return authState;
}
