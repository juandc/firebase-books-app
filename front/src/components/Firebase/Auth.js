import React, { useState, useContext, useEffect } from 'react';
import { useFirebase } from './';

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const { user, isLoading } = useAuth();

  return (
    <AuthContext.Provider value={{ isLoading, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const firebase = useFirebase();
  const [authState, setState] = useState({
    isLoading: true,
    user: null,
  });

  useEffect(() => firebase.setAuthListener(
    user => setState({ isLoading: false, user })),
    []
  );

  return authState;
}

export const AuthConsumer = AuthContext.Consumer;
