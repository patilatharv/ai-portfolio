// app/chat/page.js (or wherever your ChatPage lives)
'use client';

import { useContext, useEffect, useRef } from 'react';
import Textbox from '@/components/Textbox';
import styles from '@/styles/page.module.css';
import formatAnswer from '@/utils/formatAnswer';
import { ChatContext } from '@/context/chatContext';

export default function ChatPage() {
  const { messages, loading } = useContext(ChatContext);

  // ref to the scrolling container
  const wrapperRef = useRef(null);
  // ref to the very last message element
  const lastMessageRef = useRef(null);

  useEffect(() => {
    // Only scroll when the last message is from the user
    if (
      messages.length > 0 &&
      lastMessageRef.current
    ) {
      lastMessageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [messages]);

  return (
    <>
      <main className={styles.chat_main}>
        <div ref={wrapperRef} className={styles.chat_wrapper}>
          {messages.map((m, i) => {
            const isLast = i === messages.length - 1;
            if (m.role === 'user') {
              return (
                <div
                  key={i}
                  ref={isLast ? lastMessageRef : null}
                  className={styles.bubble_row}
                >
                  <div className={styles.bubble}>{m.content}</div>
                </div>
              );
            } else {
              return (
                <div
                  key={i}
                  ref={isLast ? lastMessageRef : null}
                  className={styles.answer_field}
                >
                  {formatAnswer(m.content)}
                </div>
              );
            }
          })}
          {loading && (
            <div ref={lastMessageRef} className={styles.answer_field}>
              Thinking…
            </div>
          )}
        </div>
      </main>
      <Textbox />
    </>
  );
}

