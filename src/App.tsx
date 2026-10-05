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
import HomePage from './pages/HomePage';
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
              <HomePage lang={lang} EditableText={EditableText} getText={getText} navigateToSection={scrollToSection} />
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
