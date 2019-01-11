import React, { useState, useContext } from 'react';
import Layout from '../Layout';
import { FirebaseContext } from '../Firebase';

export default function SignUpPage() {
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
