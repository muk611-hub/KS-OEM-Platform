import React, { useState } from 'react';
import { Download, X, FileSpreadsheet, FileText } from 'lucide-react';

interface ExportModalProps {
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ onClose }) => {
  const [format, setFormat] = useState<'csv' | 'xlsx' | 'json'>('csv');
  const [dateRange, setDateRange] = useState('All Time');

  const handleDownload = () => {
    // Generate simple CSV download
    const dummyCsv = `Lead ID,Customer Name,OEM Brand,Dealer,Required Loan,Status\nFL-29041,Priya Sundaram,Elite Motors,Southern Star,1000000,Draft\nAPP-8842-X,Rohan Sharma,Elite Motors,Global Motors,4500000,Approved\nAPP-8843-Y,Ananya Verma,Elite Motors,Prestige Cars,1250000,Under Review`;
    const blob = new Blob([dummyCsv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `OEM_Finance_Leads_Export_${Date.now()}.${format}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-[#c3c6d6]">
        <div className="flex justify-between items-center border-b border-[#c3c6d6] pb-3">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-[#003d9b]" />
            <h3 className="text-[16px] font-bold text-[#191c1e]">Export OEM Finance Dataset</h3>
          </div>
          <button onClick={onClose} className="text-[#737685] hover:text-[#191c1e]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-[13px]">
          <div>
            <label className="block text-[#434654] font-semibold mb-1">Export Format</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFormat('csv')}
                className={`p-2 rounded-lg border font-bold text-center cursor-pointer ${
                  format === 'csv' ? 'bg-[#003d9b] text-white border-[#003d9b]' : 'bg-[#f8f9fb] border-[#c3c6d6]'
                }`}
              >
                CSV
              </button>
              <button
                type="button"
                onClick={() => setFormat('xlsx')}
                className={`p-2 rounded-lg border font-bold text-center cursor-pointer ${
                  format === 'xlsx' ? 'bg-[#003d9b] text-white border-[#003d9b]' : 'bg-[#f8f9fb] border-[#c3c6d6]'
                }`}
              >
                Excel (.xlsx)
              </button>
              <button
                type="button"
                onClick={() => setFormat('json')}
                className={`p-2 rounded-lg border font-bold text-center cursor-pointer ${
                  format === 'json' ? 'bg-[#003d9b] text-white border-[#003d9b]' : 'bg-[#f8f9fb] border-[#c3c6d6]'
                }`}
              >
                JSON
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[#434654] font-semibold mb-1">Time Period Filter</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg focus:outline-none"
            >
              <option value="All Time">All Time (12,842 Leads)</option>
              <option value="Today">Today (482 Leads)</option>
              <option value="Last 30 Days">Last 30 Days (3,420 Leads)</option>
            </select>
          </div>

          <button
            onClick={handleDownload}
            className="w-full py-2.5 bg-[#003d9b] text-white rounded-lg text-[13px] font-bold hover:bg-[#0052cc] transition-all cursor-pointer shadow-2xs flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Generate & Download File</span>
          </button>
        </div>
      </div>
    </div>
  );
};
