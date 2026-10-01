import React, { useState } from 'react';
import { 
  Store, 
  Star, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  MessageCircle,
  Package,
  Layers,
  X
} from 'lucide-react';
import { FEATURED_VENDORS, MultivendorStore } from '../data/multivendorData';
import { useApp } from '../context/AppContext';

export const FeaturedVendorsSection: React.FC = () => {
  const [selectedVendorModal, setSelectedVendorModal] = useState<MultivendorStore | null>(null);
  const { setFilter, setActiveTab } = useApp();

  const handleVendorWhatsApp = (whatsapp: string, vendorName: string) => {
    const text = encodeURIComponent(`Olá! Encontrei sua loja "${vendorName}" pelo Bras Online e gostaria de conhecer o catálogo de atacado.`);
    window.open(`https://wa.me/${whatsapp}?text=${text}`, '_blank');
  };

  const handleViewStoreProducts = (category: string) => {
    setSelectedVendorModal(null);
    setActiveTab('catalog');
    if (category.toLowerCase().includes('feminina')) setFilter('category', 'Moda Feminina');
    else if (category.toLowerCase().includes('jeans')) setFilter('searchQuery', 'Jeans');
    else if (category.toLowerCase().includes('fitness')) setFilter('category', 'Moda Fitness');
    
    const el = document.getElementById('grid-produtos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="fornecedores-destaque" className="py-12 sm:py-16 bg-[#F8FAFC] border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#14213D] border border-slate-200 text-xs font-black uppercase tracking-wider mb-2 shadow-2xs">
              <Store className="w-3.5 h-3.5 text-[#E8442B]" />
              <span>Multivendor Marketplace</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#14213D] font-poppins">
              Fornecedores em Destaque
            </h2>
            <p className="text-xs sm:text-sm text-[#4A4A4A] mt-1">
              Conheça as lojas e confecções parceiras verificadas com melhor avaliação na plataforma
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-[#4A4A4A]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Fábricas com atendimento online agora</span>
          </div>
        </div>

        {/* Grid de Cards de Fornecedores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_VENDORS.map((vendor) => (
            <div
              key={vendor.id}
              className="group bg-white rounded-3xl border border-slate-200/90 hover:border-[#E8442B]/50 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Capa da Loja com Logo Flutuante */}
              <div className="relative h-32 bg-slate-100 overflow-hidden">
                <img
                  src={vendor.coverUrl}
                  alt={vendor.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                {/* Logo da Loja */}
                <div className="absolute -bottom-4 left-5 w-14 h-14 rounded-2xl bg-white p-1 shadow-md border border-slate-100 overflow-hidden z-10">
                  <img
                    src={vendor.logoUrl}
                    alt={vendor.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-bold text-[#14213D] flex items-center gap-1 shadow-2xs">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Verificada</span>
                </div>
              </div>

              {/* Informações da Loja */}
              <div className="pt-7 p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-[#14213D] group-hover:text-[#E8442B] transition-colors line-clamp-1 font-poppins">
                    {vendor.name}
                  </h3>

                  <p className="text-xs font-semibold text-[#E8442B] mt-0.5">
                    {vendor.category}
                  </p>

                  <div className="flex items-center gap-1.5 mt-2 text-xs text-[#4A4A4A]">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="line-clamp-1">{vendor.location}</span>
                  </div>

                  {/* Avaliação em Estrelas */}
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-extrabold text-[#14213D]">{vendor.rating}</span>
                    <span className="text-[11px] text-slate-400">({vendor.reviewCount})</span>
                  </div>
                </div>

                {/* Botão 'Ver Loja' */}
                <div className="mt-5">
                  <button
                    onClick={() => setSelectedVendorModal(vendor)}
                    className="w-full py-3 rounded-2xl bg-[#14213D] hover:bg-[#E8442B] text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-xs group-hover:shadow-md cursor-pointer"
                  >
                    <span>Ver loja</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Modal de Detalhes do Fornecedor */}
        {selectedVendorModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14213D]/70 backdrop-blur-xs animate-fadeIn">
            <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              
              {/* Header do Modal */}
              <div className="relative h-40 bg-slate-100">
                <img 
                  src={selectedVendorModal.coverUrl} 
                  alt={selectedVendorModal.name} 
                  className="w-full h-full object-cover" 
                />
                <button
                  onClick={() => setSelectedVendorModal(null)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 text-[#14213D] hover:bg-white flex items-center justify-center shadow-md cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute -bottom-5 left-6 w-16 h-16 rounded-2xl bg-white p-1 shadow-lg border border-slate-100">
                  <img 
                    src={selectedVendorModal.logoUrl} 
                    alt={selectedVendorModal.name} 
                    className="w-full h-full object-cover rounded-xl" 
                  />
                </div>
              </div>

              {/* Corpo do Modal */}
              <div className="pt-8 p-6 space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-[#14213D] font-poppins">{selectedVendorModal.name}</h3>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-xs font-bold text-[#E8442B]">{selectedVendorModal.category}</p>
                </div>

                <p className="text-xs text-[#4A4A4A] leading-relaxed">
                  {selectedVendorModal.description}
                </p>

                <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Localização</span>
                    <span className="font-semibold text-[#14213D]">{selectedVendorModal.location}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Produtos Ativos</span>
                    <span className="font-semibold text-[#14213D]">+{selectedVendorModal.totalProducts} modelos</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => handleVendorWhatsApp(selectedVendorModal.whatsapp, selectedVendorModal.name)}
                    className="flex-1 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp da Fábrica</span>
                  </button>

                  <button
                    onClick={() => handleViewStoreProducts(selectedVendorModal.category)}
                    className="flex-1 py-3.5 rounded-2xl bg-[#14213D] hover:bg-[#E8442B] text-white font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Package className="w-4 h-4" />
                    <span>Ver Catálogo</span>
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
