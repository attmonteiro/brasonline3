import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  UserRole, 
  CategoryType, 
  PoloRegion, 
  FilterState, 
  Supplier,
  AuthUser,
  CategoryCoverItem,
  CartItem,
  HeroBannerItem,
  SiteDesignSettings
} from '../types';
import { INITIAL_PRODUCTS, DEFAULT_CATEGORY_COVERS } from '../data/initialData';
import {
  fetchProductsFromFirestore,
  saveProductToFirestore,
  deleteProductFromFirestore,
  saveStoreToFirestore,
  saveSubscriptionToFirestore,
  fetchSubscriptionFromFirestore,
  auth,
} from '../services/firebaseService';
import { onAuthStateChanged } from 'firebase/auth';

interface AppContextType {
  // User & Subscription state
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  currentUser: AuthUser | null;
  login: (username: string, pass: string) => { success: boolean; message?: string };
  logout: () => void;
  buyerLocation: string;
  setBuyerLocation: (location: string) => void;
  updateStoreInfo: (info: Supplier) => void;
  
  // Category Covers
  categoryCovers: CategoryCoverItem[];
  updateCategoryCover: (category: CategoryType, newCover: Partial<CategoryCoverItem>) => void;
  resetCategoryCovers: () => void;
  
  // Hero Banners & Site Design
  heroBanners: HeroBannerItem[];
  addHeroBanner: (banner: Omit<HeroBannerItem, 'id'>) => void;
  updateHeroBanner: (id: string, updates: Partial<HeroBannerItem>) => void;
  deleteHeroBanner: (id: string) => void;
  reorderHeroBanners: (banners: HeroBannerItem[]) => void;
  resetHeroBanners: () => void;
  siteDesignSettings: SiteDesignSettings;
  updateSiteDesignSettings: (settings: Partial<SiteDesignSettings>) => void;
  
  // Products catalog & Favorites
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;

  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, qty: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartCount: number;
  
  // Filtering & Sorting
  filters: FilterState;
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  filteredProducts: Product[];
  
  // Modals & Active View
  selectedProduct: Product | null;
  setSelectedProduct: (prod: Product | null) => void;
  isSubscriptionModalOpen: boolean;
  subscriptionTargetRole: 'buyer' | 'seller';
  openSubscriptionModal: (target: 'buyer' | 'seller') => void;
  closeSubscriptionModal: () => void;
  upgradeToVIP: (role: 'buyer_vip' | 'seller') => void;
  usuarioTemAcessoPremium: () => boolean;
  
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  
  isNewProductModalOpen: boolean;
  setIsNewProductModalOpen: (open: boolean) => void;

  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  registerUser: (data: { name: string; emailOrUser: string; role: 'buyer_vip' | 'seller'; storeName?: string; whatsapp?: string }) => { success: boolean; message?: string };

  isCreateStoreModalOpen: boolean;
  openCreateStoreModal: () => void;
  closeCreateStoreModal: () => void;
  createOrUpdateStore: (infoData: Partial<Supplier>) => Supplier;
  deleteStore: (storeId: string) => void;

  customStores: Supplier[];
  allStores: Supplier[];
  selectedAdminStore: Supplier | null;
  setSelectedAdminStore: (store: Supplier | null) => void;
  targetStoreForNewProduct: Supplier | null;
  setTargetStoreForNewProduct: (store: Supplier | null) => void;

  activeTab: 'catalog' | 'category' | 'favorites' | 'seller_dashboard' | 'admin_dashboard';
  setActiveTab: (tab: 'catalog' | 'category' | 'favorites' | 'seller_dashboard' | 'admin_dashboard') => void;
}

const defaultFilters: FilterState = {
  category: 'Todas',
  region: 'Todas as Regiões',
  searchQuery: '',
  maxPrice: null,
  minQuantityFilter: null,
  onlyReadyDelivery: false,
  sortBy: 'relevance',
};

const defaultSellerStore: Supplier = {
  id: 'sup-seller-default',
  name: 'Minha Confeção Brás & 44',
  storeCode: 'Galeria Pagé Brás • Loja 244',
  address: 'Rua Oriente, 500 - Brás, São Paulo - SP',
  whatsapp: '5511998887766',
  verified: true,
  region: 'Brás - SP',
  rating: 5.0,
  totalProducts: 12,
};

const safeGetStorage = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeRemoveStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
};

const safeSetStorage = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch (err) {
    console.warn(`[Storage] Storage quota exceeded or disabled for ${key}:`, err);
    if (key === 'atacado_products') {
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) {
          const lightweight = parsed.map((p: any) => {
            if (p?.imageUrl && p.imageUrl.startsWith('data:image')) {
              return {
                ...p,
                imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
                additionalImages: [],
              };
            }
            return p;
          });
          localStorage.setItem(key, JSON.stringify(lightweight));
        }
      } catch {
        // Safe failover without crashing
      }
    }
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>(() => {
    const saved = safeGetStorage('atacado_user_role');
    if (saved === 'seller') {
      return 'buyer_free';
    }
    return (saved as UserRole) || 'buyer_free';
  });

  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    const saved = safeGetStorage('atacado_current_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && (parsed.role === 'seller' || parsed.username === 'vendedor' || (parsed.name && parsed.name.includes('Confeção')))) {
          safeRemoveStorage('atacado_current_user');
          return null;
        }
        return parsed;
      } catch { return null; }
    }
    return null;
  });

  const [buyerLocation, setBuyerLocation] = useState<string>(() => {
    return safeGetStorage('atacado_buyer_location') || 'São Paulo, SP';
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = safeGetStorage('atacado_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter((p: any) => p && p.id && !p.id.startsWith('prod-'));
        }
      } catch {
        return [];
      }
    }
    return [];
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = safeGetStorage('atacado_favorites');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch { return []; }
    }
    return [];
  });

  const [customStores, setCustomStores] = useState<Supplier[]>(() => {
    const saved = safeGetStorage('atacado_custom_stores');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter((s: any) => s && s.id && !s.id.startsWith('sup-'));
        }
      } catch {
        return [];
      }
    }
    return [];
  });

  const [categoryCovers, setCategoryCovers] = useState<CategoryCoverItem[]>(() => {
    const saved = safeGetStorage('atacado_category_covers');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 6 && !parsed.some((c: any) => c.category === 'Bolsas & Acessórios')) {
          return parsed;
        }
        return DEFAULT_CATEGORY_COVERS;
      } catch {
        return DEFAULT_CATEGORY_COVERS;
      }
    }
    return DEFAULT_CATEGORY_COVERS;
  });

  const updateCategoryCover = (category: CategoryType, newCover: Partial<CategoryCoverItem>) => {
    setCategoryCovers(prev => {
      const exists = prev.some(c => c.category === category);
      let updated: CategoryCoverItem[];
      if (exists) {
        updated = prev.map(c => (c.category === category ? { ...c, ...newCover } : c));
      } else {
        updated = [
          ...prev,
          {
            category,
            label: newCover.label || category,
            subtitle: newCover.subtitle || '',
            imageUrl: newCover.imageUrl || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80',
          },
        ];
      }
      safeSetStorage('atacado_category_covers', JSON.stringify(updated));
      return updated;
    });
  };

  const resetCategoryCovers = () => {
    setCategoryCovers(DEFAULT_CATEGORY_COVERS);
    safeSetStorage('atacado_category_covers', JSON.stringify(DEFAULT_CATEGORY_COVERS));
  };

  // Banners Iniciais Padrão (Imagens limpas, profissionais no padrão e-commerce atacado)
  const DEFAULT_HERO_BANNERS: HeroBannerItem[] = [
    {
      id: 'banner-1',
      title: 'Moda Feminina Atacado - Coleção 2026',
      imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop&q=85',
      linkType: 'category',
      linkValue: 'Feminino',
      active: true,
      order: 1,
    },
    {
      id: 'banner-2',
      title: 'Vestidos & Alfaiataria Direto de Fábrica',
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=85',
      linkType: 'search',
      linkValue: 'Vestidos',
      active: true,
      order: 2,
    },
    {
      id: 'banner-3',
      title: 'Moda Masculina e Jeanswear Polo SP',
      imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&auto=format&fit=crop&q=85',
      linkType: 'category',
      linkValue: 'Masculino',
      active: true,
      order: 3,
    },
    {
      id: 'banner-4',
      title: 'Calçados e Bolsas Direto do Fabricante',
      imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1600&auto=format&fit=crop&q=85',
      linkType: 'category',
      linkValue: 'Calçados',
      active: true,
      order: 4,
    },
  ];

  const DEFAULT_SITE_DESIGN_SETTINGS: SiteDesignSettings = {
    headerColor: '#E8442B',
    bannerAutoplayInterval: 5,
    announcementActive: false,
    announcementText: 'Frete especial direto do polo do Brás para todo o Brasil!',
    announcementBg: '#14213D',
  };

  const [heroBanners, setHeroBanners] = useState<HeroBannerItem[]>(() => {
    const saved = safeGetStorage('atacado_hero_banners');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (_) {}
    }
    return DEFAULT_HERO_BANNERS;
  });

  const [siteDesignSettings, setSiteDesignSettings] = useState<SiteDesignSettings>(() => {
    const saved = safeGetStorage('atacado_site_design');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return { ...DEFAULT_SITE_DESIGN_SETTINGS, ...parsed };
      } catch (_) {}
    }
    return DEFAULT_SITE_DESIGN_SETTINGS;
  });

  const addHeroBanner = (banner: Omit<HeroBannerItem, 'id'>) => {
    const newBanner: HeroBannerItem = {
      ...banner,
      id: `banner-${Date.now()}`,
    };
    setHeroBanners(prev => {
      const updated = [...prev, newBanner];
      safeSetStorage('atacado_hero_banners', JSON.stringify(updated));
      return updated;
    });
  };

  const updateHeroBanner = (id: string, updates: Partial<HeroBannerItem>) => {
    setHeroBanners(prev => {
      const updated = prev.map(b => (b.id === id ? { ...b, ...updates } : b));
      safeSetStorage('atacado_hero_banners', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteHeroBanner = (id: string) => {
    setHeroBanners(prev => {
      const updated = prev.filter(b => b.id !== id);
      safeSetStorage('atacado_hero_banners', JSON.stringify(updated));
      return updated;
    });
  };

  const reorderHeroBanners = (banners: HeroBannerItem[]) => {
    const updated = banners.map((b, idx) => ({ ...b, order: idx + 1 }));
    setHeroBanners(updated);
    safeSetStorage('atacado_hero_banners', JSON.stringify(updated));
  };

  const resetHeroBanners = () => {
    setHeroBanners(DEFAULT_HERO_BANNERS);
    safeSetStorage('atacado_hero_banners', JSON.stringify(DEFAULT_HERO_BANNERS));
  };

  const updateSiteDesignSettings = (settings: Partial<SiteDesignSettings>) => {
    setSiteDesignSettings(prev => {
      const updated = { ...prev, ...settings };
      safeSetStorage('atacado_site_design', JSON.stringify(updated));
      return updated;
    });
  };

  const [selectedAdminStore, setSelectedAdminStore] = useState<Supplier | null>(null);
  const [targetStoreForNewProduct, setTargetStoreForNewProduct] = useState<Supplier | null>(null);

  const [filters, setFiltersState] = useState<FilterState>(defaultFilters);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [subscriptionTargetRole, setSubscriptionTargetRole] = useState<'buyer' | 'seller'>('buyer');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCreateStoreModalOpen, setIsCreateStoreModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'catalog' | 'category' | 'favorites' | 'seller_dashboard' | 'admin_dashboard'>('catalog');

  // Persistence
  useEffect(() => {
    safeSetStorage('atacado_user_role', userRole);
  }, [userRole]);

  useEffect(() => {
    if (currentUser) {
      safeSetStorage('atacado_current_user', JSON.stringify(currentUser));
    } else {
      safeRemoveStorage('atacado_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    safeSetStorage('atacado_buyer_location', buyerLocation);
  }, [buyerLocation]);

  useEffect(() => {
    safeSetStorage('atacado_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    safeSetStorage('atacado_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    safeSetStorage('atacado_custom_stores', JSON.stringify(customStores));
  }, [customStores]);

  // Fetch products directly from Firestore on load
  useEffect(() => {
    let isMounted = true;
    async function loadProducts() {
      try {
        const firestoreProducts = await fetchProductsFromFirestore();
        if (isMounted && firestoreProducts && firestoreProducts.length > 0) {
          setProducts(firestoreProducts);
        }
      } catch (err) {
        console.error('Error loading Firestore products on mount:', err);
      }
    }
    loadProducts();
    return () => { isMounted = false; };
  }, []);

  // Sync Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const sub = await fetchSubscriptionFromFirestore(fbUser.uid);
        if (sub && sub.status === 'active') {
          if (sub.userRole === 'seller') {
            setUserRole('seller');
          } else {
            setUserRole('buyer_vip');
          }
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Compute all unique stores across customStores, products, and currentUser
  const allStoresMap = new Map<string, Supplier>();

  // 2. Add suppliers from products
  products.forEach((p) => {
    if (p && p.supplier && p.supplier.id) {
      const count = products.filter((pr) => pr?.supplier?.id === p.supplier.id).length;
      allStoresMap.set(p.supplier.id, {
        ...p.supplier,
        totalProducts: count,
      });
    }
  });

  // 3. Add custom created stores
  customStores.forEach((s) => {
    if (!s || !s.id) return;
    const existing = allStoresMap.get(s.id);
    const count = products.filter((pr) => pr?.supplier?.id === s.id || pr?.supplier?.name === s.name).length;
    allStoresMap.set(s.id, {
      ...(existing || s),
      ...s,
      totalProducts: count,
    });
  });

  // 4. Add current user store if seller
  if (currentUser?.storeInfo?.id) {
    const s = currentUser.storeInfo;
    const count = products.filter((pr) => pr?.supplier?.id === s.id || pr?.supplier?.name === s.name).length;
    allStoresMap.set(s.id, {
      ...s,
      totalProducts: count,
    });
  }

  const allStores = Array.from(allStoresMap.values());

  const registerUser = (data: { name: string; emailOrUser: string; role: 'buyer_vip' | 'seller'; storeName?: string; whatsapp?: string }): { success: boolean; message?: string } => {
    try {
      const id = `user-${Date.now()}`;
      const username = data.emailOrUser.split('@')[0].trim().toLowerCase() || `user_${Date.now()}`;
      
      let storeInfo: Supplier | undefined = undefined;
      if (data.role === 'seller') {
        storeInfo = {
          ...defaultSellerStore,
          id: `sup-${Date.now()}`,
          name: data.storeName || data.name || 'Minha Confecção',
          whatsapp: data.whatsapp ? data.whatsapp.replace(/\D/g, '') : defaultSellerStore.whatsapp,
        };
      }

      const newUser: AuthUser = {
        id,
        username,
        name: data.name.trim(),
        role: data.role,
        email: data.emailOrUser.includes('@') ? data.emailOrUser.trim() : `${username}@atacado.com.br`,
        storeInfo,
      };

      // Save registered user to localStorage
      try {
        const existingRaw = safeGetStorage('atacado_registered_users');
        const list = existingRaw ? JSON.parse(existingRaw) : [];
        list.push(newUser);
        safeSetStorage('atacado_registered_users', JSON.stringify(list));
      } catch {
        // ignore
      }

      setCurrentUser(newUser);
      setUserRole(data.role);
      setIsLoginModalOpen(false);
      safeSetStorage('atacado_current_user', JSON.stringify(newUser));
      safeSetStorage('atacado_user_role', data.role);

      if (data.role === 'seller') {
        setActiveTab('seller_dashboard');
      } else {
        setActiveTab('catalog');
      }

      return { success: true };
    } catch {
      return { success: false, message: 'Falha ao realizar cadastro. Tente novamente.' };
    }
  };

  const login = (username: string, pass: string): { success: boolean; message?: string } => {
    const rawUser = username.trim();
    const rawPass = pass.trim();

    if (!rawUser) {
      return { success: false, message: 'Por favor, informe seu usuário ou e-mail.' };
    }

    const cleanUser = rawUser.toLowerCase().replace(/[^a-z0-9_]/g, '');
    const cleanPass = rawPass.replace(/[^a-z0-9]/g, '');

    // 1. Admin login
    if ((cleanUser === 'vendedor' || cleanUser === 'adm' || cleanUser === 'admin' || cleanUser === 'administrador') && (cleanPass === '000' || cleanPass === '00' || cleanPass === '0')) {
      const user: AuthUser = {
        id: 'user-admin',
        username: 'adm',
        name: 'Administrador Brás Online (Gestor Geral)',
        role: 'admin',
        email: 'admin@brasonline.com.br',
      };
      setCurrentUser(user);
      setUserRole('admin');
      setIsLoginModalOpen(false);
      setIsCreateStoreModalOpen(false);
      setActiveTab('admin_dashboard');
      safeSetStorage('atacado_current_user', JSON.stringify(user));
      safeSetStorage('atacado_user_role', 'admin');
      return { success: true };
    }

    // 2. Seller login
    if ((cleanUser === 'vendedor' || cleanUser === 'seller' || cleanUser === 'fornecedor') && (cleanPass === '111' || cleanPass === '000' || cleanPass === '123')) {
      const user: AuthUser = {
        id: 'user-vendedor',
        username: 'vendedor',
        name: 'Minha Confecção Brás & 44',
        role: 'seller',
        email: 'vendedor@brasonline.com.br',
        storeInfo: defaultSellerStore,
      };
      setCurrentUser(user);
      setUserRole('seller');
      setIsLoginModalOpen(false);
      setIsCreateStoreModalOpen(false);
      setActiveTab('seller_dashboard');
      safeSetStorage('atacado_current_user', JSON.stringify(user));
      safeSetStorage('atacado_user_role', 'seller');
      return { success: true };
    }

    // 3. Buyer VIP demo / standard logins
    if (
      cleanUser === 'comprador' ||
      cleanUser.includes('comprador') ||
      cleanUser === 'buyer' ||
      cleanUser === 'lojista' ||
      cleanUser === 'vip' ||
      cleanUser === 'cliente'
    ) {
      if (
        cleanPass === '000' ||
        cleanPass === '00' ||
        cleanPass === '0' ||
        cleanPass.includes('000') ||
        cleanPass === '123' ||
        cleanPass === ''
      ) {
        const user: AuthUser = {
          id: 'user-comprador',
          username: 'comprador',
          name: 'Comprador VIP Brás Online',
          role: 'buyer_vip',
          email: 'comprador@brasonline.com.br',
        };
        setCurrentUser(user);
        setUserRole('buyer_vip');
        setIsLoginModalOpen(false);
        setActiveTab('catalog');
        safeSetStorage('atacado_current_user', JSON.stringify(user));
        safeSetStorage('atacado_user_role', 'buyer_vip');
        return { success: true };
      }
    }

    // 4. Check registered users in storage
    try {
      const rawRegistered = safeGetStorage('atacado_registered_users');
      if (rawRegistered) {
        const usersList: AuthUser[] = JSON.parse(rawRegistered);
        const matched = usersList.find(
          (u) => u.username.toLowerCase() === rawUser.toLowerCase() || u.email.toLowerCase() === rawUser.toLowerCase()
        );
        if (matched) {
          setCurrentUser(matched);
          setUserRole(matched.role);
          setIsLoginModalOpen(false);
          safeSetStorage('atacado_current_user', JSON.stringify(matched));
          safeSetStorage('atacado_user_role', matched.role);
          if (matched.role === 'seller') {
            setActiveTab('seller_dashboard');
          } else {
            setActiveTab('catalog');
          }
          return { success: true };
        }
      }
    } catch {
      // ignore
    }

    // 5. Friendly login for custom email/username with any password >= 3
    if (rawPass.length >= 3 && (rawUser.includes('@') || rawUser.length >= 3)) {
      const displayName = rawUser.includes('@') 
        ? rawUser.split('@')[0].replace(/[._-]/g, ' ') 
        : rawUser;
      const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
      
      const user: AuthUser = {
        id: `user-${Date.now()}`,
        username: rawUser.toLowerCase(),
        name: formattedName,
        role: 'buyer_vip',
        email: rawUser.includes('@') ? rawUser : `${rawUser}@atacado.com.br`,
      };
      setCurrentUser(user);
      setUserRole('buyer_vip');
      setIsLoginModalOpen(false);
      setActiveTab('catalog');
      safeSetStorage('atacado_current_user', JSON.stringify(user));
      safeSetStorage('atacado_user_role', 'buyer_vip');
      return { success: true };
    }

    if ((cleanUser === 'visitante' || cleanUser === 'comprador_free') && cleanPass === '000') {
      const user: AuthUser = {
        id: 'user-visitante',
        username: 'visitante',
        name: 'Comprador (Sem Assinatura Ativa)',
        role: 'buyer_free',
        email: 'visitante@brasonline.com.br',
      };
      setCurrentUser(user);
      setUserRole('buyer_free');
      setIsLoginModalOpen(false);
      setActiveTab('catalog');
      safeSetStorage('atacado_current_user', JSON.stringify(user));
      safeSetStorage('atacado_user_role', 'buyer_free');
      return { success: true };
    }

    return { 
      success: false, 
      message: 'Credenciais inválidas. Verifique seu usuário ou utilize os botões de Acesso Rápido abaixo.' 
    };
  };

  const logout = () => {
    setCurrentUser(null);
    setUserRole('buyer_free');
    setCart([]);
    setActiveTab('catalog');
  };

  const updateStoreInfo = (info: Supplier) => {
    if (currentUser && userRole === 'seller') {
      const updatedUser: AuthUser = {
        ...currentUser,
        name: info.name,
        storeInfo: info,
      };
      setCurrentUser(updatedUser);
    }
  };

  const openCreateStoreModal = () => setIsCreateStoreModalOpen(true);
  const closeCreateStoreModal = () => setIsCreateStoreModalOpen(false);

  const createOrUpdateStore = (infoData: Partial<Supplier>): Supplier => {
    const fullStore: Supplier = {
      id: infoData.id || (userRole === 'seller' && currentUser?.storeInfo?.id) || `sup-${Date.now()}`,
      name: infoData.name || 'Sua Confecção',
      storeCode: infoData.storeCode || 'Galeria Pagé Brás • Loja 101',
      address: infoData.address || 'Rua Oriente, 500 - Brás, São Paulo - SP',
      whatsapp: infoData.whatsapp || '5511998887766',
      verified: true,
      region: infoData.region || 'Brás - SP',
      rating: infoData.rating || currentUser?.storeInfo?.rating || 5.0,
      totalProducts: infoData.totalProducts || currentUser?.storeInfo?.totalProducts || 0,
      cnpj: infoData.cnpj,
      category: infoData.category,
      minOrderQty: infoData.minOrderQty || 6,
      description: infoData.description,
      bannerUrl: infoData.bannerUrl,
    };

    setCustomStores((prev) => {
      const idx = prev.findIndex((s) => s.id === fullStore.id || s.name === fullStore.name);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = fullStore;
        return copy;
      }
      return [fullStore, ...prev];
    });

    // Save Store data permanently to Firestore
    const storeOwnerUid = auth.currentUser?.uid || currentUser?.id || fullStore.id;
    saveStoreToFirestore({
      ownerUid: storeOwnerUid,
      nome: fullStore.name,
      endereco: fullStore.address,
      contato: fullStore.whatsapp,
      description: fullStore.description,
      category: fullStore.category,
      region: fullStore.region,
    }).catch(err => console.error('Error saving store to Firestore:', err));

    if (userRole === 'admin') {
      setSelectedAdminStore(fullStore);
      setIsCreateStoreModalOpen(false);
      setActiveTab('admin_dashboard');
      return fullStore;
    }

    const sellerUser: AuthUser = {
      id: currentUser?.id || `user-seller-${Date.now()}`,
      username: currentUser?.username || 'vendedor',
      name: fullStore.name,
      role: 'seller',
      email: currentUser?.email || 'vendedor@brasonline.com.br',
      storeInfo: fullStore,
    };

    setCurrentUser(sellerUser);
    setUserRole('seller');
    setIsCreateStoreModalOpen(false);
    setActiveTab('seller_dashboard');
    return fullStore;
  };

  const deleteStore = (storeId: string) => {
    setCustomStores((prev) => prev.filter((s) => s.id !== storeId));
    // Also remove products from this store
    setProducts((prev) => prev.filter((p) => p?.supplier?.id !== storeId));
    if (selectedAdminStore?.id === storeId) {
      setSelectedAdminStore(null);
    }
  };

  const addProduct = async (newProd: Omit<Product, 'id' | 'createdAt'>) => {
    const userUid = auth.currentUser?.uid || currentUser?.id || `user-${Date.now()}`;
    const photosToUpload: (File | string)[] = [];
    if (newProd.imageUrl) photosToUpload.push(newProd.imageUrl);
    if (newProd.additionalImages && newProd.additionalImages.length > 0) {
      photosToUpload.push(...newProd.additionalImages);
    }

    try {
      const savedFirestoreProduct = await saveProductToFirestore(
        {
          name: newProd.title,
          price: newProd.price,
          suggestedRetailPrice: newProd.suggestedRetailPrice,
          minQuantity: newProd.minQuantity,
          category: newProd.category,
          colors: newProd.grade?.colors || ['Preto', 'Branco'],
          sizes: newProd.grade?.sizes || ['P', 'M', 'G', 'GG'],
          images: photosToUpload.length > 0 ? photosToUpload : ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80'],
          storeId: newProd.supplier?.id || 'store-01',
          storeName: newProd.supplier?.name || 'Fornecedor Atacado',
          region: newProd.region || 'Brás - SP',
        },
        userUid
      );

      const created: Product = {
        ...newProd,
        id: savedFirestoreProduct.id,
        imageUrl: savedFirestoreProduct.imageUrl,
        additionalImages: savedFirestoreProduct.images.slice(1),
        createdAt: new Date().toISOString().split('T')[0],
      };
      setProducts((prev) => [created, ...prev]);
    } catch (err) {
      console.error('Failed to save product to Firestore, saving locally:', err);
      const created: Product = {
        ...newProd,
        id: `prod-${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setProducts((prev) => [created, ...prev]);
    }
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    deleteProductFromFirestore(productId).catch((err) => console.error('Error deleting product from Firestore:', err));
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  // Cart state & methods: O carrinho fica vazio a não ser que o usuário esteja logado
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Limpeza da chave legada que continha itens de exemplo
    try {
      localStorage.removeItem('atacado_cart');
    } catch (_) {}

    const savedUser = safeGetStorage('atacado_current_user');
    if (savedUser) {
      try {
        const u = JSON.parse(savedUser);
        if (u && u.id) {
          const userCart = safeGetStorage(`atacado_cart_${u.id}`);
          if (userCart) {
            const parsed = JSON.parse(userCart);
            if (Array.isArray(parsed)) return parsed;
          }
        }
      } catch (_) {}
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sincroniza carrinho com o usuário ativo
  useEffect(() => {
    if (!currentUser) {
      setCart([]);
    } else {
      const userCart = safeGetStorage(`atacado_cart_${currentUser.id}`);
      if (userCart) {
        try {
          const parsed = JSON.parse(userCart);
          if (Array.isArray(parsed)) {
            setCart(parsed);
            return;
          }
        } catch (_) {}
      }
      setCart([]);
    }
  }, [currentUser?.id]);

  // Persiste carrinho no localStorage somente se o usuário estiver autenticado
  useEffect(() => {
    if (currentUser?.id) {
      safeSetStorage(`atacado_cart_${currentUser.id}`, JSON.stringify(cart));
    }
  }, [cart, currentUser?.id]);

  const addToCart = (item: CartItem) => {
    // Se o usuário não estiver logado, abre o modal de login para autenticação
    if (!currentUser) {
      openLoginModal();
      return;
    }

    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i
        );
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateCartQuantity = (itemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity: qty } : i))
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = currentUser ? cart.reduce((acc, curr) => acc + (curr.quantity || 1), 0) : 0;

  const setFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFiltersState((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => setFiltersState(defaultFilters);

  const openSubscriptionModal = (target: 'buyer' | 'seller') => {
    setSubscriptionTargetRole(target);
    setIsSubscriptionModalOpen(true);
  };

  const closeSubscriptionModal = () => {
    setIsSubscriptionModalOpen(false);
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const upgradeToVIP = (role: 'buyer_vip' | 'seller') => {
    setUserRole(role);
    const userId = auth.currentUser?.uid || currentUser?.id || `user-${Date.now()}`;
    
    // Save active subscription status to Firestore
    saveSubscriptionToFirestore(
      userId,
      role === 'seller' ? 'seller' : 'buyer',
      'active',
      'Clube VIP'
    ).catch((err) => console.error('Error saving subscription to Firestore:', err));

    if (role === 'buyer_vip') {
      const vipUser: AuthUser = {
        id: 'user-comprador',
        username: 'comprador',
        name: 'Comprador VIP Atacado',
        role: 'buyer_vip',
        email: 'comprador@atacadoonline.com.br',
      };
      setCurrentUser(vipUser);
    } else if (role === 'seller') {
      const sellerUser: AuthUser = {
        id: 'user-vendedor',
        username: 'vendedor',
        name: 'Minha Confeção Brás & 44',
        role: 'seller',
        email: 'vendedor@atacadoonline.com.br',
        storeInfo: defaultSellerStore,
      };
      setCurrentUser(sellerUser);
    } else if (currentUser) {
      setCurrentUser({
        ...currentUser,
        role: role,
      });
    }
    setIsSubscriptionModalOpen(false);
    if (role === 'seller') {
      setActiveTab('seller_dashboard');
    }
  };

  const usuarioTemAcessoPremium = (): boolean => {
    return userRole === 'buyer_vip' || userRole === 'admin';
  };

  // Filter and sort products
  const filteredProducts = products.filter((prod) => {
    if (!prod) return false;
    if (filters.category !== 'Todas' && prod.category !== filters.category) {
      return false;
    }
    if (filters.region !== 'Todas as Regiões' && prod.region !== filters.region) {
      return false;
    }
    if (filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      const matchTitle = (prod.title || '').toLowerCase().includes(q);
      const matchDesc = (prod.description || '').toLowerCase().includes(q);
      const matchSupplier = (prod.supplier?.name || '').toLowerCase().includes(q);
      const matchRegion = (prod.region || '').toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchSupplier && !matchRegion) {
        return false;
      }
    }
    const priceVal = Number(prod.price) || 0;
    if (filters.maxPrice !== null && priceVal > filters.maxPrice) {
      return false;
    }
    const minQtyVal = Number(prod.minQuantity) || 0;
    if (filters.minQuantityFilter !== null && minQtyVal > filters.minQuantityFilter) {
      return false;
    }
    if (filters.onlyReadyDelivery && !prod.readyDelivery) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    const priceA = Number(a?.price) || 0;
    const priceB = Number(b?.price) || 0;
    if (filters.sortBy === 'price_asc') return priceA - priceB;
    if (filters.sortBy === 'price_desc') return priceB - priceA;
    if (filters.sortBy === 'min_qty_asc') return (Number(a?.minQuantity) || 0) - (Number(b?.minQuantity) || 0);
    if (filters.sortBy === 'newest') return (b?.createdAt || '').localeCompare(a?.createdAt || '');
    // Ordem carregada (padrão): mantem a ordem exata em que as peças foram carregadas/cadastradas
    return 0;
  });

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        currentUser,
        login,
        logout,
        buyerLocation,
        setBuyerLocation,
        updateStoreInfo,
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
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        favorites,
        toggleFavorite,
        isFavorite,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        filters,
        setFilter,
        resetFilters,
        filteredProducts,
        selectedProduct,
        setSelectedProduct,
        isSubscriptionModalOpen,
        subscriptionTargetRole,
        openSubscriptionModal,
        closeSubscriptionModal,
        upgradeToVIP,
        usuarioTemAcessoPremium,
        isLocationModalOpen,
        setIsLocationModalOpen,
        isNewProductModalOpen,
        setIsNewProductModalOpen,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        registerUser,
        isCreateStoreModalOpen,
        openCreateStoreModal,
        closeCreateStoreModal,
        createOrUpdateStore,
        deleteStore,
        customStores,
        allStores,
        selectedAdminStore,
        setSelectedAdminStore,
        targetStoreForNewProduct,
        setTargetStoreForNewProduct,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

