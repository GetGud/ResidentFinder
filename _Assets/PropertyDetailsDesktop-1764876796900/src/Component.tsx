import React, { useState } from 'react';
import { 
  Heart, 
  Share2, 
  MapPin, 
  BedDouble, 
  Bath, 
  Square, 
  CheckCircle2, 
  Calendar, 
  MessageSquare, 
  Phone, 
  Star,
  ChevronRight,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Dog,
  Wind,
  Info,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
interface PropertyDetailsProps {
  className?: string;
}

// --- Component ---
export function PropertyDetailsDesktop({ className }: PropertyDetailsProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const images = [
    "https://images.unsplash.com/photo-1600596542815-2250657d2fc5?auto=format&fit=crop&w=1600&q=80", // Main
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80", // Kitchen
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80", // Living
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80", // Bedroom
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=800&q=80"  // Bath
  ];

  return (
    <div className={cn("bg-white min-h-screen font-sans text-slate-900", className)}>
      {/* --- Sticky Header --- */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center text-sm text-slate-500 space-x-2">
            <span className="hover:text-primary cursor-pointer transition-colors">Search</span>
            <ChevronRight className="w-4 h-4" />
            <span className="hover:text-primary cursor-pointer transition-colors">WA</span>
            <ChevronRight className="w-4 h-4" />
            <span className="hover:text-primary cursor-pointer transition-colors">Seattle</span>
            <ChevronRight className="w-4 h-4" />
            <span className="font-medium text-slate-900">The Emerald Heights</span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSaved(!isSaved)}
              className="flex items-center space-x-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors px-4 py-2 rounded-full hover:bg-slate-50"
            >
              <Heart className={cn("w-5 h-5", isSaved && "fill-red-500 text-red-500")} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
            <button className="flex items-center space-x-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors px-4 py-2 rounded-full hover:bg-slate-50">
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- Hero Gallery (Bento Style) --- */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[500px] rounded-2xl overflow-hidden shadow-sm">
          {/* Main Image - Takes up 2x2 cols on left */}
          <div className="col-span-2 row-span-2 relative group cursor-pointer overflow-hidden">
             <img 
               src={images[0]} 
               alt="Main property view" 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
             />
             <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium">
               Virtual Tour Available
             </div>
          </div>
          {/* Side Images */}
          {images.slice(1).map((img, idx) => (
            <div key={idx} className="col-span-1 row-span-1 relative group cursor-pointer overflow-hidden">
               <img 
                 src={img} 
                 alt={`Property view ${idx+2}`} 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
               />
               {idx === 3 && (
                 <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-medium hover:bg-black/40 transition-colors">
                   +24 More Photos
                 </div>
               )}
            </div>
          ))}
        </div>
      </section>

      {/* --- Main Content Split --- */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* LEFT COLUMN: Content (2/3) */}
          <div className="lg:w-2/3 space-y-12">
            
            {/* Header Info */}
            <div className="border-b border-slate-200 pb-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                   <h1 className="text-4xl font-bold text-slate-900 mb-2">The Emerald Heights</h1>
                   <div className="flex items-center text-slate-600">
                     <MapPin className="w-5 h-5 mr-1 text-primary" />
                     <span className="text-lg">1200 Pike St, Seattle, WA 98101</span>
                   </div>
                </div>
                <div className="flex flex-col items-end">
                   <div className="text-3xl font-bold text-primary">$2,450 - $5,200</div>
                   <div className="text-slate-500 font-medium mt-1">Monthly Rent</div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="flex items-center justify-between bg-slate-50 rounded-xl p-6 border border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100">
                    <BedDouble className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-medium">Bedrooms</div>
                    <div className="font-bold text-slate-900">Studio - 3</div>
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="flex items-center space-x-3">
                  <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100">
                    <Bath className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-medium">Bathrooms</div>
                    <div className="font-bold text-slate-900">1 - 2.5</div>
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="flex items-center space-x-3">
                  <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100">
                    <Square className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-medium">Square Feet</div>
                    <div className="font-bold text-slate-900">450 - 1,400</div>
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="flex items-center space-x-3">
                  <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-medium">Status</div>
                    <div className="font-bold text-green-600">Available Now</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Highlights Section */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">What's Special</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "Rooftop Sky Lounge", desc: "Panoramic views of Downtown Seattle & Space Needle" },
                  { title: "Smart Home Tech", desc: "Keyless entry, smart thermostats, and integrated blinds" },
                  { title: "Resort-style Pool", desc: "Heated infinity pool with cabanas and towel service" },
                  { title: "Pet Spa & Run", desc: "Full service pet grooming station and private dog park" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <Star className="w-5 h-5 text-primary shrink-0 mt-0.5 mr-3 fill-primary" />
                    <div>
                      <h3 className="font-bold text-slate-900">{item.title}</h3>
                      <p className="text-slate-600 text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* About Section */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">About The Emerald Heights</h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                <p className="mb-4">
                  Experience luxury living at its finest in the heart of Seattle. The Emerald Heights offers a sophisticated retreat from the city bustle while placing you steps away from the best dining, shopping, and entertainment the Pacific Northwest has to offer.
                </p>
                <p>
                  Each residence is thoughtfully designed with floor-to-ceiling windows, wide-plank hardwood flooring, and chef-inspired kitchens featuring quartz countertops and Bosch stainless steel appliances. Our community amenities are designed to elevate your lifestyle, featuring a 24-hour concierge, state-of-the-art fitness center, and a private resident lounge.
                </p>
                <button className="text-primary font-bold hover:underline mt-2 flex items-center">
                  Read full description <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </section>

            {/* Amenities Grid */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                {[
                  { icon: Wifi, label: "High-Speed Internet" },
                  { icon: Car, label: "EV Charging Stations" },
                  { icon: Utensils, label: "Chef's Kitchens" },
                  { icon: Dumbbell, label: "24/7 Fitness Center" },
                  { icon: Dog, label: "Pet Friendly" },
                  { icon: Wind, label: "A/C in Every Unit" },
                ].map((item, idx) => (
                   <div key={idx} className="flex items-center space-x-3 group cursor-default">
                     <div className="p-2 rounded-full bg-slate-50 group-hover:bg-primary/10 transition-colors">
                       <item.icon className="w-5 h-5 text-slate-500 group-hover:text-primary transition-colors" />
                     </div>
                     <span className="text-slate-700 font-medium">{item.label}</span>
                   </div>
                ))}
              </div>
              <button className="mt-8 px-6 py-2.5 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors w-full md:w-auto">
                See all 42 amenities
              </button>
            </section>

            {/* Floor Plans List (Simplified) */}
            <section>
              <div className="flex justify-between items-end mb-6">
                 <h2 className="text-2xl font-bold text-slate-900">Floor Plans</h2>
                 <div className="flex space-x-2">
                   <button className="px-4 py-1.5 bg-primary text-white rounded-full text-sm font-medium">All</button>
                   <button className="px-4 py-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-full text-sm font-medium">Studio</button>
                   <button className="px-4 py-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-full text-sm font-medium">1 Bed</button>
                   <button className="px-4 py-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-full text-sm font-medium">2+ Bed</button>
                 </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: "Urban One", beds: "1 Bed", baths: "1 Bath", sqft: "650", price: "$2,450", avail: "3 Units" },
                  { name: "City View Two", beds: "2 Beds", baths: "2 Baths", sqft: "1,100", price: "$4,200", avail: "1 Unit" },
                ].map((plan, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl p-6 hover:border-primary/50 transition-colors cursor-pointer flex justify-between items-center group">
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                        <Square className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">{plan.name}</h3>
                        <div className="flex items-center text-sm text-slate-500 mt-1 space-x-3">
                          <span>{plan.beds}</span>
                          <span className="w-1 h-1 bg-slate-300 rounded-full" />
                          <span>{plan.baths}</span>
                          <span className="w-1 h-1 bg-slate-300 rounded-full" />
                          <span>{plan.sqft} sqft</span>
                        </div>
                        <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded bg-green-50 text-green-700 text-xs font-bold border border-green-100">
                          {plan.avail} Available
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                       <div className="text-2xl font-bold text-slate-900">{plan.price}</div>
                       <button className="mt-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-bold hover:border-primary hover:text-primary transition-colors">
                         Check Availability
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN: Sticky Sidebar (1/3) */}
          <div className="lg:w-1/3">
             <div className="sticky top-24 space-y-6">
               
               {/* Tour Request Card */}
               <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                 <div className="bg-primary p-4 text-white text-center font-bold">
                   Special Offer: One Month Free Rent!
                 </div>
                 <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Request a Tour</h3>
                    
                    {/* Fake Calendar Strip */}
                    <div className="flex justify-between mb-6">
                      {[
                        { day: 'Mon', date: '12' },
                        { day: 'Tue', date: '13' },
                        { day: 'Wed', date: '14' },
                        { day: 'Thu', date: '15' },
                      ].map((d, i) => (
                        <button key={i} className={cn(
                          "flex flex-col items-center justify-center w-14 h-16 rounded-xl border transition-all",
                          i === 1 ? "bg-primary text-white border-primary shadow-md transform -translate-y-1" : "bg-white text-slate-600 border-slate-200 hover:border-primary/50 hover:bg-slate-50"
                        )}>
                          <span className="text-xs font-medium uppercase">{d.day}</span>
                          <span className="text-lg font-bold">{d.date}</span>
                        </button>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <button className="w-full py-3.5 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-lg shadow-md transition-all flex items-center justify-center gap-2">
                         <Calendar className="w-5 h-5" />
                         Schedule Tour
                      </button>
                      <button className="w-full py-3.5 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2">
                         <MessageSquare className="w-5 h-5" />
                         Request Info
                      </button>
                    </div>
                    
                    <div className="mt-6 text-center text-xs text-slate-400">
                      It's free, with no obligation - cancel anytime
                    </div>
                 </div>
               </div>

               {/* Contact Agent Card */}
               <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                 <div className="flex items-center gap-4 mb-4">
                   <div className="w-14 h-14 rounded-full bg-slate-300 overflow-hidden">
                     <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80" alt="Agent" className="w-full h-full object-cover" />
                   </div>
                   <div>
                     <div className="font-bold text-slate-900">James Wilson</div>
                     <div className="text-sm text-slate-500">Leasing Consultant</div>
                   </div>
                 </div>
                 <div className="space-y-3">
                   <button className="w-full flex items-center justify-center gap-2 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-100 transition-colors">
                     <Phone className="w-4 h-4" /> (206) 555-0123
                   </button>
                 </div>
               </div>

             </div>
          </div>

        </div>
      </main>

    </div>
  );
}
export default PropertyDetailsDesktop;