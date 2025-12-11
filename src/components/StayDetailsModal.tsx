import React, { useState } from 'react';
import { X, Users, Bed, Bath, User, Star, Share2, Heart, Calendar, Check, Flag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stay } from '../types';
import { cn } from '../lib/utils';

interface StayDetailsModalProps {
    stay: Stay | null;
    onClose: () => void;
}

export const StayDetailsModal = ({ stay, onClose }: StayDetailsModalProps) => {
    if (!stay) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
                >
                    {/* Image Grid (Desktop) / Carousel (Mobile) */}
                    <div className="w-full md:w-1/2 bg-gray-100 relative h-64 md:h-auto overflow-hidden group">
                        <img
                            src={stay.image}
                            alt={stay.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                            <button
                                onClick={onClose}
                                className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white md:hidden"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="flex gap-2 ml-auto">
                                <button className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors">
                                    <Share2 className="w-4 h-4 text-gray-700" />
                                </button>
                                <button className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors">
                                    <Heart className="w-4 h-4 text-gray-700" />
                                </button>
                            </div>
                        </div>

                        {/* Image Counter Badge */}
                        <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs font-bold px-3 py-1.5 rounded-lg backdrop-blur-sm">
                            1 / {stay.images.length} Photos
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-1/2 flex flex-col h-full overflow-hidden">
                        {/* Header with Close Button */}
                        <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-start sticky top-0 bg-white z-10">
                            <div className="pr-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{stay.title}</h2>
                                <p className="text-gray-500 font-medium text-sm flex items-center gap-1">
                                    <span>{stay.location}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1 text-gray-900 font-bold">
                                        <Star className="w-3.5 h-3.5 fill-current" /> {stay.rating}
                                    </span>
                                    <span className="text-gray-400">({stay.reviewCount} reviews)</span>
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block flex-shrink-0"
                            >
                                <X className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-8">
                            {/* Host Info */}
                            <div className="flex items-center justify-between py-6 border-b border-gray-100">
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">Hosted by {stay.host.name}</h3>
                                    <p className="text-gray-500 text-sm">Joined May 2021</p>
                                </div>
                                <div className="relative">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                                        <img src={`https://ui-avatars.com/api/?name=${stay.host.name}&background=random`} alt={stay.host.name} />
                                    </div>
                                    {stay.host.isSuperhost && (
                                        <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full shadow-sm">
                                            <div className="bg-red-500 text-white p-1 rounded-full">
                                                <Check className="w-2 h-2 stroke-[4px]" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {stay.host.isSuperhost && (
                                <div className="py-4 border-b border-gray-100 flex items-start gap-4">
                                    <User className="w-6 h-6 text-gray-400 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">{stay.host.name} is a Superhost</h4>
                                        <p className="text-gray-500 text-sm mt-0.5">Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
                                    </div>
                                </div>
                            )}

                            {/* Bed/Guests Stats */}
                            <div className="py-6 border-b border-gray-100 grid grid-cols-3 gap-4">
                                <div className="p-4 bg-gray-50 rounded-xl flex flex-col items-center justify-center text-center">
                                    <Users className="w-6 h-6 text-[#134e4a] mb-2" />
                                    <span className="font-bold text-gray-900">{stay.guests} Guests</span>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl flex flex-col items-center justify-center text-center">
                                    <Bed className="w-6 h-6 text-[#134e4a] mb-2" />
                                    <span className="font-bold text-gray-900">{stay.beds} Beds</span>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl flex flex-col items-center justify-center text-center">
                                    <Bath className="w-6 h-6 text-[#134e4a] mb-2" />
                                    <span className="font-bold text-gray-900">{stay.baths} Baths</span>
                                </div>
                            </div>

                            {/* Amenities */}
                            <div className="py-6">
                                <h3 className="font-bold text-gray-900 text-lg mb-4">What this place offers</h3>
                                <div className="grid grid-cols-2 gap-y-3 gap-x-8">
                                    {stay.amenities.map((amenity, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-gray-600">
                                            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                {getAmenityIcon(amenity)}
                                            </div>
                                            <span className="text-sm">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer Booking Widget */}
                        <div className="p-6 border-t border-gray-100 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xl font-bold text-gray-900">
                                        ${stay.pricePerNight} <span className="text-sm font-normal text-gray-500">/ night</span>
                                    </p>
                                    <button className="text-sm font-semibold text-gray-500 underline mt-0.5">
                                        Dec 15 - 20
                                    </button>
                                </div>
                                <button className="px-8 py-3 bg-[#134e4a] text-white font-bold rounded-xl hover:bg-[#0f3f3c] transition-colors shadow-lg shadow-[#134e4a]/20">
                                    Reserve
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

// Helper for amenities icons (simplified)
const getAmenityIcon = (name: string) => {
    // You could map specific icons here based on name substring
    // e.g. if (name.includes('WiFi')) return <Wifi />
    return <Check className="w-4 h-4 text-gray-500" />;
}
