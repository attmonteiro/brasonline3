import React from 'react';
import { X, MapPin, CheckCircle2, Truck, Store } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PoloRegion } from '../types';

const BRASIL_CITIES = [
  { city: 'São Paulo, SP', nearestPolo: 'Brás - SP' as PoloRegion, leadDays: '1 dia úteis (Motoboy / Sedex)' },
  { city: 'Campinas, SP', nearestPolo: 'Brás - SP' as PoloRegion, leadDays: '1 a 2 dias úteis' },
  { city: 'Goiânia, GO', nearestPolo: 'Goiânia - GO (44)' as PoloRegion, leadDays: '1 dia (Entrega Rápida 44)' },
  { city: 'Belo Horizonte, MG', nearestPolo: 'Belo Horizonte - MG' as PoloRegion, leadDays: '1 a 2 dias úteis' },
  { city: 'Fortaleza, CE', nearestPolo: 'Fortaleza - CE' as PoloRegion, leadDays: '1 dia (Centro Fashion)' },
  { city: 'Rio de Janeiro, RJ', nearestPolo: 'Brás - SP' as PoloRegion, leadDays: '2 a 3 dias úteis' },
  { city: 'Curitiba, PR', nearestPolo: 'Brás - SP' as PoloRegion, leadDays: '2 a 3 dias úteis' },
  { city: 'Recife, PE', nearestPolo: 'Fortaleza - CE' as PoloRegion, leadDays: '2 a 3 dias úteis' },
  { city: 'Monte Sião, MG', nearestPolo: 'Sul de Minas (Malhas)' as PoloRegion, leadDays: '1 dia' },
];

export const LocationModal: React.FC = () => {
  const { 
    isLocationModalOpen, 
    setIsLocationModalOpen, 
    buyerLocation, 
    setBuyerLocation, 
    setFilter, 
    filters 
  } = useApp();

  if (!isLocationModalOpen) return null;

  const handleSelectCity = (city: string, nearestPolo: PoloRegion) => {
    setBuyerLocation(city);
    setFilter('region', nearestPolo);
    setIsLocationModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsLocationModalOpen(false)}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <div className="flex items-center gap-2 text-emerald-600 mb-2">
            <MapPin className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Frete e Exibição de Produtos
            </span>
          </div>

          <h3 className="text-xl font-extrabold text-slate-900">
            Defina sua Cidade de Entrega
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Organizamos os fornecedores do Brás, Bom Retiro e polos regionais de acordo com o endereço da sua loja ou residência.
          </p>

          <div className="mt-5 space-y-2 max-h-80 overflow-y-auto pr-1">
            {BRASIL_CITIES.map((item) => {
              const isSelected = buyerLocation === item.city;
              return (
                <button
                  key={item.city}
                  onClick={() => handleSelectCity(item.city, item.nearestPolo)}
                  className={`w-full p-3.5 rounded-2xl text-left border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-sm text-slate-900">
                      <span>{item.city}</span>
                      {isSelected && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold">
                          Ativo
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Store className="w-3.5 h-3.5 text-emerald-600" />
                        Polo sugerido: <strong>{item.nearestPolo}</strong>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5 text-teal-600" />
                        {item.leadDays}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                setFilter('region', 'Todas as Regiões');
                setIsLocationModalOpen(false);
              }}
              className="text-xs font-semibold text-slate-500 hover:text-emerald-700"
            >
              Ver Todas as Regiões sem filtro de distância
            </button>

            <button
              onClick={() => setIsLocationModalOpen(false)}
              className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
            >
              Confirmar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
