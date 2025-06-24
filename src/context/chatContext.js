import { createContext, useState } from 'react';

export const ChatContext = createContext({
  messages: [],
  setMessages: () => {},
  loading: false,
  setLoading: () => {},
});

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([
    // welcome message is already "typed"
    {
      role: 'assistant',
      typed: false,
      content:
        "Hello! I’m Atharv's AI assistant. You can ask me about Atharv's portfolio.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  return (
    <ChatContext.Provider
      value={{ messages, setMessages, loading, setLoading }}
    >
      {children}
    </ChatContext.Provider>
  );
}