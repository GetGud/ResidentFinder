import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Maximize, CheckCircle2, ChevronDown } from 'lucide-react';
import { Header, FilterState } from './Header';
import { PropertyCard } from './PropertyCard';
import { MapMarker } from './MapMarker';
import { PropertyDetailsModal } from './PropertyDetailsModal';
import { PropertyCardSkeleton } from './Skeleton';
import { MOCK_PROPERTIES } from '../data/mockData';
import { Property } from '../types';
import { cn } from '../lib/utils';

export function ApartmentSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);
    const [mapHoveredPropertyId, setMapHoveredPropertyId] = useState<string | null>(null);
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState<FilterState>({
        priceRange: null,
        beds: null,
        petsAllowed: null
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

    return (
        <div className="flex flex-col h-screen bg-white font-sans text-gray-900">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
        .font-sans { font-family: 'Manrope', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
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
                            // Loading skeletons
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
                                            mapHoveredPropertyId === property.id && "hover-synced"
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

                    {/* Pagination (Static for now) */}
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

                    {/* Footer Simple */}
                    <div className="bg-gray-100 p-8 text-center">
                        <p className="text-gray-500 text-sm">© 2024 ResidentFinder. All rights reserved.</p>
                        <div className="flex justify-center gap-4 mt-2 text-sm text-gray-400">
                            <a href="#" className="hover:underline">Privacy</a>
                            <a href="#" className="hover:underline">Terms</a>
                            <a href="#" className="hover:underline">Sitemap</a>
                        </div>
                    </div>
                </div>

                {/* Map View - Right Panel */}
                <div className="hidden lg:block w-[45%] xl:w-[40%] h-full relative bg-[#e5e7eb]">
                    {/* Simulated Map Background */}
                    <div className="absolute inset-0 bg-[#cad2d3] overflow-hidden">
                        {/* Map Texture / Grid */}
                        <div className="absolute inset-0 opacity-40"
                            style={{
                                backgroundImage: 'radial-gradient(#a0aec0 1px, transparent 1px)',
                                backgroundSize: '20px 20px'
                            }}>
                        </div>

                        {/* Decorative Map Elements (Roads/Blocks) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" xmlns="http://www.w3.org/2000/svg">
                            <path d="M -100 100 L 800 150" stroke="white" strokeWidth="12" fill="none" />
                            <path d="M 200 -50 L 250 900" stroke="white" strokeWidth="16" fill="none" />
                            <path d="M 500 0 L 400 800" stroke="white" strokeWidth="10" fill="none" />
                            <path d="M 0 400 L 900 350" stroke="white" strokeWidth="14" fill="none" />

                            <rect x="260" y="160" width="100" height="80" fill="#d1d5db" />
                            <rect x="380" y="200" width="60" height="120" fill="#d1d5db" />
                            <circle cx="600" cy="500" r="80" fill="#d4d4d8" />
                        </svg>

                        {/* Water Feature */}
                        <div className="absolute -left-20 top-1/3 w-64 h-64 bg-[#bfdbfe] rounded-full blur-3xl opacity-60 pointer-events-none"></div>
                    </div>

                    {/* Map Controls */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                        <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-600 hover:text-[#134e4a] transition-colors">
                            <Maximize className="w-5 h-5" />
                        </button>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 border-b border-gray-100">
                                <span className="text-xl font-bold">+</span>
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50">
                                <span className="text-xl font-bold">-</span>
                            </button>
                        </div>
                    </div>

                    {/* Draw Tool */}
                    <div className="absolute top-4 left-4 z-20">
                        <button className="bg-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                            <CheckCircle2 className="w-4 h-4 text-[#134e4a]" />
                            Draw Area
                        </button>
                    </div>

                    {/* Markers */}
                    {!isLoading && filteredProperties.map((p) => (
                        <MapMarker
                            key={p.id}
                            x={p.coordinates.x}
                            y={p.coordinates.y}
                            price={p.price}
                            isHovered={activeHoveredId === p.id}
                            isNew={p.isNew}
                            imageUrl={p.images[0]}
                            address={p.address}
                            onClick={() => setSelectedProperty(p)}
                            onHoverStart={() => {
                                setMapHoveredPropertyId(p.id);
                                scrollToCard(p.id);
                            }}
                            onHoverEnd={() => setMapHoveredPropertyId(null)}
                        />
                    ))}
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

