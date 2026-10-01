import React from 'react';
import { 
  Instagram, 
  Facebook, 
  Linkedin, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Lock, 
  Store
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="bg-[#14284B] border-t border-[#2E5C94]/30 text-white text-xs font-normal">
      {/* COLUNAS PRINCIPAIS DO RODAPÉ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-[11px]">
          
          {/* Coluna 1: Atendimento ao Cliente */}
          <div>
            <h3 className="font-bold text-[#7DB7E8] sm:text-[#2E5C94] text-xs uppercase tracking-wider mb-3">
              Atendimento
            </h3>
            <ul className="space-y-1.5 text-white/90">
              <li><a href="#" className="hover:text-[#C4372B] transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-[#C4372B] transition-colors">Como Comprar no Brás</a></li>
              <li><a href="#" className="hover:text-[#C4372B] transition-colors">Métodos de Pagamento</a></li>
              <li><a href="#" className="hover:text-[#C4372B] transition-colors">Envio e Rastreamento</a></li>
              <li><a href="#" className="hover:text-[#C4372B] transition-colors">Devolução e Reembolso</a></li>
              <li><a href="#" className="hover:text-[#C4372B] transition-colors">Garantia Bras Online</a></li>
            </ul>
          </div>

          {/* Coluna 2: Sobre o Bras Online */}
          <div>
            <h3 className="font-bold text-[#7DB7E8] sm:text-[#2E5C94] text-xs uppercase tracking-wider mb-3">
              Sobre Nós
            </h3>
            <ul className="space-y-1.5 text-white/90">
              <li><a href="#" className="hover:text-[#C4372B] transition-colors">Quem Somos</a></li>
              <li><a href="#" className="hover:text-[#C4372B] transition-colors">Políticas do Marketplace</a></li>
              <li><a href="#" className="hover:text-[#C4372B] transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-[#C4372B] transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-[#C4372B] transition-colors">Venda no Brás Online</a></li>
              <li><a href="#" className="hover:text-[#C4372B] transition-colors">Carreiras & Imprensa</a></li>
            </ul>
          </div>

          {/* Coluna 3: Formas de Pagamento */}
          <div>
            <h3 className="font-bold text-[#7DB7E8] sm:text-[#2E5C94] text-xs uppercase tracking-wider mb-3">
              Pagamento
            </h3>
            <div className="grid grid-cols-3 gap-1.5 max-w-[170px]">
              <span className="bg-white border border-[#E8E8E8] rounded-[2px] p-1 text-center font-bold text-[10px] text-gray-900 shadow-2xs">PIX</span>
              <span className="bg-white border border-[#E8E8E8] rounded-[2px] p-1 text-center font-bold text-[10px] text-[#14284B] shadow-2xs">VISA</span>
              <span className="bg-white border border-[#E8E8E8] rounded-[2px] p-1 text-center font-bold text-[10px] text-gray-800 shadow-2xs">MASTER</span>
              <span className="bg-white border border-[#E8E8E8] rounded-[2px] p-1 text-center font-bold text-[10px] text-gray-800 shadow-2xs">ELO</span>
              <span className="bg-white border border-[#E8E8E8] rounded-[2px] p-1 text-center font-bold text-[10px] text-gray-800 shadow-2xs">HIPER</span>
              <span className="bg-white border border-[#E8E8E8] rounded-[2px] p-1 text-center font-bold text-[10px] text-gray-700 shadow-2xs">BOLETO</span>
            </div>

            <h3 className="font-bold text-[#7DB7E8] sm:text-[#2E5C94] text-xs uppercase tracking-wider mt-4 mb-2">
              Logística & Envio
            </h3>
            <div className="grid grid-cols-2 gap-1.5 max-w-[170px]">
              <span className="bg-white border border-[#E8E8E8] rounded-[2px] p-1 text-center font-bold text-[9px] text-gray-900 shadow-2xs">CORREIOS</span>
              <span className="bg-white border border-[#E8E8E8] rounded-[2px] p-1 text-center font-bold text-[9px] text-gray-900 shadow-2xs">JADLOG</span>
              <span className="bg-white border border-[#E8E8E8] rounded-[2px] p-1 text-center font-bold text-[9px] text-gray-900 shadow-2xs">LOGGI</span>
              <span className="bg-white border border-[#E8E8E8] rounded-[2px] p-1 text-center font-bold text-[9px] text-gray-900 shadow-2xs">EXCURSÃO</span>
            </div>
          </div>

          {/* Coluna 4: Siga-nos */}
          <div>
            <h3 className="font-bold text-[#7DB7E8] sm:text-[#2E5C94] text-xs uppercase tracking-wider mb-3">
              Siga-nos
            </h3>
            <ul className="space-y-2 text-white/90">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-white hover:text-[#C4372B] transition-colors">
                  <Instagram className="w-3.5 h-3.5 text-white" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-white hover:text-[#C4372B] transition-colors">
                  <Facebook className="w-3.5 h-3.5 text-white" />
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-white hover:text-[#C4372B] transition-colors">
                  <Linkedin className="w-3.5 h-3.5 text-white" />
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* 3. RODAPÉ DE COPYRIGHT & CNPJ EM AZUL-MARINHO */}
      <div className="border-t border-[#2E5C94]/25 py-4 bg-[#14284B] text-center text-[10px] text-white/80">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <BrandLogo variant="dark" size="sm" />
            <p className="text-left text-white/90">© 2026 Brás Online Marketplace. Conectando revendedores e lojistas diretamente às fábricas.</p>
          </div>
          <div className="flex items-center gap-3 text-white/80">
            <span>CNPJ: 45.892.120/0001-83</span>
            <span>•</span>
            <span>Rua Miller, 420 - Brás, São Paulo - SP</span>
            <span>•</span>
            <span className="text-white font-semibold flex items-center gap-0.5">
              <Lock className="w-2.5 h-2.5" /> Compra 100% Segura
            </span>
          </div>
        </div>
      </div>

    </footer>
  );
};
