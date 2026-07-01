import { useState, useEffect } from 'react';
import { Menu, X, Phone, CheckCircle, ShieldAlert } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  isAdminMode: boolean;
  onToggleAdmin: () => void;
}

export default function Navbar({ onNavigate, activeSection, isAdminMode, onToggleAdmin }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'Book Now', id: 'booking' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-natural-bg/95 backdrop-blur-md shadow-sm border-b border-natural-border/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div
            id="nav-logo"
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleItemClick('home')}
          >
            <div className="relative flex items-center justify-center w-10 h-10 bg-natural-dark rounded-full text-natural-bg font-serif font-bold text-lg border border-natural-border">
              DM
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-natural-terracotta rounded-full border-2 border-natural-bg animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base text-natural-dark tracking-wide font-serif leading-none">
                DM HOLDINGS
              </span>
              <span className="text-[9px] text-natural-terracotta font-bold uppercase tracking-widest leading-none mt-1.5">
                We Clean, You Enjoy!
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div id="desktop-menu" className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className={`font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer relative py-1 ${
                  activeSection === item.id
                    ? 'text-natural-dark'
                    : 'text-natural-muted hover:text-natural-dark'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-natural-terracotta rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Contacts & CTAs */}
          <div id="nav-actions" className="hidden sm:flex items-center space-x-4">
            <a
              href="tel:0796032672"
              id="nav-call-link"
              className="flex items-center space-x-2 text-xs font-bold text-natural-dark bg-natural-cream px-4 py-2.5 rounded-full hover:bg-natural-border/50 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-natural-terracotta fill-natural-terracotta" />
              <span>079 603 2672</span>
            </a>
            
            {/* Admin toggle */}
            <button
              onClick={onToggleAdmin}
              id="admin-dashboard-toggle"
              className={`flex items-center space-x-1.5 text-xs font-bold px-4 py-2.5 rounded-full border transition-all cursor-pointer ${
                isAdminMode
                  ? 'bg-natural-terracotta/10 text-natural-terracotta border-natural-terracotta/30 shadow-xs'
                  : 'bg-natural-cream text-natural-muted border-natural-border/60 hover:bg-natural-border/40'
              }`}
              title="Toggle Business Owner Admin Dashboard"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-natural-terracotta" />
              <span>{isAdminMode ? 'Exit Admin' : 'Admin Portal'}</span>
            </button>

            <button
              onClick={() => handleItemClick('booking')}
              id="nav-booking-cta"
              className="bg-natural-dark hover:bg-natural-sage text-natural-bg font-bold text-xs uppercase tracking-widest px-6 py-2.5 rounded-full transition-all cursor-pointer shadow-xs hover:shadow-md"
            >
              Book Service
            </button>
          </div>

          {/* Mobile Menu Buttons */}
          <div id="mobile-menu-actions" className="lg:hidden flex items-center space-x-2">
            <button
              onClick={onToggleAdmin}
              id="mobile-admin-toggle"
              className={`p-2.5 rounded-full border ${
                isAdminMode ? 'bg-natural-terracotta/15 text-natural-terracotta border-natural-terracotta/30' : 'bg-natural-cream text-natural-muted border-natural-border'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-hamburger"
              className="text-natural-dark hover:text-natural-terracotta p-2.5 rounded-lg"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div id="mobile-drawer" className="lg:hidden bg-natural-bg border-t border-natural-border shadow-xl py-6 px-6 animate-fadeIn">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-item-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className={`text-left font-bold text-xs uppercase tracking-widest py-2 transition-colors ${
                  activeSection === item.id
                    ? 'text-natural-terracotta border-l-4 border-natural-terracotta pl-3'
                    : 'text-natural-muted hover:text-natural-dark pl-0'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-6 border-t border-natural-border flex flex-col space-y-4">
              <div className="flex justify-between items-center text-xs font-bold text-natural-dark bg-natural-cream p-4 rounded-[20px]">
                <span className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-natural-terracotta" />
                  <span>Call PTA / JHB:</span>
                </span>
                <a href="tel:0796032672" className="text-natural-terracotta font-extrabold">079 603 2672</a>
              </div>

              <div className="flex justify-between items-center text-xs font-bold text-natural-dark bg-natural-cream p-4 rounded-[20px]">
                <span>Business Owner Admin:</span>
                <button
                  onClick={() => {
                    onToggleAdmin();
                    setIsOpen(false);
                  }}
                  className={`px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                    isAdminMode ? 'bg-natural-terracotta text-natural-bg' : 'bg-natural-muted text-natural-bg'
                  }`}
                >
                  {isAdminMode ? 'Deactivate' : 'Activate'}
                </button>
              </div>

              <button
                onClick={() => handleItemClick('booking')}
                id="mobile-drawer-cta"
                className="w-full bg-natural-dark hover:bg-natural-sage text-natural-bg font-bold py-4 rounded-full text-xs uppercase tracking-widest text-center cursor-pointer shadow-sm"
              >
                Book Service Online
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
