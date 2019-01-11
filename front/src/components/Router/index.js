import React, { useContext } from 'react';
import {
  BrowserRouter,
  Route,
  Link,
  withRouter,
} from 'react-router-dom';

const RouterContext = React.createContext();

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

export const RouterConsumer = RouterContext.Consumer;
export const useRouter = () => useContext(RouterContext);

export const ROUTES = {
  'HOME': '/',
  'SIGN_IN': '/signin',
  'SIGN_UP': '/signup',
  'LOGOUT': '/logout',
  'NEW_BOOK': '/new',
};

export { Link, withRouter };

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

// eslint-disable-next-line no-func-assign
InjectRouterContext = withRouter(InjectRouterContext);
