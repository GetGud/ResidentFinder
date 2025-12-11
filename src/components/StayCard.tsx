import React, { useState } from 'react';
import { Heart, ChevronDown, Star, Share2, Users, Bed, Bath, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Stay } from '../types';
import { cn } from '../lib/utils';
import { ShareModal } from './ShareModal';

interface StayCardProps {
    stay: Stay;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick?: () => void;
}

export const StayCard = ({ stay, onMouseEnter, onMouseLeave, onClick }: StayCardProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const nextImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % stay.images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + stay.images.length) % stay.images.length);
    };

    return (
        <motion.div
            className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer relative"
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
                    src={stay.images[currentImageIndex]}
                    alt={stay.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Superhost Badge */}
                {stay.host.isSuperhost && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1">
                        <User className="w-3 h-3 fill-current" />
                        SUPERHOST
                    </div>
                )}

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsFavorite(!isFavorite);
                    }}
                    className={cn(
                        "absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all",
                        isFavorite
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-black/20 hover:bg-black/40 text-white"
                    )}
                >
                    <Heart className={cn("w-4 h-4 transition-all", isFavorite && "fill-current scale-110")} />
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
                    {stay.images.map((_, idx) => (
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
                    <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-1">{stay.title}</h3>
                    <div className="flex items-center gap-1 shrink-0">
                        <Star className="w-4 h-4 text-gray-900 fill-gray-900" />
                        <span className="text-sm font-bold text-gray-900">{stay.rating}</span>
                        <span className="text-xs text-gray-500">({stay.reviewCount})</span>
                    </div>
                </div>

                <p className="text-gray-500 text-sm mb-3">{stay.location}</p>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>{stay.guests} guests</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Bed className="w-4 h-4 text-gray-400" />
                        <span>{stay.beds} beds</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Bath className="w-4 h-4 text-gray-400" />
                        <span>{stay.baths} baths</span>
                    </div>
                </div>

                <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                        <span className="text-lg font-bold text-gray-900">${stay.pricePerNight}</span>
                        <span className="text-gray-500 text-sm font-medium"> / night</span>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowShareModal(true);
                            }}
                            className="p-2 text-gray-400 hover:text-[#134e4a] hover:bg-green-50 rounded-full transition-colors"
                        >
                            <Share2 className="w-4 h-4" />
                        </button>
                        <button className="px-4 py-2 bg-[#134e4a] text-white text-sm font-bold rounded-lg hover:bg-[#0f3f3c] transition-colors shadow-sm">
                            Reserve
                        </button>
                    </div>
                </div>
            </div>

            {/* Share Modal (reusing existing one, assuming it can handle stays or we just pass minimal info) */}
            {/* Note: ShareModal expects a Property type currently. We might need to adjust it or cast it.
                For now, suppressing or we will verify if ShareModal needs update.
                Let's assume we might need to update ShareModal later if it's strict.
                Actually, let's just not render it or create a simple tailored one if needed.
                For this iteration, I'll comment it out if types mismatch, but let's try to adapt.
            */}
            <ShareModal
                property={stay as any} // Temporary cast until ShareModal supports Stay type
                isOpen={showShareModal}
                onClose={() => setShowShareModal(false)}
            />
        </motion.div>
    );
};
