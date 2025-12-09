import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Building2,
    Users,
    MessageSquare,
    BarChart3,
    Settings,
    Bell,
    Search,
    Plus,
    MoreVertical,
    ChevronRight,
    Menu,
    X,
    Mail,
    Phone,
    Calendar,
    DollarSign,
    TrendingUp,
    TrendingDown,
    Home,
    Edit,
    Trash2,
    Eye,
    CheckCircle2,
    Clock,
    AlertCircle,
    FileText,
    CreditCard,
    Shield,
    Key,
    BellRing,
    MapPin,
    Star,
    Bed,
    Bath,
    Wifi,
    Car,
    Coffee
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Modal } from '../components/Modal';

// --- Mock Data ---
const STATS = [
    { label: 'Total Properties', value: '12', change: '+2 this month', trend: 'up', icon: Building2 },
    { label: 'Occupancy Rate', value: '94%', change: '+1.5%', trend: 'up', icon: Users },
    { label: 'Active Leads', value: '28', change: '+12 this week', trend: 'up', icon: MessageSquare },
    { label: 'Total Revenue', value: '$142.5k', change: '+$8.2k', trend: 'up', icon: BarChart3 },
];

const LEADS = [
    { id: 1, name: 'Sarah Jenkins', email: 'sarah.j@email.com', phone: '(206) 555-0123', property: 'The Emerald Heights', unit: '10B', status: 'New', date: '2 mins ago', avatar: 'SJ' },
    { id: 2, name: 'Michael Chen', email: 'mchen@email.com', phone: '(206) 555-0456', property: 'Pineview Lofts', unit: '404', status: 'Tour Scheduled', date: '1 hour ago', avatar: 'MC' },
    { id: 3, name: 'David Wilson', email: 'dwilson@email.com', phone: '(206) 555-0789', property: 'Azure Waterfront', unit: 'PH2', status: 'Applied', date: '3 hours ago', avatar: 'DW' },
    { id: 4, name: 'Emma Rodriguez', email: 'emma.r@email.com', phone: '(206) 555-0321', property: 'The Emerald Heights', unit: '5A', status: 'Contacted', date: 'Yesterday', avatar: 'ER' },
    { id: 5, name: 'James Kim', email: 'jkim@email.com', phone: '(206) 555-0654', property: 'The Brickyard', unit: '2B', status: 'New', date: 'Yesterday', avatar: 'JK' },
];

const PROPERTIES = [
    { id: 1, name: 'The Emerald Heights', address: '2300 4th Ave, Seattle, WA', units: 120, occupied: 116, vacant: 4, revenue: '$58,200', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=100&q=80' },
    { id: 2, name: 'Pineview Lofts', address: '1401 E Pine St, Seattle, WA', units: 45, occupied: 43, vacant: 2, revenue: '$24,300', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=100&q=80' },
    { id: 3, name: 'Azure Waterfront', address: '1200 Western Ave, Seattle, WA', units: 80, occupied: 79, vacant: 1, revenue: '$42,100', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=100&q=80' },
    { id: 4, name: 'The Brickyard', address: '2201 NW Market St, Seattle, WA', units: 32, occupied: 30, vacant: 2, revenue: '$17,900', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=100&q=80' },
];

const TENANTS = [
    { id: 1, name: 'Alex Morgan', email: 'alex.m@email.com', phone: '(206) 555-0101', property: 'The Emerald Heights', unit: '10B', leaseEnd: 'Mar 15, 2025', rent: '$2,850', status: 'current', paidThisMonth: true },
    { id: 2, name: 'Jessica Lee', email: 'jessica.l@email.com', phone: '(206) 555-0102', property: 'Pineview Lofts', unit: '302', leaseEnd: 'Jan 31, 2025', rent: '$1,950', status: 'expiring', paidThisMonth: true },
    { id: 3, name: 'Robert Chen', email: 'robert.c@email.com', phone: '(206) 555-0103', property: 'Azure Waterfront', unit: '1504', leaseEnd: 'Jun 30, 2025', rent: '$3,400', status: 'current', paidThisMonth: false },
    { id: 4, name: 'Maria Garcia', email: 'maria.g@email.com', phone: '(206) 555-0104', property: 'The Brickyard', unit: '201', leaseEnd: 'Feb 28, 2025', rent: '$1,650', status: 'expiring', paidThisMonth: true },
    { id: 5, name: 'Thomas Wright', email: 'thomas.w@email.com', phone: '(206) 555-0105', property: 'The Emerald Heights', unit: '8A', leaseEnd: 'Sep 1, 2025', rent: '$2,650', status: 'current', paidThisMonth: true },
];

// Stays mock data for manager
const STAYS = [
    { id: 1, title: 'Cozy Capitol Hill Studio', location: 'Capitol Hill, Seattle', pricePerNight: 89, rating: 4.92, reviewCount: 156, type: 'Entire place', guests: 2, beds: 1, baths: 1, status: 'active', bookingsThisMonth: 4, revenue: '$1,560', upcomingCheckins: 2, image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=100&q=80' },
    { id: 2, title: 'Modern Downtown Loft with Views', location: 'Downtown Seattle', pricePerNight: 175, rating: 4.88, reviewCount: 89, type: 'Entire place', guests: 4, beds: 2, baths: 1, status: 'active', bookingsThisMonth: 6, revenue: '$2,940', upcomingCheckins: 1, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=100&q=80' },
    { id: 3, title: 'Waterfront Guest Suite', location: 'Ballard, Seattle', pricePerNight: 125, rating: 4.95, reviewCount: 234, type: 'Private room', guests: 2, beds: 1, baths: 1, status: 'draft', bookingsThisMonth: 3, revenue: '$1,875', upcomingCheckins: 0, image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=100&q=80' },
    { id: 4, title: 'Trendy Queen Anne Apartment', location: 'Queen Anne, Seattle', pricePerNight: 145, rating: 4.78, reviewCount: 67, type: 'Entire place', guests: 3, beds: 1, baths: 1, status: 'active', bookingsThisMonth: 8, revenue: '$2,320', upcomingCheckins: 3, image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=100&q=80' },
];

const STAYS_STATS = [
    { label: 'Total Stays', value: '4', change: '+1 this month', trend: 'up', icon: Home },
    { label: 'Active Bookings', value: '8', change: '+3 this week', trend: 'up', icon: Calendar },
    { label: 'Upcoming Check-ins', value: '6', change: 'Next 7 days', trend: 'up', icon: Clock },
    { label: 'Stays Revenue', value: '$8.7k', change: '+$1.2k', trend: 'up', icon: BarChart3 },
];

const NAV_ITEMS = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'properties', icon: Building2, label: 'Properties' },
    { id: 'tenants', icon: Users, label: 'Tenants' },
    { id: 'leads', icon: MessageSquare, label: 'Leads & Inbox', badge: '5' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'settings', icon: Settings, label: 'Settings' },
];

// --- Components ---

const StatCard = ({ stat }: { stat: typeof STATS[0] }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-[#f0fdf4] text-[#134e4a]">
                <stat.icon size={24} />
            </div>
            <span className={cn(
                "text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1",
                stat.trend === 'up' ? "text-emerald-700 bg-emerald-50" : "text-red-700 bg-red-50"
            )}>
                {stat.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
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
            <button className="text-sm font-medium text-[#134e4a] hover:text-emerald-700">View All</button>
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
                    {LEADS.slice(0, 5).map((lead) => (
                        <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#f0fdf4] text-[#134e4a] flex items-center justify-center text-xs font-bold">
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
    <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white hover:border-[#134e4a]/50 transition-colors cursor-pointer">
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

// --- Tab Content Components ---

interface DashboardTabProps {
    onAddProperty?: () => void;
}

const DashboardTab = ({ onAddProperty }: DashboardTabProps) => (
    <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Property Manager Dashboard</h1>
                <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your properties.</p>
            </div>
            <button
                onClick={onAddProperty}
                className="flex items-center gap-2 px-4 py-2 bg-[#134e4a] text-white font-semibold rounded-lg hover:bg-[#0f3f3c] transition-colors shadow-sm"
            >
                <Plus size={18} />
                Add Property
            </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat) => (
                <StatCard key={stat.label} stat={stat} />
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Chart/Table Area */}
            <div className="lg:col-span-2 space-y-8">
                <LeadsTable />

                {/* Chart */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gray-900">Views & Applications</h3>
                        <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50 outline-none focus:ring-2 focus:ring-[#134e4a]/20">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>
                    <div className="h-64 flex items-end justify-between gap-2 px-4">
                        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                            <div key={i} className="w-full bg-[#f0fdf4] rounded-t-sm relative group">
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-[#134e4a]/80 rounded-t-sm transition-all group-hover:bg-[#134e4a]"
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

            {/* Right Column */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 text-lg">Your Properties</h3>
                    <button className="p-2 bg-[#134e4a] text-white rounded-full hover:bg-emerald-800 transition-colors">
                        <Plus size={20} />
                    </button>
                </div>

                <div className="space-y-4">
                    {PROPERTIES.slice(0, 3).map(p => (
                        <MiniPropertyCard key={p.id} property={p} />
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-[#134e4a] rounded-xl p-6 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="font-bold text-lg mb-2">Boost Occupancy</h3>
                        <p className="text-emerald-100 text-sm mb-4">Promote your listings to reach 2x more potential renters.</p>
                        <button className="bg-white text-[#134e4a] px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-50 transition-colors">
                            Boost Listings
                        </button>
                    </div>
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-400/20 rounded-full blur-3xl" />
                </div>
            </div>
        </div>
    </div>
);

interface PropertiesTabProps {
    onAddProperty: () => void;
    onAddStay: () => void;
    onEditProperty?: (property: typeof PROPERTIES[0]) => void;
    onViewProperty?: (property: typeof PROPERTIES[0]) => void;
    onEditStay?: (stay: typeof STAYS[0]) => void;
    onViewStay?: (stay: typeof STAYS[0]) => void;
}

const PropertiesTab = ({ onAddProperty, onAddStay, onEditProperty, onViewProperty, onEditStay, onViewStay }: PropertiesTabProps) => {
    const [viewType, setViewType] = useState<'properties' | 'stays'>('properties');

    return (
        <div className="space-y-6">
            {/* Header with View Toggle */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-gray-900">My Listings</h2>
                    {/* View Toggle */}
                    <div className="flex p-1 bg-gray-100 rounded-lg">
                        <button
                            onClick={() => setViewType('properties')}
                            className={cn(
                                "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                                viewType === 'properties'
                                    ? "bg-white text-[#134e4a] shadow-sm"
                                    : "text-gray-600 hover:text-gray-900"
                            )}
                        >
                            <Building2 className="inline-block w-4 h-4 mr-1.5" />
                            Properties ({PROPERTIES.length})
                        </button>
                        <button
                            onClick={() => setViewType('stays')}
                            className={cn(
                                "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                                viewType === 'stays'
                                    ? "bg-white text-[#134e4a] shadow-sm"
                                    : "text-gray-600 hover:text-gray-900"
                            )}
                        >
                            <Home className="inline-block w-4 h-4 mr-1.5" />
                            Stays ({STAYS.length})
                        </button>
                    </div>
                </div>
                {viewType === 'properties' ? (
                    <button
                        onClick={onAddProperty}
                        className="flex items-center gap-2 px-4 py-2 bg-[#134e4a] text-white font-semibold rounded-lg hover:bg-[#0f3f3c] btn-press"
                    >
                        <Plus size={18} /> Add Property
                    </button>
                ) : (
                    <button
                        onClick={onAddStay}
                        className="flex items-center gap-2 px-4 py-2 bg-[#134e4a] text-white font-semibold rounded-lg hover:bg-[#0f3f3c] btn-press"
                    >
                        <Plus size={18} /> Add Stay
                    </button>
                )}
            </div>

            {/* Properties List */}
            {viewType === 'properties' && (
                <div className="grid gap-6">
                    {PROPERTIES.map((property) => (
                        <div key={property.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="p-6 flex flex-col md:flex-row gap-6">
                                <img src={property.image} alt={property.name} className="w-full md:w-40 h-28 rounded-lg object-cover" />
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900">{property.name}</h3>
                                            <p className="text-sm text-gray-500">{property.address}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => onEditProperty?.(property)}
                                                className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-[#f0fdf4] hover:text-[#134e4a] hover:border-[#134e4a]/30 transition-colors"
                                                title="Edit Property"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => onViewProperty?.(property)}
                                                className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-[#f0fdf4] hover:text-[#134e4a] hover:border-[#134e4a]/30 transition-colors"
                                                title="View Property"
                                            >
                                                <Eye size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="text-xs text-gray-500 font-medium">Total Units</p>
                                            <p className="text-lg font-bold text-gray-900">{property.units}</p>
                                        </div>
                                        <div className="bg-green-50 p-3 rounded-lg">
                                            <p className="text-xs text-green-600 font-medium">Occupied</p>
                                            <p className="text-lg font-bold text-green-700">{property.occupied}</p>
                                        </div>
                                        <div className={cn("p-3 rounded-lg", property.vacant > 0 ? "bg-amber-50" : "bg-green-50")}>
                                            <p className={cn("text-xs font-medium", property.vacant > 0 ? "text-amber-600" : "text-green-600")}>Vacant</p>
                                            <p className={cn("text-lg font-bold", property.vacant > 0 ? "text-amber-700" : "text-green-700")}>{property.vacant}</p>
                                        </div>
                                        <div className="bg-blue-50 p-3 rounded-lg">
                                            <p className="text-xs text-blue-600 font-medium">Monthly Revenue</p>
                                            <p className="text-lg font-bold text-blue-700">{property.revenue}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Stays List */}
            {viewType === 'stays' && (
                <div className="grid gap-6">
                    {STAYS.map((stay) => (
                        <div key={stay.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="p-6 flex flex-col md:flex-row gap-6">
                                <div className="relative">
                                    <img src={stay.image} alt={stay.title} className="w-full md:w-40 h-28 rounded-lg object-cover" />
                                    <span className={cn(
                                        "absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold",
                                        stay.status === 'active' ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                                    )}>
                                        {stay.status === 'active' ? 'Active' : 'Draft'}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900">{stay.title}</h3>
                                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                                <MapPin size={14} /> {stay.location}
                                            </p>
                                            <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                                                <span className="flex items-center gap-1">
                                                    <Star size={14} className="text-amber-500 fill-amber-500" />
                                                    {stay.rating} ({stay.reviewCount})
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Users size={14} /> {stay.guests} guests
                                                </span>
                                                <span>{stay.type}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => onEditStay?.(stay)}
                                                className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-[#f0fdf4] hover:text-[#134e4a] hover:border-[#134e4a]/30 transition-colors"
                                                title="Edit Stay"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => onViewStay?.(stay)}
                                                className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-[#f0fdf4] hover:text-[#134e4a] hover:border-[#134e4a]/30 transition-colors"
                                                title="View Stay"
                                            >
                                                <Eye size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="text-xs text-gray-500 font-medium">Price/Night</p>
                                            <p className="text-lg font-bold text-gray-900">${stay.pricePerNight}</p>
                                        </div>
                                        <div className="bg-purple-50 p-3 rounded-lg">
                                            <p className="text-xs text-purple-600 font-medium">Bookings</p>
                                            <p className="text-lg font-bold text-purple-700">{stay.bookingsThisMonth}</p>
                                        </div>
                                        <div className="bg-amber-50 p-3 rounded-lg">
                                            <p className="text-xs text-amber-600 font-medium">Check-ins</p>
                                            <p className="text-lg font-bold text-amber-700">{stay.upcomingCheckins}</p>
                                        </div>
                                        <div className="bg-blue-50 p-3 rounded-lg">
                                            <p className="text-xs text-blue-600 font-medium">Revenue</p>
                                            <p className="text-lg font-bold text-blue-700">{stay.revenue}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


const TenantsTab = () => {
    const [propertyFilter, setPropertyFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredTenants = TENANTS.filter(tenant => {
        const matchesProperty = propertyFilter === 'all' || tenant.property === propertyFilter;
        const matchesStatus = statusFilter === 'all' ||
            (statusFilter === 'current' && tenant.status === 'current') ||
            (statusFilter === 'expiring' && tenant.status === 'expiring');
        return matchesProperty && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">
                    Tenants ({filteredTenants.length}{filteredTenants.length !== TENANTS.length && ` of ${TENANTS.length}`})
                </h2>
                <div className="flex gap-2">
                    <select
                        value={propertyFilter}
                        onChange={(e) => setPropertyFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]"
                    >
                        <option value="all">All Properties</option>
                        {PROPERTIES.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]"
                    >
                        <option value="all">All Status</option>
                        <option value="current">Current</option>
                        <option value="expiring">Expiring Soon</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 font-medium">
                            <tr>
                                <th className="px-6 py-3">Tenant</th>
                                <th className="px-6 py-3">Property / Unit</th>
                                <th className="px-6 py-3">Lease Ends</th>
                                <th className="px-6 py-3">Rent</th>
                                <th className="px-6 py-3">This Month</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredTenants.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        No tenants match the selected filters
                                    </td>
                                </tr>
                            ) : (
                                filteredTenants.map((tenant) => (
                                    <tr key={tenant.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-[#f0fdf4] text-[#134e4a] flex items-center justify-center font-bold text-sm">
                                                    {tenant.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <span className="font-semibold text-gray-900">{tenant.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-gray-900">{tenant.property}</p>
                                            <p className="text-xs text-gray-500">Unit {tenant.unit}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {tenant.status === 'expiring' && <AlertCircle size={14} className="text-amber-500" />}
                                                <span className={cn(tenant.status === 'expiring' ? "text-amber-600 font-medium" : "text-gray-600")}>
                                                    {tenant.leaseEnd}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{tenant.rent}</td>
                                        <td className="px-6 py-4">
                                            {tenant.paidThisMonth ? (
                                                <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                                                    <CheckCircle2 size={14} /> Paid
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-red-600 font-medium">
                                                    <Clock size={14} /> Pending
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <a
                                                    href={`mailto:${tenant.email}?subject=Re: Unit ${tenant.unit} at ${tenant.property}`}
                                                    className="p-1.5 text-gray-400 hover:text-[#134e4a] hover:bg-[#f0fdf4] rounded transition-colors"
                                                    title={`Email ${tenant.name}`}
                                                >
                                                    <Mail size={16} />
                                                </a>
                                                <a
                                                    href={`tel:${tenant.phone.replace(/[^\d]/g, '')}`}
                                                    className="p-1.5 text-gray-400 hover:text-[#134e4a] hover:bg-[#f0fdf4] rounded transition-colors"
                                                    title={`Call ${tenant.phone}`}
                                                >
                                                    <Phone size={16} />
                                                </a>
                                                <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                                                    <MoreVertical size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const LeadsTab = () => {
    const [leadStatuses, setLeadStatuses] = useState<Record<number, string>>(
        Object.fromEntries(LEADS.map(l => [l.id, l.status]))
    );
    const [statusFilter, setStatusFilter] = useState('all');

    const handleStatusChange = (leadId: number, newStatus: string) => {
        setLeadStatuses(prev => ({ ...prev, [leadId]: newStatus }));
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'New': return 'bg-blue-50 text-blue-700';
            case 'Contacted': return 'bg-orange-50 text-orange-700';
            case 'Tour Scheduled': return 'bg-purple-50 text-purple-700';
            case 'Applied': return 'bg-emerald-50 text-emerald-700';
            default: return 'bg-gray-50 text-gray-700';
        }
    };

    const filteredLeads = LEADS.filter(lead => {
        if (statusFilter === 'all') return true;
        return leadStatuses[lead.id] === statusFilter;
    });

    const filterButtons = [
        { key: 'all', label: 'All Leads' },
        { key: 'New', label: 'New' },
        { key: 'Contacted', label: 'Contacted' },
        { key: 'Tour Scheduled', label: 'Tour Scheduled' },
        { key: 'Applied', label: 'Applied' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">
                    Leads & Inbox ({filteredLeads.length}{filteredLeads.length !== LEADS.length && ` of ${LEADS.length}`})
                </h2>
                <div className="flex gap-2">
                    {filterButtons.map(btn => (
                        <button
                            key={btn.key}
                            onClick={() => setStatusFilter(btn.key)}
                            className={cn(
                                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                                statusFilter === btn.key
                                    ? "bg-[#134e4a] text-white font-bold"
                                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                            )}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 font-medium">
                            <tr>
                                <th className="px-6 py-3">Prospect</th>
                                <th className="px-6 py-3">Contact</th>
                                <th className="px-6 py-3">Property / Unit</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredLeads.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        No leads match the selected filter
                                    </td>
                                </tr>
                            ) : (
                                filteredLeads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-[#f0fdf4] text-[#134e4a] flex items-center justify-center font-bold text-sm">
                                                    {lead.avatar}
                                                </div>
                                                <span className="font-semibold text-gray-900">{lead.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-gray-900">{lead.email}</p>
                                            <p className="text-xs text-gray-500">{lead.phone}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-gray-900">{lead.property}</p>
                                            <p className="text-xs text-gray-500">Unit {lead.unit}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={leadStatuses[lead.id]}
                                                onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                                                className={cn(
                                                    "px-2 py-1 rounded-full text-xs font-bold border-0 cursor-pointer focus:ring-2 focus:ring-[#134e4a]/20 transition-colors",
                                                    getStatusColor(leadStatuses[lead.id])
                                                )}
                                            >
                                                <option value="New">New</option>
                                                <option value="Contacted">Contacted</option>
                                                <option value="Tour Scheduled">Tour Scheduled</option>
                                                <option value="Applied">Applied</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{lead.date}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <a
                                                    href={`mailto:${lead.email}?subject=Re: Unit ${lead.unit} at ${lead.property}`}
                                                    className="p-1.5 text-gray-400 hover:text-[#134e4a] hover:bg-[#f0fdf4] rounded transition-colors"
                                                    title="Email"
                                                >
                                                    <Mail size={16} />
                                                </a>
                                                <a
                                                    href={`tel:${lead.phone.replace(/[^\d]/g, '')}`}
                                                    className="p-1.5 text-gray-400 hover:text-[#134e4a] hover:bg-[#f0fdf4] rounded transition-colors"
                                                    title="Call"
                                                >
                                                    <Phone size={16} />
                                                </a>
                                                <button className="p-1.5 text-gray-400 hover:text-[#134e4a] hover:bg-[#f0fdf4] rounded" title="Schedule Tour">
                                                    <Calendar size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const AnalyticsTab = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat) => (
                <StatCard key={stat.label} stat={stat} />
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-gray-900">Monthly Revenue</h3>
                    <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50">
                        <option>Last 6 Months</option>
                        <option>Last 12 Months</option>
                    </select>
                </div>
                <div className="h-64 flex items-end justify-between gap-3">
                    {[65, 72, 68, 85, 78, 92].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center">
                            <div className="w-full bg-[#134e4a] rounded-t" style={{ height: `${h * 2}px` }} />
                            <span className="text-xs text-gray-400 mt-2">{['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Occupancy Trend */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-gray-900">Occupancy Rate</h3>
                    <span className="text-2xl font-bold text-[#134e4a]">94%</span>
                </div>
                <div className="space-y-4">
                    {PROPERTIES.map((p) => (
                        <div key={p.id}>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-gray-700">{p.name}</span>
                                <span className="text-gray-500">{Math.round((p.occupied / p.units) * 100)}%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#134e4a] rounded-full"
                                    style={{ width: `${(p.occupied / p.units) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Lead Conversion */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6">Lead Conversion Funnel</h3>
            <div className="flex items-center justify-between gap-4">
                {[
                    { label: 'Total Leads', value: 156, color: 'bg-blue-500' },
                    { label: 'Contacted', value: 112, color: 'bg-orange-500' },
                    { label: 'Tours Scheduled', value: 67, color: 'bg-purple-500' },
                    { label: 'Applications', value: 34, color: 'bg-emerald-500' },
                    { label: 'Leases Signed', value: 28, color: 'bg-[#134e4a]' },
                ].map((stage, i) => (
                    <div key={i} className="flex-1 text-center">
                        <div className={cn("h-24 rounded-lg flex items-end justify-center", stage.color)} style={{ opacity: 1 - (i * 0.15) }}>
                            <span className="text-white font-bold text-2xl pb-2">{stage.value}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2 font-medium">{stage.label}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

interface SettingsTabProps {
    onInvite?: () => void;
}

const SettingsTab = ({ onInvite }: SettingsTabProps) => (
    <div className="space-y-8 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>

        {/* Business Profile */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Building2 size={20} className="text-[#134e4a]" /> Business Profile
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    <input type="text" defaultValue="Johnson Property Management" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                    <input type="email" defaultValue="alex@johnsonpm.com" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input type="tel" defaultValue="(206) 555-0100" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <input type="url" defaultValue="https://johnsonpm.com" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]" />
                </div>
            </div>
            <button className="mt-4 px-4 py-2 bg-[#134e4a] text-white rounded-lg text-sm font-bold hover:bg-[#0f3f3c]">
                Save Changes
            </button>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BellRing size={20} className="text-[#134e4a]" /> Notification Preferences
            </h3>
            <div className="space-y-4">
                {[
                    { title: 'New Lead Alerts', desc: 'Get notified when new leads come in', checked: true },
                    { title: 'Tour Reminders', desc: 'Reminders before scheduled tours', checked: true },
                    { title: 'Application Updates', desc: 'When applications are submitted or updated', checked: true },
                    { title: 'Payment Alerts', desc: 'When rent payments are received or late', checked: false },
                ].map((item, i) => (
                    <label key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
                        <div>
                            <p className="font-medium text-gray-900">{item.title}</p>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                        <input type="checkbox" defaultChecked={item.checked} className="w-5 h-5 text-[#134e4a] rounded focus:ring-[#134e4a]" />
                    </label>
                ))}
            </div>
        </div>

        {/* Billing */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard size={20} className="text-[#134e4a]" /> Billing & Subscription
            </h3>
            <div className="bg-[#f0fdf4] p-4 rounded-lg mb-4">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-bold text-[#134e4a]">Professional Plan</p>
                        <p className="text-sm text-gray-600">Up to 50 properties, unlimited leads</p>
                    </div>
                    <span className="text-2xl font-bold text-[#134e4a]">$99/mo</span>
                </div>
            </div>
            <div className="flex gap-3">
                <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
                    Change Plan
                </button>
                <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
                    Update Payment Method
                </button>
            </div>
        </div>

        {/* Team */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users size={20} className="text-[#134e4a]" /> Team Members
            </h3>
            <div className="space-y-3 mb-4">
                {[
                    { name: 'Alex Johnson', role: 'Owner', email: 'alex@johnsonpm.com' },
                    { name: 'Sarah Miller', role: 'Leasing Agent', email: 'sarah@johnsonpm.com' },
                ].map((member, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#134e4a]/10 text-[#134e4a] flex items-center justify-center font-bold">
                                {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{member.name}</p>
                                <p className="text-xs text-gray-500">{member.email}</p>
                            </div>
                        </div>
                        <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded border border-gray-200">{member.role}</span>
                    </div>
                ))}
            </div>
            <button
                onClick={onInvite}
                className="flex items-center gap-2 px-4 py-2 border border-[#134e4a] text-[#134e4a] rounded-lg text-sm font-bold hover:bg-[#f0fdf4] transition-colors"
            >
                <Plus size={16} /> Invite Team Member
            </button>
        </div>
    </div>
);

// --- Main Component ---
export function ManagerDashboardPage() {
    const [activeItem, setActiveItem] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [addPropertyModal, setAddPropertyModal] = useState(false);
    const [editPropertyModal, setEditPropertyModal] = useState<typeof PROPERTIES[0] | null>(null);
    const [viewPropertyModal, setViewPropertyModal] = useState<typeof PROPERTIES[0] | null>(null);
    // Stay modals
    const [addStayModal, setAddStayModal] = useState(false);
    const [editStayModal, setEditStayModal] = useState<typeof STAYS[0] | null>(null);
    const [viewStayModal, setViewStayModal] = useState<typeof STAYS[0] | null>(null);
    const [inviteModal, setInviteModal] = useState(false);
    const [successToast, setSuccessToast] = useState<string | null>(null);

    const handleAddProperty = () => {
        setAddPropertyModal(true);
    };

    const handleAddStay = () => {
        setAddStayModal(true);
    };

    const confirmAddProperty = () => {
        setSuccessToast('Property added successfully!');
        setAddPropertyModal(false);
        setTimeout(() => setSuccessToast(null), 3000);
    };

    const confirmAddStay = () => {
        setSuccessToast('Stay listing added successfully!');
        setAddStayModal(false);
        setTimeout(() => setSuccessToast(null), 3000);
    };

    const renderTabContent = () => {
        switch (activeItem) {
            case 'dashboard': return <DashboardTab onAddProperty={handleAddProperty} />;
            case 'properties': return (
                <PropertiesTab
                    onAddProperty={handleAddProperty}
                    onAddStay={handleAddStay}
                    onEditProperty={(p) => setEditPropertyModal(p)}
                    onViewProperty={(p) => setViewPropertyModal(p)}
                    onEditStay={(s) => setEditStayModal(s)}
                    onViewStay={(s) => setViewStayModal(s)}
                />
            );
            case 'tenants': return <TenantsTab />;
            case 'leads': return <LeadsTab />;
            case 'analytics': return <AnalyticsTab />;
            case 'settings': return <SettingsTab onInvite={() => setInviteModal(true)} />;
            default: return <DashboardTab onAddProperty={handleAddProperty} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
        .font-sans { font-family: 'Manrope', sans-serif; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
                <div className="max-w-[1920px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                            <Menu size={20} />
                        </button>
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#134e4a] rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">R</span>
                            </div>
                            <span className="text-xl font-extrabold tracking-tight text-[#134e4a] hidden sm:block">
                                Resident<span className="font-light text-gray-500">Finder</span>
                            </span>
                        </Link>
                        <span className="hidden md:inline-block text-sm font-medium text-gray-400 border-l border-gray-200 pl-4 ml-2">
                            Property Manager
                        </span>
                    </div>

                    <div className="flex-1 max-w-xl hidden md:block">
                        <div className="relative">
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search properties, tenants, leads..."
                                className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 border-transparent focus:bg-white focus:border-[#134e4a] focus:ring-2 focus:ring-[#134e4a]/20 outline-none text-sm transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/search" className="text-sm font-medium text-gray-600 hover:text-[#134e4a] hidden lg:block">
                            View Listings
                        </Link>
                        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-semibold text-gray-900">Alex Johnson</p>
                                <p className="text-xs text-gray-500">Property Manager</p>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-[#f0fdf4] flex items-center justify-center text-[#134e4a] font-bold text-sm border border-[#134e4a]/20">
                                AJ
                            </div>
                        </div>
                    </div>
                </div>

                {/* Secondary Nav */}
                <div className="border-t border-gray-100 bg-white hidden md:block">
                    <div className="max-w-[1920px] mx-auto px-4">
                        <nav className="flex items-center gap-1 overflow-x-auto hide-scrollbar -mb-px">
                            {NAV_ITEMS.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveItem(item.id)}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-3.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                                        activeItem === item.id
                                            ? "border-[#134e4a] text-[#134e4a]"
                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    )}
                                >
                                    <item.icon size={18} className={cn(activeItem === item.id ? "text-[#134e4a]" : "text-gray-400")} />
                                    {item.label}
                                    {item.badge && (
                                        <span className={cn(
                                            "ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold",
                                            activeItem === item.id ? "bg-[#134e4a]/10 text-[#134e4a]" : "bg-gray-100 text-gray-500"
                                        )}>
                                            {item.badge}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            </header>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 lg:hidden"
                    >
                        <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl p-4"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <span className="font-bold text-[#134e4a]">Menu</span>
                                <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                                    <X size={20} />
                                </button>
                            </div>
                            {NAV_ITEMS.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => { setActiveItem(item.id); setSidebarOpen(false); }}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-1",
                                        activeItem === item.id
                                            ? "bg-[#134e4a]/10 text-[#134e4a]"
                                            : "text-gray-600 hover:bg-gray-100"
                                    )}
                                >
                                    <item.icon size={20} />
                                    {item.label}
                                </button>
                            ))}
                            <div className="pt-4 border-t border-gray-100 mt-4">
                                <Link
                                    to="/search"
                                    onClick={() => setSidebarOpen(false)}
                                    className="block px-3 py-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition-colors"
                                >
                                    View Listings
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {renderTabContent()}
                </div>
            </main>

            {/* Add Property Modal */}
            <Modal
                isOpen={addPropertyModal}
                onClose={() => setAddPropertyModal(false)}
                title="Add New Property"
                size="lg"
            >
                <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Property Name</label>
                            <input
                                type="text"
                                placeholder="e.g., The Emerald Heights"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Full address"
                                    className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Units</label>
                            <input
                                type="number"
                                placeholder="e.g., 50"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]">
                                <option>Apartment Building</option>
                                <option>Single Family</option>
                                <option>Townhomes</option>
                                <option>Condos</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Rent Range</label>
                            <input
                                type="text"
                                placeholder="e.g., $1,500 - $3,000"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Year Built</label>
                            <input
                                type="number"
                                placeholder="e.g., 2020"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Property Image</label>
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-[#134e4a]/50 transition-colors cursor-pointer">
                            <Building2 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                        </div>
                    </div>

                    <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
                        <button
                            onClick={() => setAddPropertyModal(false)}
                            className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmAddProperty}
                            className="px-6 py-2 bg-[#134e4a] text-white rounded-lg font-bold hover:bg-[#0f3f3c]"
                        >
                            Add Property
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Edit Property Modal */}
            <Modal
                isOpen={!!editPropertyModal}
                onClose={() => setEditPropertyModal(null)}
                title={`Edit Property: ${editPropertyModal?.name || ''}`}
                size="lg"
            >
                {editPropertyModal && (
                    <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Property Name</label>
                                <input
                                    type="text"
                                    defaultValue={editPropertyModal.name}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <input
                                    type="text"
                                    defaultValue={editPropertyModal.address}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Total Units</label>
                                <input
                                    type="number"
                                    defaultValue={editPropertyModal.units}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Revenue</label>
                                <input
                                    type="text"
                                    defaultValue={editPropertyModal.revenue}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
                            <button
                                onClick={() => setEditPropertyModal(null)}
                                className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setSuccessToast('Property updated successfully!');
                                    setEditPropertyModal(null);
                                    setTimeout(() => setSuccessToast(null), 3000);
                                }}
                                className="px-6 py-2 bg-[#134e4a] text-white rounded-lg font-bold hover:bg-[#0f3f3c]"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* View Property Modal */}
            <Modal
                isOpen={!!viewPropertyModal}
                onClose={() => setViewPropertyModal(null)}
                title={viewPropertyModal?.name || 'Property Details'}
                size="lg"
            >
                {viewPropertyModal && (
                    <div className="space-y-6">
                        <img
                            src={viewPropertyModal.image}
                            alt={viewPropertyModal.name}
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-500 mb-1">Total Units</p>
                                <p className="text-2xl font-bold text-gray-900">{viewPropertyModal.units}</p>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg">
                                <p className="text-sm text-green-600 mb-1">Occupied</p>
                                <p className="text-2xl font-bold text-green-700">{viewPropertyModal.occupied}</p>
                            </div>
                            <div className="p-4 bg-amber-50 rounded-lg">
                                <p className="text-sm text-amber-600 mb-1">Vacant</p>
                                <p className="text-2xl font-bold text-amber-700">{viewPropertyModal.vacant}</p>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-600 mb-1">Monthly Revenue</p>
                                <p className="text-2xl font-bold text-blue-700">{viewPropertyModal.revenue}</p>
                            </div>
                        </div>
                        <div className="border-t border-gray-100 pt-4">
                            <p className="text-sm text-gray-500 mb-1">Address</p>
                            <p className="font-medium text-gray-900">{viewPropertyModal.address}</p>
                        </div>
                        <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
                            <button
                                onClick={() => setViewPropertyModal(null)}
                                className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    setViewPropertyModal(null);
                                    setEditPropertyModal(viewPropertyModal);
                                }}
                                className="px-6 py-2 bg-[#134e4a] text-white rounded-lg font-bold hover:bg-[#0f3f3c] flex items-center gap-2"
                            >
                                <Edit size={16} /> Edit Property
                            </button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Invite Team Member Modal */}
            <Modal
                isOpen={inviteModal}
                onClose={() => setInviteModal(false)}
                title="Invite Team Member"
                size="md"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="colleague@company.com"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]">
                            <option>Leasing Agent</option>
                            <option>Property Manager</option>
                            <option>Maintenance Staff</option>
                            <option>Administrator</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Properties Access</label>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                                <input type="checkbox" defaultChecked className="w-4 h-4 text-[#134e4a] rounded focus:ring-[#134e4a]" />
                                <span className="text-sm text-gray-900">All Properties</span>
                            </label>
                            {PROPERTIES.slice(0, 3).map(p => (
                                <label key={p.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                                    <input type="checkbox" className="w-4 h-4 text-[#134e4a] rounded focus:ring-[#134e4a]" />
                                    <span className="text-sm text-gray-900">{p.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
                        <button
                            onClick={() => setInviteModal(false)}
                            className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                setSuccessToast('Invitation sent successfully!');
                                setInviteModal(false);
                                setTimeout(() => setSuccessToast(null), 3000);
                            }}
                            className="px-6 py-2 bg-[#134e4a] text-white rounded-lg font-bold hover:bg-[#0f3f3c]"
                        >
                            Send Invitation
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Add Stay Modal */}
            <Modal
                isOpen={addStayModal}
                onClose={() => setAddStayModal(false)}
                title="Add New Stay Listing"
                size="lg"
            >
                <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Listing Title</label>
                            <input
                                type="text"
                                placeholder="e.g., Cozy Downtown Studio with Views"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Neighborhood, City"
                                    className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price per Night</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="number"
                                    placeholder="e.g., 125"
                                    className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]">
                                <option>Entire place</option>
                                <option>Private room</option>
                                <option>Shared room</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Max Guests</label>
                            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]">
                                <option>1 Guest</option>
                                <option>2 Guests</option>
                                <option>3 Guests</option>
                                <option>4 Guests</option>
                                <option>5+ Guests</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]">
                                <option>Studio</option>
                                <option>1 Bedroom</option>
                                <option>2 Bedrooms</option>
                                <option>3 Bedrooms</option>
                                <option>4+ Bedrooms</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {['WiFi', 'Kitchen', 'Washer/Dryer', 'Free Parking', 'Air Conditioning', 'Self Check-in', 'Pet Friendly', 'Pool', 'Hot Tub'].map((amenity) => (
                                <label key={amenity} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                                    <input type="checkbox" className="w-4 h-4 text-[#134e4a] rounded focus:ring-[#134e4a]" />
                                    <span className="text-sm text-gray-700">{amenity}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Listing Image</label>
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-[#134e4a]/50 transition-colors cursor-pointer">
                            <Home className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                        </div>
                    </div>

                    <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
                        <button
                            onClick={() => setAddStayModal(false)}
                            className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmAddStay}
                            className="px-6 py-2 bg-[#134e4a] text-white rounded-lg font-bold hover:bg-[#0f3f3c]"
                        >
                            Add Stay Listing
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Edit Stay Modal */}
            <Modal
                isOpen={!!editStayModal}
                onClose={() => setEditStayModal(null)}
                title={`Edit: ${editStayModal?.title || ''}`}
                size="lg"
            >
                {editStayModal && (
                    <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Listing Title</label>
                                <input
                                    type="text"
                                    defaultValue={editStayModal.title}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <input
                                    type="text"
                                    defaultValue={editStayModal.location}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price per Night</label>
                                <input
                                    type="number"
                                    defaultValue={editStayModal.pricePerNight}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    defaultValue={editStayModal.status}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]"
                                >
                                    <option value="active">Active</option>
                                    <option value="draft">Draft</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Max Guests</label>
                                <input
                                    type="number"
                                    defaultValue={editStayModal.guests}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                                <input
                                    type="number"
                                    defaultValue={editStayModal.beds}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
                            <button
                                onClick={() => setEditStayModal(null)}
                                className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setSuccessToast('Stay listing updated successfully!');
                                    setEditStayModal(null);
                                    setTimeout(() => setSuccessToast(null), 3000);
                                }}
                                className="px-6 py-2 bg-[#134e4a] text-white rounded-lg font-bold hover:bg-[#0f3f3c]"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* View Stay Modal */}
            <Modal
                isOpen={!!viewStayModal}
                onClose={() => setViewStayModal(null)}
                title={viewStayModal?.title || 'Stay Details'}
                size="lg"
            >
                {viewStayModal && (
                    <div className="space-y-6">
                        <div className="relative">
                            <img
                                src={viewStayModal.image}
                                alt={viewStayModal.title}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <span className={cn(
                                "absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold",
                                viewStayModal.status === 'active' ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                            )}>
                                {viewStayModal.status === 'active' ? 'Active' : 'Draft'}
                            </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                                <MapPin size={16} /> {viewStayModal.location}
                            </span>
                            <span className="flex items-center gap-1">
                                <Star size={16} className="text-amber-500 fill-amber-500" />
                                {viewStayModal.rating} ({viewStayModal.reviewCount} reviews)
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-500 mb-1">Price/Night</p>
                                <p className="text-2xl font-bold text-gray-900">${viewStayModal.pricePerNight}</p>
                            </div>
                            <div className="p-4 bg-purple-50 rounded-lg">
                                <p className="text-sm text-purple-600 mb-1">Bookings This Month</p>
                                <p className="text-2xl font-bold text-purple-700">{viewStayModal.bookingsThisMonth}</p>
                            </div>
                            <div className="p-4 bg-amber-50 rounded-lg">
                                <p className="text-sm text-amber-600 mb-1">Upcoming Check-ins</p>
                                <p className="text-2xl font-bold text-amber-700">{viewStayModal.upcomingCheckins}</p>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-600 mb-1">Revenue</p>
                                <p className="text-2xl font-bold text-blue-700">{viewStayModal.revenue}</p>
                            </div>
                        </div>
                        <div className="border-t border-gray-100 pt-4">
                            <p className="text-sm text-gray-500 mb-2">Property Details</p>
                            <div className="flex items-center gap-4 text-gray-700">
                                <span className="flex items-center gap-1"><Users size={16} /> {viewStayModal.guests} guests</span>
                                <span className="flex items-center gap-1"><Bed size={16} /> {viewStayModal.beds} bed</span>
                                <span className="flex items-center gap-1"><Bath size={16} /> {viewStayModal.baths} bath</span>
                                <span className="text-sm bg-gray-100 px-2 py-1 rounded">{viewStayModal.type}</span>
                            </div>
                        </div>
                        <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
                            <button
                                onClick={() => setViewStayModal(null)}
                                className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    setViewStayModal(null);
                                    setEditStayModal(viewStayModal);
                                }}
                                className="px-6 py-2 bg-[#134e4a] text-white rounded-lg font-bold hover:bg-[#0f3f3c] flex items-center gap-2"
                            >
                                <Edit size={16} /> Edit Listing
                            </button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Success Toast */}
            <AnimatePresence>
                {successToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-6 right-6 bg-[#134e4a] text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-[110]"
                    >
                        <CheckCircle2 size={20} />
                        {successToast}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-[#134e4a] rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">R</span>
                            </div>
                            <span className="text-lg font-bold text-white">ResidentFinder</span>
                        </div>
                        <p className="text-sm">
                            The most trusted rental resource. We verify listings so you can search with confidence.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Renters</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/search" className="hover:text-white">Find Apartments</Link></li>
                            <li><a href="#" className="hover:text-white">Rental Guides</a></li>
                            <li><a href="#" className="hover:text-white">Homes for Rent</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Property Managers</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/manager" className="hover:text-white">List a Property</Link></li>
                            <li><Link to="/manager" className="hover:text-white">Screening Services</Link></li>
                            <li><Link to="/manager" className="hover:text-white">Rental Manager</Link></li>
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
                    © 2024 ResidentFinder. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

export default ManagerDashboardPage;
