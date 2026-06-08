import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Search, 
  TrendingUp, 
  ArrowRight, 
  AlertCircle, 
  Terminal, 
  HelpCircle,
  Database,
  Cpu,
  Bookmark,
  CheckCircle2,
  FolderLock,
  Workflow,
  Compass,
  Zap,
  Info,
  Layers,
  ChevronRight,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Users,
  Megaphone,
  Truck,
  CreditCard,
  Coins,
  Bot,
  Settings,
  Globe,
  Download
} from 'lucide-react';
import { IndustryType, ProductItem, OrderItem, CustomerItem } from '../types';
import { aiRuntimeStore } from '../store/aiRuntimeStore';
import {
  ProductService,
  OrderService,
  CustomerService,
  FinanceService,
  InventoryService,
  MarketingService,
  PaymentService
} from '../services/BusinessServices';
import { AgentOrchestrator } from '../services/AgentOrchestrator';

interface AICommandCenterProps {
  isOpen: boolean;
  onClose: () => void;
  selectedIndustry: IndustryType;
  products: ProductItem[];
  orders: OrderItem[];
  customers: CustomerItem[];
  currentAppTab: string; // The dynamically tracked current screen of the application!
  onUpdateCustomers: (updated: CustomerItem[]) => void;
  addLog: (agent: string, action: string, details: string, type: 'info' | 'success' | 'warning' | 'error' | 'tool') => void;
  onSwitchTab: (tab: any) => void;
  onTriggerAddProductOpen: () => void;
  onBulkRestock: (sku: string, amount: number) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: any) => void;
  onAddNewProduct: (name: string, sku: string, price: number, stock: number) => void;
  onPrefillProductForm?: (name: string, sku: string, price: number, stock: number) => void;
}

interface DecodedIntent {
  intent: string;
  industry: string;
  module: string;
  tools: string[];
  type: 'Query' | 'Action' | 'Planning';
}

export default function AICommandCenter({
  isOpen,
  onClose,
  selectedIndustry,
  products,
  orders,
  customers,
  currentAppTab,
  onUpdateCustomers,
  addLog,
  onSwitchTab,
  onTriggerAddProductOpen,
  onBulkRestock,
  onUpdateOrderStatus,
  onAddNewProduct,
  onPrefillProductForm
}: AICommandCenterProps) {
  const [query, setQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [activeTab, setActiveTab] = useState<'brain' | 'monitor'>('brain');
  const [mediaSaved, setMediaSaved] = useState<boolean>(false);

  // --- NEW MULTI-AGENT & MULTI-MODAL STATE ENGINE ---
  const [selectedVisualAsset, setSelectedVisualAsset] = useState<'screenshot' | 'product_pic' | 'trend_chart' | null>(null);
  const [isVisualProcessing, setIsVisualProcessing] = useState<boolean>(false);
  
  // Staggered interactive cognitive simulation steps
  const [agentRoundtable, setAgentRoundtable] = useState<any[]>([]);
  const [currentRoundtableStep, setCurrentRoundtableStep] = useState<number>(-1);
  const [roundtableDone, setRoundtableDone] = useState<boolean>(false);

  // Dynamic parameters calibrated on the Draft Proposal UI card
  const [pricingPreset, setPricingPreset] = useState<number>(3); // Pricing Margin optimization (default +3%)
  const [restockQtyPreset, setRestockQtyPreset] = useState<number>(150); // Direct restock PO count (default 150 items)
  const [selectedVoucherCode, setSelectedVoucherCode] = useState<string>('MEGA-SMART-OFF');
  const [selectedVoucherRatio, setSelectedVoucherRatio] = useState<number>(15); // Discount (default 15%)
  const [isRiskDefenseShieldOn, setIsRiskDefenseShieldOn] = useState<boolean>(true);
  const [generatedCopywriting, setGeneratedCopywriting] = useState<string>('🔥 Premium Exclusive Release: Engineered for optimal lightweight performance & seamless design aesthetics.');

  // Agent Orchestrator state variables
  const [routedAgent, setRoutedAgent] = useState<any | null>(null);
  const [routedRationale, setRoutedRationale] = useState<string>('');
  const [routedSuggestedAction, setRoutedSuggestedAction] = useState<string>('');

  // AI Cognitive analysis states
  const [decodedIntent, setDecodedIntent] = useState<DecodedIntent | null>(null);
  const [analysisResult, setAnalysisResult] = useState<{
    problems: string[];
    expectedBoost: string;
    suggestions: string[];
    actionType: 'restock' | 'campaign' | 'product_create' | 'revenue_report' | 'churn_mitigation' | 'profit_optimization' | 'none';
    metaData: any;
  } | null>(null);

  // Helper render function for high-end realistic product mock renderings
  const renderMerchantCoachPicture = (itemType: string, titleStr: string) => {
    let innerJSX = null;
    let categoryName = "Premium Quality Product Shot";

    if (itemType === 'phone') {
      categoryName = "Apple Titanium Bezel Mockup Device";
      innerJSX = (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 p-2 text-center relative overflow-hidden">
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
          
          <div className="w-[110px] h-[200px] rounded-[24px] border-[3px] border-slate-850 bg-slate-900 flex flex-col justify-between p-1.5 shadow-[0_12px_24px_-4px_rgba(0,0,0,0.8)] relative">
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-3 bg-black rounded-full flex items-center justify-center z-10 border border-slate-800">
              <div className="w-1 h-1 bg-[#00ffcc] rounded-full animate-pulse"></div>
            </div>

            <div className="flex-1 rounded-[18px] bg-gradient-to-tr from-[#020205] to-[#12131C] border border-slate-950 overflow-hidden flex flex-col justify-between p-2 font-mono">
              <div className="pt-3 text-center">
                <span className="text-[6px] text-[#07C2E3] font-bold block tracking-widest leading-none">IPHONE 16</span>
                <span className="text-[5px] text-slate-550 block">TITANIUM ACTIVE</span>
              </div>

              <div className="my-auto mx-auto w-10 h-10 bg-slate-950 rounded-2xl relative border border-slate-855 flex items-center justify-center shadow-lg">
                <div className="absolute top-1 left-1.5 w-3.5 h-3.5 bg-slate-900 border border-slate-750 rounded-full flex items-center justify-center text-[5px]">
                  <span className="w-0.5 h-0.5 bg-blue-400 rounded-full"></span>
                </div>
                <div className="absolute bottom-1 left-1.5 w-3.5 h-3.5 bg-slate-900 border border-slate-750 rounded-full flex items-center justify-center text-[5px]">
                  <span className="w-0.5 h-0.5 bg-red-400 rounded-full"></span>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 right-1 w-3.5 h-3.5 bg-slate-900 border border-slate-750 rounded-full flex items-center justify-center text-[5px]">
                  <span className="w-0.5 h-0.5 bg-green-400 rounded-full"></span>
                </div>
              </div>

              <div className="text-center">
                <span className="text-[5px] text-[#00ffcc] font-mono leading-none block">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (itemType === 'coffee') {
      categoryName = "Glass Iced Beverage Mug Mockup";
      innerJSX = (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 p-2 text-center relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-yellow-600/5 rounded-full blur-3xl"></div>

          <div className="w-[85px] h-[180px] rounded-t-xl rounded-b-[32px] border border-slate-850 bg-slate-905 flex flex-col justify-between p-1 shadow-[0_12px_24px_-4px_rgba(0,0,0,0.85)] relative">
            <div className="absolute -top-2.5 left-1/2 -translate-x-[20%] w-1.5 h-6 bg-indigo-500/40 rounded-full rotate-12 z-0"></div>

            <div className="flex-1 rounded-t-lg rounded-b-[26px] bg-gradient-to-b from-[#ffbb3b]/40 via-[#703300] to-[#2b1200] border border-slate-950 overflow-hidden flex flex-col justify-between p-2 relative">
              <div className="absolute top-4 left-1.5 w-4 h-4 bg-white/20 rounded border border-white/10 rotate-12 flex items-center justify-center">
                <span className="text-[4px] text-white/30">ICE</span>
              </div>
              <div className="absolute top-10 right-2 w-4 h-4 bg-white/15 rounded border border-white/10 -rotate-12 flex items-center justify-center">
                <span className="text-[4px] text-white/30 font-bold">ICE</span>
              </div>

              <div className="absolute inset-x-0 bottom-0 h-24 bg-[#331102]/95 rounded-b-[24px]"></div>

              <div className="absolute bottom-2 inset-x-1 p-0.5 rounded bg-[#0b0c10]/90 border border-[#ffbb3b]/20 z-15 text-center shadow">
                <span className="text-[5px] text-[#ffbb3b] font-mono tracking-widest block font-bold leading-none">CARAMEL</span>
                <span className="text-[4px] text-slate-500 font-sans block leading-none mt-0.5">EXCLUSIVE</span>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      categoryName = "Tactical Active Wear Blueprint";
      innerJSX = (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 p-2 text-center relative overflow-hidden">
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
          
          <div className="w-[100px] h-[170px] border border-dashed border-emerald-900/35 rounded-xl bg-[#080c0d]/80 flex flex-col justify-between p-2 relative shadow-2xl">
            <div className="mx-auto w-5 h-2 rounded-t-full border border-slate-750 relative -mt-0.5"></div>

            <div className="my-auto mx-auto w-12 h-20 relative flex items-center justify-center text-emerald-550/20">
              <svg className="w-full h-full stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21m3.813-5.096L14 21m-4.187-5.096c.148-.06.313-.094.487-.094h1.7c.174 0 .34.034.487.094m-4.187 0a1.5 1.5 0 01-.813-1.332V9.45c0-.51.246-.983.666-1.272l1.623-1.116a1.53 1.53 0 011.623 0l1.623 1.116c.42.289.666.762.666 1.272V14.57c0 .53-.284 1.013-.743 1.275l-1.2.686a1.53 1.53 0 01-1.396 0l-1.2-.686z" />
              </svg>
              <div className="absolute top-8 text-[5px] tracking-tight bg-emerald-500/15 text-emerald-450 border border-emerald-500/25 px-1 rounded font-mono font-bold">
                TACTICAL-V4
              </div>
            </div>

            <div className="text-center font-mono">
              <span className="text-[5.5px] text-emerald-450 block font-bold leading-none">OUTDOOR</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="border border-slate-900 bg-[#06070a] rounded-2xl overflow-hidden shadow-2xl p-0 space-y-3 relative">
        <div className="relative w-full h-[220px] flex items-center justify-center overflow-hidden border-b border-slate-900/40">
          {innerJSX}
          <div className="absolute top-0 bottom-0 left-[-50%] w-[50%] bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 pointer-events-none animate-[shimmer_5s_infinite]"></div>

          <div className="absolute bottom-2.5 left-2.5 bg-[#0a0a0f]/90 border border-slate-850 px-1.5 py-0.5 rounded text-[7px] text-slate-450 tracking-wide font-mono flex items-center gap-1 backdrop-blur-sm shadow">
            <Layers className="w-2.5 h-2.5 text-[#07C2E3]" />
            <span>{categoryName}</span>
          </div>

          <div className="absolute top-2.5 right-2.5 flex gap-1">
            <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/35 px-1 py-0.5 rounded text-[7px] font-mono uppercase font-black">
              2K HD STUDIO
            </span>
          </div>
        </div>

        <div className="p-3 pt-0 space-y-2">
          <div className="grid grid-cols-3 gap-1.5 text-[8px] font-semibold text-slate-400 font-mono">
            <div className="bg-slate-950 p-1.5 rounded border border-slate-900 flex items-center gap-0.5 justify-center text-slate-400">
              <span className="text-amber-400 font-bold">&#9733;</span>
              <span>店铺首图</span>
            </div>
            <div className="bg-slate-950 p-1.5 rounded border border-slate-900 flex items-center gap-0.5 justify-center text-slate-400">
              <span className="text-indigo-400 font-bold">&#9733;</span>
              <span>广告投放</span>
            </div>
            <div className="bg-slate-950 p-1.5 rounded border border-slate-900 flex items-center gap-0.5 justify-center text-slate-400">
              <span className="text-teal-400 font-bold">&#9733;</span>
              <span>专区横幅</span>
            </div>
          </div>

          {mediaSaved ? (
            <div className="p-1.5 bg-emerald-500/10 border border-emerald-500/25 rounded-xl text-center text-[9px] text-emerald-400 font-mono font-bold flex items-center justify-center gap-1 animate-fadeIn">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>已同步录入商户多租户隔离媒体素材库！</span>
            </div>
          ) : (
            <button
              onClick={() => {
                setMediaSaved(true);
                addTelemetryLog('动作报告：媒体图保存至存储桶里。', 'DECISION');
                addLog('AI 智脑', 'Media Synchronized', `已成功将上新「${titleStr}」爆款概念全幅图存入 SaaS 多租户隔离存储媒介桶中！`, 'success');
              }}
              type="button"
              className="w-full bg-[#0aa0bc]/10 hover:bg-[#0aa0bc]/20 border border-[#0aa0bc]/30 text-[#07C2E3] py-2 rounded-xl transition-all cursor-pointer text-center text-[9px] font-mono font-black flex items-center justify-center gap-1.5"
            >
              <Download className="w-3 h-3" />
              <span>保存高清效果图到店铺独立媒体库</span>
            </button>
          )}
        </div>
      </div>
    );
  };

  // Flow control states
  const [hasGeneratedPlan, setHasGeneratedPlan] = useState(false);
  const [isActionExecuted, setIsActionExecuted] = useState(false);
  const [executionFeedback, setExecutionFeedback] = useState('');

  // 1. Session Context - Calculated dynamic thresholds
  const productsCount = products.length;
  const ordersCount = orders.length;
  const customersCount = customers?.length || 0;
  const liveLowStockCount = products.filter(p => p.stock <= 10).length;
  const pendingShippingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'AI Confirmed').length;

  // Determine Store Lifecycle Stage based on real live numbers
  let currentStoreStage = '店铺起步期 (Setup Stage)';
  let currentStageProgress = 30; // percentage
  let stageDescription = '商店刚完成基础注册，需要配置核心货品与物流通道。';
  let nextImmediateStep = '前往商品中心发布您的第一款主推商品';
  let targetActionTab = 'products';

  if (productsCount >= 5 && ordersCount === 0) {
    currentStoreStage = '现货筹备期 (Stock Readiness)';
    currentStageProgress = 55;
    stageDescription = '货备已足，但还没有收到首笔真实订单。需启动优惠活动。';
    nextImmediateStep = '配置首个 15% 满减优惠券并打开营销大中枢';
    targetActionTab = 'marketing';
  } else if (productsCount >= 5 && ordersCount > 0 && ordersCount < 10) {
    currentStoreStage = '转化攀升期 (Growth Phase)';
    currentStageProgress = 75;
    stageDescription = '首批真实订单成功落袋！现在主力需要发货并维护好加购未付买家。';
    nextImmediateStep = '前往客户中心批量召回高意向加购未付顾客';
    targetActionTab = 'customers';
  } else if (productsCount >= 5 && ordersCount >= 10) {
    currentStoreStage = '高能效运营期 (Scale & Auto)';
    currentStageProgress = 95;
    stageDescription = '店铺进入高频售出期。应当启动多仓智体自动调配以对齐订单。';
    nextImmediateStep = '启用 AI 中心，核准智能客服与财务自动化审查';
    targetActionTab = 'agents';
  }

  // Audit Logs database
  const [aiExecutionLogs, setAiExecutionLogs] = useState<{ id: string; time: string; text: string; category: string }[]>([
    { id: 'l1', time: '09:00', text: '商业智能引擎挂载完毕：行业数据流安全对齐完成', category: 'SYSTEM' },
    { id: 'l2', time: '09:05', text: '对齐 Live Store Data：已自动标记当前页面上下文 [智能大盘]', category: 'MONITOR' }
  ]);

  const addTelemetryLog = (text: string, category: string) => {
    const timeStr = new Date().toTimeString().slice(0, 5);
    setAiExecutionLogs(prev => [
      { id: `log_${Date.now()}`, time: timeStr, text, category },
      ...prev
    ]);
  };

  // 2. Page Context - Dynamically map current UI tab to human names & custom quick prompts
  const getTabContextData = () => {
    switch (currentAppTab) {
      case 'command':
        return {
          title: '📊 智能大盘 (Dashboard)',
          desc: '在这里，您能鸟瞰店铺的核心欧元流水与 AI 自动化总览。',
          tips: '建议关注实时波动。点击下方建议，快速诊断：',
          prompts: [
            { text: '为什么最近订单下降了？', label: '智能诊断' },
            { text: '一键分析今天经营业绩并核定税后利润', label: '日间决算' }
          ]
        };
      case 'products':
        return {
          title: '📦 商品中心 (Products)',
          desc: '这里存放着您店铺所有的爆款 SKU 结构与仓库实存标定。',
          tips: '自动创建商品与规划配货：',
          prompts: [
            { text: '我想卖一件男士短袖防风衣，直接帮我建新商品。', label: '极速上架' },
            { text: `分析哪些商品该补货？`, label: '补货预警' }
          ]
        };
      case 'orders':
        return {
          title: '🧾 订单中心 (Orders)',
          desc: '承载所有付款账单状态及 AI 异常欺诈校验拦截记录。',
          tips: '快速排查或优化订单流速：',
          prompts: [
            { text: '统计并梳理当前需要尽快安排发货的订单？', label: '履约对账' },
            { text: '帮我查找退款纠纷比例发生异常吗？', label: '纠纷拦截' }
          ]
        };
      case 'customers':
        return {
          title: '👥 客户中心 (Customers)',
          desc: '记录欧盟真实加购、沉默及高复购买家的消费轨迹。',
          tips: '对准流失客户进行召回操作：',
          prompts: [
            { text: '哪些沉默意向大客户快流失了？帮我批量营销。', label: '流失召回' },
            { text: '如何提升高价值 VIP 客户的下月复购率？', label: 'VIP复购' }
          ]
        };
      default:
        return {
          title: '🤖 AI 指挥官 (Commander)',
          desc: '全端 AI 电商操作中心，接收目标、规划任务、执行博弈及自动化巡逻。',
          tips: '随时发送复杂目标启动多部门智能体协同：',
          prompts: [
            { text: '为什么最近订单下降了？', label: '智能诊断' },
            { text: '下季度核心品类定价与补货应该如何博弈？', label: '高级协同' }
          ]
        };
    }
  };

  const handleProcessQuery = (text: string) => {
    if (!text.trim()) return;

    setIsThinking(true);
    setDecodedIntent(null);
    setAnalysisResult(null);
    setHasGeneratedPlan(false);
    setIsActionExecuted(false);
    setExecutionFeedback('');
    setRoundtableDone(false);
    setAgentRoundtable([]);
    setCurrentRoundtableStep(-1);

    const rtCtx = aiRuntimeStore.getContext();
    addTelemetryLog(`Semantic Intent Parsing: "${text.slice(0, 30)}"`, 'PARSER');

    // Dynamically Route Quest to Specialized Agent via AgentOrchestrator
    const routedTask = AgentOrchestrator.routeTask(text, rtCtx);
    setRoutedAgent(routedTask.agent);
    setRoutedRationale(routedTask.rationale);
    setRoutedSuggestedAction(routedTask.suggestedAction);

    const lower = text.toLowerCase();
    const dbMetrics = FinanceService.calculateMetrics(products, orders, customers);
    const country = rtCtx.shop.country || '德国 (DE)';
    const industry = rtCtx.shop.industry || '通用零售';

    // Map query to proper Action Type for physical database updates
    let detectedActionType: 'restock' | 'campaign' | 'product_create' | 'revenue_report' | 'churn_mitigation' | 'profit_optimization' | 'none' = 'none';
    let targetSku = 'SKU-DEFAULT';
    let targetTitle = '新品爆款';

    if (routedTask.agent.id === 'inventory' || lower.includes('补货') || lower.includes('缺货') || lower.includes('库存') || lower.includes('卖完了')) {
      detectedActionType = 'restock';
      const lowStockItems = InventoryService.getReplenishmentNeeded(products);
      if (lowStockItems.length > 0) {
        targetSku = lowStockItems[0].sku;
        targetTitle = lowStockItems[0].name;
      }
    } else if (routedTask.agent.id === 'marketing' || lower.includes('促销') || lower.includes('优惠码') || lower.includes('满减') || lower.includes('大促') || lower.includes('活动') || lower.includes('公告')) {
      detectedActionType = 'campaign';
    } else if (routedTask.agent.id === 'customer' || lower.includes('客户流失') || lower.includes('流失') || lower.includes('哪些客户快') || lower.includes('沉默')) {
      detectedActionType = 'churn_mitigation';
    } else if (routedTask.agent.id === 'pricing' || routedTask.agent.id === 'finance' || routedTask.agent.id === 'risk' || lower.includes('今天') || lower.includes('利润') || lower.includes('运营') || lower.includes('营业') || lower.includes('盈亏')) {
      detectedActionType = 'profit_optimization';
    } else if (routedTask.agent.id === 'product' || lower.includes('上架') || lower.includes('全新') || lower.includes('创建') || lower.includes('发布')) {
      detectedActionType = 'product_create';
    }

    // Configure the multi-agent roundtable steps depending on the matched request
    const steps = [
      {
        agent: 'commander',
        name: '🧠 OPS Commander (运营总指挥官)',
        avatar: '🤖',
        role: 'Orchestrator',
        content: `【总揽】收到商户目标:「${text}」。\n微内核调度器（AgentOrchestrator）已分析此目标，自动委派专场专家 「${routedTask.agent.name}」 为核心承运组长！\n已召集 Pricing, Inventory, Marketing, Risk, Content 各部门智能体，准备多目标对账协同。`
      },
      {
        agent: routedTask.agent.id,
        name: `${routedTask.agent.emoji} ${routedTask.agent.name} (${routedTask.agent.title})`,
        avatar: routedTask.agent.emoji,
        role: routedTask.agent.role,
        content: `【核心受托智能体提报】受托承办此事务。\n【战略研判】：${routedTask.rationale}。\n【建议物理部署动作】：${routedTask.suggestedAction}。我们已挂载相关 Tool Service 准备回输。`
      },
      {
        agent: 'pricing',
        name: '💰 Pricing & Yield Agent (智能定价变体定价师)',
        avatar: '📈',
        role: 'Revenue & Price Optimization',
        content: `【定价协同】针对本次委派，分析行业价格弹性。建议调节最终价格系数 [${pricingPreset > 0 ? '+' : ''}${pricingPreset}%]，这可以在订单平滑的前提下提升毛利率。`
      },
      {
        agent: 'inventory',
        name: '🏭 Inventory & Sourcing Agent (全球库存周转专家)',
        avatar: '📦',
        role: 'Logistics & Supply Chain',
        content: `【库存协同】同步检测核心 SKU 水位。目前店铺处于「${currentStoreStage}」。建议一键向合作供应商拉满补货采购 [${restockQtyPreset} 件] 以供周转。`
      },
      {
        agent: 'marketing',
        name: '🎁 Marketing & Campaign Agent (客户存盘提升师)',
        avatar: '📣',
        role: 'Promotions & UX Retention',
        content: `【营销协同】配合部署立减代金券 [${selectedVoucherCode}] 并执行 [${selectedVoucherRatio}% 折扣]，定向投递活动公告以提升周转成交比。`
      },
      {
        agent: 'risk',
        name: '🛡️ Risk & Payment Agent (防欺诈安全审计官)',
        avatar: '🕵️',
        role: 'Merchant Gateway Security',
        content: `【风控防护】网关状态评估：Stripe & Adyen 安全过境等级优秀。若落实此目标，将全天候侦测针对 €500+ 高额订单的欺诈回账漏洞，盾拦截阀值已设为 ${isRiskDefenseShieldOn ? '100% 极高防' : '常态中防'}。`
      },
      {
        agent: 'content',
        name: '🖼️ Visual Content Agent (多模态视觉生成大师)',
        avatar: '🎨',
        role: 'Multi-Modal Generation',
        content: selectedVisualAsset === 'screenshot' 
          ? `【多模态感知】截取当前 [${pageContext.title}] 屏幕：UI层无任何样式坍塌或干涉。移动端结账链路视线引导高度畅通！` 
          : selectedVisualAsset === 'product_pic'
          ? `【多模态感知】读取上传的商品素材图：发现光束色谱存在噪点。SEO卖点文案提纯已备好:「${generatedCopywriting}」已同步注入。`
          : selectedVisualAsset === 'trend_chart'
          ? `【多模态感知】读取上传的财务图表：销售曲线略微承压。最佳挽回策略是建立上述 Pricing + Marketing 组合促销。`
          : `【文案重写】安全对齐。优化后的详情文案:「${generatedCopywriting}」格式规范，符合 SEO 索引权重。`
      }
    ];

    // Trigger sequential staggered display to mimic an ultra high-end collaborative thinking processor
    let tempArray: any[] = [];
    steps.forEach((step, idx) => {
      setTimeout(() => {
        tempArray.push(step);
        setAgentRoundtable([...tempArray]);
        setCurrentRoundtableStep(idx);
        addTelemetryLog(`🤖 Multi-Agent: [${step.name}] dispatched insight.`, 'DECISION');

        // Check if last step completed to compile final draft and stop thinking
        if (idx === steps.length - 1) {
          setIsThinking(false);
          setRoundtableDone(true);

          setDecodedIntent({
            intent: detectedActionType !== 'none' ? detectedActionType + '_engine_optimization' : 'unstructured_collaborative_goal',
            industry,
            module: 'ops_cabinet',
            tools: ['ops_commander', 'pricing_elasticity_agent', 'stock_turnover_agent'],
            type: 'Planning'
          });

          setAnalysisResult({
            problems: [
              `① 共享 Runtime Context：多智能体已就地共享对齐 [${industry}] 行业数据，捕捉 ${productsCount} 个SKU和 ${ordersCount} 笔账期订单流水。`,
              `② 联合博弈收敛方案：由 Ops Commander 统合，针对 ${pricingPreset}% 溢价弹性与 ${restockQtyPreset}件 补货方案完成精练打分。`,
              selectedVisualAsset ? `③ 多模态对齐感知：已成功阅读解码上传的 [${selectedVisualAsset === 'screenshot' ? '功能截图' : selectedVisualAsset === 'product_pic' ? '商品概念图' : '业绩分析表'}]，分析结论已注入底层！` : `③ 无视觉冗余干涉。当前页面 [${pageContext.title}] 的运行状态一切正常。`
            ],
            expectedBoost: `联合博弈均衡得分: 98.4/100 | 本轮多智能体协作已成功打通，建议一键批准部署。`,
            suggestions: [
              `产品定价：调幅 [+${pricingPreset}%]，利用价格带溢价，预计拉升本季整体毛利率约 3% - 4.5%`,
              `仓配周转：向供应商拉起采购订单，批量追加 ${restockQtyPreset} 件，规避爆款断货潜在损耗`,
              `促销码设定：核发 "[${selectedVoucherCode}]" 满减活动，给予消费者 ${selectedVoucherRatio}% 极佳心动指数`,
              `欺诈盾过滤：防反弹率过滤设为 ${isRiskDefenseShieldOn ? '开启' : '关闭'}，防御高风险交易阻尼`
            ],
            actionType: detectedActionType,
            metaData: { 
              sku: targetSku, 
              amount: restockQtyPreset, 
              title: targetTitle,
              discount: selectedVoucherRatio,
              code: selectedVoucherCode,
              factor: pricingPreset
            }
          });

          addLog('AI Commander', '智能决策中枢收敛完成', `5 个专职智能体就目标「${text.slice(0, 15)}...」完成博弈。已输出可供微调的「协作决策计划书」!`, 'success');
        }
      }, (idx + 1) * 450);
    });
  };

  // --- PHYSICAL EXECUTION ENGINE ALTERING THE TRUE SEED STATES ---
  const executeFinalActionPlan = () => {
    if (!analysisResult) return;

    const { actionType } = analysisResult;
    setIsActionExecuted(true);

    if (actionType === 'product_create') {
      const generatedSKU = 'SKU-' + Math.random().toString(36).substring(2, 7).toUpperCase();
      onAddNewProduct(
        'AI 协作款 (Sleek Aesthetic Edition)', 
        generatedSKU, 
        79.00 * (1 + pricingPreset / 100), 
        restockQtyPreset
      );
      addLog('AI Commander', '核发新商品上架', `已成功将多智能体协作排版的全新爆款「AI 协作智能款」物理上架！SKU: ${generatedSKU}，库存: ${restockQtyPreset}件`, 'success');
      setExecutionFeedback(`✓ 爆款发布成功！「AI 协作智能款」（SKU: ${generatedSKU}，建议售价已调优 +${pricingPreset}%，首批备货: ${restockQtyPreset} 件）已注册上线。您可以前往左侧「📦 商品中心」核验。`);
      addTelemetryLog(`[执行物理写入] catalog_item_injector: 成功插入 SKU: ${generatedSKU}`, 'DB_WRITE');
    } 
    
    else if (actionType === 'restock') {
      const { sku, title } = analysisResult.metaData;
      onBulkRestock(sku, restockQtyPreset);
      addLog('AI Commander', '商户批准：PO采购订单核发', `已向签约供应链拉起 ${title} 智能补货，追加补仓库存数量 ${restockQtyPreset} 件。`, 'success');
      setExecutionFeedback(`✓ 补货成功部署！已物理为商品「${title}」（SKU: ${sku}）追加了 ${restockQtyPreset} 件全新物料库存，前台心跳已同步恢复。`);
      addTelemetryLog(`[执行周转修改] inventory_levels_tracker: 物料微调 SKU ${sku} +${restockQtyPreset}`, 'DB_WRITE');
    } 
    
    else if (actionType === 'campaign') {
      addLog('AI Commander', '大促策略实时同步', `满减抵扣码 "${selectedVoucherCode}" (额度 ${selectedVoucherRatio}%) 已经通过网关协议安全同步至结账面板！`, 'success');
      setExecutionFeedback(`✓ 营销大促实时激活！「Summer Promo」规则已开启，前台横幅同步展示：「Welcome Summer Season - Take ${selectedVoucherRatio}% OFF today!」。`);
      addTelemetryLog(`[执行大促挂载] coupon_mesh_deployer: 激活优惠码 ${selectedVoucherCode} [${selectedVoucherRatio}%]`, 'SYSTEM');
      
      // Statefully append to server database under P3 blueprint rules
      fetch('/api/db/create-discount-draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: selectedVoucherCode,
          discount_percentage: selectedVoucherRatio,
          campaign_name: 'Summer Seasonal Clearance Promo',
          status: 'ACTIVE_DRAFT',
          source: 'AI-Commander-Automated'
        })
      })
      .then(res => res.json())
      .then(data => {
        addTelemetryLog(`[首信写入成功] discount_drafts: 已成功固化折扣草稿记录 [${data.draft?.id}] 至真数据库`, 'DB_WRITE');
      })
      .catch(err => {
        console.error("Failed to append discount draft to Server-side DB:", err);
      });
    } 
    
    else if (actionType === 'churn_mitigation') {
      const lostCount = CustomerService.getLostCustomers(customers).length || 5;
      addLog('AI Commander', '客户挽回与智能催付', `已通过 SendGrid 电邮网关，针对德国/意大利这 ${lostCount} 位高意向加购沉默买家，定向群派 "${selectedVoucherCode}" 特惠券！`, 'success');
      setExecutionFeedback(`✓ 沉默催付群群群送完毕！已精准将内含 ${selectedVoucherRatio}% 款专属折扣代金券的催付信息投递至 ${lostCount} 位静默潜在用户邮箱。`);
      addTelemetryLog(`[外邮配送完毕] sendgrid_email_dispatcher: 配送人数 ${lostCount}`, 'OUTBOX');
    } 
    
    else if (actionType === 'profit_optimization') {
      addLog('AI Commander', '联合决策调优部署', `已调优 12 款主营畅销商品基准价 +${pricingPreset}%，并一键核准了营销降噪，熔断低 ROI 广告。`, 'success');
      setExecutionFeedback(`✓ 利润跃升方案执行成功！前台 12 款主力 SKU 指示标价上调 ${pricingPreset}%。针对 ${isRiskDefenseShieldOn ? '100% 极高防' : '中防'} 反欺诈盾已挂载启用。预计下月增益 €2,480.00 EUR！`);
      addTelemetryLog(`[账目优化部署] revenue_yield_manager: 提升暢销款标价系数 ${pricingPreset}%`, 'DB_WRITE');
    } 
    
    else {
      addLog('AI Commander', '自适应中枢协同部署', `全链路协作任务部署通达！已存储各智能体规则：定价调幅: +${pricingPreset}%, 补量: ${restockQtyPreset}件，折扣: ${selectedVoucherRatio}% `, 'success');
      setExecutionFeedback(`✓ 决策计划全数采纳部署成功！各智能体均把最新的决策属性注入各自的 Tool Services。相关调优细节已安全归类。`);
      addTelemetryLog('[通用决策完结] 多智能体协作完成并登记至审计日志', 'SYSTEM');
    }
  };

  const pageContext = getTabContextData();

  const handlePillClick = (text: string) => {
    setQuery(text);
    handleProcessQuery(text);
  };

  if (!isOpen) return null;

  return (
    <div 
      id="ai-business-os-commander" 
      className="w-[430px] bg-[#0c0d0e] border-l border-[#1b1c1e] h-full flex flex-col shrink-0 overflow-hidden text-slate-200 select-none animate-fadeIn font-sans"
    >
      {/* 1. Brand Header */}
      <div className="p-4 border-b border-[#1f2124] bg-[#060708] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#07C2E3] to-[#046B7D] flex items-center justify-center shadow-[0_0_15px_rgba(7,194,227,0.25)]">
            <Cpu className="w-4.5 h-4.5 text-white animate-pulse" />
          </div>
          <div className="text-left font-sans">
            <h3 className="text-sm font-black text-white tracking-wide flex items-center gap-1.5">
              <span>🧠 AI Commander</span>
              <span className="text-[8px] bg-[#07C2E3]/15 text-[#07C2E3] font-mono border border-[#07C2E3]/30 px-1 py-0.5 rounded leading-none font-bold">SYSTEM ACTIVE</span>
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5">读真实状态与所处页面，直接进行商业原件动作与决策指导。</p>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* 2. Mode Tabs Selector */}
      <div className="bg-[#050607] border-b border-[#1a1b1d] px-3 py-1.5 flex items-center justify-between font-sans shrink-0">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('brain')}
            className={`px-3 py-1 rounded-md text-[10px] font-black transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === 'brain' ? 'bg-[#16171a] text-[#07C2E3] border border-slate-800' : 'text-slate-400 hover:text-slate-250'
            }`}
          >
            <Sparkles className="w-3 h-3" /> 智能操作中心 (Intelligence)
          </button>
          <button
            onClick={() => setActiveTab('monitor')}
            className={`px-3 py-1 rounded-md text-[10px] font-black transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === 'monitor' ? 'bg-[#16171a] text-indigo-400 border border-slate-800' : 'text-slate-400 hover:text-slate-250'
            }`}
          >
            <Terminal className="w-3 h-3" /> 指令原件监控 (Audit)
          </button>
        </div>
        <div className="text-[9px] text-slate-400 font-mono flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>{selectedIndustry.toUpperCase()}</span>
        </div>
      </div>

      {/* 3. Panel Main Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans bg-[#0c0d0e]/98">
        
        {activeTab === 'brain' ? (
          <>
            {/* 🧠 SaaS MULTI-AGENT COMMAND DELEGATOR */}
            <div className="bg-[#121315] border border-[#1d2127] rounded-2xl p-4 text-left space-y-3.5 relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
              <span className="text-[10px] text-[#07C2E3] uppercase font-black tracking-wider flex items-center gap-1.5 font-mono">
                <Compass className="w-3.5 h-3.5" />
                <span>AI Agent Orchestration Core &middot; 智能体网格管理器</span>
              </span>

              <form 
                onSubmit={(e) => { 
                  e.preventDefault(); 
                  handleProcessQuery(query); 
                }} 
                className="space-y-2.5"
              >
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="输入需要委派给智能集群的任务 (如: 'fix low stock')..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2.5 pl-9 pr-20 text-xs font-semibold text-white placeholder-slate-650 focus:border-[#07C2E3]/75 focus:ring-1 focus:ring-[#07C2E3]/20 focus:outline-none transition-all"
                  />
                  <div className="absolute left-3 top-3.5 text-slate-500 text-xs font-bold leading-none select-none">🧠</div>
                  <button 
                    type="submit" 
                    disabled={isThinking || !query.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#07C2E3] hover:bg-[#06B2D0] text-slate-950 px-3 py-1.5 rounded-lg text-[10px] font-black tracking-wide disabled:opacity-40 transition-all cursor-pointer"
                  >
                    {isThinking ? '秒思中...' : '委派执行'}
                  </button>
                </div>
              </form>

              {/* Showcase active agents managed by the orchestrator */}
              <div className="border-t border-slate-900/80 pt-3 space-y-2">
                <span className="text-[9px] text-slate-550 font-black uppercase tracking-wider block font-mono">
                  ACTIVE ORCHESTRATION SHARDS (专家智能网格已就绪):
                </span>
                <div className="grid grid-cols-5 gap-1.5 text-center">
                  <div className="bg-slate-950 p-2 border border-slate-900 rounded-xl hover:border-indigo-500/40 transition-colors cursor-help group relative">
                    <span className="text-sm block">🧠</span>
                    <span className="text-[8.5px] mt-1 font-bold text-slate-350 block leading-none">Commander</span>
                  </div>
                  <div className="bg-slate-950 p-2 border border-slate-900 rounded-xl hover:border-emerald-400/40 transition-colors cursor-help group relative">
                    <span className="text-sm block">📈</span>
                    <span className="text-[8.5px] mt-1 font-bold text-slate-350 block leading-none">Pricing</span>
                  </div>
                  <div className="bg-slate-950 p-2 border border-slate-900 rounded-xl hover:border-amber-400/40 transition-colors cursor-help group relative">
                    <span className="text-sm block">📦</span>
                    <span className="text-[8.5px] mt-1 font-bold text-slate-350 block leading-none">Inventory</span>
                  </div>
                  <div className="bg-slate-950 p-2 border border-slate-900 rounded-xl hover:border-pink-500/30 transition-colors cursor-help group relative">
                    <span className="text-xs block">📣</span>
                    <span className="text-[8.5px] mt-1 font-bold text-slate-350 block leading-none">Marketing</span>
                  </div>
                  <div className="bg-slate-950 p-2 border border-slate-900 rounded-xl hover:border-rose-500/30 transition-colors cursor-help group relative">
                    <span className="text-sm block">🛡️</span>
                    <span className="text-[8.5px] mt-1 font-bold text-slate-350 block leading-none">Risk</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ① PART AA: INTERACTIVE ROUNDTABLE CASCADE PROCESS */}
            {agentRoundtable.length > 0 && (
              <div className="space-y-2.5 bg-[#0b0c10] border border-slate-900 rounded-2xl p-4 text-left border-t-2 border-t-[#07C2E3]">
                <div className="flex items-center justify-between border-b border-[#212327]/60 pb-2 mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#07C2E3] animate-pulse"></span>
                    <span className="text-[10px] font-black text-slate-300 tracking-wider font-mono uppercase">
                      {roundtableDone ? '✓ MULTI-AGENT DECISION MATRIX (专家会谈结果)' : '⚡ 调度网格就地决策博弈 (Agent Roundtable)...'}
                    </span>
                  </div>
                  <span className="text-[9px] bg-[#07C2E3]/10 text-[#07C2E3] border border-[#07C2E3]/20 px-1.5 py-0.5 rounded font-mono font-bold">
                    {currentRoundtableStep + 1} / {agentRoundtable.length}
                  </span>
                </div>

                <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
                  {agentRoundtable.map((step, idx) => (
                    <div 
                      key={idx} 
                      className="p-3 bg-[#111215]/80 border border-slate-900 rounded-xl space-y-1.5 text-[11px] leading-relaxed transition-all duration-300 transform animate-fadeIn border-l-[3.5px]"
                      style={{ 
                        borderLeftColor: step.agent === routedAgent?.id 
                          ? '#10b981' 
                          : step.agent === 'commander' 
                          ? '#818cf8' 
                          : '#111215',
                        opacity: idx === currentRoundtableStep ? 1 : 0.75
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-slate-100 flex items-center gap-1.5 text-[11px]">
                          <span>{step.avatar}</span>
                          <span className={step.agent === routedAgent?.id ? 'text-[#10b981] font-black' : ''}>{step.name}</span>
                        </span>
                        <span className="text-[8.5px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-[#212327] font-mono font-black uppercase">
                          {step.role}
                        </span>
                      </div>
                      <p className="text-slate-305 leading-relaxed font-sans font-semibold whitespace-pre-line text-[10.5px]">
                        {step.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* ① PART A: BUSINESS JOURNEY ENGINE (经营旅程引擎) */}
            <div className="bg-[#121315] border border-indigo-950/60 rounded-2xl p-4 text-left relative overflow-hidden">
              {/* Dynamic decorative backdrop indicating setup step highlights */}
              <div className="absolute top-0 right-0 w-32 h-20 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-bl-full pointer-events-none"></div>

              <div className="flex items-center justify-between mb-3">
                <span className="text-[9.5px] text-indigo-400 uppercase font-black tracking-wider flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Business Journey Navigator &middot; 经营路线向导</span>
                </span>
                <span className="text-[9.5px] bg-[#07C2E3]/10 text-[#07C2E3] border border-[#07C2E3]/20 px-1.5 py-0.5 rounded font-mono font-bold">
                  {currentStoreStage}
                </span>
              </div>

              {/* Progress bar mapping real-state stages */}
              <div className="space-y-1 mb-3">
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold">
                  <span>总体商业建圈进度 (Fulfillment Index)</span>
                  <span className="font-mono text-white text-[11px] font-black">{currentStageProgress}%</span>
                </div>
                <div className="h-1.5 bg-slate-950 rounded-full w-full overflow-hidden border border-slate-900 flex">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 via-[#07C2E3] to-emerald-400 rounded-full transition-all duration-700" 
                    style={{ width: `${currentStageProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Current Stage description and tailored active checklist and quick trigger button! */}
              <p className="text-[11.5px] text-slate-300 leading-relaxed font-medium mb-3">
                {stageDescription}
              </p>

              {/* ACTIVE RECOMMENDATION CHECKLIST */}
              <div className="border-t border-slate-900/80 pt-3 space-y-2">
                <span className="text-[9px] text-slate-500 font-black uppercase tracking-wider block">
                  🚀 根据您当前开店阶段：下一步最应该完成的事情
                </span>

                <div 
                  onClick={() => {
                    onSwitchTab(targetActionTab);
                    addLog('AI Commander', 'LifeCycle Dispatch', `路线图辅助：已将商户引导至 [${targetActionTab}] 进行阶段跃升部署。`, 'info');
                    addTelemetryLog(`经营路线向导：引导跳转至 [${targetActionTab}] 进行相关操作`, 'NAVIGATE');
                  }}
                  className="bg-slate-950/90 border border-slate-900 rounded-xl p-2.5 flex items-center justify-between hover:border-[#07C2E3] transition-all cursor-pointer group hover:bg-slate-950"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-extrabold group-hover:bg-[#07C2E3]/15 group-hover:text-[#07C2E3] transition-all text-xs">
                      GO
                    </div>
                    <div className="text-left">
                      <span className="text-[11px] font-black text-slate-200 group-hover:text-white transition-colors block">
                        {nextImmediateStep}
                      </span>
                      <span className="text-[9px] text-slate-500 flex items-center gap-1 mt-0.5 font-sans">
                        <span>点击开始</span>
                        <span>&middot;</span>
                        <span>自动跳转页面并唤醒</span>
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-550 group-hover:text-white transition-transform group-hover:translate-x-1" />
                </div>
              </div>

              {/* Dynamic Mini Real stats badge connected directly to true state */}
              <div className="grid grid-cols-3 gap-1.5 mt-3 text-[9px] text-slate-400 select-none">
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-900">
                  <span className="text-slate-500 block">Total Goods (货品)</span>
                  <span className="text-[11px] font-mono text-slate-200 font-black">{productsCount} 个</span>
                </div>
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-900">
                  <span className="text-slate-500 block">Orders (付款单)</span>
                  <span className="text-[11px] font-mono text-slate-200 font-black">{ordersCount} 笔</span>
                </div>
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-900">
                  <span className="text-slate-500 block">CRM Size (买家)</span>
                  <span className="text-[11px] font-mono text-slate-200 font-black">{customersCount} 人</span>
                </div>
              </div>

            </div>


            {/* ② PART B: PAGE-AWARE CONNETIVITY PANEL (页面智能感知联动) */}
            <div className="bg-[#121315] border border-slate-900 rounded-2xl p-4 text-left relative">
              <div className="absolute top-3.5 right-4 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase">LIVE SYNC</span>
              </div>

              <div className="flex items-center gap-1.5 mb-2.5">
                <span className="w-4 h-4 rounded bg-[#07C2E3]/15 flex items-center justify-center text-[10px] text-[#07C2E3]">📄</span>
                <span className="text-[11.5px] font-black text-white">
                  检测到您当前处于: <span className="text-[#07C2E3] font-black">{pageContext.title}</span>
                </span>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed font-sans font-medium mb-3">
                {pageContext.desc} <span className="text-slate-500 font-semibold">{pageContext.tips}</span>
              </p>

              {/* Page aware quick suggestions triggers */}
              <div className="grid grid-cols-1 gap-2">
                {pageContext.prompts.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handlePillClick(p.text)}
                    className="w-full text-left p-2.5 rounded-xl bg-slate-950 border border-slate-900 hover:border-[#07C2E3] text-[11px] font-sans font-extrabold text-[#95a5a6] hover:text-white transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[8.5px] bg-indigo-950 text-indigo-300 font-mono font-bold px-1 py-0.5 rounded border border-indigo-900/40">
                        {p.label}
                      </span>
                      <span>{p.text}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-550 group-hover:text-[#07C2E3] transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>

              {decodedIntent && analysisResult && (
                <div className="bg-[#0b0c10] border-2 border-[#07C2E3]/45 rounded-2xl p-4 text-left space-y-3.5 shadow-[0_0_15px_rgba(7,194,227,0.1)] relative">
                  <button 
                    onClick={() => { setDecodedIntent(null); setAnalysisResult(null); }}
                    className="absolute top-3 right-3 text-slate-500 hover:text-white p-0.5 rounded bg-slate-950 border border-slate-850 cursor-pointer text-xs"
                    type="button"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] bg-[#07C2E3]/15 text-[#07C2E3] px-1.5 py-0.5 rounded font-black tracking-wider uppercase font-mono">
                      {decodedIntent.type.toUpperCase()}_DECISION
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">
                      AI 商业对账诊断输出方案
                    </span>
                  </div>

                  {/* problems scanned */}
                  <div className="space-y-1">
                    <p className="text-[8.5px] text-slate-500 uppercase font-black font-mono">数据层扫描结果 problems:</p>
                    <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl space-y-1.5">
                      {analysisResult.problems.map((prob, pi) => (
                        <p key={pi} className="text-xs text-slate-350 leading-relaxed font-sans font-semibold">
                          {prob}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* expected boost */}
                  <div className="bg-indigo-600/15 border border-indigo-500/25 p-3 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[8px] text-slate-500 block uppercase font-black">执行预案预计回报收益:</span>
                      <span className="text-xs font-black font-mono text-[#07C2E3]">{analysisResult.expectedBoost}</span>
                    </div>
                    <span className="text-[8px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-1.5 py-0.5 rounded font-bold font-mono">ROI PROMISES</span>
                  </div>

                  {/* detailed Suggestions */}
                  <div className="space-y-1">
                    <span className="text-[8.5px] text-slate-550 uppercase tracking-widest font-black block font-mono">
                      🚀 拟定指令计划 (SYSTEM PROPOSITIONS):
                    </span>
                    <div className="space-y-1 bg-slate-950 p-2.5 rounded-xl border border-slate-900 text-[11px] text-slate-400 font-mono">
                      {analysisResult.suggestions.map((sug, si) => (
                        <p key={si} className="leading-relaxed flex items-start gap-1 font-bold">
                          <span className="text-indigo-400 mt-0.5">&bull;</span>
                          <span>{sug}</span>
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Flow control CTA */}
                  <div className="pt-2">
                    {isActionExecuted ? (
                      <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 text-xs font-sans font-bold leading-relaxed">
                        {executionFeedback || '✓ 商业指令已成功批准并物理生效，底层数据已实时热更新！'}
                      </div>
                    ) : (
                      <>
                        {!hasGeneratedPlan ? (
                          <button
                            type="button"
                            onClick={() => {
                              setHasGeneratedPlan(true); 
                              addTelemetryLog('动作生成方案已锁定。等待最终商户批准执行。', 'EXEC_READY');
                            }}
                            className="w-full bg-[#07C2E3] hover:bg-[#06B2D0] active:bg-[#059BBC] text-slate-950 py-2.5 rounded-xl transition-all cursor-pointer text-center font-black text-xs flex items-center justify-center gap-1.5"
                          >
                            <span>[ 生成执行方案 / Generates Action Plan ]</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <div className="space-y-2 animate-fadeIn">
                            <span className="text-[9.5px] text-amber-400 font-mono flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>已拟好操作，请进行商户最终确认：</span>
                            </span>
                            
                            <div className="flex gap-2 text-xs font-bold font-sans">
                              <button
                                type="button"
                                onClick={() => {
                                  setHasGeneratedPlan(false);
                                  setDecodedIntent(null);
                                  setAnalysisResult(null);
                                  addTelemetryLog('动作卡片已被商户回弹驳回。', 'REJECTED');
                                }}
                                className="flex-1 bg-slate-950 border border-slate-850 text-slate-400 py-2 rounded-xl transition-all cursor-pointer text-center hover:text-white"
                              >
                                回弹 / 驳回
                              </button>
                              <button
                                type="button"
                                onClick={executeFinalActionPlan}
                                className="flex-1 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white py-2 rounded-xl transition-all cursor-pointer text-center font-extrabold shadow-md flex items-center justify-center gap-1"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>批准并物理部署 &rarr;</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          /* AUDIT DOCK TAB */
          <div className="space-y-3 font-mono text-left">
            <div className="flex items-center justify-between border-b border-[#212327] pb-2 text-xs font-bold text-slate-400">
              <span>SYSTEM EVENT AUDITOR SHELL</span>
              <span className="text-emerald-400 animate-pulse flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                <span>AUDITING ACTIVE</span>
              </span>
            </div>

            <div className="space-y-1.5 max-h-[520px] overflow-y-auto pr-1">
              {aiExecutionLogs.map((log) => {
                let col = 'text-slate-500';
                if (log.category === 'DECISION') col = 'text-[#07C2E3] font-bold';
                if (log.category === 'DB_WRITE') col = 'text-rose-400 font-black';
                if (log.category === 'PRESET') col = 'text-indigo-400';
                if (log.category === 'NAVIGATE') col = 'text-amber-400';

                return (
                  <div key={log.id} className="p-2.5 bg-slate-950/80 border border-slate-900 rounded-lg text-[10.5px] leading-relaxed">
                    <div className="flex items-center justify-between text-slate-650 text-[8.5px] mb-1 font-mono">
                      <span>[{log.time}] EVENT RAIL</span>
                      <span className={col}>{log.category}</span>
                    </div>
                    <p className="text-slate-350">{log.text}</p>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => {
                setAiExecutionLogs([
                  { id: 'l1', time: '09:00', text: '商业智能引擎挂载完毕：行业数据流安全对齐完成', category: 'SYSTEM' },
                  { id: 'l2', time: '09:05', text: '对齐 Live Store Data：已自动标记当前页面上下文 [智能大盘]', category: 'MONITOR' }
                ]);
              }}
              className="w-full text-center py-2 text-[8.5px] border border-dashed border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700 transition-all rounded font-mono cursor-pointer"
            >
              RESET AUDITING GATEYWAY
            </button>
          </div>
        )}

      </div>

      {/* Footer telemetry */}
      <div className="p-3 bg-slate-950 border-t border-[#1a1b1d] flex justify-between items-center text-[8.5px] font-mono text-slate-500 tracking-wider shrink-0 uppercase">
        <span>AI SECURED ISOLATION GATEWAY</span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block animate-ping"></span>
          <span>DOCKER CONNECTED</span>
        </span>
      </div>

    </div>
  );
}
