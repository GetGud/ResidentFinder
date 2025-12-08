import React, { useState } from 'react';
import { 
  Search, 
  Map as MapIcon, 
  List, 
  Filter, 
  ChevronDown, 
  Heart, 
  Share2, 
  Phone, 
  Mail,
  BedDouble,
  Bath,
  Maximize,
  MapPin,
  Star,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind class merging
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
export interface Property {
  id: string;
  price: string;
  address: string;
  cityStateZip: string;
  beds: string;
  baths: string;
  sqft: string;
  image: string;
  images: string[];
  isNew?: boolean;
  isSpecial?: boolean;
  rating?: number;
  reviewCount?: number;
  availability: 'Available Now' | 'Apr 1' | 'May 1';
  tags: string[];
  coordinates: { x: number; y: number }; // For map simulation
}

export interface ApartmentSearchProps {
  className?: string;
}

// --- Mock Data ---
const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    price: '$2,450 - $4,200',
    address: 'The Emerald Heights',
    cityStateZip: 'Downtown, Seattle, WA 98101',
    beds: 'Studio - 3 Beds',
    baths: '1 - 2 Baths',
    sqft: '450 - 1,200 sqft',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512918760532-3ed462f01807?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a1c00207099b?auto=format&fit=crop&w=800&q=80'
    ],
    isNew: true,
    rating: 4.8,
    reviewCount: 124,
    availability: 'Available Now',
    tags: ['Rooftop Lounge', 'In-unit W/D', 'Gym'],
    coordinates: { x: 30, y: 40 }
  },
  {
    id: '2',
    price: '$1,850+',
    address: 'Pineview Lofts',
    cityStateZip: 'Capitol Hill, Seattle, WA 98102',
    beds: '1 - 2 Beds',
    baths: '1 Bath',
    sqft: '650 - 900 sqft',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
    ],
    isSpecial: true,
    rating: 4.5,
    reviewCount: 89,
    availability: 'Available Now',
    tags: ['Pet Friendly', 'Parking'],
    coordinates: { x: 55, y: 25 }
  },
  {
    id: '3',
    price: '$3,100 - $5,500',
    address: 'Azure Waterfront',
    cityStateZip: 'Belltown, Seattle, WA 98121',
    beds: '1 - 3 Beds',
    baths: '1.5 - 3 Baths',
    sqft: '800 - 1,800 sqft',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502005229766-52835791e802?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 210,
    availability: 'Apr 1',
    tags: ['Water View', 'Pool', 'Concierge'],
    coordinates: { x: 20, y: 60 }
  },
  {
    id: '4',
    price: '$1,650',
    address: 'The Brickyard',
    cityStateZip: 'Ballard, Seattle, WA 98107',
    beds: 'Studio',
    baths: '1 Bath',
    sqft: '480 sqft',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.2,
    reviewCount: 45,
    availability: 'Available Now',
    tags: ['Historic', 'Walkable'],
    coordinates: { x: 70, y: 35 }
  },
  {
    id: '5',
    price: '$2,800+',
    address: 'Canvas Apartments',
    cityStateZip: 'Queen Anne, Seattle, WA 98109',
    beds: '1 - 2 Beds',
    baths: '1 - 2 Baths',
    sqft: '700 - 1,100 sqft',
    image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    reviewCount: 156,
    availability: 'May 1',
    tags: ['Modern', 'Smart Home'],
    coordinates: { x: 45, y: 55 }
  },
  {
    id: '6',
    price: '$5,200',
    address: 'Skyline Penthouse',
    cityStateZip: 'Downtown, Seattle, WA 98101',
    beds: '3 Beds',
    baths: '3 Baths',
    sqft: '2,400 sqft',
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=800&q=80'
    ],
    isSpecial: true,
    rating: 5.0,
    reviewCount: 12,
    availability: 'Available Now',
    tags: ['Luxury', 'Private Elevator'],
    coordinates: { x: 40, y: 50 }
  }
];

// --- Components ---

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm font-sans">
      <div className="max-w-[1920px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0 cursor-pointer">
          <div className="w-8 h-8 bg-[#134e4a] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-[#134e4a] hidden md:block">
            Resident<span className="font-light text-gray-500">Finder</span>
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl relative hidden md:block">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-[#134e4a] transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a] transition-all sm:text-sm"
              placeholder="City, Neighborhood, Zip, or Address"
              defaultValue="Seattle, WA"
            />
            <button className="absolute inset-y-1 right-1 bg-[#134e4a] text-white px-4 rounded-full text-sm font-semibold hover:bg-[#0f3f3c] transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Nav Actions */}
        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          <button className="text-sm font-semibold text-gray-600 hover:text-[#134e4a] hidden lg:block">
            Manage Rentals
          </button>
          <button className="text-sm font-semibold text-gray-600 hover:text-[#134e4a] hidden lg:block">
            Sign Up
          </button>
          <button className="text-sm font-semibold text-[#134e4a] border border-[#134e4a] px-4 py-2 rounded-md hover:bg-[#134e4a]/5 transition-colors">
            Sign In
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="border-t border-gray-100 py-2 px-4 bg-white flex items-center gap-3 overflow-x-auto no-scrollbar">
        <FilterButton label="Price" active value="$1.5k - $5k" />
        <FilterButton label="Type" value="All Types" />
        <FilterButton label="Beds / Baths" value="Any" />
        <FilterButton label="Lifestyle" />
        <FilterButton label="Move-In Date" />
        <FilterButton label="More" icon={Filter} />
        <div className="h-6 w-px bg-gray-200 mx-2 flex-shrink-0"></div>
        <button className="text-sm font-medium text-[#134e4a] hover:underline whitespace-nowrap">
          Save Search
        </button>
      </div>
    </header>
  );
};

const FilterButton = ({ label, value, active = false, icon: Icon }: { label: string, value?: string, active?: boolean, icon?: any }) => (
  <button 
    className={cn(
      "flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-sm font-medium transition-all whitespace-nowrap",
      active 
        ? "bg-[#134e4a]/10 border-[#134e4a] text-[#134e4a]" 
        : "bg-white border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
    )}
  >
    {Icon && <Icon className="w-3.5 h-3.5" />}
    {label}
    {value && <span className="text-[#134e4a] font-bold ml-1">{value}</span>}
    <ChevronDown className={cn("w-3.5 h-3.5 opacity-50", active && "text-[#134e4a]")} />
  </button>
);

const PropertyCard = ({ property }: { property: Property }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <motion.div 
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Image Carousel */}
      <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
        <img 
          src={property.images[currentImageIndex]} 
          alt={property.address}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 items-start">
          {property.isSpecial && (
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
              SPECIAL OFFER
            </span>
          )}
          {property.isNew && (
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
              NEW LISTING
            </span>
          )}
        </div>
        
        <button className="absolute top-3 right-3 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-colors">
          <Heart className="w-4 h-4" />
        </button>

        {/* Carousel Controls */}
        <div className={cn("absolute inset-0 flex items-center justify-between px-2 opacity-0 transition-opacity duration-200", isHovered && "opacity-100")}>
          <button onClick={prevImage} className="p-1.5 rounded-full bg-white/90 hover:bg-white shadow-md text-gray-800">
            <ChevronDown className="w-4 h-4 rotate-90" />
          </button>
          <button onClick={nextImage} className="p-1.5 rounded-full bg-white/90 hover:bg-white shadow-md text-gray-800">
            <ChevronDown className="w-4 h-4 -rotate-90" />
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {property.images.map((_, idx) => (
            <div 
              key={idx}
              className={cn(
                "w-1.5 h-1.5 rounded-full shadow-sm transition-all", 
                idx === currentImageIndex ? "bg-white scale-125" : "bg-white/50"
              )}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <div>
             <h3 className="text-2xl font-bold text-[#134e4a]">{property.price}</h3>
             <p className="text-sm text-gray-500 font-medium">{property.beds} • {property.baths}</p>
          </div>
          {property.rating && (
            <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-md">
               <Star className="w-3 h-3 text-[#134e4a] fill-[#134e4a]" />
               <span className="text-xs font-bold text-[#134e4a]">{property.rating}</span>
            </div>
          )}
        </div>
        
        <h4 className="font-bold text-gray-900 text-lg truncate">{property.address}</h4>
        <p className="text-gray-500 text-sm mb-3 truncate">{property.cityStateZip}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {property.tags.slice(0, 3).map((tag, i) => (
             <span key={i} className="text-[10px] font-semibold uppercase tracking-wider text-gray-600 bg-gray-100 px-2 py-1 rounded">
               {tag}
             </span>
          ))}
          {property.tags.length > 3 && (
            <span className="text-[10px] font-semibold text-gray-400 px-1 py-1">+{property.tags.length - 3}</span>
          )}
        </div>

        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
           <div className="flex items-center gap-1 text-green-700">
             <CheckCircle2 className="w-3.5 h-3.5" />
             <span className="text-xs font-bold">{property.availability}</span>
           </div>
           
           <div className="flex gap-2">
             <button className="p-2 text-gray-400 hover:text-[#134e4a] hover:bg-green-50 rounded-full transition-colors">
               <Phone className="w-4 h-4" />
             </button>
             <button className="p-2 text-gray-400 hover:text-[#134e4a] hover:bg-green-50 rounded-full transition-colors">
               <Mail className="w-4 h-4" />
             </button>
             <button className="px-4 py-1.5 bg-[#134e4a] text-white text-sm font-semibold rounded-md hover:bg-[#0f3f3c] transition-colors shadow-sm">
               Details
             </button>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

const MapMarker = ({ x, y, price }: { x: number, y: number, price: string }) => (
  <div 
    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10 hover:z-50"
    style={{ left: `${x}%`, top: `${y}%` }}
  >
    <div className="bg-[#134e4a] text-white text-xs font-bold px-2 py-1 rounded shadow-lg border-2 border-white group-hover:scale-110 group-hover:bg-gray-900 transition-all">
      {price.split(' ')[0].replace('+','')}
    </div>
    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white absolute left-1/2 -translate-x-1/2 bottom-[-6px] drop-shadow-sm"></div>
  </div>
);

// --- Main Component ---

export function ApartmentSearchDesktop({ className }: ApartmentSearchProps) {
  return (
    <div className={cn("flex flex-col h-screen bg-white font-sans text-gray-900", className)}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
        .font-sans { font-family: 'Manrope', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <Header />

      <main className="flex-1 flex overflow-hidden relative">
        {/* List View - Left Panel */}
        <div className="w-full lg:w-[55%] xl:w-[60%] h-full overflow-y-auto bg-gray-50 border-r border-gray-200">
          {/* Results Header */}
          <div className="p-4 md:p-6 flex justify-between items-end mb-2">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Apartments for Rent in Seattle, WA</h1>
              <p className="text-gray-500 text-sm">1,248 Rentals Available • Updated Today</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select className="text-sm font-bold text-[#134e4a] bg-transparent border-none focus:ring-0 cursor-pointer">
                <option>Best Match</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-6 pb-10">
            {MOCK_PROPERTIES.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
            
            {/* Promo Card */}
            <div className="md:col-span-2 bg-[#134e4a] rounded-xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-lg">
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              <div className="relative z-10 max-w-md">
                <h3 className="text-2xl font-bold mb-2">List Your Property</h3>
                <p className="text-green-100 mb-6">Reach millions of renters. Fill your vacancies faster with ResidentFinder Premium.</p>
                <button className="bg-white text-[#134e4a] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
                  Get Started Today
                </button>
              </div>
              <div className="hidden md:block relative z-10">
                 <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-12 h-12 text-white" />
                    </div>
                 </div>
              </div>
            </div>

            {MOCK_PROPERTIES.slice(0, 2).map((property) => (
               <PropertyCard key={`dup-${property.id}`} property={{...property, id: `dup-${property.id}`}} />
            ))}
          </div>
          
          {/* Pagination */}
          <div className="p-6 flex justify-center border-t border-gray-200 bg-white">
             <div className="flex items-center gap-2">
               <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>
                 <ChevronDown className="w-5 h-5 rotate-90" />
               </button>
               <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#134e4a] text-white font-bold">1</button>
               <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium">2</button>
               <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium">3</button>
               <span className="text-gray-400 px-2">...</span>
               <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium">12</button>
               <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50">
                 <ChevronDown className="w-5 h-5 -rotate-90" />
               </button>
             </div>
          </div>

          {/* Footer Simple */}
          <div className="bg-gray-100 p-8 text-center">
             <p className="text-gray-500 text-sm">© 2024 ResidentFinder. All rights reserved.</p>
             <div className="flex justify-center gap-4 mt-2 text-sm text-gray-400">
               <a href="#" className="hover:underline">Privacy</a>
               <a href="#" className="hover:underline">Terms</a>
               <a href="#" className="hover:underline">Sitemap</a>
             </div>
          </div>
        </div>

        {/* Map View - Right Panel */}
        <div className="hidden lg:block w-[45%] xl:w-[40%] h-full relative bg-[#e5e7eb]">
           {/* Simulated Map Background */}
           <div className="absolute inset-0 bg-[#cad2d3] overflow-hidden">
              {/* Map Texture / Grid */}
              <div className="absolute inset-0 opacity-40" 
                  style={{ 
                    backgroundImage: 'radial-gradient(#a0aec0 1px, transparent 1px)', 
                    backgroundSize: '20px 20px' 
                  }}>
              </div>
              
              {/* Decorative Map Elements (Roads/Blocks) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" xmlns="http://www.w3.org/2000/svg">
                 <path d="M -100 100 L 800 150" stroke="white" strokeWidth="12" fill="none" />
                 <path d="M 200 -50 L 250 900" stroke="white" strokeWidth="16" fill="none" />
                 <path d="M 500 0 L 400 800" stroke="white" strokeWidth="10" fill="none" />
                 <path d="M 0 400 L 900 350" stroke="white" strokeWidth="14" fill="none" />
                 
                 <rect x="260" y="160" width="100" height="80" fill="#d1d5db" />
                 <rect x="380" y="200" width="60" height="120" fill="#d1d5db" />
                 <circle cx="600" cy="500" r="80" fill="#d4d4d8" />
              </svg>
              
              {/* Water Feature */}
              <div className="absolute -left-20 top-1/3 w-64 h-64 bg-[#bfdbfe] rounded-full blur-3xl opacity-60 pointer-events-none"></div>
           </div>

           {/* Map Controls */}
           <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
              <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-600 hover:text-[#134e4a] transition-colors">
                <Maximize className="w-5 h-5" />
              </button>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 border-b border-gray-100">
                  <span className="text-xl font-bold">+</span>
                </button>
                <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50">
                  <span className="text-xl font-bold">-</span>
                </button>
              </div>
           </div>

           {/* Draw Tool */}
           <div className="absolute top-4 left-4 z-20">
              <button className="bg-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                 <CheckCircle2 className="w-4 h-4 text-[#134e4a]" />
                 Draw Area
              </button>
           </div>

           {/* Markers */}
           {MOCK_PROPERTIES.map((p) => (
             <MapMarker key={p.id} x={p.coordinates.x} y={p.coordinates.y} price={p.price} />
           ))}
           
           {/* Selected Tooltip (Simulated) */}
           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white p-3 rounded-lg shadow-xl border border-gray-200 flex gap-3 items-center z-30 w-64 animate-in slide-in-from-bottom-4 duration-500">
              <img src={MOCK_PROPERTIES[0].image} className="w-16 h-16 rounded-md object-cover" alt="" />
              <div className="flex-1 min-w-0">
                 <h5 className="font-bold text-[#134e4a] text-sm truncate">{MOCK_PROPERTIES[0].price}</h5>
                 <p className="text-xs text-gray-500 truncate">{MOCK_PROPERTIES[0].address}</p>
                 <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-bold">4.8</span>
                 </div>
              </div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-200 hidden"></div>
           </div>
        </div>
      </main>
    </div>
  );
}

export default ApartmentSearchDesktop;