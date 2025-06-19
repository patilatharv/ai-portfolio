import React from 'react'
import Timeline from '@/components/Timeline';
import EducationSection from '@/components/EducationSection'
import ProjectsSection  from '@/components/ProjectsSection'
import SkillsSection    from '@/components/SkillsSection'
import AboutMeSection from '@/components/AboutMeSection'

const page = () => {
  return (
    <>
      {/* About Me */}
      <section id="about-me">
        <h2>About Me</h2>
        <AboutMeSection />
      </section>

      {/* Professional Experiences */}
      <section id="professional-experiences">
        <h2>Professional Experiences</h2>
        <Timeline />
      </section>

      {/* Education */}
      <section id="education">
        <h2>Education</h2>
        <EducationSection />
      </section>

      {/* Projects */}
      <section id="projects">
        <h2>Projects</h2>
        <ProjectsSection />
      </section>

      {/* Skills */}
      <section id="skills">
        <h2>Skills</h2> 
        <SkillsSection />
      </section>
    </>
  )
}

export default page
