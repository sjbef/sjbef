import { useEffect, useState } from 'react';
import { Calendar, Filter, Image, Search, X } from 'lucide-react';

interface GalleryItem {
  id: string;
  category: 'scholarships' | 'grants';
  title: string;
  year: string;
  who: string;
  chapter: string;
  description: string;
  imageUrl: string;
}

interface GalleryManifestEntry {
  category: GalleryItem['category'];
  filename: string;
  localUrl: string;
  caption?: string;
  altText?: string;
  year: string;
}

interface GalleryPageProps {
  lang: 'en' | 'es';
  isActive: boolean;
}

function isGalleryManifestEntry(value: unknown): value is GalleryManifestEntry {
  if (typeof value !== 'object' || value === null) return false;
  const entry = value as Record<string, unknown>;
  return (
    (entry.category === 'grants' || entry.category === 'scholarships') &&
    typeof entry.filename === 'string' &&
    typeof entry.localUrl === 'string' &&
    typeof entry.year === 'string' &&
    (entry.caption === undefined || typeof entry.caption === 'string') &&
    (entry.altText === undefined || typeof entry.altText === 'string')
  );
}

export default function GalleryPage({ lang, isActive }: GalleryPageProps) {
  // Photo Gallery States
  const [galleryCategory, setGalleryCategory] = useState<'scholarships' | 'grants'>('scholarships');
  const [galleryYear, setGalleryYear] = useState<string>('all');
  const [gallerySearch, setGallerySearch] = useState<string>('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [galleryLoadError, setGalleryLoadError] = useState(false);

  useEffect(() => {
    async function loadGalleryManifest() {
      try {
        const response = await fetch('/page-assets/page_assets_manifest.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const manifest: unknown = await response.json();
        if (!Array.isArray(manifest)) {
          throw new Error('The gallery manifest is not a list.');
        }

        const importedItems = manifest.map((entry, index): GalleryItem => {
          if (!isGalleryManifestEntry(entry)) {
            throw new Error(`Gallery manifest entry ${index + 1} is invalid.`);
          }

          const displayName = entry.filename
            .replace(/\.[a-zA-Z0-9]+$/, '')
            .replace(/[-_]+/g, ' ')
            .replace(/\b\w/g, (letter) => letter.toUpperCase());
          const caption = entry.caption?.trim() || '';
          const altText = entry.altText?.trim() || '';
          const title = caption || altText || `${displayName} ${entry.category === 'grants' ? 'Grant' : 'Scholarship'}`;
          const chapter = /\bchapter\s+[n-]?\d+\b/i.exec(caption)?.[0].toUpperCase() || 'New England Regional';

          return {
            id: `manifest-${entry.category}-${index}`,
            category: entry.category,
            title,
            year: entry.year,
            who: altText || displayName,
            chapter,
            description: caption || altText || `${displayName} was awarded support from the foundation.`,
            imageUrl: entry.localUrl
          };
        });

        setGalleryItems(importedItems);
      } catch (error) {
        console.error('Failed to load the photo gallery manifest.', error);
        setGalleryLoadError(true);
      }
    }
    loadGalleryManifest();
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

  return (
              <section id="gallery" className={`${isActive ? '' : 'hidden'} py-20 bg-brand-warm border-b border-gray-150`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header block */}
                <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
                  <div className="inline-flex items-center gap-2 text-brand-blue font-bold uppercase tracking-widest text-xs">
                    <span className="w-8 h-0.5 bg-brand-blue"></span>
                    <span>{lang === 'en' ? 'Community Memories' : 'Mémoires de la Communauté'}</span>
                    <span className="w-8 h-0.5 bg-brand-blue"></span>
                  </div>
                  <h2 className="section-title">
                    {lang === 'en' ? 'SJB Educational Foundation Galleries' : 'Galerie de Photos SJBEF'}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {lang === 'en' 
                      ? 'Browse historical and recent photographs of scholarship recipients and Catholic school grant presentations. Filter by year or search the gallery.'
                      : 'Parcourez des photos historiques et récentes de lauréats de bourses et de remises de subventions aux écoles catholiques. Filtrez par année ou recherchez dans la galerie.'}
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
                {galleryLoadError ? (
                  <div className="bg-white border border-gray-150 rounded-2xl py-16 px-4 text-center max-w-xl mx-auto shadow-xs">
                    <h3 className="text-base font-bold text-brand-blue mb-1">
                      {lang === 'en' ? 'Gallery Unavailable' : 'Galerie indisponible'}
                    </h3>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                      {lang === 'en'
                        ? 'The photo gallery could not be loaded. Please try again later.'
                        : 'La galerie de photos n’a pas pu être chargée. Veuillez réessayer plus tard.'}
                    </p>
                  </div>
                ) : filteredGalleryItems.length > 0 ? (
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
                              <span>{item.year}</span>
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
  );
}
