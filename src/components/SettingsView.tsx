import React, { useState } from 'react';
import { 
  Settings, 
  Building2, 
  ShieldCheck, 
  Bell, 
  Key, 
  Save, 
  Check, 
  Lock,
  Globe
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [oemName, setOemName] = useState('Elite Motors Corp');
  const [webhookUrl, setWebhookUrl] = useState('https://api.elitemotors.com/webhooks/v1/leads');
  const [slaThresholdSec, setSlaThresholdSec] = useState(45);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-white p-5 rounded-xl border border-[#c3c6d6] shadow-2xs space-y-1">
        <h2 className="text-[20px] font-bold text-[#191c1e]">Enterprise Portal Settings</h2>
        <p className="text-[12px] text-[#737685]">
          Manage OEM profile, webhook API integrations, SLA alerting parameters, and user permissions
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Organization Info */}
        <div className="bg-white p-5 rounded-xl border border-[#c3c6d6] shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#c3c6d6]/60 pb-3">
            <Building2 className="w-5 h-5 text-[#003d9b]" />
            <h3 className="text-[16px] font-bold text-[#191c1e]">Organization Details</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px]">
            <div>
              <label className="block text-[#434654] font-semibold mb-1">OEM Enterprise Name</label>
              <input
                type="text"
                value={oemName}
                onChange={(e) => setOemName(e.target.value)}
                className="w-full px-3 py-2 bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003d9b]/30"
              />
            </div>

            <div>
              <label className="block text-[#434654] font-semibold mb-1">Subscription Tier</label>
              <input
                type="text"
                disabled
                value="Enterprise Tier (Unlimited API Bids)"
                className="w-full px-3 py-2 bg-[#edeef0] border border-[#c3c6d6] rounded-lg text-[#737685] font-bold"
              />
            </div>
          </div>
        </div>

        {/* Webhook & API Config */}
        <div className="bg-white p-5 rounded-xl border border-[#c3c6d6] shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#c3c6d6]/60 pb-3">
            <Globe className="w-5 h-5 text-[#003d9b]" />
            <h3 className="text-[16px] font-bold text-[#191c1e]">Webhook Integration</h3>
          </div>

          <div className="space-y-3 text-[13px]">
            <div>
              <label className="block text-[#434654] font-semibold mb-1">Live Lead Event Webhook URL</label>
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="w-full px-3 py-2 bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#003d9b]/30"
              />
            </div>

            <div>
              <label className="block text-[#434654] font-semibold mb-1">Max Response SLA Alert Threshold (Seconds)</label>
              <input
                type="number"
                value={slaThresholdSec}
                onChange={(e) => setSlaThresholdSec(Number(e.target.value))}
                className="w-36 px-3 py-2 bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#003d9b]/30"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white p-5 rounded-xl border border-[#c3c6d6] shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#c3c6d6]/60 pb-3">
            <Bell className="w-5 h-5 text-[#003d9b]" />
            <h3 className="text-[16px] font-bold text-[#191c1e]">Notification Preferences</h3>
          </div>

          <div className="space-y-3 text-[13px]">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 text-[#003d9b] rounded border-[#c3c6d6]"
              />
              <span className="font-semibold text-[#191c1e]">Email notifications for high-value leads (&gt; ₹30 Lakhs)</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="w-4 h-4 text-[#003d9b] rounded border-[#c3c6d6]"
              />
              <span className="font-semibold text-[#191c1e]">SMS alerts when bank response SLA exceeds 60 seconds</span>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#003d9b] text-white rounded-lg text-[13px] font-bold hover:bg-[#0052cc] transition-all flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>

          {saved && (
            <span className="text-green-700 text-[12px] font-bold flex items-center gap-1">
              <Check className="w-4 h-4" />
              <span>Settings updated successfully!</span>
            </span>
          )}
        </div>
      </form>
    </div>
  );
};
