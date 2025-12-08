import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'residentfinder_favorites';

export function useFavorites() {
    const [favorites, setFavorites] = useState<string[]>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    // Sync to localStorage whenever favorites change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = useCallback((propertyId: string) => {
        setFavorites(prev => {
            if (prev.includes(propertyId)) {
                return prev.filter(id => id !== propertyId);
            }
            return [...prev, propertyId];
        });
    }, []);

    const isFavorite = useCallback((propertyId: string) => {
        return favorites.includes(propertyId);
    }, [favorites]);

    const clearFavorites = useCallback(() => {
        setFavorites([]);
    }, []);

    return {
        favorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        favoritesCount: favorites.length
    };
}
