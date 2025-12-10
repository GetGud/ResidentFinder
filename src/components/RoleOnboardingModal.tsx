import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Building2, Users, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface RoleOnboardingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const RoleOnboardingModal = ({ isOpen, onClose }: RoleOnboardingModalProps) => {
    const { setRole, enableManagerRole, setOnboardingComplete } = useAuth();

    const handleSelectRole = (selectedRole: 'renter' | 'manager' | 'both') => {
        if (selectedRole === 'renter') {
            setRole('renter');
        } else if (selectedRole === 'manager') {
            setRole('manager');
            enableManagerRole();
        } else {
            // Both roles - start with renter view but enable manager
            setRole('renter');
            enableManagerRole();
        }
        setOnboardingComplete();
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[#134e4a] to-[#0f3f3c] p-6 text-white">
                            <h2 className="text-2xl font-bold">Welcome to ResidentFinder! 🏠</h2>
                            <p className="text-emerald-100 mt-1">Let's personalize your experience</p>
                        </div>

                        {/* Options */}
                        <div className="p-6 space-y-4">
                            <p className="text-gray-600 text-center mb-6">What brings you here today?</p>

                            {/* Renter Option */}
                            <button
                                onClick={() => handleSelectRole('renter')}
                                className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-[#134e4a] hover:bg-[#f0fdf4] transition-all group text-left flex items-start gap-4"
                            >
                                <div className="p-3 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-[#134e4a] group-hover:text-white transition-colors">
                                    <Home size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">I'm looking for a place</h3>
                                    <p className="text-sm text-gray-500 mt-1">Search apartments, schedule tours, save favorites</p>
                                </div>
                            </button>

                            {/* Manager Option */}
                            <button
                                onClick={() => handleSelectRole('manager')}
                                className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-[#134e4a] hover:bg-[#f0fdf4] transition-all group text-left flex items-start gap-4"
                            >
                                <div className="p-3 rounded-lg bg-purple-100 text-purple-600 group-hover:bg-[#134e4a] group-hover:text-white transition-colors">
                                    <Building2 size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">I manage properties</h3>
                                    <p className="text-sm text-gray-500 mt-1">List rentals, manage tenants, track leads</p>
                                </div>
                            </button>

                            {/* Both Option */}
                            <button
                                onClick={() => handleSelectRole('both')}
                                className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-[#134e4a] hover:bg-[#f0fdf4] transition-all group text-left flex items-start gap-4"
                            >
                                <div className="p-3 rounded-lg bg-amber-100 text-amber-600 group-hover:bg-[#134e4a] group-hover:text-white transition-colors">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Both</h3>
                                    <p className="text-sm text-gray-500 mt-1">I'm looking for a place AND manage properties</p>
                                </div>
                            </button>
                        </div>

                        {/* Footer */}
                        <div className="px-6 pb-6">
                            <p className="text-xs text-gray-400 text-center">
                                You can always switch roles later from your dashboard
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RoleOnboardingModal;
