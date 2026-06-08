import React, { useState } from 'react';
import { 
  Terminal, Clipboard, Check, Layers, Bot, Play,
  Cpu, ShieldCheck, AlertTriangle, ArrowRight, Sparkles, Code, Copy, 
  Settings, Database, RefreshCw, BarChart2, BookOpen, Clock, HeartHandshake, Eye
} from 'lucide-react';
import { IndustryType } from '../types';

interface EpicSection {
  title: string;
  emoji: string;
  content: string;
  dataToCopy: string;
}

interface EpicTemplate {
  id: string;
  industry: IndustryType;
  title: string;
  subtitle: string;
  category: string;
  emoji: string;
  badge: string;
  sections: EpicSection[];
}

interface EpicBlueprintsProps {
  onSwitchToSimulation: (industry: IndustryType, playbookId: string) => void;
  onAddSystemLog: (module: string, action: string, details: string, type: 'info' | 'success' | 'warning' | 'error') => void;
}

export default function EpicBlueprints({ onSwitchToSimulation, onAddSystemLog }: EpicBlueprintsProps) {
  const [activeEpicId, setActiveEpicId] = useState<'fashion_clearance' | 'restaurant_repurchase'>('fashion_clearance');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  
  // Interactive Checklist State to allow developers to play around
  const [tasks, setTasks] = useState({
    fashion: [
      { id: 'f1', text: '定义 /src/types.ts 包含季节特征与库存等级', status: true },
      { id: 'f2', text: '构建 InventoryAgent 中的 getSeasonalSkus 与 getProductInsight 存取器', status: true },
      { id: 'f3', text: '配置 PricingAgent 调降策略与建议区间算法', status: false },
      { id: 'f4', text: '拉拔 MarketingAgent 分配 SendGrid 老客代金券流', status: false },
      { id: 'f5', text: '在 RAG 控制盾写入 €800+ 强制二次人审防御策略', status: false },
    ],
    restaurant: [
      { id: 'r1', text: '建立 MenuService 分类主菜、小配餐与酒水', status: true },
      { id: 'r2', text: '编译 PricingAgent 智能三合一最优爆量套餐定价规则', status: true },
      { id: 'r3', text: '部署 MarketingAgent WhatsApp/Email 72小时回头客回流 Flow', status: false },
      { id: 'r4', text: '对接 ETA (实时配送时效 API) 联动风控拦截', status: false },
      { id: 'r5', text: '集成信用免检白名单分级路由机制', status: false },
    ]
  });

  const toggleTask = (epic: 'fashion' | 'restaurant', id: string) => {
    setTasks(prev => {
      const list = prev[epic].map(t => t.id === id ? { ...t, status: !t.status } : t);
      return { ...prev, [epic]: list };
    });
    
    const taskText = tasks[epic].find(t => t.id === id)?.text;
    onAddSystemLog('EPIC 调试器', '本地工程任务切换', `用户调整了由于 EPIC 派生的本地任务状态：${taskText}`, 'info');
  };

  const handleCopy = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(identifier);
    onAddSystemLog('Epic 备忘板', '需求拷贝', `拷贝 EPIC 段至剪切板: [${identifier}]`, 'success');
    setTimeout(() => {
      setCopiedSection(null);
    }, 2000);
  };

  const epicsData: Record<'fashion_clearance' | 'restaurant_repurchase', EpicTemplate> = {
    fashion_clearance: {
      id: 'fashion_clearance',
      industry: 'fashion_wholesale',
      title: '👕 服装设计批发 – 季末库存清理智能体 (Epic-001)',
      subtitle: 'Winter Season Clearance Autonomous Agent with Inventory & Asset Preservation Multi-Channel Co-Op',
      category: '服装批发行业 · 季中/季末库存重组与资产回款',
      emoji: '👕',
      badge: 'EPIC-001 | FASHION_WHOLESALE',
      sections: [
        {
          title: '背景 & 业务痛点 (Background & Pain Points)',
          emoji: '📋',
          content: `• 行业：服装设计批发 (fashion_wholesale)
• 典型痛点：
  1. 每季结束时，大量冬装/秋装/夏装剩余在仓库，货柜积压极其严重，仓储边际利用率低，静态库存持有天数（DSI）经常超过 100-120 天，滞架产生的仓储费达 €2.5/米·日。
  2. 资金占用量高。服装产业更新迭代瞬息万变，季末回款停滞，直接制约下一季度新品采购的订金与铺底生产资金。
  3. 日常运营人员很难快速算清：
     - 哪些特定变体款式/尺码（如 XS 码或 XXL 极度偏码）必须立刻被清掉？
     - 折扣应该精细化降折多少（例如 -30% 还是 -55% ），才能在兼顾流失率与亏损硬容限的前提下达到综合收益纳什平衡？
     - 给哪些细分大客户推？通过什么精确的消息通道与文案阻损？
  4. 现在的传统模式：运营往往拍脑袋决定折扣，并在未作大客隔离与防套汇校验的情况下进行低质全网群发，不仅让利过猛引发老客套利，而且成效微弱。`,
          dataToCopy: `EPIC: 👕 服装设计批发 – 季末库存清理智能体 (Epic-001)

【背景 & 业务痛点】
- 行业: 服装设计批发 (fashion_wholesale)
- 典型痛点:
  1. 每季结束时，大量货柜积压严重，周转周期（DSI）超 100 天，每天产生货架质损。
  2. 资金占用重。冬装退港折旧，资金周转不良直接影响春夏新品的首付款与排单生产。
  3. 传统拍脑袋打折。无法精准甄别各冬季 SKU 的流速、毛利硬边界、滞销偏码（XS/XXL）以及对口的高频批发客群，活动千篇一律，收效甚微。`
        },
        {
          title: '业务目标 (Business Goal)',
          emoji: '🎯',
          content: `【目标表述】利用自然语言将经营期望自动编译为多重决策红线，在 2 个月内出清冬季库存 70%。
【目标数据模型 (BusinessGoal Model Template)】
\`\`\`typescript
const goal: BusinessGoal = {
  timeRange: {
    preset: 'next_2_months', // 指向未来两个月
  },
  metricsTarget: {
    gmvChangeRate: 0.25,                  // GMV 促产规模由于清销提拉 +25%
    marginChangeRate: -0.05,              // 总体毛利空间降折让渡可接受范围在 -5% 内
    inventoryTurnoverDaysMax: 35,         // 库存周转天数强行压缩在 35 天以内
    refundRateMax: 0.03,                 // 防套退款等引致的纠纷率压制在 3% 绝对阈值
  },
  priorityWeights: {
    gmv: 0.30,                            // GMV流速促融权重 30%
    margin: 0.20,                         // 保持毛利权重 20%
    inventoryHealth: 0.40,                // 库存周转出清优先权 40% (清销首要权重)
    retention: 0.05,                      // 存量老客留存 5%
    risk: 0.05,                           // 防欺诈恶意退货风控权重 5%
  },
};
\`\`\``,
          dataToCopy: `【业务目标】
通过智能决策在两个月内将冬季静态积压库存降低 70%，回笼现金流。

【BusinessGoal 模型配置】
const goal: BusinessGoal = {
  timeRange: { preset: 'next_2_months' },
  metricsTarget: {
    gmvChangeRate: 0.25,
    marginChangeRate: -0.05,
    inventoryTurnoverDaysMax: 35,
    refundRateMax: 0.03
  },
  priorityWeights: {
    gmv: 0.30,
    margin: 0.20,
    inventoryHealth: 0.40,
    retention: 0.05,
    risk: 0.05
  }
};`
        },
        {
          title: 'Ops Commander 「清货 Playbook」结构 (Playbook Schema)',
          emoji: '🔄',
          content: `主目标：「在 2 个月内，将冬季库存 SKU 总件数压缩 70%，并维持平均回款利润在安全区间。」

1. 概览模块 (Overview Block)
   - 分析冬季 SKU（如 Arctica 极地防寒外套、羊绒毛线衫等）的库存热力分布：
     - A 类爆品（流速正常但有季节滞存风险）：库存总阀、占库率、最新30天出货降速拐点。
     - B 类温和款：流动天数在 45-60 天的常规单品。
     - C 类重度滞销款（超 90 天未开款且全店货量超过 200 件）。
2. 行动模块 A：大库存 + 重度滞销 SKU 强清仓 (Aggressive Liquidation Campaign)
   - 价格建议：40% - 60% off 强劲探底。设置累进阶梯价（“一次性采购 10 件以上享受额外 10% 补折”）。
   - 目标客群：匹配采购频次最高、偏好中低货值长尾货品的前 15% 经销商进行大单直推。
   - 工具绑定：动态定价 JSON 折扣率批量物理写入商户 ERP，自动在 checkout 模块拉起合同折。
3. 行动模块 B：中等库存 + 明星爆品爆发性去库 (Tactical Fast-turn Campaign)
   - 价格建议：15% - 25% off 温和微调，保持利润基本盘。
   - 促销方法：为前 1,850 名核心二级零售商派发「WINTER-CLEAROUT-30」定向代金券促结算。
4. 行动模块 C：零散尺码/混码大整装去库 (Size Mix Optimization Bundle)
   - 识别 XS / XXL 等静态货架长达 120 天的滞销偏码，建议自动下架单款变体，混编为「服装混合清仓箱」，按件打包（如每一整箱 50 件特惠 €499）清货。
   - 锁定买断条款：交易签署附加「断码尾货不退换」之数字电签凭据，消除财务坏账风险。`,
          dataToCopy: `【Ops Commander 「清货 Playbook」结构】
1. 【概览模块】按 SKU 动销分类:
   - 高库存滞销: DSI > 90天, 数量 > 200
   - 普通周转款: 50 < DSI <= 90天, 数量温和
   - 偏码重度积压: 尺码 XS/XXL 货架库龄超 120 天
2. 【行动模块 A (重滞去库存)】
   - 定价：建议 40-60% 深度折让，辅以阶梯购（>10件再降10%）
   - 大客户专属推送，一键生成折扣草稿
3. 【行动模块 B (畅销微折清货)】
   - 定价：小幅降点 15-25%，保护毛利基本盘
   - 派发 30 天起用催付直享券，向静默加购老客去货
4. 【行动模块 C (尺码组合售)】
   - 将 XS/XXL 码单款单码合并为「极配混装大重箱」，整箱均一买断价出售
   - 底层锁定“无质换不退换”合同条目封锁退货退金，拦截薅羊毛行为`
        },
        {
          title: '协作智能体与工具链 (Agent Routing & Services Sequence)',
          emoji: '⛓️',
          content: `• 协同智能体角色 (Collaborative Agents)：
  1. Ops Commander（运营大脑）：总体解译 BusinessGoal、加载分析多模态数据、统合 roundtable 博弈会商。
  2. Inventory Agent（库存特派员）：筛查库存深度、归类 top_seller/overstock SKU、管理 WMS 物理调库。
  3. Pricing Agent（定价大师）：根据成本底线、周转最大天数，测算纳什平衡降折草稿方案。
  4. Marketing Agent（CRM 精准营销专家）：过滤最匹配老熟客客盘、生成多渠道关怀邮件文案与限时催付代金券。
  5. Risk Agent（交易风控网关）：分析套利因子，强制拦截大宗投机，设置退款纠纷墙。

• 服务工具 API 链路 (Execution Sequence Flow)：
  1. Inventory Agent 回答：
     - 调用 InventoryService.getSeasonalSkus(shopId, season='winter')
     - 调用 ProductService.getProductInsight(skuId) 获取最近 30 天进出库流速与成本账目。
  2. Pricing Agent 回答：
     - 调用 PricingService.recommendPriceAndPromo(...) 针对畅销品推荐 -20%、滞存款推荐 -45% 复合折扣矩阵，导出建议折扣草稿。
  3. Marketing Agent 回答：
     - 调用 CustomerService.suggestWholesaleClearanceCampaign(...) 取得历史上常配对应极热单品的大买家库房画像，编译 SendGrid 优惠促销流。
  4. Risk Agent 回答：
     - 设置 PaymentService.configureSlaProtectionBorder(orderAmountThreshold=800) 强卡 €800+ 级别的多件反向退汇欺诈。
  5. Commander 拼装产出：
     - 打包结果，把方案与 ERP 动作结合成包含 Playbook Propositions 的页面，由商家老板点按「一键全量激活」写入实体应用。`,
          dataToCopy: `【涉及的智能体 & 工具链路】
1. Ops Commander: 获取行业/租户目标 -> 加载 CSV/XLSX 数据 -> 启动 Roundtable 进行多角色对账
2. Inventory Agent: 
   - 调 InventoryService.getSeasonalSkus(shopId, season='winter')
   - 调 ProductService.getProductInsight 获取库存周期与货栈费效
3. Pricing Agent:
   - 调 PricingService.recommendPriceAndPromo 获取毛利 vs 流速的阶梯打折定价
4. Marketing Agent:
   - 调 CustomerService.suggestWholesaleClearanceCampaign 过滤核心买家
   - 调 MessageService.createCampaignDraft 生成邮件与 WhatsApp 直连催付草稿
5. Risk Agent:
   - 调 PaymentService.configureSlaProtectionBorder 设置 €800+ 二次物理人审防套利纠纷规则`
        },
        {
          title: '用户故事 (User Stories)',
          emoji: '👥',
          content: `• Story 1: 季末清仓智能计划 (Wwinter Liquidation Strategy)
  - 角色：服装批发商老板 (Merchant Owner)
  - 诉求：只要对 AI 助手说「帮我清掉本季积压冬装的绝对库存，要最快的，尽量收敛毛利在-8%内」，系统自动测算出 2-3 个阶段的协作行动 Playbook 与 ERP 价格控制卡，一键审核部署。
  - 价值：免除漫长繁复的拉表、核算、客户配对步骤，AI 一秒整合运营、定价、物流团队得出平衡方案。

• Story 2: 偏码结构清销整备 (Size Balance Bundle)
  - 角色：仓库/物料运营主管 (WMS Manager)
  - 诉求：当仓库内大量长尾偏尺码（XS/XXL）发生积压时，AI 自动捕获到并生成「混配黄金整箱包」，一键在 Shopify 上架并指定合同签署无退还条规。
  - 价值：释放黄金货架利用率（目标提升 20%），用混箱买断模式将死货速变为流动现金。

• Story 3: 大客专属渠道促结 (Exclusive VIP Direct Liquidation)
  - 角色：批发销售总监 (Wholesale Sales Manager)
  - 诉求：根据积压冬装的尺码结构，AI 能跨数据库识别出历史上有大库存买入记录、流失天数超30天的 12 个重点代理商，编写专属个性化清货报价草稿与 EDM，通知销售直接拜访促成大包大进。
  - 价值：将“面授群发”升级为“私人定制”，达成最高效的大宗资产变现。`,
          dataToCopy: `【用户故事 (User Stories)】
- Story 1：大冬清全能智策
  作为 批发商老板
  我希望 告诉系统「两个月清掉冬季库存 70%」，就能一键拉起融合定价折扣、大客挽回与规则布控的 Playbook。
  以便于 让我快速回收现金储备，无缝布局春夏生产，免去长达数天的决策核算。

- Story 2：滞销断码变箱买断
  作为 仓库运营经理
  我希望 系统精准把死死塞在货架 120 天以上的 XS/XXL 尾货打散并重新编排为「经典均价混装大重箱」特推。
  以便于 快速扫清高库龄，腾挪出黄金货柜仓容。

- Story 3：大买家VIP点控对账
  作为 渠道销售总监
  我希望 针对积压大宗，匹配对口的 12 席核心西欧二级代理渠道，自动附带专属大包合签署草稿并短信/邮件直连。
  以便于 依靠大客户大包消化快速去库 40%+`
        },
        {
          title: '验收标准 (Acceptance Criteria)',
          emoji: '✔️',
          content: `1. 动销数据对齐：系统在读取包含冬季 SKU 列表、最新销量、单位成本及仓储库龄的报表后，应能将商品科学规入: [低流大库/断码积压/良性流速] 状态分库。
2. 目标解译转化：用户输入自然语言促销量目标，系统完整编译至 \`BusinessGoal\` 规范模型。
3. Playbook 多角色辩论：
   - 协同 Roundtable 应在 2 秒内呈现 5 个智能体专家的论域见地。
   - 所有论述不得有逻辑冲突（例如 Inventory 批准补货的同时 Commander 却要求熔断）。
4. 产出具体的 ERP 草案：
   - 列出建议改写变体的特定 SKU ID、标价和下浮折扣参数（必须好于且在 marginChangeRate 安全阈值内）。
   - 给出具体的「优惠代金券草卷」及 WhatsApp 引流模版。
5. 一键热部署：商家敲定「核准发布」后，系统自动在 activeRules 中追加一条 “库存>500件 & 气温偏差>+2°C ➔ 折让35%并群给优惠” 规则，并生成一条真实的 WMS 库存转移与限时特卖任务。`,
          dataToCopy: `【验收标准 (Acceptance Criteria)】
1. 行业特征自适应: 读取 'fashion_wholesale' 行业后，系统必须能精确自动甄别出冬大衣等大宗季节货品的库龄费率。
2. 目标全编译: 用户下发目标指令，系统能精准将 Metrics 拆分为 GMV, Margin, Inventory Max, Refund 四个底座参数并呈列。
3. 动态 Roundtable: Roundtable 对账流中，5 大智能体发言自洽，且其 tradeoff 选择完全契合 priorityWeights 配置比例。
4. 草稿一键可用: 必须生产包含特定 SKU 的折扣变体 JSON、针对受众的优惠券规则实体、一键下达 WMS 和 CRM 开关的动作卡，并在老板按下「同意执行」后真实注入 Rules 集和 Tasks 库。`
        }
      ]
    },
    restaurant_repurchase: {
      id: 'restaurant_repurchase',
      industry: 'restaurant_takeout',
      title: '🍔 餐馆外卖 – 客单价提升 & 复购智能体 (Epic-002)',
      subtitle: 'Dynamic Bundle Mergence & Automated 72h Repurchase Flow Broker with Real-time ETA Fraud Interceptor',
      category: '餐馆外卖行业 · 极速流高黏性高客质复购体系',
      emoji: '🍔',
      badge: 'EPIC-002 | RESTAURANT_TAKEOUT',
      sections: [
        {
          title: '背景 & 业务痛点 (Background & Pain Points)',
          emoji: '📋',
          content: `• 行业：餐馆外卖 (restaurant_takeout)
• 典型痛点：
  1. 客单均价（AOV）偏低。消费者常处于“点一个常规午餐主食就走”的状态，缺乏对小餐配食、高毛利冰饮与配汤的一体式组配，导致商家单笔订单创收度低，打包与包装固定成本折损严重。
  2. 平台抽成高、商家利润薄。各大外卖聚合平台（扣除分店与支付分账）扣率高达 25%-30%，若无客单流速保障，商家的净毛利率（Margin %）极易被压榨到 8% 以下的生死警戒线。
  3. 老顾客（回头率）价值巨大，但极其缺乏科学、适时的「二次下单优惠与回购关怀」自动化机制。运营人员：
     - 不懂得如何做合理的套餐定价（打折过猛导致亏本，打折过克制则形同虚设）。
     - 无法智能交叉匹配哪几款核心菜品（如招牌黑椒牛肉面）最亲和小餐小食，形成高亲和力的三合一套餐。
     - 缺乏精准触达，不懂下单后在什么时限（如 2 小时还是 N+3 天）发催付回购券、发给谁、发何种菜品上新通知。
  4. 现在的外卖系统多属于静态货架，无法自动为第二次复购用户自动开启备餐保留，更无法在配送出现争议时快速做出时效抗辩。`,
          dataToCopy: `EPIC: 🍔 餐馆外卖 – 客单价提升 & 复购智能体 (Epic-002)

【背景 & 业务痛点】
- 行业: 餐馆外卖 (restaurant_takeout)
- 典型痛点:
  1. 外卖客单价 (AOV) 集中在单一主食，小食饮料搭配率不足 12%，单单无起色。
  2. 平台分账抽佣高 (25-30%)，压缩商家纯利润空间，急需通过组合套餐以及常客直接留存来提纯净毛利。
  3. 无熟客培育机制。首单买家成交后面临 75% 的极速沉默率。什么时候发券、包成什么套餐、配餐有效期在 3 小时食材周期内如何协调，都是系统痛点。`
        },
        {
          title: '业务目标 (Business Goal)',
          emoji: '🎯',
          content: `【目标表述】以客单价 AOV 平均拉高 15-20%、近期首单买家回头率（30天留存率）拔高 25% 为靶标，构建全栈流。
【目标数据模型 (BusinessGoal Model Template)】
\`\`\`typescript
const goal: BusinessGoal = {
  timeRange: {
    preset: 'next_month', // 定焦下个月常态运营
  },
  metricsTarget: {
    gmvChangeRate: 0.18,                  // 月度 GMV 带动提升 18% (依靠 AOV 及复购拉动)
    marginChangeRate: -0.04,              // 套餐让渡毛利退守度限制在 -4% 内
    inventoryTurnoverDaysMax: 3,          // 生鲜食材有效期极其硬核，周转天数硬控在 3 天内 (即时清销)
    refundRateMax: 0.015,                 // 配送引发的客诉争议退款率阻断在 1.5% 以内
  },
  priorityWeights: {
    gmv: 0.25,                            // 25% 
    margin: 0.20,                         // 20%
    inventoryHealth: 0.10,                // 10% (对于餐馆外卖即生鲜废损优化)
    retention: 0.35,                      // 留存留人极端优先 35% (复购强硬提振)
    risk: 0.10,                           // 配送 SLA 差纠纷卡控 10%
  },
};
\`\`\``,
          dataToCopy: `【业务目标】
提升外卖平均客单价 15%-20%，同时降低首单后流失率，下月外卖 LTV 提速。

【BusinessGoal 模型配置】
const goal: BusinessGoal = {
  timeRange: { preset: 'next_month' },
  metricsTarget: {
    gmvChangeRate: 0.18,
    marginChangeRate: -0.04,
    inventoryTurnoverDaysMax: 3,
    refundRateMax: 0.015
  },
  priorityWeights: {
    gmv: 0.25,
    margin: 0.20,
    inventoryHealth: 0.10,
    retention: 0.35,
    risk: 0.10
  }
};`
        },
        {
          title: 'Ops Commander 「客单与复购 Playbook」结构 (Playbook Schema)',
          emoji: '🔄',
          content: `主目标：「通过黄金经典套餐组合、二单高亲和力 WhatsApp 流，提高客单价 AOV 和老客复购率。」

1. 概览模块 (Overview Block)
   - 提取最新 30 天菜单数据与买家订单：
     - 单量排头的主食（例如 经典牛肉堡 / 照烧鸡肉便当）
     - 配搭率最低但毛利率最高的爆增因子（原切粗薯、精酿冰茶）
     - 新客与常驻熟客比例、首单完单后的 72 小时沉潜率（流失情况）
2. 行动模块 A：主打三合一“极客能量”套餐 (Interactive Meal Bundle Builder)
   - 定价建议：主菜 + 小食 + 饮料一揽子优惠套餐，定价略低于单买之和的 12-15%，实现 AOV 拉高 25% 的高锚点。
   - 工具输出：在商户端数据库一键上架特定套餐 SKU 标签，并建议直接前置挂载平台展示位。
3. 行动模块 B：新客二单 72 小时无痛回流 Flow (Repurchase Automation Flow V2)
   - 基于「最近首单完成」事件建立三段式通知流：
     - 第一阶段：首完单 1 小时后，全自动生成带有亲切语调的关怀问候，并注入“后厨精选手作小布丁”特惠券。
     - 第二阶段：完单 N+3 天，给尚未复购者发送：老顾客专享 15% 极速直下券（有效限时 72 小时）。
     - 第三阶段：完单 N+10 天，根据首单饮食偏好（高蛋白或轻食素食）定向群派对应新品召回。
4. 行动模块 C：配送纠纷与差评风控制御 (Real-time ETA Fraud Interceptor)
   - 外卖行业最频发的纠纷来自于虚假未妥投。Pricing 和 Risk 智能体联动：
     - 整合地图时效（ETA API）交叉比对骑手轨迹。
     - 对常买常订的星级老客，开启免检白名单，削减退换款阻滞；对高频欺诈可疑 BIN 卡自动拉起拒收。`,
          dataToCopy: `【Ops Commander 「客单与复购 Playbook」结构】
1. 【概览模块】餐食结构洞察:
   - AOV（平均客单价）与主食单点率
   - 黄金可搭配增量组合（主食+小点+即冰红茶）
   - 新老顾客比值、沉默留蓄漏斗
2. 【行动模块 A (三合一套餐化)】
   - 定价：经典牛肉 Burger + 脆香原切薯条 + 冰萃草本茶 三合一套餐
   - 绑定套餐价 €19.9 (相较原价 €24 单点折退 15%），引爆 AOV 实物拉升
3. 【行动模块 B (72h 二单促活流)】
   - 下单+1小时：后厨感谢卡与附餐布丁加赠邀请件
   - 下单+3天：限时 72 小时复归 15% 专享催订红包
   - 下单+10天：根据口味标签（素食、海鲜、麻辣）精准推介热选
4. 【行动模块 C (配送纠纷高盾防御)】
   - 风控智能体联动骑手 ETA 物理妥投轨迹，拦截非实未妥投争议，将客诉赔付限制在 1.5% 指标红线内
   - 老订户绿卡特信保护，欺诈黄牛拒结，兼顾客户满意度与风险防线`
        },
        {
          title: '协作智能体与工具链 (Agent Routing & Services Sequence)',
          emoji: '⛓️',
          content: `• 协同智能体角色 (Collaborative Agents)：
  1. Ops Commander（大脑）：解译 AOV 指标红线、加载多模态数据（如后厨产能谱、顾客回票率）、统领 Roundtable。
  2. Pricing Agent（定价总监）：识别高搭配偏向 SKU，按毛利率极限，合成最优套餐价 €19.9。
  3. Marketing Agent（CRM 催付特使）：部署 WhatsApp 限时代金券流，根据新客饮食标签自动配对菜谱。
  4. Inventory Agent（供应链保障官）：食材保鲜期管理，联动后厨进行实时热门保留备库。
  5. Risk Agent（风控主管）：监控配送纠纷，利用 ETA 与常客白名单防御退退欺诈。

• 服务工具 API 链路 (Execution Sequence Flow)：
  1. Pricing 智能体发言：
     - 调用 MenuService.getTopItems(shopId) 和 PricingService.generateMealBundles(...) 动态得出 Burger+粗配薯条+可乐组合。
  2. Marketing 智能体发言：
     - 调 CustomerService.getRecentFirstOrderCustomers(shopId) 过滤出首单沉默群组。
     - 调 MessageService.createInteractiveFlow(...) 定向将含有二单惊喜的 JSON 内容通过 WhatsApp 异步事件网格下发。
  3. Inventory 智能体发言：
     - 调 InventoryService.monitorFreshnessValidity(...) WMS 与后厨称重联动，防生鲜废损。
  4. Risk 智能体发言：
     - 调 ReviewService.getRecentBadReviews(shopId) 过滤时段性、菜品特异客诉核心区。
     - 调 PaymentService.configureSlaProtectionBorder(...) 拦截欺诈纠纷。`,
          dataToCopy: `【涉及的智能体 & 工具链路】
1. Ops Commander: 解译外卖客单 GMV 以及 LTV 回头概率权重（35% 极高权）-> 开启多方听证会
2. Pricing Agent: 
   - 调 MenuService.getTopItems 获取主菜, 小食搭配矩阵率
   - 调 PricingService.generateMealBundles 建立 $€19.9 套餐底数据
3. Marketing Agent:
   - 调 CustomerService.getRecentFirstOrderCustomers 提取 silent 促归段
   - 调 MessageService.createInteractiveFlow 写入 WhatsApp 限时 15% 折流
4. Inventory Agent:
   - 调 InventoryService.monitorFreshnessValidity 控制食材即时废损（<3天）
5. Risk Agent:
   - 调 ReviewService.getRecentBadReviews 识别易致差评时段并出台优化建议
   - 调 PaymentService.configureSlaProtectionBorder 并配对免检老买家白名单`
        },
        {
          title: '用户故事 (User Stories)',
          emoji: '👥',
          content: `• Story 1: 客单价破零套餐智能配置 (AOV Booster Challenge)
  - 角色：连锁快餐店老板 (Restaurant Executive)
  - 诉求：只要给 AI 主脑发一句「客单价太低，帮我做一波午间主食和小食饮料打包套餐」，系统智能挑选出人气 Truffle 汉堡组合并按 -15% 定价发出上架草稿。
  - 价值：将客单价由平均 €12 促提至 €19.9，实现爆增 AOV。

• Story 2: 首单买家自动化回春 Flow (72h Repurchase Triggger)
  - 角色：餐馆店长/运营主管 (Store Operations Manager)
  - 诉求：我希望系统能像 Shopify Flow 类似把「首单顾客 -> 沉默 3 天 -> 发 15% 催返红包 -> 顺延 7 天没下单 -> 精确推介牛肉新品」一揽子全自动写好并提供效果监控图。
  - 价值：老客回流无需任何人工操盘，自发在下月回收 24% 的二次订单。

• Story 3: 差评爆料与 WMS 出膳协调 (Bad Review Risk Shield)
  - 角色：前厅配餐主管 (Kitchen Coordinator)
  - 诉求：希望系统实时对差评汇总，分析出「极客汉堡在周五傍晚 18:00 后配送延误严重，差评率上升」，并给出一键方案——在高峰时段提前配置半成品熟料准备，并调用 WMS 保鲜警水位。
  - 价值：在源头根除客诉，保全平台外卖高好评评级。`,
          dataToCopy: `【用户故事 (User Stories)】
- Story 1：客单价一揽爆拉
  作为 外卖店长
  我希望 系统能识别主食配餐搭配，自动建议三合一套餐并核算最安全毛利率，一键推送菜单发布。
  以便于 快速将平均人客单价推高 15% 以上。

- Story 2：沉默客 WhatsApp 保温关怀
  作为 餐厅运营负责人
  我希望 针对首单买家系统自发拉起 3 天沉默优惠券派送 WhatsApp 通道与 72h 临期唤醒。
  以便于 物理提振复购和长期生存价值，降低对三方大外卖平台的纯新客流量依赖。

- Story 3：差评卡点纠纷风阻
  作为 面铺店长
  我希望 AI 剖析最近客诉，发现“周五晚出膳慢、牛筋肉柴”缺陷，自动给出时段备菜或降噪建议，并启动妥投验证防御。
  以便于 有效维护常买常消费的回头客黏度。`
        },
        {
          title: '验收标准 (Acceptance Criteria)',
          emoji: '✔️',
          content: `1. 套餐搭配智能逻辑：系统获取菜品资料后，必须识别出主菜（Burgers/Pizzas）、小边食（Fries/Wings）、饮水（Colas/Beers），并且生成的 2-3 个套餐配置具有商业语义结合度，严禁推荐“汉堡搭配牛肉面”等荒谬混乱。
2. 折价让利核校：所有提呈的套餐包，其折后单价必须在 marginChangeRate 负向毛利率损失允许上限（-4%）之内，保留健康的底子盈利。
3. 自动化复购 Flow 生成：
   - 自动生成完备的三阶段 WhatsApp/邮件推送文案草案、触发阀值逻辑和时限。
   - 老板在 cockpit 确认「全量激活」后，该二单回春 Flow 将物理同步至 Rules 注册表。
4. ETA 防欺诈验证：Risk 模块在拦截配送退款争议时，需表现出与骑手物理时延、到达坐标进行逻辑对账，不符合客观坐标时自动判定商户胜诉。
5. 常客信用隔离：老订户（回购>3次且无退款记录）应被自动打上星级常客标，享有争议赔付绿色物理免检通道。`,
          dataToCopy: `【验收标准 (Acceptance Criteria)】
1. 拼配不串味: 生成的三合一套餐必须语义极其相关（主食+即食佐餐+原切饮品），拒绝出现离奇跨界的拼拼。
2. 收益算清: 套餐整体折率必须在允许毛利让渡（-4%）内进行帕累托求解，维持合理利润。
3. 新客触达流实时转化: 自动输出完整的 72h WhatsApp 召回触发事件链，包含精准的转化、满减券金额与到期封顶提醒文案。
4. 防薅羊毛 ETA 卡控: 用户恶意索赔未投递时，风控智能体需调取快递 ETA 实轴坐标，判定不实无理由，对账驳回。`
        }
      ]
    }
  };

  const activeEpic = epicsData[activeEpicId];

  return (
    <div id="epic-blueprints-view" className="space-y-6 text-left animate-fadeIn font-sans">
      
      {/* Dynamic Header */}
      <div className="border-b border-slate-200 pb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Code className="w-5.5 h-5.5 text-indigo-650" />
            <span>👨‍💻 平台超级操盘与智能引擎 - 开发者与设计样板 Epic 中心</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            本页是为产品经理（PM）与研发人员（R&D）提供的高度结构化、多智能体深度样板库（EPIC 黄金白皮书）。支持一键拷贝段到 Jira、飞书或 Trello，且可直接转至仿真沙盘模拟物理协同博弈！
          </p>
        </div>
        <div className="bg-indigo-50 border border-indigo-150 px-3 py-1.5 rounded-lg text-[10.5px] font-bold text-indigo-700 font-mono animate-pulse">
          ⚡ 平台已解锁 V2 双行业深度 Brain Spec 
        </div>
      </div>

      {/* Primary Selector Buttons: Large high-fidelity toggle cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => {
            setActiveEpicId('fashion_clearance');
            onAddSystemLog('Epic Document', '查阅服装行业白皮书', '加载 👕 服装设计批发 – 季末库存清理智能体 (Epic-001) 全部需求包', 'info');
          }}
          className={`flex items-start gap-4 p-4.5 rounded-2xl border text-left transition-all hover:shadow-md cursor-pointer ${activeEpicId === 'fashion_clearance' ? 'bg-indigo-50/70 border-indigo-500 ring-1 ring-indigo-500/30 text-indigo-900' : 'bg-white border-slate-200 text-slate-600'}`}
        >
          <span className="bg-indigo-100 text-indigo-600 p-2.5 rounded-xl text-lg font-bold">👕</span>
          <div className="space-y-1">
            <span className="text-[10px] bg-indigo-200/50 text-indigo-850 px-2 py-0.5 rounded-md font-mono font-black border border-indigo-200 uppercase tracking-widest leading-none">EPIC-001</span>
            <h3 className="font-extrabold text-sm text-slate-900 mt-1">服装批发的「季末高库清理」</h3>
            <p className="text-[11px] text-slate-500 leading-normal font-semibold">以 Inventory Health 为一等权，让渡 5% 利润博取 25% GMV 提拉，利用偏码买断与大户推送完成 2 个月 70% 冬季出清。</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveEpicId('restaurant_repurchase');
            onAddSystemLog('Epic Document', '查阅餐馆外卖白皮书', '加载 🍔 餐馆外卖 – 客单价提升 & 复购智能体 (Epic-002) 全部需求包', 'info');
          }}
          className={`flex items-start gap-4 p-4.5 rounded-2xl border text-left transition-all hover:shadow-md cursor-pointer ${activeEpicId === 'restaurant_repurchase' ? 'bg-indigo-50/70 border-indigo-500 ring-1 ring-indigo-500/30 text-indigo-900' : 'bg-white border-slate-200 text-slate-600'}`}
        >
          <span className="bg-indigo-100 text-indigo-600 p-2.5 rounded-xl text-lg font-bold">🍔</span>
          <div className="space-y-1">
            <span className="text-[10px] bg-indigo-200/50 text-indigo-850 px-2 py-0.5 rounded-md font-mono font-black border border-indigo-200 uppercase tracking-widest leading-none">EPIC-002</span>
            <h3 className="font-extrabold text-sm text-slate-900 mt-1">餐馆外卖的「客单价与二次复购」</h3>
            <p className="text-[11px] text-slate-500 leading-normal font-semibold">以 Retention（留存）获 35% 超高突围权，三合一套餐（主菜+薯条+冰红茶）拔高 AOV，72 小时 WhatsApp 关流促熟客回流。</p>
          </div>
        </button>
      </div>

      {/* Main Container Grid: Document Body (Left 2 columns) + Local R&D Sandbox Progress (Right column) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Document Body */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
            
            {/* Whitebook Meta */}
            <div className="border-b border-slate-100 pb-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] bg-slate-100 text-slate-600 font-extrabold px-2 py-0.5 rounded uppercase font-mono border border-slate-150">
                  {activeEpic.badge}
                </span>
                <h3 className="text-base font-black text-slate-900 mt-2">{activeEpic.title}</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed font-semibold font-mono mt-1">{activeEpic.subtitle}</p>
                <p className="text-[10px] text-[#9F7AEA] font-bold mt-1">应用范畴：{activeEpic.category}</p>
              </div>

              {/* Direct Simulation Switch Route Button */}
              <button
                type="button"
                onClick={() => {
                  const playbookSpec = activeEpicId === 'fashion_clearance' ? 'seasonal_clearance' : 'increase_aov_with_meal_bundles';
                  onSwitchToSimulation(activeEpic.industry, playbookSpec);
                }}
                className="bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-indigo-100"
              >
                <Play className="w-3.5 h-3.5 text-white animate-pulse" />
                <span>🔮 转至沙盒仿真此 Epic</span>
              </button>
            </div>

            {/* Structured Collapsible Sections with Copy Buttons */}
            <div className="space-y-4">
              {activeEpic.sections.map((sec, idx) => (
                <div key={idx} className="bg-slate-55 border border-slate-220 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-210 pb-2">
                    <h4 className="font-extrabold text-[#3182CE] text-xs flex items-center gap-1.5 font-sans">
                      <span className="text-base">{sec.emoji}</span>
                      <span>{sec.title}</span>
                    </h4>
                    
                    <button
                      type="button"
                      onClick={() => handleCopy(sec.dataToCopy, `${activeEpicId}_sec_${idx}`)}
                      className={`px-2.5 py-1 text-[10px] font-bold rounded border transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                        copiedSection === `${activeEpicId}_sec_${idx}`
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-700 font-extrabold'
                          : 'bg-white border-slate-200 hover:border-slate-350 text-slate-600 hover:text-slate-800'
                      }`}
                    >
                      {copiedSection === `${activeEpicId}_sec_${idx}` ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>已拷贝至剪切板</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>拷贝本段需求 (Copy)</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-xs text-slate-700 leading-relaxed font-semibold whitespace-pre-wrap font-sans bg-white p-3.5 rounded-lg border border-slate-100 shadow-inner max-h-[350px] overflow-y-auto">
                    {sec.content}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Local R&D Sandbox Progress: The Sidebar panel */}
        <div className="space-y-6">
          
          {/* Engineering Roadmap checklist */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-4">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
              <Terminal className="w-4.5 h-4.5 text-indigo-400" />
              <span>本地研发及对接验证进度</span>
            </h3>
            
            <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
              研发团队（R&D）可以通过以下模拟清单，点击跟踪这些在 RAG/数据库与智能体决策底座之间的对接子卡片。数据是由多店沙盒双盲对账输出。
            </p>

            <div className="border-t border-slate-800/80 pt-4 space-y-3 text-xs">
              <span className="text-[10px] text-[#A0AEC0] font-black uppercase tracking-wider block">
                {activeEpicId === 'fashion_clearance' ? '👕 Clothing Wholesale Liquidation Roadmap' : '🍔 Food AOV & Repurchase Repurchase Tasks'}
              </span>

              <div className="space-y-2.5">
                {tasks[activeEpicId === 'fashion_clearance' ? 'fashion' : 'restaurant'].map(t => (
                  <button
                    key={t.id}
                    onClick={() => toggleTask(activeEpicId === 'fashion_clearance' ? 'fashion' : 'restaurant', t.id)}
                    className="w-full border border-slate-800 bg-slate-950/60 p-2.5 rounded-xl text-left transition-all hover:bg-slate-950 hover:border-slate-700 flex items-start gap-2.5 font-sans cursor-pointer group"
                  >
                    <span className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${t.status ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-700 group-hover:border-slate-500'}`}>
                      {t.status && <Check className="w-3 h-3 text-white stroke-[4]" />}
                    </span>
                    <div>
                      <p className={`font-medium tracking-wide text-[11px] leading-snug ${t.status ? 'text-slate-400 line-through' : 'text-slate-200 font-bold'}`}>
                        {t.text}
                      </p>
                      <span className={`text-[8.5px] font-mono leading-none inline-block mt-1 font-black ${t.status ? 'text-emerald-500 bg-emerald-500/10 px-1 py-0.5 rounded' : 'text-amber-500 bg-amber-500/10 px-1 py-0.5 rounded'}`}>
                        {t.status ? 'COMMITTED_✓' : 'DEV_PENDING'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="pt-3 border-t border-slate-800 space-y-1.5 font-mono">
                <div className="flex justify-between text-[10px] text-slate-400 font-extrabold">
                  <span>对账及部署覆盖率:</span>
                  <span className="text-indigo-400 font-black">
                    {Math.round((tasks[activeEpicId === 'fashion_clearance' ? 'fashion' : 'restaurant'].filter(t => t.status).length / 5) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-1 border border-slate-800 overflow-hidden">
                  <div 
                    style={{ width: `${(tasks[activeEpicId === 'fashion_clearance' ? 'fashion' : 'restaurant'].filter(t => t.status).length / 5) * 100}%` }}
                    className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick copy warning */}
          <div className="bg-indigo-950/20 border border-indigo-905/30 rounded-2xl p-4.5 text-xs text-left font-sans space-y-2.5">
            <h4 className="text-[11px] font-black uppercase text-indigo-400 tracking-wider flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>智能开发小贴士 (Dev Tips)</span>
            </h4>
            <p className="text-slate-400 leading-relaxed font-semibold">
              在团队对账和排排卡时，直接按上方的**「拷贝本段需求」**。我们提供的需求 JSON 包含 BusinessGoal 字典和 Agent 路由时序链路，可直接粘贴输入至团队的自动化流程执行节点或者是 Jira EPIC 主单。
            </p>
          </div>
          
        </div>

      </div>

    </div>
  );
}
