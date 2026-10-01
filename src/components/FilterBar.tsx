import React from 'react';
import { 
  SlidersHorizontal, 
  ArrowUpDown, 
  CheckCircle2, 
  X, 
  PackageCheck 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FilterBar: React.FC = () => {
  const { filters, setFilter, resetFilters, filteredProducts, products } = useApp();

  const isFiltered =
    filters.category !== 'Todas' ||
    filters.region !== 'Todas as Regiões' ||
    filters.searchQuery !== '' ||
    filters.maxPrice !== null ||
    filters.minQuantityFilter !== null ||
    filters.onlyReadyDelivery;

  return (
    <div className="bg-white border-b border-orange-100 sticky top-[69px] sm:top-[70px] z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Left Summary */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wide">
              <SlidersHorizontal className="w-3.5 h-3.5 text-orange-600" />
              <span>
                {filteredProducts.length}{' '}
                {filteredProducts.length === 1 ? 'peça catalogada' : 'peças catalogadas'}
              </span>
              {isFiltered && (
                <span className="text-slate-400 font-normal">
                  (de {products.length})
                </span>
              )}
            </div>

            <span className="text-slate-300 hidden sm:inline">|</span>

            {/* Minimum quantity selector */}
            <select
              value={filters.minQuantityFilter ?? ''}
              onChange={(e) => {
                const val = e.target.value ? Number(e.target.value) : null;
                setFilter('minQuantityFilter', val);
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-orange-200 text-slate-700 hover:bg-orange-50 focus:outline-none focus:ring-1 focus:ring-orange-500"
              title="Filtrar por quantidade máxima no pedido mínimo"
            >
              <option value="">Ped. Mínimo: Todos</option>
              <option value="6">Até 6 peças</option>
              <option value="10">Até 10 peças</option>
              <option value="15">Até 15 peças</option>
              <option value="20">Até 20 peças</option>
            </select>
          </div>

          {/* Right Sorting & Reset */}
          <div className="flex items-center gap-2 ml-auto">
            {isFiltered && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-700 hover:bg-rose-50 transition-colors border border-rose-200/60"
              >
                <X className="w-3.5 h-3.5" />
                <span>Limpar Filtros</span>
              </button>
            )}

            <div className="flex items-center gap-1.5 bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs font-bold shadow-2xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span className="text-stone-500 hidden sm:inline uppercase text-[10px] tracking-wider font-bold">Ordenar:</span>
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilter(
                    'sortBy',
                    e.target.value as typeof filters.sortBy
                  )
                }
                className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
              >
                <option value="relevance">Ordem Carregada (Padrão)</option>
                <option value="price_asc">Menor Preço Atacado</option>
                <option value="price_desc">Maior Preço Atacado</option>
                <option value="min_qty_asc">Menor Pedido Mínimo</option>
                <option value="newest">Lançamentos Recentes</option>
              </select>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

