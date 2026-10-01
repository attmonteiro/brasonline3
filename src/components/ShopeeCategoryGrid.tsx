import React from 'react';
import { SHOPEE_CATEGORIES, ShopeeCategory } from '../data/shopeeData';
import { useApp } from '../context/AppContext';
import { CategoryType } from '../types';
import { Check } from 'lucide-react';

export const ShopeeCategoryGrid: React.FC = () => {
  const { filters, setFilter, setActiveTab } = useApp();

  const handleCategoryClick = (category: ShopeeCategory) => {
    setFilter('category', category.name as CategoryType);
    setActiveTab('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isSelected = (cat: ShopeeCategory) => {
    if (filters.category === 'Todas') return false;
    const catF = filters.category.toLowerCase();
    const cName = cat.name.toLowerCase();
    return catF === cName || 
           (cName === 'feminino' && (catF.includes('femin') || catF === 'jeans')) ||
           (cName === 'masculino' && catF.includes('masculin')) ||
           (cName === 'infantil' && catF.includes('infant')) ||
           (cName === 'calçados' && (catF.includes('calcado') || catF.includes('calçado'))) ||
           ((cName === 'acessórios' || cName === 'bolsas') && (catF.includes('acessor') || catF.includes('bolsa'))) ||
           (cName === 'pijama' && catF.includes('pijama'));
  };

  return (
    <section className="bg-white border-b border-[#E8E8E8] py-4 sm:py-5 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* CABEÇALHO DA SEÇÃO DE CATEGORIAS (SEM O BOTÃO VER TODAS) */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#14284B]">
              Categorias
            </h2>
            <span className="text-[11px] text-gray-400 font-medium hidden xs:inline">
              (6 departamentos oficiais)
            </span>
          </div>
        </div>

        {/* CONTAINER COM AS 6 CATEGORIAS - CARDS COM PEQUENO ESPAÇO EM BRANCO AO REDOR DA FOTO */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 md:gap-3.5 w-full items-start">
          {SHOPEE_CATEGORIES.map((cat) => {
            const active = isSelected(cat);

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat)}
                className={`relative flex flex-col items-center justify-start w-full p-1 sm:p-1.5 rounded-xl bg-white border transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-xs group hover:-translate-y-0.5 ${
                  active 
                    ? 'border-[#2E5C94] ring-1 ring-[#2E5C94]/30 shadow-xs' 
                    : 'border-slate-100 hover:border-[#2E5C94]/40'
                }`}
                aria-label={`Filtrar categoria ${cat.name}`}
              >
                {/* Badge de Destaque no Canto da Imagem */}
                {cat.badge && (
                  <span className="absolute top-2 right-2 bg-[#C4372B] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase leading-none shadow-2xs tracking-wide z-10">
                    {cat.badge}
                  </span>
                )}

                {/* Imagem Fotográfica com Pequeno Espaço em Branco Elegante ao Redor */}
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-slate-50 shrink-0">
                  <img 
                    src={cat.imageUrl} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none"
                    loading="lazy"
                  />
                  {/* Sutil gradiente para profundidade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />

                  {/* Indicador de Seleção Ativa */}
                  {active && (
                    <span className="absolute bottom-1 right-1 w-4.5 h-4.5 bg-[#2E5C94] text-white rounded-full flex items-center justify-center shadow-xs">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>

                {/* Nome da Categoria Logo Abaixo da Imagem */}
                <div className="w-full pt-1 sm:pt-1.5 pb-0.5 px-0.5 flex items-center justify-center">
                  <span 
                    className={`text-xs sm:text-[13px] text-center font-bold truncate transition-colors leading-tight ${
                      active 
                        ? 'text-[#2E5C94]' 
                        : 'text-[#14284B] group-hover:text-[#2E5C94]'
                    }`}
                  >
                    {cat.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
