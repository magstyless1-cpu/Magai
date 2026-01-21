
import React, { useState, useMemo } from 'react';
import { MODELS } from '../constants';
import { Model } from '../types';

interface SidebarProps {
  selectedModelId: string;
  onSelectModel: (model: Model) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedModelId, onSelectModel }) => {
  const [search, setSearch] = useState('');

  const filteredModels = useMemo(() => {
    return MODELS.filter(m => 
      m.name.toLowerCase().includes(search.toLowerCase()) || 
      m.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="w-80 h-full bg-slate-900 border-r border-slate-800 flex flex-col overflow-hidden shrink-0">
      <div className="p-4 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-blue-500">Maguai</span> AI Hub
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search 150 models..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800 text-slate-200 text-sm rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none border border-slate-700"
          />
          <svg className="w-4 h-4 absolute right-3 top-2.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-2 space-y-1">
          {filteredModels.map((model) => (
            <button
              key={model.id}
              onClick={() => onSelectModel(model)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all group ${
                selectedModelId === model.id 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">{model.icon}</span>
              <div className="text-left overflow-hidden">
                <p className="text-sm font-medium truncate">{model.name}</p>
                <p className={`text-xs truncate ${selectedModelId === model.id ? 'text-blue-100' : 'text-slate-500'}`}>
                  {model.category}
                </p>
              </div>
            </button>
          ))}
          {filteredModels.length === 0 && (
            <div className="text-center py-10 text-slate-500 text-sm">
              No Maguai models found.
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-top border-slate-800 text-xs text-slate-500 text-center">
        150 Models Loaded Successfully
      </div>
    </div>
  );
};

export default Sidebar;
