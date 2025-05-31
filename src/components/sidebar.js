'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../styles/sidebar.module.css';

const navItems = [
  { href: '/',          label: 'Home' },
  { href: '/about',     label: 'About' },
  { href: '/resume',    label: 'Resume' },
  { href: '/experience',label: 'Experience' },
  { href: '/contact',   label: 'Contact' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
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
    </aside>
  );
}