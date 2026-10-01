import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Store, 
  DollarSign, 
  Package, 
  Image as ImageIcon, 
  CheckCircle2, 
  Sparkles, 
  MapPin, 
  Layers,
  Trash2,
  Upload,
  Link as LinkIcon,
  Check,
  RotateCw,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CategoryType, PoloRegion, AVAILABLE_COLORS, AVAILABLE_SIZES } from '../types';
import { compressImage } from '../utils/imageCompressor';

const PHOTO_PRESETS = [
  {
    label: 'Moda Infantil (Conjunto Verão)',
    url: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Moda Infantil (Vestido Festa)',
    url: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Vestido Canelado Nude',
    url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Jeans Wide Leg Premium',
    url: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Conjunto Alfaiataria',
    url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
  },
];

export const NewProductModal: React.FC = () => {
  const { 
    isNewProductModalOpen, 
    setIsNewProductModalOpen, 
    addProduct, 
    currentUser, 
    updateStoreInfo,
    createOrUpdateStore,
    allStores,
    selectedAdminStore,
    targetStoreForNewProduct,
    setTargetStoreForNewProduct,
    openCreateStoreModal,
    userRole
  } = useApp();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [suggestedRetailPrice, setSuggestedRetailPrice] = useState('');
  const [minQuantity, setMinQuantity] = useState('10');
  const [category, setCategory] = useState<CategoryType>('Feminino');
  const [region, setRegion] = useState<PoloRegion>('Brás - SP');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Store info
  const [selectedStoreId, setSelectedStoreId] = useState<string>('');
  const [storeName, setStoreName] = useState('Sua Confeção Atacado');
  const [storeCode, setStoreCode] = useState('Galeria Pagé Brás • Loja 244');
  const [whatsapp, setWhatsapp] = useState('5511998887766');

  // Multiple photos state
  const [photosList, setPhotosList] = useState<string[]>([]);
  const [inputUrl, setInputUrl] = useState('');
  const [photoRotations, setPhotoRotations] = useState<Record<number, number>>({});
  const [photoFits, setPhotoFits] = useState<Record<number, 'cover' | 'contain'>>({});

  // Interactive Grade Selection
  const [selectedColors, setSelectedColors] = useState<string[]>(['Rosa Bebê', 'Lilás Lavanda', 'Verde Menta', 'Amarelo Mostarda']);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['2 anos', '4 anos', '6 anos', '8 anos', '10 anos', '12 anos', '14 anos', '16 anos']);
  const [gradeRatio, setGradeRatio] = useState('Grade mista proporcionada - Pacote fechado');

  useEffect(() => {
    const active = targetStoreForNewProduct || selectedAdminStore || currentUser?.storeInfo || allStores[0];
    if (active) {
      setSelectedStoreId(active.id);
      setStoreName(active.name);
      setStoreCode(active.storeCode);
      setWhatsapp(active.whatsapp);
      setRegion(active.region);
    }
  }, [targetStoreForNewProduct, selectedAdminStore, currentUser, isNewProductModalOpen, allStores]);

  const handleStoreSelect = (id: string) => {
    if (id === '__NEW_STORE__') {
      openCreateStoreModal();
      return;
    }
    setSelectedStoreId(id);
    const found = allStores.find(s => s.id === id);
    if (found) {
      setStoreName(found.name);
      setStoreCode(found.storeCode);
      setWhatsapp(found.whatsapp);
      setRegion(found.region);
    }
  };

  if (!isNewProductModalOpen) return null;

  // Toggle Color (bolinha com as cores)
  const toggleColor = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName)
        ? prev.filter((c) => c !== colorName)
        : [...prev, colorName]
    );
  };

  // Toggle Size
  const toggleSize = (sizeName: string) => {
    setSelectedSizes((prev) =>
      prev.includes(sizeName)
        ? prev.filter((s) => s !== sizeName)
        : [...prev, sizeName]
    );
  };

  // Handle file upload to compressed Base64 data URL
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileList = Array.from(e.target.files);
      for (const file of fileList) {
        try {
          const compressed = await compressImage(file, 800, 800, 0.75);
          if (compressed) {
            setPhotosList((prev) => [...prev, compressed]);
          }
        } catch (err) {
          console.error('Error compressing image:', err);
        }
      }
      // Reset input value to allow re-uploading the same file if needed
      e.target.value = '';
    }
  };

  const handleAddUrl = () => {
    if (inputUrl.trim()) {
      setPhotosList((prev) => [...prev, inputUrl.trim()]);
      setInputUrl('');
    }
  };

  const removePhoto = (index: number) => {
    setPhotosList((prev) => prev.filter((_, i) => i !== index));
    setPhotoRotations((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
    setPhotoFits((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };

  const rotatePhoto = (index: number) => {
    setPhotoRotations((prev) => ({
      ...prev,
      [index]: ((prev[index] || 0) + 90) % 360,
    }));
  };

  const toggleFit = (index: number) => {
    setPhotoFits((prev) => ({
      ...prev,
      [index]: prev[index] === 'contain' ? 'cover' : 'contain',
    }));
  };

  const saveProductCore = () => {
    if (!title.trim()) {
      alert('Por favor, digite o Título / Nome da peça.');
      return false;
    }
    
    const cleanPrice = Number(String(price).replace(/[^0-9.,]/g, '').replace(',', '.'));
    if (!price || isNaN(cleanPrice) || cleanPrice <= 0) {
      alert('Por favor, informe um Preço de atacado válido.');
      return false;
    }

    const cleanDiscountPrice = discountPrice
      ? Number(String(discountPrice).replace(/[^0-9.,]/g, '').replace(',', '.'))
      : undefined;

    const cleanSuggestedPrice = suggestedRetailPrice 
      ? Number(String(suggestedRetailPrice).replace(/[^0-9.,]/g, '').replace(',', '.')) 
      : undefined;

    const effectivePhotos = photosList.length > 0 ? photosList : [PHOTO_PRESETS[0].url];
    const mainPhoto = effectivePhotos[0];
    const additionalPhotos = effectivePhotos.slice(1);

    const activeStore = allStores.find(s => s.id === selectedStoreId) || targetStoreForNewProduct || selectedAdminStore || currentUser?.storeInfo;
    const effectiveRegion = activeStore?.region || region || 'Brás - SP';

    const supplierObj = {
      id: activeStore?.id || `sup-${Date.now()}`,
      name: storeName.trim() || activeStore?.name || 'Minha Confecção Atacado',
      storeCode: storeCode.trim() || activeStore?.storeCode || 'Brás SP • Atacado',
      address: activeStore?.address || `${storeCode} - ${effectiveRegion}`,
      whatsapp: whatsapp.replace(/\D/g, '') || activeStore?.whatsapp || '5511998887766',
      verified: true,
      region: effectiveRegion,
      rating: activeStore?.rating || 5.0,
      totalProducts: (activeStore?.totalProducts || 0) + 1,
    };

    updateStoreInfo(supplierObj);

    addProduct({
      title: title.trim(),
      price: cleanPrice,
      discountPrice: cleanDiscountPrice && !isNaN(cleanDiscountPrice) ? cleanDiscountPrice : undefined,
      suggestedRetailPrice: cleanSuggestedPrice && !isNaN(cleanSuggestedPrice) ? cleanSuggestedPrice : undefined,
      minQuantity: Number(String(minQuantity).replace(/\D/g, '')) || 10,
      category,
      region: effectiveRegion,
      imageUrl: mainPhoto,
      additionalImages: additionalPhotos.length > 0 ? additionalPhotos : undefined,
      description: 'Peça de confecção própria com modelagem premium e pronta entrega no atacado.',
      supplier: supplierObj,
      inStock: true,
      readyDelivery: true,
      grade: {
        sizes: selectedSizes.length > 0 ? selectedSizes : ['P', 'M', 'G', 'GG'],
        colors: selectedColors.length > 0 ? selectedColors : ['Preto', 'Branco'],
        gradeRatio: gradeRatio || 'Grade padrão mista',
      },
      isFeatured: true,
    });

    if (setTargetStoreForNewProduct) {
      setTargetStoreForNewProduct(null);
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!saveProductCore()) return;
    setIsNewProductModalOpen(false);
    setTitle('');
    setPrice('');
    setDiscountPrice('');
    setSuggestedRetailPrice('');
    setPhotosList([]);
    setSuccessMessage('');
  };

  const handleSaveAndAddAnother = (e: React.MouseEvent) => {
    e.preventDefault();
    if (title.trim() || price || photosList.length > 0) {
      if (!saveProductCore()) {
        alert('Por favor, complete ao menos 1 foto, título e preço do produto para salvar este antes de abrir outro.');
        return;
      }
      setSuccessMessage('✓ Produto salvo! Novo formulário em branco aberto.');
    } else {
      setSuccessMessage('✓ Formulário em branco pronto para cadastrar produto.');
    }
    setTitle('');
    setPrice('');
    setDiscountPrice('');
    setSuggestedRetailPrice('');
    setPhotosList([]);
    setTimeout(() => {
      setSuccessMessage('');
    }, 4000);
  };

  const hasPhotos = photosList.length > 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-[#FAF9F6] rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative border border-slate-200/80"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsNewProductModalOpen(false)}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center transition-all border border-slate-200 shadow-sm"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
          {successMessage && (
            <div className="bg-emerald-600 text-white font-bold text-xs p-3.5 rounded-2xl shadow-md flex items-center justify-between animate-fadeIn">
              <span>{successMessage}</span>
              <button
                type="button"
                onClick={() => setSuccessMessage('')}
                className="text-white hover:text-emerald-200"
              >
                ✕
              </button>
            </div>
          )}

          {/* Header */}
          <div className="border-b border-slate-200/80 pb-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Cadastrar Peça no Portal
              </h2>
              <p className="text-xs text-slate-600 mt-1 max-w-xl">
                Cadastre suas peças informando fotos, preço de atacado, grade e cores disponíveis.
              </p>
            </div>
            <button
              type="button"
              onClick={handleSaveAndAddAnother}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-all shrink-0 cursor-pointer"
              title="Salvar produto atual (se preenchido) e abrir novo card em branco"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar outro</span>
            </button>
          </div>

          {/* ETAPA 1: CARREGAR AS FOTOS PRIMEIRO */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-300 text-xs font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Carregar Fotografias do Produto (Obrigatório)*
                </label>
              </div>
              {hasPhotos ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{photosList.length} Foto(s) Carregada(s)</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                  <span>Pendente • Insira 1 foto abaixo</span>
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500">
              Selecione imagens nítidas da frente, costas e detalhes do tecido. Use os botões no card para girar ou ajustar o enquadramento.
            </p>

            {/* Thumbnails list */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {photosList.map((photoUrl, idx) => {
                const rotation = photoRotations[idx] || 0;
                const fitMode = photoFits[idx] || 'cover';
                return (
                  <div 
                    key={idx} 
                    className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-square flex items-center justify-center shadow-xs"
                  >
                    <img
                      src={photoUrl}
                      alt={`Foto ${idx + 1}`}
                      className={`w-full h-full transition-all duration-300 ${
                        fitMode === 'contain' ? 'object-contain' : 'object-cover'
                      }`}
                      style={{ transform: `rotate(${rotation}deg)` }}
                    />
                    {idx === 0 && (
                      <span className="absolute bottom-2 left-2 bg-slate-900/90 text-amber-300 text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs border border-amber-400/30 z-10">
                        Capa Principal
                      </span>
                    )}
                    <div className="absolute top-2 right-2 flex items-center gap-1.5 z-10">
                      <button
                        type="button"
                        onClick={() => rotatePhoto(idx)}
                        className="p-1.5 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full transition-all shadow-sm cursor-pointer"
                        title="Girar imagem 90°"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleFit(idx)}
                        className="p-1.5 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full transition-all shadow-sm cursor-pointer"
                        title={fitMode === 'contain' ? 'Preencher card (cortar)' : 'Ajustar imagem inteira'}
                      >
                        {fitMode === 'contain' ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        className="p-1.5 bg-slate-900/80 hover:bg-rose-600 text-white rounded-full transition-all shadow-sm cursor-pointer"
                        title="Remover foto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Upload file button */}
              <label className="border-2 border-dashed border-slate-300 hover:border-slate-800 rounded-2xl aspect-square flex flex-col items-center justify-center cursor-pointer bg-[#FAF9F6] hover:bg-white transition-all p-3 text-center group">
                <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-slate-900 text-slate-500 group-hover:text-amber-300 flex items-center justify-center mb-2 transition-all">
                  <Plus className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-slate-950">
                  Carregar Imagem
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">Múltiplas fotos</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* DETALHAR O PRODUTO - LOGO ABAIXO DAS IMAGENS */}
          <div className="space-y-8 pt-2">
            <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Informações
                </h3>
                <p className="text-xs text-slate-500">
                  Preencha os dados de venda no atacado.
                </p>
              </div>
            </div>

              {/* Title & Price Section */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                    Título do Produto *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Conjunto Infantil Verão Linho e Algodão Premium"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                      Preço Principal (R$) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="38,90"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-orange-200 bg-white text-sm font-bold text-slate-900 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                      Valor c/ Desconto (R$)
                    </label>
                    <input
                      type="text"
                      placeholder="Opcional: 29,90"
                      value={discountPrice}
                      onChange={(e) => setDiscountPrice(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-slate-800 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                      Pedido Mínimo (peças) *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={minQuantity}
                      onChange={(e) => setMinQuantity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-orange-200 bg-white text-sm font-semibold focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                    Categoria *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryType)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm font-bold text-slate-800 focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  >
                    <option value="Feminino">Feminino</option>
                    <option value="Infantil">Infantil</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Calçados">Calçados</option>
                    <option value="Bolsas">Bolsas</option>
                    <option value="Pijama">Pijama</option>
                  </select>
                </div>
              </div>

              {/* INTERACTIVE COLOR SWATCHES ("bolinha com as cores") */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-amber-600" />
                    <span>Cores disponíveis</span>
                  </label>
                  <span className="text-[11px] font-bold text-slate-900">
                    {selectedColors.length} cor(es) selecionada(s)
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                  {AVAILABLE_COLORS.map((col) => {
                    const isSelected = selectedColors.includes(col.name);
                    return (
                      <button
                        type="button"
                        key={col.name}
                        onClick={() => toggleColor(col.name)}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-slate-900 bg-slate-900/5 shadow-xs ring-1 ring-slate-900 font-bold'
                            : 'border-slate-200 bg-[#FAF9F6] hover:bg-slate-100 hover:border-slate-300'
                        }`}
                      >
                        <div
                          className="w-5 h-5 rounded-full border border-slate-300/80 shrink-0 flex items-center justify-center transition-transform"
                          style={{ backgroundColor: col.hex }}
                        >
                          {isSelected && (
                            <Check className={`w-3 h-3 ${col.hex === '#ffffff' || col.hex === '#fafaf9' || col.hex === '#fbcfe8' ? 'text-slate-900' : 'text-white'}`} />
                          )}
                        </div>
                        <span className="text-xs font-semibold text-slate-800 truncate">
                          {col.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* INTERACTIVE SIZES SELECTION */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-amber-600" />
                    <span>Tamanhos na Grade *</span>
                  </label>
                  <span className="text-[11px] font-bold text-slate-900">
                    {selectedSizes.length} tamanho(s) marcado(s)
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_SIZES.map((size) => {
                    const isSelected = selectedSizes.includes(size);
                    return (
                      <button
                        type="button"
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-slate-900 text-amber-300 shadow-md scale-105 border border-amber-500/30'
                            : 'bg-[#FAF9F6] border border-slate-200 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mt-2 mb-1">
                    Proporção do Pacote Fechado
                  </label>
                  <input
                    type="text"
                    value={gradeRatio}
                    onChange={(e) => setGradeRatio(e.target.value)}
                    placeholder="Ex: 2x 2 anos • 2x 4 anos • 2x 6 anos • 1x 8 anos"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs text-slate-800 bg-[#FAF9F6]"
                  />
                </div>
              </div>

              {/* STORE INFO / CONFIGURATION */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Store className="w-4 h-4 text-amber-600" />
                    <span>Dados do Fabricante / Negócio do Produto</span>
                  </h4>

                  {allStores.length > 0 && (
                    <span className="text-[11px] font-semibold text-slate-500">
                      Selecione a loja para vincular esta peça
                    </span>
                  )}
                </div>

                {/* Dropdown de seleçao de loja */}
                {allStores.length > 0 && (
                  <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/80">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-900 mb-1.5">
                      Vincular Produto à Loja / Negócio:
                    </label>
                    <select
                      value={selectedStoreId}
                      onChange={(e) => handleStoreSelect(e.target.value)}
                      className="w-full px-3.5 py-2 bg-white rounded-xl border border-amber-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                    >
                      {allStores.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} — ({s.storeCode} • {s.region})
                        </option>
                      ))}
                      <option value="__NEW_STORE__">+ Criar Novo Negócio / Loja...</option>
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Nome da Confecção *
                    </label>
                    <input
                      type="text"
                      required
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      placeholder="Ex: Kids Club Atacado Brás"
                      className="w-full px-3.5 py-2.5 bg-[#FAF9F6] rounded-xl border border-slate-200 text-xs font-semibold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Endereço / Galeria *
                    </label>
                    <input
                      type="text"
                      required
                      value={storeCode}
                      onChange={(e) => setStoreCode(e.target.value)}
                      placeholder="Ex: Shopping Vautier • Loja 112"
                      className="w-full px-3.5 py-2.5 bg-[#FAF9F6] rounded-xl border border-slate-200 text-xs text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                      WhatsApp para Atacado *
                    </label>
                    <input
                      type="text"
                      required
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="5511997775544"
                      className="w-full px-3.5 py-2.5 bg-[#FAF9F6] rounded-xl border border-slate-200 text-xs font-bold text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-5 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsNewProductModalOpen(false)}
                  className="px-4 py-3 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs shadow-xl shadow-slate-900/20 transition-all flex items-center gap-2 border border-amber-500/30 hover:scale-[1.02] cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>Cadastrar e Concluir</span>
                </button>
              </div>
            </div>
        </form>
      </div>
    </div>
  );
};
