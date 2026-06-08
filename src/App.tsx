import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Brain, 
  Play, 
  CheckCircle, 
  TrendingUp, 
  TrendingDown, 
  Search, 
  AlertTriangle, 
  Activity, 
  Database, 
  Cpu, 
  BookOpen, 
  ShoppingBag, 
  DollarSign, 
  Clock, 
  Plus, 
  Settings, 
  Check, 
  ExternalLink, 
  Lock, 
  RefreshCw, 
  Sliders, 
  HelpCircle, 
  Send, 
  Terminal, 
  User, 
  BarChart3,
  X,
  CreditCard,
  Shuffle,
  Scale,
  PackagePlus,
  GitBranch,
  Layers,
  ArrowRight,
  Home,
  ShoppingCart,
  Users,
  Megaphone,
  Percent,
  FileText,
  Store,
  Coins,
  Bot,
  Globe,
  Truck,
  Mail
} from 'lucide-react';
import { IndustryType, TenantConfig, ProductItem, OrderItem, AIEmployee, Workflow, WorkflowNode, KnowledgeDoc, McpTool, AppMarketItem, CollaborationLog, SourcingRecommendation, CustomerItem, AIContext } from './types';
import { INDUSTRY_PRESETS, COMMON_MCP_TOOLS, APP_MARK_PRESETS, PLATFORM_STATS } from './data';
import { DOCTREE_DATA, DocTreeNode } from './doctreeData';
import DocTreeViewer from './components/DocTreeViewer';
import LandingPage from './components/LandingPage';
import RegisterPage from './components/RegisterPage';
import ConfigPage from './components/ConfigPage';
import IndustryPage from './components/IndustryPage';
import ProvisioningPage from './components/ProvisioningPage';
import AICommandCenter from './components/AICommandCenter';
import SaaSMerchantWorkbench from './components/SaaSMerchantWorkbench';
import SalesCenter from './components/SalesCenter';
import ProductCenter from './components/ProductCenter';
import OrderCenter from './components/OrderCenter';
import LogisticsCenter from './components/LogisticsCenter';
import CustomerCenter from './components/CustomerCenter';
import MarketingCenter from './components/MarketingCenter';
import FinanceCenter from './components/FinanceCenter';
import PaymentCenter from './components/PaymentCenter';
import OnlineStore from './components/OnlineStore';
import AIEmployeeCenter from './components/AIEmployeeCenter';
import EmployeeCenter from './components/EmployeeCenter';
import RolesCenter from './components/RolesCenter';
import EnterpriseSettings from './components/EnterpriseSettings';
import ShopifyDocsFinder from './components/ShopifyDocsFinder';
import PoliciesManagement from './components/PoliciesManagement';
import SuperAdminCenter from './components/SuperAdminCenter';
import { 
  runtimeContextManager, 
  mapIndustry, 
  mapPage, 
  getCountryForIndustry, 
  getTenantInfo,
  ReactAIContextProvider
} from './context/AIContextProvider';
import { aiRuntimeStore } from './store/aiRuntimeStore';
import { AIContextService } from './services/AIContextService';

export default function App() {
  // Active states
  const [viewMode, setViewMode] = useState<'landing' | 'register' | 'industry' | 'config' | 'provisioning' | 'app'>('landing');
  const [companyName, setCompanyName] = useState<string>('极光数字科技有限公司');
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType>('retail');
  const [activeTab, setActiveTab ] = useState<string>('command');
  const [adminMode, setAdminMode] = useState<'merchant' | 'super_admin'>('merchant');
  const [globalDefaultModel, setGlobalDefaultModel] = useState<string>('gemini-2.5-flash');
  const [tenants, setTenants] = useState<TenantConfig[]>([
    { id: 't_retail', companyName: '米兰风尚服装批发集团', industry: 'retail', storeName: '米兰风尚女装批发店', status: 'active', aiBudget: 500, aiSpent: 124.5, createdAt: '2026-01-12' },
    { id: 't_food', companyName: '慕尼黑中餐连锁配送柜', industry: 'food', storeName: '慕尼黑私房菜配送店', status: 'active', aiBudget: 200, aiSpent: 18.2, createdAt: '2026-02-18' },
    { id: 't_manufacturing', companyName: '柏林智慧电器百货商行', industry: 'manufacturing', storeName: '智慧电器多门店直销店', status: 'active', aiBudget: 1000, aiSpent: 418.2, createdAt: '2026-03-01' },
    { id: 't_healthcare', companyName: '巴黎名品商场POS收银柜部', industry: 'healthcare', storeName: '巴黎高端香水POS快速结算端', status: 'active', aiBudget: 1500, aiSpent: 890.0, createdAt: '2026-03-24' },
    { id: 't_service', companyName: '罗马皇家女子美容Spa会所', industry: 'service', storeName: '罗马会所美容线上预订端', status: 'active', aiBudget: 400, aiSpent: 122.5, createdAt: '2026-04-10' },
    { id: 't_education', companyName: '奥地利跨境网店直销部', industry: 'education', storeName: '382跨境3C出海站', status: 'active', aiBudget: 600, aiSpent: 210.0, createdAt: '2026-05-02' }
  ]);
  const [isCommandCenterOpen, setIsCommandCenterOpen] = useState(false);
  const [isOnlineStoreOpen, setIsOnlineStoreOpen] = useState(false);
  const [discountDrafts, setDiscountDrafts] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [agentRuns, setAgentRuns] = useState<any[]>([]);
  const [agentTasks, setAgentTasks] = useState<any[]>([]);
  const [isDbLoaded, setIsDbLoaded] = useState(false);

  // Helper method to write state to disk
  const persistDatabaseState = async (
    updatedTenants = tenants,
    updatedTenantDB = tenantDB,
    updatedMcpTools = mcpTools,
    updatedMarketItems = marketItems,
    updatedActiveAgents = activeAgents,
    updatedDiscountDrafts = discountDrafts,
    updatedAuditLogs = auditLogs,
    updatedAgentRuns = agentRuns,
    updatedAgentTasks = agentTasks
  ) => {
    try {
      const payload = {
        tenants: updatedTenants,
        tenantDB: updatedTenantDB,
        mcpTools: updatedMcpTools,
        marketItems: updatedMarketItems,
        activeAgents: updatedActiveAgents,
        discountDrafts: updatedDiscountDrafts,
        auditLogs: updatedAuditLogs,
        agentRuns: updatedAgentRuns,
        agentTasks: updatedAgentTasks
      };
      await fetch('/api/db/save-all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.error("Failed to persist SaaS database:", err);
    }
  };
  
  // Localized Tenant Database (to reflect live updates without losing edits when shifting contexts)
  const [tenantDB, setTenantDB] = useState<Record<IndustryType, {
    products: ProductItem[];
    orders: OrderItem[];
    customers: CustomerItem[];
    workflows: Workflow[];
    knowledge: KnowledgeDoc[];
    metrics: any[];
  }>>(() => {
    // Deep clone presets
    const db: any = {};
    (Object.keys(INDUSTRY_PRESETS) as IndustryType[]).forEach(ind => {
      db[ind] = JSON.parse(JSON.stringify(INDUSTRY_PRESETS[ind]));
    });
    return db;
  });

  const [mcpTools, setMcpTools] = useState<McpTool[]>(COMMON_MCP_TOOLS);
  const [marketItems, setMarketItems] = useState<AppMarketItem[]>(APP_MARK_PRESETS);
  const [activeAgents, setActiveAgents] = useState<AIEmployee[]>(() => {
    // Deep clone active preset agents initially
    const initialAgents: AIEmployee[] = [];
    (Object.keys(INDUSTRY_PRESETS) as IndustryType[]).forEach(ind => {
      INDUSTRY_PRESETS[ind].agents.forEach(agent => {
        initialAgents.push({ ...agent });
      });
    });
    return initialAgents;
  });

  // Collaboration logs
  const [collaborationLogs, setCollaborationLogs] = useState<CollaborationLog[]>([]);

  // Selected chat model dialogs
  const [chatAgent, setChatAgent] = useState<AIEmployee | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Record<string, { role: 'user' | 'assistant', content: string }[]>>({});
  const [chatLoading, setChatLoading] = useState(false);

  // Active executing workflows
  const [runningWorkflowId, setRunningWorkflowId] = useState<string | null>(null);
  const [currentNodeIndex, setCurrentNodeIndex] = useState<number>(-1);
  const [workflowLogs, setWorkflowLogs] = useState<string[]>([]);

  // Simulation settings
  const [isApiKeyConnected, setIsApiKeyConnected] = useState(false);
  const [customApiKey, setCustomApiKey] = useState('');
  const [showKeyModal, setShowKeyModal] = useState(false);

  // SaaS Super Admin helper handlers
  const handleToggleTenantStatus = (tenantId: string) => {
    setTenants(prev => prev.map(t => t.id === tenantId ? { ...t, status: t.status === 'active' ? 'suspended' : 'active' } : t));
    const target = tenants.find(t => t.id === tenantId);
    if (target) {
      addLog('SaaS Platform Center', '租户状态变更', `租户「${target.companyName}」的状态已切换。`, 'warning');
    }
  };

  const handleUpdateTenantValueLimit = (tenantId: string, limit: number) => {
    setTenants(prev => prev.map(t => t.id === tenantId ? { ...t, aiBudget: limit } : t));
    const target = tenants.find(t => t.id === tenantId);
    if (target) {
      addLog('SaaS Platform Center', '租户自动化调度增配', `租户「${target.companyName}」的智能开店自动化运行预算调整为 ${limit} USD.`, 'success');
    }
  };

  // Forms / additions inputs
  const [newTitle, setNewTitle] = useState('');
  const [newSKU, setNewSKU] = useState('');
  const [newStock, setNewStock] = useState(50);
  const [newThreshold, setNewThreshold] = useState(10);
  const [newPrice, setNewPrice] = useState(29.99);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocCategory, setNewDocCategory] = useState('');
  const [newDocContent, setNewDocContent] = useState('');
  const [showAddDoc, setShowAddDoc] = useState(false);

  // Sourcing Module states
  const [sourcingRecommendations, setSourcingRecommendations] = useState<SourcingRecommendation[]>([]);
  const [sourcingLoading, setSourcingLoading] = useState(false);

  // Visual Workflow Creator state
  const [visualNodes, setVisualNodes] = useState<WorkflowNode[]>([
    { id: 'v1', type: 'trigger', title: 'Order Placed', status: 'idle', details: 'Triggers when a new customer checkout succeeds.' },
    { id: 'v2', type: 'ai_decision', title: 'Verify Inventory Levels', status: 'idle', details: 'Fulfillment agent maps stock allocations.' },
    { id: 'v3', type: 'condition', title: 'Is High Risk Fraud?', status: 'idle', details: 'Analyze credit and spatial parameters.' },
    { id: 'v4', type: 'action', title: 'Acknowledge Logistic Courier', status: 'idle', details: 'Trigger shipping label creation via DHL.' }
  ]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('v1');
  const [visualWorkflowLogs, setVisualWorkflowLogs] = useState<string[]>([]);
  const [isVisualRunning, setIsVisualRunning] = useState(false);
  const [currentVisualIndex, setCurrentVisualIndex] = useState(-1);

  // Scrolling anchor for chat
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Dynamic system simulation is disabled

  // Watch key changes or load state
  useEffect(() => {
    // Check if API key is populated in workspace ENV or if user logged it
    const checkHealth = async () => {
      try {
        const res = await fetch('/api/health');
        const data = await res.json();
        console.log("SaaS Server Connection established:", data);
      } catch (err) {
        console.error("Express backend inactive in background", err);
      }
    };
    
    const loadDB = async () => {
      try {
        const res = await fetch('/api/db/get-all');
        if (res.ok) {
          const dbData = await res.json();
          if (dbData && dbData.tenantDB) {
            if (dbData.tenants) setTenants(dbData.tenants);
            setTenantDB(dbData.tenantDB);
            if (dbData.mcpTools) setMcpTools(dbData.mcpTools);
            if (dbData.marketItems) setMarketItems(dbData.marketItems);
            if (dbData.activeAgents) setActiveAgents(dbData.activeAgents);
            if (dbData.discountDrafts) setDiscountDrafts(dbData.discountDrafts);
            if (dbData.auditLogs) setAuditLogs(dbData.auditLogs);
            if (dbData.agentRuns) setAgentRuns(dbData.agentRuns);
            if (dbData.agentTasks) setAgentTasks(dbData.agentTasks);
            console.log("SaaS Persistent DB successfully synchronized from server disk! Tenants count:", dbData.tenants?.length);
          }
        }
      } catch (err) {
        console.error("Failed to load SaaS state from DB on mount, falling back gracefully:", err);
      } finally {
        setIsDbLoaded(true);
      }
    };

    checkHealth();
    loadDB();
  }, []);

  // Save changes back to server-side persistent JSON DB automatically when states change (debounced)
  useEffect(() => {
    if (!isDbLoaded) return;
    const saveDatabaseTimeout = setTimeout(() => {
      persistDatabaseState(tenants, tenantDB, mcpTools, marketItems, activeAgents, discountDrafts, auditLogs, agentRuns, agentTasks);
    }, 850);
    return () => clearTimeout(saveDatabaseTimeout);
  }, [tenants, tenantDB, mcpTools, marketItems, activeAgents, discountDrafts, auditLogs, agentRuns, agentTasks, isDbLoaded]);

  // --- AI Runtime Context Engine Automatic Synchronization ---
  useEffect(() => {
    const currentIndustryData = tenantDB[selectedIndustry];
    const currentStoreCtx = aiRuntimeStore.getContext();
    
    AIContextService.gatherContext({
      industry: selectedIndustry,
      activeTab: activeTab,
      products: currentIndustryData.products,
      orders: currentIndustryData.orders,
      customers: currentIndustryData.customers,
      selectedProductId: currentStoreCtx.ui?.productId,
      selectedOrderId: currentStoreCtx.ui?.orderId,
      selectedCustomerId: currentStoreCtx.ui?.customerId
    });
  }, [selectedIndustry, activeTab, tenantDB]);

  const addLog = (agent: string, action: string, details: string, type: 'info' | 'success' | 'warning' | 'error' | 'tool' = 'info') => {
    const time = new Date().toTimeString().split(' ')[0];
    setCollaborationLogs(prev => [
      { id: Date.now().toString(), timestamp: time, agent, action, details, type },
      ...prev.slice(0, 49) // hold last 50
    ]);
  };

  const handleIndustryChange = (industry: IndustryType) => {
    setSelectedIndustry(industry);
    setChatAgent(null); // clear chat focus
    addLog(
      'System Operator',
      'Tenant Industry Shifted',
      `Auto-loaded enterprise DB blueprints, schemas, and AI roles for [${industry.toUpperCase()}] track.`,
      'info'
    );
  };

  const renderWithAICenterLayout = (content: React.ReactNode) => {
    return (
      <div id="ai-center-grid-layout" className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left animate-fadeIn">
        {/* Left side AI Center menu */}
        <div className="lg:col-span-3 space-y-2 shrink-0">
          <div className="bg-[#121314] text-white rounded-xl p-4 border border-[#2d2e30] mb-3 select-none shadow-md">
            <h3 className="text-xs font-black uppercase tracking-wider text-indigo-400 font-display flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-slate-300 animate-pulse" /> AI 智能中枢
            </h3>
            <p className="text-[10px] text-slate-300 mt-1.5 leading-relaxed font-normal">
              统一调度零售 SaaS 系统的 AI 员工，对齐向量 FAQ 地图知识库与条件执行触发链。
            </p>
          </div>
          
          {[
            { id: 'agents', name: '🤖 AI 员工集群管理', desc: '设定 AI 员工基础 Prompt 与模型配置' },
            { id: 'knowledge', name: '📁 Grounding 知识向量库', desc: '录入/校准向量化 FAQ 本地知识资产' },
            { id: 'visual-workflow', name: '⚙️ 自动业务工作流', desc: '编排触发器、无代码流转以及状态判定' }
          ].map(item => {
            const isSubActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  addLog('Navigation', 'AI中枢跳转', `视图切换到「${item.name}」`, 'info');
                }}
                className={`w-full text-left p-3 rounded-xl border transition-all flex flex-col space-y-1 select-none cursor-pointer group ${
                  isSubActive 
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-md font-bold' 
                    : 'bg-white border-slate-200/80 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className={`text-xs font-bold leading-none ${isSubActive ? 'text-white' : 'text-slate-800 group-hover:text-black'}`}>{item.name}</span>
                <span className={`text-[10px] leading-snug font-normal ${isSubActive ? 'text-indigo-100 font-medium' : 'text-slate-400'}`}>
                  {item.desc}
                </span>
              </button>
            );
          })}
        </div>
        
        {/* Right side contents rendering area */}
        <div className="lg:col-span-9 space-y-6">
          {content}
        </div>
      </div>
    );
  };

  const renderWithDeveloperCenterLayout = (content: React.ReactNode) => {
    return (
      <div id="dev-center-grid-layout" className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left animate-fadeIn">
        {/* Left side Developer Center menu */}
        <div className="lg:col-span-3 space-y-2 shrink-0">
          <div className="bg-[#121314] text-white rounded-xl p-4 border border-[#2d2e30] mb-3 select-none shadow-md">
            <h3 className="text-xs font-black uppercase tracking-wider text-teal-400 font-display flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-slate-300" /> 开发者生态接口
            </h3>
            <p className="text-[10px] text-slate-300 mt-1.5 leading-relaxed font-normal">
              管理 API Webhook、连接外部工具代理（MCP）及检索 Shopify 开发指南。
            </p>
          </div>
          
          {[
            { id: 'shopify-docs', name: '🔍 Shopify 开发指南', desc: '检索 Shopify 标准 REST/GraphQL 规格定义' },
            { id: 'doctree', name: '📄 规格设计文档', desc: '追踪多租户零售 SaaS 系统核心设计规格树' },
            { id: 'mcp', name: '🔌 MCP 外部代理数据', desc: '配置中继服务器模型及第三方外部协议网关' }
          ].map(item => {
            const isSubActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  addLog('Navigation', '开发者中枢跳转', `视图切换到「${item.name}」`, 'info');
                }}
                className={`w-full text-left p-3 rounded-xl border transition-all flex flex-col space-y-1 select-none cursor-pointer group ${
                  isSubActive 
                    ? 'bg-[#0f766e] border-[#0f766e] text-white shadow-md font-bold' 
                    : 'bg-white border-slate-200/80 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className={`text-xs font-bold leading-none ${isSubActive ? 'text-white' : 'text-slate-800 group-hover:text-black'}`}>{item.name}</span>
                <span className={`text-[10px] leading-snug font-normal ${isSubActive ? 'text-teal-100 font-medium' : 'text-slate-400'}`}>
                  {item.desc}
                </span>
              </button>
            );
          })}
        </div>
        
        {/* Right side contents rendering area */}
        <div className="lg:col-span-9 space-y-6">
          {content}
        </div>
      </div>
    );
  };

  const renderWithSettingsCenterLayout = (content: React.ReactNode) => {
    return (
      <div id="settings-center-grid-layout" className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left animate-fadeIn">
        {/* Left side Settings Center menu */}
        <div className="lg:col-span-3 space-y-2 shrink-0">
          <div className="bg-[#121314] text-white rounded-xl p-4 border border-[#2d2e30] mb-3 select-none shadow-md">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 font-display flex items-center gap-1.5">
              <Settings className="w-4 h-4 text-slate-300 animate-spin" style={{ animationDuration: '6s' }} /> 系统参数设置
            </h3>
            <p className="text-[10px] text-slate-300 mt-1.5 leading-relaxed font-normal">
              管理本位币汇率，设置全局主体属性、员工现场出勤考勤，并设定账户矩阵准入限制。
            </p>
          </div>
          
          {[
            { id: 'settings', name: '🏢 常规与常规设置 (Generali & Piano)', desc: '店铺主体属性、欧元预设、当前订阅与账单划扣' },
            { id: 'payments', name: '💳 统一支付与网关 (Pagamenti)', desc: '连接 Stripe, PayPal, Apple Pay, Base USDC 支付网关' },
            { id: 'logistics', name: '🚚 配送与物流后勤 (Spedizione)', desc: '欧盟直发运费、配送区域划分与订单履约跟踪' },
            { id: 'employees', name: '👥 执勤物理员工管理 (Utenti)', desc: '物理门店指纹/面部打卡考勤与实时出勤值班' },
            { id: 'roles', name: '🔐 安全准入与权限 (Permessi)', desc: '各业务模块及多商家租户数据隔离安全配置' },
            { id: 'policies', name: '🛡 欧盟政策与合规 (Informative)', desc: '多国语种选取、GDPR Cookie 拦截与退款服务条款预设' }
          ].map(item => {
            const isSubActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  addLog('Navigation', '系统设置中枢跳转', `设置中枢视图切换至「${item.name}」`, 'info');
                }}
                className={`w-full text-left p-3 rounded-xl border transition-all flex flex-col space-y-1 select-none cursor-pointer group ${
                  isSubActive 
                    ? 'bg-slate-800 border-slate-800 text-white shadow-md font-bold' 
                    : 'bg-white border-slate-200/80 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className={`text-xs font-bold leading-none ${isSubActive ? 'text-white' : 'text-slate-800 group-hover:text-black'}`}>{item.name}</span>
                <span className={`text-[10px] leading-snug font-normal ${isSubActive ? 'text-slate-200 font-medium' : 'text-slate-400'}`}>
                  {item.desc}
                </span>
              </button>
            );
          })}
        </div>
        
        {/* Right side contents rendering area */}
        <div className="lg:col-span-9 space-y-6">
          {content}
        </div>
      </div>
    );
  };

  // Helper lists for the selected industry
  const currentIndustryData = tenantDB[selectedIndustry];
  const industryStats = currentIndustryData.metrics;
  const currentIndustryAgents = activeAgents.filter(a => a.id.startsWith(selectedIndustry[0]) || a.id.includes('ceo'));

  // Handler to submit high key
  const saveApiKey = () => {
    if (customApiKey.trim()) {
      setIsApiKeyConnected(true);
      setShowKeyModal(false);
      addLog('System Operator', 'Gemini SDK Key Injected', 'Connected real-time Gemini AI capabilities securely.', 'success');
    }
  };

  // Chat logic with specific AI Agent
  const openChatWithAgent = (agent: AIEmployee) => {
    setChatAgent(agent);
    setActiveTab('agents');
    if (!chatMessages[agent.id]) {
      setChatMessages(prev => ({
        ...prev,
        [agent.id]: [
          { role: 'assistant', content: `Hello! I am **${agent.name}**, your connected **${agent.title}**. ${agent.role}\n\nHow can I help you coordinate our **${selectedIndustry}** operations today?` }
        ]
      }));
    }
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !chatAgent) return;

    const userMsg = chatInput;
    setChatInput('');

    // Append user message
    const thread = [...(chatMessages[chatAgent.id] || []), { role: 'user' as const, content: userMsg }];
    setChatMessages(prev => ({
      ...prev,
      [chatAgent.id]: thread
    }));

    setChatLoading(true);
    addLog('User Command', `Query to ${chatAgent.name}`, userMsg, 'info');

    // Smooth scroll
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 80);

    try {
      const currentStoreCtx = aiRuntimeStore.getContext();
      const liveContext = AIContextService.gatherContext({
        industry: selectedIndustry,
        activeTab: activeTab,
        products: currentIndustryData.products,
        orders: currentIndustryData.orders,
        customers: currentIndustryData.customers,
        selectedProductId: currentStoreCtx.ui?.productId,
        selectedOrderId: currentStoreCtx.ui?.orderId,
        selectedCustomerId: currentStoreCtx.ui?.customerId
      });

      const response = await fetch('/api/gemini/agent-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          agent: chatAgent,
          industry: selectedIndustry,
          products: currentIndustryData.products,
          orders: currentIndustryData.orders,
          metrics: currentIndustryData.metrics,
          aiContext: liveContext,
          messages: thread
        })
      });

      if (!response.ok) {
        throw new Error('Server returned error status');
      }

      const resData = await response.json();
      
      setChatMessages(prev => ({
        ...prev,
        [chatAgent.id]: [...thread, { role: 'assistant', content: resData.text }]
      }));

      // Increment agent metrics counts
      setActiveAgents(prev => prev.map(a => a.id === chatAgent.id ? { ...a, tasksCompleted: a.tasksCompleted + 1 } : a));
      
      addLog(
        chatAgent.name, 
        'Active Response Generated', 
        resData.simulated ? 'Generated simulated advisory (GEMINI_API_KEY pending)' : 'Live Model generation completed.', 
        'success'
      );

    } catch (err: any) {
      console.error(err);
      setChatMessages(prev => ({
        ...prev,
        [chatAgent.id]: [
          ...thread,
          { role: 'assistant', content: `⚠️ **Operational Alert:** I encountered a problem communicating with the SaaS API network core. Please configure the **GEMINI_API_KEY** environment variable in your Secrets panel or provide it in settings.` }
        ]
      }));
      addLog('System Monitor', 'Agent Chat Failed', err.message || 'Network Timeout', 'error');
    } finally {
      setChatLoading(false);
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  // Reorder Item via AI Oliver Procurement Trigger
  const triggerReorderSKU = (sku: string) => {
    const data = tenantDB[selectedIndustry];
    const item = data.products.find(p => p.sku === sku);
    if (!item) return;

    addLog('System Action', 'Trigger SKU Reorder', `Sending automatic Materials Request for ${sku}`, 'tool');
    
    // Simulate active agent working on it
    setTimeout(() => {
      // update state
      setTenantDB(prev => {
        const indData = prev[selectedIndustry];
        const updatedProducts = indData.products.map(p => {
          if (p.sku === sku) {
            return { ...p, stock: p.stock + 60, status: 'In Stock' as const };
          }
          return p;
        });
        return {
          ...prev,
          [selectedIndustry]: {
            ...indData,
            products: updatedProducts
          }
        };
      });

      addLog(
        selectedIndustry === 'retail' || selectedIndustry === 'manufacturing' ? 'Oliver' : 'Stuart', 
        'WMS Stock Replenished', 
        `Triggered supplier webhook. Standard invoice generated. +60 units uploaded to SKU: ${sku}`, 
        'success'
      );
    }, 1200);
  };

  // --- INJECTING AI PRODUCT SOURCING LOGIC ---
  const handleTriggerSourcing = async () => {
    setSourcingLoading(true);
    addLog('System Operator', 'Initiated AI Product Sourcing', `Analyzing market sales and competitor catalog parameters for the ${selectedIndustry} industry.`, 'info');
    
    try {
      const response = await fetch('/api/gemini/source-products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          industry: selectedIndustry,
          products: currentIndustryData.products
        })
      });

      if (!response.ok) {
        throw new Error('Failed to capture sourcing advisory');
      }

      const resData = await response.json();
      setSourcingRecommendations(resData.recommendations || []);
      addLog('AI Command Center', 'Market Sourcing Analysis Live', `Retrieved ${resData.recommendations?.length || 0} tailored SKU suggestions using Gemini real-time competitor intelligence.`, 'success');
    } catch (err: any) {
      console.error(err);
      addLog('System Monitor', 'Sourcing API Fault', err.message || 'Server timeout, using simulated catalog intelligence.', 'error');
    } finally {
      setSourcingLoading(false);
    }
  };

  const syncSourcedProduct = (reco: SourcingRecommendation) => {
    // Generate new store SKU item using high fidelity structures
    const newSkuItem: ProductItem = {
      id: 'sourced_' + Date.now(),
      name: reco.name,
      sku: reco.sku,
      stock: 50,
      minStockThreshold: 10,
      price: reco.price,
      sales: 0,
      status: 'In Stock'
    };

    setTenantDB(prev => {
      const indData = prev[selectedIndustry];
      // check duplicate SKU to prevent duplication errors
      if (indData.products.some(p => p.sku === reco.sku)) {
        return prev;
      }
      return {
        ...prev,
        [selectedIndustry]: {
          ...indData,
          products: [newSkuItem, ...indData.products]
        }
      };
    });

    // Mark as synced locally
    setSourcingRecommendations(prev => prev.map(item => item.sku === reco.sku ? { ...item, synced: true } : item));

    addLog(
      'AI Command Center',
      'Catalog SKU Synced',
      `Product "${reco.name}" (${reco.sku}) successfully live-published to active Shopify-style SaaS store at MSRP $${reco.price}.`,
      'success'
    );
  };

  // --- INJECTING VISUAL WORKFLOW CREATOR SIMULATOR ---
  const runVisualWorkflowSimulator = () => {
    if (isVisualRunning) return;

    setIsVisualRunning(true);
    setCurrentVisualIndex(0);
    setVisualWorkflowLogs([`[INIT] Booting visual sandbox workflow-instance-sim.`, `[INIT] Validating connections to ${visualNodes.length} active process nodes.`]);
    addLog('Workflow Engine 2.0', 'Sandbox Simulation Initiated', 'Running interactive flowchart dry run.', 'tool');

    const executeVisualStep = (index: number) => {
      if (index >= visualNodes.length) {
        setTimeout(() => {
          setIsVisualRunning(false);
          setCurrentVisualIndex(-1);
          setVisualWorkflowLogs(prev => [...prev, `[SUCCESS] Visual workflow pipeline compiled with 0 errors. Trigger events registered. Hot-deployed to Shopify SaaS tier successfully.`]);
          addLog('Workflow Engine 2.0', 'Simulator Sandbox Stable', 'Finished dry run cleanly. All event webhooks verified.', 'success');
        }, 1200);
        return;
      }

      setCurrentVisualIndex(index);
      const currentNode = visualNodes[index];
      
      const detailsMap: Record<string, string> = {
        'trigger': `[Captured Workflow Trigger] Customer frontend emitted event '${currentNode.title}'. Spawning automated AI representative task chain.`,
        'ai_decision': `[AI Employee Decision] AI verified database state. Dispatched automated agent to optimize carrier routing and evaluate parcel shipping weight.`,
        'condition': `[Fulfillment Guard Criteria] Evaluating conditions for step '${currentNode.title}'. Status: PASSED. Executing subsequent actions.`,
        'action': `[MCP Webhook Fired] Firing client notification webhook. Sent automated email update to user coordinate. DHL parcel label created.`
      };

      const customDetail = detailsMap[currentNode.type] || `[Executing Node] Complete step logic: "${currentNode.title}" - ${currentNode.details}`;

      setVisualWorkflowLogs(prev => [
        ...prev,
        `[Node ${index + 1}: ${currentNode.title}] ${customDetail}`
      ]);

      setTimeout(() => {
        executeVisualStep(index + 1);
      }, 1500); 
    };

    executeVisualStep(0);
  };

  const addVisualNode = (type: 'trigger' | 'ai_decision' | 'condition' | 'action') => {
    const typesMap = {
      trigger: { title: 'Event Trigger Node', details: 'Fires automatically on predefined storefront conditions.' },
      ai_decision: { title: 'AI Assistant Reasoning Node', details: 'AI processes context using the Gemini API.' },
      condition: { title: 'Conditional Branch Criteria', details: 'SaaS router condition rules (e.g. Risk check limits).' },
      action: { title: 'MCP Webhook Action Dispatcher', details: 'Triggers connected Restful tools and API webhooks.' }
    };
    const newNode: WorkflowNode = {
      id: 'v_' + Date.now(),
      type,
      title: typesMap[type].title,
      status: 'idle',
      details: typesMap[type].details
    };
    setVisualNodes(prev => [...prev, newNode]);
    setSelectedNodeId(newNode.id);
    addLog('System Operator', 'Workflow Node Appended', `Added custom ${type.toUpperCase()} node to sandbox designer canvas.`, 'info');
  };

  const deleteVisualNode = (id: string) => {
    if (visualNodes.length <= 1) return;
    setVisualNodes(prev => {
      const remaining = prev.filter(n => n.id !== id);
      setSelectedNodeId(remaining[remaining.length - 1]?.id || null);
      return remaining;
    });
    addLog('System Operator', 'Workflow Node Removed', `Deleted node id: ${id} from sequence.`, 'warning');
  };

  const updateVisualNode = (id: string, fields: Partial<WorkflowNode>) => {
    setVisualNodes(prev => prev.map(n => n.id === id ? { ...n, ...fields } : n));
  };

  const loadPresetWorkflow = (presetName: string) => {
    if (presetName === 'triage') {
      setVisualNodes([
        { id: 'p_1', type: 'trigger', status: 'idle', title: 'Customer Return Requested', details: 'Fires when client requests refunds.' },
        { id: 'p_2', type: 'ai_decision', status: 'idle', title: 'Evaluate Threat and Risk Status', details: 'AI maps fraud risk score heuristics.' },
        { id: 'p_3', type: 'condition', status: 'idle', title: 'If Risk Score < 35%', details: 'Auto routing gate depending on calculated risk.' },
        { id: 'p_4', type: 'action', status: 'idle', title: 'Approve & Create Back-to-stock Label', details: 'Dispatches DHL transit coordinates to client.' }
      ]);
      setSelectedNodeId('p_1');
      addLog('Workflow Engine 2.0', 'Triage Preset Loaded', 'Loaded Return Triage workflow structure into visual canvas.', 'success');
    } else {
      setVisualNodes([
        { id: 'p_a', type: 'trigger', status: 'idle', title: 'Low Inventory Alert Trigger', details: 'Fires when SKU units <= threshold limit.' },
        { id: 'p_b', type: 'ai_decision', status: 'idle', title: 'Determine Distributor Allocation', details: 'Gemini optimizes procurement price quotes.' },
        { id: 'p_c', type: 'condition', status: 'idle', title: 'If Margin Tier > 40%', details: 'Ensures target threshold margins are fully safe.' },
        { id: 'p_d', type: 'action', status: 'idle', title: 'Submit PO Webhook To Supplier', details: 'Fires automatic webhook restock request.' }
      ]);
      setSelectedNodeId('p_a');
      addLog('Workflow Engine 2.0', 'Restock Preset Loaded', 'Loaded Restock & Fulfillment workflow structure into visual canvas.', 'success');
    }
  };

  // Custom visual workflow run execution
  const triggerWorkflowRun = (wf: Workflow) => {
    if (runningWorkflowId) return; // wait till finish

    setRunningWorkflowId(wf.id);
    setCurrentNodeIndex(0);
    setWorkflowLogs([`[21:40] INIT: Starting workflow execution [${wf.name}]...`]);
    addLog('Workflow Engine2.0', 'Sequence Initiated', `Fired flow [${wf.name}]`, 'tool');

    // Chain node steps visual delays
    const executeNode = (index: number) => {
      if (index >= wf.nodes.length) {
        // finished
        setTimeout(() => {
          setRunningWorkflowId(null);
          setCurrentNodeIndex(-1);
          setWorkflowLogs(prev => [...prev, `[21:42] COMPLETED: Flow successfully automated. Core metrics updated.`]);
          
          // Complete business mutation on completion!
          if (wf.id === 'wf_r1') { // Low stock auto procurement
            setTenantDB(prev => {
              const indData = prev.retail;
              const updatedPr = indData.products.map(p => {
                if (p.sku === 'SKU-R189') {
                  return { ...p, stock: 72, status: 'In Stock' as const };
                }
                return p;
              });
              return {
                ...prev,
                retail: { ...indData, products: updatedPr }
              };
            });
            addLog('AI Ops Node', 'Automated PO Dispatched', 'Procured 60 units of SKU-R189 at 35% margin tier.', 'success');
          } else if (wf.id === 'wf_r2') { // Refund threats check
            setTenantDB(prev => {
              const indData = prev.retail;
              const updatedOrders = indData.orders.map(o => {
                if (o.id === '#ORD-9839') {
                  return { ...o, status: 'AI Confirmed' as const, riskScore: 12 }; // mitigated
                }
                return o;
              });
              return {
                ...prev,
                retail: { ...indData, orders: updatedOrders }
              };
            });
            addLog('Customer Care AI', 'Fraud Shield Terminated', 'Verified third-party shipping stamps. Released partial compensation.', 'success');
          } else if (wf.id === 'wf_f1') { // food freshness bundle promoter
            setTenantDB(prev => {
              const indData = prev.food;
              const updatedPr = indData.products.map(p => {
                if (p.sku === 'SKU-F203') { // beef burger
                  return { ...p, price: 18.50, name: 'Premium Wagyu Set (20% Flash discount!)' };
                }
                return p;
              });
              return {
                ...prev,
                food: { ...indData, products: updatedPr }
              };
            });
            addLog('Marketing Automation', 'Campaign Live', 'Injected 20% discount coupon fast-track tags on client app catalog.', 'success');
          } else {
            // General multi-industry template flow completed
            addLog('Automation Engine', 'Workflow Complete', `Execution index logged. Connected MCP APIs safe.`, 'success');
          }
        }, 1000);
        return;
      }

      setCurrentNodeIndex(index);
      const node = wf.nodes[index];
      
      setWorkflowLogs(prev => [
        ...prev,
        `[21:41] EXECUTE [${node.title}]: ${node.details}`
      ]);

      setTimeout(() => {
        executeNode(index + 1);
      }, 1500); // 1.5s per step visualizer
    };

    executeNode(0);
  };

  // Add Product custom
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSKU.trim()) return;

    const newItem: ProductItem = {
      id: 'p_custom_' + Date.now(),
      name: newTitle,
      sku: newSKU.toUpperCase(),
      stock: Number(newStock),
      minStockThreshold: Number(newThreshold),
      price: Number(newPrice),
      sales: 0,
      status: Number(newStock) === 0 ? 'Out of Stock' : (Number(newStock) <= Number(newThreshold) ? 'Low Stock' : 'In Stock')
    };

    setTenantDB(prev => {
      const indData = prev[selectedIndustry];
      return {
        ...prev,
        [selectedIndustry]: {
          ...indData,
          products: [newItem, ...indData.products]
        }
      };
    });

    setNewTitle('');
    setNewSKU('');
    setNewStock(50);
    setNewThreshold(10);
    setNewPrice(29.99);
    setShowAddProduct(false);

    addLog('Tenant ERP System', 'New SKU Created', `Successfully synchronized item ${newItem.sku} with catalog databases.`, 'success');
  };

  const handleBulkRestockComp = (sku: string, amount: number) => {
    setTenantDB(prev => {
      const indData = prev[selectedIndustry];
      const updatedProducts = indData.products.map(p => {
        if (p.sku === sku) {
          const nextStock = p.stock + amount;
          return { 
            ...p, 
            stock: nextStock, 
            status: nextStock === 0 ? 'Out of Stock' as const : (nextStock <= p.minStockThreshold ? 'Low Stock' as const : 'In Stock' as const)
          };
        }
        return p;
      });
      return {
        ...prev,
        [selectedIndustry]: {
          ...indData,
          products: updatedProducts
        }
      };
    });
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: any) => {
    setTenantDB(prev => {
      const indData = prev[selectedIndustry];
      const updatedOrders = indData.orders.map(o => {
        if (o.id === orderId) {
          return { ...o, status: newStatus };
        }
        return o;
      });
      return {
        ...prev,
        [selectedIndustry]: {
          ...indData,
          orders: updatedOrders
        }
      };
    });
  };

  const handleAddNewProductComp = (name: string, sku: string, price: number, stock: number) => {
    const newProduct: ProductItem = {
      id: 'prod_' + Date.now(),
      name,
      sku: sku.toUpperCase(),
      stock,
      minStockThreshold: 10,
      price,
      sales: 0,
      status: stock === 0 ? 'Out of Stock' as const : (stock <= 10 ? 'Low Stock' as const : 'In Stock' as const)
    };
    setTenantDB(prev => {
      const indData = prev[selectedIndustry];
      return {
        ...prev,
        [selectedIndustry]: {
          ...indData,
          products: [newProduct, ...indData.products]
        }
      };
    });
  };

  // Create Knowledge Core Base Document
  const handleAddKnowledgeDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle.trim() || !newDocContent.trim()) return;

    const newDoc: KnowledgeDoc = {
      id: 'kd_custom_' + Date.now(),
      title: newDocTitle,
      category: newDocCategory || 'General',
      content: newDocContent,
      size: `${(newDocContent.length / 1024).toFixed(1)} KB`,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setTenantDB(prev => {
      const indData = prev[selectedIndustry];
      return {
        ...prev,
        [selectedIndustry]: {
          ...indData,
          knowledge: [newDoc, ...indData.knowledge]
        }
      };
    });

    setNewDocTitle('');
    setNewDocCategory('');
    setNewDocContent('');
    setShowAddDoc(false);

    addLog('RAG Knowledge Core', 'Document Indexed', `Parsed: ${newDoc.title}. Encoded 15 chunks under RAG database indexing schema.`, 'success');
  };

  // Admin Manual Audit Action on high-risk refunds
  const triggerOrderAudit = (orderId: string) => {
    addLog('AI Audit Coordinator', 'Order Inspection Fired', `Performing active SLA audit with parcel courier for Order ${orderId}`, 'info');
    
    // Simulate active agent auditing couriers
    setTimeout(() => {
      setTenantDB(prev => {
        const indData = prev[selectedIndustry];
        const updatedOrders = indData.orders.map(o => {
          if (o.id === orderId) {
            return { ...o, status: 'AI Confirmed' as const, riskScore: 5 }; // audited and safe
          }
          return o;
        });
        return {
          ...prev,
          [selectedIndustry]: {
            ...indData,
            orders: updatedOrders
          }
        };
      });
      addLog('AI Risk Core', 'Refund Claim Approved', `Courier digital coordinate matched customer zip. Verified risk clear. Issued order status update.`, 'success');
    }, 1500);
  };

  // MCP Connected Toggles
  const toggleMcpTool = (id: string) => {
    setMcpTools(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'connected' ? 'disconnected' : 'connected';
        addLog(
          'MCP Registry', 
          nextStatus === 'connected' ? 'Tool Connected' : 'Tool Suspended', 
          `Registered system API capability: [${t.name}]`, 
          nextStatus === 'connected' ? 'success' : 'warning'
        );
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  // App Marketplace: Install new extension
  const installMarketpack = (item: AppMarketItem) => {
    setMarketItems(prev => prev.map(m => m.id === item.id ? { ...m, installed: true } : m));
    
    // Create new corresponding AI Agent employee context inside active pool!
    const emojiMap: Record<string, string> = { Sparkles: '🧙‍♂️', Shuffle: '🚀', Scale: '⚖️', BookOpen: '📚', Workflow: '🔄' };
    const customAgent: AIEmployee = {
      id: `${selectedIndustry}_custom_${item.id}`,
      name: item.name.split(' ').slice(0, 2).join(' '),
      title: item.name,
      role: item.description,
      status: 'Idle',
      emoji: emojiMap[item.icon] || '🧩',
      description: item.description,
      capabilities: ['Dynamic marketplace tasking', 'Extension context override'],
      systemPrompt: `You are the specialized extension agent: ${item.name}. Adopt an elite advisory style for SaaS platforms. Prioritize profitability.`,
      model: 'gemini-3.5-flash',
      tasksCompleted: 4
    };

    setActiveAgents(prev => [...prev, customAgent]);
    addLog('App Marketplace', 'Enterprise Component Deployed', `Successfully provisioned ${item.name} into Tenant workspace. Active agent fleet scaled.`, 'success');
  };

  // Trigger quick decision suggestions by AI CEO
  const executeStrategicDecision = (scenario: string) => {
    addLog('AI Command Center', 'Execute Strategic Recommendation', `Applying dynamic operational adjustments for: ${scenario}`, 'tool');
    
    setTimeout(() => {
      if (scenario.includes('TikTok') || scenario.includes('Ads')) {
        // Boost metrics
        setTenantDB(prev => {
          const indData = prev[selectedIndustry];
          const updatedM = indData.metrics.map(m => {
            if (m.name.includes('GMV') || m.name.includes('Revenue')) {
              return { ...m, value: '$14,840.00', change: '+22.4% Dynamic Boost!' };
            }
            return m;
          });
          return {
            ...prev,
            [selectedIndustry]: { ...indData, metrics: updatedM }
          };
        });
        addLog('Marketing Automation', 'Ad Budget Scaled', 'Scaled Meta CPC bidding threshold matching our high-ROI time interval.', 'success');
      } else if (scenario.includes('TikTok') || scenario.includes('Wagyu') || scenario.includes('fries') || scenario.includes('Promo')) {
        // Boost burger sales
        setTenantDB(prev => {
          const indData = prev.food;
          const updatedP = indData.products.map(p => {
            if (p.sku === 'SKU-F203') {
              return { ...p, stock: p.stock - 22, sales: p.sales + 42 }; // simulated sales spike
            }
            return p;
          });
          return {
            ...prev,
            food: { ...indData, products: updatedP }
          };
        });
        addLog('AI Sales Booster', 'Bundle Offer Deployed', 'Dormant subscriber channels cleared. Sold 22 expiring Wagyu premium sets.', 'success');
      } else {
        // Generic reorder SKU auto
        const data = tenantDB[selectedIndustry];
        const lowStock = data.products.find(p => p.stock <= p.minStockThreshold);
        if (lowStock) {
          triggerReorderSKU(lowStock.sku);
        } else {
          addLog('AI Automation Node', 'Task Delegated', 'Core database healthy. Continued standard SLA metrics monitoring.', 'info');
        }
      }
    }, 1200);
  };

  const handleStorefrontPurchase = (productId: string) => {
    setTenantDB(prev => {
      const currentData = prev[selectedIndustry];
      const product = currentData.products.find(p => p.id === productId);
      if (!product || product.stock <= 0) return prev;

      const updatedProducts = currentData.products.map(p => {
        if (p.id === productId) {
          const newStock = p.stock - 1;
          const status = newStock <= 0 ? 'Out of Stock' : (newStock <= p.minStockThreshold ? 'Low Stock' : 'In Stock');
          return { ...p, stock: newStock, sales: p.sales + 1, status };
        }
        return p;
      });

      const customerNames = ["王丽静", "张晨星", "李佳豪", "陈佳莹", "孙志远", "赵雨婷", "Alex Johnson", "Sarah Connor"];
      const customerContacts = ["138****9928", "139****8502", "150****3310", "186****7721", "alex@johnson.dev", "sarah@connor.io"];
      const randomName = customerNames[Math.floor(Math.random() * customerNames.length)];
      const randomContact = customerContacts[Math.floor(Math.random() * customerContacts.length)];
      const orderId = `ORD-${Date.now().toString().slice(-4)}`;

      const newOrder: OrderItem = {
        id: orderId,
        customerName: randomName,
        contact: randomContact,
        total: product.price,
        status: 'Pending',
        createdAt: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        riskScore: Math.floor(Math.random() * 30) + 5
      };

      const updatedOrders = [newOrder, ...currentData.orders];

      setTimeout(() => {
        addLog(
          'AI Operations', 
          '在线商店新订单', 
          `在线零售商店接收新订单 ${orderId}，用户 [${randomName}] 成功支付了 ${product.name} $${product.price}，扣减本地库存1件，现存 ${product.stock - 1}件。AI 审计风控中。`, 
          'success'
        );
      }, 300);

      return {
        ...prev,
        [selectedIndustry]: {
          ...currentData,
          products: updatedProducts,
          orders: updatedOrders
        }
      };
    });
  };

  if (viewMode === 'landing') {
    return (
      <LandingPage 
        onEnterApp={() => setViewMode('register')}
        onRegisterSuccess={(companyName, industry, tier) => {
          setSelectedIndustry(industry);
          setViewMode('register');
        }}
        selectedIndustry={selectedIndustry}
        onIndustryChange={handleIndustryChange}
        onQuickBypass={() => {
          setViewMode('app');
          addLog('AI Command Center', '一键快捷通道', '测试用户通过一键直达免签安全通道进入 SaaS 商家工作台后台！', 'success');
        }}
      />
    );
  }

  if (viewMode === 'register') {
    return (
      <RegisterPage 
        onRegisterSuccess={(userData) => {
          setViewMode('industry');
          addLog(
            'AI Command Center',
            'Registration Succeed',
            `User authenticated successfully with email ${userData.email}. Ready for Page 003: Industry selection.`,
            'success'
          );
        }}
        onGoToLogin={() => setViewMode('app')}
        onQuickBypass={() => {
          setViewMode('app');
          addLog('AI Command Center', '一键快捷通道', '测试用户通过一键直达免签安全通道进入 SaaS 商家工作台后台！', 'success');
        }}
      />
    );
  }

  if (viewMode === 'industry') {
    return (
      <IndustryPage 
        onBack={() => setViewMode('register')}
        onSelect={(ind) => {
          setSelectedIndustry(ind);
          setViewMode('config');
          addLog(
            'AI Command Center',
            'Industry Selected',
            `User selected industry track: [${ind.toUpperCase()}]. Loading customized industry-specific schemas & workspace templates.`,
            'info'
          );
        }}
      />
    );
  }

  if (viewMode === 'config') {
    return (
      <ConfigPage 
        onBack={() => setViewMode('industry')}
        onComplete={(data) => {
          setCompanyName(data.workspaceName);
          setViewMode('provisioning');
          addLog(
            'AI Command Center',
            'Workspace Configured',
            `Saved configurations for and initiated container workspace "${data.workspaceName}" for channels: [${data.channels.join(', ')}].`,
            'success'
          );
        }}
      />
    );
  }

  if (viewMode === 'provisioning') {
    const industryLabels: Record<IndustryType, string> = {
      retail: '新零售门店',
      food: '餐饮服务',
      manufacturing: '制造加工',
      service: '生活服务',
      education: '在线教育',
      healthcare: '医疗健康',
      fashion_wholesale: '服装设计批发系统',
      restaurant_takeout: '餐馆外卖系统',
      general_merch_electronics: '百货电器系统',
      beauty_booking: '美容预约系统',
      ecommerce_store: '电商网店系统',
      pos_retail: 'POS门店系统'
    };
    return (
      <ProvisioningPage 
        workspaceName={companyName}
        industryName={industryLabels[selectedIndustry] || selectedIndustry}
        onFinished={() => {
          setViewMode('app');
        }}
      />
    );
  }

  return (
    <div id="saas-platform-root" className="flex h-screen w-full bg-slate-50 font-sans text-slate-900 overflow-hidden">
      
      {/* Sidebar Navigation */}
      <aside id="saas-sidebar" className="w-64 bg-[#1a1b1d] text-[#e3e3e3] flex flex-col border-r border-[#2d2e30]">
        
        {/* Shopify-style Header */}
        <div id="sidebar-header" className="p-4 flex items-center justify-between border-b border-[#2d2e30] bg-[#121314]">
          <div className="flex items-center gap-2 select-none">
            {/* Custom Green Shopify Representation Bag */}
            <div className="w-7 h-7 bg-[#9F7AEA] rounded-lg flex items-center justify-center shadow-lg font-bold text-white text-sm">S</div>
            <div className="flex flex-col text-left">
              <span className="font-bold tracking-tight text-white text-sm leading-tight font-display">Shopify SaaS</span>
              <span className="text-[9px] text-[#969696] font-semibold uppercase tracking-wider">Multi-Industry Core</span>
            </div>
          </div>
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded leading-none ${adminMode === 'merchant' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900/60' : 'bg-purple-950 text-purple-400 border border-purple-900/60'}`}>
            {adminMode === 'merchant' ? '商家运维' : '平台总控'}
          </span>
        </div>

        {/* Dynamic Dual Swapper Component */}
        <div className="px-3.5 py-2.5 bg-[#121314]/80 border-b border-[#2d2e30]">
          <div className="flex bg-[#242426] p-1 rounded-lg">
            <button
              onClick={() => {
                setAdminMode('merchant');
                setActiveTab('command');
                addLog('Operator Control Panel', '视图切换', '进入 商家店铺后台运维环境', 'info');
              }}
              className={`flex-1 text-center py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${adminMode === 'merchant' ? 'bg-emerald-600 text-white shadow' : 'text-[#b5b5b5] hover:text-white'}`}
            >
              商家运维端
            </button>
            <button
              onClick={() => {
                setAdminMode('super_admin');
                setActiveTab('admin_stats');
                addLog('Operator Control Panel', '视图切换', '进入 核心SaaS平台总控制台', 'warning');
              }}
              className={`flex-1 text-center py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${adminMode === 'super_admin' ? 'bg-[#9F7AEA] text-white shadow' : 'text-[#b5b5b5] hover:text-white'}`}
            >
              平台总后台
            </button>
          </div>
        </div>

        {/* Tenant Config Industry Switcher (Styled as Shopify Store Switcher) */}
        <div className="px-3.5 py-2.5 bg-[#121314]/50 border-b border-[#2d2e30] flex items-center justify-between">
          <div className="flex flex-col text-left">
            <span className="text-[8px] font-bold text-[#7a7b7c] tracking-widest uppercase">当前店铺</span>
            <span className="text-xs font-bold text-slate-100 truncate max-w-[140px]">
              {selectedIndustry === 'retail' && '👕 服装设计批发 system'}
              {selectedIndustry === 'food' && '🍔 餐馆外卖 system'}
              {selectedIndustry === 'education' && '🎓 电商网店 system'}
              {selectedIndustry === 'healthcare' && '🏪 POS门店 system'}
              {selectedIndustry === 'service' && '💅 美容预约 system'}
              {selectedIndustry === 'manufacturing' && '🔋 百货电器 system'}
            </span>
          </div>
          <select 
            value={selectedIndustry}
            onChange={(e) => handleIndustryChange(e.target.value as IndustryType)}
            className="bg-[#242426] border border-[#2d2e30] rounded text-slate-200 text-[10px] p-1 focus:outline-none focus:ring-1 focus:ring-[#07C2E3]"
          >
            <option value="retail">👕 服装</option>
            <option value="food">🍔 餐饮</option>
            <option value="education">🎓 网店</option>
            <option value="healthcare">🏪 POS</option>
            <option value="service">💅 美容</option>
            <option value="manufacturing">🔋 百货</option>
          </select>
        </div>

        {/* Navigation List exactly representing user's screenshot */}
        <nav id="sidebar-nav" className="flex-1 p-2 space-y-1 overflow-y-auto font-sans">
          
          {adminMode === 'super_admin' ? (
            [
              { id: 'admin_stats', name: '📊 平台总览', icon: BarChart3 },
              { id: 'admin_tenants', name: '👥 租户管理', icon: Users },
              { id: 'admin_plans', name: '💳 套餐管理', icon: Coins },
              { id: 'admin_settle', name: '💰 财务结算', icon: DollarSign },
              { id: 'admin_gateways', name: '🔗 支付通道', icon: CreditCard },
              { id: 'admin_channels', name: '📨 通信中心', icon: Mail },
              { id: 'admin_ai_ops', name: '🧠 智能操作中心', icon: Bot },
              { id: 'admin_marketplace', name: '🧩 应用市场', icon: Layers },
              { id: 'admin_dev', name: '👨‍💻 开发者中心', icon: Terminal },
              { id: 'admin_roles', name: '🔐 权限中心', icon: Scale },
              { id: 'admin_system', name: '📜 审计中心', icon: FileText },
              { id: 'admin_settings', name: '⚙️ 系统设置', icon: Settings },
            ].map((menu) => {
              const IconComponent = menu.icon;
              const isActive = activeTab === menu.id;

              return (
                <button
                  key={menu.id}
                  onClick={() => {
                    setActiveTab(menu.id);
                    addLog('Platform Admin Center', '切换视图', `切换至总后台「${menu.name}」控制面板`, 'info');
                  }}
                  className={`w-full text-left p-2 rounded-lg flex items-center justify-between text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-[#1b1c1e] text-[#9F7AEA] border-l-2 border-[#9F7AEA] font-bold' 
                      : 'hover:bg-[#242426] hover:text-white text-[#b5b5b5]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-left">
                    <IconComponent className={`w-4 h-4 ${isActive ? 'text-[#9F7AEA]' : 'text-[#6b7280]'}`} />
                    <span>{menu.name}</span>
                  </div>
                </button>
              );
            })
          ) : (
            [
              { id: 'command', name: '📊 智能大盘', icon: BarChart3 },
              { id: 'online-store', name: '🛍 店铺中心', icon: Globe },
              { id: 'products', name: '📦 商品中心', icon: ShoppingBag },
              { id: 'orders', name: '🧾 订单中心', icon: ShoppingCart },
              { id: 'customers', name: '👥 客户中心', icon: Users },
              { id: 'marketing', name: '📣 营销中心', icon: Megaphone },
              { id: 'logistics', name: '🚚 物流中心', icon: Truck },
              { id: 'payments', name: '💳 支付中心', icon: CreditCard },
              { id: 'finance', name: '💰 财务中心', icon: Coins },
              { id: 'agents', name: '🤖 AI中心', icon: Bot },
              { id: 'marketplace', name: '🧩 应用市场', icon: Store },
              { id: 'developer-center', name: '👨‍💻 开发者中心', icon: Terminal },
              { id: 'settings', name: '⚙️ 设置中心', icon: Settings },
            ].map((menu) => {
              const IconComponent = menu.icon;
              const isActive = 
                menu.id === 'agents' ? ['agents', 'knowledge', 'visual-workflow'].includes(activeTab) :
                menu.id === 'developer-center' ? ['doctree', 'shopify-docs', 'mcp'].includes(activeTab) :
                menu.id === 'settings' ? ['settings', 'employees', 'roles', 'policies'].includes(activeTab) :
                activeTab === menu.id;

              return (
                <button
                  key={menu.id}
                  onClick={() => {
                    if (menu.id === 'agents') {
                      if (!['agents', 'knowledge', 'visual-workflow'].includes(activeTab)) {
                        setActiveTab('agents');
                      }
                    } else if (menu.id === 'developer-center') {
                      if (!['shopify-docs', 'doctree', 'mcp'].includes(activeTab)) {
                        setActiveTab('shopify-docs');
                      }
                    } else if (menu.id === 'settings') {
                      if (!['settings', 'employees', 'roles', 'policies'].includes(activeTab)) {
                        setActiveTab('settings');
                      }
                    } else {
                      setActiveTab(menu.id as any);
                    }
                    addLog('Navigation', '切换视图', `切换至「${menu.name}」主控制面板`, 'info');
                  }}
                  className={`w-full text-left p-2 rounded-lg flex items-center justify-between text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-[#1b1c1e] text-[#07C2E3] border-l-2 border-[#07C2E3] font-bold' 
                      : 'hover:bg-[#242426] hover:text-white text-[#b5b5b5]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-left">
                    <IconComponent className={`w-4 h-4 ${isActive ? 'text-[#07C2E3]' : 'text-[#6b7280]'}`} />
                    <span>{menu.name}</span>
                  </div>
                  {menu.id === 'orders' && (
                    <span className="text-[9px] text-[#6b7280] font-mono font-bold">
                      {currentIndustryData.orders.length}
                    </span>
                  )}
                </button>
              );
            })
          )}

        </nav>

        {/* Bottom Menu: Document Sync & Settings */}
        <div id="sidebar-bottom" className="p-2 border-t border-[#2d2e30] bg-[#121314]/90 space-y-1 font-sans">
          
          {/* Prominent, persistent AI Commander toggle widget inside left sidebar */}
          {adminMode === 'merchant' && (
            <button 
              id="sidebar-ai-commander-btn"
              type="button"
              onClick={() => {
                setIsCommandCenterOpen(!isCommandCenterOpen);
                addLog('AI Command Center', 'AI Commander Toggle', `${isCommandCenterOpen ? '收起' : '展开'} AI Commander 商务操作系统控制台。`, 'info');
              }}
              className={`w-full text-left p-2.5 mb-2 rounded-xl flex items-center justify-between text-xs font-black bg-gradient-to-r from-slate-900 via-[#1b1c1e] to-slate-950 border ${
                isCommandCenterOpen ? 'border-[#07C2E3] text-[#07C2E3] shadow-[0_0_12px_rgba(7,194,227,0.15)]' : 'border-indigo-900/60 text-indigo-300'
              } hover:border-[#07C2E3] hover:text-[#07C2E3] transition-all cursor-pointer`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">🧠</span>
                <span className="font-sans font-extrabold uppercase tracking-wider">AI Commander</span>
              </div>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#07C2E3] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#07C2E3]"></span>
              </span>
            </button>
          )}

          <button 
            onClick={() => {
              const newMode = adminMode === 'super_admin' ? 'merchant' : 'super_admin';
              setAdminMode(newMode);
              setActiveTab(newMode === 'super_admin' ? 'admin_stats' : 'command');
              addLog('Security Master', '权限级别切换', `成功接入 ${newMode === 'super_admin' ? '「平台底座管理中心(Super Admin)」' : '「商户业务工作台」'}`, 'warning');
            }}
            className={`w-full text-left p-2 rounded-lg flex items-center gap-2.5 text-xs font-black ${
              adminMode === 'super_admin' 
                ? 'bg-[#ffe4e6] text-rose-700 hover:bg-[#fecdd3]' 
                : 'hover:bg-[#242426] text-amber-500 hover:text-amber-400'
            } transition-all cursor-pointer`}
          >
            <AlertTriangle className="w-4 h-4 shrink-0 animate-pulse" />
            <span>{adminMode === 'super_admin' ? '🔙 返回商户工作台' : '🛡️ 进入平台总后台'}</span>
          </button>

          <button 
            onClick={() => setActiveTab('shopify-docs')}
            className={`w-full text-left p-2 rounded-lg flex items-center gap-2.5 text-xs font-medium hover:bg-[#242426] text-[#b5b5b5] hover:text-white cursor-pointer`}
          >
            <BookOpen className="w-4 h-4 text-[#969696]" />
            <span>开发文档</span>
          </button>

          <button 
            onClick={() => setShowKeyModal(true)}
            className={`w-full text-left p-2 rounded-lg flex items-center justify-between text-xs font-medium hover:bg-[#242426] text-[#b5b5b5] hover:text-white cursor-pointer`}
          >
            <div className="flex items-center gap-2.5">
              <Settings className="w-4 h-4 text-[#969696]" />
              <span>安全设置</span>
            </div>
            <span className={`w-2 h-2 rounded-full ${isApiKeyConnected ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
          </button>

          {/* Trial Ends box from standard Shopify layout */}
          <div className="mt-2 mx-1 p-2 bg-[#242426]/70 border border-[#2d2e30] rounded-lg">
            <p className="text-[10px] text-slate-400 font-bold mb-1">试用：3 天</p>
            <p className="text-[9px] text-[#969696] leading-tight mb-1.5">激活高级版</p>
            <button 
              onClick={() => {
                addLog('SaaS Platform', 'Package Activated', 'Stripe checkout complete', 'success');
              }}
              className="w-full bg-[#303030] hover:bg-[#3d3d3d] text-white text-[9px] font-black py-1 px-2 rounded-md transition-all active:scale-95 cursor-pointer text-center block uppercase"
            >
              升级方案
            </button>
          </div>

        </div>

      </aside>

      {/* Main Container */}
      <main id="saas-main-viewport" className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Top Operational Header */}
        <header id="saas-header" className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 relative z-10 shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="text-sm md:text-base font-bold text-slate-800 font-display truncate max-w-[150px] md:max-w-none">
              {activeTab === 'command' && '商家工作台'}
              {activeTab === 'sales' && '销售中心'}
              {activeTab === 'products' && '商品中心'}
              {activeTab === 'orders' && '订单中心'}
              {activeTab === 'logistics' && '物流中心'}
              {activeTab === 'online-store' && '在线商店'}
              {activeTab === 'agents' && 'AI 员工中心'}
              {activeTab === 'employees' && '员工管理'}
              {activeTab === 'roles' && '角色权限'}
              {activeTab === 'settings' && '设置中心'}
              {activeTab === 'shopify-docs' && '开发文档'}
              {activeTab === 'mcp' && 'MCP 控制台'}
              {activeTab === 'knowledge' && '知识库'}
              {activeTab === 'marketplace' && '应用市场'}
              {activeTab === 'sourcing' && '智能货源'}
              {activeTab === 'visual-workflow' && '工作流引擎'}
              {activeTab === 'doctree' && '需求树跟踪'}
            </h1>
            
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-full border border-indigo-100/60 leading-none">
              <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-ping"></span>
              系统在线
            </div>
          </div>

          {/* Unified layout: Search | AI命令中心 | 通知 | 账户 */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* 1. 搜索 */}
            <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder="搜索功能/指令..."
                onClick={() => setIsCommandCenterOpen(true)}
                className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium w-40 hover:w-52 transition-all font-mono cursor-pointer"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>

            {/* 2. AI命令中心 Button */}
            <button 
              id="header-ai-cmd-trigger"
              onClick={() => setIsCommandCenterOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-indigo-500/10 active:scale-95 transition-all cursor-pointer border border-indigo-500/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
              <span>AI命令中心</span>
            </button>

            {/* 3. 通知 (Notifications) */}
            <button 
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors relative cursor-pointer"
              onClick={() => {
                addLog('System Monitor', 'Clean Notifications', 'All system notification cues are up-to-date.', 'info');
              }}
              title="系统通知"
            >
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full absolute top-1.5 right-1.5 border border-white"></span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </button>

            {/* 4. 账户 (Account) */}
            <button 
              className="p-1 rounded-full border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-colors cursor-pointer"
              title="账户信息"
            >
              <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white text-[10px]">
                A
              </div>
            </button>

          </div>
        </header>

        {/* Global Body Container divided: Section tabs + Enterprise logs side-pane */}
        <div id="saas-split-pane" className="flex-1 flex overflow-hidden">
          
          {/* Main workspace view matching is selected tab */}
          <div id="saas-workspace" className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
            
            {adminMode === 'super_admin' ? (
              <SuperAdminCenter
                activeSubTab={(() => {
                  switch (activeTab) {
                    case 'admin_stats': return 'stats';
                    case 'admin_tenants': return 'tenants';
                    case 'admin_plans': return 'billing';
                    case 'admin_settle': return 'settlement';
                    case 'admin_gateways': return 'gateways';
                    case 'admin_channels': return 'channels';
                    case 'admin_ai_ops': return 'ai-ops';
                    case 'admin_marketplace': return 'marketplace';
                    case 'admin_dev': return 'dev';
                    case 'admin_roles': return 'roles';
                    case 'admin_system': return 'logs';
                    case 'admin_settings': return 'settings';
                    default: return 'stats';
                  }
                })()}
                tenants={tenants}
                onUpdateTenantStatus={(tenantId, status) => {
                  setTenants(prev => prev.map(t => t.id === tenantId ? { ...t, status } : t));
                  addLog('Platform Admin Center', '租户状态更新', `更新租户ID: ${tenantId} 的状态为 ${status === 'active' ? '激活' : '冻结'}`, 'warning');
                }}
                onUpdateTenantAiBudget={(tenantId, budget) => {
                  setTenants(prev => prev.map(t => t.id === tenantId ? { ...t, aiBudget: budget } : t));
                  addLog('Platform Admin Center', '租户自动化额度调配', `更新租户ID: ${tenantId} 的最大自动调度预算上限为 $${budget}`, 'success');
                }}
                marketItems={marketItems}
                onAddMarketItem={(newItem) => {
                  setMarketItems(prev => [newItem, ...prev]);
                }}
                globalDefaultModel={globalDefaultModel}
                onChangeGlobalModel={(model) => {
                  setGlobalDefaultModel(model);
                }}
                onChangeSubTab={(subTab) => {
                  const tabMapping: Record<string, string> = {
                    'stats': 'admin_stats',
                    'tenants': 'admin_tenants',
                    'billing': 'admin_plans',
                    'settlement': 'admin_settle',
                    'gateways': 'admin_gateways',
                    'channels': 'admin_channels',
                    'ai-ops': 'admin_ai_ops',
                    'marketplace': 'admin_marketplace',
                    'dev': 'admin_dev',
                    'roles': 'admin_roles',
                    'logs': 'admin_system',
                    'settings': 'admin_settings'
                  };
                  const targetTab = tabMapping[subTab];
                  if (targetTab) {
                    setActiveTab(targetTab);
                  }
                }}
                onAddSystemLog={(module, action, details, type) => addLog(`[Admin] ${module}`, action, details, type)} 
                activeAgents={activeAgents} 
                onUpdateAgents={setActiveAgents}
                auditLogs={auditLogs}
                setAuditLogs={setAuditLogs}
                agentRuns={agentRuns}
                setAgentRuns={setAgentRuns}
                agentTasks={agentTasks}
                setAgentTasks={setAgentTasks}
              />
            ) : tenants.find(t => t.industry === selectedIndustry)?.status === 'suspended' ? (
              <div id="tenant-suspended-view" className="bg-slate-950 border border-slate-800 rounded-2xl p-8 max-w-2xl mx-auto text-center space-y-6 my-12 animate-fadeIn">
                <div className="w-16 h-16 bg-red-950/30 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <div className="space-y-2 text-slate-100">
                  <h2 className="text-xl font-black text-red-400">🚨 HTTP 503 SERVICE TEMPORARILY SUSPENDED</h2>
                  <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                    由于当前商户所属租户账户违反平台自动化配额准则、欠缴订阅费用或已被超级管理员强制实行服务阻断，本系统前后台已被依法冻结并关断。
                  </p>
                </div>
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1 text-xs text-left font-mono text-slate-350">
                  <p><span className="text-slate-500">TENANT ID:</span> {tenants.find(t => t.industry === selectedIndustry)?.id}</p>
                  <p><span className="text-slate-500">STORE INSTANCE:</span> {tenants.find(t => t.industry === selectedIndustry)?.storeName}</p>
                  <p><span className="text-slate-500">PUNISHMENT SCALE:</span> 503 OVERALL ACCESS BARRED</p>
                </div>
                <div className="flex justify-center gap-3">
                  <button 
                    onClick={() => {
                      setAdminMode('super_admin');
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer transition-colors"
                  >
                    以平台操盘手身份进入总后台解冻
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* API Key instruction banner if missing */}
            {!isApiKeyConnected && (
              <div id="gemini-key-alert-banner" className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between transition-all">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-xs font-bold text-amber-800">请绑定 GEMINI_API_KEY 激活 AI 自动化流程</span>
                </div>
                <button 
                  onClick={() => setShowKeyModal(true)} 
                  className="bg-amber-800 hover:bg-amber-900 text-white font-bold py-1 px-3 rounded-lg text-xs transition-colors"
                >
                  绑定密钥
                </button>
              </div>
            )}

            {/* TAB 1: COMMERCIAL COMMAND OVERVIEW */}
            {activeTab === 'command' && (
              <SaaSMerchantWorkbench
                selectedIndustry={selectedIndustry}
                companyName={companyName}
                onUpdateCompanyName={(name) => setCompanyName(name)}
                products={tenantDB[selectedIndustry]?.products || []}
                orders={tenantDB[selectedIndustry]?.orders || []}
                onAddProduct={(title, sku, stock, price) => {
                  setTenantDB(prev => {
                    const currentData = prev[selectedIndustry];
                    const newId = `product-${Date.now()}`;
                    const newProduct: ProductItem = {
                      id: newId,
                      name: title,
                      sku: sku,
                      stock: stock,
                      minStockThreshold: 10,
                      price: price,
                      sales: 0,
                      status: stock > 10 ? 'In Stock' : (stock > 0 ? 'Low Stock' : 'Out of Stock')
                    };
                    return {
                      ...prev,
                      [selectedIndustry]: {
                        ...currentData,
                        products: [newProduct, ...currentData.products]
                      }
                    };
                  });
                }}
                onPopulateSampleData={() => {
                  setTenantDB(prev => {
                    const currentData = prev[selectedIndustry];
                    const samples = INDUSTRY_PRESETS[selectedIndustry]?.products || [];
                    const clonedSamples = samples.map(s => ({
                      ...s,
                      id: `sample-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                      sales: Math.floor(Math.random() * 8) + 1
                    }));

                    // Avoid duplicate SKUs if possible
                    const currentSKUs = new Set(currentData.products.map(p => p.sku));
                    const uniqueClones = clonedSamples.filter(s => !currentSKUs.has(s.sku));

                    return {
                      ...prev,
                      [selectedIndustry]: {
                        ...currentData,
                        products: [...uniqueClones, ...currentData.products]
                      }
                    };
                  });
                }}
                onRestockProduct={(sku) => {
                  setTenantDB(prev => {
                    const currentData = prev[selectedIndustry];
                    const updatedProducts = currentData.products.map(p => {
                      if (p.sku === sku) {
                        const newStock = p.stock + 50;
                        return { ...p, stock: newStock, status: 'In Stock' as const };
                      }
                      return p;
                    });
                    return {
                      ...prev,
                      [selectedIndustry]: {
                        ...currentData,
                        products: updatedProducts
                      }
                    };
                  });
                }}
                onAuditOrder={(orderId) => {
                  setTenantDB(prev => {
                    const currentData = prev[selectedIndustry];
                    const updatedOrders = currentData.orders.map(or => {
                      if (or.id === orderId) {
                        return { ...or, status: 'AI Confirmed' as const, riskScore: Math.max(0, or.riskScore - 20) };
                      }
                      return or;
                    });
                    return {
                      ...prev,
                      [selectedIndustry]: {
                        ...currentData,
                        orders: updatedOrders
                      }
                    };
                  });
                }}
                onOpenOnlineStorefront={() => setIsOnlineStoreOpen(true)}
                addLog={addLog}
                isCommandCenterOpen={isCommandCenterOpen}
                onToggleCommandCenter={() => setIsCommandCenterOpen(!isCommandCenterOpen)}
              />
            )}

            {/* TAB 2: AI EMPLOYEE FLEET DIRECT CONVERSATION IS REMOVED */}

            {/* TAB 3: MCP TOOLS & WORKFLOW NODE AUTOMATIONS */}
            {activeTab === 'mcp' && renderWithDeveloperCenterLayout(
              <div id="tab-mcp-flows" className="grid grid-cols-1 xl:grid-cols-12 gap-8 animate-fadeIn">
                
                {/* Left side: Flow triggers and Visual Workflow execution nodes */}
                <div className="xl:col-span-7 bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
                  <div>
                    <h3 className="font-bold text-slate-800 font-display text-base">Active n8n-Style Workflow Pipelines</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Automated visual sequences executing operational rules based on catalog changes.</p>
                  </div>

                  <div className="space-y-6">
                    {currentIndustryData.workflows.length > 0 ? (
                      currentIndustryData.workflows.map((wf) => {
                        const isRunningThis = runningWorkflowId === wf.id;
                        return (
                          <div key={wf.id} className="border border-slate-200 rounded-xl p-5 bg-slate-50/50 space-y-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-bold text-slate-800 text-sm leading-snug">{wf.name}</h4>
                                <p className="text-xs text-slate-500 mt-0.5">{wf.description}</p>
                              </div>
                              <button 
                                onClick={() => triggerWorkflowRun(wf)}
                                disabled={!!runningWorkflowId}
                                className={`text-xs font-bold py-1.5 px-3.5 rounded-lg flex items-center gap-1.5 transition-all ${
                                  isRunningThis ? 'bg-indigo-200 text-indigo-800 border border-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                                }`}
                              >
                                <Play className="w-3.5 h-3.5" />
                                <span>{isRunningThis ? 'Executing...' : 'Run Pipeline'}</span>
                              </button>
                            </div>

                            <div className="text-xs text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded border border-indigo-100 flex items-center justify-between font-mono">
                              <span>SaaS Trigger: <b>{wf.trigger}</b></span>
                              <span>Frequency: {wf.frequency}</span>
                            </div>

                            {/* Node flow diagram */}
                            <div className="relative pt-4 overflow-x-auto">
                              <div className="flex items-center gap-4 min-w-[500px]">
                                {wf.nodes.map((node, nIdx) => {
                                  let isNodeActive = isRunningThis && nIdx === currentNodeIndex;
                                  let isNodePassed = isRunningThis && nIdx < currentNodeIndex;
                                  let nodeBgClass = "";
                                  
                                  if (isNodePassed) nodeBgClass = "bg-emerald-50 text-emerald-800 border-emerald-300";
                                  else if (isNodeActive) nodeBgClass = "bg-indigo-500 text-white border-indigo-600 scale-[1.04]";
                                  else nodeBgClass = "bg-white text-slate-600 border-slate-200";

                                  return (
                                    <div key={node.id} className="flex items-center gap-2">
                                      <div className={`p-3 rounded-xl border-2 text-xs w-40 flex flex-col justify-between h-24 text-left transition-all ${nodeBgClass}`}>
                                        <div className="flex items-center justify-between uppercase text-[8px] font-bold tracking-widest text-slate-400">
                                          <span>{node.type}</span>
                                          {isNodePassed && <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />}
                                          {isNodeActive && <div className="w-2.5 h-2.5 bg-white rounded-full animate-ping"></div>}
                                        </div>
                                        <div className="text-xs font-bold line-clamp-1">{node.title}</div>
                                        <div className="text-[10px] opacity-80 leading-snug line-clamp-2">{node.details}</div>
                                      </div>
                                      
                                      {nIdx < wf.nodes.length - 1 && (
                                        <span className={`text-sm select-none shrink-0 font-bold ${isNodePassed ? 'text-emerald-500' : 'text-slate-300'}`}>
                                          &rarr;
                                        </span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Live Running Log Console */}
                            {isRunningThis && (
                              <div className="bg-slate-900 text-emerald-400 p-4 rounded-lg font-mono text-[11px] leading-relaxed max-h-[140px] overflow-y-auto space-y-0.5 shadow-inner">
                                {workflowLogs.map((log, lIdx) => (
                                  <div key={lIdx}>&gt; {log}</div>
                                ))}
                              </div>
                            )}

                          </div>
                        );
                      })
                    ) : (
                      <div className="p-8 text-center text-slate-400">No Custom Workflows configured for selected industry.</div>
                    )}
                  </div>
                </div>

                {/* Right side: Connected MCP Tools Catalog with toggles */}
                <div className="xl:col-span-5 bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4">
                  <div>
                    <h3 className="font-bold text-slate-800 font-display text-base">Model Context Protocol (MCP) Tools</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Synchronize secure store APIs letting AI change, write, delete or query live records</p>
                  </div>

                  <div className="space-y-3">
                    {mcpTools.map((tool) => {
                      const isConnected = tool.status === 'connected';
                      return (
                        <div 
                          key={tool.id} 
                          className={`p-3.5 rounded-xl border flex flex-col gap-2 transition-all ${isConnected ? 'bg-slate-50 border-slate-200' : 'bg-slate-100/50 border-slate-100 opacity-60'}`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                              <span className="font-mono text-xs font-bold text-slate-850">{tool.name}</span>
                            </div>

                            {/* Connect status Toggle slider */}
                            <button
                              id={`toggle-${tool.id}`}
                              onClick={() => toggleMcpTool(tool.id)}
                              className={`p-1 text-[10px] font-bold tracking-tight px-2 rounded-full transition-all ${
                                isConnected ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                              }`}
                            >
                              {isConnected ? 'READY / ON' : 'SUSPENDED'}
                            </button>
                          </div>

                          <p className="text-xs text-slate-500 font-normal leading-normal">{tool.description}</p>
                          
                          {/* Parameter list */}
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Params:</span>
                            {tool.parameters.map((p, pIdx) => (
                              <span key={pIdx} className="font-mono text-[9px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">
                                {p}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 4: RAG KNOWLEDGE CORE */}
            {activeTab === 'knowledge' && renderWithAICenterLayout(
              <div id="tab-rag-knowledge" className="grid grid-cols-1 xl:grid-cols-12 gap-8 animate-fadeIn">
                
                {/* Visual RAG diagram and instruction info */}
                <div className="xl:col-span-4 bg-slate-900 text-white rounded-xl p-6 shadow-md flex flex-col justify-between gap-6 relative overflow-hidden">
                  <div className="space-y-4 relative z-10">
                    <span className="bg-indigo-500 text-white font-bold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded">GROUNDING PROTOCOL</span>
                    
                    <h3 className="text-xl font-bold font-display">Vector RAG Database</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      Each industry store tenant has its own isolated vectors store index. Any manual document you load gets computed, chunked, and embedded instantly using our Gemini matching algorithms.
                    </p>

                    <div className="space-y-2 border-t border-slate-800 pt-4">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Total Embeddings:</span>
                        <span className="font-mono text-white">412 Vectors</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Sync Status:</span>
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> Synchronized
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Chunk overlap:</span>
                        <span className="font-mono text-white">10% standard buffer</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setShowAddDoc(!showAddDoc)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg text-xs tracking-wide transition-colors relative z-10"
                  >
                    Index New Text Document
                  </button>

                  <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
                    <Database className="w-64 h-64" />
                  </div>
                </div>

                {/* Document index List */}
                <div className="xl:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-800 font-display text-base">RAG Grounding Document Index</h3>
                      <p className="text-xs text-slate-500 mt-0.5">These files define response templates, logistical policies, SLA boundaries, and refund logic rules.</p>
                    </div>
                    <span className="text-xs text-indigo-600 font-mono bg-indigo-50 px-2.5 py-1 rounded">RAG index Active</span>
                  </div>

                  {/* Add document manual pane */}
                  {showAddDoc && (
                    <form onSubmit={handleAddKnowledgeDoc} className="p-4 bg-slate-50 border border-indigo-100 rounded-xl space-y-3">
                      <h4 className="text-xs font-bold text-indigo-900 uppercase">Input and Index New Store Directive Document</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Document Title</label>
                          <input 
                            type="text" 
                            required 
                            placeholder="e.g., Summer Return Exceptions v2" 
                            value={newDocTitle} 
                            onChange={e => setNewDocTitle(e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-indigo-500" 
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Category Theme</label>
                          <input 
                            type="text" 
                            placeholder="e.g., Logistics, Refund FAQ" 
                            value={newDocCategory} 
                            onChange={e => setNewDocCategory(e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-indigo-500" 
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Raw Document Content (Full Text rules)</label>
                        <textarea 
                          rows={4}
                          required
                          placeholder="Standard procedures, refund restrictions, SLA delivery metrics..." 
                          value={newDocContent} 
                          onChange={e => setNewDocContent(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-indigo-500" 
                        />
                      </div>
                      <div className="flex items-center justify-end gap-2 pt-1">
                        <button 
                          type="button" 
                          onClick={() => setShowAddDoc(false)} 
                          className="bg-transparent hover:text-red-500 text-slate-500 text-xs px-3 py-1.5 transition-colors font-medium"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit" 
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-1.5 rounded transition-colors"
                        >
                          Trigger Vector Embeddings
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Live Documents table */}
                  <div className="space-y-4">
                    {currentIndustryData.knowledge.map((doc) => (
                      <div key={doc.id} className="border border-slate-100 rounded-xl p-4 bg-slate-50 hover:bg-indigo-50/10 transition-colors flex items-start gap-4 justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800 text-sm font-display">{doc.title}</span>
                            <span className="text-[9px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded font-mono uppercase tracking-wider">{doc.category}</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 italic">
                            &ldquo;{doc.content}&rdquo;
                          </p>
                          <div className="flex items-center gap-4 text-[10px] text-slate-400 font-mono">
                            <span>Index Size: <b>{doc.size}</b></span>
                            <span>Uploaded: {doc.lastUpdated}</span>
                          </div>
                        </div>

                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse self-center"></div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 5 APP MARKETPLACE */}
            {activeTab === 'marketplace' && (
              <div id="tab-marketplace-packs" className="space-y-6 animate-fadeIn">
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-slate-800 font-display text-base">Enterprise App &amp; Agent Marketplace</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Increase shop conversions by hot-deploying community workflows and custom AI employees.</p>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">6 Agents Listed | Developer Panel Active</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {marketItems.map((item) => {
                    const iconEmoji = item.icon === 'Sparkles' ? '✨' : (item.icon === 'Shuffle' ? '🔄' : (item.icon === 'Scale' ? '⚖️' : '📚'));
                    return (
                      <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-xl shadow-inner">
                              {iconEmoji}
                            </div>
                            <span className="text-xs bg-slate-100 text-slate-800 font-bold px-2.5 py-0.5 rounded-full">
                              {item.category}
                            </span>
                          </div>

                          <div>
                            <h4 className="font-bold text-slate-800 text-sm leading-snug">{item.name}</h4>
                            <span className="text-[10px] text-slate-400">by {item.developer}</span>
                            <p className="text-xs text-slate-600 leading-relaxed font-normal mt-2">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 uppercase font-bold">Standard SKU pricing</span>
                            <span className="text-sm font-bold text-slate-900 font-mono">{item.price}</span>
                          </div>

                          {item.installed ? (
                            <span className="bg-emerald-50 text-emerald-700 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Installed
                            </span>
                          ) : (
                            <button
                              onClick={() => installMarketpack(item)}
                              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors"
                            >
                              Procure &amp; Install
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 6: AI-POWERED PRODUCT SOURCING */}
            {activeTab === 'sourcing' && (
              <div id="tab-sourcing-recommender" className="space-y-6 animate-fadeIn text-left">
                {/* Header card info */}
                <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 relative overflow-hidden">
                  <div className="relative z-10 space-y-2 max-w-2xl">
                    <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-bold uppercase tracking-wider px-2.5 py-1 rounded border border-indigo-500/30">
                      Tailwind &amp; Gemini Grounded Intelligence
                    </span>
                    <h3 className="font-bold text-xl font-display">Competitor Intelligence Sourcing Module</h3>
                    <p className="text-xs text-slate-305 leading-relaxed font-normal">
                      Runs server-side parsing against regional eCommerce competitors, raw material markup sheets, and current sales indicators. Instantly recommendations are generated with built-in profitability breakdowns.
                    </p>
                    <div className="pt-3">
                      <button
                        onClick={handleTriggerSourcing}
                        disabled={sourcingLoading}
                        className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold px-5 py-2 rounded-xl text-xs flex items-center gap-2 transition-colors shadow-lg shadow-indigo-950/20"
                      >
                        {sourcingLoading ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Processing Market Data...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5 text-amber-305" />
                            <span>Retrieve Tailored SKU Opportunities</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  {/* Backdrop artwork */}
                  <div className="absolute right-4 bottom-[-10px] opacity-10 pointer-events-none">
                    <PackagePlus className="w-48 h-48 text-indigo-500" />
                  </div>
                </div>

                {/* Sourcing Loading status banner */}
                {sourcingLoading && (
                  <div className="bg-indigo-50 border border-indigo-200 text-indigo-900 rounded-xl p-6 flex flex-col items-center justify-center space-y-3 shadow-inner">
                    <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin" />
                    <div className="text-center space-y-1">
                      <p className="font-bold text-sm">Querying Competitor Pricing &amp; Market Indicators</p>
                      <p className="text-xs text-slate-500 max-w-sm">Generating optimal markup forecasts and product structures via server-side Gemini 3.5 reasoning...</p>
                    </div>
                  </div>
                )}

                {/* Recommendations layout list */}
                {!sourcingLoading && sourcingRecommendations.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sourcingRecommendations.map((reco, idx) => {
                      const demandColors = reco.targetDemand === 'Extreme' || reco.targetDemand === 'Critical' ? 'bg-rose-100 text-rose-700 border-rose-200' : 'bg-amber-100 text-amber-800 border-amber-200';
                      const profitMargin = reco.marginPct;
                      const competitorAvg = reco.price * 1.15;
                      return (
                        <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-5">
                          <div className="space-y-4">
                            {/* Card badge info */}
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded border border-slate-200 uppercase tracking-widest">{reco.sku}</span>
                              <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${demandColors}`}>
                                Demand: {reco.targetDemand}
                              </span>
                            </div>

                            {/* Product titles and reason */}
                            <div>
                              <h4 className="font-bold text-slate-800 text-sm font-display leading-tight">{reco.name}</h4>
                              <p className="text-xs text-slate-500 leading-relaxed font-normal mt-2">
                                {reco.trendReason}
                              </p>
                            </div>

                            {/* Retail Finance stats grid */}
                            <div className="grid grid-cols-3 gap-2 bg-slate-55 border border-slate-100/80 p-3 rounded-lg text-center">
                              <div>
                                <span className="block text-[8px] uppercase font-bold text-slate-400">Wholesale</span>
                                <span className="text-xs font-mono font-bold text-slate-800">${reco.wholesaleCost.toFixed(2)}</span>
                              </div>
                              <div>
                                <span className="block text-[8px] uppercase font-bold text-slate-400">Target MSRP</span>
                                <span className="text-xs font-mono font-bold text-indigo-700">${reco.price.toFixed(2)}</span>
                              </div>
                              <div>
                                <span className="block text-[8px] uppercase font-bold text-slate-400">Margin</span>
                                <span className="text-xs font-mono font-bold text-emerald-600">+{profitMargin.toFixed(1)}%</span>
                              </div>
                            </div>

                            {/* Additional parameters */}
                            <div className="space-y-2 pt-1 font-sans">
                              <div className="flex justify-between items-center text-[10px] text-slate-500">
                                <span>Target Audience:</span>
                                <span className="text-slate-800 font-medium">{reco.audience}</span>
                              </div>
                              <div className="flex justify-between items-center text-[10px] text-slate-500">
                                <span>Est. Monthly Sales:</span>
                                <span className="text-slate-800 font-bold font-mono">{reco.estMonthlySales} units</span>
                              </div>
                              <div className="flex justify-between items-center text-[10px] text-slate-500 border-t border-slate-100 pt-2">
                                <span>Competitor Average:</span>
                                <span className="text-indigo-600 font-semibold font-mono">${competitorAvg.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Action button */}
                          <div className="pt-2">
                            {reco.synced ? (
                              <button
                                disabled
                                className="w-full bg-slate-100 text-slate-500 border border-slate-200 font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 cursor-not-allowed"
                              >
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                <span>SKU Added To Active Storefront ✓</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => syncSourcedProduct(reco)}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-1 transition-colors"
                              >
                                <PackagePlus className="w-3.5 h-3.5" />
                                <span>Publish To Active SKU Catalog</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Initial blank state when recommendations are empty */}
                {!sourcingLoading && sourcingRecommendations.length === 0 && (
                  <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-4 shadow-sm flex flex-col items-center">
                    <PackagePlus className="w-12 h-12 text-slate-300" />
                    <div className="space-y-1">
                      <p className="font-bold text-slate-700 text-sm">Competitor Opportunity Matrix Empty</p>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">Click "Retrieve Tailored SKU Opportunities" above. This evaluates customer acquisition indices, inventory margins, and competitor pricing scales to propose profitable new products.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 7: VISUAL WORKFLOW PIPELINE BUILDER */}
            {activeTab === 'visual-workflow' && renderWithAICenterLayout(
              <div id="tab-visual-workflows-panel" className="space-y-6 animate-fadeIn text-left font-sans">
                {/* Header overview banner */}
                <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-1">
                    <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider font-mono">Visual Workflow Editor Canvas v2.0</span>
                    <h3 className="text-xl font-bold font-display">n8n-Style Multi-Agent Pipelines</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal max-w-xl">
                      Configure automated operational logic visually. Wire custom storefront trigger nodes, Gemini decision routers, criteria evaluations, and third-party REST hook actions.
                    </p>
                  </div>
                  
                  {/* Presets loader options */}
                  <div className="flex flex-wrap gap-2 shrink-0">
                    <button
                      onClick={() => loadPresetWorkflow('triage')}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-[10px] px-3 py-2 rounded-xl border border-slate-700 transition-colors"
                    >
                      Load Preset: Auto-Triage Support Flow
                    </button>
                    <button
                      onClick={() => loadPresetWorkflow('restock')}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] px-3 py-2 rounded-xl shadow-lg shadow-indigo-950/20 transition-colors"
                    >
                      Load Preset: Auto-Restock Flow
                    </button>
                  </div>
                </div>

                {/* Splits content layout: Canvas Workflow on left, property editor on right */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column (Canvas) */}
                  <div className="md:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-6 min-h-[500px] flex flex-col justify-between">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">Interactive Sequence Builder</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">Click any flowchart node module below to edit its properties or logic parameters.</p>
                      </div>

                      {/* Run Sandbox Button */}
                      <button
                        onClick={runVisualWorkflowSimulator}
                        disabled={isVisualRunning}
                        className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>{isVisualRunning ? 'Sandbox Executing...' : 'Test Run Sandbox (Dry Run)'}</span>
                      </button>
                    </div>

                    {/* Flow Diagram Stage */}
                    <div className="flex-1 flex flex-col items-center justify-center py-6 px-4">
                      <div className="w-full max-w-md space-y-5 relative">
                        {visualNodes.map((node, i) => {
                          const isSelected = selectedNodeId === node.id;
                          const isStepActive = isVisualRunning && i === currentVisualIndex;
                          const isStepPassed = isVisualRunning && i < currentVisualIndex;
                          
                          let cardBorder = isSelected ? 'border-indigo-600 ring-2 ring-indigo-100 bg-indigo-50/20' : 'border-slate-200 hover:border-indigo-305 bg-white';
                          if (isStepActive) {
                            cardBorder = 'border-emerald-605 ring-2 ring-emerald-100 bg-emerald-50/20 scale-[1.03]';
                          } else if (isStepPassed) {
                            cardBorder = 'border-emerald-200 bg-emerald-50/5';
                          }

                          let iconBadge = '';
                          if (node.type === 'trigger') iconBadge = '⚡ TRIGGER';
                          if (node.type === 'ai_decision') iconBadge = '🤖 AI AGENT';
                          if (node.type === 'condition') iconBadge = '⚖️ CONDITION';
                          if (node.type === 'action') iconBadge = '🔌 WORKHOOK';

                          return (
                            <div key={node.id} className="relative flex flex-col items-center">
                              {/* Horizontal or Vertical flow connector link */}
                              {i > 0 && (
                                <div className="absolute top-[-21px] flex flex-col items-center select-none pointer-events-none">
                                  <div className={`w-0.5 h-5 ${isStepPassed ? 'bg-emerald-400' : 'bg-slate-300'}`}></div>
                                  <span className={`text-[9px] font-bold shrink-0 mt-[-5px] leading-none ${isStepPassed ? 'text-emerald-500' : 'text-slate-400'}`}>▼</span>
                                </div>
                              )}

                              {/* Card Body */}
                              <div
                                onClick={() => setSelectedNodeId(node.id)}
                                className={`w-full max-w-sm rounded-xl border p-4 text-left transition-all cursor-pointer relative shadow-sm ${cardBorder}`}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-[8px] font-bold tracking-widest text-indigo-600">{iconBadge}</span>
                                  <div className="flex items-center gap-1">
                                    {isStepPassed && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                                    {isStepActive && <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>}
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteVisualNode(node.id);
                                      }}
                                      title="Remove Node"
                                      className="text-slate-300 hover:text-rose-500 p-0.5 transition-colors cursor-pointer"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>

                                <div className="font-bold text-slate-800 text-xs font-display">{node.title}</div>
                                <div className="text-[10px] text-slate-500 leading-relaxed font-normal mt-1 line-clamp-2">{node.details}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Canvas controls: append nodes row */}
                    <div className="border-t border-slate-100 pt-4 text-center">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2.5">Add Block Module to Workflow Sequence</p>
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        <button
                          onClick={() => addVisualNode('trigger')}
                          className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold px-3 py-1.5 rounded-lg text-[10px] transition-colors cursor-pointer"
                        >
                          + Event Trigger Node
                        </button>
                        <button
                          onClick={() => addVisualNode('ai_decision')}
                          className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold px-3 py-1.5 rounded-lg text-[10px] transition-colors cursor-pointer"
                        >
                          + AI Reasoning Node
                        </button>
                        <button
                          onClick={() => addVisualNode('condition')}
                          className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold px-3 py-1.5 rounded-lg text-[10px] transition-colors cursor-pointer"
                        >
                          + Conditional Node
                        </button>
                        <button
                          onClick={() => addVisualNode('action')}
                          className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold px-3 py-1.5 rounded-lg text-[10px] transition-colors cursor-pointer"
                        >
                          + Webhook Action Node
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (Node Editor Properties & Dry-run logs) */}
                  <div className="md:col-span-4 space-y-6">
                    {/* Node Config Panel */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                      <div className="border-b border-slate-100 pb-3 flex items-center gap-1.5 text-slate-800">
                        <Sliders className="w-4 h-4 text-indigo-600" />
                        <h4 className="font-bold text-xs uppercase tracking-wider font-mono">Configure Node Properties</h4>
                      </div>

                      {selectedNodeId ? (
                        (() => {
                          const editingNode = visualNodes.find(n => n.id === selectedNodeId);
                          if (!editingNode) return <p className="text-xs text-slate-400 font-normal">Select a card element to configure properties.</p>;
                          return (
                            <div className="space-y-4 text-xs font-normal">
                              <div>
                                <label className="block text-[9px] font-bold uppercase text-slate-400 tracking-wider mb-1">Node Title Label</label>
                                <input
                                  type="text"
                                  value={editingNode.title}
                                  onChange={(e) => updateVisualNode(editingNode.id, { title: e.target.value })}
                                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 focus:bg-white text-slate-800 font-semibold"
                                />
                              </div>

                              <div>
                                <label className="block text-[9px] font-bold uppercase text-slate-400 tracking-wider mb-1">Trigger/Action Details Description</label>
                                <textarea
                                  rows={3}
                                  value={editingNode.details}
                                  onChange={(e) => updateVisualNode(editingNode.id, { details: e.target.value })}
                                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 focus:bg-white text-slate-800"
                                />
                              </div>

                              {/* Type specific drop preset mock */}
                              <div>
                                <label className="block text-[9px] font-bold uppercase text-slate-400 tracking-wider mb-1">Integration Target Hook</label>
                                <select
                                  value={editingNode.type === 'trigger' ? 'order_placed' : (editingNode.type === 'ai_decision' ? 'gemini_flash' : 'dhl')}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    const updatedDetails = val === 'order_placed' ? 'Fires automatically upon checkout confirmation.' : (val === 'gemini_flash' ? 'System AI reads database state via Gemini Flash SDK.' : 'Dispatches logistic REST webhook automatically.');
                                    updateVisualNode(editingNode.id, { details: updatedDetails });
                                  }}
                                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                                >
                                  {editingNode.type === 'trigger' && (
                                    <>
                                      <option value="order_placed">storefront.checkout.succeed (Order Placed)</option>
                                      <option value="new_return_request">storefront.return.request (Return Requests)</option>
                                      <option value="stock_alert">inventory.low.threshold (Low stock trigger)</option>
                                    </>
                                  )}
                                  {editingNode.type === 'ai_decision' && (
                                    <>
                                      <option value="gemini_flash">Gemini Flash API Model Router</option>
                                      <option value="gemini_pro">Gemini Pro Advanced Specialist</option>
                                      <option value="gemini_think">Gemini Thinking Reasoner Model</option>
                                    </>
                                  )}
                                  {editingNode.type === 'condition' && (
                                    <>
                                      <option value="margin">If profit gross margin tier &gt; 40%</option>
                                      <option value="risk">If risk threat parameter &lt; 35%</option>
                                      <option value="location">If delivery zip is regional backup zone</option>
                                    </>
                                  )}
                                  {editingNode.type === 'action' && (
                                    <>
                                      <option value="dhl">dhl.courier.dispatch (DHL Dispatch Rest Hook)</option>
                                      <option value="whatsapp">twilio.whatsapp.messaging (Notify User)</option>
                                      <option value="shopify_rest">shopify.catalog.createSKU (Sync Item)</option>
                                    </>
                                  )}
                                </select>
                              </div>

                              <div className="pt-2 border-t border-slate-100">
                                <button
                                  type="button"
                                  onClick={() => deleteVisualNode(editingNode.id)}
                                  className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold py-1.5 rounded-lg text-[10px] transition-colors cursor-pointer"
                                >
                                  Delete Selected Block Module
                                </button>
                              </div>
                            </div>
                          );
                        })()
                      ) : (
                        <p className="text-xs text-slate-400 font-normal">Select are card flowchart element to view its configuration.</p>
                      )}
                    </div>

                    {/* Dry-run execution monitor drawer */}
                    <div className="bg-slate-900 text-slate-100 rounded-2xl p-4 shadow-md space-y-3 font-mono text-[10px]">
                      <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                        <span className="text-slate-405 font-bold">Simulator Output Console</span>
                        <span className="text-emerald-400 text-[9px] animate-pulse">● ACTIVE</span>
                      </div>

                      <div className="space-y-2 max-h-[180px] overflow-y-auto leading-normal whitespace-pre-wrap text-slate-300">
                        {visualWorkflowLogs.length > 0 ? (
                          visualWorkflowLogs.map((logStr, lidx) => (
                            <div key={lidx} className="transition-all animate-fadeIn">
                              {logStr}
                            </div>
                          ))
                        ) : (
                          <span className="text-slate-500 italic">No output logs present. Activate the simulation Sandbox test to stream execution data.</span>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {activeTab === 'sales' && (
              <div id="tab-sales-panel" className="animate-fadeIn">
                <SalesCenter 
                  orders={currentIndustryData.orders}
                  companyName={companyName}
                  addLog={addLog}
                />
              </div>
            )}

            {activeTab === 'products' && (
              <div id="tab-products-panel" className="animate-fadeIn">
                <ProductCenter 
                  products={currentIndustryData.products}
                  selectedIndustry={selectedIndustry}
                  addLog={addLog}
                  onUpdateProducts={(updatedProducts) => {
                    setTenantDB(prev => ({
                      ...prev,
                      [selectedIndustry]: {
                        ...prev[selectedIndustry],
                        products: updatedProducts
                      }
                    }));
                  }}
                />
              </div>
            )}

            {activeTab === 'orders' && (
              <div id="tab-orders-panel" className="animate-fadeIn">
                <OrderCenter 
                  orders={currentIndustryData.orders}
                  products={currentIndustryData.products}
                  selectedIndustry={selectedIndustry}
                  addLog={addLog}
                  onUpdateOrders={(updatedOrders) => {
                    setTenantDB(prev => ({
                      ...prev,
                      [selectedIndustry]: {
                        ...prev[selectedIndustry],
                        orders: updatedOrders
                      }
                    }));
                  }}
                />
              </div>
            )}



            {activeTab === 'customers' && (
              <div id="tab-customers-panel" className="animate-fadeIn">
                <CustomerCenter 
                  customers={currentIndustryData.customers || []}
                  selectedIndustry={selectedIndustry}
                  addLog={addLog}
                  onUpdateCustomers={(updatedCustomers) => {
                    setTenantDB(prev => ({
                      ...prev,
                      [selectedIndustry]: {
                        ...prev[selectedIndustry],
                        customers: updatedCustomers
                      }
                    }));
                  }}
                />
              </div>
            )}

            {activeTab === 'marketing' && (
              <div id="tab-marketing-panel" className="animate-fadeIn">
                <MarketingCenter
                  customers={currentIndustryData.customers || []}
                  selectedIndustry={selectedIndustry}
                  addLog={addLog}
                  onUpdateCustomers={(updatedCustomers) => {
                    setTenantDB(prev => ({
                      ...prev,
                      [selectedIndustry]: {
                        ...prev[selectedIndustry],
                        customers: updatedCustomers
                      }
                    }));
                  }}
                />
              </div>
            )}

            {activeTab === 'finance' && (
              <div id="tab-finance-panel" className="animate-fadeIn">
                <FinanceCenter
                  orders={currentIndustryData.orders}
                  selectedIndustry={selectedIndustry}
                  addLog={addLog}
                />
              </div>
            )}



            {activeTab === 'online-store' && (
              <div id="tab-online-store-panel" className="animate-fadeIn">
                <OnlineStore
                  selectedIndustry={selectedIndustry}
                  addLog={addLog}
                />
              </div>
            )}

            {activeTab === 'doctree' && renderWithDeveloperCenterLayout(
              <div id="tab-doctree-panel" className="animate-fadeIn">
                <DocTreeViewer />
              </div>
            )}

            {activeTab === 'agents' && renderWithAICenterLayout(
              <div id="tab-agents-panel" className="animate-fadeIn">
                <AIEmployeeCenter 
                  activeAgents={activeAgents}
                  onUpdateAgents={(updated) => setActiveAgents(updated)}
                  selectedIndustry={selectedIndustry}
                  addLog={addLog}
                />
              </div>
            )}

            {['settings', 'payments', 'logistics', 'employees', 'roles', 'policies'].includes(activeTab) && (
              <div id="tab-settings-panel" className="animate-fadeIn">
                <EnterpriseSettings 
                  companyName={companyName}
                  onUpdateCompanyName={(name) => setCompanyName(name)}
                  selectedIndustry={selectedIndustry}
                  addLog={addLog}
                  orders={currentIndustryData.orders}
                  products={currentIndustryData.products}
                  onUpdateOrders={(updatedOrders) => {
                    setTenantDB(prev => ({
                      ...prev,
                      [selectedIndustry]: {
                        ...prev[selectedIndustry],
                        orders: updatedOrders
                      }
                    }));
                  }}
                  onUpdateProducts={(updatedProducts) => {
                    setTenantDB(prev => ({
                      ...prev,
                      [selectedIndustry]: {
                        ...prev[selectedIndustry],
                        products: updatedProducts
                      }
                    }));
                  }}
                />
              </div>
            )}

            {activeTab === 'shopify-docs' && renderWithDeveloperCenterLayout(
              <div id="tab-shopify-docs-panel" className="animate-fadeIn">
                <ShopifyDocsFinder 
                  addLog={addLog}
                />
              </div>
            )}

              </>
            )}

          </div>

          {/* Right Pane: Embedded 420px Fixed AI Command Center */}
          <AICommandCenter
            isOpen={isCommandCenterOpen}
            onClose={() => setIsCommandCenterOpen(false)}
            selectedIndustry={selectedIndustry}
            products={currentIndustryData.products}
            orders={currentIndustryData.orders}
            customers={currentIndustryData.customers || []}
            currentAppTab={activeTab}
            onUpdateCustomers={(updatedCustomers) => {
              setTenantDB(prev => ({
                ...prev,
                [selectedIndustry]: {
                  ...prev[selectedIndustry],
                  customers: updatedCustomers
                }
              }));
            }}
            addLog={addLog}
            onSwitchTab={(tab) => setActiveTab(tab)}
            onTriggerAddProductOpen={() => setShowAddProduct(true)}
            onBulkRestock={handleBulkRestockComp}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onAddNewProduct={handleAddNewProductComp}
            onPrefillProductForm={(name, sku, price, stock) => {
              setNewTitle(name);
              setNewSKU(sku);
              setNewPrice(price);
              setNewStock(stock);
              setNewThreshold(10);
              setActiveTab('products');
              setShowAddProduct(true);
              addLog('AI Commander', 'Deep Redirection & Prefill', `已自动将智体提案货品「${name}」填充到商品创建表单并为您跳转，完成闭环！`, 'success');
            }}
          />

        </div>

      </main>

      {/* Manual Gemini API Key Injection Modal Overlay */}
      {showKeyModal && (
        <div id="saas-apikey-modal" className="fixed inset-0 bg-slate-950/75 flex items-center justify-center p-4 z-50 animate-fadeIn backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 p-6 shadow-2xl relative space-y-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 font-display">Workspace Key Provisioning</h3>
              </div>
              <button 
                onClick={() => setShowKeyModal(false)}
                className="text-slate-400 hover:text-slate-600 rounded p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-2.5 leading-relaxed font-normal">
              <p>
                This application is a full-stack high-fidelity simulator for an <b>AI Business operating System (AI Commerce OS)</b>. It leverages Google&#39;s next-generation <b>Gemini 3.5 Flash</b> model family to execute autonomous reasoning on stocks, catalog adjustments, returns risk, and advisor student triage.
              </p>
              <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg text-slate-500 space-y-1">
                <span className="font-semibold block text-slate-700">How to authorize:</span>
                <span>You can save a valid model key below. This key remains securely stored inside the application memory scope.</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">GEMINI_API_KEY SECRET</label>
              <input 
                type="password"
                placeholder="AIzaSy..."
                value={customApiKey}
                onChange={(e) => setCustomApiKey(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white font-mono"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="bg-transparent hover:text-red-500 text-slate-500 font-medium text-xs py-2 px-3 transition-colors"
              >
                Cancel / Sim
              </button>
              <button
                type="button"
                onClick={saveApiKey}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors shadow-sm"
              >
                Incorporate Key
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Online Storefront Simulator Modal Overlay */}
      {isOnlineStoreOpen && (
        <div id="saas-storefront-modal" className="fixed inset-0 bg-slate-950/80 flex items-center justify-center p-4 md:p-8 z-50 animate-fadeIn backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full flex flex-col h-[85vh] overflow-hidden shadow-2xl">
            
            {/* Storefront Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 py-3.5 px-6 text-white flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-white/20 rounded-md flex items-center justify-center font-black text-sm">🏪</div>
                <div>
                  <h3 className="font-extrabold text-sm tracking-tight">Shopify Online Client Storefront (在线顾客端浏览器)</h3>
                  <span className="text-[10px] text-emerald-100 font-mono tracking-wider uppercase">Active Live Sandbox Simulator</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOnlineStoreOpen(false)}
                className="bg-slate-950/40 hover:bg-slate-950/60 text-white rounded-full p-1.5 transition-all active:scale-95 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Storefront URL Bar design */}
            <div className="bg-slate-950 border-b border-slate-850 px-4 py-2 flex items-center gap-3">
              <div className="flex gap-1.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              </div>
              <div className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>https://{selectedIndustry}-storefront-client.shopify.preview/shop</span>
                <span className="text-emerald-500 font-bold shrink-0">● SSL SECURE CONNECTION</span>
              </div>
            </div>

            {/* Simulated Banner at top of Storefront */}
            <div className="bg-indigo-950/60 border-b border-indigo-900 px-6 py-2 text-center text-[10px] font-bold text-indigo-350">
              💡 正在浏览顾客端：在这里点击“立即订购”，系统将减扣真实库存，并在商家后台实时生成一笔新订单！
            </div>

            {/* Storefront Body Content (Responsive product grid) */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-950 space-y-8">
              
              {/* Cover Banner */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-850 border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left z-10">
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2.5 py-1 rounded-full border border-emerald-500/20">
                    SaaS AUTONOMY PREVIEW
                  </span>
                  <h4 className="text-xl font-extrabold text-white">
                    {selectedIndustry === 'retail' && '🧥 极光原创服装设计批发中心 · 独领风骚'}
                    {selectedIndustry === 'food' && '🍔 极光臻选美式汉堡外卖店 · 金牌品质'}
                    {selectedIndustry === 'education' && '🎓 极光名校专家精品课程付费网店'}
                    {selectedIndustry === 'healthcare' && '🏪 服装百货收银智能 POS 门店系统'}
                    {selectedIndustry === 'service' && '💅 极光名媛高级丽人美容预约中心'}
                    {selectedIndustry === 'manufacturing' && '🔋 智能化百货电器货源直供中台'}
                  </h4>
                  <p className="text-xs text-slate-400 max-w-lg font-normal">
                    系统基于
                    {selectedIndustry === 'retail' && '原创服装设计与分销中台，实时跟踪款中心、面料及批发单。'}
                    {selectedIndustry === 'food' && '数字化智能外卖餐馆，配备AI点餐员与即时配餐厨房系统。'}
                    {selectedIndustry === 'education' && '专家线上知识内容发布与多平台电商变现方案。'}
                    {selectedIndustry === 'healthcare' && '前台收银移动端多门店 POS 解决方案，深度整合库存中控。'}
                    {selectedIndustry === 'service' && '智能化美业定制与高级技师预约派工系统。'}
                    {selectedIndustry === 'manufacturing' && '数字工厂百货电器供应货源，集采购与仓配链于一体。'}
                    我们提供全链路闭环，为您提供 24/7 全天候 AI 运营总监协同服务。
                  </p>
                </div>
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-black text-white text-3xl shrink-0">
                  {selectedIndustry === 'retail' && '🧥'}
                  {selectedIndustry === 'food' && '🍔'}
                  {selectedIndustry === 'education' && '📘'}
                  {selectedIndustry === 'healthcare' && '⚡'}
                  {selectedIndustry === 'service' && '💅'}
                  {selectedIndustry === 'manufacturing' && '🔋'}
                </div>
              </div>

              {/* Products Section */}
              <div className="space-y-4">
                <h5 className="font-extrabold text-xs text-slate-200 tracking-wider uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>PREVIEW CATALOG GOODS / 顾客购买商品列表</span>
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentIndustryData.products.map((product) => {
                    const isOutOfStock = product.stock <= 0;
                    return (
                      <div 
                        key={product.id} 
                        className="bg-slate-900 border border-slate-850 hover:border-emerald-500/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all group duration-300"
                      >
                        {/* Image Box */}
                        <div className="h-36 bg-gradient-to-br from-slate-950 to-slate-850 flex items-center justify-center relative select-none">
                          <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                            {selectedIndustry === 'retail' && '🧥'}
                            {selectedIndustry === 'food' && '🍔'}
                            {selectedIndustry === 'education' && '📘'}
                            {selectedIndustry === 'healthcare' && '🏪'}
                            {selectedIndustry === 'service' && '🧴'}
                            {selectedIndustry === 'manufacturing' && '🔋'}
                          </span>
                          <span className="absolute top-2 left-2 bg-slate-900/85 border border-slate-800 text-[8px] text-slate-400 font-mono px-2 py-0.5 rounded-full">
                            SKU-ID: {product.sku}
                          </span>
                          
                          {/* Stock tag */}
                          <span className={`absolute top-2 right-2 text-[8px] px-1.5 py-0.5 rounded font-bold uppercase ${isOutOfStock ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : (product.stock <= product.minStockThreshold ? 'bg-amber-500/20 text-amber-450 border border-amber-500/30' : 'bg-emerald-500/25 text-emerald-450 border border-emerald-505/20')}`}>
                            {isOutOfStock ? '无货' : `存量 ${product.stock}`}
                          </span>
                        </div>

                        {/* Product Body */}
                        <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                          <div className="space-y-1 text-left">
                            <h6 className="font-bold text-slate-200 text-xs truncate">
                              {product.name}
                            </h6>
                            <p className="text-[10px] text-slate-500 font-mono">
                              累计销量: {product.sales}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-850/60">
                            <span className="text-emerald-400 text-sm font-black font-mono">
                              ${product.price}
                            </span>
                            <button
                              type="button"
                              disabled={isOutOfStock}
                              onClick={() => {
                                handleStorefrontPurchase(product.id);
                              }}
                              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all active:scale-95 flex items-center gap-1 cursor-pointer ${isOutOfStock ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-[#10b981] hover:bg-emerald-500 text-white shadow shadow-emerald-500/20'}`}
                            >
                              <span>立即订购</span>
                              <ShoppingCart className="w-3 h-3 text-emerald-200" />
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Storefront Footer */}
            <div className="bg-slate-950 border-t border-slate-850 p-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
              <span>Secure Checkout powered by AI Commerce SaaS payment gateway (256-bit SSL).</span>
              <button 
                onClick={() => setIsOnlineStoreOpen(false)}
                className="bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-300 font-bold px-4 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                返回工作台
              </button>
            </div>

          </div>
        </div>
      )}



    </div>
  );
}
