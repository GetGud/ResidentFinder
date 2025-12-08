import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Plus,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle,
  Home
} from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Mock Data ---
const STATS = [
  { label: 'Total Properties', value: '12', change: '+2 this month', trend: 'up', icon: Building2 },
  { label: 'Occupancy Rate', value: '94%', change: '+1.5%', trend: 'up', icon: Users },
  { label: 'Active Leads', value: '28', change: '+12 this week', trend: 'up', icon: MessageSquare },
  { label: 'Total Revenue', value: '$142.5k', change: '+$8.2k', trend: 'up', icon: BarChart3 },
];

const LEADS = [
  { id: 1, name: 'Sarah Jenkins', property: 'The Emerald Heights', unit: '10B', status: 'New', date: '2 mins ago', avatar: 'SJ' },
  { id: 2, name: 'Michael Chen', property: 'Pineview Lofts', unit: '404', status: 'Tour Scheduled', date: '1 hour ago', avatar: 'MC' },
  { id: 3, name: 'David Wilson', property: 'Azure Waterfront', unit: 'PH2', status: 'Applied', date: '3 hours ago', avatar: 'DW' },
  { id: 4, name: 'Emma Rodriguez', property: 'The Emerald Heights', unit: '5A', status: 'Contacted', date: 'Yesterday', avatar: 'ER' },
  { id: 5, name: 'James Kim', property: 'The Brickyard', unit: '2B', status: 'New', date: 'Yesterday', avatar: 'JK' },
];

const PROPERTIES = [
  { id: 1, name: 'The Emerald Heights', units: 120, vacant: 4, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=100&q=80' },
  { id: 2, name: 'Pineview Lofts', units: 45, vacant: 2, image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=100&q=80' },
  { id: 3, name: 'Azure Waterfront', units: 80, vacant: 1, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=100&q=80' },
];

// --- Components ---

const Sidebar = () => (
  <div className="w-64 bg-[#0f3f3c] text-white flex flex-col h-full flex-shrink-0">
    <div className="h-16 flex items-center px-6 border-b border-white/10">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white">
          <Home size={18} />
        </div>
        <span className="font-bold text-lg tracking-tight">Manager Pro</span>
      </div>
    </div>

    <div className="flex-1 py-6 space-y-1 px-3">
      {[
        { icon: LayoutDashboard, label: 'Dashboard', active: true },
        { icon: Building2, label: 'Properties' },
        { icon: Users, label: 'Tenants' },
        { icon: MessageSquare, label: 'Leads & Inbox', badge: '5' },
        { icon: BarChart3, label: 'Analytics' },
        { icon: Settings, label: 'Settings' },
      ].map((item) => (
        <button
          key={item.label}
          className={cn(
            "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
            item.active 
              ? "bg-white/10 text-white" 
              : "text-gray-400 hover:bg-white/5 hover:text-white"
          )}
        >
          <div className="flex items-center gap-3">
            <item.icon size={20} />
            {item.label}
          </div>
          {item.badge && (
            <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {item.badge}
            </span>
          )}
        </button>
      ))}
    </div>

    <div className="p-4 border-t border-white/10">
      <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
        <LogOut size={20} />
        Sign Out
      </button>
    </div>
  </div>
);

const Header = () => (
  <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
    <h1 className="text-xl font-bold text-gray-900">Dashboard Overview</h1>
    
    <div className="flex items-center gap-6">
      <div className="relative hidden md:block">
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input 
          type="text" 
          placeholder="Search properties, tenants..." 
          className="pl-10 pr-4 py-2 w-64 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-gray-900">Alex Johnson</p>
            <p className="text-xs text-gray-500">Property Manager</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold border-2 border-emerald-100">
            AJ
          </div>
        </div>
      </div>
    </div>
  </header>
);

const StatCard = ({ stat }: { stat: typeof STATS[0] }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className={cn("p-3 rounded-lg", "bg-emerald-50 text-emerald-700")}>
        <stat.icon size={24} />
      </div>
      <span className={cn(
        "text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1",
        stat.trend === 'up' ? "text-emerald-700 bg-emerald-50" : "text-red-700 bg-red-50"
      )}>
        {stat.change}
      </span>
    </div>
    <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
    <p className="text-sm text-gray-500 font-medium mt-1">{stat.label}</p>
  </div>
);

const LeadsTable = () => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
    <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
      <h3 className="font-bold text-gray-900">Recent Leads</h3>
      <button className="text-sm font-medium text-primary hover:text-emerald-700">View All</button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-gray-500 font-medium">
          <tr>
            <th className="px-6 py-3">Prospect</th>
            <th className="px-6 py-3">Property & Unit</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {LEADS.map((lead) => (
            <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-bold">
                    {lead.avatar}
                  </div>
                  <span className="font-semibold text-gray-900">{lead.name}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div>
                  <p className="font-medium text-gray-900">{lead.property}</p>
                  <p className="text-gray-500 text-xs">Unit {lead.unit}</p>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold",
                  lead.status === 'New' && "bg-blue-50 text-blue-700",
                  lead.status === 'Contacted' && "bg-orange-50 text-orange-700",
                  lead.status === 'Tour Scheduled' && "bg-purple-50 text-purple-700",
                  lead.status === 'Applied' && "bg-emerald-50 text-emerald-700"
                )}>
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    lead.status === 'New' && "bg-blue-500",
                    lead.status === 'Contacted' && "bg-orange-500",
                    lead.status === 'Tour Scheduled' && "bg-purple-500",
                    lead.status === 'Applied' && "bg-emerald-500"
                  )} />
                  {lead.status}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-500">{lead.date}</td>
              <td className="px-6 py-4 text-right">
                <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                  <MoreVertical size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const MiniPropertyCard = ({ property }: { property: typeof PROPERTIES[0] }) => (
  <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white hover:border-primary/50 transition-colors cursor-pointer">
    <img 
      src={property.image} 
      alt={property.name} 
      className="w-16 h-16 rounded-lg object-cover"
    />
    <div className="flex-1 min-w-0">
      <h4 className="font-bold text-gray-900 truncate">{property.name}</h4>
      <div className="flex items-center gap-4 mt-1 text-sm">
        <span className="text-gray-500">{property.units} Units</span>
        <span className={cn(
          "font-medium",
          property.vacant > 0 ? "text-amber-600" : "text-emerald-600"
        )}>
          {property.vacant} Vacant
        </span>
      </div>
    </div>
    <ChevronRight className="text-gray-400 w-5 h-5" />
  </div>
);

// Helper Icon
const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

// --- Main Component ---
export function ApartmentLandlordDashboard() {
  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {STATS.map((stat) => (
                <StatCard key={stat.label} stat={stat} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Chart/Table Area */}
              <div className="lg:col-span-2 space-y-8">
                {/* Leads Table */}
                <LeadsTable />
                
                {/* Simple Visualization Placeholder */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-gray-900">Views & Applications</h3>
                    <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50 outline-none focus:ring-2 focus:ring-primary/20">
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                    </select>
                  </div>
                  <div className="h-64 flex items-end justify-between gap-2 px-4">
                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                      <div key={i} className="w-full bg-emerald-50 rounded-t-sm relative group">
                        <div 
                          className="absolute bottom-0 left-0 right-0 bg-primary/80 rounded-t-sm transition-all group-hover:bg-primary"
                          style={{ height: `${h}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4 text-xs text-gray-400 font-medium px-4">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Properties */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 text-lg">Your Properties</h3>
                  <button className="p-2 bg-primary text-white rounded-full hover:bg-emerald-800 transition-colors">
                    <Plus size={20} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {PROPERTIES.map(p => (
                    <MiniPropertyCard key={p.id} property={p} />
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-[#134e4a] rounded-xl p-6 text-white relative overflow-hidden mt-8">
                  <div className="relative z-10">
                    <h3 className="font-bold text-lg mb-2">Boost Occupancy</h3>
                    <p className="text-emerald-100 text-sm mb-4">Promote your listings to reach 2x more potential renters this weekend.</p>
                    <button className="bg-white text-[#134e4a] px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-50 transition-colors">
                      Boost Listings
                    </button>
                  </div>
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-400/20 rounded-full blur-3xl" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ApartmentLandlordDashboard;