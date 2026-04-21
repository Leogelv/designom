/* eslint-disable */
// Табовые экраны: «Моё здоровье», AI, профиль — в той же визуальной системе, что home/library

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, StatusBar, TopBar, TabBar, IconChip } from './atoms.jsx';

const bottomPad = 'calc(110px + env(safe-area-inset-bottom, 0px))';

const ambient = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: 380,
  pointerEvents: 'none',
  background: 'radial-gradient(70% 60% at 50% 0%, rgba(107,76,245,0.14), transparent 65%)',
};

function DomainRow({ icon, tone, title, subtitle }) {
  return (
    <button
      type="button"
      style={{
        width: '100%', textAlign: 'left', padding: 14, borderRadius: 'var(--r-md)',
        border: '0.5px solid var(--hairline)', background: 'var(--paper)', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 12, boxShadow: 'var(--shadow-soft)',
      }}
    >
      <IconChip tone={tone} icon={icon} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{subtitle}</div>
      </div>
      <Icon name="arrow" size={16} color="var(--muted)" stroke={2} />
    </button>
  );
}

export function HealthTabScreen({ onTab }) {
  const navigate = useNavigate();
  return (
    <div className="om" style={{ position: 'relative', minHeight: '100%', background: 'var(--bone)', paddingBottom: bottomPad }}>
      <div style={ambient} />
      <StatusBar />
      <TopBar />
      <div style={{ padding: '22px 22px 8px' }}>
        <div className="t-kicker">Прозрачность данных</div>
        <h1 className="t-display" style={{ margin: '8px 0 0', fontSize: 36 }}>Моё здоровье</h1>
        <p style={{ marginTop: 10, fontSize: 14.5, color: 'var(--muted)', lineHeight: 1.45, maxWidth: 320 }}>
          BioAge и домены — без тревожных формулировок, только зоны внимания.
        </p>
      </div>
      <div className="s-paper" style={{ margin: '12px 18px 0', padding: 18, borderRadius: 'var(--r-xl)' }}>
        <div className="t-kicker" style={{ color: 'var(--amber-ink)', marginBottom: 6 }}>Сейчас</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span className="t-display t-mono-num" style={{ fontSize: 44, fontWeight: 300 }}>38</span>
          <span style={{ color: 'var(--muted)', fontSize: 14 }}>биовозраст · ориентир</span>
        </div>
        <button
          type="button"
          className="pill pill-ghost"
          style={{ marginTop: 14, width: '100%', justifyContent: 'center', height: 44 }}
          onClick={() => navigate('/onboarding')}
        >
          Пройти оценку заново
        </button>
      </div>
      <div style={{ padding: '22px 18px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div className="t-kicker" style={{ padding: '0 4px', color: 'var(--ink-2)' }}>Домены</div>
        <DomainRow icon="drop" tone="lavender" title="Сон" subtitle="Зона внимания" />
        <DomainRow icon="leaf" tone="sage" title="Питание" subtitle="В норме" />
        <DomainRow icon="flame" tone="sand" title="Стресс" subtitle="Приоритет недели" />
        <DomainRow icon="pulse" tone="amber" title="Активность" subtitle="В норме" />
      </div>
      <TabBar active="journal" onTab={onTab} />
    </div>
  );
}

export function ChatTabScreen({ onTab }) {
  const [text, setText] = React.useState('');
  const chips = ['Устал(а)', 'Что поесть?', 'Практика', 'Объясни профиль'];
  return (
    <div className="om" style={{ position: 'relative', minHeight: '100%', background: 'var(--bone)', paddingBottom: bottomPad }}>
      <div style={ambient} />
      <StatusBar />
      <TopBar />
      <div style={{ padding: '18px 22px 12px' }}>
        <div className="t-kicker">Проводник по протоколу</div>
        <h1 className="t-display" style={{ margin: '6px 0 0', fontSize: 34 }}>Надежда</h1>
        <p style={{ marginTop: 8, fontSize: 14, color: 'var(--muted)' }}>AI-коуч · wellness-навигация, не диагноз</p>
      </div>
      <div style={{ padding: '0 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10, minHeight: 220 }}>
        <div className="s-paper" style={{ padding: 14, borderRadius: 'var(--r-md)', alignSelf: 'flex-start', maxWidth: '88%' }}>
          <div style={{ fontSize: 13.5, lineHeight: 1.45, color: 'var(--graphite)' }}>
            Привет. Сегодня мягкий день — если хочешь, начнём с одной тарелки или короткого чек-апа сна.
          </div>
        </div>
        <div style={{ alignSelf: 'flex-end', background: 'linear-gradient(180deg, var(--amber-hi), var(--amber))', color: '#fff', padding: '12px 16px', borderRadius: 'var(--r-md)', maxWidth: '85%', fontSize: 14 }}>
          Нужна практика на 3 минуты.
        </div>
        <div className="s-paper" style={{ padding: 14, borderRadius: 'var(--r-md)', alignSelf: 'flex-start', maxWidth: '88%' }}>
          <div style={{ fontSize: 13.5, lineHeight: 1.45 }}>Предлагаю резонансное дыхание 5–5. Запустить?</div>
          <button type="button" className="pill" style={{ marginTop: 10, width: '100%', justifyContent: 'center', height: 40 }}>
            Начать практику
          </button>
        </div>
      </div>
      <div style={{ padding: '12px 18px 0', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {chips.map((c) => (
          <button
            key={c}
            type="button"
            style={{
              padding: '8px 14px', borderRadius: 999, border: '0.5px solid var(--hairline)',
              background: 'var(--paper)', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', color: 'var(--ink-2)',
            }}
          >
            {c}
          </button>
        ))}
      </div>
      <div style={{ padding: '12px 18px 0', display: 'flex', gap: 10 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Сообщение…"
          style={{
            flex: 1, height: 48, borderRadius: 999, border: '0.5px solid var(--hairline)', padding: '0 18px',
            fontSize: 15, fontFamily: 'var(--font-ui)', background: 'var(--paper)',
          }}
        />
        <button
          type="button"
          style={{
            width: 48, height: 48, borderRadius: 999, border: 'none', cursor: 'pointer',
            background: 'var(--ink)', display: 'grid', placeItems: 'center',
          }}
        >
          <Icon name="arrow" size={18} color="#F0ECFF" stroke={2} />
        </button>
      </div>
      <TabBar active="chat" onTab={onTab} />
    </div>
  );
}

export function ProfileTabScreen({ onTab }) {
  const rows = [
    ['Уведомления', 'Чек-апы и мягкие напоминания'],
    ['Подписка', 'Демо · не активна'],
    ['Документы', 'Политика и оферта'],
    ['Поддержка', 'Написать в чат'],
  ];
  return (
    <div className="om" style={{ position: 'relative', minHeight: '100%', background: 'var(--bone)', paddingBottom: bottomPad }}>
      <div style={ambient} />
      <StatusBar />
      <TopBar />
      <div style={{ padding: '22px 22px 8px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          width: 64, height: 64, borderRadius: 22, background: 'linear-gradient(145deg, var(--amber-wash), var(--lavender))',
          display: 'grid', placeItems: 'center', fontSize: 28, fontFamily: 'var(--font-display)', color: 'var(--amber-ink)',
        }}>Н</div>
        <div>
          <div className="t-display" style={{ fontSize: 24 }}>Надежда</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>hope@demo.om</div>
        </div>
      </div>
      <div style={{ padding: '8px 18px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {rows.map(([t, sub]) => (
          <button
            key={t}
            type="button"
            style={{
              width: '100%', textAlign: 'left', padding: 16, borderRadius: 'var(--r-md)',
              border: '0.5px solid var(--hairline)', background: 'var(--paper)', cursor: 'pointer',
              boxShadow: 'var(--shadow-soft)',
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 600 }}>{t}</div>
            <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 4 }}>{sub}</div>
          </button>
        ))}
        <button
          type="button"
          style={{
            marginTop: 8, width: '100%', padding: 14, borderRadius: 'var(--r-md)', border: '0.5px solid var(--hairline)',
            background: 'var(--bone-2)', color: 'var(--ink-2)', fontWeight: 600, cursor: 'pointer',
          }}
        >
          Выйти из аккаунта
        </button>
        <button
          type="button"
          style={{
            width: '100%', padding: 14, borderRadius: 'var(--r-md)', border: '1px solid rgba(180,80,80,0.35)',
            background: 'rgba(255,245,245,0.6)', color: '#6B3030', fontWeight: 600, cursor: 'pointer', fontSize: 14,
          }}
        >
          Удалить аккаунт
        </button>
      </div>
      <TabBar active="me" onTab={onTab} />
    </div>
  );
}
