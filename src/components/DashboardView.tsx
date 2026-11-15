import React, { useState } from 'react';
import { Lead, BankPartner, DealerPerformance, NavTab } from '../types';
import { 
  TrendingUp, 
  Building2, 
  FileCheck, 
  Zap, 
  CheckCircle2, 
  CreditCard, 
  ChevronRight, 
  MoreHorizontal, 
  MapPin, 
  Activity,
  ArrowUpRight,
  ShieldAlert,
  Download
} from 'lucide-react';

interface DashboardViewProps {
  leads: Lead[];
  banks: BankPartner[];
  dealers: DealerPerformance[];
  setActiveTab: (tab: NavTab) => void;
  onSelectLead: (lead: Lead) => void;
  onExportGlobalData: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  leads,
  banks,
  dealers,
  setActiveTab,
  onSelectLead,
  onExportGlobalData,
}) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d'>('7d');
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  // Sample trend data points
  const trendData7Days = [
    { day: 'Mon', leads: 410 },
    { day: 'Tue', leads: 435 },
    { day: 'Wed', leads: 482 },
    { day: 'Thu', leads: 450 },
    { day: 'Fri', leads: 495 },
    { day: 'Sat', leads: 520 },
    { day: 'Sun', leads: 480 },
  ];

  const highPriorityLeads = leads.filter(l => l.isHighPriority || l.waitingHours && l.waitingHours > 3);

  return (
    <div className="space-y-6">
      {/* Top KPIs Row (7 columns responsive) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3.5">
        {/* KPI 1 */}
        <div className="bg-white p-3.5 rounded-xl border border-[#c3c6d6] shadow-2xs hover:shadow-xs transition-all">
          <div className="flex justify-between items-start mb-1">
            <span className="text-[12px] font-semibold text-[#434654] opacity-80">Today's Leads</span>
            <TrendingUp className="w-4 h-4 text-[#003d9b]" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[22px] font-bold text-[#003d9b]">482</span>
            <span className="text-[10px] font-bold text-green-600">+12%</span>
          </div>
          <div className="h-1 w-full bg-[#edeef0] rounded-full mt-2.5 overflow-hidden">
            <div className="h-full bg-[#003d9b] w-[75%] rounded-full"></div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-3.5 rounded-xl border border-[#c3c6d6] shadow-2xs hover:shadow-xs transition-all">
          <div className="flex justify-between items-start mb-1">
            <span className="text-[12px] font-semibold text-[#434654] opacity-80">Connected Banks</span>
            <Building2 className="w-4 h-4 text-[#737685]" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[22px] font-bold text-[#191c1e]">22</span>
            <span className="text-[10px] font-bold text-[#737685]">Stable</span>
          </div>
          <div className="mt-2 flex -space-x-1.5">
            <div className="w-5.5 h-5.5 rounded-full border border-white bg-blue-900 text-white flex items-center justify-center text-[8px] font-bold">H</div>
            <div className="w-5.5 h-5.5 rounded-full border border-white bg-orange-600 text-white flex items-center justify-center text-[8px] font-bold">I</div>
            <div className="w-5.5 h-5.5 rounded-full border border-white bg-red-600 text-white flex items-center justify-center text-[8px] font-bold">K</div>
            <div className="w-5.5 h-5.5 rounded-full border border-white bg-[#edeef0] text-[#434654] flex items-center justify-center text-[8px] font-bold">+19</div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-3.5 rounded-xl border border-[#c3c6d6] shadow-2xs hover:shadow-xs transition-all">
          <div className="flex justify-between items-start mb-1">
            <span className="text-[12px] font-semibold text-[#434654] opacity-80">Offers Received</span>
            <FileCheck className="w-4 h-4 text-[#003d9b]" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[22px] font-bold text-[#003d9b]">1,542</span>
          </div>
          <div className="w-full h-6 mt-1">
            <svg className="w-full h-full" viewBox="0 0 100 30">
              <path
                d="M0 25 Q 15 10, 30 18 T 60 8 T 80 20 T 100 5"
                fill="none"
                stroke="#003d9b"
                strokeWidth="2"
                className="opacity-70"
              />
            </svg>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-3.5 rounded-xl border border-[#c3c6d6] shadow-2xs hover:shadow-xs transition-all">
          <div className="flex justify-between items-start mb-1">
            <span className="text-[12px] font-semibold text-[#434654] opacity-80">Avg Response</span>
            <Zap className="w-4 h-4 text-[#003d9b]" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[22px] font-bold text-[#191c1e]">38</span>
            <span className="text-[12px] font-medium text-[#737685]">sec</span>
          </div>
          <div className="flex items-center gap-1 mt-2 text-[10px] text-green-600 font-bold">
            <Zap className="w-3 h-3" />
            <span>Top Decile SLA</span>
          </div>
        </div>

        {/* KPI 5 */}
        <div className="bg-white p-3.5 rounded-xl border border-[#c3c6d6] shadow-2xs hover:shadow-xs transition-all">
          <div className="flex justify-between items-start mb-1">
            <span className="text-[12px] font-semibold text-[#434654] opacity-80">Approvals</span>
            <CheckCircle2 className="w-4 h-4 text-green-600" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[22px] font-bold text-[#191c1e]">312</span>
            <span className="text-[10px] text-green-600 font-bold">+5%</span>
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-[#737685]">
            <span>Target: 350</span>
            <span className="font-bold text-[#191c1e]">89%</span>
          </div>
        </div>

        {/* KPI 6 */}
        <div className="bg-white p-3.5 rounded-xl border border-[#c3c6d6] shadow-2xs hover:shadow-xs transition-all">
          <div className="flex justify-between items-start mb-1">
            <span className="text-[12px] font-semibold text-[#434654] opacity-80">Conversion</span>
            <Activity className="w-4 h-4 text-[#003d9b]" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[22px] font-bold text-[#003d9b]">74%</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#003d9b] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#003d9b]"></span>
            </span>
            <span className="text-[10px] text-[#737685]">Live tracking</span>
          </div>
        </div>

        {/* KPI 7 (Platform GTV Highlight Card) */}
        <div className="bg-[#003d9b] p-3.5 rounded-xl border border-[#003d9b] shadow-md text-white flex flex-col justify-between">
          <div className="flex justify-between items-start mb-1">
            <span className="text-[12px] font-semibold opacity-85">Platform GTV</span>
            <CreditCard className="w-4 h-4 opacity-85" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[20px] font-bold font-mono tracking-tight">₹18.6 Cr</span>
          </div>
          <p className="text-[10px] opacity-75 mt-2">Month-to-date total</p>
        </div>
      </section>

      {/* Asymmetric Bento Grid Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Lead Volume Trend (8 Columns) */}
        <div className="lg:col-span-8 bg-white border border-[#c3c6d6] rounded-xl p-5 shadow-2xs flex flex-col justify-between min-h-[340px]">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-[18px] font-bold text-[#191c1e]">Lead Volume Trend</h3>
              <p className="text-[13px] text-[#737685]">Aggregate daily leads across all OEM regions</p>
            </div>
            <div className="flex bg-[#edeef0] p-1 rounded-lg text-[12px] font-semibold">
              <button
                onClick={() => setTimeRange('7d')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  timeRange === '7d' ? 'bg-white text-[#003d9b] shadow-2xs' : 'text-[#737685] hover:text-[#191c1e]'
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setTimeRange('30d')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  timeRange === '30d' ? 'bg-white text-[#003d9b] shadow-2xs' : 'text-[#737685] hover:text-[#191c1e]'
                }`}
              >
                30 Days
              </button>
            </div>
          </div>

          {/* Line Chart Area */}
          <div className="flex-1 relative bg-gradient-to-b from-[#003d9b]/5 to-transparent rounded-lg border border-[#003d9b]/10 p-4 flex items-end">
            <svg className="w-full h-48" viewBox="0 0 800 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="leadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#003d9b" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#003d9b" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0,150 Q 120,130 200,90 T 400,70 T 600,40 T 800,20"
                fill="none"
                stroke="#003d9b"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M 0,150 Q 120,130 200,90 T 400,70 T 600,40 T 800,20 V 200 H 0 Z"
                fill="url(#leadGrad)"
              />
              {/* Data points */}
              <circle cx="200" cy="90" r="5" fill="#003d9b" className="cursor-pointer hover:r-7 transition-all" />
              <circle cx="400" cy="70" r="5" fill="#003d9b" className="cursor-pointer hover:r-7 transition-all" />
              <circle cx="600" cy="40" r="5" fill="#003d9b" className="cursor-pointer hover:r-7 transition-all" />
              <circle cx="800" cy="20" r="5" fill="#003d9b" className="cursor-pointer hover:r-7 transition-all" />
            </svg>

            {/* Hover Indicator Overlay */}
            <div className="absolute inset-x-4 bottom-2 flex justify-between text-[11px] font-semibold text-[#737685] border-t border-[#c3c6d6]/30 pt-2">
              {trendData7Days.map((item, index) => (
                <div
                  key={item.day}
                  onMouseEnter={() => setHoveredDay(index)}
                  onMouseLeave={() => setHoveredDay(null)}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <span className={hoveredDay === index ? 'text-[#003d9b] font-bold' : ''}>
                    {item.day}
                  </span>
                  {hoveredDay === index && (
                    <span className="text-[10px] bg-[#003d9b] text-white px-1.5 py-0.5 rounded font-mono shadow-xs mt-0.5">
                      {item.leads}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Approval Rate Gauge (4 Columns) */}
        <div className="lg:col-span-4 bg-white border border-[#c3c6d6] rounded-xl p-5 shadow-2xs flex flex-col items-center justify-center text-center">
          <h3 className="text-[12px] font-bold uppercase tracking-widest text-[#737685] mb-4">
            Approval Rate
          </h3>
          <div className="relative w-44 h-28 flex flex-col items-center justify-end mb-2">
            <svg className="w-full h-full" viewBox="0 0 100 50">
              <path
                d="M 10,50 A 40,40 0 0,1 90,50"
                fill="none"
                stroke="#e1e2e4"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M 10,50 A 40,40 0 0,1 78,18"
                fill="none"
                stroke="#003d9b"
                strokeWidth="10"
                strokeDasharray="100"
                strokeDashoffset="0"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
              <span className="text-[32px] font-extrabold text-[#003d9b] leading-none">74%</span>
              <span className="text-[11px] font-semibold text-[#737685] mt-0.5">+2.4% vs PW</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full mt-4 pt-3 border-t border-[#c3c6d6]/40">
            <div className="text-left border-r border-[#c3c6d6]/40 pr-3">
              <p className="text-[11px] text-[#737685]">Qualified</p>
              <p className="text-[16px] font-bold text-[#191c1e]">1,120</p>
            </div>
            <div className="text-left pl-3">
              <p className="text-[11px] text-[#737685]">Rejected</p>
              <p className="text-[16px] font-bold text-[#ba1a1a]">422</p>
            </div>
          </div>
        </div>

        {/* Response Latency Bar Chart (4 Columns) */}
        <div className="lg:col-span-4 bg-white border border-[#c3c6d6] rounded-xl p-5 shadow-2xs flex flex-col justify-between min-h-[260px]">
          <h3 className="text-[16px] font-bold text-[#191c1e] mb-3">Response Latency</h3>
          <div className="flex-1 flex items-end gap-2 px-1">
            {[40, 60, 85, 55, 70, 90, 45].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group">
                <div
                  style={{ height: `${height}%` }}
                  className={`w-full rounded-t-xs transition-all ${
                    i === 2 ? 'bg-[#003d9b]' : 'bg-[#edeef0] group-hover:bg-[#0052cc]'
                  }`}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[11px] text-[#737685] font-semibold mt-3 pt-2 border-t border-[#c3c6d6]/30">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Market Share Donut Chart (4 Columns) */}
        <div className="lg:col-span-4 bg-white border border-[#c3c6d6] rounded-xl p-5 shadow-2xs flex flex-col justify-between min-h-[260px]">
          <h3 className="text-[16px] font-bold text-[#191c1e] mb-2">Market Share</h3>
          <div className="flex-1 flex items-center justify-center py-2">
            <div className="relative w-36 h-36">
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: 'conic-gradient(#003d9b 0% 45%, #0052cc 45% 75%, #b2c5ff 75% 100%)',
                }}
              />
              <div className="absolute inset-3 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                <span className="text-[11px] text-[#737685]">Total</span>
                <span className="text-[16px] font-bold text-[#003d9b]">₹18.6Cr</span>
              </div>
            </div>
          </div>
          <div className="space-y-1.5 pt-2 border-t border-[#c3c6d6]/30">
            <div className="flex items-center justify-between text-[12px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#003d9b]"></span>
                <span className="font-semibold text-[#191c1e]">HDFC Bank</span>
              </div>
              <span className="font-bold text-[#003d9b]">45%</span>
            </div>
            <div className="flex items-center justify-between text-[12px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0052cc]"></span>
                <span className="font-semibold text-[#191c1e]">ICICI Bank</span>
              </div>
              <span className="font-bold text-[#0052cc]">30%</span>
            </div>
          </div>
        </div>

        {/* Regional Density Heatmap Widget (4 Columns) */}
        <div className="lg:col-span-4 bg-white border border-[#c3c6d6] rounded-xl overflow-hidden shadow-2xs relative min-h-[260px] flex flex-col justify-between">
          <div className="p-3 bg-white/90 backdrop-blur-md border-b border-[#c3c6d6] z-10 flex justify-between items-center">
            <div>
              <h3 className="text-[13px] font-bold text-[#191c1e]">Regional Density</h3>
              <p className="text-[10px] text-[#737685]">Lead Heatmap (India)</p>
            </div>
            <span className="px-2 py-0.5 bg-[#dae2ff] text-[#003d9b] text-[10px] font-bold rounded">
              TOP METROS
            </span>
          </div>

          <div className="relative flex-1 bg-[#edeef0] overflow-hidden flex items-center justify-center">
            {/* Map styling representation */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#003d9b_1px,transparent_1px)] [background-size:12px_12px]" />
            <div className="relative z-10 space-y-2 text-center p-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 rounded-full shadow-xs border border-[#c3c6d6]">
                <MapPin className="w-4 h-4 text-[#003d9b]" />
                <span className="text-[12px] font-bold text-[#191c1e]">Mumbai (142 leads)</span>
              </div>
              <div className="flex justify-center gap-2 text-[11px] text-[#434654] font-medium">
                <span className="bg-white/80 px-2 py-0.5 rounded border border-[#c3c6d6]">Delhi: 128</span>
                <span className="bg-white/80 px-2 py-0.5 rounded border border-[#c3c6d6]">BLR: 115</span>
              </div>
            </div>
            
            {/* Hotspots */}
            <div className="absolute top-[35%] left-[40%] w-10 h-10 bg-[#003d9b]/30 rounded-full animate-ping pointer-events-none" />
            <div className="absolute top-[55%] left-[55%] w-12 h-12 bg-[#0052cc]/30 rounded-full animate-ping pointer-events-none delay-300" />
          </div>
        </div>
      </section>

      {/* Bottom Data Tables */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Top Performing Banks Table (7 Columns) */}
        <div className="lg:col-span-7 bg-white border border-[#c3c6d6] rounded-xl shadow-2xs overflow-hidden flex flex-col justify-between">
          <div className="px-5 py-3.5 border-b border-[#c3c6d6] flex justify-between items-center bg-[#f8f9fb]">
            <h3 className="text-[16px] font-bold text-[#191c1e]">Top Performing Banks</h3>
            <button
              onClick={() => setActiveTab('connected-banks')}
              className="text-[#003d9b] text-[12px] font-semibold hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>View All 22</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#edeef0]/50 text-[11px] text-[#434654] border-b border-[#c3c6d6]">
                  <th className="px-5 py-2.5 font-bold uppercase tracking-wider">Bank Partner</th>
                  <th className="px-4 py-2.5 font-bold uppercase tracking-wider">ROI (Avg)</th>
                  <th className="px-4 py-2.5 font-bold uppercase tracking-wider">Disb. Speed</th>
                  <th className="px-4 py-2.5 font-bold uppercase tracking-wider">Conv. %</th>
                  <th className="px-5 py-2.5 font-bold uppercase tracking-wider">GTV (Cr)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c3c6d6]/40 text-[13px]">
                {banks.slice(0, 4).map((bank) => (
                  <tr
                    key={bank.id}
                    onClick={() => setActiveTab('connected-banks')}
                    className="hover:bg-[#003d9b]/5 transition-colors cursor-pointer group"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded bg-[#e7e8ea] flex items-center justify-center font-bold text-[#003d9b] text-[12px]">
                          {bank.shortCode[0]}
                        </div>
                        <span className="font-bold text-[#191c1e] group-hover:text-[#003d9b]">
                          {bank.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono font-medium text-[#191c1e]">{bank.avgRoi}%</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold rounded border border-green-200">
                        {bank.disbursementSpeed}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-[#191c1e]">{bank.conversionRate}%</td>
                    <td className="px-5 py-3 text-[#003d9b] font-bold font-mono">₹{bank.gtvCr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dealer Performance & High Priority Pending (5 Columns) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Dealer Top 5 */}
          <div className="bg-white border border-[#c3c6d6] rounded-xl p-4 shadow-2xs">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[15px] font-bold text-[#191c1e]">Dealer Top 5</h3>
              <MoreHorizontal className="w-4 h-4 text-[#737685] cursor-pointer" />
            </div>
            <div className="space-y-3">
              {dealers.slice(0, 3).map((dealer) => (
                <div key={dealer.rank} className="flex items-center gap-3">
                  <span className="w-5 text-[12px] font-bold text-[#737685]">0{dealer.rank}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-[12px] mb-1">
                      <span className="font-bold text-[#191c1e]">{dealer.name}</span>
                      <span className="font-mono text-[#737685]">{dealer.leadsCount} Leads</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#edeef0] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#003d9b] rounded-full"
                        style={{ width: `${(dealer.leadsCount / 150) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* High Priority Pending Leads */}
          <div className="bg-white border border-[#c3c6d6] rounded-xl p-4 shadow-2xs">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[15px] font-bold text-[#191c1e]">High Priority Pending</h3>
              <span className="px-2 py-0.5 bg-[#ffdad6] text-[#93000a] text-[10px] font-bold rounded-full border border-[#ba1a1a]/20">
                ACTION REQUIRED
              </span>
            </div>
            <div className="space-y-2.5">
              {highPriorityLeads.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => {
                    onSelectLead(lead);
                    setActiveTab('live-offer-board');
                  }}
                  className="p-2.5 bg-[#f3f4f6] rounded-lg border-l-4 border-[#ba1a1a] flex justify-between items-center hover:bg-[#edeef0] transition-colors cursor-pointer group"
                >
                  <div>
                    <p className="text-[13px] font-bold text-[#191c1e] group-hover:text-[#003d9b]">
                      {lead.customerName}
                    </p>
                    <p className="text-[11px] text-[#737685]">
                      Loan: ₹{(lead.requiredLoanAmount / 100000).toFixed(1)} L | Waiting {lead.waitingHours || 2}h
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#737685] group-hover:text-[#003d9b] transition-transform group-hover:translate-x-0.5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer / System Stats */}
      <footer className="mt-8 px-4 py-3 border-t border-[#c3c6d6] bg-[#f3f4f6] rounded-xl flex flex-col sm:flex-row justify-between items-center text-[11px] text-[#737685] gap-2">
        <div className="flex gap-4">
          <span>System Health: <strong className="text-green-600 font-bold">OPTIMAL</strong></span>
          <span>Uptime: 99.98%</span>
          <span>Last Synced: 2 mins ago</span>
        </div>
        <div>© 2026 OEM Finance Portal. All Rights Reserved.</div>
      </footer>
    </div>
  );
};
