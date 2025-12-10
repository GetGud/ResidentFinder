import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';

// User type with role for app-specific permissions
interface AppUser {
    id: string;
    name: string;
    email: string;
    initials: string;
    imageUrl?: string;
    role: 'renter' | 'manager';
}

interface AuthContextType {
    user: AppUser | null;
    isAuthenticated: boolean;
    isLoaded: boolean;
    logout: () => void;
    setRole: (role: 'renter' | 'manager') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const { user: clerkUser, isLoaded, isSignedIn } = useUser();
    const { signOut } = useClerk();
    const [role, setRole] = useState<'renter' | 'manager'>('renter');

    // Build app user from Clerk user
    const user: AppUser | null = clerkUser && isSignedIn ? {
        id: clerkUser.id,
        name: clerkUser.fullName || clerkUser.firstName || 'User',
        email: clerkUser.primaryEmailAddress?.emailAddress || '',
        initials: getInitials(clerkUser.fullName || clerkUser.firstName || 'U'),
        imageUrl: clerkUser.imageUrl,
        role: role
    } : null;

    const logout = () => {
        signOut();
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!isSignedIn,
            isLoaded,
            logout,
            setRole
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

