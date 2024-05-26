import React from 'react';
import { Message } from '@/components/service/types';

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  return (
    <div className="chat-messages">
      {messages.map((msg) => (
        <div key={msg.id} className={`chat-message ${msg.sender}`}>
          {msg.sender === 'system' && (
            <img
              src="https://via.placeholder.com/40"
              alt="avatar"
              className="avatar"
            />
          )}
          <div className={`message-bubble ${msg.sender}`}>
            {msg.imageUrl ? (
              <img src={msg.imageUrl} alt="uploaded" className="uploaded-image" />
            ) : (
              <p className="text-sm">{msg.text}</p>
            )}
            <p className="text-xs text-right">{msg.timestamp.toLocaleTimeString()}</p>
          </div>
          {msg.sender === 'user' && (
            <img
              src="https://via.placeholder.com/40"
              alt="avatar"
              className="avatar"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
