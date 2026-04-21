/* eslint-disable */
// ОМ ЗДОРОВЬЕ — atoms (Живой свет)

import React from 'react';

export const Icon = ({ name, size = 18, color = 'currentColor', stroke = 1.6 }) => {
  const s = { width: size, height: size, fill: 'none', stroke: color, strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round', display: 'block' };
  const paths = {
    home:    <><path d="M4 11l8-7 8 7"/><path d="M6 10v9a1 1 0 001 1h10a1 1 0 001-1v-9"/></>,
    journal: <><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></>,
    chat:    <><path d="M4 18v-8a4 4 0 014-4h8a4 4 0 014 4v4a4 4 0 01-4 4h-6l-4 3v-3z"/></>,
    book:    <><path d="M5 4h10a3 3 0 013 3v13H8a3 3 0 00-3 3V4z"/><path d="M5 20a3 3 0 013-3h10"/></>,
    user:    <><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></>,
    arrow:   <><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></>,
    arrowdn: <><path d="M12 5v14"/><path d="M6 13l6 6 6-6"/></>,
    plus:    <><path d="M12 5v14M5 12h14"/></>,
    check:   <path d="M4 12l5 5L20 6"/>,
    close:   <><path d="M6 6l12 12M18 6L6 18"/></>,
    chev:    <path d="M6 9l6 6 6-6"/>,
    dots:    <><circle cx="5" cy="12" r="1.6" fill={color} stroke="none"/><circle cx="12" cy="12" r="1.6" fill={color} stroke="none"/><circle cx="19" cy="12" r="1.6" fill={color} stroke="none"/></>,
    moon:    <path d="M20 14.5A8.5 8.5 0 1110 3.5a7 7 0 0010 11z"/>,
    sun:     <><circle cx="12" cy="12" r="3.5"/><path d="M12 3v2M12 19v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M3 12h2M19 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
    leaf:    <><path d="M20 4c-7 0-14 5-14 13 0 1 0 2 1 3"/><path d="M20 4c0 10-5 14-13 14"/></>,
    play:    <path d="M7 4l13 8-13 8V4z" fill={color}/>,
    chart:   <><path d="M4 19h16"/><path d="M6 15l4-5 4 3 4-7"/></>,
    flame:   <path d="M12 3c0 3-4 5-4 9a4 4 0 008 0c0-2-1-3-2-4 0 2-1 3-2 3 0-3 0-5 0-8z"/>,
    spark:   <><path d="M12 4v4M12 16v4M4 12h4M16 12h4"/><path d="M7 7l2.5 2.5M14.5 14.5L17 17M7 17l2.5-2.5M14.5 9.5L17 7"/></>,
    pulse:   <path d="M3 12h4l2-5 4 10 2-5h6"/>,
    drop:    <path d="M12 3s6 6 6 11a6 6 0 01-12 0c0-5 6-11 6-11z"/>,
    scale:   <><path d="M12 3v18"/><path d="M8 7h8M8 12h8M8 17h8"/></>,
    search:  <><circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/></>,
    bell:    <><path d="M6 16V11a6 6 0 0112 0v5l2 2H4l2-2z"/><path d="M10 20a2 2 0 004 0"/></>,
    filter:  <path d="M4 5h16l-6 8v6l-4-2v-4L4 5z"/>,
    camera:  <><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h3.2L9 3h6l2.8 3H21a2 2 0 012 2v11z"/><circle cx="12" cy="13" r="4"/></>,
    heart:   <path d="M12 21s-7.5-4.35-7.5-10A4.5 4.5 0 0112 6a4.5 4.5 0 017.5 5c0 5.65-7.5 10-7.5 10z"/>,
    arrowLeft: <><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></>,
  };
  return <svg viewBox="0 0 24 24" style={s}>{paths[name]}</svg>;
};

export const StatusBar = ({ dark = false }) => {
  const c = dark ? '#F4EEE4' : '#14120F';
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '14px 28px 4px',
      fontFamily: 'var(--font-ui)',
      fontWeight: 600, fontSize: 15, color: c, letterSpacing: -0.2,
    }}>
      <span>9:41</span>
      <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <svg width="17" height="11" viewBox="0 0 17 11"><g fill={c}>
          <rect x="0" y="7" width="3" height="4" rx="0.6"/>
          <rect x="4.5" y="5" width="3" height="6" rx="0.6"/>
          <rect x="9" y="2.5" width="3" height="8.5" rx="0.6"/>
          <rect x="13.5" y="0" width="3" height="11" rx="0.6"/>
        </g></svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none" stroke={c} strokeWidth="1.3"><path d="M1 4a9 9 0 0113 0M3 6.5a6 6 0 019 0M5 9a3 3 0 015 0"/><circle cx="7.5" cy="10" r="0.8" fill={c} stroke="none"/></svg>
        <svg width="24" height="11" viewBox="0 0 24 11"><rect x="0.5" y="0.5" width="20" height="10" rx="2.5" fill="none" stroke={c} strokeOpacity="0.5"/><rect x="2" y="2" width="17" height="7" rx="1.3" fill={c}/><rect x="21.5" y="3.5" width="1.5" height="4" rx="0.7" fill={c} fillOpacity="0.5"/></svg>
      </span>
    </div>
  );
};

// Liquid blob — subject-matter imagery (не иконка, а объект)
export const LiquidBlob = ({ tone = 'amber', size = 140 }) => {
  const palette = {
    amber:    { a:'#E4D9FF', b:'#8B6CFF', c:'#3D28A8', shine:'#FAF5FF' },
    sage:     { a:'#E6F0DB', b:'#9ABF8A', c:'#4B6B3F', shine:'#F7FBF0' },
    lavender: { a:'#ECE6F5', b:'#9A8CC8', c:'#433477', shine:'#F6F0FC' },
    ink:      { a:'#4A423B', b:'#2B2621', c:'#14120F', shine:'#FFE6D4' },
  }[tone] || { a:'#E4D9FF', b:'#8B6CFF', c:'#3D28A8', shine:'#FAF5FF' };
  const gid = `blob-${tone}-${Math.random().toString(36).slice(2,7)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 140 140" className="om-float">
      <defs>
        <radialGradient id={gid} cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor={palette.a}/>
          <stop offset="45%" stopColor={palette.b}/>
          <stop offset="100%" stopColor={palette.c}/>
        </radialGradient>
        <radialGradient id={`${gid}-shine`} cx="30%" cy="22%" r="25%">
          <stop offset="0%" stopColor={palette.shine} stopOpacity="0.95"/>
          <stop offset="100%" stopColor={palette.shine} stopOpacity="0"/>
        </radialGradient>
      </defs>
      {/* blob shape */}
      <path d="M70,12 C96,12 120,28 124,58 C128,86 110,112 86,122 C62,132 34,124 20,100 C8,78 14,46 34,28 C46,16 58,12 70,12 Z"
        fill={`url(#${gid})`} />
      <ellipse cx="50" cy="42" rx="20" ry="12" fill={`url(#${gid}-shine)`} transform="rotate(-20 50 42)"/>
      {/* bottom glow line */}
      <path d="M28,108 Q70,124 112,104" fill="none" stroke={palette.a} strokeOpacity="0.4" strokeWidth="1.2"/>
    </svg>
  );
};

// Score bead (капля-награда)
export const Bead = ({ n = 20 }) => (
  <span className="bead">+{n}</span>
);

// Нижняя навигация: одна плашка на весь вьюпорт, не скроллится с контентом (фикс на мобилках)
export const TabBar = ({ active = 'home', onTab }) => {
  const tabs = [
    { id: 'home', icon: 'home' },
    { id: 'journal', icon: 'journal' },
    { id: 'chat', icon: 'chat' },
    { id: 'library', icon: 'book' },
    { id: 'me', icon: 'user' },
  ];
  return (
    <nav
      aria-label="Основная навигация"
      style={{
        position: 'fixed',
        left: 'max(14px, env(safe-area-inset-left, 0px))',
        right: 'max(14px, env(safe-area-inset-right, 0px))',
        bottom: 'max(14px, env(safe-area-inset-bottom, 0px))',
        height: 64,
        borderRadius: 999,
        background: 'rgba(20,18,15,0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '0.5px solid rgba(255,255,255,0.05)',
        boxShadow: '0 1px 0 rgba(255,255,255,0.06) inset, 0 14px 32px -10px rgba(0,0,0,0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 10px',
        zIndex: 100,
        pointerEvents: 'auto',
      }}
    >
      {tabs.map(t => {
        const on = t.id === active;
        return (
          <button key={t.id} type="button" onClick={() => onTab && onTab(t.id)} style={{
            border: 'none', cursor: 'pointer',
            width: 44, height: 44, borderRadius: 999, display: 'grid', placeItems: 'center',
            background: on ? 'linear-gradient(180deg, var(--amber-hi), var(--amber))' : 'transparent',
            color: on ? '#fff' : 'rgba(240,236,255,0.7)',
            boxShadow: on
              ? 'inset 0 1px 0 rgba(255,255,255,0.35), 0 8px 18px -6px var(--accent-glow-strong)'
              : 'none',
            transition: 'all .2s',
          }}>
            <Icon name={t.icon} size={20} stroke={on ? 2 : 1.7} />
          </button>
        );
      })}
    </nav>
  );
};

// Top bar — Закрыть + collapse + ...
export const TopBar = ({ onClose, dark = false }) => {
  const ink = dark ? '#F4EEE4' : '#14120F';
  const chip = dark ? 'rgba(255,255,255,0.08)' : 'rgba(20,18,15,0.04)';
  const border = dark ? 'rgba(255,255,255,0.1)' : 'rgba(20,18,15,0.08)';
  return (
    <div style={{
      display: 'flex',
      justifyContent: onClose ? 'space-between' : 'flex-end',
      padding: '6px 18px 0',
    }}>
      {onClose ? (
        <button type="button" onClick={onClose} style={{
          height: 36, padding: '0 14px 0 10px', borderRadius: 999,
          background: chip, border: `0.5px solid ${border}`, color: ink,
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, fontWeight: 500, cursor: 'pointer',
        }}>
          <Icon name="close" size={14} color={ink} stroke={2} />
          Закрыть
        </button>
      ) : null}
      <div style={{ display: 'flex', gap: 8 }}>
        {['chev', 'dots'].map(n => (
          <button key={n} type="button" style={{
            width: 36, height: 36, borderRadius: 999,
            background: chip, border: `0.5px solid ${border}`, color: ink,
            display: 'grid', placeItems: 'center', cursor: 'pointer',
          }}>
            <Icon name={n} size={16} color={ink} stroke={2} />
          </button>
        ))}
      </div>
    </div>
  );
};

// Inline IconChip — small round tonal chip
export const IconChip = ({ tone = 'amber', icon, size = 32 }) => {
  const pal = {
    amber:    { bg:'#E8E4FF', ink:'#2E1866' },
    sage:     { bg:'#DDE8D1', ink:'#2B4A2A' },
    lavender: { bg:'#E4DEF1', ink:'#30274A' },
    sand:     { bg:'#E8DEC4', ink:'#4A3E22' },
    ink:      { bg:'#14120F', ink:'#F4EEE4' },
  }[tone];
  return (
    <span style={{
      width: size, height: size, borderRadius: size * 0.35,
      background: pal.bg, color: pal.ink,
      display: 'grid', placeItems: 'center',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)',
      flexShrink: 0,
    }}>
      <Icon name={icon} size={size * 0.5} color={pal.ink} stroke={2} />
    </span>
  );
};
