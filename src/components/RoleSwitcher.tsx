import React from 'react';
import { Home, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

interface RoleSwitcherProps {
    className?: string;
    compact?: boolean; // For header use
}

export const RoleSwitcher = ({ className, compact = false }: RoleSwitcherProps) => {
    const { user, setRole } = useAuth();

    // Only show if user has both roles
    if (!user?.hasManagerRole) {
        return null;
    }

    const currentRole = user.role;

    if (compact) {
        // Compact version for header - just icons
        return (
            <div className={cn("flex items-center bg-gray-100 rounded-full p-0.5", className)}>
                <button
                    onClick={() => setRole('renter')}
                    className={cn(
                        "p-1.5 rounded-full transition-all",
                        currentRole === 'renter'
                            ? "bg-white text-[#134e4a] shadow-sm"
                            : "text-gray-400 hover:text-gray-600"
                    )}
                    title="Renter View"
                >
                    <Home size={16} />
                </button>
                <button
                    onClick={() => setRole('manager')}
                    className={cn(
                        "p-1.5 rounded-full transition-all",
                        currentRole === 'manager'
                            ? "bg-white text-[#134e4a] shadow-sm"
                            : "text-gray-400 hover:text-gray-600"
                    )}
                    title="Manager View"
                >
                    <Building2 size={16} />
                </button>
            </div>
        );
    }

    // Full version with labels
    return (
        <div className={cn("flex items-center bg-gray-100 rounded-lg p-1", className)}>
            <button
                onClick={() => setRole('renter')}
                className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                    currentRole === 'renter'
                        ? "bg-white text-[#134e4a] shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                )}
            >
                <Home size={16} />
                Renter
            </button>
            <button
                onClick={() => setRole('manager')}
                className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                    currentRole === 'manager'
                        ? "bg-white text-[#134e4a] shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                )}
            >
                <Building2 size={16} />
                Manager
            </button>
        </div>
    );
};

export default RoleSwitcher;
