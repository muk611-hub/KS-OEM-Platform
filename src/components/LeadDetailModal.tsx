import React from 'react';
import { Lead, BankOffer } from '../types';
import { 
  UserCheck, 
  Car, 
  Building2, 
  FileCheck, 
  CreditCard, 
  X, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Download,
  ShieldCheck
} from 'lucide-react';

interface LeadDetailModalProps {
  lead: Lead;
  offers: BankOffer[];
  onClose: () => void;
  onUpdateStatus: (leadId: string, newStatus: Lead['status']) => void;
}

export const LeadDetailModal: React.FC<LeadDetailModalProps> = ({
  lead,
  offers,
  onClose,
  onUpdateStatus,
}) => {
  const leadOffers = offers.filter((o) => o.leadId === lead.id || o.leadId === 'APP-8842-X');

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl border border-[#c3c6d6] my-8">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-[#c3c6d6] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-mono font-bold text-[#003d9b] bg-[#dae2ff] px-2 py-0.5 rounded">
                {lead.id}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                lead.status === 'Approved' ? 'bg-green-100 text-green-800 border-green-300' :
                lead.status === 'Sanctioned' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                'bg-blue-100 text-blue-800 border-blue-300'
              }`}>
                {lead.status}
              </span>
            </div>
            <h2 className="text-[20px] font-bold text-[#191c1e] mt-1">{lead.customerName}</h2>
            <p className="text-[12px] text-[#737685]">{lead.oemBrand} | {lead.dealerName}</p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#edeef0] text-[#737685] hover:text-[#191c1e] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
          {/* Profile */}
          <div className="bg-[#f8f9fb] p-3.5 rounded-xl border border-[#c3c6d6]/60 space-y-2">
            <p className="text-[11px] font-bold text-[#003d9b] uppercase flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5" /> Customer Dossier
            </p>
            <p><strong>Mobile:</strong> +91 {lead.mobile}</p>
            <p><strong>PAN:</strong> <span className="font-mono">{lead.panNumber}</span></p>
            <p><strong>DOB:</strong> {lead.dob}</p>
            <p><strong>City:</strong> {lead.city}, {lead.state}</p>
            <p><strong>Bureau Score:</strong> <span className="text-green-700 font-bold">{lead.creditScore || 785} Excellent</span></p>
          </div>

          {/* Vehicle & Loan */}
          <div className="bg-[#f8f9fb] p-3.5 rounded-xl border border-[#c3c6d6]/60 space-y-2">
            <p className="text-[11px] font-bold text-[#003d9b] uppercase flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5" /> Vehicle & Loan Request
            </p>
            <p><strong>Model:</strong> {lead.vehicleModel}</p>
            <p><strong>Ex-Showroom:</strong> ₹{lead.exShowroomCost.toLocaleString('en-IN')}</p>
            <p><strong>Required Loan:</strong> <span className="font-mono font-bold text-[#003d9b]">₹{lead.requiredLoanAmount.toLocaleString('en-IN')}</span></p>
            <p><strong>Down Payment:</strong> ₹{lead.downPayment.toLocaleString('en-IN')}</p>
            <p><strong>Delivery Date:</strong> {lead.expectedDeliveryDate}</p>
          </div>
        </div>

        {/* Bank Bids Received */}
        <div className="space-y-3">
          <h3 className="text-[14px] font-bold text-[#191c1e] border-b border-[#c3c6d6]/60 pb-2">
            Bank Bids Received ({leadOffers.length})
          </h3>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {leadOffers.map((offer) => (
              <div
                key={offer.id}
                className="p-3 bg-white border border-[#c3c6d6] rounded-lg flex justify-between items-center text-[12px]"
              >
                <div>
                  <p className="font-bold text-[#191c1e]">{offer.bankName}</p>
                  <p className="text-[10px] text-[#737685]">Response: {offer.responseTime}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-[#003d9b]">
                    {offer.roi > 0 ? `${offer.roi}% ROI` : 'Under Review'}
                  </p>
                  <p className="text-[10px] text-green-700 font-semibold">
                    {offer.emi > 0 ? `₹${offer.emi.toLocaleString('en-IN')}/mo` : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Action Buttons */}
        <div className="pt-4 border-t border-[#c3c6d6] flex flex-wrap justify-between items-center gap-3">
          <div className="flex gap-2">
            <button
              onClick={() => {
                onUpdateStatus(lead.id, 'Approved');
                onClose();
              }}
              className="px-3.5 py-1.5 bg-green-700 text-white rounded-lg text-[12px] font-bold hover:bg-green-800 transition-colors cursor-pointer"
            >
              Approve Lead
            </button>
            <button
              onClick={() => {
                onUpdateStatus(lead.id, 'Sanctioned');
                onClose();
              }}
              className="px-3.5 py-1.5 bg-[#003d9b] text-white rounded-lg text-[12px] font-bold hover:bg-[#0052cc] transition-colors cursor-pointer"
            >
              Mark Sanctioned
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 border border-[#c3c6d6] rounded-lg text-[12px] font-bold text-[#434654] hover:bg-[#f3f4f6] cursor-pointer"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
