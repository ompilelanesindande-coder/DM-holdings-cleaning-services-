import { useState, useEffect, FormEvent } from 'react';
import { SERVICES } from '../data';
import { Booking } from '../types';
import { Calendar, Clock, User, MapPin, Calculator, Sparkles, Check, ChevronLeft, ChevronRight, CheckCircle2, Mail } from 'lucide-react';

interface BookingSystemProps {
  selectedServiceId: string;
  onBookingSuccess: () => void;
}

export default function BookingSystem({ selectedServiceId, onBookingSuccess }: BookingSystemProps) {
  const [step, setStep] = useState(1);
  const [serviceId, setServiceId] = useState(selectedServiceId || 'car-cleaning');

  // Step 2: Schedule
  const [bookingDate, setBookingDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('Morning (08:00 - 11:00)');

  // Step 3: Customer Info
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [locationCity, setLocationCity] = useState<'Pretoria' | 'Johannesburg' | 'Midrand' | 'Centurion' | 'Other Gauteng'>('Pretoria');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  // Finished Ticket Information
  const [finishedBooking, setFinishedBooking] = useState<Booking | null>(null);

  // Sync selectedServiceId from props
  useEffect(() => {
    if (selectedServiceId) {
      setServiceId(selectedServiceId);
      setStep(1);
    }
  }, [selectedServiceId]);

  // Set default booking date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    setBookingDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const currentService = SERVICES.find(s => s.id === serviceId);

  // Validate current step
  const isStepValid = (): boolean => {
    if (step === 1) {
      return !!serviceId;
    }
    if (step === 2) {
      return !!bookingDate && !!timeSlot;
    }
    if (step === 3) {
      return (
        customerName.trim().length >= 2 &&
        customerPhone.trim().length >= 5 &&
        address.trim().length >= 4
      );
    }
    return true;
  };

  const handleNext = () => {
    if (isStepValid()) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  // Submit and save to local storage
  const handleSubmitBooking = (e: FormEvent) => {
    e.preventDefault();
    if (!currentService) return;

    const bookingId = `DM-RES-${Math.floor(100000 + Math.random() * 900000)}`;

    const newBooking: Booking = {
      id: bookingId,
      serviceId: serviceId,
      serviceName: currentService.name,
      additionalServices: [],
      totalPrice: 0,
      date: bookingDate,
      timeSlot: timeSlot,
      customerName: customerName,
      customerEmail: customerEmail || 'No Email Provided',
      customerPhone: customerPhone,
      locationCity: locationCity,
      address: address,
      notes: notes,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    // Save to localStorage list of bookings
    try {
      const existingBookingsStr = localStorage.getItem('dm_bookings');
      const existingBookings = existingBookingsStr ? JSON.parse(existingBookingsStr) : [];
      existingBookings.push(newBooking);
      localStorage.setItem('dm_bookings', JSON.stringify(existingBookings));
    } catch (err) {
      console.error('Error saving booking to localStorage:', err);
    }

    setFinishedBooking(newBooking);
    setStep(4);
    onBookingSuccess();

    // Automatically trigger mail client to send request to dmholdings.clean@gmail.com
    const mailtoUrl = `mailto:dmholdings.clean@gmail.com?subject=New Booking Request: ${encodeURIComponent(currentService.name)} (${encodeURIComponent(bookingDate)})&body=Hello DM Holdings,%0D%0AI would like to submit a mobile detailing/cleaning booking with the following details:%0D%0D- Ticket ID: ${encodeURIComponent(bookingId)}%0D- Service: ${encodeURIComponent(currentService.name)}%0D- Date: ${encodeURIComponent(bookingDate)}%0D- Time Slot: ${encodeURIComponent(timeSlot)}%0D- Customer Name: ${encodeURIComponent(customerName)}%0D- Phone: ${encodeURIComponent(customerPhone)}%0D- Email: ${encodeURIComponent(customerEmail || 'None provided')}%0D- Location City: ${encodeURIComponent(locationCity)}%0D- Address: ${encodeURIComponent(address)}%0D- Notes: ${encodeURIComponent(notes || 'None')}%0D%0DPlease confirm my appointment!`;
    
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 150);
  };

  const handleResetForm = () => {
    setStep(1);
    setServiceId('car-cleaning');
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setAddress('');
    setNotes('');
    setFinishedBooking(null);
  };

  return (
    <section id="booking" className="py-24 bg-natural-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-natural-cream border border-natural-border text-natural-dark px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
            <Calculator className="w-3.5 h-3.5 text-natural-terracotta" />
            <span>Interactive Booking System</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-light text-natural-dark tracking-tight font-serif leading-tight">
            Book Mobile <span className="italic text-natural-terracotta">Service Online</span>
          </h2>
          <p className="text-natural-muted text-base leading-relaxed">
            Select your service, choose a preferred date, and request a mobile booking. We bring the equipment to you!
          </p>
        </div>

        {/* Booking Card */}
        <div className="bg-natural-bg rounded-[40px] border border-natural-border overflow-hidden">
          
          {/* Form Step Indicators */}
          {step < 4 && (
            <div id="booking-steps-bar" className="bg-natural-dark text-natural-bg px-6 py-5 flex justify-between items-center text-xs sm:text-sm font-semibold tracking-wider">
              <div className="flex items-center space-x-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 1 ? 'bg-natural-terracotta text-natural-bg font-bold' : 'bg-natural-cream/10 text-natural-sage/50'}`}>1</span>
                <span>Select Service</span>
              </div>
              <div className="h-[1px] bg-natural-cream/10 flex-1 mx-4 hidden sm:block" />
              <div className="flex items-center space-x-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 2 ? 'bg-natural-terracotta text-natural-bg font-bold' : 'bg-natural-cream/10 text-natural-sage/50'}`}>2</span>
                <span>Date & Time</span>
              </div>
              <div className="h-[1px] bg-natural-cream/10 flex-1 mx-4 hidden sm:block" />
              <div className="flex items-center space-x-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 3 ? 'bg-natural-terracotta text-natural-bg font-bold' : 'bg-natural-cream/10 text-natural-sage/50'}`}>3</span>
                <span>My Details</span>
              </div>
            </div>
          )}

          {/* Form Body */}
          <div className="p-6 sm:p-10 text-left">
            {step === 1 && (
              <div id="booking-step-1" className="space-y-6 animate-fadeIn">
                <div className="space-y-2 max-w-xl">
                  <label className="text-xs font-bold text-natural-dark uppercase tracking-wider block">Select Service Type</label>
                  <select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    id="select-booking-service"
                    className="w-full bg-natural-cream/30 border border-natural-border rounded-xl px-4 py-3 text-natural-dark font-medium focus:ring-1 focus:ring-natural-sage focus:outline-hidden"
                  >
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.id} className="text-natural-dark bg-natural-bg">{s.name}</option>
                    ))}
                  </select>
                  {currentService && (
                    <p className="text-xs text-natural-muted pt-1">
                      {currentService.description}
                    </p>
                  )}
                </div>

                {/* Step navigation bar */}
                <div className="pt-6 border-t border-natural-border flex justify-end">
                  <button
                    onClick={handleNext}
                    className="bg-natural-dark hover:bg-natural-sage text-natural-bg font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-widest flex items-center space-x-2 cursor-pointer transition-colors"
                  >
                    <span>Choose Date & Time</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div id="booking-step-2" className="space-y-6 animate-fadeIn text-left">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Date Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-natural-dark uppercase tracking-wider flex items-center space-x-1.5">
                      <Calendar className="w-4 h-4 text-natural-terracotta" />
                      <span>Select Preferred Date</span>
                    </label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-natural-cream/30 border border-natural-border rounded-xl px-4 py-3 text-natural-dark font-semibold focus:ring-1 focus:ring-natural-sage focus:outline-hidden"
                    />
                    <p className="text-[10px] text-natural-muted font-bold uppercase tracking-wider">We operate 7 days a week including public holidays.</p>
                  </div>

                  {/* Time slot */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-natural-dark uppercase tracking-wider flex items-center space-x-1.5">
                      <Clock className="w-4 h-4 text-natural-terracotta" />
                      <span>Select Arrival Window</span>
                    </label>
                    <div className="space-y-2">
                      {[
                        { id: 'Morning (08:00 - 11:00)', label: 'Morning Slot', desc: '08:00 to 11:00 arrival' },
                        { id: 'Midday (11:00 - 14:00)', label: 'Midday Slot', desc: '11:00 to 14:00 arrival' },
                        { id: 'Afternoon (14:00 - 17:00)', label: 'Afternoon Slot', desc: '14:00 to 17:00 arrival' }
                      ].map(slot => (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setTimeSlot(slot.id)}
                          className={`w-full p-3.5 rounded-xl border-2 text-left flex justify-between items-center transition-colors cursor-pointer ${timeSlot === slot.id ? 'border-natural-sage bg-natural-sage/10 text-natural-dark font-bold' : 'border-natural-border text-natural-muted bg-natural-cream/30 hover:bg-natural-cream/50'}`}
                        >
                          <div>
                            <span className="text-xs font-bold block uppercase tracking-wider">{slot.label}</span>
                            <span className="text-[11px] text-natural-muted font-medium">{slot.desc}</span>
                          </div>
                          {timeSlot === slot.id && <span className="w-2.5 h-2.5 bg-natural-terracotta rounded-full" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-natural-border flex justify-between">
                  <button
                    onClick={handleBack}
                    className="border border-natural-border hover:bg-natural-cream text-natural-dark font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-widest flex items-center space-x-1 cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!bookingDate}
                    className="bg-natural-dark hover:bg-natural-sage text-natural-bg font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-widest flex items-center space-x-1 cursor-pointer disabled:opacity-50 transition-colors"
                  >
                    <span>Customer Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={handleSubmitBooking} id="booking-step-3" className="space-y-6 animate-fadeIn">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Customer Contact */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-natural-terracotta uppercase tracking-widest flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Contact Info</span>
                    </h4>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-natural-dark uppercase tracking-wider block">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Lerato Moremi"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-natural-cream/30 border border-natural-border rounded-xl px-4 py-2.5 text-natural-dark text-sm focus:ring-1 focus:ring-natural-sage focus:outline-hidden"
                      />
                      {customerName.trim().length > 0 && customerName.trim().length < 2 && (
                        <p className="text-[10px] text-natural-terracotta">Name must be at least 2 characters.</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-natural-dark uppercase tracking-wider block">WhatsApp / Cell Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 079 603 2672"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-natural-cream/30 border border-natural-border rounded-xl px-4 py-2.5 text-natural-dark text-sm focus:ring-1 focus:ring-natural-sage focus:outline-hidden"
                      />
                      {customerPhone.trim().length > 0 && customerPhone.trim().length < 5 && (
                        <p className="text-[10px] text-natural-terracotta">WhatsApp/phone number must be at least 5 digits.</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-natural-dark uppercase tracking-wider block">Email Address (Optional)</label>
                      <input
                        type="email"
                        placeholder="e.g. name@example.co.za"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full bg-natural-cream/30 border border-natural-border rounded-xl px-4 py-2.5 text-natural-dark text-sm focus:ring-1 focus:ring-natural-sage focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Location Area & Address */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-natural-terracotta uppercase tracking-widest flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>Service Location</span>
                    </h4>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-natural-dark uppercase tracking-wider block">Gauteng Region Area *</label>
                      <select
                        value={locationCity}
                        onChange={(e) => setLocationCity(e.target.value as any)}
                        className="w-full bg-natural-cream/30 border border-natural-border rounded-xl px-4 py-2.5 text-natural-dark text-sm font-medium focus:ring-1 focus:ring-natural-sage focus:outline-hidden"
                      >
                        <option value="Pretoria" className="text-natural-dark bg-natural-bg">Pretoria (PTA)</option>
                        <option value="Johannesburg" className="text-natural-dark bg-natural-bg">Johannesburg (JHB)</option>
                        <option value="Centurion" className="text-natural-dark bg-natural-bg">Centurion</option>
                        <option value="Midrand" className="text-natural-dark bg-natural-bg">Midrand</option>
                        <option value="Other Gauteng" className="text-natural-dark bg-natural-bg">Other Gauteng Area</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-natural-dark uppercase tracking-wider block">Street Address *</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="e.g. 142 Boundary Road, Sandton / Garsfontein"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-natural-cream/30 border border-natural-border rounded-xl px-4 py-2 text-natural-dark text-sm focus:ring-1 focus:ring-natural-sage focus:outline-hidden"
                      />
                      {address.trim().length > 0 && address.trim().length < 4 && (
                        <p className="text-[10px] text-natural-terracotta">Please enter a valid street address (minimum 4 characters).</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Special directions */}
                <div className="pt-2 space-y-2">
                  <label className="text-xs font-bold text-natural-dark uppercase tracking-wider block">Special Instructions / Stain Details</label>
                  <input
                    type="text"
                    placeholder="e.g. Heavy coffee stains on passenger seat / red wine spill on the white sofa"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-natural-cream/30 border border-natural-border rounded-xl px-4 py-2.5 text-natural-dark text-sm focus:ring-1 focus:ring-natural-sage focus:outline-hidden"
                  />
                </div>

                {/* Validation helper notice */}
                {!isStepValid() && (
                  <div className="p-3 bg-natural-terracotta/5 border border-natural-terracotta/20 rounded-xl text-center text-xs text-natural-terracotta font-medium animate-fadeIn">
                    * Please fill out Your Full Name, WhatsApp/Cell number, and Street Address to enable the Confirm Booking button.
                  </div>
                )}

                {/* Submit Footer */}
                <div className="pt-6 border-t border-natural-border flex justify-between items-center">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="border border-natural-border hover:bg-natural-cream text-natural-dark font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!isStepValid()}
                    className="bg-natural-dark hover:bg-natural-sage text-natural-bg font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-widest shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            )}

            {step === 4 && finishedBooking && (
              <div id="booking-success" className="text-center py-6 space-y-6 animate-scaleIn">
                <div className="w-16 h-16 bg-natural-sage/15 rounded-full flex items-center justify-center mx-auto text-natural-sage">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-3xl font-light font-serif text-natural-dark leading-tight">
                    Booking Request Sent!
                  </h3>
                  <div className="inline-block bg-natural-dark text-natural-bg font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-widest">
                    TICKET: {finishedBooking.id}
                  </div>
                  <p className="text-natural-muted text-sm max-w-md mx-auto pt-2">
                    Thank you, <strong className="text-natural-dark">{finishedBooking.customerName}</strong>! Your booking has been registered in our mobile dispatch queue.
                  </p>
                </div>

                {/* Summary Box */}
                <div className="bg-natural-cream/30 border border-natural-border rounded-[24px] p-5 max-w-md mx-auto text-sm text-left space-y-3">
                  <div className="flex justify-between border-b border-natural-border/50 pb-2">
                    <span className="font-bold uppercase tracking-wider text-[10px] text-natural-muted">Service:</span>
                    <span className="font-bold text-natural-dark">{finishedBooking.serviceName}</span>
                  </div>
                  <div className="flex justify-between border-b border-natural-border/50 pb-2">
                    <span className="font-bold uppercase tracking-wider text-[10px] text-natural-muted">Schedule:</span>
                    <span className="font-bold text-natural-dark">{finishedBooking.date} • {finishedBooking.timeSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold uppercase tracking-wider text-[10px] text-natural-muted">Address:</span>
                    <span className="font-bold text-natural-dark text-right max-w-[200px] truncate" title={finishedBooking.address}>{finishedBooking.address} ({finishedBooking.locationCity})</span>
                  </div>
                </div>

                <div className="p-4 bg-natural-sage/10 border border-natural-border rounded-xl text-xs text-natural-dark max-w-md mx-auto font-medium leading-relaxed">
                  💡 <strong>Next Step</strong>: Our Gauteng booking manager will message or call you on <span className="font-bold">{finishedBooking.customerPhone}</span> to confirm your slot and finalize the arrival coordinate.
                </div>

                <div className="space-y-3 max-w-md mx-auto">
                  <a
                    href={`mailto:dmholdings.clean@gmail.com?subject=New Booking Request: ${encodeURIComponent(finishedBooking.serviceName)} (${encodeURIComponent(finishedBooking.date)})&body=Hello DM Holdings,%0D%0AI would like to submit a mobile detailing/cleaning booking with the following details:%0D%0D- Ticket ID: ${encodeURIComponent(finishedBooking.id)}%0D- Service: ${encodeURIComponent(finishedBooking.serviceName)}%0D- Date: ${encodeURIComponent(finishedBooking.date)}%0D- Time Slot: ${encodeURIComponent(finishedBooking.timeSlot)}%0D- Customer Name: ${encodeURIComponent(finishedBooking.customerName)}%0D- Phone: ${encodeURIComponent(finishedBooking.customerPhone)}%0D- Email: ${encodeURIComponent(finishedBooking.customerEmail)}%0D- Location City: ${encodeURIComponent(finishedBooking.locationCity)}%0D- Address: ${encodeURIComponent(finishedBooking.address)}%0D- Notes: ${encodeURIComponent(finishedBooking.notes || 'None')}%0D%0DPlease confirm my appointment!`}
                    className="inline-flex items-center justify-center space-x-2 bg-natural-terracotta hover:bg-natural-terracotta/90 text-natural-bg font-bold px-6 py-4 rounded-full text-xs uppercase tracking-widest shadow-md transition-all w-full text-center"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Booking via Email</span>
                  </a>

                  <button
                    onClick={handleResetForm}
                    className="w-full bg-natural-dark hover:bg-natural-sage text-natural-bg font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    Book Another Service
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
