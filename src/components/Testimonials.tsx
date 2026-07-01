import { useState, useEffect, FormEvent } from 'react';
import { TESTIMONIALS } from '../data';
import { Testimonial } from '../types';
import { Star, MessageSquareQuote, CheckCircle, Sparkles } from 'lucide-react';

export default function Testimonials() {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formService, setFormService] = useState('Car Cleaning');
  const [formText, setFormText] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // Load reviews from localStorage
  useEffect(() => {
    try {
      const savedReviewsStr = localStorage.getItem('dm_reviews');
      if (savedReviewsStr) {
        const savedReviews = JSON.parse(savedReviewsStr);
        setReviews(savedReviews);
      } else {
        setReviews([]);
      }
    } catch (e) {
      setReviews([]);
    }
  }, []);

  const handleSubmitReview = (e: FormEvent) => {
    e.preventDefault();
    if (!formName || !formText) return;

    const newReview: Testimonial = {
      id: `rev-${Date.now()}`,
      name: formName,
      role: 'Client Review',
      location: formLocation || 'Gauteng, ZA',
      rating: formRating,
      text: formText,
      serviceUsed: formService,
      date: new Date().toISOString().split('T')[0]
    };

    try {
      const savedReviewsStr = localStorage.getItem('dm_reviews');
      const savedReviews = savedReviewsStr ? JSON.parse(savedReviewsStr) : [];
      const updatedSavedReviews = [newReview, ...savedReviews];
      localStorage.setItem('dm_reviews', JSON.stringify(updatedSavedReviews));
      
      setReviews(prev => [newReview, ...prev]);
      setFormSuccess(true);
      setTimeout(() => {
        setFormSuccess(false);
        setShowReviewForm(false);
        // Reset
        setFormName('');
        setFormLocation('');
        setFormRating(5);
        setFormText('');
      }, 3000);
    } catch (err) {
      console.error('Error saving review:', err);
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-natural-cream/30 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center space-x-1.5 bg-natural-cream border border-natural-border text-natural-dark px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
              <MessageSquareQuote className="w-3.5 h-3.5 text-natural-terracotta" />
              <span>Client Voices</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-light text-natural-dark tracking-tight font-serif leading-tight">
              What Our Happy <span className="italic text-natural-terracotta">Clients Say</span>
            </h2>
            <div className="w-16 h-[1px] bg-natural-sage" />
            <p className="text-natural-muted text-base leading-relaxed">
              We take pride in our "WE CLEAN, YOU ENJOY!" promise. Check out recent testimonials from homeowners, car collectors, and property tenants across PTA and JHB.
            </p>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-natural-dark hover:bg-natural-sage text-natural-bg font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-full shadow-xs transition-all shrink-0 cursor-pointer"
          >
            {showReviewForm ? 'Cancel Review' : 'Write a Review'}
          </button>
        </div>

        {/* Review Form Area */}
        {showReviewForm && (
          <div className="bg-natural-bg rounded-[32px] border border-natural-border shadow-xs p-6 sm:p-10 mb-12 max-w-2xl mx-auto animate-fadeIn text-left">
            {formSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 bg-natural-sage/15 rounded-full flex items-center justify-center mx-auto text-natural-sage">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-light font-serif text-natural-dark">Review Submitted!</h3>
                <p className="text-natural-muted text-sm">Thank you for sharing your feedback with the Gauteng community!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <h3 className="text-xl font-bold font-serif text-natural-dark flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-natural-terracotta" />
                  <span>Share Your DM Experience</span>
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-natural-muted uppercase tracking-wider">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lerato Moremi"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-natural-cream/40 border border-natural-border rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-natural-sage focus:outline-hidden text-natural-dark"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-natural-muted uppercase tracking-wider">Your Location *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sandton, JHB"
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                      className="w-full bg-natural-cream/40 border border-natural-border rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-natural-sage focus:outline-hidden text-natural-dark"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-natural-muted uppercase tracking-wider">Service Used</label>
                    <select
                      value={formService}
                      onChange={(e) => setFormService(e.target.value)}
                      className="w-full bg-natural-cream/40 border border-natural-border rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-natural-sage focus:outline-hidden text-natural-dark"
                    >
                      <option value="Car Cleaning" className="text-natural-dark bg-natural-bg">Car Cleaning</option>
                      <option value="Sofa & Chairs Cleaning" className="text-natural-dark bg-natural-bg">Sofa & Chairs Cleaning</option>
                      <option value="Car Polishing" className="text-natural-dark bg-natural-bg">Car Polishing</option>
                      <option value="Carpet Cleaning" className="text-natural-dark bg-natural-bg">Carpet Cleaning</option>
                      <option value="Bed Cleaning" className="text-natural-dark bg-natural-bg">Bed Cleaning</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-natural-muted uppercase tracking-wider">Rating Score</label>
                    <div className="flex items-center space-x-2 py-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormRating(star)}
                          className="text-natural-terracotta focus:outline-hidden"
                        >
                          <Star className={`w-6 h-6 cursor-pointer ${formRating >= star ? 'fill-natural-terracotta' : 'text-natural-border'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-natural-muted uppercase tracking-wider">Your Comments *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell others what you think about our service quality, speed, or team..."
                    value={formText}
                    onChange={(e) => setFormText(e.target.value)}
                    className="w-full bg-natural-cream/40 border border-natural-border rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-natural-sage focus:outline-hidden text-natural-dark"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="bg-natural-dark hover:bg-natural-sage text-natural-bg font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Testimonials Grid */}
        {reviews.length === 0 ? (
          <div className="bg-natural-bg rounded-3xl p-10 border border-dashed border-natural-border/85 text-center max-w-xl mx-auto space-y-4 shadow-xs animate-fadeIn">
            <div className="w-12 h-12 bg-natural-cream border border-natural-border rounded-full flex items-center justify-center mx-auto text-natural-terracotta">
              <Star className="w-5 h-5 fill-natural-terracotta" />
            </div>
            <h3 className="text-xl font-light font-serif text-natural-dark">No Client Reviews Yet</h3>
            <p className="text-natural-muted text-sm leading-relaxed max-w-sm mx-auto">
              Be the very first to share your experience with DM Holdings! Click the button above to write a review.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-natural-bg rounded-2xl p-8 border border-natural-border/80 shadow-xs hover:shadow-md hover:border-natural-sage/30 transition-all flex flex-col justify-between space-y-6 text-left relative overflow-hidden"
              >
                {/* Quote quotation mark background */}
                <span className="absolute top-2 right-4 text-natural-cream text-8xl font-serif select-none pointer-events-none opacity-80">”</span>

                <div className="space-y-4">
                  {/* Rating stars */}
                  <div className="flex space-x-0.5 text-natural-terracotta">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < rev.rating ? 'fill-natural-terracotta text-natural-terracotta' : 'text-natural-border'}`}
                      />
                    ))}
                  </div>

                  {/* Feed back text */}
                  <p className="text-natural-muted text-sm leading-relaxed italic font-light relative z-10">
                    “{rev.text}”
                  </p>
                </div>

                {/* Client Info Footer */}
                <div className="pt-4 border-t border-natural-border/60 flex justify-between items-center text-xs">
                  <div>
                    <h4 className="font-semibold text-natural-dark font-serif text-base">{rev.name}</h4>
                    <p className="text-natural-muted font-medium mt-0.5">{rev.location}</p>
                  </div>
                  <div className="bg-natural-cream text-natural-dark border border-natural-border/50 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {rev.serviceUsed}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
