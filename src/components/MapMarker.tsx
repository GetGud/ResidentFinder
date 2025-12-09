import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MapMarkerProps {
    x: number;
    y: number;
    price: string;
    isHovered?: boolean;
    isNew?: boolean;
    imageUrl?: string;
    address?: string;
    onClick?: () => void;
    onHoverStart?: () => void;
    onHoverEnd?: () => void;
}

export const MapMarker = ({
    x,
    y,
    price,
    isHovered,
    isNew,
    imageUrl,
    address,
    onClick,
    onHoverStart,
    onHoverEnd
}: MapMarkerProps) => {
    const [showPreview, setShowPreview] = useState(false);
    const priceDisplay = price.split(' ')[0].replace('+', '');

    const handleMouseEnter = () => {
        setShowPreview(true);
        onHoverStart?.();
    };

    const handleMouseLeave = () => {
        setShowPreview(false);
        onHoverEnd?.();
    };

    return (
        <div
            className={`absolute transform -translate-x-1/2 cursor-pointer z-10 hover:z-50 ${isHovered ? 'z-50' : ''}`}
            style={{ left: `${x}%`, top: `${y}%` }}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Price Bubble */}
            <motion.div
                animate={{
                    scale: isHovered ? 1.15 : 1,
                    y: isHovered ? -4 : 0
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`
                    relative px-3 py-1.5 rounded-full shadow-lg font-bold text-sm
                    ${isHovered
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-[#134e4a] border border-gray-200'
                    }
                    ${isNew ? 'marker-new' : ''}
                `}
            >
                {priceDisplay}
                {/* Arrow */}
                <div
                    className={`
                        absolute left-1/2 -translate-x-1/2 -bottom-1.5
                        w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent 
                        ${isHovered
                            ? 'border-t-[6px] border-t-gray-900'
                            : 'border-t-[6px] border-t-white'
                        }
                    `}
                />
                {/* New listing indicator dot */}
                {isNew && !isHovered && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full border border-white" />
                )}
            </motion.div>

            {/* Hover Preview Popup */}
            <AnimatePresence>
                {showPreview && imageUrl && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-48 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100 pointer-events-none"
                    >
                        <img
                            src={imageUrl}
                            alt={address || 'Property'}
                            className="w-full h-24 object-cover"
                        />
                        <div className="p-2">
                            <p className="text-sm font-bold text-gray-900 truncate">{priceDisplay}/mo</p>
                            {address && (
                                <p className="text-xs text-gray-500 truncate">{address}</p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
