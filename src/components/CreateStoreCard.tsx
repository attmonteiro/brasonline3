import React, { useState } from 'react';
import { 
  Store, 
  MapPin, 
  MessageCircle, 
  Package, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Image as ImageIcon,
  Tag,
  ArrowRight,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PoloRegion, CategoryType, Supplier } from '../types';

interface CreateStoreCardProps {
  onSuccess?: () => void;
  isEmbedded?: boolean;
}

const PRESET_STORE_IMAGES = [
  {
    label: 'Showroom Brás - SP',
    url: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&auto=format&fit=crop&q=80',
  },
  {
    label: 'Boutique Bom Retiro',
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80',
  },
  {
    label: 'Estande 44 Goiânia',
    url: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800&auto=format&fit=crop&q=80',
  },
  {
    label: 'Fábrica de Malhas',
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=80',
  },
];

export const CreateStoreCard: React.FC<CreateStoreCardProps> = ({ onSuccess, isEmbedded = false }) => {
  const { currentUser, createOrUpdateStore } = useApp();

  const existingStore = currentUser?.storeInfo;

  const [storeName, setStoreName] = useState(existingStore?.name || '');
  const [cnpj, setCnpj] = useState(existingStore?.cnpj || '');
  const [region, setRegion] = useState<PoloRegion>(existingStore?.region || 'Brás - SP');
  const [storeCode, setStoreCode] = useState(existingStore?.storeCode || '');
  const [address, setAddress] = useState(existingStore?.address || '');
  const [whatsapp, setWhatsapp] = useState(existingStore?.whatsapp || '5511998887766');
  const [category, setCategory] = useState<CategoryType>(existingStore?.category || 'Feminino');
  const [minOrderQty, setMinOrderQty] = useState<number>(existingStore?.minOrderQty || 6);
  const [description, setDescription] = useState(existingStore?.description || '');
  const [bannerUrl, setBannerUrl] = useState(existingStore?.bannerUrl || PRESET_STORE_IMAGES[0].url);

  const [loading, setLoading] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const storeData: Partial<Supplier> = {
        name: storeName || 'Minha Confecção Brás Online',
        storeCode: storeCode || `${region} • Estande Principal`,
        address: address || `${region}, Brasil`,
        whatsapp: whatsapp.replace(/\D/g, '') || '5511998887766',
        region,
        cnpj,
        category,
        minOrderQty,
        description: description || 'Fabricação própria e venda no atacado com envio para todo o Brasil.',
        bannerUrl,
      };

      createOrUpdateStore(storeData);
      setLoading(false);
      setSubmittedSuccess(true);

      if (onSuccess) {
        onSuccess();
      }
    }, 600);
  };

  return (
    <div className={`bg-[#0B1B33] text-white rounded-3xl p-6 sm:p-9 shadow-2xl border border-slate-700 relative overflow-hidden transition-all ${isEmbedded ? '' : 'my-4'}`}>
      {/* Background Glow Accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="relative z-10">
        {/* Header Badge & Title */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-slate-800">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-sm">
              <Store className="w-3.5 h-3.5" />
              <span>Card de Criação de Loja • Brás Online</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display mt-2">
              {existingStore ? 'Editar Dados da Minha Loja' : 'Cadastrar Minha Confecção / Loja'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Crie a vitrine oficial da sua fábrica ou importadora. Seus produtos serão exibidos para <strong>lojistas em todo o Brasil</strong>.
            </p>
          </div>

          <div className="hidden md:flex flex-col items-end text-right text-xs text-amber-300 font-semibold bg-slate-800/80 px-4 py-2.5 rounded-2xl border border-slate-700">
            <span className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              0% de Comissão
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5">Vendas diretas no seu WhatsApp</span>
          </div>
        </div>

        {/* Submission Success Alert */}
        {submittedSuccess && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 flex items-center gap-3 animate-fadeIn">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <p className="font-bold text-sm text-white">
                🎉 Loja criada e publicada com sucesso!
              </p>
              <p className="text-xs text-emerald-300 mt-0.5">
                Sua vitrine no Brás Online está pronta. Você já pode cadastrar suas coleções e receber pedidos atacadistas.
              </p>
            </div>
          </div>
        )}

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Identificação da Loja */}
          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Store className="w-4 h-4" />
              <span>1. Identificação da Fábrica / Loja</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">
                  Nome Comercial da Loja / Confecção *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder="Ex: Bella Modas Atacado"
                    className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-medium placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FF5A00] focus:border-transparent transition-all"
                  />
                  <Store className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">
                  CNPJ ou CPF do Responsável
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    placeholder="Ex: 12.345.678/0001-90"
                    className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-medium placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FF5A00] focus:border-transparent transition-all"
                  />
                  <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Polo Atacadista & Endereço */}
          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>2. Localização & Polo Atacadista</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">
                  Polo Atacadista / Região *
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value as PoloRegion)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FF5A00] transition-all"
                >
                  <option value="Brás - SP">Brás - SP</option>
                  <option value="Bom Retiro - SP">Bom Retiro - SP</option>
                  <option value="Goiânia - GO (44)">Goiânia - GO (44)</option>
                  <option value="Sul de Minas (Malhas)">Sul de Minas (Malhas)</option>
                  <option value="Belo Horizonte - MG">Belo Horizonte - MG</option>
                  <option value="Fortaleza - CE">Fortaleza - CE</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">
                  Galeria / Estande / Loja Física
                </label>
                <input
                  type="text"
                  value={storeCode}
                  onChange={(e) => setStoreCode(e.target.value)}
                  placeholder="Ex: Galeria Pagé Brás • Loja 244"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-medium placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FF5A00] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">
                  Endereço Completo de Atendimento
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ex: Rua Oriente, 500 - Brás, São Paulo - SP"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-medium placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FF5A00] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Contato WhatsApp & Regras de Venda */}
          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4" />
              <span>3. Contato Direto & Regras de Atacado</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">
                  WhatsApp Comercial (DDD + Número) *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="Ex: 5511998887766"
                    className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-medium placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  />
                  <MessageCircle className="w-4 h-4 text-emerald-400 absolute left-3.5 top-3.5" />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Os compradores enviarão pedidos diretamente para este número.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">
                  Segmento Principal *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CategoryType)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FF5A00] transition-all"
                >
                  <option value="Feminino">Feminino</option>
                  <option value="Infantil">Infantil</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Calçados">Calçados</option>
                  <option value="Bolsas">Bolsas</option>
                  <option value="Pijama">Pijama</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">
                  Pedido Mínimo Padrão (Peças)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={1}
                    value={minOrderQty}
                    onChange={(e) => setMinOrderQty(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FF5A00] transition-all"
                  />
                  <Package className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Foto da Fachada / Logo */}
          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4" />
              <span>4. Imagem da Loja ou Fachada</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">
                  URL da Imagem ou escolha um modelo abaixo:
                </label>
                <input
                  type="url"
                  value={bannerUrl}
                  onChange={(e) => setBannerUrl(e.target.value)}
                  placeholder="https://exemplo.com/sua-loja.jpg"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-medium placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FF5A00] transition-all"
                />
              </div>

              {/* Quick Image Presets */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {PRESET_STORE_IMAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setBannerUrl(preset.url)}
                    className={`relative rounded-xl overflow-hidden border-2 text-left h-20 group transition-all cursor-pointer ${
                      bannerUrl === preset.url ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-slate-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-2 flex items-end">
                      <span className="text-[10px] font-bold text-white line-clamp-1">
                        {preset.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 5: Bio / Descrição */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1.5">
              Descrição / Diferenciais da Fábrica
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Fabricante há mais de 10 anos no Brás. Especialistas em linho e alfaiataria feminina com estampas digitais exclusivas e reposição semanal."
              className="w-full p-4 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-medium placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FF5A00] transition-all resize-none"
            />
          </div>

          {/* Submit Action Bar */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Sua loja fica ativa imediatamente após a confirmação.</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-4 bg-[#FF5A00] hover:bg-[#E04F00] text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer border border-orange-400/20 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Publicando Loja...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>{existingStore ? 'Salvar Alterações da Loja' : 'Criar Minha Loja Agora'}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
