# Apartment Authentication Page

A comprehensive Sign In and Sign Up portal for both Renters and Property Managers.

## Features
- **Dual Persona Support**: Seamless toggle between Renter and Property Manager modes.
- **Mode Switching**: Animated transition between Sign In and Sign Up forms.
- **Social Authentication**: Integrated UI for Google, Apple, and Facebook logins.
- **Visual Feedback**: Interactive form fields with focus states and validations.
- **Responsive Design**: Split-screen layout for desktop, stacked layout for mobile.

## Usage

```tsx
import ApartmentAuthPage from '@/sd-components/1dd5f85b-2333-4721-8a2f-56de45d03e56';

function LoginPage() {
  return <ApartmentAuthPage />;
}
```

## Dependencies
- lucide-react
- framer-motion
- tailwind-merge
- clsx