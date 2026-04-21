/* eslint-disable */
// Калькулятор BioAge — упрощённый мастер под PRD §2–3 (демо, без реальной модели)

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FlowScreen, FlowProgress } from '../ui/flowChrome.jsx';
import { Icon, IconChip, LiquidBlob } from '../atoms.jsx';

const PASSPORT = 'om_passport_age';
const TOTAL_STEPS = 9;

const opt = (label, value) => ({ label, value });

export default function BioAgeFlowPage() {
  const navigate = useNavigate();
  const passport = parseInt(sessionStorage.getItem(PASSPORT) || '35', 10);
  const [step, setStep] = React.useState(0);
  const [reactionReady, setReactionReady] = React.useState(false);
  const [stroopPick, setStroopPick] = React.useState(null);
  const [balanceHold, setBalanceHold] = React.useState(false);
  const [balanceMs, setBalanceMs] = React.useState(0);
  const holdRef = React.useRef(null);
  const [smoking, setSmoking] = React.useState(null);
  const [alcohol, setAlcohol] = React.useState(null);
  const [sleep, setSleep] = React.useState(null);
  const [nutrition, setNutrition] = React.useState(null);
  const [activity, setActivity] = React.useState(null);
  const [stress, setStress] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (step !== 0) return;
    setReactionReady(false);
    const t = setTimeout(() => setReactionReady(true), 800 + Math.random() * 700);
    return () => clearTimeout(t);
  }, [step]);

  React.useEffect(() => {
    if (!balanceHold) return;
    const t0 = Date.now();
    holdRef.current = window.setInterval(() => setBalanceMs(Date.now() - t0), 80);
    return () => { if (holdRef.current) clearInterval(holdRef.current); };
  }, [balanceHold]);

  const canNext = () => {
    switch (step) {
      case 0: return reactionReady;
      case 1: return stroopPick === 'ink';
      case 2: return balanceMs >= 1500;
      case 3: return smoking != null;
      case 4: return alcohol != null;
      case 5: return sleep != null;
      case 6: return nutrition != null;
      case 7: return activity != null;
      case 8: return stress != null;
      default: return false;
    }
  };

  const finish = () => {
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      navigate('/bio-age/result', {
        state: {
          passport,
          bioAge: Math.round(passport + (stress === 'high' ? 2.2 : 0) + (sleep === 'low' ? 1.2 : 0) - (activity === 'high' ? 1 : 0)),
          profile: stress === 'high' || sleep === 'low' ? 'cognitive' : activity === 'low' ? 'body' : 'balanced',
        },
      });
    }, 2200);
  };

  const goNext = () => {
    if (step < 8) setStep((s) => s + 1);
    else finish();
  };

  const goBack = () => {
    if (step <= 0) navigate('/onboarding');
    else setStep((s) => s - 1);
  };

  if (loading) {
    return (
      <div className="om" style={{
        minHeight: '100%', background: 'var(--bone)', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center',
      }}>
        <LiquidBlob tone="lavender" size={120} />
        <p className="t-display" style={{ marginTop: 24, fontSize: 22 }}>Собираем ваш профиль…</p>
        <p style={{ marginTop: 10, color: 'var(--muted)', maxWidth: 280, lineHeight: 1.45 }}>
          Это стартовая оценка, не диагноз. Через мгновение покажем мягкий ориентир.
        </p>
      </div>
    );
  }

  return (
    <FlowScreen onBack={goBack} progress01={(step + 1) / TOTAL_STEPS}>
      <div style={{ padding: '8px 18px 0' }}>
        <FlowProgress value01={(step + 1) / TOTAL_STEPS} />
      </div>

      {step === 0 && (
        <div style={{ padding: '12px 18px 0' }}>
          <h2 className="t-display" style={{ fontSize: 26, margin: 0 }}>Время реакции</h2>
          <p style={{ marginTop: 10, fontSize: 14.5, color: 'var(--muted)', lineHeight: 1.45 }}>
            Когда фон станет тёплым — тапните по области. Один заход для демо.
          </p>
          <button
            type="button"
            onClick={() => reactionReady && goNext()}
            style={{
              marginTop: 20, width: '100%', height: 200, borderRadius: 'var(--r-xl)', border: 'none', cursor: reactionReady ? 'pointer' : 'wait',
              background: reactionReady
                ? 'linear-gradient(160deg,#E4D9FF,#8B6CFF 45%,#3D28A8)'
                : 'var(--bone-2)',
              color: reactionReady ? '#fff' : 'var(--muted)', fontSize: 18, fontWeight: 600,
              boxShadow: reactionReady ? 'var(--shadow-lift)' : 'inset 0 2px 8px rgba(60,40,20,0.08)',
            }}
          >
            {reactionReady ? 'Тап!' : 'Готовим стимул…'}
          </button>
        </div>
      )}

      {step === 1 && (
        <div style={{ padding: '12px 18px 0' }}>
          <h2 className="t-display" style={{ fontSize: 26, margin: 0 }}>Тест Струпа</h2>
          <p style={{ marginTop: 10, fontSize: 14.5, color: 'var(--muted)' }}>
            Слово «Чёрный» написано фиолетовым. Выберите <strong>цвет чернил</strong>.
          </p>
          <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { id: 'wrong', label: 'Зелёный', color: '#4B6B3F' },
              { id: 'wrong2', label: 'Лиловый', color: '#9B7CFF' },
              { id: 'ink', label: 'Фиолетовый', color: '#433477' },
              { id: 'wrong3', label: 'Песок', color: '#715A2C' },
            ].map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setStroopPick(o.id)}
                style={{
                  padding: 16, borderRadius: 'var(--r-md)', border: stroopPick === o.id ? '2px solid var(--ink)' : '0.5px solid var(--hairline)',
                  background: 'var(--paper)', cursor: 'pointer', textAlign: 'left',
                  boxShadow: stroopPick === o.id ? '0 8px 20px -8px rgba(20,18,15,0.2)' : 'var(--shadow-soft)',
                }}
              >
                <span style={{ fontSize: 22, fontWeight: 700, color: o.color }}>Чёрный</span>
                <div className="t-kicker" style={{ marginTop: 6 }}>{o.label}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={{ padding: '12px 18px 0' }}>
          <h2 className="t-display" style={{ fontSize: 26, margin: 0 }}>Баланс</h2>
          <p style={{ marginTop: 10, fontSize: 14.5, color: 'var(--muted)' }}>
            Удерживайте кнопку, представляя стойку на одной ноге (~1,5 с для демо).
          </p>
          <button
            type="button"
            onPointerDown={() => { setBalanceHold(true); setBalanceMs(0); }}
            onPointerUp={() => { setBalanceHold(false); if (holdRef.current) clearInterval(holdRef.current); }}
            onPointerLeave={() => { setBalanceHold(false); }}
            style={{
              marginTop: 20, width: '100%', height: 120, borderRadius: 'var(--r-xl)', border: '0.5px solid var(--hairline)',
              background: balanceHold ? 'linear-gradient(180deg,#DDEBD1,#C9D9C2)' : 'var(--paper)',
              fontSize: 17, fontWeight: 600, cursor: 'pointer', color: 'var(--sage-ink)',
            }}
          >
            {balanceHold ? `Удерживаю… ${(balanceMs / 1000).toFixed(1)} с` : 'Удерживать'}
          </button>
        </div>
      )}

      {step === 3 && (
        <CardPick title="Курение" hint="Системный модификатор (демо)" options={[
          opt('Не курю', 'none'), opt('Бросил(а) > 6 мес', 'quit6'), opt('Бросил(а) < 6 мес', 'quit'), opt('Курю', 'smoke'),
        ]} value={smoking} onChange={setSmoking} />
      )}
      {step === 4 && (
        <CardPick title="Алкоголь" hint="Частота" options={[
          opt('Не употребляю', '0'), opt('Редко', '1'), opt('Умеренно', '2'), opt('Часто', '3'), opt('Ежедневно', '4'),
        ]} value={alcohol} onChange={setAlcohol} />
      )}
      {step === 5 && (
        <CardPick title="Сон" hint="Средняя длительность" options={[
          opt('< 5 ч', 'low'), opt('5–6 ч', 'mlow'), opt('6–7 ч', 'mid'), opt('7–8 ч', 'good'), opt('8–9 ч', 'great'), opt('> 9 ч', 'long'),
        ]} value={sleep} onChange={setSleep} />
      )}
      {step === 6 && (
        <CardPick title="Питание" hint="Субъективно, как сейчас" options={[
          opt('Много переработки / сладкого', 'poor'), opt('Середина', 'mid'), opt('Сбалансированно', 'ok'), opt('Очень сознательно', 'high'),
        ]} value={nutrition} onChange={setNutrition} />
      )}
      {step === 7 && (
        <CardPick title="Активность" hint="Нагрузка в неделю" options={[
          opt('Мало движения', 'low'), opt('Лёгкие прогулки', 'mid'), opt('Регулярные тренировки', 'high'),
        ]} value={activity} onChange={setActivity} />
      )}
      {step === 8 && (
        <CardPick title="Стресс" hint="Как ощущается фон" options={[
          opt('Почти нет', 'low'), opt('Умеренно', 'mid'), opt('Часто на пределе', 'high'),
        ]} value={stress} onChange={setStress} />
      )}

      <div style={{ padding: '22px 18px 0' }}>
        <button
          type="button"
          disabled={!canNext()}
          onClick={goNext}
          className="pill pill-ink"
          style={{
            width: '100%', height: 50, justifyContent: 'center',
            opacity: canNext() ? 1 : 0.4,
          }}
        >
          {step >= 8 ? 'Завершить и собрать профиль' : 'Далее'}
        </button>
      </div>
    </FlowScreen>
  );
}

function CardPick({ title, hint, options, value, onChange }) {
  return (
    <div style={{ padding: '12px 18px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
        <IconChip tone="amber" icon="pulse" />
        <h2 className="t-display" style={{ fontSize: 24, margin: 0 }}>{title}</h2>
      </div>
      <p style={{ margin: '4px 0 0', fontSize: 13.5, color: 'var(--muted)' }}>{hint}</p>
      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            style={{
              textAlign: 'left', padding: 14, borderRadius: 'var(--r-md)',
              border: value === o.value ? 'none' : '0.5px solid var(--hairline)',
              background: value === o.value ? 'linear-gradient(180deg, var(--amber-hi), var(--amber))' : 'var(--paper)',
              color: value === o.value ? '#fff' : 'var(--ink)', fontSize: 15, fontWeight: 600, cursor: 'pointer',
              boxShadow: value === o.value ? '0 10px 24px -10px var(--accent-glow)' : 'var(--shadow-soft)',
            }}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
