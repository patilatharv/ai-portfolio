'use client'

import { useEffect, useState } from 'react'
import styles from '@/styles/scrollDownButton.module.css'
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';

export default function ScrollDownButton({ bottomRef }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Grab the real scrolling pane
    const container = document.querySelector('.main-panel')
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      // Are we *not* within 10px of the bottom?
      const atBottom = scrollHeight - scrollTop - clientHeight < 10
      setShow(!atBottom)
    }

    container.addEventListener('scroll', handleScroll)
    // Check once right away
    handleScroll()

    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  if (!show) return null

  const scrollToBottom = () => {
    // Use your existing bottom anchor
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }

  return (
    <button
      className={styles.scroll_button}
      onClick={scrollToBottom}
      aria-label="Scroll to bottom"
    >
      <ArrowDownwardRoundedIcon fontSize='small'/>
    </button>
  )
}