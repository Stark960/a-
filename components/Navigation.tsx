
import React from 'react';

type Tab = 'dashboard' | 'rules' | 'trash' | 'simulator';

interface NavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'dashboard', label: '首页', icon: '🏠' },
    { id: 'rules', label: '规则', icon: '🛡️' },
    { id: 'trash', label: '拦截记录', icon: '🗑️' },
    { id: 'simulator', label: '模拟', icon: '📱' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1a1c1e] h-[80px] border-t border-[#44474e]/30 z-50 flex justify-center px-2">
      <div className="max-w-md w-full flex justify-around items-center">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center group relative w-16"
            >
              <div className={`
                h-8 w-14 rounded-full flex items-center justify-center transition-all duration-300 mb-1
                ${isActive ? 'm3-nav-indicator shadow-sm' : 'hover:bg-[#44474e]/50'}
              `}>
                <span className={`text-xl transition-colors ${isActive ? 'scale-110' : 'opacity-80'}`}>
                  {tab.icon}
                </span>
              </div>
              <span className={`text-[12px] font-medium transition-colors ${isActive ? 'text-[#e2e2e6]' : 'text-[#c4c6cf]'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
