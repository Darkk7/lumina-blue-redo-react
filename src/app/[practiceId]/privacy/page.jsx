'use client';

import { useParams, usePathname } from 'next/navigation';
import { SiteSettingsProvider } from '../../context/SiteSettingsContext';
import PrivacyPolicyPage from '../../pages/PrivacyPolicyPage';

export default function PrivacyPolicy() {
  const { practiceId } = useParams();

  if (!practiceId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Invalid Practice ID</h2>
          <p className="text-gray-600">Please provide a valid practice identifier</p>
        </div>
      </div>
    );
  }

  return (
    <SiteSettingsProvider initialPracticeId={practiceId}>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <PrivacyPolicyPage />
        </main>
      </div>
    </SiteSettingsProvider>
  );
}