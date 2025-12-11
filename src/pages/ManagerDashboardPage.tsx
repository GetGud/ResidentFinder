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
import {
    MOCK_MANAGER_STATS,
    MOCK_STAYS_STATS,
    MOCK_LEADS,
    MOCK_MANAGER_PROPERTIES,
    MOCK_TENANTS,
    MOCK_MANAGER_STAYS,
    MOCK_GUESTS
} from '../data/mockData';

// --- Mock Data --- (Refactored to use centralized data)
const STATS = MOCK_MANAGER_STATS;
const STAYS_STATS = MOCK_STAYS_STATS;
const LEADS = MOCK_LEADS;
const PROPERTIES = MOCK_MANAGER_PROPERTIES;
const TENANTS = MOCK_TENANTS;
const STAYS = MOCK_MANAGER_STAYS;
const GUESTS = MOCK_GUESTS;



const NAV_ITEMS = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'properties', icon: Building2, label: 'Properties' },
    { id: 'tenants', icon: Users, label: 'Residents & Guests' },
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

const RecentBookingsWidget = () => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Recent Bookings</h3>
            <button className="text-sm font-medium text-[#134e4a] hover:text-emerald-700">View All</button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 font-medium">
                    <tr>
                        <th className="px-6 py-3">Guest</th>
                        <th className="px-6 py-3">Property</th>
                        <th className="px-6 py-3">Dates</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {GUESTS.slice(0, 5).map((guest) => (
                        <tr key={guest.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center text-xs font-bold">
                                        {guest.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <span className="font-semibold text-gray-900">{guest.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <p className="font-medium text-gray-900">{guest.property}</p>
                                <p className="text-xs text-gray-500">{guest.guests} Guest(s)</p>
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                                {guest.dates}
                            </td>
                            <td className="px-6 py-4">
                                <span className={cn(
                                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold",
                                    guest.status === 'current' ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"
                                )}>
                                    <div className={cn(
                                        "w-1.5 h-1.5 rounded-full",
                                        guest.status === 'current' ? "bg-green-500" : "bg-blue-500"
                                    )} />
                                    {guest.status === 'current' ? 'Checked In' : 'Upcoming'}
                                </span>
                            </td>
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

const MiniStayCard = ({ stay }: { stay: typeof STAYS[0] }) => (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white hover:border-[#134e4a]/50 transition-colors cursor-pointer">
        <img
            src={stay.image}
            alt={stay.title}
            className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
            <h4 className="font-bold text-gray-900 truncate">{stay.title}</h4>
            <div className="flex items-center gap-4 mt-1 text-sm">
                <span className="text-gray-500 flex items-center gap-1"><Star size={12} className="text-amber-500 fill-amber-500" /> {stay.rating}</span>
                <span className="font-medium text-purple-600">
                    {stay.upcomingCheckins} Check-ins
                </span>
            </div>
        </div>
        <ChevronRight className="text-gray-400 w-5 h-5" />
    </div>
);

// --- Tab Content Components ---

interface DashboardTabProps {
    onAddProperty?: () => void;
    onAddStay?: () => void;
}

const DashboardTab = ({ onAddProperty, onAddStay }: DashboardTabProps) => {
    const [dashboardContext, setDashboardContext] = useState<'rentals' | 'stays'>('rentals');

    const currentStats = dashboardContext === 'rentals' ? STATS : STAYS_STATS;

    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Property Manager Dashboard</h1>
                    <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your {dashboardContext} today.</p>
                </div>

                {/* Context Switcher */}
                <div className="flex p-1 bg-gray-100 rounded-lg self-start">
                    <button
                        onClick={() => setDashboardContext('rentals')}
                        className={cn(
                            "px-4 py-2 text-sm font-bold rounded-md transition-all",
                            dashboardContext === 'rentals'
                                ? "bg-white text-[#134e4a] shadow-sm"
                                : "text-gray-500 hover:text-gray-900"
                        )}
                    >
                        Long-Term Rentals
                    </button>
                    <button
                        onClick={() => setDashboardContext('stays')}
                        className={cn(
                            "px-4 py-2 text-sm font-bold rounded-md transition-all",
                            dashboardContext === 'stays'
                                ? "bg-white text-[#134e4a] shadow-sm"
                                : "text-gray-500 hover:text-gray-900"
                        )}
                    >
                        Short-Term Stays
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentStats.map((stat) => (
                    <StatCard key={stat.label} stat={stat} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart/Table Area */}
                <div className="lg:col-span-2 space-y-8">
                    {dashboardContext === 'rentals' ? <LeadsTable /> : <RecentBookingsWidget />}

                    {/* Chart */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-gray-900">
                                {dashboardContext === 'rentals' ? 'Views & Applications' : 'Views & Bookings'}
                            </h3>
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
                        <h3 className="font-bold text-gray-900 text-lg">
                            {dashboardContext === 'rentals' ? 'Your Properties' : 'Your Stays'}
                        </h3>
                        {dashboardContext === 'rentals' ? (
                            <button
                                onClick={onAddProperty}
                                className="p-2 bg-[#134e4a] text-white rounded-full hover:bg-emerald-800 transition-colors"
                            >
                                <Plus size={20} />
                            </button>
                        ) : (
                            <button
                                onClick={onAddStay}
                                className="p-2 bg-[#134e4a] text-white rounded-full hover:bg-emerald-800 transition-colors"
                            >
                                <Plus size={20} />
                            </button>
                        )}
                    </div>

                    <div className="space-y-4">
                        {dashboardContext === 'rentals' ? (
                            PROPERTIES.slice(0, 3).map(p => (
                                <MiniPropertyCard key={p.id} property={p} />
                            ))
                        ) : (
                            STAYS.slice(0, 3).map(s => (
                                <MiniStayCard key={s.id} stay={s} />
                            ))
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-[#134e4a] rounded-xl p-6 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="font-bold text-lg mb-2">Boost Occupancy</h3>
                            <p className="text-emerald-100 text-sm mb-4">Promote your listings to reach 2x more potential {dashboardContext === 'rentals' ? 'renters' : 'guests'}.</p>
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
};

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
    const [viewMode, setViewMode] = useState<'residents' | 'guests'>('residents');
    const [propertyFilter, setPropertyFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredTenants = TENANTS.filter(tenant => {
        const matchesProperty = propertyFilter === 'all' || tenant.property === propertyFilter;
        const matchesStatus = statusFilter === 'all' ||
            (statusFilter === 'current' && tenant.status === 'current') ||
            (statusFilter === 'expiring' && tenant.status === 'expiring');
        return matchesProperty && matchesStatus;
    });

    const filteredGuests = GUESTS.filter(guest => {
        const matchesProperty = propertyFilter === 'all' || guest.property === propertyFilter;
        const matchesStatus = statusFilter === 'all' ||
            (statusFilter === 'upcoming' && guest.status === 'upcoming') ||
            (statusFilter === 'current' && guest.status === 'current');
        return matchesProperty && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {viewMode === 'residents' ? 'Residents' : 'Guests'} ({viewMode === 'residents' ? filteredTenants.length : filteredGuests.length})
                    </h2>
                    {/* View Toggle */}
                    <div className="flex p-1 bg-gray-100 rounded-lg">
                        <button
                            onClick={() => setViewMode('residents')}
                            className={cn(
                                "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                                viewMode === 'residents'
                                    ? "bg-white text-[#134e4a] shadow-sm"
                                    : "text-gray-600 hover:text-gray-900"
                            )}
                        >
                            <Users className="inline-block w-4 h-4 mr-1.5" />
                            Residents
                        </button>
                        <button
                            onClick={() => setViewMode('guests')}
                            className={cn(
                                "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                                viewMode === 'guests'
                                    ? "bg-white text-[#134e4a] shadow-sm"
                                    : "text-gray-600 hover:text-gray-900"
                            )}
                        >
                            <Calendar className="inline-block w-4 h-4 mr-1.5" />
                            Guests
                        </button>
                    </div>
                </div>

                <div className="flex gap-2">
                    <select
                        value={propertyFilter}
                        onChange={(e) => setPropertyFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]"
                    >
                        <option value="all">All Properties</option>
                        {viewMode === 'residents'
                            ? PROPERTIES.map(p => <option key={p.id} value={p.name}>{p.name}</option>)
                            : STAYS.map(s => <option key={s.id} value={s.title}>{s.title}</option>)
                        }
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]"
                    >
                        <option value="all">All Status</option>
                        {viewMode === 'residents' ? (
                            <>
                                <option value="current">Current</option>
                                <option value="expiring">Expiring Soon</option>
                            </>
                        ) : (
                            <>
                                <option value="upcoming">Upcoming</option>
                                <option value="current">Current</option>
                            </>
                        )}
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 font-medium">
                            <tr>
                                <th className="px-6 py-3">{viewMode === 'residents' ? 'Tenant' : 'Guest'}</th>
                                <th className="px-6 py-3">Property / Unit</th>
                                <th className="px-6 py-3">{viewMode === 'residents' ? 'Lease Ends' : 'Dates'}</th>
                                <th className="px-6 py-3">{viewMode === 'residents' ? 'Rent' : 'Total'}</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {viewMode === 'residents' ? (
                                filteredTenants.length === 0 ? (
                                    <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">No residents match</td></tr>
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
                                                    <span className="inline-flex items-center gap-1 text-green-600 font-medium"><CheckCircle2 size={14} /> Paid</span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 text-red-600 font-medium"><Clock size={14} /> Pending</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button className="p-1.5 text-gray-400 hover:text-[#134e4a] hover:bg-[#f0fdf4] rounded"><Mail size={16} /></button>
                                                    <button className="p-1.5 text-gray-400 hover:text-[#134e4a] hover:bg-[#f0fdf4] rounded"><Phone size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )
                            ) : (
                                filteredGuests.length === 0 ? (
                                    <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">No guests match</td></tr>
                                ) : (
                                    filteredGuests.map((guest) => (
                                        <tr key={guest.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-sm">
                                                        {guest.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold text-gray-900 block">{guest.name}</span>
                                                        <span className="text-xs text-gray-500">{guest.guests} guests</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-gray-900">{guest.property}</p>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{guest.dates}</td>
                                            <td className="px-6 py-4 font-medium text-gray-900">{guest.total}</td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold",
                                                    guest.status === 'current' ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"
                                                )}>
                                                    <div className={cn("w-1.5 h-1.5 rounded-full", guest.status === 'current' ? "bg-green-500" : "bg-blue-500")} />
                                                    {guest.status === 'current' ? 'Checked In' : 'Upcoming'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button className="p-1.5 text-gray-400 hover:text-[#134e4a] hover:bg-[#f0fdf4] rounded"><Mail size={16} /></button>
                                                    <button className="p-1.5 text-gray-400 hover:text-[#134e4a] hover:bg-[#f0fdf4] rounded"><Phone size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )
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
                                <th className="px-6 py-3">Type</th>
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
                                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
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
                                            {STAYS.some(s => s.title === lead.property) ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700">
                                                    <Home size={12} /> Stay
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700">
                                                    <Building2 size={12} /> Lease
                                                </span>
                                            )}
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

const AnalyticsTab = () => {
    const [context, setContext] = useState<'rentals' | 'stays'>('rentals');
    const [timeRange, setTimeRange] = useState('30d');

    // Enhanced Mock Data for Analytics
    const RENTAL_KPI = [
        { label: 'Total Revenue', value: '$142,500', change: '+$8.2k', trend: 'up', icon: DollarSign, color: 'text-emerald-700', bg: 'bg-emerald-50' },
        { label: 'Occupancy Rate', value: '94%', change: '+1.5%', trend: 'up', icon: Users, color: 'text-blue-700', bg: 'bg-blue-50' },
        { label: 'Outstanding Rent', value: '$4,250', change: '-$1.2k', trend: 'down', icon: AlertCircle, color: 'text-amber-700', bg: 'bg-amber-50' },
        { label: 'Active Leads', value: '28', change: '+12', trend: 'up', icon: MessageSquare, color: 'text-purple-700', bg: 'bg-purple-50' },
    ];

    const STAY_KPI = [
        { label: 'Gross Revenue', value: '$12,450', change: '+$2.1k', trend: 'up', icon: DollarSign, color: 'text-emerald-700', bg: 'bg-emerald-50' },
        { label: 'Occupancy Rate', value: '78%', change: '+5%', trend: 'up', icon: Bed, color: 'text-blue-700', bg: 'bg-blue-50' },
        { label: 'Avg Nightly Rate', value: '$145', change: '+$15', trend: 'up', icon: TrendingUp, color: 'text-indigo-700', bg: 'bg-indigo-50' },
        { label: 'Guest Rating', value: '4.85', change: '+0.2', trend: 'up', icon: Star, color: 'text-amber-700', bg: 'bg-amber-50' },
    ];

    const REVENUE_DATA = [
        { month: 'Jul', rental: 125000, stay: 8500 },
        { month: 'Aug', rental: 128000, stay: 10200 },
        { month: 'Sep', rental: 132000, stay: 9800 },
        { month: 'Oct', rental: 135000, stay: 11500 },
        { month: 'Nov', rental: 138000, stay: 10800 },
        { month: 'Dec', rental: 142500, stay: 12450 },
    ];

    const kpis = context === 'rentals' ? RENTAL_KPI : STAY_KPI;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
                    <p className="text-gray-500 mt-1">
                        Performance metrics for your <span className="font-semibold text-[#134e4a]">{context === 'rentals' ? 'Long-Term Rentals' : 'Short-Term Stays'}</span>
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {/* Context Switcher */}
                    <div className="flex p-1 bg-gray-100 rounded-lg">
                        <button
                            onClick={() => setContext('rentals')}
                            className={cn(
                                "px-3 py-1.5 text-sm font-bold rounded-md transition-all flex items-center gap-2",
                                context === 'rentals' ? "bg-white text-[#134e4a] shadow-sm" : "text-gray-500 hover:text-gray-900"
                            )}
                        >
                            <Building2 size={16} /> Rentals
                        </button>
                        <button
                            onClick={() => setContext('stays')}
                            className={cn(
                                "px-3 py-1.5 text-sm font-bold rounded-md transition-all flex items-center gap-2",
                                context === 'stays' ? "bg-white text-[#134e4a] shadow-sm" : "text-gray-500 hover:text-gray-900"
                            )}
                        >
                            <Home size={16} /> Stays
                        </button>
                    </div>

                    {/* Time Range */}
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20"
                    >
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                        <option value="90d">Last Quarter</option>
                        <option value="12m">Last 12 Months</option>
                    </select>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map((kpi, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={cn("p-3 rounded-xl transition-colors", kpi.bg, "group-hover:scale-110 duration-300")}>
                                <kpi.icon size={24} className={kpi.color} />
                            </div>
                            <span className={cn(
                                "text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1",
                                kpi.change.startsWith('+') ? "text-emerald-700 bg-emerald-50" : "text-red-700 bg-red-50"
                            )}>
                                {kpi.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                {kpi.change}
                            </span>
                        </div>
                        <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">{kpi.value}</h3>
                        <p className="text-sm text-gray-500 font-medium mt-1">{kpi.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Graph - Revenue Trend */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg">Revenue Trends</h3>
                            <p className="text-sm text-gray-500">Monthly breakdown for {context}</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <span className={cn("w-3 h-3 rounded-full", context === 'rentals' ? "bg-[#134e4a]" : "bg-indigo-600")} />
                                <span>{context === 'rentals' ? 'Rental Income' : 'Stay Revenue'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <span className="w-3 h-3 rounded-full bg-gray-200" />
                                <span>Projected</span>
                            </div>
                        </div>
                    </div>

                    {/* CSS Bar Chart */}
                    <div className="h-72 flex items-end justify-between gap-4 sm:gap-8 px-2">
                        {REVENUE_DATA.map((d, i) => {
                            const val = context === 'rentals' ? d.rental : d.stay;
                            const height = `${(val / (context === 'rentals' ? 150000 : 15000)) * 100}%`;
                            return (
                                <div key={i} className="flex-1 flex flex-col items-center group relative">
                                    {/* Tooltip */}
                                    <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs py-1 px-2 rounded shadow-lg whitespace-nowrap z-10 pointer-events-none">
                                        ${val.toLocaleString()}
                                    </div>

                                    <div className="w-full relative h-[250px] bg-gray-50 rounded-t-lg overflow-hidden flex items-end">
                                        <div
                                            className={cn(
                                                "w-full rounded-t-sm transition-all duration-700 ease-out",
                                                context === 'rentals' ? "bg-[#134e4a] group-hover:bg-[#0f3f3c]" : "bg-indigo-600 group-hover:bg-indigo-700"
                                            )}
                                            style={{ height: height }}
                                        />
                                    </div>
                                    <span className="text-xs font-semibold text-gray-500 mt-3">{d.month}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Donut Charts / Distribution */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                    <h3 className="font-bold text-gray-900 text-lg mb-6">
                        {context === 'rentals' ? 'Payment Status' : 'Guest Ratings'}
                    </h3>

                    <div className="flex-1 flex flex-col items-center justify-center">
                        {context === 'rentals' ? (
                            <>
                                <div className="relative w-48 h-48 rounded-full mb-6" style={{ background: 'conic-gradient(#10b981 0% 75%, #f59e0b 75% 90%, #ef4444 90% 100%)' }}>
                                    <div className="absolute inset-4 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                                        <span className="text-3xl font-extrabold text-gray-900">92%</span>
                                        <span className="text-xs text-gray-500 font-bold uppercase tracking-wide">Collected</span>
                                    </div>
                                </div>
                                <div className="w-full space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500" /> On Time</span>
                                        <span className="font-bold text-gray-900">75%</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-500" /> Late (&lt;30 days)</span>
                                        <span className="font-bold text-gray-900">15%</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500" /> Overdue</span>
                                        <span className="font-bold text-gray-900">10%</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="relative w-48 h-48 rounded-full mb-6" style={{ background: 'conic-gradient(#8b5cf6 0% 65%, #3b82f6 65% 90%, #64748b 90% 100%)' }}>
                                    <div className="absolute inset-4 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                                        <span className="text-3xl font-extrabold text-gray-900">4.8</span>
                                        <span className="text-xs text-gray-500 font-bold uppercase tracking-wide">Avg Rating</span>
                                    </div>
                                </div>
                                <div className="w-full space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="flex items-center gap-2"><Star size={12} className="fill-purple-500 text-purple-500" /> 5 Stars</span>
                                        <span className="font-bold text-gray-900">65%</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="flex items-center gap-2"><Star size={12} className="fill-blue-500 text-blue-500" /> 4 Stars</span>
                                        <span className="font-bold text-gray-900">25%</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="flex items-center gap-2"><Star size={12} className="fill-slate-500 text-slate-500" /> 3 Stars or less</span>
                                        <span className="font-bold text-gray-900">10%</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Lead/Inquiry Funnel */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-gray-900 text-lg mb-6">
                        {context === 'rentals' ? 'Lead Conversion Funnel' : 'Booking Conversion Funnel'}
                    </h3>
                    <div className="space-y-4">
                        {[
                            { label: 'Views', value: '1,245', pct: 100, color: 'bg-gray-100' },
                            { label: 'Inquiries', value: '456', pct: 65, color: 'bg-blue-100' },
                            { label: context === 'rentals' ? 'Tours' : 'Requests', value: '189', pct: 45, color: 'bg-indigo-100' },
                            { label: context === 'rentals' ? 'Applications' : 'Pre-Approvals', value: '86', pct: 25, color: 'bg-purple-100' },
                            { label: context === 'rentals' ? 'Signed Leases' : 'Bookings', value: '42', pct: 15, color: context === 'rentals' ? 'bg-[#134e4a]' : 'bg-indigo-600', text: 'text-white' },
                        ].map((step, i) => (
                            <div key={i} className="relative">
                                <div className="flex justify-between text-sm font-medium mb-1 z-10 relative px-2">
                                    <span className={step.text || "text-gray-700"}>{step.label}</span>
                                    <span className={step.text || "text-gray-900"}>{step.value}</span>
                                </div>
                                <div className="absolute inset-0 h-full rounded-lg overflow-hidden grid grid-cols-12 bg-gray-50/50">
                                    <div
                                        className={cn("col-span-12 h-full rounded-lg transition-all duration-1000", step.color)}
                                        style={{ width: `${step.pct}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Best Performing Assets */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-gray-900 text-lg mb-6">Top Performing {context === 'rentals' ? 'Properties' : 'Listings'}</h3>
                    <div className="space-y-4">
                        {(context === 'rentals' ? PROPERTIES.slice(0, 3) : STAYS.slice(0, 3)).map((item, i) => (
                            <div key={item.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-gray-100">
                                <span className={cn(
                                    "w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold",
                                    i === 0 ? "bg-yellow-100 text-yellow-700" :
                                        i === 1 ? "bg-gray-100 text-gray-700" :
                                            "bg-orange-50 text-orange-700" // Bronze
                                )}>
                                    #{i + 1}
                                </span>
                                <img src={item.image} alt="Thumbnail" className="w-12 h-12 rounded-lg object-cover" />
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-gray-900 truncate">{'name' in item ? item.name : item.title}</h4>
                                    <p className="text-xs text-gray-500">
                                        {item.revenue} revenue
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-[#134e4a]">
                                        {'occupied' in item ? Math.round(item.occupied / item.units * 100) : 90}%
                                    </p>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold">Occ. Rate</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-2 text-sm font-bold text-[#134e4a] border border-[#134e4a]/30 rounded-lg hover:bg-[#134e4a] hover:text-white transition-all">
                        View Full Performance Report
                    </button>
                </div>
            </div>
        </div>
    );
};

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
            case 'dashboard': return <DashboardTab onAddProperty={handleAddProperty} onAddStay={handleAddStay} />;
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
            default: return <DashboardTab onAddProperty={handleAddProperty} onAddStay={handleAddStay} />;
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
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
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
                <div className="max-w-[1920px] mx-auto px-4 grid md:grid-cols-4 gap-8">
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
                <div className="max-w-[1920px] mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-sm text-center">
                    © 2024 ResidentFinder. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

export default ManagerDashboardPage;
