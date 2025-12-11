import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Heart,
    Calendar,
    FileText,
    MessageSquare,
    Settings,
    Bell,
    Search,
    MapPin,
    ChevronRight,
    Clock,
    User,
    Menu,
    X,
    Trash2,
    Video,
    Key,
    CheckCircle2,
    Circle,
    Upload,
    Send,
    BellRing,
    Mail,
    Shield,
    CreditCard,
    Star,
    TrendingDown,
    ArrowUpRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import { MOCK_SAVED_PROPERTIES, MOCK_TOURS, MOCK_APPLICATIONS, MOCK_MESSAGES } from '../data/mockData';
import { Modal, ConfirmDialog } from '../components/Modal';
import { Tour } from '../types';

// --- Types & Mock Data ---

type NavItem = {
    id: string;
    label: string;
    icon: React.ElementType;
    count?: number;
};

const NAV_ITEMS: NavItem[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'saved', label: 'Saved', icon: Heart, count: MOCK_SAVED_PROPERTIES.length },
    { id: 'tours', label: 'Tours', icon: Calendar, count: MOCK_TOURS.filter(t => t.status === 'upcoming').length },
    { id: 'applications', label: 'Applications', icon: FileText, count: MOCK_APPLICATIONS.length },
    { id: 'messages', label: 'Messages', icon: MessageSquare, count: MOCK_MESSAGES.reduce((acc, m) => acc + m.unread, 0) },
    { id: 'settings', label: 'Settings', icon: Settings },
];

const STATS = [
    { label: 'Saved Homes', value: String(MOCK_SAVED_PROPERTIES.length), icon: Heart, change: '+3 this week', color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Upcoming Tours', value: String(MOCK_TOURS.filter(t => t.status === 'upcoming').length), icon: Calendar, change: 'Next: Tomorrow', color: 'text-[#134e4a]', bg: 'bg-[#f0fdf4]' },
    { label: 'Active Applications', value: String(MOCK_APPLICATIONS.length), icon: FileText, change: 'In Review', color: 'text-blue-600', bg: 'bg-blue-50' },
];

const RECENT_ACTIVITY = [
    { id: 1, type: 'viewed', property: 'West Edge Apartments', time: '2 hours ago', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=200&q=80' },
    { id: 2, type: 'saved', property: 'Pike Motorworks', time: 'Yesterday', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=200&q=80' },
    { id: 3, type: 'price_drop', property: 'Tower 12', time: '2 days ago', priceDrop: '$2,450 → $2,300', image: 'https://images.unsplash.com/photo-1512918760383-eda2723ad6e1?auto=format&fit=crop&w=200&q=80' },
];

// --- Components ---

const TopNavigation = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (id: string) => void }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
            {/* Main Header */}
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-[#134e4a] rounded-xl flex items-center justify-center shadow-lg shadow-[#134e4a]/20 group-hover:scale-105 transition-transform duration-300">
                            <span className="text-white font-bold text-xl">R</span>
                        </div>
                        <span className="text-2xl font-extrabold tracking-tight text-gray-900 hidden sm:block">
                            Resident<span className="font-light text-gray-500">Finder</span>
                        </span>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <div className="hidden lg:block relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400 group-focus-within:text-[#134e4a] transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search properties..."
                            className="w-96 pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl text-sm font-medium placeholder-gray-400 focus:bg-white focus:border-[#134e4a]/30 focus:ring-4 focus:ring-[#134e4a]/10 transition-all outline-none"
                        />
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-6">
                    <Link
                        to="/search"
                        className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#134e4a] transition-colors bg-gray-50 px-4 py-2 rounded-lg hover:bg-[#134e4a]/5"
                    >
                        <Search className="w-4 h-4" />
                        Find Apartments
                    </Link>

                    <div className="h-8 w-px bg-gray-200 hidden sm:block" />

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                        </button>

                        <button className="flex items-center gap-3 pl-1 pr-2 py-1 rounded-full hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#134e4a] to-[#0d3532] flex items-center justify-center text-white font-bold text-sm shadow-md shadow-[#134e4a]/20">
                                AM
                            </div>
                            <span className="text-sm font-bold text-gray-700 hidden sm:block">Alex</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block border-t border-gray-100">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center space-x-1 -mb-px overflow-x-auto hide-scrollbar">
                        {NAV_ITEMS.map((item) => {
                            const isActive = activeTab === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={cn(
                                        "group flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap",
                                        isActive
                                            ? "border-[#134e4a] text-[#134e4a]"
                                            : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-200"
                                    )}
                                >
                                    <item.icon
                                        className={cn(
                                            "w-4 h-4 transition-colors",
                                            isActive ? "text-[#134e4a]" : "text-gray-400 group-hover:text-gray-600"
                                        )}
                                    />
                                    {item.label}
                                    {item.count !== undefined && item.count > 0 && (
                                        <span className={cn(
                                            "ml-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors",
                                            isActive
                                                ? "bg-[#134e4a]/10 text-[#134e4a]"
                                                : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                                        )}>
                                            {item.count}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] md:hidden"
                    >
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl"
                        >
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <span className="font-bold text-gray-900 text-xl">Menu</span>
                                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="p-6 flex flex-col h-[calc(100%-80px)]">
                                <nav className="space-y-1">
                                    {NAV_ITEMS.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                                            className={cn(
                                                "w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200",
                                                activeTab === item.id
                                                    ? "bg-[#134e4a] text-white shadow-lg shadow-[#134e4a]/20"
                                                    : "text-gray-600 hover:bg-gray-50"
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-white" : "text-gray-400")} />
                                                {item.label}
                                            </div>
                                            {item.count !== undefined && item.count > 0 && (
                                                <span className={cn(
                                                    "px-2 py-0.5 rounded-full text-xs font-bold",
                                                    activeTab === item.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                                                )}>
                                                    {item.count}
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </nav>

                                <div className="mt-auto pt-6 border-t border-gray-100">
                                    <Link
                                        to="/search"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center justify-center gap-2 w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
                                    >
                                        <Search className="w-4 h-4" />
                                        Find Apartments
                                    </Link>
                                    <Link
                                        to="/auth"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="mt-3 flex items-center justify-center gap-2 w-full py-3 border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                                    >
                                        Sign Out
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


// --- Overview Tab Components ---
const StatsCard = ({ stat }: { stat: typeof STATS[0] }) => (
    <div className="bg-white p-6 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-300 group">
        <div className="flex items-start justify-between mb-4">
            <div className={cn("p-3 rounded-xl transition-colors", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>
            {stat.change && (
                <span className={cn("text-xs font-bold px-2 py-1 rounded-full bg-gray-50 text-gray-600 group-hover:bg-white group-hover:shadow-sm transition-all")}>
                    {stat.change}
                </span>
            )}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
            <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">{stat.value}</h3>
        </div>
    </div>
);

const UpcomingTourCard = () => {
    const tour = MOCK_TOURS.find(t => t.status === 'upcoming');
    if (!tour) return null;

    return (
        <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-300">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#f0fdf4] rounded-lg">
                        <Calendar className="w-5 h-5 text-[#134e4a]" />
                    </div>
                    <h3 className="font-bold text-gray-900">Next Upcoming Tour</h3>
                </div>
                <div className="flex items-center gap-2">
                    <span className="bg-orange-50 text-orange-700 text-xs font-bold px-3 py-1.5 rounded-full border border-orange-100">
                        {tour.date.includes('Tomorrow') ? 'TOMORROW' : tour.date}
                    </span>
                </div>
            </div>

            <div className="p-6">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-48 aspect-video md:aspect-square rounded-xl overflow-hidden relative shadow-md group">
                        <img
                            src={tour.propertyImage}
                            alt={tour.propertyName}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-gray-900 shadow-sm">
                            ${tour.price}/mo
                        </div>
                    </div>

                    <div className="flex-1 min-w-0 py-1">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-1 truncate">{tour.propertyName}</h4>
                                <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                                    <MapPin className="w-4 h-4" />
                                    {tour.propertyAddress}
                                </div>
                            </div>
                            <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 py-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-50 rounded-full">
                                    <Clock className="w-4 h-4 text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Time</p>
                                    <p className="font-semibold text-gray-900">{tour.time}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-50 rounded-full">
                                    {tour.type === 'Video' ? <Video className="w-4 h-4 text-gray-600" /> : <User className="w-4 h-4 text-gray-600" />}
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Type</p>
                                    <p className="font-semibold text-gray-900">{tour.type}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-auto">
                            <button className="flex-1 bg-gray-900 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/10 btn-press">
                                Get Directions
                            </button>
                            <button className="flex-1 bg-white border border-gray-200 text-gray-700 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-50 hover:border-gray-300 transition-all btn-press">
                                Reschedule
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ActivityItem = ({ item }: { item: any }) => (
    <Link to={`/property/${item.id}`} className="flex gap-5 p-5 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer group border border-transparent hover:border-gray-100">
        <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
            <img
                src={item.image}
                alt={item.property}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
        </div>
        <div className="flex-1 min-w-0 py-0.5">
            <div className="flex justify-between items-start mb-1">
                <h5 className="font-bold text-gray-900 text-base truncate group-hover:text-[#134e4a] transition-colors">{item.property}</h5>
                <span className="text-xs font-medium text-gray-400 whitespace-nowrap bg-gray-100 px-2 py-0.5 rounded-full group-hover:bg-white group-hover:shadow-sm transition-all">
                    {item.time}
                </span>
            </div>

            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    {item.type === 'viewed' && 'Viewed details page'}
                    {item.type === 'saved' && <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> Added to saved list</span>}
                    {item.type === 'price_drop' && <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded text-xs">Price drop: {item.priceDrop}</span>}
                </p>
                <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 shadow-sm">
                    <ArrowUpRight className="w-4 h-4 text-gray-600" />
                </div>
            </div>
        </div>
    </Link>
);


// --- Saved Listings Tab ---
interface SavedListingsTabProps {
    onRemoveProperty?: (property: typeof MOCK_SAVED_PROPERTIES[0]) => void;
}

const SavedListingsTab = ({ onRemoveProperty }: SavedListingsTabProps) => {
    const [selectedCount, setSelectedCount] = useState(0);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Saved Listings</h2>
                    <p className="text-gray-500 mt-1">Manage and compare your favorite properties.</p>
                </div>
                <button
                    className={cn(
                        "text-sm font-bold px-4 py-2 rounded-lg transition-all",
                        selectedCount > 0
                            ? "bg-[#134e4a] text-white hover:bg-[#0f3f3c] shadow-lg shadow-[#134e4a]/20"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    )}
                    disabled={selectedCount === 0}
                >
                    Compare Selected ({selectedCount})
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {MOCK_SAVED_PROPERTIES.map((property) => (
                    <div key={property.id} className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden group hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300">
                        <div className="relative aspect-[4/3] overflow-hidden">
                            <img
                                src={property.image}
                                alt={property.address}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                            {property.priceChange && (
                                <div className="absolute top-3 left-3 bg-green-500/90 backdrop-blur text-white px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm">
                                    <TrendingDown size={14} /> Price Drop
                                </div>
                            )}

                            <button className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur rounded-full text-rose-500 hover:bg-white transition-colors shadow-sm">
                                <Heart size={18} fill="currentColor" />
                            </button>

                            <div className="absolute bottom-4 left-4 text-white">
                                <div className="text-2xl font-bold tracking-tight">{property.price}</div>
                                <div className="text-sm font-medium opacity-90">{property.beds} • {property.baths}</div>
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="mb-4">
                                <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">{property.address}</h3>
                                <p className="text-sm text-gray-500">{property.cityStateZip}</p>
                            </div>

                            <div className="flex gap-3">
                                <Link
                                    to={`/property/${property.id}`}
                                    className="flex-1 bg-[#134e4a] text-white py-2.5 rounded-xl text-sm font-bold text-center hover:bg-[#0f3f3c] transition-all shadow-md shadow-[#134e4a]/10"
                                >
                                    View Details
                                </Link>
                                <button
                                    onClick={() => onRemoveProperty?.(property)}
                                    className="p-2.5 border border-gray-200 rounded-xl text-gray-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            {property.priceChange && (
                                <div className="bg-green-50 p-3 rounded-xl mt-4 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                    <p className="text-xs text-green-700 font-bold">
                                        Price dropped by {property.priceChange.amount} on {property.priceChange.date}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Tours Tab ---
interface ToursTabProps {
    onReschedule?: (tour: Tour) => void;
    onCancel?: (tour: Tour) => void;
}

const ToursTab = ({ onReschedule, onCancel }: ToursTabProps) => {
    const upcomingTours = MOCK_TOURS.filter(t => t.status === 'upcoming');
    const pastTours = MOCK_TOURS.filter(t => t.status === 'completed');

    return (
        <div className="space-y-12">
            {/* Upcoming Tours */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Upcoming Tours</h2>
                    <span className="bg-[#134e4a]/10 text-[#134e4a] px-3 py-1 rounded-full text-xs font-bold">
                        {upcomingTours.length} Scheduled
                    </span>
                </div>

                {upcomingTours.length > 0 ? (
                    <div className="grid gap-6">
                        {upcomingTours.map((tour) => (
                            <div key={tour.id} className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 p-5 flex flex-col md:flex-row gap-6 group hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-300">
                                <div className="w-full md:w-48 aspect-video md:aspect-[4/3] rounded-xl overflow-hidden shadow-sm relative shrink-0">
                                    <img src={tour.propertyImage} alt={tour.propertyName} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/10" />
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col">
                                    <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-xl">{tour.propertyName}</h3>
                                            <p className="text-gray-500 flex items-center gap-1.5 text-sm mt-1">
                                                <MapPin size={14} /> {tour.propertyAddress}
                                            </p>
                                        </div>
                                        <span className={cn(
                                            "px-3 py-1.5 rounded-full text-xs font-bold border",
                                            tour.type === 'In-Person' && "bg-blue-50 text-blue-700 border-blue-100",
                                            tour.type === 'Video' && "bg-purple-50 text-purple-700 border-purple-100",
                                            tour.type === 'Self-Guided' && "bg-amber-50 text-amber-700 border-amber-100"
                                        )}>
                                            {tour.type}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 bg-white rounded-md shadow-sm text-[#134e4a]">
                                                <Calendar size={14} />
                                            </div>
                                            <span className="font-medium">{tour.date}</span>
                                        </div>
                                        <div className="w-px h-4 bg-gray-300 hidden sm:block" />
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 bg-white rounded-md shadow-sm text-[#134e4a]">
                                                <Clock size={14} />
                                            </div>
                                            <span className="font-medium">{tour.time}</span>
                                        </div>
                                        {tour.agent && (
                                            <>
                                                <div className="w-px h-4 bg-gray-300 hidden sm:block" />
                                                <div className="flex items-center gap-2">
                                                    <div className="p-1.5 bg-white rounded-md shadow-sm text-[#134e4a]">
                                                        <User size={14} />
                                                    </div>
                                                    <span className="font-medium">{tour.agent}</span>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <div className="flex gap-3 mt-auto">
                                        <button className="px-5 py-2.5 bg-[#134e4a] text-white rounded-xl text-sm font-bold hover:bg-[#0f3f3c] shadow-md shadow-[#134e4a]/10 transition-all btn-press">
                                            Get Directions
                                        </button>
                                        <button
                                            onClick={() => onReschedule?.(tour)}
                                            className="px-5 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all btn-press"
                                        >
                                            Reschedule
                                        </button>
                                        <button
                                            onClick={() => onCancel?.(tour)}
                                            className="px-5 py-2.5 border border-transparent text-red-600 rounded-xl text-sm font-bold hover:bg-red-50 transition-all ml-auto btn-press"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                            <Calendar size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">No upcoming tours</h3>
                        <p className="text-gray-500 mb-6">Schedule a tour to see your dream apartment in person.</p>
                        <Link to="/search" className="inline-flex items-center gap-2 px-6 py-3 bg-[#134e4a] text-white rounded-xl font-bold hover:bg-[#0f3f3c] transition-all shadow-lg shadow-[#134e4a]/20">
                            <Search size={18} /> Browse Apartments
                        </Link>
                    </div>
                )}
            </div>

            {/* Past Tours */}
            <div className="pt-8 border-t border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Past Tours</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {pastTours.map((tour) => (
                        <div key={tour.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex gap-4 opacity-75 hover:opacity-100 transition-opacity">
                            <img src={tour.propertyImage} alt={tour.propertyName} className="w-20 h-20 rounded-lg object-cover grayscale" />
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-900 truncate">{tour.propertyName}</h3>
                                <p className="text-sm text-gray-500 mb-2">{tour.date}</p>
                                <div className="flex gap-2">
                                    <button className="text-xs font-bold text-[#134e4a] hover:underline">Rate Tour</button>
                                    <span className="text-gray-300">|</span>
                                    <Link to={`/property/${tour.propertyId}`} className="text-xs font-bold text-gray-600 hover:text-gray-900">View Listing</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Applications Tab ---
interface ApplicationsTabProps {
    onContinue?: (app: typeof MOCK_APPLICATIONS[0]) => void;
    onDelete?: (app: typeof MOCK_APPLICATIONS[0]) => void;
}

const ApplicationsTab = ({ onContinue, onDelete }: ApplicationsTabProps) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'draft': return 'bg-gray-100 text-gray-600 border-gray-200';
            case 'submitted': return 'bg-blue-50 text-blue-700 border-blue-100';
            case 'under_review': return 'bg-amber-50 text-amber-700 border-amber-100';
            case 'approved': return 'bg-green-50 text-green-700 border-green-100';
            case 'denied': return 'bg-red-50 text-red-700 border-red-100';
            default: return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    const getStatusLabel = (status: string) => {
        return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    const steps = ['Draft', 'Submitted', 'Under Review', 'Decision'];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Applications</h2>
                    <p className="text-gray-500 mt-1">Track the status of your rental applications.</p>
                </div>
                <Link to="/search" className="px-5 py-2.5 bg-[#134e4a] text-white rounded-xl text-sm font-bold hover:bg-[#0f3f3c] shadow-lg shadow-[#134e4a]/20 transition-all btn-press">
                    Start New Application
                </Link>
            </div>

            <div className="space-y-6">
                {MOCK_APPLICATIONS.map((app) => {
                    const currentStep = app.status === 'draft' ? 0 : app.status === 'submitted' ? 1 : app.status === 'under_review' ? 2 : 3;

                    return (
                        <div key={app.id} className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-300">
                            <div className="p-6 flex flex-col md:flex-row gap-8">
                                <div className="w-full md:w-56 aspect-[3/2] rounded-xl overflow-hidden shadow-sm shrink-0">
                                    <img src={app.propertyImage} alt={app.propertyName} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-2xl mb-1">{app.propertyName}</h3>
                                            <p className="text-gray-500 font-medium flex items-center gap-1.5">
                                                <MapPin size={16} /> {app.propertyAddress}
                                            </p>
                                        </div>
                                        <span className={cn("px-4 py-1.5 rounded-full text-xs font-extrabold border uppercase tracking-wider", getStatusColor(app.status))}>
                                            {getStatusLabel(app.status)}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-8 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Monthly Rent</span>
                                            <span className="font-bold text-gray-900 text-lg">{app.monthlyRent}</span>
                                        </div>
                                        <div className="w-px bg-gray-200" />
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Move-in Date</span>
                                            <span className="font-bold text-gray-900 text-lg">{app.moveInDate}</span>
                                        </div>
                                        {app.submittedDate && (
                                            <>
                                                <div className="w-px bg-gray-200" />
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Submitted</span>
                                                    <span className="font-bold text-gray-900 text-lg">{app.submittedDate}</span>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Progress Steps */}
                                    <div className="relative mb-8 px-2">
                                        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10 rounded-full" />
                                        <div className="flex justify-between w-full">
                                            {steps.map((step, idx) => (
                                                <div key={step} className="flex flex-col items-center gap-2 bg-white px-2">
                                                    {idx < currentStep ? (
                                                        <div className="w-8 h-8 rounded-full bg-[#134e4a] text-white flex items-center justify-center shadow-lg shadow-[#134e4a]/20">
                                                            <CheckCircle2 size={16} strokeWidth={3} />
                                                        </div>
                                                    ) : idx === currentStep ? (
                                                        <div className="w-8 h-8 rounded-full bg-white border-2 border-[#134e4a] text-[#134e4a] flex items-center justify-center shadow-sm">
                                                            <Circle size={12} fill="currentColor" />
                                                        </div>
                                                    ) : (
                                                        <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-transparent text-gray-300 flex items-center justify-center">
                                                            <Circle size={12} />
                                                        </div>
                                                    )}
                                                    <span className={cn(
                                                        "text-xs font-bold transition-colors",
                                                        idx <= currentStep ? "text-[#134e4a]" : "text-gray-400"
                                                    )}>{step}</span>
                                                </div>
                                            ))}
                                        </div>
                                        {/* Dynamic Progress Bar */}
                                        <div
                                            className="absolute top-1/2 left-0 h-1 bg-[#134e4a] -z-0 transition-all duration-500 rounded-full"
                                            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                                        />
                                    </div>

                                    {/* Documents */}
                                    <div className="flex flex-wrap gap-2">
                                        {app.documents.map((doc) => (
                                            <div key={doc.name} className={cn(
                                                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors",
                                                doc.uploaded
                                                    ? "bg-green-50 text-green-700 border-green-100"
                                                    : "bg-gray-50 text-gray-500 border-gray-200 dashed"
                                            )}>
                                                {doc.uploaded ? <CheckCircle2 size={14} /> : <Upload size={14} />}
                                                {doc.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {app.status === 'draft' && (
                                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                                    <button
                                        onClick={() => onDelete?.(app)}
                                        className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
                                    >
                                        Discard Draft
                                    </button>
                                    <button
                                        onClick={() => onContinue?.(app)}
                                        className="px-5 py-2.5 bg-[#134e4a] text-white rounded-xl text-sm font-bold hover:bg-[#0f3f3c] shadow-md shadow-[#134e4a]/10 transition-all"
                                    >
                                        Continue Application
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// --- Messages Tab ---
const MessagesTab = () => {
    const [selectedConversation, setSelectedConversation] = useState<string | null>(MOCK_MESSAGES[0]?.id || null);
    const activeConversation = MOCK_MESSAGES.find(m => m.id === selectedConversation);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex h-[600px]">
                {/* Conversation List */}
                <div className="w-full md:w-80 border-r border-gray-200 flex flex-col">
                    <div className="p-4 border-b border-gray-100">
                        <h2 className="font-bold text-gray-900">Messages</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {MOCK_MESSAGES.map((msg) => (
                            <button
                                key={msg.id}
                                onClick={() => setSelectedConversation(msg.id)}
                                className={cn(
                                    "w-full p-4 text-left border-b border-gray-50 hover:bg-gray-50 transition-colors",
                                    selectedConversation === msg.id && "bg-[#f0fdf4]"
                                )}
                            >
                                <div className="flex gap-3">
                                    <img src={msg.propertyImage} alt="" className="w-12 h-12 rounded-lg object-cover" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-gray-900 text-sm truncate">{msg.contactName}</h4>
                                            <span className="text-xs text-gray-400">{msg.lastMessageTime}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mb-1">{msg.propertyName}</p>
                                        <p className="text-sm text-gray-600 truncate">{msg.lastMessage}</p>
                                    </div>
                                    {msg.unread > 0 && (
                                        <span className="w-5 h-5 bg-[#134e4a] text-white text-xs font-bold rounded-full flex items-center justify-center">
                                            {msg.unread}
                                        </span>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chat View */}
                <div className="hidden md:flex flex-1 flex-col">
                    {activeConversation ? (
                        <>
                            <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                                <img src={activeConversation.propertyImage} alt="" className="w-10 h-10 rounded-lg object-cover" />
                                <div>
                                    <h4 className="font-bold text-gray-900">{activeConversation.contactName}</h4>
                                    <p className="text-xs text-gray-500">{activeConversation.contactRole} • {activeConversation.propertyName}</p>
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {activeConversation.messages.map((msg, idx) => (
                                    <div key={idx} className={cn("flex", msg.sender === 'user' ? "justify-end" : "justify-start")}>
                                        <div className={cn(
                                            "max-w-[70%] px-4 py-2 rounded-2xl",
                                            msg.sender === 'user'
                                                ? "bg-[#134e4a] text-white rounded-br-sm"
                                                : "bg-gray-100 text-gray-900 rounded-bl-sm"
                                        )}>
                                            <p className="text-sm">{msg.text}</p>
                                            <p className={cn(
                                                "text-[10px] mt-1",
                                                msg.sender === 'user' ? "text-white/70" : "text-gray-400"
                                            )}>{msg.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 border-t border-gray-100">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]"
                                    />
                                    <button className="p-2 bg-[#134e4a] text-white rounded-full hover:bg-[#0f3f3c]">
                                        <Send size={20} />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-400">
                            Select a conversation
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Settings Tab ---
const SettingsTab = () => {
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [smsNotifs, setSmsNotifs] = useState(false);
    const [priceAlerts, setPriceAlerts] = useState(true);

    return (
        <div className="space-y-8 max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>

            {/* Profile Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <User size={20} className="text-[#134e4a]" /> Profile Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input type="text" defaultValue="Alex" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input type="text" defaultValue="Morgan" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" defaultValue="alex.morgan@email.com" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input type="tel" defaultValue="(206) 555-0123" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]" />
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
                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
                        <div className="flex items-center gap-3">
                            <Mail size={18} className="text-gray-500" />
                            <div>
                                <p className="font-medium text-gray-900">Email Notifications</p>
                                <p className="text-sm text-gray-500">Receive updates about your searches and tours</p>
                            </div>
                        </div>
                        <input type="checkbox" checked={emailNotifs} onChange={(e) => setEmailNotifs(e.target.checked)} className="w-5 h-5 text-[#134e4a] rounded focus:ring-[#134e4a]" />
                    </label>
                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
                        <div className="flex items-center gap-3">
                            <MessageSquare size={18} className="text-gray-500" />
                            <div>
                                <p className="font-medium text-gray-900">SMS Notifications</p>
                                <p className="text-sm text-gray-500">Get text alerts for tour reminders</p>
                            </div>
                        </div>
                        <input type="checkbox" checked={smsNotifs} onChange={(e) => setSmsNotifs(e.target.checked)} className="w-5 h-5 text-[#134e4a] rounded focus:ring-[#134e4a]" />
                    </label>
                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
                        <div className="flex items-center gap-3">
                            <TrendingDown size={18} className="text-gray-500" />
                            <div>
                                <p className="font-medium text-gray-900">Price Drop Alerts</p>
                                <p className="text-sm text-gray-500">Get notified when saved listings have price changes</p>
                            </div>
                        </div>
                        <input type="checkbox" checked={priceAlerts} onChange={(e) => setPriceAlerts(e.target.checked)} className="w-5 h-5 text-[#134e4a] rounded focus:ring-[#134e4a]" />
                    </label>
                </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Shield size={20} className="text-[#134e4a]" /> Security
                </h3>
                <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <Key size={18} className="text-gray-500" />
                            <span className="font-medium text-gray-900">Change Password</span>
                        </div>
                        <ChevronRight size={18} className="text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <CreditCard size={18} className="text-gray-500" />
                            <span className="font-medium text-gray-900">Payment Methods</span>
                        </div>
                        <ChevronRight size={18} className="text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
                <h3 className="font-bold text-red-600 mb-4">Danger Zone</h3>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium text-gray-900">Delete Account</p>
                        <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                    </div>
                    <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50">
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Overview Tab Content ---
const OverviewTab = () => (
    <>
        {/* Welcome Header */}
        <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome back, Alex!</h1>
            <p className="text-gray-500">Here's what's happening with your search today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {STATS.map((stat) => (
                <StatsCard key={stat.label} stat={stat} />
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Main Activity */}
            <div className="lg:col-span-2 space-y-8">
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
            <div className="space-y-8">
                {/* Saved Search Teaser */}
                <div className="bg-gradient-to-br from-[#134e4a] to-[#0d3532] rounded-2xl p-6 text-white relative overflow-hidden shadow-lg shadow-[#134e4a]/20 group">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-500"></div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="font-bold text-xl">Saved Searches</h3>
                                <p className="text-white/70 text-sm mt-1">4 active alerts</p>
                            </div>
                            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                                <Search className="w-5 h-5 text-white" />
                            </div>
                        </div>

                        <div className="space-y-3 mb-8">
                            <div className="flex items-center justify-between text-sm bg-black/20 backdrop-blur-sm p-3 rounded-xl border border-white/5 hover:bg-black/30 transition-colors cursor-pointer">
                                <span className="font-medium">Downtown (2 Beds)</span>
                                <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">+2 New</span>
                            </div>
                            <div className="flex items-center justify-between text-sm bg-black/20 backdrop-blur-sm p-3 rounded-xl border border-white/5 hover:bg-black/30 transition-colors cursor-pointer">
                                <span className="font-medium">Capitol Hill (Pets)</span>
                                <span className="text-white/40 text-xs">No updates</span>
                            </div>
                        </div>

                        <Link to="/search" className="block w-full bg-white text-[#134e4a] py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all text-center shadow-lg shadow-black/10 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                            View All Searches
                        </Link>
                    </div>
                </div>

                {/* Recommended */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-gray-900">Recommended for You</h3>
                        <button className="text-[#134e4a] text-xs font-bold hover:underline">View All</button>
                    </div>
                    <div className="p-4 space-y-5">
                        <Link to="/property/1" className="group cursor-pointer block">
                            <div className="aspect-[16/10] rounded-xl overflow-hidden relative mb-3 shadow-sm">
                                <img
                                    src="https://images.unsplash.com/photo-1512918760532-3ed462f01807?auto=format&fit=crop&w=400&q=80"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    alt="Recommendation"
                                />
                                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-extrabold text-[#134e4a] shadow-sm uppercase tracking-wide">
                                    98% Match
                                </div>
                                <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-white">
                                    $2,850/mo
                                </div>
                            </div>
                            <h4 className="font-bold text-gray-900 truncate group-hover:text-[#134e4a] transition-colors">Modern Downtown Loft</h4>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">Near Work</span>
                                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">Gym</span>
                            </div>
                        </Link>

                        <Link to="/property/2" className="group cursor-pointer block">
                            <div className="aspect-[16/10] rounded-xl overflow-hidden relative mb-3 shadow-sm">
                                <img
                                    src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    alt="Recommendation"
                                />
                                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-extrabold text-[#134e4a] shadow-sm uppercase tracking-wide">
                                    95% Match
                                </div>
                                <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-white">
                                    $1,950/mo
                                </div>
                            </div>
                            <h4 className="font-bold text-gray-900 truncate group-hover:text-[#134e4a] transition-colors">Cozy Studio in Ballard</h4>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">Pet Friendly</span>
                                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">Quiet</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>
);

// --- Main Layout ---

export function DashboardPage() {
    const [activeTab, setActiveTab] = useState('overview');

    // Modal states
    const [rescheduleModal, setRescheduleModal] = useState<{ isOpen: boolean; tour: Tour | null }>({ isOpen: false, tour: null });
    const [cancelModal, setCancelModal] = useState<{ isOpen: boolean; tour: Tour | null }>({ isOpen: false, tour: null });
    const [successToast, setSuccessToast] = useState<string | null>(null);

    const handleReschedule = (tour: Tour) => {
        setRescheduleModal({ isOpen: true, tour });
    };

    const handleCancel = (tour: Tour) => {
        setCancelModal({ isOpen: true, tour });
    };

    const confirmReschedule = () => {
        if (rescheduleModal.tour) {
            setSuccessToast(`Tour at ${rescheduleModal.tour.propertyName} has been rescheduled!`);
            setRescheduleModal({ isOpen: false, tour: null });
            setTimeout(() => setSuccessToast(null), 3000);
        }
    };

    const confirmCancel = () => {
        if (cancelModal.tour) {
            setSuccessToast(`Tour at ${cancelModal.tour.propertyName} has been cancelled.`);
            setCancelModal({ isOpen: false, tour: null });
            setTimeout(() => setSuccessToast(null), 3000);
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return <OverviewTab />;
            case 'saved':
                return <SavedListingsTab />;
            case 'tours':
                return <ToursTab onReschedule={handleReschedule} onCancel={handleCancel} />;
            case 'applications':
                return <ApplicationsTab />;
            case 'messages':
                return <MessagesTab />;
            case 'settings':
                return <SettingsTab />;
            default:
                return <OverviewTab />;
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

            <TopNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {renderTabContent()}
            </main>

            {/* Reschedule Modal */}
            <Modal
                isOpen={rescheduleModal.isOpen}
                onClose={() => setRescheduleModal({ isOpen: false, tour: null })}
                title="Reschedule Tour"
                size="md"
            >
                {rescheduleModal.tour && (
                    <div className="space-y-4">
                        <div className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                            <img
                                src={rescheduleModal.tour.propertyImage}
                                alt={rescheduleModal.tour.propertyName}
                                className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div>
                                <h4 className="font-bold text-gray-900">{rescheduleModal.tour.propertyName}</h4>
                                <p className="text-sm text-gray-500">Current: {rescheduleModal.tour.date} at {rescheduleModal.tour.time}</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Date</label>
                            <input
                                type="date"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Time</label>
                            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]">
                                <option>9:00 AM</option>
                                <option>10:00 AM</option>
                                <option>11:00 AM</option>
                                <option>12:00 PM</option>
                                <option>1:00 PM</option>
                                <option>2:00 PM</option>
                                <option>3:00 PM</option>
                                <option>4:00 PM</option>
                            </select>
                        </div>

                        <div className="flex gap-3 justify-end pt-2">
                            <button
                                onClick={() => setRescheduleModal({ isOpen: false, tour: null })}
                                className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmReschedule}
                                className="px-4 py-2 bg-[#134e4a] text-white rounded-lg font-bold hover:bg-[#0f3f3c]"
                            >
                                Confirm Reschedule
                            </button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Cancel Confirmation Dialog */}
            <ConfirmDialog
                isOpen={cancelModal.isOpen}
                onClose={() => setCancelModal({ isOpen: false, tour: null })}
                onConfirm={confirmCancel}
                title="Cancel Tour"
                message={cancelModal.tour ? `Are you sure you want to cancel your tour at ${cancelModal.tour.propertyName}? This action cannot be undone.` : ''}
                confirmText="Yes, Cancel Tour"
                cancelText="Keep Tour"
                variant="danger"
            />

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

export default DashboardPage;
