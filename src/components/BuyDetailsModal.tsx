import React, { useState } from 'react';
import { X, Maximize, BedDouble, Bath, Calculator, Calendar, MapPin, Share2, Heart, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BuyProperty } from '../types';
import { cn } from '../lib/utils';

interface BuyDetailsModalProps {
    property: BuyProperty | null;
    onClose: () => void;
}

export const BuyDetailsModal = ({ property, onClose }: BuyDetailsModalProps) => {
    if (!property) return null;

    const formattedPrice = `$${(property.price / 1000).toLocaleString()}k`;
    const estimatedMortgage = Math.floor((property.price * 0.005) + 500); // Rough estimate

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
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
                >
                    {/* Image Section */}
                    <div className="w-full md:w-1/2 bg-gray-100 relative h-64 md:h-auto group">
                        <img
                            src={property.image}
                            alt={property.address}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 right-4 flex justify-between">
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

                        <div className="absolute bottom-4 left-4 flex gap-2">
                            <span className="px-3 py-1 bg-white/90 rounded-lg text-xs font-bold text-gray-900 shadow-sm backdrop-blur-sm">
                                {property.status}
                            </span>
                            <span className="px-3 py-1 bg-[#134e4a]/90 text-white rounded-lg text-xs font-bold shadow-sm backdrop-blur-sm">
                                Built {property.yearBuilt}
                            </span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-1/2 flex flex-col h-full overflow-hidden">
                        <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-start">
                            <div>
                                <h2 className="text-3xl font-bold text-[#134e4a] mb-1">{formattedPrice}</h2>
                                <p className="text-gray-500 font-medium">{property.address}</p>
                                <p className="text-gray-400 text-sm flex items-center gap-1 mt-1">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {property.cityStateZip}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block"
                            >
                                <X className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 md:p-8">
                            {/* Key Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-3 bg-gray-50 rounded-xl flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#134e4a] shadow-sm">
                                        <BedDouble className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-gray-900">{property.beds} Beds</span>
                                        <span className="text-xs text-gray-500">Bedroom</span>
                                    </div>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-xl flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#134e4a] shadow-sm">
                                        <Bath className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-gray-900">{property.baths} Baths</span>
                                        <span className="text-xs text-gray-500">Bathroom</span>
                                    </div>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-xl flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#134e4a] shadow-sm">
                                        <Maximize className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-gray-900">{property.sqft}</span>
                                        <span className="text-xs text-gray-500">Square Feet</span>
                                    </div>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-xl flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#134e4a] shadow-sm">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-gray-900">{property.yearBuilt}</span>
                                        <span className="text-xs text-gray-500">Year Built</span>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Overview</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    This beautiful {property.type.toLowerCase()} located at {property.address} is a must-see.
                                    Built in {property.yearBuilt}, it features spacious living areas and modern amenities.
                                    The property sits on a generous lot and offers excellent potential for future value appreciation.
                                </p>
                            </div>

                            {/* Mortgage Calculator Teaser */}
                            <div className="bg-[#f0fdf4] rounded-xl p-4 border border-[#134e4a]/10 mb-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#134e4a] flex items-center justify-center flex-shrink-0 text-white">
                                        <Calculator className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#134e4a] text-sm">Estimated Monthly Payment</h4>
                                        <p className="text-2xl font-bold text-gray-900 mt-1">${estimatedMortgage.toLocaleString()}<span className="text-sm font-normal text-gray-500">/mo</span></p>
                                        <p className="text-xs text-gray-500 mt-1">Based on 20% down, 30-year fixed rate. Taxes and insurance not included.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="p-6 md:p-8 border-t border-gray-100 bg-white md:sticky bottom-0 z-10 flex gap-3">
                            <button className="flex-1 bg-[#134e4a] text-white py-3 rounded-xl font-bold hover:bg-[#0f3f3c] transition-colors shadow-lg shadow-[#134e4a]/20 flex items-center justify-center gap-2">
                                Contact Agent <ArrowRight className="w-4 h-4" />
                            </button>
                            <button className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                                Schedule Tour
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
