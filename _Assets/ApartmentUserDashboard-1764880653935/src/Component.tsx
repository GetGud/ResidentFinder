import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Heart, 
  Calendar, 
  FileText, 
  MessageSquare, 
  Settings, 
  LogOut,
  Bell,
  Search,
  MapPin,
  ChevronRight,
  Clock,
  Home,
  Menu,
  X,
  User,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types & Mock Data ---

type NavItem = {
  id: string;
  label: string;
  icon: React.ElementType;
  count?: number;
};

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'saved', label: 'Saved Listings', icon: Heart, count: 12 },
  { id: 'tours', label: 'Tours', icon: Calendar, count: 2 },
  { id: 'applications', label: 'Applications', icon: FileText, count: 1 },
  { id: 'messages', label: 'Messages', icon: MessageSquare, count: 3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const STATS = [
  { label: 'Saved Homes', value: '12', icon: Heart, change: '+3 this week', color: 'text-rose-500', bg: 'bg-rose-50' },
  { label: 'Upcoming Tours', value: '2', icon: Calendar, change: 'Next: Tomorrow', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Applications', value: '1', icon: FileText, change: 'Draft', color: 'text-blue-600', bg: 'bg-blue-50' },
];

const UPCOMING_TOUR = {
  property: 'The Emerald Heights',
  address: '2300 4th Ave, Seattle, WA 98121',
  date: 'Tomorrow, Oct 14',
  time: '10:00 AM',
  type: 'In-Person Tour',
  image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
  agent: 'Sarah Miller'
};

const RECENT_ACTIVITY = [
  { id: 1, type: 'viewed', property: 'West Edge Apartments', time: '2 hours ago', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=200&q=80' },
  { id: 2, type: 'saved', property: 'Pike Motorworks', time: 'Yesterday', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=200&q=80' },
  { id: 3, type: 'price_drop', property: 'Tower 12', time: '2 days ago', priceDrop: '$2,450 → $2,300', image: 'https://images.unsplash.com/photo-1512918760383-eda2723ad6e1?auto=format&fit=crop&w=200&q=80' },
];

// --- Components ---

const TopNavigation = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (id: string) => void }) => (
  <div className="bg-white border-b border-gray-200 sticky top-0 z-50 font-sans">
    {/* Top Bar: Logo & Utilities */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center gap-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#134e4a] rounded-lg flex items-center justify-center">
            <Home className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#134e4a] hidden sm:block">Apartments.com</span>
        </div>
        
        {/* Global Search - Desktop */}
        <div className="hidden md:block relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search by city, neighborhood, or address" 
            className="pl-9 pr-4 py-2 w-80 rounded-full bg-gray-100 border-transparent focus:bg-white focus:border-[#134e4a] focus:ring-2 focus:ring-[#134e4a]/20 outline-none text-sm transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-gray-200 mx-2 hidden sm:block" />
        
        <button className="flex items-center gap-3 hover:bg-gray-50 p-1.5 rounded-full transition-colors">
          <div className="w-8 h-8 rounded-full bg-[#f0fdf4] flex items-center justify-center text-[#134e4a] font-bold text-sm border border-[#134e4a]/20">
            AM
          </div>
          <span className="text-sm font-medium text-gray-700 hidden sm:block">Alex Morgan</span>
        </button>
      </div>
    </div>

    {/* Secondary Bar: Navigation Tabs */}
    <div className="border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1 overflow-x-auto hide-scrollbar -mb-px">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-3.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                activeTab === item.id
                  ? "border-[#134e4a] text-[#134e4a]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              <item.icon size={18} className={cn(activeTab === item.id ? "text-[#134e4a]" : "text-gray-400")} />
              {item.label}
              {item.count && (
                <span className={cn(
                  "ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold",
                  activeTab === item.id ? "bg-[#134e4a]/10 text-[#134e4a]" : "bg-gray-100 text-gray-500"
                )}>
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  </div>
);

const StatsCard = ({ stat }: { stat: typeof STATS[0] }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
        <span className="text-xs font-medium text-green-600">{stat.change}</span>
      </div>
    </div>
    <div className={cn("p-3 rounded-lg", stat.bg)}>
      <stat.icon size={24} className={stat.color} />
    </div>
  </div>
);

const UpcomingTourCard = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
      <div className="flex items-center gap-2 text-[#134e4a] font-bold">
        <Calendar size={20} />
        <h3>Next Upcoming Tour</h3>
      </div>
      <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded">
        TOMORROW
      </span>
    </div>
    
    <div className="p-6 flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/3 aspect-video md:aspect-square rounded-lg overflow-hidden relative">
        <img 
          src={UPCOMING_TOUR.image} 
          alt={UPCOMING_TOUR.property}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>
      
      <div className="flex-1 space-y-4">
        <div>
          <h4 className="text-xl font-bold text-gray-900 mb-1">{UPCOMING_TOUR.property}</h4>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <MapPin size={14} />
            {UPCOMING_TOUR.address}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-100">
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Time</p>
            <div className="flex items-center gap-2 text-gray-900 font-medium">
              <Clock size={16} className="text-[#134e4a]" />
              {UPCOMING_TOUR.time}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Agent</p>
            <div className="flex items-center gap-2 text-gray-900 font-medium">
              <User size={16} className="text-[#134e4a]" />
              {UPCOMING_TOUR.agent}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 bg-[#134e4a] text-white py-2.5 rounded-lg font-bold text-sm hover:bg-[#0f3f3c] transition-colors">
            Get Directions
          </button>
          <button className="flex-1 bg-white border border-gray-200 text-gray-700 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors">
            Reschedule
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ActivityItem = ({ item }: { item: any }) => (
  <div className="flex gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group">
    <img 
      src={item.image} 
      alt={item.property}
      className="w-16 h-16 rounded-lg object-cover"
    />
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-start">
        <h5 className="font-bold text-gray-900 truncate group-hover:text-[#134e4a] transition-colors">{item.property}</h5>
        <span className="text-xs text-gray-400 whitespace-nowrap">{item.time}</span>
      </div>
      <p className="text-sm text-gray-500 mb-1">
        {item.type === 'viewed' && 'Viewed details page'}
        {item.type === 'saved' && 'Added to saved list'}
        {item.type === 'price_drop' && <span className="text-green-600 font-medium">Price drop: {item.priceDrop}</span>}
      </p>
      <div className="flex items-center gap-1 text-xs text-[#134e4a] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        View Property <ChevronRight size={12} />
      </div>
    </div>
  </div>
);

// --- Main Layout ---

export function ApartmentUserDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
        .font-sans { font-family: 'Manrope', sans-serif; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <TopNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome back, Alex!</h1>
          <p className="text-gray-500">Here's what's happening with your search today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          {STATS.map((stat) => (
            <StatsCard key={stat.label} stat={stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Main Activity */}
          <div className="lg:col-span-2 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
            {/* Upcoming Tour */}
            <UpcomingTourCard />

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-900">Recent Activity</h3>
                <button className="text-sm font-medium text-[#134e4a] hover:underline">View All</button>
              </div>
              <div className="divide-y divide-gray-50">
                {RECENT_ACTIVITY.map((item) => (
                  <ActivityItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Recommendations */}
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
            {/* Saved Search Teaser */}
            <div className="bg-[#134e4a] rounded-xl p-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="relative z-10">
                <h3 className="font-bold text-lg mb-2">Saved Searches</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm bg-white/10 p-2 rounded-lg">
                    <span>Downtown (2 Beds)</span>
                    <span className="bg-green-500 text-xs px-1.5 py-0.5 rounded">+2 New</span>
                  </div>
                  <div className="flex items-center justify-between text-sm bg-white/10 p-2 rounded-lg">
                    <span>Capitol Hill (Pets)</span>
                    <span className="text-gray-300 text-xs">No updates</span>
                  </div>
                </div>
                <button className="w-full bg-white text-[#134e4a] py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors">
                  View All 4 Searches
                </button>
              </div>
            </div>

            {/* Recommended */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="font-bold text-lg text-gray-900">Recommended for You</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="group cursor-pointer">
                  <div className="aspect-[16/10] rounded-lg overflow-hidden relative mb-2">
                    <img 
                      src="https://images.unsplash.com/photo-1512918760532-3ed462f01807?auto=format&fit=crop&w=400&q=80" 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      alt="Recommendation"
                    />
                    <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded text-xs font-bold text-[#134e4a]">
                      $2,850/mo
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-900 truncate">Modern Downtown Loft</h4>
                  <p className="text-xs text-gray-500">98% Match • Near Work</p>
                </div>
                
                <div className="group cursor-pointer">
                  <div className="aspect-[16/10] rounded-lg overflow-hidden relative mb-2">
                    <img 
                      src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80" 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      alt="Recommendation"
                    />
                     <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded text-xs font-bold text-[#134e4a]">
                      $1,950/mo
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-900 truncate">Cozy Studio in Ballard</h4>
                  <p className="text-xs text-gray-500">95% Match • Pet Friendly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}