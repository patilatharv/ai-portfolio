'use client';

import React from 'react';
import data from '@/data/staticPagesData.json';      // ← your JSON from “projects” key
import styles from '@/styles/projectsSection.module.css';

export default function ProjectsSection() {
  // your JSON has projects as an array with a single object that
  // has keys "Academic Projects" and "Personal Projects"
  const categories = data.projects[0];

  return (
    <div className={styles.container}>
      {Object.entries(categories).map(([categoryName, projects]) => (
        <section key={categoryName} className={styles.category}>
          <h2 className={styles.heading}>{categoryName}</h2>

          <div className={styles.grid}>
            {projects.map((proj) => (
              <div key={proj.name} className={styles.card}>
                {/* IMAGE */}
                {proj.Icon && (
                  <img
                    src={proj.Icon}
                    alt={`${proj.name} screenshot`}
                    className={styles.image}
                  />
                )}

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
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}