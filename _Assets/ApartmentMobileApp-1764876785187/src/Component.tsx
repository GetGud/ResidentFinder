import React, { useState } from 'react';
import { 
  Search, 
  Map as MapIcon, 
  List, 
  Heart, 
  User, 
  Bell, 
  SlidersHorizontal,
  Phone,
  MessageSquare,
  Share2,
  MapPin
} from 'lucide-react';

// --- Types ---
interface Property {
  id: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  address: string;
  city: string;
  image: string;
  tags: string[];
  isFavorite: boolean;
}

// --- Mock Data ---
const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    price: 2450,
    beds: 2,
    baths: 2,
    sqft: 1150,
    address: '1200 Highland Ave',
    city: 'Los Angeles, CA',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    tags: ['Special Offer', 'In-Unit W/D'],
    isFavorite: false,
  },
  {
    id: '2',
    price: 1895,
    beds: 1,
    baths: 1,
    sqft: 750,
    address: 'The Modernist Lofts',
    city: 'Downtown, LA',
    image: 'https://images.unsplash.com/photo-1512918760383-eda2723ad6e1?auto=format&fit=crop&w=1000&q=80',
    tags: ['New Listing', 'Pool'],
    isFavorite: true,
  },
  {
    id: '3',
    price: 3200,
    beds: 3,
    baths: 2.5,
    sqft: 1600,
    address: 'Silver Lake Hills',
    city: 'Los Angeles, CA',
    image: 'https://images.unsplash.com/photo-1600596542815-2250657d2fc5?auto=format&fit=crop&w=1000&q=80',
    tags: ['Pet Friendly', 'View'],
    isFavorite: false,
  },
];

const FILTERS = ['Price', 'Beds & Baths', 'Type', 'Move-in Date', 'Pets', 'Amenities', 'More'];

// --- Components ---

const BottomNav = () => (
  <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border h-16 flex items-center justify-around px-2 z-50 pb-safe">
    <button className="flex flex-col items-center justify-center w-16 h-full text-primary space-y-1">
      <Search size={24} />
      <span className="text-[10px] font-medium">Search</span>
    </button>
    <button className="flex flex-col items-center justify-center w-16 h-full text-muted-foreground space-y-1 hover:text-foreground transition-colors">
      <Heart size={24} />
      <span className="text-[10px] font-medium">Favorites</span>
    </button>
    <button className="flex flex-col items-center justify-center w-16 h-full text-muted-foreground space-y-1 hover:text-foreground transition-colors">
      <Bell size={24} />
      <span className="text-[10px] font-medium">Alerts</span>
    </button>
    <button className="flex flex-col items-center justify-center w-16 h-full text-muted-foreground space-y-1 hover:text-foreground transition-colors">
      <User size={24} />
      <span className="text-[10px] font-medium">Profile</span>
    </button>
  </div>
);

const PropertyCard = ({ property }: { property: Property }) => {
  const [isLiked, setIsLiked] = useState(property.isFavorite);

  return (
    <div className="w-full bg-card mb-6 overflow-hidden group">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <img 
          src={property.image} 
          alt={property.address}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
        
        {/* Top Actions */}
        <div className="absolute top-4 right-4">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors"
          >
            <Heart size={20} className={isLiked ? "fill-red-500 text-red-500" : "text-white"} />
          </button>
        </div>

        {/* Tags */}
        <div className="absolute top-4 left-4 flex gap-2">
          {property.tags.map(tag => (
            <span key={tag} className="px-2 py-1 rounded-md bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-semibold shadow-sm">
              {tag}
            </span>
          ))}
        </div>

        {/* Price Overlay (Bottom Left) */}
        <div className="absolute bottom-4 left-4 text-white">
          <div className="text-2xl font-bold tracking-tight">
            ${property.price.toLocaleString()}<span className="text-base font-normal opacity-90">/mo</span>
          </div>
        </div>
      </div>

      {/* Content Info */}
      <div className="px-4 py-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-foreground leading-tight">{property.address}</h3>
            <p className="text-muted-foreground text-sm">{property.city}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-foreground">{property.beds}</span> Bed
          </div>
          <div className="w-px h-3 bg-border" />
          <div className="flex items-center gap-1">
            <span className="font-semibold text-foreground">{property.baths}</span> Bath
          </div>
          <div className="w-px h-3 bg-border" />
          <div className="flex items-center gap-1">
            <span className="font-semibold text-foreground">{property.sqft.toLocaleString()}</span> Sqft
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors font-medium text-sm">
            <Phone size={16} />
            Call
          </button>
          <button className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-sm shadow-sm">
            <MessageSquare size={16} />
            Message
          </button>
        </div>
      </div>
    </div>
  );
};

const FilterPill = ({ label, active = false }: { label: string, active?: boolean }) => (
  <button className={`
    whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border
    ${active 
      ? 'bg-primary text-primary-foreground border-transparent' 
      : 'bg-background text-foreground border-border hover:border-foreground/50'}
  `}>
    {label}
  </button>
);

export default function ApartmentMobileApp() {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  return (
    <div className="min-h-screen bg-background pb-20 font-sans">
      {/* Top Search Bar */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border/50">
        <div className="px-4 py-3">
          <div className="flex gap-3">
            {/* Search Input Mock */}
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Search size={18} />
              </div>
              <input 
                type="text" 
                placeholder="City, Neighborhood, Zip" 
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-secondary/50 border-transparent focus:bg-background focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm placeholder:text-muted-foreground font-medium"
              />
            </div>
            
            {/* Map/List Toggle */}
            <button 
              onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
              className="h-11 px-4 rounded-xl bg-secondary/50 hover:bg-secondary text-foreground transition-colors flex items-center gap-2 font-medium text-sm"
            >
              {viewMode === 'list' ? <MapIcon size={18} /> : <List size={18} />}
              {viewMode === 'list' ? 'Map' : 'List'}
            </button>
          </div>
        </div>

        {/* Horizontal Filters */}
        <div className="overflow-x-auto hide-scrollbar pb-3 px-4 flex gap-2">
          <button className="flex items-center justify-center h-9 w-9 rounded-full border border-border shrink-0">
            <SlidersHorizontal size={16} />
          </button>
          {FILTERS.map((filter, i) => (
            <FilterPill key={filter} label={filter} active={i === 0} /> // First one active for demo
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-md mx-auto w-full">
        {viewMode === 'list' ? (
          <div className="pt-2">
            <div className="px-4 py-3 flex justify-between items-center">
              <h2 className="font-bold text-lg">1,240 Listings</h2>
              <div className="flex items-center gap-1 text-sm text-primary font-medium">
                <span>Sort: Recommended</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              {MOCK_PROPERTIES.map(prop => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
              {/* Duplicate for scroll feel */}
              {MOCK_PROPERTIES.map(prop => (
                <PropertyCard key={`${prop.id}-dup`} property={{...prop, id: `${prop.id}-dup`}} />
              ))}
            </div>
          </div>
        ) : (
          <div className="h-[calc(100vh-140px)] flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-4">
              <MapIcon size={48} className="opacity-50" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Map View</h3>
            <p>Map integration placeholder. In a real app, this would be an interactive map with pins.</p>
            <button 
              onClick={() => setViewMode('list')}
              className="mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium"
            >
              Back to List
            </button>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
    </div>
  );
}