import styles from '@/styles/textbox.module.css'

export default function formatAnswer(answer) {
    const parts = answer.split(/\*\*(.*?)\*\*/g); // Split on **Section Title**
  
    return parts.map((part, i) => {
        if (part.trim() === '---') {
            return <hr key={i} style={{ border: '1px solid #444', margin: '1.5rem 0' }} />;
        }
        if (i % 2 === 1) {
            return (
            <h3 key={i} className={styles.answer_heading}>{part}</h3>
            );
        } else {
            return part
            .split(/\n\n+/)
            .filter(p => p.trim())
            .map((para, j) => (
                <p key={`${i}-${j}`} className={styles.answer_paragraph}>
                {para.trim()}
                </p>
            ));
        }
    });
  }