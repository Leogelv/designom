import React, { useState } from 'react';
import { IconChevR } from './shared.jsx';

const HERO_BG = '/uploads/grad16_9.png';

export default function LibraryScreen({ onOpen }) {
  const [tab, setTab] = useState('content');

  const items = [
    { id: 1, thumb: 'g1', title: 'Как сон влияет на организм и возраст', dur: '10 минут' },
    { id: 2, thumb: 'g2', title: 'Как сон влияет на организм и возраст', dur: '10 минут' },
    { id: 3, thumb: 'g3', title: 'Как сон влияет на организм и возраст', dur: '10 минут' },
    { id: 4, thumb: 'g4', title: 'Как сон влияет на организм и возраст', dur: '10 минут' },
    { id: 5, thumb: 'g5', title: 'Как сон влияет на организм и возраст', dur: '10 минут' },
  ];

  return (
    <div className="screen">
      <div className="screen-scroll">
        <h1 className="t-h1 c-primary screen-title">Библиотека</h1>

        <div
          className="hero-card hero-card--image"
          onClick={() => onOpen('material')}
          style={{ aspectRatio: '16 / 10' }}
        >
          <div
            className="hero-card__media"
            style={{ backgroundImage: `url(${HERO_BG})` }}
            aria-hidden
          />
          <div className="hero-card__scrim" aria-hidden />
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <div
              className="tag"
              style={{
                alignSelf: 'flex-start',
                background: 'rgba(255,255,255,0.28)',
                color: 'white',
                backdropFilter: 'blur(8px)',
              }}
            >
              Материал дня
            </div>
            <div>
              <div className="t-h3 c-inverse" style={{ maxWidth: '85%', fontWeight: 700 }}>
                Как питание влияет
                <br />
                на организм и возраст
              </div>
              <div className="flex items-center justify-between" style={{ marginTop: 'var(--sp-3)' }}>
                <div className="t-body-sm c-inverse" style={{ opacity: 0.92 }}>
                  6 минут
                </div>
                <button
                  type="button"
                  className="icon-btn"
                  aria-label="Открыть"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpen('material');
                  }}
                  style={{ background: 'white', color: 'var(--primary-600)' }}
                >
                  <IconChevR size={16} sw={2.2} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="section-gap-sm">
          <div className="segmented">
            <button type="button" className={tab === 'practice' ? 'active' : ''} onClick={() => setTab('practice')}>
              Практики
            </button>
            <button type="button" className={tab === 'breath' ? 'active' : ''} onClick={() => setTab('breath')}>
              Дыхание
            </button>
            <button type="button" className={tab === 'content' ? 'active' : ''} onClick={() => setTab('content')}>
              Контент
            </button>
          </div>
        </div>

        <div className="stack-3" style={{ marginTop: 'var(--sp-4)' }}>
          {items.map((it) => (
            <div key={it.id} className="action-row" onClick={() => onOpen('article-' + it.id)}>
              <LibThumb kind={it.thumb} />
              <div className="row-body">
                <div className="t-title-md c-primary">{it.title}</div>
                <div className="t-label-md c-tertiary" style={{ marginTop: 2 }}>
                  {it.dur}
                </div>
              </div>
              <IconChevR size={16} stroke="var(--text-tertiary)" sw={2} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LibThumb({ kind }) {
  const common = { width: 52, height: 52, style: { borderRadius: 14, flexShrink: 0 } };
  const v = {
    g1: (
      <svg viewBox="0 0 52 52" {...common}>
        <defs>
          <radialGradient id="lt1" cx="42%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFF2F8" />
            <stop offset="55%" stopColor="#F8DAE6" />
            <stop offset="100%" stopColor="#D9BCF0" />
          </radialGradient>
        </defs>
        <rect width="52" height="52" rx="14" fill="url(#lt1)" />
        <circle cx="33" cy="20" r="9" fill="#fff" opacity="0.65" />
        <circle cx="20" cy="32" r="6" fill="#fff" opacity="0.5" />
      </svg>
    ),
    g2: (
      <svg viewBox="0 0 52 52" {...common}>
        <defs>
          <linearGradient id="lt2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E9D4F5" />
            <stop offset="100%" stopColor="#B297E8" />
          </linearGradient>
        </defs>
        <rect width="52" height="52" rx="14" fill="url(#lt2)" />
        <path d="M4 42 Q18 30 26 36 T 48 32 L 48 52 L4 52Z" fill="#fff" opacity="0.35" />
        <circle cx="38" cy="16" r="6" fill="#fff" opacity="0.55" />
      </svg>
    ),
    g3: (
      <svg viewBox="0 0 52 52" {...common}>
        <defs>
          <linearGradient id="lt3" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#F2CFDD" />
            <stop offset="100%" stopColor="#B297E8" />
          </linearGradient>
        </defs>
        <rect width="52" height="52" rx="14" fill="url(#lt3)" />
        <path
          d="M6 38 Q18 20 28 32 T 48 22"
          stroke="#fff"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.75"
        />
      </svg>
    ),
    g4: (
      <svg viewBox="0 0 52 52" {...common}>
        <defs>
          <radialGradient id="lt4" cx="55%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#F3E5FA" />
            <stop offset="100%" stopColor="#B9A0E5" />
          </radialGradient>
        </defs>
        <rect width="52" height="52" rx="14" fill="url(#lt4)" />
        <circle cx="26" cy="26" r="10" fill="#fff" opacity="0.55" />
        <circle cx="18" cy="36" r="4" fill="#fff" opacity="0.5" />
        <circle cx="38" cy="18" r="3" fill="#fff" opacity="0.65" />
      </svg>
    ),
    g5: (
      <svg viewBox="0 0 52 52" {...common}>
        <defs>
          <linearGradient id="lt5" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFE1ED" />
            <stop offset="100%" stopColor="#D4A8E8" />
          </linearGradient>
        </defs>
        <rect width="52" height="52" rx="14" fill="url(#lt5)" />
        <circle cx="32" cy="22" r="8" fill="#F4B8D3" opacity="0.9" />
        <circle cx="22" cy="34" r="6" fill="#C898E0" opacity="0.85" />
        <circle cx="38" cy="36" r="5" fill="#E09ACB" opacity="0.85" />
      </svg>
    ),
  };
  return v[kind] || null;
}
