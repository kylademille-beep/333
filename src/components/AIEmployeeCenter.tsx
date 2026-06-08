import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  UserPlus, 
  Settings2, 
  CheckCircle, 
  X, 
  ShieldAlert, 
  Play, 
  Zap, 
  Layers, 
  Clock, 
  DollarSign, 
  Plus, 
  FileEdit,
  Trash2
} from 'lucide-react';
import { AIEmployee, IndustryType } from '../types';

interface AIEmployeeCenterProps {
  activeAgents: AIEmployee[];
  onUpdateAgents: (updated: AIEmployee[]) => void;
  selectedIndustry: IndustryType;
  addLog: (agent: string, action: string, details: string, type?: 'info' | 'success' | 'warning' | 'error' | 'tool') => void;
}

export default function AIEmployeeCenter({ 
  activeAgents, 
  onUpdateAgents, 
  selectedIndustry, 
  addLog 
}: AIEmployeeCenterProps) {
  const [editingAgentId, setEditingAgentId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form states for custom AI Employee
  const [newName, setNewName] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newEmoji, setNewEmoji] = useState('🤖');
  const [newRole, setNewRole] = useState('');
  const [newCapability, setNewCapability] = useState('');
  const [newCapabilitiesList, setNewCapabilitiesList] = useState<string[]>([]);
  const [newSystemPrompt, setNewSystemPrompt] = useState('');
  const [newModel, setNewModel] = useState('gemini-3.5-flash');

  // Edit form state
  const [editPromptValue, setEditPromptValue] = useState('');
  const [editModelValue, setEditModelValue] = useState('');

  // Filter agents by industry or CEO
  const visibleAgents = activeAgents.filter(agent => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = agent.name.toLowerCase().includes(query) || 
                          agent.title.toLowerCase().includes(query) || 
                          agent.role.toLowerCase().includes(query);
    
    // Show agents belonging to current industry or global CEO agents
    const isGlobalOrLocal = agent.id.startsWith(selectedIndustry[0]) || agent.id.includes('ceo');
    return matchesSearch && isGlobalOrLocal;
  });

  const handleStartEdit = (agent: AIEmployee) => {
    setEditingAgentId(agent.id);
    setEditPromptValue(agent.systemPrompt);
    setEditModelValue(agent.model);
  };

  const handleSaveEdit = (agentId: string) => {
    const updated = activeAgents.map(a => {
      if (a.id === agentId) {
        addLog(
          'System Operator',
          'Updated Agent System Prompt',
          `Re-calibrated system instruction prompt weights and LLM endpoint targeting (${editModelValue}) for AI: [${a.name}].`,
          'success'
        );
        return {
          ...a,
          systemPrompt: editPromptValue,
          model: editModelValue
        };
      }
      return a;
    });
    onUpdateAgents(updated);
    setEditingAgentId(null);
  };

  const handleAddCapability = () => {
    if (newCapability.trim()) {
      setNewCapabilitiesList([...newCapabilitiesList, newCapability.trim()]);
      setNewCapability('');
    }
  };

  const handleCreateAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newTitle || !newSystemPrompt) return;

    const newAgent: AIEmployee = {
      id: `${selectedIndustry[0]}_agent_${Date.now()}`,
      name: newName,
      title: newTitle,
      role: newRole || 'Assists with localized corporate storefront operations.',
      status: 'Idle',
      emoji: newEmoji,
      description: `A customized AI agent specialized for our ${selectedIndustry} operations structure.`,
      capabilities: newCapabilitiesList.length > 0 ? newCapabilitiesList : ['SaaS Operations Helper'],
      systemPrompt: newSystemPrompt,
      model: newModel,
      tasksCompleted: 0
    };

    onUpdateAgents([...activeAgents, newAgent]);
    addLog(
      'System Operator',
      'Provisioned Custom AI Employee',
      `Spawned dynamic agent "${newAgent.name}" successfully. Injected customized workflow parameters & system roles.`,
      'success'
    );

    // Reset Form
    setNewName('');
    setNewTitle('');
    setNewEmoji('🤖');
    setNewRole('');
    setNewCapabilitiesList([]);
    setNewSystemPrompt('');
    setNewModel('gemini-3.5-flash');
    setShowAddForm(false);
  };

  const handleDeleteAgent = (agentId: string, agentName: string) => {
    if (confirm(`Are you sure you want to offboard/decommission AI Employee "${agentName}"?`)) {
      onUpdateAgents(activeAgents.filter(a => a.id !== agentId));
      addLog(
        'System Operator',
        'Decommissioned AI agent',
        `Cleanly offboarded AI agent "${agentName}" and severed active multi-agent workflow bindings.`,
        'warning'
      );
    }
  };

  // KPIs
  const totalTasks = visibleAgents.reduce((sum, a) => sum + (a.tasksCompleted || 0), 0);
  const savedHours = (totalTasks * 0.4).toFixed(1); // average 24 minutes saved per task
  const savedROIValue = (parseFloat(savedHours) * 24.5).toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' }); // ¥24.5 / hr average junior staff rate

  return (
    <div className="space-y-6 text-left">
      {/* Top statistics banners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 text-white p-5 rounded-2xl shadow-sm border border-indigo-950 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-indigo-300 font-bold tracking-wider uppercase font-mono">Core Fleet</span>
            <h4 className="text-2xl font-bold font-mono">{visibleAgents.length} Agents</h4>
            <p className="text-[11px] text-indigo-200">Active in {selectedIndustry.toUpperCase()} department</p>
          </div>
          <Bot className="w-12 h-12 text-indigo-400 opacity-40 shrink-0" />
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1 col-span-2">
            <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Delegated Execution</span>
            <h4 className="text-2xl font-bold text-slate-800 font-mono">{totalTasks} Decisions</h4>
            <p className="text-[11px] text-slate-500">Autonomous API tasks completed</p>
          </div>
          <Zap className="w-10 h-10 text-emerald-500 shrink-0 opacity-20" />
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1 col-span-2">
            <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Saved ROI (Human Equivalent)</span>
            <h4 className="text-2xl font-bold text-emerald-600 font-mono">{savedROIValue}</h4>
            <p className="text-[11px] text-slate-500">Estimated {savedHours} hours workforce saved</p>
          </div>
          <DollarSign className="w-10 h-10 text-emerald-500 shrink-0 opacity-20" />
        </div>
      </div>

      {/* Main Operations Block */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-bold text-slate-800 font-display text-base">AI 雇员多代理集群组网</h3>
            <p className="text-xs text-slate-500 mt-0.5">管理具有高级岗位意识的专属 AI 助理。编辑岗位提示词以微调其话风和决策权重。</p>
          </div>

          <div className="flex items-center gap-3">
            <input 
              type="text" 
              placeholder="搜索 AI 雇员属性..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600 px-3 py-1.5 rounded-xl text-xs w-48 font-mono"
            />
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shrink-0 py-1.5 px-3.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>入职新型 AI 雇员</span>
            </button>
          </div>
        </div>

        {/* Add custom agent form */}
        {showAddForm && (
          <form onSubmit={handleCreateAgent} className="p-5 bg-slate-50 border border-indigo-100 rounded-2xl space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-indigo-100/50 pb-2">
              <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                入职新 AI 团队雇员 (Spawn LLM Agent Persona)
              </h4>
              <button 
                type="button" 
                onClick={() => setShowAddForm(false)}
                className="text-slate-400 hover:text-rose-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Emoji 头像</label>
                <input 
                  type="text" 
                  value={newEmoji} 
                  onChange={e => setNewEmoji(e.target.value)}
                  className="w-full text-center bg-white border border-slate-300 rounded-lg py-1.5 text-sm" 
                />
              </div>

              <div className="md:col-span-4">
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">雇员姓名</label>
                <input 
                  type="text" 
                  required 
                  placeholder="例如: Sophia (索菲亚)" 
                  value={newName} 
                  onChange={e => setNewName(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-indigo-500 font-semibold text-slate-800" 
                />
              </div>

              <div className="md:col-span-4">
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">岗位头衔</label>
                <input 
                  type="text" 
                  required 
                  placeholder="例如: 财务审计主管 Agent" 
                  value={newTitle} 
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-indigo-500 font-semibold text-slate-800" 
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">后台接口模型</label>
                <select 
                  value={newModel} 
                  onChange={e => setNewModel(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="gemini-3.5-flash">Gemini 3.5 Flash (极佳速度+推理)</option>
                  <option value="gemini-3.5-pro">Gemini 3.5 Pro (深度专家分析型)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">主要职能描述</label>
                <textarea 
                  rows={2}
                  value={newRole} 
                  onChange={e => setNewRole(e.target.value)}
                  placeholder="主导特定业务周期的自动化审计及物流跟踪决策..."
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-indigo-500 text-slate-700" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">AI 技能组 / 接口工具能力 (Capabilities)</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="输入一个技能(例如: PDF发票解析)" 
                    value={newCapability} 
                    onChange={e => setNewCapability(e.target.value)}
                    className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-1 text-xs focus:ring-1 focus:ring-indigo-505" 
                  />
                  <button 
                    type="button" 
                    onClick={handleAddCapability}
                    className="bg-indigo-50 text-indigo-700 border border-indigo-100 hover:bg-indigo-100 px-3.5 py-1 text-xs font-bold rounded-lg cursor-pointer"
                  >
                    添加
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {newCapabilitiesList.map((cap, ci) => (
                    <span key={ci} className="text-[9px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-1 font-mono">
                      {cap}
                      <button type="button" onClick={() => setNewCapabilitiesList(newCapabilitiesList.filter((_, idx) => idx !== ci))} className="text-slate-400 hover:text-red-500">×</button>
                    </span>
                  ))}
                  {newCapabilitiesList.length === 0 && <span className="text-[10px] text-slate-400 italic font-normal">暂无自定义技能，默认赋予基础 OS 协同检索权限。</span>}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">系统设定 System Prompt (AI 岗位指导指令)</label>
              <textarea 
                rows={4}
                required
                value={newSystemPrompt} 
                onChange={e => setNewSystemPrompt(e.target.value)}
                placeholder="你是一个零售服装供应链采购决策专家。只相信事实SKU和合理成本比例，说话冷静、高效率，使用结构化条款回复商户..."
                className="w-full bg-white border border-slate-300 rounded-lg p-3 text-xs focus:ring-1 focus:ring-indigo-500 font-mono text-slate-800" 
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-150">
              <button 
                type="button" 
                onClick={() => setShowAddForm(false)}
                className="text-slate-500 hover:text-rose-500 font-bold text-xs px-4 py-2 cursor-pointer"
              >
                取消
              </button>
              <button 
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2 rounded-xl transition-all shadow-md shadow-indigo-200 cursor-pointer"
              >
                授权并正式入职 (Confirm Authorization)
              </button>
            </div>
          </form>
        )}

        {/* AI Employees grid list */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {visibleAgents.map((agent) => {
            const isEditing = editingAgentId === agent.id;

            return (
              <div 
                key={agent.id} 
                className={`border rounded-2xl p-5 shadow-sm space-y-4 hover:shadow-md transition-all text-left flex flex-col justify-between ${
                  isEditing 
                    ? 'border-indigo-550 ring-2 ring-indigo-50 bg-indigo-50/10' 
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 text-left">
                      <span className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl shadow-inner select-none">
                        {agent.emoji}
                      </span>
                      <div className="flex flex-col text-left">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-800 font-display text-sm">{agent.name}</span>
                          <span className={`w-1.5 h-1.5 rounded-full ${agent.status === 'Offline' ? 'bg-slate-300' : 'bg-emerald-500 animate-pulse'}`}></span>
                        </div>
                        <span className="text-[10px] bg-slate-150 text-slate-600 px-2 py-0.2 rounded font-mono font-bold leading-tight uppercase w-max tracking-wide">
                          {agent.title}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {!isEditing && (
                        <button
                          onClick={() => handleStartEdit(agent)}
                          title="配置 AI 意识和底层逻辑"
                          className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Settings2 className="w-4 h-4" />
                        </button>
                      )}
                      
                      {/* Only custom agents can be offboarded */}
                      {agent.id.includes('agent') && (
                        <button
                          onClick={() => handleDeleteAgent(agent.id, agent.name)}
                          title="解雇/注销 AI 雇员"
                          className="p-1 text-slate-400 hover:text-rose-500 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 font-normal leading-relaxed">
                    {agent.role}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {agent.capabilities.map((cap, index) => (
                      <span key={index} className="text-[9px] bg-indigo-50 text-indigo-700 font-mono font-bold px-2 py-0.5 rounded leading-normal">
                        ⚙️ {cap}
                      </span>
                    ))}
                  </div>

                  {/* System Instruction / prompt editor */}
                  {isEditing ? (
                    <div className="space-y-3 bg-slate-50 border border-indigo-100 rounded-xl p-3 animate-fadeIn mt-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase text-indigo-900 tracking-wider">岗位底层提示词 Prompt 调节</span>
                        <select 
                          value={editModelValue}
                          onChange={(e) => setEditModelValue(e.target.value)}
                          className="bg-white border rounded text-[10px] p-0.5 focus:outline-none"
                        >
                          <option value="gemini-3.5-flash">Gemini 3.5 Flash</option>
                          <option value="gemini-3.5-pro">Gemini 3.5 Pro</option>
                        </select>
                      </div>
                      <textarea
                        rows={4}
                        value={editPromptValue}
                        onChange={e => setEditPromptValue(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded p-2 text-xs text-slate-800 font-mono focus:outline-none leading-relaxed"
                      />
                      <div className="flex justify-end gap-2 text-xs">
                        <button 
                          onClick={() => setEditingAgentId(null)}
                          className="text-slate-500 hover:text-red-500 py-1 px-2.5 font-bold cursor-pointer"
                        >
                          取消
                        </button>
                        <button 
                          onClick={() => handleSaveEdit(agent.id)}
                          className="bg-indigo-600 text-white font-bold py-1 px-3 rounded-lg hover:bg-indigo-755 cursor-pointer"
                        >
                          同步意识参数
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-[11px] leading-relaxed relative max-h-24 overflow-y-auto mt-2">
                      <span className="block text-[8px] font-black uppercase text-slate-400 tracking-wider mb-0.5">ACTIVE SYSTEM PROMPT:</span>
                      <code className="text-slate-500 font-mono font-medium block whitespace-pre-wrap">{agent.systemPrompt}</code>
                    </div>
                  )}
                </div>

                {/* Dashboard Metrics footer per agent */}
                <div className="border-t border-slate-100 pt-3 mt-4 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    <span>自动接管: <b className="text-slate-800 font-mono">{(agent.tasksCompleted || 0) * 2}</b> 项后台任务</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] bg-indigo-50/50 text-indigo-805 border border-indigo-100/50 px-2 rounded">
                      Model: <b>{agent.model}</b>
                    </span>
                    <span className="font-mono text-[11px] font-bold text-slate-800">
                      ROI: {(agent.tasksCompleted || 0) * 0.4}hr
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
