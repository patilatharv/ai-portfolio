'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '@/components/Header';
import { ChatProvider } from '@/context/chatContext';

export default function ClientLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <ChatProvider>
        <Header isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
      <Sidebar isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
      <main className={`main-panel ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {children}
      </main>
    </ChatProvider>
  );
}