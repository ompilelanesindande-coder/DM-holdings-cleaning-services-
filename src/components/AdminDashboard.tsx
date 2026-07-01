import { useState, useEffect } from 'react';
import { Booking, ContactSubmission } from '../types';
import { ShieldCheck, CalendarCheck2, Users, Receipt, CircleAlert, Search, RefreshCw, CheckCircle, Ban, Trash2, MailOpen, BarChart3, Star } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'bookings' | 'contacts' | 'analytics'>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Initial trigger for load / reload
  const loadData = () => {
    try {
      // Bookings load
      const savedBookingsStr = localStorage.getItem('dm_bookings');
      if (savedBookingsStr) {
        setBookings(JSON.parse(savedBookingsStr));
      } else {
        setBookings([]);
      }

      // Contacts load
      const savedContactsStr = localStorage.getItem('dm_contacts');
      if (savedContactsStr) {
        setContacts(JSON.parse(savedContactsStr));
      } else {
        setContacts([]);
      }
    } catch (err) {
      console.error('Error loading admin data:', err);
    }
  };

  useEffect(() => {
    loadData();
    // Set listener for storage updates (e.g. user makes booking)
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  // Update a booking status in storage
  const handleUpdateBookingStatus = (bookingId: string, newStatus: Booking['status']) => {
    const updated = bookings.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: newStatus };
      }
      return b;
    });
    setBookings(updated);
    try {
      localStorage.setItem('dm_bookings', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Delete a booking
  const handleDeleteBooking = (bookingId: string) => {
    if (!window.confirm('Are you sure you want to delete this booking record?')) return;
    const filtered = bookings.filter(b => b.id !== bookingId);
    setBookings(filtered);
    try {
      localStorage.setItem('dm_bookings', JSON.stringify(filtered));
    } catch (e) {
      console.error(e);
    }
  };

  // Update contact status
  const handleUpdateContactStatus = (contactId: string, newStatus: ContactSubmission['status']) => {
    const updated = contacts.map(c => {
      if (c.id === contactId) {
        return { ...c, status: newStatus };
      }
      return c;
    });
    setContacts(updated);
    try {
      localStorage.setItem('dm_contacts', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Delete contact submission
  const handleDeleteContact = (contactId: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    const filtered = contacts.filter(c => c.id !== contactId);
    setContacts(filtered);
    try {
      localStorage.setItem('dm_contacts', JSON.stringify(filtered));
    } catch (e) {
      console.error(e);
    }
  };

  // Filter lists based on query
  const filteredBookings = bookings.filter(b => 
    b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.customerPhone.includes(searchQuery) ||
    b.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery) ||
    c.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Statistics Calculation
  const totalRevenue = bookings
    .filter(b => b.status === 'Completed' || b.status === 'Confirmed')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
  const completedBookingsCount = bookings.filter(b => b.status === 'Completed').length;

  return (
    <section id="admin-panel" className="py-24 bg-natural-dark text-natural-bg/90 border-t border-natural-cream/10 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Title & Top Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-natural-cream/10 pb-8 mb-8 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 bg-natural-cream/10 text-natural-terracotta border border-natural-cream/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DM Holdings Administrative Mode</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-natural-bg tracking-tight font-serif">Business Owner Portal</h2>
            <p className="text-xs sm:text-sm text-natural-sage leading-relaxed max-w-2xl">
              Interactive workspace mapping real-time submissions from custom localStorage queues. Try booking a service to watch it appear here instantly!
            </p>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={loadData}
              className="flex items-center space-x-1.5 bg-natural-cream/10 hover:bg-natural-cream/20 text-natural-bg font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-full border border-natural-cream/10 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reload Queues</span>
            </button>
          </div>
        </div>

        {/* KPI Dashboard Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          
          <div className="bg-natural-cream/5 border border-natural-cream/10 rounded-2xl p-5 flex items-center space-x-4">
            <div className="p-3 bg-natural-cream/10 text-natural-terracotta rounded-xl">
              <Receipt className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-natural-sage block tracking-wider mb-1">Total Bookings</span>
              <span className="text-2xl font-semibold text-natural-bg font-serif">{bookings.length} Jobs</span>
            </div>
          </div>

          <div className="bg-natural-cream/5 border border-natural-cream/10 rounded-2xl p-5 flex items-center space-x-4">
            <div className="p-3 bg-natural-cream/10 text-natural-terracotta rounded-xl">
              <CircleAlert className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-natural-sage block tracking-wider mb-1">Pending Action</span>
              <span className="text-2xl font-semibold text-natural-terracotta font-serif">{pendingBookings} Jobs</span>
            </div>
          </div>

          <div className="bg-natural-cream/5 border border-natural-cream/10 rounded-2xl p-5 flex items-center space-x-4">
            <div className="p-3 bg-natural-cream/10 text-natural-sage rounded-xl">
              <CalendarCheck2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-natural-sage block tracking-wider mb-1">Completed Jobs</span>
              <span className="text-2xl font-semibold text-natural-sage font-serif">{completedBookingsCount} Jobs</span>
            </div>
          </div>

          <div className="bg-natural-cream/5 border border-natural-cream/10 rounded-2xl p-5 flex items-center space-x-4">
            <div className="p-3 bg-natural-cream/10 text-natural-bg rounded-xl">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-natural-sage block tracking-wider mb-1">Contact Queries</span>
              <span className="text-2xl font-semibold text-natural-bg font-serif">{contacts.length} Messages</span>
            </div>
          </div>

        </div>

        {/* Search and Tabs Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 border-b border-natural-cream/10 pb-4 mb-6">
          {/* Tabs */}
          <div className="flex bg-natural-cream/5 border border-natural-cream/10 p-1 rounded-full w-fit">
            {[
              { id: 'bookings', label: 'Booking Requests' },
              { id: 'contacts', label: 'Contact Inquiries' },
              { id: 'analytics', label: 'Overview Metrics' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-natural-cream text-natural-dark shadow-xs'
                    : 'text-natural-sage hover:text-natural-bg'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          {activeTab !== 'analytics' && (
            <div className="relative max-w-xs w-full">
              <input
                type="text"
                placeholder="Search queries/customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-natural-cream/5 text-natural-bg rounded-full pl-9 pr-4 py-2.5 text-xs border border-natural-cream/10 focus:outline-hidden focus:ring-1 focus:ring-natural-sage placeholder:text-natural-sage/55"
              />
              <Search className="absolute left-3.5 top-3 w-3.5 h-3.5 text-natural-sage" />
            </div>
          )}
        </div>

        {/* Tab Body - Bookings List */}
        {activeTab === 'bookings' && (
          <div id="admin-bookings-tab" className="space-y-4">
            {filteredBookings.length === 0 ? (
              <div className="text-center py-12 bg-natural-cream/5 rounded-2xl border border-natural-cream/10">
                <p className="text-natural-sage text-sm">No bookings found in this database queue.</p>
                <p className="text-xs text-natural-sage/60 mt-1">Try submitting an online booking from the booking widget above!</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredBookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-natural-cream/5 border border-natural-cream/10 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-natural-cream/20 transition-all"
                  >
                    {/* Customer Core */}
                    <div className="space-y-2 text-left flex-1">
                      <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
                        <span className="font-semibold text-natural-bg text-lg font-serif">{b.customerName}</span>
                        <span className="bg-natural-cream/10 text-natural-sage font-mono text-[9px] px-2 py-0.5 rounded uppercase tracking-wider">{b.id}</span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          b.status === 'Completed' ? 'bg-natural-sage/25 text-natural-sage border border-natural-sage/20' :
                          b.status === 'Confirmed' ? 'bg-natural-cream/15 text-natural-bg border border-natural-cream/20' :
                          b.status === 'Cancelled' ? 'bg-natural-terracotta/20 text-natural-terracotta border border-natural-terracotta/20' :
                          'bg-natural-cream/25 text-natural-bg/90 animate-pulse border border-natural-cream/20'
                        }`}>{b.status}</span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-1 gap-x-4 text-xs text-natural-sage/90">
                        <p>📞 Phone: <strong className="text-natural-bg font-medium">{b.customerPhone}</strong></p>
                        <p>📍 Location: <strong className="text-natural-bg font-medium">{b.address} ({b.locationCity})</strong></p>
                        <p>📅 Schedule: <strong className="text-natural-bg font-medium">{b.date} • {b.timeSlot}</strong></p>
                        <p className="col-span-2">🧼 Service: <strong className="text-natural-terracotta font-serif font-semibold text-sm">{b.serviceName}</strong></p>
                      </div>

                      {b.additionalServices.length > 0 && (
                        <div className="text-[11px] text-natural-sage flex items-center space-x-1 flex-wrap gap-1">
                          <span>➕ Addons:</span>
                          {b.additionalServices.map((add, idx) => (
                            <span key={idx} className="bg-natural-cream/10 text-natural-bg px-2 py-0.5 rounded font-medium text-[10px]">{add}</span>
                          ))}
                        </div>
                      )}

                      {b.notes && (
                        <p className="text-xs bg-natural-cream/5 text-natural-sage p-2.5 rounded-xl border border-natural-cream/5 max-w-xl italic">
                          📝 Notes: "{b.notes}"
                        </p>
                      )}
                    </div>

                    {/* Status actions */}
                    <div className="flex md:flex-col items-end gap-3 justify-end w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-natural-cream/10">

                      {/* Dropdown status modifier */}
                      <div className="flex items-center space-x-2">
                        <select
                          value={b.status}
                          onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value as any)}
                          className="bg-natural-dark text-xs border border-natural-cream/10 rounded-xl px-2.5 py-1.5 text-natural-bg font-semibold focus:outline-hidden"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>

                        <button
                          onClick={() => handleDeleteBooking(b.id)}
                          className="text-natural-sage hover:text-natural-terracotta p-1.5 rounded-lg hover:bg-natural-cream/10 transition-colors"
                          title="Delete booking record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Body - Contacts list */}
        {activeTab === 'contacts' && (
          <div id="admin-contacts-tab" className="space-y-4">
            {filteredContacts.length === 0 ? (
              <div className="text-center py-12 bg-natural-cream/5 rounded-2xl border border-natural-cream/10">
                <p className="text-natural-sage text-sm">No contact inquiries found in this queue.</p>
                <p className="text-xs text-natural-sage/60 mt-1">Submit a query from the Contact Form on this site to see it here!</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredContacts.map((c) => (
                  <div
                    key={c.id}
                    className="bg-natural-cream/5 border border-natural-cream/10 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start gap-4 hover:border-natural-cream/20 transition-all"
                  >
                    <div className="space-y-2 text-left flex-1">
                      <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
                        <span className="font-semibold text-natural-bg text-lg font-serif">{c.name}</span>
                        <span className="bg-natural-cream/10 text-natural-sage font-mono text-[9px] px-2 py-0.5 rounded">{c.id}</span>
                        <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full ${c.status === 'Read' ? 'bg-natural-cream/10 text-natural-sage' : 'bg-natural-cream/20 text-natural-bg animate-pulse'}`}>{c.status}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-y-1 text-xs text-natural-sage">
                        <p>📞 WhatsApp: <strong className="text-natural-bg font-medium">{c.phone}</strong></p>
                        <p>📧 Email: <strong className="text-natural-bg font-medium">{c.email}</strong></p>
                        <p className="col-span-2">🏷️ Topic: <strong className="text-natural-terracotta font-semibold">{c.subject}</strong></p>
                      </div>

                      <p className="text-xs bg-natural-cream/5 text-natural-sage p-3.5 rounded-xl border border-natural-cream/5 leading-relaxed font-sans max-w-2xl">
                        {c.message}
                      </p>
                    </div>

                    <div className="flex md:flex-col justify-between items-end gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-natural-cream/10 shrink-0">
                      <span className="text-[10px] text-natural-sage">{new Date(c.createdAt).toLocaleDateString()}</span>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUpdateContactStatus(c.id, c.status === 'Read' ? 'Unread' : 'Read')}
                          className="bg-natural-cream/5 border border-natural-cream/10 hover:bg-natural-cream/10 hover:border-natural-cream/20 text-natural-bg text-xs font-bold px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center space-x-1"
                        >
                          <MailOpen className="w-3.5 h-3.5" />
                          <span>{c.status === 'Read' ? 'Mark Unread' : 'Mark Read'}</span>
                        </button>

                        <button
                          onClick={() => handleDeleteContact(c.id)}
                          className="text-natural-sage hover:text-natural-terracotta p-2 rounded-lg hover:bg-natural-cream/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Body - Analytics */}
        {activeTab === 'analytics' && (
          <div id="admin-analytics-tab" className="bg-natural-cream/5 border border-natural-cream/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-light font-serif text-natural-bg flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-natural-terracotta" />
              <span>Gauteng Mobile Teams Dispatch Metrics</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-8 text-left">
              {/* Left chart - Booking Share */}
              <div className="bg-natural-dark border border-natural-cream/10 rounded-2xl p-5 space-y-4">
                <h4 className="text-xs font-bold text-natural-sage uppercase tracking-widest">Active Booking Statuses</h4>
                
                <div className="space-y-3">
                  {[
                    { label: 'Pending Action', count: bookings.filter(b => b.status === 'Pending').length, color: 'bg-natural-terracotta' },
                    { label: 'Confirmed Schedule', count: bookings.filter(b => b.status === 'Confirmed').length, color: 'bg-natural-cream' },
                    { label: 'Completed Jobs', count: bookings.filter(b => b.status === 'Completed').length, color: 'bg-natural-sage' },
                    { label: 'Cancelled', count: bookings.filter(b => b.status === 'Cancelled').length, color: 'opacity-40 bg-natural-sage' }
                  ].map((stat, idx) => {
                    const total = bookings.length || 1;
                    const percent = Math.round((stat.count / total) * 100);

                    return (
                      <div key={idx} className="space-y-1 text-xs">
                        <div className="flex justify-between font-semibold">
                          <span className="text-natural-sage">{stat.label}</span>
                          <span className="text-natural-bg">{stat.count} ({percent}%)</span>
                        </div>
                        <div className="w-full h-1.5 bg-natural-cream/10 rounded-full overflow-hidden">
                          <div className={`h-full ${stat.color} rounded-full`} style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right chart - Location Nodes */}
              <div className="bg-natural-dark border border-natural-cream/10 rounded-2xl p-5 space-y-4">
                <h4 className="text-xs font-bold text-natural-sage uppercase tracking-widest">Gauteng Service Nodes</h4>
                
                <div className="space-y-3">
                  {[
                    { label: 'Pretoria (PTA)', count: bookings.filter(b => b.locationCity === 'Pretoria').length, color: 'bg-natural-terracotta' },
                    { label: 'Johannesburg (JHB)', count: bookings.filter(b => b.locationCity === 'Johannesburg').length, color: 'bg-natural-cream' },
                    { label: 'Centurion Area', count: bookings.filter(b => b.locationCity === 'Centurion').length, color: 'bg-natural-sage' },
                    { label: 'Midrand Node', count: bookings.filter(b => b.locationCity === 'Midrand').length, color: 'opacity-65 bg-natural-sage' }
                  ].map((stat, idx) => {
                    const total = bookings.length || 1;
                    const percent = Math.round((stat.count / total) * 100);

                    return (
                      <div key={idx} className="space-y-1 text-xs">
                        <div className="flex justify-between font-semibold">
                          <span className="text-natural-sage">{stat.label}</span>
                          <span className="text-natural-bg">{stat.count} ({percent}%)</span>
                        </div>
                        <div className="w-full h-1.5 bg-natural-cream/10 rounded-full overflow-hidden">
                          <div className={`h-full ${stat.color} rounded-full`} style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-4 bg-natural-dark border border-natural-cream/5 rounded-xl text-xs text-natural-sage leading-relaxed text-left">
              📌 <strong>Administration Sandbox Guidance</strong>: This panel is pre-configured with direct persistence parameters. Business managers can run dispatch operations by reviewing incoming entries, updating status to "Confirmed" once contact is made, and logging completions. All calculations are performed dynamically.
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
