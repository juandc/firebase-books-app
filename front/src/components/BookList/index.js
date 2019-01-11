import React from 'react';
import Book from '../Book';
import './BookList.css';

export default function BookList({ list }) {
  return (
    <div className="BookList">
      {list.map(Book)}
    </div>
  );
}
