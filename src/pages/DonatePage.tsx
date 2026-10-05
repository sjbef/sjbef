import { useState, type FormEvent } from 'react';
import { DollarSign, Heart, Mail, Shield, X } from 'lucide-react';
import type { ComponentType } from 'react';

interface DonatePageProps {
  lang: 'en' | 'es';
  isActive: boolean;
  EditableText: ComponentType<{ path: string }>;
  getText: (path: string, targetLang: 'en' | 'es') => string;
}

export default function DonatePage({ lang, isActive, EditableText, getText }: DonatePageProps) {
  // Donation State
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [selectedDonationTier, setSelectedDonationTier] = useState<string | null>(null);
  const [customDonationAmount, setCustomDonationAmount] = useState('');
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  // Trigger simulated donation
  const handleDonationSubmit = (e: FormEvent) => {
    e.preventDefault();
    const amount = selectedDonationTier ? selectedDonationTier : customDonationAmount;
    if (!amount) {
      alert("Please select or enter a donation amount.");
      return;
    }
    setDonationSuccess(true);
  };

  return (
    <div className={isActive ? '' : 'hidden'}>
                  <section id="donate" className="py-20 bg-white border-b border-gray-150">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                      <div className="inline-flex items-center gap-2 text-brand-blue font-bold uppercase tracking-widest text-xs">
                        <span className="w-8 h-0.5 bg-brand-blue"></span>
                        <EditableText path="donate.section_title" />
                        <span className="w-8 h-0.5 bg-brand-blue"></span>
                      </div>
                      <h2 className="section-title">
                        <EditableText path="donate.title" />
                      </h2>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        <EditableText path="donate.description" />
                      </p>
                    </div>
    
                    {/* Donation Tiers */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                      
                      {/* Tier 1 */}
                      <div className="bg-brand-warm border border-gray-150 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-brand-teal/5 rounded-bl-full group-hover:bg-brand-teal/10 transition-colors"></div>
                        <div className="space-y-4">
                          <div className="text-brand-teal font-extrabold text-3xl font-serif">$25</div>
                          <h4 className="font-bold text-brand-blue">
                            <EditableText path="donate.tiers.t1_title" />
                          </h4>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            <EditableText path="donate.tiers.t1_desc" />
                          </p>
                        </div>
                        <button 
                          onClick={() => {
                            setSelectedDonationTier('25');
                            setDonationModalOpen(true);
                          }} 
                          className="mt-6 w-full py-2 bg-white border border-gray-200 hover:border-brand-teal text-brand-teal font-bold text-xs rounded-xl transition"
                        >
                          Select Sponsor
                        </button>
                      </div>
    
                      {/* Tier 2 */}
                      <div className="bg-brand-warm border border-gray-150 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-brand-blue/5 rounded-bl-full group-hover:bg-brand-blue/10 transition-colors"></div>
                        <div className="space-y-4">
                          <div className="text-brand-blue font-extrabold text-3xl font-serif">$150</div>
                          <h4 className="font-bold text-brand-blue">
                            <EditableText path="donate.tiers.t2_title" />
                          </h4>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            <EditableText path="donate.tiers.t2_desc" />
                          </p>
                        </div>
                        <button 
                          onClick={() => {
                            setSelectedDonationTier('150');
                            setDonationModalOpen(true);
                          }} 
                          className="mt-6 w-full py-2 bg-white border border-gray-200 hover:border-brand-blue text-brand-blue font-bold text-xs rounded-xl transition"
                        >
                          Select Sponsor
                        </button>
                      </div>
    
                      {/* Tier 3 */}
                      <div className="bg-brand-warm border border-brand-coral/30 rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition duration-300 relative overflow-hidden ring-2 ring-brand-coral/10">
                        <span className="absolute top-3 right-3 bg-brand-coral text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wide">Most Popular</span>
                        <div className="space-y-4">
                          <div className="text-brand-coral font-extrabold text-3xl font-serif">$500</div>
                          <h4 className="font-bold text-brand-blue">
                            <EditableText path="donate.tiers.t3_title" />
                          </h4>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            <EditableText path="donate.tiers.t3_desc" />
                          </p>
                        </div>
                        <button 
                          onClick={() => {
                            setSelectedDonationTier('500');
                            setDonationModalOpen(true);
                          }} 
                          className="mt-6 w-full py-2 bg-brand-coral hover:bg-brand-coral/95 text-white font-bold text-xs rounded-xl shadow-md shadow-brand-coral/10 transition"
                        >
                          Select Sponsor
                        </button>
                      </div>
    
                      {/* Tier 4 */}
                      <div className="bg-brand-warm border border-gray-150 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-brand-blue/5 rounded-bl-full group-hover:bg-brand-blue/10 transition-colors"></div>
                        <div className="space-y-4">
                          <div className="text-brand-blue font-extrabold text-3xl font-serif">$1,000</div>
                          <h4 className="font-bold text-brand-blue">
                            <EditableText path="donate.tiers.t4_title" />
                          </h4>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            <EditableText path="donate.tiers.t4_desc" />
                          </p>
                        </div>
                        <button 
                          onClick={() => {
                            setSelectedDonationTier('1000');
                            setDonationModalOpen(true);
                          }} 
                          className="mt-6 w-full py-2 bg-white border border-gray-200 hover:border-brand-blue text-brand-blue font-bold text-xs rounded-xl transition"
                        >
                          Select Sponsor
                        </button>
                      </div>
    
                    </div>
    
                    {/* Secure Call Action */}
                    <div className="max-w-xl mx-auto text-center space-y-4 bg-brand-warm border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-xs">
                      <div className="flex justify-center gap-1.5 text-brand-blue font-bold text-sm">
                        <Shield className="w-5 h-5 text-brand-teal" />
                        <span>Secure Online Contribution</span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        <EditableText path="donate.tax_deductible" />
                      </p>
                      
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                        <button 
                          onClick={() => {
                            setSelectedDonationTier(null);
                            setDonationModalOpen(true);
                          }}
                          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue/95 text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <DollarSign className="w-4 h-4" />
                          <span>Custom Amount</span>
                        </button>
                        <a 
                          href="https://www.paypal.com/nonprofit" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-400/90 text-amber-950 text-xs font-bold transition shadow-xs flex items-center justify-center gap-2"
                        >
                          <span className="font-serif italic font-extrabold text-sm text-blue-900">PayPal</span>
                          <span>{getText('donate.donate_btn', lang)}</span>
                        </a>
                      </div>
    
                      <p className="flex items-center justify-center gap-1.5 pt-2 border-t border-gray-150 text-xs text-gray-600">
                        <Mail className="w-4 h-4 text-brand-teal shrink-0" />
                        <EditableText path="donate.mail_check" />
                      </p>
                    </div>
    
                  </div>
                </section>

          {/* A. Donation Modal (PayPal Simulator) */}
          {donationModalOpen && (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
              <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full border border-gray-200 shadow-2xl relative space-y-6">
                
                <button 
                  onClick={() => {
                    setDonationModalOpen(false);
                    setDonationSuccess(false);
                  }} 
                  className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
    
                {donationSuccess ? (
                  <div className="text-center py-8 space-y-4 animate-fade-in">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-500 mx-auto flex items-center justify-center">
                      <Heart className="w-8 h-8 fill-emerald-500" />
                    </div>
                    <h3 className="font-serif font-bold text-2xl text-brand-blue">Thank You for Your Gift!</h3>
                    <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                      Your donation of **${selectedDonationTier || customDonationAmount}** has been processed successfully. A tax-deductible donation receipt has been sent to your email.
                    </p>
                    <div className="bg-brand-warm border border-gray-150 p-2.5 rounded-lg text-[10px] text-gray-500 max-w-xs mx-auto">
                      SJBEF operates 100% with volunteer board advocates, so 100% of your funds go straight to scholar scholarship funding.
                    </div>
                    <button 
                      onClick={() => {
                        setDonationModalOpen(false);
                        setDonationSuccess(false);
                      }}
                      className="px-6 py-2 bg-brand-blue hover:bg-brand-blue/95 text-white text-xs font-bold rounded-xl transition"
                    >
                      Return to Website
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="border-b border-gray-100 pb-3">
                      <h3 className="font-serif font-bold text-xl text-brand-blue">Support Scholarship Funding</h3>
                      <p className="text-xs text-gray-500">Tax-deductible simulated secure checkout</p>
                    </div>
    
                    <form onSubmit={handleDonationSubmit} className="space-y-4">
                      
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Selected Donation Amount</label>
                        {selectedDonationTier ? (
                          <div className="flex items-center justify-between bg-brand-blue/5 border border-brand-blue/20 p-3 rounded-xl">
                            <span className="text-2xl font-black text-brand-blue">${selectedDonationTier}</span>
                            <button 
                              type="button" 
                              onClick={() => setSelectedDonationTier(null)}
                              className="text-xs text-brand-coral font-bold hover:underline"
                            >
                              Change Amount
                            </button>
                          </div>
                        ) : (
                          <div className="relative">
                            <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input 
                              type="number" 
                              required
                              value={customDonationAmount}
                              onChange={(e) => setCustomDonationAmount(e.target.value)}
                              placeholder="Enter amount (e.g. 50)"
                              className="w-full text-base bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue rounded-xl p-3 pl-9 outline-none transition font-bold"
                            />
                          </div>
                        )}
                      </div>
    
                      <div className="space-y-3">
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wide">Donor Contact Information</label>
                        <div className="grid grid-cols-2 gap-2">
                          <input 
                            type="text" 
                            required 
                            placeholder="First Name" 
                            className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg p-2.5" 
                          />
                          <input 
                            type="text" 
                            required 
                            placeholder="Last Name" 
                            className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg p-2.5" 
                          />
                        </div>
                        <input 
                          type="email" 
                          required 
                          placeholder="Email Address" 
                          className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg p-2.5" 
                        />
                      </div>
    
                      <div className="p-3 bg-gray-50 border border-gray-150 rounded-xl space-y-1 text-[10.5px] text-gray-500">
                        <div className="flex items-center gap-1 font-bold text-brand-blue">
                          <Shield className="w-3.5 h-3.5 text-brand-teal" />
                          <span>Security Assured</span>
                        </div>
                        <p className="leading-relaxed">In the production build, this form points directly to your PayPal Giving Fund or Stripe charity account to avoid any processing fees.</p>
                      </div>
    
                      <button 
                        type="submit"
                        className="w-full py-3 bg-brand-coral hover:bg-brand-coral/95 text-white font-bold text-sm rounded-xl shadow-md transition-transform transform hover:-translate-y-0.5 cursor-pointer"
                      >
                        Authorize Donation
                      </button>
    
                      <p className="text-[10px] text-center text-gray-400">
                        501(c)(3) tax ID verification receipt is automatically emailed upon payment authorization.
                      </p>
                    </form>
                  </>
                )}
    
              </div>
            </div>
          )}
    </div>
  );
}
