'use client'

import React, { useContext, useEffect, useRef, Fragment } from 'react'
import Textbox from '@/components/Textbox'
import AssistantMessage from '@/components/AssistantMessage'
import { ChatContext } from '@/context/chatContext'
import styles from '@/styles/page.module.css'
import ScrollDownButton from '@/components/ScrollDownButton'

export default function ChatPage() {
  const { messages, loading } = useContext(ChatContext)
  const lastUserRef = useRef(null)
  const bottomRef = useRef(null)

  // Determine if the last message is from the user
  const lastMessage = messages[messages.length - 1]
  const showThinking = lastMessage?.role === 'user'

  useEffect(() => {
    if (lastUserRef.current) {
      lastUserRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [messages])

  return (
    <>
      <main className={styles.chat_main}>
        <div className={styles.chat_wrapper}>
          {messages.map((m, i) => {
            const isLast = i === messages.length - 1
            const isLastUser = isLast && m.role === 'user'

            return (
              <Fragment key={i}>
                {m.role === 'user' ? (
                  <div
                    ref={isLastUser ? lastUserRef : null}
                    className={styles.bubble_row}
                  >
                    <div className={styles.bubble}>{m.content}</div>
                  </div>
                ) : (
                  <div className={styles.answer_field}>
                    <AssistantMessage
                      content={m.content}
                      isLast={isLast}
                      index={i}
                      typed={m.typed}
                    />
                  </div>
                )}
              </Fragment>
            )
          })}

          {/* Show thinking state & spacer if waiting for assistant */}
          {showThinking && (
            <>
              <div className={styles.answer_field}>
                <span className={styles.thinking}>Thinking</span>
              </div>
              <div style={{ height: '100vh' }} />
            </>
          )}

          {/* ← invisible bottom anchor */}
          <div
            ref={bottomRef}
            style={{
              height: 0,
              visibility: 'hidden',
              /* if you have a sticky header or textbox overlap: */
              scrollMarginBottom: '115px',
            }}
          />     
          <div className={styles.scroll_button_row}>
            <ScrollDownButton bottomRef={bottomRef} />
          </div>
        </div>
      </main>
      <Textbox />
    </>
  )
}