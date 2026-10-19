import React from 'react';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  userAvatar: string;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, userAvatar }) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'motoristas', label: 'Motoristas', icon: 'directions_car' },
    { id: 'localidade', label: 'Localidade', icon: 'near_me' },
    { id: 'perfil', label: 'Perfil', icon: 'person' },
    { id: 'configuracoes', label: 'Configurações', icon: 'settings' }
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#ffffff]/95 backdrop-blur-xl border-b border-[#e5eeff] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-xl mx-auto flex flex-col justify-between px-4 pt-2 pb-2">
        {/* Top brand & profile row */}
        <div className="flex items-center justify-between w-full h-12">
          <div 
            onClick={() => onTabChange('motoristas')}
            className="flex items-center gap-2 cursor-pointer select-none group"
          >
            <img
              alt="UniTrajeto Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1Xai-9crbkte3obaZfWvE39eZ6b7pITcjk5siM8_TkXx_NU1kmoevpFSD2OnsbrkJ21i-fEm1Zld-IYllNOAOsua0jETkIE9zisOmHI1L7c3AnlASdxe_chr7qEiYeDfcNkKr5XTToLeDe7kws73Geo_SGNNugtB1qsRcpQncDyYJnykB2SO49CSO9FLy-J8rHCDFMRFZrJWrO4I_kLq4v-sjCeq8ztxZhtOl8kpfGgDfdZylwY7egXBrmr"
              onError={(e) => {
                // Graceful fallback if image unavailable
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-xl text-[#0F172A] tracking-tight">
              UniTrajeto
            </span>
            <span className="h-2 w-2 rounded-full bg-[#2563EB] animate-pulse"></span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onTabChange('perfil')}
              aria-label="Abrir Perfil Estudantil"
              className="relative flex items-center justify-center p-0.5 rounded-full hover:ring-2 hover:ring-[#2563EB]/40 transition-all cursor-pointer"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border border-[#c3c6d7]"
                src={userAvatar}
              />
              <span 
                className="absolute -bottom-1 -right-1 bg-[#10B981] text-white rounded-full p-0.5 flex items-center justify-center shadow-sm"
                title="Aluno Verificado 2026"
              >
                <span className="material-symbols-outlined text-[10px] leading-none font-bold">check</span>
              </span>
            </button>
          </div>
        </div>

        {/* Navigation tabs */}
        <nav className="flex items-center justify-between gap-1 w-full pt-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg transition-all text-xs font-['Plus_Jakarta_Sans'] font-semibold cursor-pointer ${
                  isActive
                    ? 'bg-[#e5eeff] text-[#004ac6] shadow-xs'
                    : 'text-[#434655] hover:text-[#0b1c30] hover:bg-[#eff4ff]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
