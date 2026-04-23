import React from 'react';

/**
 * Сегментированный переключатель: items=[{id,label}], active, onChange.
 * Стили и высоты — через --btn-* токены (.segmented).
 */
export default function Segmented({ items, active, onChange, ariaLabel }) {
  return (
    <div className="segmented" role="tablist" aria-label={ariaLabel}>
      {items.map((it) => {
        const isActive = it.id === active;
        return (
          <button
            key={it.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={isActive ? 'active' : ''}
            onClick={() => onChange?.(it.id)}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
