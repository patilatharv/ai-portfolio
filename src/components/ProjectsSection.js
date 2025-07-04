'use client';

import React, { useState } from 'react';
import data from '@/data/staticPagesData.json';
import styles from '@/styles/projectsSection.module.css';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

export default function ProjectsSection() {
  const categories = data.projects[0];
  const [modalVideo, setModalVideo] = useState(null);

  const openModal = (videoSrc) => {
    setModalVideo(videoSrc);
  };

  const closeModal = () => {
    setModalVideo(null);
  };

  return (
    <div className={styles.container}>
      {Object.entries(categories).map(([categoryName, projects]) => (
        <section key={categoryName} className={styles.category}>
          <h2 className={styles.heading}>{categoryName}</h2>
            {categoryName === 'Academic Projects' && (
              <p className={styles.note}>
                GitHub links for academic projects are available on request due to academic integrity policies
              </p>
            )}

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
                <div className={styles.imageWrapper}>
                  <img
                    src={proj.image}
                    alt={`${proj.name} screenshot`}
                    className={styles.image}
                  />
                  {proj.demo && proj.demo.trim() !== '' && (
                    <div
                      className={styles.overlay}
                      onClick={() => openModal(proj.demo)}
                    >
                      <PlayCircleOutlineIcon className={styles.playIcon} />
                    </div>
                  )}
                </div>

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

                  {/* GITHUB LINK PILL */}
                  {proj.github && proj.github.trim() !== '' && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.githubPill}
                    >
                      <img
                        src="/images/logos/github-mark-white.png"
                        alt="GitHub Logo"
                        className={styles.githubIcon}
                      />
                      View on GitHub
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      ))}

      {/* MODAL FOR DEMO VIDEO */}
      <Modal
        isOpen={!!modalVideo}
        onRequestClose={closeModal}
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        ariaHideApp={false}
      >
        <div className={styles.modalInner}>
          <button onClick={closeModal} className={styles.closeButton}>×</button>
          <video src={modalVideo} controls autoPlay className={styles.videoPlayer} />
        </div>
      </Modal>
    </div>
  );
}