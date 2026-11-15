export type NavTab = 
  | 'dashboard' 
  | 'create-lead' 
  | 'live-offer-board' 
  | 'lead-tracker' 
  | 'reports' 
  | 'connected-banks' 
  | 'settings'
  | 'mobile-app';

export interface BankPartner {
  id: string;
  name: string;
  shortCode: string;
  logoUrl?: string;
  logoBgColor?: string;
  status: 'connected' | 'degraded' | 'offline';
  isLiveApi: boolean;
  responseSLA: string; // e.g. "38 sec"
  responseSlaSec: number;
  leadsToday: number;
  offersGenerated: number;
  conversionRate: number; // e.g. 82
  avgRoi: number; // e.g. 8.45
  disbursementSpeed: string; // e.g. "24 HOURS"
  disbursementSpeedType: 'fast' | 'medium' | 'standard';
  gtvCr: number; // e.g. 8.4
  rating: number; // e.g. 4.8
  description?: string;
  featured?: boolean;
}

export interface Lead {
  id: string; // e.g. "FL-29041" or "APP-8842-X"
  customerName: string;
  mobile: string;
  panNumber: string;
  dob: string;
  city: string;
  state: string;
  email: string;
  oemBrand: string;
  dealerName: string;
  dealerCity: string;
  vehicleModel: string;
  exShowroomCost: number;
  requiredLoanAmount: number;
  downPayment: number;
  expectedDeliveryDate: string;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Sanctioned' | 'Disbursed' | 'Declined';
  selectedBanks: string[]; // Bank ids
  createdAt: string;
  waitingHours?: number;
  isHighPriority?: boolean;
  creditScore?: number;
}

export interface BankOffer {
  id: string;
  leadId: string;
  bankId: string;
  bankName: string;
  status: 'APPROVED' | 'UNDER REVIEW' | 'DECLINED' | 'COUNTER OFFER';
  responseTime: string; // e.g. "12s" or "2m"
  roi: number; // e.g. 8.45
  emi: number; // e.g. 72400
  sanctionedAmount: number; // e.g. 3850000
  tenureYears: number; // e.g. 5
  score: number; // 1-5 stars
  scoreValue?: number; // e.g. 620
  notes?: string;
  processingFeePercent?: number;
}

export interface DealerPerformance {
  rank: number;
  name: string;
  city: string;
  leadsCount: number;
  conversionRate: number;
  gtvCr: number;
}

export interface TimelineStep {
  id: string;
  title: string;
  timestamp?: string;
  subtitle: string;
  status: 'completed' | 'current' | 'pending';
  note?: string;
}

export interface ReportMetric {
  title: string;
  value: string;
  trend: string;
  isPositive: boolean;
  sparklineData: number[];
}
