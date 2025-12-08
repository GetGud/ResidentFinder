import React from 'react';
import { cn } from '../lib/utils';

interface SkeletonProps {
    className?: string;
}

// Base skeleton component with shimmer animation
export function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] rounded",
                className
            )}
            style={{
                animation: 'shimmer 1.5s infinite',
            }}
        >
            <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
        </div>
    );
}

// Property card skeleton
export function PropertyCardSkeleton() {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            {/* Image skeleton */}
            <div className="aspect-[16/10] relative">
                <Skeleton className="w-full h-full rounded-none" />
            </div>

            {/* Content skeleton */}
            <div className="p-4 space-y-3">
                {/* Price */}
                <Skeleton className="h-6 w-32" />

                {/* Address */}
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-36" />

                {/* Tags */}
                <div className="flex gap-2 pt-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-14 rounded-full" />
                </div>
            </div>
        </div>
    );
}

// Text content skeleton
export function ContentSkeleton({ lines = 3 }: { lines?: number }) {
    return (
        <div className="space-y-2">
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    className={cn(
                        "h-4",
                        i === lines - 1 ? "w-3/4" : "w-full"
                    )}
                />
            ))}
        </div>
    );
}

// Stats card skeleton
export function StatsCardSkeleton() {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <Skeleton className="w-12 h-12 rounded-lg" />
                <Skeleton className="w-16 h-6 rounded-full" />
            </div>
            <Skeleton className="h-8 w-20 mb-2" />
            <Skeleton className="h-4 w-28" />
        </div>
    );
}

// Table row skeleton
export function TableRowSkeleton() {
    return (
        <tr>
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="h-4 w-28" />
                </div>
            </td>
            <td className="px-6 py-4">
                <Skeleton className="h-4 w-32 mb-1" />
                <Skeleton className="h-3 w-16" />
            </td>
            <td className="px-6 py-4">
                <Skeleton className="h-6 w-24 rounded-full" />
            </td>
            <td className="px-6 py-4">
                <Skeleton className="h-4 w-20" />
            </td>
            <td className="px-6 py-4 text-right">
                <Skeleton className="h-6 w-6 rounded-full ml-auto" />
            </td>
        </tr>
    );
}

export default Skeleton;
