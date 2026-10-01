import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Star, 
  ShoppingCart, 
  Heart,
  Eye
} from 'lucide-react';
import { 
  FEATURED_LIFESTYLE_BANNER, 
  FEATURED_VERTICAL_LIST, 
  FEATURED_GRID_PRODUCTS,
  MultivendorProduct 
} from '../data/multivendorData';
import { useApp } from '../context/AppContext';

export const FeaturedProductsSection: React.FC = () => {
  const { addToCart, favorites, toggleFavorite, setSelectedProduct, products } = useApp();

  const handleOpenProduct = (p: MultivendorProduct) => {
    // If we have full product from catalog, select it; otherwise find or wrap
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
        description: `Produto exclusivo da loja ${p.vendorName}. Alta qualidade no atacado e pronta entrega para lojistas de todo o Brasil.`,
        supplier: {
          id: 'sup-gen',
          name: p.vendorName,
          storeCode: 'Loja Oficial Brás',
          address: 'Rua Miller, Brás - São Paulo - SP',
          whatsapp: '5511991234567',
          verified: true,
          region: 'Brás - SP',
          rating: p.rating,
          totalProducts: 64,
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
    <section id="produtos-destaque" className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Título Centralizado */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDF1EC] text-[#E8442B] text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Seleção Especial</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#14213D] font-poppins">
            Produtos em Destaque
          </h2>
          <p className="text-xs sm:text-sm text-[#4A4A4A] mt-2">
            Peças com alta procura, pronta entrega e preços exclusivos dos principais fornecedores do país
          </p>
        </div>

        {/* Bloco Misto: Banner Grande Lifestyle à Esquerda + Lista Vertical à Direita */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Banner Grande Lifestyle (Esquerda - 7 Colunas) */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden shadow-md min-h-[380px] lg:min-h-[480px] flex flex-col justify-end p-8 sm:p-10 group">
            <img
              src={FEATURED_LIFESTYLE_BANNER.imageUrl}
              alt={FEATURED_LIFESTYLE_BANNER.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#14213D]/95 via-[#14213D]/40 to-transparent" />

            {/* Conteúdo sobreposto */}
            <div className="relative z-10 space-y-3 text-white max-w-lg">
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#E8442B] text-white text-xs font-black uppercase tracking-wider shadow-sm">
                {FEATURED_LIFESTYLE_BANNER.discountText}
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-poppins text-white leading-tight">
                {FEATURED_LIFESTYLE_BANNER.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {FEATURED_LIFESTYLE_BANNER.subtitle}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('grid-produtos');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-2xl bg-white hover:bg-[#E8442B] text-[#14213D] hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>{FEATURED_LIFESTYLE_BANNER.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Lista Vertical de 4-5 Produtos (Direita - 5 Colunas) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3.5">
            {FEATURED_VERTICAL_LIST.map((product) => (
              <div
                key={product.id}
                className="p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#E8442B]/50 hover:shadow-md transition-all duration-300 flex items-center justify-between gap-4 group"
              >
                {/* Miniatura do Produto */}
                <div 
                  onClick={() => handleOpenProduct(product)}
                  className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100 cursor-pointer"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                  />
                  {product.badge && (
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-[#E8442B] text-white text-[9px] font-black uppercase">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Detalhes do Produto */}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-[#E8442B] uppercase tracking-wider block truncate">
                    {product.vendorName}
                  </span>
                  <h4 
                    onClick={() => handleOpenProduct(product)}
                    className="text-xs sm:text-sm font-bold text-[#14213D] truncate cursor-pointer hover:text-[#E8442B] transition-colors mt-0.5"
                  >
                    {product.name}
                  </h4>
                  
                  {/* Preço e Avaliação */}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-black text-[#14213D]">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[11px] text-slate-400 line-through">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Ação: Adicionar ao Carrinho */}
                <button
                  onClick={() => addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    imageUrl: product.imageUrl,
                    quantity: 1,
                    vendorName: product.vendorName
                  })}
                  className="p-3 rounded-2xl bg-[#FDF1EC] hover:bg-[#E8442B] text-[#E8442B] hover:text-white transition-colors shrink-0 shadow-2xs cursor-pointer"
                  title="Adicionar ao carrinho"
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

        </div>

        {/* Abaixo: Grid de Produtos com 4 Colunas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_GRID_PRODUCTS.map((product) => {
            const isFav = favorites.includes(product.id);
            return (
              <div
                key={product.id}
                className="group bg-white rounded-3xl border border-slate-200/90 hover:border-[#E8442B]/40 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Imagem do Produto com Badge e Favorito */}
                <div className="relative aspect-[3/3.8] bg-slate-100 overflow-hidden cursor-pointer" onClick={() => handleOpenProduct(product)}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#E8442B] text-white text-[11px] font-black uppercase tracking-wider shadow-sm">
                      {product.badge}
                    </span>
                  )}

                  {/* Botão Favoritos */}
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

                {/* Conteúdo do Card */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#E8442B] uppercase tracking-wider mb-1">
                      <span className="truncate">{product.vendorName}</span>
                      <span className="flex items-center gap-1 text-amber-500 shrink-0">
                        <Star className="w-3 h-3 fill-amber-400" />
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

                  {/* Preço e Botão Adicionar */}
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
                      className="p-3 rounded-2xl bg-[#14213D] hover:bg-[#E8442B] text-white transition-colors duration-300 shadow-2xs hover:shadow-md cursor-pointer"
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
