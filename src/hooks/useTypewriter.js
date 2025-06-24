import { useState, useEffect } from 'react';

/**
 * A hook that gradually “types out” `text` at the given `speed` (ms per char).
 * Returns the current substring.
 */
export function useTypewriter(text, speed) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    // reset when text changes
    setDisplayed('');
    let idx = 0;
    const iv = setInterval(() => {
      setDisplayed(text.slice(0, idx + 1));
      idx += 1;
      if (idx >= text.length) {
        clearInterval(iv);
      }
    }, speed);
    return () => clearInterval(iv);
  }, [text, speed]);

  return displayed;
}