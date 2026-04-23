import React, { useId } from 'react';
import { IconChevR, PillAction, MeditationBlob } from './shared.jsx';

/**
 * Блок «Рекомендации» — вставляется в конец скролла главной.
 * (Отдельный маршрут /recommendations больше не используем.)
 * Отступы: токены --card-pad, --card-row-gap, --card-lead, --stack-*.
 */
export default function RecommendationsSection({ onOpen }) {
  return (
    <section className="recommendations-section section-gap" id="recommendations" aria-label="Рекомендации">
      <h1 className="t-h1 c-primary" style={{ margin: '0 0 var(--sp-4)' }}>
        Рекомендации
      </h1>

      <div className="list-cards list-cards--rec">
        <div className="card tappable" onClick={() => onOpen('attention')}>
          <div className="card-row">
            <div className="card-row__lead">
              <IconSparkle size={26} />
            </div>
            <div className="card-row__body">
              <div className="t-body-md c-secondary">
                Ваша зона внимания на этом уровне — снижение стресса и поддержка нутриентами.
              </div>
            </div>
          </div>
        </div>

        <div className="card tappable" onClick={() => onOpen('today-load')}>
          <div className="card-row">
            <div className="card-row__lead">
              <IconSparkle size={26} />
            </div>
            <div className="card-row__body">
              <div className="t-body-md c-secondary">Сегодня лучше обойтись без высокой нагрузки.</div>
            </div>
          </div>
        </div>

        <div
          className="card tappable u-before-section"
          onClick={() => onOpen('meditation')}
        >
          <div className="card-row">
            <div className="card-row__lead">
              <MeditationBlob size={58} />
            </div>
            <div className="card-row__body">
              <div className="t-card-title c-primary">Медитация</div>
              <div className="t-card-points mt-stack-tight">20 баллов</div>
              <div className="t-body-sm c-tertiary mt-stack-text">Аудио-практика · 10 минут</div>
            </div>
            <div className="card-row__tail">
              <ArrowChip
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen('meditation');
                }}
              />
            </div>
          </div>
        </div>

        <div className="card tappable" onClick={() => onOpen('material')}>
          <div className="card-row">
            <div className="card-row__lead">
              <div className="icon-square tint-pink">
                <IconOpenBook size={22} />
              </div>
            </div>
            <div className="card-row__body">
              <div className="t-label-md c-tertiary">Материал дня</div>
              <div className="t-card-title c-primary mt-stack-tight">
                Как питание влияет на
                <br />
                организм и возраст
              </div>
              <div className="t-body-sm c-tertiary mt-stack-text">6 минут</div>
            </div>
            <div className="card-row__tail">
              <ArrowChip
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen('material');
                }}
              />
            </div>
          </div>
        </div>

        <div className="card tappable card--dynamics" onClick={() => onOpen('dynamics')}>
          <div className="card__stack">
            <div className="t-card-title c-primary">Динамика</div>
            <div className="t-body-md c-secondary mt-stack-text">
              Ознакомься со своей динамикой сна, стресса и питания за неделю.
            </div>
            <div
              className="dynamics-card__chart card__bleed-x"
              style={{ position: 'relative', height: 72, marginTop: 'var(--stack-block)' }}
            >
              <DynamicsWave />
            </div>
            <div className="mt-stack-block" style={{ position: 'relative' }}>
              <PillAction label="Перейти к динамике" onClick={() => onOpen('dynamics')} />
            </div>
          </div>
        </div>
      </div>
    </section>
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
  const rid = useId().replace(/:/g, '');
  const gp = `dw-pink-${rid}`;
  const gpurp = `dw-purple-${rid}`;

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
        <linearGradient id={gp} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F58BC8" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#F58BC8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={gpurp} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C09EFF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#C09EFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 48 Q60 32 120 42 T 220 18 T 340 36 L340 72 L0 72Z" fill={`url(#${gp})`} />
      <path d="M0 56 Q60 44 120 52 T 220 32 T 340 48 L340 72 L0 72Z" fill={`url(#${gpurp})`} />
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
