import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignIn, SignUp, SignedIn, SignedOut } from '@clerk/clerk-react';
import { Building2, User, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

// --- Types ---
type UserType = 'renter' | 'manager';
type AuthMode = 'signin' | 'signup';

// --- Main Component ---
export function AuthPage() {
    const [userType, setUserType] = useState<UserType>('renter');
    const [authMode, setAuthMode] = useState<AuthMode>('signin');
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
        .font-sans { font-family: 'Manrope', sans-serif; }
        /* Clerk component customization */
        .cl-card { box-shadow: none !important; }
        .cl-rootBox { width: 100%; }
        .cl-card { background: transparent !important; }
      `}</style>

            {/* Header */}
            <header className="h-16 px-6 flex items-center justify-between border-b border-gray-100 fixed w-full top-0 bg-white/95 backdrop-blur-sm z-50">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#134e4a] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">R</span>
                    </div>
                    <span className="text-xl font-extrabold tracking-tight text-[#134e4a]">
                        Resident<span className="font-light text-gray-500">Finder</span>
                    </span>
                </Link>
                <Link to="/" className="text-sm font-medium text-gray-500 hover:text-[#134e4a] transition-colors">
                    Close
                </Link>
            </header>

            <div className="flex-1 flex pt-16">
                {/* Left Side - Visuals (Desktop Only) */}
                <div className="hidden lg:flex w-1/2 bg-gray-900 relative overflow-hidden">
                    <motion.img
                        key={userType}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7 }}
                        src={userType === 'renter'
                            ? "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=80"
                            : "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2000&q=80"
                        }
                        alt="Apartment Interior"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#134e4a]/40 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="relative z-10 p-12 flex flex-col justify-end h-full text-white max-w-xl">
                        <motion.div
                            key={userType + 'text'}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-4xl font-extrabold mb-4 leading-tight">
                                {userType === 'renter'
                                    ? "Discover a place you'll love to live."
                                    : "Manage your properties with confidence."}
                            </h2>
                            <p className="text-lg text-gray-200 mb-8">
                                {userType === 'renter'
                                    ? "Join millions of renters finding their perfect match on the most trusted rental platform."
                                    : "Reach the largest audience of high-quality renters and streamline your leasing process."}
                            </p>

                            <div className="flex items-center gap-4 text-sm font-medium">
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                                        <Check size={12} />
                                    </div>
                                    Verified Listings
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                                        <Check size={12} />
                                    </div>
                                    {userType === 'renter' ? 'Tour Scheduling' : 'Tenant Screening'}
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                                        <Check size={12} />
                                    </div>
                                    {userType === 'renter' ? 'Online Applications' : 'Rent Collection'}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Right Side - Clerk Auth Components */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white">
                    <div className="w-full max-w-md space-y-6">

                        {/* User Type Toggle */}
                        <div className="bg-gray-100 p-1 rounded-xl flex">
                            <button
                                onClick={() => setUserType('renter')}
                                className={cn(
                                    "flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all",
                                    userType === 'renter'
                                        ? "bg-white text-[#134e4a] shadow-sm"
                                        : "text-gray-500 hover:text-gray-700"
                                )}
                            >
                                <User size={18} />
                                Renter
                            </button>
                            <button
                                onClick={() => setUserType('manager')}
                                className={cn(
                                    "flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all",
                                    userType === 'manager'
                                        ? "bg-white text-[#134e4a] shadow-sm"
                                        : "text-gray-500 hover:text-gray-700"
                                )}
                            >
                                <Building2 size={18} />
                                Property Manager
                            </button>
                        </div>

                        {/* Auth Mode Toggle */}
                        <div className="flex justify-center gap-4 text-sm">
                            <button
                                onClick={() => setAuthMode('signin')}
                                className={cn(
                                    "font-medium transition-colors",
                                    authMode === 'signin'
                                        ? "text-[#134e4a] underline underline-offset-4"
                                        : "text-gray-500 hover:text-gray-700"
                                )}
                            >
                                Sign In
                            </button>
                            <span className="text-gray-300">|</span>
                            <button
                                onClick={() => setAuthMode('signup')}
                                className={cn(
                                    "font-medium transition-colors",
                                    authMode === 'signup'
                                        ? "text-[#134e4a] underline underline-offset-4"
                                        : "text-gray-500 hover:text-gray-700"
                                )}
                            >
                                Sign Up
                            </button>
                        </div>

                        {/* Clerk Components */}
                        <SignedOut>
                            <div className="flex justify-center">
                                {authMode === 'signin' ? (
                                    <SignIn
                                        routing="hash"
                                        signUpUrl="/auth"
                                        afterSignInUrl={userType === 'manager' ? '/manager' : '/dashboard'}
                                    />
                                ) : (
                                    <SignUp
                                        routing="hash"
                                        signInUrl="/auth"
                                        afterSignUpUrl={userType === 'manager' ? '/manager' : '/dashboard'}
                                    />
                                )}
                            </div>
                        </SignedOut>

                        {/* Already signed in - redirect */}
                        <SignedIn>
                            <div className="text-center py-8">
                                <p className="text-gray-600 mb-4">You're already signed in!</p>
                                <button
                                    onClick={() => navigate(userType === 'manager' ? '/manager' : '/dashboard')}
                                    className="bg-[#134e4a] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#0f3f3c] transition-all"
                                >
                                    Go to {userType === 'manager' ? 'Manager Dashboard' : 'Dashboard'}
                                </button>
                            </div>
                        </SignedIn>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;

