import { App } from './app';

import './global.css';

window.onload = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('No content in document!');
  const app = new App(rootElement);
  app.start();
};
