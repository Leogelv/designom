import React, { useState } from 'react';
import { IconCheck, IconPlus, PillAction } from './shared.jsx';
import RecommendationsSection from './RecommendationsSection.jsx';

const GRAD_TILE_1 = '/uploads/grad11.png';
const GRAD_TILE_2 = '/uploads/grad16_9.png';

export default function HomeScreen({ onOpen }) {
  const [dinner, setDinner] = useState(false);
  const toggleDinner = (e) => {
    e.stopPropagation();
    setDinner((x) => !x);
  };

  return (
    <div className="screen">
      <div className="screen-scroll">
        <h1 className="t-h1 c-primary" style={{ margin: '0 0 var(--sp-2)' }}>
          Привет, Надежда!
        </h1>
        <div style={{ marginBottom: 'var(--sp-4)' }}>
          <a
            href="#recommendations"
            className="t-label-md c-brand"
            style={{ fontWeight: 600, textDecoration: 'none' }}
          >
            К рекомендациям ↓
          </a>
        </div>

        <div className="metric-grid">
          <GradientTile
            imageUrl={GRAD_TILE_1}
            kicker="BioAge"
            value={
              <>
                38<span style={{ fontWeight: 600, opacity: 0.85 }}>/35 лет</span>
              </>
            }
            desc="Сейчас больше влияет стрессовая нагрузка"
            corner={<AvatarBadge />}
          />
          <GradientTile
            imageUrl={GRAD_TILE_2}
            kicker="Прогресс"
            value={
              <>
                420<span style={{ fontWeight: 600, opacity: 0.85 }}>/800</span>
              </>
            }
            desc="Тебе осталось 380 баллов до успешного завершения уровня"
            corner={<RingBadge pct={52} />}
          />
        </div>

        <div className="section-gap">
          <div className="t-title-lg c-primary" style={{ marginBottom: 'var(--sp-3)', paddingLeft: 2 }}>
            Твой протокол
          </div>

          <div className="card" style={{ padding: 0, cursor: 'default' }}>
            <div
              className="flex items-center"
              style={{ gap: 'var(--sp-3)', padding: 'var(--sp-4) var(--sp-4) var(--sp-3)' }}
            >
              <div className="icon-square">
                <IconFork size={20} />
              </div>
              <div className="t-title-md c-primary">Дневник питания</div>
            </div>

            <div style={{ padding: '0 var(--sp-5) var(--sp-2)' }}>
              <MealRow label="Завтрак" pts={20} done />
              <MealRow label="Обед" pts={20} done />
              <MealRow label="Ужин" pts={20} done={dinner} onToggle={toggleDinner} last />
            </div>

            <div style={{ padding: '0 var(--sp-3) var(--sp-3)' }}>
              <PillAction label="Перейти в дневник питания" onClick={() => onOpen('food-diary')} />
            </div>
          </div>
        </div>

        <div
          className="card tappable"
          style={{ marginTop: 'var(--sp-3)', padding: 'var(--sp-4)' }}
          onClick={() => onOpen('checkin-morning')}
        >
          <div className="flex" style={{ gap: 'var(--sp-3)' }}>
            <div className="icon-square tint-peach">
              <IconSunFlat size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between" style={{ gap: 'var(--sp-2)' }}>
                <div className="t-title-md c-primary">Утренний чекап</div>
                <span className="tag-done">Выполнено</span>
              </div>
              <div className="t-label-md c-brand" style={{ marginTop: 4, fontWeight: 600 }}>
                50 баллов
              </div>
              <div className="t-body-sm c-secondary" style={{ marginTop: 8 }}>
                Сегодня лучше обойтись без высокой нагрузки или «день обещает быть бодрым»!
              </div>
            </div>
          </div>
        </div>

        <div
          className="card tappable"
          style={{ marginTop: 'var(--sp-3)', padding: 'var(--sp-4)' }}
          onClick={() => onOpen('checkin-evening')}
        >
          <div className="flex" style={{ gap: 'var(--sp-3)' }}>
            <div className="icon-square tint-lavender">
              <IconMoonFlat size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between" style={{ gap: 'var(--sp-2)' }}>
                <div className="t-title-md c-primary">Вечерний чекап</div>
                <span className="tag-done">Выполнено</span>
              </div>
              <div className="t-label-md c-brand" style={{ marginTop: 4, fontWeight: 600 }}>
                50 баллов
              </div>
              <div className="t-body-sm c-secondary" style={{ marginTop: 8 }}>
                День был напряжённым, можно завершить его короткой практикой на 5 минут.
              </div>
            </div>
          </div>
        </div>

        <RecommendationsSection onOpen={onOpen} />
      </div>
    </div>
  );
}

/** Плашка метрики: фон — оригинальный PNG из public/uploads, без затемнения и волн */
function GradientTile({ kicker, value, desc, corner, imageUrl }) {
  return (
    <div className="grad-tile">
      <div
        className="grad-tile__media"
        style={{ backgroundImage: `url(${imageUrl})` }}
        aria-hidden
      />
      <div className="grad-tile-top">
        <div className="grad-tile-kicker">{kicker}</div>
        {corner}
      </div>
      <div className="grad-tile-value">{value}</div>
      <div className="grad-tile-desc">{desc}</div>
    </div>
  );
}

function AvatarBadge() {
  return (
    <div className="grad-tile-badge">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="9" r="3.2" />
        <path d="M5.5 19c1.3-3 3.6-4.5 6.5-4.5s5.2 1.5 6.5 4.5" />
      </svg>
    </div>
  );
}

function RingBadge({ pct }) {
  const size = 26;
  const stroke = 3.5;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - pct / 100);
  return (
    <div className="grad-tile-badge" style={{ background: 'transparent', padding: 0, border: 'none' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="white"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={off}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
    </div>
  );
}

function IconFork({ size = 20 }) {
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
      <path d="M8 3v7a2 2 0 01-2 2h0a2 2 0 01-2-2V3" />
      <path d="M6 12v9" />
      <path d="M15 3c-1.5 2-1.5 5 0 7l1 1v10" />
    </svg>
  );
}

function IconSunFlat({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4" fill="#F2A94A" />
      <g stroke="#F2A94A" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M5.5 18.5l1.4-1.4M17.1 6.9l1.4-1.4" />
      </g>
    </svg>
  );
}

function IconMoonFlat({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M19 14.5A8 8 0 019.5 5 8 8 0 1019 14.5z" fill="#8E63F8" />
    </svg>
  );
}

function MealRow({ label, pts, done, onToggle, last }) {
  return (
    <div
      className="flex items-center"
      style={{
        gap: 'var(--sp-3)',
        padding: '10px 0',
        borderBottom: last ? 'none' : '1px solid var(--border-subtle)',
      }}
    >
      {done ? (
        <div className="chip-check-sm">
          <IconCheck size={13} sw={2.4} />
        </div>
      ) : (
        <button type="button" className="chip-plus-sm" onClick={onToggle} aria-label="Добавить">
          <IconPlus size={13} sw={2.4} />
        </button>
      )}
      <div className="t-body-md c-primary flex-1">{label}</div>
      <div className="t-label-md c-tertiary">20 баллов</div>
    </div>
  );
}

