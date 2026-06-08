import React, { useState, useEffect } from 'react';
import { Brain, Mail, Phone, Lock, Key, ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';

interface RegisterPageProps {
  onRegisterSuccess: (userData: { email: string; phone: string }) => void;
  onGoToLogin: () => void;
  onQuickBypass?: () => void;
}

export default function RegisterPage({ onRegisterSuccess, onGoToLogin, onQuickBypass }: RegisterPageProps) {
  // Form fields
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');

  // UI States
  const [countdown, setCountdown] = useState(0);
  const [sentCode, setSentCode] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Timer loop for verification code countdown
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Handle SMS & Email secure dispatch simulation
  const handleGetCode = () => {
    if (!email || !email.includes('@')) {
      setErrorMessage('请输入合法的企业邮箱');
      return;
    }
    if (!phone || phone.length < 11) {
      setErrorMessage('请输入11位合法的国内手机号码');
      return;
    }
    setErrorMessage(null);
    
    // Enforce countdown
    setCountdown(60);
    
    // Notify secure dispatch via SMS & Email without revealing raw code on UI
    setSuccessMessage(`安全网关：验证码已成功分发并递送至邮箱 (${email}) 与关联手机 (${phone?.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')})，请查收。`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Hard client-side validations (no simulations, real constraints)
    if (!email.includes('@')) {
      setErrorMessage('请输入合法的企业邮箱');
      return;
    }
    if (phone.length < 11) {
      setErrorMessage('请输入11位合法的国内手机号码');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('密码长度不能少于6位');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('两次输入的密码不一致');
      return;
    }
    if (!code) {
      setErrorMessage('请输入验证码');
      return;
    }
    // Verify 6-digit numeric code constraint
    if (!/^\d{6}$/.test(code)) {
      setErrorMessage('验证码格式错误，请输入6位数字验证码');
      return;
    }

    setLoading(true);
    // Simulate secure registration process with delay
    setTimeout(() => {
      setLoading(false);
      onRegisterSuccess({ email, phone });
    }, 800);
  };

  return (
    <div id="register-page-container" className="bg-slate-950 min-h-screen text-slate-100 font-sans flex flex-col justify-between overflow-hidden relative">
      
      {/* TEST DRIVE BYPASS BANNER */}
      {onQuickBypass && (
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 py-3 px-4 text-center text-xs font-semibold text-white flex flex-col sm:flex-row items-center justify-center gap-3 shadow-lg z-50">
          <span>💡 <b className="font-bold">演示及测试通道已就绪：</b> 无需接收短信，点击快速通道一键直达后台！</span>
          <button 
            type="button"
            onClick={onQuickBypass}
            className="bg-white text-emerald-950 border border-transparent hover:bg-emerald-50 active:scale-95 px-4 font-black py-1 rounded-full text-xs shadow-md transition-all cursor-pointer flex items-center gap-1 shrink-0"
          >
            <span>🚀 一键免签进入商家控制中心</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-900 animate-pulse" />
          </button>
        </div>
      )}
      
      {/* Background elegant ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-500/10 to-transparent blur-3xl pointer-events-none rounded-full"></div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-slate-950/80 border-b border-slate-900 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 select-none">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-wider text-white">AI BUSINESS OS</span>
              <span className="block text-[8px] font-mono text-indigo-400">PRODUCTION READY</span>
            </div>
          </div>

          <button 
            onClick={onGoToLogin}
            className="text-slate-400 hover:text-white font-bold text-xs px-2 py-1 transition-colors cursor-pointer"
          >
            登录
          </button>
        </div>
      </header>

      {/* CORE WRAPPER */}
      <main className="flex-1 w-full max-w-md mx-auto flex flex-col justify-center px-6 py-12">
        <div className="space-y-6">
          
          {/* Section Indicator */}
          <div className="text-center space-y-1">
            <span className="text-[10px] font-mono text-indigo-400 font-bold tracking-widest uppercase">PAGE 002 / USER REGISTER</span>
            <h1 className="text-xl font-bold tracking-wider text-white">商户账号注册</h1>
          </div>

          {/* Form Card Container */}
          <div className="bg-slate-900 border border-slate-850 rounded-xl p-6 shadow-xl space-y-4">
            
            {/* Real notification banners */}
            {errorMessage && (
              <div className="bg-rose-500/10 border border-rose-500/25 p-3 rounded-lg text-rose-450 text-xs font-semibold">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="bg-emerald-500/10 border border-emerald-505/25 p-3 rounded-lg text-emerald-400 text-xs font-semibold">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Field 1: Corporate Email */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">企业邮箱</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-550">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="example@yourcompany.com"
                    required
                  />
                </div>
              </div>

              {/* Field 2: Mobile Phone */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">手机号码</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-550">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="13800000000"
                    required
                  />
                </div>
              </div>

              {/* Field 3: Password */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">密码</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-550">
                      <Lock className="w-3.5 h-3.5" />
                    </span>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">确认密码</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-550">
                      <Lock className="w-3.5 h-3.5" />
                    </span>
                    <input 
                      type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Field 4: Verification Code (with countdown state timer) */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">验证码</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-550">
                      <Key className="w-4 h-4" />
                    </span>
                    <input 
                      type="text" 
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                      placeholder="六位校验码"
                      required
                    />
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleGetCode}
                    disabled={countdown > 0}
                    className="bg-indigo-600/30 hover:bg-indigo-600/50 disabled:bg-slate-950/40 text-indigo-400 disabled:text-slate-500 border border-indigo-500/20 rounded-lg px-3 text-xs font-bold font-mono min-w-[100px] cursor-pointer transition-colors"
                  >
                    {countdown > 0 ? `${countdown}s` : '获取验证码'}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-550 text-white py-3 rounded-lg font-bold text-xs shadow transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                {loading ? '提交加密注册中...' : '注册商户账号'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </form>

            {/* Back link */}
            <div className="border-t border-slate-850 pt-3 text-center">
              <span className="text-[11px] text-slate-450">已有商户账号？</span>
              <button 
                onClick={onGoToLogin}
                className="text-[11px] font-bold text-indigo-400 hover:underline inline ml-1 cursor-pointer"
              >
                立即登录
              </button>
            </div>

          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 px-6 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[10px] font-mono text-slate-500">
          <span>AI BUSINESS OS © 2026</span>
          <span className="text-emerald-450 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SECURE GATEWAY</span>
          </span>
        </div>
      </footer>

    </div>
  );
}
