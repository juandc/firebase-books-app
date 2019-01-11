import React from 'react';
import { FirebaseProvider } from '../Firebase';
import { AuthProvider } from '../Firebase/Auth';
import { RouterProvider, ROUTES } from '../Router';
import HomePage from '../Pages/Home';
import SignInPage from '../Pages/SignIn';
import SignUpPage from '../Pages/SignUp';
import LogoutPage from '../Pages/Logout';
import NewBookPage from '../Pages/NewBook';

export default function App() {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <RouterProvider
          routes={[
            { path: ROUTES.HOME, component: HomePage, exact: true },
            { path: ROUTES.SIGN_IN, component: SignInPage, exact: true },
            { path: ROUTES.SIGN_UP, component: SignUpPage, exact: true },
            { path: ROUTES.LOGOUT, component: LogoutPage, exact: true },
            { path: ROUTES.NEW_BOOK, component: NewBookPage, exact: true },
          ]}
        />
      </AuthProvider>
    </FirebaseProvider>
  );
}
