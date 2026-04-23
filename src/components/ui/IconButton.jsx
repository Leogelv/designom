import React from 'react';

/**
 * Круглая icon-кнопка (border-radius:50%), размеры — из токенов --btn-icon-*
 * size: 'sm' | 'md' | 'lg'
 */
export default function IconButton({
  size = 'md',
  className = '',
  label,
  type = 'button',
  children,
  ...rest
}) {
  const sizeCls = size === 'sm' ? 'size-sm' : size === 'lg' ? 'size-lg' : '';
  const cls = ['icon-btn', sizeCls, className].filter(Boolean).join(' ');
  return (
    <button type={type} className={cls} aria-label={label} {...rest}>
      {children}
    </button>
  );
}
