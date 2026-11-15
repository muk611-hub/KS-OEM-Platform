import React, { useState } from 'react';
import { Lead, BankPartner, NavTab } from '../types';
import { 
  PlusSquare, 
  UserCheck, 
  Car, 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  Send, 
  Save, 
  X, 
  Sparkles,
  Check
} from 'lucide-react';

interface CreateLeadViewProps {
  banks: BankPartner[];
  onAddLead: (newLead: Lead) => void;
  setActiveTab: (tab: NavTab) => void;
  onSelectLead: (lead: Lead) => void;
}

export const CreateLeadView: React.FC<CreateLeadViewProps> = ({
  banks,
  onAddLead,
  setActiveTab,
  onSelectLead,
}) => {
  // Form State
  const [draftId] = useState(`FL-${Math.floor(10000 + Math.random() * 90000)}`);
  const [customerName, setCustomerName] = useState('Rahul Dravid');
  const [mobile, setMobile] = useState('98765 12345');
  const [panNumber, setPanNumber] = useState('ABCDE9876F');
  const [dob, setDob] = useState('1986-04-12');
  const [city, setCity] = useState('Mumbai');
  const [state, setState] = useState('Maharashtra');
  const [email, setEmail] = useState('rahul.d@example.com');

  const [oemBrand, setOemBrand] = useState('Elite Motors Corp');
  const [dealerName, setDealerName] = useState('Global Motors - West Mumbai');
  const [vehicleModel, setVehicleModel] = useState('Model X-2024 Titanium');
  const [exShowroomCost, setExShowroomCost] = useState<number>(3800000);
  const [requiredLoanAmount, setRequiredLoanAmount] = useState<number>(3000000);
  const [downPayment, setDownPayment] = useState<number>(800000);
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState('2026-08-25');

  const [selectedBanks, setSelectedBanks] = useState<string[]>(['hdfc', 'icici', 'sbi', 'axis', 'kotak']);
  const [customerConsent, setCustomerConsent] = useState<boolean>(true);
  const [otpVerified, setOtpVerified] = useState<boolean>(true);
  const [showOtpSimulator, setShowOtpSimulator] = useState<boolean>(false);
  const [otpInput, setOtpInput] = useState('');

  // EMI calculation helper
  const annualInterestRate = 0.085;
  const tenureMonths = 60;
  const monthlyRate = annualInterestRate / 12;
  const calculatedEmi = Math.round(
    (requiredLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1)
  );

  const toggleBank = (bankId: string) => {
    if (selectedBanks.includes(bankId)) {
      setSelectedBanks(selectedBanks.filter((id) => id !== bankId));
    } else {
      setSelectedBanks([...selectedBanks, bankId]);
    }
  };

  const toggleSelectAllBanks = () => {
    if (selectedBanks.length === banks.length) {
      setSelectedBanks([]);
    } else {
      setSelectedBanks(banks.map((b) => b.id));
    }
  };

  const handleVerifyOtp = () => {
    if (otpInput === '1234' || otpInput.length === 4) {
      setOtpVerified(true);
      setShowOtpSimulator(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerConsent) {
      alert('Please check customer consent checkbox to proceed.');
      return;
    }

    const newLead: Lead = {
      id: draftId,
      customerName,
      mobile,
      panNumber,
      dob,
      city,
      state,
      email,
      oemBrand,
      dealerName,
      dealerCity: city,
      vehicleModel,
      exShowroomCost,
      requiredLoanAmount,
      downPayment,
      expectedDeliveryDate,
      status: 'Submitted',
      selectedBanks,
      createdAt: 'Just now',
      waitingHours: 0,
      creditScore: 780,
    };

    onAddLead(newLead);
    onSelectLead(newLead);
    setActiveTab('live-offer-board');
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Draft ID Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-xl border border-[#c3c6d6] shadow-2xs gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold text-[#737685] uppercase tracking-wider">Draft ID</span>
            <span className="px-2 py-0.5 bg-[#dae2ff] text-[#003d9b] text-[12px] font-mono font-extrabold rounded">
              #{draftId}
            </span>
          </div>
          <h2 className="text-[18px] font-bold text-[#191c1e] mt-0.5">New Customer Financial Application</h2>
        </div>
        <div className="flex items-center gap-2 text-[12px] text-[#434654] font-medium">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <span>Connected to Unified OEM Lending API</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 Columns): Forms */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Customer Details */}
          <div className="bg-white p-5 rounded-xl border border-[#c3c6d6] shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-[#c3c6d6]/60 pb-3">
              <UserCheck className="w-5 h-5 text-[#003d9b]" />
              <h3 className="text-[16px] font-bold text-[#191c1e]">Customer Profile Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px]">
              <div>
                <label className="block text-[#434654] font-semibold mb-1">Full Name (as per PAN)</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003d9b]/30 focus:border-[#003d9b]"
                />
              </div>

              <div>
                <label className="block text-[#434654] font-semibold mb-1">Mobile Number (+91)</label>
                <input
                  type="text"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003d9b]/30 focus:border-[#003d9b]"
                />
              </div>

              <div>
                <label className="block text-[#434654] font-semibold mb-1">PAN Card Number</label>
                <input
                  type="text"
                  required
                  value={panNumber}
                  onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#003d9b]/30 focus:border-[#003d9b]"
                />
              </div>

              <div>
                <label className="block text-[#434654] font-semibold mb-1">Date of Birth</label>
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003d9b]/30 focus:border-[#003d9b]"
                />
              </div>

              <div>
                <label className="block text-[#434654] font-semibold mb-1">City</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003d9b]/30 focus:border-[#003d9b]"
                />
              </div>

              <div>
                <label className="block text-[#434654] font-semibold mb-1">State</label>
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003d9b]/30 focus:border-[#003d9b]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[#434654] font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003d9b]/30 focus:border-[#003d9b]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Vehicle & Loan Details */}
          <div className="bg-white p-5 rounded-xl border border-[#c3c6d6] shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-[#c3c6d6]/60 pb-3">
              <Car className="w-5 h-5 text-[#003d9b]" />
              <h3 className="text-[16px] font-bold text-[#191c1e]">Vehicle & Loan Requirements</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px]">
              <div>
                <label className="block text-[#434654] font-semibold mb-1">OEM Brand</label>
                <select
                  value={oemBrand}
                  onChange={(e) => setOemBrand(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003d9b]/30 focus:border-[#003d9b]"
                >
                  <option value="Elite Motors Corp">Elite Motors Corp</option>
                  <option value="Aura EV Motors">Aura EV Motors</option>
                  <option value="Nexus Auto Group">Nexus Auto Group</option>
                </select>
              </div>

              <div>
                <label className="block text-[#434654] font-semibold mb-1">Dealer Outlet</label>
                <select
                  value={dealerName}
                  onChange={(e) => setDealerName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003d9b]/30 focus:border-[#003d9b]"
                >
                  <option value="Global Motors - West Mumbai">Global Motors - West Mumbai</option>
                  <option value="Prestige Cars - South Delhi">Prestige Cars - South Delhi</option>
                  <option value="Apex Automotive - Whitefield">Apex Automotive - Whitefield</option>
                </select>
              </div>

              <div>
                <label className="block text-[#434654] font-semibold mb-1">Vehicle Model & Variant</label>
                <input
                  type="text"
                  required
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003d9b]/30 focus:border-[#003d9b]"
                />
              </div>

              <div>
                <label className="block text-[#434654] font-semibold mb-1">Ex-Showroom Price (₹)</label>
                <input
                  type="number"
                  required
                  value={exShowroomCost}
                  onChange={(e) => setExShowroomCost(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#003d9b]/30 focus:border-[#003d9b]"
                />
              </div>

              <div>
                <label className="block text-[#434654] font-semibold mb-1">Required Loan Amount (₹)</label>
                <input
                  type="number"
                  required
                  value={requiredLoanAmount}
                  onChange={(e) => setRequiredLoanAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#003d9b]/30 focus:border-[#003d9b]"
                />
              </div>

              <div>
                <label className="block text-[#434654] font-semibold mb-1">Down Payment (₹)</label>
                <input
                  type="number"
                  required
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#003d9b]/30 focus:border-[#003d9b]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 Columns): Connected Partners Selector & Snapshot */}
        <div className="lg:col-span-4 space-y-6">
          {/* Financial Partner Selector */}
          <div className="bg-white p-5 rounded-xl border border-[#c3c6d6] shadow-2xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#c3c6d6]/60 pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#003d9b]" />
                <h3 className="text-[15px] font-bold text-[#191c1e]">Connect Partners</h3>
              </div>
              <button
                type="button"
                onClick={toggleSelectAllBanks}
                className="text-[11px] font-bold text-[#003d9b] hover:underline cursor-pointer"
              >
                {selectedBanks.length === banks.length ? 'Deselect All' : 'Select All 22'}
              </button>
            </div>

            <p className="text-[12px] text-[#737685]">
              Select financial institutions to receive automated credit underwriting requests.
            </p>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {banks.map((bank) => {
                const isSelected = selectedBanks.includes(bank.id);
                return (
                  <div
                    key={bank.id}
                    onClick={() => toggleBank(bank.id)}
                    className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#003d9b]/5 border-[#003d9b]'
                        : 'bg-[#f8f9fb] border-[#c3c6d6] hover:bg-[#edeef0]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-6 h-6 rounded flex items-center justify-center font-bold text-white text-[10px]"
                        style={{ backgroundColor: bank.logoBgColor || '#003d9b' }}
                      >
                        {bank.shortCode[0]}
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-[#191c1e]">{bank.name}</p>
                        <p className="text-[10px] text-[#737685]">SLA: {bank.responseSLA}</p>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded flex items-center justify-center ${
                      isSelected ? 'bg-[#003d9b] text-white' : 'border border-[#c3c6d6]'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Consent & Digital Signature */}
          <div className="bg-white p-5 rounded-xl border border-[#c3c6d6] shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-600" />
              <h3 className="text-[15px] font-bold text-[#191c1e]">Customer Consent</h3>
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={customerConsent}
                onChange={(e) => setCustomerConsent(e.target.checked)}
                className="mt-1 w-4 h-4 text-[#003d9b] rounded border-[#c3c6d6] focus:ring-[#003d9b]"
              />
              <span className="text-[11px] text-[#434654] leading-relaxed">
                I hereby authorize OEM Lead Management Portal to query credit bureau scores and share application profile data with selected banking partners.
              </span>
            </label>

            {otpVerified ? (
              <div className="p-2.5 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700 text-[12px] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                <span>Digital OTP Verified via Aadhaar Mobile</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowOtpSimulator(true)}
                className="w-full py-2 bg-[#edeef0] text-[#003d9b] text-[12px] font-bold rounded-lg border border-[#003d9b]/30 hover:bg-[#003d9b]/10 transition-colors"
              >
                Send Aadhaar Digital OTP
              </button>
            )}

            {showOtpSimulator && (
              <div className="p-3 bg-[#dae2ff]/30 border border-[#003d9b]/30 rounded-lg space-y-2 mt-2">
                <p className="text-[11px] text-[#003d9b] font-bold">Enter OTP sent to +91-******3210</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={4}
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    placeholder="1234"
                    className="w-24 px-2 py-1 bg-white border border-[#c3c6d6] rounded text-[12px] text-center font-mono font-bold"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="px-3 py-1 bg-[#003d9b] text-white text-[12px] font-bold rounded cursor-pointer"
                  >
                    Verify
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Dynamic Application Snapshot */}
          <div className="bg-[#003d9b] text-white p-5 rounded-xl shadow-md space-y-3">
            <h4 className="text-[12px] font-bold uppercase tracking-wider opacity-85">Application Snapshot</h4>
            <div className="space-y-2 text-[13px] border-t border-white/20 pt-3">
              <div className="flex justify-between">
                <span className="opacity-80">Loan Amount:</span>
                <span className="font-mono font-bold">₹{requiredLoanAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-80">Est. Monthly EMI:</span>
                <span className="font-mono font-bold text-yellow-300">₹{calculatedEmi.toLocaleString('en-IN')}/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-80">Tenure:</span>
                <span>5 Years (60 Mos)</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-80">Connected Banks:</span>
                <span className="font-bold">{selectedBanks.length} Partners</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Fixed Sticky Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#c3c6d6] p-4 shadow-lg z-40 flex justify-end items-center gap-4 px-8">
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className="px-4 py-2 border border-[#c3c6d6] rounded-lg text-[13px] font-bold text-[#434654] hover:bg-[#f3f4f6] transition-colors cursor-pointer"
          >
            Cancel Application
          </button>
          
          <button
            type="button"
            onClick={() => {
              alert(`Draft saved successfully as #${draftId}`);
              setActiveTab('lead-tracker');
            }}
            className="px-4 py-2 border border-[#003d9b] text-[#003d9b] rounded-lg text-[13px] font-bold hover:bg-[#003d9b]/5 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Draft</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 bg-[#003d9b] text-white rounded-lg text-[13px] font-bold hover:bg-[#0052cc] transition-all shadow-md cursor-pointer flex items-center gap-2 active:scale-98"
          >
            <Send className="w-4 h-4" />
            <span>Submit Lead to Ecosystem</span>
          </button>
        </div>
      </form>
    </div>
  );
};
