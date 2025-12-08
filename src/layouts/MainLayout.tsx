import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface MainLayoutProps {
    children: ReactNode;
    hideFooter?: boolean;
}

// Shared header component for public pages
const MainHeader = () => {
    const { user, isAuthenticated } = useAuth();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#134e4a] rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">R</span>
                        </div>
                        <span className="text-xl font-extrabold tracking-tight text-[#134e4a]">
                            Resident<span className="font-light text-gray-500">Finder</span>
                        </span>
                    </Link>

                    {/* Nav Links */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                        <Link to="/search" className="hover:text-[#134e4a] transition-colors">Find Apartments</Link>
                        <Link to="/manager" className="hover:text-[#134e4a] transition-colors">Manage Rentals</Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    {isAuthenticated && user ? (
                        <>
                            <Link to="/dashboard" className="text-sm font-semibold text-gray-600 hover:text-[#134e4a] hidden lg:block">
                                Dashboard
                            </Link>
                            <Link to="/dashboard" className="flex items-center gap-2 hover:bg-gray-50 p-1.5 rounded-full transition-colors">
                                <div className="w-8 h-8 rounded-full bg-[#f0fdf4] flex items-center justify-center text-[#134e4a] font-bold text-sm border border-[#134e4a]/20">
                                    {user.initials}
                                </div>
                                <span className="text-sm font-medium text-gray-700 hidden sm:block">{user.name}</span>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/auth" className="text-sm font-semibold text-gray-600 hover:text-[#134e4a] hidden lg:block">
                                Sign Up
                            </Link>
                            <Link to="/auth" className="text-sm font-semibold text-[#134e4a] border border-[#134e4a] px-4 py-2 rounded-md hover:bg-[#134e4a]/5 transition-colors">
                                Sign In
                            </Link>
                        </>
                    )}
                    <button className="md:hidden p-2 text-gray-600">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    );
};

// Shared footer component
const MainFooter = () => (
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
                    <li><Link to="/manager" className="hover:text-white">Manager Dashboard</Link></li>
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
            © 2024 ResidentFinder. All rights reserved.
        </div>
    </footer>
);

export function MainLayout({ children, hideFooter = false }: MainLayoutProps) {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
        .font-sans { font-family: 'Manrope', sans-serif; }
      `}</style>

            <MainHeader />
            <main className="pt-16">
                {children}
            </main>
            {!hideFooter && <MainFooter />}
        </div>
    );
}

export default MainLayout;
