import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import BookList from '../BookList';
import { useFirebase } from '../Firebase';

export default function HomePage() {
  const [books, setBooks] = useState();
  const firebase = useFirebase();

  const getBooks = () => {
    firebase.getBooks()
      .then(setBooks)
      .catch(console.log);
  }

  useEffect(getBooks, [])

  return (
    <Layout>
      <h2>Catálogo de libros</h2>
      <p>Encuentra libros de diferentes autores.</p>

      <BookList
        list={books}
      />
    </Layout>
  );
}
