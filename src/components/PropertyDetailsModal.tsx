import { X, BedDouble, Bath, Maximize, MapPin, Star, CheckCircle2, Phone, Mail, Share2, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Property } from '../types';

interface PropertyDetailsModalProps {
    property: Property | null;
    onClose: () => void;
}

export const PropertyDetailsModal = ({ property, onClose }: PropertyDetailsModalProps) => {
    if (!property) return null;

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
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
                >
                    {/* Image Section */}
                    <div className="w-full md:w-1/2 bg-gray-100 relative h-64 md:h-auto">
                        <img
                            src={property.image}
                            alt={property.address}
                            className="w-full h-full object-cover"
                        />
                        <button
                            onClick={onClose}
                            className="absolute top-4 left-4 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white md:hidden"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-3xl font-bold text-[#134e4a] mb-1">{property.price}</h2>
                                <p className="text-gray-500 font-medium">{property.address}</p>
                                <p className="text-gray-400 text-sm">{property.cityStateZip}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block"
                            >
                                <X className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="p-3 bg-gray-50 rounded-xl text-center">
                                <BedDouble className="w-5 h-5 text-[#134e4a] mx-auto mb-1" />
                                <span className="block text-sm font-bold text-gray-700">{property.beds}</span>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-xl text-center">
                                <Bath className="w-5 h-5 text-[#134e4a] mx-auto mb-1" />
                                <span className="block text-sm font-bold text-gray-700">{property.baths}</span>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-xl text-center">
                                <Maximize className="w-5 h-5 text-[#134e4a] mx-auto mb-1" />
                                <span className="block text-sm font-bold text-gray-700">{property.sqft}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">About this home</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Experience luxury living at {property.address}. This stunning residence features modern finishes,
                                spacious layouts, and breathtaking views. Enjoy premium amenities including {property.tags.join(', ')}.
                                Perfectly situated in {property.cityStateZip.split(',')[0]}, you're just steps away from the city's best dining and entertainment.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 mt-auto">
                            <button className="flex-1 bg-[#134e4a] text-white py-3 rounded-xl font-bold hover:bg-[#0f3f3c] transition-colors shadow-lg shadow-[#134e4a]/20">
                                Check Availability
                            </button>
                            <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600">
                                <Heart className="w-6 h-6" />
                            </button>
                            <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600">
                                <Share2 className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
