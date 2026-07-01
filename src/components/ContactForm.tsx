import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { ContactSubmission } from '../types';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;

    const newSubmission: ContactSubmission = {
      id: `CON-${Math.floor(100000 + Math.random() * 900000)}`,
      name,
      email: email || 'No Email Provided',
      phone,
      subject,
      message,
      status: 'Unread',
      createdAt: new Date().toISOString()
    };

    try {
      const existingSubmissionsStr = localStorage.getItem('dm_contacts');
      const existingSubmissions = existingSubmissionsStr ? JSON.parse(existingSubmissionsStr) : [];
      existingSubmissions.unshift(newSubmission);
      localStorage.setItem('dm_contacts', JSON.stringify(existingSubmissions));
    } catch (err) {
      console.error('Error saving contact to localStorage:', err);
    }

    setIsSuccess(true);
    // Reset
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    
    // Auto clear success in 6 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 6000);
  };

  return (
    <section id="contact" className="py-24 bg-natural-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-natural-cream border border-natural-border text-natural-dark px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
            <MessageSquare className="w-3.5 h-3.5 text-natural-terracotta" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-light text-natural-dark tracking-tight font-serif leading-tight">
            Contact DM Holdings <span className="italic text-natural-terracotta">Today!</span>
          </h2>
          <div className="w-16 h-[1px] bg-natural-sage mx-auto" />
          <p className="text-natural-muted text-base leading-relaxed">
            Have questions about pricing, bulk commercial contracts, or coordinate requirements? Drop us a line or call our booking managers directly!
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Left Column - Contact Details */}
          <div className="lg:col-span-5 flex flex-col space-y-8 text-left bg-natural-dark text-natural-bg p-8 sm:p-10 rounded-[32px] shadow-sm relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-natural-sage/10 rounded-full blur-2xl -mr-10 -mt-10" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-natural-terracotta/5 rounded-full blur-3xl -ml-20 -mb-20" />

            <div className="relative space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-natural-terracotta">Gauteng’s Mobile Specialists</span>
              <h3 className="text-3xl font-light font-serif text-natural-bg">We Come to You!</h3>
              <p className="text-sm text-natural-sage leading-relaxed opacity-90">
                You relax, we do the rest! Our mobile deep steam and detailing vans serve homeowners and corporate offices across Johannesburg and Pretoria.
              </p>
            </div>

            {/* Infor Cards */}
            <div className="relative space-y-6 flex-1 pt-4">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-natural-cream/10 text-natural-terracotta rounded-xl">
                  <Phone className="w-5 h-5 shrink-0" />
                </div>
                <div>
                  <h4 className="text-[9px] font-bold text-natural-terracotta uppercase tracking-widest leading-none mb-1.5">Call / WhatsApp</h4>
                  <p className="text-base font-bold text-natural-bg leading-tight">
                    <a href="tel:0796032672" className="hover:underline">079 603 2672</a>
                  </p>
                  <p className="text-base font-bold text-natural-bg leading-tight mt-1.5">
                    <a href="https://wa.me/27767876326" target="_blank" rel="noreferrer" className="hover:underline">+27 76 787 6326</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-natural-cream/10 text-natural-terracotta rounded-xl">
                  <MapPin className="w-5 h-5 shrink-0" />
                </div>
                <div>
                  <h4 className="text-[9px] font-bold text-natural-terracotta uppercase tracking-widest leading-none mb-1.5">Service Area</h4>
                  <p className="text-sm font-semibold text-natural-bg">Gauteng, PTA, JHB, Centurion, Midrand, and surrounding nodes</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-natural-cream/10 text-natural-terracotta rounded-xl">
                  <Clock className="w-5 h-5 shrink-0" />
                </div>
                <div>
                  <h4 className="text-[9px] font-bold text-natural-terracotta uppercase tracking-widest leading-none mb-1.5">Business Hours</h4>
                  <p className="text-sm font-semibold text-natural-bg">Monday - Sunday: 07:00 - 18:00</p>
                  <p className="text-[10px] text-natural-sage">Open on public holidays</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-natural-cream/10 text-natural-terracotta rounded-xl">
                  <Mail className="w-5 h-5 shrink-0" />
                </div>
                <div>
                  <h4 className="text-[9px] font-bold text-natural-terracotta uppercase tracking-widest leading-none mb-1.5">Email Inquiry</h4>
                  <p className="text-sm font-semibold text-natural-bg">
                    <a href="mailto:dmholdings.clean@gmail.com" className="hover:text-natural-terracotta transition-colors">dmholdings.clean@gmail.com</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Bullet note bottom */}
            <div className="relative pt-6 border-t border-natural-cream/10 text-xs text-natural-sage font-bold uppercase tracking-wider flex items-center space-x-2">
              <span className="w-2 h-2 bg-natural-sage rounded-full animate-pulse" />
              <span>Response time: Under 30 minutes!</span>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-7 bg-natural-cream/30 border border-natural-border rounded-[32px] p-8 sm:p-10 shadow-xs text-left">
            {isSuccess ? (
              <div className="text-center py-12 space-y-4 animate-scaleIn">
                <div className="w-16 h-16 bg-natural-sage/15 rounded-full flex items-center justify-center mx-auto text-natural-sage">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-light font-serif text-natural-dark">Message Delivered!</h3>
                <p className="text-natural-muted text-sm max-w-sm mx-auto">
                  Thank you! Your message has been routed to our Gauteng mobile response managers. We will phone or WhatsApp you within the hour.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="bg-natural-dark hover:bg-natural-sage text-natural-bg font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-bold font-serif text-natural-dark">Send an Online Message</h3>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-natural-muted uppercase tracking-wider">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lerato Moremi"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-natural-bg border border-natural-border rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-natural-sage focus:outline-hidden text-natural-dark"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-natural-muted uppercase tracking-wider">WhatsApp / Call Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 079 603 2672"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-natural-bg border border-natural-border rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-natural-sage focus:outline-hidden text-natural-dark"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-natural-muted uppercase tracking-wider">Email (Optional)</label>
                    <input
                      type="email"
                      placeholder="e.g. name@example.co.za"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-natural-bg border border-natural-border rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-natural-sage focus:outline-hidden text-natural-dark"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-natural-muted uppercase tracking-wider">Subject / Purpose</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-natural-bg border border-natural-border rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-natural-sage focus:outline-hidden text-natural-dark"
                    >
                      <option value="General Inquiry" className="text-natural-dark bg-natural-bg">General Inquiry</option>
                      <option value="Corporate / Office Cleaning Quote" className="text-natural-dark bg-natural-bg">Corporate / Office Contract</option>
                      <option value="Bulk Fleets Booking" className="text-natural-dark bg-natural-bg">Bulk Fleet Detailing</option>
                      <option value="Urgent Stain Remediation" className="text-natural-dark bg-natural-bg">Urgent Stain Help</option>
                      <option value="Other Topic" className="text-natural-dark bg-natural-bg">Other Topic</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-natural-muted uppercase tracking-wider">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your furniture, car detailing needs, or stains you need us to remove..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-natural-bg border border-natural-border rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-natural-sage focus:outline-hidden text-natural-dark"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-natural-dark hover:bg-natural-sage text-natural-bg font-bold py-4 rounded-full text-xs uppercase tracking-widest transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xs hover:shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message Online</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
