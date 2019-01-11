import React from 'react';
import { Navigation } from '../Router';
import './Layout.css';

export default function Layout({ children }) {
  return (
    <section className="Layout">
      <Navigation />
    
      <main role="application">
        {children}
      </main>
    </section>
  );
}
