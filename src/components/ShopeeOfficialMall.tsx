import React, { useState } from 'react';
import { ChevronRight, Store, MessageCircle } from 'lucide-react';
import { SHOPEE_OFFICIAL_VENDORS, ShopeeOfficialVendor } from '../data/shopeeData';
import { useApp } from '../context/AppContext';
import { Supplier } from '../types';
import { SupplierDetailModal } from './SupplierDetailModal';

export const ShopeeOfficialMall: React.FC = () => {
  const { setActiveTab } = useApp();
  const [activeSupplierModal, setActiveSupplierModal] = useState<Supplier | null>(null);

  const convertVendorToSupplier = (vendor: ShopeeOfficialVendor): Supplier => ({
    id: vendor.id,
    name: vendor.name,
    storeCode: 'Galeria Pagé Brás • Loja Oficial',
    address: vendor.location,
    cnpj: vendor.cnpj,
    whatsapp: vendor.whatsapp,
    verified: true,
    region: 'Brás - SP',
    rating: vendor.rating,
    totalProducts: vendor.totalProducts,
    description: vendor.subtitle,
    bannerUrl: vendor.bannerUrl,
    avatarUrl: vendor.logoUrl,
    minOrderQty: 1,
    tags: [vendor.category.toUpperCase(), 'FABRICANTE', 'OFICIAL'],
  });

  const handleVisitStore = (vendor: ShopeeOfficialVendor) => {
    setActiveSupplierModal(convertVendorToSupplier(vendor));
  };

  const handleOpenWhatsApp = (e: React.MouseEvent, whatsapp: string, name: string) => {
    e.stopPropagation();
    const cleanNumber = whatsapp.replace(/\D/g, '');
    const message = encodeURIComponent(`Olá! Encontrei o perfil de ${name} e gostaria de receber o catálogo de atacado.`);
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  return (
    <section id="fornecedores-section" className="py-3 sm:py-4 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        
        {/* TÍTULO DA CATEGORIA: FORNECEDORES */}
        <div className="bg-white border border-gray-200 rounded-[4px] p-3 sm:p-4">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-[3px] bg-[#14213D] flex items-center justify-center text-white shadow-2xs">
                <Store className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-extrabold text-[#14213D] uppercase tracking-wider">
                  Fornecedores
                </h2>
                <p className="text-[11px] text-[#4A4A4A] hidden xs:block">
                  Lojas e confecções verificadas com showroom físico e negociação direta
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveTab('catalog');
                handleVisitStore(SHOPEE_OFFICIAL_VENDORS[0]);
              }}
              className="text-xs font-bold text-[#E8442B] hover:text-[#d03a22] flex items-center gap-0.5 cursor-pointer transition-colors"
            >
              <span>Ver Todas as Lojas</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3. GRID DOS CARDS COM O PERFIL DOS FORNECEDORES (SEM BANNER, COM CATEGORIA E SEM ESTRELAS) */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-3 max-w-5xl mx-auto">
            {SHOPEE_OFFICIAL_VENDORS.map((vendor) => (
              <div
                key={vendor.id}
                onClick={() => handleVisitStore(vendor)}
                className="border border-[#E8E8E8] hover:border-[#2E5C94] rounded-lg bg-white p-2 sm:p-2.5 transition-all flex flex-col justify-between group cursor-pointer shadow-2xs hover:shadow-xs hover:-translate-y-0.5"
              >
                {/* Cabeçalho do Fornecedor: Logo + Nome + Categoria */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <img
                      src={vendor.logoUrl}
                      alt={vendor.name}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-slate-200 object-cover shadow-2xs bg-white shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[10.5px] sm:text-[11.5px] font-bold text-[#14213D] truncate group-hover:text-[#2E5C94] transition-colors leading-tight">
                        {vendor.name}
                      </h3>
                      {/* Categoria do Fornecedor (ao invés da localização) */}
                      <p className="text-[8.5px] sm:text-[9.5px] text-[#2E5C94] font-semibold truncate leading-tight mt-0.5">
                        {vendor.category}
                      </p>
                    </div>
                  </div>

                  {/* Informação do CNPJ e Peças no Catálogo */}
                  <div className="flex items-center justify-between text-[8px] sm:text-[8.5px] bg-slate-50 px-1.5 py-1 rounded border border-slate-200/80 mb-1.5 min-w-0">
                    <span className="text-slate-600 truncate font-semibold">
                      CNPJ: <span className="font-bold text-[#14284B]">{vendor.cnpj || '34.567.890/0001-12'}</span>
                    </span>
                    <span className="font-bold text-[#2E5C94] shrink-0 ml-1">{vendor.totalProducts} peças</span>
                  </div>

                  {/* Vitrine de 3 Produtos em Miniatura */}
                  <div className="grid grid-cols-3 gap-0.5 mb-1.5">
                    {vendor.topProducts.map((p, idx) => (
                      <div key={idx} className="bg-gray-100 rounded-[2px] overflow-hidden aspect-square relative group/item">
                        <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-x-0 bottom-0 bg-[#14213D]/80 text-[7px] text-white font-bold text-center py-0.1">
                          R$ {p.price.toFixed(0)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ações: Visitar Loja e Contato WhatsApp */}
                <div className="flex items-center gap-1 pt-1 border-t border-gray-100">
                  <button
                    onClick={() => handleVisitStore(vendor)}
                    className="flex-1 bg-slate-100 hover:bg-[#14284B] text-[#14284B] hover:text-white border border-slate-200 font-bold text-[9px] py-0.5 rounded-[2px] transition-colors cursor-pointer text-center"
                  >
                    Visitar Loja
                  </button>
                  <button
                    onClick={(e) => handleOpenWhatsApp(e, vendor.whatsapp, vendor.name)}
                    title="Chamar no WhatsApp"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white p-0.5 rounded-[2px] transition-colors cursor-pointer shrink-0"
                  >
                    <MessageCircle className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modal de Detalhes do Fornecedor */}
      <SupplierDetailModal
        supplier={activeSupplierModal}
        onClose={() => setActiveSupplierModal(null)}
      />
    </section>
  );
};
