import { createContext, useState, useEffect } from 'react';
import { defaultAssistantMessage } from '@/helpers/defaultMessage';

export const ChatContext = createContext({
  messages: [],
  setMessages: () => {},
  loading: false,
  setLoading: () => {},
  clearMessages: () => {},
  question: '',
  setQuestion: () => {},
});

export function ChatProvider({ children }) {
  const sessionKey = 'chat-messages';
  const initialMessages = [defaultAssistantMessage];

  const [messages, setMessages] = useState(() => {
    // Load from sessionStorage, fallback to default message
    try {
      const saved = sessionStorage.getItem(sessionKey);
      return saved ? JSON.parse(saved) : initialMessages;
    } catch {
      return initialMessages;
    }
  });

  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState('');

  // Save to sessionStorage whenever messages change
  useEffect(() => {
    try {
      sessionStorage.setItem(sessionKey, JSON.stringify(messages));
    } catch (err) {
      console.error('Failed to save chat:', err);
    }
  }, [messages]);

  const clearMessages = () => {
    setMessages(initialMessages);
    sessionStorage.removeItem(sessionKey); // Clear persisted state too
  };

  return (
    <ChatContext.Provider
      value={{ messages, setMessages, loading, setLoading, clearMessages, question, setQuestion }}
    >
      {children}
    </ChatContext.Provider>
  );
}