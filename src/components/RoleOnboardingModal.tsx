import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Building2, Layers, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

interface RoleOnboardingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const RoleOnboardingModal = ({ isOpen, onClose }: RoleOnboardingModalProps) => {
    const { setRole, enableManagerRole, setOnboardingComplete } = useAuth();
    const [selected, setSelected] = React.useState<'renter' | 'manager' | 'both' | null>(null);

    const handleConfirm = () => {
        if (!selected) return;

        if (selected === 'renter') {
            setRole('renter');
        } else if (selected === 'manager') {
            setRole('manager');
            enableManagerRole();
        } else {
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
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full overflow-hidden flex flex-col md:flex-row"
                    >
                        {/* Side Branding Panel (hidden on mobile) */}
                        <div className="hidden md:flex flex-col justify-between w-1/3 bg-[#134e4a] p-8 text-white">
                            <div>
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-6">
                                    <span className="font-bold text-xl">R</span>
                                </div>
                                <h2 className="text-2xl font-bold mb-2">Welcome to ResidentFinder</h2>
                                <p className="text-emerald-100/80 text-sm leading-relaxed">
                                    Join thousands of users finding their dream home or managing their properties with ease.
                                </p>
                            </div>
                            <div className="text-xs text-emerald-100/60">
                                © 2025 ResidentFinder
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">How will you use ResidentFinder?</h3>
                            <p className="text-gray-500 mb-8 text-sm">Select the option that best describes your needs immediately. You can adjust this later.</p>

                            <div className="space-y-3">
                                <RoleOption
                                    icon={Home}
                                    title="I am a Renter"
                                    description="Looking for an apartment or home to rent"
                                    isSelected={selected === 'renter'}
                                    onClick={() => setSelected('renter')}
                                />
                                <RoleOption
                                    icon={Building2}
                                    title="I am a Property Manager"
                                    description="Listing properties and managing tenants"
                                    isSelected={selected === 'manager'}
                                    onClick={() => setSelected('manager')}
                                />
                                <RoleOption
                                    icon={Layers}
                                    title="I do both"
                                    description="I want to browse listings and manage my own"
                                    isSelected={selected === 'both'}
                                    onClick={() => setSelected('both')}
                                />
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button
                                    onClick={handleConfirm}
                                    disabled={!selected}
                                    className={cn(
                                        "px-6 py-2.5 rounded-lg font-semibold text-sm transition-all",
                                        selected
                                            ? "bg-[#134e4a] text-white shadow-lg shadow-emerald-900/10 hover:shadow-emerald-900/20 hover:-translate-y-0.5"
                                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    )}
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const RoleOption = ({ icon: Icon, title, description, isSelected, onClick }: {
    icon: any,
    title: string,
    description: string,
    isSelected: boolean,
    onClick: () => void
}) => (
    <button
        onClick={onClick}
        className={cn(
            "w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-start gap-4 group relative",
            isSelected
                ? "border-[#134e4a] bg-[#f0fdf4] shadow-sm"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
        )}
    >
        <div className={cn(
            "p-2.5 rounded-lg transition-colors",
            isSelected ? "bg-[#134e4a] text-white" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
        )}>
            <Icon size={20} />
        </div>
        <div className="flex-1">
            <h4 className={cn("font-semibold text-sm", isSelected ? "text-[#134e4a]" : "text-gray-900")}>
                {title}
            </h4>
            <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        </div>
        {isSelected && (
            <div className="absolute top-4 right-4">
                <div className="w-5 h-5 bg-[#134e4a] rounded-full flex items-center justify-center">
                    <Check size={12} className="text-white" />
                </div>
            </div>
        )}
    </button>
);

export default RoleOnboardingModal;
