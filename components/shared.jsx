// Mediora shared UI primitives

const { useState, useEffect, useRef } = React;

// ───────── Icons (stroke 1.75, rounded) ─────────
const Icon = ({ size = 20, fill = 'none', stroke = 'currentColor', sw = 1.75, children, vb = '0 0 24 24', style }) => (
  <svg width={size} height={size} viewBox={vb} fill={fill} stroke={stroke} strokeWidth={sw}
       strokeLinecap="round" strokeLinejoin="round" style={style}>
    {children}
  </svg>
);

const IconChevR = (p) => <Icon {...p}><path d="M9 6l6 6-6 6" /></Icon>;
const IconCheck = (p) => <Icon {...p} sw={2.2}><path d="M5 12l4 4 10-10" /></Icon>;
const IconPlus = (p) => <Icon {...p} sw={2}><path d="M12 5v14M5 12h14" /></Icon>;
const IconPlay = (p) => <Icon {...p} fill="currentColor" stroke="none"><path d="M8 5.5v13L19 12 8 5.5z" /></Icon>;
const IconStar = (p) => <Icon {...p}>
  <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8-4.3-4.1 5.9-.9L12 3z" />
</Icon>;
const IconLeaf = (p) => <Icon {...p}>
  <path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14z" />
  <path d="M5 19c3-6 7-9 12-10" />
</Icon>;
const IconSun = (p) => <Icon {...p}>
  <circle cx="12" cy="12" r="4" />
  <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.5 5.5l1.5 1.5M17 17l1.5 1.5M5.5 18.5L7 17M17 7l1.5-1.5" />
</Icon>;
const IconMoon = (p) => <Icon {...p}>
  <path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z" />
</Icon>;
const IconBook2 = (p) => <Icon {...p}>
  <path d="M4 5.5a2 2 0 012-2h4a3 3 0 013 3V20a2 2 0 00-2-2H4v-12.5zM20 5.5a2 2 0 00-2-2h-4a3 3 0 00-3 3V20a2 2 0 012-2h7v-12.5z" />
</Icon>;

// Tab bar icons — filled when active
const TabIconHome = ({active}) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.5 11L12 4l8.5 7v8.5a1 1 0 01-1 1H15V14h-6v6.5H4.5a1 1 0 01-1-1V11z" fillOpacity={active ? 0.14 : 0}/>
  </svg>
);
const TabIconDoc = ({active}) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6.5 3.5h8L19 8v11a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 015 19V5a1.5 1.5 0 011.5-1.5z" fillOpacity={active ? 0.14 : 0}/>
    <path d="M14 3.5V8h5" />
    <path d="M8.5 12.5h7M8.5 16h5" />
  </svg>
);
const TabIconChat = ({active}) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6.5a3 3 0 013-3h10a3 3 0 013 3v7a3 3 0 01-3 3h-5l-4 3.5v-3.5H7a3 3 0 01-3-3v-7z" fillOpacity={active ? 0.14 : 0}/>
  </svg>
);
const TabIconBook = ({active}) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 4.5h5a3 3 0 013 3V20a2.5 2.5 0 00-2.5-2.5H5v-13z" fillOpacity={active ? 0.14 : 0}/>
    <path d="M19 4.5h-5a3 3 0 00-3 3V20a2.5 2.5 0 012.5-2.5H19v-13z" fillOpacity={active ? 0.14 : 0}/>
  </svg>
);
const TabIconUser = ({active}) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="3.5" fillOpacity={active ? 0.14 : 0}/>
    <path d="M4.5 20.5c1.6-4 4.3-6 7.5-6s5.9 2 7.5 6" fillOpacity={active ? 0.14 : 0}/>
  </svg>
);

// ───────── BottomNav ─────────
function BottomNav({ active, onChange }) {
  const tabs = [
    { id: 'home', label: 'Главная', Icon: TabIconHome },
    { id: 'docs', label: 'Документы', Icon: TabIconDoc },
    { id: 'chat', label: 'Чат', Icon: TabIconChat },
    { id: 'lib',  label: 'Библиотека', Icon: TabIconBook },
    { id: 'me',   label: 'Профиль', Icon: TabIconUser },
  ];
  return (
    <nav className="bottom-nav">
      {tabs.map(t => (
        <button key={t.id}
          className={'bottom-nav-item ' + (active === t.id ? 'active' : '')}
          onClick={() => onChange(t.id)}>
          <t.Icon active={active === t.id} />
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  );
}

// ───────── ProgressRing ─────────
function ProgressRing({ pct = 52, size = 40, stroke = 4, color = 'var(--primary-500)', track = 'var(--primary-100)' }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - pct / 100);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off}
        transform={`rotate(-90 ${size/2} ${size/2})`} />
    </svg>
  );
}

// ───────── AI Orb (lg default) ─────────
function AIOrb({ size = 96, animated = true }) {
  return <div className={'ai-orb ' + (animated ? 'animated' : '')} style={{ width: size, height: size }} aria-hidden="true" />;
}

Object.assign(window, {
  Icon, IconChevR, IconCheck, IconPlus, IconPlay,
  IconStar, IconLeaf, IconSun, IconMoon, IconBook2,
  TabIconHome, TabIconDoc, TabIconChat, TabIconBook, TabIconUser,
  BottomNav, ProgressRing, AIOrb,
});
