import React from 'react';

/** Контейнер экрана (.screen) + скролл-колонка (.screen-scroll). */
export default function Screen({ className = '', children }) {
  const cls = ['screen', className].filter(Boolean).join(' ');
  return <div className={cls}>{children}</div>;
}

export function ScreenScroll({ className = '', children }) {
  const cls = ['screen-scroll', className].filter(Boolean).join(' ');
  return <div className={cls}>{children}</div>;
}
