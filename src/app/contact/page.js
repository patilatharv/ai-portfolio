'use client';

import React, { useState } from 'react';
import styles from '@/styles/contact.module.css';

const ContactPage = () => {
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 4000); // hide after 4s
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('https://formspree.io/f/mdkzvodp', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(e.target),
      });

      if (res.ok) {
        showToast();
        e.target.reset(); // clear form fields
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Submission failed. Check your internet connection.');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Let’s Get in Touch!</h1>
        <p className={styles.subtext}>
          I’d love to hear from you — whether it’s a project opportunity, a job role, or just to say hello!
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} 
          className={styles.form}
        >
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
            name="subjet"
            placeholder="Subject"
            className={styles.input}
          />
          <textarea
            name="message"
            placeholder="Your Message*"
            rows="8"
            required
            className={styles.textarea}
          />
          <button type="submit" className={styles.button}>Send Message</button>
        </form>

        {/* Toast Notification */}
        {toastVisible && (
          <div className={styles.toast}>
            <h2>Message received!</h2>
            <p>I’ll be in touch soon.</p>
          </div>
        )}

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
