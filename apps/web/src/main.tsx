import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Application } from '@/app/application';
import '@/styles/index.css';

const rootElement = document.getElementById('root');

if (rootElement === null) {
  throw new Error('The application root element is unavailable.');
}

createRoot(rootElement).render(
  <StrictMode>
    <Application />
  </StrictMode>,
);
