"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const SiteSettingsContext = createContext();

export function SiteSettingsProvider({ children }) {
  const [siteSettings, setSiteSettings] = useState({
    counterSettings: {
      brands: 821,
      frames: 1550,
      customers: 2500,
      experience: 25
    },
    aboutText: "Welcome to Lumina Blue Optometrists, where we blend cutting-edge eye care technology with personalized attention to ensure your vision health is in the best hands possible.",
    teamTitle: "Meet Our Vibrant Team",
    teamMembers: [
      { id: 1, name: "Dr. John Doe", role: "Senior Optometrist" },
      { id: 2, name: "Dr. Jane Smith", role: "Optometrist" },
      { id: 3, name: "Sarah Johnson", role: "Optical Assistant" }
    ],
    services: [
      { id: 1, title: "Comprehensive Eye Examinations", description: "Thorough vision and eye health assessments" },
      { id: 2, title: "Contact Lens Fitting", description: "Expert fitting of all types of contact lenses" },
      { id: 3, title: "Pediatric Eye Care", description: "Specialized care for children's vision" }
    ]
  });

  useEffect(() => {
    // Load settings from localStorage on mount
    const savedSettings = localStorage.getItem('siteSettings');
    if (savedSettings) {
      console.log('Loading settings from localStorage:', JSON.parse(savedSettings));
      setSiteSettings(JSON.parse(savedSettings));
    }
  }, []);

  const updateSettings = (newSettings) => {
    console.log('Updating settings:', newSettings);
    setSiteSettings(newSettings);
    localStorage.setItem('siteSettings', JSON.stringify(newSettings));
  };

  return (
    <SiteSettingsContext.Provider value={{ siteSettings, updateSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
}
