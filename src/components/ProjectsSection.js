'use client';

import React from 'react';
import data from '@/data/staticPagesData.json';
import styles from '@/styles/projectsSection.module.css';
import { motion } from 'framer-motion';

export default function ProjectsSection() {
  const categories = data.projects[0];

  return (
    <div className={styles.container}>
      {Object.entries(categories).map(([categoryName, projects]) => (
        <section key={categoryName} className={styles.category}>
          <h2 className={styles.heading}>{categoryName}</h2>

          <div className={styles.grid}>
            {projects.map((proj) => (
                <motion.div
                    key={proj.name}
                    className={styles.card}
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    whileHover={{ transition: { duration: 0 } , scale: 1.03 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    viewport={{ once: false, amount: 0.2 }}
                >
                {/* IMAGE */}
                {proj.Icon && (
                  <img
                    src={proj.Icon}
                    alt={`${proj.name} screenshot`}
                    className={styles.image}
                  />
                )}

                <hr className={styles.separator} />

                {/* TEXT CONTENT */}
                <div className={styles.content}>
                  <h3 className={styles.title}>{proj.name}</h3>
                  <p className={styles.topic}>{proj.topic}</p>
                  <p className={styles.description}>{proj.description}</p>

                  {/* TECH PILLS */}
                  <div className={styles.tech}>
                    {proj.tech.map((tech) => (
                      <span key={tech} className={styles.pill}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}