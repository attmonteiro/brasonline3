import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Store, 
  Layers, 
  ShieldCheck, 
  Building2,
  Sparkles,
  MapPin
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HeroSection: React.FC = () => {
  const { setFilter, setActiveTab } = useApp();

  const handleFindManufacturers = () => {
    setActiveTab('catalog');
    setTimeout(() => {
      const el = document.getElementById('fabricantes-destaque') || document.getElementById('grid-produtos');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleExploreCategories = () => {
    setActiveTab('catalog');
    setTimeout(() => {
      const el = document.getElementById('secao-categorias') || document.getElementById('colecoes-destaque');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <section className="bg-white border-b border-slate-100 overflow-hidden relative">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-[#0B1B33]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LADO ESQUERDO: Posicionamento & Chamada Estratégica */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Tag de Posicionamento */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF7ED] text-[#FF5A00] border border-[#FED7AA] text-xs font-black uppercase tracking-wider shadow-2xs">
              <Building2 className="w-3.5 h-3.5 text-[#FF5A00]" />
              <span>O Polo de Fabricantes de Moda do Brás</span>
            </div>

            {/* Título Grande Obrigatório */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black tracking-tight text-[#0B1B33] leading-[1.12] font-display">
              Encontre os fabricantes do Brás
            </h1>

            {/* Subtítulo Obrigatório */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
              Conecte-se diretamente com fabricantes e fornecedores de moda e encontre os produtos certos para sua loja.
            </p>

            {/* CTAs: Principal + Secundário */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              {/* CTA Principal */}
              <button
                type="button"
                onClick={handleFindManufacturers}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#FF5A00] hover:bg-[#E04F00] text-white font-extrabold text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:scale-[1.02] cursor-pointer"
                title="Encontrar fabricantes de moda no Brás"
              >
                <span>Encontrar fabricantes</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* CTA Secundário */}
              <button
                type="button"
                onClick={handleExploreCategories}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0B1B33] font-bold text-sm transition-all cursor-pointer"
                title="Explorar categorias de roupas e confecções"
              >
                <Layers className="w-4 h-4 text-slate-500" />
                <span>Explorar categorias</span>
              </button>
            </div>

            {/* Micro-Garantias de Credibilidade */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-[#0B1B33]">Direto da fábrica</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-[#0B1B33]">Sem taxas ou intermediação</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-[#0B1B33]">Contato oficial no WhatsApp</span>
              </div>
            </div>

          </div>

          {/* LADO DIREITO: Imagem Editorial & Profissional de Moda/Atacado */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 aspect-[4/4.8] sm:aspect-[4/4.2] lg:aspect-[4/4.8] bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop&q=85"
                alt="Moda Atacado e Confecções do Brás"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Subtle Gradient for Editorial Elegance */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B33]/85 via-transparent to-black/20" />

              {/* Floating Badge Top-Right */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-slate-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-black text-[#0B1B33] uppercase tracking-wider">
                  +1.200 Confecções
                </span>
              </div>

              {/* Floating Bottom Card: Resumo Editorial */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-slate-200 text-[#0B1B33]">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#FF5A00] block">
                      Polo Têxtil de São Paulo
                    </span>
                    <h3 className="text-sm font-bold text-[#0B1B33] mt-0.5">
                      Brás, Bom Retiro & Regiões
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#0B1B33] text-[#FFE066] text-[10px] font-black tracking-wider uppercase shrink-0">
                    Atacado
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Grades completas para revenda e boutiques</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
