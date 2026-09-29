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
  ExternalLink, 
  Download, 
  RefreshCw, 
  Languages, 
  ArrowRight, 
  ArrowLeft,
  UserPlus, 
  User,
  Users,
  FileText, 
  ChevronRight, 
  Menu, 
  X, 
  Check, 
  MapPin, 
  Building, 
  Shield, 
  HeartHandshake, 
  Sparkles, 
  Info,
  Calendar,
  Send,
  HelpCircle,
  DollarSign,
  Phone
} from 'lucide-react';
import initialContent from './content.json';
const scholarshipHeritageImg = "/src/assets/images/scholarship_heritage_1784081435433.jpg";

// Define the interface for the bilingual content
interface TranslationSet {
  nav: {
    home: string;
    about: string;
    twbi: string;
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
  twbi: {
    section_title: string;
    title: string;
    description: string;
    benefits: {
      title: string;
      b1_title: string;
      b1_desc: string;
      b2_title: string;
      b2_desc: string;
      b3_title: string;
      b3_desc: string;
      b4_title: string;
      b4_desc: string;
    };
    sjusd_connection: string;
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

interface GalleryItem {
  id: string;
  category: 'scholarships' | 'grants';
  title: string;
  year: string;
  who: string;
  chapter: string;
  description: string;
  imageUrl: string;
  date?: string;
}

interface NewsletterArticle {
  title: string;
  author: string;
  content: string[];
}

interface NewsletterItem {
  id: string;
  title: string;
  season: 'Spring' | 'Summer' | 'Fall' | 'Winter' | 'Special';
  year: string;
  date: string;
  pdfUrl: string;
  description: string;
  articles: NewsletterArticle[];
}

export default function App() {
  const content = initialContent as ContentConfig;
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<'home' | 'about' | 'twbi' | 'scholarships' | 'gallery' | 'newsletters' | 'donate' | 'contact'>('home');

  // Photo Gallery States
  const [galleryCategory, setGalleryCategory] = useState<'scholarships' | 'grants'>('scholarships');
  const [galleryYear, setGalleryYear] = useState<string>('all');
  const [gallerySearch, setGallerySearch] = useState<string>('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Default gallery items
  const defaultGalleryItems: GalleryItem[] = [
    {
      id: "gal-1",
      category: "scholarships",
      title: "Sophia Puccini Scholarship Award",
      year: "2023",
      who: "Sophia Puccini",
      chapter: "Chapter N442, Somerset, MA",
      description: "Sophia Puccini receiving a $1,000.00 scholarship, presented by Paul Pinsonnault (Administrative Secretary SJBEF), Paul Plante (Chairman SJBEF), and Albert Dumoulin (President of Chapter N442).",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
      date: "2023-06-04"
    },
    {
      id: "gal-2",
      category: "scholarships",
      title: "Ella Gesner Scholarship Award",
      year: "2023",
      who: "Ella Gesner",
      chapter: "Chapter N442, Somerset, MA",
      description: "Ella Gesner receiving a $1,000.00 scholarship, presented by Paul Pinsonnault (Administrative Secretary SJBEF), Paul Plante (Chairman SJBEF), and Albert Dumoulin (President of Chapter N442).",
      imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop",
      date: "2023-06-04"
    },
    {
      id: "gal-3",
      category: "scholarships",
      title: "Caroline Puccini Scholarship Presentation",
      year: "2023",
      who: "Caroline Puccini",
      chapter: "Chapter N442, Somerset, MA",
      description: "Caroline Puccini receiving a scholarship, presented by Chapter N442's President Al Dumoulin.",
      imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop",
      date: "2023-06-04"
    },
    {
      id: "gal-4",
      category: "scholarships",
      title: "Jack Hebert Scholarship Presentation",
      year: "2023",
      who: "Jack Hebert",
      chapter: "Chapter N441, Westport, MA",
      description: "Recipient Jack Hebert from Chapter N441 receiving his scholarship with SJBEF leadership Paul Pinsonnault and Paul Plante.",
      imageUrl: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=800&auto=format&fit=crop",
      date: "2023-06-04"
    },
    {
      id: "gal-5",
      category: "scholarships",
      title: "Noelle Champigny Award Reception",
      year: "2023",
      who: "Noelle Champigny",
      chapter: "Chapter N042, North Attleboro, MA",
      description: "Noelle Champigny, Chapter N042, N. Attleboro, MA, receiving a scholarship from the Saint-Jean-Baptiste Educational Foundation.",
      imageUrl: "https://images.unsplash.com/photo-1491841573546-b432714003ac?q=80&w=800&auto=format&fit=crop",
      date: "2023-06-04"
    },
    {
      id: "gal-6",
      category: "scholarships",
      title: "Nicole Ledwidge Scholarship Presentation",
      year: "2023",
      who: "Nicole Ledwidge",
      chapter: "Chapter N442, Somerset, MA",
      description: "Nicole Ledwidge receiving scholarship from Chapter N442 Somerset, MA, presented by Chapter N442 President Al Dumoulin.",
      imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop",
      date: "2023-06-04"
    },
    {
      id: "gal-7",
      category: "scholarships",
      title: "Scholarship Night 2023 Group",
      year: "2023",
      who: "Chapters N441, N442, N042 Recipients",
      chapter: "Chapters N441, N442, N042",
      description: "Group photo showing SJBEF Chairman Paul Plante, Jack Hebert (N441), Sophia Puccini (N442), Caroline Puccini (N442), Ella Gesner (N442), Jonathan Cabral (N442), Alexander Cormier (N042), and Paul Pinsonnault (Admin Secretary). Hosted by Chapter N442, Somerset, MA.",
      imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop",
      date: "2023-06-04"
    },
    {
      id: "gal-8",
      category: "grants",
      title: "Holy Ghost Academy Grant Presentation",
      year: "2024",
      who: "Holy Ghost Bilingual French Class",
      chapter: "New England Regional",
      description: "Grant awarded to support French bilingual resources, books, and cultural learning aids for kindergarten students.",
      imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop",
      date: "2024-05-12"
    },
    {
      id: "gal-9",
      category: "grants",
      title: "Sacred Heart Academy French Literacies",
      year: "2024",
      who: "High School French Literature Program",
      chapter: "Catholic Schools, MA",
      description: "Funding secured for the acquisition of contemporary French language literature textbooks and reading programs.",
      imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop",
      date: "2024-04-18"
    },
    {
      id: "gal-10",
      category: "grants",
      title: "St. Joseph School Franco-American History Materials",
      year: "2023",
      who: "St. Joseph Social Studies Division",
      chapter: "Woonsocket, RI",
      description: "Catholic School Grant for cultural school supplies and historical booklets detailing Franco-American history in New England.",
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
      date: "2023-11-05"
    }
  ];

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(defaultGalleryItems);

  // Attempt to load locally scraped page assets manifest at runtime
  useEffect(() => {
    async function loadLocalManifest() {
      try {
        const response = await fetch('/page-assets/page_assets_manifest.json');
        if (!response.ok) return;
        const manifestData = await response.json();
        
        if (Array.isArray(manifestData) && manifestData.length > 0) {
          const cleanNameFromFilename = (filename: string): string => {
            let name = filename.replace(/^page-\d+-\d+-/, ''); // remove prefix
            name = name.replace(/-\d+x\d+.*$/, ''); // remove size suffix e.g. -150x150
            name = name.replace(/\.[a-zA-Z0-9]+$/, ''); // remove extension
            name = name.replace(/[-_]+/g, ' '); // replace dashes/underscores with space
            return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
          };

          const extractYear = (filename: string, caption?: string): string => {
            const yearRegex = /\b(20\d{2})\b/;
            let match = yearRegex.exec(caption || '');
            if (match) return match[1];
            match = yearRegex.exec(filename);
            if (match) return match[1];
            return '2023'; // Default fallback year
          };

          const extractChapter = (caption?: string, filename?: string): string => {
            const chapterRegex = /\b(chapter\s+[n-]?\d+)\b/i;
            let match = chapterRegex.exec(caption || '');
            if (match) return match[1].toUpperCase();
            match = chapterRegex.exec(filename || '');
            if (match) return match[1].replace(/-/g, ' ').toUpperCase();
            return 'New England Regional';
          };

          const importedItems: GalleryItem[] = manifestData.map((item: any, index: number) => {
            const displayName = cleanNameFromFilename(item.filename);
            const isGrant = item.pageId === '966';
            
            return {
              id: `manifest-${item.pageId}-${index}`,
              category: isGrant ? 'grants' : 'scholarships',
              title: item.caption || item.altText || `${displayName} ${isGrant ? 'Grant' : 'Scholarship'}`,
              year: item.year || extractYear(item.filename, item.caption),
              who: item.altText || displayName,
              chapter: extractChapter(item.caption, item.filename),
              description: item.caption || item.altText || `${displayName} was awarded support from the foundation.`,
              imageUrl: item.localUrl,
              date: item.uploadDate ? item.uploadDate.split('T')[0] : undefined
            };
          });

          setGalleryItems(importedItems);
        }
      } catch (err) {
        console.log('Local page_assets_manifest.json not found. Using defaults.');
      }
    }
    loadLocalManifest();
  }, []);

  // Derived filtered gallery items
  const filteredGalleryItems = galleryItems.filter(item => {
    if (item.category !== galleryCategory) return false;
    if (galleryYear !== 'all' && item.year !== galleryYear) return false;
    if (gallerySearch) {
      const q = gallerySearch.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.who.toLowerCase().includes(q) ||
        item.chapter.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.year.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // =========================================================
  // NEWSLETTER STATES & DEFAULTS
  // =========================================================
  const defaultNewsletters: NewsletterItem[] = [
    {
      id: 'news-1',
      title: 'SJBEF Annual Bulletin - 2025',
      season: 'Winter',
      year: '2025',
      date: '2025-12-15',
      pdfUrl: '/newsletters/2025 SJBEF Newsletter.pdf',
      description: 'Highlighting our 2025 scholarship recipients, donor appreciation logs, regional chapter achievements, and plans for the upcoming year.',
      articles: [
        {
          title: 'SJBEF Awards Over $35,000 in Scholarships to New England Youth',
          author: 'Paul Plante, Chairman of SJBEF',
          content: [
            'We are extremely pleased to announce that in the fiscal year of 2025, the Saint-Jean-Baptiste Educational Foundation has distributed over $35,000 in higher education scholarships and bilingual school grants. This has been made possible by the persistent support of our community members, chapter organizers, and generous trusts.',
            'As we advance our educational programs, we remain deeply committed to encouraging young Franco-Americans to explore their linguistic heritage, and supporting local schools with necessary textbooks and French immersion curricula.'
          ]
        },
        {
          title: 'Somerset Chapter N442 Celebrates Cultural Preservation Milestones',
          author: 'Albert Dumoulin, Chapter President',
          content: [
            'Chapter N442 hosted another successful Scholarship Dinner, gathering together local families, teachers, and student awardees. Six exceptional college-bound students received $1,000 awards to support their first semesters.',
            'In addition to academic awards, our chapter is actively cataloging historical photos of the Union Saint-Jean-Baptiste (USJB) legacy dating back to its founding years. We encourage anyone with historical family photographs or artifacts to submit them using our new public digital archive portal.'
          ]
        }
      ]
    },
    {
      id: 'news-2',
      title: 'SJBEF Annual Bulletin - 2024',
      season: 'Winter',
      year: '2024',
      date: '2024-12-15',
      pdfUrl: '/newsletters/2024 SJBEF Newsletter.pdf',
      description: 'An in-depth look at our annual Scholarship Presentation hosted by Chapter N442 in Somerset, MA. Meet the committee and our brilliant awardees.',
      articles: [
        {
          title: 'A Night to Remember: Recipient Highlights from All Chapters',
          author: 'Paul Pinsonnault, Administrative Secretary',
          content: [
            'Our 2024 Scholarship Night brought together members from Somerset Chapter N442, Westport Chapter N441, and North Attleboro Chapter N042. Seeing these brilliant young minds express their appreciation for bilingual literacy and academic excellence is a reminder of why this Foundation was established.',
            'Special recognition goes out to Sophia Puccini, Caroline Puccini, Ella Gesner, Nicole Ledwidge, Jack Hebert, and Noelle Champigny for their outstanding academic records and community service.'
          ]
        },
        {
          title: 'Preserving Franco-American Culture in the 21st Century',
          author: 'Editorial Committee',
          content: [
            'In an increasingly globalized world, preserving regional histories like the New England Franco-American migration is vital. The French language is not just a subject in school; it is a gateway to understanding the history of our mills, churches, and community groups that shaped modern New England.'
          ]
        }
      ]
    },
    {
      id: 'news-3',
      title: 'SJBEF Annual Bulletin - 2023',
      season: 'Winter',
      year: '2023',
      date: '2023-12-15',
      pdfUrl: '/newsletters/2023 SJBEF Newsletter.pdf',
      description: 'Announcing our latest educational material grants supporting New England regional Catholic schools, focusing on French literacy and heritage.',
      articles: [
        {
          title: 'Catholic School Grants Advance French Literacy in RI & MA',
          author: 'Grants Review Board',
          content: [
            'We have finalized three major grants this spring: Sacred Heart Academy, Holy Ghost Academy, and St. Joseph School in Woonsocket, Rhode Island. These grants supply French language storybooks, grammar workbooks, and custom history booklets to school classes.',
            'By supporting bilingual education early, we help children form deep connections with their heritage and develop cognitive flexibility through multilingualism.'
          ]
        }
      ]
    }
  ];

  const newsletters = defaultNewsletters;

  const [selectedNewsletterId, setSelectedNewsletterId] = useState<string>('news-1');
  const [newsletterSearch, setNewsletterSearch] = useState<string>('');
  const [newsletterYear, setNewsletterYear] = useState<string>('all');
  const [newsletterMode, setNewsletterMode] = useState<'digital' | 'pdf'>('digital');

  // Derived filtered newsletters list
  const filteredNewsletters = newsletters.filter(item => {
    if (newsletterYear !== 'all' && item.year !== newsletterYear) return false;
    if (newsletterSearch) {
      const q = newsletterSearch.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.season.toLowerCase().includes(q) ||
        item.year.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Get active selected newsletter details
  const activeNewsletter = newsletters.find(n => n.id === selectedNewsletterId) || newsletters[0] || defaultNewsletters[0];


  // Custom Dynamic Contact Forms States
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    affiliation: 'Parent'
  });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactSending, setContactSending] = useState(false);

  // Scholarship Application Form States (unused now that we use official Google Form directly)

  // Volunteer Sign-up Form States
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Translation Support (French/English)',
    availability: 'A few hours per month'
  });
  const [volunteerSuccess, setVolunteerSuccess] = useState(false);
  const [volunteerSending, setVolunteerSending] = useState(false);

  // Donation State
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [selectedDonationTier, setSelectedDonationTier] = useState<string | null>(null);
  const [customDonationAmount, setCustomDonationAmount] = useState('');
  const [donationModalOpen, setDonationModalOpen] = useState(false);

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

  // Submit General Inquiry Form
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      alert("Please fill in all required fields.");
      return;
    }
    setContactSending(true);
    
    setTimeout(() => {
      setContactSending(false);
      setContactSuccess(true);
      // Reset form
      setContactForm({
        name: '',
        email: '',
        subject: '',
        message: '',
        affiliation: 'Parent'
      });
    }, 1200);
  };


  // Submit Volunteer Form
  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volunteerForm.name || !volunteerForm.email) {
      alert("Name and email are required to register.");
      return;
    }
    setVolunteerSending(true);

    setTimeout(() => {
      setVolunteerSending(false);
      setVolunteerSuccess(true);
      setVolunteerForm({
        name: '',
        email: '',
        phone: '',
        role: 'Translation Support (Spanish/English)',
        availability: 'A few hours per month'
      });
    }, 1000);
  };

  // Trigger simulated donation
  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = selectedDonationTier ? selectedDonationTier : customDonationAmount;
    if (!amount) {
      alert("Please select or enter a donation amount.");
      return;
    }
    setDonationSuccess(true);
  };

  // Clear simulated notifications
  useEffect(() => {
    if (contactSuccess) {
      const timer = setTimeout(() => setContactSuccess(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [contactSuccess]);


  useEffect(() => {
    if (volunteerSuccess) {
      const timer = setTimeout(() => setVolunteerSuccess(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [volunteerSuccess]);

  // Scroll helper mapped to section switching
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    
    // Map id string to valid section state
    const sectionMap: Record<string, 'home' | 'about' | 'twbi' | 'scholarships' | 'gallery' | 'newsletters' | 'donate' | 'contact'> = {
      home: 'home',
      about: 'about',
      twbi: 'twbi',
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
              onClick={() => scrollToSection('twbi')} 
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-150 ${
                currentSection === 'twbi'
                  ? 'bg-brand-blue/10 text-brand-blue font-bold'
                  : 'hover:bg-gray-50 text-gray-600'
              }`}
            >
              {getText('nav.twbi', lang)}
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
              onClick={() => scrollToSection('twbi')} 
              className={`w-full text-left py-2 px-3 text-sm font-semibold rounded-md transition ${
                currentSection === 'twbi'
                  ? 'bg-brand-blue/10 text-brand-blue font-bold'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              {getText('nav.twbi', lang)}
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
                          onClick={() => scrollToSection('twbi')}
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
                          
                          {/* Bilingual Banner */}
                          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
                            <div className="flex items-center gap-2 text-xs font-bold text-brand-blue uppercase tracking-wider">
                              <Languages className="w-4 h-4 text-brand-teal" />
                              <span>{lang === 'en' ? 'Bilingual Heritage' : 'Héritage Bilingue'}</span>
                            </div>
                            <span className="text-[10px] bg-brand-teal/10 text-brand-teal px-2 py-0.5 rounded-full font-bold">
                              {lang === 'en' ? 'French Immersion' : 'Immersion Française'}
                            </span>
                          </div>

                          {/* Visual Interactive Text Sandbox */}
                          <div className="space-y-4">
                            <div className="bg-brand-blue/5 rounded-xl p-4 border border-brand-blue/10 hover:bg-brand-blue/10 transition duration-300 group">
                              <p className="text-[11px] font-bold text-brand-blue uppercase tracking-wider mb-1">
                                {lang === 'en' ? 'English Concept' : 'Concept Anglais'}
                              </p>
                              <blockquote className="font-serif italic text-sm text-brand-blue leading-relaxed font-semibold">
                                &ldquo;Two languages, one heart. Preserving heritage and academic excellence through bilingual literacy.&rdquo;
                              </blockquote>
                            </div>

                            <div className="bg-brand-teal/5 rounded-xl p-4 border border-brand-teal/10 hover:bg-brand-teal/10 transition duration-300">
                              <p className="text-[11px] font-bold text-brand-teal uppercase tracking-wider mb-1">
                                {lang === 'en' ? 'French Concept' : 'Concept Français'}
                              </p>
                              <blockquote className="font-serif italic text-sm text-brand-teal leading-relaxed font-semibold">
                                &ldquo;Deux langues, un cœur. Préserver le patrimoine et l'excellence académique à travers l'alphabétisation bilingue.&rdquo;
                              </blockquote>
                            </div>
                          </div>

                          {/* School Connection Badge */}
                          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center gap-1.5 font-medium">
                              <Building className="w-4 h-4 text-brand-teal" />
                              <span>{lang === 'en' ? 'Catholic & Regional Schools' : 'Écoles Catholiques & Régionales'}</span>
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
                        {lang === 'en' ? 'Explore Our Foundation' : 'Explore nuestra fundación'}
                      </span>
                      <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-blue tracking-tight">
                        {lang === 'en' ? 'How would you like to support or learn today?' : '¿Cómo le gustaría apoyar o aprender hoy?'}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {lang === 'en' 
                          ? 'Select any of the sections below to access educational resources, historical archives, scholarships, or ways to get involved.' 
                          : 'Seleccione cualquiera de las secciones a continuación para acceder a recursos educativos, archivos históricos, becas o formas de participar.'}
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

                      {/* Card 2: TWBI */}
                      <div 
                        onClick={() => scrollToSection('twbi')}
                        className="bg-white border border-gray-200 hover:border-emerald-500/40 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-300 group cursor-pointer transform hover:-translate-y-1"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Languages className="w-6 h-6 stroke-[2]" />
                          </div>
                          <div>
                            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                              {lang === 'en' ? 'Bilingual Support' : 'Soutien Bilingue'}
                            </span>
                            <h3 className="font-serif font-bold text-lg text-brand-blue mt-0.5">
                              {getText('nav.twbi', lang)}
                            </h3>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed min-h-[50px]">
                          {lang === 'en'
                            ? 'Support for bilingualism & literacy in public schools, providing books, classroom grants, and educational guides.'
                            : 'Soutien au bilinguisme et à l\'alphabétisation dans les écoles, fournissant des livres, des subventions et des guides.'}
                        </p>
                        <div className="mt-4 pt-3 border-t border-gray-50 flex items-center text-xs font-bold text-emerald-600 group-hover:text-emerald-700">
                          <span>{lang === 'en' ? 'Explore Program' : 'Explorer le Programme'}</span>
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
                          <h4 className="font-serif font-bold text-lg">{lang === 'en' ? 'Have Questions or Want to Volunteer?' : '¿Tiene preguntas o quiere ser voluntario?'}</h4>
                          <p className="text-xs text-blue-100 mt-1">{lang === 'en' ? 'Reach out to our board of trustees or register to volunteer with SJBEF!' : 'Póngase en contacto con nuestra junta o regístrese como voluntario.'}</p>
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
                      {currentSection === 'twbi' && getText('nav.twbi', lang)}
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

            {/* ABOUT & MISSION SECTION */}
            {currentSection === 'about' && (
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
                    
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-blue tracking-tight">
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
                          Every teacher grant, textbook, and senior scholarship we secure is run and supported by parent volunteers, local educators, and community donors with zero overhead.
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
            )}

            {/* TWBI PROGRAM DETAILED TAB */}
            {currentSection === 'twbi' && (
              <section id="twbi" className="py-20 bg-white border-b border-gray-150">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Intro */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                  <div className="inline-flex items-center gap-2 text-brand-blue font-bold uppercase tracking-widest text-xs">
                    <span className="w-4 h-4 rounded-full bg-brand-blue/10 flex items-center justify-center text-[10px] text-brand-blue">2</span>
                    <EditableText path="twbi.section_title" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-blue tracking-tight">
                    <EditableText path="twbi.title" />
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    <EditableText path="twbi.description" />
                  </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  
                  {/* Benefit 1 */}
                  <div className="bg-brand-warm rounded-2xl p-6 sm:p-8 border border-gray-150 hover:border-brand-blue/20 hover:shadow-md transition-all duration-300">
                    <div className="p-3 bg-brand-blue/5 rounded-xl text-brand-blue w-fit mb-5">
                      <Building className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-bold text-lg text-brand-blue mb-2">
                      <EditableText path="twbi.benefits.b1_title" />
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      <EditableText path="twbi.benefits.b1_desc" />
                    </p>
                  </div>

                  {/* Benefit 2 */}
                  <div className="bg-brand-warm rounded-2xl p-6 sm:p-8 border border-gray-150 hover:border-brand-teal/20 hover:shadow-md transition-all duration-300">
                    <div className="p-3 bg-brand-teal/5 rounded-xl text-brand-teal w-fit mb-5">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-bold text-lg text-brand-blue mb-2">
                      <EditableText path="twbi.benefits.b2_title" />
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      <EditableText path="twbi.benefits.b2_desc" />
                    </p>
                  </div>

                  {/* Benefit 3 */}
                  <div className="bg-brand-warm rounded-2xl p-6 sm:p-8 border border-gray-150 hover:border-brand-coral/20 hover:shadow-md transition-all duration-300">
                    <div className="p-3 bg-brand-coral/5 rounded-xl text-brand-coral w-fit mb-5">
                      <Languages className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-bold text-lg text-brand-blue mb-2">
                      <EditableText path="twbi.benefits.b3_title" />
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      <EditableText path="twbi.benefits.b3_desc" />
                    </p>
                  </div>

                  {/* Benefit 4 */}
                  <div className="bg-brand-warm rounded-2xl p-6 sm:p-8 border border-gray-150 hover:border-brand-blue/20 hover:shadow-md transition-all duration-300">
                    <div className="p-3 bg-brand-blue/5 rounded-xl text-brand-blue w-fit mb-5">
                      <ExternalLink className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-bold text-lg text-brand-blue mb-2">
                      <EditableText path="twbi.benefits.b4_title" />
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      <EditableText path="twbi.benefits.b4_desc" />
                    </p>
                  </div>

                </div>

                {/* Local Connection Notice */}
                <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 text-center max-w-4xl mx-auto space-y-2">
                  <div className="flex justify-center text-brand-blue">
                    <Building className="w-7 h-7" />
                  </div>
                  <p className="text-sm text-brand-blue font-semibold">
                    <EditableText path="twbi.sjusd_connection" />
                  </p>
                  <p className="text-xs text-gray-500">
                    SJUSD features the highly recognized TWBI model, which we support through community fundraising, advocacy, and cultural events.
                  </p>
                </div>

              </div>
            </section>
            )}

            {/* SCHOLARSHIPS & ACTIVE FORMS */}
            {currentSection === 'scholarships' && (
              <section id="scholarships" className="py-20 bg-brand-warm border-b border-gray-150">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header block */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-brand-coral font-bold uppercase tracking-widest text-xs">
                    <span className="w-8 h-0.5 bg-brand-coral"></span>
                    <EditableText path="scholarships.section_title" />
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-blue tracking-tight">
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
                    <div className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
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
                    <div className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
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
                    <div className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
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
                    <div className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
                      <div className="flex items-center gap-2.5 text-brand-blue font-serif font-bold text-xl border-b border-gray-100 pb-3">
                        <Award className="w-5 h-5 text-brand-teal" />
                        <EditableText path="scholarships.member_title" />
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        <EditableText path="scholarships.member_desc" />
                      </p>
                    </div>

                    <div className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
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
                        src={scholarshipHeritageImg} 
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
                    <div className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
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
            )}


            {/* ========================================================= */}
            {/* PHOTO GALLERY & SUBMISSION SECTION */}
            {/* ========================================================= */}
            {currentSection === 'gallery' && (
              <section id="gallery" className="py-20 bg-brand-warm border-b border-gray-150">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header block */}
                <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
                  <div className="inline-flex items-center gap-2 text-brand-blue font-bold uppercase tracking-widest text-xs">
                    <span className="w-8 h-0.5 bg-brand-blue"></span>
                    <span>{lang === 'en' ? 'Community Memories' : 'Mémoires de la Communauté'}</span>
                    <span className="w-8 h-0.5 bg-brand-blue"></span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-blue tracking-tight">
                    {lang === 'en' ? 'SJB Educational Foundation Galleries' : 'Galerie de Photos SJBEF'}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {lang === 'en' 
                      ? 'Browse through our historical and contemporary photographs of scholarship recipients and Catholic school grant achievements. Organize by year or contribute your own memories below.'
                      : 'Parcourez nos photographies historiques et contemporaines des lauréats de bourses et des subventions scolaires catholiques. Triez par année ou partagez vos propres souvenirs.'}
                  </p>
                </div>

                {/* Main Filter & Action Controls */}
                <div className="bg-white border border-gray-150 rounded-2xl p-4 sm:p-6 shadow-xs mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
                  
                  {/* Category Selection Tabs */}
                  <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto">
                    <button
                      onClick={() => {
                        setGalleryCategory('scholarships');
                        setGalleryYear('all');
                      }}
                      className={`flex-1 md:flex-none px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                        galleryCategory === 'scholarships'
                          ? 'bg-white text-brand-blue shadow-xs'
                          : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      🎓 {lang === 'en' ? 'Scholarship Recipients' : 'Lauréats de Bourses'}
                    </button>
                    <button
                      onClick={() => {
                        setGalleryCategory('grants');
                        setGalleryYear('all');
                      }}
                      className={`flex-1 md:flex-none px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                        galleryCategory === 'grants'
                          ? 'bg-white text-brand-blue shadow-xs'
                          : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      🏫 {lang === 'en' ? 'Catholic School Grants' : 'Subventions Scolaires'}
                    </button>
                  </div>

                  {/* Year & Search Filters */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-stretch sm:items-center">
                    
                    {/* Search Field */}
                    <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={gallerySearch}
                        onChange={(e) => setGallerySearch(e.target.value)}
                        placeholder={lang === 'en' ? 'Search by name, chapter...' : 'Rechercher par nom, section...'}
                        className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-brand-blue/15 focus:border-brand-blue rounded-xl outline-none transition"
                      />
                    </div>

                    {/* Dynamic Year Dropdown */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Filter className="w-3.5 h-3.5 text-gray-500" />
                      <select
                        value={galleryYear}
                        onChange={(e) => setGalleryYear(e.target.value)}
                        className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:bg-white focus:ring-2 focus:ring-brand-blue/15 transition font-semibold text-gray-700"
                      >
                        <option value="all">{lang === 'en' ? 'All Years' : 'Toutes les années'}</option>
                        {Array.from(new Set(galleryItems.filter(item => item.category === galleryCategory).map(item => item.year)))
                          .sort((a, b) => (a as string).localeCompare(b as string))
                          .map(yr => (
                            <option key={yr as string} value={yr as string}>{yr as string}</option>
                          ))
                        }
                      </select>
                    </div>

                  </div>
                </div>

                {/* Grid layout containing cards */}
                {filteredGalleryItems.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {filteredGalleryItems.map((item, idx) => {
                      // Find the real index in current filtered list for Lightbox usage
                      return (
                        <div 
                          key={item.id}
                          onClick={() => setLightboxIndex(idx)}
                          className="group bg-white rounded-2xl border border-gray-150/70 overflow-hidden shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 cursor-pointer flex flex-col h-full"
                        >
                          {/* Image Box */}
                          <div className="relative overflow-hidden aspect-[4/3] bg-gray-50 shrink-0 border-b border-gray-100">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              referrerPolicy="no-referrer"
                              className={`w-full h-full object-cover ${/(caroline-puccini|sophia-puccini|nicole-ledwidge|img-1504-rotated-1|img-1501-1-rotated-1|scholar5-1|scholar6-1|scholar10-1|scholar12-1|scholar14-1|scholar17-1)/i.test(item.imageUrl) ? 'object-top' : 'object-center'} transform group-hover:scale-[1.03] transition-transform duration-500`}
                            />
                            {/* Year badge */}
                            <div className="absolute top-3 left-3 bg-brand-blue/90 text-white font-mono text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-brand-teal" />
                              {item.year}
                            </div>
                            
                            {/* Hover overlay with detail icon */}
                            <div className="absolute inset-0 bg-brand-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="bg-white/95 p-3 rounded-full text-brand-blue shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                                <Search className="w-5 h-5" />
                              </div>
                            </div>
                          </div>

                          {/* Info area */}
                          <div className="p-5 flex-grow flex flex-col justify-between">
                            <div className="space-y-2">
                              <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-brand-teal font-mono">
                                {item.chapter}
                              </span>
                              <h3 className="text-sm sm:text-base font-serif font-bold text-brand-blue line-clamp-1 group-hover:text-brand-coral transition-colors">
                                {item.title}
                              </h3>
                              <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                                {item.description}
                              </p>
                            </div>

                            <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                              <span className="font-semibold text-gray-500 truncate max-w-[180px]">
                                {item.who}
                              </span>
                              <span>{item.date || item.year}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-white border border-gray-150 rounded-2xl py-16 px-4 text-center max-w-xl mx-auto shadow-xs">
                    <div className="bg-brand-warm p-4 rounded-full inline-block text-gray-400 mb-4 border border-gray-100">
                      <Image className="w-8 h-8 text-brand-blue/40 mx-auto" />
                    </div>
                    <h3 className="text-base font-bold text-brand-blue mb-1">
                      {lang === 'en' ? 'No Photographs Found' : 'Aucune Photo Trouvée'}
                    </h3>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto mb-6 leading-relaxed">
                      {lang === 'en' 
                        ? 'We couldn\'t find any photos matching the selected year or search keywords. Try adjusting your filters.'
                        : 'Nous n\'avons trouvé aucune photo correspondant à l\'année ou aux mots clés sélectionnés.'}
                    </p>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => {
                          setGalleryYear('all');
                          setGallerySearch('');
                        }}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-lg transition"
                      >
                        {lang === 'en' ? 'Reset Filters' : 'Réinitialiser'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Lightbox / Slideshow Overlay Modal */}
                {lightboxIndex !== null && filteredGalleryItems[lightboxIndex] && (
                  <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 transition-all duration-300">
                    
                    {/* Top action row */}
                    <div className="flex items-center justify-between text-white/80 max-w-7xl mx-auto w-full pt-2">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono uppercase font-bold bg-brand-blue px-2.5 py-1 rounded-md text-white">
                          {filteredGalleryItems[lightboxIndex].category === 'scholarships' 
                            ? (lang === 'en' ? 'Scholarship' : 'Bourses')
                            : (lang === 'en' ? 'Grants' : 'Subventions')
                          }
                        </span>
                        <span className="text-xs font-bold font-mono text-gray-400">
                          {filteredGalleryItems[lightboxIndex].year}
                        </span>
                      </div>
                      
                      {/* Close button */}
                      <button 
                        onClick={() => setLightboxIndex(null)}
                        className="p-2 hover:bg-white/10 rounded-full text-white transition cursor-pointer"
                        title="Close Gallery"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    {/* Central Carousel */}
                    <div className="flex-grow flex items-center justify-between max-w-7xl mx-auto w-full gap-4 py-6">
                      
                      {/* Left Arrow */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const prevIdx = lightboxIndex === 0 ? filteredGalleryItems.length - 1 : lightboxIndex - 1;
                          setLightboxIndex(prevIdx);
                        }}
                        className="p-3 bg-white/5 hover:bg-white/10 text-white hover:scale-105 rounded-full transition shrink-0 cursor-pointer hidden sm:block"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>

                      {/* Photo wrapper */}
                      <div className="flex-grow flex items-center justify-center max-h-[60vh] sm:max-h-[70vh] relative group">
                        <img 
                          src={filteredGalleryItems[lightboxIndex].imageUrl} 
                          alt={filteredGalleryItems[lightboxIndex].title}
                          referrerPolicy="no-referrer"
                          className="max-w-full max-h-[60vh] sm:max-h-[70vh] object-contain rounded-xl shadow-2xl transition-all duration-300"
                        />
                      </div>

                      {/* Right Arrow */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const nextIdx = lightboxIndex === filteredGalleryItems.length - 1 ? 0 : lightboxIndex + 1;
                          setLightboxIndex(nextIdx);
                        }}
                        className="p-3 bg-white/5 hover:bg-white/10 text-white hover:scale-105 rounded-full transition shrink-0 cursor-pointer hidden sm:block"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>

                    {/* Bottom Metadata Panel */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 max-w-4xl mx-auto w-full text-white space-y-3 mb-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/10 pb-3">
                        <h3 className="text-base sm:text-lg font-serif font-bold text-white/95">
                          {filteredGalleryItems[lightboxIndex].title}
                        </h3>
                        <span className="text-xs text-brand-teal font-semibold tracking-wide uppercase font-mono bg-white/10 px-3 py-1 rounded-md">
                          {filteredGalleryItems[lightboxIndex].chapter}
                        </span>
                      </div>
                      
                      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                        {filteredGalleryItems[lightboxIndex].description}
                      </p>

                      <div className="flex items-center justify-between pt-1 text-[11px] text-gray-400">
                        <span className="font-semibold text-gray-300">
                          {lang === 'en' ? 'Presented to / Featured:' : 'Lauréat / Présenté :'}{' '}
                          <span className="text-brand-teal">{filteredGalleryItems[lightboxIndex].who}</span>
                        </span>
                        <span>{filteredGalleryItems[lightboxIndex].date || filteredGalleryItems[lightboxIndex].year}</span>
                      </div>

                      {/* Mobile Arrow Controls */}
                      <div className="flex sm:hidden justify-between gap-4 pt-3 border-t border-white/10">
                        <button
                          onClick={() => {
                            const prevIdx = lightboxIndex === 0 ? filteredGalleryItems.length - 1 : lightboxIndex - 1;
                            setLightboxIndex(prevIdx);
                          }}
                          className="flex-1 py-2 bg-white/5 text-xs text-center rounded-lg font-semibold"
                        >
                          ← {lang === 'en' ? 'Prev' : 'Précédente'}
                        </button>
                        <span className="text-xs text-gray-400 self-center">
                          {lightboxIndex + 1} / {filteredGalleryItems.length}
                        </span>
                        <button
                          onClick={() => {
                            const nextIdx = lightboxIndex === filteredGalleryItems.length - 1 ? 0 : lightboxIndex + 1;
                            setLightboxIndex(nextIdx);
                          }}
                          className="flex-1 py-2 bg-white/5 text-xs text-center rounded-lg font-semibold"
                        >
                          {lang === 'en' ? 'Next' : 'Suivante'} →
                        </button>
                      </div>

                    </div>

                  </div>
                )}

              </div>
            </section>
            )}


            {/* ========================================================= */}
            {/* NEWSLETTERS & BULLETINS SECTION */}
            {/* ========================================================= */}
            {currentSection === 'newsletters' && (
              <section id="newsletters" className="py-20 bg-white border-b border-gray-150">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header block */}
                <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
                  <div className="inline-flex items-center gap-2 text-brand-blue font-bold uppercase tracking-widest text-xs">
                    <span className="w-8 h-0.5 bg-brand-blue"></span>
                    <span>{lang === 'en' ? 'Announcements & Updates' : 'Annonces et Mises à Jour'}</span>
                    <span className="w-8 h-0.5 bg-brand-blue"></span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-blue tracking-tight">
                    {lang === 'en' ? 'SJB Foundation Newsletters' : "Bulletins d'Information de la Fondation"}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {lang === 'en' 
                      ? 'Stay informed about our latest scholarship distribution milestones, community grant announcements, and historical preservation reports.'
                      : "Restez informé de nos dernières distributions de bourses d'études, de l'attribution de subventions scolaires, et de nos travaux d'archives."}
                  </p>
                </div>

                {/* Interactive Controls Bar */}
                <div className="bg-brand-warm border border-gray-150 rounded-2xl p-4 sm:p-6 shadow-xs mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
                  
                  {/* Filters Block */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-stretch sm:items-center">
                    
                    {/* Search Field */}
                    <div className="relative flex-grow sm:flex-grow-0 sm:w-60">
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={newsletterSearch}
                        onChange={(e) => setNewsletterSearch(e.target.value)}
                        placeholder={lang === 'en' ? 'Search bulletins...' : 'Rechercher un bulletin...'}
                        className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-gray-200 focus:ring-2 focus:ring-brand-blue/15 focus:border-brand-blue rounded-xl outline-none transition"
                      />
                    </div>

                    {/* Filter Year */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Filter className="w-3.5 h-3.5 text-gray-500" />
                      <select
                        value={newsletterYear}
                        onChange={(e) => setNewsletterYear(e.target.value)}
                        className="text-xs bg-white border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-brand-blue/15 font-semibold text-gray-700"
                      >
                        <option value="all">{lang === 'en' ? 'All Years' : 'Toutes les années'}</option>
                        {Array.from(new Set(newsletters.map(item => item.year)))
                          .sort((a, b) => (b as string).localeCompare(a as string))
                          .map(yr => (
                            <option key={yr as string} value={yr as string}>{yr as string}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>

                </div>

                {/* Main Workspace Layout (Sidebar left, Viewer right) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* LEFT SIDEBAR: List of Available Newsletters (4 cols) */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-extrabold uppercase tracking-wider text-brand-blue font-mono flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-brand-coral" />
                        <span>{lang === 'en' ? 'Available Bulletins' : 'Bulletins Disponibles'}</span>
                      </h3>
                      <span className="text-xs bg-brand-warm text-brand-blue font-bold px-2 py-0.5 rounded-md border border-gray-150">
                        {filteredNewsletters.length}
                      </span>
                    </div>

                    {filteredNewsletters.length > 0 ? (
                      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
                        {filteredNewsletters.map((item) => {
                          const isSelected = item.id === selectedNewsletterId;
                          return (
                            <div
                              key={item.id}
                              onClick={() => setSelectedNewsletterId(item.id)}
                              className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 ${
                                isSelected
                                  ? 'bg-brand-warm border-brand-coral shadow-sm'
                                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-xs'
                              }`}
                            >
                              <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                                    item.season === 'Winter' ? 'bg-blue-100 text-blue-800' :
                                    item.season === 'Spring' ? 'bg-emerald-100 text-emerald-800' :
                                    item.season === 'Summer' ? 'bg-amber-100 text-amber-800' :
                                    item.season === 'Fall' ? 'bg-orange-100 text-orange-800' :
                                    'bg-purple-100 text-purple-800'
                                  }`}>
                                    {lang === 'en' ? item.season : 
                                      item.season === 'Spring' ? 'Printemps' :
                                      item.season === 'Summer' ? 'Été' :
                                      item.season === 'Fall' ? 'Automne' :
                                      item.season === 'Winter' ? 'Hiver' : 'Édition'
                                    } {item.year}
                                  </span>

                                </div>
                                <h4 className="text-sm font-serif font-bold text-brand-blue line-clamp-1">
                                  {item.title}
                                </h4>
                                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                                  {item.description}
                                </p>
                              </div>

                              <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[10px] text-gray-400">
                                <span>📅 {item.date}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center text-gray-400">
                        <FileText className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                        <p className="text-xs font-semibold">{lang === 'en' ? 'No bulletins found' : 'Aucun bulletin trouvé'}</p>
                        <p className="text-[10px] mt-0.5">{lang === 'en' ? 'Adjust your filter keywords.' : 'Ajustez vos mots clés.'}</p>
                      </div>
                    )}
                  </div>

                  {/* RIGHT COLUMN: Interactive Viewer Area (8 cols) */}
                  <div className="lg:col-span-8">
                    {activeNewsletter ? (
                      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
                        
                        {/* Header metadata */}
                        <div className="bg-brand-warm px-6 py-5 border-b border-gray-150">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="space-y-1">
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-coral font-mono">
                                {lang === 'en' ? activeNewsletter.season : 
                                  activeNewsletter.season === 'Spring' ? 'Printemps' :
                                  activeNewsletter.season === 'Summer' ? 'Été' :
                                  activeNewsletter.season === 'Fall' ? 'Automne' :
                                  activeNewsletter.season === 'Winter' ? 'Hiver' : 'Spécial'
                                } {activeNewsletter.year} {lang === 'en' ? 'Release' : 'Publication'}
                              </span>
                              <h3 className="text-lg sm:text-xl font-serif font-bold text-brand-blue leading-tight">
                                {activeNewsletter.title}
                              </h3>
                            </div>
                            
                            {/* Action Links */}
                            <div className="flex gap-2.5 shrink-0">
                              <a
                                href={activeNewsletter.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3.5 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
                              >
                                <ExternalLink className="w-3.5 h-3.5 text-brand-blue" />
                                <span>{lang === 'en' ? 'Open Original PDF' : 'Ouvrir le PDF'}</span>
                              </a>
                            </div>
                          </div>
                          
                          <p className="text-xs text-gray-600 mt-3 leading-relaxed border-t border-gray-150/50 pt-3">
                            <strong>{lang === 'en' ? 'Summary:' : 'Résumé :'}</strong> {activeNewsletter.description}
                          </p>
                        </div>

                        {/* Interactive Viewer Content Area */}
                        <div className="p-6">
                          
                          {/* Inner Tabs for Mode Toggle */}
                          <div className="flex border-b border-gray-150 mb-6 gap-6">
                            <button
                              onClick={() => setNewsletterMode('digital')}
                              className={`pb-3 text-xs sm:text-sm font-bold tracking-wide transition-all border-b-2 outline-none cursor-pointer ${
                                newsletterMode === 'digital'
                                  ? 'border-brand-blue text-brand-blue font-extrabold'
                                  : 'border-transparent text-gray-400 hover:text-gray-600'
                              }`}
                            >
                              📰 {lang === 'en' ? 'Digital Interactive Edition' : 'Édition Numérique'}
                            </button>
                            <button
                              onClick={() => setNewsletterMode('pdf')}
                              className={`pb-3 text-xs sm:text-sm font-bold tracking-wide transition-all border-b-2 outline-none cursor-pointer ${
                                newsletterMode === 'pdf'
                                  ? 'border-brand-blue text-brand-blue font-extrabold'
                                  : 'border-transparent text-gray-400 hover:text-gray-600'
                              }`}
                            >
                              📄 {lang === 'en' ? 'Original PDF View' : 'Vue Document PDF'}
                            </button>
                          </div>
                          
                          {newsletterMode === 'digital' ? (
                            /* DIGITAL EDITION VIEW */
                            <div className="space-y-8 animate-fade-in">
                              <div className="border-b-2 border-brand-blue/10 pb-2 mb-6 flex items-center justify-between">
                                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-semibold">
                                  📰 {lang === 'en' ? 'Interactive Digital Layout' : 'Mise en Page Numérique'}
                                </span>
                                <span className="text-[10px] font-mono text-gray-400 font-semibold">
                                  {lang === 'en' ? 'Published:' : 'Publié le :'} {activeNewsletter.date}
                                </span>
                              </div>

                              {activeNewsletter.articles && activeNewsletter.articles.length > 0 ? (
                                <div className="space-y-12">
                                  {activeNewsletter.articles.map((art, aIdx) => (
                                    <div key={aIdx} className="space-y-4 pb-8 border-b border-gray-100 last:border-0 last:pb-0">
                                      <h4 className="text-xl font-serif font-bold text-brand-blue tracking-tight leading-snug">
                                        {art.title}
                                      </h4>
                                      
                                      <div className="flex items-center gap-2 text-[10px] font-mono uppercase font-bold text-brand-teal tracking-wider">
                                        <span>✍️ {art.author}</span>
                                        <span>•</span>
                                        <span>SJBEF Bulletin</span>
                                      </div>

                                      <div className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans space-y-4 text-justify">
                                        {art.content.map((para, pIdx) => (
                                          <p key={pIdx} className="first-of-type:text-gray-800">
                                            {pIdx === 0 && para.length > 100 ? (
                                              <>
                                                <span className="float-left text-4xl sm:text-5xl font-serif font-bold text-brand-coral mr-2 mt-1 leading-none">
                                                  {para.charAt(0)}
                                                </span>
                                                {para.slice(1)}
                                              </>
                                            ) : para}
                                          </p>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="py-12 text-center text-gray-400">
                                  <BookOpen className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                                  <p className="text-xs">{lang === 'en' ? 'No interactive articles defined for this issue.' : 'Aucun article numérique pour ce bulletin.'}</p>
                                  <button
                                    onClick={() => setNewsletterMode('pdf')}
                                    className="mt-3 text-xs text-brand-blue font-bold hover:underline"
                                  >
                                    {lang === 'en' ? 'Switch to Original PDF View' : 'Voir le PDF original'}
                                  </button>
                                </div>
                              )}
                              
                              {/* Footer sign off */}
                              <div className="pt-6 border-t border-gray-150 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 gap-3">
                                <span className="font-serif italic">
                                  © Saint-Jean-Baptiste Educational Foundation. All Rights Reserved.
                                </span>
                                <span className="font-mono text-brand-blue font-bold uppercase tracking-wider">
                                  PROMOVENDIS LITERIS
                                </span>
                              </div>

                            </div>
                          ) : (
                            /* PDF IFRAME VIEW */
                            <div className="space-y-4 animate-fade-in">
                              
                              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-800 text-[11px] leading-relaxed flex items-start gap-2">
                                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                <p>
                                  {lang === 'en' 
                                    ? 'Some corporate networks or mobile browsers may restrict loading external PDFs in an inline frame. If the frame below appears blank, use the Open Original button to view.'
                                    : 'Certains réseaux professionnels ou navigateurs mobiles peuvent restreindre le chargement des PDF intégrés. Si l\'encadré reste blanc, utilisez le bouton d\'ouverture.'}
                                </p>
                              </div>

                              <div className="bg-gray-100 rounded-2xl overflow-hidden border border-gray-250/60 relative flex flex-col shadow-inner">
                                <iframe
                                  src={activeNewsletter.pdfUrl}
                                  title={activeNewsletter.title}
                                  className="w-full h-[750px] border-none"
                                />
                              </div>
                            </div>
                          )}

                        </div>

                      </div>
                    ) : (
                      <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center text-gray-400">
                        <FileText className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                        <p className="text-sm font-semibold">{lang === 'en' ? 'Select a bulletin from the list' : 'Sélectionnez un bulletin dans la liste'}</p>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            </section>
            )}


            {/* SUPPORT US & DONATION SECTION */}
            {currentSection === 'donate' && (
              <section id="donate" className="py-20 bg-white border-b border-gray-150">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                  <div className="inline-flex items-center gap-2 text-brand-blue font-bold uppercase tracking-widest text-xs">
                    <span className="w-8 h-0.5 bg-brand-blue"></span>
                    <EditableText path="donate.section_title" />
                    <span className="w-8 h-0.5 bg-brand-blue"></span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-blue tracking-tight">
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
                </div>

              </div>
            </section>
            )}

            {/* BILINGUAL CONTACT FORMS & INFO */}
            {currentSection === 'contact' && (
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
                        <span className="text-[10px] text-brand-teal bg-brand-teal/5 border border-brand-teal/10 px-2.5 py-0.5 rounded-full font-semibold">
                          Simulated Inbox Delivery Complete
                        </span>
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

                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1">{getText('contact.form.name', lang)} *</label>
                          <input 
                            type="text" 
                            required
                            value={contactForm.name}
                            onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                            placeholder="Sofia Ramirez"
                            className="w-full text-xs bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue rounded-lg p-2.5 outline-none transition"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1">{getText('contact.form.email', lang)} *</label>
                          <input 
                            type="email" 
                            required
                            value={contactForm.email}
                            onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                            placeholder="sofia@gmail.com"
                            className="w-full text-xs bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue rounded-lg p-2.5 outline-none transition"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1">{getText('contact.form.subject', lang)}</label>
                          <input 
                            type="text" 
                            value={contactForm.subject}
                            onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                            placeholder="e.g. Donation Question"
                            className="w-full text-xs bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue rounded-lg p-2.5 outline-none transition"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1">Your Affiliation</label>
                          <select 
                            value={contactForm.affiliation}
                            onChange={(e) => setContactForm({...contactForm, affiliation: e.target.value})}
                            className="w-full text-xs bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue rounded-lg p-2.5 outline-none transition"
                          >
                            <option value="Parent">Parent of Dual Immersion Student</option>
                            <option value="Teacher">Bilingual Educator / Teacher</option>
                            <option value="Student">TWBI Program Graduate / Student</option>
                            <option value="Community">SJBEF / New England Supporter</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">{getText('contact.form.message', lang)} *</label>
                        <textarea 
                          required
                          rows={4}
                          value={contactForm.message}
                          onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                          placeholder="How can we help you?"
                          className="w-full text-xs bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue rounded-lg p-2.5 outline-none transition resize-none"
                        ></textarea>
                      </div>

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

                    {/* Volunteer quick recruitment sign-up */}
                    <div className="bg-gradient-to-tr from-brand-blue to-blue-900 text-white rounded-2xl p-6 sm:p-8 shadow-md space-y-4 relative overflow-hidden">
                      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full"></div>
                      
                      {volunteerSuccess ? (
                        <div className="text-center py-4 space-y-2 animate-fade-in">
                          <div className="w-10 h-10 rounded-full bg-white/10 mx-auto flex items-center justify-center">
                            <Check className="w-6 h-6 text-emerald-400 stroke-[3]" />
                          </div>
                          <h4 className="font-bold">Volunteer Registered!</h4>
                          <p className="text-xs text-blue-100">Our board team has received your registration. We'll be in touch soon!</p>
                        </div>
                      ) : (
                        <>
                          <div className="space-y-1">
                            <span className="text-[10px] bg-white/15 text-white px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">Join Our Board</span>
                            <h3 className="font-serif font-bold text-lg">Volunteer with SJBEF</h3>
                            <p className="text-xs text-blue-100 leading-relaxed">
                              Have bilingual advocacy skills, or want to support fundraising committees? Register below to help out!
                            </p>
                          </div>

                          <form onSubmit={handleVolunteerSubmit} className="space-y-3 pt-2 text-gray-800">
                            <input 
                              type="text" 
                              required
                              placeholder="Your Name"
                              value={volunteerForm.name}
                              onChange={(e) => setVolunteerForm({...volunteerForm, name: e.target.value})}
                              className="w-full text-xs bg-white/95 rounded-lg p-2 outline-none"
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <input 
                                type="email" 
                                required
                                placeholder="Email Address"
                                value={volunteerForm.email}
                                onChange={(e) => setVolunteerForm({...volunteerForm, email: e.target.value})}
                                className="w-full text-xs bg-white/95 rounded-lg p-2 outline-none"
                              />
                              <select 
                                value={volunteerForm.role}
                                onChange={(e) => setVolunteerForm({...volunteerForm, role: e.target.value})}
                                className="w-full text-xs bg-white/95 rounded-lg p-2 outline-none"
                              >
                                <option value="Translation Support (Spanish/English)">Translation</option>
                                <option value="Fundraising & Events Committee">Fundraising</option>
                                <option value="Book Distribution Volunteer">Book Dist.</option>
                                <option value="Scholarship Selection Panel">Scholarship Jury</option>
                              </select>
                            </div>

                            <button 
                              type="submit" 
                              disabled={volunteerSending}
                              className="w-full py-2 bg-brand-coral hover:bg-brand-coral/90 text-white font-bold text-xs rounded-lg shadow-sm tracking-wide transition flex items-center justify-center gap-1 cursor-pointer"
                            >
                              {volunteerSending ? <RefreshCw className="w-3 animate-spin" /> : <UserPlus className="w-3.5 h-3.5" />}
                              <span>Join as Volunteer</span>
                            </button>
                          </form>
                        </>
                      )}
                    </div>

                  </div>

                </div>

              </div>
            </section>
            )}

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
                The Saint-Jean-Baptiste Educational Foundation (SJBEF) is a volunteer-led registered 501(c)(3) nonprofit organization promoting French language, preserving culture, and providing higher education assistance in New England.
              </p>

              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest pl-1.5">Active heritage advocacy</span>
              </div>
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
