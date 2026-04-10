import React from 'react';
import { Home, Heart, MapPin, X, ChevronLeft } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import logoImg from '@/src/assets/casa_mulher_brasileira_2.png';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
  showLogo?: boolean;
  showClose?: boolean;
  onClose?: () => void;
  hideHeader?: boolean;
}

export default function Layout({
  children,
  activeTab,
  onTabChange,
  showBack,
  onBack,
  title = "Casa da Mulher",
  showLogo = false,
  showClose,
  onClose,
  hideHeader = false,
}: LayoutProps) {
  return (
    <div className="flex flex-col h-screen bg-white max-w-md mx-auto relative shadow-xl overflow-hidden">
      {!hideHeader && (
        <header className="grid grid-cols-3 items-center px-4 py-3 bg-white border-b border-slate-100 sticky top-0 z-10">
          {/* Coluna esquerda — botão Voltar */}
          <div>
            {showBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-0.5 text-brand-purple font-medium text-sm active:opacity-60 transition-opacity"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
                Voltar
              </button>
            )}
          </div>

          {/* Coluna central — logo ou título */}
          <div className="flex justify-center items-center">
            {showLogo ? (
              <img
                src={logoImg}
                alt="Casa da Mulher Brasileira"
                className="h-8 w-auto object-contain"
              />
            ) : (
              <h1 className="text-base font-bold text-brand-purple text-center leading-tight truncate px-1">
                {title}
              </h1>
            )}
          </div>

          {/* Coluna direita — fechar (quando aplicável) */}
          <div className="flex justify-end">
            {showClose && (
              <button onClick={onClose} className="p-1">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            )}
          </div>
        </header>
      )}

      {/* Content */}
      <main className="flex-1 pb-24 overflow-y-auto flex flex-col">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/80 backdrop-blur-md border-t border-slate-100 px-8 py-3 flex justify-between items-center z-20">
        <button
            onClick={() => onTabChange('home')}
            className={cn(
                "flex flex-col items-center gap-1 transition-colors",
                activeTab === 'home' ? "text-emerald-400" : "text-slate-400"
            )}
        >
          <Home className="w-6 h-6"/>
          <span className="text-[10px] font-medium">Home</span>
        </button>

        <button
            onClick={() => onTabChange('sos')}
            className={cn(
                "flex flex-col items-center gap-1 transition-colors",
                activeTab === 'sos' ? "text-emerald-400" : "text-slate-400"
            )}
        >
          <div className={cn(
              "p-3 rounded-full -mt-8 shadow-lg transition-all",
              activeTab === 'sos' ? "bg-emerald-500 text-white scale-110" : "bg-slate-100 text-slate-500"
          )}>
            <MapPin className="w-6 h-6"/>
          </div>
          <span className="text-[10px] font-medium mt-1">SOS Mulher</span>
        </button>

        <button
            onClick={() => onTabChange('para-voce')}
            className={cn(
                "flex flex-col items-center gap-1 transition-colors",
                activeTab === 'para-voce' ? "text-emerald-400" : "text-slate-400"
            )}
        >
          <Heart className="w-6 h-6"/>
          <span className="text-[10px] font-medium">Para Você</span>
        </button>
      </nav>
    </div>
  );
}
