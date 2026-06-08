import React, { useState, useMemo } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Truck, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Eye, 
  ChevronRight, 
  X, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  TrendingUp, 
  DollarSign, 
  ShieldAlert, 
  CornerDownLeft, 
  FileCheck,
  Send,
  Download
} from 'lucide-react';
import { OrderItem, ProductItem, IndustryType } from '../types';

interface OrderCenterProps {
  orders: OrderItem[];
  products: ProductItem[];
  selectedIndustry: IndustryType;
  addLog: (agent: string, action: string, details: string, type: 'info' | 'success' | 'warning' | 'error' | 'tool') => void;
  onUpdateOrders: (updated: OrderItem[]) => void;
}

// Internal Enriched Order definition for high-fidelity rendering
interface EnrichedOrder extends OrderItem {
  shippingAddress: string;
  paymentMethod: string;
  paymentStatus: '待支付' | '已支付' | '支付失败' | '已取消';
  shippingStatus: '待发货' | '已发货' | '已收货' | '已完成';
  items: {
    sku: string;
    name: string;
    price: number;
    qty: number;
  }[];
  trackingNumber?: string;
  carrier?: string;
  logisticsTimeline: {
    time: string;
    status: string;
    desc: string;
  }[];
  refundReason?: string;
  refundAuditStatus?: '待审批' | '已批准' | '已拒绝';
}

export default function OrderCenter({ 
  orders, 
  products, 
  selectedIndustry, 
  addLog, 
  onUpdateOrders 
}: OrderCenterProps) {
  
  // Tab control inside Order Center
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'unshipped' | 'refunds' | 'tracking'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<EnrichedOrder | null>(null);

  // Track active orderId in context
  React.useEffect(() => {
    const activeId = selectedOrder?.id || (orders[0]?.id || undefined);
    if (typeof window !== 'undefined' && window.AIContextTracker) {
      window.AIContextTracker.setOrderId(activeId);
    }
  }, [selectedOrder?.id, orders]);
  const [showDispatchModal, setShowDispatchModal] = useState<EnrichedOrder | null>(null);
  const [showRefundModal, setShowRefundModal] = useState<EnrichedOrder | null>(null);
  const [showRiskModal, setShowRiskModal] = useState<EnrichedOrder | null>(null);
  const [sortField, setSortField] = useState<'createdAt' | 'total'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Hardcoded shipping details, products bought matching actual products list dynamically or fallback
  const enrichedOrders = useMemo<EnrichedOrder[]>(() => {
    return orders.map((order, idx) => {
      // Find relevant products for realistic allocation
      const matchedProd = products[idx % products.length] || (products[0] ?? { name: '企业级标品货品', sku: 'SKU-001', price: order.total });
      
      const fallbackItems = [
        {
          sku: matchedProd.sku,
          name: matchedProd.name,
          price: matchedProd.price,
          qty: Math.max(1, Math.floor(order.total / matchedProd.price)) || 1
        }
      ];

      // Address mapping
      const addresses = [
        'Room 1402, High-Tech Industrial Park, Nanshan District, Shenzhen, China',
        '350 Fifth Ave, New York, NY 10118, United States',
        '742 Evergreen Terrace, Springfield, OR 97477, United States',
        'Baker Street 221B, London, NW1 6XE, United Kingdom'
      ];
      const address = addresses[idx % addresses.length];

      // Translate database status mapping based on final status chain
      let payStatus: '待支付' | '已支付' | '支付失败' | '已取消' = '已支付';
      let shipStatus: '待发货' | '已发货' | '已收货' | '已完成' = '待发货';
      let refundAudit: '待审批' | '已批准' | '已拒绝' | undefined = undefined;

      if (order.status === 'Pending') {
        payStatus = '待支付';
        shipStatus = '待发货';
      } else if (order.status === 'AI Confirmed') {
        payStatus = '已支付';
        shipStatus = '待发货';
      } else if (order.status === 'Shipped') {
        payStatus = '已支付';
        shipStatus = '已发货';
      } else if (order.status === 'Refund Requested') {
        payStatus = '已支付';
        shipStatus = '待发货';
        refundAudit = '待审批';
      } else if (order.status === 'Refunded') {
        payStatus = '已取消';
        shipStatus = '待发货';
        refundAudit = '已批准';
      } else if (order.status === 'Completed') {
        payStatus = '已支付';
        shipStatus = '已完成';
      } else if (order.status === 'Cancelled') {
        payStatus = '已取消';
        shipStatus = '待发货';
      }

      // Default tracking data
      const carrier = (order.status === 'Shipped' || order.status === 'Completed') ? 'DHL Express' : undefined;
      const tracking = (order.status === 'Shipped' || order.status === 'Completed') ? `DHL-${849204012 + idx}` : undefined;

      // Realistic logistics events
      const logisticsTimeline = [
        { time: '2026-06-07 10:14', status: '已接单', desc: 'SaaS 跨境店铺主系统自动受理客户付款指令。' }
      ];
      if (order.status !== 'Pending') {
        logisticsTimeline.push({ time: '2026-06-07 10:20', status: '已付款', desc: '资金资金结算通道验证无误，付款成功。' });
        logisticsTimeline.push({ time: '2026-06-07 12:00', status: '风控检验', desc: `订单合规风控常规扫描，风险级别评定。风险等级：${order.riskScore >= 60 ? '高风险' : order.riskScore >= 30 ? '中风险' : '低风险'} (${order.riskScore}%)。` });
      }
      if (order.status === 'Shipped' || order.status === 'Completed') {
        logisticsTimeline.push({ time: '2026-06-07 14:30', status: '已出库', desc: '自建仓立体仓库自动分拣配货，并递送至国际包裹分运站。' });
        logisticsTimeline.push({ time: '2026-06-07 18:00', status: '已发货', desc: '航空快件装载起航，交由国际物流承运商 DHL 承运，快递单号: ' + tracking });
      }
      if (order.status === 'Completed') {
        logisticsTimeline.push({ time: '2026-06-08 10:00', status: '已妥投', desc: '航空物流到达目的地分拨中心，顺利派送并签收完成。' });
      }

      return {
        ...order,
        shippingAddress: address,
        paymentMethod: idx % 2 === 0 ? 'International Credit Card' : 'PayPal Standard Checkout',
        paymentStatus: payStatus,
        shippingStatus: shipStatus,
        items: fallbackItems,
        carrier: carrier,
        trackingNumber: tracking,
        logisticsTimeline: logisticsTimeline.reverse(), // most recent first
        refundReason: order.status === 'Refund Requested' || order.status === 'Refunded' ? '买家要求：误购/发货延迟风险拦截。' : undefined,
        refundAuditStatus: refundAudit
      };
    });
  }, [orders, products]);

  // Handle Order Status modifications and syncing back to parent App
  const syncOrdersToParent = (updatedEnriched: EnrichedOrder[]) => {
    // Convert back from Enriched model to base OrderItem to trigger seamless state propagation
    const baseOrders: OrderItem[] = updatedEnriched.map(o => {
      let finalStatus: OrderItem['status'] = o.status;
      
      if (o.status === 'Completed') {
        finalStatus = 'Completed';
      } else if (o.status === 'Cancelled') {
        finalStatus = 'Cancelled';
      } else if (o.status === 'Refunded') {
        finalStatus = 'Refunded';
      } else if (o.status === 'Refund Requested') {
        finalStatus = 'Refund Requested';
      } else if (o.shippingStatus === '已完成') {
        finalStatus = 'Completed';
      } else if (o.shippingStatus === '已发货' || o.shippingStatus === '已收货') {
        finalStatus = 'Shipped';
      } else if (o.paymentStatus === '已支付' && o.shippingStatus === '待发货') {
        finalStatus = 'AI Confirmed'; // "执行中"
      } else if (o.paymentStatus === '待支付') {
        finalStatus = 'Pending';
      }

      return {
        id: o.id,
        customerName: o.customerName,
        contact: o.contact,
        total: o.total,
        status: finalStatus,
        createdAt: o.createdAt,
        riskScore: o.riskScore
      };
    });
    onUpdateOrders(baseOrders);
  };

  // Top level stats counting
  const stats = useMemo(() => {
    return {
      totalSales: enrichedOrders.filter(o => o.status !== 'Refunded').reduce((acc, o) => acc + o.total, 0),
      totalCount: enrichedOrders.length,
      unshippedCount: enrichedOrders.filter(o => o.shippingStatus === '待发货' && o.paymentStatus === '已支付').length,
      refundCount: enrichedOrders.filter(o => o.status === 'Refund Requested').length,
      riskCount: enrichedOrders.filter(o => o.riskScore >= 60).length
    };
  }, [enrichedOrders]);

  // Actions
  const handleDispatchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showDispatchModal) return;

    const carrierValue = (document.getElementById('carrier-input') as HTMLInputElement)?.value || 'DHL Global';
    const trackingValue = (document.getElementById('tracking-input') as HTMLInputElement)?.value || `TRK-${Math.floor(100000 + Math.random() * 900000)}`;

    const nextList = enrichedOrders.map(o => {
      if (o.id === showDispatchModal.id) {
        addLog('Order Center', '发货作业', `执行发货程序。确认承运商 [${carrierValue}]，单号: ${trackingValue}。`, 'success');
        return {
          ...o,
          shippingStatus: '已发货' as const,
          carrier: carrierValue,
          trackingNumber: trackingValue,
          logisticsTimeline: [
            { time: new Date().toISOString().replace('T', ' ').slice(0, 16), status: '已发货', desc: `包裹装箱并发往口岸，由国际快件 ${carrierValue} 专线承运。单号 ${trackingValue}。` },
            ...o.logisticsTimeline
          ]
        };
      }
      return o;
    });

    syncOrdersToParent(nextList);
    setShowDispatchModal(null);
  };

  const handleApproveRefund = (orderId: string, approve: boolean) => {
    const nextList = enrichedOrders.map(o => {
      if (o.id === orderId) {
        if (approve) {
          addLog('Order Center', '退款审核通过', `批准了订单 [#${orderId}] 的退款申请，系统已自动向原支付通道发起收银台退款及物流截单返仓。`, 'success');
          return {
            ...o,
            status: 'Refunded' as const,
            paymentStatus: '已取消' as const,
            refundAuditStatus: '已批准' as const,
            logisticsTimeline: [
              { time: new Date().toISOString().replace('T', ' ').slice(0, 16), status: '订单已取消/退款完成', desc: '退款审核批准，原渠道结算资金自动原路清退。' },
              ...o.logisticsTimeline
            ]
          };
        } else {
          addLog('Order Center', '退款审核拒绝', `拒绝了订单 [#${orderId}] 的退款申请。单据恢复履行配货程序。`, 'warning');
          return {
            ...o,
            status: 'AI Confirmed' as const,
            refundAuditStatus: '已拒绝' as const
          };
        }
      }
      return o;
    });

    syncOrdersToParent(nextList);
    setShowRefundModal(null);
  };

  const handleExportOrders = () => {
    const headers = ['订单号', '客户', '邮箱', '渠道', '金额', '支付状态', '订单状态', '物流状态', '创建时间', '风险等级'];
    const rows = displayOrders.map(o => {
      let rLevel = o.riskScore >= 60 ? '高风险' : o.riskScore >= 30 ? '中风险' : '低风险';
      
      let busStatusLabel = '待履行';
      if (o.status === 'Pending') busStatusLabel = '待付款';
      else if (o.status === 'AI Confirmed') busStatusLabel = '执行中';
      else if (o.status === 'Shipped') busStatusLabel = '已发货';
      else if (o.status === 'Completed') busStatusLabel = '已完成';
      else if (o.status === 'Refund Requested') busStatusLabel = '退款处理中';
      else if (o.status === 'Refunded') busStatusLabel = '已退款';
      else if (o.status === 'Cancelled') busStatusLabel = '已取消';

      return [
        o.id,
        o.customerName,
        o.contact,
        o.paymentMethod,
        `$${o.total.toFixed(2)}`,
        o.paymentStatus,
        busStatusLabel,
        o.shippingStatus,
        o.createdAt,
        rLevel
      ];
    });

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `orders_${selectedIndustry}_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addLog('Order Center', '单据导出', `导出并下载当前筛选的 ${displayOrders.length} 条跨境订单。格式: CSV。`, 'success');
  };

  // Filter orders based on sub-tab and search bar
  const displayOrders = useMemo(() => {
    let list = [...enrichedOrders];
    
    // Sub-tab filter
    if (activeSubTab === 'unshipped') {
      list = list.filter(o => o.shippingStatus === '待发货' && o.paymentStatus === '已支付');
    } else if (activeSubTab === 'refunds') {
      list = list.filter(o => o.status === 'Refund Requested' || o.status === 'Refunded');
    } else if (activeSubTab === 'tracking') {
      list = list.filter(o => o.shippingStatus === '已发货');
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(o => 
        o.id.toLowerCase().includes(q) || 
        o.customerName.toLowerCase().includes(q) || 
        o.contact.toLowerCase().includes(q)
      );
    }

    // Sort order
    list.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      // total
      return sortOrder === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
    });

    return list;
  }, [enrichedOrders, activeSubTab, searchQuery, sortField, sortOrder]);

  return (
    <div className="space-y-6 text-slate-900 font-sans select-none animate-fadeIn text-left p-1">
      
      {/* Top statistics section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[#07C2E3]" />
            <span>商家控制中心 · 订单管理中心</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            企业级多租户跨境交易看板。处理全球采购履约发货、风险风控因子把控及自动化售后。
          </p>
        </div>
      </div>

      {/* Grid of four quick metrics cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm text-left flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">待履行发货 (待发货)</span>
          <span className="text-xl font-black font-mono text-slate-800 mt-1">{stats.unshippedCount} 件</span>
          <div className="mt-1 text-[9px] text-[#07C2E3] font-bold">已安排上游原厂备料排单</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm text-left flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">售后待退款 (待退款)</span>
          <span className={`text-xl font-black font-mono mt-1 ${stats.refundCount > 0 ? 'text-amber-600 animate-pulse' : 'text-slate-800'}`}>
            {stats.refundCount} 单
          </span>
          <div className="mt-1 text-[9px] text-slate-400">待财务与物流双向终审</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm text-left flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">高风险待审批 (风控)</span>
          <span className={`text-xl font-black font-mono mt-1 ${stats.riskCount > 0 ? 'text-rose-600 font-bold' : 'text-slate-800'}`}>
            {stats.riskCount} 笔
          </span>
          <div className="mt-1 text-[9px] text-slate-400">AI 拦截恶意欺诈保障通道安全</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm text-left flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">累计已完成单据 (已结)</span>
          <span className="text-xl font-black font-mono text-emerald-600 mt-1">
            {enrichedOrders.filter(o => o.shippingStatus === '已发货' || o.status === 'Refunded').length} 笔
          </span>
          <div className="mt-1 text-[9px] text-emerald-600 font-bold">无纠纷完结率 100%</div>
        </div>
      </div>

      {/* Sub tabs nav + sorting tools & search */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden min-h-[460px]">
        {/* Navigation row inside card */}
        <div className="border-b border-slate-150 bg-slate-50/50 p-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          
          {/* Subtabs controls */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200/60 select-none">
            <button
              onClick={() => { setActiveSubTab('all'); setSelectedOrder(null); }}
              className={`text-[10px] font-bold py-1 px-3 rounded-md transition-all cursor-pointer ${
                activeSubTab === 'all' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              全部订单 ({stats.totalCount})
            </button>
            <button
              onClick={() => { setActiveSubTab('unshipped'); setSelectedOrder(null); }}
              className={`text-[10px] font-bold py-1 px-3 rounded-md transition-all cursor-pointer ${
                activeSubTab === 'unshipped' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              待履行发货 ({stats.unshippedCount})
            </button>
            <button
              onClick={() => { setActiveSubTab('tracking'); setSelectedOrder(null); }}
              className={`text-[10px] font-bold py-1 px-3 rounded-md transition-all cursor-pointer ${
                activeSubTab === 'tracking' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              物流跟踪中 ({enrichedOrders.filter(o => o.shippingStatus === '已发货').length})
            </button>
            <button
              onClick={() => { setActiveSubTab('refunds'); setSelectedOrder(null); }}
              className={`text-[10px] font-bold py-1 px-3 rounded-md transition-all cursor-pointer ${
                activeSubTab === 'refunds' 
                  ? 'bg-[#ffebee] text-[#d32f2f] shadow-sm font-bold' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              退款审核销账 ({enrichedOrders.filter(o => o.status === 'Refund Requested' || o.status === 'Refunded').length})
            </button>
          </div>

          {/* Table operations search */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="键入单号/买家姓名搜索..."
                className="bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-1 text-[10px] text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#07C2E3] w-full sm:w-48 font-medium placeholder-slate-400"
              />
            </div>
            
            {/* Sort toggle triggers */}
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as any)}
              className="bg-white border border-slate-200 rounded-lg py-1 px-2 text-[10px] text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#07C2E3]"
            >
              <option value="createdAt">按出单时间排序</option>
              <option value="total">按流转金额排序</option>
            </select>
            <button
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="bg-white border border-slate-200 hover:border-slate-300 text-slate-600 p-1 rounded-lg text-[10px] font-bold cursor-pointer flex items-center justify-center w-6 h-6 shrink-0"
              title="切换排序方向"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>

            {/* Export CSV Button */}
            <button
              onClick={handleExportOrders}
              className="bg-white border border-slate-200 hover:border-slate-300 hover:text-slate-900 text-slate-600 px-2 py-1 h-6 rounded-lg text-[10px] font-bold cursor-pointer transition-all flex items-center gap-1 shrink-0"
              title="导出当前筛选出的订单数据"
            >
              <Download className="w-3 h-3 text-[#07C2E3]" />
              <span>导出 CSV</span>
            </button>
          </div>

        </div>

        {/* Master details dual panes layout or fallback */}
        <div className="grid grid-cols-1 xl:grid-cols-3 divide-y xl:divide-y-0 xl:divide-x divide-slate-150">
          
          {/* Left / Middle: list of matching orders */}
          <div className="xl:col-span-2 text-xs overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/20 border-b border-slate-150 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="p-2.5 text-center">订单号</th>
                  <th className="p-2.5">客户</th>
                  <th className="p-2.5">邮箱</th>
                  <th className="p-2.5">渠道</th>
                  <th className="p-2.5">金额</th>
                  <th className="p-2.5">支付状态</th>
                  <th className="p-2.5">订单状态</th>
                  <th className="p-2.5">物流状态</th>
                  <th className="p-2.5">创建时间</th>
                  <th className="p-2.5 text-center">风险等级</th>
                  <th className="p-2.5 text-right font-bold pr-4">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {displayOrders.length > 0 ? (
                  displayOrders.map((order) => {
                    const isHighRisk = order.riskScore >= 60;
                    
                    // Style mapping for payment status
                    let payBadge = 'bg-slate-50 text-slate-500 border-slate-200';
                    if (order.paymentStatus === '已支付') payBadge = 'bg-emerald-50 text-emerald-600 border-emerald-100';
                    else if (order.paymentStatus === '待支付') payBadge = 'bg-amber-50 text-amber-600 border-amber-100';
                    else if (order.paymentStatus === '已取消') payBadge = 'bg-slate-100 text-slate-400 border-slate-200';
                    else if (order.paymentStatus === '支付失败') payBadge = 'bg-rose-50 text-rose-600 border-rose-100';

                    // Style mapping for shipping status
                    let shipBadge = 'bg-slate-50 text-slate-500 border-slate-200';
                    if (order.shippingStatus === '已完成') shipBadge = 'bg-emerald-50 text-emerald-600 border-emerald-100';
                    else if (order.shippingStatus === '已发货') shipBadge = 'bg-blue-50 text-blue-600 border-blue-105';
                    else if (order.shippingStatus === '已收货') shipBadge = 'bg-cyan-50 text-[#07C2E3] border-cyan-100';
                    else if (order.shippingStatus === '待发货') shipBadge = 'bg-slate-100 text-slate-500 border-slate-200';

                    // Style mapping for general business order status
                    let busStatusLabel = '待履行';
                    let busBadge = 'bg-slate-50 text-slate-500 border-slate-200';

                    if (order.status === 'Pending') {
                      busStatusLabel = '待付款';
                      busBadge = 'bg-amber-50 text-amber-600 border-amber-100';
                    } else if (order.status === 'AI Confirmed') {
                      busStatusLabel = '执行中';
                      busBadge = 'bg-[#e6fafc] text-[#07C2E3] border-cyan-100';
                    } else if (order.status === 'Shipped') {
                      busStatusLabel = '已发货';
                      busBadge = 'bg-blue-50 text-blue-600 border-blue-100';
                    } else if (order.status === 'Refund Requested') {
                      busStatusLabel = '退款处理中';
                      busBadge = 'bg-rose-50 text-rose-600 border-rose-150 animate-pulse';
                    } else if (order.status === 'Refunded') {
                      busStatusLabel = '已退款';
                      busBadge = 'bg-slate-100 text-slate-450 border-slate-200';
                    } else if (order.status === 'Completed') {
                      busStatusLabel = '已完成';
                      busBadge = 'bg-emerald-50 text-emerald-600 border-emerald-100';
                    } else if (order.status === 'Cancelled') {
                      busStatusLabel = '已取消';
                      busBadge = 'bg-slate-100 text-slate-400 border-slate-200';
                    }

                    return (
                      <tr 
                        key={order.id} 
                        onClick={() => setSelectedOrder(order)}
                        className={`hover:bg-slate-50/50 cursor-pointer transition-colors border-b border-slate-100 ${selectedOrder?.id === order.id ? 'bg-[#e6fafc]/20' : ''}`}
                      >
                        <td className="p-2.5 text-center font-bold font-mono text-slate-900">{order.id}</td>
                        <td className="p-2.5 font-bold text-slate-900">{order.customerName}</td>
                        <td className="p-2.5 font-mono text-slate-500 text-[10px] break-all max-w-[120px]">{order.contact}</td>
                        <td className="p-2.5 text-slate-500 text-[10px] truncate max-w-[100px]" title={order.paymentMethod}>
                          {order.paymentMethod === 'International Credit Card' ? '国际信用卡' : 'PayPal支付'}
                        </td>
                        <td className="p-2.5 font-mono font-bold text-slate-800">${order.total.toFixed(2)}</td>
                        <td className="p-2.5">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${payBadge}`}>
                            {order.paymentStatus}
                          </span>
                        </td>
                        <td className="p-2.5">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${busBadge}`}>
                            {busStatusLabel}
                          </span>
                        </td>
                        <td className="p-2.5">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${shipBadge}`}>
                            {order.shippingStatus}
                          </span>
                        </td>
                        <td className="p-2.5 font-mono text-slate-400 text-[10px]">{order.createdAt}</td>
                        <td className="p-2.5 text-center">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                            order.riskScore >= 60 
                              ? 'bg-rose-50 text-rose-700 border-rose-100 font-bold' 
                              : order.riskScore >= 30 
                                ? 'bg-amber-50 text-amber-700 border-amber-100 font-bold' 
                                : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                          }`}>
                            {order.riskScore >= 60 ? '高' : order.riskScore >= 30 ? '中' : '低'}
                          </span>
                        </td>
                        <td className="p-2.5 text-right font-medium pr-3 space-x-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-0.5 px-1.5 rounded text-[10px] font-bold cursor-pointer transition-all"
                          >
                            查看
                          </button>
                          {order.paymentStatus === '已支付' && order.shippingStatus === '待发货' && order.status !== 'Refund Requested' && (
                            <button
                              onClick={() => setShowDispatchModal(order)}
                              className="bg-[#07C2E3] hover:bg-[#06B2D0] text-white py-0.5 px-1.5 h-5 rounded font-bold text-[10px] transition-all cursor-pointer whitespace-nowrap inline-block"
                            >
                              发货
                            </button>
                          )}
                          {order.status === 'Refund Requested' && (
                            <button
                              onClick={() => setShowRefundModal(order)}
                              className="bg-rose-500 hover:bg-rose-600 text-white py-0.5 px-1.5 h-5 rounded font-bold text-[10px] transition-all cursor-pointer whitespace-nowrap inline-block animate-pulse"
                            >
                              退款审核
                            </button>
                          )}
                          {order.riskScore >= 60 && (
                            <button
                              onClick={() => setShowRiskModal(order)}
                              className="bg-amber-600 hover:bg-amber-700 text-white py-0.5 px-1.5 h-5 rounded font-bold text-[10px] transition-all cursor-pointer whitespace-nowrap inline-block"
                            >
                              人工审核
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={11} className="p-10 text-center text-slate-400 font-bold">
                      当前筛选条件下没有对应的订单。
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Right Pane: Live details and logistics tracking */}
          <div className="p-4 text-xs space-y-4">
            {selectedOrder ? (
              <div className="space-y-4 animate-fadeIn text-left">
                <div className="flex items-center justify-between border-b border-slate-150 pb-2.5">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">单据详情概要</span>
                    <span className="text-sm font-black text-slate-800 font-mono">订单: {selectedOrder.id}</span>
                  </div>
                  <button 
                    onClick={() => setSelectedOrder(null)} 
                    className="text-slate-400 hover:text-slate-600 cursor-pointer p-0.5 hover:bg-slate-100 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Direct quick action invoicing panel fitting European shortcut guidelines */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 space-y-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">发票与凭证快捷操作</span>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => {
                        addLog('Billing Agent', '生成订单发票', `已自动拉取企业VAT与客户地址，为订单 [${selectedOrder.id}] 建立对应合规发票单：INV-2026-FPR-${selectedOrder.id.slice(-4)}，已载入财务大账。`, 'success');
                      }}
                      className="bg-[#07C2E3] hover:bg-[#06B2D0] active:bg-[#059BBC] text-slate-950 font-black text-[10px] py-1.5 px-3 rounded-lg cursor-pointer transition-all border-none"
                    >
                      生成发票
                    </button>
                    <button
                      onClick={() => {
                        addLog('Print Service', '发票排版打印', `合并生成发票 INV-2026-FPR-${selectedOrder.id.slice(-4)}。打印任务已安全指派至本地 PDF 渲染联。`, 'info');
                      }}
                      className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-[10px] py-1.5 px-3 rounded-lg cursor-pointer transition-all"
                    >
                      打印
                    </button>
                    <button
                      onClick={() => {
                        const email = selectedOrder.contact || 'customer@standard-buyer.eu';
                        addLog('Mail Service', '投递对公发票', `电子发票 INV-2026-FPR-${selectedOrder.id.slice(-4)} 已由 SMTP 通道直投至客户邮箱: ${email}，免填表流程完毕。`, 'success');
                      }}
                      className="bg-slate-900 hover:bg-black text-[#07C2E3] font-bold text-[10px] py-1.5 px-3 rounded-lg cursor-pointer transition-all border-none"
                    >
                      发送给客户
                    </button>
                  </div>
                </div>

                {/* Risk audit box */}
                <div className={`p-2.5 rounded-lg border text-left ${
                  selectedOrder.riskScore >= 60 
                    ? 'bg-rose-50 border-rose-100 text-rose-850' 
                    : selectedOrder.riskScore >= 30 
                      ? 'bg-amber-50 border-amber-100 text-amber-850'
                      : 'bg-emerald-50 border-emerald-100 text-emerald-850'
                }`}>
                  <div className="flex items-center justify-between font-bold text-[10px] uppercase">
                    <div className="flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>风险订单识别</span>
                    </div>
                    <span className={`px-1 rounded text-[9px] ${
                      selectedOrder.riskScore >= 60 
                        ? 'bg-rose-100 text-rose-700' 
                        : selectedOrder.riskScore >= 30 
                          ? 'bg-amber-100 text-amber-700' 
                          : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {selectedOrder.riskScore >= 60 ? '风险等级：高' : selectedOrder.riskScore >= 30 ? '风险等级：中' : '风险等级：低'}
                    </span>
                  </div>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="font-mono font-bold text-xs">系数: {selectedOrder.riskScore}%</span>
                    <span className="text-[9px] font-sans">
                      {selectedOrder.riskScore >= 60 
                        ? '监测到异常账单地址及地理漂移。建议进行二次人工核查。' 
                        : selectedOrder.riskScore >= 30 
                          ? '中危：邮箱域名解析存疑。请人工对账单和物流渠道。' 
                          : '安全合规：无欺诈评分。'}
                    </span>
                  </div>
                  
                  {/* Action buttons as part of manual operations */}
                  <div className="mt-2.5 flex items-center gap-1 border-t border-slate-200/40 pt-1.5">
                    <button
                      onClick={() => {
                        addLog('Order Center', '风险核查', `查看订单 [#${selectedOrder.id}] 风控信噪记录及详细日志。对端正常。`, 'info');
                        // Open risk modal directly 
                        setShowRiskModal(selectedOrder);
                      }}
                      className="bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 text-[9px] py-0.5 px-2 rounded cursor-pointer transition-all"
                    >
                      人工审核
                    </button>
                    {selectedOrder.shippingStatus === '待发货' && selectedOrder.paymentStatus === '已支付' && (
                      <button
                        onClick={() => {
                          setShowDispatchModal(selectedOrder);
                        }}
                        className="bg-[#e6fafc] hover:bg-[#07C2E3] hover:text-white text-[#07C2E3] border border-cyan-150 text-[9px] py-0.5 px-2 rounded cursor-pointer transition-all ml-auto font-bold"
                      >
                        直接允许发货
                      </button>
                    )}
                  </div>
                </div>

                {/* Customer Details info */}
                <div className="space-y-2">
                  <span className="text-[9px] text-slate-400 font-bold block bg-slate-50 border-y border-slate-150/60 py-1 pl-1.5 uppercase select-none">
                    买家寄件信息
                  </span>
                  <div className="space-y-1 bg-slate-50/30 p-2 rounded-lg border border-slate-150">
                    <div className="font-bold text-slate-900">{selectedOrder.customerName}</div>
                    <div className="flex items-center gap-1 text-slate-500 text-[10px]">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span>{selectedOrder.contact}</span>
                    </div>
                    <div className="flex items-start gap-1 text-slate-500 text-[10px] mt-1 text-left leading-relaxed">
                      <MapPin className="w-3 h-3 text-slate-400 mt-0.5 shrink-0" />
                      <span>{selectedOrder.shippingAddress}</span>
                    </div>
                  </div>
                </div>

                {/* Items and receipt list */}
                <div className="space-y-2">
                  <span className="text-[9px] text-slate-400 font-bold block bg-slate-50 border-y border-slate-150/60 py-1 pl-1.5 uppercase select-none">
                    商品配货明细
                  </span>
                  <div className="divide-y divide-slate-100 bg-white border border-slate-150 rounded-lg overflow-hidden">
                    {selectedOrder.items.map((item, id) => (
                      <div key={id} className="p-2 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900">{item.name}</div>
                          <div className="text-[9px] text-slate-400 font-mono mt-0.5">SKU: {item.sku}</div>
                        </div>
                        <div className="text-right font-mono font-bold">
                          <span className="text-slate-400 mr-2">x{item.qty}</span>
                          <span className="text-slate-800">${item.price.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                    <div className="p-2 bg-slate-50/50 flex justify-between font-bold text-slate-900 border-t border-slate-150">
                      <span>单据付款总计:</span>
                      <span className="font-mono text-cyan-700">${selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Live logistics tracing timeline */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-slate-50 border-y border-slate-150/60 py-1 px-1.5">
                    <span className="text-[9px] text-slate-400 font-bold uppercase select-none">
                      物流轨迹查询
                    </span>
                    {selectedOrder.shippingStatus === '已发货' && (
                      <button
                        onClick={() => {
                          const updated = enrichedOrders.map(o => {
                            if (o.id === selectedOrder.id) {
                              return {
                                ...o,
                                status: 'Completed' as const,
                                shippingStatus: '已完成' as const,
                                logisticsTimeline: [
                                  { time: new Date().toISOString().replace('T', ' ').slice(0, 16), status: '已签收/已完成', desc: '快递已妥投派送，商家确认完成签收结单。' },
                                  ...o.logisticsTimeline
                                ]
                              };
                            }
                            return o;
                          });
                          syncOrdersToParent(updated);
                          addLog('Order Center', '妥投签收结单', `订单 [#${selectedOrder.id}] 人工确证买家已签收完结，账期清算完成。`, 'success');
                          setSelectedOrder({
                            ...selectedOrder,
                            status: 'Completed',
                            shippingStatus: '已完成',
                            logisticsTimeline: [
                              { time: new Date().toISOString().replace('T', ' ').slice(0, 16), status: '已签收/已完成', desc: '快递已妥投派送，商家确认完成签收结单。' },
                              ...selectedOrder.logisticsTimeline
                            ]
                          });
                        }}
                        className="bg-[#07C2E3] hover:bg-[#06B2D0] text-white py-0.5 px-2 rounded text-[9px] font-bold cursor-pointer transition-all active:scale-95"
                      >
                        标记已完成
                      </button>
                    )}
                  </div>
                  {selectedOrder.carrier && selectedOrder.trackingNumber && (
                    <div className="px-2 py-1 bg-blue-50/40 rounded border border-blue-100 text-[10px] text-blue-700 font-mono flex items-center justify-between">
                      <span>承运: {selectedOrder.carrier}</span>
                      <span>单号: {selectedOrder.trackingNumber}</span>
                    </div>
                  )}

                  <div className="relative pl-3 border-l-2 border-slate-150/80 ml-2 space-y-4 pt-1">
                    {selectedOrder.logisticsTimeline.map((evt, idx) => (
                      <div key={idx} className="relative text-left">
                        {/* Dot */}
                        <div className={`absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full border-2 ${
                          idx === 0 
                            ? 'bg-[#07C2E3] border-cyan-100 ring-2 ring-cyan-50' 
                            : 'bg-slate-300 border-white'
                        }`} />
                        <div className="font-bold text-slate-800 flex items-center gap-1 text-[10px]">
                          <span>{evt.status}</span>
                          <span className="font-mono text-[9px] text-slate-400 font-normal">{evt.time}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">{evt.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400 space-y-2 select-none">
                <FileText className="w-8 h-8 text-slate-350" />
                <span className="font-bold text-xs">暂无单据选中</span>
                <p className="text-[10px] max-w-[200px]">单击左侧列表中的行，即可查看对应的收件资质、配货规格明细和实时跨境物流路线轨迹。</p>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Manual Fulfillment Modal dialog */}
      {showDispatchModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <form 
            onSubmit={handleDispatchOrder} 
            className="bg-white border border-slate-150 rounded-xl max-w-sm w-full shadow-22xl p-5 relative space-y-4 text-left"
          >
            <button 
              type="button"
              onClick={() => setShowDispatchModal(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2 text-sm text-slate-800">
              <Truck className="w-4 h-4 text-[#07C2E3]" />
              <span>多级跨境物流派发作业 (出库装车)</span>
            </h3>

            <div className="bg-sky-50 rounded-lg p-2.5 border border-sky-100/70 text-slate-700 text-[10px] leading-relaxed">
              <p className="font-bold text-[#07C2E3] mb-0.5">物流链路启动通知:</p>
              <p>确认向 <b>{showDispatchModal.customerName}</b> 出库派送。订单内货品包含 <b>{showDispatchModal.items.map(it => `${it.name} x${it.qty}`).join(', ')}</b>。</p>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex flex-col gap-1">
                <label className="text-slate-500 font-bold">国际承运商物流商 *</label>
                <input 
                  type="text"
                  id="carrier-input"
                  required
                  defaultValue="DHL Global Express (大中华区分拨区)"
                  className="bg-white border border-slate-200 rounded-lg py-1.5 px-3 text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-[#07C2E3]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-slate-500 font-bold">航空运输快递单号 (AWB) *</label>
                <input 
                  type="text"
                  id="tracking-input"
                  required
                  defaultValue={`AWB-${Math.floor(20593021 + Math.random() * 6940292)}`}
                  className="bg-white border border-slate-200 rounded-lg py-1.5 px-3 text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-[#07C2E3]"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2 border-t border-slate-50 pt-4">
              <button 
                type="button"
                onClick={() => setShowDispatchModal(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-1.5 px-3 rounded-lg font-bold text-xs"
              >
                取消
              </button>
              <button 
                type="submit"
                className="bg-[#07C2E3] hover:bg-[#06B2D0] text-white py-1.5 px-4 rounded-lg font-bold text-xs shadow-sm"
              >
                确认开始物流配运
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Refund/After-sales approval dialog */}
      {showRefundModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white border border-slate-150 rounded-xl max-w-sm w-full shadow-22xl p-5 relative space-y-4 text-left">
            <button 
              type="button"
              onClick={() => setShowRefundModal(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2 text-sm text-slate-800">
              <CornerDownLeft className="w-4 h-4 text-rose-500" />
              <span>售后退款索赔核销审批</span>
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 border-b border-slate-50 pb-2">
                <span>申请买家:</span>
                <span className="text-slate-900">{showRefundModal.customerName}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 border-b border-slate-50 pb-2">
                <span>涉事货品总额:</span>
                <span className="text-rose-600 font-mono">${showRefundModal.total.toFixed(2)} USD</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-450 font-bold block mb-1">退款主诉原因:</span>
                <p className="bg-slate-50 p-2.5 rounded border border-slate-200 text-slate-600 text-[10px] leading-relaxed">
                  {showRefundModal.refundReason || '买家协商一致整单原路退款结算登记。'}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2 border-t border-slate-50 pt-4">
              <button 
                type="button"
                onClick={() => handleApproveRefund(showRefundModal.id, false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-1.5 px-3 rounded-lg font-bold text-xs"
              >
                拒绝申请
              </button>
              <button 
                type="button"
                onClick={() => handleApproveRefund(showRefundModal.id, true)}
                className="bg-rose-600 hover:bg-rose-700 text-white py-1.5 px-4 rounded-lg font-bold text-xs shadow-sm"
              >
                同意退款清算
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Risk Verification dialog */}
      {showRiskModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white border border-slate-150 rounded-xl max-w-sm w-full shadow-22xl p-5 relative space-y-4 text-left">
            <button 
              type="button"
              onClick={() => setShowRiskModal(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2 text-sm text-slate-800">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <span>风险账单人工综合核实</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-150">
                <p className="font-bold text-slate-800">单据号: #{showRiskModal.id}</p>
                <p className="text-slate-500 text-[10px] mt-0.5">客户: {showRiskModal.customerName} ({showRiskModal.contact})</p>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-200 text-[10px]">
                  <span>当前风控系数:</span>
                  <span className={`font-mono font-bold px-1 rounded ${
                    showRiskModal.riskScore >= 60 ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
                  }`}>{showRiskModal.riskScore}%</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-450 font-bold block uppercase">安全检测因子指标清单</span>
                
                <div className="p-2 bg-slate-50/50 rounded border border-slate-150 space-y-1.5 text-[10px]">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">1. 下单地理IP对应国家:</span>
                    <span className="font-mono font-bold text-emerald-600">正常匹配 (Verified)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">2. 支付卡账单地区一致性:</span>
                    <span className={`font-mono font-bold ${showRiskModal.riskScore >= 60 ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {showRiskModal.riskScore >= 60 ? '部分偏差' : '高斯一致'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">3. 高危代购邮箱特征值:</span>
                    <span className="font-mono font-bold text-emerald-600">合规域名</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">4. 恶意多设备并发指纹:</span>
                    <span className="font-mono font-bold text-emerald-600">无异常并发</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 p-2.5 rounded border border-amber-100/70 text-amber-800 text-[10px] leading-relaxed">
              <p className="font-bold">履约准入提示:</p>
              <p>系统不强制阻断发货，决定权完全在商家手上。允许放行将清除风险印记，取消订单则会启动原渠道资金回汇流程。</p>
            </div>

            <div className="mt-6 flex justify-end gap-2 border-t border-slate-50 pt-4 text-xs">
              <button 
                type="button"
                onClick={() => {
                  const updated = enrichedOrders.map(o => {
                    if (o.id === showRiskModal.id) {
                      return {
                        ...o,
                        status: 'Cancelled' as const,
                        paymentStatus: '已取消' as const,
                        logisticsTimeline: [
                          { time: new Date().toISOString().replace('T', ' ').slice(0, 16), status: '订单已取消', desc: '经人工风控审核，对单异常，商家决定主动取消此异常账单配送。' },
                          ...o.logisticsTimeline
                        ]
                      };
                    }
                    return o;
                  });
                  syncOrdersToParent(updated);
                  addLog('Order Center', '主动取消账单', `由于风控等级人工判定无法准入，主动取消订单 [#${showRiskModal.id}]，原路结算终止。`, 'warning');
                  setShowRiskModal(null);
                  if (selectedOrder?.id === showRiskModal.id) {
                    setSelectedOrder({
                      ...selectedOrder,
                      status: 'Cancelled',
                      paymentStatus: '已取消',
                      logisticsTimeline: [
                        { time: new Date().toISOString().replace('T', ' ').slice(0, 16), status: '订单已取消', desc: '经人工风控审核，对单异常，商家决定主动取消此异常账单配送。' },
                        ...selectedOrder.logisticsTimeline
                      ]
                    });
                  }
                }}
                className="bg-rose-50 hover:bg-rose-100 text-rose-750 font-bold py-1.5 px-3 rounded-lg border border-rose-100 cursor-pointer"
              >
                取消订单并全额退款
              </button>
              <button 
                type="button"
                onClick={() => {
                  const updated = enrichedOrders.map(o => {
                    if (o.id === showRiskModal.id) {
                      return {
                        ...o,
                        status: 'AI Confirmed' as const, // 转入待执行
                        riskScore: 5,
                        logisticsTimeline: [
                          { time: new Date().toISOString().replace('T', ' ').slice(0, 16), status: '风控检验合格', desc: '人工风控人工覆核，确认收货人身份资质安全，标记为低风险放行件。' },
                          ...o.logisticsTimeline
                        ]
                      };
                    }
                    return o;
                  });
                  syncOrdersToParent(updated);
                  addLog('Order Center', '风控放行', `人工覆核并认定订单 [#${showRiskModal.id}] 安全。标记风控系数降为5%并转入发货配载队列。`, 'success');
                  setShowRiskModal(null);
                  if (selectedOrder?.id === showRiskModal.id) {
                    setSelectedOrder({
                      ...selectedOrder,
                      status: 'AI Confirmed',
                      riskScore: 5,
                      logisticsTimeline: [
                        { time: new Date().toISOString().replace('T', ' ').slice(0, 16), status: '风控检验合格', desc: '人工风控人工覆核，确认收货人身份资质安全，标记为低风险放行件。' },
                        ...selectedOrder.logisticsTimeline
                      ]
                    });
                  }
                }}
                className="bg-[#07C2E3] hover:bg-[#06B2D0] text-white py-1.5 px-4 rounded-lg font-bold shadow-sm cursor-pointer"
              >
                判定为安全放行
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
