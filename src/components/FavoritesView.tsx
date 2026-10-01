import React from 'react';
import { Heart, ArrowLeft, Package, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';

export const FavoritesView: React.FC = () => {
  const { products, favorites, setActiveTab } = useApp();

  const favoriteProducts = products.filter((p) => p && p.id && favorites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setActiveTab('catalog')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Catálogo de Atacado</span>
        </button>

        <span className="text-xs font-semibold bg-rose-50 text-rose-700 px-3 py-1 rounded-full border border-rose-200">
          {favoriteProducts.length} itens salvos
        </span>
      </div>

      <div className="bg-white border border-orange-200 rounded-3xl p-6 mb-8 shadow-xs">
        <div className="flex items-center gap-2 text-orange-600 mb-1">
          <Heart className="w-5 h-5 text-amber-500 fill-amber-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-orange-700">
            Sua Grade de Interesse
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          Meus Produtos Favoritos no Atacado
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Compare preços de fábrica, pedido mínimo e negocie direto pelo WhatsApp com o fornecedor.
        </p>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="bg-white border border-orange-200 rounded-3xl p-12 text-center max-w-xl mx-auto my-10 space-y-4 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto border border-orange-100">
            <Heart className="w-7 h-7 text-amber-500 fill-amber-400" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-800">
            Você ainda não tem favoritos salvos
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Clique no ícone de coração nos produtos que deseja comprar para salvar sua lista e falar com os fornecedores em um só lugar.
          </p>
          <button
            onClick={() => setActiveTab('catalog')}
            className="px-6 py-3 rounded-xl bg-orange-600 text-white font-bold text-xs hover:bg-orange-700 transition-transform hover:scale-105 shadow-xs cursor-pointer"
          >
            Explorar o Catálogo do Brás
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 gap-1.5 sm:gap-2">
          {favoriteProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
};
