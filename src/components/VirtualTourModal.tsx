import React from 'react';
import { X, Maximize2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VirtualTourModalProps {
    isOpen: boolean;
    onClose: () => void;
    tourUrl: string;
    propertyName: string;
}

export const VirtualTourModal = ({ isOpen, onClose, tourUrl, propertyName }: VirtualTourModalProps) => {
    if (!isOpen) return null;

    const handleOpenExternal = () => {
        window.open(tourUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="relative w-full max-w-6xl h-[80vh] bg-white rounded-xl overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/60 to-transparent p-4 flex justify-between items-start">
                            <div>
                                <h2 className="text-white font-bold text-lg">3D Virtual Tour</h2>
                                <p className="text-white/80 text-sm">{propertyName}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleOpenExternal}
                                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors btn-press"
                                    title="Open in new tab"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors btn-press"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Tour iframe */}
                        <iframe
                            src={tourUrl}
                            title={`Virtual tour of ${propertyName}`}
                            className="w-full h-full border-0"
                            allow="fullscreen; xr-spatial-tracking; accelerometer; gyroscope"
                            allowFullScreen
                        />

                        {/* Fullscreen hint */}
                        <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-2 rounded-lg flex items-center gap-2 pointer-events-none">
                            <Maximize2 className="w-4 h-4" />
                            Press F for fullscreen
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default VirtualTourModal;
