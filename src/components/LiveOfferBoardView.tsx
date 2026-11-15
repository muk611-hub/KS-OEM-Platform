import React, { useState } from 'react';
import { Lead, BankPartner, BankOffer, TimelineStep, NavTab } from '../types';
import { 
  Sparkles, 
  Download, 
  Share2, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Star, 
  ChevronRight, 
  ArrowUpRight, 
  ShieldCheck, 
  Check, 
  AlertCircle,
  FileText
} from 'lucide-react';

interface LiveOfferBoardViewProps {
  selectedLead: Lead;
  allLeads: Lead[];
  onSelectLead: (lead: Lead) => void;
  offers: BankOffer[];
  timelineSteps: TimelineStep[];
  onAcceptOffer: (offer: BankOffer) => void;
  setActiveTab: (tab: NavTab) => void;
}

export const LiveOfferBoardView: React.FC<LiveOfferBoardViewProps> = ({
  selectedLead,
  allLeads,
  onSelectLead,
  offers,
  timelineSteps,
  onAcceptOffer,
  setActiveTab,
}) => {
  const [selectedOfferModal, setSelectedOfferModal] = useState<BankOffer | null>(null);

  const filteredOffers = offers.filter((o) => o.leadId === selectedLead.id || o.leadId === 'APP-8842-X');

  return (
    <div className="space-y-6">
      {/* Lead Application Context Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#c3c6d6] shadow-2xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#dae2ff] border border-[#003d9b]/20 flex items-center justify-center text-[#003d9b]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#737685] uppercase">Live Offer Board</span>
              <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold rounded-full border border-green-300">
                ACTIVE AUCTION
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <select
                value={selectedLead.id}
                onChange={(e) => {
                  const lead = allLeads.find((l) => l.id === e.target.value);
                  if (lead) onSelectLead(lead);
                }}
                className="text-[16px] font-bold text-[#003d9b] bg-transparent border-none focus:outline-none cursor-pointer pr-4"
              >
                {allLeads.map((lead) => (
                  <option key={lead.id} value={lead.id}>
                    {lead.id} - {lead.customerName} ({lead.vehicleModel})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Top Right Action buttons */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => alert(`Share link for ${selectedLead.id} copied to clipboard!`)}
            className="px-3 py-1.5 border border-[#c3c6d6] rounded-lg text-[12px] font-bold text-[#434654] hover:bg-[#f3f4f6] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Link</span>
          </button>
          <button 
            onClick={() => alert(`Exporting CSV offer comparison for ${selectedLead.id}`)}
            className="px-3.5 py-1.5 bg-[#003d9b] text-white rounded-lg text-[12px] font-bold hover:bg-[#0052cc] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Top KPIs Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-3.5 rounded-xl border border-[#c3c6d6] shadow-2xs">
          <p className="text-[11px] font-bold text-[#737685] uppercase">Banks Connected</p>
          <p className="text-[20px] font-bold text-[#191c1e]">22 Partners</p>
          <p className="text-[10px] text-green-600 font-bold mt-0.5">100% API Coverage</p>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-[#c3c6d6] shadow-2xs">
          <p className="text-[11px] font-bold text-[#737685] uppercase">Responded</p>
          <p className="text-[20px] font-bold text-[#003d9b]">8 Banks</p>
          <p className="text-[10px] text-[#737685] mt-0.5">3 Approved | 1 Under Review</p>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-[#c3c6d6] shadow-2xs">
          <p className="text-[11px] font-bold text-[#737685] uppercase">Best Offer ROI</p>
          <p className="text-[20px] font-bold text-green-600 font-mono">8.45%</p>
          <p className="text-[10px] text-[#737685] mt-0.5">HDFC Bank Ltd.</p>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-[#c3c6d6] shadow-2xs">
          <p className="text-[11px] font-bold text-[#737685] uppercase">Avg Response SLA</p>
          <p className="text-[20px] font-bold text-[#191c1e]">42 sec</p>
          <p className="text-[10px] text-green-600 font-bold mt-0.5">Real-time Bidding</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 Columns): Marketplace Responses Table */}
        <div className="lg:col-span-8 bg-white border border-[#c3c6d6] rounded-xl shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-[#c3c6d6] bg-[#f8f9fb] flex justify-between items-center">
            <h3 className="text-[16px] font-bold text-[#191c1e]">Live Marketplace Responses</h3>
            <span className="text-[11px] font-mono text-[#737685]">
              Required: ₹{selectedLead.requiredLoanAmount.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#edeef0]/60 text-[11px] text-[#434654] border-b border-[#c3c6d6]">
                  <th className="px-4 py-2.5 font-bold uppercase">Financial Partner</th>
                  <th className="px-3 py-2.5 font-bold uppercase">Status</th>
                  <th className="px-3 py-2.5 font-bold uppercase">ROI %</th>
                  <th className="px-3 py-2.5 font-bold uppercase">EMI (₹)</th>
                  <th className="px-3 py-2.5 font-bold uppercase">Score</th>
                  <th className="px-4 py-2.5 font-bold uppercase text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c3c6d6]/40 text-[13px]">
                {filteredOffers.map((offer) => (
                  <tr key={offer.id} className="hover:bg-[#003d9b]/5 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded bg-[#003d9b] text-white flex items-center justify-center font-bold text-[12px]">
                          {offer.bankName[0]}
                        </div>
                        <div>
                          <p className="font-bold text-[#191c1e]">{offer.bankName}</p>
                          <p className="text-[10px] text-[#737685]">{offer.responseTime}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-3 py-3">
                      {offer.status === 'APPROVED' && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold rounded border border-green-300">
                          APPROVED
                        </span>
                      )}
                      {offer.status === 'UNDER REVIEW' && (
                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-[10px] font-bold rounded border border-yellow-300">
                          UNDER REVIEW
                        </span>
                      )}
                      {offer.status === 'DECLINED' && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-800 text-[10px] font-bold rounded border border-red-300">
                          DECLINED
                        </span>
                      )}
                    </td>

                    <td className="px-3 py-3 font-mono font-bold text-[#191c1e]">
                      {offer.roi > 0 ? `${offer.roi}%` : '-'}
                    </td>

                    <td className="px-3 py-3 font-mono text-[#003d9b] font-bold">
                      {offer.emi > 0 ? `₹${offer.emi.toLocaleString('en-IN')}` : '-'}
                    </td>

                    <td className="px-3 py-3">
                      <div className="flex text-amber-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              star <= offer.score ? 'fill-amber-400 text-amber-400' : 'text-[#c3c6d6]'
                            }`}
                          />
                        ))}
                      </div>
                    </td>

                    <td className="px-4 py-3 text-right">
                      {offer.status === 'APPROVED' ? (
                        <button
                          onClick={() => onAcceptOffer(offer)}
                          className="px-3 py-1 bg-[#003d9b] text-white text-[11px] font-bold rounded hover:bg-[#0052cc] transition-all cursor-pointer shadow-2xs"
                        >
                          Select Offer
                        </button>
                      ) : (
                        <button
                          onClick={() => setSelectedOfferModal(offer)}
                          className="px-3 py-1 bg-[#edeef0] text-[#434654] text-[11px] font-bold rounded hover:bg-[#e1e2e4] transition-all cursor-pointer"
                        >
                          Details
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (4 Columns): Journey Timeline & Insights */}
        <div className="lg:col-span-4 space-y-6">
          {/* Journey Timeline */}
          <div className="bg-white p-5 rounded-xl border border-[#c3c6d6] shadow-2xs space-y-4">
            <h3 className="text-[15px] font-bold text-[#191c1e] border-b border-[#c3c6d6]/60 pb-3">
              Lead Journey Timeline
            </h3>

            <div className="relative pl-6 space-y-4 text-[12px] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#c3c6d6]">
              {timelineSteps.map((step) => (
                <div key={step.id} className="relative">
                  <span
                    className={`absolute -left-6 top-0.5 w-3.5 h-3.5 rounded-full border-2 ${
                      step.status === 'completed'
                        ? 'bg-[#003d9b] border-[#003d9b]'
                        : step.status === 'current'
                        ? 'bg-amber-500 border-amber-500 animate-pulse'
                        : 'bg-white border-[#c3c6d6]'
                    }`}
                  />
                  <div>
                    <div className="flex justify-between items-baseline">
                      <p className={`font-bold ${step.status === 'current' ? 'text-[#003d9b]' : 'text-[#191c1e]'}`}>
                        {step.title}
                      </p>
                      {step.timestamp && <span className="text-[10px] text-[#737685]">{step.timestamp}</span>}
                    </div>
                    <p className="text-[11px] text-[#737685] mt-0.5">{step.subtitle}</p>
                    {step.note && (
                      <p className="text-[10px] bg-[#dae2ff]/50 text-[#003d9b] p-1.5 rounded mt-1 font-semibold">
                        {step.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Insights Card */}
          <div className="bg-[#f8f9fb] p-4 rounded-xl border border-[#c3c6d6] shadow-2xs space-y-2">
            <div className="flex items-center gap-1.5 text-[#003d9b] text-[12px] font-bold">
              <Sparkles className="w-4 h-4" />
              <span>AI Market Insight</span>
            </div>
            <p className="text-[11px] text-[#434654] leading-relaxed">
              HDFC Bank & SBI are currently offering competitive zero-processing fee waivers for loan values above ₹35 Lakhs in the West region.
            </p>
          </div>
        </div>
      </div>

      {/* Offer Detail Modal */}
      {selectedOfferModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-[#c3c6d6]">
            <div className="flex justify-between items-center border-b border-[#c3c6d6] pb-3">
              <h3 className="text-[16px] font-bold text-[#191c1e]">{selectedOfferModal.bankName} Offer Dossier</h3>
              <button
                onClick={() => setSelectedOfferModal(null)}
                className="text-[#737685] hover:text-[#191c1e] font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-[13px]">
              <p><strong>Status:</strong> {selectedOfferModal.status}</p>
              <p><strong>Response Time:</strong> {selectedOfferModal.responseTime}</p>
              <p><strong>Underwriting Notes:</strong> {selectedOfferModal.notes || 'N/A'}</p>
            </div>

            <button
              onClick={() => setSelectedOfferModal(null)}
              className="w-full py-2 bg-[#003d9b] text-white rounded-lg text-[13px] font-bold cursor-pointer"
            >
              Close Dossier
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
