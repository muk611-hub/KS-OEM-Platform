import React from 'react';
import { Search, Bell, Download, LogOut, Radio, Smartphone, Menu } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onExportGlobalData: () => void;
  onToggleMobileView?: () => void;
  isMobileViewActive?: boolean;
  onToggleMenu?: () => void;
  notificationsCount?: number;
  onOpenNotifications?: () => void;
  onLogout?: () => void;
  title?: string;
  userAvatar?: string;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  onExportGlobalData,
  onToggleMobileView,
  isMobileViewActive = false,
  onToggleMenu,
  notificationsCount = 3,
  onOpenNotifications,
  onLogout,
  title = "OEM Finance Lead Portal",
  userAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuB6EbgmLwjJhOYviDRJTFajjAEqPKvy4fQhleP4P7ba4xBveiv9IHKSuVeuLxKUTVVyRAXXJlOV0mRMHHZXha2d0eYNjRzIgUCp1FEzO6bHgPWmQmQSEDKjbapAcvEQ6N95-bCjdD_IqmiM8jp7PUUPGnRWn5Dcm0bxCFHw-tdagGHqgVLsZCDxfwdl9hgwzm7OPK3liJSzEnSuwi52V9UIEopxO36hzxFXalNocYvoXP4wnHq5weK2",
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#c3c6d6] shadow-2xs w-full px-4 md:px-6 py-2.5 flex justify-between items-center">
      {/* Title & Search */}
      <div className="flex items-center gap-3 md:gap-6 flex-1 max-w-2xl">
        {onToggleMenu && (
          <button
            onClick={onToggleMenu}
            className="p-2 rounded-lg text-[#003d9b] bg-[#f8f9fb] hover:bg-[#edeef0] border border-[#c3c6d6] transition-colors cursor-pointer shrink-0 flex items-center justify-center shadow-2xs"
            title="Toggle Menu"
            id="hamburger-menu-btn"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <h1 className="text-[16px] md:text-[20px] font-bold text-[#003d9b] shrink-0 tracking-tight">
          {title}
        </h1>
        
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#737685]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads, banks, dealers or application ID..."
            className="w-full pl-9 pr-4 py-1.5 bg-[#edeef0] border border-[#c3c6d6]/60 rounded-lg text-[13px] text-[#191c1e] placeholder-[#737685] focus:outline-none focus:ring-2 focus:ring-[#003d9b]/30 focus:border-[#003d9b] transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Mobile View Toggle Button */}
        {onToggleMobileView && (
          <button
            onClick={onToggleMobileView}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all cursor-pointer shadow-2xs ${
              isMobileViewActive
                ? 'bg-[#003d9b] text-white'
                : 'bg-[#dae2ff] text-[#003d9b] hover:bg-[#c3c6d6]'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>{isMobileViewActive ? 'Desktop Mode' : 'Mobile App View'}</span>
          </button>
        )}

        {/* Live Status Indicator */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-[#ffdad6]/40 border border-[#ba1a1a]/20 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ba1a1a] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ba1a1a]"></span>
          </span>
          <span className="text-[10px] font-bold text-[#ba1a1a] uppercase tracking-wider">LIVE PORTAL</span>
        </div>

        {/* Notifications */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-full hover:bg-[#f3f4f6] text-[#434654] transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          {notificationsCount > 0 && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full border-2 border-white"></span>
          )}
        </button>

        <div className="h-6 w-px bg-[#c3c6d6] mx-1"></div>

        {/* Export Global Data */}
        <button
          onClick={onExportGlobalData}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-[12px] font-semibold text-[#003d9b] border border-[#003d9b] rounded-lg hover:bg-[#003d9b]/5 transition-all cursor-pointer shadow-2xs active:scale-98"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Global Data</span>
        </button>

        {/* Logout / User Avatar */}
        {onLogout && (
          <button
            onClick={onLogout}
            className="hidden lg:flex items-center gap-1 text-[12px] font-semibold text-[#737685] hover:text-[#003d9b] transition-colors ml-1"
          >
            <span>Logout</span>
          </button>
        )}
      </div>
    </header>
  );
};
