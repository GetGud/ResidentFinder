# Apartment Search Component

A polished, production-grade real estate search interface inspired by top-tier property listing platforms. Features a split-screen layout with a scrollable list view and a fixed map interface.

## Features
- **Split Layout**: Responsive design with sticky header, scrollable list, and fixed map (desktop).
- **Advanced Filtering**: Clean, accessible filter bar with dropdown styles.
- **Property Cards**: High-detail cards with image carousels, availability badges, and rich metadata.
- **Map Visualization**: Interactive-style map placeholder with custom price markers and tooltips.
- **Polished Aesthetics**: Professional "Manrope" typography, deep emerald branding, and refined spacing.

## Dependencies
- `react`
- `lucide-react` (Icons)
- `framer-motion` (Animations)
- `tailwind-merge` & `clsx` (Style utilities)

## Usage

```tsx
import { ApartmentSearchDesktop } from '@/sd-components/e57f2d2c-416d-48c1-89cc-af1bfa54165a';

function RealEstateApp() {
  return (
    <div className="h-screen w-full">
      <ApartmentSearchDesktop />
    </div>
  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | Optional class names to override styles |
