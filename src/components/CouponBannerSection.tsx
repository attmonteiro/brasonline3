import React, { useState } from 'react';
import { Tag, Check, Copy, ArrowRight, Sparkles } from 'lucide-react';
import { COUPON_DATA } from '../data/multivendorData';

export const CouponBannerSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText(COUPON_DATA.couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);

    const el = document.getElementById('melhores-ofertas') || document.getElementById('grid-produtos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="banner-cupom" className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Faixa Larga, Fundo Azul-Marinho (#14213D) */}
        <div className="relative bg-[#14213D] text-white rounded-3xl sm:rounded-[32px] p-8 sm:p-12 lg:p-14 overflow-hidden shadow-2xl border border-slate-800">
          
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-10 w-96 h-96 bg-[#E8442B]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            {/* Texto Grande e Descrição */}
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E8442B] text-white text-xs font-black uppercase tracking-wider shadow-sm">
                <Tag className="w-3.5 h-3.5" />
                <span>Cupom Promocional Oficial</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-poppins leading-tight">
                {COUPON_DATA.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                {COUPON_DATA.description}
              </p>
            </div>

            {/* Caixa do Cupom e Botão CTA Vermelho */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              
              {/* Cupom Code Pill */}
              <div className="px-6 py-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Código</span>
                  <span className="text-base sm:text-lg font-black tracking-widest text-amber-300 font-mono">
                    {COUPON_DATA.couponCode}
                  </span>
                </div>
              </div>

              {/* Botão CTA Vermelho */}
              <button
                onClick={handleCopyCoupon}
                className="px-8 py-4 rounded-2xl bg-[#E8442B] hover:bg-[#d4371f] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Cupom Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>{COUPON_DATA.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
