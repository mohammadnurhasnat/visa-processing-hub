export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface TourPackage {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: string;
  imageUrl: string;
  category: 'International' | 'Domestic' | 'Hajj & Umrah';
}

export interface Testimonial {
  id: string;
  name: string;
  comment: string;
  rating: number;
}
