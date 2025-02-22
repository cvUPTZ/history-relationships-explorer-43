// main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error(
    'Failed to find the root element. Make sure there is a <div id="root"></div> in your HTML'
  );
}

const root = createRoot(container);

// No need for requestAnimationFrame here since createRoot handles this
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);