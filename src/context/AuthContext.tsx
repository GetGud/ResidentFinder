import React, { createContext, useContext, useState, ReactNode } from 'react';

// Mock user type - ready for Clerk integration later
interface User {
    id: string;
    name: string;
    email: string;
    initials: string;
    role: 'renter' | 'manager';
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
    setRole: (role: 'renter' | 'manager') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for development
const MOCK_USER: User = {
    id: '1',
    name: 'Alex Morgan',
    email: 'alex@example.com',
    initials: 'AM',
    role: 'renter'
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(MOCK_USER); // Start logged in for dev

    const login = (userData: User) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    const setRole = (role: 'renter' | 'manager') => {
        if (user) {
            setUser({ ...user, role });
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            login,
            logout,
            setRole
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
