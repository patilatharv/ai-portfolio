'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function ClientLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
      <main className={`main-panel ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {children}
      </main>
    </>
  );
}