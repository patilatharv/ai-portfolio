'use client';

import React from 'react';
import data from '@/data/staticPagesData.json';
import styles from '@/styles/skillsSection.module.css';
import { motion } from 'framer-motion';

export default function SkillsSection() {
  const skillsData = data.skills[0];

  return (
    <div className={styles.container}>
      {Object.entries(data.skills[0]).map(([categoryName, items]) => (
        <div key={categoryName} className={styles.category}>
          <h2 className={styles.heading}>{categoryName}</h2>
          <div className={styles.cardsGrid}>
            {items.map(item => (
              <motion.div
                key={item.Tech}
                className={styles.card}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                viewport={{ once: false, amount: 0.2 }}
                >
                <img
                  src={item.Icon}
                  alt={item.Tech}
                  className={styles.cardImage}
                />
                <h3 className={styles.cardTitle}>{item.Tech}</h3>
                <p className={styles.cardDesc}>{item.Description}</p>
                </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}