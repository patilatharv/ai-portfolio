'use client';

import React from 'react'
import { useState } from 'react';
import styles from '@/styles/textbox.module.css'

const Textbox = ({ setAnswer, setUserQuestion }) => {
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleAsk = async () => {
        if (!question.trim()) return;
        setUserQuestion(question);
        setLoading(true);
        setAnswer(""); // clear previous answer
        try {
        const res = await fetch('/api/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question })
        });
        const data = await res.json();
        if (res.ok) {
            setAnswer(data.answer);
        } else {
            setAnswer(`Error: ${data.error || 'Something went wrong'}`);
        }
        } catch (err) {
        console.error("Request failed:", err);
        setAnswer("Error: Failed to fetch answer.");
        } finally {
        setLoading(false);
        }
  };

  return (
    <>
      <div className={styles.textbox_background} />

      <div className={styles.textbox_container}>
        <div className={styles.textbox_inner}>
          <textarea 
            className={styles.textarea}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();    // Prevent newline
                  handleAsk();           // Trigger send
                }
              }}
              value={question} 
              onChange={(e) => setQuestion(e.target.value)} 
              placeholder="Ask Anything" 
              rows={1}
              disabled={loading}
          />
          <button
            onClick={handleAsk}
            disabled={loading || !question.trim()}
            className={styles.submit_button}
          />
        </div>
      </div>
    </>
  )
}

export default Textbox
