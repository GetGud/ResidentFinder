import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CompareProvider } from './hooks/useCompare';
import { LandingPage, AuthPage, PropertyDetailsPage, DashboardPage, ManagerDashboardPage } from './pages';
import { ApartmentSearch } from './components/ApartmentSearch';
import { CompareDrawer } from './components/CompareDrawer';
import { SplashScreen } from './components/SplashScreen';
import { RoleOnboardingModal } from './components/RoleOnboardingModal';

// Detect if user is on mobile device
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Wrapper component to handle onboarding for authenticated users
const OnboardingWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoaded, hasCompletedOnboarding } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Show onboarding modal for authenticated users who haven't completed it
    if (isLoaded && isAuthenticated && !hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, [isLoaded, isAuthenticated, hasCompletedOnboarding]);

  return (
    <>
      {children}
      <RoleOnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
      />
    </>
  );
};

export default function App() {
  const [showSplash, setShowSplash] = useState(false);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Only show splash on mobile and if not already shown this session
    const hasSeenSplash = sessionStorage.getItem('residentfinder_splash_shown');

    if (isMobileDevice() && !hasSeenSplash) {
      setShowSplash(true);
      sessionStorage.setItem('residentfinder_splash_shown', 'true');
    } else {
      setAppReady(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setAppReady(true);
  };

  return (
    <AuthProvider>
      <CompareProvider>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} minDisplayTime={2500} />}

        {appReady && (
          <OnboardingWrapper>
            <Router>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/search" element={<ApartmentSearch />} />
                <Route path="/property/:id" element={<PropertyDetailsPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/manager" element={<ManagerDashboardPage />} />
              </Routes>
              <CompareDrawer />
            </Router>
          </OnboardingWrapper>
        )}
      </CompareProvider>
    </AuthProvider>
  );
}