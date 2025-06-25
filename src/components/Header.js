'use client';

import React, { useState, useContext } from 'react';
import styles from '@/styles/header.module.css';
import { usePathname } from 'next/navigation';
import Modal from 'react-modal';
import { ChatContext } from '@/context/chatContext';
import { defaultAssistantMessage } from '@/helpers/defaultMessage';

const Header = ({ isOpen }) => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const { setMessages } = useContext(ChatContext);
  const [showConfirm, setShowConfirm] = useState(false);

  const confirmClear = () => {
    setMessages([defaultAssistantMessage]);
    setShowConfirm(false);
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.header_content} ${isOpen ? styles.open : styles.closed}`}>
        <h1>{"<Atharv's Portfolio />"}</h1>

        {isHome && (
          <>
            <div className={styles.powered_by}>
              <img src="/images/logos/chatgpt-logo.png" alt="ChatGPT Logo" width={20} height={20} />
              <span>Powered by GPT-4o</span>
            </div>

            <button className={styles.clear_button} onClick={() => setShowConfirm(true)}>
              Clear Chat
            </button>

            <Modal
              isOpen={showConfirm}
              onRequestClose={() => setShowConfirm(false)}
              className={styles.modal_content}
              overlayClassName={styles.modal_overlay}
            >
              <h2>Clear Chat?</h2>
              <p>This will remove all messages and reset the conversation.</p>
              <div className={styles.modal_buttons}>
                <button onClick={() => setShowConfirm(false)} className={styles.cancel_button}>
                  Cancel
                </button>
                <button onClick={confirmClear} className={styles.confirm_button}>
                  Yes, Clear
                </button>
              </div>
            </Modal>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
