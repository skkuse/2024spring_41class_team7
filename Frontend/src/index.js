import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// React 18의 createRoot API를 사용하여 root를 생성합니다.
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
