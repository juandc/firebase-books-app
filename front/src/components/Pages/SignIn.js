import React, { useState, useContext } from 'react';
import Layout from '../Layout';
import { FirebaseContext } from '../Firebase';

export default function SignInPage() {
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
      <h2>Entra a tu cuenta</h2>

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
        Entrar
      </button>
    </Layout>
  );
}
