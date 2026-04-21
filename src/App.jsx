import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { HomeScreen } from './home.jsx';
import { LibraryScreen } from './library.jsx';
import OnboardingPage from './pages/OnboardingPage.jsx';
import BioAgeFlowPage from './pages/BioAgeFlowPage.jsx';
import BioAgeResultPage from './pages/BioAgeResultPage.jsx';
import { HealthTabScreen, ChatTabScreen, ProfileTabScreen } from './tabScreens.jsx';

function useTabNav() {
  const navigate = useNavigate();
  return React.useCallback(
    (id) => {
      const routes = {
        home: '/',
        journal: '/health',
        chat: '/chat',
        library: '/library',
        me: '/profile',
      };
      const path = routes[id];
      if (path) navigate(path);
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
  const onTab = useTabNav();
  return <LibraryScreen onTab={onTab} />;
}

function HealthPage() {
  const onTab = useTabNav();
  return <HealthTabScreen onTab={onTab} />;
}

function ChatPage() {
  const onTab = useTabNav();
  return <ChatTabScreen onTab={onTab} />;
}

function ProfilePage() {
  const onTab = useTabNav();
  return <ProfileTabScreen onTab={onTab} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/bio-age" element={<BioAgeFlowPage />} />
        <Route path="/bio-age/result" element={<BioAgeResultPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/health" element={<HealthPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}
