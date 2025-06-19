'use client';

import Textbox from '@/components/Textbox';
import styles from '@/styles/page.module.css';
import { useContext } from 'react';
import formatAnswer from '@/utils/formatAnswer'
import { ChatContext } from '@/context/chatContext';

export default function ChatPage() {
  const { messages, loading } = useContext(ChatContext);

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
      <Textbox/>
    </>
  );
}