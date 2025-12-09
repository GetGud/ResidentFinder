import { useState, useEffect, useCallback } from 'react';
import { Property } from '../types';

const STORAGE_KEY = 'residentfinder_recently_viewed';
const MAX_ITEMS = 10;

interface RecentlyViewedItem {
    propertyId: string;
    viewedAt: number;
}

export function useRecentlyViewed() {
    const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedItem[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored) as RecentlyViewedItem[];
                // Sort by most recent first
                parsed.sort((a, b) => b.viewedAt - a.viewedAt);
                setRecentlyViewed(parsed);
            }
        } catch (error) {
            console.error('Failed to load recently viewed:', error);
        }
    }, []);

    // Save to localStorage when state changes
    const saveToStorage = useCallback((items: RecentlyViewedItem[]) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch (error) {
            console.error('Failed to save recently viewed:', error);
        }
    }, []);

    // Add a property to recently viewed
    const addViewed = useCallback((propertyId: string) => {
        setRecentlyViewed(prev => {
            // Remove if already exists
            const filtered = prev.filter(item => item.propertyId !== propertyId);
            // Add to front
            const updated = [{ propertyId, viewedAt: Date.now() }, ...filtered];
            // Limit to max items
            const limited = updated.slice(0, MAX_ITEMS);
            saveToStorage(limited);
            return limited;
        });
    }, [saveToStorage]);

    // Clear all history
    const clearHistory = useCallback(() => {
        setRecentlyViewed([]);
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error('Failed to clear recently viewed:', error);
        }
    }, []);

    // Get property IDs
    const getRecentPropertyIds = useCallback(() => {
        return recentlyViewed.map(item => item.propertyId);
    }, [recentlyViewed]);

    return {
        recentlyViewed,
        recentPropertyIds: recentlyViewed.map(item => item.propertyId),
        addViewed,
        clearHistory,
        getRecentPropertyIds,
        hasHistory: recentlyViewed.length > 0
    };
}

export default useRecentlyViewed;
