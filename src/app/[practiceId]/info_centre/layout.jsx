"use client";

import { use } from 'react';
import { SiteSettingsProvider } from '../../context/SiteSettingsContext';
import FooterPage from '../../pages/FooterPage';

export default function InfoCentreLayout({ children, params }) {
  const resolvedParams = use(params);
  
  // Check if the practiceId is actually a customer code (contains letters)
  const isCustomerCode = /[a-zA-Z]/.test(resolvedParams.practiceId);
  
  return (
    <SiteSettingsProvider 
      initialPracticeId={isCustomerCode ? null : resolvedParams.practiceId}
      customerCode={isCustomerCode ? resolvedParams.practiceId : null}
    >
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          {children}
        </main>
        <FooterPage />
      </div>
    </SiteSettingsProvider>
  );
}
