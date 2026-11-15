import React, { useState } from 'react';
import { Lead, BankPartner, BankOffer } from '../types';
import { 
  Smartphone, 
  Camera, 
  Phone, 
  MessageSquare, 
  Share2, 
  Calculator, 
  Search, 
  Plus, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Sparkles, 
  Wifi, 
  WifiOff, 
  Send, 
  FileText, 
  Sliders, 
  Zap, 
  Building2, 
  User, 
  Check, 
  X, 
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  TrendingUp,
  Download
} from 'lucide-react';

interface MobileAppViewProps {
  leads: Lead[];
  banks: BankPartner[];
  offers: BankOffer[];
  onAddLead: (lead: Lead) => void;
  onUpdateLeadStatus: (leadId: string, newStatus: Lead['status']) => void;
  onAcceptOffer: (offer: BankOffer) => void;
  selectedLead: Lead;
  setSelectedLead: (lead: Lead) => void;
  onSwitchToDesktop?: () => void;
}

export const MobileAppView: React.FC<MobileAppViewProps> = ({
  leads,
  banks,
  offers,
  onAddLead,
  onUpdateLeadStatus,
  onAcceptOffer,
  selectedLead,
  setSelectedLead,
  onSwitchToDesktop,
}) => {
  const [mobileTab, setMobileTab] = useState<'home' | 'scan-lead' | 'offers' | 'leads' | 'calculator'>('home');
  const [isSimulatedFrame, setIsSimulatedFrame] = useState(true);
  const [isOffline, setIsOffline] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Camera Scanner Modal Simulation
  const [showCameraScanner, setShowCameraScanner] = useState(false);
  const [scanningDocType, setScanningDocType] = useState<'PAN' | 'RC' | 'Aadhaar'>('PAN');
  const [scannedData, setScannedData] = useState<null | { name: string; pan: string; vehicle: string }>(null);

  // EMI Calculator State
  const [calcAmount, setCalcAmount] = useState(1500000);
  const [calcRate, setCalcRate] = useState(8.5);
  const [calcTenure, setCalcTenure] = useState(5);

  // Quick Lead Form State
  const [formData, setFormData] = useState({
    customerName: '',
    mobile: '',
    panNumber: '',
    vehicleModel: 'Grand Vitara Hybrid',
    requiredLoanAmount: 1200000,
    dealerName: 'Elite Motors - West Branch',
    city: 'Mumbai',
    selectedBankIds: ['b1', 'b2'],
  });

  // Calculate EMI for calculator
  const monthlyRate = calcRate / 12 / 100;
  const tenureMonths = calcTenure * 12;
  const calculatedEmi = Math.round(
    (calcAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1)
  );

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.vehicleModel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'All' || l.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Handle Quick Lead Creation
  const handleQuickLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead: Lead = {
      id: `MOB-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: formData.customerName || 'Rahul Sharma',
      mobile: formData.mobile || '+91 98200 11223',
      panNumber: formData.panNumber || 'ABCDE1234F',
      dob: '1992-05-14',
      city: formData.city,
      state: 'Maharashtra',
      email: `${(formData.customerName || 'rahul').toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      oemBrand: 'Elite Motors',
      dealerName: formData.dealerName,
      dealerCity: formData.city,
      vehicleModel: formData.vehicleModel,
      exShowroomCost: formData.requiredLoanAmount + 300000,
      requiredLoanAmount: Number(formData.requiredLoanAmount),
      downPayment: 300000,
      expectedDeliveryDate: '2026-08-15',
      status: 'Submitted',
      selectedBanks: formData.selectedBankIds,
      createdAt: 'Just now',
      waitingHours: 0,
      isHighPriority: true,
      creditScore: 785,
    };

    onAddLead(newLead);
    setSelectedLead(newLead);
    alert(`🎉 Lead created successfully on Mobile App!\nApplication ID: ${newLead.id}\nSent to ${formData.selectedBankIds.length} connected bank APIs.`);
    setMobileTab('offers');
  };

  // Simulate Document Scan
  const handleTriggerScan = (docType: 'PAN' | 'RC' | 'Aadhaar') => {
    setScanningDocType(docType);
    setShowCameraScanner(true);
    setScannedData(null);
    setTimeout(() => {
      if (docType === 'PAN') {
        setScannedData({
          name: 'Anish K. Kulkarni',
          pan: 'BSPKK9910E',
          vehicle: 'Creta SX (O) Turbo',
        });
        setFormData((prev) => ({
          ...prev,
          customerName: 'Anish K. Kulkarni',
          panNumber: 'BSPKK9910E',
        }));
      } else {
        setScannedData({
          name: 'Sunita Verma',
          pan: 'DLPPV4411K',
          vehicle: 'Harrier Fearless Dark',
        });
        setFormData((prev) => ({
          ...prev,
          customerName: 'Sunita Verma',
          vehicleModel: 'Harrier Fearless Dark',
        }));
      }
    }, 1500);
  };

  // Share Offer via WhatsApp format
  const handleWhatsAppShare = (offer: BankOffer, lead: Lead) => {
    const text = `*OEM Finance Loan Offer details for ${lead.customerName}*\n\n🏦 *Bank:* ${offer.bankName}\n💰 *Loan Amount:* ₹${offer.sanctionedAmount.toLocaleString('en-IN')}\n📉 *Interest Rate:* ${offer.roi}%\n📅 *Tenure:* ${offer.tenureYears} Years\n💵 *Monthly EMI:* ₹${offer.emi.toLocaleString('en-IN')}\n\nApp ID: ${lead.id}\nContact Dealer for Instant Sanction Letter!`;
    navigator.clipboard?.writeText(text);
    alert(`WhatsApp Offer summary copied to clipboard!\n\n${text}`);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[calc(100vh-100px)] py-4">
      {/* Viewport Control Bar */}
      <div className="w-full max-w-xl mb-4 bg-white border border-[#c3c6d6] rounded-xl p-3 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2 text-[13px] font-bold text-[#003d9b]">
          <Smartphone className="w-5 h-5 text-[#003d9b]" />
          <span>OEM Dealer Mobile Companion App</span>
          <span className="text-[10px] px-2 py-0.5 bg-[#dae2ff] text-[#003d9b] rounded-full font-bold uppercase">v2.4 Live</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOffline(!isOffline)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isOffline ? 'bg-[#ffdad6] text-[#ba1a1a]' : 'bg-[#e0f3e6] text-[#0d6e37]'
            }`}
          >
            {isOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
            <span>{isOffline ? 'Offline Mode' : 'Online Sync'}</span>
          </button>

          <button
            onClick={() => setIsSimulatedFrame(!isSimulatedFrame)}
            className="px-2.5 py-1 bg-[#edeef0] text-[#434654] hover:bg-[#c3c6d6]/50 rounded-lg text-[11px] font-bold transition-all cursor-pointer"
          >
            {isSimulatedFrame ? 'Expand Screen' : 'Show Device Frame'}
          </button>

          {onSwitchToDesktop && (
            <button
              onClick={onSwitchToDesktop}
              className="px-3 py-1 bg-[#003d9b] text-white hover:bg-[#0052cc] rounded-lg text-[11px] font-bold transition-all cursor-pointer"
            >
              Desktop Portal
            </button>
          )}
        </div>
      </div>

      {/* Main Mobile Screen Wrapper */}
      <div 
        className={`bg-[#121316] overflow-hidden transition-all duration-300 ${
          isSimulatedFrame 
            ? 'w-[380px] h-[780px] rounded-[42px] border-[10px] border-[#2d3038] shadow-2xl relative flex flex-col ring-1 ring-black/40' 
            : 'w-full max-w-md min-h-[700px] rounded-2xl border border-[#c3c6d6] shadow-xl relative flex flex-col'
        }`}
      >
        {/* Phone Notch & Status Bar */}
        <div className="bg-black text-white px-6 pt-3 pb-2 flex justify-between items-center text-[11px] font-semibold shrink-0 select-none">
          <span>09:41</span>
          <div className="w-20 h-4 bg-black rounded-full flex items-center justify-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-[#1e2024] border border-white/20"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#003d9b]"></div>
          </div>
          <div className="flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5" />
            <span className="text-[10px]">5G</span>
            <div className="w-4 h-2.5 border border-white rounded-xs p-0.5 flex items-center">
              <div className="h-full w-3/4 bg-white rounded-2xs"></div>
            </div>
          </div>
        </div>

        {/* Mobile App Navigation Header */}
        <div className="bg-[#003d9b] text-white px-4 py-3 flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[13px] font-bold leading-tight">Elite Motors Mobile</p>
              <p className="text-[10px] text-blue-200">Field Exec ID: SE-904 (Mumbai)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleTriggerScan('PAN')}
              className="p-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white transition-all cursor-pointer flex items-center gap-1 text-[11px] font-bold"
              title="Camera Scan Document"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Offline Banner */}
        {isOffline && (
          <div className="bg-[#ba1a1a] text-white px-3 py-1 text-[11px] font-bold flex items-center justify-between shrink-0">
            <span className="flex items-center gap-1">
              <WifiOff className="w-3.5 h-3.5" />
              <span>Offline Mode - Drafts saved locally</span>
            </span>
            <span className="underline cursor-pointer" onClick={() => setIsOffline(false)}>Sync</span>
          </div>
        )}

        {/* Mobile View Container Body */}
        <div className="flex-1 bg-[#f8f9fb] overflow-y-auto p-3 text-[#191c1e] text-[13px]">
          
          {/* TAB 1: HOME FEED */}
          {mobileTab === 'home' && (
            <div className="space-y-3.5 pb-16">
              {/* Quick Performance Cards */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white p-3 rounded-xl border border-[#c3c6d6] shadow-2xs">
                  <p className="text-[10px] font-bold text-[#737685] uppercase">Today's Leads</p>
                  <p className="text-[20px] font-bold text-[#003d9b]">12</p>
                  <span className="text-[10px] font-semibold text-[#0d6e37] flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" /> +25% vs Yday
                  </span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-[#c3c6d6] shadow-2xs">
                  <p className="text-[10px] font-bold text-[#737685] uppercase">Sanction Value</p>
                  <p className="text-[20px] font-bold text-[#191c1e]">₹1.45 Cr</p>
                  <span className="text-[10px] font-bold text-[#003d9b]">Avg SLA: 38s</span>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="bg-[#003d9b]/5 border border-[#003d9b]/20 p-3 rounded-xl">
                <p className="text-[11px] font-bold text-[#003d9b] uppercase tracking-wider mb-2">Dealer Field Quick Actions</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <button
                    onClick={() => setMobileTab('scan-lead')}
                    className="p-2 bg-white rounded-lg border border-[#c3c6d6] hover:border-[#003d9b] flex flex-col items-center gap-1 shadow-2xs transition-all cursor-pointer"
                  >
                    <Plus className="w-5 h-5 text-[#003d9b]" />
                    <span className="text-[11px] font-bold">New Lead</span>
                  </button>
                  <button
                    onClick={() => handleTriggerScan('PAN')}
                    className="p-2 bg-white rounded-lg border border-[#c3c6d6] hover:border-[#003d9b] flex flex-col items-center gap-1 shadow-2xs transition-all cursor-pointer"
                  >
                    <Camera className="w-5 h-5 text-[#003d9b]" />
                    <span className="text-[11px] font-bold">Scan PAN/RC</span>
                  </button>
                  <button
                    onClick={() => setMobileTab('calculator')}
                    className="p-2 bg-white rounded-lg border border-[#c3c6d6] hover:border-[#003d9b] flex flex-col items-center gap-1 shadow-2xs transition-all cursor-pointer"
                  >
                    <Calculator className="w-5 h-5 text-[#003d9b]" />
                    <span className="text-[11px] font-bold">EMI Calc</span>
                  </button>
                </div>
              </div>

              {/* Selected Customer Active Banner */}
              <div className="bg-white border border-[#c3c6d6] rounded-xl p-3 shadow-2xs">
                <div className="flex justify-between items-start border-b border-[#edeef0] pb-2 mb-2">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-[#dae2ff] text-[#003d9b] rounded-full uppercase">Current Lead</span>
                    <h3 className="text-[14px] font-bold text-[#191c1e] mt-0.5">{selectedLead.customerName}</h3>
                    <p className="text-[11px] text-[#737685]">{selectedLead.vehicleModel} • ₹{(selectedLead.requiredLoanAmount / 100000).toFixed(1)}L Loan</p>
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    selectedLead.status === 'Approved' ? 'bg-[#e0f3e6] text-[#0d6e37]' : 'bg-[#fff4ce] text-[#7c5e00]'
                  }`}>
                    {selectedLead.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={`tel:${selectedLead.mobile}`}
                    className="flex-1 py-1.5 bg-[#f8f9fb] hover:bg-[#edeef0] border border-[#c3c6d6] rounded-lg text-[11px] font-bold text-center flex items-center justify-center gap-1 text-[#191c1e]"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#003d9b]" />
                    <span>Call Customer</span>
                  </a>
                  <button
                    onClick={() => setMobileTab('offers')}
                    className="flex-1 py-1.5 bg-[#003d9b] text-white rounded-lg text-[11px] font-bold text-center flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>View 3 Bank Offers</span>
                  </button>
                </div>
              </div>

              {/* Live Bank SLA Feed */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[12px] font-bold text-[#191c1e]">Connected Partner Banks</span>
                  <span className="text-[11px] text-[#003d9b] font-semibold">Live APIs</span>
                </div>
                <div className="space-y-2">
                  {banks.slice(0, 3).map((bank) => (
                    <div key={bank.id} className="bg-white p-2.5 rounded-xl border border-[#c3c6d6] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[#f3f4f6] font-bold text-[10px] flex items-center justify-center text-[#003d9b] border border-[#c3c6d6]">
                          {bank.shortCode}
                        </div>
                        <div>
                          <p className="text-[12px] font-bold leading-tight">{bank.name}</p>
                          <p className="text-[10px] text-[#737685]">Avg SLA: {bank.responseSLA}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-[#0d6e37] bg-[#e0f3e6] px-2 py-0.5 rounded-full">
                        {bank.avgRoi}% ROI
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: QUICK SCAN & CREATE LEAD */}
          {mobileTab === 'scan-lead' && (
            <div className="space-y-3 pb-16">
              <div className="bg-white p-3 rounded-xl border border-[#c3c6d6] shadow-2xs">
                <h3 className="text-[14px] font-bold text-[#003d9b] mb-1">Mobile Lead Entry Wizard</h3>
                <p className="text-[11px] text-[#737685] mb-3">Scan PAN or fill details for instant API dispatch.</p>

                <div className="p-2.5 bg-[#edeef0] rounded-xl border border-dashed border-[#003d9b]/40 flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-[#003d9b]" />
                    <div>
                      <p className="text-[11px] font-bold">Auto-Fill via OCR Scan</p>
                      <p className="text-[10px] text-[#737685]">Scan PAN or Vehicle RC</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleTriggerScan('PAN')}
                    className="px-2.5 py-1 bg-[#003d9b] text-white text-[11px] font-bold rounded-lg cursor-pointer"
                  >
                    Scan Now
                  </button>
                </div>

                <form onSubmit={handleQuickLeadSubmit} className="space-y-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#434654] mb-1">Customer Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3 py-2 bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg text-[12px] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#434654] mb-1">Mobile No.</label>
                      <input
                        type="text"
                        required
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="+91 98200 00000"
                        className="w-full px-3 py-2 bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg text-[12px] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#434654] mb-1">PAN Card</label>
                      <input
                        type="text"
                        required
                        value={formData.panNumber}
                        onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })}
                        placeholder="ABCDE1234F"
                        className="w-full px-3 py-2 bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg text-[12px] focus:outline-none uppercase"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#434654] mb-1">Vehicle Model</label>
                    <select
                      value={formData.vehicleModel}
                      onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                      className="w-full px-3 py-2 bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg text-[12px]"
                    >
                      <option value="Grand Vitara Hybrid">Grand Vitara Hybrid</option>
                      <option value="Mahindra XUV700 AX7">Mahindra XUV700 AX7</option>
                      <option value="Tata Nexon EV Max">Tata Nexon EV Max</option>
                      <option value="Hyundai Creta SX Turbo">Hyundai Creta SX Turbo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#434654] mb-1">Loan Required (₹)</label>
                    <input
                      type="number"
                      value={formData.requiredLoanAmount}
                      onChange={(e) => setFormData({ ...formData, requiredLoanAmount: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg text-[12px] font-bold text-[#003d9b]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#003d9b] text-white font-bold text-[13px] rounded-lg shadow-sm hover:bg-[#0052cc] transition-all cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit & Request Live Offers</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 3: LIVE OFFERS COMPARISON */}
          {mobileTab === 'offers' && (
            <div className="space-y-3 pb-16">
              <div className="bg-[#003d9b] text-white p-3 rounded-xl flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold text-blue-200 uppercase">Selected Lead</span>
                  <p className="text-[14px] font-bold">{selectedLead.customerName}</p>
                  <p className="text-[10px] text-blue-100">Loan ₹{selectedLead.requiredLoanAmount.toLocaleString('en-IN')}</p>
                </div>
                <button
                  onClick={() => setMobileTab('leads')}
                  className="px-2.5 py-1 bg-white/20 hover:bg-white/30 text-white rounded-lg text-[10px] font-bold cursor-pointer"
                >
                  Change Lead
                </button>
              </div>

              <p className="text-[12px] font-bold text-[#191c1e]">Real-Time Bank Responses ({offers.length})</p>

              <div className="space-y-2.5">
                {offers.map((offer) => (
                  <div key={offer.id} className="bg-white p-3 rounded-xl border border-[#c3c6d6] shadow-2xs space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[12px] font-bold text-[#003d9b]">{offer.bankName}</span>
                        <p className="text-[10px] text-[#737685]">Response time: {offer.responseTime}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        offer.status === 'APPROVED' ? 'bg-[#e0f3e6] text-[#0d6e37]' : 'bg-[#fff4ce] text-[#7c5e00]'
                      }`}>
                        {offer.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-1 bg-[#f8f9fb] p-2 rounded-lg text-center text-[11px]">
                      <div>
                        <p className="text-[9px] text-[#737685]">ROI</p>
                        <p className="font-bold text-[#003d9b]">{offer.roi}%</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-[#737685]">Monthly EMI</p>
                        <p className="font-bold text-[#191c1e]">₹{offer.emi.toLocaleString('en-IN')}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-[#737685]">Sanction</p>
                        <p className="font-bold text-[#0d6e37]">₹{(offer.sanctionedAmount/100000).toFixed(1)}L</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => handleWhatsAppShare(offer, selectedLead)}
                        className="flex-1 py-1.5 bg-[#25d366]/10 text-[#0d6e37] hover:bg-[#25d366]/20 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </button>
                      <button
                        onClick={() => onAcceptOffer(offer)}
                        className="flex-1 py-1.5 bg-[#003d9b] text-white rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer hover:bg-[#0052cc]"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Accept Offer</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: LEADS TRACKER LIST */}
          {mobileTab === 'leads' && (
            <div className="space-y-3 pb-16">
              {/* Search & Status Pill Bar */}
              <div className="space-y-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#737685]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by customer name or ID..."
                    className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#c3c6d6] rounded-lg text-[12px] focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
                  {['All', 'Approved', 'Submitted', 'Under Review'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setFilterStatus(st)}
                      className={`px-2.5 py-1 rounded-full whitespace-nowrap font-semibold cursor-pointer ${
                        filterStatus === st ? 'bg-[#003d9b] text-white' : 'bg-white border border-[#c3c6d6] text-[#434654]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lead Cards List */}
              <div className="space-y-2">
                {filteredLeads.map((lead) => (
                  <div 
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className={`bg-white p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedLead.id === lead.id ? 'border-[#003d9b] ring-2 ring-[#003d9b]/20' : 'border-[#c3c6d6]'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold text-[#737685]">{lead.id}</span>
                          <span className="text-[12px] font-bold text-[#191c1e]">{lead.customerName}</span>
                        </div>
                        <p className="text-[10px] text-[#737685]">{lead.vehicleModel} • {lead.dealerName}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        lead.status === 'Approved' ? 'bg-[#e0f3e6] text-[#0d6e37]' : 'bg-[#fff4ce] text-[#7c5e00]'
                      }`}>
                        {lead.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#edeef0] text-[11px]">
                      <span className="font-bold text-[#003d9b]">₹{(lead.requiredLoanAmount/100000).toFixed(1)} Lakhs</span>
                      <a 
                        href={`tel:${lead.mobile}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-[10px] font-bold text-[#003d9b] flex items-center gap-1 bg-[#f8f9fb] px-2 py-1 rounded-md border"
                      >
                        <Phone className="w-3 h-3" /> Call
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: EMI CALCULATOR */}
          {mobileTab === 'calculator' && (
            <div className="space-y-3 pb-16">
              <div className="bg-white p-3.5 rounded-xl border border-[#c3c6d6] shadow-2xs space-y-3">
                <h3 className="text-[14px] font-bold text-[#003d9b] flex items-center gap-1.5">
                  <Calculator className="w-4 h-4" />
                  <span>Mobile Loan & EMI Estimator</span>
                </h3>

                {/* Display EMI Box */}
                <div className="bg-[#003d9b] text-white p-3 rounded-xl text-center">
                  <p className="text-[10px] font-bold uppercase text-blue-200">Estimated Monthly EMI</p>
                  <p className="text-[24px] font-bold">₹{calculatedEmi.toLocaleString('en-IN')}</p>
                  <p className="text-[10px] text-blue-100">For ₹{(calcAmount/100000).toFixed(2)} Lakhs @ {calcRate}% for {calcTenure} Yrs</p>
                </div>

                {/* Sliders */}
                <div className="space-y-3 text-[11px]">
                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>Loan Amount</span>
                      <span className="text-[#003d9b]">₹{(calcAmount/100000).toFixed(1)} Lakhs</span>
                    </div>
                    <input
                      type="range"
                      min={100000}
                      max={5000000}
                      step={50000}
                      value={calcAmount}
                      onChange={(e) => setCalcAmount(Number(e.target.value))}
                      className="w-full accent-[#003d9b] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>Interest Rate (ROI)</span>
                      <span className="text-[#003d9b]">{calcRate}%</span>
                    </div>
                    <input
                      type="range"
                      min={7.5}
                      max={14.0}
                      step={0.1}
                      value={calcRate}
                      onChange={(e) => setCalcRate(Number(e.target.value))}
                      className="w-full accent-[#003d9b] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>Tenure (Years)</span>
                      <span className="text-[#003d9b]">{calcTenure} Years</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={7}
                      step={1}
                      value={calcTenure}
                      onChange={(e) => setCalcTenure(Number(e.target.value))}
                      className="w-full accent-[#003d9b] cursor-pointer"
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    setFormData({ ...formData, requiredLoanAmount: calcAmount });
                    setMobileTab('scan-lead');
                  }}
                  className="w-full py-2 bg-[#003d9b] text-white text-[12px] font-bold rounded-lg cursor-pointer flex items-center justify-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Apply with this Loan Amount</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Camera Modal Overlay Simulation */}
        {showCameraScanner && (
          <div className="absolute inset-0 bg-black/85 z-50 flex flex-col items-center justify-between p-4 text-white">
            <div className="w-full flex justify-between items-center text-[12px]">
              <span className="font-bold flex items-center gap-1 text-emerald-400">
                <Camera className="w-4 h-4" /> Document OCR Scanner
              </span>
              <button onClick={() => setShowCameraScanner(false)} className="p-1 bg-white/20 rounded-full">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Viewfinder simulation */}
            <div className="w-64 h-40 border-2 border-dashed border-emerald-400 rounded-xl relative flex flex-col items-center justify-center p-3 text-center bg-emerald-950/20">
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-emerald-400"></div>
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-emerald-400"></div>
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-emerald-400"></div>
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-emerald-400"></div>

              {!scannedData ? (
                <div className="space-y-1">
                  <div className="w-8 h-8 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin mx-auto"></div>
                  <p className="text-[11px] font-bold text-emerald-300">Scanning {scanningDocType} Card...</p>
                  <p className="text-[9px] text-gray-300">Align document within box</p>
                </div>
              ) : (
                <div className="space-y-1 text-emerald-300 text-[11px] font-bold">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                  <p>{scannedData.name}</p>
                  <p className="text-[10px] text-white">PAN: {scannedData.pan}</p>
                </div>
              )}
            </div>

            <div className="w-full space-y-2 text-center">
              {scannedData ? (
                <button
                  onClick={() => {
                    setShowCameraScanner(false);
                    setMobileTab('scan-lead');
                  }}
                  className="w-full py-2 bg-emerald-500 text-black font-bold text-[12px] rounded-lg cursor-pointer"
                >
                  Use Scanned Data in Lead Form
                </button>
              ) : (
                <p className="text-[10px] text-gray-400">Hold steady for optical recognition</p>
              )}
            </div>
          </div>
        )}

        {/* Mobile Navigation Bottom Bar */}
        <div className="bg-white border-t border-[#c3c6d6] px-2 py-1.5 grid grid-cols-5 text-center shrink-0 shadow-lg">
          <button
            onClick={() => setMobileTab('home')}
            className={`flex flex-col items-center py-1 cursor-pointer transition-colors ${
              mobileTab === 'home' ? 'text-[#003d9b] font-bold' : 'text-[#737685]'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span className="text-[9px]">Home</span>
          </button>

          <button
            onClick={() => setMobileTab('scan-lead')}
            className={`flex flex-col items-center py-1 cursor-pointer transition-colors ${
              mobileTab === 'scan-lead' ? 'text-[#003d9b] font-bold' : 'text-[#737685]'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span className="text-[9px]">New Lead</span>
          </button>

          <button
            onClick={() => setMobileTab('offers')}
            className={`flex flex-col items-center py-1 cursor-pointer transition-colors relative ${
              mobileTab === 'offers' ? 'text-[#003d9b] font-bold' : 'text-[#737685]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-[9px]">Offers</span>
            <span className="absolute top-0 right-3 w-2 h-2 bg-[#ba1a1a] rounded-full"></span>
          </button>

          <button
            onClick={() => setMobileTab('leads')}
            className={`flex flex-col items-center py-1 cursor-pointer transition-colors ${
              mobileTab === 'leads' ? 'text-[#003d9b] font-bold' : 'text-[#737685]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span className="text-[9px]">Leads</span>
          </button>

          <button
            onClick={() => setMobileTab('calculator')}
            className={`flex flex-col items-center py-1 cursor-pointer transition-colors ${
              mobileTab === 'calculator' ? 'text-[#003d9b] font-bold' : 'text-[#737685]'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span className="text-[9px]">EMI Calc</span>
          </button>
        </div>

      </div>
    </div>
  );
};
