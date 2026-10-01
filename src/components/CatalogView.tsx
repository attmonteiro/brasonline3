import React from 'react';
import { ShopeeCategoryGrid } from './ShopeeCategoryGrid';
import { ShopeeHeroBanners } from './ShopeeHeroBanners';
import { ShopeeDailyDiscover } from './ShopeeDailyDiscover';
import { ShopeeOfficialMall } from './ShopeeOfficialMall';
import { ShopeeFlashSale } from './ShopeeFlashSale';
import { HowItWorksSection } from './HowItWorksSection';

export const CatalogView: React.FC = () => {
  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#4A4A4A]">
      
      {/* 1. BANNER PRINCIPAL (Carrossel Full Width) */}
      <ShopeeHeroBanners />

      {/* 2. CATEGORIAS (Abaixo do banner inicial) */}
      <ShopeeCategoryGrid />

      {/* 3. RECOMENDADOS */}
      <ShopeeDailyDiscover />

      {/* 4. SEÇÃO "FORNECEDORES" (Abaixo de Recomendados) */}
      <ShopeeOfficialMall />

      {/* 5. ÚLTIMAS PEÇAS (Última seção de produtos da vitrine) */}
      <ShopeeFlashSale />

      {/* 6. COMO FUNCIONA (Divulgação de atacadistas sem intermediação de venda direta) */}
      <HowItWorksSection />

    </div>
  );
};
