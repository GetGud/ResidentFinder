import React, { useState } from 'react';
import { Heart, ChevronDown, Star, CheckCircle2, Phone, Calendar, BadgeCheck, GitCompare, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Property } from '../types';
import { cn } from '../lib/utils';
import { useFavorites } from '../hooks/useFavorites';
import { useCompare } from '../hooks/useCompare';
import { ShareModal } from './ShareModal';
import { TourSchedulerModal } from './TourSchedulerModal';

interface PropertyCardProps {
    property: Property;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick?: () => void;
}

export const PropertyCard = ({ property, onMouseEnter, onMouseLeave, onClick }: PropertyCardProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showTourModal, setShowTourModal] = useState(false);
    const { isFavorite, toggleFavorite } = useFavorites();
    const { addToCompare, removeFromCompare, isInCompare } = useCompare();
    const isFav = isFavorite(property.id);
    const inCompare = isInCompare(property.id);

    const nextImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
    };

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(property.id);
    };

    return (
        <motion.div
            className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer"
            onMouseEnter={() => {
                setIsHovered(true);
                onMouseEnter?.();
            }}
            onMouseLeave={() => {
                setIsHovered(false);
                onMouseLeave?.();
            }}
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Image Carousel */}
            <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                <img
                    src={property.images[currentImageIndex]}
                    alt={property.address}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 items-start">
                    {property.isVerified && (
                        <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1">
                            <BadgeCheck className="w-3 h-3" />
                            VERIFIED
                        </span>
                    )}
                    {property.isSpecial && (
                        <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                            SPECIAL OFFER
                        </span>
                    )}
                    {property.isNew && (
                        <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                            NEW LISTING
                        </span>
                    )}
                </div>

                <button
                    onClick={handleFavoriteClick}
                    className={cn(
                        "absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all",
                        isFav
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-black/20 hover:bg-black/40 text-white"
                    )}
                >
                    <Heart className={cn("w-4 h-4 transition-all", isFav && "fill-current scale-110")} />
                </button>

                {/* Carousel Controls */}
                <div className={cn("absolute inset-0 flex items-center justify-between px-2 opacity-0 transition-opacity duration-200", isHovered && "opacity-100")}>
                    <button onClick={prevImage} className="p-1.5 rounded-full bg-white/90 hover:bg-white shadow-md text-gray-800">
                        <ChevronDown className="w-4 h-4 rotate-90" />
                    </button>
                    <button onClick={nextImage} className="p-1.5 rounded-full bg-white/90 hover:bg-white shadow-md text-gray-800">
                        <ChevronDown className="w-4 h-4 -rotate-90" />
                    </button>
                </div>

                {/* Carousel Indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {property.images.map((_, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                "w-1.5 h-1.5 rounded-full shadow-sm transition-all",
                                idx === currentImageIndex ? "bg-white scale-125" : "bg-white/50"
                            )}
                        />
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-1">
                    <div>
                        <h3 className="text-2xl font-bold text-[#134e4a]">{property.price}</h3>
                        <p className="text-sm text-gray-500 font-medium">{property.beds} • {property.baths}</p>
                    </div>
                    {property.rating && (
                        <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-md">
                            <Star className="w-3 h-3 text-[#134e4a] fill-[#134e4a]" />
                            <span className="text-xs font-bold text-[#134e4a]">{property.rating}</span>
                        </div>
                    )}
                </div>

                <h4 className="font-bold text-gray-900 text-lg truncate">{property.address}</h4>
                <p className="text-gray-500 text-sm mb-3 truncate">{property.cityStateZip}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {property.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[10px] font-semibold uppercase tracking-wider text-gray-600 bg-gray-100 px-2 py-1 rounded">
                            {tag}
                        </span>
                    ))}
                    {property.tags.length > 3 && (
                        <span className="text-[10px] font-semibold text-gray-400 px-1 py-1">+{property.tags.length - 3}</span>
                    )}
                </div>

                <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-green-700">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span className="text-xs font-bold">{property.availability}</span>
                    </div>

                    <div className="flex gap-1.5">
                        {/* Compare Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (inCompare) {
                                    removeFromCompare(property.id);
                                } else {
                                    addToCompare(property);
                                }
                            }}
                            className={cn(
                                "p-2 rounded-full transition-colors btn-press",
                                inCompare
                                    ? "bg-[#134e4a] text-white"
                                    : "text-gray-400 hover:text-[#134e4a] hover:bg-green-50"
                            )}
                            title={inCompare ? "Remove from compare" : "Add to compare"}
                        >
                            <GitCompare className="w-4 h-4" />
                        </button>

                        {/* Share Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowShareModal(true);
                            }}
                            className="p-2 text-gray-400 hover:text-[#134e4a] hover:bg-green-50 rounded-full transition-colors btn-press"
                            title="Share property"
                        >
                            <Share2 className="w-4 h-4" />
                        </button>

                        {/* Tour Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowTourModal(true);
                            }}
                            className="px-3 py-1.5 bg-white border border-[#134e4a] text-[#134e4a] text-xs font-semibold rounded-md hover:bg-[#134e4a]/5 transition-colors flex items-center gap-1 btn-press"
                        >
                            <Calendar className="w-3.5 h-3.5" />
                            Tour
                        </button>

                        {/* Details Button */}
                        <Link
                            to={`/property/${property.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="px-3 py-1.5 bg-[#134e4a] text-white text-xs font-semibold rounded-md hover:bg-[#0f3f3c] transition-colors shadow-sm btn-press"
                        >
                            Details
                        </Link>
                    </div>
                </div>
            </div>

            {/* Share Modal */}
            <ShareModal
                property={property}
                isOpen={showShareModal}
                onClose={() => setShowShareModal(false)}
            />

            {/* Tour Scheduler Modal */}
            <TourSchedulerModal
                isOpen={showTourModal}
                onClose={() => setShowTourModal(false)}
                propertyName={property.address}
            />
        </motion.div>
    );
};

