import React from 'react';
import { 
  X, 
  MapPin, 
  MessageCircle, 
  CheckCircle2, 
  Star, 
  Package, 
  Truck, 
  Share2, 
  Building2,
  ShieldCheck,
  Tag,
  ArrowRight
} from 'lucide-react';
import { Supplier, Product } from '../types';
import { useApp } from '../context/AppContext';

interface SupplierDetailModalProps {
  supplier: Supplier | null;
  onClose: () => void;
}

export const SupplierDetailModal: React.FC<SupplierDetailModalProps> = ({ 
  supplier, 
  onClose 
}) => {
  const { 
    products, 
    setSelectedProduct, 
    openSubscriptionModal, 
    usuarioTemAcessoPremium,
    setFilter,
    setActiveTab
  } = useApp();

  if (!supplier) return null;

  const canAccessWhatsApp = usuarioTemAcessoPremium();
  const cleanWhatsapp = (supplier.whatsapp || '5511998887766').replace(/\D/g, '');

  const supplierProducts = products.filter(
    (p) => p?.supplier?.id === supplier.id || p?.supplier?.name === supplier.name
  );

  const handleWhatsApp = () => {
    if (!canAccessWhatsApp) {
      openSubscriptionModal('buyer');
      return;
    }
    const message = encodeURIComponent(
      `Olá, ${supplier.name}! Encontrei vocês no Brás Online e gostaria de solicitar a grade completa e catálogo de atacado para minha loja.`
    );
    window.open(`https://wa.me/${cleanWhatsapp}?text=${message}`, '_blank');
  };

  const handleFilterBySupplier = () => {
    setFilter('searchQuery', supplier.name);
    setActiveTab('catalog');
    onClose();
    setTimeout(() => {
      const el = document.getElementById('grid-produtos');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const displayTags = supplier.tags && supplier.tags.length > 0 
    ? supplier.tags 
    : ['FABRICANTE', 'ATACADO', 'ENVIA PARA TODO BRASIL'];

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-[#0B1B33]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 flex items-center justify-center transition-colors shadow-md border border-slate-200 cursor-pointer"
          title="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Banner */}
        <div className="relative h-48 sm:h-64 bg-slate-900 overflow-hidden">
          <img
            src={supplier.bannerUrl || 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1200&auto=format&fit=crop&q=80'}
            alt={supplier.name}
            className="w-full h-full object-cover opacity-85"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B33] via-[#0B1B33]/40 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FF5A00] text-white text-[11px] font-black uppercase tracking-wider">
                🏷 Fabricante Verificado
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-white text-[11px] font-bold">
                {supplier.region}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white font-display">
              {supplier.name}
            </h2>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-7 space-y-6">
          
          {/* Info Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-start gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#FF5A00] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Endereço / Polo</span>
                <span className="text-xs font-bold text-[#0B1B33] block">{supplier.address || supplier.region}</span>
                {supplier.storeCode && (
                  <span className="text-[11px] text-slate-500 block">{supplier.storeCode}</span>
                )}
                {supplier.cnpj && (
                  <span className="text-[11px] text-slate-600 font-semibold block mt-0.5">CNPJ: {supplier.cnpj}</span>
                )}
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Package className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Pedido Mínimo</span>
                <span className="text-xs font-bold text-[#0B1B33] block">{supplier.minOrderQty || 6} peças no atacado</span>
                <span className="text-[11px] text-slate-500 block">Grade flexível</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Star className="w-4 h-4 fill-amber-500" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Avaliação</span>
                <span className="text-xs font-bold text-[#0B1B33] block">
                  {supplier.rating?.toFixed(1) || '5.0'} / 5.0
                </span>
                <span className="text-[11px] text-slate-500 block">Confecção bem avaliada</span>
              </div>
            </div>
          </div>

          {/* Description & Specialties */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-[#0B1B33] uppercase tracking-wider">
              Sobre esta confecção
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {supplier.description || 'Confecção fabricante de moda com produção contínua no polo atacadista de São Paulo. Peças confeccionadas com maquinário moderno e envio por transportadoras ou excursões de compras.'}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {displayTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-[#FFF7ED] text-[#FF5A00] border border-[#FED7AA]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Call to Action: WhatsApp */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-sm font-black text-[#0B1B33]">
                Falar diretamente com a fábrica
              </h4>
              <p className="text-xs text-slate-600">
                Tire dúvidas sobre grades, cores disponíveis e faça seu pedido direto pelo WhatsApp.
              </p>
            </div>

            <button
              onClick={handleWhatsApp}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-black uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Chamar no WhatsApp</span>
            </button>
          </div>

          {/* Products of this supplier in catalog */}
          {supplierProducts.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-[#0B1B33] uppercase tracking-wider">
                  Peças deste fabricante ({supplierProducts.length})
                </h3>
                <button
                  onClick={handleFilterBySupplier}
                  className="text-xs font-bold text-[#FF5A00] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>Ver todas no catálogo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {supplierProducts.slice(0, 3).map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      onClose();
                      setSelectedProduct(prod);
                    }}
                    className="p-2.5 rounded-2xl border border-slate-200 hover:border-[#FF5A00] transition-all cursor-pointer group"
                  >
                    <div className="aspect-[3/4] rounded-xl overflow-hidden bg-slate-100 mb-2">
                      <img
                        src={prod.imageUrl}
                        alt={prod.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="text-xs font-bold text-[#0B1B33] truncate group-hover:text-[#FF5A00]">
                      {prod.title}
                    </div>
                    <div className="text-xs font-serif font-black text-[#FF5A00] mt-0.5">
                      R$ {Number(prod.price).toFixed(2).replace('.', ',')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
