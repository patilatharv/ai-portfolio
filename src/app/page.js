'use client';

import Textbox from '@/components/Textbox';
import styles from '@/styles/page.module.css';
import { useState } from 'react';
import formatAnswer from '@/utils/formatAnswer'

export default function ChatPage() {
  const [answer, setAnswer] = useState('');
  const [userQuestion, setUserQuestion] = useState('');

  return (
    <>
      <main className={styles.chat_main}>
        <div className={styles.chat_wrapper}>
          <div className={styles.bubble_row}>
            {userQuestion && (
              <div className={styles.bubble}>
                {userQuestion}  
              </div>
            )}
          </div>

          {answer && (
            <div className={styles.answer_field}>
              {formatAnswer(answer)}
            </div>
          )}
        </div> 
      </main>
      <Textbox setAnswer={setAnswer} setUserQuestion={setUserQuestion}/>
    </>
  );
}