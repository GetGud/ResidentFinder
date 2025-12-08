# Apartment Mobile App Component

A high-fidelity, mobile-first real estate browsing interface inspired by top rental apps.

## Features
- **Immersive Property Feed**: Large, high-quality cards with 4:3 aspect ratio images.
- **Sticky Search & Filter**: Search bar and horizontal scrollable filters that stick to the top.
- **Tab Navigation**: Fixed bottom navigation bar.
- **Mock Interaction**: 
  - Toggle between List and Map view modes.
  - "Favorite" listing interaction.
  - Scrollable content area.

## Usage

```tsx
import ApartmentMobileApp from '@/sd-components/12afaf85-6077-43b0-98e7-f916da6cfa00';

function MyPage() {
  return (
    <div className="h-screen w-full">
      <ApartmentMobileApp />
    </div>
  );
}
```

## Dependencies
- lucide-react
- tailwindcss (via CDN/PlayCDN)
- react
