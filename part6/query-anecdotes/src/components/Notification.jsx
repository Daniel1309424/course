import React from 'react';
import { useNotification } from '../contexts/NotificationContext';

const Notification = () => {
  const { message } = useNotification();

  if (!message) return null;

  return (
    <div style={{ border: '1px solid green', padding: '10px', marginBottom: '10px' }}>
      {message}
    </div>
  );
};

export default Notification;
