import React from 'react';

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="como-funciona-section" className="bg-white border-t border-[#E8E8E8] py-4 sm:py-5 select-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* CONTAINER HORIZONTAL COMPACTO */}
        <div className="bg-slate-50/80 border border-[#E8E8E8] rounded-2xl p-3.5 sm:p-4 md:p-5 flex flex-col lg:flex-row items-center justify-between gap-3.5 lg:gap-6 shadow-2xs">
          
          {/* LADO ESQUERDO: TÍTULO & IDENTIFICAÇÃO DE DIVULGAÇÃO */}
          <div className="lg:max-w-xs shrink-0 text-center lg:text-left w-full lg:w-auto">
            <div className="inline-flex items-center gap-1.5 text-[10.5px] font-bold text-[#2E5C94] uppercase tracking-wider mb-0.5">
              <span className="text-xs">🏭</span>
              <span>Portal de Divulgação Oficial</span>
            </div>
            <h2 className="text-sm sm:text-base font-black text-[#14284B] leading-tight">
              Como Funciona o Brás Online
            </h2>
            <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
              Conectamos você direto aos confeccionistas. <span className="font-bold text-[#14284B]">Não vendemos</span> nem intermediamos pagamentos.
            </p>
          </div>

          {/* LADO DIREITO: 3 PASSOS HORIZONTAIS COM SÍMBOLOS */}
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 items-center">
            
            {/* ETAPA 1 */}
            <div className="bg-white border border-[#E8E8E8] rounded-xl p-2.5 sm:p-3 flex items-center gap-2.5 shadow-2xs hover:border-[#2E5C94]/40 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-base">
                🔍
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-bold text-[#14284B] truncate">
                  1. Escolha a Peça
                </span>
                <span className="block text-[10px] sm:text-[10.5px] text-gray-500 truncate">
                  Confecções verificadas do Brás
                </span>
              </div>
            </div>

            {/* ETAPA 2 */}
            <div className="bg-white border border-[#E8E8E8] rounded-xl p-2.5 sm:p-3 flex items-center gap-2.5 shadow-2xs hover:border-[#2E5C94]/40 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-base">
                💬
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-bold text-[#14284B] truncate">
                  2. Chame no WhatsApp
                </span>
                <span className="block text-[10px] sm:text-[10.5px] text-gray-500 truncate">
                  Negocie direto com a fábrica
                </span>
              </div>
            </div>

            {/* ETAPA 3 */}
            <div className="bg-white border border-[#E8E8E8] rounded-xl p-2.5 sm:p-3 flex items-center gap-2.5 shadow-2xs hover:border-[#2E5C94]/40 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-base">
                📦
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-bold text-[#14284B] truncate">
                  3. Receba na sua Loja
                </span>
                <span className="block text-[10px] sm:text-[10.5px] text-gray-500 truncate">
                  Excursão, correios ou frete
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
