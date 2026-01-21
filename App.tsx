
import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import { Model, Message } from './types';
import { MODELS } from './constants';
import { sendMessageToGemini } from './services/geminiService';

const App: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<Model>(MODELS[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isThinkingMode, setIsThinkingMode] = useState(false);

  const handleSendMessage = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isThinking) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsThinking(true);

    try {
      const responseText = await sendMessageToGemini(newMessages, isThinkingMode);
      
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I encountered an error connecting to the Maguai network. Please check your connection and try again.",
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsThinking(false);
    }
  }, [input, messages, isThinking, isThinkingMode]);

  const toggleThinkingMode = () => setIsThinkingMode(prev => !prev);

  const handleModelSelect = (model: Model) => {
    setSelectedModel(model);
    // Optionally clear messages or start new thread
    setMessages([]);
  };

  return (
    <div className="flex h-screen w-full bg-slate-950 overflow-hidden">
      <Sidebar 
        selectedModelId={selectedModel.id} 
        onSelectModel={handleModelSelect} 
      />
      
      <div className="flex-1 flex flex-col relative">
        <ChatWindow 
          messages={messages}
          isThinking={isThinking}
          selectedModel={selectedModel}
          isThinkingMode={isThinkingMode}
          onToggleThinkingMode={toggleThinkingMode}
        />

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-slate-950 border-t border-slate-800">
          <form 
            onSubmit={handleSendMessage}
            className="max-w-4xl mx-auto relative"
          >
            <div className="relative flex items-end gap-2 bg-slate-900 border border-slate-700 rounded-2xl p-2 shadow-2xl focus-within:border-blue-500/50 transition-all">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={`Message ${selectedModel.name}...`}
                className="flex-1 bg-transparent text-slate-200 p-3 outline-none resize-none text-sm max-h-40 min-h-[44px]"
                rows={1}
              />
              <button
                type="submit"
                disabled={!input.trim() || isThinking}
                className={`p-2.5 rounded-xl transition-all ${
                  input.trim() && !isThinking 
                    ? 'bg-blue-600 text-white hover:bg-blue-500 hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/20' 
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-slate-500 text-center mt-3">
              {isThinkingMode ? "Advanced Thinking Mode Enabled (High Budget Reasoning)" : "Standard Mode Active • Switch to Thinking Mode for complex tasks"}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
