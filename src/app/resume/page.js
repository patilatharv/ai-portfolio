'use client';
import React, { useEffect, useState } from 'react';

const page = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Only run on client
    setIsClient(true);
  }, []);

  return (
    <div>
        <h1>My Resume</h1>
        {isClient ? (
        <iframe
          src="/resume.pdf"
          width="100%"
          height="800px"
          style={{ border: 'none' }}
          title="My Resume"
        />
      ) : (
        <p>
          Your browser does not support viewing PDFs directly.{' '}
          <a href="/Atharv Resume.pdf" target="_blank" rel="noopener noreferrer">
            Click here to download the resume.
          </a>
        </p>
      )}
    </div>
  )
}

export default page
