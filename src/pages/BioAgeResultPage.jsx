/* eslint-disable */
// Результат диагностики (PRD §3)

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FlowScreen } from '../ui/flowChrome.jsx';
import { Icon, LiquidBlob } from '../atoms.jsx';

const profiles = {
  cognitive: {
    title: 'Когнитивно-стрессовый профиль',
    text: 'Зона внимания — мягкий режим восстановления, сон и нервная система. Без спешки: маленькие шаги дают устойчивый эффект.',
    factorsRisk: ['Стресс', 'Сон'],
    factorsGood: ['Питание'],
  },
  body: {
    title: 'Профиль тела',
    text: 'Зона внимания — движение и питание как опора. Мы подберём простые действия, которые не ощущаются как «диета».',
    factorsRisk: ['Активность'],
    factorsGood: ['Сон', 'Стресс'],
  },
  balanced: {
    title: 'Сбалансированный профиль',
    text: 'Показатели близки друг к другу — хорошая база. Сфокусируемся на одном привычном шаге, чтобы закрепить ритм.',
    factorsRisk: [],
    factorsGood: ['Сон', 'Питание', 'Стресс'],
  },
};

export default function BioAgeResultPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const passport = state?.passport ?? parseInt(sessionStorage.getItem('om_passport_age') || '35', 10);
  const bioAge = state?.bioAge ?? 38;
  const key = state?.profile ?? 'balanced';
  const p = profiles[key] || profiles.balanced;
  const diff = bioAge - passport;
  const diffText = diff === 0
    ? 'Близко к календарному возрасту — хороший ориентир для мягких шагов.'
    : diff > 0
      ? `На ${diff} ${diff === 1 ? 'год' : 'года'} выше календарного — это ориентир, не приговор.`
      : `На ${Math.abs(diff)} ${Math.abs(diff) === 1 ? 'год' : 'года'} ниже календарного — бережно закрепим привычки.`;

  return (
    <FlowScreen onBack={() => navigate('/bio-age')} progress01={1}>
      <div style={{ padding: '8px 18px 24px' }}>
        <div className="s-paper" style={{
          padding: 22, borderRadius: 'var(--r-xl)', textAlign: 'center',
          boxShadow: 'var(--shadow-lift)',
        }}>
          <div className="t-kicker" style={{ color: 'var(--amber-ink)' }}>Ваш биологический возраст</div>
          <div className="t-display t-mono-num" style={{ fontSize: 72, fontWeight: 300, marginTop: 6, color: 'var(--ink)' }}>
            {bioAge}
          </div>
          <div style={{ fontSize: 14, color: 'var(--muted)', marginTop: 4 }}>календарный: {passport}</div>
          <p style={{ margin: '16px 0 0', fontSize: 14.5, color: 'var(--graphite)', lineHeight: 1.45 }}>
            {diffText}
          </p>
          <p style={{ margin: '12px 0 0', fontSize: 12.5, color: 'var(--muted-2)', lineHeight: 1.4 }}>
            Стартовая оценка, не диагноз. Помогает выбрать зону внимания.
          </p>
        </div>

        <div style={{ marginTop: 20, display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <div style={{ flexShrink: 0 }}>
            <LiquidBlob tone="amber" size={72} />
          </div>
          <div>
            <h2 className="t-display" style={{ fontSize: 22, margin: 0 }}>{p.title}</h2>
            <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--graphite)', lineHeight: 1.45 }}>{p.text}</p>
          </div>
        </div>

        <div style={{ marginTop: 22 }}>
          <div className="t-kicker" style={{ marginBottom: 10, color: 'var(--ink-2)' }}>Факторы влияния</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {p.factorsRisk.length > 0 && (
              <div className="s-paper" style={{ padding: 14, borderRadius: 'var(--r-md)' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 8 }}>Зоны внимания</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {p.factorsRisk.map((t) => (
                    <span key={t} style={{
                      padding: '6px 12px', borderRadius: 999, background: 'var(--bone-2)', fontSize: 13, fontWeight: 600, color: 'var(--ink-2)',
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            )}
            <div className="s-paper" style={{ padding: 14, borderRadius: 'var(--r-md)', border: '0.5px solid rgba(43,74,42,0.15)' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--sage-ink)', marginBottom: 8 }}>Уже поддерживаете</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {p.factorsGood.map((t) => (
                  <span key={t} style={{
                    padding: '6px 12px', borderRadius: 999, background: '#E3EED9', fontSize: 13, fontWeight: 600, color: 'var(--sage-ink)',
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="s-ink" style={{ marginTop: 20, padding: 18, borderRadius: 'var(--r-lg)' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#F4EEE4', marginBottom: 6 }}>Первый шаг</div>
          <p style={{ margin: 0, fontSize: 14, color: 'rgba(244,238,228,0.85)', lineHeight: 1.45 }}>
            Начните с дневника питания: одна тарелка — один доброжелательный фидбек.
          </p>
          <button
            type="button"
            onClick={() => navigate('/')}
            style={{
              marginTop: 14, width: '100%', height: 46, borderRadius: 999, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(180deg, var(--amber-hi), var(--amber))', color: '#fff', fontWeight: 600, fontSize: 15,
            }}
          >
            Начать
          </button>
        </div>

        <button
          type="button"
          onClick={() => navigate('/')}
          style={{
            marginTop: 14, width: '100%', height: 48, borderRadius: 999, border: '0.5px solid var(--hairline)',
            background: 'var(--paper)', fontWeight: 600, cursor: 'pointer',
          }}
        >
          Перейти к моему плану
        </button>

        <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: 'var(--muted)' }}>
          <Icon name="spark" size={14} color="var(--amber)" stroke={1.8} />
          <span>Что такое биовозраст? Краткий ориентир по образу жизни, не клиническая метрика.</span>
        </div>
      </div>
    </FlowScreen>
  );
}
