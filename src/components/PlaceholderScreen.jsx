import React from 'react';
import { TopBar } from './shared.jsx';

/** Заглушка для вкладок без макета */
export default function PlaceholderScreen({ title, onClose }) {
  return (
    <div className="screen">
      <TopBar onClose={onClose} />
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 40,
          textAlign: 'center',
        }}
      >
        <div>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              margin: '0 auto 16px',
              background: 'var(--lavender-2)',
            }}
          />
          <div className="t-h3 c-primary">{title}</div>
          <div className="t-body-sm c-tertiary" style={{ marginTop: 6 }}>
            Раздел в разработке
          </div>
        </div>
      </div>
    </div>
  );
}
