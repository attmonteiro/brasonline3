export interface ShopeeCategory {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  icon?: string; // Optional fallback
  badge?: string;
}

export interface ShopeeFlashProduct {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  soldPercent: number; // e.g., 78 for 78% sold
  soldCount: number;
  stockLeft: number;
  imageUrl: string;
  vendorName: string;
  freeShipping?: boolean;
}

export interface ShopeeProduct {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  soldCountText: string; // e.g. "1,8 mil vendidos"
  freeShipping?: boolean;
  officialMall?: boolean;
  location: string;
  imageUrl: string;
  vendorName: string;
  category: string;
}

export interface ShopeeOfficialVendor {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  logoUrl: string;
  bannerUrl: string;
  rating: number;
  followers: string;
  totalProducts: number;
  location: string;
  category: string;
  cnpj: string;
  whatsapp: string;
  topProducts: {
    name: string;
    price: number;
    imageUrl: string;
  }[];
}

export interface ShopeeCoupon {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  minSpendText: string;
  type: 'discount' | 'shipping' | 'cashback';
  claimed: boolean;
  expiryText: string;
  badge: string;
}

// 1. CATEGORIAS (Apenas Feminino, Infantil, Masculino, Calçados, Bolsas, Pijama - com fotos reais de alta qualidade)
export const SHOPEE_CATEGORIES: ShopeeCategory[] = [
  { 
    id: 'cat-1', 
    name: 'Feminino', 
    slug: 'Feminino', 
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&auto=format&fit=crop&q=80',
    badge: 'Em Alta' 
  },
  { 
    id: 'cat-2', 
    name: 'Infantil', 
    slug: 'Infantil', 
    imageUrl: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=300&auto=format&fit=crop&q=80'
  },
  { 
    id: 'cat-3', 
    name: 'Masculino', 
    slug: 'Masculino', 
    imageUrl: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=300&auto=format&fit=crop&q=80'
  },
  { 
    id: 'cat-4', 
    name: 'Calçados', 
    slug: 'Calçados', 
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&auto=format&fit=crop&q=80',
    badge: 'Oferta' 
  },
  { 
    id: 'cat-5', 
    name: 'Acessórios', 
    slug: 'Acessórios', 
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&auto=format&fit=crop&q=80'
  },
  { 
    id: 'cat-6', 
    name: 'Pijama', 
    slug: 'Pijama', 
    imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&auto=format&fit=crop&q=80',
    badge: 'Conforto' 
  },
];

// 2. CUPONS DE DESCONTO ESTILO TICKET DA SHOPEE
export const SHOPEE_COUPONS: ShopeeCoupon[] = [
  {
    id: 'coup-1',
    code: 'BRAS10OFF',
    title: 'R$ 10 OFF',
    subtitle: 'Em compras acima de R$ 50',
    minSpendText: 'Gasto mín. R$ 50',
    type: 'discount',
    claimed: false,
    expiryText: 'Expira hoje',
    badge: 'TODO O SITE'
  },
  {
    id: 'coup-2',
    code: 'FROTAEXPRESS',
    title: 'DESPACHO RÁPIDO',
    subtitle: 'Válido para envios em todo o Brasil',
    minSpendText: 'Gasto mín. R$ 29',
    type: 'shipping',
    claimed: false,
    expiryText: 'Válido até 23:59',
    badge: 'LOGÍSTICA SEGURA'
  },
  {
    id: 'coup-3',
    code: 'ATACADO25',
    title: 'R$ 25 OFF',
    subtitle: 'Para pedidos acima de R$ 150',
    minSpendText: 'Gasto mín. R$ 150',
    type: 'discount',
    claimed: false,
    expiryText: 'Limitado a 500 usos',
    badge: 'ESPECIAL ATACADO'
  },
  {
    id: 'coup-4',
    code: 'BEMVINDO15',
    title: '15% OFF',
    subtitle: 'Cupom de Boas-Vindas para novo lojista',
    minSpendText: 'Sem valor mínimo',
    type: 'cashback',
    claimed: false,
    expiryText: 'Primeira Compra',
    badge: 'NOVO CLIENTE'
  }
];

// 3. OFERTAS RELÂMPAGO (FLASH SALE)
export const SHOPEE_FLASH_SALE_ITEMS: ShopeeFlashProduct[] = [
  {
    id: 'flash-1',
    title: 'Vestido Canelado',
    price: 34.90,
    originalPrice: 89.90,
    discountPercent: 61,
    soldPercent: 88,
    soldCount: 342,
    stockLeft: 18,
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=450&auto=format&fit=crop&q=80',
    vendorName: 'Atelier Brás Confecções',
    freeShipping: true,
  },
  {
    id: 'flash-2',
    title: 'Calça Mom Jeans',
    price: 49.99,
    originalPrice: 119.90,
    discountPercent: 58,
    soldPercent: 92,
    soldCount: 520,
    stockLeft: 12,
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=450&auto=format&fit=crop&q=80',
    vendorName: 'Polo Jeans Brás & Co.',
    freeShipping: true,
  },
  {
    id: 'flash-3',
    title: 'Tênis Slip-on',
    price: 39.90,
    originalPrice: 79.90,
    discountPercent: 50,
    soldPercent: 75,
    soldCount: 280,
    stockLeft: 34,
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=450&auto=format&fit=crop&q=80',
    vendorName: 'Calçados & Conforto SP',
    freeShipping: true,
  },
  {
    id: 'flash-4',
    title: 'Camisa Polo Piquet',
    price: 29.90,
    originalPrice: 65.00,
    discountPercent: 54,
    soldPercent: 84,
    soldCount: 410,
    stockLeft: 22,
    imageUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=450&auto=format&fit=crop&q=80',
    vendorName: 'Urbano Man Confecção',
    freeShipping: false,
  },
  {
    id: 'flash-5',
    title: 'Bolsa Tiracolo',
    price: 38.50,
    originalPrice: 85.00,
    discountPercent: 55,
    soldPercent: 69,
    soldCount: 195,
    stockLeft: 45,
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=450&auto=format&fit=crop&q=80',
    vendorName: 'Bella Couros SP',
    freeShipping: true,
  },
  {
    id: 'flash-6',
    title: 'Conjunto Fitness',
    price: 44.90,
    originalPrice: 99.00,
    discountPercent: 55,
    soldPercent: 94,
    soldCount: 680,
    stockLeft: 8,
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=450&auto=format&fit=crop&q=80',
    vendorName: 'SportFit Brasil',
    freeShipping: true,
  },
  {
    id: 'flash-7',
    title: 'Cropped Modal',
    price: 24.90,
    originalPrice: 59.90,
    discountPercent: 58,
    soldPercent: 82,
    soldCount: 310,
    stockLeft: 14,
    imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=450&auto=format&fit=crop&q=80',
    vendorName: 'Atelier Brás Confecções',
    freeShipping: true,
  },
  {
    id: 'flash-8',
    title: 'Bermuda Jeans',
    price: 42.90,
    originalPrice: 89.90,
    discountPercent: 52,
    soldPercent: 89,
    soldCount: 440,
    stockLeft: 11,
    imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=450&auto=format&fit=crop&q=80',
    vendorName: 'Polo Jeans Brás & Co.',
    freeShipping: true,
  }
];

// 4. FORNECEDORES OFICIAIS (BRAS MALL / SHOPEE MALL STYLE)
export const SHOPEE_OFFICIAL_VENDORS: ShopeeOfficialVendor[] = [
  {
    id: 'mall-1',
    name: 'Atelier Brás Confecções',
    subtitle: 'Fábrica Oficial de Alfaiataria & Moda Feminina',
    badge: 'OFICIAL',
    logoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    followers: '45,8 mil',
    totalProducts: 142,
    location: 'Rua Miller - Brás, SP',
    category: 'Moda Feminina',
    cnpj: '34.567.890/0001-12',
    whatsapp: '5511991234567',
    topProducts: [
      { name: 'Blazer Estruturado', price: 99.90, imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=200&auto=format&fit=crop&q=80' },
      { name: 'Vestido Chemise Linho', price: 69.90, imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&auto=format&fit=crop&q=80' },
      { name: 'Calça Pantalona', price: 79.90, imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=200&auto=format&fit=crop&q=80' },
    ]
  },
  {
    id: 'mall-2',
    name: 'Polo Jeans Brás & Co.',
    subtitle: 'Indústria Têxtil Especializada em Jeanswear Premium',
    badge: 'OFICIAL',
    logoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    followers: '68,2 mil',
    totalProducts: 98,
    location: 'Mega Polo Moda - Brás, SP',
    category: 'Jeans & Denim',
    cnpj: '18.942.311/0001-45',
    whatsapp: '5511982345678',
    topProducts: [
      { name: 'Calça Wide Leg Jeans', price: 84.90, imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200&auto=format&fit=crop&q=80' },
      { name: 'Jaqueta Jeans Oversized', price: 99.00, imageUrl: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=200&auto=format&fit=crop&q=80' },
      { name: 'Short Jeans Desfiado', price: 42.00, imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&auto=format&fit=crop&q=80' },
    ]
  },
  {
    id: 'mall-3',
    name: 'SportFit Brasil Confecção',
    subtitle: 'Alta Performance em Moda Fitness & Poliamida',
    badge: 'OFICIAL',
    logoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    followers: '32,4 mil',
    totalProducts: 85,
    location: 'Shopping All Brás, SP',
    category: 'Moda Fitness',
    cnpj: '26.831.754/0001-90',
    whatsapp: '5511946789012',
    topProducts: [
      { name: 'Top Bojo Removível', price: 32.90, imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&auto=format&fit=crop&q=80' },
      { name: 'Legging Cós Alto UV', price: 45.00, imageUrl: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=200&auto=format&fit=crop&q=80' },
      { name: 'Macacão Poliamida', price: 69.90, imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&auto=format&fit=crop&q=80' },
    ]
  },
  {
    id: 'mall-4',
    name: 'Urbano Man Confecção',
    subtitle: 'Camisaria Masculina, Polos e Bermudas no Atacado',
    badge: 'OFICIAL',
    logoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    followers: '29,1 mil',
    totalProducts: 110,
    location: 'Rua Oriente - Brás, SP',
    category: 'Moda Masculina',
    cnpj: '09.412.633/0001-78',
    whatsapp: '5511973456789',
    topProducts: [
      { name: 'Camisa Linho Slim', price: 54.90, imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200&auto=format&fit=crop&q=80' },
      { name: 'Bermuda Sarja', price: 49.90, imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=200&auto=format&fit=crop&q=80' },
      { name: 'Camiseta Algodão Egípcio', price: 34.90, imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=200&auto=format&fit=crop&q=80' },
    ]
  }
];

// 5. BANNER PRINCIPAL + BANNERS LATERAIS (SHOPEE STYLE)
export const SHOPEE_HERO_SLIDES = [
  {
    id: 'slide-1',
    title: 'SUPER SALDÃO DO BRÁS',
    subtitle: 'Até 70% OFF no atacado direto da confecção',
    badge: 'OFERTAS EXCLUSIVAS',
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&auto=format&fit=crop&q=80',
    ctaText: 'Aproveitar Agora',
    tag: 'DIRETO DA FÁBRICA'
  },
  {
    id: 'slide-2',
    title: 'LANÇAMENTOS OUTONO / INVERNO',
    subtitle: 'Grade completa com pronta entrega para lojistas de todo o Brasil',
    badge: 'NOVA COLEÇÃO',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop&q=80',
    ctaText: 'Ver Novidades',
    tag: 'POLO BRÁS & BOM RETIRO'
  },
  {
    id: 'slide-3',
    title: 'FESTIVAL DO JEANS & DENIM',
    subtitle: 'Calças, shorts e jaquetas a partir de R$ 39,90 no atacado',
    badge: 'PREÇO DE CUSTO',
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&auto=format&fit=crop&q=80',
    ctaText: 'Comprar Jeans',
    tag: 'GRADE DO 36 AO 48'
  }
];

export const SHOPEE_SIDE_BANNERS = [
  {
    id: 'side-1',
    title: 'Fábricas Verificadas',
    subtitle: 'Compre a partir de 1 peça sem CNPJ',
    badge: '100% SEGURO',
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80',
    actionText: 'Conhecer Fornecedores'
  },
  {
    id: 'side-2',
    title: 'Bolsas & Calçados',
    subtitle: 'Lançamentos da semana com até 50% OFF',
    badge: 'PRONTA ENTREGA',
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80',
    actionText: 'Ver Catálogo'
  }
];

// 6. PRODUTOS RECOMENDADOS (DAILY DISCOVER - GRID INFINITO COM 18+ PRODUTOS)
export const SHOPEE_RECOMMENDED_PRODUCTS: ShopeeProduct[] = [
  {
    id: 'rec-1',
    title: 'Vestido Alfaiataria',
    price: 79.90,
    originalPrice: 159.90,
    discountPercent: 50,
    rating: 4.9,
    soldCountText: '2,4 mil vendidos',
    freeShipping: true,
    officialMall: true,
    location: 'São Paulo - SP',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&auto=format&fit=crop&q=80',
    vendorName: 'Atelier Brás Confecções',
    category: 'Moda Feminina'
  },
  {
    id: 'rec-2',
    title: 'Calça Wide Leg',
    price: 89.90,
    originalPrice: 179.90,
    discountPercent: 50,
    rating: 4.8,
    soldCountText: '3,8 mil vendidos',
    freeShipping: true,
    officialMall: true,
    location: 'São Paulo - SP',
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&auto=format&fit=crop&q=80',
    vendorName: 'Polo Jeans Brás & Co.',
    category: 'Jeans'
  },
  {
    id: 'rec-3',
    title: 'Camisa Linho Slim',
    price: 54.90,
    originalPrice: 99.00,
    discountPercent: 45,
    rating: 4.9,
    soldCountText: '1,2 mil vendidos',
    freeShipping: true,
    officialMall: false,
    location: 'São Paulo - SP',
    imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&auto=format&fit=crop&q=80',
    vendorName: 'Urbano Man Confecção',
    category: 'Moda Masculina'
  },
  {
    id: 'rec-4',
    title: 'Bolsa Transversal',
    price: 49.90,
    originalPrice: 89.90,
    discountPercent: 44,
    rating: 4.9,
    soldCountText: '4,1 mil vendidos',
    freeShipping: true,
    officialMall: true,
    location: 'São Paulo - SP',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&auto=format&fit=crop&q=80',
    vendorName: 'Bella Couros SP',
    category: 'Bolsas'
  },
  {
    id: 'rec-5',
    title: 'Conjunto Moletom',
    price: 84.90,
    originalPrice: 149.90,
    discountPercent: 43,
    rating: 5.0,
    soldCountText: '980 vendidos',
    freeShipping: false,
    officialMall: false,
    location: 'São Paulo - SP',
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&auto=format&fit=crop&q=80',
    vendorName: 'Malhas & Tricot Sul',
    category: 'Moda Feminina'
  },
  {
    id: 'rec-6',
    title: 'Tênis Chunky Urban',
    price: 99.00,
    originalPrice: 189.90,
    discountPercent: 48,
    rating: 4.8,
    soldCountText: '2,9 mil vendidos',
    freeShipping: true,
    officialMall: false,
    location: 'Nova Serrana - MG',
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&auto=format&fit=crop&q=80',
    vendorName: 'Calçados & Conforto SP',
    category: 'Calçados'
  },
  {
    id: 'rec-7',
    title: 'Blazer Alfaiataria',
    price: 119.90,
    originalPrice: 199.90,
    discountPercent: 40,
    rating: 4.9,
    soldCountText: '1,5 mil vendidos',
    freeShipping: true,
    officialMall: true,
    location: 'São Paulo - SP',
    imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&auto=format&fit=crop&q=80',
    vendorName: 'Atelier Brás Confecções',
    category: 'Moda Feminina'
  },
  {
    id: 'rec-8',
    title: 'Cropped Modal',
    price: 39.90,
    originalPrice: 69.90,
    discountPercent: 43,
    rating: 4.7,
    soldCountText: '5,3 mil vendidos',
    freeShipping: true,
    officialMall: false,
    location: 'São Paulo - SP',
    imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&auto=format&fit=crop&q=80',
    vendorName: 'Lumina Tricot & Malhas',
    category: 'Moda Feminina'
  },
  {
    id: 'rec-9',
    title: 'Conjunto Poliamida',
    price: 69.90,
    originalPrice: 110.00,
    discountPercent: 36,
    rating: 4.9,
    soldCountText: '3,1 mil vendidos',
    freeShipping: true,
    officialMall: true,
    location: 'São Paulo - SP',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&auto=format&fit=crop&q=80',
    vendorName: 'SportFit Brasil',
    category: 'Moda Fitness'
  },
  {
    id: 'rec-10',
    title: 'Bermuda Sarja',
    price: 49.90,
    originalPrice: 85.00,
    discountPercent: 41,
    rating: 4.8,
    soldCountText: '1,7 mil vendidos',
    freeShipping: false,
    officialMall: false,
    location: 'São Paulo - SP',
    imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&auto=format&fit=crop&q=80',
    vendorName: 'Urbano Man Confecção',
    category: 'Moda Masculina'
  },
  {
    id: 'rec-11',
    title: 'Jaqueta Jeans Stone',
    price: 99.00,
    originalPrice: 169.90,
    discountPercent: 42,
    rating: 4.9,
    soldCountText: '890 vendidos',
    freeShipping: true,
    officialMall: true,
    location: 'São Paulo - SP',
    imageUrl: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=400&auto=format&fit=crop&q=80',
    vendorName: 'Polo Jeans Brás & Co.',
    category: 'Jeans'
  },
  {
    id: 'rec-12',
    title: 'Mochila Antifurto',
    price: 89.90,
    originalPrice: 149.90,
    discountPercent: 40,
    rating: 4.9,
    soldCountText: '2,1 mil vendidos',
    freeShipping: true,
    officialMall: false,
    location: 'São Paulo - SP',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format&fit=crop&q=80',
    vendorName: 'Bella Couros SP',
    category: 'Bolsas'
  },
  {
    id: 'rec-13',
    title: 'Camiseta Algodão Egípcio',
    price: 34.90,
    originalPrice: 59.90,
    discountPercent: 42,
    rating: 5.0,
    soldCountText: '6,4 mil vendidos',
    freeShipping: true,
    officialMall: true,
    location: 'São Paulo - SP',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=80',
    vendorName: 'Urbano Man Confecção',
    category: 'Moda Masculina'
  },
  {
    id: 'rec-14',
    title: 'Vestido Floral Fluido',
    price: 94.90,
    originalPrice: 159.00,
    discountPercent: 40,
    rating: 4.8,
    soldCountText: '1,9 mil vendidos',
    freeShipping: true,
    officialMall: true,
    location: 'São Paulo - SP',
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&auto=format&fit=crop&q=80',
    vendorName: 'Atelier Brás Confecções',
    category: 'Moda Feminina'
  },
  {
    id: 'rec-15',
    title: 'Short Jeans Desfiado',
    price: 42.00,
    originalPrice: 75.00,
    discountPercent: 44,
    rating: 4.7,
    soldCountText: '4,8 mil vendidos',
    freeShipping: false,
    officialMall: false,
    location: 'São Paulo - SP',
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&auto=format&fit=crop&q=80',
    vendorName: 'Polo Jeans Brás & Co.',
    category: 'Jeans'
  },
  {
    id: 'rec-16',
    title: 'Calça Flare Jeans',
    price: 84.90,
    originalPrice: 139.90,
    discountPercent: 39,
    rating: 4.8,
    soldCountText: '2,6 mil vendidos',
    freeShipping: true,
    officialMall: true,
    location: 'São Paulo - SP',
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&auto=format&fit=crop&q=80',
    vendorName: 'Polo Jeans Brás & Co.',
    category: 'Jeans'
  },
  {
    id: 'rec-17',
    title: 'Top Fitness Cruzado',
    price: 32.90,
    originalPrice: 55.00,
    discountPercent: 40,
    rating: 4.9,
    soldCountText: '3,7 mil vendidos',
    freeShipping: true,
    officialMall: false,
    location: 'São Paulo - SP',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&auto=format&fit=crop&q=80',
    vendorName: 'SportFit Brasil',
    category: 'Moda Fitness'
  },
  {
    id: 'rec-18',
    title: 'Chemise Linho',
    price: 69.90,
    originalPrice: 129.90,
    discountPercent: 46,
    rating: 4.9,
    soldCountText: '1,6 mil vendidos',
    freeShipping: true,
    officialMall: true,
    location: 'São Paulo - SP',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&auto=format&fit=crop&q=80',
    vendorName: 'Atelier Brás Confecções',
    category: 'Moda Feminina'
  },
  {
    id: 'rec-19',
    title: 'Pijama Cetim Americano',
    price: 49.90,
    originalPrice: 89.90,
    discountPercent: 44,
    rating: 4.9,
    soldCountText: '3,2 mil vendidos',
    freeShipping: true,
    officialMall: true,
    location: 'São Paulo - SP',
    imageUrl: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=400&auto=format&fit=crop&q=80',
    vendorName: 'Doce Sonho Confecções',
    category: 'Pijama'
  },
  {
    id: 'rec-20',
    title: 'Pijama Infantil Algodão',
    price: 34.90,
    originalPrice: 59.90,
    discountPercent: 42,
    rating: 4.8,
    soldCountText: '2,1 mil vendidos',
    freeShipping: true,
    officialMall: false,
    location: 'São Paulo - SP',
    imageUrl: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&auto=format&fit=crop&q=80',
    vendorName: 'Kids & Cia Brás',
    category: 'Infantil'
  },
  {
    id: 'rec-21',
    title: 'Pijama Malha Fria',
    price: 45.00,
    originalPrice: 79.90,
    discountPercent: 43,
    rating: 4.9,
    soldCountText: '1,8 mil vendidos',
    freeShipping: true,
    officialMall: true,
    location: 'São Paulo - SP',
    imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&auto=format&fit=crop&q=80',
    vendorName: 'Sonho & Conforto Homem',
    category: 'Pijama'
  },
  {
    id: 'rec-22',
    title: 'Vestido Tule Infantil',
    price: 42.90,
    originalPrice: 75.00,
    discountPercent: 43,
    rating: 4.9,
    soldCountText: '1,4 mil vendidos',
    freeShipping: true,
    officialMall: true,
    location: 'São Paulo - SP',
    imageUrl: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&auto=format&fit=crop&q=80',
    vendorName: 'Princesas Kids Moda',
    category: 'Infantil'
  }
];
