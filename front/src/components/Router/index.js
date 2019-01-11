import React from 'react';
import {
  BrowserRouter,
  Route,
  Link,
} from 'react-router-dom';

export function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.SIGN_IN}>Entrar</Link>
        </li>
        <li>
          <Link to={ROUTES.SIGN_UP}>Crea tu cuenta</Link>
        </li>
      </ul>
    </nav>
  );
}

export { BrowserRouter, Route, Link };

export const ROUTES = {
  'HOME': '/',
  'SIGN_IN': '/signin',
  'SIGN_UP': '/signup',
};
