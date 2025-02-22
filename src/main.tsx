
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Wait for DOM to be ready
const init = () => {
  const container = document.getElementById('root');

  if (!container) {
    throw new Error(
      'Failed to find the root element. Make sure there is a <div id="root"></div> in your HTML'
    );
  }

  try {
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    console.error('Error initializing app:', error);
  }
};

// Ensure DOM is ready before mounting
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
