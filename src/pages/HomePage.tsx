import type { ComponentType } from 'react';
import { ArrowRight, BookOpen, Building, FileText, GraduationCap, Heart, Image, Mail, School, Sparkles } from 'lucide-react';

interface HomePageProps {
  lang: 'en' | 'es';
  EditableText: ComponentType<{ path: string }>;
  getText: (path: string, targetLang: 'en' | 'es') => string;
  navigateToSection: (id: string) => void;
}

export default function HomePage({ lang, EditableText, getText, navigateToSection }: HomePageProps) {
  return (
                  <div className="animate-fade-in flex flex-col">
                    {/* HERO SECTION */}
                    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-brand-warm to-brand-warm py-16 sm:py-24 border-b border-gray-100/50">
                      <div className="absolute inset-0 z-0 opacity-15">
                        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-blue filter blur-3xl"></div>
                        <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-brand-teal filter blur-3xl"></div>
                      </div>
    
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        
                        {/* Left: Headline & Actions */}
                        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                          <div className="inline-flex items-center gap-2 bg-brand-blue/5 border border-brand-blue/10 rounded-full px-3.5 py-1 text-xs font-bold text-brand-blue shadow-xs">
                            <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
                            <EditableText path="hero.badge" />
                          </div>
                          
                          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-brand-blue leading-tight tracking-tight">
                            <EditableText path="hero.title" />
                          </h1>
                          
                          <p className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                            <EditableText path="hero.subtitle" />
                          </p>
    
                          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                            <button 
                              onClick={() => navigateToSection('donate')}
                              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blue/95 text-white font-bold text-sm tracking-wide shadow-lg shadow-brand-blue/15 hover:shadow-brand-blue/20 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <Heart className="w-4 h-4 fill-white text-brand-coral" />
                              <span>{getText('hero.ctaPrimary', lang)}</span>
                            </button>
                            <button 
                              onClick={() => navigateToSection('legacy')}
                              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-gray-50 text-gray-700 font-bold text-sm tracking-wide border border-gray-200 shadow-xs hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <span>{getText('hero.ctaSecondary', lang)}</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
    
                        {/* Right: Immersive Bilingual Visual Card */}
                        <div className="lg:col-span-5 relative">
                          <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
                            {/* Shadow Backdrops */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue to-brand-teal rounded-2xl transform rotate-3 scale-[1.02] opacity-10 blur-xs"></div>
                            
                            {/* Interactive Frame */}
                            <div className="relative bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-xl">
                              
                              {/* Scholarship and school-grant support */}
                              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
                                <div className="flex items-center gap-2 text-xs font-bold text-brand-blue uppercase tracking-wider">
                                  <GraduationCap className="w-4 h-4 text-brand-teal" />
                                  <span>{lang === 'en' ? 'Financial Support for Education' : 'Soutien financier à l’éducation'}</span>
                                </div>
                                <span className="text-[10px] bg-brand-teal/10 text-brand-teal px-2 py-0.5 rounded-full font-bold">
                                  {lang === 'en' ? 'Scholarships & Grants' : 'Bourses et subventions'}
                                </span>
                              </div>
    
                              <div className="space-y-4">
                                <div className="bg-brand-blue/5 rounded-xl p-4 border border-brand-blue/10 hover:bg-brand-blue/10 transition duration-300 group">
                                  <p className="text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-1">
                                    {lang === 'en' ? 'Student Scholarships' : 'Bourses étudiantes'}
                                  </p>
                                  <p className="font-serif text-sm text-brand-blue leading-relaxed font-semibold">
                                    {lang === 'en' ? 'Financial assistance for eligible students pursuing higher education.' : 'Aide financière aux étudiants admissibles qui poursuivent des études supérieures.'}
                                  </p>
                                </div>
    
                                <div className="bg-brand-teal/5 rounded-xl p-4 border border-brand-teal/10 hover:bg-brand-teal/10 transition duration-300">
                                  <p className="text-[11px] font-bold text-brand-teal uppercase tracking-wider mb-1">
                                    {lang === 'en' ? 'Catholic School Grants' : 'Subventions aux écoles catholiques'}
                                  </p>
                                  <p className="font-serif text-sm text-brand-teal leading-relaxed font-semibold">
                                    {lang === 'en' ? 'Financial grants that support Catholic education.' : 'Des subventions financières qui soutiennent l’éducation catholique.'}
                                  </p>
                                </div>
                              </div>
    
                              {/* School Connection Badge */}
                              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                                <div className="flex items-center gap-1.5 font-medium">
                                  <Building className="w-4 h-4 text-brand-teal" />
                                  <span>{lang === 'en' ? 'Students & Catholic Schools' : 'Étudiants et écoles catholiques'}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                  <span className="font-bold">{lang === 'en' ? 'Active Support' : 'Soutien Actif'}</span>
                                </div>
                              </div>
    
                            </div>
                          </div>
                        </div>
    
                      </div>
                    </section>
    
                    {/* QUICK STATS BAND */}
                    <section className="bg-white border-y border-gray-150 py-10 shadow-xs relative z-10">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-150">
                          
                          {/* Stat 1 */}
                          <div className="text-center md:px-4 pt-4 md:pt-0">
                            <span className="block text-3xl sm:text-4xl font-serif font-black text-brand-blue">
                              <EditableText path="stats.years.num" />
                            </span>
                            <span className="text-xs sm:text-sm font-semibold text-gray-500 tracking-wide block mt-1">
                              <EditableText path="stats.years.label" />
                            </span>
                          </div>
    
                          {/* Stat 2 */}
                          <div className="text-center md:px-4 pt-4 md:pt-0">
                            <span className="block text-3xl sm:text-4xl font-serif font-black text-brand-teal">
                              <EditableText path="stats.schools.num" />
                            </span>
                            <span className="text-xs sm:text-sm font-semibold text-gray-500 tracking-wide block mt-1">
                              <EditableText path="stats.schools.label" />
                            </span>
                          </div>
    
                          {/* Stat 3 */}
                          <div className="text-center md:px-4 pt-4 md:pt-0">
                            <span className="block text-3xl sm:text-4xl font-serif font-black text-brand-coral">
                              <EditableText path="stats.scholarships.num" />
                            </span>
                            <span className="text-xs sm:text-sm font-semibold text-gray-500 tracking-wide block mt-1">
                              <EditableText path="stats.scholarships.label" />
                            </span>
                          </div>
    
                          {/* Stat 4 */}
                          <div className="text-center md:px-4 pt-4 md:pt-0">
                            <span className="block text-3xl sm:text-4xl font-serif font-black text-brand-blue">
                              <EditableText path="stats.students.num" />
                            </span>
                            <span className="text-xs sm:text-sm font-semibold text-gray-500 tracking-wide block mt-1">
                              <EditableText path="stats.students.label" />
                            </span>
                          </div>
    
                        </div>
                      </div>
                    </section>
    
                    {/* PORTAL NAVIGATION CARDS FOR MINIMAL HOME PAGE */}
                    <section className="py-16 bg-gradient-to-b from-white to-gray-50 border-b border-gray-150">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        
                        {/* Section Header */}
                        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                          <span className="text-[11px] bg-brand-blue/5 text-brand-blue border border-brand-blue/10 px-3 py-1 rounded-full font-bold uppercase tracking-widest">
                            {lang === 'en' ? 'Explore Our Foundation' : 'Découvrez notre fondation'}
                          </span>
                          <h2 className="section-title">
                            {lang === 'en' ? 'How would you like to support or learn today?' : 'Comment souhaitez-vous nous soutenir ou en apprendre davantage ?'}
                          </h2>
                          <p className="text-sm text-gray-500">
                            {lang === 'en' 
                              ? 'Select any of the sections below to access educational resources, historical archives, scholarships, or ways to get involved.' 
                              : 'Choisissez une section ci-dessous pour accéder aux ressources éducatives, aux archives historiques, aux bourses ou aux façons de vous impliquer.'}
                          </p>
                        </div>
    
                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          
                          {/* Card 1: About */}
                          <div 
                            onClick={() => navigateToSection('about')}
                            className="bg-white border border-gray-200 hover:border-brand-blue/40 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-300 group cursor-pointer transform hover:-translate-y-1"
                          >
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-12 h-12 rounded-xl bg-brand-blue/5 border border-brand-blue/10 text-brand-blue flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <BookOpen className="w-6 h-6 stroke-[2]" />
                              </div>
                              <div>
                                <span className="text-[10px] bg-brand-blue/5 text-brand-blue px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                  {lang === 'en' ? 'Our Legacy' : 'Notre Patrimoine'}
                                </span>
                                <h3 className="font-serif font-bold text-lg text-brand-blue mt-0.5">
                                  {getText('nav.about', lang)}
                                </h3>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed min-h-[50px]">
                              {lang === 'en'
                                ? 'Discover our rich history, deep-rooted French-Canadian heritage, and our dedicated mission to support local communities.'
                                : 'Découvrez notre riche histoire, notre patrimoine canado-français profondément enraciné et notre mission de soutien aux communautés locales.'}
                            </p>
                            <div className="mt-4 pt-3 border-t border-gray-50 flex items-center text-xs font-bold text-brand-blue group-hover:text-brand-blue/80">
                              <span>{lang === 'en' ? 'Learn More' : 'En savoir plus'}</span>
                              <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
    
                          {/* Card 2: Catholic school grants */}
                          <div 
                            onClick={() => navigateToSection('legacy')}
                            className="bg-white border border-gray-200 hover:border-emerald-500/40 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-300 group cursor-pointer transform hover:-translate-y-1"
                          >
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <School className="w-6 h-6 stroke-[2]" />
                              </div>
                              <div>
                                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                  {lang === 'en' ? 'Financial Support' : 'Soutien financier'}
                                </span>
                                <h3 className="font-serif font-bold text-lg text-brand-blue mt-0.5">
                                  {lang === 'en' ? 'Catholic School Grants' : 'Subventions aux écoles catholiques'}
                                </h3>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed min-h-[50px]">
                              {lang === 'en'
                                ? 'SJBEF supports Catholic education through grants to Catholic schools.'
                                : 'La SJBEF soutient l’éducation catholique par des subventions aux écoles catholiques.'}
                            </p>
                            <div className="mt-4 pt-3 border-t border-gray-50 flex items-center text-xs font-bold text-emerald-600 group-hover:text-emerald-700">
                              <span>{lang === 'en' ? 'Learn about our grants' : 'En savoir plus sur nos subventions'}</span>
                              <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
    
                          {/* Card 3: Scholarships */}
                          <div 
                            onClick={() => navigateToSection('scholarships')}
                            className="bg-white border border-gray-200 hover:border-brand-coral/40 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-300 group cursor-pointer transform hover:-translate-y-1"
                          >
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-12 h-12 rounded-xl bg-brand-coral/5 border border-brand-coral/10 text-brand-coral flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <GraduationCap className="w-6 h-6 stroke-[2]" />
                              </div>
                              <div>
                                <span className="text-[10px] bg-brand-coral/5 text-brand-coral px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                  {lang === 'en' ? 'Higher Education' : 'Enseignement Supérieur'}
                                </span>
                                <h3 className="font-serif font-bold text-lg text-brand-blue mt-0.5">
                                  {getText('nav.scholarships', lang)}
                                </h3>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed min-h-[50px]">
                              {lang === 'en'
                                ? 'Empowering graduating seniors and seminarians through dedicated higher education scholarships and financial assistance.'
                                : 'Soutenir les diplômés du secondaire et les séminaristes par des bourses d\'études supérieures dédiées.'}
                            </p>
                            <div className="mt-4 pt-3 border-t border-gray-50 flex items-center text-xs font-bold text-brand-coral group-hover:text-brand-coral/80">
                              <span>{lang === 'en' ? 'Apply / View Recipients' : 'Postuler / Voir les Lauréats'}</span>
                              <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
    
                          {/* Card 4: Photo Gallery */}
                          <div 
                            onClick={() => navigateToSection('gallery')}
                            className="bg-white border border-gray-200 hover:border-indigo-500/40 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-300 group cursor-pointer transform hover:-translate-y-1"
                          >
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Image className="w-6 h-6 stroke-[2]" />
                              </div>
                              <div>
                                <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                  {lang === 'en' ? 'Media & Events' : 'Médias & Événements'}
                                </span>
                                <h3 className="font-serif font-bold text-lg text-brand-blue mt-0.5">
                                  {getText('nav.gallery', lang)}
                                </h3>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed min-h-[50px]">
                              {lang === 'en'
                                ? 'See our impact in action through photos of book distribution ceremonies, student grants, and community events.'
                                : 'Découvrez notre impact en images : remises de bourses, subventions scolaires et événements de notre communauté.'}
                            </p>
                            <div className="mt-4 pt-3 border-t border-gray-50 flex items-center text-xs font-bold text-indigo-600 group-hover:text-indigo-700">
                              <span>{lang === 'en' ? 'Open Gallery' : 'Ouvrir la Galerie'}</span>
                              <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
    
                          {/* Card 5: Newsletters */}
                          <div 
                            onClick={() => navigateToSection('newsletters')}
                            className="bg-white border border-gray-200 hover:border-cyan-500/40 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-300 group cursor-pointer transform hover:-translate-y-1"
                          >
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <FileText className="w-6 h-6 stroke-[2]" />
                              </div>
                              <div>
                                <span className="text-[10px] bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                  {lang === 'en' ? 'Seasonal News' : 'Actualités Saisonnières'}
                                </span>
                                <h3 className="font-serif font-bold text-lg text-brand-blue mt-0.5">
                                  {getText('nav.newsletters', lang)}
                                </h3>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed min-h-[50px]">
                              {lang === 'en'
                                ? 'Stay up-to-date with our bulletins, archived bilingual newsletters, and featured historical articles.'
                                : 'Restez informé grâce à nos bulletins annuels, nos archives d\'actualités bilingues et nos articles historiques.'}
                            </p>
                            <div className="mt-4 pt-3 border-t border-gray-50 flex items-center text-xs font-bold text-cyan-600 group-hover:text-cyan-700">
                              <span>{lang === 'en' ? 'Read Bulletins' : 'Lire les Bulletins'}</span>
                              <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
    
                          {/* Card 6: Donate */}
                          <div 
                            onClick={() => navigateToSection('donate')}
                            className="bg-white border border-gray-200 hover:border-rose-500/40 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-300 group cursor-pointer transform hover:-translate-y-1"
                          >
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Heart className="w-6 h-6 stroke-[2]" />
                              </div>
                              <div>
                                <span className="text-[10px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                  {lang === 'en' ? 'Support Us' : 'Soutenez-nous'}
                                </span>
                                <h3 className="font-serif font-bold text-lg text-brand-blue mt-0.5">
                                  {getText('nav.donate', lang)}
                                </h3>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed min-h-[50px]">
                              {lang === 'en'
                                ? 'Make a secure, tax-deductible contribution to our general fund or specify a custom scholarship endowment.'
                                : 'Faites un don sécurisé et déductible d\'impôt pour notre fonds général ou financez une dotation personnalisée.'}
                            </p>
                            <div className="mt-4 pt-3 border-t border-gray-50 flex items-center text-xs font-bold text-rose-600 group-hover:text-rose-700">
                              <span>{lang === 'en' ? 'Donate Today' : 'Faire un Don'}</span>
                              <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
    
                        </div>
    
                        {/* Optional Contact Callout card at the bottom of portals */}
                        <div 
                          onClick={() => navigateToSection('contact')}
                          className="mt-8 bg-gradient-to-r from-brand-blue to-blue-900 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                        >
                          <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
                              <Mail className="w-6 h-6" />
                            </div>
                            <div>
                              <h4 className="font-serif font-bold text-lg">{lang === 'en' ? 'Have Questions or Want to Volunteer?' : 'Des questions ou envie de faire du bénévolat ?'}</h4>
                              <p className="text-xs text-blue-100 mt-1">{lang === 'en' ? 'Send a message to our Board of Trustees. We would love to hear from you!' : "Envoyez un message à notre conseil d'administration. Nous serons ravis de vous lire !"}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 bg-brand-coral hover:bg-brand-coral/90 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-sm tracking-wide transition shrink-0">
                            <span>{getText('nav.contact', lang)}</span>
                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
    
                      </div>
                    </section>
                  </div>
  );
}
