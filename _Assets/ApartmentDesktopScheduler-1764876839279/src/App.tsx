import React from 'react';
import ApartmentDesktopScheduler from './Component';

// --- Tailwind Configuration ---
declare global {
  interface Window {
    tailwind: {
      config: any;
    };
  }
}

if (typeof window !== 'undefined') {
  window.tailwind = window.tailwind || {};
  window.tailwind.config = {
    ...window.tailwind.config,
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#134e4a', // Deep Emerald
            foreground: '#ffffff',
          },
          secondary: {
            DEFAULT: '#f0fdf4', // Light Green
            foreground: '#134e4a',
          },
          border: '#e5e7eb',
          input: '#e5e7eb',
          ring: '#134e4a',
          background: '#ffffff',
          foreground: '#111827',
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
        }
      }
    }
  };
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8 font-sans">
      {/* Backdrop Overlay Simulation */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-0" />
      
      {/* Modal Component */}
      <div className="relative z-10">
        <ApartmentDesktopScheduler />
      </div>
    </div>
  );
}