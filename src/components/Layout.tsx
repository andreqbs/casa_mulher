import React from 'react';
import { Home, Heart, MapPin, X, ChevronLeft } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
  showClose?: boolean;
  onClose?: () => void;
}

export default function Layout({ 
  children, 
  activeTab, 
  onTabChange, 
  showBack, 
  onBack, 
  title = "Casa da Mulher",
  showClose,
  onClose
}: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white max-w-md mx-auto relative shadow-xl overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-2">
          {showBack && (
            <button onClick={onBack} className="p-1 -ml-2">
              <ChevronLeft className="w-6 h-6 text-brand-purple" />
            </button>
          )}
          <h1 className="text-xl font-bold text-brand-purple">{title}</h1>
        </div>
        {/*<div className="flex items-center gap-2">*/}
        {/*  <button */}
        {/*    onClick={() => window.location.href = 'https://www.google.com'}*/}
        {/*    className="bg-brand-purple text-white px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-wider shadow-sm active:scale-95 transition-all"*/}
        {/*  >*/}
        {/*    Sair Rápido*/}
        {/*  </button>*/}
        {/*  {showClose && (*/}
        {/*    <button onClick={onClose} className="p-1">*/}
        {/*      <X className="w-6 h-6 text-slate-400" />*/}
        {/*    </button>*/}
        {/*  )}*/}
        {/*</div>*/}
      </header>

      {/* Content */}
      <main className="flex-1 pb-24 overflow-y-auto">
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
