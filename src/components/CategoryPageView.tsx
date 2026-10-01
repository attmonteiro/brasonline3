import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Search, 
  RotateCcw,
  Package,
  Heart
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SHOPEE_RECOMMENDED_PRODUCTS } from '../data/shopeeData';
import { Product, CategoryType } from '../types';

export const CategoryPageView: React.FC = () => {
  const { 
    filters, 
    setFilter, 
    setActiveTab, 
    products: contextProducts, 
    setSelectedProduct,
    isFavorite,
    toggleFavorite
  } = useApp();

  const [localSearch, setLocalSearch] = useState('');
  const [selectedSort, setSelectedSort] = useState<'relevance' | 'price_asc' | 'price_desc' | 'min_qty_asc'>('relevance');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Categoria ativa atual
  const activeCategory = filters.category !== 'Todas' ? filters.category : 'Feminino';

  // Função robusta de correspondência de categoria
  const matchesCategory = (prodCategory: string, targetCategory: string): boolean => {
    if (!targetCategory || targetCategory === 'Todas') return true;
    const catT = targetCategory.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const prodC = (prodCategory || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    if (catT === 'feminino') {
      return prodC.includes('femin') || prodC.includes('jeans') || prodC.includes('fitness') || 
             prodC.includes('vestid') || prodC.includes('saia') || prodC.includes('cropped');
    }
    if (catT === 'masculino') {
      return prodC.includes('masculin') || prodC.includes('homem') || prodC.includes('polo') || prodC.includes('bermuda');
    }
    if (catT === 'infantil') {
      return prodC.includes('infant') || prodC.includes('kids') || prodC.includes('bebe') || prodC.includes('crianca');
    }
    if (catT === 'calcados' || catT === 'calcado') {
      return prodC.includes('calcado') || prodC.includes('tenis') || prodC.includes('sapato') || prodC.includes('sandalia');
    }
    if (catT === 'acessorios' || catT === 'acessorio' || catT === 'bolsas' || catT === 'bolsa') {
      return prodC.includes('acessor') || prodC.includes('bolsa') || prodC.includes('mochila') || prodC.includes('carteira') || prodC.includes('cinto') || prodC.includes('bijuteria');
    }
    if (catT === 'pijama') {
      return prodC.includes('pijama') || prodC.includes('dormir') || prodC.includes('noite') || prodC.includes('camisola');
    }

    return prodC.includes(catT) || catT.includes(prodC);
  };

  // Converte recomendados Shopee para o modelo de Product unificado
  const shopeeMappedProducts: Product[] = useMemo(() => {
    return SHOPEE_RECOMMENDED_PRODUCTS.map((item) => ({
      id: item.id,
      title: item.title,
      description: `Produto direto da confecção parceira. Pronta entrega garantida no polo de São Paulo.`,
      price: item.price,
      suggestedRetailPrice: Number((item.price * 2.2).toFixed(2)),
      imageUrl: item.imageUrl,
      category: item.category as CategoryType,
      region: 'Brás - SP',
      minQuantity: 6,
      readyDelivery: true,
      inStock: true,
      grade: {
        sizes: ['P', 'M', 'G'],
        colors: ['Variadas'],
        gradeRatio: '2P - 2M - 2G'
      },
      supplier: {
        id: `sup-${item.vendorName || 'bras'}`,
        name: item.vendorName || 'Confecção Parceira do Brás',
        storeCode: 'Polo Brás SP • Loja Oficial',
        region: 'Brás - SP',
        verified: true,
        deliveryReady: true,
        rating: 4.9,
        reviewsCount: 140,
        phone: '11999998888',
        whatsapp: '5511999998888',
        address: 'Rua Miller, Brás - SP',
        minOrderValue: 200,
        establishedYear: 2018,
        categories: [item.category as CategoryType]
      },
      reviews: [],
      rating: 4.8,
      salesCount: 85,
      createdAt: new Date().toISOString()
    }));
  }, []);

  // Une lista de produtos disponíveis sem duplicidades
  const allAvailableProducts = useMemo(() => {
    const list = [...contextProducts];
    const existingIds = new Set(list.map(p => p.id));
    shopeeMappedProducts.forEach(sp => {
      if (!existingIds.has(sp.id)) {
        list.push(sp);
      }
    });
    return list;
  }, [contextProducts, shopeeMappedProducts]);

  // Filtragem estrita para a categoria selecionada e filtros adicionais
  const categoryProducts = useMemo(() => {
    const minVal = parseFloat(minPrice.replace(',', '.'));
    const maxVal = parseFloat(maxPrice.replace(',', '.'));

    return allAvailableProducts.filter(prod => {
      // 1. Categoria estrita
      if (!matchesCategory(prod.category, activeCategory)) {
        return false;
      }

      // 2. Busca local dentro da categoria
      if (localSearch.trim() !== '') {
        const q = localSearch.toLowerCase();
        const matchTitle = (prod.title || '').toLowerCase().includes(q);
        const matchSupplier = (prod.supplier?.name || '').toLowerCase().includes(q);
        if (!matchTitle && !matchSupplier) return false;
      }

      // 3. Faixa de preço com valor mínimo e máximo digitáveis
      const price = Number(prod.price) || 0;
      if (!isNaN(minVal) && minVal > 0 && price < minVal) {
        return false;
      }
      if (!isNaN(maxVal) && maxVal > 0 && price > maxVal) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = Number(a.price) || 0;
      const priceB = Number(b.price) || 0;
      if (selectedSort === 'price_asc') return priceA - priceB;
      if (selectedSort === 'price_desc') return priceB - priceA;
      if (selectedSort === 'min_qty_asc') return (a.minQuantity || 1) - (b.minQuantity || 1);
      return 0; // relevance
    });
  }, [allAvailableProducts, activeCategory, localSearch, minPrice, maxPrice, selectedSort]);

  return (
    <div className="bg-white min-h-screen pb-16 pt-3 animate-fadeIn text-[#14284B]">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">

        {/* 1. BREADCRUMBS & VOLTAR AO CATÁLOGO INICIAL */}
        <div className="flex flex-wrap items-center justify-between gap-2 py-2 mb-3 text-xs">
          <div className="flex items-center gap-1.5 text-gray-500 overflow-x-auto py-0.5">
            <button
              onClick={() => {
                setFilter('category', 'Todas');
                setActiveTab('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1 font-semibold text-[#14284B] hover:text-[#2E5C94] transition-colors cursor-pointer bg-white px-2.5 py-1 rounded border border-[#E8E8E8] shadow-2xs group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Voltar ao Início</span>
            </button>

            <span className="text-gray-300">/</span>

            <span className="text-[#14284B] font-bold text-sm">
              {activeCategory}
            </span>
          </div>

          <div className="text-[11px] text-gray-500 font-medium">
            <span className="font-bold text-[#14284B]">{categoryProducts.length}</span> modelos disponíveis
          </div>
        </div>

        {/* 2. BARRA DE FILTROS E BUSCA DENTRO DA CATEGORIA */}
        <div className="bg-white rounded-lg border border-[#E8E8E8] shadow-2xs p-3 mb-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            
            {/* Campo de Busca Dentro da Categoria */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder={`Buscar produtos em ${activeCategory}...`}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-[#E8E8E8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#2E5C94] focus:border-[#2E5C94] text-[#14284B]"
              />
              {localSearch && (
                <button
                  onClick={() => setLocalSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Controles de Ordenação e Faixa de Preço com 2 campos (Mín e Máx) */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              
              {/* Filtro por Faixa de Preço com 2 campos: Mínimo e Máximo */}
              <div className="flex items-center gap-1.5 bg-slate-50 border border-[#E8E8E8] rounded px-2 py-1">
                <span className="text-[11px] text-[#2E5C94] font-bold">R$</span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Mínimo"
                  className="w-16 sm:w-20 bg-transparent text-xs text-[#14284B] placeholder-gray-400 focus:outline-none font-medium"
                />
                <span className="text-gray-300 text-xs">-</span>
                <span className="text-[11px] text-[#2E5C94] font-bold">R$</span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Máximo"
                  className="w-16 sm:w-20 bg-transparent text-xs text-[#14284B] placeholder-gray-400 focus:outline-none font-medium"
                />
                {(minPrice || maxPrice) && (
                  <button
                    type="button"
                    onClick={() => { setMinPrice(''); setMaxPrice(''); }}
                    className="text-gray-400 hover:text-[#C4372B] text-xs ml-0.5 cursor-pointer font-bold"
                    title="Limpar faixa de preço"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Ordenação */}
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value as any)}
                className="px-2.5 py-1.5 bg-white border border-[#E8E8E8] rounded text-[#14284B] text-xs outline-none cursor-pointer font-medium focus:border-[#2E5C94]"
              >
                <option value="relevance">Mais Relevantes</option>
                <option value="price_asc">Menor Preço</option>
                <option value="price_desc">Maior Preço</option>
                <option value="min_qty_asc">Menor Pedido Mínimo</option>
              </select>

              {/* Botão Resetar se filtros ativos */}
              {(localSearch || minPrice || maxPrice || selectedSort !== 'relevance') && (
                <button
                  onClick={() => {
                    setLocalSearch('');
                    setMinPrice('');
                    setMaxPrice('');
                    setSelectedSort('relevance');
                  }}
                  className="p-1.5 rounded border border-[#E8E8E8] hover:bg-slate-100 text-[#14284B] cursor-pointer"
                  title="Limpar filtros"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}

            </div>

          </div>
        </div>

        {/* 3. GRID DE PRODUTOS EXCLUSIVOS DA CATEGORIA (DESIGN COMPACTO) */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-3 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-8 gap-1.5 sm:gap-2">
            {categoryProducts.map((product) => {
              const favorite = isFavorite(product.id);
              const safePrice = (Number(product.price) || 0).toFixed(2).replace('.', ',');

              return (
                <div
                  key={product.id}
                  onClick={() => {
                    setSelectedProduct(product);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="relative bg-white rounded-lg sm:rounded-xl p-0.5 sm:p-1 shadow-2xs hover:shadow-xs border border-[#E8E8E8] hover:border-[#2E5C94] transition-all duration-200 flex flex-col justify-between group cursor-pointer hover:-translate-y-0.5"
                >
                  {/* CORAÇÃO DE FAVORITO NO CANTO SUPERIOR DIREITO DO CARD */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    className="absolute top-1 right-1 z-10 p-0.5 rounded-full bg-white/90 hover:bg-white text-gray-300 hover:text-[#C4372B] backdrop-blur-xs shadow-2xs transition-all cursor-pointer"
                    title={favorite ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
                  >
                    <Heart 
                      className={`w-3 h-3 transition-transform active:scale-125 ${
                        favorite ? 'fill-[#C4372B] text-[#C4372B]' : 'text-gray-400 hover:text-[#C4372B]'
                      }`} 
                    />
                  </button>

                  {/* Foto do Produto em Container Padrão Retrato (4:5) */}
                  <div className="relative w-full aspect-[4/5] bg-slate-50 rounded-md sm:rounded-lg overflow-hidden group-hover:bg-slate-100 transition-colors">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* Informações da Peça com altura vertical compacta */}
                  <div className="pt-1 pb-1.5 sm:pb-2 px-1 sm:px-1.5 flex flex-col justify-start">
                    {/* 1. Preço de atacado em azul marinho em negrito */}
                    <div className="text-[11.5px] sm:text-xs font-bold text-[#14284B] leading-tight tracking-tight">
                      R$ {safePrice}
                    </div>

                    {/* 2. Título com hover em azul médio */}
                    <h3 className="text-[9.5px] sm:text-[10.5px] font-semibold text-[#14284B] line-clamp-1 mt-0.5 group-hover:text-[#2E5C94] transition-colors leading-tight">
                      {product.title}
                    </h3>

                    {/* 3. Fornecedor / Fabricante / Categoria */}
                    <p className="text-[8px] sm:text-[9px] text-gray-500 font-medium truncate mt-0.5">
                      {product.supplier?.name || 'Fábrica Parceira do Brás'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Estado Vazio se nenhum item for encontrado com os filtros aplicados */
          <div className="bg-white rounded-lg border border-[#E8E8E8] p-8 sm:p-12 text-center max-w-lg mx-auto shadow-2xs my-6">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-[#2E5C94]">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#14284B] mb-1">
              Nenhum produto encontrado nesta busca
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Não encontramos produtos com os filtros selecionados para a categoria "{activeCategory}". Tente ajustar os termos ou limpar os filtros.
            </p>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => {
                  setLocalSearch('');
                  setMinPrice('');
                  setMaxPrice('');
                  setSelectedSort('relevance');
                }}
                className="px-3.5 py-1.5 rounded-lg bg-[#C4372B] hover:bg-[#a82d23] text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Limpar Filtros
              </button>
              <button
                onClick={() => {
                  setFilter('category', 'Todas');
                  setActiveTab('catalog');
                }}
                className="px-3.5 py-1.5 rounded-lg border border-[#14284B] bg-transparent text-[#14284B] hover:bg-[#14284B] hover:text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Voltar ao Catálogo Completo
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
