'use client';

import Textbox from '@/components/Textbox';
import styles from '@/styles/page.module.css';
import { useState, useEffect } from 'react';
import formatAnswer from '@/utils/formatAnswer'

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: "Hello! I’m Atharv's AI assistant. You can ask me about Atharv's portfolio." 
    },
  ]);

  const [loading, setLoading] = useState(false);

  return (
    <>
      <main className={styles.chat_main}>
        <div className={styles.chat_wrapper}>
          {messages.map((m, i) =>
            m.role === 'user' ? (
              <div key={i} className={styles.bubble_row}>
                <div className={styles.bubble}>{m.content}</div>
              </div>
            ) : (
              <div key={i} className={styles.answer_field}>
                {formatAnswer(m.content)}
              </div>
            )
          )}
          {loading && (                                 
            <div className={styles.answer_field}>
              Thinking…
            </div>
          )}
        </div> 
      </main>
      <Textbox
        messages={messages}
        setMessages={setMessages}
        loading={loading}
        setLoading={setLoading}
      />
    </>
  );
}