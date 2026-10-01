import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    cartCount, 
    clearCart,
    currentUser,
    openLoginModal
  } = useApp();

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const formattedSubtotal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotal);

  const handleCheckoutWhatsApp = () => {
    const itemsList = cart.map(i => `• ${i.quantity}x ${i.name} (${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(i.price)} cada)`).join('\n');
    const msg = encodeURIComponent(`Olá! Gostaria de fazer o pedido pelo Bras Online:\n\n${itemsList}\n\n*Total estimado: ${formattedSubtotal}*`);
    window.open(`https://wa.me/5511991234567?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#14213D]/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 bg-[#14213D] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E8442B] flex items-center justify-center text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white">Meu Carrinho</h3>
                <p className="text-xs text-slate-300 font-medium">{cartCount} {cartCount === 1 ? 'item' : 'itens'} selecionados</p>
              </div>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {!currentUser ? (
              <div className="text-center py-14 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-[#FDF1EC] text-[#E8442B] flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-[#14213D]">Seu carrinho está vazio</h4>
                <p className="text-xs text-[#4A4A4A] max-w-xs mx-auto leading-relaxed">
                  Faça login para salvar suas peças e enviar pedidos de atacado diretamente para os fabricantes.
                </p>
                <div className="pt-2 flex flex-col gap-2 max-w-xs mx-auto">
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      openLoginModal();
                    }}
                    className="w-full py-3 rounded-2xl bg-[#E8442B] hover:bg-[#d4371f] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                  >
                    Fazer Login ou Cadastrar
                  </button>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-2.5 rounded-2xl border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Continuar Navegando
                  </button>
                </div>
              </div>
            ) : cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-[#FDF1EC] text-[#E8442B] flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-[#14213D]">Seu carrinho está vazio</h4>
                <p className="text-xs text-[#4A4A4A] max-w-xs mx-auto">
                  Explore nossos fornecedores e adicione as melhores ofertas da estação ao seu carrinho!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-3 rounded-2xl bg-[#E8442B] hover:bg-[#d4371f] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  Continuar Comprando
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-[#4A4A4A] uppercase tracking-wider">Itens do Pedido</span>
                  <button 
                    onClick={clearCart}
                    className="text-xs font-semibold text-rose-500 hover:underline"
                  >
                    Esvaziar
                  </button>
                </div>

                {cart.map((item) => (
                  <div key={item.id} className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl flex gap-3.5 items-center">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-16 h-16 rounded-xl object-cover shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      {item.vendorName && (
                        <span className="text-[10px] font-bold text-[#E8442B] uppercase tracking-wide block truncate">
                          {item.vendorName}
                        </span>
                      )}
                      <h4 className="text-xs font-bold text-[#14213D] truncate">{item.name}</h4>
                      <p className="text-xs font-extrabold text-[#14213D] mt-0.5">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                      </p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-slate-200 bg-white rounded-lg">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-slate-500 hover:text-slate-900"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-[#14213D]">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-slate-500 hover:text-slate-900"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 transition-colors ml-auto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#FDF1EC] border-t border-orange-100 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#4A4A4A]">Subtotal</span>
                <span className="text-xl font-black text-[#14213D]">{formattedSubtotal}</span>
              </div>
              
              <div className="flex items-center gap-2 text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200/60 p-2.5 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Compra direta com fornecedores parceiros verificados</span>
              </div>

              <button
                onClick={handleCheckoutWhatsApp}
                className="w-full py-4 rounded-2xl bg-[#E8442B] hover:bg-[#d4371f] text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
              >
                <span>Finalizar Pedido com Fornecedor</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
