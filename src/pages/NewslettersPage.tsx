import { useState } from 'react';
import { BookOpen, ExternalLink, FileText, Filter, Info, Search } from 'lucide-react';

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

interface NewslettersPageProps {
  lang: 'en' | 'es';
  isActive: boolean;
}

export default function NewslettersPage({ lang, isActive }: NewslettersPageProps) {
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
            'We are extremely pleased to announce that in the fiscal year of 2025, the Saint-Jean-Baptiste Educational Foundation has distributed over $35,000 in higher education scholarships and grants to Catholic schools. This has been made possible by the persistent support of our community members, chapter organizers, and generous trusts.',
            "As we advance our mission, we remain committed to encouraging young Franco-Americans to explore their linguistic heritage. Our grants support local schools' efforts to obtain resources such as textbooks and French-language curricula; the schools provide the education."
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
            'Grants to Sacred Heart Academy, Holy Ghost Academy, and St. Joseph School in Woonsocket, Rhode Island, support the schools’ work acquiring French language storybooks, grammar workbooks, and custom history booklets for their classes.',
            'By supporting bilingual education early, schools can help children form deep connections with their heritage and develop cognitive flexibility through multilingualism.'
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

  return (
              <section id="newsletters" className={`${isActive ? '' : 'hidden'} py-20 bg-white border-b border-gray-150`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header block */}
                <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
                  <div className="inline-flex items-center gap-2 text-brand-blue font-bold uppercase tracking-widest text-xs">
                    <span className="w-8 h-0.5 bg-brand-blue"></span>
                    <span>{lang === 'en' ? 'Announcements & Updates' : 'Annonces et Mises à Jour'}</span>
                    <span className="w-8 h-0.5 bg-brand-blue"></span>
                  </div>
                  <h2 className="section-title">
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
  );
}
