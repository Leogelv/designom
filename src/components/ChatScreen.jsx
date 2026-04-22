import React, { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconChevL, IconChevR, IconMic, IconX } from './shared.jsx';
import { withViewTransition } from '../viewTransition.js';

const STEPS = [
  'Анализируем описание',
  'Проверяем возможные причины',
  'Подбираем рекомендации',
];

/**
 * Экран «Чат» — анализ симптомов: ввод (голос / текст) и состояние ожидания ИИ.
 * Стили: токены Mediora, фон --bg-elevated, градиент --grad-brand.
 */
export default function ChatScreen() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('input'); // 'input' | 'analyzing'
  const [message, setMessage] = useState('');
  const [activeLine, setActiveLine] = useState(0);

  const goHome = useCallback(() => {
    withViewTransition(() => navigate('/'));
  }, [navigate]);

  const startAnalysis = useCallback(() => {
    withViewTransition(() => {
      setPhase('analyzing');
      setActiveLine(0);
    });
  }, []);

  const backToInput = useCallback(() => {
    withViewTransition(() => setPhase('input'));
  }, []);

  useEffect(() => {
    if (phase !== 'analyzing') return undefined;
    const id = setInterval(() => {
      setActiveLine((n) => (n < STEPS.length - 1 ? n + 1 : n));
    }, 1400);
    return () => clearInterval(id);
  }, [phase]);

  const chatRootRef = useRef(null);
  // WebKit: при F5/полном reload filter:drop-shadow первым кадром кропается по прямоугольнику;
  // при заходе с таба лишняя отрисовка и всё ОК. Два rAF + read layout — тот же «второй» кадр.
  useLayoutEffect(() => {
    const root = chatRootRef.current;
    if (!root) return undefined;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        root
          .querySelectorAll('.chat-symptom__mic-blob, .sa-orb__core-blob')
          .forEach((n) => {
            void n.getBoundingClientRect();
          });
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [phase]);

  return (
    <div ref={chatRootRef} className="screen chat-symptom">
      {phase === 'input' ? (
        <ChatHeader title="Анализ симптомов" left={<HeaderIconButton label="Закрыть" onClick={goHome} icon="x" />} />
      ) : (
        <ChatHeader
          title="Анализ симптомов"
          left={<HeaderIconButton label="Назад" onClick={backToInput} icon="back" />}
        />
      )}

      <div className="chat-symptom__frame">
        <div className="chat-symptom__phase vt-chat-surface">
          {phase === 'input' ? (
            <InputPanel message={message} setMessage={setMessage} onVoice={startAnalysis} onSend={startAnalysis} />
          ) : (
            <AnalyzingPanel activeLine={activeLine} />
          )}
        </div>
      </div>
    </div>
  );
}

/** Шапка: сетка 40 / 1fr / 40 — заголовок по центру */
function ChatHeader({ title, left }) {
  return (
    <header className="chat-symptom__header">
      <div className="chat-symptom__header-side">{left}</div>
      <h1 className="chat-symptom__title t-title-lg c-primary">{title}</h1>
      <div className="chat-symptom__header-side" aria-hidden />
    </header>
  );
}

function HeaderIconButton({ label, onClick, icon }) {
  return (
    <button type="button" className="chat-symptom__icon-btn" onClick={onClick} aria-label={label}>
      {icon === 'x' ? <IconX size={20} sw={2} /> : <IconChevL size={22} sw={2} />}
    </button>
  );
}

/** Центр: большая кнопка микрофона + подсказка; снизу — поле ввода */
function InputPanel({ message, setMessage, onVoice, onSend }) {
  const send = () => {
    if (!message.trim()) return;
    onSend();
  };

  return (
    <>
      <div className="chat-symptom__center">
        <button type="button" className="chat-symptom__mic vt-chat-mic-orb" onClick={onVoice} aria-label="Голосовой ввод">
          <span className="chat-symptom__mic-blob" aria-hidden />
          <IconMic size={44} style={{ color: 'white' }} />
        </button>
        <p className="t-body-md c-secondary chat-symptom__hint">
          Опишите, что вас беспокоит голосом или текстом
        </p>
      </div>

      <div className="chat-symptom__composer">
        <div className="chat-symptom__composer-inner">
          <span className="t-label-sm c-tertiary chat-symptom__composer-label">Или введите текст</span>
          <div className="chat-symptom__composer-row">
            <textarea
              className="chat-symptom__input t-body-md"
              rows={2}
              placeholder="Введите сообщение..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
            />
            <button
              type="button"
              className="chat-symptom__send"
              onClick={send}
              disabled={!message.trim()}
              aria-label="Отправить"
            >
              <IconChevR size={18} sw={2.2} style={{ color: 'white' }} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/** Пульсирующий орб + пошаговый список + дисклеймер */
function AnalyzingPanel({ activeLine }) {
  return (
    <div className="chat-symptom__analyze">
      <div className="chat-symptom__analyze-main">
        <div className="sa-orb" aria-hidden>
          <span className="sa-orb__ring" />
          <span className="sa-orb__ring" />
          <span className="sa-orb__ring" />
          <div className="sa-orb__core vt-chat-mic-orb">
            <span className="sa-orb__core-blob" aria-hidden />
            <IconMic size={56} style={{ color: 'white', opacity: 0.95 }} />
          </div>
        </div>

        <p className="t-h2 c-primary chat-symptom__analyze-head">ИИ анализирует ваши симптомы</p>

        <ul className="chat-symptom__steps">
          {STEPS.map((label, i) => (
            <li
              key={label}
              className={'chat-symptom__step' + (i <= activeLine ? ' is-active' : '')}
            >
              <span className="chat-symptom__step-mark" aria-hidden>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M5 9l2.5 2.5L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="t-body-md">{label}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="t-body-sm c-tertiary chat-symptom__footer-hint">Это может занять до 30 секунд</p>
    </div>
  );
}
