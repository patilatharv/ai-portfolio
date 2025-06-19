import React from 'react';
import data from '@/data/portfolioData.json';
import styles from '@/styles/skillsSection.module.css';

export default function SkillsSection() {
  // turn the comma-separated string into an array
  const skills = data.skills
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  return (
    <div className={styles.grid}>
      {skills.map(skill => (
        <div key={skill} className={styles.card}>
          {skill}
        </div>
      ))}
    </div>
  );
}