'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '@/components/Header';
import { ChatProvider } from '@/context/chatContext';
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  const pathname = usePathname();
  const isHome = pathname === '/';
  const [isClient, setIsClient] = useState(!isHome); // don't block unless home

  useEffect(() => {
    if (isHome) {
      setIsClient(true);
    }
  }, [isHome]);

  if (!isClient) return null; // defer hydration only on home

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