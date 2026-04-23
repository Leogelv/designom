import React from 'react';

/**
 * Кнопка дизайн-системы: стили и размеры — из ds-tokens (--btn-*)
 * variant: 'primary' | 'secondary'
 * size: 'md' | 'lg'  (md = 48px, lg = 52px — см. --btn-height-*)
 * fullWidth: true → .btn-full (растягивается)
 */
export default function Button({
  variant = 'primary',
  size,
  fullWidth = false,
  className = '',
  type = 'button',
  children,
  ...rest
}) {
  const base = variant === 'secondary' ? 'btn-secondary' : 'btn-primary';
  const cls = [base, fullWidth && 'btn-full', size && `btn--size-${size}`, className]
    .filter(Boolean)
    .join(' ');
  return (
    <button type={type} className={cls} {...rest}>
      {children}
    </button>
  );
}
