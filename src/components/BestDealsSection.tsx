import React from 'react';
import { Tag, ShoppingCart, Heart } from 'lucide-react';
import { BEST_DEALS_PRODUCTS, MultivendorProduct } from '../data/multivendorData';
import { useApp } from '../context/AppContext';

export const BestDealsSection: React.FC = () => {
  const { addToCart, favorites, toggleFavorite, setSelectedProduct, products } = useApp();

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
        description: `Super oferta da loja ${p.vendorName}. Preço com desconto especial no marketplace Bras Online.`,
        supplier: {
          id: 'sup-deal',
          name: p.vendorName,
          storeCode: 'Loja Oficial Brás',
          address: 'Rua Miller, Brás - São Paulo - SP',
          whatsapp: '5511991234567',
          verified: true,
          region: 'Brás - SP',
          rating: p.rating,
          totalProducts: 48,
        },
        inStock: true,
        readyDelivery: true,
        grade: {
          sizes: ['P', 'M', 'G'],
          colors: ['Variadas'],
          gradeRatio: '1P - 1M - 1G',
        },
        createdAt: '2026-03-01',
      });
    }
  };

  return (
    <section id="melhores-ofertas" className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDF1EC] text-[#E8442B] text-xs font-black uppercase tracking-wider mb-2">
              <Tag className="w-3.5 h-3.5 fill-[#E8442B]" />
              <span>Queima de Estoque & Oportunidades</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#14213D] font-poppins">
              Melhores Ofertas
            </h2>
            <p className="text-xs sm:text-sm text-[#4A4A4A] mt-1">
              Descontos de até 50% aplicados diretamente pelos fabricantes e importadores
            </p>
          </div>

          <span className="text-xs font-bold text-[#E8442B] bg-[#FDF1EC] px-3.5 py-1.5 rounded-full border border-orange-200">
            Atualizado Hoje
          </span>
        </div>

        {/* Grid Denso de Produtos com Badges em Vermelho */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {BEST_DEALS_PRODUCTS.map((product) => {
            const isFav = favorites.includes(product.id);
            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 hover:border-[#E8442B]/50 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Imagem com Badge Vermelho */}
                <div 
                  onClick={() => handleOpenProduct(product)}
                  className="relative aspect-square bg-slate-100 overflow-hidden cursor-pointer"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  
                  {/* Badge de Desconto em Vermelho #E8442B */}
                  <span className="absolute top-2 left-2 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#E8442B] text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                    {product.badge}
                  </span>

                  {/* Botão Favoritar */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-[#14213D] shadow-2xs flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                    title="Favoritar"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'text-[#E8442B] fill-[#E8442B]' : 'text-slate-600'}`} />
                  </button>
                </div>

                {/* Dados do Produto */}
                <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-[#E8442B] uppercase tracking-wider block truncate">
                      {product.vendorName}
                    </span>
                    <h4 
                      onClick={() => handleOpenProduct(product)}
                      className="text-xs sm:text-sm font-bold text-[#14213D] hover:text-[#E8442B] transition-colors cursor-pointer line-clamp-2 mt-0.5 leading-snug"
                    >
                      {product.name}
                    </h4>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs sm:text-sm font-black text-[#14213D]">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                      </div>
                      {product.originalPrice && (
                        <div className="text-[10px] text-slate-400 line-through">
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
                      className="p-2 sm:p-2.5 rounded-xl bg-[#FDF1EC] hover:bg-[#E8442B] text-[#E8442B] hover:text-white transition-colors shadow-2xs cursor-pointer"
                      title="Adicionar ao carrinho"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
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
