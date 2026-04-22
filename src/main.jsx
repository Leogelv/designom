import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

/**
 * Сплэш из index.html: убираем после гидрации (двойной rAF) или по «Начать».
 * transitionend + таймаут — гарантированно снимаем узел.
 */
let splashHidden = false;
function hideAppSplash() {
  if (splashHidden) return;
  splashHidden = true;
  const el = document.getElementById('app-splash');
  if (!el) return;
  el.setAttribute('data-exit', 'true');
  const remove = () => {
    el.remove();
  };
  el.addEventListener('transitionend', remove, { once: true });
  setTimeout(remove, 600);
}

const splash = document.getElementById('app-splash');
const splashBtn = document.getElementById('app-splash__start');
splashBtn?.addEventListener('click', () => hideAppSplash(), { once: true });

requestAnimationFrame(() => {
  requestAnimationFrame(hideAppSplash);
});
