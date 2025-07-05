'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../styles/sidebar.module.css';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import useActiveSection from '@/hooks/useActiveSection';
import Image from 'next/image';

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

      <div className={styles.topRow}>
        {isOpen && (
          <Link href="/" passHref>
            <Image
              src="/images/logos/AP-logo.png"
              alt="AP Logo"
              width={27}
              height={27}
              className={styles.logo}
            />
          </Link>
        )}
        <button className={`${styles.toggleBtn} ${isOpen ? styles.open : styles.closed}`}
          onClick={toggle} aria-label="Toggle sidebar"
        >
          <MenuRoundedIcon fontSize='medium'/>
        </button>
      </div>
    
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