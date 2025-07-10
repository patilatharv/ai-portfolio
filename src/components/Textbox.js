'use client';

import React from 'react'
import { useRef, useState, useContext } from 'react';
import styles from '@/styles/textbox.module.css'
import { ChatContext } from '@/context/chatContext';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import Modal from 'react-modal';
import { defaultAssistantMessage } from '@/helpers/defaultMessage';
import StopRoundedIcon from '@mui/icons-material/StopRounded';

const Textbox = () => {
  const { messages, setMessages, 
    loading, setLoading, 
    question, setQuestion, 
    isTyping, setIsTyping, 
    abortController, setAbortController,
    shouldStop, setShouldStop,
  } = useContext(ChatContext);

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
    setQuestion('');
    setLoading(true);
    setShouldStop(false);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    const controller = new AbortController();
    setAbortController(controller);
    
    try {
      // Send entire history to the API
      const res = await fetch('/api/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: newMessages }),
          signal: controller.signal,
      });

      const data = await res.json();
      const assistantContent = res.ok // Append assistant’s reply
        ? data.answer
        : `Error: ${data.error || 'Something went wrong'}`;

      setMessages([
        ...newMessages,
        { role: 'assistant', content: assistantContent, typed: false },
      ]);
      setIsTyping(true);

    } catch (err) {
      if (err.name === 'AbortError') {
        setMessages([
          ...newMessages,
          {
            role: 'assistant',
            content: 'Answer generation was stopped.',
            typed: false, // allow typewriter to animate it
          },
        ]);
        setIsTyping(true);
    
        return; // prevent finally block from running too early
      } else {
        console.error(err);
        setMessages([
          ...newMessages,
          {
            role: 'assistant',
            content: 'Error: Failed to get response.',
            typed: false,
          },
        ]);
      }
    } finally {
      setLoading(false);
      setAbortController(null);
    }
  };

  const handleStop = () => {
    if (abortController) abortController.abort();
    setShouldStop(true);
    setAbortController(null);
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
            {loading ? (
              <button 
                onClick={handleStop} 
                className={styles.submit_button}
                aria-label="Stop generating"
              >
                <StopRoundedIcon />
              </button>
            ) : (
              <button
                onClick={handleAsk}
                disabled={!question.trim()}
                className={styles.submit_button}
                aria-label="Send"
              >
                <ArrowUpwardRoundedIcon />
              </button>
            )}

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