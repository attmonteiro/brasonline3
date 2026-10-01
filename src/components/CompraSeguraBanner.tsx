import React from 'react';
import { 
  Building2, 
  MessageCircle, 
  Truck, 
  Info,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const CompraSeguraBanner: React.FC = () => {
  return (
    <section className="py-8 bg-gradient-to-b from-orange-50/50 via-white to-slate-50/50 border-y border-orange-100/80 my-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 lg:p-9 space-y-6">
          
          {/* Header Explanation */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 pb-6 border-b border-slate-100">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5A00]/10 text-[#FF5A00] text-xs font-black uppercase tracking-wider border border-[#FF5A00]/20">
                <Building2 className="w-3.5 h-3.5" />
                <span>Central de Fabricantes do Brás</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0B1B33] tracking-tight font-display">
                Somos uma central de fabricantes, não vendemos roupas diretamente
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                O <strong>Brás Online</strong> é uma plataforma que conecta lojistas e revendedores diretamente às <strong>confecções e fábricas originais</strong> do Brás, Bom Retiro e polos atacadistas. Não temos estoque próprio nem intermediamos transações financeiras: <strong>você negocia e compra direto com o fabricante</strong> pelo WhatsApp oficial da confecção.
              </p>
            </div>

            {/* Right Tag Highlight */}
            <div className="bg-[#FFF9F5] border border-orange-200/90 rounded-2xl p-4 shrink-0 flex items-center gap-3.5 w-full lg:w-auto">
              <div className="w-12 h-12 rounded-xl bg-[#FF5A00] text-white flex items-center justify-center font-bold shadow-sm shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-xs">
                <div className="font-extrabold text-[#0B1B33] text-sm">
                  100% Direto da Fonte
                </div>
                <div className="text-slate-500 mt-0.5">
                  0% comissões • Contato real de fábrica
                </div>
              </div>
            </div>
          </div>

          {/* 4 Cards Explicativos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            
            {/* Card 1 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:border-orange-200 hover:bg-orange-50/20 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#FF5A00]/10 text-[#FF5A00] flex items-center justify-center mb-3">
                  <Building2 className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-black text-[#0B1B33]">
                  Catálogo dos Fabricantes
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
                  Reunimos as coleções dos estandes e galerias físicas do Brás em uma única vitrine digital prática e atualizada.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-bold text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Vitrine direta de confecções</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:border-orange-200 hover:bg-orange-50/20 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#FF5A00]/10 text-[#FF5A00] flex items-center justify-center mb-3">
                  <Info className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-black text-[#0B1B33]">
                  Não Vendemos Roupas
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
                  Não cobramos comissão sobre seus pedidos e não comercializamos peças. A compra e o pagamento são feitos direto com a fábrica.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-bold text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Zero taxa de intermediação</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:border-orange-200 hover:bg-orange-50/20 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#FF5A00]/10 text-[#FF5A00] flex items-center justify-center mb-3">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-black text-[#0B1B33]">
                  WhatsApp dos Vendedores
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
                  Em cada produto você acessa o WhatsApp do fabricante para tirar dúvidas de tecidos, grade de tamanhos e cores disponíveis.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-bold text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Atendimento humano e rápido</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:border-orange-200 hover:bg-orange-50/20 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#FF5A00]/10 text-[#FF5A00] flex items-center justify-center mb-3">
                  <Truck className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-black text-[#0B1B33]">
                  Envio Combinado Direto
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
                  Combine o frete como preferir com o fabricante: ônibus de excursão do Brás, transportadoras parceiras, Correios ou retirada.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-bold text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Excursões e transportadoras</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
