import React, { useState } from 'react';
import { ShieldCheck, Factory, MessageCircle, Truck, Check, Sparkles } from 'lucide-react';

interface TrustPillar {
  id: string;
  badge: string;
  badgeType: 'verified' | 'factory' | 'direct' | 'shipping';
  title: string;
  description: string;
  tag: string;
  actionText: string;
  icon: React.ReactNode;
}

const TRUST_PILLARS: TrustPillar[] = [
  {
    id: 'verified',
    badge: '100% AUDITADO',
    badgeType: 'verified',
    title: 'Lojas Confiáveis',
    description: 'CNPJ ativo e showroom físico no Brás verificados pela nossa equipe.',
    tag: 'AUDITORIA ATIVA',
    actionText: 'Verificado',
    icon: <ShieldCheck className="w-4 h-4 text-[#E8442B]" />,
  },
  {
    id: 'no-middleman',
    badge: 'DIRETO DA FONTE',
    badgeType: 'factory',
    title: 'Sem Intermediador',
    description: 'Preço puro de fábrica para revenda sem taxas extras ou atravessadores.',
    tag: '0% COMISSÃO',
    actionText: 'Preço Real',
    icon: <Factory className="w-4 h-4 text-[#E8442B]" />,
  },
  {
    id: 'direct-contact',
    badge: 'WHATSAPP REAL',
    badgeType: 'direct',
    title: 'Negociação Direta',
    description: 'Converse direto com a fábrica, tire dúvidas e monte grades sob medida.',
    tag: 'CONTATO DIRETO',
    actionText: '1 a 1 com a Loja',
    icon: <MessageCircle className="w-4 h-4 text-[#E8442B]" />,
  },
  {
    id: 'secure-shipping',
    badge: 'LOGÍSTICA TOTAL',
    badgeType: 'shipping',
    title: 'Envio Protegido',
    description: 'Despacho garantido via Correios, transportadoras e excursões do Brás.',
    tag: 'TODO O BRASIL',
    actionText: 'Garantido',
    icon: <Truck className="w-4 h-4 text-[#E8442B]" />,
  },
];

export const ShopeeVouchers: React.FC = () => {
  const [clickedPill, setClickedPill] = useState<string | null>(null);

  const handlePillClick = (pillar: TrustPillar) => {
    setClickedPill(pillar.id);
    const el = document.getElementById('flash-sale-section') || document.getElementById('recomendados-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      setClickedPill(null);
    }, 2500);
  };

  return (
    <section className="py-2.5 sm:py-3.5 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        
        {/* CABEÇALHO DA SEÇÃO DE SEGURANÇA E CONFIANÇA */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#E8442B]" />
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#14213D]">
              Garantia Direto da Fábrica
            </h2>
          </div>
          <span className="text-[11px] text-[#4A4A4A] hidden xs:inline">
            Compre com procedência e sem atravessadores
          </span>
        </div>

        {/* LISTA HORIZONTAL NO MESMO FORMATO DOS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5">
          {TRUST_PILLARS.map((pillar) => {
            const isSelected = clickedPill === pillar.id;

            return (
              <div
                key={pillar.id}
                className="voucher-ticket bg-white border border-[#E8442B]/25 rounded-[4px] p-2.5 flex items-center justify-between gap-2 shadow-2xs hover:shadow-xs transition-shadow relative overflow-hidden"
              >
                {/* Linha decorativa vertical tracejada estilo ticket */}
                <div className="absolute right-[65px] sm:right-[72px] top-1 bottom-1 border-r border-dashed border-gray-200 pointer-events-none"></div>

                {/* Conteúdo do Card */}
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex items-center gap-1">
                    <span className="text-xs sm:text-sm font-extrabold text-[#14213D] leading-none truncate">
                      {pillar.title}
                    </span>
                    <span className="text-[8.5px] font-bold bg-[#FDF1EC] text-[#E8442B] px-1 py-0.2 rounded uppercase flex-shrink-0">
                      {pillar.badge}
                    </span>
                  </div>

                  <p className="text-[10px] text-[#4A4A4A] mt-1 font-medium line-clamp-2 leading-tight">
                    {pillar.description}
                  </p>
                  
                  <span className="text-[9px] text-[#E8442B] font-semibold block truncate mt-0.5">
                    {pillar.tag}
                  </span>
                </div>

                {/* Botão de Ação / Selo Lateral */}
                <div className="flex flex-col items-center justify-center pl-1 flex-shrink-0">
                  <button
                    onClick={() => handlePillClick(pillar)}
                    className={`text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-1 rounded-[3px] transition-all cursor-pointer shadow-2xs text-center leading-none ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#E8442B] hover:bg-[#d03a22] text-white active:scale-95'
                    }`}
                  >
                    {isSelected ? (
                      <span className="flex items-center gap-0.5">
                        <Check className="w-3 h-3" />
                        <span>Ativo</span>
                      </span>
                    ) : (
                      pillar.actionText
                    )}
                  </button>
                  <span className="text-[8.5px] font-bold text-gray-400 mt-1 uppercase text-center">
                    Seguro
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
