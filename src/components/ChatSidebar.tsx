import { useState } from 'react';
import { 
  Plus, 
  MessageSquare, 
  ChevronLeft, 
  MoreVertical,
  FolderIcon,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function ChatSidebar({ 
  activeChatId, 
  onChatSelect, 
  onNewChat,
  categoryName,
  onBack 
}: {
  activeChatId: string | null;
  onChatSelect: (id: string) => void;
  onNewChat: () => void;
  categoryName: string;
  onBack: () => void;
}) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['recent']));

  const toggleFolder = (folderId: string) => {
    const next = new Set(expandedFolders);
    if (next.has(folderId)) {
      next.delete(folderId);
    } else {
      next.add(folderId);
    }
    setExpandedFolders(next);
  };

  const baseSessions = [
    { id: '1', title: 'Calculus Basics', date: 'Today' },
    { id: '2', title: 'Module 1 Review', date: 'Yesterday' },
    { id: '3', title: 'Problem Set 4', date: '3 days ago' },
  ];

  const sessions = (activeChatId && !baseSessions.some(s => s.id === activeChatId))
    ? [{ id: activeChatId, title: `New ${categoryName} Session`, date: 'Just now' }, ...baseSessions]
    : baseSessions;

  const folders = [
    { id: 'recent', title: 'Recent History', sessions: sessions },
    { 
      id: 'archive', 
      title: 'Archived Sessions', 
      sessions: [
        { id: 'old-1', title: 'Last Year Finals', date: '2025' },
        { id: 'old-2', title: 'Chemistry Lab', date: '2025' }
      ] 
    },
    { id: 'templates', title: 'Standard Templates', sessions: [] }
  ];

  return (
    <div className="w-[300px] h-full flex flex-col bg-slate-900 text-slate-300 border-r border-slate-800">
      {/* Sidebar Header */}
      <div className="p-4 flex flex-col space-y-4">
        <button 
          onClick={onBack}
          className="flex items-center text-sm font-semibold text-slate-400 hover:text-white transition-colors group"
        >
          <ChevronLeft size={16} className="mr-1 group-hover:-translate-x-0.5 transition-transform" />
          Back to Dashboard
        </button>

        <button 
          onClick={onNewChat}
          className="w-full flex items-center justify-center space-x-2 py-3 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl text-white font-medium transition-all active:scale-[0.98]"
        >
          <Plus size={18} />
          <span>New {categoryName} Chat</span>
        </button>
      </div>

      {/* Folders & History List */}
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-2">
        {folders.map((folder) => (
          <div key={folder.id} className="space-y-1">
            <button 
              onClick={() => toggleFolder(folder.id)}
              className="w-full flex items-center px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all group"
            >
              <div className="mr-2 text-slate-600 group-hover:text-slate-400">
                {expandedFolders.has(folder.id) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </div>
              <FolderIcon size={14} className="mr-2 opacity-50" />
              <span className="flex-1 text-left truncate">{folder.title}</span>
            </button>

            {expandedFolders.has(folder.id) && (
              <div className="ml-4 space-y-1 border-l border-slate-800/50 pl-2 animate-in slide-in-from-top-1 duration-200">
                {folder.sessions.length > 0 ? (
                  folder.sessions.map((session) => (
                    <button
                      key={session.id}
                      onClick={() => onChatSelect(session.id)}
                      className={cn(
                        "w-full flex items-center group px-3 py-2.5 rounded-lg text-sm transition-all text-left",
                        activeChatId === session.id 
                          ? "bg-white/10 text-white shadow-inner" 
                          : "hover:bg-white/5 text-slate-400 hover:text-slate-200"
                      )}
                    >
                      <div className={cn(
                        "mr-3 transition-colors",
                        activeChatId === session.id ? "text-primary" : "text-slate-500 group-hover:text-slate-300"
                      )}>
                        <MessageSquare size={16} />
                      </div>
                      <span className="flex-1 truncate">{session.title}</span>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical size={14} className="text-slate-500" />
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="px-3 py-2 text-xs text-slate-600 italic">No sessions yet</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky bottom-0">
        <div className="bg-slate-800/50 rounded-xl p-3 flex items-center space-x-3 border border-white/5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-indigo-400 flex items-center justify-center text-white font-bold text-xs shadow-lg ring-2 ring-slate-800">
            K
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">Kartik Lathiyan</p>
            <p className="text-[10px] text-slate-500 truncate">Enterprise Plan</p>
          </div>
        </div>
      </div>
    </div>
  );
}
