import React, { useState } from 'react';
import {
    X,
    ChevronLeft,
    ChevronRight,
    User,
    Video,
    CheckCircle2,
    ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

interface TourSchedulerModalProps {
    isOpen: boolean;
    onClose: () => void;
    propertyName?: string;
}

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const TIME_SLOTS = ['9:00 AM', '9:30 AM', '10:00 AM', '1:00 PM', '2:30 PM', '4:00 PM'];

// Generate calendar days for a month
function getMonthDays(year: number, month: number) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

export function TourSchedulerModal({ isOpen, onClose, propertyName = 'this property' }: TourSchedulerModalProps) {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [tourType, setTourType] = useState<'person' | 'video'>('person');
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    const { firstDay, daysInMonth } = getMonthDays(currentYear, currentMonth);

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
        setSelectedDate(null);
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
        setSelectedDate(null);
    };

    const handleSubmit = () => {
        // In a real app, this would submit to an API
        setIsSuccess(true);
    };

    const handleClose = () => {
        setIsSuccess(false);
        setSelectedDate(null);
        setSelectedTime(null);
        setFormData({ firstName: '', lastName: '', email: '', phone: '' });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={handleClose}
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-[900px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
                >
                    {isSuccess ? (
                        <SuccessView onClose={handleClose} />
                    ) : (
                        <>
                            {/* Left Column: Calendar & Info */}
                            <div className="w-full md:w-[400px] bg-emerald-900 text-white p-8 flex flex-col relative overflow-hidden">
                                {/* Background Pattern */}
                                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                                    <svg width="100%" height="100%">
                                        <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <circle cx="2" cy="2" r="1" fill="currentColor" />
                                        </pattern>
                                        <rect width="100%" height="100%" fill="url(#pattern)" />
                                    </svg>
                                </div>

                                <div className="relative z-10">
                                    <h2 className="text-2xl font-bold mb-2">Schedule a Tour</h2>
                                    <p className="text-emerald-200 mb-8">Select a date and time to visit {propertyName}.</p>

                                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/10">
                                        <div className="flex items-center justify-between mb-4 text-sm font-semibold">
                                            <button onClick={handlePrevMonth} className="p-1 hover:bg-white/10 rounded">
                                                <ChevronLeft size={16} />
                                            </button>
                                            <span>{MONTHS[currentMonth]} {currentYear}</span>
                                            <button onClick={handleNextMonth} className="p-1 hover:bg-white/10 rounded">
                                                <ChevronRight size={16} />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-7 gap-2 text-center mb-2">
                                            {DAYS.map(d => (
                                                <span key={d} className="text-xs font-medium text-emerald-300">{d}</span>
                                            ))}
                                        </div>

                                        <div className="grid grid-cols-7 gap-2">
                                            {/* Empty slots for alignment */}
                                            {Array.from({ length: firstDay }).map((_, i) => (
                                                <div key={`empty-${i}`} />
                                            ))}
                                            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                                                const isToday = day === today.getDate() &&
                                                    currentMonth === today.getMonth() &&
                                                    currentYear === today.getFullYear();
                                                const isPast = new Date(currentYear, currentMonth, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

                                                return (
                                                    <button
                                                        key={day}
                                                        onClick={() => !isPast && setSelectedDate(day)}
                                                        disabled={isPast}
                                                        className={cn(
                                                            "w-8 h-8 rounded-full text-sm flex items-center justify-center transition-all",
                                                            selectedDate === day
                                                                ? "bg-white text-emerald-900 font-bold shadow-lg"
                                                                : isPast
                                                                    ? "text-emerald-700 cursor-not-allowed"
                                                                    : "hover:bg-white/20 text-white",
                                                            isToday && selectedDate !== day && "ring-2 ring-white/50"
                                                        )}
                                                    >
                                                        {day}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="mt-auto flex gap-2 items-center text-xs text-emerald-300/80">
                                        <ShieldCheck size={14} />
                                        <span>Your information is secure and encrypted</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Form */}
                            <div className="flex-1 p-8 bg-white relative overflow-y-auto">
                                <button
                                    onClick={handleClose}
                                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X size={24} />
                                </button>

                                <div className="max-w-md mx-auto pt-4">
                                    {/* Tour Type */}
                                    <div className="mb-8">
                                        <label className="block text-sm font-bold text-gray-900 mb-3">Tour Type</label>
                                        <div className="flex p-1 bg-gray-100 rounded-lg">
                                            <button
                                                onClick={() => setTourType('person')}
                                                className={cn(
                                                    "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2",
                                                    tourType === 'person' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                                                )}
                                            >
                                                <User size={16} /> In-Person
                                            </button>
                                            <button
                                                onClick={() => setTourType('video')}
                                                className={cn(
                                                    "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2",
                                                    tourType === 'video' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                                                )}
                                            >
                                                <Video size={16} /> Live Video
                                            </button>
                                        </div>
                                    </div>

                                    {/* Time Selection */}
                                    <div className="mb-8">
                                        <label className="block text-sm font-bold text-gray-900 mb-3">Select Time</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {TIME_SLOTS.map(time => (
                                                <button
                                                    key={time}
                                                    onClick={() => setSelectedTime(time)}
                                                    className={cn(
                                                        "py-2 px-3 rounded-lg border text-sm font-medium transition-all",
                                                        selectedTime === time
                                                            ? "border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-600"
                                                            : "border-gray-200 text-gray-600 hover:border-emerald-500 hover:text-emerald-700"
                                                    )}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Contact Form */}
                                    <div className="space-y-4 mb-8">
                                        <label className="block text-sm font-bold text-gray-900">Contact Details</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                placeholder="First Name"
                                                value={formData.firstName}
                                                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                                                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Last Name"
                                                value={formData.lastName}
                                                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                                                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                                            />
                                        </div>
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                                        />
                                        <input
                                            type="tel"
                                            placeholder="Phone Number"
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                                        />
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        disabled={!selectedDate || !selectedTime}
                                        className={cn(
                                            "w-full py-4 font-bold rounded-xl transition-all shadow-lg",
                                            selectedDate && selectedTime
                                                ? "bg-emerald-800 text-white hover:bg-emerald-900 transform active:scale-[0.98] shadow-emerald-900/20"
                                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        )}
                                    >
                                        Request Tour
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

function SuccessView({ onClose }: { onClose: () => void }) {
    return (
        <div className="w-full h-[500px] bg-white flex flex-col items-center justify-center text-center p-12">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6"
            >
                <CheckCircle2 className="w-12 h-12 text-green-600" />
            </motion.div>
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-gray-900 mb-2"
            >
                Tour Requested!
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-500 max-w-md mb-8"
            >
                We've sent your request to the property manager. Check your email for a confirmation of your appointment time.
            </motion.p>
            <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={onClose}
                className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-lg transition-colors"
            >
                Close Window
            </motion.button>
        </div>
    );
}

export default TourSchedulerModal;
