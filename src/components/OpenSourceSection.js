'use client';

import React from 'react';
import data from '@/data/staticPagesData.json';
import styles from '@/styles/projectsSection.module.css';
import { motion } from 'framer-motion';

export default function OpenSourceSection() {
  const ossItems = data['Open-Source Contributions'] || [];

  return (
    <div className={styles.container}>
      <section className={styles.category}>
        <h2 className={styles.heading}>Open-Source Contributions</h2>

        <div className={styles.grid}>
          {ossItems.map((item) => (
            <motion.div
              key={item.name}
              className={styles.card}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ transition: { duration: 0 }, scale: 1.03 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              viewport={{ once: false, amount: 0.2 }}
            >
              {/* IMAGE */}
              <div className={styles.imageWrapper}>
                <img
                  src={item.image}
                  alt={`${item.name} cover`}
                  className={styles.image}
                />
              </div>

              <hr className={styles.separator} />

              {/* TEXT CONTENT */}
              <div className={styles.content}>
                <h3 className={styles.title}>{item.name}</h3>
                <p className={styles.description}>{item.description}</p>

                {/* TECH PILLS */}
                {Array.isArray(item.tech) && item.tech.length > 0 && (
                  <div className={styles.tech}>
                    {item.tech.map((tech) => (
                      <span key={tech} className={styles.pill}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* LINK PILLS (reuse GitHub pill styling) */}
                {item['Main Repo'] && item['Main Repo'].trim() !== '' && (
                <a
                    href={item['Main Repo']}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.githubPill}
                >
                    <img
                    src="/images/logos/github-mark-white.png"
                    alt="GitHub Logo"
                    className={styles.githubIcon}
                    />
                    Main Repo
                </a>
                )}

                {item['My Merged PRs'] && item['My Merged PRs'].trim() !== '' && (
                <a
                    href={item['My Merged PRs']}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.githubPill}
                >
                    <img
                    src="/images/logos/github-mark-white.png"
                    alt="GitHub Logo"
                    className={styles.githubIcon}
                    />
                    My Merged PRs
                </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}