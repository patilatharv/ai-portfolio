'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../styles/sidebar.module.css';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import useActiveSection from '@/hooks/useActiveSection';

const navItems = [
  { href: '/',                              label: 'Home' },
  { href: '/about#about-me',                label: 'About Me' },
  { href: '/about#professional-experiences',label: 'Experience' },
  { href: '/about#projects',                label: 'Projects' },
  { href: '/about#skills',                  label: 'Skills' },
  { href: '/resume',                        label: 'Resume' },
  { href: '/contact',                       label: 'Contact' },
];

export default function Sidebar({ isOpen, toggle }) {
  const pathname = usePathname();
  const sectionIds = [
    'about-me',
    'professional-experiences',
    'education',
    'projects',
    'skills',
  ];
  const activeSection = useActiveSection(sectionIds);

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
            // if it's an anchor link, highlight when its hash matches activeSection
            const hash = href.split('#')[1];
            const isActive = hash
              ? activeSection === hash
              : pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`${styles.link} ${
                  isActive ? styles.active : ''
                }`}
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