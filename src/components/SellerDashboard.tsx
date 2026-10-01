import React, { useState } from 'react';
import { 
  Store, 
  PlusCircle, 
  ShieldCheck, 
  TrendingUp, 
  MessageCircle, 
  Package, 
  MapPin, 
  CheckCircle2, 
  ArrowLeft, 
  DollarSign, 
  Crown, 
  ExternalLink,
  LogIn,
  Lock,
  Users,
  LogOut,
  LockOpen,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CreateStoreCard } from './CreateStoreCard';

export const SellerDashboard: React.FC = () => {
  const { 
    products, 
    setIsNewProductModalOpen, 
    setActiveTab, 
    userRole, 
    openSubscriptionModal,
    setSelectedProduct,
    currentUser,
    openLoginModal,
    openCreateStoreModal,
    login,
    logout
  } = useApp();

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrorMsg, setLoginErrorMsg] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const isSellerAuthenticated = currentUser && currentUser.role === 'seller';
  const isSellerVip = userRole === 'seller';
  const storeName = currentUser?.storeInfo?.name || 'Sua Confecção / Loja';

  const handleSellerLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErrorMsg('');
    setIsLoggingIn(true);
    setTimeout(() => {
      const res = login(loginUsername, loginPassword);
      setIsLoggingIn(false);
      if (!res.success) {
        setLoginErrorMsg(res.message || 'Usuário ou senha incorretos.');
      }
    }, 400);
  };

  if (!isSellerAuthenticated) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
        {/* Top Breadcrumb & Status */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <button
            onClick={() => setActiveTab('catalog')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Catálogo Geral</span>
          </button>

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200">
            <Lock className="w-3.5 h-3.5 text-amber-600" />
            <span>Acesso Restrito: Área Pessoal do Fornecedor / Fabricante</span>
          </span>
        </div>

        {/* Gate Box / Login Required Section */}
        <div className="bg-[#0B1B33] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden border border-slate-700">
          <div className="absolute right-0 top-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Column: Context & Explanations */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-sm">
                <Store className="w-3.5 h-3.5" />
                <span>Portal do Fabricante — Login Obrigatório</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight font-display">
                Acesse sua sessão pessoal para gerenciar sua loja e cadastrar produtos
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                O fornecedor deve fazer login com sua conta corporativa para acessar sua sessão pessoal no <strong>Brás Online</strong>. Conecte-se para expor suas coleções do <strong>Brás, Bom Retiro e 44 Goiânia</strong>, gerenciar suas grades de atacado e acompanhar os cliques no seu WhatsApp.
              </p>

              <div className="pt-2 space-y-2.5">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Sessão segura e pessoal da sua fábrica ou importadora</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Cadastre novos produtos, grades e preços em tempo real</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>0% de comissão: negociação direta no seu WhatsApp</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Login Form for Seller */}
            <div className="lg:col-span-5 bg-white text-slate-900 rounded-2xl p-6 sm:p-7 border border-slate-200">
              <div className="text-center mb-5">
                <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-[#FF5A00] bg-orange-50 px-3 py-1 rounded-full mb-2">
                  <LockOpen className="w-3.5 h-3.5" />
                  <span>Sessão Pessoal de Fornecedor</span>
                </span>
                <h2 className="text-xl font-black text-[#0B1B33]">
                  Seus dados
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Insira suas credenciais para abrir sua sessão de loja
                </p>
              </div>

              <form onSubmit={handleSellerLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Usuário ou E-mail do Fornecedor
                  </label>
                  <input
                    type="text"
                    required
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder="Ex: vendedor"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF5A00] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Senha de Acesso
                  </label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF5A00] focus:border-transparent transition-all"
                  />
                </div>

                {loginErrorMsg && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{loginErrorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-3.5 rounded-xl bg-[#FF5A00] hover:bg-[#e04f00] text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoggingIn ? (
                    <span>Entrando na Sessão...</span>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 text-amber-300" />
                      <span>Entrar na Minha Sessão Pessoal</span>
                    </>
                  )}
                </button>
              </form>

              {/* New Seller CTA */}
              <div className="mt-5 text-center">
                <p className="text-[11px] text-slate-500 mb-1.5 font-medium">
                  Ainda não tem cadastro para sua confecção?
                </p>
                <button
                  onClick={openCreateStoreModal}
                  className="text-xs font-bold text-[#FF5A00] hover:underline transition-colors cursor-pointer"
                >
                  Preencher Card de Criação de Loja →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Card Específico para Criação de Loja */}
        <div className="mt-10">
          <CreateStoreCard isEmbedded={true} />
        </div>

        {/* 3 Value Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-[#FF5A00]" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">0% de Comissão</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Diferente de marketplaces tradicionais, você não paga nenhuma porcentagem sobre as vendas. Todo o lucro das grades é 100% da sua confecção.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Lojistas e Revendedores VIP</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Exponha suas coleções para lojistas qualificados e atacadistas de todo o país que compram pacotes e grades fechadas com recorrência.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Contato Direto no WhatsApp</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              O comprador interessado nas suas peças clica e conversa direto no seu WhatsApp comercial, com a mensagem já formatada com a grade e preço.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Top Breadcrumb & Logout */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <button
          onClick={() => setActiveTab('catalog')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Catálogo Geral</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs font-bold border border-orange-200">
            <Store className="w-3.5 h-3.5 text-orange-600" />
            <span>Sessão Pessoal do Fornecedor: {storeName}</span>
          </span>

          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-700 text-xs font-bold transition-all border border-slate-200 cursor-pointer"
            title="Sair da sessão do fabricante"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair da sessão</span>
          </button>
        </div>
      </div>

      {/* Main Seller Identity & Subscription Status Card */}
      <div className="bg-[#0B1B33] text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-slate-700">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-orange-500/20 text-orange-300 text-xs font-bold border border-orange-400/30">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>
                {isSellerVip 
                  ? 'Plano Fabricante VIP • Ativo (Exposição Ilimitada sem Comissão)' 
                  : 'Sessão Pessoal do Fornecedor Ativa'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Seus dados
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
              Sua sessão pessoal está ativa. Gerencie suas grades no <strong>Brás Online</strong> e cadastre produtos para aparecer em destaque por região (Brás, Bom Retiro, Goiânia) para <strong>lojistas e revendedores de todo o Brasil</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsNewProductModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-[#FF5A00] hover:bg-[#e04f00] text-white font-extrabold text-sm shadow-md flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <PlusCircle className="w-5 h-5 text-amber-300" />
              <span>Cadastrar Novo Produto</span>
            </button>

            <button
              onClick={openCreateStoreModal}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Store className="w-4 h-4 text-amber-300" />
              <span>Criar / Editar Minha Loja</span>
            </button>

            {!isSellerVip && (
              <button
                onClick={() => openSubscriptionModal('seller')}
                className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm flex items-center gap-2 transition-transform hover:scale-105"
              >
                <Crown className="w-4 h-4 fill-slate-950" />
                <span>Ativar Plano Fabricante • R$ 79,90</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-700/80">
          <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60">
            <div className="text-xs text-slate-400 font-semibold uppercase flex items-center gap-1.5">
              <Package className="w-4 h-4 text-orange-400" />
              <span>Produtos Ativos na Vitrine</span>
            </div>
            <div className="text-3xl font-black text-white mt-1">
              {products.length}
            </div>
            <div className="text-[11px] text-orange-400 font-medium mt-1">
              • Todos com grade e WhatsApp visíveis para membros VIP
            </div>
          </div>

          <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60">
            <div className="text-xs text-slate-400 font-semibold uppercase flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-orange-400" />
              <span>Cliques no Seu WhatsApp VIP</span>
            </div>
            <div className="text-3xl font-black text-white mt-1">
              142
            </div>
            <div className="text-[11px] text-slate-300 font-medium mt-1">
              • Média de 18 compradores por dia nesta semana
            </div>
          </div>

          <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60">
            <div className="text-xs text-slate-400 font-semibold uppercase flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-amber-400" />
              <span>Comissão Retida pelo Site</span>
            </div>
            <div className="text-3xl font-black text-orange-400 mt-1">
              R$ 0,00
            </div>
            <div className="text-[11px] text-slate-300 font-medium mt-1">
              • Você negocia e fecha 100% da venda direto na fábrica
            </div>
          </div>
        </div>
      </div>

      {/* Products list heading */}
      <div className="mt-10 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Seus Produtos Cadastrados ({products.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Clique em um item para visualizar como ele aparece para os compradores atacadistas:
          </p>
        </div>

        <button
          onClick={() => setIsNewProductModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs"
        >
          <PlusCircle className="w-4 h-4 text-amber-300" />
          <span>+ Adicionar Outro</span>
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
        {products.map((prod) => (
          <div 
            key={prod.id}
            onClick={() => setSelectedProduct(prod)}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="relative aspect-[3/4.4] bg-slate-100 overflow-hidden">
                <img
                  src={prod.imageUrl}
                  alt={prod.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-4 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                  <span className="text-emerald-700">{prod.category}</span>
                  <span>Mín. {prod.minQuantity} pçs</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                  {prod.title}
                </h3>

                <div className="text-lg font-black text-slate-900 pt-1">
                  R$ {(Number(prod.price) || 0).toFixed(2).replace('.', ',')} <span className="text-xs font-semibold text-slate-400">/ pç</span>
                </div>
              </div>
            </div>

            <div className="px-4 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 truncate max-w-[150px]">
                {prod.supplier?.name || 'Sua Loja'}
              </span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <span>Ver na Vitrine</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
