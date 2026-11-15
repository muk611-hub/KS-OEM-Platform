import React, { useState } from 'react';
import { BankPartner } from '../types';
import { Landmark, X, Check } from 'lucide-react';

interface AddPartnerModalProps {
  onClose: () => void;
  onAddBank: (bank: BankPartner) => void;
}

export const AddPartnerModal: React.FC<AddPartnerModalProps> = ({
  onClose,
  onAddBank,
}) => {
  const [name, setName] = useState('Citibank India');
  const [shortCode, setShortCode] = useState('CITI');
  const [responseSLA, setResponseSLA] = useState('30 sec');
  const [avgRoi, setAvgRoi] = useState(8.5);
  const [bgColor, setBgColor] = useState('#003b70');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBank: BankPartner = {
      id: shortCode.toLowerCase(),
      name,
      shortCode,
      logoBgColor: bgColor,
      status: 'connected',
      isLiveApi: true,
      responseSLA,
      responseSlaSec: 30,
      leadsToday: 0,
      offersGenerated: 0,
      conversionRate: 85,
      avgRoi,
      disbursementSpeed: '24 HOURS',
      disbursementSpeedType: 'fast',
      gtvCr: 0,
      rating: 4.8,
      description: 'Newly integrated partner API',
    };

    onAddBank(newBank);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-[#c3c6d6]">
        <div className="flex justify-between items-center border-b border-[#c3c6d6] pb-3">
          <div className="flex items-center gap-2">
            <Landmark className="w-5 h-5 text-[#003d9b]" />
            <h3 className="text-[16px] font-bold text-[#191c1e]">Connect New Financial Partner API</h3>
          </div>
          <button onClick={onClose} className="text-[#737685] hover:text-[#191c1e]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-[13px]">
          <div>
            <label className="block text-[#434654] font-semibold mb-1">Institution Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#434654] font-semibold mb-1">Short Code</label>
            <input
              type="text"
              required
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value.toUpperCase())}
              className="w-full px-3 py-2 bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg font-mono focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#434654] font-semibold mb-1">Expected SLA</label>
              <input
                type="text"
                value={responseSLA}
                onChange={(e) => setResponseSLA(e.target.value)}
                className="w-full px-3 py-2 bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#434654] font-semibold mb-1">Base ROI %</label>
              <input
                type="number"
                step="0.05"
                value={avgRoi}
                onChange={(e) => setAvgRoi(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg font-mono focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#003d9b] text-white rounded-lg text-[13px] font-bold hover:bg-[#0052cc] transition-all cursor-pointer shadow-2xs"
          >
            Authenticate & Provision API Hook
          </button>
        </form>
      </div>
    </div>
  );
};
