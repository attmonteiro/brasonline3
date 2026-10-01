import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  ShoppingCart, 
  ChevronDown, 
  LogOut, 
  Heart, 
  Package, 
  ShieldCheck,
  X,
  Store,
  User,
  CheckCircle2,
  Building2,
  HelpCircle,
  Truck,
  Menu
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';
import { SHOPEE_CATEGORIES } from '../data/shopeeData';
import { CategoryType } from '../types';

const POPULAR_SEARCH_TAGS = [
  'Vestido Midi',
  'Jeans Atacado',
  'Tênis Confort',
  'Conjunto Moletom',
  'Bolsas Femininas',
  'Moda Fitness',
  'Camisa Linho',
  'Blazer Alfaiataria',
];

const SEARCH_SUGGESTIONS = [
  'pijama infantil',
  'vestido florido',
  'calça jeans feminina',
  'conjunto moletom atacado',
  'camisa polo masculina',
  'cropped canelado',
  't-shirt feminina atacado',
  'bermuda jeans masculina',
  'camisola confort',
  'moda plus size atacado',
];

export const Header: React.FC = () => {
  const { 
    currentUser,
    login,
    openLoginModal,
    logout,
    favorites, 
    cartCount,
    setIsCartOpen,
    filters,
    setFilter,
    activeTab,
    setActiveTab,
    setSelectedProduct,
    siteDesignSettings
  } = useApp();

  const [searchQuery, setSearchQuery] = useState(filters.searchQuery || '');
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [isVendorsDropdownOpen, setIsVendorsDropdownOpen] = useState(false);
  const [isPagesDropdownOpen, setIsPagesDropdownOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isVerticalMenuOpen, setIsVerticalMenuOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const categoriesMenuRef = useRef<HTMLDivElement>(null);
  const vendorsMenuRef = useRef<HTMLDivElement>(null);
  const pagesMenuRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  // Sincroniza query interna com filtros globais
  useEffect(() => {
    setSearchQuery(filters.searchQuery || '');
  }, [filters.searchQuery]);

  // Rotação dinâmica de sugestões no campo de busca (ex: "pijama infantil", "vestido florido", etc.)
  useEffect(() => {
    const timer = setInterval(() => {
      setSuggestionIndex((prev) => (prev + 1) % SEARCH_SUGGESTIONS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Foco automático no input ao abrir a caixa de busca
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  // Fechar dropdowns e busca ao clicar fora ou apertar ESC
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (categoriesMenuRef.current && !categoriesMenuRef.current.contains(event.target as Node)) {
        setIsCategoriesDropdownOpen(false);
      }
      if (vendorsMenuRef.current && !vendorsMenuRef.current.contains(event.target as Node)) {
        setIsVendorsDropdownOpen(false);
      }
      if (pagesMenuRef.current && !pagesMenuRef.current.contains(event.target as Node)) {
        setIsPagesDropdownOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setIsCategoriesDropdownOpen(false);
        setIsVendorsDropdownOpen(false);
        setIsPagesDropdownOpen(false);
        setIsAccountMenuOpen(false);
        setIsAboutModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedProduct(null);
    setFilter('searchQuery', searchQuery);
    setIsSearchOpen(false);
    if (activeTab !== 'catalog') setActiveTab('catalog');
    const el = document.getElementById('grid-produtos') || document.getElementById('recomendados-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTagClick = (tag: string) => {
    setSelectedProduct(null);
    setSearchQuery(tag);
    setFilter('searchQuery', tag);
    setIsSearchOpen(false);
    if (activeTab !== 'catalog') setActiveTab('catalog');
    const el = document.getElementById('grid-produtos') || document.getElementById('recomendados-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setSelectedProduct(null);
    setFilter('searchQuery', '');
    setFilter('category', 'Todas');
    if (activeTab !== 'catalog') setActiveTab('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (catName: string) => {
    setSelectedProduct(null);
    setFilter('category', catName as CategoryType);
    setIsCategoriesDropdownOpen(false);
    if (activeTab !== 'catalog') setActiveTab('catalog');
    const el = document.getElementById('grid-produtos') || document.getElementById('recomendados-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToSection = (sectionId: string) => {
    setIsVendorsDropdownOpen(false);
    setIsPagesDropdownOpen(false);
    if (activeTab !== 'catalog') {
      setActiveTab('catalog');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isHomeActive = activeTab === 'catalog' && filters.category === 'Todas' && !filters.searchQuery;

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-2xs select-none">
        
        {/* FAIXA DE COMUNICADO OPCIONAL */}
        {siteDesignSettings?.announcementActive && siteDesignSettings?.announcementText && (
          <div 
            style={{ backgroundColor: siteDesignSettings.announcementBg || '#14213D' }}
            className="text-white text-[10px] sm:text-xs py-1 px-3 text-center font-medium tracking-wide flex items-center justify-center gap-2 border-b border-black/10"
          >
            <span>{siteDesignSettings.announcementText}</span>
          </div>
        )}

        {/* CONTAINER DO CABEÇALHO COM LOGO + BOTÃO MENU VERTICAL À ESQUERDA, BARRA DE PESQUISA CENTRAL E AÇÕES À DIREITA */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-2.5 sm:gap-4 md:gap-6">
          
          {/* 1. LADO ESQUERDO: LOGO DA MARCA À ESQUERDA + BOTÃO MENU VERTICAL (☰ MENU) */}
          <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
            <div 
              onClick={handleNavigateHome}
              className="flex items-center cursor-pointer select-none group shrink-0 transition-transform hover:scale-[1.02] py-0.5"
              title="Brás Online - Página Inicial"
            >
              <BrandLogo variant="light" size="sm" />
            </div>

            <button
              type="button"
              onClick={() => setIsVerticalMenuOpen(!isVerticalMenuOpen)}
              className="flex items-center gap-1.5 p-2 rounded-xl text-[#14284B] hover:text-[#2E5C94] hover:bg-slate-100 transition-colors cursor-pointer select-none group border border-[#E8E8E8]"
              title="Abrir Menu Vertical"
              aria-label="Menu de Navegação"
            >
              <Menu className="w-5 h-5 text-[#14284B] group-hover:scale-105 transition-transform" />
              <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider text-[#14284B]">Menu</span>
            </button>
          </div>

          {/* 2. CENTRO: BARRA DE PESQUISA ESTENDIDA COM SUGESTÕES DINÂMICAS */}
          <div className="flex-1 max-w-2xl lg:max-w-3xl mx-2 sm:mx-4 md:mx-6">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <div className="flex items-center bg-[#F8FAFC] border border-[#E8E8E8] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#2E5C94] focus-within:border-[#2E5C94] focus-within:bg-white transition-all shadow-2xs">
                <Search className="w-4 h-4 text-gray-400 ml-3.5 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`"${SEARCH_SUGGESTIONS[suggestionIndex]}"`}
                  className="w-full px-3 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-900 bg-transparent outline-none placeholder:text-gray-400 font-medium transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setFilter('searchQuery', '');
                    }}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors mr-1 cursor-pointer"
                    title="Limpar busca"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-[#14284B] hover:bg-[#2E5C94] text-white px-4 sm:px-5 py-2 sm:py-2.5 flex items-center justify-center transition-colors cursor-pointer shrink-0 font-bold text-xs"
                  title="Buscar produtos"
                >
                  <span>Buscar</span>
                </button>
              </div>
            </form>
          </div>

          {/* 3. LADO DIREITO: FAVORITOS E LINK ENTRAR-CADASTRAR (SEM CARRINHO) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 text-gray-700">

            {/* ÍCONE MINIMALISTA DE FAVORITOS */}
            <button 
              type="button"
              onClick={() => setActiveTab('favorites')}
              className="p-2 text-[#14284B] hover:text-[#2E5C94] hover:bg-slate-100 rounded-full transition-colors cursor-pointer flex items-center"
              title="Meus Favoritos"
            >
              <div className="relative">
                <Heart className="w-5 h-5 stroke-[1.9]" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#C4372B] text-white font-extrabold text-[9px] rounded-full h-3.5 min-w-[14px] px-0.5 flex items-center justify-center shadow-xs">
                    {favorites.length}
                  </span>
                )}
              </div>
            </button>

            {/* LINK CLICÁVEL "ENTRAR - CADASTRAR" (NÃO É BOTÃO, COM SESSÃO ADM INTEGRADA) */}
            <div className="relative" ref={accountRef}>
              <button
                type="button"
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                className="inline-flex items-center gap-1 text-xs sm:text-[13px] font-semibold text-[#14284B] hover:text-[#2E5C94] transition-colors cursor-pointer py-1 px-1.5 select-none"
                title="Acesso à Conta e Sessão de ADM"
              >
                <span>{currentUser ? (currentUser.role === 'admin' ? 'Painel ADM' : currentUser.name) : 'Entrar - Cadastrar'}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#2E5C94] transition-transform duration-200 ${isAccountMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* DROPDOWN: SESSÃO ADM, LOGIN/CADASTRO E OPÇÕES DA CONTA */}
              {isAccountMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white text-gray-800 rounded-xl shadow-2xl py-1 z-50 border border-[#E8E8E8] animate-fadeIn text-xs">
                  {currentUser ? (
                    <>
                      <div className="px-3.5 py-2.5 border-b border-[#E8E8E8] bg-slate-50 rounded-t-xl">
                        <p className="font-bold text-[#14284B] truncate">{currentUser.name}</p>
                        <p className="text-[10px] text-gray-500 truncate">{currentUser.email}</p>
                        <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-[#C4372B] text-white">
                          {currentUser.role === 'admin' ? 'Administrador' : currentUser.role === 'seller' ? 'Fornecedor' : 'Comprador Lojista'}
                        </span>
                      </div>

                      {/* SESSÃO ADM */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedProduct(null);
                          setActiveTab('admin_dashboard');
                          setIsAccountMenuOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 hover:text-[#2E5C94] flex items-center gap-2 cursor-pointer font-bold text-[#14284B]"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#2E5C94]" />
                        <span>Sessão ADM (Painel)</span>
                      </button>

                      {currentUser.role === 'seller' && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedProduct(null);
                            setActiveTab('seller_dashboard');
                            setIsAccountMenuOpen(false);
                          }}
                          className="w-full text-left px-3.5 py-2 hover:bg-slate-50 hover:text-[#2E5C94] flex items-center gap-2 cursor-pointer font-medium text-[#14284B]"
                        >
                          <Package className="w-4 h-4 text-[#2E5C94]" />
                          <span>Painel do Fornecedor</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedProduct(null);
                          setActiveTab('favorites');
                          setIsAccountMenuOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2 hover:bg-slate-50 hover:text-[#2E5C94] flex items-center gap-2 cursor-pointer font-medium text-[#14284B]"
                      >
                        <Heart className="w-4 h-4 text-[#2E5C94]" />
                        <span>Meus Favoritos</span>
                      </button>

                      <div className="border-t border-[#E8E8E8] mt-1">
                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setIsAccountMenuOpen(false);
                          }}
                          className="w-full text-left px-3.5 py-2 hover:bg-red-50 text-[#C4372B] flex items-center gap-2 cursor-pointer font-bold"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sair da Conta</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="px-3.5 py-2 border-b border-[#E8E8E8] text-[10px] uppercase font-bold text-[#2E5C94] tracking-wider">
                        Acesso à Plataforma
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setIsAccountMenuOpen(false);
                          openLoginModal();
                        }}
                        className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 hover:text-[#2E5C94] flex items-center gap-2 cursor-pointer font-semibold text-[#14284B]"
                      >
                        <Store className="w-4 h-4 text-[#2E5C94]" />
                        <span>Entrar ou Cadastrar</span>
                      </button>

                      {/* SESSÃO DE ADM DENTRO */}
                      <button
                        type="button"
                        onClick={() => {
                          setIsAccountMenuOpen(false);
                          login('adm', '000');
                          setActiveTab('admin_dashboard');
                        }}
                        className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 hover:text-[#2E5C94] flex items-center gap-2 cursor-pointer font-bold text-[#14284B] border-t border-[#E8E8E8]"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#C4372B]" />
                        <div className="flex flex-col leading-tight">
                          <span>Sessão ADM</span>
                          <span className="text-[10px] text-gray-500 font-normal">Acessar Painel do Administrador</span>
                        </div>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

          </div>

        </div>

      </header>

      {/* MENU DE NAVEGAÇÃO VERTICAL (SLIDE-OVER DRAWER DA ESQUERDA) */}
      {isVerticalMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop Escuro */}
          <div 
            onClick={() => setIsVerticalMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-fadeIn"
          />

          {/* Painel do Menu Vertical */}
          <div className="relative w-72 sm:w-80 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-50 animate-slideRight">
            
            {/* Cabeçalho do Menu Vertical */}
            <div className="p-4 border-b border-[#E8E8E8] flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <BrandLogo variant="light" size="sm" />
              </div>
              <button
                type="button"
                onClick={() => setIsVerticalMenuOpen(false)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-[#14284B] hover:bg-slate-200/60 transition-colors cursor-pointer"
                title="Fechar Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links Verticais do Menu */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1 text-sm font-medium text-[#14284B]">
              
              {/* Início */}
              <button
                type="button"
                onClick={() => {
                  handleNavigateHome();
                  setIsVerticalMenuOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                  isHomeActive ? 'bg-[#14284B] text-white font-bold' : 'hover:bg-slate-100 text-[#14284B]'
                }`}
              >
                <span>Início</span>
              </button>

              {/* Categorias Verticais */}
              <div className="pt-2">
                <div className="px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#2E5C94]">
                  Departamentos & Categorias
                </div>
                <div className="space-y-0.5 mt-1">
                  <button
                    type="button"
                    onClick={() => {
                      handleSelectCategory('Todas');
                      setIsVerticalMenuOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2 rounded-lg text-xs font-semibold hover:bg-slate-50 text-gray-700 flex items-center justify-between cursor-pointer"
                  >
                    <span>Todas as Peças</span>
                    <span className="text-[10px] text-gray-400">Ver todas</span>
                  </button>

                  {SHOPEE_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        handleSelectCategory(cat.name);
                        setIsVerticalMenuOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 rounded-lg text-xs hover:bg-slate-50 text-gray-700 flex items-center gap-2.5 cursor-pointer transition-colors"
                    >
                      <img 
                        src={cat.imageUrl} 
                        alt={cat.name} 
                        className="w-5 h-5 rounded object-cover shadow-2xs" 
                      />
                      <span className="flex-1 font-medium">{cat.name}</span>
                      {cat.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#C4372B] text-white">
                          {cat.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fornecedores */}
              <div className="pt-3 border-t border-[#E8E8E8]">
                <div className="px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#2E5C94]">
                  Polo & Atacado
                </div>
                <button
                  type="button"
                  onClick={() => {
                    handleScrollToSection('fornecedores-section');
                    setIsVerticalMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium hover:bg-slate-50 text-gray-700 flex items-center gap-2 cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-[#2E5C94]" />
                  <span>Fornecedores Oficiais</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleScrollToSection('ultimas-pecas-section');
                    setIsVerticalMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium hover:bg-slate-50 text-gray-700 flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#2E5C94]" />
                  <span>Últimas Peças em Oferta</span>
                </button>
              </div>

              {/* Institucional & Ajuda */}
              <div className="pt-3 border-t border-[#E8E8E8]">
                <div className="px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#2E5C94]">
                  Institucional
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsVerticalMenuOpen(false);
                    const el = document.getElementById('como-funciona-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium hover:bg-slate-50 text-gray-700 flex items-center gap-2 cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-[#2E5C94]" />
                  <span>Como Funciona a Plataforma</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsVerticalMenuOpen(false);
                    setIsAboutModalOpen(true);
                  }}
                  className="w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium hover:bg-slate-50 text-gray-700 flex items-center gap-2 cursor-pointer"
                >
                  <Store className="w-4 h-4 text-[#2E5C94]" />
                  <span>Sobre o Brás Online</span>
                </button>
              </div>

              {/* Sessão ADM no Menu Vertical */}
              <div className="pt-3 border-t border-[#E8E8E8]">
                <button
                  type="button"
                  onClick={() => {
                    setIsVerticalMenuOpen(false);
                    login('adm', '000');
                    setActiveTab('admin_dashboard');
                  }}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 text-[#14284B] flex items-center gap-2.5 cursor-pointer border border-[#E8E8E8] transition-colors"
                >
                  <ShieldCheck className="w-4.5 h-4.5 text-[#C4372B]" />
                  <div className="flex flex-col">
                    <span>Sessão ADM</span>
                    <span className="text-[10px] text-gray-500 font-normal">Painel do Administrador Geral</span>
                  </div>
                </button>
              </div>

            </div>

            {/* Rodapé do Menu Vertical */}
            <div className="p-3 border-t border-[#E8E8E8] bg-slate-50 text-xs">
              <button
                type="button"
                onClick={() => {
                  setIsVerticalMenuOpen(false);
                  openLoginModal();
                }}
                className="w-full py-2.5 px-3 bg-[#14284B] hover:bg-[#2E5C94] text-white font-bold rounded-lg text-center cursor-pointer transition-colors shadow-2xs"
              >
                {currentUser ? `Conectado como: ${currentUser.name}` : 'Entrar ou Cadastrar'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL "SOBRE NÓS" (EXIBIDO AO CLICAR NO ITEM SOBRE NÓS) */}
      {isAboutModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 animate-scaleUp relative">
            <button
              type="button"
              onClick={() => setIsAboutModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#FDF1EC] text-[#E8442B] flex items-center justify-center">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-900">Sobre o Brás Online</h3>
                <p className="text-xs text-gray-500">Conectando lojistas e revendedores direto às confecções</p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs text-gray-600 leading-relaxed">
              <p>
                O <strong className="text-gray-900">Brás Online</strong> é a plataforma oficial que digitaliza o maior polo de moda e confecção atacadista da América Latina.
              </p>

              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Preço Real de Fábrica:</strong> Sem atravessadores, com negociação e catálogo direto dos confeccionistas e fabricantes.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Pronta Entrega e Despacho Nacional:</strong> Envio garantido via Correios, transportadoras e excursões de ônibus do Brás.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Variedade Completa:</strong> Moda feminina, masculina, infantil, jeanswear, calçados, bolsas e alfaiataria em alta rotatividade.</span>
                </div>
              </div>

              <p>
                Compre com agilidade, visualize lançamentos diários e abasteça sua loja ou revenda com a segurança e a credibilidade do polo do Brás.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-gray-400">São Paulo - SP • Polo Atacadista</span>
              <button
                type="button"
                onClick={() => setIsAboutModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#E8442B] hover:bg-[#d03a22] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
