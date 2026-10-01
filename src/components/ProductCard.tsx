import React from 'react';
import { Heart } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    toggleFavorite, 
    isFavorite, 
    setSelectedProduct
  } = useApp();

  const favorite = isFavorite(product.id);
  const safePrice = (Number(product.price) || 0).toFixed(2).replace('.', ',');
  const supplierName = product.supplier?.name || product.category || 'Polo do Brás';

  return (
    <div 
      onClick={() => setSelectedProduct(product)}
      className="relative bg-white rounded-lg sm:rounded-xl p-0.5 sm:p-1 shadow-2xs hover:shadow-xs border border-[#E8E8E8] hover:border-[#2E5C94] transition-all duration-200 flex flex-col justify-between group cursor-pointer hover:-translate-y-0.5"
    >
      {/* CORAÇÃO DE FAVORITO NO CANTO SUPERIOR DIREITO DO CARD */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(product.id);
        }}
        className="absolute top-1 right-1 z-10 p-0.5 rounded-full bg-white/90 hover:bg-white text-gray-300 hover:text-[#C4372B] backdrop-blur-xs shadow-2xs transition-all cursor-pointer"
        title={favorite ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
      >
        <Heart 
          className={`w-3 h-3 transition-transform active:scale-125 ${
            favorite ? 'fill-[#C4372B] text-[#C4372B]' : 'text-gray-400 hover:text-[#C4372B]'
          }`} 
        />
      </button>

      {/* ÁREA DA FOTO INTERNA PADRÃO RETRATO (4:5) */}
      <div className="relative w-full aspect-[4/5] bg-slate-50 rounded-md sm:rounded-lg overflow-hidden group-hover:bg-slate-100 transition-colors">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* BLOCO DE INFORMAÇÕES COM ALTURA VERTICAL COMPACTA */}
      <div className="pt-1 pb-1.5 sm:pb-2 px-1 sm:px-1.5 flex flex-col justify-start">
        {/* 1. Preço de atacado em azul marinho em negrito */}
        <div className="text-[11.5px] sm:text-xs font-bold text-[#14284B] leading-tight tracking-tight">
          R$ {safePrice}
        </div>

        {/* 2. Nome do Produto em azul marinho com hover em azul médio */}
        <h3 className="text-[9.5px] sm:text-[10.5px] font-semibold text-[#14284B] line-clamp-1 mt-0.5 group-hover:text-[#2E5C94] transition-colors leading-tight">
          {product.title}
        </h3>

        {/* 3. Marca / Fornecedor / Categoria em cinza */}
        <p className="text-[8px] sm:text-[9px] text-gray-500 font-medium truncate mt-0.5">
          {supplierName}
        </p>
      </div>
    </div>
  );
};
