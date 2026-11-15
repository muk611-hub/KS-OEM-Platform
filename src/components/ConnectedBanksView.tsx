import React, { useState } from 'react';
import { BankPartner } from '../types';
import { 
  Landmark, 
  Search, 
  Filter, 
  Plus, 
  CheckCircle2, 
  Zap, 
  TrendingUp, 
  RefreshCw, 
  Settings, 
  ExternalLink,
  ShieldCheck,
  Check
} from 'lucide-react';

interface ConnectedBanksViewProps {
  banks: BankPartner[];
  onOpenAddPartnerModal: () => void;
}

export const ConnectedBanksView: React.FC<ConnectedBanksViewProps> = ({
  banks,
  onOpenAddPartnerModal,
}) => {
  const [search, setSearch] = useState('');
  const [pingingBankId, setPingingBankId] = useState<string | null>(null);

  const filteredBanks = banks.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.shortCode.toLowerCase().includes(search.toLowerCase())
  );

  const handleTestPing = (bankId: string) => {
    setPingingBankId(bankId);
    setTimeout(() => {
      setPingingBankId(null);
      alert(`API Ping to ${banks.find((b) => b.id === bankId)?.name}: 200 OK (Latency 34ms)`);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-xl border border-[#c3c6d6] shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Landmark className="w-5 h-5 text-[#003d9b]" />
              <h2 className="text-[20px] font-bold text-[#191c1e]">Connected Financial Partners</h2>
            </div>
            <p className="text-[12px] text-[#737685] mt-0.5">
              Unified API Integration Network across 22 Scheduled Commercial Banks & NBFCs
            </p>
          </div>

          <button
            onClick={onOpenAddPartnerModal}
            className="px-4 py-2 bg-[#003d9b] text-white rounded-lg text-[13px] font-bold hover:bg-[#0052cc] transition-all flex items-center gap-2 shadow-2xs cursor-pointer active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>Connect New Bank API</span>
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t border-[#c3c6d6]/50 text-[13px]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#737685]">Active Connections</p>
              <p className="font-bold text-[#191c1e]">22 / 22 Online</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[#003d9b] font-bold">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#737685]">Avg Response SLA</p>
              <p className="font-bold text-[#191c1e]">38 Seconds</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#737685]">Daily Leads Pushed</p>
              <p className="font-bold text-[#191c1e]">1,542 Bids</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#737685]">Network Credit Value</p>
              <p className="font-bold text-[#003d9b]">₹452 Cr/Mo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-[#c3c6d6] shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#737685]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bank name or short code..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#003d9b]/30"
          />
        </div>
        <span className="text-[12px] font-bold text-[#737685] px-2">
          Showing {filteredBanks.length} Partners
        </span>
      </div>

      {/* Grid of 22 Bank Partner Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredBanks.map((bank) => (
          <div
            key={bank.id}
            className="bg-white border border-[#c3c6d6] rounded-xl p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
          >
            {/* Header */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white text-[13px] shadow-2xs"
                  style={{ backgroundColor: bank.logoBgColor || '#003d9b' }}
                >
                  {bank.shortCode}
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-[#191c1e]">{bank.name}</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[10px] font-bold text-green-700">API Connected</span>
                  </div>
                </div>
              </div>

              {bank.featured && (
                <span className="px-2 py-0.5 bg-[#dae2ff] text-[#003d9b] text-[9px] font-bold uppercase rounded">
                  PRIORITY
                </span>
              )}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-2 text-[12px] bg-[#f8f9fb] p-2.5 rounded-lg border border-[#c3c6d6]/40">
              <div>
                <p className="text-[10px] text-[#737685]">Response SLA</p>
                <p className="font-bold text-[#191c1e]">{bank.responseSLA}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#737685]">Avg ROI Rate</p>
                <p className="font-bold text-[#003d9b] font-mono">{bank.avgRoi}%</p>
              </div>
              <div>
                <p className="text-[10px] text-[#737685]">Disbursement</p>
                <p className="font-semibold text-green-700">{bank.disbursementSpeed}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#737685]">Conversion Rate</p>
                <p className="font-bold text-[#191c1e]">{bank.conversionRate}%</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-[#737685]">
                <span>Underwriting Rate</span>
                <span>{bank.conversionRate}%</span>
              </div>
              <div className="h-1.5 w-full bg-[#edeef0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#003d9b] rounded-full"
                  style={{ width: `${bank.conversionRate}%` }}
                />
              </div>
            </div>

            {/* Footer Action Buttons */}
            <div className="flex gap-2 pt-2 border-t border-[#c3c6d6]/40">
              <button
                onClick={() => handleTestPing(bank.id)}
                disabled={pingingBankId === bank.id}
                className="flex-1 py-1.5 bg-[#edeef0] text-[#003d9b] text-[11px] font-bold rounded-lg hover:bg-[#003d9b]/10 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${pingingBankId === bank.id ? 'animate-spin' : ''}`} />
                <span>Test Ping</span>
              </button>
              <button
                onClick={() => alert(`Configuring API webhooks and credentials for ${bank.name}`)}
                className="px-2.5 py-1.5 bg-white border border-[#c3c6d6] text-[#434654] text-[11px] font-bold rounded-lg hover:bg-[#f3f4f6] transition-colors cursor-pointer"
                title="Config API"
              >
                <Settings className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
