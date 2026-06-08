import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Users, 
  DollarSign, 
  Clock, 
  ArrowRight, 
  X, 
  Activity, 
  Package, 
  Megaphone, 
  Plus, 
  Coins 
} from 'lucide-react';
import { IndustryType, ProductItem, OrderItem } from '../types';

interface SaaSMerchantWorkbenchProps {
  selectedIndustry: IndustryType;
  companyName: string;
  onUpdateCompanyName: (name: string) => void;
  products: ProductItem[];
  orders: OrderItem[];
  onAddProduct: (title: string, sku: string, stock: number, price: number) => void;
  onPopulateSampleData: () => void;
  onRestockProduct: (sku: string) => void;
  onAuditOrder: (orderId: string) => void;
  onOpenOnlineStorefront: () => void;
  addLog: (agent: string, action: string, details: string, type: 'info' | 'success' | 'warning' | 'error' | 'tool') => void;
  isCommandCenterOpen: boolean;
  onToggleCommandCenter: () => void;
}

interface RecentTask {
  id: string;
  taskType: string;
  targetModule: string;
  time: string;
  status: '待执行' | '执行中' | '已完成' | '失败';
}

export default function SaaSMerchantWorkbench({
  selectedIndustry,
  companyName,
  onUpdateCompanyName,
  products,
  orders,
  onAddProduct,
  onPopulateSampleData,
  onRestockProduct,
  onAuditOrder,
  onOpenOnlineStorefront,
  addLog,
  isCommandCenterOpen,
  onToggleCommandCenter
}: SaaSMerchantWorkbenchProps) {
  
  // Real-time calculation helper
  const totalSalesVal = orders.reduce((sum, o) => o.status !== 'Refunded' ? sum + o.total : sum, 0) || 5800.00;
  const orderCount = orders.length || 24;
  const customerCount = Math.floor(orderCount * 0.75) || 18;
  const profitMargin = 0.35; 
  const totalProfitVal = totalSalesVal * profitMargin;

  // Simplified business task list
  const [tasks, setTasks] = useState<RecentTask[]>([
    { id: '101', taskType: '商品库存安全水平诊断', targetModule: '库存管理', status: '已完成', time: '00:18:22' },
    { id: '102', taskType: '跨境物流清关报关单校验', targetModule: '订单管理', status: '执行中', time: '00:19:40' },
    { id: '103', taskType: '商品多语种描述自动转化', targetModule: '商品管理', status: '已完成', time: '00:15:10' },
    { id: '104', taskType: '退款单高危欺诈核查拦截', targetModule: '订单管理', status: '待执行', time: '00:19:55' },
    { id: '105', taskType: '首季大促优惠折扣下发', targetModule: '营销中心', status: '已完成', time: '00:10:05' }
  ]);

  // Operational states 
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState(69);
  const [newStock, setNewStock] = useState(100);

  const handleAddNewSKU = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const generatedSku = `SKU-${Date.now().toString().slice(-4)}`;
    onAddProduct(newTitle, generatedSku, newStock, newPrice);
    setNewTitle('');
    setShowAddForm(false);
    addLog('System', '创建新商品', `手动注册商品「${newTitle}」, 标价 $${newPrice}, 初始库存 ${newStock}`, 'success');

    // Add back into our local tasks table 
    const newTask: RecentTask = {
      id: Date.now().toString().slice(-3),
      taskType: `创建商品 ${newTitle}`,
      targetModule: '商品管理',
      status: '已完成',
      time: '刚刚'
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const handleTriggerTaskRun = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        addLog('System', '重运行背景任务', `手动触发外部任务 [${t.taskType}]`, 'info');
        return { ...t, status: '已完成', time: '刚刚' };
      }
      return t;
    }));
  };

  const handleStopTaskRun = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        addLog('System', '中止背景任务', `手动结束外部任务 [${t.taskType}]`, 'warning');
        return { ...t, status: '失败' };
      }
      return t;
    }));
  };

  return (
    <div className="space-y-6 text-slate-900 select-none font-sans animate-fadeIn">
      
      {/* 顶部店铺配置栏 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5 text-left">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            {companyName}
          </h2>
          <p className="text-xs text-slate-500">
            控制台
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={onOpenOnlineStorefront}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors active:scale-95 flex items-center gap-1 cursor-pointer"
          >
            <span>查看商城</span>
            <ArrowRight className="w-3 h-3 text-slate-300" />
          </button>
        </div>
      </div>

      {/* ========================================== */}
      {/* 第一排：今日核心数据看板 */}
      {/* ========================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: 今日销售额 */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors text-left relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-bold">今日销售额</span>
            <div className="w-7 h-7 rounded-lg bg-[#e6fafc] flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-[#07C2E3]" />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-1.5">
            <span className="text-2xl font-black font-mono text-slate-900">${totalSalesVal.toFixed(2)}</span>
          </div>
          <div className="mt-1.5 text-[10px] text-slate-400 font-medium">包含试用下单和自动铺货成交</div>
        </div>

        {/* Card 2: 今日订单 */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors text-left relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-bold">今日订单</span>
            <div className="w-7 h-7 rounded-lg bg-[#e6fafc] flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-[#07C2E3]" />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-1.5">
            <span className="text-xl font-black font-mono text-slate-900">{orderCount} 笔</span>
          </div>
          <div className="mt-1.5 text-[10px] text-slate-400 font-medium">其中 {products.filter(p => p.stock <= p.minStockThreshold).length} 笔订单触发了补库预警</div>
        </div>

        {/* Card 3: 今日客户 */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors text-left relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-bold">今日客户</span>
            <div className="w-7 h-7 rounded-lg bg-[#e6fafc] flex items-center justify-center">
              <Users className="w-4 h-4 text-[#07C2E3]" />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-1.5">
            <span className="text-xl font-black font-mono text-slate-900">{customerCount} 人</span>
          </div>
          <div className="mt-1.5 text-[10px] text-slate-400 font-medium">新增注册买家复购率为 38.4%</div>
        </div>

        {/* Card 4: 今日利润 */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors text-left relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-bold">今日利润</span>
            <div className="w-7 h-7 rounded-lg bg-[#e6fafc] flex items-center justify-center">
              <Activity className="w-4 h-4 text-[#07C2E3]" />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-1.5">
            <span className="text-2xl font-black font-mono text-slate-900">${totalProfitVal.toFixed(2)}</span>
          </div>
          <div className="mt-1.5 text-[10px] text-slate-400 font-medium">平均毛利率比例为 {profitMargin * 100}%</div>
        </div>

      </div>

      {/* ========================================== */}
      {/* 第二排：待办监控计数 */}
      {/* ========================================== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-white hover:bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between transition-colors text-left">
          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">待发货</span>
            <span className="text-base font-black text-slate-900 font-mono">
              {orders.filter(o => o.status === 'Pending' || o.status === 'AI Confirmed').length || 5} 件
            </span>
          </div>
          <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-full border border-amber-100">
            等待打单
          </span>
        </div>

        <div className="bg-white hover:bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between transition-colors text-left">
          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">待退款</span>
            <span className="text-base font-black text-slate-900 font-mono">
              {orders.filter(o => o.status === 'Refund Requested').length || 2} 单
            </span>
          </div>
          <span className="text-[10px] bg-rose-50 text-rose-700 font-bold px-2 py-0.5 rounded-full border border-rose-100">
            高危拦截
          </span>
        </div>

        <div className="bg-white hover:bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between transition-colors text-left">
          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">待审批</span>
            <span className="text-base font-black text-slate-900 font-mono">3 个</span>
          </div>
          <span className="text-[10px] bg-[#e6fafc] text-[#07C2E3] font-bold px-2 py-0.5 rounded-full border border-[#bef1fa]">
            资金拨付
          </span>
        </div>

        <div className="bg-white hover:bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between transition-colors text-left">
          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">待处理</span>
            <span className="text-base font-black text-slate-900 font-mono">
              {products.filter(p => p.stock <= p.minStockThreshold).length || 1} 预警
            </span>
          </div>
          <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-full border border-[#bef1fa]">
            补足安全
          </span>
        </div>

      </div>

      {/* ========================================== */}
      {/* 第三排：AI岗位运行数据统计 */}
      {/* ========================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-900 text-white p-5 rounded-2xl border border-slate-800">
        
        <div className="text-left space-y-1">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">AI员工在线</p>
          <div className="flex items-center gap-2">
            <span className="text-base font-black text-white">6 名智能助理</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <p className="text-[10px] text-slate-500">已部署：采买、风控、分配、客服岗</p>
        </div>

        <div className="text-left space-y-1">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">今日执行背景任务</p>
          <div className="flex items-center gap-2">
            <span className="text-base font-black text-white font-mono">1,420 次交互</span>
          </div>
          <p className="text-[10px] text-slate-500">执行流程覆盖率达 94.6% 以上</p>
        </div>

        <div className="text-left space-y-1">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">决策执行成功率</p>
          <div className="flex items-center gap-2">
            <span className="text-base font-black text-white font-mono">99.2%</span>
          </div>
          <p className="text-[10px] text-slate-500">极速审核，0 件由于技术中断导致延误</p>
        </div>

        <div className="text-left space-y-1">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">今日节省人工成本</p>
          <div className="flex items-center gap-2">
            <span className="text-[#07C2E3] text-base font-black font-mono">$4,850.00</span>
          </div>
          <p className="text-[10px] text-slate-500">相当于海外人工客服 184 工时</p>
        </div>

      </div>

      {/* ========================================== */}
      {/* 第四排：核心功能快捷入口 */}
      {/* ========================================== */}
      <div className="text-left space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">核心模块快捷入口</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          
          <button 
            type="button"
            onClick={() => {
              addLog('Shortcut', '直达商品中心', '进入商品配置管理', 'info');
              setShowAddForm(true);
            }}
            className="p-3 bg-white border border-slate-200 hover:border-[#07C2E3] hover:shadow-sm rounded-xl text-left transition-all active:scale-95 flex flex-col justify-between h-20 cursor-pointer"
          >
            <Package className="w-5 h-5 text-slate-700" />
            <span className="text-xs font-bold text-slate-800">商品管理 &rarr;</span>
          </button>

          <button 
            type="button"
            onClick={() => {
              addLog('Shortcut', '直达订单中心', '查看当前交易订单', 'info');
              onToggleCommandCenter();
            }}
            className="p-3 bg-white border border-slate-200 hover:border-[#07C2E3] hover:shadow-sm rounded-xl text-left transition-all active:scale-95 flex flex-col justify-between h-20 cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5 text-slate-700" />
            <span className="text-xs font-bold text-slate-800">订单管理 &rarr;</span>
          </button>

          <button 
            type="button"
            onClick={() => addLog('Shortcut', '直达客户中枢', '加载注册消费者统计数据', 'info')}
            className="p-3 bg-white border border-slate-200 hover:border-[#07C2E3] hover:shadow-sm rounded-xl text-left transition-all active:scale-95 flex flex-col justify-between h-20 cursor-pointer"
          >
            <Users className="w-5 h-5 text-slate-700" />
            <span className="text-xs font-bold text-slate-800">客户管理 &rarr;</span>
          </button>

          <button 
            type="button"
            onClick={() => {
              onPopulateSampleData();
              addLog('Shortcut', '触发自动采购', '分析安全货源线并下发采购', 'success');
            }}
            className="p-3 bg-white border border-slate-200 hover:border-[#07C2E3] hover:shadow-sm rounded-xl text-left transition-all active:scale-95 flex flex-col justify-between h-20 cursor-pointer"
          >
            <Clock className="w-5 h-5 text-slate-700" />
            <span className="text-xs font-bold text-slate-800">库存管理 &rarr;</span>
          </button>

          <button 
            type="button"
            onClick={() => addLog('Shortcut', '直达营销中心', '全渠道活动优惠编排', 'info')}
            className="p-3 bg-white border border-slate-200 hover:border-[#07C2E3] hover:shadow-sm rounded-xl text-left transition-all active:scale-95 flex flex-col justify-between h-20 cursor-pointer"
          >
            <Megaphone className="w-5 h-5 text-slate-700" />
            <span className="text-xs font-bold text-slate-800">营销中心 &rarr;</span>
          </button>

          <button 
            type="button"
            onClick={() => addLog('Shortcut', '直达财务中心', '清分本期交易资金扣减', 'info')}
            className="p-3 bg-white border border-slate-200 hover:border-[#07C2E3] hover:shadow-sm rounded-xl text-left transition-all active:scale-95 flex flex-col justify-between h-20 cursor-pointer"
          >
            <Coins className="w-5 h-5 text-slate-700" />
            <span className="text-xs font-bold text-slate-800">财务中心 &rarr;</span>
          </button>

        </div>
      </div>

      {/* ========================================== */}
      {/* 极速上架新商品 (表单) */}
      {/* ========================================== */}
      {showAddForm && (
        <div className="bg-white border-2 border-[#07C2E3] rounded-xl p-4 text-left space-y-4 shadow-sm animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
              <Plus className="w-4 h-4 text-[#07C2E3]" />
              <span>创建商品</span>
            </div>
            <button 
              onClick={() => setShowAddForm(false)} 
              className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <form onSubmit={handleAddNewSKU} className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="md:col-span-2 space-y-1">
              <label className="text-[10px] text-slate-400 font-bold block uppercase">商品名称 *</label>
              <input 
                type="text" 
                required 
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="例如: 智能降噪蓝牙耳机 Pro"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#07C2E3] focus:bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-bold block uppercase">零售定价 ($) *</label>
              <input 
                type="number" 
                required 
                min="1"
                value={newPrice}
                onChange={(e) => setNewPrice(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#07C2E3] focus:bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-bold block uppercase">初始库存量 *</label>
              <input 
                type="number" 
                required 
                min="0"
                value={newStock}
                onChange={(e) => setNewStock(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#07C2E3] focus:bg-white items-center flex"
              />
            </div>
            <div className="md:col-span-4 flex justify-end gap-2 pt-2 border-t border-slate-50">
              <button 
                type="button" 
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition-colors"
              >
                取消
              </button>
              <button 
                type="submit" 
                className="px-5 py-2 bg-[#07C2E3] hover:bg-[#06B2D0] active:bg-[#059BBC] text-white font-bold text-xs rounded-lg transition-all active:scale-95 cursor-pointer"
              >
                确认创建
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================== */}
      {/* 第五排：最近任务 (精简表格) */}
      {/* ========================================== */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col text-left">
        
        <div className="px-5 py-4 border-b border-slate-150 flex items-center justify-between bg-slate-50/50">
          <div className="space-y-1">
            <h3 className="font-extrabold text-slate-800 text-sm">最近任务</h3>
            <p className="text-[10px] text-slate-500">自动监控和同步业务模块的任务进度与当前状态。</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">
                <th className="p-3 w-16">任务编号</th>
                <th className="p-3">任务类型</th>
                <th className="p-3">所属模块</th>
                <th className="p-3">创建时间</th>
                <th className="p-3">当前状态</th>
                <th className="p-3 text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {tasks.map((task) => {
                let badgeClass = 'bg-slate-100 text-slate-500';
                if (task.status === '已完成') badgeClass = 'bg-emerald-50 text-emerald-700 border border-emerald-100';
                if (task.status === '执行中') badgeClass = 'bg-sky-50 text-[#07C2E3] border border-sky-100 animate-pulse';
                if (task.status === '待执行') badgeClass = 'bg-amber-50 text-amber-700 border border-amber-100';
                if (task.status === '失败') badgeClass = 'bg-rose-50 text-rose-700 border border-rose-100';

                return (
                  <tr key={task.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-3 font-mono text-slate-400 font-bold">#{task.id}</td>
                    <td className="p-3 text-slate-900 font-bold">{task.taskType}</td>
                    <td className="p-3">
                      <span className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded">
                        {task.targetModule}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-400 text-[10px]">{task.time}</td>
                    <td className="p-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-lg font-bold leading-none ${badgeClass}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            addLog('Task', '查看业务任务', `查看：${task.taskType}`, 'info');
                          }}
                          className="px-2 py-1 bg-[#e6fafc] hover:bg-[#bef1fa] text-[#07C2E3] font-bold text-[9px] rounded transition-transform active:scale-95"
                          title="查看任务详情"
                        >
                          查看
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTriggerTaskRun(task.id)}
                          className="px-2 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 font-bold text-[9px] rounded transition-transform active:scale-95"
                          title="立即重新运行任务"
                        >
                          重试
                        </button>
                        {(task.status === '执行中' || task.status === '待执行') && (
                          <button
                            type="button"
                            onClick={() => handleStopTaskRun(task.id)}
                            className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[9px] rounded transition-transform active:scale-95"
                            title="取消该任务运行"
                          >
                            取消
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
