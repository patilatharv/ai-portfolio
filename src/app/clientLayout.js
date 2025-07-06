'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '@/components/Header';
import { ChatProvider } from '@/context/chatContext';
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === '/';
  const [isClient, setIsClient] = useState(!isHome); // don't block unless home

  // Set mobile state and sidebar visibility on initial load
  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth <= 768;
      setIsMobile(isNowMobile);
      setIsOpen(!isNowMobile); // closed if mobile, open otherwise
    };

    handleResize(); // call once initially
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent scroll when sidebar is open on mobile
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    }
  }, [isMobile, isOpen]);

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

      {/* Overlay when sidebar is open on mobile */}
      {isMobile && isOpen && (
        <div
          className="main-panel-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <main className={`main-panel ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {children}
      </main>
    </ChatProvider>
  );
}