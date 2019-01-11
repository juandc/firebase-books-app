import React from 'react';
import { useAuth } from '../Firebase/Auth';
import { Link, ROUTES } from './';

export default function Navigation() {
  const { isLoading, user } = useAuth();

  return (
    <nav>
      <ul>
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>

        {isLoading && <p>Loading...</p>}

        {!isLoading && (user
          ? <UserInfo {...user} />
          : <NoUserInfo />
        )}
      </ul>
    </nav>
  );
}

const UserInfo = ({ displayName, email }) => (
  <li>
    <span>Welcome, {displayName}</span>
    <span>{email}</span>

    <br/>

    <Link to={ROUTES.LOGOUT}>Salir</Link>
  </li>
);

const NoUserInfo = () => (
  <>
    <li>
      <Link to={ROUTES.SIGN_IN}>Entrar</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_UP}>Crea tu cuenta</Link>
    </li>
  </>
);
