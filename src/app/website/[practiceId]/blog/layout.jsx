"use client";

import { use } from 'react';
import { SiteSettingsProvider } from '../../../context/SiteSettingsContext';

export default function BlogLayout({ children, params }) {
  const resolvedParams = use(params);
  
  return (
    <SiteSettingsProvider initialPracticeId={resolvedParams.practiceId}>
      {children}
    </SiteSettingsProvider>
  );
}
