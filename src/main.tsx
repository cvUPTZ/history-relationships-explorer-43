
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error(
    'Failed to find the root element. Make sure there is a <div id="root"></div> in your HTML'
  );
}

const root = createRoot(container);

// Wrap in requestAnimationFrame to ensure DOM is ready
requestAnimationFrame(() => {
  root.render(
    <App />
  );
});
