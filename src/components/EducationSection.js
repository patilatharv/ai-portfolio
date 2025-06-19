import React from 'react';
import data from '@/data/portfolioData.json';               // ← your JSON file
import styles from '@/styles/educationSection.module.css';

export default function EducationSection() {
  return (
    <div className={styles.container}>
      {data.education.map((edu, idx) => (
        <div key={idx} className={styles.card}>
          <h3 className={styles.degree}>
            {edu.degree} in {edu.major}
          </h3>
          <p className={styles.college}>{edu.college}</p>
        </div>
      ))}
    </div>
  );
}