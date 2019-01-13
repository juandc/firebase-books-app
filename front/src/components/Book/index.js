import React from 'react';
import './Book.css';

export default function Book({ title, author, id }) {
  return (
    <div className="Book" key={id}>
      <h3 className="Book-title">{title}</h3>
      <small className="Book-author">{author}</small>
    </div>
  );
}
