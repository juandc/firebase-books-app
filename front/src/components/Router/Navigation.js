import React from 'react';
import { useAuth } from '../Firebase/Auth';
import { Link, ROUTES } from './';
import './Navigation.css';

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
  <>
    <li>
      <Link to={ROUTES.NEW_BOOK}>Añadir libros</Link>
    </li>
    <li>
      <Link to={ROUTES.LOGOUT}>Salir</Link>
    </li>

    <span>Welcome, {displayName}</span>
    <span>{email}</span>
  </>
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
