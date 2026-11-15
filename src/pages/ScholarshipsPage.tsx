import type { ComponentType } from 'react';
import ScholarshipApplicationPacket from '../components/ScholarshipApplicationPacket';
import SeminarianApplicationForm from '../components/SeminarianApplicationForm';
import {
  Award,
  Calendar,
  CheckCircle,
  FileText,
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
                  <div className="lg:col-span-12 space-y-6">
                    
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

                </div>

                <div className="mt-12 space-y-6">
                  <details className="scholarship-form-accordion rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <summary className="cursor-pointer font-serif text-lg font-bold text-brand-blue">
                      {lang === 'en'
                        ? 'College Scholarship Application + Volunteer Service Summary'
                        : 'Solicitud de beca universitaria + resumen de servicio voluntario'}
                    </summary>
                    <p className="mt-2 mb-5 text-sm text-gray-600">
                      {lang === 'en'
                        ? 'Complete and submit both parts together. The volunteer summary prints as page 2.'
                        : 'Complete y envíe ambas partes juntas. El resumen de servicio voluntario se imprime en la página 2.'}
                    </p>
                    <ScholarshipApplicationPacket lang={lang} />
                  </details>
                  <details className="scholarship-form-accordion rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <summary className="cursor-pointer font-serif text-lg font-bold text-brand-blue">
                      {lang === 'en' ? 'Seminarian Scholarship Application' : 'Solicitud de beca para seminaristas'}
                    </summary>
                    <div className="mt-5">
                      <SeminarianApplicationForm lang={lang} />
                    </div>
                  </details>
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
