import React, { useState } from 'react';
import Layout from '../Layout';
import { useFirebase } from '../Firebase';
import { useRouter, ROUTES } from '../Router';

export default function SignUpPage() {
  const firebase = useFirebase();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createUserWithEmailAndPassword = () => {
    firebase.createUserWithEmailAndPassword({ email, password })
      .then(() => {
        router.history.push(ROUTES.HOME);
      })
      .catch(console.log);
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
