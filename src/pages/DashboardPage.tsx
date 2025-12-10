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
    LogOut,
    Star,
    TrendingDown
} from 'lucide-react';
import { cn } from '../lib/utils';
import { MOCK_SAVED_PROPERTIES, MOCK_TOURS, MOCK_APPLICATIONS, MOCK_MESSAGES } from '../data/mockData';
import { Modal, ConfirmDialog } from '../components/Modal';
import { Tour } from '../types';
import { useAuth } from '../context/AuthContext';
import { RoleSwitcher } from '../components/RoleSwitcher';

// --- Types & Mock Data ---

type NavItem = {
    id: string;
    label: string;
    icon: React.ElementType;
    count?: number;
};

const NAV_ITEMS: NavItem[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'saved', label: 'Saved Listings', icon: Heart, count: MOCK_SAVED_PROPERTIES.length },
    { id: 'tours', label: 'Tours', icon: Calendar, count: MOCK_TOURS.filter(t => t.status === 'upcoming').length },
    { id: 'applications', label: 'Applications', icon: FileText, count: MOCK_APPLICATIONS.length },
    { id: 'messages', label: 'Messages', icon: MessageSquare, count: MOCK_MESSAGES.reduce((acc, m) => acc + m.unread, 0) },
    { id: 'settings', label: 'Settings', icon: Settings },
];

const STATS = [
    { label: 'Saved Homes', value: String(MOCK_SAVED_PROPERTIES.length), icon: Heart, change: '+3 this week', color: 'text-rose-500', bg: 'bg-rose-50' },
    { label: 'Upcoming Tours', value: String(MOCK_TOURS.filter(t => t.status === 'upcoming').length), icon: Calendar, change: 'Next: Tomorrow', color: 'text-[#134e4a]', bg: 'bg-[#f0fdf4]' },
    { label: 'Applications', value: String(MOCK_APPLICATIONS.length), icon: FileText, change: 'In Review', color: 'text-blue-600', bg: 'bg-blue-50' },
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
        <>
            <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 font-sans">
                {/* Top Bar: Logo & Utilities */}
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4 md:gap-8">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg -ml-2"
                        >
                            <Menu size={20} />
                        </button>

                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#134e4a] rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">R</span>
                            </div>
                            <span className="text-xl font-extrabold tracking-tight text-[#134e4a] hidden sm:block">
                                Resident<span className="font-light text-gray-500">Finder</span>
                            </span>
                        </Link>

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
                        <Link to="/search" className="text-sm font-medium text-gray-600 hover:text-[#134e4a] hidden lg:block">
                            Find Apartments
                        </Link>
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

                <div className="border-t border-gray-100 bg-white hidden md:block">
                    <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
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
                                    {item.count !== undefined && item.count > 0 && (
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

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] md:hidden"
                    >
                        <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl"
                        >
                            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                                <span className="font-bold text-[#134e4a] text-lg">Menu</span>
                                <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                                    <X size={20} />
                                </button>
                            </div>
                            <nav className="p-4 space-y-2">
                                {NAV_ITEMS.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                                        className={cn(
                                            "w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                                            activeTab === item.id
                                                ? "bg-[#f0fdf4] text-[#134e4a]"
                                                : "text-gray-600 hover:bg-gray-50"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon size={20} className={cn(activeTab === item.id ? "text-[#134e4a]" : "text-gray-400")} />
                                            {item.label}
                                        </div>
                                        {item.count !== undefined && item.count > 0 && (
                                            <span className={cn(
                                                "px-2 py-0.5 rounded-full text-xs font-bold",
                                                activeTab === item.id ? "bg-[#134e4a]/20 text-[#134e4a]" : "bg-gray-100 text-gray-500"
                                            )}>
                                                {item.count}
                                            </span>
                                        )}
                                    </button>
                                ))}
                                <div className="pt-4 border-t border-gray-100 mt-4 space-y-2">
                                    <Link
                                        to="/search"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-[#f0fdf4] hover:text-[#134e4a] transition-colors"
                                    >
                                        Find Apartments
                                    </Link>
                                </div>
                            </nav>
                            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
                                <Link
                                    to="/auth"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block px-4 py-3 rounded-lg text-center bg-[#134e4a] text-white font-semibold"
                                >
                                    Sign Out
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

// --- Overview Tab Components ---
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

const UpcomingTourCard = () => {
    const tour = MOCK_TOURS.find(t => t.status === 'upcoming');
    if (!tour) return null;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-2 text-[#134e4a] font-bold">
                    <Calendar size={20} />
                    <h3>Next Upcoming Tour</h3>
                </div>
                <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded">
                    {tour.date.includes('Tomorrow') ? 'TOMORROW' : tour.date}
                </span>
            </div>

            <div className="p-6 flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 aspect-video md:aspect-square rounded-lg overflow-hidden relative">
                    <img
                        src={tour.propertyImage}
                        alt={tour.propertyName}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                </div>

                <div className="flex-1 space-y-4">
                    <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-1">{tour.propertyName}</h4>
                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                            <MapPin size={14} />
                            {tour.propertyAddress}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-100">
                        <div>
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Time</p>
                            <div className="flex items-center gap-2 text-gray-900 font-medium">
                                <Clock size={16} className="text-[#134e4a]" />
                                {tour.time}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Type</p>
                            <div className="flex items-center gap-2 text-gray-900 font-medium">
                                {tour.type === 'Video' ? <Video size={16} className="text-[#134e4a]" /> : <User size={16} className="text-[#134e4a]" />}
                                {tour.type}
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
};

const ActivityItem = ({ item }: { item: any }) => (
    <Link to={`/property/${item.id}`} className="flex gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group">
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
    </Link>
);

// --- Saved Listings Tab ---
interface SavedListingsTabProps {
    onRemoveProperty?: (property: typeof MOCK_SAVED_PROPERTIES[0]) => void;
}

const SavedListingsTab = ({ onRemoveProperty }: SavedListingsTabProps) => {
    const [selectedCount, setSelectedCount] = useState(0);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Saved Listings</h2>
                <button
                    className={cn(
                        "text-sm font-medium transition-colors",
                        selectedCount > 0 ? "text-[#134e4a] hover:underline" : "text-gray-400 cursor-not-allowed"
                    )}
                    disabled={selectedCount === 0}
                >
                    Compare Selected ({selectedCount})
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_SAVED_PROPERTIES.map((property) => (
                    <div key={property.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group">
                        <div className="relative aspect-[4/3]">
                            <img src={property.image} alt={property.address} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            {property.priceChange && (
                                <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                                    <TrendingDown size={12} /> Price Drop
                                </div>
                            )}
                            <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-rose-500 hover:bg-white transition-colors">
                                <Heart size={18} fill="currentColor" />
                            </button>
                            <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-sm font-bold">
                                {property.price}
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-gray-900 mb-1">{property.address}</h3>
                            <p className="text-sm text-gray-500 mb-2">{property.cityStateZip}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                                <span className="bg-gray-100 px-2 py-1 rounded">{property.beds}</span>
                                <span className="bg-gray-100 px-2 py-1 rounded">{property.baths}</span>
                            </div>
                            {property.priceChange && (
                                <p className="text-xs text-green-600 font-medium mb-3">{property.priceChange.date}</p>
                            )}
                            <div className="flex gap-2">
                                <Link to={`/property/${property.id}`} className="flex-1 bg-[#134e4a] text-white py-2 rounded-lg text-sm font-bold text-center hover:bg-[#0f3f3c] transition-colors">
                                    View Details
                                </Link>
                                <button
                                    onClick={() => onRemoveProperty?.(property)}
                                    className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:text-red-500 hover:border-red-200 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
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
        <div className="space-y-8">
            {/* Upcoming Tours */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Tours ({upcomingTours.length})</h2>
                {upcomingTours.length > 0 ? (
                    <div className="space-y-4">
                        {upcomingTours.map((tour) => (
                            <div key={tour.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col md:flex-row gap-4">
                                <img src={tour.propertyImage} alt={tour.propertyName} className="w-full md:w-32 h-24 rounded-lg object-cover" />
                                <div className="flex-1">
                                    <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                                        <div>
                                            <h3 className="font-bold text-gray-900">{tour.propertyName}</h3>
                                            <p className="text-sm text-gray-500">{tour.propertyAddress}</p>
                                        </div>
                                        <span className={cn(
                                            "px-2 py-1 rounded text-xs font-bold",
                                            tour.type === 'In-Person' && "bg-blue-100 text-blue-700",
                                            tour.type === 'Video' && "bg-purple-100 text-purple-700",
                                            tour.type === 'Self-Guided' && "bg-amber-100 text-amber-700"
                                        )}>
                                            {tour.type}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                                        <span className="flex items-center gap-1"><Calendar size={14} /> {tour.date}</span>
                                        <span className="flex items-center gap-1"><Clock size={14} /> {tour.time}</span>
                                        {tour.agent && <span className="flex items-center gap-1"><User size={14} /> {tour.agent}</span>}
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="px-4 py-2 bg-[#134e4a] text-white rounded-lg text-sm font-bold hover:bg-[#0f3f3c]">
                                            Get Directions
                                        </button>
                                        <button
                                            onClick={() => onReschedule?.(tour)}
                                            className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50"
                                        >
                                            Reschedule
                                        </button>
                                        <button
                                            onClick={() => onCancel?.(tour)}
                                            className="px-4 py-2 border border-gray-200 text-red-500 rounded-lg text-sm font-medium hover:bg-red-50"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-50 rounded-xl p-8 text-center">
                        <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No upcoming tours scheduled</p>
                        <Link to="/search" className="text-[#134e4a] font-medium hover:underline">Browse apartments</Link>
                    </div>
                )}
            </div>

            {/* Past Tours */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Past Tours</h2>
                <div className="space-y-3">
                    {pastTours.map((tour) => (
                        <div key={tour.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col md:flex-row gap-4">
                            <img src={tour.propertyImage} alt={tour.propertyName} className="w-full md:w-24 h-20 rounded-lg object-cover opacity-75" />
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900">{tour.propertyName}</h3>
                                <p className="text-sm text-gray-500 mb-1">{tour.date} at {tour.time}</p>
                                {tour.notes && <p className="text-sm text-gray-600 italic">"{tour.notes}"</p>}
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-1">
                                    <Star size={14} /> Rate Tour
                                </button>
                                <Link to={`/property/${tour.propertyId}`} className="px-3 py-1.5 bg-[#f0fdf4] text-[#134e4a] rounded-lg text-sm font-medium hover:bg-[#dcfce7]">
                                    View Listing
                                </Link>
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
            case 'draft': return 'bg-gray-100 text-gray-600';
            case 'submitted': return 'bg-blue-100 text-blue-700';
            case 'under_review': return 'bg-amber-100 text-amber-700';
            case 'approved': return 'bg-green-100 text-green-700';
            case 'denied': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const getStatusLabel = (status: string) => {
        return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    const steps = ['Draft', 'Submitted', 'Under Review', 'Decision'];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">My Applications</h2>
                <Link to="/search" className="px-4 py-2 bg-[#134e4a] text-white rounded-lg text-sm font-bold hover:bg-[#0f3f3c]">
                    Start New Application
                </Link>
            </div>

            <div className="space-y-6">
                {MOCK_APPLICATIONS.map((app) => {
                    const currentStep = app.status === 'draft' ? 0 : app.status === 'submitted' ? 1 : app.status === 'under_review' ? 2 : 3;

                    return (
                        <div key={app.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6 flex flex-col md:flex-row gap-6">
                                <img src={app.propertyImage} alt={app.propertyName} className="w-full md:w-40 h-28 rounded-lg object-cover" />
                                <div className="flex-1">
                                    <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg">{app.propertyName}</h3>
                                            <p className="text-sm text-gray-500">{app.propertyAddress}</p>
                                        </div>
                                        <span className={cn("px-3 py-1 rounded-full text-xs font-bold", getStatusColor(app.status))}>
                                            {getStatusLabel(app.status)}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                                        <span><strong>Rent:</strong> {app.monthlyRent}/mo</span>
                                        <span><strong>Move-in:</strong> {app.moveInDate}</span>
                                        {app.submittedDate && <span><strong>Submitted:</strong> {app.submittedDate}</span>}
                                    </div>

                                    {/* Progress Steps */}
                                    <div className="flex items-center gap-2 mb-4">
                                        {steps.map((step, idx) => (
                                            <React.Fragment key={step}>
                                                <div className={cn(
                                                    "flex items-center gap-1.5 text-xs font-medium",
                                                    idx <= currentStep ? "text-[#134e4a]" : "text-gray-400"
                                                )}>
                                                    {idx < currentStep ? (
                                                        <CheckCircle2 size={16} className="text-[#134e4a]" />
                                                    ) : idx === currentStep ? (
                                                        <Circle size={16} className="text-[#134e4a]" fill="currentColor" />
                                                    ) : (
                                                        <Circle size={16} />
                                                    )}
                                                    <span className="hidden sm:inline">{step}</span>
                                                </div>
                                                {idx < steps.length - 1 && (
                                                    <div className={cn(
                                                        "flex-1 h-0.5",
                                                        idx < currentStep ? "bg-[#134e4a]" : "bg-gray-200"
                                                    )} />
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>

                                    {/* Documents */}
                                    <div className="flex flex-wrap gap-2">
                                        {app.documents.map((doc) => (
                                            <div key={doc.name} className={cn(
                                                "flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium",
                                                doc.uploaded ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
                                            )}>
                                                {doc.uploaded ? <CheckCircle2 size={12} /> : <Upload size={12} />}
                                                {doc.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {app.status === 'draft' && (
                                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
                                    <button
                                        onClick={() => onDelete?.(app)}
                                        className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-white hover:text-red-500 hover:border-red-200 transition-colors"
                                    >
                                        Delete Draft
                                    </button>
                                    <button
                                        onClick={() => onContinue?.(app)}
                                        className="px-4 py-2 bg-[#134e4a] text-white rounded-lg text-sm font-bold hover:bg-[#0f3f3c]"
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
                        <Link to="/search" className="block w-full bg-white text-[#134e4a] py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors text-center">
                            View All 4 Searches
                        </Link>
                    </div>
                </div>

                {/* Recommended */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="font-bold text-lg text-gray-900">Recommended for You</h3>
                    </div>
                    <div className="p-4 space-y-4">
                        <Link to="/property/1" className="group cursor-pointer block">
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
                        </Link>

                        <Link to="/property/2" className="group cursor-pointer block">
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
