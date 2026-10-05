import type { ComponentType } from 'react';
import { ArrowRight, HeartHandshake, Shield, Sparkles, User, Users } from 'lucide-react';

interface AboutPageProps {
  EditableText: ComponentType<{ path: string }>;
}

export default function AboutPage({ EditableText }: AboutPageProps) {
  return (
              <section id="about" className="py-20 bg-brand-warm border-b border-gray-150/50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* About Banner Image */}
                <div className="mb-12 overflow-hidden rounded-2xl border border-gray-150 bg-white p-2.5 shadow-sm max-w-4xl mx-auto">
                  <img 
                    src="/images/about/About2.png" 
                    alt="About Us - Saint-Jean-Baptiste Educational Foundation" 
                    className="w-full h-auto object-contain rounded-xl max-h-[300px] mx-auto"
                  />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  
                  {/* Left: Core Mission Narrative */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-2 text-brand-teal font-bold uppercase tracking-widest text-xs">
                      <span className="w-8 h-0.5 bg-brand-teal"></span>
                      <EditableText path="about.section_title" />
                    </div>
                    
                    <h2 className="section-title">
                      <EditableText path="about.history_title" />
                    </h2>

                    <div className="prose prose-gray leading-relaxed text-gray-600 space-y-5 text-sm sm:text-base">
                      <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:text-brand-blue first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                        <EditableText path="about.history_p1" />
                      </p>
                      <p>
                        <EditableText path="about.history_p2" />
                      </p>
                      <p>
                        <EditableText path="about.history_p3" />
                      </p>
                      <p>
                        <EditableText path="about.history_p4" />
                      </p>
                      <p className="pt-4 border-t border-gray-150 text-xs sm:text-sm font-medium text-brand-blue">
                        <span className="text-brand-teal font-bold mr-1">ℹ️</span>
                        <EditableText path="about.history_p5" />{' '}
                        <a 
                          href="https://www.catholicfinanciallife.org" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-brand-blue hover:text-brand-teal underline font-bold transition-colors inline-flex items-center gap-0.5"
                        >
                          catholicfinanciallife.org
                          <ArrowRight className="w-3.5 h-3.5 inline" />
                        </a>
                      </p>
                    </div>

                    {/* Community volunteer engagement call */}
                    <div className="bg-white rounded-xl p-5 border border-gray-150 flex items-start gap-4 shadow-xs">
                      <div className="p-2.5 rounded-lg bg-teal-50 text-brand-teal">
                        <HeartHandshake className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-brand-blue">We are 100% Volunteer Managed</h4>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                          SJBEF’s scholarship and Catholic school grant work is supported by volunteers and community donors.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Dynamic Mission/Vision Box */}
                  <div className="lg:col-span-5 space-y-6">
                    
                    {/* Mission Card */}
                    <div className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-sm">
                      <div className="flex items-center gap-3 text-brand-blue mb-4">
                        <div className="p-2 rounded-lg bg-brand-blue/5">
                          <Shield className="w-5 h-5 text-brand-blue stroke-[2.2]" />
                        </div>
                        <h3 className="font-serif font-bold text-xl">
                          <EditableText path="about.mission_title" />
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed font-medium">
                        <EditableText path="about.mission_text" />
                      </p>
                    </div>

                    {/* Vision Card */}
                    <div className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-sm">
                      <div className="flex items-center gap-3 text-brand-teal mb-4">
                        <div className="p-2 rounded-lg bg-brand-teal/5">
                          <Sparkles className="w-5 h-5 text-brand-teal stroke-[2.2]" />
                        </div>
                        <h3 className="font-serif font-bold text-xl">
                          <EditableText path="about.vision_title" />
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed font-medium">
                        <EditableText path="about.vision_text" />
                      </p>
                    </div>

                  </div>

                </div>

                {/* Board of Trustees Section */}
                <div className="mt-16 pt-16 border-t border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-brand-teal font-bold uppercase tracking-widest text-xs mb-2">
                        <span className="w-6 h-0.5 bg-brand-teal"></span>
                        Leadership
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-brand-blue">
                        <EditableText path="about.board_title" />
                      </h3>
                    </div>
                    <p className="text-xs text-gray-500 max-w-md leading-relaxed">
                      Our volunteer Board of Trustees is dedicated to stewarding the Foundation's trust, ensuring every donation directly funds student opportunities and New England's French heritage preservation.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Bruce Laverriere - Chairman */}
                    <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-brand-teal/30 transition-all">
                      <div className="space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-blue/5 flex items-center justify-center text-brand-blue">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-base text-brand-blue">
                            <EditableText path="about.board_chair" />
                          </h4>
                        </div>
                      </div>
                    </div>

                    {/* Paul R. Plante - Vice Chairman */}
                    <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-brand-teal/30 transition-all">
                      <div className="space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-blue/5 flex items-center justify-center text-brand-blue">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-base text-brand-blue">
                            <EditableText path="about.board_vice" />
                          </h4>
                        </div>
                      </div>
                    </div>

                    {/* Ken Boivin - Treasurer */}
                    <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-brand-teal/30 transition-all">
                      <div className="space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-blue/5 flex items-center justify-center text-brand-blue">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-base text-brand-blue">
                            <EditableText path="about.board_treasurer" />
                          </h4>
                        </div>
                      </div>
                    </div>

                    {/* Paul Pinsonnault - Secretary */}
                    <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-brand-teal/30 transition-all">
                      <div className="space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-blue/5 flex items-center justify-center text-brand-blue">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-base text-brand-blue">
                            <EditableText path="about.board_secretary" />
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trustees Grid */}
                  <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Celeste Feren */}
                    <div className="bg-white/60 border border-gray-150/80 rounded-xl px-5 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-brand-teal">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-brand-blue">
                          <EditableText path="about.board_member1" />
                        </h5>
                        <p className="text-[10px] text-gray-400 font-bold tracking-wider uppercase">Trustee</p>
                      </div>
                    </div>

                    {/* Susan Griffiths */}
                    <div className="bg-white/60 border border-gray-150/80 rounded-xl px-5 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-brand-teal">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-brand-blue">
                          <EditableText path="about.board_member2" />
                        </h5>
                        <p className="text-[10px] text-gray-400 font-bold tracking-wider uppercase">Trustee</p>
                      </div>
                    </div>

                    {/* Lynette Ouellette */}
                    <div className="bg-white/60 border border-gray-150/80 rounded-xl px-5 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-brand-teal">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-brand-blue">
                          <EditableText path="about.board_member3" />
                        </h5>
                        <p className="text-[10px] text-gray-400 font-bold tracking-wider uppercase">Trustee</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>
  );
}
