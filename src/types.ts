export interface Property {
  id: string;
  price: string;
  priceMin: number; // For filtering
  priceMax: number; // For filtering
  address: string;
  cityStateZip: string;
  beds: string;
  bedsMin: number; // For filtering (0 = Studio)
  baths: string;
  sqft: string;
  image: string;
  images: string[];
  isNew?: boolean;
  isSpecial?: boolean;
  isVerified?: boolean; // For verified listing badge
  rating?: number;
  reviewCount?: number;
  availability: 'Available Now' | 'Apr 1' | 'May 1';
  tags: string[];
  petsAllowed: boolean; // For filtering
  amenities?: string[]; // For detailed filtering (Pool, Gym, etc)
  unitsAvailable?: number; // For card display
  coordinates: { lat: number; lng: number }; // Real map coordinates
  virtualTourUrl?: string; // For 3D virtual tour integration
  // Extended details
  floorPlans?: FloorPlan[];
  fees?: Fee[];
  petPolicy?: PetPolicy;
  reviews?: Review[];
}

// Floor plan with available units
export interface FloorPlan {
  id: string;
  name: string;
  beds: number;
  baths: number;
  sqftMin: number;
  sqftMax: number;
  priceMin: number;
  priceMax: number;
  units: Unit[];
}

export interface Unit {
  unitNumber: string;
  sqft: number;
  price: number;
  availableDate: string;
  floor?: number;
}

export interface Fee {
  name: string;
  amount: string;
  type: 'one-time' | 'monthly';
}

export interface PetPolicy {
  allowed: boolean;
  deposit?: number;
  monthlyRent?: number;
  restrictions?: string;
  maxWeight?: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  helpful?: number;
}


export interface Tour {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyImage: string;
  propertyAddress: string;
  date: string;
  time: string;
  type: 'In-Person' | 'Video' | 'Self-Guided';
  status: 'upcoming' | 'completed' | 'cancelled';
  agent?: string;
  notes?: string;
  price: string;
}

export interface Application {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyImage: string;
  propertyAddress: string;
  submittedDate: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'denied';
  monthlyRent: string;
  moveInDate: string;
  documents: { name: string; uploaded: boolean }[];
}

export interface Message {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyImage: string;
  contactName: string;
  contactRole: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  messages: { sender: 'user' | 'other'; text: string; time: string }[];
}

export interface Stay {
  id: string;
  title: string;
  location: string;
  image: string;
  images: string[];
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  type: 'Entire place' | 'Private room' | 'Shared room';
  guests: number;
  beds: number;
  baths: number;
  amenities: string[];
  host: { name: string; isSuperhost: boolean };
  coordinates: { lat: number; lng: number };
}

export interface BuyProperty {
  id: string;
  price: number;
  address: string;
  cityStateZip: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  images: string[];
  type: 'House' | 'Condo' | 'Townhome' | 'Multi-Family';
  yearBuilt: number;
  lotSize?: string;
  status: 'Active' | 'Pending' | 'Sold';
  openHouse?: string;
  coordinates: { lat: number; lng: number };
}
