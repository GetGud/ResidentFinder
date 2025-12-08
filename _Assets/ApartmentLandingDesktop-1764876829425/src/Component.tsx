import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Home, 
  Building2, 
  GraduationCap,
  CheckCircle2,
  Box,
  Clock,
  ArrowRight,
  Menu,
  UserCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Header Component ---
const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Home className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-primary">Apartments.com</span>
        </div>
        
        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-primary transition-colors">Manage Property</a>
          <a href="#" className="hover:text-primary transition-colors">Sign Up</a>
          <a href="#" className="hover:text-primary transition-colors">Sign In</a>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          Add Listing
        </button>
        <button className="md:hidden p-2 text-gray-600">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </div>
  </header>
);

// --- Hero Search Component ---
const HeroSearch = () => {
  const [activeTab, setActiveTab] = useState<'rent' | 'buy' | 'off-campus'>('rent');

  return (
    <div className="relative w-full h-[600px] flex flex-col items-center justify-center px-4">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=2000&q=80" 
          alt="Modern Apartment Interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center space-y-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-extrabold text-white tracking-tight"
        >
          Discover Your New Home
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-2xl text-gray-200 font-medium"
        >
          Helping 100 million renters find their perfect match.
        </motion.h2>

        {/* Search Box Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-3xl mx-auto"
        >
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            {[
              { id: 'rent', label: 'Rent' },
              { id: 'buy', label: 'Buy' },
              { id: 'off-campus', label: 'Off-Campus' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex-1 py-4 text-sm font-bold transition-colors",
                  activeTab === tab.id 
                    ? "text-primary bg-white border-b-2 border-primary" 
                    : "text-gray-500 bg-gray-50 hover:bg-gray-100"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="City, Neighborhood, ZIP, or Address" 
                className="w-full h-12 pl-12 pr-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <div className="w-px h-12 bg-gray-200 hidden md:block" />
            <div className="flex gap-2">
              <select className="h-12 px-4 rounded-lg border border-gray-200 text-gray-700 outline-none bg-white focus:ring-2 focus:ring-primary cursor-pointer">
                <option>Price</option>
                <option>$0 - $1000</option>
                <option>$1000 - $2000</option>
                <option>$2000+</option>
              </select>
              <select className="h-12 px-4 rounded-lg border border-gray-200 text-gray-700 outline-none bg-white focus:ring-2 focus:ring-primary cursor-pointer">
                <option>Type</option>
                <option>Apartments</option>
                <option>Houses</option>
                <option>Townhomes</option>
              </select>
            </div>
            <button className="h-12 px-8 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
              Search
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// --- Value Props ---
const ValueProps = () => (
  <div className="bg-white py-16 border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="flex flex-col items-center space-y-4 p-6 rounded-xl hover:bg-gray-50 transition-colors">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-primary mb-2">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Verified Listings</h3>
          <p className="text-gray-600 leading-relaxed max-w-xs">
            We verify listing accuracy so you can tour with confidence. Look for the verified badge.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-4 p-6 rounded-xl hover:bg-gray-50 transition-colors">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2">
            <Box className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">3D Tours</h3>
          <p className="text-gray-600 leading-relaxed max-w-xs">
            Tour from anywhere. Explore properties with immersive 3D walkthroughs before you visit.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-4 p-6 rounded-xl hover:bg-gray-50 transition-colors">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-2">
            <Clock className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Real-Time Availability</h3>
          <p className="text-gray-600 leading-relaxed max-w-xs">
            Don't waste time. See up-to-the-minute pricing and availability for thousands of units.
          </p>
        </div>
      </div>
    </div>
  </div>
);

// --- Featured Section ---
const FeaturedSection = () => {
  const properties = [
    {
      id: 1,
      title: "The Emerald Heights",
      price: "$2,450/mo",
      address: "Downtown Seattle, WA",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      beds: "2 Beds",
      tag: "New"
    },
    {
      id: 2,
      title: "Pineview Lofts",
      price: "$1,850/mo",
      address: "Capitol Hill, Seattle",
      image: "https://images.unsplash.com/photo-1512918760532-3ed462f01807?auto=format&fit=crop&w=800&q=80",
      beds: "1 Bed",
      tag: "Special"
    },
    {
      id: 3,
      title: "Azure Waterfront",
      price: "$3,100/mo",
      address: "Belltown, Seattle",
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
      beds: "2 Beds",
      tag: "Luxury"
    },
    {
      id: 4,
      title: "The Brickyard",
      price: "$1,650/mo",
      address: "Ballard, Seattle",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      beds: "Studio",
      tag: "Value"
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Trending in Seattle</h2>
            <p className="text-gray-600 mt-2">Most viewed properties in your area this week.</p>
          </div>
          <a href="#" className="text-primary font-bold flex items-center hover:underline">
            View all listings <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map(prop => (
            <div key={prop.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group cursor-pointer border border-gray-100">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={prop.image} 
                  alt={prop.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-primary uppercase tracking-wider">
                  {prop.tag}
                </div>
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-white font-bold text-sm">
                  {prop.price}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 truncate">{prop.title}</h3>
                <p className="text-sm text-gray-500 truncate">{prop.address}</p>
                <div className="mt-3 flex items-center gap-2 text-xs font-medium text-gray-500">
                  <span className="bg-gray-100 px-2 py-1 rounded">{prop.beds}</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">Pet Friendly</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Lifestyle Grid ---
const LifestyleGrid = () => {
  const categories = [
    { title: "Pet Friendly", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80", count: "2,400 listings" },
    { title: "Luxury Living", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", count: "850 listings" },
    { title: "Student Housing", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80", count: "1,200 listings" },
    { title: "Short Term", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80", count: "340 listings" }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center">Browse by Lifestyle</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div key={idx} className="group relative rounded-xl overflow-hidden aspect-[3/4] cursor-pointer">
              <img 
                src={cat.image} 
                alt={cat.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-1">{cat.title}</h3>
                <p className="text-sm text-white/80 group-hover:text-white transition-colors">{cat.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
export function ApartmentLandingDesktop() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Header />
      <main className="pt-16">
        <HeroSearch />
        <ValueProps />
        <FeaturedSection />
        <LifestyleGrid />
        
        {/* Marketing / CTA Section */}
        <div className="bg-emerald-900 py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              List your property on the #1 rental network
            </h2>
            <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
              Connect with millions of renters searching for their next home. We make it easy to manage your listings and find great tenants.
            </p>
            <button className="px-8 py-4 bg-white text-emerald-900 text-lg font-bold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
              Add Your Listing
            </button>
          </div>
        </div>

        {/* Simple Footer */}
        <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Home className="text-white w-6 h-6" />
                <span className="text-lg font-bold text-white">Apartments.com</span>
              </div>
              <p className="text-sm">
                The most trusted rental resource. We verify listings so you can search with confidence.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Renters</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Rental Guides</a></li>
                <li><a href="#" className="hover:text-white">Find Apartments</a></li>
                <li><a href="#" className="hover:text-white">Homes for Rent</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Property Managers</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">List a Property</a></li>
                <li><a href="#" className="hover:text-white">Screening Services</a></li>
                <li><a href="#" className="hover:text-white">Rental Manager</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-sm text-center">
            © 2024 CoStar Group, Inc. All rights reserved.
          </div>
        </footer>
      </main>
    </div>
  );
}

export default ApartmentLandingDesktop;