'use client';

import React from 'react';
import styles from '@/styles/resume.module.css';

const ResumePage = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>My Resume</h1>

      <iframe
        src="/Atharv Resume.pdf"
        className={styles.iframe}
        title="Atharv Patil Resume"
      />

      <p className={styles.fallback}>
        Having trouble viewing?{' '}
        <a href="/Atharv Resume.pdf" target="_blank" rel="noopener noreferrer">
          Open in a new tab
        </a>
      </p>
    </div>
  );
};

export default ResumePage;