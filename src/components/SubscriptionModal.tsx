import React, { useState } from 'react';
import { 
  X, 
  Crown, 
  CheckCircle2, 
  ArrowRight, 
  LockOpen 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SUBSCRIPTION_PLANS } from '../data/initialData';

export const SubscriptionModal: React.FC = () => {
  const { 
    isSubscriptionModalOpen, 
    closeSubscriptionModal, 
    subscriptionTargetRole, 
    upgradeToVIP 
  } = useApp();

  const [selectedRoleTab, setSelectedRoleTab] = useState<'buyer' | 'seller'>(subscriptionTargetRole);
  const [selectedCycle, setSelectedCycle] = useState<'monthly' | 'quarterly' | 'annual'>('annual');
  const [isSimulating, setIsSimulating] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  React.useEffect(() => {
    setSelectedRoleTab(subscriptionTargetRole);
  }, [subscriptionTargetRole]);

  if (!isSubscriptionModalOpen) return null;

  const currentPlan = SUBSCRIPTION_PLANS.find((p) => p.roleTarget === selectedRoleTab)!;

  const cycles = selectedRoleTab === 'buyer' 
    ? [
        {
          id: 'monthly' as const,
          label: 'Plano Mensal',
          description: 'Ideal para testar o catálogo e conhecer os fornecedores no curto prazo.',
          priceText: 'R$ 29,90',
          subText: '/mês',
          totalText: 'Cobrado mensalmente',
          badge: null
        },
        {
          id: 'quarterly' as const,
          label: 'Plano Trimestral',
          description: 'Equilíbrio ideal entre economia e tempo para repor o estoque da sua loja.',
          priceText: 'R$ 24,96',
          subText: '/mês',
          totalText: 'R$ 74,90 a cada 3 meses',
          badge: '15% OFF'
        },
        {
          id: 'annual' as const,
          label: 'Plano Anual',
          description: 'Melhor custo-benefício para quem compra no atacado com constância o ano todo.',
          priceText: 'R$ 19,99',
          subText: '/mês',
          totalText: 'R$ 239,90 por ano',
          badge: '33% OFF • MELHOR OPÇÃO'
        }
      ]
    : [
        {
          id: 'monthly' as const,
          label: 'Plano Mensal',
          description: 'Flexibilidade sem fidelidade para testar a exposição das suas coleções.',
          priceText: 'R$ 79,90',
          subText: '/mês',
          totalText: 'Cobrado mensalmente',
          badge: null
        },
        {
          id: 'quarterly' as const,
          label: 'Plano Trimestral',
          description: 'Ótimo para campanhas de estação e giro rápido de coleções no atacado.',
          priceText: 'R$ 66,63',
          subText: '/mês',
          totalText: 'R$ 199,90 a cada 3 meses',
          badge: '15% OFF'
        },
        {
          id: 'annual' as const,
          label: 'Plano Anual',
          description: 'Máxima visibilidade o ano inteiro pelo menor custo mensal da plataforma.',
          priceText: 'R$ 58,32',
          subText: '/mês',
          totalText: 'R$ 699,90 por ano',
          badge: '27% OFF • MELHOR OPÇÃO'
        }
      ];

  const handleSimulateSubscription = () => {
    setIsSimulating(true);
    setSuccessMessage(null);
    setTimeout(() => {
      setIsSimulating(false);
      setSuccessMessage(
        selectedRoleTab === 'buyer'
          ? '🎉 Assinatura VIP Comprador ativada! Todos os WhatsApps e contatos foram liberados.'
          : '🎉 Plano Lojista VIP ativado! Você já pode cadastrar seus produtos no catálogo.'
      );
      setTimeout(() => {
        if (selectedRoleTab === 'buyer') {
          upgradeToVIP('buyer_vip');
        } else {
          upgradeToVIP('seller');
        }
      }, 1400);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeSubscriptionModal}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header - Clean, without "clube de assinatura" */}
        <div className="p-6 sm:p-8 pb-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1B33] font-display">
            {selectedRoleTab === 'buyer' 
              ? 'Plano Comprador VIP' 
              : 'Plano Fornecedor VIP'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-md mx-auto leading-relaxed">
            {selectedRoleTab === 'buyer'
              ? 'Acesso direto ao WhatsApp das fábricas do Brás e Goiânia. 100% sem comissão.'
              : 'Exponha suas coleções para lojistas de todo o Brasil com zero comissão sobre vendas.'}
          </p>
        </div>

        {/* Plan Body */}
        <div className="px-6 sm:px-8 pb-6 space-y-6">
          {/* Plan Card - Clean & White */}
          <div className="bg-white border border-slate-200 shadow-md rounded-2xl p-6 relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="inline-block text-[11px] font-black uppercase tracking-wider text-[#FF5A00] bg-orange-50 px-2.5 py-0.5 rounded-full mb-1">
                  {currentPlan.roleTarget === 'buyer' ? 'Acesso VIP Atacadista' : 'Exposição de Confeções'}
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#0B1B33]">
                  {currentPlan.name}
                </h3>
              </div>

              <div className="text-right">
                <div className="text-3xl sm:text-4xl font-black text-[#0B1B33]">
                  {cycles.find(c => c.id === selectedCycle)?.priceText}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  {cycles.find(c => c.id === selectedCycle)?.subText}
                </div>
              </div>
            </div>

            {/* 3 Cards de Planos Bem Explicados: Mensal, Trimestral e Anual */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5">
              {cycles.map((cycle) => {
                const isSelected = selectedCycle === cycle.id;
                return (
                  <button
                    key={cycle.id}
                    onClick={() => setSelectedCycle(cycle.id)}
                    className={`relative p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#FF5A00] bg-orange-50/70 shadow-md ring-2 ring-[#FF5A00]'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    {cycle.badge && (
                      <span className={`absolute -top-2.5 right-3 text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs ${
                        isSelected ? 'bg-[#FF5A00] text-white' : 'bg-slate-900 text-white'
                      }`}>
                        {cycle.badge}
                      </span>
                    )}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-extrabold text-[#0B1B33]">{cycle.label}</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#FF5A00] bg-[#FF5A00]' : 'border-slate-300 bg-white'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 mb-3 leading-snug font-medium">
                        {cycle.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100/80">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl sm:text-2xl font-black text-[#0B1B33]">{cycle.priceText}</span>
                        <span className="text-xs text-slate-500 font-medium">{cycle.subText}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                        {cycle.totalText}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
              {currentPlan.description}
            </p>

            {/* Features Checklists */}
            <div className="space-y-3">
              {currentPlan.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5A00] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Success Celebration */}
          {successMessage && (
            <div className="bg-emerald-600 text-white rounded-xl p-3.5 text-xs sm:text-sm font-bold text-center animate-bounce shadow-md">
              {successMessage}
            </div>
          )}

          {/* CTA Principal Limpo e Moderno */}
          <button
            onClick={handleSimulateSubscription}
            disabled={isSimulating}
            className={`w-full py-4 px-6 rounded-2xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer ${
              selectedRoleTab === 'buyer'
                ? 'bg-[#FF5A00] hover:bg-[#e04f00] text-white'
                : 'bg-[#0B1B33] hover:bg-slate-800 text-white'
            } ${isSimulating ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.01]'}`}
          >
            {isSimulating ? (
              <span>Ativando Assinatura...</span>
            ) : (
              <>
                <LockOpen className="w-5 h-5 text-amber-300" />
                <span>
                  {selectedRoleTab === 'buyer'
                    ? 'Assinar Agora — Liberar Todos os Contatos'
                    : 'Começar a Vender Agora — 0% de Comissão'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Role switcher link at bottom for transparency without cluttering */}
          <div className="pt-2 text-center border-t border-slate-100 flex flex-col items-center gap-2">
            <button
              onClick={() => setSelectedRoleTab(selectedRoleTab === 'buyer' ? 'seller' : 'buyer')}
              className="text-xs font-bold text-[#FF5A00] hover:underline transition-colors cursor-pointer"
            >
              {selectedRoleTab === 'buyer'
                ? 'É fabricante ou confeccionista? Ver Plano para Fornecedor'
                : 'É comprador atacadista? Ver Plano para Comprador'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
