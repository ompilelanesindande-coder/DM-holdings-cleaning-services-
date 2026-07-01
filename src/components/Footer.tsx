import { Compass, Phone, Mail, Clock, MessageSquare, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-natural-dark text-natural-sage/80 text-left pt-20 pb-10 border-t border-natural-cream/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-natural-cream/5">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div
              className="flex items-center space-x-2.5 cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <div className="flex items-center justify-center w-10 h-10 bg-natural-cream text-natural-dark font-serif font-bold text-lg rounded-lg border border-natural-border">
                DM
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg text-natural-bg tracking-tight leading-none font-serif">
                  DM HOLDINGS
                </span>
                <span className="text-[10px] text-natural-terracotta font-bold uppercase tracking-widest leading-none mt-1">
                  We Clean, You Enjoy!
                </span>
              </div>
            </div>

            <p className="text-sm text-natural-sage/75 leading-relaxed max-w-sm">
              Gauteng’s leading mobile detailing and upholstery deep steam-extraction cleaning company. Dedicated to restoring cars, couches, carpets, and mattresses to pristine condition.
            </p>

            {/* Satisfaction badge */}
            <div className="flex items-center space-x-2 text-xs font-bold text-natural-sage">
              <ShieldCheck className="w-4 h-4 text-natural-terracotta shrink-0" />
              <span>100% Satisfaction Guaranteed • Gauteng Mobile Service</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-natural-bg text-xs font-bold uppercase tracking-widest font-serif">Navigation</h4>
            <div className="grid grid-cols-2 gap-2 text-sm font-light text-natural-sage/80">
              <button onClick={() => onNavigate('home')} className="hover:text-natural-terracotta transition-colors cursor-pointer text-left">Home</button>
              <button onClick={() => onNavigate('services')} className="hover:text-natural-terracotta transition-colors cursor-pointer text-left">Services</button>
              <button onClick={() => onNavigate('booking')} className="hover:text-natural-terracotta transition-colors cursor-pointer text-left">Book Now</button>
              <button onClick={() => onNavigate('testimonials')} className="hover:text-natural-terracotta transition-colors cursor-pointer text-left">Reviews</button>
              <button onClick={() => onNavigate('contact')} className="hover:text-natural-terracotta transition-colors cursor-pointer text-left">Contact</button>
            </div>
          </div>

          {/* Contact Node Info */}
          <div className="md:col-span-4 space-y-4 text-sm">
            <h4 className="text-natural-bg text-xs font-bold uppercase tracking-widest font-serif">Gauteng Operations</h4>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-natural-terracotta shrink-0 mt-0.5" />
                <div>
                  <p className="text-natural-bg font-semibold font-serif">Booking Managers:</p>
                  <a href="tel:0796032672" className="hover:text-natural-terracotta text-natural-sage/85 transition-colors block">079 603 2672</a>
                  <a href="https://wa.me/27767876326" className="hover:text-natural-terracotta text-natural-sage/85 transition-colors block mt-0.5">+27 76 787 6326 (WhatsApp)</a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-natural-terracotta shrink-0 mt-0.5" />
                <div>
                  <p className="text-natural-bg font-semibold font-serif">Business Hours:</p>
                  <p className="text-natural-sage/85">Mon - Sun: 07:00 - 18:00</p>
                  <p className="text-[11px] text-natural-terracotta">Including Public Holidays</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Compass className="w-4 h-4 text-natural-terracotta shrink-0 mt-0.5" />
                <div>
                  <p className="text-natural-bg font-semibold font-serif">Areas Covered:</p>
                  <p className="text-natural-sage/85">Pretoria (PTA) & Johannesburg (JHB)</p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Footer Credit bottom */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-natural-sage/60 gap-4">
          <div>
            <p>© {new Date().getFullYear()} DM Holdings. All Rights Reserved.</p>
            <p className="text-[10px] mt-0.5 text-natural-sage/40">Pretoria & Johannesburg Mobile Detailing & Deep Cleaning Specialists</p>
          </div>
          <div className="flex space-x-4">
            <span className="text-natural-terracotta/90 uppercase tracking-widest text-[10px] font-bold">Clean Spaces. Healthy Places. Happy Faces.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
