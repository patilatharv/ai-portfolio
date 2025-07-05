'use client';

import React, { useRef, useEffect, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTypewriter } from '@/hooks/useTypewriter';
import { ChatContext } from '@/context/chatContext';
import styles from '@/styles/page.module.css';

export default function AssistantMessage({ content, isLast, index, typed }) {
  const { messages, setMessages, setIsTyping } = useContext(ChatContext);
  const lastRef = useRef(null);

  // Get the progressively‐typed substring:
  const typedText = useTypewriter(content, 0.25);
  
  useEffect(() => {
    if (isLast && !typed) {
      setIsTyping(true);
    }
  }, [isLast, typed, setIsTyping]);

  // Once typing finishes, flip the `typed` flag in context:
  useEffect(() => {
    if (!typed && typedText === content) {
      setMessages((prev) =>
        prev.map((m, i) =>
          i === index ? { ...m, typed: true } : m
        )
      );

      // stop blocking new input once typing is done
      if (isLast) setIsTyping(false);
    }
  }, [typedText, typed, content, index, setMessages, isLast, setIsTyping]);

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
  // high-level “about”
  "Give me a quick overview of Atharv’s background.",
  
  // project discovery
  "List all of Atharv’s projects and the tech behind each.",
  "Which projects use React or Next.js?",
  
  // deep-dive examples
  "Tell me about the Dynamic Storage Allocator—why did he add footer optimisation?",
  "What optimizations did Atharv make in his P2P file sharing project and why?",
  
  // experience & impact
  "What were Atharv’s key achievements during his Amphenol internship?",
  "How did his PID controller improve temperature accuracy?",
  
  // skills
  "Summarise Atharv’s top backend and embedded skills.",
  "Which projects best demonstrate his AR/Swift expertise?",

  // Job fit
  "Would Atharv be a strong fit for this position: <Role Title>, <Role Description>?",
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