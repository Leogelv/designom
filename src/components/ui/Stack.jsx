import React from 'react';

/**
 * Вертикальный стек через утилиты .stack-N (gap между детьми = --sp-N).
 * gap: 2|3|4|5|6  (см. styles.css)
 */
export default function Stack({ gap = 3, as: As = 'div', className = '', children, ...rest }) {
  const cls = [`stack-${gap}`, className].filter(Boolean).join(' ');
  return (
    <As className={cls} {...rest}>
      {children}
    </As>
  );
}
