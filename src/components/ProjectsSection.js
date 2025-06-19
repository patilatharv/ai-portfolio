import React from 'react';
import data from '@/data/portfolioData.json';
import styles from '@/styles/projectsSection.module.css';

export default function ProjectsSection() {
  return (
    <div className={styles.grid}>
      {data.projects.map((proj) => (
        <div key={proj.name} className={styles.card}>
          <h3 className={styles.title}>{proj.name}</h3>
          <p className={styles.description}>{proj.description}</p>
          <p className={styles.details}>{proj.details}</p>
          <p className={styles.tech}>
            <strong>Tech:</strong> {proj.tech.join(', ')}
          </p>
        </div>
      ))}
    </div>
  );
}