import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Property } from '../types';
import { cn } from '../lib/utils';

interface RecentlyViewedCarouselProps {
    properties: Property[];
    onClearHistory: () => void;
    className?: string;
}

export const RecentlyViewedCarousel = ({
    properties,
    onClearHistory,
    className
}: RecentlyViewedCarouselProps) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (properties.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("bg-white py-8 border-b border-gray-100", className)}
        >
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <h2 className="text-lg font-bold text-gray-900">Recently Viewed</h2>
                        <span className="text-sm text-gray-400">({properties.length})</span>
                    </div>
                    <button
                        onClick={onClearHistory}
                        className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1 btn-press"
                    >
                        <X className="w-4 h-4" />
                        Clear
                    </button>
                </div>

                {/* Carousel */}
                <div className="relative group">
                    {/* Left Arrow */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-[#134e4a] opacity-0 group-hover:opacity-100 transition-opacity btn-press"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Scrollable container */}
                    <div
                        ref={scrollRef}
                        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2"
                        style={{ scrollSnapType: 'x mandatory' }}
                    >
                        {properties.map((property) => (
                            <Link
                                key={property.id}
                                to={`/property/${property.id}`}
                                className="flex-shrink-0 w-64 bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group/card"
                                style={{ scrollSnapAlign: 'start' }}
                            >
                                {/* Image */}
                                <div className="relative h-36 overflow-hidden">
                                    <img
                                        src={property.images[0]}
                                        alt={property.address}
                                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                                    />
                                    {property.isVerified && (
                                        <span className="absolute top-2 left-2 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                                            VERIFIED
                                        </span>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-3">
                                    <p className="text-lg font-bold text-[#134e4a]">{property.price}</p>
                                    <p className="text-sm text-gray-900 font-medium truncate">{property.address}</p>
                                    <p className="text-xs text-gray-500 truncate">{property.beds} • {property.baths}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={() => scroll('right')}
                        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-[#134e4a] opacity-0 group-hover:opacity-100 transition-opacity btn-press"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default RecentlyViewedCarousel;
