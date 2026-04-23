import React from 'react';

/**
 * Строка внутри карточки: lead | body | tail (по дизайн-системе).
 * lead — визуал (иконка/орб/иллюстрация), body — текст, tail — доп. действие справа.
 */
export default function CardRow({ lead, tail, className = '', children }) {
  const cls = ['card-row', className].filter(Boolean).join(' ');
  return (
    <div className={cls}>
      {lead !== undefined && <div className="card-row__lead">{lead}</div>}
      <div className="card-row__body">{children}</div>
      {tail !== undefined && <div className="card-row__tail">{tail}</div>}
    </div>
  );
}
