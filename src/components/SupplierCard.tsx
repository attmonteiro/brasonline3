import React from 'react';
import { 
  MapPin, 
  MessageCircle, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  Building2,
  Package,
  Truck
} from 'lucide-react';
import { Supplier } from '../types';
import { useApp } from '../context/AppContext';

interface SupplierCardProps {
  supplier: Supplier;
  onSelectSupplier?: (supplier: Supplier) => void;
}

export const SupplierCard: React.FC<SupplierCardProps> = ({ 
  supplier, 
  onSelectSupplier 
}) => {
  const { 
    openSubscriptionModal, 
    usuarioTemAcessoPremium,
    setFilter,
    setActiveTab
  } = useApp();

  const canAccessWhatsApp = usuarioTemAcessoPremium();
  const cleanWhatsapp = (supplier.whatsapp || '5511998887766').replace(/\D/g, '');

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!canAccessWhatsApp) {
      openSubscriptionModal('buyer');
      return;
    }
    const message = encodeURIComponent(
      `Olá, equipe ${supplier.name}! Encontrei vocês no Brás Online e gostaria de solicitar a tabela de atacado e conhecer as condições de compra para revenda.`
    );
    window.open(`https://wa.me/${cleanWhatsapp}?text=${message}`, '_blank');
  };

  const handleViewSupplierClick = () => {
    if (onSelectSupplier) {
      onSelectSupplier(supplier);
    } else {
      // Filter catalog by this supplier's name or category and scroll
      setFilter('searchQuery', supplier.name);
      setActiveTab('catalog');
      const el = document.getElementById('grid-produtos');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const displayTags = supplier.tags && supplier.tags.length > 0 
    ? supplier.tags 
    : ['FABRICANTE', 'ATACADO', 'ENVIA PARA TODO BRASIL'];

  return (
    <div 
      onClick={handleViewSupplierClick}
      className="bg-white border border-slate-200/90 rounded-xl overflow-hidden hover:border-[#FF5A00]/40 hover:shadow-md transition-all duration-300 flex flex-col group cursor-pointer relative"
    >
      {/* Top Banner / Photo of Manufacturer or Showroom (Compact) */}
      <div className="relative aspect-[16/8] sm:aspect-[16/8.5] bg-slate-100 overflow-hidden">
        <img
          src={supplier.bannerUrl || 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&auto=format&fit=crop&q=80'}
          alt={supplier.name}
          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B33]/80 via-[#0B1B33]/20 to-transparent" />

        {/* Rating and Verified Badge Overlay */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0B1B33]/85 backdrop-blur-xs text-white text-[10px] font-bold border border-white/10 shadow-xs">
            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
            <span>Verificado</span>
          </span>

          {supplier.cnpj && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-xs text-[#0B1B33] text-[9.5px] font-bold shadow-xs">
              CNPJ: {supplier.cnpj}
            </span>
          )}
        </div>

        {/* Region Overlay on Image Bottom */}
        <div className="absolute bottom-2 left-2 right-2 text-white">
          <div className="text-[10px] uppercase tracking-wider font-extrabold text-[#FFE066] drop-shadow-xs">
            {supplier.category || 'Confecção Atacado'} · {supplier.region}
          </div>
        </div>
      </div>

      {/* Content Body - Distinctly Supplier-Focused */}
      <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between gap-2.5">
        <div>
          {/* Supplier Name */}
          <h3 className="text-base sm:text-lg font-black text-[#0B1B33] tracking-tight group-hover:text-[#FF5A00] transition-colors line-clamp-1">
            {supplier.name}
          </h3>

          {/* Store Location */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{supplier.address || supplier.region}</span>
          </div>

          {/* Description snippet */}
          {supplier.description && (
            <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
              {supplier.description}
            </p>
          )}

          {/* Structured Tags (FABRICANTE, ATACADO, ENVIA PARA TODO BRASIL) */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {displayTags.map((tag, idx) => (
              <span
                key={idx}
                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                  idx === 0
                    ? 'bg-orange-50 text-[#FF5A00] border border-orange-200/80'
                    : 'bg-slate-100 text-slate-600 border border-slate-200/60'
                }`}
              >
                {idx === 0 ? `🏷 ${tag}` : tag}
              </span>
            ))}
          </div>

          {/* Minimum order details */}
          {supplier.minOrderQty && (
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-1 font-medium">
                <Package className="w-3.5 h-3.5 text-[#FF5A00]" />
                Pedido mín.: <strong className="text-[#0B1B33]">{supplier.minOrderQty} peças</strong>
              </span>
              <span className="inline-flex items-center gap-1 text-slate-400 font-medium">
                <Truck className="w-3.5 h-3.5" />
                Envio nacional
              </span>
            </div>
          )}
        </div>

        {/* Dual Actions: Ver Fornecedor -> & WhatsApp */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          {/* Primary View Supplier CTA */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleViewSupplierClick();
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-[#0B1B33] hover:text-white text-[#0B1B33] text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
            title={`Ver perfil e produtos de ${supplier.name}`}
          >
            <span>Ver fornecedor</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Direct WhatsApp Action */}
          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all shadow-2xs hover:shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            title="Entrar em contato direto pelo WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-white" />
            <span>WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
};
