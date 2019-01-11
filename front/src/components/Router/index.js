import React, { useContext } from 'react';
import {
  BrowserRouter,
  Route,
  Link,
  withRouter,
} from 'react-router-dom';

export function RouterProvider({ routes }) {
  return (
    <BrowserRouter>
      <InjectRouterContext>
        {routes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            component={route.component}
            exact={route.exact}
          />
        ))}
      </InjectRouterContext>
    </BrowserRouter>
  );
}

export const useRouter = () => useContext(RouterContext);

export const ROUTES = {
  'HOME': '/',
  'SIGN_IN': '/signin',
  'SIGN_UP': '/signup',
  'LOGOUT': '/logout',
};

export { Link, withRouter };

const RouterContext = React.createContext();

function InjectRouterContext({ children, ...router }) {
  return (
    <RouterContext.Provider
      value={{
        location: router.location,
        history: router.history,
        match: router.match,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
}

InjectRouterContext = withRouter(InjectRouterContext);
