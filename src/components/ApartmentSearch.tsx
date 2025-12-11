import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Maximize, CheckCircle2, ChevronDown } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMap, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { Header, FilterState } from './Header';
import { PropertyCard } from './PropertyCard';
import { PropertyDetailsModal } from './PropertyDetailsModal';
import { PropertyCardSkeleton } from './Skeleton';
import { MOCK_PROPERTIES } from '../data/mockData';
import { Property } from '../types';
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
    isHovered,
    onClick,
    onHoverStart,
    onHoverEnd
}: {
    property: Property;
    isHovered: boolean;
    onClick: () => void;
    onHoverStart: () => void;
    onHoverEnd: () => void;
}) => {
    const map = useMap();
    const priceDisplay = property.price.split(' ')[0].replace('+', '');

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
                        {property.isNew && !isHovered && (
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
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState<FilterState>({
        priceRange: null,
        beds: null,
        petsAllowed: null,
        amenities: null
    });
    const propertyRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    // Combined hover state from either list or map
    const activeHoveredId = hoveredPropertyId || mapHoveredPropertyId;

    // Simulate initial loading
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    // Filter properties based on search query and filters
    const filteredProperties = useMemo(() => {
        return MOCK_PROPERTIES.filter(p => {
            // Text search
            if (searchQuery) {
                const lowerQuery = searchQuery.toLowerCase();
                const matchesText =
                    p.address.toLowerCase().includes(lowerQuery) ||
                    p.cityStateZip.toLowerCase().includes(lowerQuery) ||
                    p.price.toLowerCase().includes(lowerQuery);
                if (!matchesText) return false;
            }

            // Price filter
            if (filters.priceRange) {
                const [min, max] = filters.priceRange;
                if (p.priceMin > max || p.priceMax < min) return false;
            }

            // Beds filter
            if (filters.beds !== null) {
                if (p.bedsMin < filters.beds) return false;
            }

            // Pets filter
            if (filters.petsAllowed === true) {
                if (!p.petsAllowed) return false;
            }

            // Amenities filter
            if (filters.amenities && filters.amenities.length > 0) {
                const propertyAmenities = p.amenities || p.tags || [];
                const hasAllAmenities = filters.amenities.every(amenity =>
                    propertyAmenities.some(pa => pa.toLowerCase().includes(amenity.toLowerCase()))
                );
                if (!hasAllAmenities) return false;
            }

            return true;
        });
    }, [searchQuery, filters]);

    // Auto-scroll to card when map marker is hovered
    const scrollToCard = useCallback((propertyId: string) => {
        const element = propertyRefs.current[propertyId];
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
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
            />

            <main className="flex-1 flex overflow-hidden relative">
                {/* List View - Left Panel */}
                <div className="w-full lg:w-[55%] xl:w-[60%] h-full overflow-y-auto bg-gray-50 border-r border-gray-200">
                    {/* Results Header */}
                    <div className="p-4 md:p-6 flex justify-between items-end mb-2">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-1">Apartments for Rent</h1>
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
                                {filteredProperties.map((property) => (
                                    <div
                                        key={property.id}
                                        ref={(el) => propertyRefs.current[property.id] = el}
                                        className={cn(
                                            "transition-all duration-200 rounded-xl",
                                            mapHoveredPropertyId === property.id && "ring-2 ring-[#134e4a] bg-[#134e4a]/5"
                                        )}
                                    >
                                        <PropertyCard
                                            property={property}
                                            onMouseEnter={() => setHoveredPropertyId(property.id)}
                                            onMouseLeave={() => setHoveredPropertyId(null)}
                                            onClick={() => setSelectedProperty(property)}
                                        />
                                    </div>
                                ))}

                                {filteredProperties.length === 0 && (
                                    <div className="col-span-full text-center py-20">
                                        <div className="text-gray-400 text-6xl mb-4">🏠</div>
                                        <h3 className="text-xl font-bold text-gray-700 mb-2">No properties found</h3>
                                        <p className="text-gray-500">Try adjusting your filters or search criteria.</p>
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

                            {filteredProperties.map((p) => (
                                <CustomMarker
                                    key={p.id}
                                    property={p}
                                    isHovered={activeHoveredId === p.id}
                                    onClick={() => setSelectedProperty(p)}
                                    onHoverStart={() => {
                                        setMapHoveredPropertyId(p.id);
                                        scrollToCard(p.id);
                                    }}
                                    onHoverEnd={() => setMapHoveredPropertyId(null)}
                                />
                            ))}
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
            <PropertyDetailsModal
                property={selectedProperty}
                onClose={() => setSelectedProperty(null)}
            />
        </div>
    );
}
