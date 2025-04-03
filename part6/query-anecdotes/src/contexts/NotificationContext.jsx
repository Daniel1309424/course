import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState('');

  const setNotification = (newMessage) => {
    setMessage(newMessage);
    setTimeout(() => setMessage(''), 5000);
  };

  return (
    <NotificationContext.Provider value={{ message, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
