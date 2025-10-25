'use client';

import React from 'react'
import Timeline from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection'
import SkillsSection from '@/components/SkillsSection'
import AboutMeSection from '@/components/AboutMeSection'
import OpenSourceSection from '@/components/OpenSourceSection'
import styles from '@/styles/about.module.css';

const page = () => {
  return (
    <>
      {/* About Me */}
      <section id="about-me">
        <AboutMeSection />
      </section>

      {/* Professional Experiences */}
      <section id="professional-experiences">
        <div style={{ textAlign: 'center' }}>
          <h1 className={styles.sectionTitle}>
            Professional Experience
          </h1>
        </div>
        <Timeline />
      </section>

      {/* Open Source */}
      <section id="open-source">
        <div style={{ textAlign: 'center' }}>
          <h1 className={styles.sectionTitle}>
            Open-Source Contributions
          </h1>
        </div>
        <OpenSourceSection />
      </section>

      {/* Projects */}
      <section id="projects">
        <div style={{ textAlign: 'center' }}>
          <h1 className={styles.sectionTitle}>
            Projects
          </h1>
        </div>
        <ProjectsSection />
      </section>

      {/* Skills */}
      <section id="skills">
        <div style={{ textAlign: 'center' }}>
          <h1 className={styles.sectionTitle}>
            Skills
          </h1>
        </div>
        <SkillsSection />
      </section>
    </>
  )
}

export default page
