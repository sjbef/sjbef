import type { ComponentType } from 'react';
import {
  Award,
  Calendar,
  CheckCircle,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  HelpCircle,
  MapPin,
  Shield,
  Sparkles,
} from 'lucide-react';

interface ScholarshipsPageProps {
  lang: 'en' | 'es';
  EditableText: ComponentType<{ path: string }>;
  heritageImage: string;
}

export default function ScholarshipsPage({ lang, EditableText, heritageImage }: ScholarshipsPageProps) {
  return (
              <section id="scholarships" className="py-20 bg-brand-warm border-b border-gray-150">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header block */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-brand-coral font-bold uppercase tracking-widest text-xs">
                    <span className="w-8 h-0.5 bg-brand-coral"></span>
                    <EditableText path="scholarships.section_title" />
                  </div>
                  
                  <h2 className="section-title">
                    <EditableText path="scholarships.title" />
                  </h2>
                  
                  <p className="text-base text-gray-600 leading-relaxed max-w-4xl">
                    <EditableText path="scholarships.description" />
                  </p>
                </div>

                {/* Application Period Info-Banner */}
                <div className="mt-8 bg-brand-blue text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row gap-6 items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-brand-coral font-bold uppercase tracking-widest text-xs bg-white/15 px-3 py-1 rounded-full w-fit">
                      <Calendar className="w-3.5 h-3.5" />
                      <EditableText path="scholarships.apply_period_title" />
                    </div>
                    <p className="text-sm text-white/95 leading-relaxed max-w-2xl">
                      <EditableText path="scholarships.apply_period_desc" />
                    </p>
                  </div>
                  <div className="bg-white/10 border border-white/20 px-4 py-3 rounded-xl text-center shrink-0 w-full md:w-auto">
                    <span className="text-[10px] text-brand-coral uppercase tracking-wider font-bold">Annual Cycle</span>
                    <div className="text-lg font-bold font-serif text-white mt-0.5">
                      <EditableText path="scholarships.deadline" />
                    </div>
                  </div>
                </div>

                {/* Two-Column Streamlined Requirements & Application Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-start">
                  
                  {/* Left Column: Requirements and Details */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    {/* Eligibility Requirements Card */}
                    <div className="content-card">
                      <h3 className="font-serif font-bold text-lg text-brand-blue border-b border-gray-100 pb-2 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-brand-coral" />
                        <EditableText path="scholarships.eligibility_title" />
                      </h3>
                      <p className="text-xs text-gray-500 italic">
                        <EditableText path="scholarships.eligibility_desc" />
                      </p>
                      <ul className="space-y-4 pt-2">
                        <li className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                          <span className="w-1.5 h-1.5 bg-brand-coral rounded-full mt-2 shrink-0"></span>
                          <EditableText path="scholarships.eligibility_item1" />
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                          <span className="w-1.5 h-1.5 bg-brand-coral rounded-full mt-2 shrink-0"></span>
                          <EditableText path="scholarships.eligibility_item2" />
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                          <span className="w-1.5 h-1.5 bg-brand-coral rounded-full mt-2 shrink-0"></span>
                          <EditableText path="scholarships.eligibility_item3" />
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                          <span className="w-1.5 h-1.5 bg-brand-coral rounded-full mt-2 shrink-0"></span>
                          <EditableText path="scholarships.eligibility_item4" />
                        </li>
                      </ul>
                    </div>

                    {/* Required Documents Card */}
                    <div className="content-card">
                      <h3 className="font-serif font-bold text-lg text-brand-blue border-b border-gray-100 pb-2 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-brand-coral" />
                        <EditableText path="scholarships.documents_title" />
                      </h3>
                      <p className="text-xs text-gray-500 italic">
                        <EditableText path="scholarships.documents_desc" />
                      </p>
                      <ul className="space-y-4 pt-2">
                        <li className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                          <span className="w-1.5 h-1.5 bg-brand-coral rounded-full mt-2 shrink-0"></span>
                          <EditableText path="scholarships.documents_item1" />
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                          <span className="w-1.5 h-1.5 bg-brand-coral rounded-full mt-2 shrink-0"></span>
                          <EditableText path="scholarships.documents_item2" />
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                          <span className="w-1.5 h-1.5 bg-brand-coral rounded-full mt-2 shrink-0"></span>
                          <EditableText path="scholarships.documents_item3" />
                        </li>
                      </ul>
                    </div>

                    {/* Submission and Process Card */}
                    <div className="content-card">
                      <h3 className="font-serif font-bold text-lg text-brand-blue border-b border-gray-100 pb-2 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-brand-coral" />
                        <EditableText path="scholarships.submission_title" />
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        <EditableText path="scholarships.submission_desc" />
                      </p>
                      
                      <div className="bg-brand-warm border border-gray-200/60 p-4 rounded-xl space-y-2 mt-2">
                        <h4 className="text-xs font-bold text-brand-blue uppercase tracking-wider flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-brand-coral" />
                          {lang === 'en' ? 'Mailing Address for Hard Copies & Transcripts' : 'Adresse Postale pour Copies Papier & Relevés'}
                        </h4>
                        <p className="text-xs text-gray-600 font-medium leading-relaxed bg-white/75 border border-gray-100 p-2.5 rounded-lg select-all">
                          <EditableText path="scholarships.submission_mail_address" />
                        </p>
                      </div>

                      <p className="text-xs text-gray-500 leading-relaxed">
                        <EditableText path="scholarships.submission_online_desc" />
                      </p>
                    </div>

                  </div>

                  {/* Right Column: Downloads, Links & Forms */}
                  <div className="lg:col-span-5 space-y-6">
                    
                    {/* Printable PDF Downloads Card */}
                    <div className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-md space-y-5">
                      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                        <div>
                          <h3 className="font-serif font-bold text-lg text-brand-blue">
                            <EditableText path="scholarships.downloads_title" />
                          </h3>
                          <p className="text-[10px] text-brand-coral font-bold mt-0.5 uppercase tracking-wider">
                            {lang === 'en' ? 'Official Printable PDF Forms' : 'Formulaires PDF Officiels'}
                          </p>
                        </div>
                        <Download className="w-6 h-6 text-brand-blue shrink-0" />
                      </div>

                      <div className="flex flex-col gap-3">
                        
                        {/* General Scholarship Application Link */}
                        <a 
                          href="/documents/SJBEF-Scholarship-Application.pdf" 
                          download
                          className="group flex items-center justify-between p-4 bg-brand-warm hover:bg-brand-blue/5 border border-gray-150 rounded-xl transition-all shadow-xs"
                        >
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-brand-blue group-hover:text-brand-coral transition-colors">
                              <EditableText path="scholarships.download_app_btn" />
                            </p>
                            <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                              <FileText className="w-3 h-3 text-brand-teal" /> PDF Document • 227 KB
                            </span>
                          </div>
                          <Download className="w-4 h-4 text-brand-blue/70 group-hover:text-brand-coral group-hover:translate-y-0.5 transition-all shrink-0 ml-2" />
                        </a>

                        {/* Volunteer Form Link */}
                        <a 
                          href="/documents/SJBEF-Volunteer-Form.pdf" 
                          download
                          className="group flex items-center justify-between p-4 bg-brand-warm hover:bg-brand-blue/5 border border-gray-150 rounded-xl transition-all shadow-xs"
                        >
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-brand-blue group-hover:text-brand-coral transition-colors">
                              <EditableText path="scholarships.download_volunteer_btn" />
                            </p>
                            <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                              <FileText className="w-3 h-3 text-brand-teal" /> PDF Document • 225 KB
                            </span>
                          </div>
                          <Download className="w-4 h-4 text-brand-blue/70 group-hover:text-brand-coral group-hover:translate-y-0.5 transition-all shrink-0 ml-2" />
                        </a>

                        {/* Seminarian Form Link */}
                        <a 
                          href="/documents/Seminarian-Scholarship-Application.pdf" 
                          download
                          className="group flex items-center justify-between p-4 bg-brand-warm hover:bg-brand-blue/5 border border-gray-150 rounded-xl transition-all shadow-xs"
                        >
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-brand-blue group-hover:text-brand-coral transition-colors">
                              <EditableText path="scholarships.download_seminarian_btn" />
                            </p>
                            <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                              <FileText className="w-3 h-3 text-brand-teal" /> PDF Document • 377 KB
                            </span>
                          </div>
                          <Download className="w-4 h-4 text-brand-blue/70 group-hover:text-brand-coral group-hover:translate-y-0.5 transition-all shrink-0 ml-2" />
                        </a>

                      </div>

                      {/* Callout Support Section */}
                      <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 space-y-2">
                        <h4 className="text-xs font-bold text-brand-blue flex items-center gap-1">
                          <HelpCircle className="w-4 h-4 text-brand-coral shrink-0" />
                          <EditableText path="scholarships.help_title" />
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          <EditableText path="scholarships.help_desc" />
                        </p>
                      </div>

                    </div>

                    {/* Interactive Online Application Card */}
                    <div className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-md space-y-4">
                      
                      <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-2">
                        <div>
                          <h3 className="font-serif font-bold text-base text-brand-blue">
                            <EditableText path="scholarships.apply_title" />
                          </h3>
                          <p className="text-[10px] text-brand-coral font-bold mt-0.5 uppercase tracking-wider">
                            {lang === 'en' ? 'Submit Securely via Google Forms' : 'Soumettre via Google Forms'}
                          </p>
                        </div>
                        <GraduationCap className="w-6 h-6 text-brand-blue shrink-0" />
                      </div>

                      <div className="space-y-4">
                        <p className="text-xs text-gray-700 leading-relaxed">
                          {lang === 'en' 
                            ? 'The official SJBEF scholarship application can also be completed online via Google Forms. You can complete your application directly below, or launch the form in a new tab.' 
                            : 'La demande officielle de bourse de la SJBEF peut également être remplie en ligne via Google Forms. Remplissez le formulaire ci-dessous ou ouvrez-le dans un nouvel onglet.'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2 pt-1">
                          <a 
                            href="https://docs.google.com/forms/d/e/1FAIpQLScxY_QLvsYIrxndxMYUwIqR_pLE237PzBW7BW7HCPlAFv8DWQ/viewform" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-1 py-2.5 px-4 bg-brand-coral hover:bg-brand-coral/95 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>{lang === 'en' ? 'Open Form in New Tab' : 'Ouvrir dans un Nouvel Onglet'}</span>
                          </a>
                        </div>
                      </div>

                      {/* Embed Google Form Iframe */}
                      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white h-[350px] relative shadow-inner mt-4">
                        <iframe 
                          src="https://docs.google.com/forms/d/e/1FAIpQLScxY_QLvsYIrxndxMYUwIqR_pLE237PzBW7BW7HCPlAFv8DWQ/viewform?embedded=true" 
                          className="absolute inset-0 w-full h-full border-0"
                          title="SJBEF Scholarship Google Form"
                        >
                          Loading…
                        </iframe>
                      </div>

                    </div>

                    {/* Seminarian Application Online Card */}
                    <div className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-md space-y-4">
                      
                      <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-2">
                        <div>
                          <h3 className="font-serif font-bold text-base text-brand-blue">
                            {lang === 'en' ? 'Apply for the Seminarian Scholarship' : 'Postuler pour la Bourse de Séminaire'}
                          </h3>
                          <p className="text-[10px] text-brand-coral font-bold mt-0.5 uppercase tracking-wider">
                            {lang === 'en' ? 'Submit Securely via Google Forms' : 'Soumettre via Google Forms'}
                          </p>
                        </div>
                        <GraduationCap className="w-6 h-6 text-brand-blue shrink-0" />
                      </div>

                      <div className="space-y-4">
                        <p className="text-xs text-gray-700 leading-relaxed">
                          {lang === 'en' 
                            ? 'The Seminarian scholarship application is available online via Google Forms. Open the form in a new tab.' 
                            : 'La demande de bourse pour séminaristes est disponible en ligne via Google Forms. Ouvrez le formulaire dans un nouvel onglet.' }
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2 pt-1">
                          <a 
                            href="https://docs.google.com/forms/d/e/1FAIpQLSdilHjT_j9YAYyqT5--zYXI0_BeUDUjjhsbGBWUY9ZjfYHkhA/viewform" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-1 py-2.5 px-4 bg-brand-coral hover:bg-brand-coral/95 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>{lang === 'en' ? 'Open Seminarian Form' : 'Ouvrir le Formulaire de Séminaire'}</span>
                          </a>
                        </div>
                      </div>

                      {/* Embed Seminarian Google Form Iframe */}
                      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white h-[350px] relative shadow-inner mt-4">
                        <iframe 
                          src="https://docs.google.com/forms/d/e/1FAIpQLSdilHjT_j9YAYyqT5--zYXI0_BeUDUjjhsbGBWUY9ZjfYHkhA/viewform?embedded=true" 
                          className="absolute inset-0 w-full h-full border-0"
                          title="SJBEF Seminarian Google Form"
                        >
                          Loading…
                        </iframe>
                      </div>

                    </div>

                    {/* Volunteer Service Form Card */}
                    <div className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-md space-y-4">
                      
                      <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-2">
                        <div>
                          <h3 className="font-serif font-bold text-base text-brand-blue">
                            {lang === 'en' ? 'Scholarship Program – Summary of Volunteer Service' : 'Programme de Bourses – Résumé du Service Bénévole'}
                          </h3>
                          <p className="text-[10px] text-brand-coral font-bold mt-0.5 uppercase tracking-wider">
                            {lang === 'en' ? 'Return with Scholarship Application' : 'À Retourner avec la Demande de Bourse'}
                          </p>
                        </div>
                        <GraduationCap className="w-6 h-6 text-brand-blue shrink-0" />
                      </div>

                      <div className="space-y-4">
                        <p className="text-xs text-gray-700 leading-relaxed">
                          {lang === 'en' 
                            ? 'Document your leadership positions and volunteer service. This form should be returned with your scholarship application. Open the form in a new tab.' 
                            : 'Documentez vos postes de leadership et votre service bénévole. Ce formulaire doit être retourné avec votre demande de bourse. Ouvrez le formulaire dans un nouvel onglet.' }
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2 pt-1">
                          <a 
                            href="https://docs.google.com/forms/d/e/1FAIpQLSfEoSv0-V2J6aPn1hOLMP19jJ7PLHFjsAQW-VsQ7rb0XsuOdA/viewform" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-1 py-2.5 px-4 bg-brand-coral hover:bg-brand-coral/95 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>{lang === 'en' ? 'Open Volunteer Form' : 'Ouvrir le Formulaire Bénévole'}</span>
                          </a>
                        </div>
                      </div>

                      {/* Embed Volunteer Service Google Form Iframe */}
                      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white h-[350px] relative shadow-inner mt-4">
                        <iframe 
                          src="https://docs.google.com/forms/d/e/1FAIpQLSfEoSv0-V2J6aPn1hOLMP19jJ7PLHFjsAQW-VsQ7rb0XsuOdA/viewform?embedded=true" 
                          className="absolute inset-0 w-full h-full border-0"
                          title="SJBEF Volunteer Service Google Form"
                        >
                          Loading…
                        </iframe>
                      </div>

                    </div>

                  </div>

                </div>

                {/* Additional Scholarship Details Section (Member, Seminarian, Special Awards & Image5) */}
                <div className="mt-16 pt-16 border-t border-gray-150/60 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  
                  {/* Left block: Member & Seminarian Scholarships */}
                  <div className="lg:col-span-7 space-y-8">
                    <div className="content-card">
                      <div className="flex items-center gap-2.5 text-brand-blue font-serif font-bold text-xl border-b border-gray-100 pb-3">
                        <Award className="w-5 h-5 text-brand-teal" />
                        <EditableText path="scholarships.member_title" />
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        <EditableText path="scholarships.member_desc" />
                      </p>
                    </div>

                    <div className="content-card">
                      <div className="flex items-center gap-2.5 text-brand-blue font-serif font-bold text-xl border-b border-gray-100 pb-3">
                        <Award className="w-5 h-5 text-brand-teal" />
                        <EditableText path="scholarships.seminarian_title" />
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        <EditableText path="scholarships.seminarian_desc" />
                      </p>
                    </div>
                  </div>

                  {/* Right block: Special Awards, Trust details, and the newly generated Crest Image (Image5) */}
                  <div className="lg:col-span-5 space-y-8">
                    {/* Image5 (The newly generated Crest Image) */}
                    <div className="relative group overflow-hidden rounded-2xl border border-gray-200 shadow-md">
                      <img 
                        src={heritageImage} 
                        alt="SJBEF Scholarship Heritage Crest" 
                        referrerPolicy="no-referrer"
                        className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4">
                        <span className="text-xs font-bold text-white/95 uppercase tracking-wider font-mono">
                          Saint-Jean-Baptiste Educational Trust Fund
                        </span>
                      </div>
                    </div>

                    {/* Special Undergraduate Awards card */}
                    <div className="content-card">
                      <div className="flex items-center gap-2.5 text-brand-blue font-serif font-bold text-lg border-b border-gray-100 pb-2">
                        <Sparkles className="w-4 h-4 text-brand-coral" />
                        <EditableText path="scholarships.special_title" />
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        <EditableText path="scholarships.special_desc" />
                      </p>
                      
                      <ul className="grid grid-cols-1 gap-2.5 pt-2">
                        <li className="flex items-center gap-2.5 text-xs text-brand-blue font-semibold bg-brand-blue/5 border border-brand-blue/10 rounded-xl px-3 py-2">
                          <CheckCircle className="w-4 h-4 text-brand-teal shrink-0" />
                          <EditableText path="scholarships.award1" />
                        </li>
                        <li className="flex items-center gap-2.5 text-xs text-brand-blue font-semibold bg-brand-blue/5 border border-brand-blue/10 rounded-xl px-3 py-2">
                          <CheckCircle className="w-4 h-4 text-brand-teal shrink-0" />
                          <EditableText path="scholarships.award2" />
                        </li>
                        <li className="flex items-center gap-2.5 text-xs text-brand-blue font-semibold bg-brand-blue/5 border border-brand-blue/10 rounded-xl px-3 py-2">
                          <CheckCircle className="w-4 h-4 text-brand-teal shrink-0" />
                          <EditableText path="scholarships.award3" />
                        </li>
                        <li className="flex items-center gap-2.5 text-xs text-brand-blue font-semibold bg-brand-blue/5 border border-brand-blue/10 rounded-xl px-3 py-2">
                          <CheckCircle className="w-4 h-4 text-brand-teal shrink-0" />
                          <EditableText path="scholarships.award4" />
                        </li>
                      </ul>

                      <div className="bg-amber-50/70 border border-amber-150 rounded-xl p-3 text-[11px] text-amber-800 leading-relaxed">
                        <strong>Trust Fund Notice:</strong> <EditableText path="scholarships.trust_desc" />
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </section>
  );
}
