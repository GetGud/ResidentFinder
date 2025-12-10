import React, { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Heart,
    Calendar,
    FileText,
    MessageSquare,
    Settings,
    Bell,
    Search
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

interface DashboardLayoutProps {
    children: ReactNode;
}

type NavItem = {
    id: string;
    label: string;
    icon: React.ElementType;
    href: string;
    count?: number;
};

const NAV_ITEMS: NavItem[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
    { id: 'saved', label: 'Saved Listings', icon: Heart, href: '/dashboard/saved', count: 12 },
    { id: 'tours', label: 'Tours', icon: Calendar, href: '/dashboard/tours', count: 2 },
    { id: 'applications', label: 'Applications', icon: FileText, href: '/dashboard/applications', count: 1 },
    { id: 'messages', label: 'Messages', icon: MessageSquare, href: '/dashboard/messages', count: 3 },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/dashboard/settings' },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const { user } = useAuth();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(() => {
        const current = NAV_ITEMS.find(item => location.pathname === item.href);
        return current?.id || 'overview';
    });

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
        .font-sans { font-family: 'Manrope', sans-serif; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

            {/* Top Navigation */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
                {/* Top Bar: Logo & Utilities */}
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
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
                        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        <div className="h-8 w-px bg-gray-200 mx-2 hidden sm:block" />

                        <button className="flex items-center gap-3 hover:bg-gray-50 p-1.5 rounded-full transition-colors">
                            <div className="w-8 h-8 rounded-full bg-[#f0fdf4] flex items-center justify-center text-[#134e4a] font-bold text-sm border border-[#134e4a]/20">
                                {user?.initials || 'U'}
                            </div>
                            <span className="text-sm font-medium text-gray-700 hidden sm:block">{user?.name || 'User'}</span>
                        </button>
                    </div>
                </div>

                {/* Secondary Bar: Navigation Tabs */}
                <div className="border-t border-gray-100 bg-white">
                    <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="flex items-center gap-1 overflow-x-auto hide-scrollbar -mb-px">
                            {NAV_ITEMS.map((item) => (
                                <Link
                                    key={item.id}
                                    to={item.href}
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
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}

export default DashboardLayout;
