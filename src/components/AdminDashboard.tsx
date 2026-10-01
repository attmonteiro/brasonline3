import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Store, 
  Package, 
  Trash2, 
  Search, 
  TrendingUp, 
  CheckCircle, 
  Plus, 
  ExternalLink,
  Eye,
  Sparkles,
  MapPin,
  Star,
  ArrowLeft,
  Edit3,
  Building2,
  Phone,
  Layers,
  RotateCcw,
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  X,
  Check,
  ArrowUp,
  ArrowDown,
  Palette,
  Power,
  Sliders,
  SlidersHorizontal,
  CheckCircle2,
  Monitor,
  Megaphone,
  Clock
} from 'lucide-react';
import { Supplier, CategoryCoverItem, HeroBannerItem, CategoryType } from '../types';
import { BrandLogo } from './BrandLogo';

const BANNER_PRESETS = [
  { name: 'Moda Feminina & Vestidos', url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop&q=85' },
  { name: 'Alfaiataria & Conjuntos', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=85' },
  { name: 'Moda Masculina & Camisaria', url: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&auto=format&fit=crop&q=85' },
  { name: 'Calçados & Sapatos Atacado', url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1600&auto=format&fit=crop&q=85' },
  { name: 'Jeanswear & Bolsas', url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1600&auto=format&fit=crop&q=85' },
  { name: 'Moda Fitness & Poliamida', url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1600&auto=format&fit=crop&q=85' },
];

const HEADER_COLOR_PRESETS = [
  { name: 'Vermelho Brás Oficial', hex: '#E8442B' },
  { name: 'Vermelho Intenso Varejo', hex: '#D32F2F' },
  { name: 'Vermelho Carmim Nobre', hex: '#C62828' },
  { name: 'Vermelho Fogo Dinâmico', hex: '#E51D24' },
  { name: 'Bordeaux / Vinho Elegante', hex: '#991B1B' },
  { name: 'Coral Vibrante', hex: '#F97316' },
];

const COVER_PRESETS = [
  { name: 'Feminino 1', url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80' },
  { name: 'Feminino 2', url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80' },
  { name: 'Masculino 1', url: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&auto=format&fit=crop&q=80' },
  { name: 'Masculino 2', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80' },
  { name: 'Infantil 1', url: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format&fit=crop&q=80' },
  { name: 'Infantil 2', url: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&auto=format&fit=crop&q=80' },
  { name: 'Acessórios', url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80' },
  { name: 'Bolsas', url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80' },
  { name: 'Calçados 1', url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80' },
  { name: 'Calçados 2', url: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80' },
];

export const AdminDashboard: React.FC = () => {
  const { 
    products, 
    deleteProduct, 
    updateProduct, 
    setIsNewProductModalOpen, 
    openCreateStoreModal,
    setSelectedProduct,
    setActiveTab,
    currentUser,
    allStores,
    selectedAdminStore,
    setSelectedAdminStore,
    setTargetStoreForNewProduct,
    deleteStore,
    categoryCovers,
    updateCategoryCover,
    resetCategoryCovers,
    heroBanners,
    addHeroBanner,
    updateHeroBanner,
    deleteHeroBanner,
    reorderHeroBanners,
    resetHeroBanners,
    siteDesignSettings,
    updateSiteDesignSettings,
    setFilter
  } = useApp();

  const [searchFilter, setSearchFilter] = useState('');
  const [activeSection, setActiveSection] = useState<'stores' | 'products' | 'design' | 'stats'>('stores');
  const [designSubTab, setDesignSubTab] = useState<'banners' | 'header' | 'categories' | 'announcements' | 'preview'>('banners');
  
  // Estados para Banners e Design do Site
  const [isAddingBanner, setIsAddingBanner] = useState(false);
  const [editingBanner, setEditingBanner] = useState<HeroBannerItem | null>(null);
  const [bannerForm, setBannerForm] = useState({
    title: '',
    imageUrl: '',
    linkType: 'category' as 'category' | 'search' | 'url' | 'whatsapp',
    linkValue: 'Feminino',
    active: true,
  });
  const [bannerToast, setBannerToast] = useState('');

  const showBannerToast = (msg: string) => {
    setBannerToast(msg);
    setTimeout(() => setBannerToast(''), 3500);
  };

  const handleOpenNewBanner = () => {
    setEditingBanner(null);
    setBannerForm({
      title: '',
      imageUrl: '',
      linkType: 'category',
      linkValue: 'Feminino',
      active: true,
    });
    setIsAddingBanner(true);
  };

  const handleOpenEditBanner = (banner: HeroBannerItem) => {
    setEditingBanner(banner);
    setBannerForm({
      title: banner.title,
      imageUrl: banner.imageUrl,
      linkType: banner.linkType,
      linkValue: banner.linkValue,
      active: banner.active,
    });
    setIsAddingBanner(true);
  };

  const handleBannerImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setBannerForm(prev => ({ ...prev, imageUrl: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerForm.imageUrl.trim()) {
      alert('Por favor, carregue uma imagem ou informe a URL do banner.');
      return;
    }

    if (editingBanner) {
      updateHeroBanner(editingBanner.id, {
        title: bannerForm.title || 'Banner Promocional',
        imageUrl: bannerForm.imageUrl,
        linkType: bannerForm.linkType,
        linkValue: bannerForm.linkValue,
        active: bannerForm.active,
      });
      showBannerToast('Banner atualizado com sucesso!');
    } else {
      addHeroBanner({
        title: bannerForm.title || `Banner ${heroBanners.length + 1}`,
        imageUrl: bannerForm.imageUrl,
        linkType: bannerForm.linkType,
        linkValue: bannerForm.linkValue,
        active: bannerForm.active,
        order: heroBanners.length + 1,
      });
      showBannerToast('Novo banner adicionado à loja!');
    }
    setIsAddingBanner(false);
    setEditingBanner(null);
  };

  const handleDeleteBanner = (id: string, title: string) => {
    if (window.confirm(`Tem certeza que deseja remover o banner "${title}"?`)) {
      deleteHeroBanner(id);
      showBannerToast('Banner removido com sucesso.');
    }
  };

  const handleMoveBanner = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= heroBanners.length) return;
    const updated = [...heroBanners];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    reorderHeroBanners(updated);
    showBannerToast('Ordem dos banners atualizada!');
  };

  const handleToggleBannerActive = (banner: HeroBannerItem) => {
    updateHeroBanner(banner.id, { active: !banner.active });
    showBannerToast(banner.active ? 'Banner pausado.' : 'Banner ativado na loja!');
  };

  const handleTestBannerRedirect = (banner: HeroBannerItem) => {
    if (banner.linkType === 'category') {
      setFilter('category', (banner.linkValue as CategoryType) || 'Todas');
      setActiveTab('catalog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (banner.linkType === 'search') {
      setFilter('searchQuery', banner.linkValue);
      setActiveTab('catalog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (banner.linkType === 'whatsapp') {
      const clean = (banner.linkValue || '5511991234567').replace(/\D/g, '');
      window.open(`https://wa.me/${clean}?text=Olá! Vim pelo Brás Online.`, '_blank');
    } else if (banner.linkType === 'url') {
      if (banner.linkValue.startsWith('http')) {
        window.open(banner.linkValue, '_blank');
      } else {
        window.location.href = banner.linkValue;
      }
    }
  };
  
  const [editingCategory, setEditingCategory] = useState<CategoryCoverItem | null>(null);
  const [editCategoryForm, setEditCategoryForm] = useState({
    label: '',
    subtitle: '',
    imageUrl: '',
  });

  const handleOpenEditCategory = (item: CategoryCoverItem) => {
    setEditingCategory(item);
    setEditCategoryForm({
      label: item.label,
      subtitle: item.subtitle,
      imageUrl: item.imageUrl,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setEditCategoryForm(prev => ({ ...prev, imageUrl: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCategoryCover = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    updateCategoryCover(editingCategory.category, {
      label: editCategoryForm.label,
      subtitle: editCategoryForm.subtitle,
      imageUrl: editCategoryForm.imageUrl,
    });
    setEditingCategory(null);
  };

  // Compute platform metrics
  const totalProducts = products.length;
  const infantProducts = products.filter(p => p.category === 'Moda Infantil').length;
  const readyDeliveryCount = products.filter(p => p.readyDelivery).length;

  const filteredProducts = products.filter(p => {
    if (!p) return false;
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      (p.title || '').toLowerCase().includes(q) ||
      (p.supplier?.name || '').toLowerCase().includes(q) ||
      (p.category || '').toLowerCase().includes(q) ||
      (p.region || '').toLowerCase().includes(q)
    );
  });

  const filteredStores = allStores.filter(s => {
    if (!s) return false;
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      (s.name || '').toLowerCase().includes(q) ||
      (s.storeCode || '').toLowerCase().includes(q) ||
      (s.region || '').toLowerCase().includes(q) ||
      (s.category && s.category.toLowerCase().includes(q))
    );
  });

  const toggleFeatured = (id: string) => {
    const target = products.find(p => p && p.id === id);
    if (target) {
      updateProduct({
        ...target,
        isFeatured: !target.isFeatured
      });
    }
  };

  const handleAddProductForStore = (store: Supplier | null) => {
    setTargetStoreForNewProduct(store);
    setIsNewProductModalOpen(true);
  };

  // Filter products for currently selected admin store session
  const storeProducts = selectedAdminStore 
    ? products.filter(p => p && p.supplier && (p.supplier.id === selectedAdminStore.id || p.supplier.name === selectedAdminStore.name))
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-[#0B1B33] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-700/60 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Painel Administrativo - Gestão Multi-Negócios</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Painel do Administrador Geral
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Bem-vindo{currentUser?.name ? `, ${currentUser.name}` : ''}. Crie e gerencie negócios/lojas, cadastre peças e acompanhe todo o portal de atacado.
          </p>
        </div>

        {/* Dual CTA: Criar Loja vs Cadastrar Produto */}
        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          <button
            onClick={openCreateStoreModal}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition-all hover:scale-105 cursor-pointer border border-amber-300"
          >
            <Building2 className="w-4 h-4" />
            <span>Criar Nova Loja / Negócio</span>
          </button>

          <button
            onClick={() => handleAddProductForStore(selectedAdminStore)}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition-all hover:scale-105 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Cadastrar Produto</span>
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className="inline-flex items-center gap-2 px-3.5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-all border border-white/10 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>Ver Vitrine</span>
          </button>
        </div>
      </div>

      {/* SESSÃO INDIVIDUAL DO NEGÓCIO SELECIONADO */}
      {selectedAdminStore ? (
        <div className="mb-10 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden animate-fadeIn">
          {/* Botão de Voltar */}
          <button
            onClick={() => setSelectedAdminStore(null)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all mb-6 cursor-pointer border border-slate-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Voltar para Lista de Todos os Negócios</span>
          </button>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-400 text-slate-950 font-black text-2xl flex items-center justify-center shrink-0 shadow-lg">
                <Store className="w-8 h-8 text-slate-950" />
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-[11px] font-bold uppercase tracking-wider mb-1.5 border border-purple-500/30">
                  <Building2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Sessão do Negócio Gerenciado</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
                  {selectedAdminStore.name}
                  {selectedAdminStore.verified && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Verificado
                    </span>
                  )}
                </h2>

                <p className="text-xs text-slate-300 mt-1 font-medium flex flex-wrap items-center gap-3">
                  <span className="flex items-center gap-1 text-amber-300 font-bold">
                    <Store className="w-3.5 h-3.5" />
                    {selectedAdminStore.storeCode}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {selectedAdminStore.address}
                  </span>
                </p>
              </div>
            </div>

            {/* Ações do Negócio */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => handleAddProductForStore(selectedAdminStore)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Adicionar Produto para esta Loja</span>
              </button>

              <button
                onClick={openCreateStoreModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer border border-slate-700"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                <span>Editar Loja</span>
              </button>

              <button
                onClick={() => {
                  if (confirm(`Remover a loja "${selectedAdminStore.name}" e seus produtos?`)) {
                    deleteStore(selectedAdminStore.id);
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-bold transition-all cursor-pointer border border-rose-500/30"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                <span>Remover Negócio</span>
              </button>
            </div>
          </div>

          {/* Produtos Cadastrados Desta Loja */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Package className="w-4 h-4 text-emerald-400" />
                <span>Produtos Cadastrados nesta Loja ({storeProducts.length})</span>
              </h3>
              <span className="text-xs text-slate-400">
                Gerencie as peças exclusivas de {selectedAdminStore.name}
              </span>
            </div>

            {storeProducts.length === 0 ? (
              <div className="text-center py-10 bg-slate-950/60 rounded-2xl border border-dashed border-slate-800 p-6">
                <Package className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-300">
                  Esta loja ainda não possui produtos cadastrados.
                </p>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  Clique no botão abaixo para adicionar a primeira peça para {selectedAdminStore.name}.
                </p>
                <button
                  onClick={() => handleAddProductForStore(selectedAdminStore)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Cadastrar Primeiro Produto Desta Loja</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {storeProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 hover:border-emerald-500/50 transition-all flex items-start gap-3 relative group"
                  >
                    <img
                      src={prod.imageUrl}
                      alt={prod.title}
                      className="w-16 h-20 rounded-xl object-cover bg-slate-900 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white text-xs line-clamp-1">{prod.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{prod.category}</p>
                      <div className="mt-2 font-black text-emerald-400 text-sm">
                        R$ {(Number(prod.price) || 0).toFixed(2).replace('.', ',')}
                        <span className="text-[10px] text-slate-400 font-normal ml-1">
                          (Mín. {prod.minQuantity} pçs)
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-800/80">
                        <button
                          onClick={() => setSelectedProduct(prod)}
                          className="text-[11px] font-bold text-orange-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Ver Ficha</span>
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Remover "${prod.title}"?`)) {
                              deleteProduct(prod.id);
                            }
                          }}
                          className="text-[11px] font-bold text-rose-400 hover:underline flex items-center gap-1 ml-auto cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Excluir</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}

      {/* Stats Quick Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Lojas & Negócios</span>
            <Building2 className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{allStores.length}</div>
          <p className="text-xs text-slate-500 mt-1 font-medium">Empresas e confecções cadastradas</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total de Produtos</span>
            <Package className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{totalProducts}</div>
          <p className="text-xs text-slate-500 mt-1 font-medium">Peças ativas em catálogo</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Moda Infantil</span>
            <Sparkles className="w-5 h-5 text-pink-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{infantProducts}</div>
          <p className="text-xs text-slate-500 mt-1 font-medium">Conjuntos e peças infantis</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Pronta Entrega</span>
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{readyDeliveryCount}</div>
          <p className="text-xs text-slate-500 mt-1 font-medium">Envio imediato de pedidos</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 mb-6 pb-3 overflow-x-auto">
        <button
          onClick={() => {
            setActiveSection('stores');
            setSelectedAdminStore(null);
          }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeSection === 'stores' && !selectedAdminStore
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-4 h-4 text-amber-400" />
          <span>Lista de Negócios / Lojas ({allStores.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveSection('products');
            setSelectedAdminStore(null);
          }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeSection === 'products'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Todos os Produtos ({totalProducts})</span>
        </button>

        <button
          onClick={() => {
            setActiveSection('design');
            setSelectedAdminStore(null);
          }}
          className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeSection === 'design'
              ? 'bg-[#E8442B] text-white shadow-sm ring-2 ring-[#E8442B]/30'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Design & Identidade Visual</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
            activeSection === 'design' ? 'bg-white/25 text-white' : 'bg-[#E8442B]/10 text-[#E8442B]'
          }`}>
            Menu Completo
          </span>
        </button>

        <button
          onClick={() => {
            setActiveSection('stats');
            setSelectedAdminStore(null);
          }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeSection === 'stats'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Métricas do Sistema</span>
        </button>
      </div>

      {/* LISTA DE NEGÓCIOS / LOJAS CADASTRADAS */}
      {activeSection === 'stores' && !selectedAdminStore && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-500" />
                <span>Lista Geral de Negócios / Lojas ({allStores.length})</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Clique no nome do negócio para abrir sua sessão exclusiva e cadastrar produtos diretamente para ele.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar negócio ou região..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                />
              </div>

              <button
                onClick={openCreateStoreModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs cursor-pointer shrink-0 border border-amber-300"
              >
                <Plus className="w-4 h-4" />
                <span>Nova Loja</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredStores.map((sup) => (
              <div
                key={sup.id}
                className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-amber-400 hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      {/* Nome do Negocio com Acao de Abrir Sessao */}
                      <button
                        onClick={() => setSelectedAdminStore(sup)}
                        className="font-black text-slate-900 text-base text-left hover:text-[#FF5A00] transition-colors flex items-center gap-1.5 cursor-pointer group-hover:underline"
                        title="Clique para gerenciar a sessão desta loja"
                      >
                        <Store className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>{sup.name}</span>
                      </button>

                      <p className="text-xs text-slate-500 mt-1 font-medium">{sup.storeCode}</p>
                    </div>

                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 text-amber-700 font-bold text-xs shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{sup.rating || '5.0'}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{sup.address}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-semibold text-slate-800">
                        {sup.totalProducts || 0} peças no catálogo
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/80 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                      {sup.region}
                    </span>
                    <a
                      href={`https://wa.me/${sup.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:underline"
                    >
                      <Phone className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  </div>

                  {/* Acoes rapidas da loja */}
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      onClick={() => setSelectedAdminStore(sup)}
                      className="w-full py-2 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] text-center transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1"
                    >
                      <Layers className="w-3.5 h-3.5 text-amber-400" />
                      <span>Abrir Sessão →</span>
                    </button>

                    <button
                      onClick={() => handleAddProductForStore(sup)}
                      className="w-full py-2 px-2.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-extrabold text-[11px] text-center transition-all cursor-pointer border border-emerald-300 flex items-center justify-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Produto</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRODUCTS MODERATION SECTION */}
      {activeSection === 'products' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Catálogo Geral de Produtos Atacado
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Gerencie fotos, preços de atacado, destaques e remova itens em desacordo.
              </p>
            </div>

            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar produto, loja ou categoria..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl">
              <Package className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-600">Nenhum produto encontrado na busca.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/50">
                    <th className="py-3 px-4">Produto</th>
                    <th className="py-3 px-4">Categoria</th>
                    <th className="py-3 px-4">Polo / Região</th>
                    <th className="py-3 px-4">Preço Atacado</th>
                    <th className="py-3 px-4">Fornecedor</th>
                    <th className="py-3 px-4">Destaque VIP</th>
                    <th className="py-3 px-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.imageUrl}
                            alt={prod.title}
                            className="w-11 h-11 rounded-lg object-cover bg-slate-100 shrink-0"
                          />
                          <div>
                            <div className="font-bold text-slate-900 line-clamp-1 max-w-xs">
                              {prod.title}
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              Mínimo: {prod.minQuantity} pçs
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                          {prod.category}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          {prod.region}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        R$ {(Number(prod.price) || 0).toFixed(2).replace('.', ',')}
                      </td>

                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => {
                            const storeObj = allStores.find(s => s.id === prod.supplier?.id || s.name === prod.supplier?.name) || prod.supplier;
                            if (storeObj) setSelectedAdminStore(storeObj);
                          }}
                          className="font-bold text-slate-800 hover:text-[#FF5A00] text-left hover:underline cursor-pointer"
                        >
                          {prod.supplier?.name || 'Fornecedor'}
                        </button>
                        <div className="text-[10px] text-slate-400">{prod.supplier?.storeCode || ''}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => toggleFeatured(prod.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                            prod.isFeatured
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                        >
                          <Star className={`w-3.5 h-3.5 ${prod.isFeatured ? 'fill-amber-500 text-amber-500' : ''}`} />
                          <span>{prod.isFeatured ? 'Destaque VIP' : 'Padrão'}</span>
                        </button>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedProduct(prod)}
                            className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                            title="Ver Detalhes / Ficha"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Remover produto "${prod.title}" do atacado?`)) {
                                deleteProduct(prod.id);
                              }
                            }}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Remover Produto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* SEÇÃO COMPLETA: DESIGN & IDENTIDADE VISUAL DA LOJA */}
      {activeSection === 'design' && (
        <div className="space-y-6">
          
          {/* Toast de Feedback */}
          {bannerToast && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-fadeIn shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{bannerToast}</span>
            </div>
          )}

          {/* CABEÇALHO DO MÓDULO DE DESIGN & SUB-MENU DE NAVEGAÇÃO ORGANIZADO */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FDF1EC] text-[#E8442B] flex items-center justify-center shrink-0 shadow-xs">
                  <Palette className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-black text-slate-900">
                      Central de Design & Identidade Visual
                    </h2>
                    <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      Edição em Tempo Real
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Ambiente organizado para customizar banners 100% visuais, o tom de vermelho do menu superior, capas dos departamentos e comunicados.
                  </p>
                </div>
              </div>

              {/* Ações Rápidas Globais */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Deseja restaurar as configurações padrão de design da loja?')) {
                      resetHeroBanners();
                      resetCategoryCovers();
                      updateSiteDesignSettings({
                        headerColor: '#E8442B',
                        bannerAutoplayInterval: 5,
                        announcementActive: false,
                      });
                      showBannerToast('Configurações originais de design restauradas com sucesso!');
                    }
                  }}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Restaurar Configurações Originais"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restaurar Tudo Padrão</span>
                </button>
              </div>
            </div>

            {/* BARRA DE SUB-MENU COMPLETO & ORGANIZADO */}
            <div className="flex items-center gap-2 overflow-x-auto pt-1 scrollbar-none">
              <button
                type="button"
                onClick={() => setDesignSubTab('banners')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  designSubTab === 'banners'
                    ? 'bg-[#E8442B] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Banners Iniciais ({heroBanners.length})</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  designSubTab === 'banners' ? 'bg-white/20 text-white' : 'bg-white text-slate-700'
                }`}>
                  {heroBanners.filter(b => b.active !== false).length} ativos
                </span>
              </button>

              <button
                type="button"
                onClick={() => setDesignSubTab('header')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  designSubTab === 'header'
                    ? 'bg-[#E8442B] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Palette className="w-4 h-4" />
                <span>Menu do Topo & Cores</span>
                <span 
                  className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0" 
                  style={{ backgroundColor: siteDesignSettings.headerColor || '#E8442B' }} 
                />
              </button>

              <button
                type="button"
                onClick={() => setDesignSubTab('categories')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  designSubTab === 'categories'
                    ? 'bg-[#E8442B] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Capas de Departamentos ({categoryCovers.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setDesignSubTab('announcements')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  designSubTab === 'announcements'
                    ? 'bg-[#E8442B] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Megaphone className="w-4 h-4" />
                <span>Faixa de Comunicados</span>
                {siteDesignSettings.announcementActive && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setDesignSubTab('preview')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  designSubTab === 'preview'
                    ? 'bg-[#14213D] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span>Simulador da Vitrine</span>
              </button>
            </div>
          </div>

          {/* SUB-MENU 1: BANNERS INICIAIS DO CARROSSEL */}
          {designSubTab === 'banners' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-[#E8442B]" />
                    <span>Gerenciador de Banners do Carrossel</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Os banners são compostos exclusivamente por imagens limpas (sem textos adicionais), 100% clicáveis e com destino personalizado.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Deseja restaurar os banners padrão da plataforma?')) {
                        resetHeroBanners();
                        showBannerToast('Banners originais restaurados com sucesso.');
                      }
                    }}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Restaurar Banners Originais"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Restaurar Banners</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenNewBanner}
                    className="px-4 py-2.5 rounded-xl bg-[#E8442B] hover:bg-[#d03a22] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Carregar Novo Banner</span>
                  </button>
                </div>
              </div>

              {/* Grade de Banners */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {heroBanners.map((banner, index) => (
                  <div 
                    key={banner.id}
                    className={`rounded-2xl border transition-all overflow-hidden flex flex-col justify-between ${
                      banner.active !== false 
                        ? 'border-slate-200 bg-white hover:border-[#E8442B]/40 shadow-xs' 
                        : 'border-slate-200 bg-slate-50/70 opacity-60'
                    }`}
                  >
                    {/* Imagem do Banner */}
                    <div className="relative h-40 sm:h-44 w-full bg-slate-100 overflow-hidden border-b border-slate-100">
                      <img 
                        src={banner.imageUrl} 
                        alt={banner.title} 
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Badge de Ordem e Status */}
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] font-black px-2 py-0.5 rounded-md">
                          #{index + 1}
                        </span>
                        {banner.active !== false ? (
                          <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                            ATIVO
                          </span>
                        ) : (
                          <span className="bg-slate-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                            PAUSADO
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleTestBannerRedirect(banner)}
                        className="absolute top-2.5 right-2.5 bg-black/60 hover:bg-[#E8442B] text-white text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-xs flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
                        title="Testar Redirecionamento do Banner"
                      >
                        <span>Testar Clique</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Informações e Destino */}
                    <div className="p-4 space-y-3">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 truncate">
                          {banner.title || `Banner #${index + 1}`}
                        </h4>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                          <LinkIcon className="w-3 h-3 text-[#E8442B]" />
                          <span>Ação ao clicar: </span>
                          <strong className="text-slate-700 capitalize">
                            {banner.linkType === 'category' ? `Categoria "${banner.linkValue}"` :
                             banner.linkType === 'search' ? `Busca "${banner.linkValue}"` :
                             banner.linkType === 'whatsapp' ? `WhatsApp: ${banner.linkValue}` :
                             banner.linkValue}
                          </strong>
                        </div>
                      </div>

                      {/* Controles de Ordem e Edição */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => handleMoveBanner(index, 'up')}
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                            title="Mover para cima"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={index === heroBanners.length - 1}
                            onClick={() => handleMoveBanner(index, 'down')}
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                            title="Mover para baixo"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleToggleBannerActive(banner)}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                              banner.active !== false 
                                ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200' 
                                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                            }`}
                            title={banner.active !== false ? 'Pausar Banner' : 'Ativar Banner'}
                          >
                            <Power className="w-3.5 h-3.5" />
                            <span>{banner.active !== false ? 'Pausar' : 'Ativar'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleOpenEditBanner(banner)}
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                            title="Editar Banner"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteBanner(banner.id, banner.title)}
                            className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Excluir Banner"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Rotação e Velocidade do Carrossel */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#E8442B]" />
                    <span>Velocidade de Transição Automática do Carrossel</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Tempo de exibição de cada imagem antes de avançar para a próxima.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {[3, 5, 7, 10].map((sec) => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => {
                        updateSiteDesignSettings({ bannerAutoplayInterval: sec });
                        showBannerToast(`Velocidade alterada para ${sec} segundos.`);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        (siteDesignSettings.bannerAutoplayInterval || 5) === sec
                          ? 'bg-[#E8442B] text-white shadow-xs'
                          : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {sec}s {sec === 5 && '(Padrão)'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUB-MENU 2: MENU DO TOPO & CORES DA MARCA */}
          {designSubTab === 'header' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-[#E8442B]" />
                  <span>Personalização do Menu Superior & Tons de Vermelho</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  O menu do topo agora ocupa diretamente a área superior (sem rodapé extra), mantendo o alto contraste com a logo oficial branca e busca integrada.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Seletor de Tons */}
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
                      Tons de Vermelho da Marca
                    </label>
                    <p className="text-[11px] text-slate-500 mb-3">
                      Selecione um tom calibrado para moda e comércio atacadista:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {HEADER_COLOR_PRESETS.map((preset) => (
                        <button
                          key={preset.hex}
                          type="button"
                          onClick={() => {
                            updateSiteDesignSettings({ headerColor: preset.hex });
                            showBannerToast(`Tom de vermelho alterado para ${preset.name}!`);
                          }}
                          className={`p-3 rounded-xl border flex items-center gap-3 text-left transition-all cursor-pointer ${
                            (siteDesignSettings.headerColor || '#E8442B') === preset.hex 
                              ? 'border-slate-900 ring-2 ring-slate-900 bg-orange-50/30' 
                              : 'border-slate-200 bg-white hover:border-slate-400'
                          }`}
                        >
                          <span 
                            className="w-6 h-6 rounded-full shrink-0 border border-black/20 shadow-xs" 
                            style={{ backgroundColor: preset.hex }} 
                          />
                          <div>
                            <span className="text-xs font-bold text-slate-900 block">
                              {preset.name}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {preset.hex}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Seletor Livre Hexadecimal */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input 
                        type="color" 
                        value={siteDesignSettings.headerColor || '#E8442B'}
                        onChange={(e) => updateSiteDesignSettings({ headerColor: e.target.value })}
                        className="w-10 h-10 rounded-xl cursor-pointer border border-slate-300 shadow-xs"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">Cor Personalizada</span>
                        <span className="text-xs font-mono font-bold text-[#E8442B]">
                          {siteDesignSettings.headerColor || '#E8442B'}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        updateSiteDesignSettings({ headerColor: '#E8442B' });
                        showBannerToast('Tom padrão #E8442B restaurado!');
                      }}
                      className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
                    >
                      Restaurar Padrão
                    </button>
                  </div>
                </div>

                {/* Pré-visualização Ao Vivo do Menu */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                    Pré-visualização Ao Vivo do Menu
                  </label>

                  <div className="rounded-2xl overflow-hidden border border-slate-300 shadow-md">
                    {/* Faixa de aviso simulada se ativa */}
                    {siteDesignSettings.announcementActive && (
                      <div 
                        style={{ backgroundColor: siteDesignSettings.announcementBg || '#14213D' }}
                        className="text-white text-[10px] py-1 px-3 text-center font-medium"
                      >
                        {siteDesignSettings.announcementText || 'Aviso da loja atacadista'}
                      </div>
                    )}

                    {/* Barra Branca Principal com Menu em Times New Roman */}
                    <div className="p-3 bg-white border-b border-gray-200 text-gray-800 flex items-center justify-between gap-3 transition-colors">
                      <div className="shrink-0 scale-90 origin-left">
                        <BrandLogo variant="light" size="sm" />
                      </div>

                      <div className="hidden sm:flex flex-1 items-center justify-between px-3 text-xs text-gray-700">
                        <span className="text-[#E8442B] font-bold">Início</span>
                        <span>Categorias ▼</span>
                        <span>Fornecedores ▼</span>
                        <span>Sobre Nós ▼</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-700">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600" title="Pesquisa">
                          <Search className="w-3 h-3" />
                        </div>
                        <div className="w-5 h-5 rounded-full bg-[#E8442B] text-white flex items-center justify-center text-[10px] font-bold">
                          1
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 text-[11px] text-slate-500 border-t border-slate-200 flex items-center justify-between">
                      <span>Visualização responsiva no topo</span>
                      <span className="text-emerald-700 font-bold">Pronto para publicação</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* SUB-MENU 3: CAPAS DAS CATEGORIAS */}
          {designSubTab === 'categories' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[#E8442B]" />
                    <span>Capas dos Departamentos & Categorias</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Personalize as imagens, títulos e subtítulos de cada departamento exibido para os compradores na vitrine.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      if (confirm('Deseja restaurar todas as capas das categorias para o padrão inicial do sistema?')) {
                        resetCategoryCovers();
                        showBannerToast('Capas de categorias restauradas com sucesso.');
                      }
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer border border-slate-200"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restaurar Capas Padrão</span>
                  </button>
                </div>
              </div>

              {/* Grid de Capas */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {categoryCovers.map((item) => (
                  <div
                    key={item.category}
                    className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 transition-all hover:shadow-md hover:border-slate-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 bg-slate-900 text-white rounded-lg">
                          {item.category}
                        </span>
                        <button
                          onClick={() => handleOpenEditCategory(item)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#E8442B] hover:underline cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Alterar Capa</span>
                        </button>
                      </div>

                      {/* Box de Preview */}
                      <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-slate-200 border border-slate-200 shadow-xs mb-3 group">
                        <img
                          src={item.imageUrl}
                          alt={item.label}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        <div className="absolute bottom-2.5 left-3 right-3 text-white">
                          <h4 className="text-sm font-extrabold drop-shadow-sm">{item.label}</h4>
                          <p className="text-[11px] text-slate-200 line-clamp-1">{item.subtitle}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="truncate max-w-[180px]" title={item.imageUrl}>
                        {item.imageUrl.startsWith('data:image') ? 'Upload Próprio' : 'Foto em Alta'}
                      </span>
                      <button
                        onClick={() => handleOpenEditCategory(item)}
                        className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 font-bold text-[11px] transition-all cursor-pointer shrink-0 shadow-xs"
                      >
                        Editar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-MENU 4: FAIXA DE COMUNICADOS / AVISOS */}
          {designSubTab === 'announcements' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-[#E8442B]" />
                  <span>Faixa de Avisos & Comunicados no Topo</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Exiba um comunicado fixo acima do menu (como avisos de frete especial, feriados no Brás ou lançamentos).
                </p>
              </div>

              <div className="max-w-2xl space-y-5">
                {/* Ativar/Desativar */}
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Exibir Faixa de Comunicado
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Quando ativado, aparece discretamente fixada no topo de todas as páginas.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      updateSiteDesignSettings({ announcementActive: !siteDesignSettings.announcementActive });
                      showBannerToast(siteDesignSettings.announcementActive ? 'Faixa desativada.' : 'Faixa de comunicado ativada!');
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      siteDesignSettings.announcementActive
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    <Power className="w-4 h-4" />
                    <span>{siteDesignSettings.announcementActive ? 'Ativada' : 'Desativada'}</span>
                  </button>
                </div>

                {/* Texto do Comunicado */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Texto do Comunicado
                  </label>
                  <input
                    type="text"
                    value={siteDesignSettings.announcementText || ''}
                    onChange={(e) => updateSiteDesignSettings({ announcementText: e.target.value })}
                    placeholder="Ex: Frete especial direto do polo do Brás para todo o Brasil!"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-[#E8442B] outline-none"
                  />
                </div>

                {/* Cor de Fundo da Faixa */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-2">
                    Cor de Fundo da Faixa
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: 'Azul Escuro Noturno', hex: '#14213D' },
                      { name: 'Preto Grafite', hex: '#111827' },
                      { name: 'Vermelho Carmim', hex: '#991B1B' },
                      { name: 'Dourado / Ouro', hex: '#B45309' },
                      { name: 'Verde Floresta', hex: '#065F46' },
                    ].map((preset) => (
                      <button
                        key={preset.hex}
                        type="button"
                        onClick={() => updateSiteDesignSettings({ announcementBg: preset.hex })}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                          (siteDesignSettings.announcementBg || '#14213D') === preset.hex
                            ? 'border-slate-900 bg-white ring-2 ring-slate-900'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: preset.hex }} />
                        <span>{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview da Faixa */}
                <div className="pt-2">
                  <label className="text-xs font-bold text-slate-700 block mb-2">
                    Demonstração da Faixa
                  </label>
                  <div 
                    style={{ backgroundColor: siteDesignSettings.announcementBg || '#14213D' }}
                    className="text-white text-xs py-2 px-4 rounded-xl text-center font-medium shadow-xs"
                  >
                    {siteDesignSettings.announcementText || 'Digite o texto acima...'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SUB-MENU 5: SIMULADOR / PREVIEW DA VITRINE */}
          {designSubTab === 'preview' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-[#E8442B]" />
                  <span>Simulador Interativo da Vitrine</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Veja exatamente como os compradores veem a combinação do menu no tom de vermelho, o aviso superior e o carrossel de imagens limpas.
                </p>
              </div>

              {/* Moldura de Tela */}
              <div className="border border-slate-300 rounded-3xl overflow-hidden shadow-xl bg-slate-100 max-w-4xl mx-auto">
                {/* Barra do Navegador */}
                <div className="bg-slate-200 px-4 py-2.5 flex items-center gap-2 border-b border-slate-300">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex-1 bg-white rounded-md text-[11px] text-slate-500 px-3 py-0.5 text-center truncate">
                    https://brasonline.com.br
                  </div>
                </div>

                {/* Conteúdo Renderizado */}
                <div className="bg-[#F8FAFC]">
                  {/* Faixa de Comunicado */}
                  {siteDesignSettings.announcementActive && siteDesignSettings.announcementText && (
                    <div 
                      style={{ backgroundColor: siteDesignSettings.announcementBg || '#14213D' }}
                      className="text-white text-[10px] py-1 px-3 text-center font-medium"
                    >
                      {siteDesignSettings.announcementText}
                    </div>
                  )}

                  {/* Header Vermelho */}
                  <div 
                    style={{ backgroundColor: siteDesignSettings.headerColor || '#E8442B' }}
                    className="text-white p-3 sm:px-6 flex items-center justify-between gap-3 shadow-md"
                  >
                    <BrandLogo variant="on-red" size="sm" />
                    <div className="flex-1 max-w-sm bg-white rounded-md h-7 px-2.5 flex items-center justify-between shadow-2xs">
                      <span className="text-[10px] text-gray-400">O que você procura no atacado?</span>
                      <Search className="w-3 h-3 text-[#14213D]" />
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-white">
                      <span>Favoritos (0)</span>
                      <span>Carrinho (0)</span>
                    </div>
                  </div>

                  {/* Banner Carrossel Simulado */}
                  <div className="p-4 sm:p-6">
                    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm relative h-48 sm:h-64 bg-slate-200">
                      {heroBanners.filter(b => b.active !== false)[0] ? (
                        <img 
                          src={heroBanners.filter(b => b.active !== false)[0].imageUrl} 
                          alt="Banner Simulado" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                          Nenhum banner ativo no momento
                        </div>
                      )}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-xs px-2 py-0.5 rounded-full flex gap-1">
                        <div className="w-4 h-1 rounded-full bg-white" />
                        <div className="w-1.5 h-1 rounded-full bg-white/50" />
                        <div className="w-1.5 h-1 rounded-full bg-white/50" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODAL DE EDIÇÃO DE CAPA DA CATEGORIA */}
          {editingCategory && (
            <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
              <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden border border-slate-200 my-8">
                {/* Modal Header */}
                <div className="bg-[#0B1B33] text-white p-6 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-[#FFE066] uppercase tracking-wider block mb-0.5">
                      Edição de Categoria
                    </span>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-[#FFE066]" />
                      <span>Alterar Capa de "{editingCategory.category}"</span>
                    </h3>
                  </div>
                  <button
                    onClick={() => setEditingCategory(null)}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleSaveCategoryCover} className="p-6 space-y-5">
                  {/* Preview em Tempo Real */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Pré-visualização da Capa na Vitrine
                    </label>
                    <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-slate-100 border border-slate-300 shadow-md">
                      <img
                        src={editCategoryForm.imageUrl || editingCategory.imageUrl}
                        alt={editCategoryForm.label}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B33]/90 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/20 text-white uppercase tracking-wider mb-1 inline-block">
                          {editingCategory.category}
                        </span>
                        <h4 className="text-base sm:text-lg font-extrabold text-white leading-snug">
                          {editCategoryForm.label || editingCategory.category}
                        </h4>
                        <p className="text-xs text-slate-200 line-clamp-1">
                          {editCategoryForm.subtitle || 'Subtítulo da categoria...'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Título & Subtítulo */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Título do Card
                      </label>
                      <input
                        type="text"
                        required
                        value={editCategoryForm.label}
                        onChange={(e) => setEditCategoryForm(prev => ({ ...prev, label: e.target.value }))}
                        placeholder="Ex: Moda Feminina"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-[#E8442B] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Subtítulo / Descrição Curta
                      </label>
                      <input
                        type="text"
                        value={editCategoryForm.subtitle}
                        onChange={(e) => setEditCategoryForm(prev => ({ ...prev, subtitle: e.target.value }))}
                        placeholder="Ex: Vestidos, alfaiataria & casual"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-[#E8442B] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* URL da Imagem da Capa */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Link / URL da Imagem de Capa
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="url"
                          required
                          value={editCategoryForm.imageUrl}
                          onChange={(e) => setEditCategoryForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-[#E8442B] focus:outline-none"
                        />
                      </div>

                      {/* Upload de arquivo local */}
                      <label className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer shrink-0 transition-all">
                        <Upload className="w-4 h-4" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Galeria de Fotos Prontas (Presets Rápidos) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Ou escolha uma imagem da galeria rápida:
                    </label>
                    <div className="grid grid-cols-5 gap-2 max-h-36 overflow-y-auto p-1 bg-slate-50 rounded-xl border border-slate-200 scrollbar-thin">
                      {COVER_PRESETS.map((preset, idx) => {
                        const isSelected = editCategoryForm.imageUrl === preset.url;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setEditCategoryForm(prev => ({ ...prev, imageUrl: preset.url }))}
                            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer group ${
                              isSelected ? 'border-[#E8442B] ring-2 ring-[#E8442B]/30 scale-95' : 'border-transparent hover:border-slate-300'
                            }`}
                          >
                            <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                            {isSelected && (
                              <div className="absolute inset-0 bg-[#E8442B]/40 flex items-center justify-center">
                                <Check className="w-4 h-4 text-white stroke-[3]" />
                              </div>
                            )}
                            <span className="absolute bottom-0 inset-x-0 bg-slate-950/70 text-[9px] text-white text-center py-0.5 font-bold truncate">
                              {preset.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footer Buttons */}
                  <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingCategory(null)}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-all"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#E8442B] hover:bg-[#d03a22] text-white font-bold text-xs uppercase tracking-wider cursor-pointer transition-all shadow-md flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>Salvar Capa da Categoria</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* MODAL DE CARREGAR / EDITAR BANNER */}
          {isAddingBanner && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
              <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-scaleUp">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#FDF1EC] text-[#E8442B] flex items-center justify-center">
                      <ImageIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">
                        {editingBanner ? 'Editar Banner' : 'Carregar Novo Banner'}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Insira a imagem limpa e defina o destino do clique.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingBanner(false);
                      setEditingBanner(null);
                    }}
                    className="p-2 text-slate-400 hover:text-slate-600 rounded-xl"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveBanner} className="space-y-4 mt-4">
                  {/* Título de identificação */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Título / Identificação do Banner
                    </label>
                    <input 
                      type="text"
                      required
                      value={bannerForm.title}
                      onChange={(e) => setBannerForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Ex: Vestidos Atacado - Coleção 2026"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-[#E8442B] focus:border-[#E8442B] outline-none"
                    />
                  </div>

                  {/* Upload de Imagem ou URL */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Imagem do Banner
                    </label>

                    {/* Botão de Upload de Arquivo Local */}
                    <div className="flex items-center gap-2 mb-2">
                      <label className="flex-1 border-2 border-dashed border-slate-300 hover:border-[#E8442B] rounded-xl p-3 text-center cursor-pointer transition-colors bg-slate-50 hover:bg-orange-50/30">
                        <Upload className="w-4 h-4 mx-auto text-[#E8442B] mb-1" />
                        <span className="text-xs font-semibold text-slate-700 block">
                          Carregar imagem do computador ou celular
                        </span>
                        <span className="text-[10px] text-slate-400">
                          JPG, PNG ou WEBP (formato horizontal recomendado)
                        </span>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleBannerImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Campo de URL Direta */}
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <LinkIcon className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="url"
                          value={bannerForm.imageUrl}
                          onChange={(e) => setBannerForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                          placeholder="Ou cole a URL da imagem (https://...)"
                          className="w-full pl-8.5 pr-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-[#E8442B] outline-none"
                        />
                      </div>
                    </div>

                    {/* Presets Rápidos */}
                    <div className="mt-2.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Imagens prontas para demonstração:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {BANNER_PRESETS.map((preset) => (
                          <button
                            key={preset.name}
                            type="button"
                            onClick={() => setBannerForm(prev => ({ ...prev, imageUrl: preset.url, title: prev.title || preset.name }))}
                            className="px-2 py-1 rounded-lg text-[10px] font-semibold bg-slate-100 hover:bg-orange-50 text-slate-700 hover:text-[#E8442B] border border-slate-200 transition-colors cursor-pointer"
                          >
                            {preset.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Preview da Imagem */}
                  {bannerForm.imageUrl && (
                    <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 relative h-32 w-full">
                      <img 
                        src={bannerForm.imageUrl} 
                        alt="Preview do Banner" 
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                        100% Imagem Limpa
                      </span>
                    </div>
                  )}

                  {/* Destino do Clique */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Ação ao Clicar no Banner
                      </label>
                      <select
                        value={bannerForm.linkType}
                        onChange={(e) => setBannerForm(prev => ({ 
                          ...prev, 
                          linkType: e.target.value as any,
                          linkValue: e.target.value === 'category' ? 'Feminino' : prev.linkValue
                        }))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 outline-none focus:ring-2 focus:ring-[#E8442B]"
                      >
                        <option value="category">Filtrar por Categoria</option>
                        <option value="search">Buscar Palavra-chave</option>
                        <option value="url">Abrir Link Externo / Site</option>
                        <option value="whatsapp">Abrir WhatsApp Comercial</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Valor de Destino
                      </label>
                      {bannerForm.linkType === 'category' ? (
                        <select
                          value={bannerForm.linkValue}
                          onChange={(e) => setBannerForm(prev => ({ ...prev, linkValue: e.target.value }))}
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 outline-none focus:ring-2 focus:ring-[#E8442B]"
                        >
                          <option value="Todas">Todas as Peças</option>
                          <option value="Feminino">Feminino</option>
                          <option value="Masculino">Masculino</option>
                          <option value="Infantil">Infantil</option>
                          <option value="Calçados">Calçados</option>
                          <option value="Bolsas">Bolsas</option>
                          <option value="Moda Fitness">Moda Fitness</option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          required
                          value={bannerForm.linkValue}
                          onChange={(e) => setBannerForm(prev => ({ ...prev, linkValue: e.target.value }))}
                          placeholder={
                            bannerForm.linkType === 'search' ? 'Ex: Vestidos' :
                            bannerForm.linkType === 'whatsapp' ? 'Ex: 5511991234567' :
                            'Ex: https://meusite.com.br'
                          }
                          className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 outline-none focus:ring-2 focus:ring-[#E8442B]"
                        />
                      )}
                    </div>
                  </div>

                  {/* Status Ativo */}
                  <div className="flex items-center gap-2 pt-1">
                    <input 
                      type="checkbox"
                      id="bannerActive"
                      checked={bannerForm.active}
                      onChange={(e) => setBannerForm(prev => ({ ...prev, active: e.target.checked }))}
                      className="w-4 h-4 text-[#E8442B] rounded border-slate-300 focus:ring-[#E8442B]"
                    />
                    <label htmlFor="bannerActive" className="text-xs font-bold text-slate-800 cursor-pointer">
                      Publicar e ativar imediatamente no carrossel
                    </label>
                  </div>

                  {/* Botões Salvar / Cancelar */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingBanner(false);
                        setEditingBanner(null);
                      }}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#E8442B] hover:bg-[#d03a22] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>{editingBanner ? 'Atualizar Banner' : 'Salvar e Publicar Banner'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      )}

      {/* SYSTEM METRICS SECTION */}
      {activeSection === 'stats' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Estatísticas & Assinaturas Brás Online
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Visão geral do desempenho de acessos de lojistas e revendedores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl border border-emerald-100 bg-emerald-50/50">
              <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                Compradores VIP Atacadistas
              </div>
              <div className="text-3xl font-black text-slate-900">1.428</div>
              <p className="text-xs text-slate-600 mt-1">Revendedores pagantes (R$ 29,90/mês)</p>
            </div>

            <div className="p-5 rounded-2xl border border-orange-100 bg-orange-50/50">
              <div className="text-xs font-bold text-orange-800 uppercase tracking-wider mb-1">
                Lojistas & Fabricantes PRO
              </div>
              <div className="text-3xl font-black text-slate-900">312</div>
              <p className="text-xs text-slate-600 mt-1">Fábricas pagantes (R$ 79,90/mês)</p>
            </div>

            <div className="p-5 rounded-2xl border border-purple-100 bg-purple-50/50">
              <div className="text-xs font-bold text-purple-800 uppercase tracking-wider mb-1">
                Cliques Diretos em WhatsApp
              </div>
              <div className="text-3xl font-black text-slate-900">42.890</div>
              <p className="text-xs text-slate-600 mt-1">Conexões geradas nos últimos 30 dias</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-base">Pronto para expandir o catálogo infantil ou de calçados?</h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Você pode cadastrar novos produtos no Brás ou em Goiânia e publicar instantaneamente no portal.
              </p>
            </div>
            <button
              onClick={() => handleAddProductForStore(null)}
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs shrink-0 transition-all cursor-pointer"
            >
              + Adicionar Novo Produto
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

