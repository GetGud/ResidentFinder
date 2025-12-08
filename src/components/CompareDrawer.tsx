import { X, ChevronUp, ChevronDown, BedDouble, Bath, Square, Star, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCompare } from '../hooks/useCompare';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

export function CompareDrawer() {
    const { compareList, removeFromCompare, clearCompare, isDrawerOpen, setDrawerOpen } = useCompare();

    if (compareList.length === 0) return null;

    return (
        <>
            {/* Collapsed Tab */}
            <AnimatePresence>
                {!isDrawerOpen && compareList.length > 0 && (
                    <motion.button
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        onClick={() => setDrawerOpen(true)}
                        className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 bg-[#134e4a] text-white px-6 py-3 rounded-t-xl shadow-lg flex items-center gap-2 font-semibold"
                    >
                        <ChevronUp className="w-4 h-4" />
                        Compare ({compareList.length}/3)
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Expanded Drawer */}
            <AnimatePresence>
                {isDrawerOpen && (
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl rounded-t-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <h3 className="font-bold text-lg text-gray-900">Compare Properties</h3>
                                <span className="text-sm text-gray-500">({compareList.length}/3 selected)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={clearCompare}
                                    className="text-sm text-red-500 hover:text-red-600 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                                >
                                    Clear All
                                </button>
                                <button
                                    onClick={() => setDrawerOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <ChevronDown className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                        </div>

                        {/* Comparison Grid */}
                        <div className="p-6 overflow-x-auto">
                            <div className="flex gap-6 min-w-max">
                                {compareList.map((property) => (
                                    <div
                                        key={property.id}
                                        className="w-72 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden flex-shrink-0"
                                    >
                                        {/* Property Image */}
                                        <div className="relative h-36 overflow-hidden">
                                            <img
                                                src={property.image}
                                                alt={property.address}
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                onClick={() => removeFromCompare(property.id)}
                                                className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white rounded-full shadow-sm transition-colors"
                                            >
                                                <X className="w-4 h-4 text-gray-600" />
                                            </button>
                                        </div>

                                        {/* Property Details */}
                                        <div className="p-4">
                                            <h4 className="font-bold text-gray-900 truncate">{property.address}</h4>
                                            <p className="text-sm text-gray-500 truncate flex items-center gap-1 mb-3">
                                                <MapPin className="w-3 h-3" />
                                                {property.cityStateZip}
                                            </p>

                                            <div className="text-xl font-bold text-[#134e4a] mb-3">{property.price}</div>

                                            <div className="space-y-2 text-sm">
                                                <div className="flex items-center justify-between">
                                                    <span className="flex items-center gap-1.5 text-gray-600">
                                                        <BedDouble className="w-4 h-4" /> Beds
                                                    </span>
                                                    <span className="font-medium text-gray-900">{property.beds}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="flex items-center gap-1.5 text-gray-600">
                                                        <Bath className="w-4 h-4" /> Baths
                                                    </span>
                                                    <span className="font-medium text-gray-900">{property.baths}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="flex items-center gap-1.5 text-gray-600">
                                                        <Square className="w-4 h-4" /> Size
                                                    </span>
                                                    <span className="font-medium text-gray-900">{property.sqft}</span>
                                                </div>
                                                {property.rating && (
                                                    <div className="flex items-center justify-between">
                                                        <span className="flex items-center gap-1.5 text-gray-600">
                                                            <Star className="w-4 h-4" /> Rating
                                                        </span>
                                                        <span className="font-medium text-gray-900">{property.rating} ★</span>
                                                    </div>
                                                )}
                                            </div>

                                            <Link
                                                to={`/property/${property.id}`}
                                                className="mt-4 block w-full text-center py-2 bg-[#134e4a] text-white text-sm font-semibold rounded-lg hover:bg-[#0f3f3c] transition-colors"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                ))}

                                {/* Empty Slots */}
                                {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                                    <div
                                        key={`empty-${idx}`}
                                        className="w-72 h-80 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center flex-shrink-0"
                                    >
                                        <p className="text-sm text-gray-400 text-center px-4">
                                            Add a property to compare
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
