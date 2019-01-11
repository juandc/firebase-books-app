import React from 'react';
import Book from '../Book';
import './BookList.css';

export default function BookList({ list }) {
  if (!list) return <p>Loading...</p>
  
  return (
    <div className="BookList">
      {list.map(Book)}
    </div>
  );
}
