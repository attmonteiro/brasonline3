import { Product, SubscriptionPlan, CategoryCoverItem } from '../types';

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'buyer_vip',
    name: 'Plano Comprador VIP',
    price: 29.90,
    period: 'por mês',
    description: 'Acesso ilimitado ao WhatsApp e endereço das fábricas de São Paulo e Goiânia.',
    roleTarget: 'buyer',
    features: [
      'WhatsApp liberado com 1 clique para falar com os fabricantes',
      'Endereços completos de fábricas no Brás, Bom Retiro e Goiânia',
      'Negociação direto com o fornecedor, sem intermediários',
      'Acesso antecipado a novos fabricantes cadastrados'
    ],
  },
  {
    id: 'seller_pro',
    name: 'Plano Fabricante / Confeccionista',
    price: 79.90,
    period: 'por mês',
    description: 'Exponha suas coleções para lojistas de todo o Brasil com zero comissão sobre vendas.',
    roleTarget: 'seller',
    features: [
      'Exposição ilimitada de produtos e grades de atacado',
      'Seu WhatsApp e endereço em destaque para lojistas VIP',
      'Zero taxa ou comissão sobre os pedidos do seu WhatsApp',
      'Selo Verificado de Fabricante no catálogo'
    ],
  },
];

export const INITIAL_PRODUCTS: Product[] = [];

export const DEFAULT_CATEGORY_COVERS: CategoryCoverItem[] = [
  {
    category: 'Moda Feminina',
    label: 'Moda Feminina',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80',
  },
  {
    category: 'Moda Masculina',
    label: 'Moda Masculina',
    imageUrl: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&auto=format&fit=crop&q=80',
  },
  {
    category: 'Moda Infantil',
    label: 'Moda Infantil',
    imageUrl: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format&fit=crop&q=80',
  },
  {
    category: 'Bolsas',
    label: 'Bolsas',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80',
  },
  {
    category: 'Acessórios',
    label: 'Acessórios',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80',
  },
  {
    category: 'Calçados',
    label: 'Calçados',
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80',
  },
];
