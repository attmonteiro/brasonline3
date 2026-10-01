import React, { useState } from 'react';
import { 
  HelpCircle, 
  Globe, 
  Store, 
  Instagram, 
  Facebook, 
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ShopeeTopUtilityBarProps {
  onOpenVendorModal?: () => void;
}

export const ShopeeTopUtilityBar: React.FC<ShopeeTopUtilityBarProps> = ({ onOpenVendorModal }) => {
  const { openLoginModal } = useApp();
  const [showHelpToast, setShowHelpToast] = useState(false);

  return (
    <div className="bg-[#14284B] text-white/90 text-[10px] sm:text-[11px] font-medium border-b border-[#2E5C94]/40 select-none">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 h-7 flex items-center justify-between">
        
        {/* Lado Esquerdo: Links de Utilidade */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <button 
            onClick={() => onOpenVendorModal ? onOpenVendorModal() : openLoginModal()} 
            className="flex items-center gap-1 text-white hover:text-[#7DB7E8] transition-colors cursor-pointer group"
          >
            <Store className="w-3 h-3 text-[#7DB7E8] group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-white group-hover:text-[#7DB7E8]">Venda no Brás Online</span>
          </button>

          <span className="text-[#2E5C94] hidden sm:inline">|</span>

          {/* Redes Sociais */}
          <div className="hidden sm:flex items-center gap-2 text-white/80">
            <span>Siga:</span>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C4372B] transition-colors" title="Instagram">
              <Instagram className="w-3 h-3" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C4372B] transition-colors" title="Facebook">
              <Facebook className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Lado Direito: Ajuda, Idioma/Moeda */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <button 
            onClick={() => {
              setShowHelpToast(true);
              setTimeout(() => setShowHelpToast(false), 3000);
            }} 
            className="flex items-center gap-1 text-white hover:text-[#7DB7E8] transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3 h-3 text-[#7DB7E8]" />
            <span>Ajuda</span>
          </button>

          <span className="text-[#2E5C94] hidden xs:inline">|</span>

          <div className="hidden xs:flex items-center gap-1 text-white/80">
            <Globe className="w-3 h-3" />
            <span>Português</span>
          </div>

          <span className="text-[#2E5C94] hidden md:inline">|</span>

          <span className="hidden md:inline font-bold text-white">R$ BRL</span>
        </div>

      </div>

      {/* Toast Feedback Ajuda */}
      {showHelpToast && (
        <div className="fixed bottom-4 right-4 z-50 bg-[#14284B] text-white text-xs px-4 py-2.5 rounded-[4px] shadow-lg flex items-center gap-2 border-l-4 border-[#2E5C94] animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>Suporte online 24/7 disponível via WhatsApp e E-mail.</span>
        </div>
      )}
    </div>
  );
};
