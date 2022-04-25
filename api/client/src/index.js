import React from 'react';
import * as ReactDOMClient from 'react-dom/client'
import App from './App';
import { ContextProvider } from './context/Context';

const rootElement = document.getElementById('root');

const root = ReactDOMClient.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);