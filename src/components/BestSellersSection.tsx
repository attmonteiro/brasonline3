import React from 'react';
import { ArrowRight, Star, ShoppingCart, Heart, Sparkles } from 'lucide-react';
import { BEST_SELLERS_PRODUCTS, MultivendorProduct } from '../data/multivendorData';
import { useApp } from '../context/AppContext';

export const BestSellersSection: React.FC = () => {
  const { addToCart, favorites, toggleFavorite, setSelectedProduct, products, resetFilters } = useApp();

  const handleOpenProduct = (p: MultivendorProduct) => {
    const match = products.find(prod => prod.id === p.id || prod.title === p.name);
    if (match) {
      setSelectedProduct(match);
    } else {
      setSelectedProduct({
        id: p.id,
        title: p.name,
        price: p.price,
        suggestedRetailPrice: p.originalPrice,
        minQuantity: 1,
        category: (p.category as any) || 'Moda Feminina',
        region: 'Brás - SP',
        imageUrl: p.imageUrl,
        description: `Modelo mais vendido no marketplace Bras Online. Alta rotação e excelente margem para lojistas.`,
        supplier: {
          id: 'sup-bs',
          name: p.vendorName,
          storeCode: 'Galeria Pagé Brás',
          address: 'Rua Oriente, Brás - São Paulo - SP',
          whatsapp: '5511991234567',
          verified: true,
          region: 'Brás - SP',
          rating: p.rating,
          totalProducts: 52,
        },
        inStock: true,
        readyDelivery: true,
        grade: {
          sizes: ['P', 'M', 'G', 'GG'],
          colors: ['Variadas'],
          gradeRatio: '1P - 2M - 2G - 1GG',
        },
        createdAt: '2026-03-01',
      });
    }
  };

  const handleViewAll = () => {
    resetFilters();
    const el = document.getElementById('grid-produtos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="mais-vendidos" className="py-12 sm:py-16 bg-[#FDF1EC]/40 border-t border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção com Botão 'Ver Todos' no Canto Superior Direito com Destaque Vermelho */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8442B] text-white text-xs font-black uppercase tracking-wider mb-2 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 fill-white" />
              <span>Alta Procura</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#14213D] font-poppins">
              Mais Vendidos
            </h2>
            <p className="text-xs sm:text-sm text-[#4A4A4A] mt-1">
              Os produtos com maior volume de pedidos e recompras pelos lojistas parceiros
            </p>
          </div>

          {/* Botão 'Ver Todos' com destaque vermelho (#E8442B) */}
          <button
            onClick={handleViewAll}
            className="px-6 py-3 rounded-2xl bg-[#E8442B] hover:bg-[#d4371f] text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
          >
            <span>Ver Todos</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid de Produtos Mais Vendidos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BEST_SELLERS_PRODUCTS.map((product) => {
            const isFav = favorites.includes(product.id);
            return (
              <div
                key={product.id}
                className="group bg-white rounded-3xl border border-slate-200/90 hover:border-[#E8442B]/50 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Imagem do Produto com Badge */}
                <div 
                  onClick={() => handleOpenProduct(product)}
                  className="relative aspect-[3/3.8] bg-slate-100 overflow-hidden cursor-pointer"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />

                  {product.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#14213D] text-white text-[11px] font-black uppercase tracking-wider shadow-sm">
                      {product.badge}
                    </span>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#14213D] shadow-xs flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                    title="Favoritar"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'text-[#E8442B] fill-[#E8442B]' : 'text-slate-600'}`} />
                  </button>
                </div>

                {/* Conteúdo */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#E8442B] uppercase tracking-wider mb-1">
                      <span className="truncate">{product.vendorName}</span>
                      <span className="flex items-center gap-1 text-amber-500 shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{product.rating}</span>
                      </span>
                    </div>

                    <h4 
                      onClick={() => handleOpenProduct(product)}
                      className="text-sm font-bold text-[#14213D] leading-snug hover:text-[#E8442B] transition-colors cursor-pointer line-clamp-2"
                    >
                      {product.name}
                    </h4>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-base font-black text-[#14213D]">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                      </div>
                      {product.originalPrice && (
                        <div className="text-xs text-slate-400 line-through">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.originalPrice)}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        imageUrl: product.imageUrl,
                        quantity: 1,
                        vendorName: product.vendorName
                      })}
                      className="p-3 rounded-2xl bg-[#E8442B] hover:bg-[#d4371f] text-white transition-colors duration-300 shadow-2xs hover:shadow-md cursor-pointer"
                      title="Adicionar ao carrinho"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
