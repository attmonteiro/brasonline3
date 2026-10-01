export interface MultivendorProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  badge?: string; // e.g. "Novo", "-20%", "-35%", "Top Vendas"
  imageUrl: string;
  rating: number;
  reviewCount: number;
  vendorName: string;
  vendorId?: string;
  inStock?: boolean;
}

export interface MultivendorStore {
  id: string;
  name: string;
  category: string;
  logoUrl: string;
  coverUrl: string;
  rating: number;
  reviewCount: number;
  location: string;
  totalProducts: number;
  whatsapp: string;
  description: string;
}

export interface HeroSlide {
  id: string;
  tag: string;
  title: string;
  description: string;
  ctaText: string;
  featuredOffer: {
    badgeText: string;
    discountHighlight: string;
    items: {
      name: string;
      price: number;
      originalPrice: number;
      imageUrl: string;
    }[];
  };
}

export interface MiniPromoCard {
  id: string;
  title: string;
  subtitle: string;
  discountBadge: string;
  imageUrl: string;
  categorySlug: string;
}

export interface ThematicBanner {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  badge: string;
  bgColor: string;
  imageUrl: string;
}

// 2. HERO SLIDES
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'hero-1',
    tag: 'Melhor Preço',
    title: 'As Melhores Ofertas da Estação',
    description: 'Conecte sua loja diretamente a centenas de fornecedores e fabricantes verificados em todo o Brasil. Preços de atacado e varejo sem intermediários.',
    ctaText: 'Comprar Agora',
    featuredOffer: {
      badgeText: 'Oferta da Semana',
      discountHighlight: 'Economize até 70%',
      items: [
        {
          name: 'Vestido Midi Alfaiataria',
          price: 79.90,
          originalPrice: 159.90,
          imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&auto=format&fit=crop&q=80',
        },
        {
          name: 'Conjunto Moletom Casual',
          price: 64.50,
          originalPrice: 129.00,
          imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&auto=format&fit=crop&q=80',
        },
        {
          name: 'Tênis Urbano Confort Flex',
          price: 99.00,
          originalPrice: 199.00,
          imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&auto=format&fit=crop&q=80',
        }
      ]
    }
  },
  {
    id: 'hero-2',
    tag: 'Melhor Preço',
    title: 'Lançamentos Direto da Fábrica',
    description: 'Novas coleções semanais com pronta entrega dos polos têxteis do Brás, Bom Retiro e grandes confecções nacionais.',
    ctaText: 'Comprar Agora',
    featuredOffer: {
      badgeText: 'Exclusivo Lojistas',
      discountHighlight: 'Economize até 60%',
      items: [
        {
          name: 'Camisa Linho Masculina Premium',
          price: 54.90,
          originalPrice: 110.00,
          imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&auto=format&fit=crop&q=80',
        },
        {
          name: 'Calça Jeans Wide Leg 100% Algodão',
          price: 89.90,
          originalPrice: 179.90,
          imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&auto=format&fit=crop&q=80',
        },
        {
          name: 'Bolsa Tiracolo em Couro Sintético',
          price: 49.90,
          originalPrice: 99.90,
          imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&auto=format&fit=crop&q=80',
        }
      ]
    }
  }
];

// 3. FAIXA DE MINI-PROMOÇÕES (3 cards fundo rosa claro #FDF1EC)
export const MINI_PROMOS: MiniPromoCard[] = [
  {
    id: 'promo-1',
    title: 'Moda Feminina em Alta',
    subtitle: 'Vestidos, blusas e alfaiataria',
    discountBadge: 'Até 45% OFF',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&auto=format&fit=crop&q=80',
    categorySlug: 'feminina',
  },
  {
    id: 'promo-2',
    title: 'Jeans & Denim Brasil',
    subtitle: 'Grade completa direto do polo',
    discountBadge: 'Até 50% OFF',
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=80',
    categorySlug: 'jeans',
  },
  {
    id: 'promo-3',
    title: 'Calçados & Acessórios',
    subtitle: 'Tênis, rasteiras e bolsas',
    discountBadge: 'Até 35% OFF',
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop&q=80',
    categorySlug: 'calcados',
  },
];

// 4. PRODUTOS EM DESTAQUE (Bloco misto + Grid de 4 colunas)
export const FEATURED_LIFESTYLE_BANNER = {
  title: 'Coleção Nova Estação',
  subtitle: 'Qualidade premium dos melhores confeccionistas',
  discountText: 'Até 40% OFF',
  ctaText: 'Ver Coleção',
  imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&auto=format&fit=crop&q=80',
};

export const FEATURED_VERTICAL_LIST: MultivendorProduct[] = [
  {
    id: 'feat-v1',
    name: 'Blazer Estruturado em Alfaiataria',
    category: 'Moda Feminina',
    price: 119.90,
    originalPrice: 179.90,
    discountPercentage: 33,
    badge: 'Destaque',
    imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=300&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 94,
    vendorName: 'Atelier Brás Confecções',
  },
  {
    id: 'feat-v2',
    name: 'Camisa Social Masculina Slim Fit',
    category: 'Moda Masculina',
    price: 68.00,
    originalPrice: 95.00,
    discountPercentage: 28,
    badge: '-28%',
    imageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=300&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewCount: 62,
    vendorName: 'Urbano Man Confecção',
  },
  {
    id: 'feat-v3',
    name: 'Conjunto Moletom Confort Fleece',
    category: 'Inverno & Casual',
    price: 84.90,
    originalPrice: 120.00,
    discountPercentage: 29,
    badge: 'Novo',
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&auto=format&fit=crop&q=80',
    rating: 5.0,
    reviewCount: 45,
    vendorName: 'Malhas & Tricot Sul',
  },
  {
    id: 'feat-v4',
    name: 'Bolsa Tote Feminina Estruturada',
    category: 'Bolsas & Acessórios',
    price: 79.00,
    originalPrice: 119.00,
    discountPercentage: 34,
    badge: '-34%',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 118,
    vendorName: 'Bella Couros SP',
  }
];

export const FEATURED_GRID_PRODUCTS: MultivendorProduct[] = [
  {
    id: 'prod-g1',
    name: 'Vestido Longo Floral com Fendas',
    category: 'Moda Feminina',
    price: 94.90,
    originalPrice: 139.90,
    discountPercentage: 32,
    badge: '-32%',
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 154,
    vendorName: 'Atelier Brás Confecções',
  },
  {
    id: 'prod-g2',
    name: 'Calça Jeans Mom Fit Cintura Alta',
    category: 'Jeans & Denim',
    price: 79.90,
    originalPrice: 99.90,
    discountPercentage: 20,
    badge: '-20%',
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewCount: 88,
    vendorName: 'Polo Jeans Brás & Co.',
  },
  {
    id: 'prod-g3',
    name: 'Camiseta Básica Algodão Egípcio 30.1',
    category: 'Moda Masculina',
    price: 34.90,
    originalPrice: 49.90,
    discountPercentage: 30,
    badge: 'Novo',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
    rating: 5.0,
    reviewCount: 204,
    vendorName: 'Urbano Man Confecção',
  },
  {
    id: 'prod-g4',
    name: 'Conjunto Fitness Poliamida UV50+',
    category: 'Moda Fitness',
    price: 69.90,
    originalPrice: 89.90,
    discountPercentage: 22,
    badge: '-22%',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 76,
    vendorName: 'SportFit Brasil Confecção',
  }
];

// 5. SEÇÃO FORNECEDORES EM DESTAQUE (Multivendor)
export const FEATURED_VENDORS: MultivendorStore[] = [
  {
    id: 'vend-1',
    name: 'Atelier Brás Confecções',
    category: 'Moda Feminina & Alfaiataria',
    logoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 312,
    location: 'Brás - São Paulo, SP',
    totalProducts: 48,
    whatsapp: '5511991234567',
    description: 'Fábrica própria especializada em alfaiataria feminina moderna, blazers e vestidos para boutiques em todo o país.'
  },
  {
    id: 'vend-2',
    name: 'Polo Jeans Brás & Co.',
    category: 'Jeans & Moda Casual',
    logoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewCount: 198,
    location: 'Mega Polo Moda - Brás, SP',
    totalProducts: 36,
    whatsapp: '5511982345678',
    description: 'Lavagens exclusivas, jeans 100% algodão e lycra com pronta entrega e grade comercial confiável.'
  },
  {
    id: 'vend-3',
    name: 'Lumina Tricot & Malhas',
    category: 'Tricot Fino & Malharia',
    logoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80',
    rating: 5.0,
    reviewCount: 420,
    location: 'Bom Retiro - São Paulo, SP',
    totalProducts: 64,
    whatsapp: '5511973456789',
    description: 'Alta tecnologia em teares eletrônicos produzindo tricots premium com acabamentos impecáveis.'
  },
  {
    id: 'vend-4',
    name: 'SportFit Brasil Confecção',
    category: 'Moda Fitness & Beachwear',
    logoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 165,
    location: 'Shopping All Brás, SP',
    totalProducts: 42,
    whatsapp: '5511946789012',
    description: 'Confecção em poliamida com alta compressão, zero transparência e proteção solar permanente.'
  }
];

// 6. MELHORES OFERTAS (Grid denso com badges vermelhos #E8442B)
export const BEST_DEALS_PRODUCTS: MultivendorProduct[] = [
  {
    id: 'deal-1',
    name: 'Vestido Chemise em Linho Puro',
    category: 'Moda Feminina',
    price: 69.90,
    originalPrice: 139.90,
    discountPercentage: 50,
    badge: '-50% OFF',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 88,
    vendorName: 'Atelier Brás Confecções',
  },
  {
    id: 'deal-2',
    name: 'Jaqueta Jeans Oversized Unissex',
    category: 'Jeans & Denim',
    price: 99.00,
    originalPrice: 189.00,
    discountPercentage: 48,
    badge: '-48% OFF',
    imageUrl: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewCount: 142,
    vendorName: 'Polo Jeans Brás & Co.',
  },
  {
    id: 'deal-3',
    name: 'Cropped Tricot Trançado Alça Larga',
    category: 'Tricot & Moda Jovem',
    price: 39.90,
    originalPrice: 75.00,
    discountPercentage: 47,
    badge: '-47% OFF',
    imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewCount: 95,
    vendorName: 'Lumina Tricot & Malhas',
  },
  {
    id: 'deal-4',
    name: 'Bermuda Sarja Masculina com Elastano',
    category: 'Moda Masculina',
    price: 49.90,
    originalPrice: 89.90,
    discountPercentage: 45,
    badge: '-45% OFF',
    imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 67,
    vendorName: 'Urbano Man Confecção',
  },
  {
    id: 'deal-5',
    name: 'Mochila Antifurto Impermeável',
    category: 'Bolsas & Malas',
    price: 89.90,
    originalPrice: 159.90,
    discountPercentage: 44,
    badge: '-44% OFF',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 210,
    vendorName: 'Bella Couros SP',
  },
  {
    id: 'deal-6',
    name: 'Legging Cós Alto Modeladora',
    category: 'Moda Fitness',
    price: 45.00,
    originalPrice: 79.90,
    discountPercentage: 43,
    badge: '-43% OFF',
    imageUrl: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&auto=format&fit=crop&q=80',
    rating: 5.0,
    reviewCount: 184,
    vendorName: 'SportFit Brasil Confecção',
  }
];

// 7. SEÇÃO MAIS VENDIDOS (Grid + Ver Todos)
export const BEST_SELLERS_PRODUCTS: MultivendorProduct[] = [
  {
    id: 'bs-1',
    name: 'Conjunto Alfaiataria Colete e Calça Pantalona',
    category: 'Moda Feminina',
    price: 129.90,
    originalPrice: 169.90,
    discountPercentage: 23,
    badge: 'Campeão de Vendas',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80',
    rating: 5.0,
    reviewCount: 382,
    vendorName: 'Atelier Brás Confecções',
  },
  {
    id: 'bs-2',
    name: 'Polo Piquet Algodão Penteado Bordada',
    category: 'Moda Masculina',
    price: 48.00,
    originalPrice: 65.00,
    discountPercentage: 26,
    badge: 'Mais Vendido',
    imageUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 295,
    vendorName: 'Urbano Man Confecção',
  },
  {
    id: 'bs-3',
    name: 'Calça Flare Denim Escuro com Elastano',
    category: 'Jeans & Denim',
    price: 84.90,
    originalPrice: 110.00,
    discountPercentage: 22,
    badge: 'Top 1 Jeans',
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewCount: 240,
    vendorName: 'Polo Jeans Brás & Co.',
  },
  {
    id: 'bs-4',
    name: 'Top Fitness Cruzado com Bojo Removível',
    category: 'Moda Fitness',
    price: 32.90,
    originalPrice: 45.00,
    discountPercentage: 27,
    badge: 'Destaque Semanal',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 178,
    vendorName: 'SportFit Brasil Confecção',
  }
];

// 8. DOIS BANNERS TEMÁTICOS LADO A LADO
export const THEMATIC_BANNERS: ThematicBanner[] = [
  {
    id: 'banner-sport',
    title: 'Coleção Esportiva & Performance',
    subtitle: 'Tecidos tecnológicos respiráveis e máxima durabilidade para treino e dia a dia.',
    ctaText: 'Ver Coleção Esportiva',
    badge: 'Atacado & Varejo',
    bgColor: 'bg-emerald-950',
    imageUrl: 'https://images.unsplash.com/photo-1483721074577-8383e6351726?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'banner-gamer',
    title: 'Cadeiras Gamer & Home Office',
    subtitle: 'Ergonomia aprovada, design arrojado e preços imbatíveis para revenda e conforto.',
    ctaText: 'Explorar Linha Gamer',
    badge: 'Envio Imediato',
    bgColor: 'bg-[#14213D]',
    imageUrl: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&auto=format&fit=crop&q=80',
  }
];

// 9. BANNER FINAL DE CUPOM
export const COUPON_DATA = {
  title: 'Economize até 50% com nossos cupons',
  description: 'Use o cupom exclusivo de boas-vindas na sua primeira compra com qualquer fornecedor cadastrado.',
  couponCode: 'BRAS50OFF',
  ctaText: 'Copiar Cupom & Comprar',
};
