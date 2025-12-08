import { createContext, useContext, useState, ReactNode } from 'react';
import { Property } from '../types';

interface CompareContextType {
    compareList: Property[];
    addToCompare: (property: Property) => void;
    removeFromCompare: (propertyId: string) => void;
    isInCompare: (propertyId: string) => boolean;
    clearCompare: () => void;
    isDrawerOpen: boolean;
    setDrawerOpen: (open: boolean) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
    const [compareList, setCompareList] = useState<Property[]>([]);
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const addToCompare = (property: Property) => {
        if (compareList.length < 3 && !compareList.find(p => p.id === property.id)) {
            setCompareList([...compareList, property]);
            setDrawerOpen(true);
        }
    };

    const removeFromCompare = (propertyId: string) => {
        setCompareList(compareList.filter(p => p.id !== propertyId));
    };

    const isInCompare = (propertyId: string) => {
        return compareList.some(p => p.id === propertyId);
    };

    const clearCompare = () => {
        setCompareList([]);
        setDrawerOpen(false);
    };

    return (
        <CompareContext.Provider value={{
            compareList,
            addToCompare,
            removeFromCompare,
            isInCompare,
            clearCompare,
            isDrawerOpen,
            setDrawerOpen
        }}>
            {children}
        </CompareContext.Provider>
    );
}

export function useCompare() {
    const context = useContext(CompareContext);
    if (!context) {
        throw new Error('useCompare must be used within a CompareProvider');
    }
    return context;
}
