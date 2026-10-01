export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  vendorName?: string;
}

export type UserRole = 'buyer_free' | 'buyer_vip' | 'seller' | 'admin';

export type CategoryType = 
  | 'Todas'
  | 'Feminino'
  | 'Infantil'
  | 'Masculino'
  | 'Calçados'
  | 'Bolsas'
  | 'Pijama'
  | 'Moda Feminina'
  | 'Moda Masculina'
  | 'Moda Infantil'
  | 'Acessórios'
  | 'Moda Fitness';

export interface CategoryCoverItem {
  category: CategoryType;
  label: string;
  subtitle?: string;
  imageUrl: string;
  supplierCount?: string;
}

export interface HeroBannerItem {
  id: string;
  imageUrl: string;
  title: string;
  linkType: 'category' | 'search' | 'url' | 'whatsapp';
  linkValue: string;
  active: boolean;
  order: number;
}

export interface SiteDesignSettings {
  headerColor: string; // ex: '#E8442B'
  bannerAutoplayInterval: number; // in seconds, ex: 5
  announcementActive: boolean;
  announcementText: string;
  announcementBg: string;
}

export type PoloRegion = 
  | 'Todas as Regiões'
  | 'Brás - SP'
  | 'Bom Retiro - SP'
  | 'Goiânia - GO (44)'
  | 'Fortaleza - CE'
  | 'Belo Horizonte - MG'
  | 'Sul de Minas (Malhas)';

export interface Supplier {
  id: string;
  name: string; // e.g., "Bella Modas Atacado"
  storeCode: string; // e.g., "Galeria Pagé Brás - Loja 244"
  address: string; // e.g., "Rua Oriente, 500 - Brás, São Paulo - SP"
  whatsapp: string; // e.g., "5511998887766"
  verified: boolean;
  region: PoloRegion;
  rating: number; // e.g., 4.9
  totalProducts?: number;
  cnpj?: string;
  category?: CategoryType;
  minOrderQty?: number;
  description?: string;
  bannerUrl?: string;
  avatarUrl?: string;
  tags?: string[]; // e.g. ["FABRICANTE", "ATACADO", "ENVIA PARA TODO BRASIL"]
  reviewCount?: number;
  specialties?: string[];
}

export interface WholesaleGrade {
  sizes: string[]; // e.g., ["P", "M", "G", "GG"]
  colors: string[]; // e.g., ["Preto", "Bege", "Verde Oliva", "Terracota"]
  gradeRatio: string; // e.g., "1P - 2M - 2G - 1GG"
}

export interface Product {
  id: string;
  title: string;
  price: number; // unit wholesale price (preço principal)
  discountPrice?: number; // valor com desconto opcional configurado na edição
  suggestedRetailPrice?: number; // suggested price for retail resale
  minQuantity: number; // minimum wholesale quantity
  category: CategoryType;
  region: PoloRegion;
  imageUrl: string;
  additionalImages?: string[];
  description: string;
  supplier: Supplier;
  inStock: boolean;
  readyDelivery: boolean; // Pronta Entrega vs Sob Encomenda
  grade: WholesaleGrade;
  createdAt: string;
  isFeatured?: boolean;
  discountBadge?: string; // ex: "-40% OFF"
  urgencyTag?: 'últimas unidades' | 'estoque baixo' | 'últimas peças'; // ex: "últimas peças", "últimas unidades" ou "estoque baixo"
}

export interface FilterState {
  category: CategoryType;
  region: PoloRegion;
  searchQuery: string;
  maxPrice: number | null;
  minQuantityFilter: number | null;
  onlyReadyDelivery: boolean;
  sortBy: 'relevance' | 'price_asc' | 'price_desc' | 'min_qty_asc' | 'newest';
}

export interface SubscriptionPlan {
  id: 'buyer_vip' | 'seller_pro';
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  roleTarget: 'buyer' | 'seller';
}

export interface AuthUser {
  id: string;
  username: string; // e.g., "comprador", "vendedor", "admin"
  name: string; // Display name
  role: UserRole;
  email: string;
  avatarUrl?: string;
  storeInfo?: Supplier;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export const AVAILABLE_COLORS: ColorOption[] = [
  { name: 'Preto', hex: '#18181b' },
  { name: 'Branco', hex: '#ffffff' },
  { name: 'Off-White', hex: '#fafaf9' },
  { name: 'Nude / Bege', hex: '#e7d3b3' },
  { name: 'Rosa Bebê', hex: '#fbcfe8' },
  { name: 'Rosa Pink', hex: '#ec4899' },
  { name: 'Azul Bebê', hex: '#bae6fd' },
  { name: 'Azul Marinho', hex: '#1e3a8a' },
  { name: 'Jeans Escuro', hex: '#3b82f6' },
  { name: 'Verde Oliva', hex: '#4d7c0f' },
  { name: 'Verde Menta', hex: '#6ee7b7' },
  { name: 'Vermelho', hex: '#dc2626' },
  { name: 'Terracota', hex: '#c2410c' },
  { name: 'Caramelo', hex: '#b45309' },
  { name: 'Amarelo Mostarda', hex: '#eab308' },
  { name: 'Lilás Lavanda', hex: '#c084fc' },
  { name: 'Laranja', hex: '#f97316' },
  { name: 'Cinza', hex: '#64748b' },
];

export const AVAILABLE_SIZES: string[] = [
  'RN',
  'P Bebê',
  'M Bebê',
  'G Bebê',
  '1 ano',
  '2 anos',
  '3 anos',
  '4 anos',
  '6 anos',
  '8 anos',
  '10 anos',
  '12 anos',
  '14 anos',
  '16 anos',
  '14',
  '16',
  'PP',
  'P',
  'M',
  'G',
  'GG',
  'EXG',
  '36',
  '38',
  '40',
  '42',
  '44',
  '46',
  'Único'
];

