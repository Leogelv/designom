import React from 'react';

/** Карточка: единый .card (радиус/паддинги/тень). tappable → hover/active; as="button" — семантическая кнопка. */
export default function Card({
  tappable = false,
  as: As = 'div',
  className = '',
  children,
  onClick,
  ...rest
}) {
  const cls = ['card', tappable && 'tappable', className].filter(Boolean).join(' ');
  return (
    <As className={cls} onClick={onClick} {...rest}>
      {children}
    </As>
  );
}

/** Вертикальный стек контента карточки (без inline-margin). */
export function CardStack({ className = '', children, ...rest }) {
  const cls = ['card__stack', className].filter(Boolean).join(' ');
  return (
    <div className={cls} {...rest}>
      {children}
    </div>
  );
}

/** Вылет блока на края карточки (графики и т.п.). */
export function CardBleedX({ className = '', children, ...rest }) {
  const cls = ['card__bleed-x', className].filter(Boolean).join(' ');
  return (
    <div className={cls} {...rest}>
      {children}
    </div>
  );
}
