import { useState, useEffect, useRef } from 'react';

/**
 * A hook that gradually “types out” `text` at the given `speed` (ms per char).
 * Returns the current substring.
 */
export function useTypewriter(text, speed) {
  const [displayed, setDisplayed] = useState('');
  const intervalRef = useRef(null);

  useEffect(() => {
    setDisplayed('');
    let idx = 0;

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (idx < text.length) {
        setDisplayed(text.slice(0, idx + 1));
        idx += 1;
      } else {
        clearInterval(intervalRef.current);
      }
    }, speed);

    return () => clearInterval(intervalRef.current);
  }, [text, speed]);

  return displayed;
}