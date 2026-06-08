import React, { useState } from 'react';
import { Brain, CornerDownLeft, ArrowLeft, Check, Plus, ShieldCheck, HelpCircle } from 'lucide-react';
import { IndustryType } from '../types';

interface ConfigPageProps {
  onBack: () => void;
  onComplete: (config: { workspaceName: string; channels: string[] }) => void;
}

export default function ConfigPage({ onBack, onComplete }: ConfigPageProps) {
  // Option pills based on the reference layout
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['在线销售']);
  const [workspaceName, setWorkspaceName] = useState('');

  const channelOptions = [
    { label: '在线销售', code: 'online' },
    { label: 'Vendi in negozio', code: 'pos' },
    { label: '代发货', code: 'dropship' },
    { label: '数字产品销售商', code: 'digital' },
    { label: 'Trasferisci negozio esistente', code: 'transfer' },
  ];

  const toggleChannel = (label: string) => {
    if (selectedChannels.includes(label)) {
      setSelectedChannels(selectedChannels.filter(c => c !== label));
    } else {
      setSelectedChannels([...selectedChannels, label]);
    }
  };

  const handleContinue = () => {
    onComplete({
      workspaceName: workspaceName.trim() || '未命名智能企业空间',
      channels: selectedChannels,
    });
  };

  return (
    <div id="config-page-wrapper" className="bg-slate-950 min-h-screen text-slate-100 font-sans flex flex-col justify-between overflow-x-hidden relative">
      
      {/* Absolute subtle background light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-500/5 to-transparent blur-3xl pointer-events-none rounded-full"></div>

      {/* HEADER LOGO */}
      <header className="px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2 select-none">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-sm font-bold tracking-wider text-white uppercase">AI BUSINESS OS</span>
          </div>
        </div>
      </header>

      {/* CORE CONFIG CONTAINER */}
      <main className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center px-6 py-6 relative">
        
        {/* Title Banner */}
        <div className="text-center space-y-2 mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-white tracking-tight">我们开始</h1>
          <p className="text-slate-400 text-sm font-normal">个性化配置的最佳选择</p>
        </div>

        {/* Configuration Card Structure - Highly optimized for mobile stack and desktop alignment */}
        <div className="w-full max-w-xl pb-12 relative flex flex-col md:flex-row items-stretch md:items-start gap-3 md:gap-4">
          
          {/* Back Action button, responsive size and placement */}
          <button 
            onClick={onBack}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer self-start flex items-center justify-center animate-fade-in"
            title="返回行业选择"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5 md:mr-0 inline" />
            <span className="text-xs font-bold md:hidden">返回上一步</span>
          </button>

          {/* Core selection card */}
          <div className="flex-1 bg-white text-slate-900 rounded-3xl p-5 md:p-8 shadow-2xl space-y-6 animate-slide-up">
            
            {/* Subsection Selectors */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-500 block uppercase tracking-wider font-mono">2. 打算通过哪些渠道开展经营？ / Channels</span>
              
              {/* Flex wrapped pills array */}
              <div className="flex flex-wrap gap-2 pt-1">
                {channelOptions.map((ch) => {
                  const isSelected = selectedChannels.includes(ch.label);
                  return (
                    <button
                      key={ch.code}
                      type="button"
                      onClick={() => toggleChannel(ch.label)}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer select-none ${
                        isSelected 
                          ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      {isSelected ? (
                        <Check className="w-3 h-3 text-emerald-400 font-bold" />
                      ) : (
                        <Plus className="w-3 h-3 text-slate-400" />
                      )}
                      <span>{ch.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input Name field */}
            <div className="space-y-2 pt-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                1. 来吧 想好给您的企业空间/店铺命名了吗？
              </label>
              <input 
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                placeholder="Il mio negozio (例如：极光时尚设计院)"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all font-medium font-mono"
              />
            </div>

            {/* Submit Action Button */}
            <button
              onClick={handleContinue}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>立即创建企业空间</span>
            </button>

            {/* Skip Option Footer */}
            <div className="text-center pt-2">
              <button 
                onClick={handleContinue}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors underline cursor-pointer"
              >
                Lo farò in seguito / 以后再说，先跳过
              </button>
            </div>

          </div>

        </div>

      </main>

      {/* LOWER FOOTER */}
      <footer className="py-6 border-t border-slate-900 px-8 text-center select-none bg-slate-950">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[10px] font-mono text-slate-600">
          <span>AI BUSINESS OS © 2026</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>AUTHENTICATED STATE</span>
          </span>
        </div>
      </footer>

    </div>
  );
}
