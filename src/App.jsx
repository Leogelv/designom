import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './styles.css';
import { BottomNav } from './components/shared.jsx';
import HomeScreen from './components/HomeScreen.jsx';
import RecommendationsScreen from './components/RecommendationsScreen.jsx';
import LibraryScreen from './components/LibraryScreen.jsx';
import PlaceholderScreen from './components/PlaceholderScreen.jsx';

function pathToTabId(pathname) {
  if (pathname.startsWith('/library')) return 'lib';
  if (pathname.startsWith('/docs')) return 'docs';
  if (pathname.startsWith('/chat')) return 'chat';
  if (pathname.startsWith('/profile')) return 'me';
  return 'home';
}

function Toast({ text, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 1600);
    return () => clearTimeout(t);
  }, [text, onClose]);
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(26,22,48,0.92)',
        color: 'white',
        padding: '10px 18px',
        borderRadius: 999,
        fontSize: 13,
        fontFamily: 'Inter, system-ui',
        zIndex: 9999,
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
      }}
    >
      {text}
    </div>
  );
}

function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [toast, setToast] = useState(null);

  const open = (id) => setToast('Открытие: ' + id);

  const active = pathToTabId(location.pathname);

  return (
    <>
      <div className="app-root">
        <div className="app-frame">
          <Routes>
            <Route path="/" element={<HomeScreen onOpen={open} />} />
            <Route path="/recommendations" element={<RecommendationsScreen onOpen={open} />} />
            <Route path="/library" element={<LibraryScreen onOpen={open} />} />
            <Route path="/docs" element={<PlaceholderScreen title="Документы" />} />
            <Route path="/chat" element={<PlaceholderScreen title="Чат" />} />
            <Route path="/profile" element={<PlaceholderScreen title="Профиль" />} />
          </Routes>
        </div>
        <BottomNav active={active} onNavigate={(path) => navigate(path)} />
      </div>
      {toast && <Toast text={toast} onClose={() => setToast(null)} />}
    </>
  );
}

export default function App() {
  return <AppShell />;
}
