import React from 'react';
import { ArrowRight, Tag } from 'lucide-react';
import { MINI_PROMOS } from '../data/multivendorData';
import { useApp } from '../context/AppContext';

export const MiniPromosBanner: React.FC = () => {
  const { setFilter, setActiveTab } = useApp();

  const handlePromoClick = (categorySlug: string) => {
    setActiveTab('catalog');
    if (categorySlug === 'feminina') setFilter('category', 'Moda Feminina');
    else if (categorySlug === 'jeans') setFilter('searchQuery', 'Jeans');
    else if (categorySlug === 'calcados') setFilter('category', 'Calçados');

    const el = document.getElementById('grid-produtos') || document.getElementById('melhores-ofertas');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3 cards lado a lado com fundo rosa claro #FDF1EC */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {MINI_PROMOS.map((promo) => (
            <div
              key={promo.id}
              onClick={() => handlePromoClick(promo.categorySlug)}
              className="group cursor-pointer bg-[#FDF1EC] rounded-3xl p-5 sm:p-6 border border-orange-200/50 shadow-xs hover:shadow-md hover:border-[#E8442B]/40 transition-all duration-300 flex items-center justify-between gap-4 overflow-hidden relative"
            >
              {/* Informações da Promoção */}
              <div className="space-y-2 z-10 flex-1">
                {/* Badge de Desconto */}
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#E8442B] text-white text-[11px] font-black uppercase tracking-wider shadow-2xs">
                  <Tag className="w-3 h-3" />
                  <span>{promo.discountBadge}</span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-[#14213D] leading-tight font-poppins group-hover:text-[#E8442B] transition-colors">
                  {promo.title}
                </h3>

                <p className="text-xs text-[#4A4A4A] line-clamp-1">
                  {promo.subtitle}
                </p>

                <div className="pt-1 flex items-center gap-1.5 text-xs font-bold text-[#E8442B] group-hover:translate-x-1 transition-transform">
                  <span>Conferir Ofertas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Imagem do Produto */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 shadow-md bg-white border border-white">
                <img
                  src={promo.imageUrl}
                  alt={promo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
