'use client';

import Textbox from '@/components/Textbox';
import styles from '@/styles/page.module.css';
import { useState } from 'react';
import formatAnswer from '@/utils/formatAnswer'

export default function ChatPage() {
  const [answer, setAnswer] = useState('');

  return (
    <>
      <main className={styles.chat_main}>
        <div className={styles.answer_wrapper}>
          {answer && (
            <div className={styles.answer_field}>
              {formatAnswer(answer)}
            </div>
          )}
        </div> 
      </main>
      <Textbox setAnswer={setAnswer} />
    </>
  );
}