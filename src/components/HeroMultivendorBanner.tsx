import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Sparkles, Tag, ShoppingCart } from 'lucide-react';
import { HERO_SLIDES } from '../data/multivendorData';
import { useApp } from '../context/AppContext';

export const HeroMultivendorBanner: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const { addToCart, setIsCartOpen } = useApp();

  const currentSlide = HERO_SLIDES[currentSlideIndex];

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('melhores-ofertas') || document.getElementById('grid-produtos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-6 pb-4 sm:pt-8 sm:pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Card Grande Arredondado com Fundo Azul-Marinho (#14213D) */}
        <div className="relative bg-[#14213D] text-white rounded-3xl sm:rounded-[28px] overflow-hidden shadow-xl border border-slate-800">
          
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E8442B]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Lateral Carousel Navigation Arrows */}
          <button
            onClick={handlePrevSlide}
            aria-label="Slide anterior"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-[#E8442B] text-white backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer border border-white/10 hover:border-[#E8442B]"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={handleNextSlide}
            aria-label="Próximo slide"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-[#E8442B] text-white backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer border border-white/10 hover:border-[#E8442B]"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Main Grid Content */}
          <div className="px-8 sm:px-14 lg:px-20 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Lado Esquerdo: Tag, Título, Parágrafo e CTA Vermelho */}
            <div className="lg:col-span-7 space-y-5 text-left z-10">
              
              {/* Tag Pequena 'Melhor Preço' (fundo vermelho #E8442B, texto branco) */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E8442B] text-white text-xs font-black tracking-wider uppercase shadow-xs">
                <Tag className="w-3.5 h-3.5" />
                <span>{currentSlide.tag}</span>
              </div>

              {/* Título Grande e Impactante */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-poppins">
                {currentSlide.title}
              </h1>

              {/* Parágrafo Curto de Apoio */}
              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
                {currentSlide.description}
              </p>

              {/* Botão CTA Vermelho 'Comprar Agora' */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={scrollToCatalog}
                  className="px-8 py-4 rounded-2xl bg-[#E8442B] hover:bg-[#d4371f] text-white font-extrabold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2.5 cursor-pointer"
                >
                  <span>{currentSlide.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold pl-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Compra Segura & Fornecedores Verificados</span>
                </div>
              </div>

              {/* Slide Dots Indicator */}
              <div className="flex items-center gap-2 pt-4">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlideIndex(idx)}
                    aria-label={`Ir para banner ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlideIndex === idx ? 'w-8 bg-[#E8442B]' : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>

            </div>

            {/* Lado Direito: Card Branco Flutuante Sobreposto com Oferta em Destaque */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end z-10">
              <div className="w-full max-w-sm bg-white text-[#14213D] rounded-3xl p-5 sm:p-6 shadow-2xl border border-white/20 transform transition-all duration-300 hover:-translate-y-1">
                
                {/* Header do Card Flutuante */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#E8442B] bg-[#FDF1EC] px-3 py-1 rounded-full">
                    {currentSlide.featuredOffer.badgeText}
                  </span>
                  <span className="text-xs font-bold text-slate-400">Ofertas do Dia</span>
                </div>

                <div className="mt-3 mb-4">
                  <h3 className="text-xl sm:text-2xl font-black text-[#14213D] tracking-tight font-poppins">
                    {currentSlide.featuredOffer.discountHighlight}
                  </h3>
                  <p className="text-xs text-[#4A4A4A]">Preços direto da confecção sem intermediários</p>
                </div>

                {/* 2-3 Miniaturas de Produto e Preço */}
                <div className="space-y-3">
                  {currentSlide.featuredOffer.items.map((item, index) => (
                    <div
                      key={index}
                      className="group flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 hover:bg-[#FDF1EC] border border-slate-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-13 h-13 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-[#14213D] line-clamp-1">
                            {item.name}
                          </h4>
                          <div className="flex items-baseline gap-1.5 mt-0.5">
                            <span className="text-sm font-extrabold text-[#E8442B]">
                              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                            </span>
                            <span className="text-[10px] text-slate-400 line-through">
                              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.originalPrice)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          addToCart({
                            id: `hero-prod-${index}-${Date.now()}`,
                            name: item.name,
                            price: item.price,
                            imageUrl: item.imageUrl,
                            quantity: 1,
                            vendorName: 'Fornecedor Parceiro'
                          });
                        }}
                        className="p-2 rounded-xl bg-white hover:bg-[#E8442B] text-[#14213D] hover:text-white border border-slate-200 hover:border-[#E8442B] transition-colors shadow-2xs shrink-0 cursor-pointer"
                        title="Adicionar ao carrinho"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* CTA Inferior do Card */}
                <button
                  onClick={scrollToCatalog}
                  className="w-full mt-4 py-3 rounded-2xl bg-[#14213D] hover:bg-[#1f335e] text-white font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Ver Todos os Itens</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E8442B]" />
                </button>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
