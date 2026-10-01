import React from 'react';

interface BrandLogoProps {
  variant?: 'dark' | 'light' | 'on-red';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  variant = 'dark', 
  size = 'md',
  className = '' 
}) => {
  const isDarkBg = variant === 'dark';
  const isOnRed = variant === 'on-red';

  // "BRÁS" em vermelho no tema claro (conforme solicitado para teste)
  const brasColor = (isDarkBg || isOnRed) ? '#FFFFFF' : '#C4372B';
  const onlineColor = (isDarkBg || isOnRed) ? '#FFFFFF' : '#14284B';

  const scales = {
    sm: {
      brasText: 'text-lg sm:text-xl',
      onlineText: 'text-[12px] sm:text-[13px] tracking-[0.12em]',
      container: 'py-0.5',
    },
    md: {
      brasText: 'text-2xl sm:text-[28px]',
      onlineText: 'text-[17px] sm:text-[19px] tracking-[0.14em]',
      container: 'py-0.5',
    },
    lg: {
      brasText: 'text-3xl sm:text-4xl',
      onlineText: 'text-[21px] sm:text-[25px] tracking-[0.14em]',
      container: 'py-1',
    },
  };

  const currentScale = scales[size] || scales.md;

  return (
    <div 
      className={`inline-flex flex-col items-center justify-center leading-none select-none ${currentScale.container} ${className}`}
      style={{ minWidth: 'fit-content' }}
    >
      {/* 1. LINHA SUPERIOR: "BRÁS" em vermelho (#C4372B) */}
      <span 
        className={`font-black tracking-normal uppercase ${currentScale.brasText}`}
        style={{ 
          color: brasColor, 
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          lineHeight: '0.88'
        }}
      >
        BRÁS
      </span>

      {/* 2. LINHA INFERIOR: "ONLINE" em azul marinho */}
      <span 
        className={`font-serif uppercase font-normal mt-1 ${currentScale.onlineText}`}
        style={{ 
          color: onlineColor,
          fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
          lineHeight: '0.88'
        }}
      >
        ONLINE
      </span>
    </div>
  );
};
