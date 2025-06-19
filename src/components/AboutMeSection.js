import React from 'react';
import data from '@/data/portfolioData.json';         // your JSON file
import styles from '@/styles/aboutMeSection.module.css';

export default function AboutMeSection() {
  return (
    <div className={styles.container}>
      <p className={styles.text}>{data.bio}</p>
    </div>
  );
}