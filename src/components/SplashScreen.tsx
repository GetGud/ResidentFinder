import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
    onComplete?: () => void;
    minDisplayTime?: number;
}

export function SplashScreen({ onComplete, minDisplayTime = 2000 }: SplashScreenProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onComplete?.();
        }, minDisplayTime);

        return () => clearTimeout(timer);
    }, [minDisplayTime, onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[100] bg-[#134e4a] flex flex-col items-center justify-center"
                >
                    {/* Animated Logo */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 15,
                            delay: 0.1
                        }}
                        className="relative"
                    >
                        {/* Outer glow ring */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1.5, opacity: 0 }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatDelay: 0.5,
                                ease: 'easeOut'
                            }}
                            className="absolute inset-0 bg-white/20 rounded-3xl"
                        />

                        {/* Logo container */}
                        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden">
                            {/* Shimmer effect */}
                            <motion.div
                                initial={{ x: '-100%' }}
                                animate={{ x: '200%' }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatDelay: 1,
                                    ease: 'easeInOut'
                                }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                            />
                            <span className="text-[#134e4a] font-extrabold text-5xl relative z-10">R</span>
                        </div>
                    </motion.div>

                    {/* Animated Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="mt-8 text-center"
                    >
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">
                            Resident<span className="font-light text-white/70">Finder</span>
                        </h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="text-white/60 text-sm mt-2"
                        >
                            Find your perfect home
                        </motion.p>
                    </motion.div>

                    {/* Loading dots */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.3 }}
                        className="absolute bottom-16 flex gap-2"
                    >
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.5, 1, 0.5]
                                }}
                                transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                    delay: i * 0.15
                                }}
                                className="w-2 h-2 bg-white rounded-full"
                            />
                        ))}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default SplashScreen;
