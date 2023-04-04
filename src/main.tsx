import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import AuthProvider from './context/AuthContext';
import ChatroomProvider from './context/ChatroomContext';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ChatroomProvider>
          <App />
        </ChatroomProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
