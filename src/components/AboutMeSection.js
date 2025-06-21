'use client';

import React from 'react';
import { motion } from 'framer-motion';
import data from '@/data/staticPagesData.json';
import styles from '@/styles/aboutMeSection.module.css';

export default function AboutMeSection() {
  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <motion.div
        className={styles.card}
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        viewport={{ once: false, amount: 0.3 }}
      >
        {data.headshot && (
          <motion.img
            src={data.headshot}
            alt="Profile Picture"
            className={styles.image}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.25, ease: 'easeOut' }}
            viewport={{ once: false, amount: 0.3 }}
          />
        )}

        <motion.div
          className={styles.textContainer}
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.25, ease: 'easeOut' }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2 className={styles.heading}>About Me</h2>
          <p className={styles.text}>{data.about}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}