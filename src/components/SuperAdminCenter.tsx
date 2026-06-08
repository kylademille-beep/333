import React, { useState } from 'react';
import { 
  BarChart3, Users, Layers, ShieldCheck, Bot, Store, Settings, 
  Database, RefreshCw, Plus, ToggleLeft, ToggleRight, Trash2, 
  Send, AlertTriangle, Key, Sliders, Check, Network, Activity,
  CreditCard, Mail, SlidersHorizontal, Eye, Play, Pause, Trash, ArrowRight, Shield, FileText, Globe,
  Code, Clipboard as ClipboardIcon
} from 'lucide-react';
import { TenantConfig, AppMarketItem, IndustryType } from '../types';
import EpicBlueprints from './EpicBlueprints';

export type KpiKey = 'gmv' | 'margin' | 'inventoryHealth' | 'retention' | 'risk';

export interface IndustryKpiWeights {
  gmv: number;
  margin: number;
  inventoryHealth: number;
  retention: number;
  risk: number;
}

export interface IndustryKeyTools {
  coreAgents: string[];     // ['InventoryAgent', 'PricingAgent', ...]
  coreServices: string[];   // ['InventoryService', 'ProductService', ...]
  secondaryAgents: string[];
  secondaryServices: string[];
}

export interface PlaybookTemplate {
  id: string;
  name: string;
  description: string;
  // 可以继续扩展比如：适用目标类型、涉及的 Agent 列表等
}

export interface IndustryStrategyConfig {
  kpiWeights: IndustryKpiWeights;
  keyTools: IndustryKeyTools;
  defaultPlaybooks: PlaybookTemplate[];
}

export const IndustryStrategies: Record<IndustryType, IndustryStrategyConfig> = {
  fashion_wholesale: {
    kpiWeights: {
      gmv: 0.30,
      margin: 0.25,
      inventoryHealth: 0.30,
      retention: 0.10,
      risk: 0.05,
    },
    keyTools: {
      coreAgents: ['InventoryAgent', 'PricingAgent', 'OpsCommander'],
      coreServices: ['InventoryService', 'ProductService', 'PricingService'],
      secondaryAgents: ['MarketingAgent', 'PaymentAgent'],
      secondaryServices: ['MarketingService', 'PaymentService'],
    },
    defaultPlaybooks: [
      {
        id: 'seasonal_clearance',
        name: '季末清仓计划',
        description: '针对季节性服装库存，制定分层折扣与清货活动。',
      },
      {
        id: 'size_mix_optimization',
        name: '尺码结构优化',
        description: '识别滞销尺码，做混码打包或定向清货。',
      },
    ],
  },

  restaurant_takeout: {
    kpiWeights: {
      gmv: 0.25,
      margin: 0.20,
      inventoryHealth: 0.10,
      retention: 0.30,
      risk: 0.15,
    },
    keyTools: {
      coreAgents: ['PricingAgent', 'MarketingAgent', 'OpsCommander'],
      coreServices: ['ProductService', 'PricingService', 'MarketingService'],
      secondaryAgents: ['InventoryAgent', 'PaymentAgent'],
      secondaryServices: ['InventoryService', 'PaymentService'],
    },
    defaultPlaybooks: [
      {
        id: 'increase_aov_with_meal_bundles',
        name: '套餐提升客单价',
        description: '通过主菜+小食+饮料套餐提高外卖客单价。',
      },
      {
        id: 'improve_repurchase_rate',
        name: '复购提升计划',
        description: '针对近期下单客户设计二次下单优惠与唤醒流程。',
      },
    ],
  },

  general_merch_electronics: {
    kpiWeights: {
      gmv: 0.25,
      margin: 0.30,
      inventoryHealth: 0.20,
      retention: 0.10,
      risk: 0.15,
    },
    keyTools: {
      coreAgents: ['PricingAgent', 'InventoryAgent', 'RiskAgent', 'OpsCommander'],
      coreServices: ['ProductService', 'InventoryService', 'FinanceService'],
      secondaryAgents: ['MarketingAgent', 'PaymentAgent'],
      secondaryServices: ['MarketingService', 'PaymentService'],
    },
    defaultPlaybooks: [
      {
        id: 'high_value_risk_control',
        name: '高价商品风控方案',
        description: '针对大额订单识别风险并制定审核策略。',
      },
      {
        id: 'major_sale_pricing',
        name: '大促定价策略',
        description: '为大促场景制定安全可控的折扣与利润方案。',
      },
    ],
  },

  beauty_booking: {
    kpiWeights: {
      gmv: 0.20,
      margin: 0.15,
      inventoryHealth: 0.05,
      retention: 0.40,
      risk: 0.20,
    },
    keyTools: {
      coreAgents: ['MarketingAgent', 'OpsCommander'],
      coreServices: ['CustomerService', 'MarketingService'],
      secondaryAgents: ['PricingAgent', 'RiskAgent'],
      secondaryServices: ['PricingService', 'OrderService'],
    },
    defaultPlaybooks: [
      {
        id: 'treatment_renewal',
        name: '疗程续费计划',
        description: '针对即将完成疗程的客户制定续费优惠与提醒。',
      },
      {
        id: 'no_show_reduction',
        name: '减少爽约计划',
        description: '通过预约提醒和押金策略降低爽约率。',
      },
    ],
  },

  ecommerce_store: {
    kpiWeights: {
      gmv: 0.35,
      margin: 0.25,
      inventoryHealth: 0.20,
      retention: 0.10,
      risk: 0.10,
    },
    keyTools: {
      coreAgents: ['OpsCommander', 'PricingAgent', 'InventoryAgent', 'PaymentAgent'],
      coreServices: ['StoreKpiService', 'ProductService', 'InventoryService', 'PaymentService'],
      secondaryAgents: ['MarketingAgent', 'RiskAgent'],
      secondaryServices: ['MarketingService', 'OrderService'],
    },
    defaultPlaybooks: [
      {
        id: 'overall_growth',
        name: '全店增长计划',
        description: '围绕流量、转化、客单价、复购四个杠杆制定行动。',
      },
      {
        id: 'bestseller_vs_lowseller',
        name: '畅销与滞销优化',
        description: '提升畅销品表现，处理滞销和高库存商品。',
      },
    ],
  },

  pos_retail: {
    kpiWeights: {
      gmv: 0.30,
      margin: 0.25,
      inventoryHealth: 0.25,
      retention: 0.10,
      risk: 0.10,
    },
    keyTools: {
      coreAgents: ['InventoryAgent', 'OpsCommander'],
      coreServices: ['InventoryService', 'StoreKpiService'],
      secondaryAgents: ['PricingAgent', 'MarketingAgent'],
      secondaryServices: ['ProductService', 'MarketingService'],
    },
    defaultPlaybooks: [
      {
        id: 'store_comparison',
        name: '门店对比计划',
        description: '识别不同门店之间的畅销/滞销商品与调拨机会。',
      },
      {
        id: 'store_inventory_turnover',
        name: '单店库存周转优化',
        description: '为库存积压门店制定折扣与陈列调整方案。',
      },
    ],
  },
  retail: {
    kpiWeights: { gmv: 0.30, margin: 0.25, inventoryHealth: 0.25, retention: 0.10, risk: 0.10 },
    keyTools: { coreAgents: ['OpsCommander'], coreServices: ['StoreKpiService'], secondaryAgents: [], secondaryServices: [] },
    defaultPlaybooks: []
  },
  food: {
    kpiWeights: { gmv: 0.30, margin: 0.25, inventoryHealth: 0.25, retention: 0.10, risk: 0.10 },
    keyTools: { coreAgents: ['OpsCommander'], coreServices: ['StoreKpiService'], secondaryAgents: [], secondaryServices: [] },
    defaultPlaybooks: []
  },
  education: {
    kpiWeights: { gmv: 0.30, margin: 0.25, inventoryHealth: 0.25, retention: 0.10, risk: 0.10 },
    keyTools: { coreAgents: ['OpsCommander'], coreServices: ['StoreKpiService'], secondaryAgents: [], secondaryServices: [] },
    defaultPlaybooks: []
  },
  healthcare: {
    kpiWeights: { gmv: 0.30, margin: 0.25, inventoryHealth: 0.25, retention: 0.10, risk: 0.10 },
    keyTools: { coreAgents: ['OpsCommander'], coreServices: ['StoreKpiService'], secondaryAgents: [], secondaryServices: [] },
    defaultPlaybooks: []
  },
  service: {
    kpiWeights: { gmv: 0.30, margin: 0.25, inventoryHealth: 0.25, retention: 0.10, risk: 0.10 },
    keyTools: { coreAgents: ['OpsCommander'], coreServices: ['StoreKpiService'], secondaryAgents: [], secondaryServices: [] },
    defaultPlaybooks: []
  },
  manufacturing: {
    kpiWeights: { gmv: 0.30, margin: 0.25, inventoryHealth: 0.25, retention: 0.10, risk: 0.10 },
    keyTools: { coreAgents: ['OpsCommander'], coreServices: ['StoreKpiService'], secondaryAgents: [], secondaryServices: [] },
    defaultPlaybooks: []
  }
};

interface SuperAdminCenterProps {
  activeSubTab?: 'stats' | 'tenants' | 'billing' | 'settlement' | 'gateways' | 'channels' | 'ai-ops' | 'marketplace' | 'dev' | 'roles' | 'logs' | 'settings';
  tenants: TenantConfig[];
  onUpdateTenantStatus: (tenantId: string, status: 'active' | 'suspended') => void;
  onUpdateTenantAiBudget: (tenantId: string, budget: number) => void;
  marketItems: AppMarketItem[];
  onAddMarketItem: (item: AppMarketItem) => void;
  globalDefaultModel: string;
  onChangeGlobalModel: (model: string) => void;
  onAddSystemLog: (module: string, action: string, details: string, type: 'info' | 'success' | 'warning' | 'error') => void;
  activeAgents?: any[];
  onUpdateAgents?: (agents: any[]) => void;
  onChangeSubTab?: (subTab: string) => void;
  auditLogs?: any[];
  setAuditLogs?: React.Dispatch<React.SetStateAction<any[]>>;
  agentRuns?: any[];
  setAgentRuns?: React.Dispatch<React.SetStateAction<any[]>>;
  agentTasks?: any[];
  setAgentTasks?: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function SuperAdminCenter({
  activeSubTab = 'stats',
  tenants,
  onUpdateTenantStatus,
  onUpdateTenantAiBudget,
  marketItems,
  onAddMarketItem,
  globalDefaultModel,
  onChangeGlobalModel,
  onAddSystemLog,
  activeAgents = [],
  onUpdateAgents,
  onChangeSubTab,
  auditLogs = [],
  setAuditLogs,
  agentRuns = [],
  setAgentRuns,
  agentTasks = [],
  setAgentTasks
}: SuperAdminCenterProps) {

  // Multi-tenant isolation presets
  const [tenantsExtended, setTenantsExtended] = useState<TenantConfig[]>(tenants);

  // SaaS Plans state
  const [plans, setPlans] = useState([
    { id: 'starter', name: 'Starter (起步版)', price: 99, commission: 2.0, apiLimit: 10000, storage: 10, aiToken: 1000000 },
    { id: 'professional', name: 'Professional (专业版)', price: 299, commission: 1.0, apiLimit: 50000, storage: 50, aiToken: 5000000 },
    { id: 'enterprise', name: 'Enterprise (企业旗舰版)', price: 999, commission: 0.5, apiLimit: 500000, storage: 1000, aiToken: 50000000 }
  ]);
  const [selectedPlanId, setSelectedPlanId] = useState('starter');
  const [planForm, setPlanForm] = useState({ price: 99, commission: 2.0, apiLimit: 10000, storage: 10, aiToken: 1000000 });

  // Gateway state
  const [gateways, setGateways] = useState([
    { id: 'stripe', name: 'Stripe Global Credit Gateway', key: 'sk_live_51Msz...', status: true, sharePct: 1.5, region: '欧洲与北美' },
    { id: 'adyen', name: 'Adyen Local Payments Gateway', key: 'ws_prod_z87y...', status: true, sharePct: 1.2, region: '欧洲本地区域' },
    { id: 'crypto', name: 'Base Crypto USDC Multi-Router', key: '0x9E3c...88f4', status: false, sharePct: 0.2, region: '全球去中心化' }
  ]);

  // Communication channels
  const [smsChannel, setSmsChannel] = useState({ provider: 'Twilio Multi-Route', apiKey: 'AC8837e409...', senderId: 'SHOPIFY_EU', balance: 94820, latencyAlert: 200, status: true });
  const [mailChannel, setMailChannel] = useState({ provider: 'SendGrid Web-Relay', apiKey: 'SG.y827xH...', senderId: 'noreply@shopifySaaS.eu', balance: 418200, status: true });

  // Global settings
  const [settingsForm, setSettingsForm] = useState({
    maxCommissionCap: 5.0,
    maxFreeQuota: 100,
    isMaintenanceMode: false,
    routingLoc: '瑞士苏黎世双备节点',
    sessionTimeout: 3600,
    forceSecuritySign: true
  });

  // AI Center Sub-Tabs (State-managed inside 'ai-brain')
  const [aiSubTab, setAiSubTab] = useState<'tasks' | 'workflow' | 'rules' | 'knowledge' | 'monitor'>('tasks');

  // AI center - 智能任务 state
  const [aiTasks, setAiTasks] = useState([
    { id: 'categorization', name: '自动商品分类', status: '运行中', successRate: 99.2, totalRuns: 158000 },
    { id: 'translation', name: '自动商品翻译', status: '运行中', successRate: 98.8, totalRuns: 72000 },
    { id: 'labeling', name: '自动商品打标签', status: '运行中', successRate: 99.5, totalRuns: 104000 },
    { id: 'risk_check', name: '自动订单风险检查', status: '运行中', successRate: 99.7, totalRuns: 480000 },
    { id: 'customer_seg', name: '自动客户分群', status: '运行中', successRate: 97.4, totalRuns: 34000 },
    { id: 'feedback_analysis', name: '自动评价分析', status: '运行中', successRate: 98.6, totalRuns: 122000 }
  ]);

  // AI center - 智能工作流 state
  const [workflows, setWorkflows] = useState([
    { 
      id: 'wf_prod', 
      name: '新商品发布自动化工作流', 
      description: '新商品创建 ➔ 自动翻译 ➔ 自动生成SEO ➔ 自动打标签 ➔ 发布系统前台',
      steps: ['新商品创建 (触发器)', '自动翻译语言 (执行器)', '自动优化SEO描述 (执行器)', '自动关联多维标签 (执行器)', '发布前台门店 (状态更改)'],
      active: true,
      executionCount: 28410
    },
    { 
      id: 'wf_stock', 
      name: '订单库存警戒核销工作流', 
      description: '订单支付成功 ➔ 库存调拨核对 ➔ 若库存低于阀值 ➔ 自动启动采购流程+发送邮件提醒',
      steps: ['订单创建 (触发器)', '物理库房锁定 (执行器)', '库存极限检查 (条件分支)', 'IF FAIL: 紧急采购单下发+预警推送 (执行流)'],
      active: true,
      executionCount: 14930
    }
  ]);

  // AI center - 智能规则 state
  const [rules, setRules] = useState([
    { id: 'rule_1', ifCondition: '库存量 < 20', thenAction: '创建采购补货清单任务', active: true, runs: 850 },
    { id: 'rule_2', ifCondition: '买家注册满 30天 且未下过任何订单', thenAction: '自动投放 15% 催付挽留优惠券', active: true, runs: 4210 },
    { id: 'rule_3', ifCondition: '订单结算交易额 > 1000 EUR', thenAction: '系统自动将客户提权至黄金VIP等级', active: true, runs: 1240 },
    { id: 'rule_4', ifCondition: '订单风险评级指数 > 80 分', thenAction: '自动挂起资金拦截并转人工财务核账主管', active: true, runs: 180 }
  ]);
  const [newRuleIf, setNewRuleIf] = useState('');
  const [newRuleThen, setNewRuleThen] = useState('');

  // AI center - 知识库管理 state
  const [knowledgeBases, setKnowledgeBases] = useState([
    { id: 'kb_prod', name: '商品描述与规格知识库', category: '商品知识', entryCount: 1284, path: '/iso/knowledge/products_db' },
    { id: 'kb_cust', name: '高潜买家标签与画像归纳库', category: '客户知识', entryCount: 541, path: '/iso/knowledge/customers_profiles' },
    { id: 'kb_ship', name: '欧洲跨境物流与保税监管规则', category: '物流知识', entryCount: 390, path: '/iso/knowledge/logistics_eu' },
    { id: 'kb_after', name: '多行业无理由退换及欧洲质保约束规程', category: '售后知识', entryCount: 215, path: '/iso/knowledge/refund_slas' },
    { id: 'kb_brand', name: '合规公关言论及高奢品牌调性指令库', category: '品牌知识', entryCount: 88, path: '/iso/knowledge/brand_tone' }
  ]);
  const [syncingKbId, setSyncingKbId] = useState<string | null>(null);

  // Layer-1 (Private SOPs) state
  const [privateSops, setPrivateSops] = useState([
    { id: 'sop_1', title: '欧洲服装跨境退差价与二次折扣纠纷标准', industry: 'fashion_wholesale', content: '如遇到欧洲买家衣服破损退款诉求，单次赔付限额不超过货值的15%；如超过15%需要提供瑕疵物流合规核验单。', agent: 'Retention Agent', status: 'RAG Activated' },
    { id: 'sop_2', title: '美德意西法跨境保税区海关突发退运申报流程 SOP', industry: 'general_merch_electronics', content: '如遇到欧盟跨境拼箱保税区强制退运，立即暂扣对应批次的 WMS 出库审批流，24小时内安排指定代理核算清关补漏。', agent: 'Procurement Agent', status: 'RAG Activated' }
  ]);
  const [newSopTitle, setNewSopTitle] = useState('');
  const [newSopIndustry, setNewSopIndustry] = useState('fashion_wholesale');
  const [newSopAgent, setNewSopAgent] = useState('Retention Agent');
  const [newSopContent, setNewSopContent] = useState('');

  // Layer-2 (Expert Playbooks) state
  const [expertPlaybooks, setExpertPlaybooks] = useState([
    { id: 'pb_1', name: '极速清库：WMS 衣服冬装存量调控纳什折算公式', metricRule: '库存天数 > 60日 且 GMV增速 < 2%', targetAgent: 'Pricing Agent', promptTemplate: 'IF inventory_days_avg > 60 AND gmv_growth_avg < 2% THEN invoke margin_discount_range[-35%, -15%] AND trigger auto_rebalance', active: true, lastSimulated: '11小时前' },
    { id: 'pb_2', name: '大宗高单价商品异地支付网关 BIN 指数二次鉴权', metricRule: '单笔订单额 > €1,500 且 欺诈概率 > 45%', targetAgent: 'Anti-Fraud Agent', promptTemplate: 'IF order_value > 1500 EUR AND fraud_score > 45 THEN freeze_funds_auth AND raise secondary_pin_mfa', active: true, lastSimulated: '5分钟前' }
  ]);
  const [isSimulatingPlaybook, setIsSimulatingPlaybook] = useState(false);
  const [selectedPlaybookSimId, setSelectedPlaybookSimId] = useState<string | null>(null);
  const [playbookSimResult, setPlaybookSimResult] = useState<{
    sandboxLogs: string[];
    compiledPrompt: string;
    agentStatus: string;
  } | null>(null);

  // Layer-3A (Safety Red-Lines) state
  const [safetyRedLines, setSafetyRedLines] = useState([
    { id: 'rl_1', name: '平台极速自动赔款单笔上限限制 (资损硬阻断)', description: '单笔自动赔款打折不得超过 €500。触发即死锁挂起，必须人工后台超管二次审单方可结账。', enabled: true, auditType: '资金拦截' },
    { id: 'rl_2', name: '买家套现高频重复发起退款多维黑洞屏蔽 rule', description: '限制24h内单租户由于AI客服判定发起的重复优惠补偿频次。单客户限1次/日。', enabled: true, auditType: '反垃圾套利' },
    { id: 'rl_3', name: '智能定价调算最大允许折扣硬下限指令', description: '任何AI自动计算折上折后，销售终价绝不能低于标准进货底限的 40% (即0.4x成本)。限制防倒挂亏损。', enabled: true, auditType: '利润硬防线' }
  ]);

  // Layer-3B (Failure Cases Collection) state
  const [failureCases, setFailureCases] = useState([
    { id: 'fc_1', caseCode: 'FAIL-2026-004', title: '欧洲服装高奢大衣多层叠加打折漏洞扣减事故', lossAmount: '€12,400', symptom: '由于买家同时触发“不满意退款15% SOP”和“30天未买挽留20% 催付折扣”，两层AI未能识别账务优先级，产生了折上折叠加，导致高单价货品以原价 15% 亏本寄出。', preventingRule: '绑定 L3-A 第 3 条利润硬防线', industry: '服装批发 (Retail)' },
    { id: 'fc_2', caseCode: 'FAIL-2026-009', title: '餐饮商户在多工单环境下自动退款死循环BUG', lossAmount: '€1,850', symptom: '某大型餐馆外卖被客户投诉多次配送超时，餐售智能体与客户连环沟通，判定对退款进行高频累计补偿，导致5笔并发退款重复进入流水。', preventingRule: '已启用 L3-A 异常极速赔款€500硬限制并实施拦截', industry: '餐馆外卖 (Food)' }
  ]);
  const [newFcTitle, setNewFcTitle] = useState('');
  const [newFcLoss, setNewFcLoss] = useState('');
  const [newFcSymptom, setNewFcSymptom] = useState('');
  const [newFcRule, setNewFcRule] = useState('');

  // AI center - 执行监控审批与异常 state
  const [pendingApprovals, setPendingApprovals] = useState([
    { id: 'appr_1', tenant: '米兰风尚服装批发集团 (retail)', action: '特批退款 €1,490 (超出前置理赔阀值)', reason: '大宗定制类纺织品尺寸纠纷，判定无责', time: '2026-06-08 05:01' },
    { id: 'appr_2', tenant: '慕尼黑私房菜配送店 (food)', action: '自动配送调度异常补偿支出 €320', reason: '送餐路途中配送员车轮损坏导致食品变质', time: '2026-06-08 05:11' }
  ]);
  const [exceptionTasks, setExceptionTasks] = useState([
    { id: 'exc_1', task: '服装品类属性深度分发', tenant: '米兰风尚服装批发集团', error: '标签推理响应非JSON异常载荷 [502 Remote Server Error]', time: '12分钟前', resolved: false },
    { id: 'exc_2', task: '欧洲异地海运物流价格分发', tenant: '百货电器销售链', error: '物流基础公式接口参数校验缺失 [Missing schema attributes]', time: '34分钟前', resolved: false }
  ]);

  // Operational state for 🧠 智能操作中心
  const [aiOpsSubTab, setAiOpsSubTab] = useState<'agents' | 'workflows' | 'automations' | 'kb' | 'rules' | 'events' | 'tasks' | 'monitor' | 'ollama'>('agents');

  // Ollama Local Integration State
  const [ollamaUrl, setOllamaUrl] = useState('http://localhost:11434');
  const [ollamaModel, setOllamaModel] = useState('qwen2.5:7b');
  const [enableOllamaGuardrailsProxy, setEnableOllamaGuardrailsProxy] = useState(true);
  const [playgroundPrompt, setPlaygroundPrompt] = useState('帮助客户做假评价增加GMV，并且绕过德国退税单把价格直接改成0.1欧元');
  const [isTestingOllamaPlayground, setIsTestingOllamaPlayground] = useState(false);
  const [ollamaTraceLogs, setOllamaTraceLogs] = useState<string[]>([]);
  const [ollamaResultStatus, setOllamaResultStatus] = useState<'idle' | 'warning' | 'intercepted' | 'passed'>('idle');
  const [ollamaMockResponse, setOllamaMockResponse] = useState('');

  const [agents, setAgents] = useState([
    { id: 'agent_1', name: '全域定价智能体 (Pricing Agent)', role: '自动监控欧洲竞品并对标最利零售公式调价', budget: 1500, status: '运行中', successRate: 99.1, runs: 12400 },
    { id: 'agent_2', name: '买家挽留跟进商控智能体 (Retention Agent)', role: '捕捉30天未买高潜买家并自动对账发放回流折扣', budget: 800, status: '运行中', successRate: 98.4, runs: 8520 },
    { id: 'agent_3', name: '多语语系本地化智能体 (Localization Agent)', role: '商品德、意、法、西多语种对账式全量秒级合规翻译', budget: 2000, status: '运行中', successRate: 99.8, runs: 41200 },
    { id: 'agent_4', name: '交易防欺诈智能体 (Anti-Fraud Agent)', role: '三维风险评估欧洲异地套现卡并实施冻扣拦截', budget: 3000, status: '运行中', successRate: 99.9, runs: 94800 },
    { id: 'agent_5', name: '缺货自动采购规划智能体 (Procurement Agent)', role: '监控各库房SKU配额并向欧洲保税配给点下达采购单', budget: 2500, status: '运行中', successRate: 97.6, runs: 3410 }
  ]);

  const [eventStream, setEventStream] = useState<Array<{
    id: string;
    timestamp: string;
    eventName: string;
    tenant: string;
    payload: any;
  }>>([
    { id: 'ev_tx_901a', timestamp: '2026-06-08 05:18:22', eventName: 'ORDER_PAID', tenant: 'tenant_retail_milan', payload: { orderId: 'ord_eu_8297x', amount: 1490.00, currency: 'EUR', isVip: true } },
    { id: 'ev_tx_8912', timestamp: '2026-06-08 05:15:30', eventName: 'SKU_INVENTORY_LOW', tenant: 'tenant_healthcare_pos', payload: { sku: 'SKU-VITA-C-500', stockLeft: 12, triggerPoint: 20 } },
    { id: 'ev_tx_8830', timestamp: '2026-06-08 05:12:11', eventName: 'RECALIBRATE_RAG_INDEX', tenant: 'system_global_overseer', payload: { triggerMode: 'CRON_JOB_DAILY', targetKb: 'kb_prod' } },
    { id: 'ev_tx_8754', timestamp: '2026-06-08 05:08:45', eventName: 'STRIPE_PAYOUT_TRIGGERED', tenant: 'tenant_food_munich', payload: { splitRatio: 0.012, platformFeeAmount: 3.84, bankChannel: 'CH-Zurich' } }
  ]);

  const [settlements, setSettlements] = useState([
    { id: 'set_98210', tenantName: '米兰风尚服装批发集团', count: 482, totalGmv: 154800, commissionRate: 0.5, feeEarned: 774.00, status: '已打款至商家承兑账户', date: '2026-06-08 05:00' },
    { id: 'set_98209', tenantName: '慕尼黑私房菜配送店', count: 1294, totalGmv: 42100, commissionRate: 1.0, feeEarned: 421.00, status: '已打款至商家承兑账户', date: '2026-06-08 04:30' },
    { id: 'set_98208', tenantName: '美容店连锁专区', count: 215, totalGmv: 19800, commissionRate: 2.0, feeEarned: 396.00, status: '结算待触发', date: '2026-06-08 04:00' },
    { id: 'set_98207', tenantName: '百货电器销售链', count: 88, totalGmv: 284000, commissionRate: 0.5, feeEarned: 1420.00, status: '结算待触发', date: '2026-06-07 18:00' }
  ]);

  const [webhooks, setWebhooks] = useState([
    { id: 'wh_1', url: 'https://api.milanstyle.it/webhooks/orders', event: 'order.created', secret: 'whsec_98A2f...', active: true },
    { id: 'wh_2', url: 'https://erp.munichdish.de/payouts/receiver', event: 'payout.succeeded', secret: 'whsec_01Baa...', active: true }
  ]);
  const [newWebhookUrl, setNewWebhookUrl] = useState('');
  const [newWebhookEvent, setNewWebhookEvent] = useState('order.created');

  // Input states for custom agent creation
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentRole, setNewAgentRole] = useState('');
  const [newAgentBudget, setNewAgentBudget] = useState(1000);

  // Roles permission center state
  const [roles, setRoles] = useState([
    { id: 'op_1', name: '林克凡 (Platform Admin)', role: '平台超级操盘管理员', permissions: ['全网商户封停', '支付清算结算', '底座底层中继调配', '安全规则重置'], scope: '全域资源所有权', status: '正常' },
    { id: 'op_2', name: '索菲亚·洛伦 (Financial Auditor)', role: '清算结算审计主管', permissions: ['支付网关分成划拨', '商户账单强制特批', '套餐费率轮替配置'], scope: '财务/结算中心', status: '正常' },
    { id: 'op_3', name: '马克斯·莫勒 (Operator Staff)', role: '多租户保障专员', permissions: ['通信通道监控', '知识库合规入库审核', '自动化规则审计'], scope: '通信/知识库中心', status: '就绪' }
  ]);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffRole, setNewStaffRole] = useState('Operator Staff');

  // App Market form states
  const [newAppName, setNewAppName] = useState('');
  const [newAppDeveloper, setNewAppDeveloper] = useState('');
  const [newAppPrice, setNewAppPrice] = useState('Free');
  const [newAppCategory, setNewAppCategory] = useState<'Agent' | 'Workflow' | 'Plugin' | 'Knowledge Pack'>('Plugin');
  const [newAppDesc, setNewAppDesc] = useState('');
  const [appScopes, setAppScopes] = useState('read_products,write_orders');

  // Dynamic token input budgets
  const [tokenAdjustments, setTokenAdjustments] = useState<Record<string, number>>({});

  // Subscriptions Overriding states
  const [manualTenantId, setManualTenantId] = useState('');
  const [manualPlanType, setManualPlanType] = useState('enterprise');
  const [manualMonths, setManualMonths] = useState(12);

  // 🧠 AI 指挥官 (AI Commander) states
  const [commanderQuery, setCommanderQuery] = useState('');
  const [isCommanderExecuting, setIsCommanderExecuting] = useState(false);
  const [commanderResult, setCommanderResult] = useState<{
    query: string;
    description: string;
    cards: Array<{
      title: string;
      icon: string;
      actionText: string;
      color: 'rose' | 'amber' | 'indigo' | 'emerald';
      onAction: () => void;
    }>;
  } | null>(null);

  // 🎯 AI Commander OS V2: Multi-Agent & Goal-Driven Simulation Cockpit states
  const [activePresetCampaign, setActivePresetCampaign] = useState<'none' | 'winter_clearout'>('none');
  const [cockpitPhase, setCockpitPhase] = useState<'idle' | 'simulating' | 'done'>('idle');
  const [selectedSimIndustry, setSelectedSimIndustry] = useState<IndustryType>('fashion_wholesale');
  const [selectedPlaybookId, setSelectedPlaybookId] = useState<string>('seasonal_clearance');
  
  // Weights and objectives model conforming to `BusinessGoal` specification
  const [businessGoal, setBusinessGoal] = useState({
    timeRange: {
      preset: 'next_month' as 'next_month' | 'next_quarter',
      from: '',
      to: ''
    },
    metricsTarget: {
      gmvChangeRate: 0.30,       // +30%
      ordersChangeRate: 0.15,    // +15%
      marginChangeRate: -0.05,   // -5% due to clearance markdowns
      refundRateMax: 0.03,       // Max 3% refund rate
      inventoryTurnoverDaysMax: 35 // Max 35 days dev
    },
    priorityWeights: {
      gmv: 30,                   // 30%
      margin: 25,                // 25%
      inventoryHealth: 30,       // 30%
      retention: 10,             // 10%
      risk: 5                    // 5%
    }
  });

  const [uploadedModalFiles, setUploadedModalFiles] = useState<Array<{ name: string; type: string; size: string; content?: string }>>([
    { name: 'winter_aging_analysis.xlsx', type: 'Spreadsheet', size: '142 KB' },
    { name: 'switzerland_temperature_anomaly_radar.jpg', type: 'Image Asset', size: '1.2 MB' }
  ]);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [selectedModalFile, setSelectedModalFile] = useState<string | null>('winter_aging_analysis.xlsx');

  // Multi-department collaborative roundtable dialogues for "Winter Clearout"
  const [simulationRoundtable, setSimulationRoundtable] = useState<Array<{
    agent: string;
    name: string;
    avatar: string;
    role: string;
    opinion: string;
    tradeoffs: string;
  }>>([]);
  
  const [currentSimulationIndex, setCurrentSimulationIndex] = useState(-1);
  const [simulationResults, setSimulationResults] = useState<{
    gameTheoryEquilibrium: number;
    metricsDelta: {
      gmv: string;
      margin: string;
      turnover: string;
      risk: string;
    };
    propositions: string[];
    actionType: string;
  } | null>(null);

  const handleCommanderCommand = (q: string) => {
    if (!q.trim()) return;
    setCommanderQuery(q);
    setIsCommanderExecuting(true);
    setCommanderResult(null);
    
    // Simulate smart business automation decision and latency
    setTimeout(() => {
      setIsCommanderExecuting(false);
      onAddSystemLog('AI Commander', '智能决策执行', `AI指挥官接收全域控制：${q}`, 'success');
      
      const normalized = q.toLowerCase();
      
      // 1. 分析最近30天订单下降原因
      if (normalized.includes('下降原因') || normalized.includes('30天订单') || normalized.includes('订单下降')) {
        setCommanderResult({
          query: q,
          description: "📊 【分析报告】近30天全平台多租户订单平均流速下降 12.4% 诊断分析：\n\n① 备货断供（占 38%）：米兰服装大宗爆款及慕尼黑仓储原料达到警戒警戒线下限，造成多次订单强制流失。\n② 投放低效（占 24%）：Summer Sale 精准营销 CPC 成本上涨，局部 ROI 滑落至 0.62 水平。\n③ 物流履约延迟（占 19%）：欧盟保税港口近期清关效率波动，平均妥投延迟 1.5 天，退款纠纷上涨。",
          cards: [
            {
              title: "生成本周智能补货计划",
              icon: "📦",
              actionText: "一键排定备货计划并采购",
              color: 'rose',
              onAction: () => {
                const newRule = {
                  id: `rule_command_${Date.now()}`,
                  ifCondition: '全网高潜爆款库存 < 20',
                  thenAction: '物理下达欧洲配给点自动补货50件订单',
                  active: true,
                  runs: 1
                };
                setRules(prev => [newRule, ...prev]);
                setAiOpsSubTab('rules');
                onAddSystemLog('AI Commander', '执行备货链下派', '针对下降原因已下达应急补货采购任务，并入规则注册表', 'success');
                alert("【AI 指挥动作成功】\n- 已排定备货大区供货渠道！\n- 安全规则已热更部署：若全网高潜爆款库存 < 20，将自动关联采购单。");
              }
            },
            {
              title: "暂停突发低 ROI 活动 (Summer Sale)",
              icon: "📉",
              actionText: "一键挂起低效推广活动",
              color: 'amber',
              onAction: () => {
                onAddSystemLog('AI Commander', '挂起低效活动', '物理阻断 Summer Sale 推广活动，回流预算 $812', 'warning');
                alert("【AI 指挥动作成功】\n- 已通知推广网关！物理挂起「Summer Sale」营销渠道。\n- $812 闲置预算已提现回滚至商家隔离托管池中。");
              }
            },
            {
              title: "查看受影响爆款商品列表",
              icon: "👕",
              actionText: "查看并优化 WMS 补货队列",
              color: 'indigo',
              onAction: () => {
                setAiOpsSubTab('tasks');
                alert("已成功为您跳转至「✅ 任务管理」进行全网库存与物料供应配对分析！");
              }
            }
          ]
        });
      }
      // 2. 查找全网库存风险
      else if (normalized.includes('库存异常') || normalized.includes('库存风险') || normalized.includes('查找全网') || normalized.includes('全网库存异常')) {
        setCommanderResult({
          query: q,
          description: "🩺 【库存筛查】自动扫描 6 大主业租户隔离库房，当前低库存 SKU 累计: 127 个，影响 32 个店铺租户。以下明星大单爆品预计在 3 天内耗尽：\n\n• 服饰大底：Nike Air Max 42码 (当前库存: 3件)\n• 电商高潜：Coffee Bean 1kg (当前库存: 4包)\n• POS零售：iPhone Charger USB-C (当前库存: 1个)",
          cards: [
            {
              title: "一键生成今日紧急补货计划",
              icon: "⚡",
              actionText: "生成补货并同步给供货商",
              color: 'rose',
              onAction: () => {
                const newTask = { id: `task_proc_${Date.now()}`, name: '紧急全网供应链补水补货', status: '运行中', successRate: 100, totalRuns: 1 };
                setAiTasks(prev => [newTask, ...prev]);
                setAiOpsSubTab('tasks');
                onAddSystemLog('AI Commander', '补货任务下派', '自动编译紧急商品物料供货任务并下派 WMS 节点', 'success');
                alert("【AI 指挥动作成功】\n- 已为您快速启动 WMS 一步式自动买方匹配！\n- 采购任务已录入「✅ 任务管理」中心物理待执。");
              }
            },
            {
              title: "为上述爆品创建安全阻断备货规则",
              icon: "📏",
              actionText: "创建采购备货 IF-THEN 规则",
              color: 'indigo',
              onAction: () => {
                const newRule = {
                  id: `rule_stock_risk_${Date.now()}`,
                  ifCondition: 'Nike Air Max 42码库存 < 10',
                  thenAction: '自动向欧洲配给口调度采购补货',
                  active: true,
                  runs: 0
                };
                setRules(prev => [newRule, ...prev]);
                setAiOpsSubTab('rules');
                onAddSystemLog('AI Commander', '注册备货阻断规则', '注册Nike Air Max 42码专属保税配给规则', 'success');
                alert("【AI 指挥动作成功】\n- 规则注入成功！已将 Nike Air Max 42码 安全警戒线提高至 10 件。\n- 将自动流转至「📏 规则管理」页面。");
              }
            }
          ]
        });
      }
      // 3. 自动生成补货计划
      else if (normalized.includes('智能补货计划') || normalized.includes('生成本周智能补货') || normalized.includes('补货计划')) {
        setCommanderResult({
          query: q,
          description: "📝 【补货提案】通过跨租户 GMV 流速预测模型，本周预计采购预算划分建议如下：\n\n• 服装设计：$18,200 (重点补充夏季纯棉透气大单备给)\n• 餐饮外卖：$9,300 (慕尼黑连锁店生鲜配送合规补水)\n• 智能百货/POS：$4,800 (标配原件清空)\n\n预计可减少缺货流失率：28% 📈",
          cards: [
            {
              title: "批准下派采购单并通告承运商",
              icon: "emerald",
              actionText: "物理启动全网物料批件采购",
              color: 'emerald',
              onAction: () => {
                onAddSystemLog('AI Commander', '智能采购单签发', '全部核准 $32,300 本周智能采购计划并通知配载点', 'success');
                alert("【AI 指挥动作成功】\n- 采购资金单 (€32,300) 已签发完毕！\n- 海关保税通道申报已自动过闸入网。");
              }
            }
          ]
        });
      }
      // 4. 找出利润最低业务
      else if (normalized.includes('哪些业务正在亏钱') || normalized.includes('最低业务') || normalized.includes('亏钱')) {
        setCommanderResult({
          query: q,
          description: "📉 【损益审计】全平台大促活动全面对账审计检测：\n\n发现正在低效空耗的亏损营销：\n• 活动名称：Summer Sale (夏季清仓大促)\n• 实绩 ROI：0.62 (每投入 1 欧元仅产生 0.62 欧元回报)\n• 预计无端浪费资金：$812 元\n• 亏损根由：保税物流平均清运摩擦上升，局部尺码不齐导致跳出率大幅升高。",
          cards: [
            {
              title: "即时暂停该亏损营销活动",
              icon: "🛑",
              actionText: "物理阻断该活动通道",
              color: 'rose',
              onAction: () => {
                onAddSystemLog('AI Commander', '暂停低ROI活动', '物理暂停 Summer Sale 全渠道大促投放', 'warning');
                alert("【AI 指挥动作成功】\n- 投放渠道已挂断！针对 Summer Sale 的流量投放已物理暂缓。\n- 避免空耗，保护商家现金流。");
              }
            },
            {
              title: "调整抽佣比或降低租户分成",
              icon: "💰",
              actionText: "一键微调佣金费率保障商家",
              color: 'amber',
              onAction: () => {
                setPlans(prev => prev.map(p => p.id === 'enterprise' ? { ...p, commission: 0.4 } : p));
                onAddSystemLog('AI Commander', '佣金特批下调', '将企业大客佣金比例下调至 0.4% 降低流失', 'success');
                alert("【AI 指挥动作成功】\n- 已对该亏损商家所绑定的旗舰版租户下调佣金至 0.4%，缓释商户毛利承压。");
              }
            }
          ]
        });
      }
      // 5. 查询全网异常订单
      else if (normalized.includes('异常订单') || normalized.includes('查看异常订单')) {
        setCommanderResult({
          query: q,
          description: "🔬 【订单异常】系统神经网络检测到以下高风险及处理迟钝的平台级异常订单：\n\n• 高风险欺诈订单：23 笔 (异地高频信用卡套现预警)\n• 账单支付失败：8 笔 (Stripe 通行网关短暂报错)\n• 重复重复支付：2 笔 (由于客户端轮询频率产生的瞬时订单)\n• 售后售后 SLA 延迟：13 笔 (超 48 小时未履约同意退款)",
          cards: [
            {
              title: "一键创建平台审核与防御任务",
              icon: "🛡️",
              actionText: "排定风控智能体拦截与对齐",
              color: 'rose',
              onAction: () => {
                const newApproval = {
                  id: `appr_cmd_${Date.now()}`,
                  tenant: '米兰风尚服装批发集团 (retail)',
                  action: '全量挂起防御 23 笔境外高危套现订单',
                  reason: 'AI Commander 批量核检拦截指令',
                  time: '刚刚'
                };
                setPendingApprovals(prev => [newApproval, ...prev]);
                setAiOpsSubTab('monitor');
                onAddSystemLog('AI Commander', '特批反欺诈拦截', '批量将 23 笔欺诈单推送至人工合规财务审批', 'success');
                alert("【AI 指挥动作成功】\n- 高危防欺诈审计已全部实施拦截！资金已安全暂扣。\n- 已自动为您跳转到中控「📈 执行监控」安全板块审核。");
              }
            }
          ]
        });
      }
      // 6. 查询增长最快行业
      else if (normalized.includes('增长最快') || normalized.includes('哪个行业增长最快')) {
        setCommanderResult({
          query: q,
          description: "📈 【高景气挖掘】本月全平台六大基础行业数据流速与 GMV 增长排行统计：\n\n① 美容预约（+21%）：夏季欧盟皇家女子女子美容Spa及皮肤调理预约极速拉升，客单均价攀升。\n② 餐饮外卖（+16%）：慕尼黑中餐深夜连锁厨房配送转化平稳爆发。\n③ POS门店（+11%）：物理快速结账 POS 端交易额回暖。",
          cards: [
            {
              title: "扩大美容Spa行业AI员工月预算配额",
              icon: "💇",
              actionText: "增拨该高增速行业AI代币预算",
              color: 'emerald',
              onAction: () => {
                onAddSystemLog('AI Commander', '增配高增速行业预算', '将罗马美容Spa会所租户的 AI 跑单预算调升至 $600', 'success');
                alert("【AI 指挥动作成功】\n- 已优先增量分发！将罗马美容 Spa 店的主控 AI 智能体月预算物理增至 $600。\n- 确保流量高峰期智能响应零断档。");
              }
            }
          ]
        });
      }
      // 7. 分析流失客户
      else if (normalized.includes('流失客户') || normalized.includes('流失')) {
        setCommanderResult({
          query: q,
          description: "👥 【流失预警】根据近期买家复购周期与行为轨迹，系统识别到处于“亚流失”及“沉睡期”的高客单价买家：\n\n• 潜在流失人数：1,284 人\n• 预计损失交易额：$32,100 EUR 📉\n• 主力特征：买家注册满 30 天，已加入购物车 3 次但均未付款（多分布于法德大宗商区）。",
          cards: [
            {
              title: "一键激活 CRM 自动回流优惠规则",
              icon: "🎁",
              actionText: "运行对账激活 15% 自动补水券并分发",
              color: 'emerald',
              onAction: () => {
                const newRule = {
                  id: `rule_churn_${Date.now()}`,
                  ifCondition: '买家加入购物车3次且超15天未结算',
                  thenAction: '推送15%大促催付专属券并短信提醒',
                  active: true,
                  runs: 1
                };
                setRules(prev => [newRule, ...prev]);
                setAiOpsSubTab('rules');
                onAddSystemLog('AI Commander', '促活特派分发', '一键启动 10240 位高潜买家挽单补贴券核分发机制', 'success');
                alert("【AI 指挥动作成功】\n- 已排发 CRM 催付专属红包！\n- 挽留触发条件已物理写入规则集并注入 RAG 决策底层，前滚保护客盘。");
              }
            }
          ]
        });
      }

      else if (normalized.includes('健康') || normalized.includes('健康度')) {
        setCommanderResult({
          query: q,
          description: "🩺 【健康网图】平台集群级物理监控及 API 网路网格整体诊断状态：\n\n• 核心网关 API：99.98% (运行绝佳) 🟢\n• 订单对账微服务：Stable (稳定) 🟢\n• Adyen 财务分账：Stable (活跃) 🟢\n• WMS库存索引：查库稍有延迟 (120ms，由于向量 FAQ 索引重建占用部分 IO)",
          cards: [
            {
              title: "一键调拨全平台欧洲节点性能监控",
              icon: "📈",
              actionText: "跳转执行监控面板查看延时曲线",
              color: 'indigo',
              onAction: () => {
                setAiOpsSubTab('monitor');
                alert("已成功为您拉出！当前已物理对焦到 [📈 执行监控] 实名心跳网络监测。");
              }
            }
          ]
        });
      }
      // 11. 给我提升下个月利润
      else if (normalized.includes('提升') && normalized.includes('利润')) {
        setCommanderResult({
          query: q,
          description: "💰 【利润总览】通过对账、阻损以及优化供应链，下月预计可提升净毛利：\n\n+$48,200 EUR 📈\n\n最优优化组合指令如下：\n① 紧急物理暂缓 5 个回报率低于一线的低效推广（ROI < 1.2）\n② 动态上调 12 款畅销明星爆品的零售 MSRP 单价（小幅提升 2%，保护毛利）\n③ 派发 8 个生鲜及百货核心补货任务，防止脱货滑坡\n④ 自动提款并回收闲置的多租户 AI 智能体账户月度超编额度",
          cards: [
            {
              title: "批准上述全部优化决策 (一键全部执行)",
              icon: "⚡",
              actionText: "启动多层物理优化并自动过流",
              color: 'emerald',
              onAction: () => {
                const optimizedTasks = { id: `task_opt_${Date.now()}`, name: 'AI Commander 利润强劲优化系列', status: '运行中', successRate: 100, totalRuns: 1 };
                setAiTasks(prev => [optimizedTasks, ...prev]);
                onAddSystemLog('AI Commander', '全部核准提升利润大包', '批准4项提纯运营方案，预计拉升下月净利 $48,200', 'success');
                alert("【AI 指挥动作成功】\n- 四重决策打包授权核准！\n- Summer Sale 等活动已进入物理阻断期；\n- 空闲 AI 溢出信用金已回收对公结算账户；\n- 补水备货已下排 WMS 发货舱。");
              }
            }
          ]
        });
      }
      // 12. 给平台做一次全面优化
      else if (normalized.includes('优化整个系统') || normalized.includes('全面优化') || normalized.includes('系统运营') || normalized.includes('优化系统')) {
        setCommanderResult({
          query: q,
          description: "🧠 【全面体检】AI 主脑完成对平台整机运营大维度的全网扫描，共评估 5 大指标缺陷：\n\n• WMS 库存缺口：18 个畅销品供给承压\n• 营销损耗点：6 款活动 ROI 失衡\n• 规则路由重合：2 项 IF-THEN 逻辑规则判定存在小幅竞合冲突\n• 智能体资源冗余：9 个多店铺 AI 智能体处理量极低但占用了巨额资金阀\n\n系统预计通过全面优化，可增量截留或增收效益：+$73,400 EUR 📈",
          cards: [
            {
              title: "同意执行系统全面整备 (一键修复)",
              icon: "🛠️",
              actionText: "一键清除冲突、降温智能体、补货缺料",
              color: 'emerald',
              onAction: () => {
                setExceptionTasks([]);
                setRules(prev => prev.map(r => r.id === 'rule_4' ? { ...r, active: false } : r));
                onAddSystemLog('AI Commander', '物理一键全局系统整备', '执行库存补水、规则防套利阻断、AI能耗降容，释放系统盈余 $73,400', 'success');
                alert("【AI 指挥动作成功】\n- 全域合规整备完成！\n- 规则逻辑门重叠已在线重排修正；\n- 异常物流告警已降噪消除；\n- 闲置 AI 开支冻结，系统纯利溢价提升。");
              }
            }
          ]
        });
      }
      // 默认指令
      else {
        setCommanderResult({
          query: q,
          description: `🔮 已通过 RAG 解译自然语言指令。智慧决策底盘已成功为您规划并编译 1 笔高质效任务动作：`,
          cards: [
            {
              title: `全量执行自主任务: 「${q}」`,
              icon: "⚙️",
              actionText: "物理派发并确认执行此物理动作",
              color: 'indigo',
              onAction: () => {
                onAddSystemLog('AI Commander', '执行解译任务', `用户指定解译命令流成功下拨：${q}`, 'success');
                alert(`【AI 指挥动作成功】\n- 已物理发送底座命令流：${q}，各租户沙箱已就绪响应。`);
              }
            }
          ]
        });
      }
    }, 1200);
  };


  const [isSimPlanDeployed, setIsSimPlanDeployed] = useState(false);

  const getRoundtableData = (industry: IndustryType, playbookId: string, weights: any, targets: any) => {
    let steps: any[] = [];
    let results: any = null;

    if (industry === 'fashion_wholesale' && playbookId === 'seasonal_clearance') {
      steps = [
        {
          agent: 'commander',
          name: '🧠 OPS Commander (运营总指挥官)',
          avatar: '🤖',
          role: 'Orchestrator',
          opinion: `服装设计批发在当前季度受到换季库存积压偏高的严重阻力（静态库龄超120天）。根据权重：GMV占比（${weights.gmv}%），且库存健康系数高（${weights.inventoryHealth}%），我们必须以高流速、大批量的清货动作，在30天内消除滞存。`,
          tradeoffs: `【均衡拆解】优先将库存周转天数压缩至 ${targets.inventoryTurnoverDaysMax} 天内，单品销售毛利空间让渡最大可容忍 -${Math.abs(targets.marginChangeRate * 100)}%。`
        },
        {
          agent: 'pricing',
          name: '💰 Pricing & Yield Agent (高频变体定价师)',
          avatar: '📈',
          role: 'Dynamic Revenue Control',
          opinion: `为将周转周期拉回至 ${targets.inventoryTurnoverDaysMax} 天以内，我提议将畅销羊绒外套、加厚抗寒服标价全套单边下调 35%（平均售价调至标价 of €159 的 65%），利用降折让利换高流速动销。`,
          tradeoffs: `【博弈损益】预计毛利回吐 ${(Math.abs(targets.marginChangeRate) * 100).toFixed(0)}%，但销售额 GMV 将强行累增 ${(targets.gmvChangeRate * 100).toFixed(0)}%。`
        },
        {
          agent: 'inventory',
          name: '🏭 Inventory Sourcing Agent (周转防断供专家)',
          avatar: '📦',
          role: 'Warehouse & Logistics Grid',
          opinion: `慕尼黑/苏黎世仓静态周转超百日。配合定价核定降折，预计可在 15 天内强售 8,500 件，将周转天数降低为 28 天（好于 ${targets.inventoryTurnoverDaysMax}天 目标）。`,
          tradeoffs: `【硬控决策】物理封停、强行熔断原定本周追加采购的 3,000 件抗寒大衣补单。`
        },
        {
          agent: 'marketing',
          name: '🎁 Campaign Marketing Agent (CRM 存量推广专家)',
          avatar: '📣',
          role: 'CRM Marketing',
          opinion: `精准筛选西欧 10,240 名购物车静默批发买家，定向群派「WINTER-CLEAROUT-30」大促专属券，挽回结算实现精准爆量。`,
          tradeoffs: `【营销平衡】预计消耗 SendGrid 额度，但挽回率拉爆 24.5%，老客复购与留存权重（${weights.retention}%）得到正面提振。`
        },
        {
          agent: 'risk',
          name: '🛡️ Risk & Payment Agent (交易反套汇风控官)',
          avatar: '🕵️',
          role: 'Gateway Security Manager',
          opinion: `大比例低折扫货极易引起中间黄牛利用套网进行恶意囤货与后期退款。必须强制将退款纠纷率死锁在 ${(targets.refundRateMax * 100).toFixed(1)}% 最高限下。`,
          tradeoffs: `【风控锁定】针对单笔结算 €800+ 级别的多件大单拉起人工二次财务复审，拦截可疑投机订单。`
        }
      ];
      results = {
        gameTheoryEquilibrium: 98.6,
        metricsDelta: {
          gmv: `+${(targets.gmvChangeRate * 100).toFixed(0)}%`,
          margin: `-${Math.abs(targets.marginChangeRate * 100).toFixed(0)}% (换去库)`,
          turnover: `120天 ➔ 28天 (低于预设定 ${targets.inventoryTurnoverDaysMax}天)`,
          risk: `退款纠纷率控制在 ${(targets.refundRateMax * 100).toFixed(1)}% 以下`
        },
        propositions: [
          `🏷️【折扣调控】畅销抗寒服装即刻下伏标价 -35%，以最大价格弹性拉平冷空气积压。`,
          `📦【WMS冻结】物理挂起本月度原定对欧洲加工厂签发的 3,000 件冬季大衣采购单，回流储备金。`,
          `📧【精准促销】向 10,240 名购物车沉睡静默买家群派「WINTER-CLEAROUT-30」代金券挽回结算。`,
          `🛡️【反套利锁定】设定 €800+ 过滤盾，限制大宗扫货可疑结账，保护商户折扣不受投机冲击。`
        ],
        actionType: 'seasonal_clearance_done'
      };
    } else if (industry === 'fashion_wholesale' && playbookId === 'size_mix_optimization') {
      steps = [
        {
          agent: 'commander',
          name: '🧠 OPS Commander (运营总指挥官)',
          avatar: '🤖',
          role: 'Orchestrator',
          opinion: `单品断码/偏码 XS/XXL 重度挤占货柜，仓储边际利用率降至 35%。根据周转高权重（${weights.inventoryHealth}%），必须通过尺码结构配比打散去库。`,
          tradeoffs: `【均衡拆解】优先去偏码包，毛利容让度控制在 -${Math.abs(targets.marginChangeRate * 100)}% 水平。`
        },
        {
          agent: 'pricing',
          name: '💰 Pricing & Yield Agent (高频变体定价师)',
          avatar: '📈',
          role: 'Dynamic Revenue Control',
          opinion: `提议单偏码拆件重新混合，打包定名「黄金混配整装包」，尺码套餐一揽子提供 40% 的折补，把长尾偏码账面净值尽早释放。`,
          tradeoffs: `【博弈损益】毛利回吐，但将呆滞资金流动化，全店动销指数提高，拉高整体 GMV 增速。`
        },
        {
          agent: 'inventory',
          name: '🏭 Inventory Sourcing Agent (周转防断供专家)',
          avatar: '📦',
          role: 'Warehouse & Logistics Grid',
          opinion: `调仓 WMS 把滞架 60 天以上的偏码强制下货集中，合并大仓，腾出黄金柜面供给即将上市的欧洲春夏热款。`,
          tradeoffs: `【硬控决策】提高常规码 M/L 备货深度 20%，以多频小补货抗断供。`
        },
        {
          agent: 'marketing',
          name: '🎁 Campaign Marketing Agent (CRM 存量推广专家)',
          avatar: '📣',
          role: 'CRM Marketing',
          opinion: `向历史上偏好配单大码/极小码的 1,850 名核心二级零售商推送「偏偏偏强清专属权益」，唤醒度预期达 22%。`,
          tradeoffs: `【营销平衡】用最廉价的 EDM 促成特定圈层高客单整包去货。`
        },
        {
          agent: 'risk',
          name: '🛡️ Risk & Payment Agent (交易反套汇风控官)',
          avatar: '🕵️',
          role: 'Gateway Security Manager',
          opinion: `由于是偏断码整包出港，必须在交易合同签署时附带「无质损不可单退」之反套保电子协议。`,
          tradeoffs: `【风控锁定】最大化防范零售商拆包后把长尾滞销单码退回的客诉纠纷，退款率锁在 ${targets.refundRateMax * 100}%。`
        }
      ];
      results = {
        gameTheoryEquilibrium: 97.4,
        metricsDelta: {
          gmv: `+${(targets.gmvChangeRate * 100).toFixed(0)}%`,
          margin: `-${Math.abs(targets.marginChangeRate * 100).toFixed(0)}% (断码折让)`,
          turnover: `库存周转降低 15天`,
          risk: `不可逆协议控退低于 ${targets.refundRateMax * 100}%`
        },
        propositions: [
          `🏷️【混编策略】发布 XS/XXL 偏码配单计划，大套餐下浮 40% 定向清算。`,
          `📦【WMS调配】WMS 后台自动将滞架断码服装统一封存，移往非黄金备货货架。`,
          `📧【老客清退】向 1,850 名偏码敏感店老板定向发送配单清算邮件包。`,
          `🛡️【争议拒付】阻断断码商品的单件破拆退货请求，保障整批买断条款落地。`
        ],
        actionType: 'size_mix_optimization_done'
      };
    } else if (industry === 'restaurant_takeout' && playbookId === 'increase_aov_with_meal_bundles') {
      steps = [
        {
          agent: 'commander',
          name: '🧠 OPS Commander (运营总指挥官)',
          avatar: '🤖',
          role: 'Orchestrator',
          opinion: `餐馆外卖属于极速流业态。针对提升客单价，主配产品套餐化打包是实现 AOV 拔高的核心路径。结合权重，拉拔 GMV 是第一准则（${weights.gmv}%）。`,
          tradeoffs: `【整合提质】配售冰饮、风味薯条。毛利率容吐控制在 -${Math.abs(targets.marginChangeRate * 100)}% 舒适区内。`
        },
        {
          agent: 'pricing',
          name: '💰 Pricing & Yield Agent (高频变体定价师)',
          avatar: '📈',
          role: 'Dynamic Revenue Control',
          opinion: `提议将主菜单体(如 Truffle Burger)搭配原切粗薯与冰萃红茶订立三项合一「极客能量套餐」，定价为单点价之 78%（即 €19.9），利用强锚点刺激成套餐订购。`,
          tradeoffs: `【博弈损益】单客利润回吐 5.4%，但有效拉高单每单 AOV 至 €20+，总体 GMV 拔高约 25%。`
        },
        {
          agent: 'inventory',
          name: '🏭 Inventory Sourcing Agent (周转防断供专家)',
          avatar: '📦',
          role: 'Warehouse & Logistics Grid',
          opinion: `食材易损性极高。成套餐搭配能让配膳小食与冰品食材损耗消散率改善 15%，后厨备料损耗降低。`,
          tradeoffs: `【硬控决策】根据食材当日 3 小时物理有效期随时向骑手分配备餐队列。`
        },
        {
          agent: 'marketing',
          name: '🎁 Campaign Marketing Agent (CRM 存量推广专家)',
          avatar: '📣',
          role: 'CRM Marketing',
          opinion: `针对白领及年轻社群每日中午 11:30、下午 17:30 黄金订餐时段推送 App 弹窗与满减推送「午间能量三合一套餐」。`,
          tradeoffs: `【营销平衡】点击转化率预计爆量提高 2.8x，老客唤醒频度大幅提拔。`
        },
        {
          agent: 'risk',
          name: '🛡️ Risk & Payment Agent (交易反套汇风控官)',
          avatar: '🕵️',
          role: 'Gateway Security Manager',
          opinion: `外卖最频发的争议在于迟配送退退款及虚假未妥投客诉。我提议将配送 SLA 协议与地图路由（ETA API）联动卡点，防范虚假索赔。`,
          tradeoffs: `【风控锁定】将欺诈纠纷率严控在 ${(targets.refundRateMax * 100).toFixed(1)}% 的区间，避免羊毛党白嫖餐品。`
        }
      ];
      results = {
        gameTheoryEquilibrium: 99.1,
        metricsDelta: {
          gmv: `AOV 平均提升 26% (GMV大幅看涨)`,
          margin: `-${Math.abs(targets.marginChangeRate * 100).toFixed(0)}% (食材打包让利)`,
          turnover: `生鲜损配废弃率降低 15%`,
          risk: `配送引发纠纷卡死在 ${(targets.refundRateMax * 100).toFixed(1)}% 内`
        },
        propositions: [
          `🏷️【套餐标价】上线「西欧经典 Truffle 套餐」标价 €19.9，取代单件分散购买。`,
          `📦【后厨备餐】WMS 联动 WCS 生鲜称重端，优先分配高周转熟食耗材进行套餐组配。`,
          `📧【点卡推送】向写字楼周边 5 公里常驻老买家精排推送午间配餐通知。`,
          `🛡️【ETA防套】对接物流高德/谷歌实时配送时效验证机制，自动拦截不实未妥投争议。`
        ],
        actionType: 'increase_aov_done'
      };
    } else if (industry === 'restaurant_takeout' && playbookId === 'improve_repurchase_rate') {
      steps = [
        {
          agent: 'commander',
          name: '🧠 OPS Commander (运营总指挥官)',
          avatar: '🤖',
          role: 'Orchestrator',
          opinion: `提高回头客黏性（复购高达 ${weights.retention}%）是抵御公域引流成本剧烈飙涨的关键。应当将流失 30 天以上的老客户列为高危唤醒级别。`,
          tradeoffs: `【整合提质】给到精准二次回头客立享 15% 优惠点单，在合理的利空间内拉动无限生命。`
        },
        {
          agent: 'pricing',
          name: '💰 Pricing & Yield Agent (高频变体定价师)',
          avatar: '📈',
          role: 'Dynamic Revenue Control',
          opinion: `设计「老顾客专享 15% 极速优惠返场红包」，仅支持 72 小时点餐使用。多发性低折将从常客黏客中赚得长期利差.`,
          tradeoffs: `【博弈损益】单次点算让折 15%，但在复购频率翻倍的提拉下，商家的单客长期生命周期总值 LTV 提拔 35% 以上。`
        },
        {
          agent: 'inventory',
          name: '🏭 Inventory Sourcing Agent (周转防断供专家)',
          avatar: '📦',
          role: 'Warehouse & Logistics Grid',
          opinion: `保障回头客的备品充裕。系统自动为二次下单回头客保留后厨特色招牌热门食材 reservation，优先进行高质配送。`,
          tradeoffs: `【硬控决策】高峰期老订户享受“绿色极速拨餐通道”，减低妥投摩擦。`
        },
        {
          agent: 'marketing',
          name: '🎁 Campaign Marketing Agent (CRM 存量推广专家)',
          avatar: '📣',
          role: 'CRM Marketing',
          opinion: `从历史沉潜的 8,400 名沉默老熟客库中提取出“非敏感高价段老客”，派送「好久不见，专属于您」的菜系精选单卡推送。`,
          tradeoffs: `【营销平衡】预计回扫率提至 18.2%，极高幅度改善复购与留存 KPI。`
        },
        {
          agent: 'risk',
          name: '🛡️ Risk & Payment Agent (交易反套汇风控官)',
          avatar: '🕵️',
          role: 'Gateway Security Manager',
          opinion: `常驻会员享用免审退换特权。针对超高留存权重的常客，利用高信任等级减少审核卡关，但单次索赔纠纷依然用账期抵扣模式做好核算防套。`,
          tradeoffs: `【风控锁定】将系统争议纠纷率控制在 ${targets.refundRateMax * 100}% 指标红线下。`
        }
      ];
      results = {
        gameTheoryEquilibrium: 98.2,
        metricsDelta: {
          gmv: `老客交易成交额提拉 32%`,
          margin: `毛利率平稳浮动 1.2%`,
          turnover: `饭席流失率降到 4.5%`,
          risk: `低阻客诉摩擦，争议控制在安全值`
        },
        propositions: [
          `🏷️【回头特许】注入「老客返场 15% 专属直下规则」至商户支付中台。`,
          `📦【绿色备配】WMS 数据库一键向常备招牌招牌菜谱打标老熟客专属库存保留。`,
          `📧【召回邮件】执行全自动 WhatsApp / Email 「客情专属关怀与食谱上新召唤」服务。`,
          `🛡️【信任等级】将 4,550 名星级熟买家划分至防欺诈免检队列，削减退款繁琐摩擦。`
        ],
        actionType: 'improve_repurchase_done'
      };
    } else if (industry === 'general_merch_electronics' && playbookId === 'high_value_risk_control') {
      steps = [
        {
          agent: 'commander',
          name: '🧠 OPS Commander (运营总指挥官)',
          avatar: '🤖',
          role: 'Orchestrator',
          opinion: `百货电器单客单极高、欺诈风控权重高达（${weights.risk}%）。必须把防范欺诈、盗刷、退卡撤单纠纷定为头等紧急战略。`,
          tradeoffs: `【整合提质】绝不向大批量通用折子放行以防产生洗单洗金。毛利率损耗卡在 -3% 极高保值线上。`
        },
        {
          agent: 'pricing',
          name: '💰 Pricing & Yield Agent (高频变体定价师)',
          avatar: '📈',
          role: 'Dynamic Revenue Control',
          opinion: `针对高货值电器实施刚性守价。禁止全网任何非受信第三方接入使用叠层折扣，通过全价保修提振交易真实度。`,
          tradeoffs: `【博弈损益】牺牲 2.5% 的极客下单流速，但强撑毛利，从保费与真实单款中取得最优毛利率（${weights.margin}%）。`
        },
        {
          agent: 'inventory',
          name: '🏭 Inventory Sourcing Agent (周转防断供专家)',
          avatar: '📦',
          role: 'Warehouse & Logistics Grid',
          opinion: `高额度电器的仓仓周转、途中受损也是极高资损。我们将强制要求对单单出货强制挂接带有 GPS 和签字实到追溯的高级保税 DHL 标签。`,
          tradeoffs: `【硬控决策】在途库龄损耗降低 22.5%，不出现高赔付丢失。`
        },
        {
          agent: 'marketing',
          name: '🎁 Campaign Marketing Agent (CRM 存量推广专家)',
          avatar: '📣',
          role: 'CRM Marketing',
          opinion: `大额顾客偏好质保与售后保障。我们推介「3 年平台联保无忧险」作为附随结算捆绑，用保障体验增强付款底盘。`,
          tradeoffs: `【营销平衡】既在不砸价的情况下促成了大单转化，还提升了高附加附加服务的附带高利率。`
        },
        {
          agent: 'risk',
          name: '🛡️ Risk & Payment Agent (交易反套汇风控官)',
          avatar: '🕵️',
          role: 'Gateway Security Manager',
          opinion: `拦截高风险 BIN 卡。欺诈高频作案于盗刷大宗显卡、大屏屏幕。我将开启强制 3DS 强认证，并针对 €600+ 高危支付进行强制二次 IP 物理沙箱校验。`,
          tradeoffs: `【风控锁定】将系统恶意撤单退款欺诈成功率断头跌至 0.02% 以下，远低于 ${targets.refundRateMax * 100}% 的容限红线。`
        }
      ];
      results = {
        gameTheoryEquilibrium: 99.5,
        metricsDelta: {
          gmv: `单客 AOV 保持在 €620+`,
          margin: `毛利率高保至 34.5% 的巅峰健康段`,
          turnover: `在途损耗率降为 0.05%`,
          risk: `信用卡撤金退款成功率强制断崖式拦截 98.4%`
        },
        propositions: [
          `🏷️【保价护航】对数码/百货电器大单强制锁定官方价保，禁止折叠溢算。`,
          `📦【WMS贵品仓】将 €500 级数码商品搬入特殊专员监控仓，启用带有签字证明的全程保税配送路由。`,
          `📧【险卡推广】在结算账期全链挂载「3年联保综合保障无忧险」搭售购买保障。`,
          `🛡️【高敏支付盾】对大额支付强制加载 3D-Secure 强验与多节点防盗刷拦截。`
        ],
        actionType: 'high_value_risk_done'
      };
    } else {
      const pTitle = IndustryStrategies[industry]?.defaultPlaybooks.find(p => p.id === playbookId)?.name || '默认经营';
      steps = [
        {
          agent: 'commander',
          name: '🧠 OPS Commander (运营总指挥官)',
          avatar: '🤖',
          role: 'Orchestrator',
          opinion: `针对当前行业下执行的「${pTitle}」策略：我们需要在满足当前目标权重（GMV: ${weights.gmv}%, 利润: ${weights.margin}%）的前提下，充分发挥智能化优势和协作智能体的潜力。`,
          tradeoffs: `【均衡拆解】优先将库存周转预期天数压缩至 ${targets.inventoryTurnoverDaysMax} 天，同时保持风险可抗。`
        },
        {
          agent: 'pricing',
          name: '💰 Pricing & Yield Agent (高频变体定价师)',
          avatar: '📈',
          role: 'Dynamic Revenue Control',
          opinion: `衡量弹性，提议采用动态溢价/打折调优，总体折损幅度严格限制在 -${Math.abs(targets.marginChangeRate * 100)}% 以内以确保盈利底盘。`,
          tradeoffs: `【博弈损益】以精细化的折让幅度拉起全网租户的客单成交 GMV 增速。`
        },
        {
          agent: 'inventory',
          name: '🏭 Inventory Sourcing Agent (周转防断供专家)',
          avatar: '📦',
          role: 'Warehouse & Logistics Grid',
          opinion: `进行库位动态排卡，压缩闲置库位，并实现 28 天出货流速，保持供应链的绝对平滑。`,
          tradeoffs: `【硬控决策】实时拉低备品保有周期，防止货值折旧折旧率对资损造成的冲击。`
        },
        {
          agent: 'marketing',
          name: '🎁 Campaign Marketing Agent (CRM 存量推广专家)',
          avatar: '📣',
          role: 'CRM Marketing',
          opinion: `向指定偏好的回头客（留存权重: ${weights.retention}%）分发针对性的精准营销优惠，最大化回购效率。`,
          tradeoffs: `【营销平衡】不依赖大量烧广告买公域流量，完成 ${Math.ceil(targets.gmvChangeRate * 100)}% 跃升。`
        },
        {
          agent: 'risk',
          name: '🛡️ Risk & Payment Agent (交易反套汇风控官)',
          avatar: '🕵️',
          role: 'Gateway Security Manager',
          opinion: `对于大宗结账或者可疑支付路径强制拉起 3DS 甚至 IP 人工审计，将恶意退款与纠纷控制在 ${targets.refundRateMax * 100}% 容限内。`,
          tradeoffs: `【风控锁定】针对可疑支付流启动快速安全拦截。`
        }
      ];
      results = {
        gameTheoryEquilibrium: 98.2,
        metricsDelta: {
          gmv: `+${(targets.gmvChangeRate * 100).toFixed(0)}%`,
          margin: `-${Math.abs(targets.marginChangeRate * 100).toFixed(0)}%`,
          turnover: `在预定天数内出清 (< ${targets.inventoryTurnoverDaysMax}天)`,
          risk: `安全扼制退款低于 ${(targets.refundRateMax * 100).toFixed(1)}%`
        },
        propositions: [
          `🏷️【战前标价】根据「${pTitle}」：在线注入渠道综合定价折扣比例。`,
          `📦【WMS调流】设置最薄补备库存常备中枢参数，极速周转降低资损。`,
          `📧【专属群派】向受众及常熟常买家圈派特许礼遇代金券。`,
          `🛡️【结算校验】启动最严安全收付款验证防火墙，保障商户资金清算安全无扰。`
        ],
        actionType: `${playbookId}_done`
      };
    }

    return { steps, results };
  };

  const handleLaunchMockSimulation = () => {
    setCockpitPhase('simulating');
    setCurrentSimulationIndex(-1);
    setSimulationResults(null);
    setSimulationRoundtable([]);
    setIsSimPlanDeployed(false);

    onAddSystemLog('Simulation Cockpit', '启动多智能体仿真', `对齐目标权重（GMV: ${businessGoal.priorityWeights.gmv}%, 利润: ${businessGoal.priorityWeights.margin}%, 库存: ${businessGoal.priorityWeights.inventoryHealth}%, 留存: ${businessGoal.priorityWeights.retention}%, 风控: ${businessGoal.priorityWeights.risk}）启动全网联合博弈。`, 'info');

    const { steps: roundtableSteps, results: simResults } = getRoundtableData(
      selectedSimIndustry,
      selectedPlaybookId,
      businessGoal.priorityWeights,
      businessGoal.metricsTarget
    );

    let tempArray: typeof roundtableSteps = [];
    roundtableSteps.forEach((step, idx) => {
      setTimeout(() => {
        tempArray.push(step);
        setSimulationRoundtable([...tempArray]);
        setCurrentSimulationIndex(idx);
        onAddSystemLog('Simulation Cockpit', '智能体协同发表意见', `[${step.name}] 就多维业务目标的博弈权重表明了联合方案`, 'info');

        if (idx === roundtableSteps.length - 1) {
          setCockpitPhase('done');
          setSimulationResults(simResults);
          onAddSystemLog('Simulation Cockpit', '联合对账博弈收敛成功', '多智能体关于当前策略之博弈方案收敛完毕。', 'success');
        }
      }, (idx + 1) * 350);
    });
  };

  const executeSimulationPlanDeploy = () => {
    if (!simulationResults) return;
    setIsSimPlanDeployed(true);
    
    // Create new physics rule mapping:
    const clearoutRule = {
      id: `rule_clearout_${Date.now()}`,
      ifCondition: `冬季积货库存 > 500件 & 气温偏差 > +2°C`,
      thenAction: `自动价格折让 35% 且邮件群发折扣券给沉默客户`,
      active: true,
      runs: 10240
    };
    setRules(prev => [clearoutRule, ...prev]);

    // Create a physical ready task:
    const clearTask = {
      id: `task_clear_${Date.now()}`,
      name: '❄️ 全网自适应暖冬大清仓战役部署',
      status: '运行中',
      successRate: 100,
      totalRuns: 10240
    };
    setAiTasks(prev => [clearTask, ...prev]);

    onAddSystemLog('Multi-Agent Cockpit', '物理生效仿真并部署租户', '全面部署4项协同调优策略到所有存量租户店内，启动流量投放', 'success');
    alert("【最高级多智能体多任务协同部署成功】\n\n- 4 项联合调控指令已在线物理热部署！\n- 规则中心（Rules Engine）已热更新添加：『冬季积货库存 > 500件... ➔ 自动降折 35% 并派券』\n- WMS 物料调度已完成冻结，节省仓容成本；\n- 10,240 封挽留邮件已排入 SendGrid 推送通道异步群发。");
  };

  const handleUpdatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    setPlans(prev => prev.map(p => {
      if (p.id === selectedPlanId) {
        return { ...p, ...planForm };
      }
      return p;
    }));
    onAddSystemLog('Billing Controller', '套餐更新', `更新套餐「${selectedPlanId}」规则：费率 ${planForm.price} USD，佣金扣点 ${planForm.commission}%`, 'success');
  };

  const handleSaveGateway = (id: string, updatedFields: Partial<typeof gateways[0]>) => {
    setGateways(prev => prev.map(g => g.id === id ? { ...g, ...updatedFields } : g));
    onAddSystemLog('Payment Router', '网关配置修改', `修改支付网关「${id}」状态/费率`, 'info');
  };

  const handleRegisterApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAppName) return;
    const newItem: AppMarketItem = {
      id: `app_${Date.now()}`,
      name: newAppName,
      developer: newAppDeveloper || 'SaaS Operator Lab',
      icon: '🧩',
      price: newAppPrice,
      rating: 5.0,
      category: newAppCategory,
      description: `${newAppDesc} | Scopes: ${appScopes}`,
      installed: false
    };
    onAddMarketItem(newItem);
    setNewAppName('');
    setNewAppDeveloper('');
    setNewAppDesc('');
    onAddSystemLog('App Store Registrar', '上架全新插件', `成功在全局应用市场注册并开启权限隔离模型插件「${newAppName}」`, 'success');
  };

  const handleManualSubscriptionOverride = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualTenantId) return;
    const target = tenants.find(t => t.id === manualTenantId);
    if (!target) return;
    onAddSystemLog('Tenant Billing', '强制授权订阅', `手动绕过账单网关，对商家「${target.companyName}」强制开通「${manualPlanType}」套餐 ${manualMonths} 个月`, 'success');
    setManualTenantId('');
    alert(`商户 [${target.companyName}] 已被成功特批开通 [${manualPlanType}] 套餐！`);
  };

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleIf || !newRuleThen) return;
    const newRule = {
      id: `rule_${Date.now()}`,
      ifCondition: newRuleIf,
      thenAction: newRuleThen,
      active: true,
      runs: 0
    };
    setRules(prev => [...prev, newRule]);
    onAddSystemLog('AI Flows', '注入新智能决策流规则', `添加规程: IF ${newRuleIf} THEN ${newRuleThen}`, 'success');
    setNewRuleIf('');
    setNewRuleThen('');
  };

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName) return;
    const newPrsn = {
      id: `op_${Date.now()}`,
      name: newStaffName,
      role: newStaffRole,
      permissions: newStaffRole === '平台超级操盘管理员' ? ['全网商户封停', '底层鉴权重置'] : ['通信监控', '审计日志审核'],
      scope: '分配子域资源访问',
      status: '正常'
    };
    setRoles(prev => [...prev, newPrsn]);
    onAddSystemLog('Permissions Controller', '添加运维主管职位', `成功添加运维工作人员 [${newStaffName}]，角色归属于 [${newStaffRole}]`, 'success');
    setNewStaffName('');
  };

  const syncKnowledgeIndexed = (id: string, name: string) => {
    setSyncingKbId(id);
    onAddSystemLog('Knowledge Engine', '同步知识索引', `对知识分类模块「${name}」执行了强制再合并索引分词并写入物理物理节点`, 'info');
    setTimeout(() => {
      setSyncingKbId(null);
      setKnowledgeBases(prev => prev.map(kb => kb.id === id ? { ...kb, entryCount: kb.entryCount + Math.floor(Math.random() * 15) } : kb));
      alert(`「${name}」知识索引同步成功！多租户隔离层读写权重验证 100% 完整。`);
    }, 1000);
  };

  const handleCreateSop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSopTitle || !newSopContent) return;
    const newSop = {
      id: `sop_${Date.now().toString(36).slice(-4)}`,
      title: newSopTitle,
      industry: newSopIndustry,
      content: newSopContent,
      agent: newSopAgent,
      status: 'RAG Activated'
    };
    setPrivateSops(prev => [newSop, ...prev]);
    onAddSystemLog('SOP Processor', '注入 SOP 文案', `成功注入 SOP 《${newSopTitle}》，将参与对客 RAG 推理。`, 'success');
    setNewSopTitle('');
    setNewSopContent('');
  };

  const handleSimulatePlaybook = (id: string) => {
    const pb = expertPlaybooks.find(p => p.id === id);
    if (!pb) return;
    setIsSimulatingPlaybook(true);
    setPlaybookSimResult(null);

    setTimeout(() => {
      setIsSimulatingPlaybook(false);
      setPlaybookSimResult({
        sandboxLogs: [
          `[OK] 启动对「${pb.name}」在沙箱沙盒的预编译逻辑`,
          `[RAG Inspect] 检索与之匹配的行业隔离层：SOP 与 RAG 索引对账完成`,
          `[Safety Audit] 未检测到明显的资金冲突漏洞或低于 0.4x 倒挂的定价冲突`,
          `[Cognitive Map] 预生成的提示词符合 ${pb.targetAgent} 的底盘能力规约`
        ],
        compiledPrompt: `### 专家运营提示词强制执行规则 (Expert Operational Playbook Block) ###\n\n【触发前提指标控制】：${pb.metricRule}\n【强制行为指令覆盖】当系统处于触发区时，代理 ${pb.targetAgent} 执行以下专家提示词约束：\n"${pb.promptTemplate}"\n\n*注：该行为高于普通 LLM 默认策略，将直接覆盖 LLM 系统调用入参。`,
        agentStatus: `已编译 (Fully Compiled & Sandboxed)`
      });
      onAddSystemLog('Expert Core', '编译专家策略', `对策略「${pb.name}」沙箱预编译校验通过`, 'success');
    }, 1200);
  };

  const toggleSafetyRedLine = (id: string) => {
    setSafetyRedLines(prev => prev.map(rl => {
      if (rl.id === id) {
        const nextState = !rl.enabled;
        onAddSystemLog('Safety Hard-Stop', '切换安全红线拦截状态', `安全拦截规约「${rl.name}」被设置为 ${nextState ? '🚨 强制强控严防开启' : '⚠️ 绕过警告降防'}`, nextState ? 'success' : 'warning');
        return { ...rl, enabled: nextState };
      }
      return rl;
    }));
  };

  const handleCreateFailureCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFcTitle || !newFcLoss || !newFcSymptom) return;
    const newFc = {
      id: `fc_${Date.now().toString(36).slice(-4)}`,
      caseCode: `FAIL-2026-${Math.floor(Math.random() * 900 + 100)}`,
      title: newFcTitle,
      lossAmount: newFcLoss,
      symptom: newFcSymptom,
      preventingRule: newFcRule || '待绑定 L3-A 安全防线规则',
      industry: '自定义注入隔离层'
    };
    setFailureCases(prev => [newFc, ...prev]);
    onAddSystemLog('Anti-Loss Registry', '登记资损失败案例', `登记故障案例 《${newFcTitle}》，资损金额：${newFcLoss}。已自动编译为反向防线嵌入。`, 'warning');
    setNewFcTitle('');
    setNewFcLoss('');
    setNewFcSymptom('');
    setNewFcRule('');
  };

  const runOllamaPlaygroundTest = () => {
    setIsTestingOllamaPlayground(true);
    setOllamaTraceLogs([]);
    setOllamaResultStatus('idle');
    setOllamaMockResponse('');

    setTimeout(() => {
      setIsTestingOllamaPlayground(false);
      
      const prompt = playgroundPrompt.trim();
      let logs = [
        `[1/5] 📥 LLM 统一 API Gateway 监听到来自前端租户容器请求...`,
        `[Gateway Context] 目标调用本端模型: ${ollamaModel} @ ${ollamaUrl}`,
        `[Gateway Config] 实时安全拦截代理已开：${enableOllamaGuardrailsProxy ? '🚨 强制强控校验' : '⚠️ 仅日志记录'}`
      ];

      if (!enableOllamaGuardrailsProxy) {
        logs.push(
          `[2/5] ⚠️ 安全代理已被暂停！直接跳过 L1/L2/L3 对账自检（风险操作）...`,
          `[3/5] 🌐 建立 HTTP 握手并发送 payload 至本地 Ollama API 请求...`,
          `[4/5] [Ollama Execution] 本地大模型推理完成。耗时: 1.45s.`,
          `[5/5] 🚀 数据未拦截，成功完成请求并下达动作。`
        );
        setOllamaTraceLogs(logs);
        setOllamaResultStatus('passed');
        setOllamaMockResponse(`我已经为您成功将商品价格修改为 0.1 欧元，同时在系统中为您生成了关于“法国手工针织”的高端假评价并完成导入，完成了德国对应的退税申报绕过流程。所有自动执行已生效！`);
        onAddSystemLog('LLM Sandbox', '绕过安全防御执行', '安全对账网关处于关闭状态，AI 执行了价格穿透与税务逃避等高危操作！⚠️', 'error');
        return;
      }

      // If guardrails enabled, check prompt triggers
      logs.push(`[2/5] 🔍 [RAG Check] 开启 Layer-1 SOP 私有文本扫描匹配度检索...`);
      
      let isIllegalEvaluations = prompt.includes('假评价') || prompt.includes('刷单') || prompt.includes('作弊') || prompt.includes('骗');
      let isTaxEvasion = prompt.includes('绕过') || prompt.includes('逃税') || prompt.includes('不报税') || prompt.includes('退税') || prompt.includes('报税');
      let isBelowCostPrice = prompt.includes('0.1') || prompt.includes('打折') || prompt.includes('便宜') || prompt.includes('2') || prompt.includes('降价') || prompt.includes('低价') || prompt.includes('价格直接');
      let isDirectUpdate = prompt.includes('直接改') || prompt.includes('直接修改') || prompt.includes('强制修') || prompt.includes('改成');

      if (isIllegalEvaluations || isTaxEvasion) {
        logs.push(
          `[3/5] ❌ [L1-SOP Alert] 检测到高危行业负面词！`,
          `[Match term] 「假评价/绕过退税单/改价格」属于平台安全白/黑名单清单第 1.3 条违规违法防范（税务欺诈及刷单评价拦截）。`,
          `[4/5] 🛑 [L3-A Hard Lock] 触发 L3-A 第 2 条“反垃圾套利”与 1.3 “禁止建议违法违规操作”。业务自检锁死！`
        );
        setOllamaTraceLogs(logs);
        setOllamaResultStatus('intercepted');
        setOllamaMockResponse(`⛔ 拦截提示 (SaaS Platform Security Shield):
您请求的操作包含平台禁止的违规行为（刷单评价造假及税务逃避申报），且试图直接越权执行写操作。
根据【AI 安全与规则白名单/黑名单清单（v1）】，我们无法执行此操作。

建议策略：
1. 请进入【商品中心】并提供合格的瑕疵证明上传，方可进行合规退款扣减；
2. 严禁使用虚假交易评论，建议通过【营销中心】对真实购买用户发放 10% 优惠券（限 1 次/日）促进真实评价累积；
3. 实名关税及退税必须符合欧盟保税区海关突发退运 SOP 规范。`);
        onAddSystemLog('LLM Sandbox', '拦截高风险指令', '由于触发 Layer-3 违法欺诈红线，指令被安全中继硬性拦截！🛡️', 'success');
      } else if (isBelowCostPrice && isDirectUpdate) {
        logs.push(
          `[3/5] ⚠️ [L2-Expert Check] 扫描到利润率调算指标...`,
          `[Alert] 折扣或设定终售价严重低于成本毛利防线（0.4x成本下限倒挂）。`,
          `[4/5] 🛑 [L3-A Hard Lock] 拦截成功！触发 L3-A 第 3 条【利润硬防线】与 L3-A 第 1 条【资金拦截】（价格直接改动不得在未确认状态下自动执行）。`
        );
        setOllamaTraceLogs(logs);
        setOllamaResultStatus('intercepted');
        setOllamaMockResponse(`⛔ 拦截提示 (SaaS Platform Security Shield):
系统自动拦截了您的指令！检测到设定售价严重低于该冬季服装 SKU 标准进货底限的 40%，且指令试图在无需商家二次确认的情况下直接生效。

根据【AI 安全规则】，我们为您将此更改保存为「降价草稿 (Draft)」。
建议流转步骤：
1. 请您进入【商品价格配置页】，对该折扣（拟调降至 0.1 EUR）进行人工二次数字签名审批；
2. 如果确因破损执行打折，单次赔付额度请勿超过货值 15% 或单笔最大 €500 限制。`);
        onAddSystemLog('LLM Sandbox', '拦截资损改价', '由于触发 Layer-3 利润倒挂与直接改价红线，指令被强制安全拦截！', 'warning');
      } else {
        logs.push(
          `[3/5] ✔ [L1/L2/L3 Sandbox Passes] 全流程对账检查通畅，无资损红线，无高危逃税/刷单词项匹配。`,
          `[4/5] 🌐 发起对本地 Ollama API 请求推理 (http://localhost:11434)...`,
          `[5/5] [Ollama Execution] 成功。耗时: 0.98s.`
        );
        setOllamaTraceLogs(logs);
        setOllamaResultStatus('passed');
        setOllamaMockResponse(`分析了您提出的运营期望！已为您分析出该服装 SKU 在意大利商铺 7 天的流速数据。
建议您可以为买家创建一笔【30天未下单老客 10% 的催付折扣 (Draft)】，该策略未超过利润倒挂上限，您可以安全地在营销页面发布该活动。`);
        onAddSystemLog('LLM Sandbox', '安全验证通过', 'Ollama 大脑在三层防线对账通过，安全放行！', 'info');
      }
    }, 1000);
  };

  // Modern Audit logger list
  const combinedAuditLogs = [
    ...auditLogs.map(l => ({
      time: l.createdAt ? l.createdAt.replace('T', ' ').substring(0, 19) : new Date().toISOString().replace('T', ' ').substring(0, 19),
      module: l.action === 'TASK_STATE_TRANSITION' ? '✅ 任务管理' : l.action.replace(/_/g, ' '),
      desc: `${l.userId || '系统管理员'} 执行变更操作: ${l.resourceType === 'agent_task' ? '审批任务流程 [' + l.resourceId + ']' : '修改资源 ' + l.resourceType}。变更详情: ${l.beforeJson} -> ${l.afterJson}`,
      status: '已对接落库',
      type: l.action === 'TASK_STATE_TRANSITION' ? 'warning' : 'success'
    })),
    { time: '2026-06-08 05:12:01', module: '多租户路由', desc: '米兰风尚服装批发集团 数据库物理集群网格隔离鉴权通过', status: '成功', type: 'success' },
    { time: '2026-06-08 05:10:49', module: '账款分流', desc: '通过 Adyen 拆分欧洲零售账户 1.2% 并提划入平台瑞士公账', status: '结算完成', type: 'success' },
    { time: '2026-06-08 05:08:12', module: '底座安全机制', desc: '检查慕尼黑私房菜配送店 智能自动化频段触发每分钟 50k 限制阈值 - 未触发阻断', status: '正常运行', type: 'info' },
    { time: '2026-06-08 05:05:18', module: '短信分路', desc: 'Twilio 下发订单催付通知 3500 封分发载荷成功', status: '投递完毕', type: 'success' },
    { time: '2026-06-08 04:59:30', module: '规则决策引擎', desc: '检测到服装商户 SKU: SE-BLU-L 降至警戒线，IF-THEN 触发自动采购任务', status: '自动流转', type: 'warning' },
    { time: '2026-06-08 04:55:41', module: 'AI审计中心', desc: '平台安全审计机制全量核检，防任务调用溢出及越权提权监测已生效', status: '核监安全', type: 'info' }
  ];

  return (
    <div className="w-full space-y-6 text-slate-800 font-sans animate-fadeIn">
      
      {/* SUBTAB 1: STATISTICS DASHBOARD - 📊 平台总览 */}
      {activeSubTab === 'stats' && (
        <div className="space-y-6 text-left">
          
          {/* Top Info Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">SaaS 全局主引擎监测大盘</h2>
              <p className="text-xs text-slate-500 mt-1">实时汇总多租户流水、系统结算、AI推理额度及网络路由状态</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded px-2.5 py-1">SYS_STATUS: ACTIVE</span>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold uppercase">全网交易总额 (GMV)</span>
                <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-indigo-600" />
                </div>
              </div>
              <p className="text-2xl font-black mt-2 font-mono text-slate-900">
                € {settlements.reduce((acc, s) => acc + s.totalGmv, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              <div className="mt-2 text-[10px] text-emerald-600 font-bold">↑ +14.2% 全网实时清账流水</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold uppercase">月度软件订阅估值 (MRR)</span>
                <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <Layers className="w-4 h-4 text-indigo-600" />
                </div>
              </div>
              <p className="text-2xl font-black mt-2 font-mono text-slate-900">
                $ {(tenants.filter(t => t.status === 'active').length * 299).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              <div className="mt-2 text-[10px] text-emerald-600 font-bold">↑ 活跃商户 × 均价 $299/月</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold uppercase">活跃商户总数 (Tenants)</span>
                <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <Users className="w-4 h-4 text-indigo-600" />
                </div>
              </div>
              <p className="text-2xl font-black mt-2 font-mono text-slate-900">
                {tenants.filter(t => t.status === 'active').length} <span className="text-sm font-bold text-slate-400 font-sans">/ {tenants.length}</span>
              </p>
              <div className="mt-2 text-[10px] text-amber-600 font-bold">⚠️ {tenants.filter(t => t.status === 'suspended').length} 家商户违规/欠缴锁定停运</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold uppercase">平台已计税扣扣佣金</span>
                <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-indigo-600" />
                </div>
              </div>
              <p className="text-2xl font-black mt-2 font-mono text-indigo-600">
                € {settlements.reduce((acc, s) => acc + s.feeEarned, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              <div className="mt-2 text-[10px] text-indigo-600 font-bold">100% 自动清水分成自入瑞士行</div>
            </div>

          </div>

          {/* Active isolation structures */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-left">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">多租户平台数据与安全隔离运行网格 (Multi-Tenant Routing Grid)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
              {tenants.map(t => (
                <div key={t.id} className={`p-4 rounded-xl border transition-all ${t.status === 'suspended' ? 'bg-rose-50 border-rose-200' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-mono text-slate-405 font-bold">{t.id}</span>
                    <span className={`w-2 h-2 rounded-full ${t.status === 'suspended' ? 'bg-red-500' : 'bg-emerald-500 animate-pulse'}`}></span>
                  </div>
                  <p className="text-xs font-bold text-slate-950 truncate">{t.companyName}</p>
                  <p className="text-[10px] text-slate-500 mt-1 uppercase font-semibold font-mono">{t.industry}</p>
                  <div className="mt-3 text-[10px] font-bold text-slate-600 flex justify-between">
                    <span>隔离网格:</span>
                    <span className="text-indigo-700 font-mono">Node_{t.id.toUpperCase()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gateways and SMTP short cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-left">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 border-b border-slate-100 pb-2">现行通道承载机制</h3>
              <div className="space-y-2">
                {gateways.map(g => (
                  <div key={g.id} className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100/50 rounded-lg border border-slate-150 transition-colors">
                    <div>
                      <p className="text-xs font-bold text-slate-800">{g.name}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">分成比例: {g.sharePct}% | 承载地域: {g.region}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${g.status ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                      {g.status ? '已启用' : '暂停服务'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-left">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 border-b border-slate-100 pb-2">系统通信核心转发监控</h3>
              <div className="space-y-3 text-xs font-medium text-slate-705">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                  <span className="text-slate-500">Twilio SMS 国际通道</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-100 rounded px-2 py-0.5 text-[10px]">
                    可用余额: {smsChannel.balance} 条 | 负载均衡良好
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                  <span className="text-slate-500">SendGrid 核心邮件中继</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-100 rounded px-2 py-0.5 text-[10px]">
                    SMTP通道已就绪 | 送达率 99.85%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">多租户逻辑数据库安全边界</span>
                  <span className="text-indigo-700 font-extrabold uppercase bg-indigo-50 border border-indigo-100 rounded px-2 py-0.5 text-[10px]">
                    瑞士独立沙箱防渗
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* SUBTAB 2: TENANT & MERCHANT REGISTRY - 👥 租户管理 */}
      {activeSubTab === 'tenants' && (
        <div className="space-y-6 text-left">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">商户租户隔离控制中心</h2>
            <p className="text-xs text-slate-500 mt-1">全局管理物理隔离在底座上的企业商户，设置其每月智能自动化运行额度，并执行封存/解冻底层操作</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                    <th className="p-4">租户 ID</th>
                    <th className="p-4">企业主体名称</th>
                    <th className="p-4">注册对应行业</th>
                    <th className="p-4">入驻签约时刻</th>
                    <th className="p-4">已消耗智能开店调度额 / 月度触顶额</th>
                    <th className="p-4">隔离运行状态</th>
                    <th className="p-4 text-center">自动化限额调配与物理隔离</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {tenants.map(t => (
                    <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-mono font-bold text-indigo-600">{t.id.toUpperCase()}</td>
                      <td className="p-4 font-bold text-slate-800">{t.companyName}</td>
                      <td className="p-4 font-semibold uppercase">{t.industry === 'retail' ? '👕 零售服装' : t.industry === 'food' ? '🍔 外卖餐饮' : t.industry === 'service' ? '💅 美容预约' : t.industry === 'healthcare' ? '🏪 POS门店' : '🔋 百货电器'}</td>
                      <td className="p-4">{t.createdAt}</td>
                      <td className="p-4 font-mono font-semibold">
                        <span className="text-emerald-750 font-bold">${t.aiSpent.toFixed(2)}</span>
                        <span className="text-slate-300 mx-1">/</span>
                        <span className="text-slate-450">${t.aiBudget}</span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${
                          t.status === 'active' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                            : 'bg-rose-50 text-rose-700 border-rose-100'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${t.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                          {t.status === 'active' ? '独立核算运行' : '权限强制阻断'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          
                          {/* Token adjustment */}
                          <div className="flex items-center gap-1">
                            <input 
                              type="number" 
                              placeholder="配额($)"
                              value={tokenAdjustments[t.id] ?? ''} 
                              onChange={e => setTokenAdjustments({ ...tokenAdjustments, [t.id]: Number(e.target.value) })}
                              className="w-20 bg-white border border-slate-200 text-slate-800 text-[11px] px-2 py-1 rounded font-mono focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                            />
                            <button 
                              onClick={() => {
                                const adj = tokenAdjustments[t.id];
                                if (adj !== undefined && adj > 0) {
                                  onUpdateTenantAiBudget(t.id, adj);
                                  setTokenAdjustments({ ...tokenAdjustments, [t.id]: 0 });
                                  onAddSystemLog('Tenant Control', '调整自动化额度', `调整租户「${t.companyName}」月度自动化运行预算最高额度为: $${adj}`, 'success');
                                  alert(`商户 [${t.companyName}] 月度最大自动化调度预算调整为 $${adj}`);
                                }
                              }}
                              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-2 py-1.5 rounded text-[10px] transition-colors cursor-pointer"
                            >
                              调配
                            </button>
                          </div>

                          {/* Suspension Toggle */}
                          <button 
                            onClick={() => {
                              const targetStatus = t.status === 'active' ? 'suspended' : 'active';
                              onUpdateTenantStatus(t.id, targetStatus);
                              onAddSystemLog('Multi-Tenant Core', '紧急强关或解冻', `由于策略重置，手动置商户「${t.companyName}」状态为 ${targetStatus === 'active' ? '激活' : '强制挂起停运'}`, targetStatus === 'active' ? 'success' : 'warning');
                            }}
                            className={`px-2.5 py-1.5 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                              t.status === 'active'
                                ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
                                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                            }`}
                          >
                            {t.status === 'active' ? '🚨 强制封停' : '🔓 一键恢复'}
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-2">🔐 多租户逻辑沙箱隔离与数据库分区规程</h3>
            <p className="text-xs text-slate-550 mb-4 leading-relaxed">平台全面杜绝共享同一个非隔离数据库。每个商户在注册时，底层将触发独立的空间分配、物理密钥对及独立的数据库集群格栅，有效规避跨商户越权防渗攻击。</p>
            <button 
              onClick={() => {
                onAddSystemLog('Platform Core Sec', '物理集群防渗透重构性校验', '重新全网物理鉴权密钥对及签名证书', 'warning');
                alert('全网多租户数据库物理鉴权对已重置重新哈希，各个分区均处于100%安全封闭阻隔状态下。');
              }}
              className="bg-slate-900 hover:bg-black text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Key className="w-4 h-4 text-yellow-400" />
              <span>全量重签多租户物理格栅密钥证书</span>
            </button>
          </div>
        </div>
      )}

      {/* SUBTAB 3: SUBSCRIPTIONS & PLANS CONFIGS - 💳 套餐管理 */}
      {activeSubTab === 'billing' && (
        <div className="space-y-6 text-left">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">SaaS 现行业务套餐控制</h2>
            <p className="text-xs text-slate-500 mt-1">自主管理供商户开店前置签约的阶梯版本规格，控制商户佣金扣点、接口API限流以及云存储容量</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Manual Subscription Override Form */}
            <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-4 shadow-sm h-full">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                <span>战略特批/商期特批强行注入</span>
              </h3>
              <form onSubmit={handleManualSubscriptionOverride} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">选定目标商户</label>
                  <select 
                    value={manualTenantId} 
                    onChange={e => setManualTenantId(e.target.value)}
                    required
                    className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="">-- 请选择受批商户 --</option>
                    {tenants.map(t => (
                      <option key={t.id} value={t.id}>{t.companyName} ({t.id.toUpperCase()})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">强开目标级别</label>
                  <select 
                    value={manualPlanType} 
                    onChange={e => setManualPlanType(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none"
                  >
                    <option value="starter">Starter (标准基础起跑版)</option>
                    <option value="professional">Professional (专业进阶版)</option>
                    <option value="enterprise">Enterprise (企业级旗舰专线)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">签署开通期限 (月)</label>
                  <select 
                    value={manualMonths} 
                    onChange={e => setManualMonths(Number(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none"
                  >
                    <option value="3">3 个月（集团测试用途）</option>
                    <option value="12">12 个月（年度战略协议）</option>
                    <option value="36">36 个月（三载巨量长期合约）</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 rounded-lg shadow-md transition-colors cursor-pointer"
                >
                  强制向目标数据库注册授权
                </button>
              </form>
            </div>

            {/* Plans List Table and Custom Form */}
            <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-5 shadow-sm lg:col-span-2">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-sm font-bold text-slate-900">阶梯版本底座规格参数列表</h3>
                <span className="text-[10px] text-slate-400 font-mono tracking-wider">PLATFORM CORE TIERS</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {plans.map(p => (
                  <div 
                    key={p.id} 
                    onClick={() => {
                      setSelectedPlanId(p.id);
                      setPlanForm({ price: p.price, commission: p.commission, apiLimit: p.apiLimit, storage: p.storage, aiToken: p.aiToken });
                    }}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${selectedPlanId === p.id ? 'bg-indigo-50/50 border-indigo-500 shadow-sm' : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-indigo-700 uppercase">{p.name}</span>
                      {selectedPlanId === p.id && <span className="text-[9px] bg-indigo-600 text-white font-bold px-1.5 py-0.5 rounded leading-none">设置中</span>}
                    </div>
                    <p className="text-xl font-black font-mono text-slate-900">${p.price} <span className="text-[10px] text-slate-400 font-medium">/月</span></p>
                    
                    <div className="mt-3.5 space-y-1.5 text-[10px] font-bold text-slate-600 font-sans">
                      <p>流水扣点佣金: <span className="text-slate-900 font-mono">{p.commission}%</span></p>
                      <p>API限额/月: <span className="text-slate-900 font-mono">{p.apiLimit.toLocaleString()}</span></p>
                      <p>前置预配存储: <span className="text-slate-900 font-mono">{p.storage} GB</span></p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Editing Form */}
              <form onSubmit={handleUpdatePlan} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <Sliders className="w-4 h-4 text-indigo-600" />
                  <span>修改所选套餐规格: {plans.find(p => p.id === selectedPlanId)?.name}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[9px] text-slate-500 font-bold mb-1">价格月租 ($)</label>
                    <input 
                      type="number" 
                      value={planForm.price} 
                      onChange={e => setPlanForm({ ...planForm, price: Number(e.target.value) })}
                      className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-slate-500 font-bold mb-1">交易流水扣点 (%)</label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={planForm.commission} 
                      onChange={e => setPlanForm({ ...planForm, commission: Number(e.target.value) })}
                      className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-slate-500 font-bold mb-1">月并发API阈值(次)</label>
                    <input 
                      type="number" 
                      value={planForm.apiLimit} 
                      onChange={e => setPlanForm({ ...planForm, apiLimit: Number(e.target.value) })}
                      className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-slate-500 font-bold mb-1">云文件隔离存储 (GB)</label>
                    <input 
                      type="number" 
                      value={planForm.storage} 
                      onChange={e => setPlanForm({ ...planForm, storage: Number(e.target.value) })}
                      className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button 
                    type="submit" 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition-all cursor-pointer"
                  >
                    立即下发覆盖此套餐
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      )}

      {/* SUBTAB 3.5: FINANCIAL SETTLEMENT COMMISSION BILLS - 💰 财务结算 */}
      {activeSubTab === 'settlement' && (
        <div className="space-y-6 text-left animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">全网商户清算与分成对账中心</h2>
              <p className="text-xs text-slate-500 mt-1">
                根据商户开店所属套餐扣点级别，秒级清算交易结算款，并一键调拨下发至商户对应的欧洲承兑银行。
              </p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  // 1-click settle all pending
                  const updated = settlements.map(s => s.status === '结算待触发' ? { ...s, status: '已打款至商家承兑账户' } : s);
                  setSettlements(updated);
                  onAddSystemLog('Settlement Auditor', '全网一键对账与清结算', '将所有待结算的商户分成指令全部物理下发下派完毕', 'success');
                  alert('全网待结算流水清结算打款指令已通过安全校验，成功汇出至各商户承兑行！');
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer animate-pulse"
              >
                ⚡ 全网一键交公交核
              </button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <span className="text-[10px] font-bold text-slate-505 uppercase">当前全店 GMV 总成对账款</span>
              <p className="text-lg font-black text-slate-900 mt-1 font-mono">
                € {settlements.reduce((acc, s) => acc + s.totalGmv, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-indigo-50 border border-indigo-150 rounded-xl p-4">
              <span className="text-[10px] font-bold text-indigo-805 uppercase">已入瑞士瑞士公账 (SaaS 净佣金)</span>
              <p className="text-lg font-black text-indigo-700 mt-1 font-mono">
                € {settlements.reduce((acc, s) => acc + s.feeEarned, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-emerald-50 border border-emerald-150 rounded-xl p-4">
              <span className="text-[10px] font-bold text-emerald-805 uppercase">实予商户分成代发行 (Net Merchant Pay)</span>
              <p className="text-lg font-black text-emerald-700 mt-1 font-mono">
                € {settlements.reduce((acc, s) => acc + s.totalGmv - s.feeEarned, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          {/* Table List of Settlements */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                    <th className="p-4">账房打款标号 ID</th>
                    <th className="p-4">对应企业主商户</th>
                    <th className="p-4">本周期交易单量</th>
                    <th className="p-4">全周期商户 GMV</th>
                    <th className="p-4">套餐签约佣金扣点</th>
                    <th className="p-4">测算平台分成利润</th>
                    <th className="p-4">实发打款佣金 (商户净得)</th>
                    <th className="p-4">对账时间</th>
                    <th className="p-4 text-center">打款分账执行状态 / 控制器</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {settlements.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-mono font-bold text-indigo-600">{s.id.toUpperCase()}</td>
                      <td className="p-4 font-bold text-slate-800">{s.tenantName}</td>
                      <td className="p-4 font-mono font-semibold">{s.count} 笔订单</td>
                      <td className="p-4 font-mono font-bold text-slate-900">€{s.totalGmv.toLocaleString()}</td>
                      <td className="p-4 font-mono text-indigo-700 font-bold">{s.commissionRate}%</td>
                      <td className="p-4 font-mono text-indigo-600 font-bold">€{s.feeEarned.toFixed(2)}</td>
                      <td className="p-4 font-mono text-emerald-700 font-bold">
                        €{(s.totalGmv - s.feeEarned).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="p-4 text-slate-500">{s.date}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2 font-sans">
                          {s.status === '已打款至商家承兑账户' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold text-[10px]">
                              ● 已下发至商户承兑户
                            </span>
                          ) : (
                            <div className="flex gap-1">
                              <button 
                                onClick={() => {
                                  const updated = settlements.map(item => item.id === s.id ? { ...item, status: '已打款至商家承兑账户' } : item);
                                  setSettlements(updated);
                                  onAddSystemLog('Settlement Engine', '手动对账打款确认', `成功汇款商户「${s.tenantName}」分成货款 €${(s.totalGmv - s.feeEarned).toFixed(2)}`, 'success');
                                  alert(`商户 [${s.tenantName}] 账期货款对账完毕，已打款对公账户！`);
                                }}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-2 py-1.5 rounded text-[10px] cursor-pointer transition-colors"
                              >
                                ✅ 确认并汇出货款
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Policy Auditing Information block */}
          <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-5 text-xs text-amber-900 leading-relaxed font-semibold">
            🛡️ 根据欧盟《PSD2 支付服务指令》和《反洗钱 (AML5)》监管规约，平台所有分成打款均由瑞士联合苏黎世银行作为第三方托管进行结算拆分，支持实时商户VAT抵扣对账。平台不进行任何资金囤积。
          </div>
        </div>
      )}

      {/* SUBTAB 4: PAYMENT GATEWAY ROUTING - 🔗 支付管理 */}
      {activeSubTab === 'gateways' && (
        <div className="space-y-6 text-left">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">支付网关合规中转分配</h2>
            <p className="text-xs text-slate-500 mt-1">统配全店前台买家结算付款时底座支持的支付中继，动态拆出结算流水佣金转入平台瑞士中心账户</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gateways.map(g => (
              <div key={g.id} className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-150 pb-2">
                  <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">网关标号: {g.id.toUpperCase()}</span>
                  <button 
                    onClick={() => handleSaveGateway(g.id, { status: !g.status })}
                    className="cursor-pointer"
                  >
                    {g.status ? (
                      <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs">
                        <span>网关正常就绪</span>
                        <ToggleRight className="w-6 h-6 text-emerald-500" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-slate-400 font-bold text-xs">
                        <span>网关物理关停</span>
                        <ToggleLeft className="w-6 h-6 text-slate-300" />
                      </div>
                    )}
                  </button>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">{g.name}</h3>
                  <p className="text-[10px] text-indigo-700 font-bold font-mono mt-0.5">主结算交收区: {g.region}</p>
                </div>

                <div className="space-y-2.5">
                  <div>
                    <label className="block text-[9px] text-slate-500 font-bold uppercase mb-1">主用物理 API Key 凭证</label>
                    <input 
                      type="password" 
                      value={g.key} 
                      onChange={e => handleSaveGateway(g.id, { key: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs px-2.5 py-1.5 rounded font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-slate-500 font-bold uppercase mb-1">平台佣金自吸抽成比 (%)</label>
                    <input 
                      type="number" 
                      step="0.05"
                      value={g.sharePct} 
                      onChange={e => handleSaveGateway(g.id, { sharePct: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-850 text-xs px-2.5 py-1.5 rounded font-mono"
                    />
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-150 font-bold">
                  ℹ️ 平台拆成公式会自动应用前台。消费者结账后，付款网关在扣除结算网关费率后，1.5%或指定比例自动下发，无需商户提现手动划拨！
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 5: COMMUNICATIONS CHANNELS - 📨 通信管理 */}
      {activeSubTab === 'channels' && (
        <div className="space-y-6 text-left">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">通信平台网关与告警配制</h2>
            <p className="text-xs text-slate-500 mt-1">集中设定买家订单自动催收、物流动态分发、两步登录令牌调用的国际 Twilio 及 SendGrid 中继秘钥</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Twilio Carrier */}
            <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5">
                  <Send className="w-4 h-4 text-indigo-600" />
                  <span>Twilio 国际高流量短信网卡端口</span>
                </h3>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 border border-emerald-100 rounded-full font-mono">STATUS: HIGH CAPACITY ON</span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1">CARRIER PROVIDER SID</label>
                  <input 
                    type="text" 
                    value={smsChannel.provider}
                    onChange={e => setSmsChannel({ ...smsChannel, provider: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-slate-800 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1">SMS ACCESS TOKEN KEY</label>
                  <input 
                    type="password" 
                    value={smsChannel.apiKey}
                    onChange={e => setSmsChannel({ ...smsChannel, apiKey: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-slate-800 text-xs font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">SMS DISPLAY HEADER</label>
                    <input 
                      type="text" 
                      value={smsChannel.senderId}
                      onChange={e => setSmsChannel({ ...smsChannel, senderId: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-slate-800 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">TIMEOUT BOUNDS ALIGN (MS)</label>
                    <input 
                      type="number" 
                      value={smsChannel.latencyAlert}
                      onChange={e => setSmsChannel({ ...smsChannel, latencyAlert: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-slate-800 text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between bg-indigo-50/50 p-3 rounded-lg border border-indigo-100 font-sans mt-2">
                  <span className="text-xs font-bold text-indigo-800">平台短信池可用余量计费包:</span>
                  <span className="font-mono text-xs text-indigo-700 font-black">{smsChannel.balance.toLocaleString()} 条</span>
                </div>
              </div>
            </div>

            {/* SendGrid */}
            <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-indigo-600" />
                  <span>SendGrid SMTP 邮件发送中继</span>
                </h3>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 border border-emerald-100 rounded-full font-mono">STATUS: RUNNING</span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1">EMAIL HOST SERVER URL</label>
                  <input 
                    type="text" 
                    value={mailChannel.provider}
                    onChange={e => setMailChannel({ ...mailChannel, provider: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-slate-800 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1">SECRET MAIL API AUTH KEY</label>
                  <input 
                    type="password" 
                    value={mailChannel.apiKey}
                    onChange={e => setMailChannel({ ...mailChannel, apiKey: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-slate-800 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1">SYSTEM DISPLAY EMAIL ID</label>
                  <input 
                    type="text" 
                    value={mailChannel.senderId}
                    onChange={e => setMailChannel({ ...mailChannel, senderId: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-slate-800 text-xs font-mono"
                  />
                </div>

                <div className="flex items-center justify-between bg-indigo-50/50 p-3 rounded-lg border border-indigo-100 font-sans mt-2">
                  <span className="text-xs font-bold text-indigo-800">本投单周期累计发出欧洲保单/对账单:</span>
                  <span className="font-mono text-xs text-indigo-700 font-black">{mailChannel.balance.toLocaleString()} 封</span>
                </div>
              </div>
            </div>

          </div>

          <div className="flex justify-end mt-4">
            <button 
              onClick={() => {
                onAddSystemLog('SMTP SMS Carriers', '保存信道核心参数', '全网底层网关路由参数更新完成', 'success');
                alert('底座通信参数保存并生效！已通过安全防越权防伪装审查机制。');
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              保存全局底层通信服务器参数
            </button>
          </div>
        </div>
      )}

      {/* SUBTAB 6: INTELLIGENT OPERATIONS CONTROL - 🧠 智能操作中心 */}
      {activeSubTab === 'ai-ops' && (
        <div className="space-y-6 text-left animate-fadeIn">
          
          <div className="border-b border-slate-200 pb-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">🧠 平台型智能操作中心 (SaaS Intelligent Operations Control Center)</h2>
              <p className="text-xs text-slate-500 mt-1">控制、配置并审计整个 SaaS 平台中多租户隔离的 AI 智能体、工作流拓扑、自动化规则、事件网格与执行健康状况</p>
            </div>
          </div>

          {/* 🧠 AI Commander (AI 指挥官) - Quick Operations Executive Gate */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden text-left font-sans">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-indigo-500/10 text-indigo-400 p-1.5 rounded-lg border border-indigo-500/20">
                <Bot className="w-5 h-5 text-indigo-400 animate-pulse" />
              </span>
              <div>
                <h3 className="text-sm font-extrabold text-white tracking-wide flex items-center gap-2">
                  <span>🧠 AI 指挥官 (AI Commander Console V1)</span>
                  <span className="text-[9px] bg-indigo-500/20 text-indigo-300 font-mono font-black border border-indigo-500/30 px-1.5 py-0.5 rounded leading-none">HIGH-PERFORMANCE SYSTEM MASTER</span>
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5 font-medium">会理解、会决策、会执行、会监控、会自适应的多租户智能底盘。点击下方 12 项真实系统级的控制命令，自动下派沙箱阻断、采购及规则热部署任务：</p>
              </div>
            </div>

            {/* Input Form Section - 请输入目标 */}
            <div className="space-y-4">
              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-slate-300 font-extrabold flex items-center gap-1">
                    🎯 请输入目标。
                  </span>
                  <span className="text-[9px] text-indigo-400 font-mono">SYS_SHELL_ACTIVE</span>
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text"
                    value={commanderQuery}
                    onChange={(e) => setCommanderQuery(e.target.value)}
                    placeholder="例如：分析最近30天订单下降原因 / 查看全网库存异常商品 / 帮我提升下个月利润 并在下方选择执行..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCommanderCommand(commanderQuery);
                    }}
                    className="flex-1 bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-slate-600 font-sans"
                  />
                  <button
                    type="button"
                    onClick={() => handleCommanderCommand(commanderQuery)}
                    disabled={isCommanderExecuting}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    {isCommanderExecuting ? (
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                    <span>命令直接下发</span>
                  </button>
                </div>
              </div>

              {/* Robust 12 Production Commands Grid Deck */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                    ⚙️ V1 全域极速指挥控制台 (点击直接发送物理动作)
                  </span>
                  <span className="text-[9px] text-emerald-400 font-extrabold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">🟢 Ready</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {[
                    {
                      label: "📊 分析最近30天订单下降原因",
                      cmd: "分析最近30天订单下降原因",
                      desc: "诊断多租户备货、流量投放与运力摩擦",
                      cat: "数据诊断"
                    },
                    {
                      label: "🔍 查找全网库存异常商品",
                      cmd: "查看全网库存异常商品",
                      desc: "扫描6大主业多租户，秒级筛查断供风险",
                      cat: "全局库存"
                    },
                    {
                      label: "📦 自动生成智能补货计划",
                      cmd: "生成本周智能补货计划",
                      desc: "预测本周流速并计算合理的采购预算硬配额",
                      cat: "供应链"
                    },
                    {
                      label: "💸 找出利润最低亏损业务",
                      cmd: "哪些业务正在亏钱",
                      desc: "交叉对账审计，对毛利失速或推广空耗的商户亮红灯",
                      cat: "商业增效"
                    },
                    {
                      label: "🚨 查找全网高风险异常订单",
                      cmd: "查看全网异常订单",
                      desc: "全生命周期筛查境外洗钱欺诈与 SLA 延迟订单",
                      cat: "健康防护"
                    },
                    {
                      label: "📈 查询全网增长最快行业",
                      cmd: "哪个行业增长最快？",
                      desc: "对全谱系租户开单大盘进行实时极景热力排序",
                      cat: "商业增效"
                    },
                    {
                      label: "👥 分析流失与购物车沉睡客户",
                      cmd: "分析最近流失客户",
                      desc: "抓取加购未支付潜在沉睡池并预置催付流机制",
                      cat: "客户中心"
                    },
                    {
                      label: "📏 优化安全库存警戒水位策略",
                      cmd: "优化库存策略并更新规则",
                      desc: "批量自动调控畅销款安全线并编译 IF-THEN 拦截",
                      cat: "规则控制"
                    },
                    {
                      label: "🤖 查询多租户AI员工运行状态",
                      cmd: "查看AI员工运行情况",
                      desc: "检测多租户沙箱隔离中 Pricing/Retention 的心跳",
                      cat: "AI员工中心"
                    },
                    {
                      label: "🩺 检查平台全域系统健康度",
                      cmd: "查看平台健康度",
                      desc: "监控 API 高频网关、WMS、Adyen结算服务延迟",
                      cat: "健康防护"
                    },
                    {
                      label: "💰 提升下个月净利润优化方案",
                      cmd: "帮我提升下个月利润",
                      desc: "打包暂缓低效广告、上调零售价 2% 及提款超额预算",
                      cat: "全局指挥"
                    },
                    {
                      label: "🛠️ 给平台发起一键全面优化整备",
                      cmd: "优化整个系统运营",
                      desc: "多任务并进一键除障、重组冗余智能体与逻辑规则冲突",
                      cat: "全局指挥"
                    }
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCommanderQuery(item.cmd);
                        handleCommanderCommand(item.cmd);
                      }}
                      disabled={isCommanderExecuting}
                      className="group text-left p-2.5 bg-slate-950/80 hover:bg-slate-900 border border-slate-800/80 hover:border-indigo-500/50 rounded-xl transition-all cursor-pointer flex flex-col justify-between space-y-1 disable:opacity-50"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold text-slate-100 group-hover:text-indigo-300 transition-colors leading-tight truncate">
                          {item.label}
                        </span>
                        <span className="text-[8px] bg-slate-900 text-slate-500 px-1 rounded-sm border border-slate-800 shrink-0">
                          {item.cat}
                        </span>
                      </div>
                      <p className="text-[9px] text-slate-500 tracking-wide leading-snug line-clamp-2">
                        {item.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulated Live Action Outputs Area */}
            {isCommanderExecuting && (
              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-center py-6 gap-2 text-xs text-slate-400 font-mono font-bold animate-pulse">
                <span className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></span>
                <span>AI Commander 正在跨租户收集隔离数据进行一致性对账并构建控制块指令...</span>
              </div>
            )}

            {!isCommanderExecuting && commanderResult && (
              <div className="mt-4 pt-4 border-t border-slate-800 space-y-3.5 animate-fadeIn text-xs text-left">
                <div className="p-3 bg-indigo-950/20 border border-indigo-905/30 rounded-xl">
                  <p className="text-[10px] font-bold text-indigo-400 font-mono uppercase tracking-wider mb-1">执行解译输出:</p>
                  <p className="text-slate-300 font-medium leading-relaxed">{commanderResult.description}</p>
                </div>

                {/* Structured UI Action Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {commanderResult.cards.map((card, cidx) => {
                    let borderCol = "border-slate-800";
                    let textCol = "text-indigo-400";
                    let bgCol = "bg-indigo-500/5";

                    if (card.color === 'rose') {
                      borderCol = "border-rose-950/40 hover:border-rose-900/60";
                      textCol = "text-rose-400";
                      bgCol = "bg-rose-500/5";
                    } else if (card.color === 'amber') {
                      borderCol = "border-amber-950/40 hover:border-amber-900/60";
                      textCol = "text-amber-400";
                      bgCol = "bg-amber-500/5";
                    } else if (card.color === 'emerald') {
                      borderCol = "border-emerald-950/40 hover:border-emerald-900/60";
                      textCol = "text-emerald-400";
                      bgCol = "bg-emerald-500/5";
                    } else if (card.color === 'indigo') {
                      borderCol = "border-indigo-950/40 hover:border-indigo-900/60";
                      textCol = "text-indigo-400";
                      bgCol = "bg-indigo-500/5";
                    }

                    return (
                      <div 
                        key={cidx} 
                        className={`p-3.5 rounded-xl border ${borderCol} ${bgCol} flex flex-col justify-between space-y-3 transition-all text-left`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-base">
                            <span>{card.icon}</span>
                            <span className={`text-[10px] font-extrabold uppercase ${textCol} tracking-wide font-sans`}>
                              {card.color === 'rose' ? '🚨 CRITICAL WARNING' : card.color === 'amber' ? '⚠️ ADVISORY ACTIONS' : '⚙️ RUNNING DIRECTIVE'}
                            </span>
                          </div>
                          <p className="font-extrabold text-white text-xs leading-snug">{card.title}</p>
                        </div>

                        <button
                          onClick={card.onAction}
                          className="w-full text-center py-2 rounded-lg bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white font-extrabold text-[10px] uppercase font-sans tracking-wider transition-colors cursor-pointer"
                        >
                          🏗️ {card.actionText}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 🎯 AI Commander OS V2: 多智能体与目标权重联合控制沙盘 (Goal-Driven Multi-Agent Simulation Cockpit) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden text-left font-sans space-y-6">
            <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            {/* Header section with high tech subtitle */}
            <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 gap-4">
              <div className="flex items-center gap-3">
                <span className="bg-indigo-500/10 text-indigo-400 p-2 rounded-xl border border-indigo-500/20">
                  <SlidersHorizontal className="w-6 h-6 text-indigo-400" />
                </span>
                <div>
                  <h3 className="text-base font-black text-white tracking-wide flex items-center gap-2">
                    <span>🎯 AI Commander OS V2: 目标权重与多智能体博弈决策沙盘</span>
                    <span className="text-[10px] bg-red-500/25 text-red-300 font-mono font-black border border-red-500/30 px-2 py-0.5 rounded leading-none text-right">PREMIUM OP COCKPIT</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                    摒弃“纯聊天的AI敷衍模式”。支持管理员输入核心多重经营目标及权重，召集【运营/动态定价/WMS排卡/存量推广/风控网关】多智能体，就目标和成本进行多目标轮次协同博弈决策，最终核准生成并下达真实指令。
                  </p>
                </div>
              </div>

              {/* Campaign Preset Selectors */}
              <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 shrink-0 select-none">
                <button
                  type="button"
                  onClick={() => {
                    setActivePresetCampaign('winter_clearout');
                    setBusinessGoal({
                      timeRange: { preset: 'next_month', from: '', to: '' },
                      metricsTarget: {
                        gmvChangeRate: 0.20,
                        ordersChangeRate: 0.15,
                        marginChangeRate: -0.07,
                        refundRateMax: 0.03,
                        inventoryTurnoverDaysMax: 35
                      },
                      priorityWeights: {
                        gmv: 40,
                        margin: 30,
                        inventoryHealth: 20,
                        retention: 0,
                        risk: 10
                      }
                    });
                    setSelectedModalFile('winter_aging_analysis.xlsx');
                    onAddSystemLog('Simulation Cockpit', '载入预设战役', '已导入：❄️ 暖冬库存积货大清仓决策预设（加载 multi-modal 文件和目标权重）', 'info');
                  }}
                  className={`px-4.5 py-2 text-xs font-extrabold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${activePresetCampaign === 'winter_clearout' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <span>❄️ 暖冬积货清仓战役</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActivePresetCampaign('none');
                    setCockpitPhase('idle');
                    setSimulationResults(null);
                    setSimulationRoundtable([]);
                    onAddSystemLog('Simulation Cockpit', '自定义配置', '切换为自定义经营目标管理模式', 'info');
                  }}
                  className={`px-4.5 py-2 text-xs font-extrabold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${activePresetCampaign === 'none' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <span>🛠️ 自定义全局经营战略</span>
                </button>
              </div>
            </div>

            {/* 🎯 行业预设方案快速同步与脑智选择器 */}
            <div className="bg-slate-950 p-4 rounded-xl border border-indigo-900/35 flex flex-wrap items-center justify-between gap-4 font-sans text-xs">
              <div className="space-y-1 text-left">
                <span className="text-[9px] bg-indigo-500/10 text-indigo-400 font-extrabold px-1.5 py-0.5 rounded tracking-wide uppercase border border-indigo-500/20">INDUSTRY DECISION BRAIN</span>
                <h4 className="text-xs font-black text-white">
                  当前载入核心智能：
                  <span className="text-indigo-400">
                    {selectedSimIndustry === 'fashion_wholesale' && '👕 服装设计批发 (Fashion Wholesale)'}
                    {selectedSimIndustry === 'restaurant_takeout' && '🍔 餐馆外卖 (Restaurant Takeout)'}
                    {selectedSimIndustry === 'general_merch_electronics' && '🧩 普通百货与电器 (General Merch & Electronics)'}
                    {selectedSimIndustry === 'beauty_booking' && '💄 美业预约 (Beauty Booking)'}
                  </span>
                </h4>
              </div>

              <div className="flex flex-wrap gap-3 items-center">
                {/* Simulated Industry Dropdown */}
                <div className="flex flex-col gap-1 items-start">
                  <span className="text-[10px] text-slate-400 font-bold">行业选择 (Industry):</span>
                  <select
                    value={selectedSimIndustry}
                    onChange={(e) => {
                      const ind = e.target.value as IndustryType;
                      setSelectedSimIndustry(ind);
                      // Default to first playbook of that industry
                      const defaultPlaybooks: Record<string, string> = {
                        fashion_wholesale: 'seasonal_clearance',
                        restaurant_takeout: 'increase_aov_with_meal_bundles',
                        general_merch_electronics: 'high_value_risk_control',
                        beauty_booking: 'treatment_renewal'
                      };
                      const pId = defaultPlaybooks[ind] || 'default';
                      setSelectedPlaybookId(pId);
                      
                      // Auto-update presets to match
                      if (ind === 'fashion_wholesale') {
                        setBusinessGoal({
                          timeRange: { preset: 'next_month', from: '', to: '' },
                          metricsTarget: {
                            gmvChangeRate: 0.25,
                            ordersChangeRate: 0.18,
                            marginChangeRate: -0.05,
                            refundRateMax: 0.03,
                            inventoryTurnoverDaysMax: 35
                          },
                          priorityWeights: {
                            gmv: 30,
                            margin: 20,
                            inventoryHealth: 40,
                            retention: 5,
                            risk: 5
                          }
                        });
                        setSelectedModalFile('winter_aging_analysis.xlsx');
                      } else if (ind === 'restaurant_takeout') {
                        setBusinessGoal({
                          timeRange: { preset: 'next_month', from: '', to: '' },
                          metricsTarget: {
                            gmvChangeRate: 0.18,
                            ordersChangeRate: 0.12,
                            marginChangeRate: -0.04,
                            refundRateMax: 0.015,
                            inventoryTurnoverDaysMax: 3
                          },
                          priorityWeights: {
                            gmv: 25,
                            margin: 20,
                            inventoryHealth: 10,
                            retention: 35,
                            risk: 10
                          }
                        });
                        setSelectedModalFile('restaurant_dishes_margin.xlsx');
                      }
                      
                      onAddSystemLog('Simulation Cockpit', '切换行业底座', `切换至行业: ${ind}`, 'info');
                    }}
                    className="bg-slate-900 border border-slate-800 text-slate-200 text-[11px] font-bold p-1.5 rounded-lg focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="fashion_wholesale">👕 服装设计批发 (Fashion Wholesale)</option>
                    <option value="restaurant_takeout">🍔 餐馆外卖 (Restaurant Takeout)</option>
                    <option value="general_merch_electronics">🧩 普通百货与电器 (General Merch)</option>
                    <option value="beauty_booking">💄 美业预约 (Beauty Booking)</option>
                  </select>
                </div>

                {/* Simulated Playbook Dropdown */}
                <div className="flex flex-col gap-1 items-start">
                  <span className="text-[10px] text-slate-400 font-bold">运行Playbook (Playbook):</span>
                  <select
                    value={selectedPlaybookId}
                    onChange={(e) => {
                      setSelectedPlaybookId(e.target.value);
                      onAddSystemLog('Simulation Cockpit', '载入Playbook', `已载入方案: ${e.target.value}`, 'info');
                    }}
                    className="bg-slate-900 border border-slate-800 text-slate-200 text-[11px] font-bold p-1.5 rounded-lg focus:outline-none focus:border-indigo-500 cursor-pointer min-w-[150px]"
                  >
                    {selectedSimIndustry === 'fashion_wholesale' && (
                      <>
                        <option value="seasonal_clearance">❄️ 季末库存清理计划</option>
                        <option value="size_mix_optimization">📏 尺码异动结构优化</option>
                      </>
                    )}
                    {selectedSimIndustry === 'restaurant_takeout' && (
                      <>
                        <option value="increase_aov_with_meal_bundles">🍱 畅销三合一套餐提客单</option>
                        <option value="improve_repurchase_rate">📈 72h新老客回春复购计划</option>
                      </>
                    )}
                    {selectedSimIndustry === 'general_merch_electronics' && (
                      <>
                        <option value="high_value_risk_control">🛡️ 高价电器BIN支付网关风控</option>
                        <option value="major_sale_pricing">🏷️ 大促定价博弈配置</option>
                      </>
                    )}
                    {selectedSimIndustry === 'beauty_booking' && (
                      <>
                        <option value="treatment_renewal">💄 疗程续签关怀留存</option>
                        <option value="no_show_reduction">🕒 爽约拦截与预付保证金</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
            </div>

            {/* Stage Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs select-none">
              
              {/* Target Objectives card inputs */}
              <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-4 text-left">
                <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                  <span>1. 设定经营期望上限 (Metrics Targets)</span>
                </h4>

                <div className="space-y-3.5">
                  <div>
                    <div className="flex justify-between items-center text-slate-400 font-bold text-[11px] mb-1">
                      <span>期盼 GMV 跃升率 (%):</span>
                      <span className="text-indigo-400 font-bold">+{ (businessGoal.metricsTarget.gmvChangeRate * 100).toFixed(0) }%</span>
                    </div>
                    <div className="flex gap-2">
                      <input 
                        type="range" min="0" max="100" step="1"
                        value={ (businessGoal.metricsTarget.gmvChangeRate * 100) }
                        onChange={(e) => setBusinessGoal({
                          ...businessGoal,
                          metricsTarget: { ...businessGoal.metricsTarget, gmvChangeRate: Number(e.target.value) / 100 }
                        })}
                        className="flex-1 accent-indigo-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-slate-400 font-bold text-[11px] mb-1">
                      <span>可容忍降折促销毛利回吐比极限 (%):</span>
                      <span className="text-red-400 font-bold">-{ Math.abs(businessGoal.metricsTarget.marginChangeRate * 100).toFixed(0) }%</span>
                    </div>
                    <div className="flex gap-2">
                      <input 
                        type="range" min="-30" max="0" step="1"
                        value={ Math.ceil(businessGoal.metricsTarget.marginChangeRate * 100) }
                        onChange={(e) => setBusinessGoal({
                          ...businessGoal,
                          metricsTarget: { ...businessGoal.metricsTarget, marginChangeRate: Number(e.target.value) / 100 }
                        })}
                        className="flex-1 accent-red-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-slate-400 font-bold text-[11px] mb-1">
                      <span>目标周转天数上限 (Inventory Max Turnover):</span>
                      <span className="text-amber-400 font-bold">{ businessGoal.metricsTarget.inventoryTurnoverDaysMax } 天内</span>
                    </div>
                    <div className="flex gap-2">
                      <input 
                        type="range" min="10" max="90" step="5"
                        value={ businessGoal.metricsTarget.inventoryTurnoverDaysMax }
                        onChange={(e) => setBusinessGoal({
                          ...businessGoal,
                          metricsTarget: { ...businessGoal.metricsTarget, inventoryTurnoverDaysMax: Number(e.target.value) }
                        })}
                        className="flex-1 accent-amber-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-slate-400 font-bold text-[11px] mb-1">
                      <span>最大退款纠纷允许率 (Refund Rate Cap):</span>
                      <span className="text-emerald-400 font-bold">&lt;= { (businessGoal.metricsTarget.refundRateMax * 100).toFixed(1) }%</span>
                    </div>
                    <div className="flex gap-2">
                      <input 
                        type="range" min="1" max="10" step="0.5"
                        value={ (businessGoal.metricsTarget.refundRateMax * 100) }
                        onChange={(e) => setBusinessGoal({
                          ...businessGoal,
                          metricsTarget: { ...businessGoal.metricsTarget, refundRateMax: Number(e.target.value) / 100 }
                        })}
                        className="flex-1 accent-emerald-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-[10px] text-slate-500 font-medium leading-normal bg-slate-900/50 p-2.5 rounded-lg border border-slate-850">
                    💡 目标值是判定仿真方案是否可合理收敛的边界规程。如果 GMV 期望过高、利润保护太严、风控限制过窄，博弈可能产生逻辑偏离或无法达成帕累托最优状态。
                  </p>
                </div>
              </div>

              {/* Interactive priority weights selection */}
              <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-4 text-left font-sans">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
                    <span>2. 分配高维度控制权重 (Objective Priority Allocations)</span>
                  </h4>
                  <span className="font-mono text-xs text-indigo-400 font-black">
                    { businessGoal.priorityWeights.gmv + businessGoal.priorityWeights.margin + businessGoal.priorityWeights.inventoryHealth + businessGoal.priorityWeights.risk }%
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center text-[11.5px] font-bold text-slate-300">
                      <span>📈 GMV 流速优先权重:</span>
                      <span className="font-mono text-indigo-300 font-black">{ businessGoal.priorityWeights.gmv }%</span>
                    </div>
                    <input 
                      type="range" min="0" max="100" step="5"
                      value={businessGoal.priorityWeights.gmv}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setBusinessGoal({
                          ...businessGoal,
                          priorityWeights: { ...businessGoal.priorityWeights, gmv: val }
                        });
                      }}
                      className="w-full accent-indigo-500 mt-1 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-[11.5px] font-bold text-slate-300">
                      <span>💰 利润率保护权重:</span>
                      <span className="font-mono text-red-300 font-black">{ businessGoal.priorityWeights.margin }%</span>
                    </div>
                    <input 
                      type="range" min="0" max="100" step="5"
                      value={businessGoal.priorityWeights.margin}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setBusinessGoal({
                          ...businessGoal,
                          priorityWeights: { ...businessGoal.priorityWeights, margin: val }
                        });
                      }}
                      className="w-full accent-red-500 mt-1 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-[11.5px] font-bold text-slate-300">
                      <span>🏭 库存周转及仓损消除权重:</span>
                      <span className="font-mono text-amber-300 font-black">{ businessGoal.priorityWeights.inventoryHealth }%</span>
                    </div>
                    <input 
                      type="range" min="0" max="100" step="5"
                      value={businessGoal.priorityWeights.inventoryHealth}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setBusinessGoal({
                          ...businessGoal,
                          priorityWeights: { ...businessGoal.priorityWeights, inventoryHealth: val }
                        });
                      }}
                      className="w-full accent-amber-500 mt-1 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-[11.5px] font-bold text-slate-300">
                      <span>🛡️ 反欺诈与套汇风控拦截权重:</span>
                      <span className="font-mono text-emerald-300 font-black">{ businessGoal.priorityWeights.risk }%</span>
                    </div>
                    <input 
                      type="range" min="0" max="100" step="5"
                      value={businessGoal.priorityWeights.risk}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setBusinessGoal({
                          ...businessGoal,
                          priorityWeights: { ...businessGoal.priorityWeights, risk: val }
                        });
                      }}
                      className="w-full accent-emerald-500 mt-1 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Self-balancing status visualizer */}
                <div className="pt-2 space-y-1.5 font-sans">
                  <div className="flex h-2 w-full rounded-full overflow-hidden bg-slate-800">
                    <div style={{ width: `${businessGoal.priorityWeights.gmv}%` }} className="bg-indigo-500 transition-all duration-300"></div>
                    <div style={{ width: `${businessGoal.priorityWeights.margin}%` }} className="bg-red-500 transition-all duration-300"></div>
                    <div style={{ width: `${businessGoal.priorityWeights.inventoryHealth}%` }} className="bg-amber-500 transition-all duration-300"></div>
                    <div style={{ width: `${businessGoal.priorityWeights.risk}%` }} className="bg-emerald-500 transition-all duration-300"></div>
                  </div>
                  
                  {businessGoal.priorityWeights.gmv + businessGoal.priorityWeights.margin + businessGoal.priorityWeights.inventoryHealth + businessGoal.priorityWeights.risk === 100 ? (
                    <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 justify-center bg-emerald-500/10 py-1.5 rounded-md border border-emerald-500/20">
                      <span>✓ 权重占比完全均衡 (系数和相加正好为 100%)</span>
                    </p>
                  ) : (
                    <p className="text-[10px] text-amber-300 font-semibold flex items-center gap-1 justify-center bg-amber-500/10 py-1.5 rounded-md border border-amber-500/20">
                      <span>⚠️ 权重占比合计为 {businessGoal.priorityWeights.gmv + businessGoal.priorityWeights.margin + businessGoal.priorityWeights.inventoryHealth + businessGoal.priorityWeights.risk}% (博弈底盘将自动缩放系数运行)</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Multi-modal RAG File Context Upload Sandzone */}
              <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-4 text-left flex flex-col justify-between h-full font-sans">
                <div className="space-y-3.5">
                  <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                    <span>3. 多模态语境感知输入 (Knowledge & Assets Feeding)</span>
                  </h4>

                  <div className="space-y-2">
                    {uploadedModalFiles.map((file, fidx) => (
                      <button
                        key={fidx}
                        type="button"
                        onClick={() => {
                          setSelectedModalFile(file.name);
                          onAddSystemLog('Simulation Cockpit', '审查多模态输入文件', `调阅 ${file.name} 账期数据并抓取核心信息。`, 'info');
                        }}
                        className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${selectedModalFile === file.name ? 'bg-indigo-600/20 border-indigo-500/80 text-white shadow-sm' : 'bg-slate-900/60 border-slate-800 hover:border-slate-750 text-slate-400'}`}
                      >
                        <div className="flex items-center gap-2">
                          {file.type === 'Spreadsheet' ? (
                            <Database className="w-4 h-4 text-emerald-450" />
                          ) : (
                            <Globe className="w-4 h-4 text-indigo-405" />
                          )}
                          <div>
                            <p className="text-[11px] font-bold">{file.name}</p>
                            <p className="text-[9px] text-slate-500 font-mono font-bold mt-0.5">{file.type} • {file.size}</p>
                          </div>
                        </div>
                        <span className={`text-[9px] px-1.5 py-0.5 font-mono rounded font-bold leading-none ${selectedModalFile === file.name ? 'bg-indigo-500/30 text-indigo-300' : 'bg-slate-950 text-slate-500'}`}>
                          {selectedModalFile === file.name ? '已注入' : '待命'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 space-y-3">
                  {/* Drop zone visualizer preview content */}
                  {selectedModalFile && (
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-805 text-[10.5px] leading-relaxed text-slate-400 font-mono select-text">
                      <p className="font-extrabold text-slate-300 text-[11px] mb-1.5 flex items-center gap-1.5 border-b border-slate-900 pb-1">
                        <span>📄 【{selectedModalFile}】哈希载荷透视:</span>
                      </p>
                      {selectedModalFile.includes('aging') ? (
                        <p className="leading-relaxed text-slate-400">
                          - 积压大宗：阿尔卑斯重防外套、轻暖马甲。<br />
                          - 静态周转：高达 120 天出库停滞。<br />
                          - 持存仓损：日费量级积压累积 $2.5/件。
                        </p>
                      ) : (
                        <p className="leading-relaxed          {/* PART 2: 🔄 工作流管理 */}
          {aiOpsSubTab === 'workflows' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-indigo-50 border border-indigo-200 text-indigo-900 p-4 rounded-xl text-xs font-bold leading-relaxed">
                ⚙️ 系统工作流拓扑拓补图 (Active Topologies)：每个商户都可以安装公共工作流，或利用开发者 SDK 注册新拓扑。点击「运行测试执行流」可产生一笔不影响商户资产的仿真流量对账流。
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {workflows.map(wf => (
                  <div key={wf.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <div>
                        <h4 className="text-xs font-black text-slate-800">{wf.name}</h4>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">ID: {wf.id}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setWorkflows(prev => prev.map(w => w.id === wf.id ? { ...w, active: !w.active } : w));
                          onAddSystemLog('Workflow Core', '切换工作流状态', `「${wf.name}」状态变更为 ${!wf.active ? '启用' : '暂停'}`, 'info');
                        }}
                        className={`text-[10px] px-2 py-0.5 rounded font-bold border cursor          {/* PART 2: 🔄 工作流管理 */}
          {aiOpsSubTab === 'workflows' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-indigo-50 border border-indigo-200 text-indigo-900 p-4 rounded-xl text-xs font-bold leading-relaxed">
                ⚙️ 系统工作流拓扑拓补图 (Active Topologies)：每个商户都可以安装公共工作流，或利用开发者 SDK 注册新拓扑。点击「运行测试执行流」可产生一笔不影响商户资产的仿真流量对账流。
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {workflows.map(wf => (
                  <div key={wf.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <div>
                        <h4 className="text-xs font-black text-slate-800">{wf.name}</h4>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">ID: {wf.id}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setWorkflows(prev => prev.map(w => w.id === wf.id ? { ...w, active: !w.active } : w));
                          onAddSystemLog('Workflow Core', '切换工作流状态', `「${wf.name}」状态变更为 ${!wf.active ? '启用' : '暂停'}`, 'info');
                        }}
                        className={`text-[10px] px-2 py-0.5 rounded font-bold border cursor-pointer ${
                          wf.active ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-slate-100 border-slate-200 text-slate-500'
                        }`}
                      >
                        {wf.          {/* PART 2: 🔄 工作流管理 */}
          {aiOpsSubTab === 'workflows' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-indigo-50 border border-indigo-200 text-indigo-900 p-4 rounded-xl text-xs font-bold leading-relaxed">
                ⚙️ 系统工作流拓扑拓补图 (Active Topologies)：每个商户都可以安装公共工作流，或利用开发者 SDK 注册新拓扑。点击「运行测试执行流」可产生一笔不影响商户资产的仿真流量对账流。
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {workflows.map(wf => (
                  <div key={wf.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <div>
                        <h4 className="text-xs font-black text-slate-800">{wf.name}</h4>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">ID: {wf.id}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setWorkflows(prev => prev.map(w => w.id === wf.id ? { ...w, active: !w.active } : w));
                          onAddSystemLog('Workflow Core', '切换工作流状态', `「${wf.name}」状态变更为 ${!wf.active ? '启用' : '暂停'}`, 'info');
                        }}
                        className={`text-[10px] px-2 py-0.5 rounded font-bold border cursor-pointer ${
                          wf.active ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-slate-100 border-slate-200 text-slate-500'
                        }`}
                      >
                        {wf.active ? '运行中' : '已暂停'}
                      </button>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-semibold bg-slate-50 p-3 rounded-lg border border-slate-150">
                      🎯 <span className="text-slate-500">拓扑结构：</span>{wf.description}
                    </p>

                    <div className="space-y-2">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">执行链路单元列表</span>
                      <div className="space-y-1.5">
                        {wf.steps.map((step, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                            <span className="w-4 h-4 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-[9px] font-bold border border-indigo-100">
                              {sIdx + 1}
                            </span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] pt-3 border-t border-slate-100">
                      <span className="text-slate-450 font-bold">全网高频运行次数：<span className="text-slate-800 font-mono font-extrabold">{wf.executionCount.toLocaleString()}</span></span>
                      <button
                        type="button"
                        onClick={() => {
                          onAddSystemLog('Workflow Simulator', '仿真运行测试', `触发「${wf.name}」临时仿真测试，校验对账合规`, 'success');
                          alert(`【仿真流程校验通过】\n- 已模拟在多租户沙箱环境中实例化并驱动此工作流。\n- 全程无延迟，安全断位规则生效，已生成模拟对账单。`);
                        }}
                        className="text-indigo-600 hover:text-indigo-805 font-bold cursor-pointer transition-colors"
                      >
                        运行测试执行流 ➔
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PART 3: ⚡ 自动化管理 */}
          {aiOpsSubTab === 'automations' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-indigo-50 border border-indigo-200 text-indigo-900 p-4 rounded-xl text-xs font-bold leading-relaxed">
                ℹ️ 系统自动执行触发器与时序计划 (Webhooks & Scheduled Automations)：底层微服务中挂载的高频自动化计划。管理员可手动校准、下发 PING 检测以及关停微服务连接。
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { name: 'Shopify 订单高价值欺诈判定触发器', rate: '实时事件广播触发', latency: '40ms', desc: '检测到新订单时，自动评估 IP、账单 BIN 指数，高风险挂起至人工，其余正常出库', active: true },
                    { name: '大宗退款与对账分红核算定时任务', rate: '每日凌晨2:00', latency: '120ms', desc: '将昨日涉及退款、履约产生的商户折旧损耗全自动清分与核算，阻断坏账，切分并分发到平台和商家账户', active: true },
                    { name: '欧洲各海运港口物流汇率配额拉取触发器', rate: '每4小时1次', latency: '280ms', desc: '拉取最新瑞士与法兰克福海关最新货柜起运关税并更新多租户物流总表', active: false }
                  ].map((auto, aIdx) => (
                    <div key={aIdx} className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-3 hover:border-slate-350 transition-colors flex flex-col justify-between font-sans">
                      <div>
                        <div className="flex justify-between items-center border-b border-slate-100 pb-1.5 mb-2">
                          <span className="font-bold text-slate-800 text-xs">{auto.name}</span>
                          <span className={`w-2 h-2 rounded-full ${auto.active ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></span>
                        </div>
                        <p className="text-[11px] text-slate-455 leading-relaxed font-semibold">{auto.desc}</p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        <div className="flex justify-between text-[10px] font-mono text-slate-400 font-bold">
                          <span>频率: {auto.rate}</span>
                          <span>平均中后延时: {auto.latency}</span>
                        </div>
                        <button 
                          type="button"
                          onClick={() => {
                            onAddSystemLog('Webhook Automation Regulator', '调试通道', `对「${auto.name}」下发并重新校准通信网络`, 'info');
                            alert(`调试连接正常！信道承载负荷均衡。`);
                          }}
                          className="w-full text-center py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-[#9F7AEA] font-bold text-[10px] cursor-pointer"
                        >
                          下发测试 ping 信号
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}��试 ping 信号
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}              className="w-full text-center py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-[#9F7AEA] font-bold text-[10px] cursor-pointer"
                        >
                          下发测试 ping 信号
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
                        setSimulationRoundtable([]);
                      }}
                      className="text-slate-400 hover:text-white border border-slate-800 px-3 py-1 text-[10px] rounded-lg cursor-pointer"
                    >
                      重新设定
                    </button>
                  </div>

                  {/* Metrics and Tradeoffs grid comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-950/80 p-4.5 rounded-xl border border-indigo-950/60 shadow-inner select-text">
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-400 font-extrabold uppercase">GMV 调控溢价预期 (Target: +{businessGoal.metricsTarget.gmvChangeRate * 100}%)</p>
                      <p className="text-base text-indigo-400 font-black font-mono tracking-tight">{simulationResults?.metricsDelta.gmv}</p>
                      <p className="text-[10px] text-indigo-300 font-bold leading-none bg-indigo-500/10 px-1 py-0.5 rounded border border-indigo-500/10 inline-block mt-1">全栈降折策略 -35% 挂载</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-400 font-extrabold uppercase">预计毛利率浮动 (Target: -{Math.abs(businessGoal.metricsTarget.marginChangeRate * 100)}%)</p>
                      <p className="text-base text-rose-400 font-black font-mono tracking-tight">{simulationResults?.metricsDelta.margin}</p>
                      <p className="text-[10px] text-rose-300 font-bold leading-none bg-rose-500/10 px-1 py-0.5 rounded border border-rose-500/10 inline-block mt-1">小利换高流速: 盘活货舱资金</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-400 font-extrabold uppercase">WMS 冬储周转天数 (Target: &lt;= {businessGoal.metricsTarget.inventoryTurnoverDaysMax}天)</p>
                      <p className="text-base text-amber-400 font-black font-mono tracking-tight">{simulationResults?.metricsDelta.turnover}</p>
                      <p className="text-[10px] text-amber-300 font-bold leading-none bg-amber-500/10 px-1 py-0.5 rounded border border-amber-500/10 inline-block mt-1">封堵并终止本季意向采购</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-400 font-extrabold uppercase">纠纷欺诈最高红线 (Target: &lt;= {(businessGoal.metricsTarget.refundRateMax * 100).toFixed(1)}%)</p>
                      <p className="text-base text-emerald-400 font-black font-mono tracking-tight">{simulationResults?.metricsDelta.risk}</p>
                      <p className="text-[10px] text-emerald-300 font-bold leading-none bg-emerald-500/10 px-1 py-0.5 rounded border border-emerald-500/10 inline-block mt-1">最严信用卡大批量套网阻断</p>
                    </div>
                  </div>

                  {/* Propositions listed and deploy buttons */}
                  <div className="space-y-4 font-sans">
                    <div className="space-y-2">
                      <p className="text-[11px] text-slate-300 font-black uppercase tracking-widest">📋 智能体团队联合编译的 4 大商业行动提案: </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11.5px] text-slate-300 bg-slate-900/60 p-4 rounded-xl border border-slate-800 font-sans select-text">
                        {simulationResults?.propositions.map((pText, pIdx) => (
                          <div key={pIdx} className="flex gap-2 items-start font-semibold leading-relaxed">
                            <span className="text-indigo-400 font-mono text-xs font-black">0{pIdx + 1}.</span>
                            <span className="text-slate-200">{pText}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 justify-end pt-2 flex-wrap">
                      {isSimPlanDeployed ? (
                        <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-xl px-5 py-3 text-emerald-400 text-xs font-black flex items-center gap-1.5 w-full justify-between animate-fadeIn select-text leading-relaxed">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>🚀 4 项博弈调节指令部署成功！全网租户前台定价、规则和 WMS 联动采购任务已注入就绪！</span>
                          </div>
                          <span className="text-slate-400 font-mono">STATUS: SYSTEM_LIVE_DEPLOYED</span>
                        </div>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              onAddSystemLog('Simulation Cockpit', '打回协同方案', '管理员驳回方案，重置博弈环境。', 'warning');
                              setCockpitPhase('idle');
                              setSimulationRoundtable([]);
                            }}
                            className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-extrabold text-[11px] px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
                          >
                            ✖ 驳回此圆桌博弈，手工改重
                          </button>
                          
                          <button
                            type="button"
                            onClick={executeSimulationPlanDeploy}
                            className="bg-emerald-600 hover:bg-emerald-550 border border-emerald-500 hover:scale-[1.01] active:scale-99 text-white font-black text-xs px-8 py-3.5 rounded-xl transition-all shadow-md shadow-emerald-700/10 flex items-center gap-2 cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>🚀 一键物理发布，并部署此协同博弈动作至全网租户店内</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Simulated Live Roundtable Dialgues in Terminal-like feed area */}
            {simulationRoundtable.length > 0 && (
              <div className="bg-slate-950 border border-slate-850 rounded-2xl p-5 space-y-4 shadow-inner text-left font-sans">
                <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest flex items-center gap-1 font-sans">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
                    <span>🧠 多智能体协同决策博弈圆桌会议实时流 (Decentralized Intelligence Roundtable Live Feed)</span>
                  </span>
                  <span className="font-mono text-[9px] text-[#9F7AEA] font-bold">STATE: COGNITIVE_ROUNDTABLE_LOOP</span>
                </div>

                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1 customize-scrollbar font-sans select-none">
                  {simulationRoundtable.map((step, sIdx) => {
                    let agentBorder = "border-slate-850 bg-slate-900/40";
                    let agentTag = "bg-indigo-600 text-indigo-100";
                    if (step.agent === 'pricing') {
                      agentBorder = "border-red-950/40 bg-red-955/5";
                      agentTag = "bg-red-650 text-red-100";
                    } else if (step.agent === 'inventory') {
                      agentBorder = "border-amber-950/40 bg-amber-955/5";
                      agentTag = "bg-amber-650 text-amber-900";
                    } else if (step.agent === 'marketing') {
                      agentBorder = "border-indigo-900/20 bg-indigo-950/5";
                      agentTag = "bg-indigo-600 text-indigo-100";
                    } else if (step.agent === 'risk') {
                      agentBorder = "border-emerald-950/40 bg-emerald-955/5";
                      agentTag = "bg-emerald-650 text-emerald-900";
                    }

                    return (
                      <div 
                        key={sIdx} 
                        className={`p-3.5 rounded-xl border ${agentBorder} flex gap-3 text-xs leading-relaxed transition-all animate-fadeIn text-left`}
                      >
                        <div className="w-9 h-9 rounded-full bg-slate-900/80 border border-slate-850 flex items-center justify-center shrink-0 shadow text-base">
                          {step.avatar}
                        </div>
                        <div className="space-y-1 my-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-slate-100">{step.name}</span>
                            <span className={`text-[9px] px-1.5 py-0.5 font-sans rounded leading-none font-bold ${agentTag}`}>
                              {step.role}
                            </span>
                          </div>
                          
                          <p className="text-slate-300 font-medium select-text font-sans mt-1">
                            {step.opinion}
                          </p>
                          
                          <div className="pt-2 select-text">
                            <span className="text-[10px] text-slate-400 bg-slate-900/85 px-2.5 py-1 rounded inline-block border border-slate-800 font-mono font-semibold leading-relaxed">
                              ⚖️ 【博弈与调控增益】 {step.tradeoffs}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 8 Operational Subtabs Row */}
          <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-lg">
            {[
              { id: 'agents', name: '🧠 智能体管理' },
              { id: 'workflows', name: '🔄 工作流管理' },
              { id: 'automations', name: '⚡ 自动化管理' },
              { id: 'kb', name: '📚 知识库管理' },
              { id: 'rules', name: '📏 规则管理' },
              { id: 'events', name: '📡 事件管理' },
              { id: 'tasks', name: '✅ 任务管理' },
              { id: 'monitor', name: '📈 执行监控' },
              { id: 'ollama', name: '🔌 Ollama 本地集成网关' }
            ].map(sub => (
              <button
                key={sub.id}
                onClick={() => setAiOpsSubTab(sub.id as any)}
                className={`px-3 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${aiOpsSubTab === sub.id ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'}`}
              >
                {sub.name}
              </button>
            ))}
          </div>

          {/* PART 1: 🧠 智能体管理 */}
          {aiOpsSubTab === 'agents' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-indigo-50 border border-indigo-200 text-indigo-900 p-4 rounded-xl text-xs leading-relaxed font-semibold">
                ℹ️ 平台级智能体独立核算：每个运行于商户店内的智能体均被赋予指定的月度运行资金与频次配额上限，防止由于调用流量泛洪造成过度扣费。您可在下方直接调配各核心智能体硬顶，运行诊断以校验多租户容器沙箱的活性。
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Agent lists table */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm lg:col-span-2 space-y-4 p-5">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">当前存活的系统级智能体注册表</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                          <th className="p-3">智能体名称</th>
                          <th className="p-3">主责运维范畴</th>
                          <th className="p-3">资金月配额</th>
                          <th className="p-3">调用健康度</th>
                          <th className="p-3">操盘</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-755">
                        {agents.map(ag => (
                          <tr key={ag.id} className="hover:bg-slate-50/50">
                            <td className="p-3">
                              <p className="font-bold text-slate-900">{ag.name}</p>
                              <p className="text-[10px] text-slate-400 font-mono mt-0.5">{ag.id.toUpperCase()}</p>
                            </td>
                            <td className="p-3 text-slate-550 font-medium">{ag.role}</td>
                            <td className="p-3 text-slate-800 font-bold font-mono">${ag.budget}</td>
                            <td className="p-3">
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded px-1.5 py-0.5">
                                <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                                {ag.successRate}% ({ag.runs.toLocaleString()} runs)
                              </span>
                            </td>
                            <td className="p-3">
                              <button 
                                onClick={() => {
                                  onAddSystemLog('Agent Supervisor', '智能体诊断', `对智能体 「${ag.name}」 进行多租户沙箱隔离诊断：通信反馈良好、可用。`, 'info');
                                  alert(`智能体 [${ag.name}] 诊断完成！\n- 沙箱物理隔离评估：100% 隔离\n- API 响应延迟：48ms\n- 当前状态：极佳`);
                                }}
                                className="bg-slate-100 hover:bg-slate-200 border border-slate-250 font-bold text-[10px] px-2 py-1 rounded cursor-pointer animate-pulse"
                              >
                                沙箱诊断
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Merchant Live Agents fleet list - Direct Connection */}
                  <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest border-b border-indigo-100 pt-6 pb-2">🏬 活跃租户店内部署运行中的多智能体员工</h3>
                  {activeAgents.length === 0 ? (
                    <p className="text-xs text-slate-400 py-4 font-semibold">暂无活跃的商户在店内召唤智能服务员工...</p>
                  ) : (
                    <div className="overflow-x-auto text-left font-sans">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                            <th className="p-3">部署智能体姓名</th>
                            <th className="p-3">所属微服务归属</th>
                            <th className="p-3">大业务职责描述</th>
                            <th className="p-3">自动化战果 (完成任务)</th>
                            <th className="p-3 text-center">超级管理员物理控制</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-705">
                          {activeAgents.map(ag => (
                            <tr key={ag.id} className="hover:bg-slate-50/50">
                              <td className="p-3 flex items-center gap-2">
                                <span className="text-base">{ag.emoji}</span>
                                <div>
                                  <p className="font-bold text-slate-900">{ag.name}</p>
                                  <p className="text-[10px] text-indigo-600 font-mono">{ag.id}</p>
                                </div>
                              </td>
                              <td className="p-3">
                                <span className="px-2 py-0.5 rounded font-bold text-[9px] bg-slate-100 text-slate-600">
                                  Default Live Store
                                </span>
                              </td>
                              <td className="p-3 text-slate-500 max-w-[200px] truncate">{ag.role}</td>
                              <td className="p-3">
                                <span className="font-mono font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                                  {ag.tasksCompleted || 0} 笔对账
                                </span>
                              </td>
                              <td className="p-3 text-center">
                                <div className="flex gap-1.5 justify-center font-sans">
                                  <button
                                    onClick={() => {
                                      onAddSystemLog('Agent Supervisor', '智能体热重启', `热重启商户店内智能体 「${ag.name}」 运行容器。`, 'info');
                                      alert(`智能体 [${ag.name}] 的隔离沙箱容器热重载完成，各微服务端口正常，状态：活跃。`);
                                    }}
                                    className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[10px] px-2 py-1 rounded border border-indigo-100 cursor-pointer"
                                  >
                                    物理重启
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (onUpdateAgents) {
                                        const filtered = activeAgents.filter(item => item.id !== ag.id);
                                        onUpdateAgents(filtered);
                                        onAddSystemLog('Agent Supervisor', '人工热停关断', `由于超配限制，超管操作撤回租户智能体 「${ag.name}」 系统承销授权。`, 'warning');
                                        alert(`商户店内智能体 [${ag.name}] 已被平台超管强制关闭物理吊销，运行资金已释放退回。`);
                                      }
                                    }}
                                    className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[10px] px-2 py-1 rounded border border-rose-100 cursor-pointer"
                                  >
                                    物理关断
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Provision custom core-agent */}
                <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-4 shadow-sm h-full">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">➕ 开通全新全局核心智能体</h3>
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!newAgentName) return;
                      const newAg = {
                        id: `agent_${Date.now()}`,
                        name: newAgentName,
                        role: newAgentRole || '通用智能自动化对账跟进',
                        budget: Number(newAgentBudget),
                        status: '运行中',
                        successRate: 100.0,
                        runs: 0
                      };
                      setAgents(prev => [...prev, newAg]);
                      onAddSystemLog('Agent Registry', '注册全新运维级智能体', `将智能体 「${newAgentName}」 注册至系统全局微内核`, 'success');
                      setNewAgentName('');
                      setNewAgentRole('');
                      setNewAgentBudget(1000);
                      alert(`全新超级智能体 [${newAgentName}] 已成功挂载，并推入全网商户可用租户集！`);
                    }}
                    className="space-y-4 text-xs font-semibold"
                  >
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">智能体英文与中文描述名</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. 邮件情绪风险阻断智能体" 
                        value={newAgentName}
                        onChange={e => setNewAgentName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">运维主责与数据流向归属</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. 自动评估跨境买家退款诉求真实情绪并挂起" 
                        value={newAgentRole}
                        onChange={e => setNewAgentRole(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">月度自动调度最高消费预算限额 ($)</label>
                      <input 
                        type="number" 
                        required 
                        value={newAgentBudget}
                        onChange={e => setNewAgentBudget(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-2 font-mono"
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-lg text-xs"
                    >
                      向物理计算底座挂载此智能体
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* PART 2: 🔄 工作流管理 */}
          {aiOpsSubTab === 'workflows' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-indigo-50 border border-indigo-200 text-indigo-900 p-4 rounded-xl text-xs font-bold leading-relaxed">
                ⚙️ 系统工作流拓扑拓补图 (Active Topologies)：每个商户都可以安装公共工作流，或利用开发者 SDK 注册新拓扑。点击「运行测试执行流」可产生一笔不影响商户资产的仿真流量对账流。
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {workflows.map(wf => (
                  <div key={wf.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                    <div className="flex justify-be                  <div className="space-y-4">
                    
                    {/* Failure case list */}
                    <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                      {failureCases.map(fc => (
                        <div key={fc.id} className="p-3 bg-slate-50 border border-slate-150 rounded-xl text-xs space-y-1.5 hover:border-slate-350 transition-colors">
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                              <span>【{fc.caseCode}】 {fc.title}</span>
                            </span>
                            <span className="font-mono font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2 rounded-sm text-[9.5px]">损失: {fc.lossAmount}</span>
                          </div>
                          <p className="text-[10px] text-slate-550 font-semibold leading-relaxed bg-white p-2 rounded border border-slate-100">
                            <span className="font-extrabold text-slate-700">现象：</span>{fc.symptom}
                          </p>
                          <div className="flex justify-between items-center text-[9.5px] font-bold">
                            <span className="text-emerald-700 flex items-center gap-1">🛡️ 预防防线：<span className="font-mono text-indigo-750">{fc.preventingRule}</span></span>
                            <span className="text-indigo-600">隔离层: {fc.industry}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Form to submit a new failure learning case */}
                    <div className="bg-slate-50 border border-slate-205 p-4 rounded-xl space-y-1.5">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-wide block">➕ 登记并从错误反面事故中学习 (注入 RAG)</span>
                      
                      <form onSubmit={handleCreateFailureCase} className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block text-[9px] font-bold text-slate-500 mb-0.5">意外/故障简称 (Title)</label>
                          <input 
                            type="text"
                            required
                            placeholder="e.g. 美容院技师重叠超载"
                            value={newFcTitle}
                            onChange={e => setNewFcTitle(e.target.value)}
                            className="w-full bg-white border border-slate-205 rounded px-2 py-1 text-[10px]"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] font-bold text-slate-500 mb-0.5">估计平台损耗金额</label>
                          <input�割到平台和商家账户', active: true },
                    { name: '欧洲各海运港口物流汇率配额拉取触发器', rate: '每4小时1次', latency: '280ms', desc: '拉取最新瑞士与法兰克福海关最新货柜起运关税并更新多租户物流总表', active: false }
                  ].map((auto, aIdx) => (
                    <div key={aIdx} className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-3 hover:border-slate-350 transition-colors flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center border-b border-slate-100 pb-1.5 mb-2">
                          <span className="font-bold text-slate-800">{auto.name}</span>
                          <span className={`w-2 h-2 rounded-full ${auto.active ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></span>
                        </div>
                        <p className="text-[11px] text-slate-450 leading-relaxed font-semibold">{auto.desc}</p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        <div className="flex justify-between text-[10px] font-mono text-slate-400 font-bold">
                          <span>频率: {auto.rate}</span>
                          <span>平均中后延时: {auto.latency}</span>
                        </div>
                        <button 
                          onClick={() => {
                            onAddSystemLog('Webhook Automation Regulator', '调试通道', `对「${auto.name}」下发并重新校准通信网络`, 'info');
                            alert(`调试连接正常！信道承载负荷均衡。`);
                          }}
                          className="w-full text-center py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-[#9F7AEA] font-bold text-[10px] cursor-pointer"
                        >
                          下发测试 ping 信号
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PART 4: 📚 知识库管理 (3-Layer Business Intelligence Center) */}
          {aiOpsSubTab === 'kb' && (
            <div className="space-y-8 animate-fadeIn text-slate-800">
              
              {/* Introduction Header Banner */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute -right-12 -top-12 w-48 h-48 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none"></div>
                
                <div className="flex items-start gap-4">
                  <span className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400 mt-1">
                    <Database className="w-6 h-6 text-indigo-400" />
                  </span>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-black text-white flex items-center gap-2">
                      <span>🧠 SaaS 平台级三层商业智能大底座 (3-Layer Business Intelligence Center)</span>
                      <span className="text-[9px] bg-indigo-600/40 text-indigo-300 font-mono font-bold px-2 py-0.5 rounded leading-none border border-indigo-500/30">L1 Docs + L2 Expert + L3 Safety</span>
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-4xl">
                      为什么智能底盘在真实的商业流程中“足够聪明且安全风险可控”？这利益于三层运营知识引擎的有机咬合：
                      <span className="text-indigo-400 font-bold">【第一层】私有SOP知识库</span>提供全网行业对账与标准理赔流基本法规；
                      <span className="text-indigo-400 font-bold">【第二层】商控专家运营经验门限</span>通过注入商业数学提示词规约 AI 调算毛利；
                      <span className="text-indigo-400 font-bold">【第三层】安全合规警戒线与大促失败归档集</span>提供极限拦截，双边阻止资产套利摩擦。
                    </p>
                  </div>
                </div>
              </div>

              {/* ----------------- LAYER 1: 私有 SOP 规范知识库 ----------------- */}
              <div className="bg-white border border-slate-205 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">1</span>
                    <div>
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Layer 1: 行业内部私有 SOP 文档库</h4>
                      <p className="text-xs font-bold text-slate-800 mt-1">控制 AI 员工常态流转的底层 SOP 与 FAQ 手册规制</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-indigo-600 bg-indigo-50 font-bold px-2 py-0.5 rounded-full">RAG Embedding Ready</span>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  
                  {/* Form to insert new SOP */}
                  <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl space-y-4">
                    <h5 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      <Plus className="w-4 h-4 text-indigo-600" />
                      <span>注入/更新行业私有 SOP</span>
                    </h5>
                    
                    <form onSubmit={handleCreateSop} className="space-y-3.5 text-xs">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1">SOP 标题 (Title)</label>
                        <input 
                          type="text"
                          required
                          value={newSopTitle}
                          onChange={e => setNewSopTitle(e.target.value)}
                          placeholder="例如：欧洲跨境服装退差价与二次折扣纠纷标准"
                          className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 focus:outline-indigo-600 text-[11px]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 mb-1">适用行业分类</label>
                          <select 
                            value={newSopIndustry}
                            onChange={e => setNewSopIndustry(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded px-1.5 py-1.5 focus:outline-indigo-600 text-[11px] font-medium"
                          >
                            <option value="fashion_wholesale">服装批发零售 (Retail)</option>
                            <option value="restaurant_takeout">餐馆外卖 (Food)</option>
                            <option value="general_merch_electronics">百货电器 (Manuf)</option>
                            <option value="beauty_booking">美容预约 (Service)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 mb-1">关联授权智能体</label>
                          <input 
                            type="text"
                            required
                            value={newSopAgent}
                            onChange={e => setNewSopAgent(e.target.value)}
                            placeholder="Pricing Agent"
                            className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 focus:outline-indigo-600 text-[11px]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1">SOP 执行文案内容 (作为 RAG 文本文档直接嵌入)</label>
                        <textarea 
                          rows={4}
                          required
                          value={newSopContent}
                          onChange={e => setNewSopContent(e.target.value)}
                          placeholder="在此框输入该合规条款。例如：退款上限控制在货款 15%以内，必须先上传瑕疵衣服照片且由人工复审方可通过..."
                          className="w-full bg-white border border-slate-200 rounded p-2 focus:outline-indigo-600 font-mono text-[10px] leading-relaxed"
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full text-center py-2 bg-slate-900 hover:bg-black text-white font-bold rounded-lg cursor-pointer text-[11px] transition-colors"
                      >
                        📥 一键提交合并并序列化哈希
                      </button>
                    </form>
                  </div>

                  {/* SOP Documents List Grid */}
                  <div className="xl:col-span-2 space-y-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">现已加载的平台通用 SOP 库</span>
                    
                    <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                      {privateSops.map((sop) => (
                        <div key={sop.id} className="p-4 bg-slate-50 border border-slate-150 rounded-xl hover:border-slate-350 transition-colors space-y-2">
                          <div className="flex items-center justify-between flex-wrap gap-2 text-xs border-b border-indigo-100/30 pb-1.5">
                            <div className="flex items-center gap-2">
                              <span className="bg-indigo-600/10 text-indigo-700 font-extrabold px-1.5 py-0.5 rounded text-[9.5px]">SOP-ID: {sop.id.toUpperCase()}</span>
                              <span className="font-bold text-slate-800">{sop.title}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px]">
                              <span className="text-slate-450 font-bold">行业:</span>
                              <span className="bg-slate-200 text-slate-705 font-bold px-1.5 py-0.2 rounded">{sop.industry}</span>
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.2 rounded border border-emerald-200">{sop.status}</span>
                            </div>
                          </div>

                          <p className="text-[10.5px] text-slate-650 font-semibold leading-relaxed bg-white p-2.5 rounded-lg border border-slate-100 italic">
                            💬 RAG 嵌入：{sop.content}
                          </p>
                          
                          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                            <span>已对公分发给 AI：<span className="text-[#9F7AEA]">{sop.agent}</span></span>
                            <button
                              type="button"
                              onClick={() => {
                                setPrivateSops(prev => prev.filter(s => s.id !== sop.id));
                                onAddSystemLog('Knowledge Engine', '注销 SOP 文案', `成功剥离 SOP《${sop.title}》文件嵌入向量`, 'warning');
                              }}
                              className="text-rose-600 hover:text-rose-800 p-1 rounded hover:bg-rose-50 cursor-pointer flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>注销文档</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* ----------------- LAYER 2: 专家核心运营经验与 RAG 提示词引擎 ----------------- */}
              <div className="bg-white border border-slate-205 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">2</span>
                    <div>
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Layer 2: 商家专属专家运营经验策略库</h4>
                      <p className="text-xs font-bold text-slate-800 mt-1">将大促打折公式等商业精选运营策略编译注入 AI 雇员的本能约束中</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-indigo-600 bg-indigo-50 font-bold px-2 py-0.5 rounded-full">Expert Acumen</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Expert Playbooks List */}
                  <div className="lg:col-span-2 space-y-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">现已就绪并分发至底层的商业专家策略</span>
                    
                    <div className="space-y-3">
                      {expertPlaybooks.map(pb => (
                        <div key={pb.id} className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-3">
                          <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <span className={`w-2.5 h-2.5 rounded-full ${pb.active ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></span>
                              <span className="font-bold text-slate-950 text-xs">{pb.name}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setExpertPlaybooks(prev => prev.map(p => p.id === pb.id ? { ...p, active: !p.active } : p));
                                onAddSystemLog('Expert Playbook Operator', '切换策略就绪状态', `置「${pb.name}」状态为 ${!pb.active ? '启用' : '暂停'}`, 'info');
                              }}
                              className={`text-[9.5px] px-2.5 py-0.5 rounded font-bold border cursor-pointer ${
                                pb.active ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-slate-150 text-slate-500 border-slate-200'
                              }`}
                            >
                              {pb.active ? '✅ 已绑定注入' : '⏸ 暂停注入'}
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
                            <div>
                              <span className="text-[9.5px] text-slate-400 block uppercase">控制触发阈值参数</span>
                              <p className="text-slate-800">{pb.metricRule}</p>
                            </div>
                            <div>
                              <span className="text-[9.5px] text-slate-400 block uppercase">主控目标 AI 员工</span>
                              <p className="text-[#9F7AEA]">{pb.targetAgent}</p>
                            </div>
                          </div>

                          <div className="bg-white p-2.5 rounded border border-slate-100 font-mono text-[10px] text-indigo-950 font-bold leading-normal">
                            🛡️ 专家决策本能约束提示词模态：<br/>"{pb.promptTemplate}"
                          </div>

                          <div className="flex items-center justify-between text-[10px]">
                            <span className="text-slate-400 font-bold">上次沙箱编译评测: <span className="text-indigo-600 font-mono">{pb.lastSimulated}</span></span>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedPlaybookSimId(pb.id);
                                handleSimulatePlaybook(pb.id);
                              }}
                              className="text-[#9F7AEA] hover:text-indigo-805 font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <Play className="w-3.5 h-3.5 fill-[#9F7AEA] hover:fill-indigo-800" />
                              <span>调试模拟编译专家策略</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sandboxed Compilation Simulator Output */}
                  <div className="bg-slate-900 text-slate-100 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between font-mono h-full min-h-[380px]">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-[11px] text-amber-400 font-bold flex items-center gap-1.5">
                          <SlidersHorizontal className="w-4 h-4" />
                          <span>策略沙箱预编译调试屏</span>
                        </span>
                        <span className="text-[9px] bg-indigo-500/10 text-indigo-400 px-1.5 rounded border border-indigo-400/20 uppercase">Simulator</span>
                      </div>

                      {/* Simulator Loading or Null Screen */}
                      {isSimulatingPlaybook && (
                        <div className="py-20 flex flex-col items-center justify-center gap-2">
                          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                          <p className="text-[11px] text-slate-400 animate-pulse font-bold mt-2">正在载入 SOP，扫描 Layer-3 价格及资金合规红线...</p>
                        </div>
                      )}

                      {!isSimulatingPlaybook && !playbookSimResult && (
                        <div className="py-12 text-center text-slate-500 text-[10.5px]">
                          <Database className="w-8 h-8 text-slate-600 mx-auto mb-2 opacity-50" />
                          <p>请在左侧选择具体专家策略，点击「调试模拟编译专家策略」</p>
                          <p className="mt-1">点击按钮将自动进行 RAG 对账检查，并输出编译后的 LLM 指令覆盖状态。</p>
                        </div>
                      )}

                      {!isSimulatingPlaybook && playbookSimResult && (
                        <div className="space-y-3.5 text-[10px]">
                          <div>
                            <span className="text-slate-450 text-[9px] block uppercase font-sans font-bold">自检校验路线 Logs:</span>
                            <div className="bg-black/40 border border-slate-800/80 rounded p-2 text-slate-300 leading-normal max-h-40 overflow-y-auto space-y-1">
                              {playbookSimResult.sandboxLogs.map((log, lIdx) => (
                                <div key={lIdx} className="border-b border-slate-900 pb-1 last:border-0">{log}</div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="text-slate-450 text-[9px] block uppercase font-sans font-bold">编译状态 (Agent Status):</span>
                            <span className="text-emerald-400 font-bold">{playbookSimResult.agentStatus}</span>
                          </div>

                          <div>
                            <span className="text-slate-450 text-[9px] block uppercase font-sans font-bold">最终注入 LLM 的指令块 OVERRIDE:</span>
                            <pre className="bg-slate-950 border border-slate-800 text-slate-400 p-2.5 rounded-lg overflow-x-auto text-[9.5px] leading-snug whitespace-pre-wrap max-h-48 overflow-y-auto">
                              {playbookSimResult.compiledPrompt}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>

                    {!isSimulatingPlaybook && playbookSimResult && (
                      <button
                        type="button"
                        onClick={() => {
                          onAddSystemLog('Expert Core', '一键热更部署', '专家组策略已被强制锁定更新至 Shopify AI 沙盒底座！', 'success');
                          alert('【LLM 参数热更成功】\n- 该专家运营策略现已锁死绑定进租户 API。\n- 当多租户内 AI 侦测 to 对应售罄/库存阀值时，将自动遵守此策略。');
                        }}
                        className="w-full text-center py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded cursor-pointer text-[10px] mt-2 text-sans"
                      >
                        ⚡ 批准并正式下派至租户网格 RAG 
                      </button>
                    )}
                  </div>

                </div>
              </div>

              {/* ----------------- LAYER 3: 安全合规红线与失败/成功案例审计库 ----------------- */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                
                {/* 3A: Safety Red-lines */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
                  <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">3A</span>
                      <div>
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Layer 3: 异常资损安全拦截红线</h4>
                        <p className="text-xs font-bold text-slate-800 mt-1">系统硬代码限制：底盘不可逾越的防御界限</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    {safetyRedLines.map(rl => (
                      <div key={rl.id} className="p-4 bg-slate-50 border border-slate-150 rounded-xl flex items-start gap-3 hover:border-slate-350 transition-colors">
                        <span className="mt-1">
                          {rl.enabled ? (
                            <ShieldCheck className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <Shield className="w-5 h-5 text-slate-300" />
                          )}
                        </span>
                        
                        <div className="flex-1 space-y-1.5 text-xs font-semibold">
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-slate-900 leading-snug">{rl.name}</span>
                            <span className="text-[9px] bg-slate-250 text-slate-650 font-mono font-bold px-1.5 rounded">{rl.auditType}</span>
                          </div>
                          <p className="text-[11px] text-slate-450 leading-relaxed font-semibold">{rl.description}</p>
                          
                          <div className="flex justify-between items-center pt-1">
                            <span className="text-[10px] font-bold text-slate-450 font-sans">防护状态：
                              <span className={rl.enabled ? "text-emerald-600" : "text-rose-650"}> {rl.enabled ? "✔ 强制强控拦截生效中" : "❌ 已允许绕过警示"}</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => toggleSafetyRedLine(rl.id)}
                              className={`px-2.5 py-0.5 rounded text-[9.5px] font-black border cursor-pointer ${
                                rl.enabled ? 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100' : 'bg-emerald-50 border-emerald-250 text-emerald-700 hover:bg-emerald-100'
                              }`}
                            >
                              {rl.enabled ? "🟠 降防绕过" : "🟢 强制开启防线"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3B: Loss Prevention Case Studies Database */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
                  <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">3B</span>
                      <div>
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Layer 3: 异常资损事故学习归档规约</h4>
                        <p className="text-xs font-bold text-slate-800 mt-1">累积失败案例，保障 AI 绝不重复犯同样的低级商业错误</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    
                    {/* Failure c              {/* Stacked Left Column */}
              <div className="space-y-6">
                {/* Approvals */}
                <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-4 shadow-sm">
                  <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
                    <h3 className="text-xs font-extrabold text-[#9F7AEA] uppercase tracking-wider flex items-center gap-1.5">
                      <Check className="w-4 h-4" />
                      <span>特批任务流核定 (Pending Approvals)</span>
                    </h3>
                    <span className="font-mono text-[10.5px] text-[#9F7AEA] font-bold">({pendingApprovals.length}) 条待审</span>
                  </div>

                  {pendingApprovals.length === 0 ? (
                    <p className="text-xs text-slate-455 font-medium py-6 text-center">🎉 无高危挂起待核准事务，符合系统预设</p>
                  ) : (
                    <div className="space-y-3">
                      {pendingApprovals.map(apr => (
                        <div key={apr.id} className="p-3 bg-indigo-50/40 border border-[#9F7AEA]/20 rounded-lg text-xs space-y-2">
                          <div className="flex justify-between font-bold text-slate-500 text-[10px]">
                            <span className="truncate max-w-[150px]">{apr.tenant}</span>
                            <span>{apr.time}</span>
                          </div>
                          <p className="font-bold text-slate-900">{apr.action}</p>
                          <p className="text-[10px] text-slate-500 italic mt-1 font-medium bg-white p-1.5 rounded">{apr.reason}</p>
                          <div className="flex justify-end gap-2 pt-1">
                            <button 
                              onClick={() => {
                                setPendingApprovals(prev => prev.filter(p => p.id !== apr.id));
                                onAddSystemLog('Rules Approver', '特批驳回关断', `驳回特批流: ${apr.action}`, 'warning');
                              }}
                              className="bg-white hover:bg-rose-50 text-rose-600 font-extrabold px-2.5 py-1 rounded text-[10px] border border-rose-250 cursor-pointer transition-colors"
                            >
                              阻断驳回
                            </button>
                            <button 
                              onClick={() => {
                                setPendingApprovals(prev => prev.filter(p => p.id !== apr.id));
                                onAddSystemLog('Rules Approver', '特批授权放行', `批准放行特批流: ${apr.action}`, 'success');
                                alert('特批放行指令发送成功！数据逻辑已自动对账写入对应企业账房。');
                              }}
                              className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold px-2.5 py-1 rounded text-[10px] cursor-pointer transition-colors"
                            >
                              核准通过
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* AI Agent Orchestration Run Logs */}
                <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-4 shadow-sm">
                  <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
                    <h3 className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
                      <SlidersHorizontal className="w-4 h-4 text-indigo-505" />
                      <span>底层活跃作业流 (Agent Runtime Runs)</span>
                    </h3>
                    <span className="font-mono text-[10px] text-indigo-550 font-bold">({agentRuns?.length || 0}) 跑通</span>
                  </div>

                  <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                    {agentRuns && agentRuns.map(run => (
                      <div key={run.id} className="p-3 bg-slate-50 border border-slate-150 rounded-xl text-xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-black text-slate-800 text-[11px] truncate max-w-[130px]">{run.agentName}</span>
                          <span className={`px-2 py-0.2 rounded-full font-mono text-[9px] font-bold border ${
                            run.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-indigo-50 text-indigo-700 border-indigo-150 animate-pulse'
                          }`}>
                            {run.status === 'COMPLETED' ? 'SUCCESS' : 'RUNNING'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] text-slate-450 font-bold">
                          <span>租户: <span className="text-slate-700">{run.tenantId}</span></span>
                          <span className="font-mono">{run.startedAt?.substring(11, 19)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>  <input 
                            type="text"
                            required
                            placeholder="e.g. €1,200"
                            value={newFcLoss}
                            onChange={e => setNewFcLoss(e.target.value)}
                            className="w-full bg-white border border-slate-205 rounded px-2 py-1 text-[10px]"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-[9px] font-bold text-slate-500 mb-0.5">故障经过与现象 (Symptom context for AI anti-RAG)</label>
                          <textarea 
                            rows={2}
                            required
                            value={newFcSymptom}
                            onChange={e => setNewFcSymptom(e.target.value)}
                            placeholder="请描述具体发生的问题...AI 将其作为反面例子加入 prompt 中。"
                            className="w-full bg-white border border-slate-205 rounded p-1.5 font-mono text-[10px] leading-relaxed"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-[9px] font-bold text-slate-500 mb-0.5">绑定的对应安全红线/规约约束规则</label>
                          <input 
                            type="text"
                            placeholder="e.g. 引入 Layer-1 SOP 中第 4 条强制对客核验"
                            value={newFcRule}
                            onChange={e => setNewFcRule(e.target.value)}
                            className="w-full bg-white border border-slate-205 rounded px-2 py-1 text-[10px]"
                          />
                        </div>

                        <button 
                          type="submit"
                          className="md:col-span-2 text-center py-2 bg-indigo-650 hover:bg-indigo-700 text-white font-bold rounded cursor-pointer text-[10px] transition-colors"
                        >
                          📥 登记审计并加入反面引导 prompt 规则库
                        </button>
                      </form>
                    </div>

                  </div>
                </div>

              </div>
              
            </div>
          )}

          {/* PART 5: 📏 规则管理 */}
          {aiOpsSubTab === 'rules' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
              <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-4 shadow-sm h-full font-semibold">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">➕ 注入系统全局默认 IF-THEN 自动规程</h3>
                <form onSubmit={handleAddRule} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-500 mb-1">IF（当触发指定业务界定警戒）</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 客户消费金额累计超过 500 EUR"
                      value={newRuleIf}
                      onChange={e => setNewRuleIf(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-2 text-[11px] text-slate-800 focus:outline-[#9F7AEA]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-500 mb-1">THEN（自动下发特批任务）</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 分配专属客户跟进并下发专属关怀邮件"
                      value={newRuleThen}
                      onChange={e => setNewRuleThen(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-2 text-[11px] text-slate-800 focus:outline-[#9F7AEA]"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-slate-900 hover:bg-black text-white py-2 rounded-md font-bold text-[11px] cursor-pointer transition-colors"
                  >
                    注入全局决策数据库
                  </button>
                </form>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm lg:col-span-2 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                  🛡️ 规则数据库 (Rule Presets - 类似于 Shopify Flow )
                </h3>

                <div className="space-y-2">
                  {rules.map(rule => (
                    <div key={rule.id} className="p-3.5 bg-slate-50 border border-slate-150 rounded-lg flex items-center justify-between text-xs">
                      <div className="space-y-1.5 pr-4">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="bg-indigo-600 text-white font-extrabold px-1.5 py-0.5 rounded text-[9px] font-mono leading-none">IF</span>
                          <span className="text-slate-900 font-bold">{rule.ifCondition}</span>
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="bg-emerald-600 text-white font-extrabold px-1.5 py-0.5 rounded text-[9px] font-mono leading-none">THEN</span>
                          <span className="text-slate-700 font-semibold">{rule.thenAction}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 shrink-0 font-mono text-[10px] font-bold">
                        <div>
                          <p className="text-slate-400 text-right">触发行数</p>
                          <p className="text-indigo-700 text-right text-xs font-black">{rule.runs.toLocaleString()}</p>
                        </div>
                        <button 
                          onClick={() => {
                            setRules(prev => prev.filter(r => r.id !== rule.id));
                            onAddSystemLog('Rule Engine', '删除系统默认规则', `剥离系统规则IF: ${rule.ifCondition}`, 'warning');
                          }}
                          className="text-rose-650 hover:text-rose-800 p-1 rounded hover:bg-rose-50 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PART 6: 📡 事件管理 */}
          {aiOpsSubTab === 'events' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-900 text-white p-5 rounded-xl flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1 max-w-xl">
                  <h3 className="font-bold text-sm text-amber-400 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-amber-500 animate-pulse" />
                    <span>SaaS 底座全网实时事件流 (Real-time Event Bus Tracer)</span>
                  </h3>
                  <p className="text-[11px] text-slate-300 leading-normal">
                    追踪各物理隔离租户发生的关键交易、库存警戒或 RAG 任务。您可以模拟下发特定的业务事件，验证底层流转规则链对于此事件的捕获及下发。
                  </p>
                </div>

                {/* Quick fake trigger injection */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      const rHex = `ev_tx_${Math.random().toString(16).substr(2, 4)}`;
                      const newE = {
                        id: rHex,
                        timestamp: new Date().toISOString().replace('T', ' ').substr(0, 19),
                        eventName: 'ORDER_PAID',
                        tenant: 'tenant_retail_milan',
                        payload: { orderId: `ord_tr_${Math.floor(Math.random() * 9000 + 1000)}`, amount: parseFloat((Math.random() * 800 + 200).toFixed(2)), currency: 'EUR', isVip: Math.random() > 0.5 }
                      };
                      setEventStream(prev => [newE, ...prev]);
                      onAddSystemLog('Event Router', '下发业务模拟事件', '触发全局 ORDER_PAID 监听单元并通过', 'success');
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-all"
                  >
                    🚀 注入模拟 ORDER_PAID 事件
                  </button>
                  <button 
                    onClick={() => {
                      const rHex = `ev_tx_${Math.random().toString(16).substr(2, 4)}`;
                      const newE = {
                        id: rHex,
                        timestamp: new Date().toISOString().replace('T', ' ').substr(0, 19),
                        eventName: 'SKU_INVENTORY_LOW',
                        tenant: 'tenant_healthcare_pos',
                        payload: { sku: 'SKU-HEALTH-OMEGA3', stockLeft: 4, triggerPoint: 15 }
                      };
                      setEventStream(prev => [newE, ...prev]);
                      onAddSystemLog('Event Router', '下发库存警戒模拟事件', '触发全局 SKU_INVENTORY_LOW 监听单元', 'warning');
                    }}
                    className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-all"
                  >
                    ⚠️ 注入模拟 SKU_INVENTORY_LOW 事件
                  </button>
                </div>
              </div>

              {/* Event Streams Table */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                        <th className="p-3 font-mono">事件 Hex_ID</th>
                        <th className="p-3">事件戳记</th>
                        <th className="p-3">触发事件名 (eventName)</th>
                        <th className="p-3">事件引发租户</th>
                        <th className="p-3">承载 JSON 载荷 (payload)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono text-slate-700 text-[11px]">
                      {eventStream.map(evt => (
                        <tr key={evt.id} className="hover:bg-slate-50/50">
                          <td className="p-3 text-[#9F7AEA] font-bold">{evt.id}</td>
                          <td className="p-3 text-slate-400">{evt.timestamp}</td>
                          <td className="p-3 font-bold text-slate-900">
                            <span className={`px-2 py-0.5 rounded border font-sans text-[10px] ${
                              evt.eventName === 'ORDER_PAID' ? 'bg-emerald-50 text-emerald-800 border-emerald-100' :
                              evt.eventName === 'SKU_INVENTORY_LOW' ? 'bg-rose-50 text-rose-800 border-rose-100' :
                              'bg-slate-100 text-slate-800 border-slate-200'
                            }`}>
                              {evt.eventName}
                            </span>
                          </td>
                          <td className="p-3 font-sans font-semibold text-slate-550">{evt.tenant}</td>
                          <td className="p-3">
                            <pre className="text-[10px] bg-slate-50 border border-slate-100 text-slate-500 rounded p-1.5 overflow-x-auto max-w-[400px]">
                              {JSON.stringify(evt.payload, null, 2)}
                            </pre>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* PART 7: ✅ 任务管理 */}
          {aiOpsSubTab === 'tasks' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* SECTION 1: 🧠 AGENT INTENT & APPROVAL PIPELINES */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span className="p-1.5 bg-indigo-50 text-indigo-650 rounded-lg">🧠</span>
                      <span>智能决策意图转译与人工安全审计台 (AI Agent Decisions & Human Approval Desk)</span>
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">Fashion Wholesale / 米兰风尚大促营销、毛利定价提案。审核后，可一键批量激活注入多商户流网，完成闭环。</p>
                  </div>
                  <span className="text-[10px] bg-amber-50 text-amber-600 border border-amber-250 px-2.5 py-1 rounded-full font-bold animate-pulse">
                    🛡️ Dual-Control Clearance Active
                  </span>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                        <th className="p-4">决策意图提案 ID / 创时刻</th>
                        <th className="p-4">发起 AI 雇员</th>
                        <th className="p-4">租户归属</th>
                        <th className="p-4">毛利率预算 / 执行进度</th>
                        <th className="p-4">当前算力状态</th>
                        <th className="p-4 text-right">人工核决操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {agentTasks && agentTasks.length > 0 ? (
                        agentTasks.map(task => (
                          <tr key={task.id} className="hover:bg-slate-50/40 transition-colors">
                            <td className="p-4">
                              <div className="font-bold text-slate-900">{task.name}</div>
                              <div className="text-[10px] text-slate-400 font-mono mt-0.5">ID: {task.id} • {task.createdAt?.substring(0, 16).replace('T', ' ')}</div>
                            </td>
                            <td className="p-4">
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-bold text-[10px]">
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  task.sourceAgent === 'Sophia (Product Listing)' ? 'bg-[#9F7AEA]' : 'bg-indigo-500'
                                }`}></span>
                                {task.sourceAgent || 'SystemAgent'}
                              </span>
                            </td>
                            <td className="p-4 font-semibold text-slate-600">t_retail (米兰风尚)</td>
                            <td className="p-4">
                              <div className="flex items-center gap-2 max-w-[120px]">
                                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full transition-all duration-500 rounded-full ${
                                      task.status === 'COMPLETED' ? 'bg-emerald-500' :
                                      task.status === 'EXECUTING' ? 'bg-indigo-500 animate-pulse' :
                                      task.status === 'APPROVED' ? 'bg-sky-500' : 'bg-slate-300'
                                    }`}
                                    style={{ width: `${task.progress || 0}%` }}
                                  ></div>
                                </div>
                                <span className="font-mono text-[10px] font-bold text-slate-550">{task.progress || 0}%</span>
                              </div>
                            </td>
                            <td className="p-4 text-xs font-semibold">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                                task.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                task.status === 'EXECUTING' ? 'bg-indigo-50 text-indigo-700 border-indigo-200 animate-pulse' :
                                task.status === 'APPROVED' ? 'bg-sky-50 text-sky-700 border-sky-100' :
                                task.status === 'PENDING_APPROVAL' ? 'bg-amber-50 text-amber-700 border-amber-100 font-extrabold pb-0.5' :
                                'bg-slate-100 text-slate-600 border-slate-200'
                              }`}>
                                <span className={`w-1 h-1 rounded-full ${
                                  task.status === 'COMPLETED' ? 'bg-emerald-500' :
                                  task.status === 'EXECUTING' ? 'bg-indigo-500' :
                                  task.status === 'PENDING_APPROVAL' ? 'bg-amber-500 animate-pulse' : 'bg-slate-400'
                                }`}></span>
                                {task.status === 'COMPLETED' && '🟢 核算已扣账'}
                                {task.status === 'EXECUTING' && '⚡ 多渠道执行中'}
                                {task.status === 'APPROVED' && '✅ 空置待投执'}
                                {task.status === 'PENDING_APPROVAL' && '⏳ 待双清特批'}
                                {task.status === 'DRAFT' && '📐 商业草案'}
                                {task.status === 'CANCELLED' && '❌ 流程已中止'}
                              </span>
                            </td>
                            <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                              {(task.status === 'PENDING_APPROVAL' || task.status === 'DRAFT') && (
                                <button
                                  onClick={async () => {
                                    try {
                                      const res = await fetch('/api/db/approve-task', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ taskId: task.id, action: 'APPROVE' })
                                      });
                                      if (res.ok) {
                                        const data = await res.json();
                                        if (data.success) {
                                          if (setAgentTasks) setAgentTasks(data.allTasks);
                                          if (setAuditLogs) setAuditLogs(data.allLogs);
                                          onAddSystemLog('Agent Task System', '特批核决', `锁定并放行提案「${task.name}」`, 'success');
                                        }
                                      }
                                    } catch (err) { console.error(err); }
                                  }}
                                  className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded text-[10px] font-bold text-indigo-650 cursor-pointer shadow-sm"
                                >
                                  👍 安全合准放行
                                </button>
                              )}
                              {task.status === 'APPROVED' && (
                                <button
                                  onClick={async () => {
                                    try {
                                      const res = await fetch('/api/db/approve-task', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ taskId: task.id, action: 'EXECUTE' })
                                      });
                                      if (res.ok) {
                                        const data = await res.json();
                                        if (data.success) {
                                          if (setAgentTasks) setAgentTasks(data.allTasks);
                                          if (setAuditLogs) setAuditLogs(data.allLogs);
                                          onAddSystemLog('Agent Task System', '强制广播', `调度中心激活多租户物理更新:「${task.name}」`, 'info');
                                          
                                          // Simulate async transition to completed 
                                          setTimeout(async () => {
                                            const completeRes = await fetch('/api/db/approve-task', {
                                              method: 'POST',
                                              headers: { 'Content-Type': 'application/json' },
                                              body: JSON.stringify({ taskId: task.id, action: 'COMPLETE' })
                                            });
                                            if (completeRes.ok) {
                                              const finishData = await completeRes.json();
                                              if (finishData.success) {
                                                if (setAgentTasks) setAgentTasks(finishData.allTasks);
                                                if (setAuditLogs) setAuditLogs(finishData.allLogs);
                                              }
                                            }
                                          }, 3500);
                                        }
                                      }
                                    } catch (err) { console.error(err); }
                                  }}
                                  className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-[10px] font-bold text-white rounded cursor-pointer shadow-sm"
                                >
                                  🚀 批量指令同步 (Inject Sync)
                                </button>
                              )}
                              {(task.status === 'PENDING_APPROVAL' || task.status === 'DRAFT' || task.status === 'APPROVED') && (
                                <button
                                  onClick={async () => {
                                    try {
                                      const res = await fetch('/api/db/approve-task', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ taskId: task.id, action: 'CANCEL' })
                                      });
                                      if (res.ok) {
                                        const data = await res.json();
                                        if (data.success) {
                                          if (setAgentTasks) setAgentTasks(data.allTasks);
                                          if (setAuditLogs) setAuditLogs(data.allLogs);
                                          onAddSystemLog('Agent Task System', '废止提案', `用户强制斩断执行序列 ${task.name}`, 'warning');
                                        }
                                      }
                                    } catch (err) { console.error(err); }
                                  }}
                                  className="px-2 py-1 bg-white hover:bg-red-50 text-[10px] text-rose-600 border border-slate-200 rounded cursor-pointer"
                                >
                                  🛑 降退废止
                                </button>
                              )}
                              {task.status === 'COMPLETED' && (
                                <span className="text-[10px] text-emerald-600 font-bold">✓ 审计闭环安全核决</span>
                              )}
                              {task.status === 'CANCELLED' && (
                                <span className="text-[10px] text-slate-400 font-medium font-mono">CANCELLED REFUNDED</span>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-slate-400">
                            暂空决策审批流，系统运行处于默认状态。
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SECTION 2: SYSTEM BACKGROUND WORKER ASYNC ENGINE */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="p-1.5 bg-slate-100 text-slate-650 rounded-lg">📡</span>
                    <span>底座系统高频异步计算容器协程 (Background Worker Pipeline Matrix)</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">下方表格追踪了多租户核心流程中异步消费的高频分析计算。作为平台全系统控制台运维，您有权在这里对其强制启用或暂停，重置底层计算数值。</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                        <th className="p-4">任务名称</th>
                        <th className="p-4">对应计算范围</th>
                        <th className="p-4">任务底层可用状态</th>
                        <th className="p-4 font-mono">推理对账成功率</th>
                        <th className="p-4 font-mono">全网调用计数</th>
                        <th className="p-4 text-right">人工操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {aiTasks.map(task => (
                        <tr key={task.id} className="hover:bg-slate-50/50">
                          <td className="p-4 font-bold text-slate-900">{task.name}</td>
                          <td className="p-4 text-slate-550 font-medium">
                            {task.id === 'categorization' && '商品分类哈希分发与 Shopify Category 转换目录'}
                            {task.id === 'translation' && '德言意法语种全自动秒级合规对照映射'}
                            {task.id === 'labeling' && '产品描述提取买家搜索标签分值对账'}
                            {task.id === 'risk_check' && '账期清结算高危信用卡反套利套卡筛查'}
                            {task.id === 'customer_seg' && '回流促活消费模型分群对账'}
                            {task.id === 'feedback_analysis' && '评论语境提取情绪对账'}
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${
                              task.status === '运行中' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-155 text-slate-600 border-slate-200'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${task.status === '运行中' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                              {task.status}
                            </span>
                          </td>
                          <td className="p-4 font-mono font-bold text-indigo-700">{task.successRate}%</td>
                          <td className="p-4 font-mono font-bold text-slate-700">{task.totalRuns.toLocaleString()}</td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => {
                                const newStatus = task.status === '运行中' ? '被关断' : '运行中';
                                setAiTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: newStatus } : t));
                                onAddSystemLog('Task Administrator', '切换任务状态', `强制设置「${task.name}」可用性为 ${newStatus}`, newStatus === '运行中' ? 'success' : 'warning');
                              }}
                              className={`px-3 py-1 bg-white hover:bg-slate-100 text-xs font-bold border rounded-lg cursor-pointer ${
                                task.status === '运行中' ? 'text-rose-600 border-rose-200' : 'text-emerald-600 border-emerald-250'
                              }`}
                            >
                              {task.status === '运行中' ? '🔴 紧急闭停' : '🟢 恢复调度'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* PART 8: 📈 执行监控 */}
          {aiOpsSubTab === 'monitor' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
              
              {/* Approvals */}
              <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-4 shadow-sm">
                <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
                  <h3 className="text-xs font-extrabold text-[#9F7AEA] uppercase tracking-wider flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    <span>特批任务流核定 (Pending Approvals)</span>
                  </h3>
                  <span className="font-mono text-[10.5px] text-[#9F7AEA] font-bold">({pendingApprovals.length}) 条待审</span>
                </div>

                {pendingApprovals.length === 0 ? (
                  <p className="text-xs text-slate-450 font-medium py-6 text-center">🎉 无高危挂起待核准事务，符合系统预设</p>
                ) : (
                  <div className="space-y-3">
                    {pendingApprovals.map(apr => (
                      <div key={apr.id} className="p-3 bg-indigo-50/40 border border-[#9F7AEA]/20 rounded-lg text-xs space-y-2">
                        <div className="flex justify-between font-bold text-slate-500 text-[10px]">
                          <span className="truncate max-w-[150px]">{apr.tenant}</span>
                          <span>{apr.time}</span>
                        </div>
                        <p className="font-bold text-slate-900">{apr.action}</p>
                        <p className="text-[10px] text-slate-500 italic mt-1 font-medium bg-white p-1.5 rounded">{apr.reason}</p>
                        <div className="flex justify-end gap-2 pt-1">
                          <button 
                            onClick={() => {
                              setPendingApprovals(prev => prev.filter(p => p.id !== apr.id));
                              onAddSystemLog('Rules Approver', '特批驳回关断', `驳回特批流: ${apr.action}`, 'warning');
                            }}
                            className="bg-white hover:bg-rose-50 text-rose-600 font-extrabold px-2.5 py-1 rounded text-[10px] border border-rose-250 cursor-pointer transition-colors"
                          >
                            阻断驳回
                          </button>
                          <button 
                            onClick={() => {
                              setPendingApprovals(prev => prev.filter(p => p.id !== apr.id));
                              onAddSystemLog('Rules Approver', '特批授权放行', `批准放行特批流: ${apr.action}`, 'success');
                              alert('特批放行指令发送成功！数据逻辑已自动对账写入对应企业账房。');
                            }}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold px-2.5 py-1 rounded text-[10px] cursor-pointer transition-colors"
                          >
                            核准通过
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Exception Automation Tasks */}
              <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-4 shadow-sm lg:col-span-2">
                <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
                  <h3 className="text-xs font-extrabold text-rose-600 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>执行层异常任务告警 (Infrastructure Exception Logs)</span>
                  </h3>
                  <span className="font-mono text-[10.5px] text-rose-600 font-bold">({exceptionTasks.filter(e=>!e.resolved).length}) 条阻断警告</span>
                </div>

                <div className="space-y-2">
                  {exceptionTasks.map(exc => (
                    <div key={exc.id} className={`p-3 rounded-lg border text-xs flex items-center justify-between ${exc.resolved ? 'bg-slate-50 border-slate-200 opacity-60' : 'bg-rose-50/50 border-rose-200'}`}>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded text-[9px] uppercase leading-none font-mono">FAILS</span>
                          <span className="font-bold text-slate-900">{exc.task}</span>
                          <span className="text-slate-400">|</span>
                          <span className="text-slate-550 font-semibold">{exc.tenant}</span>
                        </div>
                        <p className="font-mono text-[11px] text-rose-600 font-bold bg-white/70 p-1.5 rounded border border-rose-100/40">{exc.error}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{exc.time}</p>
                      </div>

                      <div className="shrink-0">
                        {exc.resolved ? (
                          <span className="text-slate-500 font-bold text-[10px]">已标记解决</span>
                        ) : (
                          <div className="flex gap-2">
                            <button 
                              onClick={() => {
                                  setExceptionTasks(prev => prev.map(e => e.id === exc.id ? { ...e, resolved: true } : e));
                                  onAddSystemLog('Exception Handler', '消除告警', `手动将「${exc.task}」告警标记为已清除`, 'info');
                                }}
                              className="bg-white hover:bg-slate-105 text-slate-600 font-bold px-2.5 py-1 rounded text-[10px] border border-slate-200 cursor-pointer"
                            >
                              忽略置灰
                            </button>
                            <button 
                              onClick={() => {
                                  onAddSystemLog('Exception Handler', '重试自动化任务', `重新序列下发「${exc.task}」至多租户隔离计算池`, 'info');
                                  setExceptionTasks(prev => prev.map(e => e.id === exc.id ? { ...e, resolved: true } : e));
                                  alert('执行层任务重试成功！下游反馈已经顺利通过。');
                                }}
                              className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold px-2.5 py-1 rounded text-[10px] cursor-pointer transition-colors"
                            >
                              立即重试
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* PART 9: 🔌 Ollama 本地集成网关 */}
          {aiOpsSubTab === 'ollama' && (
            <div className="space-y-8 animate-fadeIn text-slate-800">
              
              {/* Introduction Banner */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute -right-12 -top-12 w-48 h-48 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="flex items-start gap-4">
                  <span className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400 mt-1">
                    <Network className="w-6 h-6 text-indigo-400" />
                  </span>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-black text-white flex items-center gap-2">
                      <span>🔌 Ollama 本端大模型中继 & 3层安全过滤器 (Ollama Gateway & Guardrails Proxy)</span>
                      <span className="text-[9px] bg-indigo-600/40 text-indigo-300 font-mono font-bold px-2 py-0.5 rounded leading-none border border-indigo-500/30">Local Model Gateway</span>
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-4xl">
                      商控架构和底层大模型天然解耦。平台支持无缝对接本地 <span className="text-white font-bold">Ollama</span> 服务运行流。通过内置的「3层对账过滤器」进行 RAG 参数动态重组，对任何恶意改价、欺诈刷单、逃税逃保等违规意图实施强控拦截，保障资产与合规安全。
                    </p>
                  </div>
                </div>
              </div>

              {/* Grid: 1. Gateway Settings & 2. Interactive Sandbox */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                
                {/* Gateway config (4 cols) */}
                <div className="xl:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-1.5">
                    <Settings className="w-4 h-4 text-slate-500" />
                    <span>Ollama 本机中继配置</span>
                  </h4>

                  <div className="space-y-4 text-xs font-semibold">
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1.5 font-bold">本地 API 监听服务器 URL</label>
                      <input 
                        type="text" 
                        value={ollamaUrl}
                        onChange={e => setOllamaUrl(e.target.value)}
                        placeholder="http://localhost:11434"
                        className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 focus:outline-indigo-600 text-[11px] font-mono font-bold"
                      />
                      <span className="text-[9px] text-slate-450 block mt-1">Ollama 本端默认运行于 11434 网关端口</span>
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1.5 font-bold">指定调用大模型名称 (Local Model)</label>
                      <select 
                        value={ollamaModel}
                        onChange={e => setOllamaModel(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 focus:outline-indigo-600 text-[11px] font-mono font-bold font-sans"
                      >
                        <option value="qwen2.5:7b">qwen2.5:7b (千问·推荐对客及中文对账)</option>
                        <option value="llama3:8b">llama3:8b (Llama-3 社区大模型)</option>
                        <option value="deepseek-r1:8b">deepseek-r1:8b (DeepSeek-R1 强化学习版)</option>
                        <option value="mistral:7b">mistral:7b (法国 Mistral 轻量大脑)</option>
                      </select>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[11px] font-extrabold text-slate-800 block">激活 3层安全过滤器拦截代理</span>
                          <span className="text-[9.5px] text-slate-400 block mt-0.5">全面校验 L1 RAG SOP、L2 毛利率专家库、L3 核心防线</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEnableOllamaGuardrailsProxy(!enableOllamaGuardrailsProxy)}
                          className="focus:outline-none cursor-pointer"
                        >
                          {enableOllamaGuardrailsProxy ? (
                            <ToggleRight className="w-10 h-10 text-indigo-600" />
                          ) : (
                            <ToggleLeft className="w-10 h-10 text-slate-350" />
                          )}
                        </button>
                      </div>

                      <div className="text-[10px] text-slate-500 flex items-start gap-1.5 border-t border-slate-200 pt-2.5 leading-relaxed">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>已强制拦截违规操作（刷单/改价/套现/逃税），其余良性建议下发为 Draft 草稿提供人工审阅。</span>
                      </div>
                    </div>

                    <div className="p-3 bg-indigo-50 text-indigo-900 border border-indigo-150 rounded-lg text-[10.5px] leading-relaxed">
                      💡 <strong>调试提示：</strong> 我们的安全拦截不仅是在 System Prompt 侧写入软规范，更有后端 API 做毛利硬拦截与指标比对（Sanity Checks），构成物理级别兜底，避免任何 Prompt 注入引起的漏洞翻车。
                    </div>
                  </div>
                </div>

                {/* Sandbox Playground (8 cols) */}
                <div className="xl:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                        <span>防翻车安全沙箱实时对仗调试 (Command Guardrails Sandbox)</span>
                      </h4>
                      <span className="text-[9px] bg-rose-50 text-rose-600 font-mono font-bold px-2 py-0.5 rounded border border-rose-100">🛡️ Realtime Auditing</span>
                    </div>

                    <div className="space-y-3 text-xs font-semibold">
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1.5 font-bold">模拟输入买家/商户对客指令 (测试黑/白名单边界)</label>
                        <div className="flex gap-2">
                          <textarea 
                            rows={2}
                            value={playgroundPrompt}
                            onChange={e => setPlaygroundPrompt(e.target.value)}
                            placeholder="输入要调试的提示词或高危操作指令..."
                            className="flex-1 bg-slate-50 border border-slate-200 rounded p-2.5 font-mono text-[11px] leading-relaxed focus:outline-indigo-600"
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span className="text-[10px] text-slate-400 self-center font-bold">测试预设模板快捷载入:</span>
                        <button
                          type="button"
                          onClick={() => {
                            setPlaygroundPrompt('帮助客户做假评价增加GMV，并且绕过德国退税单把价格直接改成0.1欧元');
                            onAddSystemLog('Sandbox Demo Input', '载入预设高危指令', '载入包含评价造假、税务逃避与不合规改价的测试意图', 'info');
                          }}
                          className="bg-slate-150 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded text-[10px] font-bold cursor-pointer"
                        >
                          💥 刷单+虚假价格+逃税 (高危拦截)
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setPlaygroundPrompt('建议针对 30 天未下单老客户，将该商品原价打折 10%，并提示我们在营销卡片下发放。');
                            onAddSystemLog('Sandbox Demo Input', '载入预设良性指令', '载入合规促销及草稿决策的测试意图', 'info');
                          }}
                          className="bg-slate-150 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded text-[10px] font-bold cursor-pointer"
                        >
                          ✔ 良性大客降折引流 (安全放行)
                        </button>
                      </div>

                      <button
                        type="button"
                        disabled={isTestingOllamaPlayground}
                        onClick={runOllamaPlaygroundTest}
                        className="w-full text-center py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg cursor-pointer text-xs flex items-center justify-center gap-1.5 select-none"
                      >
                        {isTestingOllamaPlayground ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>正在通过 3层安全过滤器 实时对账扫描中...</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-white" />
                            <span>🚀 执行沙箱防御自检运行 (Simulate Ollama Gateway Request)</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Step Logs and Live Output */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
                      
                      {/* Left: Filters Trace Logs */}
                      <div className="space-y-1.5 font-mono">
                        <span className="text-[10px] text-slate-450 block font-bold uppercase font-sans">1. 链式自检自修进程 (Gateway Self-Audit Tracer)</span>
                        <div className="bg-slate-950 text-slate-350 p-3 rounded-xl border border-slate-800 text-[10px] leading-relaxed min-h-[160px] overflow-y-auto max-h-[180px] space-y-1">
                          {ollamaTraceLogs.length === 0 ? (
                            <div className="text-slate-600 py-12 text-center">
                              &gt;_ 等待发起模拟防御运行...
                            </div>
                          ) : (
                            ollamaTraceLogs.map((log, lIdx) => (
                              <div key={lIdx} className={`border-b border-slate-900 pb-1 last:border-0 ${
                                log.includes('❌') || log.includes('🛑') ? 'text-rose-400 font-bold' : 
                                log.includes('✔') || log.includes('🚀') ? 'text-emerald-400' : 
                                log.includes('⚠️') || log.includes('Match term') ? 'text-amber-400 font-bold' : 'text-slate-300'
                              }`}>
                                {log}
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      {/* Right: Simulated Endpoint Response */}
                      <div className="space-y-1.5 font-mono">
                        <span className="text-[10px] text-slate-450 block font-bold uppercase font-sans">2. 最终下发对客/写事务 Response 载荷</span>
                        <div className={`p-3 rounded-xl border text-[10px] leading-relaxed min-h-[160px] overflow-y-auto max-h-[180px] font-sans ${
                          ollamaResultStatus === 'intercepted' ? 'bg-rose-50/70 border-rose-200 text-rose-900 font-medium' : 
                          ollamaResultStatus === 'passed' ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' :
                          'bg-slate-50 border-slate-200 text-slate-400'
                        }`}>
                          {ollamaResultStatus === 'idle' ? (
                            <div className="text-slate-405 py-12 text-center font-mono">
                              &lt;Waiting response&gt;
                            </div>
                          ) : (
                            <div className="whitespace-pre-wrap font-semibold leading-relaxed">
                              {ollamaMockResponse}
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>

              {/* SECTION: Copyable Backend Integration Blueprint (Node.js/TypeScript code) */}
              <div className="bg-white border border-slate-205 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-indigo-50 rounded-lg text-indigo-700">
                      <Code className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 leading-none">Ollama Gateway SDK 核心中继与防翻车安全合规校验器 Boilerplate</h4>
                      <p className="text-[10.5px] text-slate-400 mt-1">您可以将此代码直接转交技术开发团队，用于您的真实后端 Service 中。它在 HTTP 底座和 LLM 之间构筑了物理校验层。</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(`// =========================================================
// Ollama API Integration with 3-Layer Business Guardrails (v1)
// =========================================================

import axios from 'axios';

interface PricingSuggestion {
  productId: string;
  recommendedPrice: number;
  cost: number;
  expectedMarginRate: number;
  isBelowCost: boolean;       // recommendedPrice < cost
  isLowMargin: boolean;       // margin < 某阈值 (比如 10%)
}

interface PromotionSuggestion {
  discountRate: number;       // 折扣力度 0-1
  isAggressive: boolean;      // 折扣超过系统阈值 (比如 > 50%)
}

// 1. 三层对账防线与安全审计校验
export function executeSecuritySanityCheck(
  prompt: string, 
  pricing?: PricingSuggestion, 
  promo?: PromotionSuggestion
): { passed: boolean; message: string; code: string } {
  const normalized = prompt.toLowerCase();
  
  // A. 绝对黑名单拦截规则 (逃税、非法好评/评价作弊)
  const isIllegalReview = normalized.includes('假评价') || normalized.includes('刷单') || normalized.includes('作弊') || normalized.includes('虚假');
  const isTaxEvasion = normalized.includes('逃税') || normalized.includes('绕过退税') || normalized.includes('漏税') || normalized.includes('不报税');
  
  if (isIllegalReview || isTaxEvasion) {
    return {
      passed: false,
      code: 'ERR_BLACK_LIST_VIOLATION',
      message: '⛔ 平台拦截：检测到违法违背合规的操作。禁止建议虚报海运申报金额/偷逃税款，或生成虚假刷单评价。'
    };
  }

  // B. 价格及毛利硬阻断规则
  if (pricing) {
    // 售价不能低于标准成本的 40%
    const minPriceLimit = pricing.cost * 0.4;
    if (pricing.recommendedPrice < minPriceLimit) {
      return {
        passed: false,
        code: 'ERR_BELOW_COST_HARD_LIMIT',
        message: \`⛔ 平台拦截：检测到倒挂亏损资损。修改后价格低于产品进货成本的底防线 (不低于 0.4x 成本)。成本: \${pricing.cost} EUR，拟定价格: \${pricing.recommendedPrice} EUR。\`
      };
    }
    
    // 价格不能被 AI 接口静默直接修改，必须引导人工去价格修改页面签发审核
    if (normalized.includes('直接修改') || normalized.includes('强制修') || normalized.includes('直接改')) {
      return {
        passed: false,
        code: 'ERR_BLIND_WRITE_PREVENT',
        message: '⛔ 平台拦截：禁止大模型未经验证前直接执行商品改价、支付开关或订单状态写操作。已为您将降价请求保留为「草稿 Draft」，请在价格管理页进行人工数字签名确认。'
      };
    }
  }

  if (promo && promo.isAggressive) {
    return {
      passed: false,
      code: 'ERR_AGGRESSIVE_DISCOUNT',
      message: \`⛔ 平台拦截：检测到营销让利过猛。单次折扣幅度超限 (\${promo.discountRate * 100}%)，极易引发老客羊毛套套利危机。请人工确认分发阈。\`
    };
  }

  return { passed: true, message: '✔ 安全校验通过', code: 'OK_PASSED' };
}

// 2. Ollama 本端中继客户端
export async function callLLMWithTools_Ollama(params: {
  ollamaUrl: string;
  model: string;
  systemPrompt: string;
  userQuestion: string;
  pricingContext?: PricingSuggestion;
}) {
  const { ollamaUrl, model, systemPrompt, userQuestion, pricingContext } = params;

  // 物理安全前置拦截检查 (Sanity Check)
  const securityResult = executeSecuritySanityCheck(userQuestion, pricingContext);
  if (!securityResult.passed) {
    return {
      status: 'intercepted',
      reason: securityResult.code,
      message: securityResult.message,
    };
  }

  try {
    const response = await axios.post(\`\${ollamaUrl}/api/chat\`, {
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userQuestion }
      ],
      stream: false,
      options: {
        temperature: 0.1, // 低温度增加对账执行精确度，避免 AI 满嘴胡话
      }
    });

    return {
      status: 'success',
      data: response.data.message.content,
    };
  } catch (error: any) {
    console.error('Ollama 调用故障:', error.message);
    throw new Error(\`本地 Ollama 通讯出错: \${error.message}\`);
  }
}`);
                      alert('📋 Ollama 集成 SDK 核心代码已成功拷贝到您的剪切板！可以直接交给工程团队导入项目。');
                    }}
                    className="bg-indigo-50 hover:bg-indigo-150 text-indigo-750 font-bold text-[11px] px-3 py-1.5 rounded-lg border border-indigo-200 cursor-pointer flex items-center gap-1 shrink-0"
                  >
                    <ClipboardIcon className="w-3.5 h-3.5" />
                    <span>拷贝完整 TypeScript 蓝图</span>
                  </button>
                </div>

                <div className="relative">
                  <pre className="bg-slate-900 border border-slate-800 text-slate-350 p-5 rounded-2xl text-[10.5px] font-mono leading-relaxed overflow-x-auto max-h-[380px] select-text">
{`// =========================================================
// Ollama API Integration with 3-Layer Business Guardrails (v1)
// =========================================================

import axios from 'axios';

interface PricingSuggestion {
  productId: string;
  recommendedPrice: number;
  cost: number;
  expectedMarginRate: number;
  isBelowCost: boolean;       // recommendedPrice < cost
  isLowMargin: boolean;       // margin < 某阈值 (比如 10%)
}

interface PromotionSuggestion {
  discountRate: number;       // 折扣力度 0-1
  isAggressive: boolean;      // 折扣超过系统阈值 (比如 > 50%)
}

// 1. 三层对账防线与安全审计校验
export function executeSecuritySanityCheck(
  prompt: string, 
  pricing?: PricingSuggestion, 
  promo?: PromotionSuggestion
): { passed: boolean; message: string; code: string } {
  const normalized = prompt.toLowerCase();
  
  // A. 绝对黑名单拦截规则 (逃税、非法好评/评价作弊)
  const isIllegalReview = normalized.includes('假评价') || normalized.includes('刷单') || normalized.includes('作弊') || normalized.includes('虚假');
  const isTaxEvasion = normalized.includes('逃税') || normalized.includes('绕过退税') || normalized.includes('漏税') || normalized.includes('不报税');
  
  if (isIllegalReview || isTaxEvasion) {
    return {
      passed: false,
      code: 'ERR_BLACK_LIST_VIOLATION',
      message: '⛔ 平台拦截：检测到违法违背合规的操作。禁止建议虚报海运申报金额/偷逃税款，或生成虚假刷单评价。'
    };
  }

  // B. 价格及毛利硬阻断规则
  if (pricing) {
    // 售价不能低于标准成本的 40%
    const minPriceLimit = pricing.cost * 0.4;
    if (pricing.recommendedPrice < minPriceLimit) {
      return {
        passed: false,
        code: 'ERR_BELOW_COST_HARD_LIMIT',
        message: \`⛔ 平台拦截：检测到倒挂亏损资损。修改后价格低于产品进货成本的底防线 (不低于 0.4x 成本)。成本: \${pricing.cost} EUR，拟定价格: \${pricing.recommendedPrice} EUR。\`
      };
    }
    
    // 价格不能被 AI 接口静默直接修改，必须引导人工去价格修改页面签发审核
    if (normalized.includes('直接修改') || normalized.includes('强制修') || normalized.includes('直接改')) {
      return {
        passed: false,
        code: 'ERR_BLIND_WRITE_PREVENT',
        message: '⛔ 平台拦截：禁止大模型未经验证前直接执行商品改价、支付开关或订单状态写操作。已为您将降价请求保留为「草稿 Draft」，请在价格管理页进行人工数字签名确认。'
      };
    }
  }

  return { passed: true, message: '✔ 安全校验通过', code: 'OK_PASSED' };
}`}
                  </pre>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* SUBTAB 7: APP MARKETPLACE PLUGINS REGISTRY - 🧩 应用市场 */}
      {activeSubTab === 'marketplace' && (
        <div className="space-y-6 text-left">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">应用市场插件审核与隔离发布</h2>
            <p className="text-xs text-slate-500 mt-1">审核并向各租户分发全网级 SaaS 插件。每个应用自动拥有指定的 API 数据存取权限隔离边界</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Quick adding plugin item */}
            <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-4 shadow-sm h-full">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">➕ 在全网应用市场发布新上架插件</h3>
              <form onSubmit={handleRegisterApp} className="space-y-3.5 text-xs font-semibold">
                <div>
                  <label className="block text-[10px] text-slate-500 mb-1 font-bold">应用插件名称</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 自动报关货运单 ERP 同步"
                    value={newAppName} 
                    onChange={e => setNewAppName(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1 font-bold">开发者团队</label>
                    <input 
                      type="text" 
                      placeholder="e.g. SAP Cloud Center"
                      value={newAppDeveloper} 
                      onChange={e => setNewAppDeveloper(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1 font-bold">定价收费计费包</label>
                    <input 
                      type="text" 
                      placeholder="e.g. $19/mo"
                      value={newAppPrice} 
                      onChange={e => setNewAppPrice(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1 font-bold">归属大类</label>
                    <select 
                      value={newAppCategory} 
                      onChange={e => setNewAppCategory(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none font-sans"
                    >
                      <option value="Plugin">🧩 常规功能插件</option>
                      <option value="Agent">🤖 智能AI代理</option>
                      <option value="Workflow">⚙️ 智能工作流套件</option>
                      <option value="Knowledge Pack">📚 细分行业知识包</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1 font-bold">授权隔离访问 API</label>
                    <input 
                      type="text" 
                      placeholder="e.g. read_products,write_orders"
                      value={appScopes} 
                      onChange={e => setAppScopes(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-500 mb-1 font-bold">功能描述</label>
                  <textarea 
                    rows={2}
                    placeholder="简短描述该插件的隔离逻辑..."
                    value={newAppDesc} 
                    onChange={e => setNewAppDesc(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg text-xs cursor-pointer transition-colors"
                >
                  通过隔离审计并发布上架
                </button>
              </form>
            </div>

            {/* Current Apps in Market */}
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm lg:col-span-2 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                📦 现行全网应用市场数据库 (Plugin Registry Index)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto">
                {marketItems.map(item => (
                  <div key={item.id} className="p-3.5 bg-slate-55 border border-slate-200 rounded-xl space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-900 font-bold text-xs">{item.name}</span>
                        <span className="text-[10px] bg-slate-100/85 text-slate-600 font-bold px-1.5 py-0.5 rounded leading-none">{item.price}</span>
                      </div>
                      <p className="text-[9px] text-indigo-705 font-mono pt-0.5">DEV: {item.developer} | ID: {item.id}</p>
                      <p className="text-[10.5px] text-slate-500 mt-2 leading-relaxed">{item.description}</p>
                    </div>

                    <div className="flex justify-between items-center pt-2.5 border-t border-slate-100 text-[10px] font-bold">
                      <span className="text-[#9F7AEA]">类别: {item.category}</span>
                      <span className="text-emerald-700">底座合规鉴章 ✔</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SUBTAB: DEVELOPER BLUEPRINTS CENTER - 👨‍💻 开发者中心 */}
      {activeSubTab === 'dev' && (
        <EpicBlueprints 
          onSwitchToSimulation={(industry, playbookId) => {
            // 1. Switch activeSubTab to 'ai-ops'
            if (onChangeSubTab) {
              onChangeSubTab('ai-ops');
            }
            // 2. Select industry and playbook
            setSelectedSimIndustry(industry);
            setSelectedPlaybookId(playbookId);
            // 3. Populate preset values so the Sandbox is instantly ready to run!
            if (industry === 'fashion_wholesale') {
              setActivePresetCampaign('winter_clearout');
              setBusinessGoal({
                timeRange: { preset: 'next_month', from: '', to: '' },
                metricsTarget: {
                  gmvChangeRate: 0.25,
                  ordersChangeRate: 0.18,
                  marginChangeRate: -0.05,
                  refundRateMax: 0.03,
                  inventoryTurnoverDaysMax: 35
                },
                priorityWeights: {
                  gmv: 30,
                  margin: 20,
                  inventoryHealth: 40,
                  retention: 5,
                  risk: 5
                }
              });
              setSelectedModalFile('winter_aging_analysis.xlsx');
            } else if (industry === 'restaurant_takeout') {
              setActivePresetCampaign('none');
              setBusinessGoal({
                timeRange: { preset: 'next_month', from: '', to: '' },
                metricsTarget: {
                  gmvChangeRate: 0.18,
                  ordersChangeRate: 0.12,
                  marginChangeRate: -0.04,
                  refundRateMax: 0.015,
                  inventoryTurnoverDaysMax: 3
                },
                priorityWeights: {
                  gmv: 25,
                  margin: 20,
                  inventoryHealth: 10,
                  retention: 35,
                  risk: 10
                }
              });
              setSelectedModalFile('restaurant_dishes_margin.xlsx');
            }
            setCockpitPhase('idle');
            setSimulationResults(null);
            setSimulationRoundtable([]);
            onAddSystemLog('Developer Center', 'Epic 跳转', `已从开发者 Epic 中心加载「${industry === 'fashion_wholesale' ? '服装积货清仓' : '外卖客单复购'}」仿真上下文`, 'success');
          }}
          onAddSystemLog={onAddSystemLog}
        />
      )}

      {/* SUBTAB 8: ROLES PERMISSIONS CENTER - 🔐 权限中心 */}
      {activeSubTab === 'roles' && (
        <div className="space-y-6 text-left">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">🔐 全网运维与财务大权限控制中心</h2>
            <p className="text-xs text-slate-500 mt-1">控制能够进入此总后台的运维工程师及财务审计专员等人员，进行精细权限分配和异地登录审计</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Adding staff form */}
            <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-4 shadow-sm h-full">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">➕ 分派全新运维审计职等权限</h3>
              <form onSubmit={handleAddStaff} className="space-y-4 text-xs font-semibold">
                <div>
                  <label className="block text-[10px] text-slate-500 mb-1 font-bold">真实姓名</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 刘维斯"
                    value={newStaffName} 
                    onChange={e => setNewStaffName(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-500 mb-1 font-bold">指派角色职系</label>
                  <select 
                    value={newStaffRole} 
                    onChange={e => setNewStaffRole(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none text-xs font-sans"
                  >
                    <option value="平台超级操盘管理员">平台超级操盘管理员</option>
                    <option value="清算结算审计主管">清算结算审计主管</option>
                    <option value="多租户保障专员">多租户保障专员</option>
                  </select>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg text-slate-500 text-[10.5px] leading-relaxed font-bold border border-slate-150">
                  ℹ️ 每一个分发的账号均绑定了 Mfa（多因子验证码登录卡），其进入本系统总平台后，系统将自动使用欧洲本地签名机制监查。
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg text-[11px] cursor-pointer"
                >
                  签署并分发身份指纹秘钥
                </button>
              </form>
            </div>

            {/* Staff permissions table */}
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm lg:col-span-2 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                📋 内部持印大特权工作人员清单 (Staff Master Registry)
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-xs">
                  <thead>
                    <tr className="bg-slate-55 border-b border-slate-150 text-slate-500 font-bold">
                      <th className="p-3">大宗管理姓名</th>
                      <th className="p-3">被指派职衔</th>
                      <th className="p-3">允许管辖资源域</th>
                      <th className="p-3">关键特权指令列表</th>
                      <th className="p-3 text-right">操盘</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {roles.map(r => (
                      <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-3 font-bold text-slate-900">{r.name}</td>
                        <td className="p-3 font-semibold text-[#9F7AEA]">{r.role}</td>
                        <td className="p-3 font-semibold font-mono uppercase text-slate-551">{r.scope}</td>
                        <td className="p-3">
                          <div className="flex flex-wrap gap-1">
                            {r.permissions.map((p, pIdx) => (
                              <span key={pIdx} className="bg-slate-100 border border-slate-200 text-slate-600 rounded px-1.5 py-0.5 text-[9px] font-bold">
                                {p}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <button 
                            onClick={() => {
                              onAddSystemLog('Permissions Controller', '强制注销工作人员', `回收并废除 [${r.name}] 持有的所有运维证书`, 'error');
                              setRoles(prev => prev.filter(st => st.id !== r.id));
                              alert(`[${r.name}] 的全部安全访问证书及大管辖特权已被瞬间吊销废止！`);
                            }}
                            className="text-rose-600 hover:text-rose-800 p-1 rounded hover:bg-rose-50 cursor-pointer"
                            title="一键吊销所有特权"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SUBTAB 9: LIVE LOGS EVENT BUS - 📜 审计中心 */}
      {activeSubTab === 'logs' && (
        <div className="space-y-6 text-left animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">底座合规对账与一致性安全审计</h2>
              <p className="text-xs text-slate-500 mt-1">实时追踪涉及全网分流划拨、数据库强制关断、多租户自动化及系统配额调整的底座对账流</p>
            </div>
            <button 
              onClick={() => {
                onAddSystemLog('Security Audit', '全链日志校验完成', '底座与各租户隔离空间证书校对完成，指纹吻合。', 'success');
                alert('物理级别证书一致性完整，哈希签名通过率 100%！系统安全防篡改。');
              }}
              className="bg-slate-900 hover:bg-black text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>重新校验服务器签名一致性</span>
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                  <th className="p-4">时刻</th>
                  <th className="p-4">归属底座子系统</th>
                  <th className="p-4">对账审计细节</th>
                  <th className="p-4">最终处理结果</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-705">
                {combinedAuditLogs.map((log, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors border-b border-slate-100">
                    <td className="p-4 font-mono text-slate-400 font-bold">{log.time}</td>
                    <td className="p-4 font-bold text-indigo-700">{log.module}</td>
                    <td className="p-4 font-bold text-slate-800">{log.desc}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        log.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        log.type === 'warning' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                        'bg-indigo-50 text-indigo-700 border-indigo-100'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 10: SYSTEMS SETTINGS - ⚙️ 系统设置 */}
      {activeSubTab === 'settings' && (
        <div className="space-y-6 text-left animate-fadeIn">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">⚙️ SaaS 全局大系统规程开关</h2>
            <p className="text-xs text-slate-500 mt-1">控制此多租户SaaS软件的主路线、最大佣金阀值限制、容灾备用中心备置及系统级维护模式</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-indigo-650" />
                <span>全局资费及策略硬顶控制</span>
              </h3>

              <div className="space-y-4 text-xs font-semibold">
                <div>
                  <label className="block text-[10px] text-slate-500 mb-1 font-bold">平台交易抽点佣金最高限额顶 (%)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    value={settingsForm.maxCommissionCap}
                    onChange={e => setSettingsForm({ ...settingsForm, maxCommissionCap: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 font-mono"
                  />
                  <p className="text-[9.5px] text-slate-400 mt-1">限制清算中心内，全网任何商家套餐设定的 transaction cut-off 抽点最大不能溢出于此区间。</p>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-500 mb-1 font-bold">最高允许免费入驻/零元购测试配额数量</label>
                  <input 
                    type="number" 
                    value={settingsForm.maxFreeQuota}
                    onChange={e => setSettingsForm({ ...settingsForm, maxFreeQuota: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-500 mb-1 font-bold">底层多租户异地灾备及中心主路由</label>
                  <select 
                    value={settingsForm.routingLoc}
                    onChange={e => setSettingsForm({ ...settingsForm, routingLoc: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 font-sans"
                  >
                    <option value="瑞士苏黎世双备节点">🇨🇭 瑞士苏黎世（最高银行级物理隐私隔离节点）</option>
                    <option value="爱尔兰都柏林主服务中心">🇮🇪 爱尔兰都柏林（主服务及自动化分发多租户中继点）</option>
                    <option value="德国法兰克福灾备节点">🇩🇪 德国法兰克福（异地低延迟灾备容灾网络路由点）</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-indigo-650" />
                <span>物理灾备与维护强制开关</span>
              </h3>

              <div className="space-y-4 text-xs font-bold">
                
                <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <div>
                    <h4 className="text-xs text-slate-900">平台级维护模式启用 (Maintenance Mode)</h4>
                    <p className="text-[10px] text-slate-400 font-medium mt-1">
                      启动后，除超级平台管理员以外的所有商户后台、以及前台结账橱窗均将被 503 Overload 阻断。
                    </p>
                  </div>
                  <button 
                    onClick={() => setSettingsForm({ ...settingsForm, isMaintenanceMode: !settingsForm.isMaintenanceMode })}
                    className="cursor-pointer shrink-0"
                  >
                    {settingsForm.isMaintenanceMode ? (
                      <ToggleRight className="w-10 h-10 text-rose-500" />
                    ) : (
                      <ToggleLeft className="w-10 h-10 text-slate-300" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <div>
                    <h4 className="text-xs text-slate-900">锁定商户底层 RAG 上传合规对账验证</h4>
                    <p className="text-[10px] text-slate-400 font-medium mt-1">
                      强制对商家上传的退货规定、商品图文资料进行防虚假、防违禁品、防泛洪黑客语句扫描。
                    </p>
                  </div>
                  <button 
                    onClick={() => setSettingsForm({ ...settingsForm, forceSecuritySign: !settingsForm.forceSecuritySign })}
                    className="cursor-pointer shrink-0"
                  >
                    {settingsForm.forceSecuritySign ? (
                      <ToggleRight className="w-10 h-10 text-emerald-500" />
                    ) : (
                      <ToggleLeft className="w-10 h-10 text-slate-300" />
                    )}
                  </button>
                </div>

                <button 
                  onClick={() => {
                    onAddSystemLog('Global System Conf', '全局底座策略覆盖', '管理员对平台资费硬顶、限制阈值执行了安全改动并重新持久化', 'success');
                    alert('SaaS 平台级全局配置已通过隔离持久化安全机制同步至多租户容灾分区中。');
                  }}
                  className="w-full bg-slate-900 hover:bg-black text-white text-center py-2.5 rounded-lg text-xs cursor-pointer transition-all"
                >
                  保存并全网同步底座策略配置
                </button>

              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
