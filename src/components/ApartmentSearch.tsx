import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Maximize, CheckCircle2, ChevronDown, SearchX } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMap, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { Header, FilterState, SearchMode } from './Header';
import { PropertyCard } from './PropertyCard';
import { StayCard } from './StayCard';
import { PropertyDetailsModal } from './PropertyDetailsModal';
import { StayDetailsModal } from './StayDetailsModal';
import { BuyDetailsModal } from './BuyDetailsModal';
import { PropertyCardSkeleton } from './Skeleton';
import { MOCK_PROPERTIES, MOCK_STAYS, MOCK_BUY_PROPERTIES } from '../data/mockData';
import { Property, Stay, BuyProperty } from '../types';
import { cn } from '../lib/utils';

// Fix for default Leaflet markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Marker Component
const CustomMarker = ({
    property,
    priceDisplay,
    isHovered,
    isNew,
    onClick,
    onHoverStart,
    onHoverEnd
}: {
    property: Property | Stay | BuyProperty;
    priceDisplay: string;
    isHovered: boolean;
    isNew?: boolean;
    onClick: () => void;
    onHoverStart: () => void;
    onHoverEnd: () => void;
}) => {
    const map = useMap();

    // Fly to marker when hovered from list
    useEffect(() => {
        if (isHovered) {
            map.flyTo([property.coordinates.lat, property.coordinates.lng], 15, { duration: 0.5 });
        }
    }, [isHovered, map, property]);

    return (
        <Marker
            position={[property.coordinates.lat, property.coordinates.lng]}
            opacity={0} // Hide default marker, show tooltip as the marker
            eventHandlers={{
                click: onClick,
                mouseover: onHoverStart,
                mouseout: onHoverEnd
            }}
        >
            <Tooltip
                permanent
                direction="center"
                // ... existing tooltip className ...
                className="bg-transparent border-none shadow-none p-0 !bg-transparent !border-0 before:!hidden"
                offset={[0, 0]}
            >
                <div className="relative pointer-events-auto">
                    {/* Price Bubble */}
                    <div
                        className={cn(
                            "px-3 py-1.5 rounded-full shadow-lg font-bold text-sm transition-all duration-200 transform cursor-pointer",
                            isHovered
                                ? 'bg-[#134e4a] text-white scale-110 -translate-y-1 z-[1000]'
                                : 'bg-white text-[#134e4a] border border-gray-200 hover:scale-105'
                        )}
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick();
                        }}
                    >
                        {priceDisplay}
                        {/* Arrow */}
                        <div
                            className={cn(
                                "absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent",
                                isHovered
                                    ? 'border-t-[6px] border-t-[#134e4a]'
                                    : 'border-t-[6px] border-t-white'
                            )}
                        />
                        {/* New listing indicator dot */}
                        {isNew && !isHovered && (
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full border border-white" />
                        )}
                    </div>
                </div>
            </Tooltip>
        </Marker>
    );
};

export function ApartmentSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);
    const [mapHoveredPropertyId, setMapHoveredPropertyId] = useState<string | null>(null);
    const [selectedProperty, setSelectedProperty] = useState<Property | Stay | BuyProperty | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState<FilterState>({
        priceRange: null,
        beds: null,
        petsAllowed: null,
        amenities: null
    });
    const propertyRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const adaptBuyToRent = (buy: BuyProperty): Property => ({
        ...buy,
        price: `$${(buy.price / 1000).toLocaleString()}k`,
        priceMin: buy.price,
        priceMax: buy.price,
        beds: `${buy.beds} Beds`,
        bedsMin: buy.beds,
        baths: `${buy.baths} Baths`,
        sqft: `${buy.sqft} sqft`,
        tags: [buy.status, buy.type, `${buy.yearBuilt}`],
        availability: buy.status === 'Active' ? 'Available Now' : 'Pending',
        petsAllowed: true,
        amenities: [],
        unitsAvailable: 1
    } as unknown as Property);

    const [searchMode, setSearchMode] = useState<SearchMode>('rent');

    // Combined hover state from either list or map
    const activeHoveredId = hoveredPropertyId || mapHoveredPropertyId;

    // Simulate initial loading and when mode changes
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, [searchMode]);

    // Handle mode change
    const handleSearchModeChange = (mode: SearchMode) => {
        setSearchMode(mode);
        setFilters({
            priceRange: null,
            beds: null,
            petsAllowed: null,
            amenities: null
        });
        setSelectedProperty(null);
    };

    // Filter properties based on search query, filters, and mode
    const filteredProperties = useMemo(() => {
        let data: (Property | Stay | BuyProperty)[] = [];

        if (searchMode === 'rent') data = MOCK_PROPERTIES;
        else if (searchMode === 'buy') data = MOCK_BUY_PROPERTIES;
        else if (searchMode === 'stays') data = MOCK_STAYS;

        return data.filter(p => {
            // Text search
            // Text search
            if (searchQuery) {
                const lowerQuery = searchQuery.toLowerCase();

                let matchesLocation = false;
                if ('location' in p) {
                    matchesLocation = p.location.toLowerCase().includes(lowerQuery);
                } else if ('address' in p && 'cityStateZip' in p) {
                    matchesLocation = p.address.toLowerCase().includes(lowerQuery) || p.cityStateZip.toLowerCase().includes(lowerQuery);
                }

                // Stays have title
                const matchesTitle = 'title' in p ? p.title.toLowerCase().includes(lowerQuery) : false;

                // Properties have price string
                const matchesPrice = 'price' in p && typeof p.price === 'string' ? p.price.toLowerCase().includes(lowerQuery) : false;

                if (!matchesLocation && !matchesTitle && !matchesPrice) return false;
            }

            // Price filter
            if (filters.priceRange) {
                const [min, max] = filters.priceRange;
                if ('priceMin' in p) { // Property
                    if (p.priceMin > max || p.priceMax < min) return false;
                } else if ('pricePerNight' in p) { // Stay
                    if (p.pricePerNight < min || p.pricePerNight > max) return false;
                } else if ('price' in p && typeof p.price === 'number') { // BuyProperty
                    if (p.price < min || p.price > max) return false;
                }
            }

            // Guests filter (Stays)
            if (filters.minGuests) {
                if ('guests' in p && p.guests < filters.minGuests) return false;
            }

            // Property Type filter (Buy)
            if (filters.propertyType && filters.propertyType.length > 0) {
                if ('type' in p && filters.propertyType.includes(p.type)) {
                    // Match
                } else if ('type' in p && !filters.propertyType.includes(p.type)) {
                    return false;
                }
                // If type not in p, ignore or handle strict?
                // BuyProperty has type. Stay has type. Property has tags?
                if ('type' in p && !filters.propertyType.includes(p.type)) return false;
            }

            // Dates filter logic (Placeholder)
            if (filters.dates && filters.dates.start && filters.dates.end) {
                // Determine availability...
            }

            // Beds filter
            if (filters.beds !== null) {
                // For stays we treat beds filter as guests or beds? Let's use beds for now as it's common
                if ('beds' in p) {
                    // For Rent/Buy: bedsMin/beds number check handled differently?
                    // Property has beds string and bedsMin number. Stay has beds number. Buy has beds number.
                    const bedsVal = 'bedsMin' in p ? p.bedsMin : (typeof p.beds === 'number' ? p.beds : 0);
                    if (bedsVal < filters.beds) return false;
                }
            }

            // Pets filter
            if (filters.petsAllowed === true) {
                // Property has petsAllowed boolean. Stay doesn't explicitly have it in type but amenities might?
                // MOCK_STAYS has amenities array.
                if ('petsAllowed' in p) {
                    if (!p.petsAllowed) return false;
                } else if ('amenities' in p) {
                    if (!p.amenities.some(a => a.toLowerCase().includes('pet'))) return false;
                }
            }

            // Amenities filter
            if (filters.amenities && filters.amenities.length > 0) {
                const propertyAmenities = (p as any).amenities || (p as any).tags || [];
                const hasAllAmenities = filters.amenities.every(amenity =>
                    propertyAmenities.some((pa: string) => pa.toLowerCase().includes(amenity.toLowerCase()))
                );
                if (!hasAllAmenities) return false;
            }

            return true;
        });
    }, [searchQuery, filters, searchMode]);

    // Auto-scroll to card when map marker is hovered
    const scrollToCard = useCallback((propertyId: string) => {
        const element = propertyRefs.current[propertyId];
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, []);

    const handleClearFilters = useCallback(() => {
        setSearchQuery('');
        setFilters({
            priceRange: null,
            beds: null,
            petsAllowed: null,
            amenities: null
        });
    }, []);

    const seattleCenter = { lat: 47.6062, lng: -122.3321 };

    return (
        <div className="flex flex-col h-screen bg-white font-sans text-gray-900">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
        .font-sans { font-family: 'Manrope', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        /* Override Leaflet Tooltip styles */
        .leaflet-tooltip { 
            background: transparent !important; 
            border: none !important; 
            box-shadow: none !important; 
            padding: 0 !important;
        }
      `}</style>

            <Header
                onSearch={setSearchQuery}
                filters={filters}
                onFilterChange={setFilters}
                searchMode={searchMode}
                onSearchModeChange={handleSearchModeChange}
            />

            <main className="flex-1 flex overflow-hidden relative">
                {/* List View - Left Panel */}
                <div className="w-full lg:w-[55%] xl:w-[60%] h-full overflow-y-auto bg-gray-50 border-r border-gray-200">
                    {/* Results Header */}
                    <div className="p-4 md:p-6 flex justify-between items-end mb-2">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-1">
                                {searchMode === 'rent' && 'Apartments for Rent'}
                                {searchMode === 'buy' && 'Homes for Sale'}
                                {searchMode === 'stays' && 'Vacation Stays'}
                            </h1>
                            <p className="text-gray-500 text-sm">
                                {isLoading ? 'Loading...' : `${filteredProperties.length} Rentals Available`} • Updated Today
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Sort by:</span>
                            <select className="text-sm font-bold text-[#134e4a] bg-transparent border-none focus:ring-0 cursor-pointer">
                                <option>Best Match</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Newest</option>
                            </select>
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-6 pb-10">
                        {isLoading ? (
                            <>
                                <PropertyCardSkeleton />
                                <PropertyCardSkeleton />
                                <PropertyCardSkeleton />
                                <PropertyCardSkeleton />
                            </>
                        ) : (
                            <>
                                {filteredProperties.map((item) => (
                                    <div
                                        key={item.id}
                                        ref={(el) => propertyRefs.current[item.id] = el}
                                        className={cn(
                                            "transition-all duration-200 rounded-xl",
                                            mapHoveredPropertyId === item.id && "ring-2 ring-[#134e4a] bg-[#134e4a]/5"
                                        )}
                                    >
                                        {searchMode === 'stays' ? (
                                            <StayCard
                                                stay={item as Stay}
                                                onMouseEnter={() => setHoveredPropertyId(item.id)}
                                                onMouseLeave={() => setHoveredPropertyId(null)}
                                                onClick={() => setSelectedProperty(item)}
                                            />
                                        ) : (
                                            <PropertyCard
                                                property={searchMode === 'buy' ? adaptBuyToRent(item as BuyProperty) : item as Property}
                                                onMouseEnter={() => setHoveredPropertyId(item.id)}
                                                onMouseLeave={() => setHoveredPropertyId(null)}
                                                onClick={() => setSelectedProperty(item)}
                                            />
                                        )}
                                    </div>
                                ))}

                                {filteredProperties.length === 0 && (
                                    <div className="col-span-full flex flex-col items-center justify-center py-16 px-4 text-center">
                                        <div className="w-20 h-20 bg-[#f0fdf4] rounded-full flex items-center justify-center mb-6 shadow-sm">
                                            <SearchX className="w-10 h-10 text-[#134e4a]" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">No properties found</h3>
                                        <p className="text-gray-500 max-w-sm mx-auto mb-8">
                                            We couldn't find any properties matching your search. Try adjusting your filters or area.
                                        </p>
                                        <button
                                            onClick={handleClearFilters}
                                            className="px-6 py-2.5 bg-[#134e4a] text-white font-semibold rounded-lg hover:bg-[#11403d] transition-all shadow-sm hover:shadow-md active:transform active:scale-95"
                                        >
                                            Clear all filters
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>


                    {!isLoading && filteredProperties.length > 0 && (
                        <div className="p-6 flex justify-center border-t border-gray-200 bg-white">
                            <div className="flex items-center gap-2">
                                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>
                                    <ChevronDown className="w-5 h-5 rotate-90" />
                                </button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#134e4a] text-white font-bold">1</button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium">2</button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium">3</button>
                                <span className="text-gray-400 px-2">...</span>
                                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50">
                                    <ChevronDown className="w-5 h-5 -rotate-90" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Footer Simplified */}
                    <div className="bg-gray-100 p-8 text-center">
                        <p className="text-gray-500 text-sm">© 2024 ResidentFinder. All rights reserved.</p>
                    </div>
                </div>

                {/* Map View - Right Panel */}
                <div className="hidden lg:block w-[45%] xl:w-[40%] h-full relative z-0">
                    {!isLoading && (
                        <MapContainer
                            key="leaflet-map-container"
                            center={[seattleCenter.lat, seattleCenter.lng]}
                            zoom={13}
                            scrollWheelZoom={true}
                            className="w-full h-full"
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {filteredProperties.map((p) => {
                                let priceDisplay = '';
                                if ('price' in p && typeof p.price === 'string') priceDisplay = p.price.split(' ')[0].replace('+', ''); // Property
                                else if ('pricePerNight' in p) priceDisplay = `$${p.pricePerNight}`; // Stay
                                else if ('price' in p && typeof p.price === 'number') priceDisplay = `$${(p.price / 1000).toFixed(0)}k`; // Buy

                                return (
                                    <CustomMarker
                                        key={p.id}
                                        property={p}
                                        priceDisplay={priceDisplay}
                                        isNew={(p as any).isNew}
                                        isHovered={activeHoveredId === p.id}
                                        onClick={() => setSelectedProperty(p)}
                                        onHoverStart={() => {
                                            setMapHoveredPropertyId(p.id);
                                            scrollToCard(p.id);
                                        }}
                                        onHoverEnd={() => setMapHoveredPropertyId(null)}
                                    />
                                );
                            })}
                        </MapContainer>
                    )}

                    {/* Map Overlays (Draw Area, etc) */}
                    <div className="absolute top-4 left-4 z-[400]">
                        <button className="bg-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                            <CheckCircle2 className="w-4 h-4 text-[#134e4a]" />
                            Draw Area
                        </button>
                    </div>
                </div>
            </main>

            {/* Details Modal */}
            {selectedProperty && (
                <>
                    {searchMode === 'rent' && (
                        <PropertyDetailsModal
                            property={selectedProperty as Property}
                            onClose={() => setSelectedProperty(null)}
                        />
                    )}
                    {searchMode === 'stays' && (
                        <StayDetailsModal
                            stay={selectedProperty as Stay}
                            onClose={() => setSelectedProperty(null)}
                        />
                    )}
                    {searchMode === 'buy' && (
                        <BuyDetailsModal
                            property={selectedProperty as BuyProperty}
                            onClose={() => setSelectedProperty(null)}
                        />
                    )}
                </>
            )}
        </div>
    );
}
