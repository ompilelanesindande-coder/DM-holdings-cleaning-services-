import { useState } from 'react';
import { SERVICES } from '../data';
import { Service } from '../types';
import { Sparkles, Check, ChevronRight, X, ArrowRight } from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceId: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleBookClick = (serviceId: string) => {
    onSelectService(serviceId);
    setSelectedService(null);
  };

  return (
    <section id="services" className="py-24 bg-natural-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-natural-cream border border-natural-border text-natural-dark px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-natural-terracotta" />
            <span>Our Cleaning Specialties</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-light text-natural-dark tracking-tight font-serif leading-tight">
            Professional <span className="italic text-natural-terracotta">Cleaning Services</span>
          </h2>
          <div className="w-16 h-[1px] bg-natural-sage mx-auto" />
          <p className="text-natural-muted text-base leading-relaxed">
            We use specialized heavy-duty suction extraction and sanitizing equipment to restore your vehicles and furniture. Discover what we clean:
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="group flex flex-col bg-natural-cream/30 rounded-[32px] overflow-hidden border border-natural-border shadow-xs hover:shadow-md hover:border-natural-sage/50 hover:bg-natural-bg transition-all duration-300"
            >
              {/* Service Image */}
              <div className="relative h-52 overflow-hidden bg-natural-cream">
                <img
                  src={service.image}
                  alt={service.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-natural-dark/95 text-natural-bg font-bold text-[10px] uppercase tracking-wider px-3.5 py-2 rounded-full shadow-md border border-natural-border/20 backdrop-blur-xs">
                  From R{service.basePrice} / {service.priceUnit}
                </div>
              </div>

              {/* Service Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between text-left">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold font-serif text-natural-dark group-hover:text-natural-terracotta transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-natural-muted leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>

                {/* Bullet pre-views */}
                <div className="my-4 pt-4 border-t border-natural-border/50 space-y-2.5">
                  {service.details.slice(0, 3).map((detail, index) => (
                    <div key={index} className="flex items-start space-x-2 text-xs text-natural-dark">
                      <Check className="w-3.5 h-3.5 text-natural-sage shrink-0 mt-0.5" />
                      <span className="truncate">{detail}</span>
                    </div>
                  ))}
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-[10px] font-bold uppercase tracking-widest text-natural-terracotta hover:text-natural-terracotta/80 transition-colors flex items-center space-x-1 cursor-pointer mt-3"
                  >
                    <span>View all inclusions</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                {/* CTA Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="w-full bg-natural-cream hover:bg-natural-border/50 text-natural-dark text-[10px] font-bold uppercase tracking-widest py-3 rounded-full transition-colors cursor-pointer"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleBookClick(service.id)}
                    className="w-full bg-natural-dark hover:bg-natural-sage text-natural-bg text-[10px] font-bold uppercase tracking-widest py-3 rounded-full transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Detail Modal */}
        {selectedService && (
          <div
            id="service-detail-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-natural-dark/60 backdrop-blur-xs animate-fadeIn"
          >
            <div className="bg-natural-bg rounded-[40px] shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden border border-natural-border text-left relative">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 bg-natural-cream hover:bg-natural-border text-natural-dark p-2.5 rounded-full z-10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image banner */}
              <div className="relative h-64 bg-natural-cream">
                <img
                  src={selectedService.image}
                  alt={selectedService.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-natural-dark via-natural-dark/30 to-transparent" />
                <div className="absolute bottom-6 left-6 text-natural-bg">
                  <span className="bg-natural-terracotta text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    {selectedService.category.toUpperCase()} SPECIALTY
                  </span>
                  <h3 className="text-3xl font-light font-serif mt-2 text-natural-bg leading-tight">{selectedService.name}</h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold text-natural-terracotta uppercase tracking-widest">Description</h4>
                  <p className="text-natural-muted leading-relaxed text-sm sm:text-base">
                    {selectedService.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-natural-terracotta uppercase tracking-widest">What's Included in this Service</h4>
                  <div className="grid sm:grid-cols-2 gap-3.5">
                    {selectedService.details.map((detail, index) => (
                      <div key={index} className="flex items-start space-x-2 text-sm text-natural-dark">
                        <Check className="w-4 h-4 text-natural-sage shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sticky Pricing & action footer */}
                <div className="pt-6 border-t border-natural-border flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-center sm:text-left">
                    <span className="text-[10px] uppercase tracking-wider text-natural-muted block font-bold">Estimated Pricing</span>
                    <span className="text-3xl font-bold font-serif text-natural-dark">
                      R{selectedService.basePrice}
                    </span>
                    <span className="text-xs text-natural-muted font-bold ml-1.5">
                      per {selectedService.priceUnit}
                    </span>
                  </div>

                  <div className="flex space-x-3 w-full sm:w-auto">
                    <button
                      onClick={() => setSelectedService(null)}
                      className="flex-1 sm:flex-none border border-natural-border text-natural-dark hover:bg-natural-cream font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      Close Details
                    </button>
                    <button
                      onClick={() => handleBookClick(selectedService.id)}
                      className="flex-1 sm:flex-none bg-natural-dark hover:bg-natural-sage text-natural-bg font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-widest shadow-xs transition-colors cursor-pointer"
                    >
                      Select & Book Now
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
