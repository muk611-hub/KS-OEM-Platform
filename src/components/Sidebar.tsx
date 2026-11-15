import React from 'react';
import { NavTab } from '../types';
import { 
  Building2, 
  LayoutDashboard, 
  PlusSquare, 
  Sparkles, 
  BarChart3, 
  FileText, 
  Landmark, 
  Settings, 
  LogOut,
  UserCheck,
  Smartphone,
  X
} from 'lucide-react';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onLogout?: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  userProfile: {
    name: string;
    role: string;
    avatarUrl: string;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onLogout,
  isOpenMobile = false,
  onCloseMobile,
  userProfile,
}) => {
  const navItems: { id: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'mobile-app', label: 'Mobile Sales App', icon: Smartphone },
    { id: 'create-lead', label: 'Create Lead', icon: PlusSquare },
    { id: 'live-offer-board', label: 'Live Offer Board', icon: Sparkles },
    { id: 'lead-tracker', label: 'Lead Tracker', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'connected-banks', label: 'Connected Banks', icon: Landmark },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleSelectTab = (tab: NavTab) => {
    setActiveTab(tab);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpenMobile && (
        <div 
          onClick={onCloseMobile} 
          className="fixed inset-0 bg-black/60 z-50 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Main Sidebar Container */}
      <aside 
        className={`fixed left-0 top-0 h-full w-64 bg-[#f3f4f6] border-r border-[#c3c6d6] flex flex-col py-6 z-50 shadow-xl lg:shadow-sm select-none transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="px-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#003d9b] rounded-lg flex items-center justify-center text-white shadow-sm">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[12px] font-semibold uppercase tracking-wider text-[#434654] leading-tight">
                Lead Management
              </h2>
              <p className="text-[13px] font-bold text-[#003d9b]">Enterprise Tier</p>
            </div>
          </div>

          {/* Close button for drawer */}
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-[#737685] hover:text-[#191c1e] hover:bg-[#c3c6d6]/40 lg:hidden cursor-pointer"
            title="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 space-y-1 px-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#003d9b] bg-[#cfe2f3]/40 border-r-4 border-[#003d9b] translate-x-0.5 shadow-xs'
                    : 'text-[#434654] hover:bg-[#e1e2e4]/50 hover:text-[#003d9b]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#003d9b]' : 'text-[#737685]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Footer Profile */}
        <div className="px-3 mt-auto pt-4 border-t border-[#c3c6d6]/40">
          <div 
            onClick={() => handleSelectTab('settings')}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#e1e2e4]/60 cursor-pointer transition-colors group"
          >
            <div className="w-9 h-9 rounded-full bg-[#dae2ff] border border-[#003d9b]/20 flex items-center justify-center overflow-hidden shrink-0">
              {userProfile.avatarUrl ? (
                <img 
                  src={userProfile.avatarUrl} 
                  alt={userProfile.name} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <UserCheck className="w-5 h-5 text-[#003d9b]" />
              )}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-[13px] font-bold text-[#191c1e] truncate group-hover:text-[#003d9b]">
                {userProfile.name}
              </p>
              <p className="text-[11px] text-[#737685] truncate">{userProfile.role}</p>
            </div>
            {onLogout && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLogout();
                }}
                className="text-[#737685] hover:text-[#ba1a1a] p-1 rounded-md transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
