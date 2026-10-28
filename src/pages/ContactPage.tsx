import { useEffect, useState, type FormEvent, type ComponentType } from 'react';
import { Building, Check, Mail, MapPin, Phone, RefreshCw, Send } from 'lucide-react';

interface ContactPageProps {
  lang: 'en' | 'es';
  isActive: boolean;
  EditableText: ComponentType<{ path: string }>;
  getText: (path: string, targetLang: 'en' | 'es') => string;
}

export default function ContactPage({ lang, isActive, EditableText, getText }: ContactPageProps) {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    affiliation: 'Parent'
  });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactSending, setContactSending] = useState(false);
  const [contactError, setContactError] = useState(false);

  // index.html lets Netlify detect the "contact" form at deploy time.
  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      alert("Please fill in all required fields.");
      return;
    }
    setContactSending(true);
    setContactError(false);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(e.currentTarget) as any).toString()
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setContactSuccess(true);
      setContactForm({
        name: '',
        email: '',
        subject: '',
        message: '',
        affiliation: 'Parent'
      });
    } catch (err) {
      console.error('Contact form submission failed', err);
      setContactError(true);
    } finally {
      setContactSending(false);
    }
  };

  useEffect(() => {
    if (contactSuccess) {
      const timer = setTimeout(() => setContactSuccess(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [contactSuccess]);

  return (
    <div className={isActive ? '' : 'hidden'}>
              <section id="contact" className="py-20 bg-brand-warm border-b border-gray-150">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  
                  {/* Left: General Contact Form with Success State */}
                  <div className="lg:col-span-7 bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-sm relative">
                    
                    {contactSuccess && (
                      <div className="absolute inset-0 bg-white/95 rounded-2xl z-20 flex flex-col items-center justify-center text-center p-6 space-y-3 animate-fade-in">
                        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-inner">
                          <Check className="w-8 h-8 stroke-[3]" />
                        </div>
                        <h3 className="font-serif font-bold text-xl text-brand-blue">Message Sent!</h3>
                        <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
                          <EditableText path="contact.form.success" />
                        </p>
                      </div>
                    )}

                    <div className="border-b border-gray-100 pb-4 mb-6">
                      <div className="flex items-center gap-2 text-brand-teal font-bold uppercase tracking-widest text-xs mb-1">
                        <Mail className="w-4 h-4" />
                        <EditableText path="contact.section_title" />
                      </div>
                      <h2 className="text-2xl font-serif font-bold text-brand-blue">
                        <EditableText path="contact.title" />
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">
                        <EditableText path="contact.subtitle" />
                      </p>
                    </div>

                    <form
                      name="contact"
                      method="POST"
                      data-netlify="true"
                      netlify-honeypot="bot-field"
                      onSubmit={handleContactSubmit}
                      className="space-y-4"
                    >
                      <input type="hidden" name="form-name" value="contact" />
                      {/* Netlify uses a field named "subject" as the notification email's subject line */}
                      <input
                        type="hidden"
                        name="subject"
                        value={`[SJBEF Contact] ${contactForm.subject || 'New message'}`}
                      />
                      <p className="hidden">
                        <label>Don't fill this out: <input name="bot-field" /></label>
                      </p>

                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="form-label">{getText('contact.form.name', lang)} *</label>
                          <input 
                            type="text" 
                            required
                            name="name"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                            placeholder="Sofia Ramirez"
                            className="form-control"
                          />
                        </div>
                        <div>
                          <label className="form-label">{getText('contact.form.email', lang)} *</label>
                          <input 
                            type="email" 
                            required
                            name="email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                            placeholder="sofia@gmail.com"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="form-label">{getText('contact.form.subject', lang)}</label>
                          <input 
                            type="text" 
                            name="topic"
                            value={contactForm.subject}
                            onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                            placeholder="e.g. Donation Question"
                            className="form-control"
                          />
                        </div>
                        <div>
                          <label className="form-label">Your Affiliation</label>
                          <select 
                            name="affiliation"
                            value={contactForm.affiliation}
                            onChange={(e) => setContactForm({...contactForm, affiliation: e.target.value})}
                            className="form-control"
                          >
                            <option value="Parent">{lang === 'en' ? 'Parent or family member' : 'Parent ou membre de la famille'}</option>
                            <option value="Teacher">{lang === 'en' ? 'Catholic school representative' : 'Représentant d’une école catholique'}</option>
                            <option value="Student">{lang === 'en' ? 'Student or scholarship applicant' : 'Étudiant ou candidat à une bourse'}</option>
                            <option value="Community">{lang === 'en' ? 'Member, donor, or community supporter' : 'Membre, donateur ou sympathisant'}</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="form-label">{getText('contact.form.message', lang)} *</label>
                        <textarea 
                          required
                          rows={4}
                          name="message"
                          value={contactForm.message}
                          onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                          placeholder="How can we help you?"
                          className="form-control resize-none"
                        ></textarea>
                      </div>

                      {contactError && (
                        <p className="text-xs text-red-600">
                          {lang === 'en'
                            ? 'Sorry, your message could not be sent. Please email info@sjbef.org or call 508-699-2764.'
                            : "Désolé, votre message n'a pas pu être envoyé. Veuillez écrire à info@sjbef.org ou appeler le 508-699-2764."}
                        </p>
                      )}

                      <button 
                        type="submit" 
                        disabled={contactSending}
                        className="w-full py-3 rounded-xl bg-brand-blue hover:bg-brand-blue/95 text-white font-bold text-xs tracking-wide shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {contactSending ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>{getText('contact.form.submit', lang)}</span>
                          </>
                        )}
                      </button>
                    </form>

                  </div>

                  {/* Right: Contact Information Panel */}
                  <div className="lg:col-span-5 space-y-6">
                    
                    {/* Organization Info Box */}
                    <div className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
                      <h3 className="font-serif font-bold text-xl text-brand-blue border-b border-gray-100 pb-2">
                        <EditableText path="contact.info.title" />
                      </h3>

                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                              <EditableText path="contact.info.email_label" />
                            </span>
                            <a href="mailto:info@sjbef.org" className="text-sm font-semibold text-brand-blue hover:underline">
                              <EditableText path="contact.info.email_val" />
                            </a>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                              <EditableText path="contact.info.phone_label" />
                            </span>
                            <a href="tel:508-699-2764" className="text-sm font-semibold text-brand-blue hover:underline">
                              <EditableText path="contact.info.phone_val" />
                            </a>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                              <EditableText path="contact.info.address_label" />
                            </span>
                            <span className="text-sm font-medium text-gray-600">
                              <EditableText path="contact.info.address_val" />
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Building className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                              <EditableText path="contact.info.status_label" />
                            </span>
                            <span className="text-sm font-medium text-gray-600">
                              <EditableText path="contact.info.status_val" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </section>
    </div>
  );
}
