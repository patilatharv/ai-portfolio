'use client';

import React, { useEffect, useState } from 'react';
import styles from '@/styles/header.module.css';
import Image from 'next/image';

const Header = ({ isOpen }) => {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    setIsLightMode(mediaQuery.matches);

    const listener = (e) => setIsLightMode(e.matches);
    mediaQuery.addEventListener('change', listener);

    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  return (
    <header className={styles.header}>
      <div className={`${styles.header_content} ${isOpen ? styles.open : styles.closed}`}>
        <h1>{"Atharv's AI Portfolio"}</h1>
        <div className={styles.powered_by}>
          <Image
            src={isLightMode ? '/images/logos/ChatGPT-Logo-light.png' : '/images/logos/chatgpt-logo.png'}
            alt="ChatGPT Logo"
            className={styles.openai_logo}
            width={20}
            height={20}
          />
          <span className={styles.desktop_text}>Powered by GPT-4o</span>
          <span className={styles.mobile_text}>
            Powered by GPT-4o and Developed by Atharv Patil
          </span>
        </div>

        <div className={styles.developed_by}>
          Developed by Atharv Patil
        </div>
      </div>
    </header>
  );
};

export default Header;
