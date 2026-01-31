import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatSidebar from '../components/ChatSidebar';
import ChatInterface from './ChatPage';
import { ChevronDown } from "lucide-react";

export default function ChatPageContainer() {
 

  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
   const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
  
    if (!activeChatId) {
      setActiveChatId('initial-' + Date.now());
    }
  }, [categoryId, activeChatId]);

 

  return (
    <div className="flex h-screen w-full bg-white animate-in fade-in duration-500 overflow-hidden">
     <button
  className="
    md:hidden
    fixed top-2 left-1/2 -translate-x-1/2
    z-50
    p-1.5
    rounded-full
    bg-slate-900/90
    text-white
    shadow-lg
  "
  onClick={() => setSidebarOpen(true)}
>
  <ChevronDown size={18} />
</button>

      
      <ChatSidebar 
        activeChatId={activeChatId}
        onChatSelect={setActiveChatId}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <ChatInterface 
        categoryName={categoryId || ''}
        activeChatId={activeChatId}
      />
    </div>
  );
}
