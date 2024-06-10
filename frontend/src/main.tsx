import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes/AppRouter';
import { FileProvider } from './contexts/FileContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FileProvider>
      <AppRoutes />
    </FileProvider>
  </React.StrictMode>,
);
