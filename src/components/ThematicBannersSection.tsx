import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { THEMATIC_BANNERS } from '../data/multivendorData';
import { useApp } from '../context/AppContext';

export const ThematicBannersSection: React.FC = () => {
  const { setFilter, setActiveTab } = useApp();

  const handleBannerClick = (bannerId: string) => {
    setActiveTab('catalog');
    if (bannerId === 'banner-sport') {
      setFilter('category', 'Moda Fitness');
    } else {
      setFilter('searchQuery', 'Gamer');
    }
    const el = document.getElementById('grid-produtos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dois Banners Temáticos Lado a Lado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {THEMATIC_BANNERS.map((banner) => (
            <div
              key={banner.id}
              className={`relative rounded-3xl sm:rounded-[28px] overflow-hidden p-8 sm:p-10 text-white shadow-xl ${banner.bgColor} border border-white/10 group flex flex-col justify-between min-h-[320px] sm:min-h-[360px]`}
            >
              {/* Background Image with Overlay */}
              <img
                src={banner.imageUrl}
                alt={banner.title}
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

              {/* Top Badge */}
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider border border-white/20 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#E8442B]" />
                  <span>{banner.badge}</span>
                </span>
              </div>

              {/* Bottom Content & CTA */}
              <div className="relative z-10 space-y-3 max-w-md pt-6">
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-poppins leading-tight">
                  {banner.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                  {banner.subtitle}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => handleBannerClick(banner.id)}
                    className="px-6 py-3.5 rounded-2xl bg-[#E8442B] hover:bg-[#d4371f] text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-2 cursor-pointer"
                  >
                    <span>{banner.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
