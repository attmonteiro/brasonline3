import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Star, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  Check, 
  MessageCircle, 
  Store, 
  CheckCircle2, 
  Lock, 
  Crown, 
  ChevronRight,
  Flame,
  Award,
  Sparkles,
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
  Info,
  BookmarkPlus,
  Building2,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProductDetailView: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    usuarioTemAcessoPremium,
    openSubscriptionModal, 
    toggleFavorite, 
    isFavorite,
    products,
    setFilter,
    setActiveTab
  } = useApp();

  // Scroll to top when view opens or product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedProduct?.id]);

  if (!selectedProduct) return null;

  // Prepare images array
  const rawImages = [
    selectedProduct.imageUrl,
    ...(selectedProduct.additionalImages || [])
  ].filter(Boolean);

  const images = rawImages.length >= 2 ? rawImages : [
    selectedProduct.imageUrl,
    selectedProduct.imageUrl,
    selectedProduct.imageUrl
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Zoom tool state
  const [isZooming, setIsZooming] = useState(false);
  const [zoomCoords, setZoomCoords] = useState({ x: 50, y: 50 });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxScale, setLightboxScale] = useState(1);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomCoords({ x, y });
  };

  // Colors & Sizes selection
  const availableColors = selectedProduct.grade?.colors?.length 
    ? selectedProduct.grade.colors 
    : ['Preto', 'Off White', 'Terracota', 'Azul Marinho'];

  const availableSizes = selectedProduct.grade?.sizes?.length 
    ? selectedProduct.grade.sizes 
    : ['P', 'M', 'G', 'GG'];

  const [selectedColor, setSelectedColor] = useState(availableColors[0] || 'Padrão');
  const [selectedSize, setSelectedSize] = useState(availableSizes[0] || 'Único');

  // Quantity simulator for wholesale quotation
  const minQty = Math.max(selectedProduct.minQuantity || 1, 1);
  const [quantity, setQuantity] = useState(minQty);

  useEffect(() => {
    setQuantity(Math.max(selectedProduct.minQuantity || 1, 1));
    setActiveImageIndex(0);
    if (availableColors.length > 0) setSelectedColor(availableColors[0]);
    if (availableSizes.length > 0) setSelectedSize(availableSizes[0]);
  }, [selectedProduct.id]);

  // Tab details state
  const [activeInfoTab, setActiveInfoTab] = useState<'details' | 'measurements' | 'wholesale_guide' | 'reviews'>('details');

  // Feedback states
  const [copiedLink, setCopiedLink] = useState(false);
  const [quoteSaved, setQuoteSaved] = useState(false);

  const favorite = isFavorite(selectedProduct.id);
  const canViewSupplier = usuarioTemAcessoPremium();

  // Price calculations
  const basePrice = Number(selectedProduct.price) || 0;
  
  let currentUnitPrice = basePrice;
  let activeDiscountLabel = '';
  if (quantity >= 12) {
    currentUnitPrice = Number((basePrice * 0.85).toFixed(2));
    activeDiscountLabel = '15% de desconto no Atacado Fechado';
  } else if (quantity >= 6) {
    currentUnitPrice = Number((basePrice * 0.92).toFixed(2));
    activeDiscountLabel = '8% de desconto na Grade';
  }

  const subtotal = currentUnitPrice * quantity;
  const suggestedRetail = selectedProduct.suggestedRetailPrice || (basePrice * 2.2);
  const estimatedProfit = (suggestedRetail * quantity) - subtotal;

  const supplierName = selectedProduct.supplier?.name || 'Confecções & Fábrica do Brás';
  const supplierWhatsapp = (selectedProduct.supplier?.whatsapp || '').replace(/\D/g, '') || '5511998887766';
  const supplierRating = (Number(selectedProduct.supplier?.rating) || 4.9).toFixed(1);
  const supplierStoreCode = selectedProduct.supplier?.storeCode || 'Galeria Pagé Brás • Loja 244';
  const supplierAddress = selectedProduct.supplier?.address || 'Rua Oriente, 500 - Brás, São Paulo - SP';
  const supplierTotalProducts = selectedProduct.supplier?.totalProducts || 18;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSaveQuote = () => {
    toggleFavorite(selectedProduct.id);
    setQuoteSaved(true);
    setTimeout(() => setQuoteSaved(false), 2200);
  };

  const handleWhatsApp = () => {
    if (!canViewSupplier) {
      openSubscriptionModal('buyer');
      return;
    }
    const message = encodeURIComponent(
      `Olá, ${supplierName}! Vi seu produto "${selectedProduct.title}" anunciado no portal Brás Online (R$ ${currentUnitPrice.toFixed(2).replace('.', ',')}/unidade no atacado) e gostaria de fechar pedido de ${quantity} peças (${selectedColor}, Tam ${selectedSize}). Como podemos combinar o pagamento e o envio pelo ônibus de excursão ou transportadora?`
    );
    window.open(`https://wa.me/${supplierWhatsapp}?text=${message}`, '_blank');
  };

  const relatedProducts = products
    .filter(p => p.id !== selectedProduct.id)
    .slice(0, 6);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-14 pt-3 animate-fadeIn text-[#14213D]">
      <div className="max-w-5xl mx-auto px-3 sm:px-4">
        
        {/* BREADCRUMBS & AÇÕES DO TOPO */}
        <div className="flex flex-wrap items-center justify-between gap-2 py-2 border-b border-gray-200 mb-3 text-xs">
          <div className="flex items-center gap-1.5 text-gray-500 overflow-x-auto py-0.5">
            <button
              onClick={() => {
                setSelectedProduct(null);
                setActiveTab('catalog');
              }}
              className="inline-flex items-center gap-1 font-semibold text-[#14213D] hover:text-[#E8442B] transition-colors cursor-pointer bg-white px-2.5 py-1 rounded border border-gray-200 shadow-2xs group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Voltar ao Catálogo</span>
            </button>

            <span className="text-gray-300">/</span>

            <button 
              onClick={() => {
                setSelectedProduct(null);
                setActiveTab('catalog');
              }}
              className="hover:text-gray-800 transition-colors"
            >
              Início
            </button>

            <span className="text-gray-300">/</span>

            <button 
              onClick={() => {
                setFilter('category', selectedProduct.category);
                setSelectedProduct(null);
                setActiveTab('category');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#E8442B] font-medium transition-colors text-gray-700"
            >
              {selectedProduct.category}
            </button>

            <span className="text-gray-300">/</span>

            <span className="text-gray-800 font-medium truncate max-w-[200px] sm:max-w-xs">
              {selectedProduct.title}
            </span>
          </div>

          <div className="flex items-center gap-1.5 ml-auto">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white border border-gray-200 hover:border-gray-300 text-[11px] font-medium text-gray-600 hover:text-gray-900 shadow-2xs transition-colors cursor-pointer"
              title="Compartilhar produto"
            >
              <Share2 className="w-3 h-3 text-gray-500" />
              <span>{copiedLink ? 'Link Copiado!' : 'Compartilhar'}</span>
            </button>

            <button
              onClick={handleSaveQuote}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded border text-[11px] font-medium shadow-2xs transition-all cursor-pointer ${
                favorite 
                  ? 'bg-rose-50 border-rose-200 text-rose-600' 
                  : 'bg-white border-gray-200 hover:border-gray-300 text-gray-600 hover:text-rose-500'
              }`}
              title="Salvar na lista de interesse"
            >
              <Heart className={`w-3 h-3 ${favorite ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{favorite ? 'Salvo' : 'Salvar'}</span>
            </button>

            <span className="hidden sm:inline-block text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded font-mono">
              Cód: {selectedProduct.id}
            </span>
          </div>
        </div>

        {/* FEEDBACK DE SALVAR COTAÇÃO */}
        {quoteSaved && (
          <div className="fixed top-16 right-4 z-50 bg-[#14213D] text-white px-3.5 py-2 rounded-lg shadow-xl flex items-center gap-2 border border-[#E8442B]/30 animate-fadeIn text-xs">
            <BookmarkPlus className="w-4 h-4 text-[#E8442B]" />
            <span>Produto salvo na sua lista de favoritos e cotações!</span>
          </div>
        )}

        {/* AVISO IMPORTANTE: NÃO VENDEMOS O PRODUTO (PORTAL DE CONEXÃO DIRETA COM O FABRICANTE) */}
        <div className="mb-3.5 bg-amber-50/90 border border-amber-200 rounded-lg p-2.5 sm:px-3 flex items-start sm:items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center gap-2 text-amber-900">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
            <span>
              <strong>Negociação 100% Direta com a Fábrica:</strong> O Brás Online não vende produtos nem cobra comissão sobre as peças. Você entra em contato direto com a confecção e negocia preço de atacado real sem atravessadores.
            </span>
          </div>
          <span className="hidden md:inline-block text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded shrink-0">
            Venda Direta de Fábrica
          </span>
        </div>

        {/* SEÇÃO PRINCIPAL: FOTO ALINHADA NA ESQUERDA + CONTEÚDO À DIREITA */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-2xs p-3.5 sm:p-5 mb-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-7 items-start">
            
            {/* LADO ESQUERDO: FOTO DO PRODUTO (ALINHADA À ESQUERDA COM FERRAMENTA DE ZOOM) */}
            <div className="md:col-span-5 flex flex-col items-start space-y-2.5 w-full">
              
              {/* Foto Principal com Zoom no MouseMove e Botão Ampliar */}
              <div 
                className="relative aspect-[3/3.8] w-full max-w-[360px] rounded-lg overflow-hidden bg-gray-50 border border-gray-200 shadow-2xs group select-none mr-auto"
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
                onMouseMove={handleMouseMove}
                style={{ cursor: isZooming ? 'crosshair' : 'zoom-in' }}
              >
                {/* Imagem com Zoom Dinâmico que segue o cursor */}
                <img
                  src={images[activeImageIndex] || selectedProduct.imageUrl}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover transition-transform duration-75 ease-out pointer-events-none"
                  style={{
                    transformOrigin: `${zoomCoords.x}% ${zoomCoords.y}%`,
                    transform: isZooming ? 'scale(2.2)' : 'scale(1)',
                  }}
                  referrerPolicy="no-referrer"
                />

                {/* Badges no canto superior da foto */}
                <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
                  {selectedProduct.discountBadge && (
                    <span className="bg-[#E8442B] text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-2xs uppercase tracking-wider">
                      {selectedProduct.discountBadge}
                    </span>
                  )}
                  {selectedProduct.readyDelivery && (
                    <span className="bg-emerald-600 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded shadow-2xs flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      Pronta Entrega
                    </span>
                  )}
                  {selectedProduct.urgencyTag && (
                    <span className="bg-amber-500 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded shadow-2xs flex items-center gap-1">
                      <Flame className="w-2.5 h-2.5" />
                      {selectedProduct.urgencyTag}
                    </span>
                  )}
                </div>

                {/* Botão de Ampliação em Tela Cheia (Lightbox) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLightboxOpen(true);
                  }}
                  className="absolute bottom-2 right-2 bg-black/75 hover:bg-black text-white p-1.5 rounded text-xs transition-colors shadow-sm flex items-center gap-1 z-20 cursor-pointer"
                  title="Ampliar foto em alta resolução"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="text-[10px] hidden sm:inline font-medium">Ampliar</span>
                </button>

                {/* Indicador de ferramenta de zoom */}
                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[9px] font-medium px-1.5 py-0.5 rounded pointer-events-none flex items-center gap-1">
                  <ZoomIn className="w-3 h-3 text-amber-300" />
                  <span>Passe o mouse para zoom</span>
                </div>
              </div>

              {/* Faixa de Miniaturas Alinhada à Esquerda */}
              {images.length > 1 && (
                <div className="flex items-center justify-start gap-2 overflow-x-auto w-full py-0.5">
                  {images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-12 h-12 rounded-md overflow-hidden border transition-all cursor-pointer flex-shrink-0 ${
                        activeImageIndex === idx
                          ? 'border-[#E8442B] ring-1 ring-[#E8442B] shadow-2xs'
                          : 'border-gray-200 opacity-60 hover:opacity-100 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`Foto ${idx + 1}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Informação sobre foto real da fábrica */}
              <div className="w-full max-w-[360px] text-[11px] text-gray-500 bg-gray-50 p-2 rounded-lg border border-gray-100 flex items-center justify-between">
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Foto Real da Confecção
                </span>
                <span className="text-gray-400">Brás • São Paulo</span>
              </div>
            </div>

            {/* LADO DIREITO: CONTEÚDO ESSENCIAL, TABELA DE PREÇO E CONTATO DIRETO */}
            <div className="md:col-span-7 space-y-3">
              
              {/* Localização e Polo */}
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-500">
                <span className="inline-flex items-center gap-1 font-semibold text-gray-800">
                  <MapPin className="w-3 h-3 text-[#E8442B]" />
                  {selectedProduct.region}
                </span>
                <span>·</span>
                <span className="text-emerald-700 font-medium inline-flex items-center gap-0.5">
                  <Store className="w-3 h-3" />
                  Fabricação Nacional
                </span>
                <span>·</span>
                <span className="text-gray-600">Categoria: {selectedProduct.category}</span>
              </div>

              {/* Título do Produto */}
              <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                {selectedProduct.title}
              </h1>

              {/* Avaliação e Status */}
              <div className="flex items-center gap-2.5 text-xs text-gray-500 pb-2 border-b border-gray-100">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.9</span>
                  <span className="text-gray-400 font-normal">(184 avaliações)</span>
                </div>
                <span className="text-gray-300">·</span>
                <span className="text-gray-700 font-medium">842 peças fornecidas</span>
                <span className="text-gray-300">·</span>
                <span className="text-emerald-700 font-medium">Disponível na fábrica</span>
              </div>

              {/* QUADRO DE PREÇO DE ATACADO DA CONFECÇÃO */}
              <div className="bg-[#FDF1EC]/60 border border-[#FAD7C8]/80 rounded-lg p-3 space-y-2">
                <div className="flex flex-wrap items-baseline justify-between gap-1.5">
                  <div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                      Tabela de Preço de Fábrica (Atacado)
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#E8442B]">
                        R$ {currentUnitPrice.toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-[11px] text-gray-400 line-through">
                        Varejo: R$ {(basePrice * 1.6).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    Pedido Mínimo da Fábrica: {minQty} {minQty === 1 ? 'peça' : 'peças'}
                  </span>
                </div>

                {/* Escadinha de atacado por quantidade */}
                <div className="grid grid-cols-3 gap-1.5 pt-1.5 border-t border-[#FAD7C8]/70 text-[11px]">
                  <div className={`p-1.5 rounded text-center border transition-all ${
                    quantity < 6 
                      ? 'bg-white border-[#E8442B] font-bold text-[#14213D] shadow-2xs' 
                      : 'bg-white/50 border-transparent text-gray-600'
                  }`}>
                    <div className="text-[9px] text-gray-400">1 a 5 un</div>
                    <div className="font-bold">R$ {basePrice.toFixed(2).replace('.', ',')}</div>
                  </div>

                  <div className={`p-1.5 rounded text-center border transition-all ${
                    quantity >= 6 && quantity < 12 
                      ? 'bg-white border-[#E8442B] font-bold text-[#14213D] shadow-2xs' 
                      : 'bg-white/50 border-transparent text-gray-600'
                  }`}>
                    <div className="text-[9px] text-emerald-700 font-semibold">6 a 11 un (-8%)</div>
                    <div className="font-bold text-[#E8442B]">R$ {(basePrice * 0.92).toFixed(2).replace('.', ',')}</div>
                  </div>

                  <div className={`p-1.5 rounded text-center border transition-all ${
                    quantity >= 12 
                      ? 'bg-white border-[#E8442B] font-bold text-[#14213D] shadow-2xs' 
                      : 'bg-white/50 border-transparent text-gray-600'
                  }`}>
                    <div className="text-[9px] text-emerald-700 font-semibold">12+ un (-15%)</div>
                    <div className="font-bold text-[#E8442B]">R$ {(basePrice * 0.85).toFixed(2).replace('.', ',')}</div>
                  </div>
                </div>

                {/* Previsão de Margem para Revenda */}
                <div className="flex items-center justify-between text-[11px] text-gray-600 pt-0.5">
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    Sugerido revenda: <strong>R$ {suggestedRetail.toFixed(2).replace('.', ',')}</strong>
                  </span>
                  <span className="text-emerald-700 font-semibold">
                    Lucro est.: +R$ {estimatedProfit.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* CORES DISPONÍVEIS NA CONFECÇÃO */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-gray-700">
                  <span>Cor selecionada: <strong className="text-gray-900">{selectedColor}</strong></span>
                  <span className="text-gray-400 text-[11px]">{availableColors.length} opções</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {availableColors.map((color) => {
                    const isSelected = selectedColor === color;
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`px-2.5 py-1 rounded text-xs font-medium border transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'border-[#E8442B] bg-[#FDF1EC] text-[#E8442B] font-bold shadow-2xs'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <span 
                          className="w-2.5 h-2.5 rounded-full border border-gray-300" 
                          style={{
                            backgroundColor: 
                              color.toLowerCase().includes('preto') ? '#111' :
                              color.toLowerCase().includes('branco') || color.toLowerCase().includes('off') ? '#F8F9FA' :
                              color.toLowerCase().includes('azul') ? '#1E3A8A' :
                              color.toLowerCase().includes('terra') || color.toLowerCase().includes('coral') ? '#C2410C' :
                              color.toLowerCase().includes('verde') ? '#15803D' :
                              color.toLowerCase().includes('rosa') ? '#EC4899' :
                              color.toLowerCase().includes('bege') ? '#D4B996' :
                              color.toLowerCase().includes('vermelho') ? '#DC2626' : '#94A3B8'
                          }}
                        />
                        <span>{color}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* TAMANHOS DISPONÍVEIS */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-gray-700">
                  <span>Tamanho: <strong className="text-gray-900">{selectedSize}</strong></span>
                  <button 
                    type="button"
                    onClick={() => setActiveInfoTab('measurements')}
                    className="text-[#E8442B] hover:underline text-[11px] cursor-pointer"
                  >
                    Guia de medidas
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {availableSizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`h-7 min-w-[32px] px-2 rounded text-xs font-semibold border transition-all text-center cursor-pointer ${
                          isSelected
                            ? 'border-[#E8442B] bg-[#E8442B] text-white shadow-2xs'
                            : 'border-gray-200 bg-white text-gray-800 hover:border-gray-300'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SIMULADOR DE QUANTIDADE PARA COTAÇÃO COM A FÁBRICA */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">Qtd cotação:</span>
                  <div className="flex items-center border border-gray-300 rounded overflow-hidden bg-white h-7">
                    <button
                      type="button"
                      onClick={() => setQuantity(prev => Math.max(minQty, prev - 1))}
                      className="px-2 h-full hover:bg-gray-100 text-gray-600 transition-colors disabled:opacity-40 cursor-pointer"
                      disabled={quantity <= minQty}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={minQty}
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val)) setQuantity(Math.max(minQty, val));
                      }}
                      className="w-10 text-center font-bold text-gray-900 text-xs outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="px-2 h-full hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block leading-tight">Valor est. do lote:</span>
                  <span className="text-base font-bold text-[#14213D]">
                    R$ {subtotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* AÇÃO PRINCIPAL: CONTATO DIRETO COM A FÁBRICA NO WHATSAPP */}
              <div className="pt-2">
                {canViewSupplier ? (
                  <div className="space-y-1.5">
                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="w-full h-10 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.99]"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-100" />
                      <span>Falar com o Fabricante no WhatsApp</span>
                    </button>
                    <p className="text-[10px] text-gray-500 text-center">
                      Você negocia preço, pagamento e envio diretamente com a confecção parceira.
                    </p>
                  </div>
                ) : (
                  <div 
                    onClick={() => openSubscriptionModal('buyer')}
                    className="p-3 rounded-lg bg-amber-50/90 border border-amber-200 hover:border-amber-300 transition-all cursor-pointer space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-amber-600 shrink-0" />
                        <span className="text-xs font-bold text-gray-900 group-hover:text-[#E8442B] transition-colors">
                          WhatsApp e Contato Direto da Fábrica Bloqueados
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#E8442B] group-hover:underline flex items-center gap-0.5">
                        <Crown className="w-3.5 h-3.5" />
                        Desbloquear
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-600 leading-tight">
                      Assine o Clube VIP para ter acesso liberado ao telefone, WhatsApp direto e endereço físico de todas as confecções do Brás.
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* SEÇÃO INFERIOR: CONTEÚDO ABAIXO DA VITRINE */}
        <div className="space-y-5">
          
          {/* 1. CARD DA LOJA FÍSICA E FORNECEDOR NO BRÁS */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-2xs p-3.5 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#14213D] text-white flex items-center justify-center font-bold text-base shrink-0">
                  {supplierName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-gray-900 leading-tight">
                      {supplierName}
                    </h3>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#E8442B]/10 text-[#E8442B] uppercase">
                      Fabricante
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                    <Store className="w-3 h-3 text-gray-400" />
                    <span>{supplierStoreCode}</span>
                    <span>·</span>
                    <span>{supplierAddress}</span>
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 pt-0.5">
                    <span className="text-amber-500 font-bold">★ {supplierRating}</span>
                    <span>·</span>
                    <span>{supplierTotalProducts} modelos ativos</span>
                    <span>·</span>
                    <span className="text-emerald-600">Resposta rápida</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:ml-auto">
                {canViewSupplier ? (
                  <button
                    onClick={handleWhatsApp}
                    className="h-8 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                ) : (
                  <button
                    onClick={() => openSubscriptionModal('buyer')}
                    className="h-8 px-3 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-950 text-[11px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  >
                    <Crown className="w-3.5 h-3.5" />
                    <span>Desbloquear</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setFilter('category', selectedProduct.category);
                    setSelectedProduct(null);
                    setActiveTab('catalog');
                  }}
                  className="h-8 px-3 rounded-lg border border-gray-200 hover:border-gray-300 bg-white text-gray-700 text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Mais desta fábrica</span>
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                </button>
              </div>

            </div>
          </div>

          {/* 2. ABAS COM ESPECIFICAÇÕES TÉCNICAS E GUIA DE ATACADO */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
            <div className="flex border-b border-gray-200 overflow-x-auto bg-gray-50/70 text-xs">
              <button
                onClick={() => setActiveInfoTab('details')}
                className={`px-4 py-2.5 font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeInfoTab === 'details'
                    ? 'border-[#E8442B] text-[#E8442B] bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                Ficha Técnica
              </button>

              <button
                onClick={() => setActiveInfoTab('measurements')}
                className={`px-4 py-2.5 font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeInfoTab === 'measurements'
                    ? 'border-[#E8442B] text-[#E8442B] bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                Tabela de Medidas
              </button>

              <button
                onClick={() => setActiveInfoTab('wholesale_guide')}
                className={`px-4 py-2.5 font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeInfoTab === 'wholesale_guide'
                    ? 'border-[#E8442B] text-[#E8442B] bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                Como Funciona a Compra e Envio
              </button>

              <button
                onClick={() => setActiveInfoTab('reviews')}
                className={`px-4 py-2.5 font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeInfoTab === 'reviews'
                    ? 'border-[#E8442B] text-[#E8442B] bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                Avaliações (184)
              </button>
            </div>

            <div className="p-4 text-xs">
              {activeInfoTab === 'details' && (
                <div className="space-y-3.5">
                  <p className="text-gray-700 leading-relaxed max-w-3xl whitespace-pre-line text-xs">
                    {selectedProduct.description || 
                      `Confeccionado com padrão e maquinário de alto acabamento no polo do Brás em São Paulo. Tecido com toque macio e excelente caimento para revenda com alta margem de lucro.`}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-gray-100">
                    <div className="p-2 rounded bg-gray-50 border border-gray-100">
                      <span className="text-gray-400 block text-[10px]">Tecido:</span>
                      <strong className="text-gray-800">Viscose c/ Elastano</strong>
                    </div>
                    <div className="p-2 rounded bg-gray-50 border border-gray-100">
                      <span className="text-gray-400 block text-[10px]">Origem:</span>
                      <strong className="text-gray-800">Brás - São Paulo (SP)</strong>
                    </div>
                    <div className="p-2 rounded bg-gray-50 border border-gray-100">
                      <span className="text-gray-400 block text-[10px]">Modelagem:</span>
                      <strong className="text-gray-800">Padrão Nacional</strong>
                    </div>
                    <div className="p-2 rounded bg-gray-50 border border-gray-100">
                      <span className="text-gray-400 block text-[10px]">Transparência:</span>
                      <strong className="text-gray-800">Zero Transparência c/ Forro</strong>
                    </div>
                    <div className="p-2 rounded bg-gray-50 border border-gray-100">
                      <span className="text-gray-400 block text-[10px]">Cores Disponíveis:</span>
                      <strong className="text-gray-800">{availableColors.join(', ')}</strong>
                    </div>
                    <div className="p-2 rounded bg-gray-50 border border-gray-100">
                      <span className="text-gray-400 block text-[10px]">Disponibilidade:</span>
                      <strong className="text-emerald-700">Pronta Entrega Imediata</strong>
                    </div>
                  </div>
                </div>
              )}

              {activeInfoTab === 'measurements' && (
                <div className="space-y-2">
                  <div className="overflow-x-auto">
                    <table className="w-full text-[11px] text-left text-gray-700 border border-gray-200 rounded">
                      <thead className="bg-[#14213D] text-white font-bold uppercase text-[10px]">
                        <tr>
                          <th className="px-3 py-2">Tam</th>
                          <th className="px-3 py-2">Manequim</th>
                          <th className="px-3 py-2">Busto (cm)</th>
                          <th className="px-3 py-2">Cintura (cm)</th>
                          <th className="px-3 py-2">Quadril (cm)</th>
                          <th className="px-3 py-2">Comprimento</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-3 py-1.5 font-bold">P</td>
                          <td className="px-3 py-1.5">36 - 38</td>
                          <td className="px-3 py-1.5">82 - 88</td>
                          <td className="px-3 py-1.5">64 - 70</td>
                          <td className="px-3 py-1.5">88 - 94</td>
                          <td className="px-3 py-1.5">92 cm</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-1.5 font-bold">M</td>
                          <td className="px-3 py-1.5">40 - 42</td>
                          <td className="px-3 py-1.5">89 - 96</td>
                          <td className="px-3 py-1.5">71 - 78</td>
                          <td className="px-3 py-1.5">95 - 102</td>
                          <td className="px-3 py-1.5">94 cm</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-1.5 font-bold">G</td>
                          <td className="px-3 py-1.5">44</td>
                          <td className="px-3 py-1.5">97 - 104</td>
                          <td className="px-3 py-1.5">79 - 86</td>
                          <td className="px-3 py-1.5">103 - 110</td>
                          <td className="px-3 py-1.5">96 cm</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-1.5 font-bold">GG</td>
                          <td className="px-3 py-1.5">46</td>
                          <td className="px-3 py-1.5">105 - 112</td>
                          <td className="px-3 py-1.5">87 - 94</td>
                          <td className="px-3 py-1.5">111 - 118</td>
                          <td className="px-3 py-1.5">98 cm</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeInfoTab === 'wholesale_guide' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-gray-700">
                  <div className="p-3 rounded bg-gray-50 border border-gray-200 space-y-1">
                    <strong className="text-gray-900 block font-semibold">🚌 Despacho em Ônibus de Excursão</strong>
                    <p className="text-[11px] text-gray-600">
                      As confecções do Brás levam seu fardo diretamente até o ônibus da sua excursão nas garagens e hotéis do Brás, Pari e Canindé.
                    </p>
                  </div>
                  <div className="p-3 rounded bg-gray-50 border border-gray-200 space-y-1">
                    <strong className="text-gray-900 block font-semibold">📦 Transportadoras e Correios</strong>
                    <p className="text-[11px] text-gray-600">
                      Envios com rastreamento para todo o Brasil via Sedex, PAC ou transportadora indicada pelo cliente.
                    </p>
                  </div>
                  <div className="p-3 rounded bg-gray-50 border border-gray-200 space-y-1">
                    <strong className="text-gray-900 block font-semibold">🏬 Retirada na Loja Física</strong>
                    <p className="text-[11px] text-gray-600">
                      Visite pessoalmente o endereço da fábrica informado no Brás e retire suas peças diretamente no balcão.
                    </p>
                  </div>
                  <div className="p-3 rounded bg-gray-50 border border-gray-200 space-y-1">
                    <strong className="text-gray-900 block font-semibold">🧾 Sem Comissões ou Intermediários</strong>
                    <p className="text-[11px] text-gray-600">
                      Você paga o preço real de custo para a fábrica, sem cobrança de taxas de venda.
                    </p>
                  </div>
                </div>
              )}

              {activeInfoTab === 'reviews' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2.5 rounded bg-amber-50/50 border border-amber-200 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-amber-500">4.9 ★</span>
                      <span className="text-gray-600 text-[11px]">184 avaliações de revendedoras</span>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700">
                      98% recomendam este fornecedor
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="p-2.5 rounded border border-gray-100 bg-gray-50/50 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <strong className="text-gray-800">Marcela S. (Lojista - Belo Horizonte/MG)</strong>
                        <span className="text-amber-400 text-xs">★★★★★</span>
                      </div>
                      <p className="text-[11px] text-gray-600">
                        "Falei com a fábrica pelo WhatsApp indicado aqui. O atendimento foi muito rápido e o envio no ônibus de excursão chegou perfeitamente."
                      </p>
                    </div>
                    <div className="p-2.5 rounded border border-gray-100 bg-gray-50/50 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <strong className="text-gray-800">Camila R. (Revendedora - Campinas/SP)</strong>
                        <span className="text-amber-400 text-xs">★★★★★</span>
                      </div>
                      <p className="text-[11px] text-gray-600">
                        "Excelente negociar direto com a confecção. Peças de alta qualidade e preço de atacado real."
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 3. PRODUTOS RELACIONADOS DA MESMA CATEGORIA */}
          {relatedProducts.length > 0 && (
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    Mais Peças Desta Categoria
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setFilter('category', selectedProduct.category);
                    setSelectedProduct(null);
                    setActiveTab('category');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[11px] font-semibold text-[#E8442B] hover:underline cursor-pointer"
                >
                  Ver todos em {selectedProduct.category} →
                </button>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-1.5 sm:gap-2">
                {relatedProducts.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => setSelectedProduct(prod)}
                    className="bg-white border border-[#E8E8E8] hover:border-[#2E5C94] rounded-lg overflow-hidden shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                      <img
                        src={prod.imageUrl}
                        alt={prod.title}
                        className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-200"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-1 sm:p-1.5 flex-1 flex flex-col justify-between">
                      <div className="text-[11.5px] sm:text-xs font-bold text-[#14284B] leading-tight">
                        R$ {(Number(prod.price) || 0).toFixed(2).replace('.', ',')}
                      </div>
                      <h5 className="text-[9.5px] sm:text-[10.5px] font-medium text-gray-800 line-clamp-1 group-hover:text-[#2E5C94] transition-colors mt-0.5 leading-tight">
                        {prod.title}
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* MODAL LIGHTBOX EM ALTA RESOLUÇÃO COM CONTROLES DE ZOOM */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <div className="absolute -top-10 right-0 flex items-center gap-3">
              <button
                onClick={() => setLightboxScale(s => Math.min(3, s + 0.25))}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs transition-colors cursor-pointer"
                title="Aproximar zoom"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLightboxScale(s => Math.max(1, s - 0.25))}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs transition-colors cursor-pointer"
                title="Afastar zoom"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                title="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-auto max-h-[80vh] rounded-lg">
              <img
                src={images[activeImageIndex] || selectedProduct.imageUrl}
                alt={selectedProduct.title}
                className="object-contain transition-transform duration-200"
                style={{ transform: `scale(${lightboxScale})` }}
              />
            </div>
            
            <p className="text-white/70 text-xs mt-3">
              Zoom: {Math.round(lightboxScale * 100)}% • Use os botões no topo para aproximar ou afastar
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
