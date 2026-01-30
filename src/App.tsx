import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ChatSidebar from './components/ChatSidebar';
import ChatInterface from './pages/ChatPage';

export default function App() {
  const [view, setView] = useState<'login' | 'dashboard' | 'chat'>('login');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const handleLogin = () => setView('dashboard');
  const handleLogout = () => setView('login');

  const handleCategoryClick = (id: string) => {
    setSelectedCategory(id);
    setView('chat');
    setActiveChatId('initial-' + Date.now());
  };

  const handleBackToDashboard = () => {
    setView('dashboard');
    setSelectedCategory(null);
  };

  if (view === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (view === 'dashboard') {
    return (
      <Dashboard 
        onCategoryClick={handleCategoryClick} 
        onLogout={handleLogout} 
      />
    );
  }

  return (
    <div className="flex h-screen w-full bg-white animate-in fade-in duration-500 overflow-hidden">
      <ChatSidebar 
        categoryName={selectedCategory || ''}
        activeChatId={activeChatId}
        onChatSelect={setActiveChatId}
        onNewChat={() => setActiveChatId('new-' + Date.now())}
        onBack={handleBackToDashboard}
      />
      <ChatInterface 
        categoryName={selectedCategory || ''}
        activeChatId={activeChatId}
      />
    </div>
  );
}
