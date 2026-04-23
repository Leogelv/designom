import React from 'react';

/** Статусный тег/бейдж. tone: 'success'|'warning'|'error'|'info'|'neutral'(default) */
export default function Tag({ tone = 'neutral', className = '', children, ...rest }) {
  const toneCls = tone === 'neutral' ? '' : `t-${tone}`;
  const cls = ['tag', toneCls, className].filter(Boolean).join(' ');
  return (
    <span className={cls} {...rest}>
      {children}
    </span>
  );
}

/** Зелёная плашка «Выполнено» — используется в карточках чекапа. */
export function TagDone({ className = '', children = 'Выполнено', ...rest }) {
  const cls = ['tag-done', className].filter(Boolean).join(' ');
  return (
    <span className={cls} {...rest}>
      {children}
    </span>
  );
}
