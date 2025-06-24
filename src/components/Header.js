import React from 'react'
import styles from '@/styles/header.module.css'

const Header = ({ isOpen }) => {
  return (
    <header className={styles.header}>
      <div className={`${styles.header_content} ${isOpen ? styles.open : styles.closed}`}>
        <h1>{"<Atharv's Portfolio />"}</h1>
        <div className={styles.powered_by}>
          <img src="/images/logos/chatgpt-logo.png" alt="ChatGPT Logo" width={20} height={20} />
          <span>Powered by GPT-4o</span>
        </div>
        <button className={styles.clear_button}>
          Clear Chat
        </button>
      </div>
    </header>
  )
}

export default Header
