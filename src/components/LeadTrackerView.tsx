import React, { useState } from 'react';
import { Lead, NavTab } from '../types';
import { 
  BarChart3, 
  Search, 
  Filter, 
  LayoutGrid, 
  List, 
  ChevronRight, 
  UserCheck, 
  Car, 
  Clock, 
  PlusSquare
} from 'lucide-react';

interface LeadTrackerViewProps {
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
  setActiveTab: (tab: NavTab) => void;
  onOpenLeadModal: (lead: Lead) => void;
}

export const LeadTrackerView: React.FC<LeadTrackerViewProps> = ({
  leads,
  onSelectLead,
  setActiveTab,
  onOpenLeadModal,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.id.toLowerCase().includes(search.toLowerCase()) ||
      lead.customerName.toLowerCase().includes(search.toLowerCase()) ||
      lead.dealerName.toLowerCase().includes(search.toLowerCase()) ||
      lead.vehicleModel.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const statuses = ['All', 'Draft', 'Submitted', 'Under Review', 'Approved', 'Sanctioned', 'Disbursed'];

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-white p-4 rounded-xl border border-[#c3c6d6] shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-[18px] font-bold text-[#191c1e]">Lead Tracker & Pipeline</h2>
            <p className="text-[12px] text-[#737685]">Monitor financial lead progress across dealer networks</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('create-lead')}
              className="px-3.5 py-1.5 bg-[#003d9b] text-white rounded-lg text-[12px] font-bold hover:bg-[#0052cc] transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <PlusSquare className="w-4 h-4" />
              <span>Create New Lead</span>
            </button>
            <div className="flex bg-[#edeef0] p-1 rounded-lg">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded cursor-pointer ${
                  viewMode === 'table' ? 'bg-white shadow-2xs text-[#003d9b]' : 'text-[#737685]'
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('kanban')}
                className={`p-1.5 rounded cursor-pointer ${
                  viewMode === 'kanban' ? 'bg-white shadow-2xs text-[#003d9b]' : 'text-[#737685]'
                }`}
                title="Kanban View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3 pt-2 border-t border-[#c3c6d6]/40">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#737685]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by ID, Customer Name, Vehicle or Dealer..."
              className="w-full pl-9 pr-3 py-1.5 bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#003d9b]/30"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 text-[12px] font-semibold">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                  statusFilter === st
                    ? 'bg-[#003d9b] text-white border-[#003d9b]'
                    : 'bg-white text-[#434654] border-[#c3c6d6] hover:bg-[#f3f4f6]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content View */}
      {viewMode === 'table' ? (
        <div className="bg-white border border-[#c3c6d6] rounded-xl shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8f9fb] text-[11px] text-[#434654] border-b border-[#c3c6d6]">
                  <th className="px-4 py-3 font-bold uppercase">Lead ID</th>
                  <th className="px-4 py-3 font-bold uppercase">Customer</th>
                  <th className="px-4 py-3 font-bold uppercase">Dealer Outlet</th>
                  <th className="px-4 py-3 font-bold uppercase">Vehicle</th>
                  <th className="px-4 py-3 font-bold uppercase">Loan Amount</th>
                  <th className="px-4 py-3 font-bold uppercase">Status</th>
                  <th className="px-4 py-3 font-bold uppercase text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c3c6d6]/40 text-[13px]">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#003d9b]/5 transition-colors">
                    <td className="px-4 py-3.5 font-mono font-bold text-[#003d9b]">{lead.id}</td>
                    <td className="px-4 py-3.5">
                      <p className="font-bold text-[#191c1e]">{lead.customerName}</p>
                      <p className="text-[11px] text-[#737685]">{lead.mobile}</p>
                    </td>
                    <td className="px-4 py-3.5 text-[#434654]">{lead.dealerName}</td>
                    <td className="px-4 py-3.5 font-semibold text-[#191c1e]">{lead.vehicleModel}</td>
                    <td className="px-4 py-3.5 font-mono font-bold text-[#191c1e]">
                      ₹{(lead.requiredLoanAmount / 100000).toFixed(1)} L
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        lead.status === 'Approved' ? 'bg-green-100 text-green-800 border-green-300' :
                        lead.status === 'Sanctioned' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                        lead.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                        lead.status === 'Draft' ? 'bg-[#edeef0] text-[#434654] border-[#c3c6d6]' :
                        'bg-blue-100 text-blue-800 border-blue-300'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            onSelectLead(lead);
                            setActiveTab('live-offer-board');
                          }}
                          className="px-2.5 py-1 bg-[#dae2ff] text-[#003d9b] text-[11px] font-bold rounded hover:bg-[#003d9b] hover:text-white transition-all cursor-pointer"
                        >
                          Offers
                        </button>
                        <button
                          onClick={() => onOpenLeadModal(lead)}
                          className="px-2.5 py-1 bg-[#edeef0] text-[#434654] text-[11px] font-bold rounded hover:bg-[#e1e2e4] transition-all cursor-pointer"
                        >
                          Dossier
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Kanban View */
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {['Draft', 'Submitted', 'Under Review', 'Approved'].map((st) => {
            const colLeads = filteredLeads.filter((l) => l.status === st);
            return (
              <div key={st} className="bg-[#f8f9fb] p-3 rounded-xl border border-[#c3c6d6] space-y-3">
                <div className="flex justify-between items-center border-b border-[#c3c6d6] pb-2">
                  <h4 className="text-[13px] font-bold text-[#191c1e]">{st}</h4>
                  <span className="px-2 py-0.5 bg-white text-[#003d9b] text-[11px] font-mono font-bold rounded border border-[#c3c6d6]">
                    {colLeads.length}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {colLeads.map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => onOpenLeadModal(lead)}
                      className="p-3 bg-white rounded-lg border border-[#c3c6d6] shadow-2xs hover:shadow-md transition-all cursor-pointer space-y-1.5"
                    >
                      <div className="flex justify-between text-[11px]">
                        <span className="font-mono font-bold text-[#003d9b]">{lead.id}</span>
                        <span className="text-[#737685]">{lead.city}</span>
                      </div>
                      <p className="text-[13px] font-bold text-[#191c1e]">{lead.customerName}</p>
                      <p className="text-[11px] text-[#434654]">{lead.vehicleModel}</p>
                      <p className="text-[12px] font-mono font-bold text-[#003d9b]">
                        ₹{(lead.requiredLoanAmount / 100000).toFixed(1)} L
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
