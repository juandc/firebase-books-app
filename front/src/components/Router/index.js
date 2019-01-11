import React from 'react';
import {
  BrowserRouter,
  Route,
  Link,
  withRouter,
} from 'react-router-dom';

export function RouterProvider({ routes }) {
  return (
    <BrowserRouter>
      <>
        {routes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            component={route.component}
            exact={route.exact}
          />
        ))}
      </>
    </BrowserRouter>
  );
}

export const ROUTES = {
  'HOME': '/',
  'SIGN_IN': '/signin',
  'SIGN_UP': '/signup',
  'LOGOUT': '/logout',
};

export { Link, withRouter };
