
import React, { useRef, useEffect } from 'react';
import { Message, Model } from '../types';

interface ChatWindowProps {
  messages: Message[];
  isThinking: boolean;
  selectedModel: Model;
  isThinkingMode: boolean;
  onToggleThinkingMode: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ 
  messages, 
  isThinking, 
  selectedModel,
  isThinkingMode,
  onToggleThinkingMode
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950">
      {/* Header */}
      <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{selectedModel.icon}</span>
          <div>
            <h2 className="text-sm font-semibold text-white leading-none">{selectedModel.name}</h2>
            <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">{selectedModel.category}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer group">
            <span className="text-xs font-medium text-slate-400 group-hover:text-blue-400 transition-colors">
              Thinking Mode
            </span>
            <div 
              className="relative"
              onClick={onToggleThinkingMode}
            >
              <div className={`w-10 h-5 rounded-full transition-colors ${isThinkingMode ? 'bg-blue-600' : 'bg-slate-700'}`} />
              <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform transform ${isThinkingMode ? 'translate-x-5' : 'translate-x-0'}`} />
            </div>
          </label>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 text-3xl">
              {selectedModel.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Welcome to {selectedModel.name}</h3>
            <p className="text-slate-400 text-sm">
              I'm one of the 150 specialized Maguai models. {selectedModel.description} How can I assist you today?
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] rounded-2xl p-4 ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700 shadow-xl'
            }`}>
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {msg.content}
              </div>
              <div className={`text-[10px] mt-2 opacity-50 ${msg.role === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex justify-start">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-none p-4 flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {isThinkingMode ? 'Maguai is thinking deeply...' : 'Maguai is responding...'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
