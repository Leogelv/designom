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
 * Сплэш: снимаем только по кнопке «Начать» (приложение под ним уже смонтировано).
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

document.getElementById('app-splash__start')?.addEventListener('click', () => hideAppSplash(), { once: true });
