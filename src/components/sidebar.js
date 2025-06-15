'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../styles/sidebar.module.css';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

const navItems = [
  { href: '/',          label: 'Home' },
  { href: '/about',     label: 'About' },
  { href: '/resume',    label: 'Resume' },
  { href: '/experience',label: 'Experience' },
  { href: '/contact',   label: 'Contact' },
];

export default function Sidebar({ isOpen, toggle }) {
  const pathname = usePathname();

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
      onClick={() => {
          if (!isOpen) toggle();
        }}
      >

      <button className={`${styles.toggleBtn} ${isOpen ? styles.open : styles.closed}`}
       onClick={toggle} aria-label="Toggle sidebar">
        <MenuRoundedIcon />
      </button>
    
      {isOpen && (
        <nav className={styles.navLinks}>
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`${styles.link} ${isActive ? styles.active : ''}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      )}
    </aside>
  );
}