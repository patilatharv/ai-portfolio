'use client';

import React from 'react'
import { useState, useContext } from 'react';
import styles from '@/styles/textbox.module.css'
import { ChatContext } from '@/context/chatContext';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';

const Textbox = () => {
  const { messages, setMessages, loading, setLoading, question, setQuestion } = useContext(ChatContext);
  
  const handleAsk = async () => {
    if (!question.trim()) return;

    // Append the user’s turn
    const newMessages = [
      ...messages,
      { role: 'user', content: question },
    ];
    setMessages(newMessages);

    // Clear input & set loading
    setQuestion('');
    setLoading(true);
    
    try {
      // Send entire history to the API
      const res = await fetch('/api/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: newMessages })
      });
      const data = await res.json();

      // Append assistant’s reply
      const assistantContent = res.ok
        ? data.answer
        : `Error: ${data.error || 'Something went wrong'}`;

      setMessages([
        ...newMessages,
        { role: 'assistant', content: assistantContent, typed: false },
      ]);

    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        { role: 'assistant', content: 'Error: Failed to get response.', typed: false },
      ]);
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
            // disabled={loading || !question.trim()}
            className={styles.submit_button}
          >
            <ArrowUpwardRoundedIcon />
          </button>
        </div>
      </div>
    </>
  )
}

export default Textbox
