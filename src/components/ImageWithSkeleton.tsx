import React, { useState } from 'react';
import { cn } from '../lib/utils';

interface ImageWithSkeletonProps {
    src: string;
    alt: string;
    className?: string;
    aspectRatio?: string;
    onLoad?: () => void;
}

export const ImageWithSkeleton = ({
    src,
    alt,
    className,
    aspectRatio = 'aspect-[16/10]',
    onLoad
}: ImageWithSkeletonProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
        setIsLoaded(true);
        onLoad?.();
    };

    const handleError = () => {
        setHasError(true);
        setIsLoaded(true);
    };

    return (
        <div className={cn("relative overflow-hidden bg-gray-100", aspectRatio, className)}>
            {/* Skeleton shimmer */}
            {!isLoaded && (
                <div
                    className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]"
                    style={{ animation: 'shimmer 1.5s infinite' }}
                />
            )}

            {/* Error state */}
            {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400 text-sm">Image unavailable</span>
                </div>
            )}

            {/* Actual image */}
            <img
                src={src}
                alt={alt}
                onLoad={handleLoad}
                onError={handleError}
                className={cn(
                    "w-full h-full object-cover transition-opacity duration-300",
                    isLoaded ? "opacity-100" : "opacity-0"
                )}
            />
        </div>
    );
};

export default ImageWithSkeleton;
