import React, { useState } from 'react';
import { 
  X, 
  Store, 
  LogIn, 
  PlusCircle, 
  ShieldCheck, 
  UserCheck, 
  KeyRound, 
  AlertCircle, 
  CheckCircle2 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CreateStoreCard } from './CreateStoreCard';

export const CreateStoreModal: React.FC = () => {
  const { isCreateStoreModalOpen, closeCreateStoreModal, login } = useApp();
  const [activeTab, setActiveTabMode] = useState<'login' | 'create'>('login');
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isCreateStoreModalOpen) return null;

  const handleLojistaLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    setTimeout(() => {
      const res = login(username, password);
      setLoading(false);
      if (res.success) {
        setSuccessMsg('Acesso concedido ao Painel do Lojista! Redirecionando...');
        setTimeout(() => {
          closeCreateStoreModal();
        }, 500);
      } else {
        setError(res.message || 'Usuário ou senha incorretos.');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl my-auto shadow-2xl border border-slate-200">
        
        {/* Top Header Bar with Navigation Tabs */}
        <div className="sticky top-0 z-20 bg-[#0B1B33] text-white p-4 sm:p-6 rounded-t-3xl border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                Área do Lojista & Fabricante
              </h2>
              <p className="text-xs text-slate-300">
                Acesse sua loja existente ou crie uma nova vitrine no atacado
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab Switcher */}
            <div className="bg-slate-900/90 p-1 rounded-full border border-slate-700/80 flex items-center gap-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTabMode('login')}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'login'
                    ? 'bg-[#FF5A00] text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <LogIn className="w-3.5 h-3.5 text-amber-300" />
                <span>Entrar no Painel</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTabMode('create')}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'create'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Criar Minha Loja</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={closeCreateStoreModal}
              className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-full transition-all border border-slate-700 cursor-pointer shadow-md ml-2"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Body */}
        <div className="p-6 sm:p-8">
          {activeTab === 'login' ? (
            <div className="max-w-md mx-auto py-4">
              <div className="text-center mb-6 space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-[#FF5A00] text-xs font-extrabold uppercase tracking-wider border border-orange-100">
                  <ShieldCheck className="w-4 h-4 text-[#FF5A00]" />
                  <span>Login do Lojista & Administrador</span>
                </span>
                <h3 className="text-2xl font-black text-[#0B1B33]">
                  Acesse sua Conta
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Digite seu usuário e senha de lojista para acessar seu painel de fabricante.
                </p>
              </div>

              <form onSubmit={handleLojistaLoginSubmit} className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Usuário / E-mail do Lojista
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Insira seu usuário"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF5A00] transition-all"
                    />
                    <UserCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Senha
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF5A00] transition-all"
                    />
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 p-3.5 rounded-xl text-xs font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{error}</span>
                  </div>
                )}

                {successMsg && (
                  <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-xl text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>{successMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 bg-[#FF5A00] hover:bg-[#e04f00] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>Entrando...</span>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 text-amber-300" />
                      <span>Entrar no Painel do Lojista</span>
                    </>
                  )}
                </button>
              </form>

              {/* Toggle to Create Store */}
              <div className="mt-6 text-center border-t border-slate-200 pt-4">
                <p className="text-xs text-slate-500 mb-2 font-medium">
                  Ainda não tem cadastro para sua confecção ou loja?
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTabMode('create')}
                  className="px-5 py-2.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4 text-amber-700" />
                  <span>Cadastrar Minha Fábrica / Criar Loja →</span>
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-4 flex items-center justify-between bg-amber-50 border border-amber-200 p-3.5 rounded-2xl">
                <span className="text-xs font-bold text-amber-950 flex items-center gap-2">
                  <Store className="w-4 h-4 text-amber-700" />
                  <span>Você está no formulário de cadastro de nova fábrica</span>
                </span>
                <button
                  onClick={() => setActiveTabMode('login')}
                  className="text-xs font-extrabold text-[#FF5A00] hover:underline cursor-pointer"
                >
                  Já tem loja? Faça Login
                </button>
              </div>
              <CreateStoreCard onSuccess={closeCreateStoreModal} isEmbedded={true} />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
