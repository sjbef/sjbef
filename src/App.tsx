import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Award, 
  Heart, 
  Mail, 
  CheckCircle, 
  Image,
  Search,
  Filter, 
  School,
  ExternalLink, 
  Download, 
  RefreshCw, 
  ArrowRight, 
  ArrowLeft,
  FileText, 
  ChevronRight, 
  Menu, 
  X, 
  Check, 
  MapPin, 
  Building, 
  Shield, 
  Sparkles, 
  Info,
  Calendar,
  Send,
  HelpCircle,
  DollarSign,
  Phone
} from 'lucide-react';
import initialContent from './content.json';
import LegacyPage from './pages/LegacyPage';
import GalleryPage from './pages/GalleryPage';
import AboutPage from './pages/AboutPage';
import ScholarshipsPage from './pages/ScholarshipsPage';
import NewslettersPage from './pages/NewslettersPage';
import DonatePage from './pages/DonatePage';
import ContactPage from './pages/ContactPage';
const scholarshipHeritageImg = "/src/assets/images/scholarship_heritage_1784081435433.jpg";

// Define the interface for the bilingual content
interface TranslationSet {
  nav: {
    home: string;
    about: string;
    legacy: string;
    scholarships: string;
    gallery: string;
    donate: string;
    contact: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  stats: {
    years: { num: string; label: string };
    schools: { num: string; label: string };
    scholarships: { num: string; label: string };
    students: { num: string; label: string };
  };
  about: {
    section_title: string;
    title: string;
    p1: string;
    p2: string;
    history_title: string;
    history_p1: string;
    history_p2: string;
    history_p3: string;
    history_p4: string;
    history_p5: string;
    mission_title: string;
    mission_text: string;
    vision_title: string;
    vision_text: string;
    board_title: string;
    board_chair: string;
    board_vice: string;
    board_treasurer: string;
    board_secretary: string;
    board_member1: string;
    board_member2: string;
    board_member3: string;
  };
  legacy: {
    section_title: string;
    title: string;
    description: string;
    milestones: { title: string; description: string }[];
    work_title: string;
    scholarships_title: string;
    scholarships_description: string;
    grants_title: string;
    grants_description: string;
  };
  scholarships: {
    section_title: string;
    title: string;
    description: string;
    apply_title: string;
    deadline: string;
    requirements_title: string;
    req1: string;
    req2: string;
    req3: string;
    req4: string;
    button: string;
    member_title: string;
    member_desc: string;
    seminarian_title: string;
    seminarian_desc: string;
    special_title: string;
    special_desc: string;
    award1: string;
    award2: string;
    award3: string;
    award4: string;
    trust_desc: string;
    apply_period_title: string;
    apply_period_desc: string;
    eligibility_title: string;
    eligibility_desc: string;
    eligibility_item1: string;
    eligibility_item2: string;
    eligibility_item3: string;
    eligibility_item4: string;
    documents_title: string;
    documents_desc: string;
    documents_item1: string;
    documents_item2: string;
    documents_item3: string;
    submission_title: string;
    submission_desc: string;
    submission_mail_address: string;
    submission_online_desc: string;
    downloads_title: string;
    download_app_btn: string;
    download_volunteer_btn: string;
    download_seminarian_btn: string;
    help_title: string;
    help_desc: string;
  };
  donate: {
    section_title: string;
    title: string;
    description: string;
    tier_title: string;
    tiers: {
      t1_title: string;
      t1_desc: string;
      t2_title: string;
      t2_desc: string;
      t3_title: string;
      t3_desc: string;
      t4_title: string;
      t4_desc: string;
    };
    donate_btn: string;
    tax_deductible: string;
    mail_check: string;
  };
  contact: {
    section_title: string;
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      subject: string;
      message: string;
      submit: string;
      success: string;
    };
    info: {
      title: string;
      email_label: string;
      email_val: string;
      phone_label: string;
      phone_val: string;
      address_label: string;
      address_val: string;
      status_label: string;
      status_val: string;
    };
  };
}

interface ContentConfig {
  en: TranslationSet;
  es: TranslationSet;
}

export default function App() {
  const content = initialContent as ContentConfig;
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<'home' | 'about' | 'legacy' | 'scholarships' | 'gallery' | 'newsletters' | 'donate' | 'contact'>('home');



  // Scholarship Application Form States (unused now that we use official Google Form directly)



  // Retrieve text from content configuration by path
  const getText = (path: string, targetLang: 'en' | 'es'): string => {
    const keys = path.split('.');
    let current: any = content[targetLang];
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        return '';
      }
    }
    return typeof current === 'string' ? current : '';
  };







  // Scroll helper mapped to section switching
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    
    // Map id string to valid section state
    const sectionMap: Record<string, 'home' | 'about' | 'legacy' | 'scholarships' | 'gallery' | 'newsletters' | 'donate' | 'contact'> = {
      home: 'home',
      about: 'about',
      legacy: 'legacy',
      scholarships: 'scholarships',
      gallery: 'gallery',
      newsletters: 'newsletters',
      donate: 'donate',
      contact: 'contact'
    };
    
    const targetSection = sectionMap[id] || 'home';
    setCurrentSection(targetSection);
    
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };

  // Renders a text entry from content.json in the current language
  const EditableText: React.FC<{
    path: string;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  }> = ({ path, className = '', as = 'span' }) => {
    const Component = as;
    return <Component className={className}>{getText(path, lang)}</Component>;
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-teal/20 selection:text-brand-blue">
      
      {/* 2. MAIN HEADER */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          {/* Logo Brand Group */}
          <div 
            onClick={() => scrollToSection('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="h-11 px-2.5 rounded-xl bg-white flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm group-hover:scale-105 transition-transform duration-300">
              <img 
                src="/images/logo/logo-e1603238453234.png" 
                alt="SJBEF Logo" 
                className="h-9 w-auto object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-extrabold text-xl tracking-tight text-brand-blue leading-none">SJBEF</span>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 rounded-full font-semibold">501(c)(3)</span>
              </div>
              <p className="text-[10.5px] text-gray-500 font-medium tracking-wide">Saint-Jean-Baptiste Educational Foundation</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <button 
              onClick={() => scrollToSection('home')} 
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-150 ${
                currentSection === 'home'
                  ? 'bg-brand-blue/10 text-brand-blue font-bold'
                  : 'hover:bg-gray-50 text-gray-600'
              }`}
            >
              {getText('nav.home', lang)}
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-150 ${
                currentSection === 'about'
                  ? 'bg-brand-blue/10 text-brand-blue font-bold'
                  : 'hover:bg-gray-50 text-gray-600'
              }`}
            >
              {getText('nav.about', lang)}
            </button>
            <button
              onClick={() => scrollToSection('legacy')}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-150 ${
                currentSection === 'legacy'
                  ? 'bg-brand-blue/10 text-brand-blue font-bold'
                  : 'hover:bg-gray-50 text-gray-600'
              }`}
            >
              {getText('nav.legacy', lang)}
            </button>
            <button 
              onClick={() => scrollToSection('scholarships')} 
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-150 ${
                currentSection === 'scholarships'
                  ? 'bg-brand-blue/10 text-brand-blue font-bold'
                  : 'hover:bg-gray-50 text-gray-600'
              }`}
            >
              {getText('nav.scholarships', lang)}
            </button>
            <button 
              onClick={() => scrollToSection('gallery')} 
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-150 ${
                currentSection === 'gallery'
                  ? 'bg-brand-blue/10 text-brand-blue font-bold'
                  : 'hover:bg-gray-50 text-gray-600'
              }`}
            >
              {getText('nav.gallery', lang)}
            </button>
            <button 
              onClick={() => scrollToSection('newsletters')} 
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-150 ${
                currentSection === 'newsletters'
                  ? 'bg-brand-blue/10 text-brand-blue font-bold'
                  : 'hover:bg-gray-50 text-gray-600'
              }`}
            >
              {getText('nav.newsletters', lang)}
            </button>
            <button 
              onClick={() => scrollToSection('donate')} 
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-150 ${
                currentSection === 'donate'
                  ? 'bg-rose-50 text-rose-600 font-bold'
                  : 'hover:bg-gray-50 text-gray-600'
              }`}
            >
              {getText('nav.donate', lang)}
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-150 ${
                currentSection === 'contact'
                  ? 'bg-brand-blue/10 text-brand-blue font-bold'
                  : 'hover:bg-gray-50 text-gray-600'
              }`}
            >
              {getText('nav.contact', lang)}
            </button>
            
            <div className="h-4 w-px bg-gray-200 mx-2"></div>

            {/* Language Switcher */}
            <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200 mr-2">
              <button 
                onClick={() => setLang('en')} 
                className={`px-2.5 py-1 text-xs font-bold rounded-md flex items-center gap-1 transition ${
                  lang === 'en' ? 'bg-white text-brand-blue shadow-xs' : 'text-gray-500 hover:text-gray-800'
                }`}
                title="Switch to English"
              >
                🇺🇸 EN
              </button>
              <button 
                onClick={() => setLang('es')} 
                className={`px-2.5 py-1 text-xs font-bold rounded-md flex items-center gap-1 transition ${
                  lang === 'es' ? 'bg-white text-brand-blue shadow-xs' : 'text-gray-500 hover:text-gray-800'
                }`}
                title="Changer en Français"
              >
                🇫🇷 FR
              </button>
            </div>

          </nav>

          {/* Mobile Buttons */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Language switch on mobile header */}
            <button 
              onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
              className="p-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-200 font-bold text-gray-700 flex items-center gap-1"
            >
              {lang === 'en' ? '🇫🇷 FR' : '🇺🇸 EN'}
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="p-1.5 hover:bg-gray-50 text-gray-700 rounded-lg transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-3 px-4 flex flex-col gap-2 shadow-inner">
            <button 
              onClick={() => scrollToSection('home')} 
              className={`w-full text-left py-2 px-3 text-sm font-semibold rounded-md transition ${
                currentSection === 'home'
                  ? 'bg-brand-blue/10 text-brand-blue font-bold'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              {getText('nav.home', lang)}
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className={`w-full text-left py-2 px-3 text-sm font-semibold rounded-md transition ${
                currentSection === 'about'
                  ? 'bg-brand-blue/10 text-brand-blue font-bold'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              {getText('nav.about', lang)}
            </button>
            <button
              onClick={() => scrollToSection('legacy')}
              className={`w-full text-left py-2 px-3 text-sm font-semibold rounded-md transition ${
                currentSection === 'legacy'
                  ? 'bg-brand-blue/10 text-brand-blue font-bold'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              {getText('nav.legacy', lang)}
            </button>
            <button 
              onClick={() => scrollToSection('scholarships')} 
              className={`w-full text-left py-2 px-3 text-sm font-semibold rounded-md transition ${
                currentSection === 'scholarships'
                  ? 'bg-brand-blue/10 text-brand-blue font-bold'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              {getText('nav.scholarships', lang)}
            </button>
            <button 
              onClick={() => scrollToSection('gallery')} 
              className={`w-full text-left py-2 px-3 text-sm font-semibold rounded-md transition ${
                currentSection === 'gallery'
                  ? 'bg-brand-blue/10 text-brand-blue font-bold'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              {getText('nav.gallery', lang)}
            </button>
            <button 
              onClick={() => scrollToSection('newsletters')} 
              className={`w-full text-left py-2 px-3 text-sm font-semibold rounded-md transition ${
                currentSection === 'newsletters'
                  ? 'bg-brand-blue/10 text-brand-blue font-bold'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              {getText('nav.newsletters', lang)}
            </button>
            <button 
              onClick={() => scrollToSection('donate')} 
              className={`w-full text-left py-2 px-3 text-sm font-semibold rounded-md transition ${
                currentSection === 'donate'
                  ? 'bg-rose-50 text-rose-600 font-bold'
                  : 'hover:bg-gray-50 text-brand-blue font-bold'
              }`}
            >
              {getText('nav.donate', lang)}
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className={`w-full text-left py-2 px-3 text-sm font-semibold rounded-md transition ${
                currentSection === 'contact'
                  ? 'bg-brand-blue/10 text-brand-blue font-bold'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              {getText('nav.contact', lang)}
            </button>
          </div>
        )}
      </header>

      {/* 3. MAIN WORKSPACE CONTENT */}
      <main className="flex-grow">
        
        {/* ========================================================= */}
        {/* PUBLIC WEBSITE */}
        {/* ========================================================= */}
          <div className="flex flex-col">
            
            {/* 1. HOME SCREEN / LANDING */}
            {currentSection === 'home' && (
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
                          onClick={() => scrollToSection('donate')}
                          className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blue/95 text-white font-bold text-sm tracking-wide shadow-lg shadow-brand-blue/15 hover:shadow-brand-blue/20 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Heart className="w-4 h-4 fill-white text-brand-coral" />
                          <span>{getText('hero.ctaPrimary', lang)}</span>
                        </button>
                        <button 
                          onClick={() => scrollToSection('legacy')}
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
                        onClick={() => scrollToSection('about')}
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
                        onClick={() => scrollToSection('legacy')}
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
                        onClick={() => scrollToSection('scholarships')}
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
                        onClick={() => scrollToSection('gallery')}
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
                        onClick={() => scrollToSection('newsletters')}
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
                        onClick={() => scrollToSection('donate')}
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
                      onClick={() => scrollToSection('contact')}
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
            )}

            {/* 2. BREADCRUMBS & BACK BUTTON FOR NON-HOME SECTIONS */}
            {currentSection !== 'home' && (
              <div className="bg-gray-50 border-b border-gray-150 py-4 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                    <button 
                      onClick={() => scrollToSection('home')}
                      className="hover:text-brand-blue transition flex items-center gap-1 font-bold text-gray-500 hover:underline"
                    >
                      <span>{lang === 'en' ? 'Home' : 'Inicio'}</span>
                    </button>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                    <span className="text-brand-blue font-extrabold">
                      {currentSection === 'about' && getText('nav.about', lang)}
                      {currentSection === 'legacy' && getText('nav.legacy', lang)}
                      {currentSection === 'scholarships' && getText('nav.scholarships', lang)}
                      {currentSection === 'gallery' && getText('nav.gallery', lang)}
                      {currentSection === 'newsletters' && getText('nav.newsletters', lang)}
                      {currentSection === 'donate' && getText('nav.donate', lang)}
                      {currentSection === 'contact' && getText('nav.contact', lang)}
                    </span>
                  </div>
                  <button 
                    onClick={() => scrollToSection('home')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:text-brand-blue hover:border-brand-blue/30 transition shadow-xs cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{lang === 'en' ? 'Back to Home' : 'Volver al Inicio'}</span>
                  </button>
                </div>
              </div>
            )}

            {currentSection === 'about' && <AboutPage EditableText={EditableText} />}
            {currentSection === 'legacy' && <LegacyPage EditableText={EditableText} />}

            {/* SCHOLARSHIPS & ACTIVE FORMS */}
            {currentSection === 'scholarships' && (
              <ScholarshipsPage lang={lang} EditableText={EditableText} heritageImage={scholarshipHeritageImg} />
            )}


            <GalleryPage lang={lang} isActive={currentSection === 'gallery'} />

            <NewslettersPage lang={lang} isActive={currentSection === 'newsletters'} />

            <DonatePage lang={lang} isActive={currentSection === 'donate'} EditableText={EditableText} getText={getText} />

            <ContactPage lang={lang} isActive={currentSection === 'contact'} EditableText={EditableText} getText={getText} />

          </div>

      </main>

      {/* 4. FOOTER */}
      <footer className="bg-brand-charcoal text-white pt-16 pb-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            
            {/* Branding Column */}
            <div className="md:col-span-5 space-y-4">
             <div className="flex items-center gap-3">
               <div className="h-10 px-2 rounded-lg bg-white flex items-center justify-center overflow-hidden">
                 <img 
                   src="/images/logo/logo-e1603238453234.png" 
                   alt="SJBEF Logo" 
                   className="h-8 w-auto object-contain"
                 />
                </div>
                <span className="font-serif font-extrabold text-xl tracking-tight text-white leading-none">SJBEF</span>
              </div>
              
              <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
                The Saint-Jean-Baptiste Educational Foundation (SJBEF) is a volunteer-led 501(c)(3) nonprofit that supports education through student scholarships and grants to Catholic schools in New England.
              </p>
            </div>

            {/* Program Quick Links */}
            <div className="md:col-span-3 space-y-3 text-sm">
              <h4 className="font-bold text-xs uppercase tracking-widest text-brand-teal">Programs</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition">Our History & Mission</button></li>
                <li><button onClick={() => scrollToSection('scholarships')} className="hover:text-white transition">High School Scholarships</button></li>
                <li><button onClick={() => scrollToSection('scholarships')} className="hover:text-white transition">Seminarian Scholarships</button></li>
                <li><button onClick={() => scrollToSection('donate')} className="hover:text-white transition">Educational Trust Fund</button></li>
              </ul>
            </div>

            {/* Contact Quick Links */}
            <div className="md:col-span-4 space-y-3 text-sm">
              <h4 className="font-bold text-xs uppercase tracking-widest text-brand-coral">Quick Contact</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <a href="mailto:info@sjbef.org" className="hover:text-white transition">info@sjbef.org</a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>P.O. Box 275, Woonsocket, RI 02895</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <a href="tel:508-699-2764" className="hover:text-white transition">508-699-2764</a>
                </li>
                <li className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-gray-500" />
                  <span>Catholic Financial Life Affiliate</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Tax Exemption disclaimer & copyright */}
          <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10.5px] text-gray-400">
            <p className="text-center sm:text-left leading-relaxed">
              &copy; {new Date().getFullYear()} Saint-Jean-Baptiste Educational Foundation (SJBEF). All rights reserved.<br />
              SJBEF is a registered 501(c)(3) tax-exempt nonprofit charitable organization. Contributions are tax-deductible to the full extent of the law.
            </p>
          </div>

        </div>
      </footer>

      {/* ========================================================= */}
      {/* 5. INTERACTIVE MODAL PANELS (SIMULATED PAYMENTS & GRANTS) */}
      {/* ========================================================= */}


    </div>
  );
}
