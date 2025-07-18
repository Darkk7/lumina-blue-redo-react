"use client";

import React from 'react';
import Home from "../../pages/Home";
import { useSiteSettings } from "../../context/SiteSettingsContext";

export default function PracticePageClient({ initialData }) {
  const { siteSettings, error } = useSiteSettings();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Practice</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Please check the practice ID and try again. If the problem persists, contact support.</p>
        </div>
      </div>
    );
  }

  if (!siteSettings || !siteSettings.practiceId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-amber-600 mb-2">Practice Not Found</h2>
          <p className="text-gray-600">The requested practice could not be found.</p>
        </div>
      </div>
    );
  }

  return <Home siteSettings={siteSettings} initialData={initialData} />;
}
