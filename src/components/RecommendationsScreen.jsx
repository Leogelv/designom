import React from 'react';
import { TopBar, IconChevR, AIOrb } from './shared.jsx';
import { PillAction } from './HomeScreen.jsx';

export default function RecommendationsScreen({ onOpen, onClose }) {
  return (
    <div className="screen">
      <TopBar onClose={onClose} />
      <div className="screen-scroll">
        <h1 className="t-h1 c-primary" style={{ margin: '0 0 var(--sp-4)' }}>
          Рекомендации
        </h1>

        <div className="card tappable" style={{ padding: 'var(--sp-4)' }} onClick={() => onOpen('attention')}>
          <div className="flex items-center" style={{ gap: 'var(--sp-3)' }}>
            <IconSparkle size={26} />
            <div className="t-body-md c-secondary flex-1">
              Ваша зона внимания на этом уровне — снижение стресса и поддержка нутриентами.
            </div>
          </div>
        </div>

        <div
          className="card tappable"
          style={{ padding: 'var(--sp-4)', marginTop: 'var(--sp-3)' }}
          onClick={() => onOpen('today-load')}
        >
          <div className="flex items-center" style={{ gap: 'var(--sp-3)' }}>
            <IconSparkle size={26} />
            <div className="t-body-md c-secondary flex-1">Сегодня лучше обойтись без высокой нагрузки.</div>
          </div>
        </div>

        <div
          className="card tappable section-gap"
          style={{ padding: 'var(--sp-4)' }}
          onClick={() => onOpen('meditation')}
        >
          <div className="flex items-center" style={{ gap: 'var(--sp-4)' }}>
            <div className="rec-orb">
              <AIOrb size={58} animated={false} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="t-title-lg c-primary">Медитация</div>
              <div className="t-body-md c-brand" style={{ fontWeight: 600, marginTop: 2 }}>
                20 баллов
              </div>
              <div className="t-body-sm c-tertiary" style={{ marginTop: 4 }}>
                Аудио-практика · 10 минут
              </div>
            </div>
            <ArrowChip
              onClick={(e) => {
                e.stopPropagation();
                onOpen('meditation');
              }}
            />
          </div>
        </div>

        <div
          className="card tappable"
          style={{ padding: 'var(--sp-4)', marginTop: 'var(--sp-3)' }}
          onClick={() => onOpen('material')}
        >
          <div className="flex items-center" style={{ gap: 'var(--sp-4)' }}>
            <div className="icon-square tint-pink" style={{ width: 44, height: 44 }}>
              <IconOpenBook size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="t-label-md c-tertiary">Материал дня</div>
              <div className="t-title-md c-primary" style={{ marginTop: 2 }}>
                Как питание влияет на
                <br />
                организм и возраст
              </div>
              <div className="t-body-sm c-tertiary" style={{ marginTop: 6 }}>
                6 минут
              </div>
            </div>
            <ArrowChip
              onClick={(e) => {
                e.stopPropagation();
                onOpen('material');
              }}
            />
          </div>
        </div>

        <div
          className="card tappable"
          style={{
            padding: 'var(--sp-4)',
            marginTop: 'var(--sp-3)',
            position: 'relative',
            overflow: 'hidden',
          }}
          onClick={() => onOpen('dynamics')}
        >
          <div style={{ position: 'relative' }}>
            <div className="t-title-lg c-primary">Динамика</div>
            <div className="t-body-md c-secondary" style={{ marginTop: 6 }}>
              Ознакомься со своей динамикой сна, стресса и питания за неделю.
            </div>
          </div>
          <div style={{ position: 'relative', height: 72, marginTop: 12, marginLeft: -16, marginRight: -16 }}>
            <DynamicsWave />
          </div>
          <div style={{ marginTop: 'var(--sp-3)', position: 'relative' }}>
            <PillAction label="Перейти к динамике" onClick={() => onOpen('dynamics')} />
          </div>
        </div>
      </div>
    </div>
  );
}

function IconSparkle({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" fill="none">
      <path
        d="M13 3l2 5.3 5.3 2-5.3 2-2 5.3-2-5.3-5.3-2 5.3-2L13 3z"
        fill="#8E63F8"
      />
      <path d="M5 17l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1L5 17z" fill="#C09EFF" />
    </svg>
  );
}

function IconOpenBook({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 5.5C5.5 4.5 9 4.5 12 6c3-1.5 6.5-1.5 9-0.5v12c-2.5-1-6-1-9 0.5-3-1.5-6.5-1.5-9-0.5v-12z" />
      <path d="M12 6v12.5" />
    </svg>
  );
}

function ArrowChip({ onClick }) {
  return (
    <button type="button" className="arrow-chip" onClick={onClick} aria-label="Открыть">
      <IconChevR size={14} sw={2.4} />
    </button>
  );
}

function DynamicsWave() {
  return (
    <svg
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
      viewBox="0 0 340 72"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="dw-pink" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F58BC8" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#F58BC8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="dw-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C09EFF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#C09EFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 48 Q60 32 120 42 T 220 18 T 340 36 L340 72 L0 72Z" fill="url(#dw-pink)" />
      <path d="M0 56 Q60 44 120 52 T 220 32 T 340 48 L340 72 L0 72Z" fill="url(#dw-purple)" />
      <path
        d="M0 48 Q60 32 120 42 T 220 18 T 340 36"
        fill="none"
        stroke="#F58BC8"
        strokeOpacity="0.75"
        strokeWidth="2"
      />
    </svg>
  );
}
