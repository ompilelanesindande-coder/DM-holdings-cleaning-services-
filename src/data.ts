import { Service, Testimonial, GalleryItem } from './types';

const carPolishingImage = '/src/assets/images/car_polishing_action_1782899094056.jpg';
const carpetCleaningImage = '/src/assets/images/carpet_cleaning_action_1782899287876.jpg';
const mattressCleaningImage = '/src/assets/images/mattress_cleaning_action_1782899424811.jpg';

export const SERVICES: Service[] = [
  {
    id: 'car-cleaning',
    name: 'Car Cleaning',
    category: 'car',
    description: 'Deep clean for a fresh and spotless ride. We wash, vacuum, and sanitize seats, dashboard, roof, doors, and floor carpets to absolute perfection.',
    details: [
      'Deep steam extraction of fabric seats',
      'Leather seat cleaning & conditioning',
      'Detailed dashboard & console scrubbing',
      'Roof lining delicate sanitization',
      'Boot vacuuming & deep wash',
      'Odour elimination & fresh scent application'
    ],
    basePrice: 300,
    priceUnit: 'vehicle',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sofa-cleaning',
    name: 'Sofa & Chairs Cleaning',
    category: 'furniture',
    description: 'Bring back freshness and remove deep dirt, tough stains, and stubborn odours from your lounge suites, office chairs, and dining chairs.',
    details: [
      'Stain pre-treatment & spot removal',
      'Deep chemical extraction of dirt & grime',
      'Odour neutralizing and sanitizing',
      'Fabric protection treatment (optional)',
      'Quick-dry suction process',
      'Friendly to pets and children'
    ],
    basePrice: 80,
    priceUnit: 'seat',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'car-polishing',
    name: 'Car Polishing',
    category: 'car',
    description: 'Restore shine, protect your car, and make it look brand new. We remove fine scratches, swirl marks, oxidation, and apply a premium glossy finish.',
    details: [
      'Clay bar treatment to remove paint contaminants',
      'Machine buffing with high-grade compounds',
      'Swirl mark & light scratch removal',
      'Deep high-gloss wax application',
      'Exterior plastic & trim restoration',
      'Long-lasting paint protection seal'
    ],
    basePrice: 300,
    priceUnit: 'vehicle',
    image: carPolishingImage
  },
  {
    id: 'carpet-cleaning',
    name: 'Carpet Cleaning',
    category: 'carpet',
    description: 'Remove deep-seated dirt, dust mites, tough stains, and allergens. Clean deeper, breathe easier, and live better with our specialized carpet steam-extraction.',
    details: [
      'High-power vacuuming of loose particles',
      'Industrial-strength steam-extraction cleaning',
      'Eco-friendly deep sanitizing shampoo',
      'Pet urine and stain remediation',
      'High-velocity moisture extraction for fast drying',
      'Restores carpet pile and vibrance'
    ],
    basePrice: 250,
    priceUnit: 'room',
    image: carpetCleaningImage
  },
  {
    id: 'bed-cleaning',
    name: 'Bed & Mattress Cleaning',
    category: 'mattress',
    description: 'Deep clean for a healthier sleep. We remove allergens, dust mites, dead skin, stubborn sweat stains, and bacteria from your mattresses.',
    details: [
      'UVC sanitation to kill bacteria & viruses',
      'High-pressure steam extraction',
      'Stain lifting & localized treatment',
      'Dust-mite extraction & barrier spray',
      'Deodorizer for fresh, deep sleep',
      'Double-sided mattress cleaning options'
    ],
    basePrice: 300,
    priceUnit: 'mattress',
    image: mattressCleaningImage
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Lerato Moremi',
    role: 'Homeowner',
    location: 'Sandton, Johannesburg',
    rating: 5,
    text: 'DM Holdings is absolutely the best! They cleaned my 5-seater L-shape couch and it looks brand new. The tea and coffee stains from the kids are completely gone. On-time and extremely professional!',
    serviceUsed: 'Sofa & Chairs Cleaning',
    date: '2026-05-14'
  },
  {
    id: 't2',
    name: 'Johan Bezuidenhout',
    role: 'SUV Owner',
    location: 'Garsfontein, Pretoria',
    rating: 5,
    text: 'Highly impressed with their car interior deep clean. They came straight to my house, cleaned all leather seats, roof lining, and detailed the dashboard. Immaculate work. I highly recommend them!',
    serviceUsed: 'Car Cleaning',
    date: '2026-06-02'
  },
  {
    id: 't3',
    name: 'Zanele Ndlovu',
    role: 'Apartment Tenant',
    location: 'Centurion, Gauteng',
    rating: 5,
    text: 'My bedroom carpet had huge pet stains, and DM Holdings removed everything. Fast dry time, wonderful smell, and great price. Excellent service from the PTA team!',
    serviceUsed: 'Carpet Cleaning',
    date: '2026-06-20'
  },
  {
    id: 't4',
    name: 'Michael Peterson',
    role: 'Vehicle Collector',
    location: 'Midrand, Johannesburg',
    rating: 5,
    text: 'I booked the Car Polishing for my sedan and the gloss restoration is spectacular. Swirl marks are gone and it feels super slick. Best car detailing service in Gauteng!',
    serviceUsed: 'Car Polishing',
    date: '2026-06-25'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Fabric Couch Stain Removal',
    category: 'upholstery',
    beforeImage: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80&brightness=60&contrast=120', // darker/dustier look
    afterImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80', // clean couch
    description: 'Deep ink and oil stains removed from a light-grey fabric couch using hot water extraction and safe chemicals.'
  },
  {
    id: 'g2',
    title: 'Car Seat Detailing',
    category: 'car',
    beforeImage: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=800&q=80&brightness=70', // stained interior
    afterImage: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80', // clean seats
    description: 'Restoration of driver seat and side panel detailing, restoring original deep charcoal color and removing dust buildup.'
  },
  {
    id: 'g3',
    title: 'Car Paint Polishing',
    category: 'car',
    beforeImage: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=800&q=80&brightness=80', // dull paint
    afterImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80', // polished shiny
    description: 'Elimination of swirl marks and deep micro-scratches from paintwork, bringing out deep liquid-like gloss finish.'
  },
  {
    id: 'g4',
    title: 'Bedroom Carpet Deep Wash',
    category: 'carpet',
    beforeImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80&brightness=75', // construction dusty
    afterImage: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80', // clean plush carpet
    description: 'Steam extraction cleaning of heavy traffic-area bedroom carpet, removing high-ground dust and mud tracks.'
  }
];
