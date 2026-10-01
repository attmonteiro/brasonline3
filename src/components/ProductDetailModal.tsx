import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  MapPin, 
  MessageCircle, 
  ShieldCheck, 
  Package, 
  Crown, 
  CheckCircle2, 
  Sparkles, 
  Share2, 
  Heart, 
  Store 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    userRole, 
    currentUser,
    usuarioTemAcessoPremium,
    openSubscriptionModal, 
    toggleFavorite, 
    isFavorite 
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!selectedProduct) return null;

  const images = [
    selectedProduct.imageUrl,
    ...(selectedProduct.additionalImages || [])
  ];

  const favorite = isFavorite(selectedProduct.id);
  const canViewSupplier = usuarioTemAcessoPremium();
  const isLoggedExpired = currentUser && userRole === 'buyer_free';

  const safePrice = (Number(selectedProduct.price) || 0).toFixed(2);
  const safePriceFormatted = safePrice.replace('.', ',');
  const supplierName = selectedProduct.supplier?.name || 'Fornecedor Atacado';
  const supplierWhatsapp = (selectedProduct.supplier?.whatsapp || '').replace(/\D/g, '');
  const supplierRating = (Number(selectedProduct.supplier?.rating) || 5.0).toFixed(1);
  const supplierStoreCode = selectedProduct.supplier?.storeCode || 'Atacado';
  const supplierAddress = selectedProduct.supplier?.address || 'Brás - SP';
  const supplierTotalProducts = selectedProduct.supplier?.totalProducts || 1;

  const handleWhatsApp = () => {
    if (!canViewSupplier) {
      openSubscriptionModal('buyer');
      return;
    }
    const message = encodeURIComponent(
      `Olá, ${supplierName}! Vi seu produto "${selectedProduct.title}" no Brás Online (R$ ${safePriceFormatted}/pç) e gostaria de comprar a quantidade mínima de ${selectedProduct.minQuantity} peças no atacado.`
    );
    window.open(`https://wa.me/${supplierWhatsapp}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-orange-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 flex items-center justify-center transition-colors shadow-md border border-orange-100"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 bg-orange-50/20 p-4 sm:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-orange-100">
            <div>
              <div className="relative aspect-[3/4.4] rounded-2xl overflow-hidden bg-orange-100 shadow-md">
                <img
                  src={images[activeImageIndex] || selectedProduct.imageUrl}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                {/* Favorite toggle overlay */}
                <button
                  onClick={() => toggleFavorite(selectedProduct.id)}
                  className={`absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-transform ${
                    favorite
                      ? 'bg-amber-400 text-slate-900 scale-105'
                      : 'bg-white/90 hover:bg-white text-slate-700 hover:text-amber-500'
                  }`}
                  title="Salvar nos Favoritos"
                >
                  <Heart className={`w-5 h-5 ${favorite ? 'fill-slate-900 text-slate-900' : ''}`} />
                </button>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                  {images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-orange-600 scale-105 shadow-sm'
                          : 'border-slate-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt="Miniatura"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Information & Paywall / WhatsApp */}
          <div className="md:col-span-6 p-5 sm:p-7 flex flex-col justify-between">
            <div className="space-y-4">
              
              {/* Category & Grade Summary & Urgency Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-500">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="uppercase tracking-wider text-orange-700 font-bold bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200">
                    {selectedProduct.category}
                  </span>
                  {selectedProduct.discountBadge && (
                    <span className="bg-[#E5383B] text-white font-bold px-2.5 py-1 rounded-full text-[11px] shadow-sm tracking-wider uppercase">
                      {selectedProduct.discountBadge}
                    </span>
                  )}
                  {selectedProduct.urgencyTag && (
                    <span className="bg-[#FDECEC] text-[#E5383B] border border-[#E5383B]/20 font-bold px-2.5 py-1 rounded-full text-[11px] shadow-xs tracking-wider uppercase">
                      {selectedProduct.urgencyTag}
                    </span>
                  )}
                </div>
                <span>ID: {selectedProduct.id}</span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 leading-snug">
                {selectedProduct.title}
              </h2>

              {/* Pricing Box */}
              <div className="bg-orange-50/40 border border-orange-100 rounded-2xl p-4 flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Preço Atacado (por peça)
                  </div>
                  <div className="text-3xl font-serif font-bold text-slate-900 mt-0.5">
                    R$ {safePriceFormatted}
                  </div>
                </div>
              </div>

              {/* Wholesale Sizes & Colors (Atacado) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-amber-500" />
                    <span>Tamanhos e Cores Disponíveis</span>
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="bg-orange-50/30 border border-orange-100 rounded-xl p-3">
                    <div className="font-bold text-slate-800 mb-2">Tamanhos Disponíveis</div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.grade.sizes.map((s) => (
                        <span key={s} className="px-2.5 py-1 rounded-lg bg-white border border-orange-200 font-bold text-slate-700 shadow-2xs">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-orange-50/30 border border-orange-100 rounded-xl p-3">
                    <div className="font-bold text-slate-800 mb-2">Cores Disponíveis</div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.grade.colors.map((c) => (
                        <span key={c} className="px-2.5 py-1 rounded-lg bg-white border border-orange-200 text-slate-700 font-medium shadow-2xs">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* SUPPLIER CARD / PAYWALL CONDITIONAL BOX */}
            <div className="mt-6 pt-5 border-t border-orange-100">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Informações do Fornecedor
                </div>
                {/* O QUE É VISÍVEL PARA TODOS: Localização aproximada (apenas cidade/estado, nunca endereço completo) */}
                <div className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
                  <MapPin className="w-3.5 h-3.5 text-orange-600" />
                  <span>{selectedProduct.region}</span>
                </div>
              </div>

              {!canViewSupplier ? (
                /* LOCKED FOR NON-SUBSCRIBER - DISCRETE AND ELEGANT PAYWALL */
                <div 
                  onClick={() => openSubscriptionModal('buyer')}
                  className="bg-slate-50 hover:bg-amber-500/5 border border-slate-200 hover:border-amber-400 text-slate-900 rounded-2xl p-5 shadow-xs transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/90 text-slate-950 text-xs font-bold mb-2.5 shadow-2xs">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Disponível para assinantes</span>
                      </div>
                      <h3 className="text-base font-serif font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                        Nome da Fábrica, Endereço e Contato Direto Bloqueados
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {isLoggedExpired 
                          ? 'Sua assinatura expirou — renove para continuar vendo contatos diretos e endereços das fábricas do Brás, Bom Retiro e 44.'
                          : 'Assine para ver o nome do fabricante, galeria, WhatsApp direto e endereço físico sem intermediários ou taxas extras.'
                        }
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">Assinatura Clube VIP</div>
                      <div className="text-base font-serif font-bold text-slate-900">
                        Acesso ilimitado a 1.200+ fornecedores
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openSubscriptionModal('buyer');
                      }}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-2 transition-all"
                    >
                      <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span>Conheça os planos</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* UNLOCKED SUPPLIER - VIP MEMBER OR SELLER VIEW */
                <div className="bg-orange-50/60 border border-orange-200 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
                        {supplierName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-slate-900">
                            {supplierName}
                          </h4>
                        </div>
                        <div className="text-xs text-orange-800 font-medium">
                          {supplierStoreCode}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-800 flex items-center justify-end gap-1">
                        <span className="text-amber-500">★</span> {supplierRating}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {supplierTotalProducts} itens ativos
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-orange-100 flex items-center gap-2">
                    <Store className="w-4 h-4 text-amber-500 shrink-0" />
                    <span><strong>Endereço:</strong> {supplierAddress}</span>
                  </div>

                  <button
                    onClick={handleWhatsApp}
                    className="w-full py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                  >
                    <MessageCircle className="w-5 h-5 text-amber-300" />
                    <span>Entrar em contato e Fechar Pedido Atacado</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
