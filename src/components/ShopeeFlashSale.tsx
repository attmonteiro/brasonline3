import React from 'react';
import { Tag, ChevronRight, Heart } from 'lucide-react';
import { SHOPEE_FLASH_SALE_ITEMS, ShopeeFlashProduct } from '../data/shopeeData';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

export const ShopeeFlashSale: React.FC = () => {
  const { setSelectedProduct, toggleFavorite, isFavorite, addToCart, setIsCartOpen } = useApp();

  const createProductObject = (item: ShopeeFlashProduct): Product => ({
    id: item.id,
    title: item.title,
    description: `Últimas peças de estoque com ${item.discountPercent}% de desconto no atacado e varejo. Fornecedor oficial: ${item.vendorName}.`,
    price: item.price,
    suggestedRetailPrice: item.originalPrice,
    minQuantity: 1,
    category: 'Moda Feminina',
    region: 'Brás - SP',
    imageUrl: item.imageUrl,
    additionalImages: [item.imageUrl],
    supplier: {
      id: 'flash-sup',
      name: item.vendorName,
      storeCode: 'Brás Fashion • Loja 45',
      address: 'Rua Miller, 120 - Brás, São Paulo - SP',
      whatsapp: '5511988887777',
      verified: true,
      region: 'Brás - SP',
      rating: 4.9,
      totalProducts: 120,
      minOrderQty: 1,
    },
    inStock: true,
    readyDelivery: true,
    grade: {
      sizes: ['P', 'M', 'G'],
      colors: ['Sortidas'],
      gradeRatio: '1P - 2M - 1G',
    },
    createdAt: new Date().toISOString(),
    discountBadge: `-${item.discountPercent}% OFF`,
    urgencyTag: 'últimas peças',
  });

  const handleProductClick = (item: ShopeeFlashProduct) => {
    setSelectedProduct(createProductObject(item));
  };

  const handleQuickBuy = (e: React.MouseEvent, item: ShopeeFlashProduct) => {
    e.stopPropagation();
    addToCart({
      id: item.id,
      name: item.title,
      price: item.price,
      imageUrl: item.imageUrl,
      quantity: 1,
      vendorName: item.vendorName,
    });
    setIsCartOpen(true);
  };

  return (
    <section id="flash-sale-section" className="py-3 sm:py-4 bg-white border-y border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        
        {/* CABEÇALHO: Título Últimas Peças + Link Ver Tudo */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E8] flex-wrap gap-2">
          
          {/* Lado Esquerdo: ÚLTIMAS PEÇAS */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-[3px] bg-[#2E5C94] flex items-center justify-center text-white shadow-2xs">
                <Tag className="w-3.5 h-3.5 text-white" />
              </div>
              <h2 className="text-sm sm:text-base font-extrabold text-[#14284B] uppercase tracking-wider">
                Últimas Peças
              </h2>
            </div>
          </div>

          {/* Lado Direito: Ver Tudo */}
          <a
            href="#recomendados-section"
            className="text-xs font-bold text-[#2E5C94] hover:text-[#14284B] flex items-center gap-0.5 group cursor-pointer"
          >
            <span>Ver Tudo</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* GRID DE 8 PRODUTOS COMPACTO */}
        <div className="pt-2.5">
          <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1.5 sm:gap-2">
            {SHOPEE_FLASH_SALE_ITEMS.slice(0, 8).map((item) => {
              const fav = isFavorite(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => handleProductClick(item)}
                  className="relative bg-white rounded-lg sm:rounded-xl p-0.5 sm:p-1 shadow-2xs hover:shadow-xs border border-[#E8E8E8] hover:border-[#2E5C94] transition-all duration-200 flex flex-col justify-between group cursor-pointer hover:-translate-y-0.5"
                >
                  {/* CORAÇÃO DE FAVORITO NO CANTO SUPERIOR DIREITO DO CARD */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
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
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* BLOCO DE INFORMAÇÕES COM ALTURA VERTICAL COMPACTA */}
                  <div className="pt-1 pb-1.5 sm:pb-2 px-1 sm:px-1.5 flex flex-col justify-start">
                    {/* 1. Preço em destaque */}
                    <div className="text-[11.5px] sm:text-xs font-bold text-[#14284B] leading-tight tracking-tight">
                      R$ {item.price.toFixed(2).replace('.', ',')}
                    </div>

                    {/* 2. Título do produto */}
                    <h3 className="text-[9.5px] sm:text-[10.5px] font-semibold text-[#14284B] line-clamp-1 mt-0.5 group-hover:text-[#2E5C94] transition-colors leading-tight">
                      {item.title}
                    </h3>

                    {/* 3. Marca / Fornecedor / Categoria */}
                    <p className="text-[8px] sm:text-[9px] text-gray-500 font-medium truncate mt-0.5">
                      {item.vendorName || 'Polo do Brás'}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
