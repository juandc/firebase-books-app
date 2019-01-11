import React, { useState, useContext } from 'react';
import { FirebaseProvider } from '../Firebase';
import { BrowserRouter, Route, ROUTES } from '../Router';
import Layout from '../Layout';
import BookList from '../BookList';
import { FirebaseContext } from '../Firebase';

export default function App() {
  return (
    <FirebaseProvider>
      <BrowserRouter>
        <>
          <Route
            path={ROUTES.HOME}
            component={HomePage}
            exact
          />
          <Route
            path={ROUTES.SIGN_UP}
            component={SignUpPage}
            exact
          />
          <Route
            path={ROUTES.SIGN_IN}
            component={SignInPage}
            exact
          />
        </>
      </BrowserRouter>
    </FirebaseProvider>
  );
}

function HomePage() {
  const firebase = useContext(FirebaseContext);
  console.log(firebase);

  return (
    <Layout>
      <h2>Catálogo de libros</h2>
      <p>Encuentra libros de diferentes autores.</p>

      <BookList
        list={[
          { title: 'Título 1', author: 'author 1', id: '1' },
          { title: 'Título 2', author: 'author 2', id: '2' },
          { title: 'Título 3', author: 'author 3', id: '3' },
          { title: 'Título 4', author: 'author 4', id: '4' },
          { title: 'Título 5', author: 'author 5', id: '5' },
        ]}
      />
    </Layout>
  );
}

function SignUpPage() {
  const firebase = useContext(FirebaseContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createUserWithEmailAndPassword = () => {
    firebase.createUserWithEmailAndPassword({ email, password })
      .then(authUser => {
        console.log(authUser)
      })
      .catch(err => console.log(err))
  }

  return (
    <Layout>
      <h2>Crea tu cuenta</h2>

      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Nombre"
      />

      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Contraseña"
      />

      <button onClick={createUserWithEmailAndPassword}>
        Crear cuenta
      </button>
    </Layout>
  );
}

function SignInPage() {
  const firebase = useContext(FirebaseContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signInWithEmailAndPassword = () => {
    firebase.signInWithEmailAndPassword({
      email,
      password
    });
  }

  return (
    <Layout>
      <h2>Crea tu cuenta</h2>

      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Contraseña"
      />

      <button onClick={signInWithEmailAndPassword}>
        Crear cuenta
      </button>
    </Layout>
  );
}
