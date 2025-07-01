'use client';

import React, { useRef, useEffect, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTypewriter } from '@/hooks/useTypewriter';
import { ChatContext } from '@/context/chatContext';
import styles from '@/styles/page.module.css';

export default function AssistantMessage({ content, isLast, index, typed }) {
  const { messages, setMessages } = useContext(ChatContext);
  const lastRef = useRef(null);

  // Get the progressively‐typed substring:
  const typedText = useTypewriter(content, 0.25);

  // Once typing finishes, flip the `typed` flag in context:
  useEffect(() => {
    if (!typed && typedText === content) {
      setMessages((prev) =>
        prev.map((m, i) =>
          i === index
            ? {
                ...m,
                typed: true,
              }
            : m
        )
      );
    }
  }, [typedText, typed, content, index, setMessages]);

  // Render either the full content (if already typed), or the partial:
  const toRender = typed ? content : typedText;

  return (
    <div
        className={styles.answer_field}
        style={{
          minHeight: !typed ? '100vh' : 'auto',
          transition: 'min-height 0.3s ease-out',
        }}
    >
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {toRender}
    </ReactMarkdown>
    
    {typed && index === 0 && <SuggestedQuestions />}
  </div>
  );
}

const suggestedQuestions = [
  "What are Atharv's most recent projects?",
  "Tell me about his software engineering experience.",
  "What did he do during his internship?",
  "What technologies has he worked with?",
];

function SuggestedQuestions() {
  const { setQuestion } = useContext(ChatContext);

  const handleClick = (text) => {
    setQuestion(text); // updates the textbox
    const textarea = document.querySelector('textarea');
    if (textarea) textarea.focus();
  };

  return (
    <div className={styles.suggestions_wrapper}>
      <div className={styles.suggestions_label}>You can try asking:</div>
      <div className={styles.suggestionBubbles}>
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            className={styles.suggestionBubble}
            onClick={() => handleClick(q)}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}