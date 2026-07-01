export interface Service {
  id: string;
  name: string;
  category: 'car' | 'furniture' | 'carpet' | 'mattress';
  description: string;
  details: string[];
  basePrice: number;
  priceUnit: string;
  image: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  additionalServices: string[];
  totalPrice: number;
  date: string;
  timeSlot: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  locationCity: 'Pretoria' | 'Johannesburg' | 'Midrand' | 'Centurion' | 'Other Gauteng';
  address: string;
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'Unread' | 'Read' | 'Replied';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  text: string;
  serviceUsed: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'car' | 'upholstery' | 'carpet' | 'mattress';
  beforeImage: string;
  afterImage: string;
  description: string;
}
