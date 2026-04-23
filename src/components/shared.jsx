import React, { useLayoutEffect, useRef, useState, useCallback, useEffect } from 'react';
import { Home, FileText, MessageCircle, BookOpen, UserRound } from 'lucide-react';
import { withViewTransition } from '../viewTransition.js';

// ───────── Icons (stroke 1.75, rounded) ─────────
export const Icon = ({
  size = 20,
  fill = 'none',
  stroke = 'currentColor',
  sw = 1.75,
  children,
  vb = '0 0 24 24',
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox={vb}
    fill={fill}
    stroke={stroke}
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    {children}
  </svg>
);

export const IconChevR = (p) => (
  <Icon {...p}>
    <path d="M9 6l6 6-6 6" />
  </Icon>
);
/** Назад (стрелка влево) — шапка экрана анализа */
export const IconChevL = (p) => (
  <Icon {...p}>
    <path d="M15 6l-6 6 6 6" />
  </Icon>
);
/** Закрыть */
export const IconX = (p) => (
  <Icon {...p}>
    <path d="M5 5l14 14M19 5L5 19" />
  </Icon>
);
/** Микрофон — ввод по голосу */
export const IconMic = ({ size = 24, style, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    {...rest}
  >
    <rect x="9" y="2" width="6" height="11" rx="3" />
    <path d="M5 10a7 7 0 0 0 14 0" />
    <path d="M12 19v3" />
  </svg>
);
export const IconCheck = (p) => (
  <Icon {...p} sw={2.2}>
    <path d="M5 12l4 4 10-10" />
  </Icon>
);
export const IconPlus = (p) => (
  <Icon {...p} sw={2}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);
export const IconPlay = (p) => (
  <Icon {...p} fill="currentColor" stroke="none">
    <path d="M8 5.5v13L19 12 8 5.5z" />
  </Icon>
);
export const IconStar = (p) => (
  <Icon {...p}>
    <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8-4.3-4.1 5.9-.9L12 3z" />
  </Icon>
);
export const IconLeaf = (p) => (
  <Icon {...p}>
    <path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14z" />
    <path d="M5 19c3-6 7-9 12-10" />
  </Icon>
);
export const IconSun = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.5 5.5l1.5 1.5M17 17l1.5 1.5M5.5 18.5L7 17M17 7l1.5-1.5" />
  </Icon>
);
export const IconMoon = (p) => (
  <Icon {...p}>
    <path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z" />
  </Icon>
);
export const IconBook2 = (p) => (
  <Icon {...p}>
    <path d="M4 5.5a2 2 0 012-2h4a3 3 0 013 3V20a2 2 0 00-2-2H4v-12.5zM20 5.5a2 2 0 00-2-2h-4a3 3 0 00-3 3V20a2 2 0 012-2h7v-12.5z" />
  </Icon>
);

/** Конфиг таббара: Lucide + маршруты (иконки — обводка, active толще) */
const BOTTOM_TABS = [
  { id: 'home', path: '/', label: 'Главная', Lucide: Home },
  { id: 'docs', path: '/docs', label: 'Документы', Lucide: FileText },
  { id: 'chat', path: '/chat', label: 'Чат', Lucide: MessageCircle },
  { id: 'lib', path: '/library', label: 'Библиотека', Lucide: BookOpen },
  { id: 'me', path: '/profile', label: 'Профиль', Lucide: UserRound },
];

/**
 * Нижняя навигация: Lucide; подсветка (плашка) смещает width/translate — анимация в CSS.
 * Смена маршрута: document.startViewTransition + flushSync (если нет reduce-motion),
 * чтобы View Transitions согласовывали снимок с обновлением React.
 */
export function BottomNav({ active, onNavigate }) {
  const navRef = useRef(null);
  const itemRefs = useRef([]);
  const [pill, setPill] = useState({ x: 0, w: 0, ready: false });

  const updatePill = useCallback(() => {
    const el = navRef.current;
    if (!el) return;
    const idx = BOTTOM_TABS.findIndex((t) => t.id === active);
    if (idx < 0) return;
    const btn = itemRefs.current[idx];
    if (!btn) return;
    const n = el.getBoundingClientRect();
    const b = btn.getBoundingClientRect();
    setPill({ x: b.left - n.left, w: b.width, ready: true });
  }, [active]);

  useLayoutEffect(() => {
    updatePill();
  }, [updatePill, active]);

  useEffect(() => {
    const el = navRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => updatePill());
    ro.observe(el);
    const onWin = () => updatePill();
    window.addEventListener('resize', onWin);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', onWin);
    };
  }, [updatePill]);

  const go = (path) => {
    withViewTransition(() => onNavigate(path));
  };

  return (
    <nav className="bottom-nav" ref={navRef}>
      <div
        className="bottom-nav__pill"
        aria-hidden
        style={{
          width: Math.max(0, pill.w),
          transform: `translate3d(${pill.x}px,0,0)`,
          opacity: pill.ready ? 1 : 0,
        }}
      />
      {BOTTOM_TABS.map((t, i) => {
        const isAct = active === t.id;
        const L = t.Lucide;
        return (
          <button
            key={t.id}
            type="button"
            className={'bottom-nav-item ' + (isAct ? 'active' : '')}
            ref={(n) => {
              itemRefs.current[i] = n;
            }}
            onClick={() => go(t.path)}
          >
            <L
              className="bottom-nav-item__lucide"
              size={24}
              strokeWidth={isAct ? 2.15 : 1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <span>{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export function ProgressRing({
  pct = 52,
  size = 40,
  stroke = 4,
  color = 'var(--primary-500)',
  track = 'var(--primary-100)',
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - pct / 100);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={off}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}

/** AI Orb: заливка — оригинальная текстура из /uploads (см. .ai-orb__fill) */
export function AIOrb({ size = 96, animated = true }) {
  return (
    <div
      className={'ai-orb ' + (animated ? 'animated' : '')}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div className="ai-orb__fill" />
    </div>
  );
}

const MEDIT_CIRCLE_SRC = '/uploads/medblob2.png';

/**
 * Иллюстрация «Медитация» в карточке: PNG в круге (см. .medit-blob, .medit-blob__img).
 */
export function MeditationBlob({ size = 58 }) {
  return (
    <div className="medit-blob" style={{ width: size, height: size }} aria-hidden>
      <img className="medit-blob__img" src={MEDIT_CIRCLE_SRC} alt="" draggable={false} />
    </div>
  );
}

/** Реэкспорт из UI-комплекта (для совместимости старых импортов) */
export { default as PillAction } from './ui/PillAction.jsx';
