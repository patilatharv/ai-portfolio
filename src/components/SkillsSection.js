'use client';

import React from 'react';
import data from '@/data/staticPagesData.json';
import styles from '@/styles/skillsSection.module.css';

export default function SkillsSection() {
  // Your JSON has "skills" as an array with a single object:
  const skillsData = data.skills[0];

  return (
    <div className={styles.container}>
      {Object.entries(data.skills[0]).map(([categoryName, items]) => (
        <div key={categoryName} className={styles.category}>
          <h2 className={styles.heading}>{categoryName}</h2>
          <div className={styles.cardsGrid}>
            {items.map(item => (
              <div key={item.Tech} className={styles.card}>
                <img
                  src={item.Icon}
                  alt={item.Tech}
                  className={styles.cardImage}
                />
                <h3 className={styles.cardTitle}>{item.Tech}</h3>
                <p className={styles.cardDesc}>{item.Description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}