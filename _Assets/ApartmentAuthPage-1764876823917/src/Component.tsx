import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Check, 
  Home,
  Building2,
  User,
  Facebook,
  Chrome
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Mock Social Icons ---
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5 text-[#1877F2] fill-current" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const AppleIcon = () => (
  <svg className="w-5 h-5 text-black fill-current" viewBox="0 0 24 24">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.48-.93 3.99-.84 1.57.09 2.56.6 3.21 1.51-.79 1.2-1.24 2.74-1.21 4.42.03 2.63 2.34 3.79 2.46 3.84-.1.54-.26 1.07-.47 1.58-.7 1.73-1.67 3.25-3.06 1.72zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
);

// --- Types ---
type UserType = 'renter' | 'manager';
type AuthMode = 'signin' | 'signup';

// --- Main Component ---
export function ApartmentAuthPage() {
  const [userType, setUserType] = useState<UserType>('renter');
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const toggleMode = () => {
    setAuthMode(prev => prev === 'signin' ? 'signup' : 'signin');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Auth submitted:', { mode: authMode, type: userType, ...formData });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900">
      {/* Header */}
      <header className="h-16 px-6 flex items-center justify-between border-b border-gray-100 fixed w-full top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Home className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-primary">Apartments.com</span>
        </div>
        <button className="text-sm font-medium text-gray-500 hover:text-primary transition-colors">
          Close
        </button>
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
          <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
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

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white">
          <div className="w-full max-w-md space-y-8">
            
            {/* User Type Toggle */}
            <div className="bg-gray-100 p-1 rounded-xl flex">
              <button
                onClick={() => setUserType('renter')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all",
                  userType === 'renter' 
                    ? "bg-white text-primary shadow-sm" 
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
                    ? "bg-white text-primary shadow-sm" 
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                <Building2 size={18} />
                Property Manager
              </button>
            </div>

            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold text-gray-900">
                {authMode === 'signin' ? 'Welcome back' : 'Create your account'}
              </h1>
              <p className="text-gray-500">
                {authMode === 'signin' 
                  ? 'Enter your details to access your account.' 
                  : 'Start your journey with us today.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === 'signup' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="space-y-1.5"
                >
                  <label className="text-sm font-medium text-gray-700 ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </motion.div>
              )}

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {authMode === 'signin' && (
                <div className="flex justify-end">
                  <button type="button" className="text-sm font-medium text-primary hover:text-emerald-700">
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-emerald-800 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group"
              >
                {authMode === 'signin' ? 'Sign In' : 'Create Account'}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button className="flex items-center justify-center py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <GoogleIcon />
              </button>
              <button className="flex items-center justify-center py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <AppleIcon />
              </button>
              <button className="flex items-center justify-center py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <FacebookIcon />
              </button>
            </div>

            <p className="text-center text-sm text-gray-500">
              {authMode === 'signin' ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={toggleMode}
                className="font-bold text-primary hover:underline"
              >
                {authMode === 'signin' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApartmentAuthPage;