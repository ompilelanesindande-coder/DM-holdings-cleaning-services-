import { Calendar, Compass, ShieldCheck, Sparkles, Star } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      id="home"
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-natural-bg"
    >
      {/* Decorative vector shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-natural-sage/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[600px] h-[600px] bg-natural-terracotta/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Pitch */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center space-x-2 bg-natural-cream border border-natural-border text-natural-dark px-4 py-1.5 rounded-full w-fit">
              <Compass className="w-4 h-4 text-natural-terracotta animate-spin-slow" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-natural-dark">
                We Serve Gauteng (PTA & JHB)
              </span>
            </div>

            {/* Slogan & Title */}
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-natural-terracotta leading-none">
                DM HOLDINGS • WE CLEAN, YOU ENJOY!
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-natural-dark font-serif leading-[1.1]">
                Professional <br />
                <span className="italic text-natural-terracotta font-serif">
                  Cleaning Services
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-light font-serif text-natural-muted italic">
                “Clean spaces. Healthy places. Happy faces.”
              </p>
            </div>

            {/* Subtext description */}
            <p className="text-base text-natural-muted max-w-xl leading-relaxed">
              We are Gauteng’s premium mobile cleaning specialists. We come directly to your home or office to deep-clean your cars, lounge suites, carpets, and mattresses.
              <strong className="block mt-3 text-natural-dark">
                🚀 You relax, we do the rest!
              </strong>
            </p>

            {/* Badges / Values checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center space-x-2.5 text-xs text-natural-dark font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-natural-sage" />
                <span>Trained Team</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs text-natural-dark font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-natural-sage" />
                <span>100% Quality</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs text-natural-dark font-bold uppercase tracking-wider">
                <Compass className="w-4 h-4 text-natural-sage" />
                <span>We Come to You</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={() => onNavigate('booking')}
                className="bg-natural-dark hover:bg-natural-sage text-natural-bg font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full shadow-xs hover:shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Cleaning Online</span>
              </button>

              <button
                onClick={() => onNavigate('services')}
                className="bg-natural-cream hover:bg-natural-border/40 text-natural-dark border border-natural-border font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Our Services</span>
              </button>
            </div>
          </div>

          {/* Right Column - Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Photo Card Frame */}
              <div className="relative z-10 overflow-hidden rounded-[40px] border border-natural-border shadow-md bg-natural-cream aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80"
                  alt="Car upholstery deep cleaning"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-natural-dark/80 via-transparent to-transparent" />

                {/* Floating caption overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-natural-bg text-left">
                  <span className="bg-natural-terracotta text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Mobile Detailing
                  </span>
                  <p className="text-lg font-light font-serif mt-2 text-natural-bg leading-tight">Car Interior Steam Suction Extraction</p>
                  <p className="text-[10px] text-natural-sage uppercase tracking-wider font-bold mt-1">Gauteng, PTA & JHB mobile service</p>
                </div>
              </div>

              {/* Floating Badge: 100% Satisfaction Guarantee */}
              <div className="absolute -top-6 -right-6 z-20 bg-natural-dark text-natural-bg p-5 rounded-full shadow-lg border-4 border-natural-bg flex flex-col items-center justify-center w-28 h-28 text-center animate-bounce-slow">
                <div className="flex space-x-0.5 text-natural-terracotta mb-0.5">
                  <Star className="w-3.5 h-3.5 fill-natural-terracotta" />
                  <Star className="w-3.5 h-3.5 fill-natural-terracotta" />
                  <Star className="w-3.5 h-3.5 fill-natural-terracotta" />
                </div>
                <span className="text-[9px] font-bold tracking-wider leading-none uppercase">SATISFACTION</span>
                <span className="text-xl font-bold text-natural-terracotta leading-none my-1">100%</span>
                <span className="text-[8px] font-bold tracking-widest leading-none uppercase text-natural-sage">GUARANTEED</span>
              </div>

              {/* Floating Badge 2: On-Time & Trusted */}
              <div className="absolute -bottom-6 -left-6 z-20 bg-natural-bg border border-natural-border p-4 rounded-[24px] shadow-sm flex items-center space-x-3 max-w-[200px] text-left">
                <div className="p-2.5 bg-natural-sage/15 rounded-full">
                  <Sparkles className="w-5 h-5 text-natural-terracotta" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-natural-dark tracking-wide">On Time, Every Time</h4>
                  <p className="text-[10px] text-natural-muted mt-0.5">Reliable mobile service</p>
                </div>
              </div>

              {/* Background decorative blob */}
              <div className="absolute inset-0 bg-natural-sage/20 rounded-[40px] transform rotate-3 scale-[1.01] -z-10" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
