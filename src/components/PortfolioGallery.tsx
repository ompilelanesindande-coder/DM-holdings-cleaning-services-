import { useState } from 'react';
import { GALLERY_ITEMS } from '../data';
import { Sparkles, ScanEye, ArrowLeftRight } from 'lucide-react';

export default function PortfolioGallery() {
  const [filter, setFilter] = useState<'all' | 'car' | 'upholstery' | 'carpet'>('all');
  
  // Keep track of split position percentage for each item index (0-100)
  const [sliderPositions, setSliderPositions] = useState<{ [key: string]: number }>({
    g1: 50,
    g2: 50,
    g3: 50,
    g4: 50,
  });

  const handleSliderChange = (id: string, value: number) => {
    setSliderPositions(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const filteredItems = filter === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === filter);

  return (
    <section id="portfolio" className="py-24 bg-natural-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-natural-cream border border-natural-border text-natural-dark px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
            <ScanEye className="w-3.5 h-3.5 text-natural-terracotta" />
            <span>Witness the Difference</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-light text-natural-dark tracking-tight font-serif leading-tight">
            Before & <span className="italic text-natural-terracotta">After Gallery</span>
          </h2>
          <div className="w-16 h-[1px] bg-natural-sage mx-auto" />
          <p className="text-natural-muted text-base leading-relaxed">
            See the power of our steam extraction, stain lifters, and machine polishing. Drag the vertical slider handle on each card to compare results!
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'All Jobs' },
            { id: 'car', label: 'Car Detailing & Polishing' },
            { id: 'upholstery', label: 'Sofas & Chairs' },
            { id: 'carpet', label: 'Carpets & Rugs' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold transition-all cursor-pointer ${
                filter === cat.id
                  ? 'bg-natural-terracotta text-natural-bg shadow-sm'
                  : 'bg-natural-cream text-natural-muted hover:bg-natural-border/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Responsive Before/After Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {filteredItems.map((item) => {
            const position = sliderPositions[item.id] !== undefined ? sliderPositions[item.id] : 50;

            return (
              <div
                key={item.id}
                id={`gallery-card-${item.id}`}
                className="bg-natural-cream/30 border border-natural-border rounded-[32px] p-5 sm:p-7 shadow-xs hover:shadow-md transition-shadow text-left space-y-4 flex flex-col justify-between"
              >
                {/* Visual Title */}
                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold font-serif text-natural-dark">{item.title}</h3>
                  <p className="text-[10px] text-natural-terracotta capitalize font-bold uppercase tracking-widest">{item.category} Restoration</p>
                </div>

                {/* Split Image Canvas Container */}
                <div className="relative aspect-video rounded-[24px] overflow-hidden select-none border border-natural-border bg-natural-cream">
                  
                  {/* AFTER Image (Background) */}
                  <img
                    src={item.afterImage}
                    alt={`${item.title} After`}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />
                  <div className="absolute right-3 bottom-3 z-10 bg-natural-sage/95 text-natural-bg font-bold text-[9px] px-3 py-1 rounded-full uppercase tracking-widest">
                    AFTER
                  </div>

                  {/* BEFORE Image (Foreground clipped) */}
                  <div
                    className="absolute inset-y-0 left-0 right-0 overflow-hidden pointer-events-none"
                    style={{ clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)` }}
                  >
                    <img
                      src={item.beforeImage}
                      alt={`${item.title} Before`}
                      referrerPolicy="no-referrer"
                      className="absolute inset-y-0 left-0 w-full h-full object-cover max-w-none"
                      style={{ width: '100%' }} // ensures matching size
                    />
                    <div className="absolute left-3 bottom-3 z-10 bg-natural-terracotta/95 text-natural-bg font-bold text-[9px] px-3 py-1 rounded-full uppercase tracking-widest">
                      BEFORE
                    </div>
                  </div>

                  {/* Vertical Drag Handle Overlay Line */}
                  <div
                    className="absolute inset-y-0 w-0.5 bg-natural-bg shadow-md pointer-events-none flex items-center justify-center z-20"
                    style={{ left: `${position}%` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-natural-dark text-natural-bg shadow-md border-2 border-natural-bg flex items-center justify-center -ml-0.5 shrink-0">
                      <ArrowLeftRight className="w-4 h-4 shrink-0" />
                    </div>
                  </div>

                  {/* Invisible HTML range slider matching sizing for touch & drag */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={position}
                    onChange={(e) => handleSliderChange(item.id, parseInt(e.target.value))}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-ew-resize z-30"
                  />

                </div>

                {/* Description */}
                <div className="pt-1">
                  <p className="text-xs sm:text-sm text-natural-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Quick Hint */}
                <div className="flex items-center space-x-1.5 text-[9px] text-natural-dark font-bold tracking-widest uppercase justify-end bg-natural-sage/10 px-3.5 py-1.5 rounded-full w-fit ml-auto">
                  <Sparkles className="w-3.5 h-3.5 text-natural-terracotta" />
                  <span>Drag photo to slide before/after</span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
