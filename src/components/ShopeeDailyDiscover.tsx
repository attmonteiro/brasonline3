import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Plus, Check, MapPin } from 'lucide-react';
import { SHOPEE_RECOMMENDED_PRODUCTS, ShopeeProduct } from '../data/shopeeData';
import { useApp } from '../context/AppContext';
import { Product, CategoryType, PoloRegion } from '../types';

export const ShopeeDailyDiscover: React.FC = () => {
  const { 
    setSelectedProduct, 
    addToCart, 
    toggleFavorite, 
    isFavorite,
    filters 
  } = useApp();

  const [visibleCount, setVisibleCount] = useState(12);
  const [loadingMore, setLoadingMore] = useState(false);
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  // Filter based on active category / search query if set
  const filteredProducts = SHOPEE_RECOMMENDED_PRODUCTS.filter((prod) => {
    if (filters.category && filters.category !== 'Todas') {
      const catFilter = filters.category.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const prodCat = prod.category.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      
      const matchCat = prodCat.includes(catFilter) || 
                       catFilter.includes(prodCat) ||
                       (catFilter === 'feminino' && (prodCat.includes('femin') || prodCat.includes('jeans') || prodCat.includes('fitness'))) ||
                       (catFilter === 'masculino' && prodCat.includes('masculin')) ||
                       (catFilter === 'infantil' && prodCat.includes('infant')) ||
                       (catFilter === 'calcados' && prodCat.includes('calcado')) ||
                       (catFilter === 'bolsas' && prodCat.includes('bolsa')) ||
                       (catFilter === 'pijama' && prodCat.includes('pijama'));
      if (!matchCat) return false;
    }
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchTitle = prod.title.toLowerCase().includes(query);
      const matchVendor = prod.vendorName.toLowerCase().includes(query);
      if (!matchTitle && !matchVendor) return false;
    }
    return true;
  });

  const displayedList = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 6);
      setLoadingMore(false);
    }, 350);
  };

  const createProductObject = (item: ShopeeProduct): Product => ({
    id: item.id,
    title: item.title,
    description: `Produto direto da fábrica com pronta entrega. Fornecedor: ${item.vendorName}. Garantia de procedência do polo atacadista de São Paulo.`,
    price: item.price,
    suggestedRetailPrice: item.originalPrice,
    minQuantity: 1,
    category: (item.category as CategoryType) || 'Moda Feminina',
    region: 'Brás - SP' as PoloRegion,
    imageUrl: item.imageUrl,
    additionalImages: [item.imageUrl],
    supplier: {
      id: 'rec-sup',
      name: item.vendorName,
      storeCode: 'Galeria Polo Moda • Loja 88',
      address: item.location,
      whatsapp: '5511991234567',
      verified: true,
      region: 'Brás - SP',
      rating: item.rating,
      totalProducts: 48,
      minOrderQty: 1,
    },
    inStock: true,
    readyDelivery: true,
    grade: {
      sizes: ['P', 'M', 'G', 'GG'],
      colors: ['Preto', 'Off-White', 'Azul Marinho'],
      gradeRatio: '1P - 2M - 2G - 1GG',
    },
    createdAt: new Date().toISOString(),
    discountBadge: item.discountPercent ? `-${item.discountPercent}% OFF` : undefined,
  });

  const handleProductClick = (item: ShopeeProduct) => {
    setSelectedProduct(createProductObject(item));
  };

  const handleQuickAdd = (e: React.MouseEvent, item: ShopeeProduct) => {
    e.stopPropagation();
    addToCart({
      id: item.id,
      name: item.title,
      price: item.price,
      imageUrl: item.imageUrl,
      quantity: 1,
      vendorName: item.vendorName,
    });
    setAddedItemNotice(`Item "${item.title.slice(0, 25)}..." adicionado ao carrinho!`);
    setTimeout(() => setAddedItemNotice(null), 2500);
  };

  const handleToggleFav = (e: React.MouseEvent, item: ShopeeProduct) => {
    e.stopPropagation();
    toggleFavorite(item.id);
  };

  return (
    <section id="recomendados-section" className="py-4 sm:py-6 bg-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        
        {/* TÍTULO RECOMENDADOS */}
        <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#E8E8E8]">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-5 bg-[#2E5C94] rounded-full"></div>
            <h2 className="text-sm sm:text-base md:text-lg font-extrabold text-[#14284B] uppercase tracking-wider">
              Recomendados
            </h2>
          </div>
        </div>

        {/* FEEDBACK SE NÃO HOUVER PRODUTOS COM O FILTRO */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-[#E8E8E8] rounded-xl p-8 text-center my-4">
            <p className="text-sm text-gray-500">Nenhum produto encontrado com os filtros atuais.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-8 gap-1.5 sm:gap-2">
            {displayedList.map((product) => {
              const fav = isFavorite(product.id);

              return (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className="relative bg-white rounded-lg sm:rounded-xl p-0.5 sm:p-1 shadow-2xs hover:shadow-xs border border-[#E8E8E8] hover:border-[#2E5C94] transition-all duration-200 flex flex-col justify-between group cursor-pointer hover:-translate-y-0.5"
                >
                  {/* CORAÇÃO DE FAVORITO NO CANTO SUPERIOR DIREITO DO CARD */}
                  <button
                    type="button"
                    onClick={(e) => handleToggleFav(e, product)}
                    title={fav ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                    className="absolute top-1 right-1 z-10 p-0.5 rounded-full bg-white/90 hover:bg-white text-gray-300 hover:text-[#C4372B] backdrop-blur-xs shadow-2xs transition-all cursor-pointer"
                  >
                    <Heart 
                      className={`w-3 h-3 transition-transform active:scale-125 ${
                        fav ? 'fill-[#C4372B] text-[#C4372B]' : 'text-gray-400 hover:text-[#C4372B]'
                      }`} 
                    />
                  </button>

                  {/* ÁREA DA FOTO INTERNA PADRÃO RETRATO (4:5) */}
                  <div className="relative w-full aspect-[4/5] bg-slate-50 rounded-md sm:rounded-lg overflow-hidden group-hover:bg-slate-100 transition-colors">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* BLOCO DE INFORMAÇÕES COM ALTURA VERTICAL COMPACTA */}
                  <div className="pt-1 pb-1.5 sm:pb-2 px-1 sm:px-1.5 flex flex-col justify-start">
                    {/* 1. Preço de atacado em azul marinho em negrito */}
                    <div className="text-[11.5px] sm:text-xs font-bold text-[#14284B] leading-tight tracking-tight">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </div>

                    {/* 2. Título do produto em azul marinho com hover em azul médio */}
                    <h3 className="text-[9.5px] sm:text-[10.5px] font-semibold text-[#14284B] line-clamp-1 mt-0.5 group-hover:text-[#2E5C94] transition-colors leading-tight">
                      {product.title}
                    </h3>

                    {/* 3. Marca / Polo / Fornecedor / Categoria */}
                    <p className="text-[8px] sm:text-[9px] text-gray-500 font-medium truncate mt-0.5">
                      {product.category || product.location || 'Polo do Brás'}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* BOTÃO "CARREGAR MAIS" (Contorno azul marinho e texto azul marinho, sem preenchimento) */}
        {hasMore && (
          <div className="mt-5 text-center">
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="bg-transparent hover:bg-[#14284B] text-[#14284B] hover:text-white border border-[#14284B] font-bold text-xs sm:text-sm px-8 py-2.5 rounded-lg shadow-2xs transition-all cursor-pointer inline-flex items-center gap-2"
            >
              {loadingMore ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#E8442B] border-t-transparent rounded-full animate-spin"></div>
                  <span>Carregando Mais Produtos...</span>
                </>
              ) : (
                <>
                  <span>Ver Mais Produtos</span>
                  <Plus className="w-4 h-4 text-[#E8442B]" />
                </>
              )}
            </button>
          </div>
        )}

      </div>

      {/* Toast Feedback Adicionado ao Carrinho */}
      {addedItemNotice && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-[#14213D] text-white text-xs px-4 py-2.5 rounded-[4px] shadow-xl flex items-center gap-2 border-l-4 border-emerald-500 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{addedItemNotice}</span>
        </div>
      )}
    </section>
  );
};
