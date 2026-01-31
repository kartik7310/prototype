import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  User,
  Bot,
  Sparkles,
  Pin,
} from "lucide-react";
import { cn } from "../lib/utils";

/* =======================
   Types
======================= */

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  images?: string[];
}

/* =======================
   Mock RAG-style response
========================== */

function generateLongAIResponse(topic: string, categoryName: string) {
  return {
    images: [
      "https://images.unsplash.com/photo-1532012197267-da84d127e765",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
    ],
    content: `
1. Introduction
${topic} is a foundational concept in ${categoryName} that sets the stage for deeper understanding.

2. Core Principles
These principles explain how the system behaves under different conditions.

3. Why This Matters
Understanding this topic improves both academic learning and practical problem solving.

4. Key Terminology
Knowing the correct terminology avoids confusion in advanced discussions.

5. Step-by-Step Explanation
Each idea builds logically on the previous one.

6. Common Mistakes
Many learners struggle due to incorrect assumptions at this stage.

7. Real World Applications
This concept appears frequently in exams and industry use cases.

8. Worked Examples
Examples help reinforce understanding and confidence.

9. Advanced Insights
Once basics are clear, deeper patterns become visible.

10. Summary
Mastering ${topic} will significantly strengthen your ${categoryName} skills.
`.trim(),
  };
}

/* =======================
   Component
======================= */

export default function ChatInterface({
  activeChatId,
  categoryName,
}: {
  activeChatId: string | null;
  categoryName: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  /* Load initial message */
  useEffect(() => {
    if (activeChatId) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: `Hello! I'm your ${categoryName} AI tutor. How can I help you today?`,
        },
      ]);
    } else {
      setMessages([]);
    }
  }, [activeChatId, categoryName]);

  /* Auto scroll */
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  /* Send message */
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const ai = generateLongAIResponse(input, categoryName);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: ai.content,
        images: ai.images,
      };

      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  /* Empty state */
  if (!activeChatId) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white p-8">
        <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center mb-6 text-slate-300">
          <Sparkles size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Select a conversation
        </h2>
        <p className="text-slate-500 text-center max-w-sm">
          Pick a chat from the sidebar or start a new session in {categoryName}.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <div className="px-8 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {categoryName} Assistant
            </h3>
            <p className="text-[10px] text-green-500 flex items-center mt-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5" />
              AI Agent Online
            </p>
          </div>
        </div>
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg">
          <Pin size={18} />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-8 py-8 space-y-8"
      >
        {messages.map(message => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "flex max-w-[80%] space-x-4",
                message.role === "user" && "flex-row-reverse space-x-reverse"
              )}
            >
              <div
                className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center",
                  message.role === "user"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600"
                )}
              >
                {message.role === "user" ? (
                  <User size={18} />
                ) : (
                  <Bot size={18} />
                )}
              </div>

              <div
                className={cn(    
                  "p-4 rounded-2xl text-sm space-y-8",
                  message.role === "user"
                    ? "bg-slate-900 text-white rounded-tr-none"
                    : "bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-none"
                )}
              >
                {/* Images on TOP */}
                {message.images && (
                  <div className="grid grid-cols-2 gap-3">
                    {message.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt="AI reference"
                        className="rounded-xl border border-slate-200 object-cover"
                      />
                    ))}
                  </div>
                )}

                {/* Plain text content */}
                <p className="whitespace-pre-wrap leading-relaxed">
                  {message.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-8 pb-8 pt-4 bg-white">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto relative">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={`Message ${categoryName} Assistant...`}
            className="w-full pl-4 pr-20 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-slate-900 text-white rounded-xl disabled:opacity-30"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
