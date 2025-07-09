'use client';

import React from 'react'
import { useRef, useState, useContext } from 'react';
import styles from '@/styles/textbox.module.css'
import { ChatContext } from '@/context/chatContext';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import Modal from 'react-modal';
import { defaultAssistantMessage } from '@/helpers/defaultMessage';

const Textbox = () => {
  const { messages, setMessages, loading, setLoading, question, setQuestion, isTyping, setIsTyping } = useContext(ChatContext);

  const [showConfirm, setShowConfirm] = useState(false);

  const confirmClear = () => {
    setMessages([defaultAssistantMessage]);
    setShowConfirm(false);
  };

  const textareaRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuestion(value);
  
    const textarea = textareaRef.current;
    if (!textarea) return;
  
    textarea.style.height = 'auto'; // reset height
  
    // only expand if scrollHeight > clientHeight (actual overflow)
    if (textarea.scrollHeight > textarea.clientHeight) {
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };
  
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

    if (textareaRef.current) {
      textareaRef.current.style.height = '65px';
    }
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
            ref={textareaRef}
            className={styles.textarea}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();    // Prevent newline
                  handleAsk();           // Trigger send
                }
              }}
              value={question} 
              onChange={handleChange}
              placeholder="Ask Anything About Atharv" 
              rows={1}
              disabled={loading || isTyping}
          />
          <div className={styles.bottom_bar}>
            <button
              onClick={handleAsk}
              disabled={loading || isTyping || !question.trim()}
              className={styles.submit_button}
            >
              <ArrowUpwardRoundedIcon />
            </button>

            <button 
              className={styles.clear_button} 
              onClick={() => setShowConfirm(true)}
            >
              <ClearRoundedIcon />
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={showConfirm}
        onRequestClose={() => setShowConfirm(false)}
        className={styles.modal_content}
        overlayClassName={styles.modal_overlay}
        ariaHideApp={false} // disables screen reader app-hiding behavior
      >
        <h2>Clear Chat?</h2>
        <p>This will remove all messages and reset the conversation.</p>
        <div className={styles.modal_buttons}>
          <button onClick={() => setShowConfirm(false)} className={styles.cancel_button}>
            Cancel
          </button>
          <button onClick={confirmClear} className={styles.confirm_button}>
            Yes, Clear
          </button>
        </div>
      </Modal>
    </>
  )
}

export default Textbox