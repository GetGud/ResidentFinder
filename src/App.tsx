import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CompareProvider } from './hooks/useCompare';
import { LandingPage, AuthPage, PropertyDetailsPage, DashboardPage, ManagerDashboardPage } from './pages';
import { ApartmentSearch } from './components/ApartmentSearch';
import { CompareDrawer } from './components/CompareDrawer';

export default function App() {
  return (
    <AuthProvider>
      <CompareProvider>
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
      </CompareProvider>
    </AuthProvider>
  );
}