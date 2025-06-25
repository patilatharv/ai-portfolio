import { createContext, useState } from 'react';
import { defaultAssistantMessage } from '@/helpers/defaultMessage';

export const ChatContext = createContext({
  messages: [],
  setMessages: () => {},
  loading: false,
  setLoading: () => {},
  clearMessages: () => {},
});

export function ChatProvider({ children }) {
  const initialMessages = [defaultAssistantMessage];

  const [messages, setMessages] = useState(initialMessages);
  const [loading, setLoading] = useState(false);

  const clearMessages = () => {
    setMessages(initialMessages);
  };

  return (
    <ChatContext.Provider
      value={{ messages, setMessages, loading, setLoading, clearMessages }}
    >
      {children}
    </ChatContext.Provider>
  );
}