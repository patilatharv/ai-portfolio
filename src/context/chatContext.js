import { createContext, useState } from 'react';

// ① Define the shape of your context
export const ChatContext = createContext({
  messages: [],
  setMessages: () => {},
  loading: false,
  setLoading: () => {},
});

// ② Provide messages/loading state here
export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hello! I’m Atharv's AI assistant. You can ask me about Atharv's portfolio.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  return (
    <ChatContext.Provider value={{ messages, setMessages, loading, setLoading }}>
      {children}
    </ChatContext.Provider>
  );
}