# Apartment User Dashboard

The central hub for logged-in renters to manage their property search journey.

## Features
- **Overview Dashboard**: At-a-glance view of saved homes, upcoming tours, and application status.
- **Upcoming Tour Card**: Prominent display of the next scheduled viewing with map and agent details.
- **Activity Feed**: Chronological list of recent interactions (views, saves, price drops).
- **Recommendations**: Personalized property suggestions based on search history.
- **Responsive Design**: Optimized for desktop with a clean, grid-based layout.

## Usage

```tsx
import { ApartmentUserDashboard } from '@/sd-components/3393e4d5-1798-49d1-bc92-80b0183697f5';

function DashboardPage() {
  return <ApartmentUserDashboard />;
}
```

## Dependencies
- lucide-react
- framer-motion
- tailwind-merge
- clsx