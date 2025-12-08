import React, { useState } from 'react';
import { 
  X, 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  User,
  Video,
  Clock,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Utils ---
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTH_DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

// --- Component ---
export function ApartmentDesktopScheduler() {
  const [selectedDate, setSelectedDate] = useState<number>(15);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [tourType, setTourType] = useState<'person' | 'video'>('person');
  const [isSuccess, setIsSuccess] = useState(false);

  if (isSuccess) {
    return <SuccessView onClose={() => setIsSuccess(false)} />;
  }

  return (
    <div className="w-[900px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[600px]">
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
          <p className="text-emerald-200 mb-8">Select a date and time to visit The Emerald Heights.</p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/10">
            <div className="flex items-center justify-between mb-4 text-sm font-semibold">
              <button className="p-1 hover:bg-white/10 rounded"><ChevronLeft size={16} /></button>
              <span>October 2023</span>
              <button className="p-1 hover:bg-white/10 rounded"><ChevronRight size={16} /></button>
            </div>
            
            <div className="grid grid-cols-7 gap-2 text-center mb-2">
              {DAYS.map(d => (
                <span key={d} className="text-xs font-medium text-emerald-300">{d}</span>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {/* Empty slots for alignment */}
              <div /><div />
              {MONTH_DAYS.slice(0, 28).map(day => (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={cn(
                    "w-8 h-8 rounded-full text-sm flex items-center justify-center transition-all",
                    selectedDate === day 
                      ? "bg-white text-emerald-900 font-bold shadow-lg" 
                      : "hover:bg-white/20 text-white"
                  )}
                >
                  {day}
                </button>
              ))}
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
        <button className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors">
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
              {['9:00 AM', '9:30 AM', '10:00 AM', '1:00 PM', '2:30 PM', '4:00 PM'].map(time => (
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
               <input type="text" placeholder="First Name" className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
               <input type="text" placeholder="Last Name" className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
            </div>
            <input type="email" placeholder="Email Address" className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
            <input type="tel" placeholder="Phone Number" className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
          </div>

          <button 
            onClick={() => setIsSuccess(true)}
            className="w-full py-4 bg-emerald-800 text-white font-bold rounded-xl hover:bg-emerald-900 transform active:scale-[0.98] transition-all shadow-lg shadow-emerald-900/20"
          >
            Request Tour
          </button>
        </div>
      </div>
    </div>
  );
}

function SuccessView({ onClose }: { onClose: () => void }) {
  return (
    <div className="w-[900px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col items-center justify-center text-center p-12">
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6"
      >
        <CheckCircle2 className="w-12 h-12 text-green-600" />
      </motion.div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Tour Requested!</h2>
      <p className="text-gray-500 max-w-md mb-8">
        We've sent your request to the property manager. Check your email for a confirmation of your appointment time.
      </p>
      <button onClick={onClose} className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-lg transition-colors">
        Close Window
      </button>
    </div>
  );
}

export default ApartmentDesktopScheduler;