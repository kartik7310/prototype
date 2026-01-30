import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatSidebar from '../components/ChatSidebar';
import ChatInterface from './ChatPage';

export default function ChatPageContainer() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  useEffect(() => {
    // Auto-start a session if none is active when landing on a category
    if (!activeChatId) {
      setActiveChatId('initial-' + Date.now());
    }
  }, [categoryId, activeChatId]);

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex h-screen w-full bg-white animate-in fade-in duration-500 overflow-hidden">
      <ChatSidebar 
        categoryName={categoryId || ''}
        activeChatId={activeChatId}
        onChatSelect={setActiveChatId}
        onNewChat={() => setActiveChatId('new-' + Date.now())}
        onBack={handleBackToDashboard}
      />
      <ChatInterface 
        categoryName={categoryId || ''}
        activeChatId={activeChatId}
      />
    </div>
  );
}
