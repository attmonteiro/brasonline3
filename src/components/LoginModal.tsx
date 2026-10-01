import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';
import { 
  X, 
  LogIn, 
  Store, 
  ShieldCheck, 
  ShoppingBag, 
  Lock, 
  User, 
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Eye,
  EyeOff,
  UserPlus,
  Phone,
  Mail,
  Building2,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
  Crown
} from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { 
    isLoginModalOpen, 
    closeLoginModal, 
    login, 
    registerUser,
    openSubscriptionModal 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state
  const [registerRole, setRegisterRole] = useState<'buyer_vip' | 'seller'>('buyer_vip');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regStoreName, setRegStoreName] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Forgot password drawer
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotInput, setForgotInput] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Feedback states
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLoginModalOpen) {
        closeLoginModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLoginModalOpen, closeLoginModal]);

  if (!isLoginModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    setTimeout(() => {
      const res = login(username, password);
      setLoading(false);
      if (res.success) {
        setSuccessMsg('Login realizado com sucesso! Redirecionando...');
      } else {
        setError(res.message || 'Usuário ou senha incorretos.');
      }
    }, 400);
  };

  const handleQuickLogin = (role: 'buyer' | 'seller' | 'admin') => {
    setError('');
    setSuccessMsg('');
    setLoading(true);

    setTimeout(() => {
      if (role === 'buyer') {
        login('comprador', '000');
        setSuccessMsg('Conectado como Comprador Lojista VIP!');
      } else if (role === 'seller') {
        login('vendedor', '111');
        setSuccessMsg('Conectado ao Painel de Confecção & Fabricante!');
      } else if (role === 'admin') {
        login('adm', '000');
        setSuccessMsg('Conectado como Administrador Geral!');
      }
      setLoading(false);
    }, 350);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!regName.trim()) {
      setError('Por favor, informe seu nome ou da sua confecção.');
      return;
    }
    if (!regEmail.trim()) {
      setError('Por favor, informe seu e-mail.');
      return;
    }
    if (regPassword.length < 4) {
      setError('A senha deve ter no mínimo 4 dígitos.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = registerUser({
        name: regName,
        emailOrUser: regEmail,
        role: registerRole,
        storeName: regStoreName || undefined,
        whatsapp: regPhone || undefined,
      });

      setLoading(false);
      if (res.success) {
        setSuccessMsg(`Cadastro realizado com sucesso! Bem-vindo(a), ${regName}!`);
      } else {
        setError(res.message || 'Erro ao realizar cadastro.');
      }
    }, 500);
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotInput.trim()) return;
    setForgotSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div 
        className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full shadow-2xl border border-gray-100 overflow-hidden relative my-auto animate-scaleUp text-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra superior de destaque em Laranja Shopee / Terracota */}
        <div className="h-1.5 bg-gradient-to-r from-[#E8442B] via-[#FF5722] to-[#FF9800]" />

        {/* Botão de Fechar */}
        <button
          onClick={closeLoginModal}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors cursor-pointer z-10"
          title="Fechar (Esc)"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-5 sm:p-7 md:p-8">
          
          {/* Topo / Branding */}
          <div className="text-center mb-5 flex flex-col items-center">
            <div className="mb-2">
              <BrandLogo variant="light" size="md" />
            </div>
            
            <h3 className="text-xl sm:text-2xl font-black text-[#14284B] tracking-tight">
              {activeTab === 'login' ? 'Acesse sua Conta' : 'Crie sua Conta Gratuita'}
            </h3>
          </div>

          {/* Abas Alternadoras (Entrar vs Cadastrar) */}
          <div className="flex border-b border-gray-200 mb-5">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setError('');
                setSuccessMsg('');
                setShowForgotPassword(false);
              }}
              className={`flex-1 pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 border-b-2 ${
                activeTab === 'login'
                  ? 'border-[#14284B] text-[#14284B]'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Entrar</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setError('');
                setSuccessMsg('');
                setShowForgotPassword(false);
              }}
              className={`flex-1 pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 border-b-2 ${
                activeTab === 'register'
                  ? 'border-[#14284B] text-[#14284B]'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Cadastre-se</span>
            </button>
          </div>

          {/* MENSAGENS DE ERRO OU SUCESSO */}
          {error && (
            <div className="mb-4 flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs font-semibold animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs font-bold animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* TAB 1: FORMULÁRIO DE LOGIN */}
          {activeTab === 'login' && !showForgotPassword && (
            <div>
              <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    E-mail ou Usuário
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Ex: comprador ou seu@email.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-xs font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8442B] focus:border-transparent focus:bg-white transition-all shadow-2xs"
                    />
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700">
                      Senha
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-[11px] text-[#E8442B] hover:underline font-semibold cursor-pointer"
                    >
                      Esqueceu a senha?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Digite sua senha"
                      className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-xs font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8442B] focus:border-transparent focus:bg-white transition-all shadow-2xs"
                    />
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-2.5 text-gray-400 hover:text-gray-700 cursor-pointer p-0.5"
                      title={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Lembrar de mim */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-gray-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-[#E8442B] border-gray-300 rounded focus:ring-[#E8442B] accent-[#E8442B]"
                    />
                    <span>Manter conectado</span>
                  </label>
                </div>

                {/* Botão Entrar */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-[#14284B] hover:bg-[#2E5C94] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer hover:shadow-lg active:scale-[0.99]"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Verificando Acesso...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>Entrar no Sistema</span>
                    </>
                  )}
                </button>
              </form>

              {/* SEÇÃO DE ACESSO RÁPIDO / TESTES (1 CLIQUE) */}
              <div className="mt-5 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#2E5C94]" />
                    <span>Acesso Rápido de Teste (1 Clique)</span>
                  </span>
                  <span className="text-[10px] text-gray-400">Ambiente Livre</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('buyer')}
                    className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-left transition-all cursor-pointer group flex flex-col items-center text-center"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#14284B] mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-bold text-[#14284B] block leading-tight">Lojista VIP</span>
                    <span className="text-[9.5px] text-gray-500 block">Comprar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin('seller')}
                    className="p-2.5 bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200/60 rounded-xl text-left transition-all cursor-pointer group flex flex-col items-center text-center"
                  >
                    <Store className="w-4 h-4 text-blue-600 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-bold text-blue-700 block leading-tight">Fabricante</span>
                    <span className="text-[9.5px] text-gray-500 block">Vender</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin('admin')}
                    className="p-2.5 bg-gray-100 hover:bg-gray-200/80 border border-gray-300 rounded-xl text-left transition-all cursor-pointer group flex flex-col items-center text-center"
                  >
                    <Crown className="w-4 h-4 text-gray-800 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-bold text-gray-800 block leading-tight">Gestor Adm</span>
                    <span className="text-[9.5px] text-gray-500 block">Geral</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ESQUECEU A SENHA DRAWER */}
          {activeTab === 'login' && showForgotPassword && (
            <div className="py-2 animate-fadeIn">
              <div className="bg-orange-50 border border-orange-200 p-4 rounded-2xl mb-4 text-center">
                <HelpCircle className="w-8 h-8 text-[#E8442B] mx-auto mb-2" />
                <h4 className="text-sm font-bold text-[#0D1629]">Recuperação de Acesso</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Digite seu e-mail ou WhatsApp cadastrado para receber o link de redefinição imediato.
                </p>
              </div>

              {!forgotSuccess ? (
                <form onSubmit={handleForgotPasswordSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                      E-mail ou WhatsApp
                    </label>
                    <input
                      type="text"
                      required
                      value={forgotInput}
                      onChange={(e) => setForgotInput(e.target.value)}
                      placeholder="Ex: (11) 99999-9999 ou seu@email.com"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-xs font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8442B]"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(false)}
                      className="flex-1 py-2.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Voltar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 px-3 bg-[#E8442B] hover:bg-[#d03b24] text-white text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Enviar Link
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-3">
                  <div className="inline-flex p-2 bg-emerald-100 text-emerald-600 rounded-full mb-2">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h5 className="text-xs font-bold text-emerald-800">Instruções enviadas!</h5>
                  <p className="text-[11px] text-gray-600 mt-1 max-w-xs mx-auto">
                    Caso o contato conste em nossa base, você receberá uma mensagem com o código de desbloqueio em até 2 minutos.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(false);
                      setForgotSuccess(false);
                    }}
                    className="mt-3 text-xs font-bold text-[#E8442B] hover:underline cursor-pointer"
                  >
                    Retornar ao Login
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: FORMULÁRIO DE CADASTRO */}
          {activeTab === 'register' && (
            <div>
              <form onSubmit={handleRegisterSubmit} className="space-y-3">
                {/* Seletor de Perfil */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Como você deseja usar a plataforma?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRegisterRole('buyer_vip')}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-center gap-2 ${
                        registerRole === 'buyer_vip'
                          ? 'border-[#14284B] bg-slate-50 ring-1 ring-[#14284B]'
                          : 'border-gray-200 bg-gray-50/60 hover:bg-gray-100'
                      }`}
                    >
                      <ShoppingBag className={`w-4 h-4 ${registerRole === 'buyer_vip' ? 'text-[#14284B]' : 'text-gray-400'}`} />
                      <div>
                        <span className="block text-xs font-bold text-gray-900 leading-tight">Sou Lojista</span>
                        <span className="text-[10px] text-gray-500">Quero Comprar</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRegisterRole('seller')}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-center gap-2 ${
                        registerRole === 'seller'
                          ? 'border-[#14284B] bg-slate-50 ring-1 ring-[#14284B]'
                          : 'border-gray-200 bg-gray-50/60 hover:bg-gray-100'
                      }`}
                    >
                      <Store className={`w-4 h-4 ${registerRole === 'seller' ? 'text-[#14284B]' : 'text-gray-400'}`} />
                      <div>
                        <span className="block text-xs font-bold text-gray-900 leading-tight">Sou Confecção</span>
                        <span className="text-[10px] text-gray-500">Quero Vender</span>
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    {registerRole === 'seller' ? 'Nome do Fabricante / Loja' : 'Nome Completo'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder={registerRole === 'seller' ? 'Ex: Confecções Pagé Atacado' : 'Ex: Amanda Monteiro'}
                      className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-xs font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8442B] focus:bg-white"
                    />
                    <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                      E-mail Comercial
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="contato@loja.com"
                        className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-xs font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8442B] focus:bg-white"
                      />
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                      WhatsApp com DDD
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="(11) 99888-7766"
                        className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-xs font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8442B] focus:bg-white"
                      />
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Crie uma Senha
                  </label>
                  <div className="relative">
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Mínimo 4 caracteres"
                      className="w-full pl-9 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-xs font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8442B] focus:bg-white"
                    />
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute right-3 top-2 text-gray-400 hover:text-gray-700 cursor-pointer p-0.5"
                    >
                      {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-[#14284B] hover:bg-[#2E5C94] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer hover:shadow-lg active:scale-[0.99]"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Criando sua Conta...</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        <span>Cadastrar e Acessar Catálogo</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* RODAPÉ INFORMATIVO COM GARANTIA */}
          <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-center gap-4 text-[10.5px] text-gray-400 font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>SSL Seguro 256-Bit</span>
            </span>
            <span>•</span>
            <span>Sem taxa de adesão</span>
          </div>

        </div>
      </div>
    </div>
  );
};
