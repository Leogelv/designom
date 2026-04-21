/* eslint-disable */
// Онбординг (PRD §1) — демо-флоу без бэкенда

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FlowScreen, DotSteps, flowBottomPad } from '../ui/flowChrome.jsx';
import { LiquidBlob } from '../atoms.jsx';

const STORAGE_KEY = 'om_passport_age';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = React.useState(0);
  const [age, setAge] = React.useState(() => sessionStorage.getItem(STORAGE_KEY) || '');

  const next = () => setStep((s) => Math.min(s + 1, 2));
  const back = () => (step > 0 ? setStep((s) => s - 1) : navigate(-1));

  const startQuiz = () => {
    const n = parseInt(age, 10);
    if (n >= 18 && n <= 120) {
      sessionStorage.setItem(STORAGE_KEY, String(n));
      navigate('/bio-age');
    }
  };

  return (
    <FlowScreen onBack={step === 0 ? () => navigate('/') : back} progress01={step / 2}>
      <DotSteps total={3} index={step} />

      {step === 0 && (
        <div style={{ padding: '18px 22px 0', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
            <LiquidBlob tone="amber" size={100} />
          </div>
          <h1 className="t-display" style={{ fontSize: 34, lineHeight: 1.12, margin: '8px 0 0', textAlign: 'center' }}>
            Персональный помощник в&nbsp;долголетии
          </h1>
          <p style={{
            marginTop: 14, fontSize: 15, color: 'var(--muted)', lineHeight: 1.45, textAlign: 'center', maxWidth: 340, marginInline: 'auto',
          }}>
            Начните с короткой оценки — за пару минут получите ориентир по биовозрасту и мягкий первый шаг без медицинского жаргона.
          </p>
          <button
            type="button"
            className="pill"
            onClick={next}
            style={{
              marginTop: 28, width: '100%', height: 52, justifyContent: 'center',
              background: 'linear-gradient(180deg, var(--amber-hi), var(--amber))', color: '#fff', fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35), 0 12px 28px -8px var(--accent-glow)',
            }}
          >
            Дальше
          </button>
          <button
            type="button"
            onClick={() => navigate('/bio-age')}
            style={{
              display: 'block', margin: '14px auto 0', background: 'none', border: 'none',
              color: 'var(--muted)', fontSize: 13, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3,
            }}
          >
            Уже вводила возраст — к калькулятору
          </button>
        </div>
      )}

      {step === 1 && (
        <div style={{ padding: '22px 22px 0' }}>
          <div className="t-kicker" style={{ color: 'var(--ink-2)' }}>Шаг 2</div>
          <h2 className="t-display" style={{ fontSize: 28, margin: '10px 0 0' }}>Паспортный возраст</h2>
          <p style={{ marginTop: 10, fontSize: 14.5, color: 'var(--muted)', lineHeight: 1.4 }}>
            Нужен как база для расчёта BioAge. Данные остаются в браузере на это демо-сессию.
          </p>
          <label className="t-kicker" style={{ display: 'block', marginTop: 22, color: 'var(--ink-2)' }}>Возраст, лет</label>
          <input
            type="number"
            inputMode="numeric"
            min={18}
            max={120}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="например, 35"
            style={{
              marginTop: 8, width: '100%', height: 52, borderRadius: 16, border: '0.5px solid var(--hairline)',
              padding: '0 16px', fontSize: 18, fontFamily: 'var(--font-ui)', background: 'var(--paper)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9)',
            }}
          />
          <button
            type="button"
            disabled={!age || parseInt(age, 10) < 18 || parseInt(age, 10) > 120}
            onClick={next}
            className="pill pill-ink"
            style={{
              marginTop: 22, width: '100%', height: 50, justifyContent: 'center', opacity: (!age || parseInt(age, 10) < 18 || parseInt(age, 10) > 120) ? 0.45 : 1,
            }}
          >
            Продолжить
          </button>
        </div>
      )}

      {step === 2 && (
        <div style={{ padding: '22px 22px 0', paddingBottom: flowBottomPad }}>
          <div className="t-kicker" style={{ color: 'var(--ink-2)' }}>Важно</div>
          <h2 className="t-display" style={{ fontSize: 26, margin: '10px 0 0' }}>Не медицинская диагностика</h2>
          <div className="s-paper" style={{ marginTop: 18, padding: 18, borderRadius: 'var(--r-lg)' }}>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--graphite)', lineHeight: 1.5, textWrap: 'pretty' }}>
              Калькулятор — это <strong>скрининговая оценка</strong> на основе самоотчёта и простых тестов. Он не заменяет врача и не ставит диагноз. Результат помогает выбрать <em>зону внимания</em>, а не пугать цифрами.
            </p>
          </div>
          <button
            type="button"
            onClick={startQuiz}
            style={{
              marginTop: 22, width: '100%', height: 52, borderRadius: 999, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(180deg, var(--amber-hi), var(--amber))', color: '#fff', fontWeight: 600, fontSize: 16,
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35), 0 12px 28px -8px var(--accent-glow)',
            }}
          >
            Начать оценку
          </button>
        </div>
      )}
    </FlowScreen>
  );
}
