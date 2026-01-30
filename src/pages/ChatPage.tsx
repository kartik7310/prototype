import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, Pin, Paperclip, Smile } from 'lucide-react';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatInterface({ 
  activeChatId,
  categoryName 
}: { 
  activeChatId: string | null;
  categoryName: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeChatId) {
      // Mock loading messages for active chat
      setMessages([
        { id: '1', role: 'assistant', content: `Hello! I'm your ${categoryName} AI tutor. How can I help you today?` },
        { id: '2', role: 'user', content: 'Tell me about the key concepts in this module.' },
        { id: '3', role: 'assistant', content: 'Certainly! The main concepts include the foundational principles and their practical applications. Would you like a detailed breakdown of each?' }
      ]);
    } else {
      setMessages([]);
    }
  }, [activeChatId, categoryName]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Mock AI reply
    setTimeout(() => {
      const assistantMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: `As your ${categoryName} assistant, I can confirm that "${input.substring(0, 20)}..." is an interesting topic. Let's explore it further.` 
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  if (!activeChatId) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white p-8 animate-in fade-in duration-700">
        <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center mb-6 text-slate-300">
          <Sparkles size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Select a conversation</h2>
        <p className="text-slate-500 text-center max-w-sm">
          Pick a chat from the sidebar or start a new learning session in {categoryName}.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
      {/* Header */}
      <div className="px-8 py-4 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-md z-10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 leading-none">{categoryName} Assistant</h3>
            <p className="text-[10px] text-green-500 font-medium mt-1 inline-flex items-center">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5" />
              AI Agent Online
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
            <Pin size={18} />
          </button>
          <button className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
            Share
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-8 py-8 space-y-8 scroll-smooth">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={cn(
              "flex group animate-in slide-in-from-bottom-2 duration-300",
              message.role === 'user' ? "justify-end" : "justify-start"
            )}
          >
            <div className={cn(
              "flex max-w-[80%] space-x-4",
              message.role === 'user' && "flex-row-reverse space-x-reverse"
            )}>
              <div className={cn(
                "w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center shadow-sm",
                message.role === 'user' ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"
              )}>
                {message.role === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div className={cn(
                "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                message.role === 'user' 
                  ? "bg-slate-900 text-white rounded-tr-none" 
                  : "bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-none"
              )}>
                {message.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="px-8 pb-8 pt-4 bg-gradient-to-t from-white via-white to-transparent">
        <form 
          onSubmit={handleSend}
          className="max-w-4xl mx-auto relative group"
        >
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center space-x-2 text-slate-400">
            <label className="cursor-pointer hover:text-slate-600 p-1">
              <Paperclip size={18} />
              <input type="file" className="hidden" />
            </label>
          </div>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message ${categoryName} Assistant...`}
            className="w-full pl-12 pr-24 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all shadow-sm group-focus-within:shadow-md text-slate-900 placeholder:text-slate-400"
          />
          
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
            <button type="button" className="p-2 text-slate-400 hover:text-slate-600">
              <Smile size={18} />
            </button>
            <button 
              type="submit"
              disabled={!input.trim()}
              className="p-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-slate-900 transition-all active:scale-95"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
        <p className="text-[10px] text-center text-slate-400 mt-3">
          AI can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
}
