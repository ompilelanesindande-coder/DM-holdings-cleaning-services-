import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import BookingSystem from './components/BookingSystem';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import { ShieldCheck, Check, Sparkles, Star, Award, HeartHandshake, Clock, Phone } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedServiceId, setSelectedServiceId] = useState('car-cleaning');
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Scroll spy to highlight active navbar section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'portfolio', 'booking', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 200; // offset for navbar height

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleSelectServiceAndBook = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    // Smooth scroll directly to the booking section
    handleNavigate('booking');
  };

  const handleBookingSuccess = () => {
    // We can show a toast or do something, the BookingSystem handles successful summary view itself!
    console.log('New booking logged in local database.');
  };

  return (
    <div className="min-h-screen bg-natural-bg font-sans text-natural-dark antialiased overflow-x-hidden selection:bg-natural-terracotta selection:text-natural-bg">
      
      {/* Premium floating navigation bar */}
      <Navbar
        onNavigate={handleNavigate}
        activeSection={activeSection}
        isAdminMode={isAdminMode}
        onToggleAdmin={() => setIsAdminMode(!isAdminMode)}
      />

      {/* Hero Header Section */}
      <Hero onNavigate={handleNavigate} />

      {/* Trust Ribbon / Flyer footer equivalents */}
      <div id="trust-badges" className="bg-natural-dark text-natural-bg py-10 border-y border-natural-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 bg-natural-cream/5 p-5 rounded-[24px] border border-natural-muted/20">
              <div className="p-3 bg-natural-sage/10 text-natural-sage rounded-full">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="font-bold text-xs uppercase tracking-widest text-natural-bg">RELIABLE SERVICE</h4>
                <p className="text-xs text-natural-sage/90 mt-0.5">100% vetted & skilled mobile teams</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 bg-natural-cream/5 p-5 rounded-[24px] border border-natural-muted/20">
              <div className="p-3 bg-natural-sage/10 text-natural-sage rounded-full">
                <Clock className="w-6 h-6" />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="font-bold text-xs uppercase tracking-widest text-natural-bg">ON TIME EVERY TIME</h4>
                <p className="text-xs text-natural-sage/90 mt-0.5">Strict arrival slot dispatch compliance</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 bg-natural-cream/5 p-5 rounded-[24px] border border-natural-muted/20">
              <div className="p-3 bg-natural-sage/10 text-natural-sage rounded-full">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="font-bold text-xs uppercase tracking-widest text-natural-bg">TRUSTED BY HAPPY CLIENTS</h4>
                <p className="text-xs text-natural-sage/90 mt-0.5">Pretoria & Johannesburg favorite</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Showcase Services */}
      <Services onSelectService={handleSelectServiceAndBook} />

      {/* WHY CHOOSE US? section based on the flyer */}
      <section id="why-choose-us" className="py-24 bg-natural-cream relative overflow-hidden">
        {/* Visual background pattern circles */}
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-natural-sage/10 rounded-full blur-3xl -translate-y-1/2 -ml-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Col: Features Checklists */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center space-x-1.5 bg-natural-sage/10 border border-natural-sage/30 text-natural-dark px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                <Award className="w-3.5 h-3.5 text-natural-terracotta" />
                <span>Uncompromising Quality</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-light text-natural-dark tracking-tight font-serif leading-[1.1]">
                Why Choose <br /><span className="italic text-natural-terracotta">DM Holdings?</span>
              </h2>
              <div className="w-16 h-[1px] bg-natural-sage" />
              <p className="text-natural-muted leading-relaxed">
                We believe in providing the absolute highest standard of care for your valuable upholstery and automobiles. Our teams arrive fully equipped with advanced industrial steam suctions and paint restorers, so you don't have to provide a single thing.
              </p>

              {/* Checklist from brochure */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                {[
                  { title: 'Professional & Trained Team', desc: 'Our technicians undergo rigorous safety and detailing training.' },
                  { title: 'High Quality Equipment', desc: 'Heavy-duty deep-suction steam extractors & clay paint correction tools.' },
                  { title: 'Safe & Effective Products', desc: 'Bio-degradable, child and pet safe shampoos and conditioners.' },
                  { title: 'Affordable Prices', desc: 'Transparent value starting at R120. No hidden fuel or travel surcharges.' },
                  { title: '100% Satisfaction Guarantee', desc: 'Not fully clean? We will return and re-clean free of charge!' }
                ].map((item, index) => (
                  <div key={index} className={`p-6 bg-natural-bg rounded-[32px] border border-natural-border/60 shadow-xs flex items-start space-x-4 text-left ${index === 4 ? 'sm:col-span-2' : ''}`}>
                    <div className="p-2 bg-natural-sage/15 text-natural-dark rounded-full mt-0.5 shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-natural-dark text-sm tracking-wide">{item.title}</h4>
                      <p className="text-xs text-natural-muted mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col: Graphic Pitch */}
            <div className="lg:col-span-5">
              <div className="bg-natural-dark text-natural-bg rounded-[40px] p-8 sm:p-10 shadow-lg text-left space-y-6 relative overflow-hidden border-b-8 border-natural-terracotta">
                <div className="absolute top-0 right-0 w-32 h-32 bg-natural-sage/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-natural-sage">Contact Booking Managers</span>
                  <h3 className="text-3xl font-light font-serif leading-tight text-natural-bg">Need Urgent Booking assistance?</h3>
                  <p className="text-sm text-natural-cream/80 leading-relaxed">
                    Our Gauteng team is ready to answer calls or WhatsApp questions right away.
                  </p>
                </div>

                <div className="p-6 bg-natural-cream/5 rounded-[24px] border border-natural-muted/20 space-y-4">
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="p-2 bg-natural-terracotta/15 text-natural-terracotta rounded-full">
                      <Star className="w-4 h-4 fill-natural-terracotta" />
                    </div>
                    <span className="text-natural-bg/90"><a href="tel:0796032672" className="hover:text-natural-terracotta transition-colors"><strong className="text-natural-bg">079 603 2672</strong></a></span>
                  </div>

                  <div className="flex items-center space-x-3 text-sm">
                    <div className="p-2 bg-natural-terracotta/15 text-natural-terracotta rounded-full">
                      <Star className="w-4 h-4 fill-natural-terracotta" />
                    </div>
                    <span className="text-natural-bg/90"><a href="https://wa.me/27767876326" target="_blank" rel="noreferrer" className="hover:text-natural-terracotta transition-colors"><strong className="text-natural-bg">+27 76 787 6326</strong></a></span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleNavigate('booking')}
                    className="w-full bg-natural-bg hover:bg-natural-sage hover:text-natural-bg text-natural-dark font-bold py-4 rounded-full text-xs uppercase tracking-widest transition-all shadow-md text-center cursor-pointer"
                  >
                    Launch Booking Assistant
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Online Reservation Module */}
      <BookingSystem
        selectedServiceId={selectedServiceId}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Client Reviews Section */}
      <Testimonials />

      {/* Direct Contact Form */}
      <ContactForm />

      {/* Hidden/Interactive Administrative dashboard (Business Owner Portal) */}
      {isAdminMode && (
        <div className="animate-fadeIn">
          <AdminDashboard />
        </div>
      )}

      {/* Professional Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}
