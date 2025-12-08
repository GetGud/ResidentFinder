# Apartment Platform Style Guide

## Design Philosophy
A trustworthy, professional, and clean aesthetic designed for the real estate market. The design prioritizes clarity, trust, and ease of use, utilizing a deep emerald green as the primary brand color to evoke stability and growth.

## Typography
The platform uses **Manrope** as the primary typeface for a modern, geometric, yet friendly feel.

### Font Family
- **Primary**: `Manrope`, `Inter`, system-ui, sans-serif

### Scale
- **Display**: `text-4xl md:text-6xl font-extrabold tracking-tight` (Hero Headlines)
- **H1**: `text-3xl font-extrabold` (Section Headers)
- **H2**: `text-2xl font-bold` (Card Titles)
- **H3**: `text-xl font-bold` (Subsection Headers)
- **Body**: `text-base text-gray-600 leading-relaxed`
- **Small**: `text-sm font-medium` (UI Elements, Meta data)
- **Tiny**: `text-xs font-bold uppercase tracking-wider` (Badges, Labels)

## Color Palette

### Primary (Deep Emerald)
Used for primary actions, branding, and active states.
- **Default**: `#134e4a` (Tailwind `bg-[#134e4a]` or `bg-primary`)
- **Light/Surface**: `#f0fdf4` (Emerald-50)
- **Hover**: `#0f3f3c`

### Neutral
- **Background**: `#ffffff` (White)
- **Surface**: `#f9fafb` (Gray-50)
- **Border**: `#e5e7eb` (Gray-200)
- **Text Primary**: `#111827` (Gray-900)
- **Text Secondary**: `#4b5563` (Gray-600)
- **Text Tertiary**: `#9ca3af` (Gray-400)

### Accents & Status
- **New/Info**: Blue-600 (`bg-blue-600`)
- **Special/Warning**: Orange-500 (`bg-orange-500`)
- **Success**: Green-700 (`text-green-700`)

## Components

### Buttons
- **Primary**: `bg-[#134e4a] text-white font-bold rounded-lg hover:bg-[#0f3f3c] transition-colors shadow-sm`
- **Secondary**: `bg-white text-[#134e4a] border border-[#134e4a] font-semibold rounded-md hover:bg-[#134e4a]/5 transition-colors`
- **Ghost/Tertiary**: `text-gray-600 hover:text-[#134e4a] font-medium`

### Cards
- **Property Card**: 
  - `bg-white rounded-xl border border-gray-200 overflow-hidden`
  - `hover:shadow-xl transition-all duration-300`
  - Image aspect ratio: `aspect-[4/3]` or `aspect-[16/10]`
  
### Form Elements
- **Inputs**: `rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#134e4a] focus:border-transparent outline-none text-gray-900`
- **Dropdowns**: `rounded-lg border border-gray-200 bg-white`

### Badges
- **Standard**: `px-2 py-1 rounded text-xs font-bold uppercase tracking-wider`
- **Glass Effect**: `bg-black/60 backdrop-blur text-white` (Image overlays)

## Layout & Spacing
- **Container**: `max-w-7xl mx-auto px-4`
- **Section Spacing**: `py-16` or `py-20`
- **Grid Gaps**: `gap-6` or `gap-8`
- **Border Radius**: `rounded-xl` (Cards), `rounded-lg` (Inputs/Buttons), `rounded-full` (Pills/Icons)

## Effects
- **Shadows**: `shadow-sm` (Default), `shadow-xl` (Hover/Featured)
- **Transitions**: `transition-all duration-300` (Cards), `transition-colors` (Interactive elements)
- **Backdrop Blur**: Used in headers (`bg-white/95 backdrop-blur-sm`) and image overlays.
