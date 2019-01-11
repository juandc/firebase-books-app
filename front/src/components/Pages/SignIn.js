import React, { useState } from 'react';
import Layout from '../Layout';
import { useRouter, ROUTES } from '../Router';
import { useFirebase } from '../Firebase';

export default function SignInPage() {
  const firebase = useFirebase();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signInWithEmailAndPassword = () => {
    firebase.signInWithEmailAndPassword({ email, password })
      .then(() => {
        router.history.push(ROUTES.HOME);
      })
      .catch(console.log);
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
