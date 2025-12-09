import { useState, useEffect, useCallback } from 'react';
import { FilterState } from '../components/Header';

const STORAGE_KEY = 'residentfinder_saved_searches';
const MAX_SAVED_SEARCHES = 10;

export interface SavedSearch {
    id: string;
    name: string;
    filters: FilterState;
    searchQuery: string;
    createdAt: number;
    lastMatched?: number;
    newListingsCount?: number;
}

export function useSavedSearches() {
    const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored) as SavedSearch[];
                setSavedSearches(parsed);
            }
        } catch (error) {
            console.error('Failed to load saved searches:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Save to localStorage when state changes
    const saveToStorage = useCallback((searches: SavedSearch[]) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
        } catch (error) {
            console.error('Failed to save searches:', error);
        }
    }, []);

    // Save a new search
    const saveSearch = useCallback((
        name: string,
        filters: FilterState,
        searchQuery: string
    ): SavedSearch => {
        const newSearch: SavedSearch = {
            id: `search_${Date.now()}`,
            name,
            filters,
            searchQuery,
            createdAt: Date.now(),
        };

        setSavedSearches(prev => {
            const updated = [newSearch, ...prev].slice(0, MAX_SAVED_SEARCHES);
            saveToStorage(updated);
            return updated;
        });

        return newSearch;
    }, [saveToStorage]);

    // Delete a saved search
    const deleteSearch = useCallback((searchId: string) => {
        setSavedSearches(prev => {
            const updated = prev.filter(s => s.id !== searchId);
            saveToStorage(updated);
            return updated;
        });
    }, [saveToStorage]);

    // Update search name
    const renameSearch = useCallback((searchId: string, newName: string) => {
        setSavedSearches(prev => {
            const updated = prev.map(s =>
                s.id === searchId ? { ...s, name: newName } : s
            );
            saveToStorage(updated);
            return updated;
        });
    }, [saveToStorage]);

    // Update new listings count for a search (simulated)
    const updateNewListingsCount = useCallback((searchId: string, count: number) => {
        setSavedSearches(prev => {
            const updated = prev.map(s =>
                s.id === searchId
                    ? { ...s, newListingsCount: count, lastMatched: Date.now() }
                    : s
            );
            saveToStorage(updated);
            return updated;
        });
    }, [saveToStorage]);

    // Get total new listings across all saved searches
    const totalNewListings = savedSearches.reduce(
        (sum, search) => sum + (search.newListingsCount || 0),
        0
    );

    // Clear all saved searches
    const clearAll = useCallback(() => {
        setSavedSearches([]);
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error('Failed to clear saved searches:', error);
        }
    }, []);

    return {
        savedSearches,
        isLoading,
        saveSearch,
        deleteSearch,
        renameSearch,
        updateNewListingsCount,
        totalNewListings,
        clearAll,
        hasSavedSearches: savedSearches.length > 0
    };
}

export default useSavedSearches;
