import React from 'react';
import { PropertyDetailsDesktop } from './Component';

// --- Tailwind Configuration ---\n// This must be defined before the component renders
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
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#134e4a', // Deep Emerald to match previous design
            foreground: '#ffffff',
          },
          secondary: {
            DEFAULT: '#f0fdf4',
            foreground: '#134e4a',
          },
          border: '#e2e8f0',
          input: '#e2e8f0',
          ring: '#134e4a',
          background: '#ffffff',
          foreground: '#0f172a',
        },
        fontFamily: {
          sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        }
      }
    }
  };
}

export default function App() {
  return (
    <div>
      {/* Import Manrope Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
      `}</style>
      
      <PropertyDetailsDesktop />
    </div>
  );
}