import ReactDOM from 'react-dom/client';
import App from './App';
import { NotificationProvider } from './contexts/NotificationContext';
import { UserProvider } from './contexts/UserContext'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider> 
    <NotificationProvider> 
      <App />
    </NotificationProvider>
  </UserProvider>
);
