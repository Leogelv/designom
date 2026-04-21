import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { HomeScreen } from './home.jsx';
import { LibraryScreen } from './library.jsx';

function useTabNav() {
  const navigate = useNavigate();
  return React.useCallback(
    (id) => {
      if (id === 'library') navigate('/library');
      else if (id === 'home') navigate('/');
    },
    [navigate],
  );
}

function HomePage() {
  const navigate = useNavigate();
  const onTab = useTabNav();
  return <HomeScreen onOpenLibrary={() => navigate('/library')} onTab={onTab} />;
}

function LibraryPage() {
  const navigate = useNavigate();
  const onTab = useTabNav();
  return <LibraryScreen onClose={() => navigate('/')} onTab={onTab} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/library" element={<LibraryPage />} />
      </Routes>
    </BrowserRouter>
  );
}
