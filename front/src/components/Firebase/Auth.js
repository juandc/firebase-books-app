import React, { useState, useContext, useEffect } from 'react';
import { useFirebase } from './';

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const firebase = useFirebase();
  const [authState, setAuthState] = useState({
    isLoading: true,
    user: null,
  });

  useEffect(() => firebase.listenAuthChanges(
    user => setAuthState({ isLoading: false, user })),
    [],
  );

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
}

export const AuthConsumer = AuthContext.Consumer;
export const useAuth = () => useContext(AuthContext);
