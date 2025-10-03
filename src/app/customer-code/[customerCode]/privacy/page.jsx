'use client';

import { usePathname } from 'next/navigation';
import { useSiteSettings } from '../../../../context/SiteSettingsContext';

export default function PrivacyPolicy() {
  const pathname = usePathname();
  const { siteSettings, isLoading, error } = useSiteSettings();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose max-w-none">
        {siteSettings?.privacy_policy ? (
          <div dangerouslySetInnerHTML={{ __html: siteSettings.privacy_policy }} />
        ) : (
          <p>Privacy policy not available for this practice.</p>
        )}
      </div>
    </div>
  );
}
