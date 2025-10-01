"use client";

import { use } from 'react';
import { SiteSettingsProvider } from '../../context/SiteSettingsContext';
import Navbar from '../../pages/Navbar';
import FooterPage from '../../pages/FooterPage';

export default function InfoCentreLayout({ children, params }) {
  const resolvedParams = use(params);
  
  return (
    <SiteSettingsProvider initialPracticeId={resolvedParams.practiceId}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
      </div>
    </SiteSettingsProvider>
  );
}
