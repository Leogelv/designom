import React from 'react';
import { IconChevR } from '../shared.jsx';

/** «Пилюля-действие» внутри карточки (напр., «Перейти в дневник питания»). */
export default function PillAction({ label, onClick, type = 'button' }) {
  return (
    <button type={type} className="pill-action" onClick={onClick}>
      <span className="pill-action-label">{label}</span>
      <span className="pill-action-chip" aria-hidden>
        <IconChevR size={14} sw={2.3} />
      </span>
    </button>
  );
}
