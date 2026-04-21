/* eslint-disable */
// Общая оболочка для полноэкранных флоу (онбординг, калькулятор) — в стиле ОМ

import React from 'react';
import { Icon, StatusBar } from '../atoms.jsx';

/** Нижний отступ под фиксированный TabBar на табовых экранах */
export const tabBarPad = 'calc(110px + env(safe-area-inset-bottom, 0px))';

/** Отступ только под safe-area для флоу без таббара */
export const flowBottomPad = 'calc(28px + env(safe-area-inset-bottom, 0px))';

// Верхняя полоса прогресса без цифр «3 из 9» — только визуальное заполнение (PRD §2)
export function FlowProgress({ value01 }) {
  const pct = Math.max(0, Math.min(1, value01)) * 100;
  return (
    <div style={{ padding: '4px 18px 14px' }}>
      <div style={{
        height: 4, borderRadius: 99, background: 'var(--bone-2)',
        overflow: 'hidden', boxShadow: 'inset 0 1px 2px rgba(60,40,20,0.06)',
      }}>
        <div style={{
          width: `${pct}%`, height: '100%', borderRadius: 99,
          background: 'linear-gradient(90deg, var(--amber-hi), var(--amber))',
          boxShadow: '0 0 12px var(--accent-glow-soft)',
          transition: 'width .35s cubic-bezier(.2,.7,.3,1)',
        }} />
      </div>
    </div>
  );
}

export function FlowScreen({ children, title, onBack, progress01 }) {
  return (
    <div className="om" style={{
      position: 'relative', minHeight: '100%', background: 'var(--bone)',
      paddingBottom: flowBottomPad,
    }}>
      <div style={{
        position: 'absolute', inset: '-20px 0 auto 0', height: 320, pointerEvents: 'none',
        background: 'radial-gradient(70% 60% at 80% 0%, rgba(107,76,245,0.14), transparent 55%), radial-gradient(55% 50% at 0% 25%, rgba(190,210,255,0.22), transparent 60%)',
      }} />
      <StatusBar />
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '6px 18px 0',
      }}>
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            style={{
              width: 40, height: 40, borderRadius: 999, border: '0.5px solid var(--hairline)',
              background: 'var(--paper)', display: 'grid', placeItems: 'center', cursor: 'pointer',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.85)',
            }}
            aria-label="Назад"
          >
            <Icon name="arrowLeft" size={18} color="#14120F" stroke={2} />
          </button>
        ) : (
          <span style={{ width: 40 }} />
        )}
        {title ? (
          <div className="t-kicker" style={{ flex: 1, textAlign: 'center', color: 'var(--ink-2)' }}>
            {title}
          </div>
        ) : (
          <span style={{ flex: 1 }} />
        )}
        <span style={{ width: 40 }} />
      </div>
      {progress01 != null ? <FlowProgress value01={progress01} /> : null}
      {children}
    </div>
  );
}

// Точки онбординга (PRD §1 — не цифры, только маркеры)
export function DotSteps({ total, index }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 8, padding: '12px 0 4px' }}>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          style={{
            width: i === index ? 22 : 7, height: 7, borderRadius: 99,
            background: i === index ? 'linear-gradient(90deg, var(--amber-hi), var(--amber))' : 'var(--bone-2)',
            transition: 'all .25s',
          }}
        />
      ))}
    </div>
  );
}
