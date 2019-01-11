import React from 'react';
import './Book.css';

export default function Book({ title, author, id }) {
  return (
    <div className="Book" key={id}>
      <h3>{title}</h3>
      <h4>{author}</h4>
    </div>
  );
}
