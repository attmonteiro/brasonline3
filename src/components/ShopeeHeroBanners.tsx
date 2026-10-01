import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeroBannerItem, CategoryType } from '../types';

export const ShopeeHeroBanners: React.FC = () => {
  const { 
    heroBanners, 
    siteDesignSettings, 
    setFilter, 
    setSelectedProduct, 
    activeTab, 
    setActiveTab 
  } = useApp();

  const [currentSlide, setCurrentSlide] = useState(0);

  // Filtra apenas os banners marcados como ativos, ordenados
  const activeBanners = (heroBanners || [])
    .filter((b) => b.active !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const totalSlides = activeBanners.length;

  // Rotação automática suave dos banners
  useEffect(() => {
    if (totalSlides <= 1) return;
    const intervalSeconds = siteDesignSettings?.bannerAutoplayInterval || 5;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, intervalSeconds * 1000);
    return () => clearInterval(timer);
  }, [totalSlides, siteDesignSettings?.bannerAutoplayInterval]);

  // Se o slide atual estiver fora do índice após exclusão/atualização
  useEffect(() => {
    if (currentSlide >= totalSlides && totalSlides > 0) {
      setCurrentSlide(0);
    }
  }, [totalSlides, currentSlide]);

  if (totalSlides === 0) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const handleBannerClick = (banner: HeroBannerItem) => {
    if (!banner) return;

    if (banner.linkType === 'category') {
      setSelectedProduct(null);
      setFilter('category', (banner.linkValue as CategoryType) || 'Todas');
      if (activeTab !== 'catalog') setActiveTab('catalog');
      const el = document.getElementById('grid-produtos') || document.getElementById('recomendados-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (banner.linkType === 'search') {
      setSelectedProduct(null);
      setFilter('searchQuery', banner.linkValue || '');
      if (activeTab !== 'catalog') setActiveTab('catalog');
      const el = document.getElementById('grid-produtos') || document.getElementById('recomendados-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (banner.linkType === 'whatsapp') {
      const cleanPhone = (banner.linkValue || '5511991234567').replace(/\D/g, '');
      const msg = encodeURIComponent('Olá! Vim pelo Brás Online e gostaria de conferir as novidades no atacado.');
      window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
    } else if (banner.linkType === 'url') {
      if (banner.linkValue) {
        if (banner.linkValue.startsWith('http://') || banner.linkValue.startsWith('https://')) {
          window.open(banner.linkValue, '_blank');
        } else {
          window.location.href = banner.linkValue;
        }
      }
    } else {
      // Fallback: rolar para produtos
      const el = document.getElementById('grid-produtos') || document.getElementById('recomendados-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeBanner = activeBanners[currentSlide] || activeBanners[0];

  return (
    <section className="py-2 sm:py-3 bg-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        
        {/* BANNER 100% IMAGEM CLICÁVEL E REDIRECIONÁVEL (Sem elementos ou textos adicionais) */}
        <div 
          onClick={() => handleBannerClick(activeBanner)}
          className="relative w-full rounded-[6px] sm:rounded-[8px] overflow-hidden shadow-xs border border-[#E8E8E8] bg-slate-50 group cursor-pointer select-none h-[140px] xs:h-[180px] sm:h-[240px] md:h-[300px] lg:h-[340px] xl:h-[380px]"
          title={activeBanner?.title ? `Clique para acessar: ${activeBanner.title}` : 'Clique para ver produtos'}
        >
          {activeBanners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* APENAS A IMAGEM DO BANNER - LIMPA, DIRETA E SEM QUALQUER ELEMENTO SOBREPOSTO */}
              <img
                src={banner.imageUrl}
                alt={banner.title || 'Banner Promocional'}
                className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-500"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}

          {/* Setas de Navegação (Aparecem suavemente apenas se houver mais de 1 banner) */}
          {totalSlides > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/35 hover:bg-black/60 text-white backdrop-blur-xs border border-white/20 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                title="Slide anterior"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/35 hover:bg-black/60 text-white backdrop-blur-xs border border-white/20 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                title="Próximo slide"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Indicadores / Paginação (Discretos e limpos no rodapé) */}
              <div className="absolute bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 rounded-full bg-black/20 backdrop-blur-xs">
                {activeBanners.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentSlide(i);
                    }}
                    className={`h-1.5 sm:h-2 rounded-full transition-all cursor-pointer ${
                      i === currentSlide ? 'w-5 sm:w-7 bg-white' : 'w-1.5 sm:w-2 bg-white/50 hover:bg-white/80'
                    }`}
                    title={`Ir para banner ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}

        </div>

      </div>
    </section>
  );
};
