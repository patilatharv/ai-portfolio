'use client';

import React from 'react';
import styles from '@/styles/contact.module.css';

const ContactPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Let’s Get in Touch!</h1>
        <p className={styles.subtext}>
          I’d love to hear from you — whether it’s a project opportunity, a job role, or just to say hello!
        </p>

        {/* Contact Form */}
        <form className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Your Name*"
            required
            className={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email*"
            required
            className={styles.input}
          />
          <input
            type="text"
            name="subjetc"
            placeholder="Subject"
            className={styles.input}
          />
          <textarea
            name="message"
            placeholder="Your Message*"
            rows="5"
            required
            className={styles.textarea}
          />
          <button type="submit" className={styles.button}>Send Message</button>
        </form>

        {/* Contact Info */}
        <div className={styles.contactInfo}>
          <h2>Or reach out directly:</h2>
          <p>📧 Email: <a href="mailto:patilatharv24@gmail.com">patilatharv24@gmail.com</a></p>
          <p>💼 LinkedIn: <a href="https://www.linkedin.com/in/atharvpatil30" target="_blank" rel="noopener noreferrer">linkedin.com/in/atharvpatil30</a></p>
          <p>💻 GitHub: <a href="https://github.com/patilatharv" target="_blank" rel="noopener noreferrer">github.com/patilatharv</a></p>
          <p>
            📄 <a href="/Atharv Resume.pdf" download className={styles.resumeLink}>Download Resume</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
