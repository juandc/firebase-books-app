import React from 'react';
import Layout from '../Layout';
import BookList from '../BookList';
import { useFirebase } from '../Firebase';

export default function HomePage() {
  const firebase = useFirebase();
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
