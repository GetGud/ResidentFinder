import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Search,
    MapPin,
    Home,
    CheckCircle2,
    Box,
    Clock,
    ArrowRight,
    Menu,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { RecentlyViewedCarousel } from '../components/RecentlyViewedCarousel';
import { MOCK_PROPERTIES } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { RoleSwitcher } from '../components/RoleSwitcher';

// --- Role-Based Navigation Links ---
const LandingNavLinks = () => {
    const { user, isAuthenticated } = useAuth();
    const isManager = user?.role === 'manager';
    const hasBothRoles = user?.hasManagerRole;

    return (
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link to="/search" className="hover:text-[#134e4a] transition-colors">Find Apartments</Link>
            {isAuthenticated ? (
                <>
                    {hasBothRoles && <RoleSwitcher compact />}
                    {isManager ? (
                        <Link to="/manager" className="hover:text-[#134e4a] transition-colors">Manager Dashboard</Link>
                    ) : (
                        <Link to="/dashboard" className="hover:text-[#134e4a] transition-colors">My Dashboard</Link>
                    )}
                </>
            ) : (
                <Link to="/manager" className="hover:text-[#134e4a] transition-colors">Manage Rentals</Link>
            )}
        </nav>
    );
};

// --- Header Component with Mobile Menu ---
const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogoClick = (e: React.MouseEvent) => {
        if (window.location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
                <div className="max-w-[1920px] mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        {/* Logo */}
                        <Link to="/" onClick={handleLogoClick} className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#134e4a] rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">R</span>
                            </div>
                            <span className="text-xl font-extrabold tracking-tight text-[#134e4a]">
                                Resident<span className="font-light text-gray-500">Finder</span>
                            </span>
                        </Link>

                        {/* Nav Links - Desktop */}
                        <LandingNavLinks />
                    </div>

                    <LandingAuthButtons onMenuOpen={() => setMobileMenuOpen(true)} />
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <LandingMobileMenu onClose={() => setMobileMenuOpen(false)} />
                )}
            </AnimatePresence>
        </>
    );
};

// --- Auth Buttons for Landing Page Header ---
const LandingAuthButtons = ({ onMenuOpen }: { onMenuOpen: () => void }) => {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <div className="flex items-center gap-3">
            {isAuthenticated ? (
                <button
                    onClick={() => logout()}
                    className="flex items-center gap-2 text-sm font-semibold text-[#134e4a] border border-[#134e4a] px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-[#134e4a]/5 transition-colors"
                >
                    <span className="w-6 h-6 rounded-full bg-[#134e4a] text-white flex items-center justify-center text-xs font-bold">
                        {user?.initials}
                    </span>
                    <span className="hidden sm:inline">Sign Out</span>
                </button>
            ) : (
                <>
                    <Link to="/auth" className="text-sm font-semibold text-gray-600 hover:text-[#134e4a] hidden sm:block">
                        Sign Up
                    </Link>
                    <Link to="/auth" className="text-sm font-semibold text-[#134e4a] border border-[#134e4a] px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-[#134e4a]/5 transition-colors">
                        Sign In
                    </Link>
                </>
            )}
            <button
                onClick={onMenuOpen}
                className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
                <Menu className="w-6 h-6" />
            </button>
        </div>
    );
};

// --- Mobile Menu for Landing Page ---
const LandingMobileMenu = ({ onClose }: { onClose: () => void }) => {
    const { user, isAuthenticated, logout } = useAuth();
    const isManager = user?.role === 'manager';
    const hasBothRoles = user?.hasManagerRole;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden"
        >
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl"
            >
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <span className="font-bold text-[#134e4a] text-lg">Menu</span>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                        <X size={20} />
                    </button>
                </div>
                <nav className="p-4 space-y-2">
                    {/* Role Switcher for dual-role users */}
                    {hasBothRoles && (
                        <div className="pb-3 mb-3 border-b border-gray-100">
                            <RoleSwitcher className="w-full" />
                        </div>
                    )}

                    <Link
                        to="/search"
                        onClick={onClose}
                        className="block px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-[#f0fdf4] hover:text-[#134e4a] transition-colors"
                    >
                        Find Apartments
                    </Link>

                    {/* Role-based dashboard link */}
                    {isAuthenticated ? (
                        isManager ? (
                            <Link
                                to="/manager"
                                onClick={onClose}
                                className="block px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-[#f0fdf4] hover:text-[#134e4a] transition-colors"
                            >
                                Manager Dashboard
                            </Link>
                        ) : (
                            <Link
                                to="/dashboard"
                                onClick={onClose}
                                className="block px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-[#f0fdf4] hover:text-[#134e4a] transition-colors"
                            >
                                My Dashboard
                            </Link>
                        )
                    ) : (
                        <Link
                            to="/manager"
                            onClick={onClose}
                            className="block px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-[#f0fdf4] hover:text-[#134e4a] transition-colors"
                        >
                            Manage Rentals
                        </Link>
                    )}

                    <div className="pt-4 border-t border-gray-100 mt-4 space-y-2">
                        {isAuthenticated ? (
                            <button
                                onClick={() => { logout(); onClose(); }}
                                className="w-full px-4 py-3 rounded-lg bg-[#134e4a] text-white font-semibold text-center"
                            >
                                Sign Out
                            </button>
                        ) : (
                            <>
                                <Link
                                    to="/auth"
                                    onClick={onClose}
                                    className="block px-4 py-3 rounded-lg bg-[#134e4a] text-white font-semibold text-center"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/auth"
                                    onClick={onClose}
                                    className="block px-4 py-3 rounded-lg border border-gray-200 text-gray-700 font-medium text-center hover:bg-gray-50"
                                >
                                    Create Account
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </motion.div>
        </motion.div>
    );
};

// --- Hero Search Component ---
const HeroSearch = () => {
    const [activeTab, setActiveTab] = useState<'rent' | 'buy' | 'stays'>('rent');

    const getHeadline = () => {
        switch (activeTab) {
            case 'rent': return 'Find Your Perfect Home';
            case 'buy': return 'Find Your Dream Home';
            case 'stays': return 'Book Your Perfect Stay';
        }
    };

    const getSubheadline = () => {
        switch (activeTab) {
            case 'rent': return 'Helping millions of renters discover their perfect match.';
            case 'buy': return 'Explore homes for sale in top neighborhoods.';
            case 'stays': return 'Short-term rentals for every occasion.';
        }
    };

    const getSearchLink = () => {
        switch (activeTab) {
            case 'rent': return '/search?type=rent';
            case 'buy': return '/search?type=buy';
            case 'stays': return '/search?type=stays';
        }
    };

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
                    key={activeTab + '-h1'}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-extrabold text-white tracking-tight"
                >
                    {getHeadline()}
                </motion.h1>

                <motion.h2
                    key={activeTab + '-h2'}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl md:text-2xl text-gray-200 font-medium"
                >
                    {getSubheadline()}
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
                            { id: 'stays', label: 'Stays' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={cn(
                                    "flex-1 py-4 text-sm font-bold transition-colors",
                                    activeTab === tab.id
                                        ? "text-[#134e4a] bg-white border-b-2 border-[#134e4a]"
                                        : "text-gray-500 bg-gray-50 hover:bg-gray-100"
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Rent Tab Content */}
                    {activeTab === 'rent' && (
                        <div className="p-4 space-y-4">
                            {/* Location Input - Full Width */}
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#134e4a] w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="City, Neighborhood, ZIP, or Address"
                                    className="w-full h-14 pl-12 pr-4 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-[#134e4a] focus:border-[#134e4a] outline-none text-gray-900 placeholder:text-gray-400 text-base"
                                />
                            </div>

                            {/* Filter Controls */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-1 grid grid-cols-2 gap-3">
                                    <div className="relative">
                                        <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500 font-medium">Price Range</label>
                                        <select className="w-full h-12 px-4 rounded-lg border border-gray-200 text-gray-700 outline-none bg-white focus:ring-2 focus:ring-[#134e4a] focus:border-[#134e4a] cursor-pointer appearance-none">
                                            <option>Any Price</option>
                                            <option>$0 - $1,500</option>
                                            <option>$1,500 - $2,500</option>
                                            <option>$2,500 - $4,000</option>
                                            <option>$4,000+</option>
                                        </select>
                                    </div>
                                    <div className="relative">
                                        <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500 font-medium">Bedrooms</label>
                                        <select className="w-full h-12 px-4 rounded-lg border border-gray-200 text-gray-700 outline-none bg-white focus:ring-2 focus:ring-[#134e4a] focus:border-[#134e4a] cursor-pointer appearance-none">
                                            <option>Any Beds</option>
                                            <option>Studio</option>
                                            <option>1+ Bed</option>
                                            <option>2+ Beds</option>
                                            <option>3+ Beds</option>
                                        </select>
                                    </div>
                                </div>
                                <Link
                                    to={getSearchLink()}
                                    className="h-12 px-8 bg-[#134e4a] hover:bg-[#0f3f3c] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 btn-press whitespace-nowrap"
                                >
                                    Search Rentals
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Buy Tab Content */}
                    {activeTab === 'buy' && (
                        <div className="p-4 space-y-4">
                            {/* Location Input - Full Width */}
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#134e4a] w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="City, Neighborhood, or ZIP"
                                    className="w-full h-14 pl-12 pr-4 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-[#134e4a] focus:border-[#134e4a] outline-none text-gray-900 placeholder:text-gray-400 text-base"
                                />
                            </div>

                            {/* Filter Controls */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-1 grid grid-cols-2 gap-3">
                                    <div className="relative">
                                        <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500 font-medium">Price Range</label>
                                        <select className="w-full h-12 px-4 rounded-lg border border-gray-200 text-gray-700 outline-none bg-white focus:ring-2 focus:ring-[#134e4a] focus:border-[#134e4a] cursor-pointer appearance-none">
                                            <option>Any Price</option>
                                            <option>Under $300k</option>
                                            <option>$300k - $500k</option>
                                            <option>$500k - $750k</option>
                                            <option>$750k - $1M</option>
                                            <option>$1M+</option>
                                        </select>
                                    </div>
                                    <div className="relative">
                                        <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500 font-medium">Property Type</label>
                                        <select className="w-full h-12 px-4 rounded-lg border border-gray-200 text-gray-700 outline-none bg-white focus:ring-2 focus:ring-[#134e4a] focus:border-[#134e4a] cursor-pointer appearance-none">
                                            <option>Any Type</option>
                                            <option>House</option>
                                            <option>Condo</option>
                                            <option>Townhome</option>
                                            <option>Multi-Family</option>
                                        </select>
                                    </div>
                                </div>
                                <Link
                                    to={getSearchLink()}
                                    className="h-12 px-8 bg-[#134e4a] hover:bg-[#0f3f3c] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 btn-press whitespace-nowrap"
                                >
                                    Search Homes
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Stays Tab Content */}
                    {activeTab === 'stays' && (
                        <div className="p-4 space-y-4">
                            {/* Location Input - Full Width */}
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#134e4a] w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Where are you going? (City, neighborhood, or address)"
                                    className="w-full h-14 pl-12 pr-4 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-[#134e4a] focus:border-[#134e4a] outline-none text-gray-900 placeholder:text-gray-400 text-base"
                                />
                            </div>

                            {/* Date & Guest Controls */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-1 grid grid-cols-2 gap-3">
                                    <div className="relative">
                                        <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500 font-medium">Check-in</label>
                                        <input
                                            type="date"
                                            className="w-full h-12 px-4 rounded-lg border border-gray-200 text-gray-700 outline-none bg-white focus:ring-2 focus:ring-[#134e4a] focus:border-[#134e4a] cursor-pointer"
                                        />
                                    </div>
                                    <div className="relative">
                                        <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500 font-medium">Check-out</label>
                                        <input
                                            type="date"
                                            className="w-full h-12 px-4 rounded-lg border border-gray-200 text-gray-700 outline-none bg-white focus:ring-2 focus:ring-[#134e4a] focus:border-[#134e4a] cursor-pointer"
                                        />
                                    </div>
                                </div>
                                <div className="relative sm:w-36">
                                    <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500 font-medium">Guests</label>
                                    <select className="w-full h-12 px-4 rounded-lg border border-gray-200 text-gray-700 outline-none bg-white focus:ring-2 focus:ring-[#134e4a] focus:border-[#134e4a] cursor-pointer appearance-none">
                                        <option>1 Guest</option>
                                        <option>2 Guests</option>
                                        <option>3 Guests</option>
                                        <option>4 Guests</option>
                                        <option>5+ Guests</option>
                                    </select>
                                </div>
                                <Link
                                    to={getSearchLink()}
                                    className="h-12 px-8 bg-[#134e4a] hover:bg-[#0f3f3c] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 btn-press whitespace-nowrap"
                                >
                                    Find Stays
                                </Link>
                            </div>

                            {/* Quick Filters */}
                            <div className="flex flex-wrap gap-2 pt-1">
                                <span className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-[#134e4a] hover:text-white cursor-pointer transition-colors font-medium">Entire places</span>
                                <span className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-[#134e4a] hover:text-white cursor-pointer transition-colors font-medium">Pet friendly</span>
                                <span className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-[#134e4a] hover:text-white cursor-pointer transition-colors font-medium">Self check-in</span>
                                <span className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-[#134e4a] hover:text-white cursor-pointer transition-colors font-medium">Superhosts only</span>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

// --- Value Props ---
const ValueProps = () => (
    <div className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
            {/* Trust Stats */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12 pb-12 border-b border-gray-100">
                <div className="text-center">
                    <div className="text-3xl md:text-4xl font-extrabold text-[#134e4a]">15,000+</div>
                    <div className="text-gray-500 text-sm mt-1">Verified Listings</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl md:text-4xl font-extrabold text-[#134e4a]">2M+</div>
                    <div className="text-gray-500 text-sm mt-1">Active Renters</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl md:text-4xl font-extrabold text-[#134e4a]">98%</div>
                    <div className="text-gray-500 text-sm mt-1">Satisfaction Rate</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl md:text-4xl font-extrabold text-[#134e4a]">24/7</div>
                    <div className="text-gray-500 text-sm mt-1">Support Available</div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center space-y-4 p-6 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-16 h-16 bg-[#f0fdf4] rounded-full flex items-center justify-center text-[#134e4a] mb-2">
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
                    <Link to="/search" className="text-[#134e4a] font-bold flex items-center hover:underline">
                        View all listings <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {properties.map(prop => (
                        <Link
                            key={prop.id}
                            to={`/property/${prop.id}`}
                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group cursor-pointer border border-gray-100"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img
                                    src={prop.image}
                                    alt={prop.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-[#134e4a] uppercase tracking-wider">
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
                        </Link>
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
                        <Link
                            key={idx}
                            to="/search"
                            className="group relative rounded-xl overflow-hidden aspect-[3/4] cursor-pointer"
                        >
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
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Footer ---
const Footer = () => (
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
);

// --- Main Component ---
export function LandingPage() {
    const { recentPropertyIds, clearHistory, hasHistory } = useRecentlyViewed();

    // Get recently viewed properties from mock data
    const recentlyViewedProperties = recentPropertyIds
        .map(id => MOCK_PROPERTIES.find(p => p.id === id))
        .filter(Boolean) as typeof MOCK_PROPERTIES;

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
        .font-sans { font-family: 'Manrope', sans-serif; }
      `}</style>

            <Header />
            <main className="pt-16">
                <HeroSearch />

                {/* Recently Viewed Carousel - only shows if user has history */}
                {hasHistory && (
                    <RecentlyViewedCarousel
                        properties={recentlyViewedProperties}
                        onClearHistory={clearHistory}
                    />
                )}

                <ValueProps />
                <FeaturedSection />
                <LifestyleGrid />

                {/* Marketing / CTA Section */}
                <div className="bg-[#134e4a] py-24 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            List your property on the #1 rental network
                        </h2>
                        <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
                            Connect with millions of renters searching for their next home. We make it easy to manage your listings and find great tenants.
                        </p>
                        <button className="px-8 py-4 bg-white text-[#134e4a] text-lg font-bold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl btn-press">
                            Add Your Listing
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default LandingPage;
