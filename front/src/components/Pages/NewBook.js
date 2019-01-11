import React, { useState } from 'react';
import Layout from '../Layout';
import { useFirebase } from '../Firebase';
import { useAuth } from '../Firebase/Auth';
import { useRouter, ROUTES } from '../Router';

export default function NewBookPage() {
  const firebase = useFirebase();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const { isLoading, user } = useAuth();
  
  const createBook = () => {
    firebase.createBook({
      userId: user.uid,
      author,
      title,
    })
      .then(() => router.history.push(ROUTES.HOME))
      .catch(console.log);
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <Layout>
      <h2>Añade un nuevo libro</h2>

      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Nombre"
      />

      <input
        type="text"
        value={author}
        onChange={e => setAuthor(e.target.value)}
        placeholder="Autor"
      />

      <button onClick={createBook}>
        Añadir libro
      </button>
    </Layout>
  );
}
