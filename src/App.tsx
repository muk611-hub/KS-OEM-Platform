import React, { useState } from 'react';
import { NavTab, Lead, BankPartner, BankOffer } from './types';
import { 
  INITIAL_BANKS, 
  INITIAL_LEADS, 
  INITIAL_OFFERS, 
  DEALERS_TOP_5, 
  INITIAL_TIMELINE_STEPS 
} from './mockData';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { CreateLeadView } from './components/CreateLeadView';
import { LiveOfferBoardView } from './components/LiveOfferBoardView';
import { LeadTrackerView } from './components/LeadTrackerView';
import { ConnectedBanksView } from './components/ConnectedBanksView';
import { ReportsView } from './components/ReportsView';
import { SettingsView } from './components/SettingsView';
import { LeadDetailModal } from './components/LeadDetailModal';
import { AddPartnerModal } from './components/AddPartnerModal';
import { ExportModal } from './components/ExportModal';
import { MobileAppView } from './components/MobileAppView';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Global State
  const [banks, setBanks] = useState<BankPartner[]>(INITIAL_BANKS);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [offers, setOffers] = useState<BankOffer[]>(INITIAL_OFFERS);
  const [selectedLead, setSelectedLead] = useState<Lead>(INITIAL_LEADS[0]);

  // Modals state
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAddPartnerModal, setShowAddPartnerModal] = useState(false);
  const [leadModalData, setLeadModalData] = useState<Lead | null>(null);

  // User Profile
  const userProfile = {
    name: 'Vikramaditya S.',
    role: 'OEM Lead Manager',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  };

  // Handlers
  const handleAddLead = (newLead: Lead) => {
    setLeads([newLead, ...leads]);
    setSelectedLead(newLead);
  };

  const handleAddBank = (newBank: BankPartner) => {
    setBanks([newBank, ...banks]);
  };

  const handleAcceptOffer = (offer: BankOffer) => {
    // Update lead status
    setLeads(
      leads.map((l) =>
        l.id === selectedLead.id ? { ...l, status: 'Approved' } : l
      )
    );
    alert(`Congratulations! ${offer.bankName} offer (ROI ${offer.roi}%, EMI ₹${offer.emi.toLocaleString('en-IN')}) selected for ${selectedLead.customerName}. Notification sent to dealer.`);
  };

  const handleUpdateStatus = (leadId: string, newStatus: Lead['status']) => {
    setLeads(
      leads.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#191c1e] font-sans flex antialiased">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userProfile={userProfile}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        onLogout={() => alert('Logged out from OEM Finance Portal.')}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 ml-0 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onExportGlobalData={() => setShowExportModal(true)}
          onToggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onToggleMobileView={() => setActiveTab(activeTab === 'mobile-app' ? 'dashboard' : 'mobile-app')}
          isMobileViewActive={activeTab === 'mobile-app'}
          onOpenNotifications={() => alert('System Alerts: 2 Bank response SLAs pending, 1 New lead created.')}
          onLogout={() => alert('Logged out')}
        />

        {/* View Router Container */}
        <main className="flex-1 p-6 max-w-[1600px] w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              leads={leads}
              banks={banks}
              dealers={DEALERS_TOP_5}
              setActiveTab={setActiveTab}
              onSelectLead={(lead) => setSelectedLead(lead)}
              onExportGlobalData={() => setShowExportModal(true)}
            />
          )}

          {activeTab === 'mobile-app' && (
            <MobileAppView
              leads={leads}
              banks={banks}
              offers={offers}
              onAddLead={handleAddLead}
              onUpdateLeadStatus={handleUpdateStatus}
              onAcceptOffer={handleAcceptOffer}
              selectedLead={selectedLead}
              setSelectedLead={setSelectedLead}
              onSwitchToDesktop={() => setActiveTab('dashboard')}
            />
          )}

          {activeTab === 'create-lead' && (
            <CreateLeadView
              banks={banks}
              onAddLead={handleAddLead}
              setActiveTab={setActiveTab}
              onSelectLead={(lead) => setSelectedLead(lead)}
            />
          )}

          {activeTab === 'live-offer-board' && (
            <LiveOfferBoardView
              selectedLead={selectedLead}
              allLeads={leads}
              onSelectLead={(lead) => setSelectedLead(lead)}
              offers={offers}
              timelineSteps={INITIAL_TIMELINE_STEPS}
              onAcceptOffer={handleAcceptOffer}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'lead-tracker' && (
            <LeadTrackerView
              leads={leads}
              onSelectLead={(lead) => setSelectedLead(lead)}
              setActiveTab={setActiveTab}
              onOpenLeadModal={(lead) => setLeadModalData(lead)}
            />
          )}

          {activeTab === 'connected-banks' && (
            <ConnectedBanksView
              banks={banks}
              onOpenAddPartnerModal={() => setShowAddPartnerModal(true)}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsView
              banks={banks}
              onExportGlobalData={() => setShowExportModal(true)}
            />
          )}

          {activeTab === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Global Modals */}
      {showExportModal && <ExportModal onClose={() => setShowExportModal(false)} />}
      {showAddPartnerModal && (
        <AddPartnerModal
          onClose={() => setShowAddPartnerModal(false)}
          onAddBank={handleAddBank}
        />
      )}
      {leadModalData && (
        <LeadDetailModal
          lead={leadModalData}
          offers={offers}
          onClose={() => setLeadModalData(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
}

export default App;
