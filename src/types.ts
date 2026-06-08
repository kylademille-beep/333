/**
 * AI Commerce OS - Data Types
 */

export type IndustryType = 
  | 'retail' 
  | 'food' 
  | 'education' 
  | 'healthcare' 
  | 'service' 
  | 'manufacturing'
  | 'fashion_wholesale' 
  | 'restaurant_takeout' 
  | 'general_merch_electronics' 
  | 'beauty_booking' 
  | 'ecommerce_store' 
  | 'pos_retail';

export interface TenantConfig {
  id: string;
  companyName: string;
  industry: IndustryType;
  storeName: string;
  createdAt: string;
  status: 'active' | 'suspended';
  aiBudget: number; // in USD
  aiSpent: number; // in USD
}

export interface Metric {
  name: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface ProductItem {
  id: string;
  name: string;
  sku: string;
  stock: number;
  minStockThreshold: number;
  price: number;
  sales: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  category?: string;
  brand?: string;
}

export interface OrderItem {
  id: string;
  customerName: string;
  contact: string;
  total: number;
  status: 'Pending' | 'AI Confirmed' | 'Shipped' | 'Refund Requested' | 'Refunded' | 'Completed' | 'Cancelled';
  createdAt: string;
  riskScore: number; // 0 to 100 calculated by AI
  shippingAddress?: string;
  paymentMethod?: string;
  items?: { productId?: string; sku?: string; name: string; price: number; quantity?: number; qty?: number }[];
}

export interface AIEmployee {
  id: string;
  name: string;
  title: string;
  role: string;
  status: 'Idle' | 'Analyzing' | 'Running Workflow' | 'Responding' | 'Offline';
  emoji: string;
  description: string;
  capabilities: string[];
  systemPrompt: string;
  model: string;
  tasksCompleted: number;
}

export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'ai_decision';
  title: string;
  status: 'idle' | 'running' | 'success' | 'failed';
  details: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  trigger: string;
  nodes: WorkflowNode[];
  active: boolean;
  frequency: string;
}

export interface KnowledgeDoc {
  id: string;
  title: string;
  category: string;
  content: string;
  size: string;
  lastUpdated: string;
}

export interface McpTool {
  id: string;
  name: string;
  category: 'Shopify' | 'Marketing' | 'WMS' | 'CRM' | 'Finance';
  description: string;
  parameters: string[];
  status: 'connected' | 'disconnected';
}

export interface CollaborationLog {
  id: string;
  timestamp: string;
  agent: string;
  action: string;
  details: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'tool';
}

export interface AppMarketItem {
  id: string;
  name: string;
  developer: string;
  icon: string;
  price: string;
  rating: number;
  category: 'Agent' | 'Workflow' | 'Plugin' | 'Knowledge Pack';
  description: string;
  installed: boolean;
}

export interface SourcingRecommendation {
  name: string;
  sku: string;
  price: number;
  wholesaleCost: number;
  marginPct: number;
  targetDemand: string;
  trendReason: string;
  audience: string;
  profitabilityAnalysis: string;
  estMonthlySales: number;
  synced?: boolean;
}

export interface CustomerItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: '普通会员' | '白银会员' | '黄金会员' | '白金会员' | '钻石会员';
  points: number;
  tags: string[];
  totalSpend: number;
  orderCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
  lastOrderAt?: string;
}

// SaaS Operator & Super Admin Types
export interface SaaSPlan {
  id: 'starter' | 'pro' | 'enterprise';
  name: string;
  priceMonthly: number;
  transactionFeePct: number;
  dailyApiLimit: number;
  storageLimitGb: number;
  grantedAiTokens: number;
  features: string[];
}

export interface PaymentGatewayConfig {
  id: 'stripe' | 'adyen' | 'base_usdc' | 'custom';
  name: string;
  publicKey: string;
  secretKey: string;
  commissionPct: number;
  status: 'active' | 'inactive';
  supportedRegions: string[];
}

export interface SmsMailChannelConfig {
  id: 'twilio' | 'sendgrid' | 'custom_smtp';
  name: string;
  apiKey: string;
  senderId: string;
  remainingCredits: number;
  status: 'active' | 'inactive';
  lowBalanceThreshold: number;
}

export interface AppInstallationTrace {
  appId: string;
  appName: string;
  tenantId: string;
  tenantName: string;
  installedAt: string;
  permissionsGranted: string[];
  status: 'authorized' | 'revoked';
}

export interface PlatformGlobalAiConfig {
  defaultModel: string;
  systemSafeguardPrompt: string;
  maxDailyTokenPool: number;
  currentTokensUsed: number;
  unauthorizedBlockText: string;
}

import { AIContext } from './types/AIContext';
export type { AIContext };




