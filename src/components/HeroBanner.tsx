import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CategoryType } from '../types';

interface BannerSlide {
  id: number;
  category: CategoryType;
  imageUrl: string;
  altText: string;
}

const SLIDES: BannerSlide[] = [
  {
    id: 1,
    category: 'Moda Feminina',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop&q=85',
    altText: 'Moda Feminina Atacado'
  },
  {
    id: 2,
    category: 'Moda Infantil',
    imageUrl: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=1600&auto=format&fit=crop&q=85',
    altText: 'Moda Infantil Atacado'
  },
  {
    id: 3,
    category: 'Moda Masculina',
    imageUrl: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=1600&auto=format&fit=crop&q=85',
    altText: 'Moda Masculina Atacado'
  }
];

export const HeroBanner: React.FC = () => {
  const { setFilter, setActiveTab } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const handleBannerClick = (cat: CategoryType) => {
    setFilter('category', cat);
    setActiveTab('catalog');
    const el = document.getElementById('grid-produtos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const slide = SLIDES[currentSlide];

  return (
    <section className="bg-white text-slate-900 relative overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 relative z-10">
        
        {/* Banner container: Formato vertical ampliado, apenas imagem clicável sem textos */}
        <div
          onClick={() => handleBannerClick(slide.category)}
          className="group relative w-full h-[320px] sm:h-[420px] md:h-[500px] lg:h-[560px] rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer bg-slate-950 border border-slate-200"
          title={`Clique para ver produtos de ${slide.category}`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleBannerClick(slide.category);
            }
          }}
        >
          {/* Imagem do Slide com transição suave */}
          {SLIDES.map((s, index) => (
            <img
              key={s.id}
              src={s.imageUrl}
              alt={s.altText}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
              } group-hover:scale-[1.02] transition-transform duration-700`}
              referrerPolicy="no-referrer"
            />
          ))}

          {/* Efeito sutil de hover */}
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors pointer-events-none" />

          {/* Botão Anterior */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/85 hover:bg-white text-slate-800 shadow-lg backdrop-blur-xs flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110 z-20 cursor-pointer"
            aria-label="Banner anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Botão Próximo */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/85 hover:bg-white text-slate-800 shadow-lg backdrop-blur-xs flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110 z-20 cursor-pointer"
            aria-label="Próximo banner"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicadores de Slide (Bolinhas) */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-black/20 backdrop-blur-xs px-2.5 py-1 rounded-full">
            {SLIDES.map((s, index) => (
              <button
                key={s.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlide(index);
                }}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  index === currentSlide
                    ? 'w-6 bg-white shadow-sm'
                    : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Ir para banner ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
