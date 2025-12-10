import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';

// Storage keys
const ROLE_STORAGE_KEY = 'residentfinder_user_role';
const HAS_MANAGER_ROLE_KEY = 'residentfinder_has_manager_role';
const ONBOARDING_COMPLETE_KEY = 'residentfinder_onboarding_complete';

// User type with role for app-specific permissions
interface AppUser {
    id: string;
    name: string;
    email: string;
    initials: string;
    imageUrl?: string;
    role: 'renter' | 'manager';
    hasManagerRole: boolean; // Can user access manager features?
}

interface AuthContextType {
    user: AppUser | null;
    isAuthenticated: boolean;
    isLoaded: boolean;
    logout: () => void;
    setRole: (role: 'renter' | 'manager') => void;
    enableManagerRole: () => void; // Enable manager capabilities for user
    hasCompletedOnboarding: boolean;
    setOnboardingComplete: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const { user: clerkUser, isLoaded, isSignedIn } = useUser();
    const { signOut } = useClerk();

    // Load persisted values from localStorage
    const [role, setRoleState] = useState<'renter' | 'manager'>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(ROLE_STORAGE_KEY);
            return (saved === 'manager' ? 'manager' : 'renter');
        }
        return 'renter';
    });

    const [hasManagerRole, setHasManagerRole] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(HAS_MANAGER_ROLE_KEY) === 'true';
        }
        return false;
    });

    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(ONBOARDING_COMPLETE_KEY) === 'true';
        }
        return false;
    });

    // Persist role changes
    const setRole = (newRole: 'renter' | 'manager') => {
        setRoleState(newRole);
        if (typeof window !== 'undefined') {
            localStorage.setItem(ROLE_STORAGE_KEY, newRole);
        }
    };

    // Enable manager role for user (called during onboarding or upgrade)
    const enableManagerRole = () => {
        setHasManagerRole(true);
        if (typeof window !== 'undefined') {
            localStorage.setItem(HAS_MANAGER_ROLE_KEY, 'true');
        }
    };

    // Mark onboarding as complete
    const setOnboardingComplete = () => {
        setHasCompletedOnboarding(true);
        if (typeof window !== 'undefined') {
            localStorage.setItem(ONBOARDING_COMPLETE_KEY, 'true');
        }
    };

    // Build app user from Clerk user
    const user: AppUser | null = clerkUser && isSignedIn ? {
        id: clerkUser.id,
        name: clerkUser.fullName || clerkUser.firstName || 'User',
        email: clerkUser.primaryEmailAddress?.emailAddress || '',
        initials: getInitials(clerkUser.fullName || clerkUser.firstName || 'U'),
        imageUrl: clerkUser.imageUrl,
        role: role,
        hasManagerRole: hasManagerRole
    } : null;

    const logout = () => {
        signOut();
        // Optionally clear role preferences on logout
        // localStorage.removeItem(ROLE_STORAGE_KEY);
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!isSignedIn,
            isLoaded,
            logout,
            setRole,
            enableManagerRole,
            hasCompletedOnboarding,
            setOnboardingComplete
        }}>
            {children}
        </AuthContext.Provider>
    );
}

// Helper to get initials from name
function getInitials(name: string): string {
    return name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
