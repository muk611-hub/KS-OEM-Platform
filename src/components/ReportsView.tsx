import React, { useState } from 'react';
import { BankPartner } from '../types';
import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  BarChart3,
  Filter
} from 'lucide-react';

interface ReportsViewProps {
  banks: BankPartner[];
  onExportGlobalData: () => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  banks,
  onExportGlobalData,
}) => {
  const [activeCategory, setActiveCategory] = useState('Lead Summary');
  const [timePeriod, setTimePeriod] = useState('Last 30 Days');
  const [searchLedger, setSearchLedger] = useState('');

  const categories = [
    'Lead Summary',
    'Bank Performance',
    'Dealer Performance',
    'Offer Analysis',
    'Response Time',
    'Approval Trends',
  ];

  const filteredBanks = banks.filter((b) =>
    b.name.toLowerCase().includes(searchLedger.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Category Tabs & Header */}
      <div className="bg-white p-4 rounded-xl border border-[#c3c6d6] shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-[20px] font-bold text-[#191c1e]">Executive Reports & Analytics</h2>
            <p className="text-[12px] text-[#737685]">Financial lead conversion performance & lending partner metrics</p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="px-3 py-1.5 bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg text-[12px] font-bold text-[#191c1e] focus:outline-none cursor-pointer"
            >
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Q3 Analysis">Q3 Analysis</option>
              <option value="YTD 2026">YTD 2026</option>
            </select>

            <button
              onClick={() => alert('Generating PDF Executive Brief...')}
              className="px-3 py-1.5 border border-[#c3c6d6] text-[#434654] rounded-lg text-[12px] font-bold hover:bg-[#f3f4f6] transition-colors cursor-pointer"
            >
              Export PDF
            </button>

            <button
              onClick={onExportGlobalData}
              className="px-3.5 py-1.5 bg-[#003d9b] text-white rounded-lg text-[12px] font-bold hover:bg-[#0052cc] transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Excel</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#c3c6d6]/40">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-[12px] font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#003d9b] text-white shadow-2xs'
                  : 'bg-[#f8f9fb] text-[#434654] border border-[#c3c6d6]/60 hover:bg-[#edeef0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#c3c6d6] shadow-2xs">
          <p className="text-[11px] font-bold text-[#737685] uppercase">Total Leads Captured</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-[24px] font-bold text-[#191c1e]">12,842</span>
            <span className="text-[11px] text-green-600 font-bold">+18.4%</span>
          </div>
          <p className="text-[10px] text-[#737685] mt-1">vs previous 30-day period</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#c3c6d6] shadow-2xs">
          <p className="text-[11px] font-bold text-[#737685] uppercase">Avg Response SLA</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-[24px] font-bold text-[#003d9b]">14.2m</span>
            <span className="text-[11px] text-green-600 font-bold">-2.1m SLA</span>
          </div>
          <p className="text-[10px] text-[#737685] mt-1">Target SLA: 15.0m</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#c3c6d6] shadow-2xs">
          <p className="text-[11px] font-bold text-[#737685] uppercase">Approval Rate</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-[24px] font-bold text-[#191c1e]">64.8%</span>
            <span className="text-[11px] text-green-600 font-bold">+3.2%</span>
          </div>
          <p className="text-[10px] text-[#737685] mt-1">8,321 approved leads</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#c3c6d6] shadow-2xs bg-gradient-to-br from-white to-[#dae2ff]/20">
          <p className="text-[11px] font-bold text-[#003d9b] uppercase">Total Funded Volume</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-[24px] font-bold text-[#003d9b] font-mono">₹248.5 Cr</span>
            <span className="text-[11px] text-green-600 font-bold">+₹34.2 Cr</span>
          </div>
          <p className="text-[10px] text-[#737685] mt-1">Disbursed to dealers</p>
        </div>
      </div>

      {/* Main Charts & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Approval Trend Chart (8 Columns) */}
        <div className="lg:col-span-8 bg-white border border-[#c3c6d6] rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex justify-between items-center border-b border-[#c3c6d6]/60 pb-3">
            <div>
              <h3 className="text-[16px] font-bold text-[#191c1e]">Approval Trend Analysis</h3>
              <p className="text-[11px] text-[#737685]">Monthly comparison of Approved vs Declined applications</p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-bold">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#003d9b] rounded"></span> Approved</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#ffdad6] rounded"></span> Declined</span>
            </div>
          </div>

          <div className="h-56 flex items-end justify-between gap-3 px-4 pt-4">
            {[
              { month: 'Jan', app: 72, dec: 28 },
              { month: 'Feb', app: 80, dec: 20 },
              { month: 'Mar', app: 85, dec: 15 },
              { month: 'Apr', app: 78, dec: 22 },
              { month: 'May', app: 92, dec: 18 },
              { month: 'Jun', app: 88, dec: 24 },
            ].map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="w-full flex items-end justify-center gap-1 h-full">
                  <div style={{ height: `${d.app}%` }} className="w-1/2 bg-[#003d9b] rounded-t-xs" />
                  <div style={{ height: `${d.dec}%` }} className="w-1/2 bg-[#ffdad6] border border-[#ba1a1a]/30 rounded-t-xs" />
                </div>
                <span className="text-[11px] font-bold text-[#737685] mt-1">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Volume Distribution (4 Columns) */}
        <div className="lg:col-span-4 bg-white border border-[#c3c6d6] rounded-xl p-5 shadow-2xs space-y-4">
          <h3 className="text-[16px] font-bold text-[#191c1e] border-b border-[#c3c6d6]/60 pb-3">
            Product Distribution
          </h3>

          <div className="space-y-3 text-[12px]">
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Premier SUV Lease</span>
                <span className="text-[#003d9b] font-mono">₹142 Cr</span>
              </div>
              <div className="h-2 w-full bg-[#edeef0] rounded-full overflow-hidden">
                <div className="h-full bg-[#003d9b] w-[55%] rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Standard Sedan Auto Loan</span>
                <span className="text-[#003d9b] font-mono">₹84 Cr</span>
              </div>
              <div className="h-2 w-full bg-[#edeef0] rounded-full overflow-hidden">
                <div className="h-full bg-[#0052cc] w-[35%] rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>EV Green Financing</span>
                <span className="text-[#003d9b] font-mono">₹56 Cr</span>
              </div>
              <div className="h-2 w-full bg-[#edeef0] rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 w-[22%] rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Commercial Fleet Lease</span>
                <span className="text-[#003d9b] font-mono">₹22 Cr</span>
              </div>
              <div className="h-2 w-full bg-[#edeef0] rounded-full overflow-hidden">
                <div className="h-full bg-amber-600 w-[10%] rounded-full" />
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#dae2ff]/30 border border-[#003d9b]/20 rounded-lg flex items-start gap-2 text-[11px] text-[#003d9b] mt-4">
            <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              <strong>Strategic Tip:</strong> EV Green Financing saw a 42% YoY surge. Recommend onboarding specialized EV lender partners.
            </span>
          </div>
        </div>
      </div>

      {/* Bank Performance Ledger Table */}
      <div className="bg-white border border-[#c3c6d6] rounded-xl shadow-2xs overflow-hidden">
        <div className="p-4 bg-[#f8f9fb] border-b border-[#c3c6d6] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h3 className="text-[16px] font-bold text-[#191c1e]">Institution Ledger Performance</h3>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#737685]" />
            <input
              type="text"
              value={searchLedger}
              onChange={(e) => setSearchLedger(e.target.value)}
              placeholder="Search institution..."
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-[#c3c6d6] rounded-lg text-[12px] focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#edeef0]/50 text-[11px] text-[#434654] border-b border-[#c3c6d6]">
                <th className="px-4 py-3 font-bold uppercase">Institution Name</th>
                <th className="px-4 py-3 font-bold uppercase">Total Bids</th>
                <th className="px-4 py-3 font-bold uppercase">Approved Count</th>
                <th className="px-4 py-3 font-bold uppercase">Disbursed Volume</th>
                <th className="px-4 py-3 font-bold uppercase">Avg Rate %</th>
                <th className="px-4 py-3 font-bold uppercase">Conversion %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3c6d6]/40 text-[13px]">
              {filteredBanks.slice(0, 6).map((bank) => (
                <tr key={bank.id} className="hover:bg-[#003d9b]/5 transition-colors">
                  <td className="px-4 py-3 font-bold text-[#191c1e]">{bank.name}</td>
                  <td className="px-4 py-3 font-mono">{bank.leadsToday * 8}</td>
                  <td className="px-4 py-3 font-mono text-green-700 font-bold">{bank.offersGenerated * 6}</td>
                  <td className="px-4 py-3 font-mono font-bold text-[#003d9b]">₹{(bank.gtvCr * 3.5).toFixed(1)} Cr</td>
                  <td className="px-4 py-3 font-mono">{bank.avgRoi}%</td>
                  <td className="px-4 py-3 font-semibold">{bank.conversionRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
