import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Filter, ChevronDown, X, Menu, Search } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import { RoleSwitcher } from './RoleSwitcher';

export interface FilterState {
    priceRange: [number, number] | null;
    beds: number | null; // null = any, 0 = studio, 1+ = beds
    petsAllowed: boolean | null;
}

interface HeaderProps {
    onSearch?: (query: string) => void;
    filters?: FilterState;
    onFilterChange?: (filters: FilterState) => void;
}

const PRICE_OPTIONS = [
    { label: 'Any Price', value: null },
    { label: 'Under $1,500', value: [0, 1500] as [number, number] },
    { label: '$1,500 - $2,500', value: [1500, 2500] as [number, number] },
    { label: '$2,500 - $4,000', value: [2500, 4000] as [number, number] },
    { label: '$4,000+', value: [4000, 99999] as [number, number] },
];

const BEDS_OPTIONS = [
    { label: 'Any Beds', value: null },
    { label: 'Studio', value: 0 },
    { label: '1+ Bed', value: 1 },
    { label: '2+ Beds', value: 2 },
    { label: '3+ Beds', value: 3 },
];

// Role-based navigation actions component
const NavActions = () => {
    const { user, isAuthenticated, logout } = useAuth();

    if (!isAuthenticated || !user) {
        // Not authenticated - show sign in only
        return (
            <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                <Link to="/auth" className="text-sm font-semibold text-[#134e4a] border border-[#134e4a] px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-[#134e4a]/5 transition-colors">
                    Sign In
                </Link>
            </div>
        );
    }

    // Authenticated user - show role-based nav
    const isManager = user.role === 'manager';
    const hasBothRoles = user.hasManagerRole;

    return (
        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            {/* Role Switcher for dual-role users */}
            {hasBothRoles && (
                <RoleSwitcher compact className="hidden md:flex" />
            )}

            {/* Role-specific dashboard link */}
            {isManager ? (
                <Link to="/manager" className="text-sm font-semibold text-gray-600 hover:text-[#134e4a] hidden lg:block">
                    Manager Dashboard
                </Link>
            ) : (
                <Link to="/dashboard" className="text-sm font-semibold text-gray-600 hover:text-[#134e4a] hidden lg:block">
                    My Dashboard
                </Link>
            )}

            {/* User menu button */}
            <button
                onClick={() => logout()}
                className="flex items-center gap-2 text-sm font-semibold text-[#134e4a] border border-[#134e4a] px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-[#134e4a]/5 transition-colors"
            >
                <span className="w-6 h-6 rounded-full bg-[#134e4a] text-white flex items-center justify-center text-xs font-bold">
                    {user.initials}
                </span>
                <span className="hidden sm:inline">Sign Out</span>
            </button>
        </div>
    );
};

// Mobile navigation menu with role-based links
const MobileNavMenu = ({ onClose }: { onClose: () => void }) => {
    const { user, isAuthenticated, logout } = useAuth();
    const isManager = user?.role === 'manager';
    const hasBothRoles = user?.hasManagerRole;

    return (
        <div className="fixed inset-0 z-[60] md:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#134e4a] rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">R</span>
                        </div>
                        <span className="text-lg font-bold text-[#134e4a]">ResidentFinder</span>
                    </Link>
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
                        className="block px-4 py-3 rounded-lg text-gray-700 font-medium bg-[#f0fdf4] text-[#134e4a]"
                    >
                        Find Apartments
                    </Link>

                    {/* Role-based dashboard link */}
                    {isAuthenticated && (
                        isManager ? (
                            <Link
                                to="/manager"
                                onClick={onClose}
                                className="block px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                            >
                                Manager Dashboard
                            </Link>
                        ) : (
                            <Link
                                to="/dashboard"
                                onClick={onClose}
                                className="block px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                            >
                                My Dashboard
                            </Link>
                        )
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
            </div>
        </div>
    );
};

export const Header = ({ onSearch, filters, onFilterChange }: HeaderProps) => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleFilterChange = (key: keyof FilterState, value: any) => {
        if (onFilterChange && filters) {
            onFilterChange({ ...filters, [key]: value });
        }
        setOpenDropdown(null);
    };

    const getPriceLabel = () => {
        if (!filters?.priceRange) return 'Any';
        const [min, max] = filters.priceRange;
        if (max >= 99999) return `$${(min / 1000).toFixed(1)}k+`;
        return `$${(min / 1000).toFixed(1)}k - $${(max / 1000).toFixed(1)}k`;
    };

    const getBedsLabel = () => {
        if (filters?.beds === null || filters?.beds === undefined) return 'Any';
        if (filters.beds === 0) return 'Studio';
        return `${filters.beds}+ Beds`;
    };

    const hasActiveFilters = filters && (filters.priceRange || filters.beds !== null || filters.petsAllowed);
    const activeFilterCount = [filters?.priceRange, filters?.beds !== null && filters?.beds !== undefined ? true : null, filters?.petsAllowed].filter(Boolean).length;

    const clearFilters = () => {
        if (onFilterChange) {
            onFilterChange({ priceRange: null, beds: null, petsAllowed: null });
        }
    };

    return (
        <>
            <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm font-sans">
                <div className="max-w-[1920px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg -ml-2"
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 flex-shrink-0 cursor-pointer">
                        <div className="w-8 h-8 bg-[#134e4a] rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">R</span>
                        </div>
                        <span className="text-xl font-extrabold tracking-tight text-[#134e4a] hidden sm:block">
                            Resident<span className="font-light text-gray-500">Finder</span>
                        </span>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <div className="flex-1 max-w-2xl relative hidden md:block">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-[#134e4a] transition-colors" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a] transition-all sm:text-sm"
                                placeholder="City, Neighborhood, Zip, or Address"
                                defaultValue="Seattle, WA"
                                onChange={(e) => onSearch?.(e.target.value)}
                            />
                            <button className="absolute inset-y-1 right-1 bg-[#134e4a] text-white px-4 rounded-full text-sm font-semibold hover:bg-[#0f3f3c] transition-colors btn-press">
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Nav Actions */}
                    <NavActions />
                </div>

                {/* Mobile Search Bar */}
                <div className="md:hidden px-4 pb-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#134e4a]/20 focus:border-[#134e4a]"
                            placeholder="Seattle, WA"
                            onChange={(e) => onSearch?.(e.target.value)}
                        />
                    </div>
                </div>

                {/* Filters Bar */}
                <div ref={dropdownRef} className="border-t border-gray-100 py-2 px-4 bg-white flex items-center gap-3 overflow-x-auto no-scrollbar">
                    {/* Price Filter */}
                    <div className="relative">
                        <button
                            onClick={() => setOpenDropdown(openDropdown === 'price' ? null : 'price')}
                            className={cn(
                                "flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-sm font-medium transition-all whitespace-nowrap",
                                filters?.priceRange
                                    ? "bg-[#134e4a]/10 border-[#134e4a] text-[#134e4a]"
                                    : "bg-white border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                            )}
                        >
                            Price
                            <span className="text-[#134e4a] font-bold ml-1">{getPriceLabel()}</span>
                            <ChevronDown className={cn("w-3.5 h-3.5 opacity-50 transition-transform", openDropdown === 'price' && "rotate-180")} />
                        </button>
                        {openDropdown === 'price' && (
                            <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[180px] z-50">
                                {PRICE_OPTIONS.map(opt => (
                                    <button
                                        key={opt.label}
                                        onClick={() => handleFilterChange('priceRange', opt.value)}
                                        className={cn(
                                            "w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors",
                                            JSON.stringify(filters?.priceRange) === JSON.stringify(opt.value) && "bg-[#134e4a]/10 text-[#134e4a] font-medium"
                                        )}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Beds Filter */}
                    <div className="relative">
                        <button
                            onClick={() => setOpenDropdown(openDropdown === 'beds' ? null : 'beds')}
                            className={cn(
                                "flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-sm font-medium transition-all whitespace-nowrap",
                                filters?.beds !== null && filters?.beds !== undefined
                                    ? "bg-[#134e4a]/10 border-[#134e4a] text-[#134e4a]"
                                    : "bg-white border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                            )}
                        >
                            Beds
                            <span className="text-[#134e4a] font-bold ml-1">{getBedsLabel()}</span>
                            <ChevronDown className={cn("w-3.5 h-3.5 opacity-50 transition-transform", openDropdown === 'beds' && "rotate-180")} />
                        </button>
                        {openDropdown === 'beds' && (
                            <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[140px] z-50">
                                {BEDS_OPTIONS.map(opt => (
                                    <button
                                        key={opt.label}
                                        onClick={() => handleFilterChange('beds', opt.value)}
                                        className={cn(
                                            "w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors",
                                            filters?.beds === opt.value && "bg-[#134e4a]/10 text-[#134e4a] font-medium"
                                        )}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Pet Friendly Toggle */}
                    <button
                        onClick={() => handleFilterChange('petsAllowed', filters?.petsAllowed ? null : true)}
                        className={cn(
                            "flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-sm font-medium transition-all whitespace-nowrap",
                            filters?.petsAllowed
                                ? "bg-[#134e4a]/10 border-[#134e4a] text-[#134e4a]"
                                : "bg-white border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                        )}
                    >
                        🐾 Pet Friendly
                    </button>

                    <FilterButton label="Move-In Date" />
                    <FilterButton label="More" icon={Filter} badge={activeFilterCount > 0 ? activeFilterCount : undefined} />

                    <div className="h-6 w-px bg-gray-200 mx-2 flex-shrink-0"></div>

                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className="text-sm font-medium text-red-500 hover:text-red-600 whitespace-nowrap flex items-center gap-1"
                        >
                            <X className="w-3.5 h-3.5" /> Clear Filters
                        </button>
                    )}

                    <button className="text-sm font-medium text-[#134e4a] hover:underline whitespace-nowrap">
                        Save Search
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <MobileNavMenu onClose={() => setMobileMenuOpen(false)} />
            )}
        </>
    );
};

const FilterButton = ({ label, value, active = false, icon: Icon, badge }: { label: string, value?: string, active?: boolean, icon?: any, badge?: number }) => (
    <button
        className={cn(
            "flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-sm font-medium transition-all whitespace-nowrap btn-press relative",
            active
                ? "bg-[#134e4a]/10 border-[#134e4a] text-[#134e4a]"
                : "bg-white border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
        )}
    >
        {Icon && <Icon className="w-3.5 h-3.5" />}
        {label}
        {value && <span className="text-[#134e4a] font-bold ml-1">{value}</span>}
        <ChevronDown className={cn("w-3.5 h-3.5 opacity-50", active && "text-[#134e4a]")} />
        {badge && badge > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#134e4a] text-white text-[10px] font-bold rounded-full flex items-center justify-center filter-active-dot">
                {badge}
            </span>
        )}
    </button>
);


