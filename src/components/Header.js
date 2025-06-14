import React from 'react'
import styles from '@/styles/header.module.css'

const Header = ({isOpen }) => {
  return (
    <header className={styles.header}>
        <div className={`${styles.header_content} ${isOpen ? styles.open : styles.closed}`}>
            <h1>My Portfolio</h1>
        </div>  
    </header>
  )
}

export default Header
