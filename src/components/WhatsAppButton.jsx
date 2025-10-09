"use client";

import { FaWhatsapp } from 'react-icons/fa';
import { useSiteSettings } from '../app/context/SiteSettingsContext';
import { useEffect } from 'react';

export default function WhatsAppButton() {
  const { siteSettings } = useSiteSettings();
  
  useEffect(() => {
    console.log('WhatsAppButton - siteSettings:', siteSettings);
    console.log('WhatsAppButton - whatsapp_tel:', siteSettings?.whatsapp_tel);
    console.log('WhatsAppButton - typeof:', typeof siteSettings?.whatsapp_tel);
    console.log('WhatsAppButton - trimmed:', siteSettings?.whatsapp_tel?.trim());
  }, [siteSettings]);
  
  // Only show the button if whatsapp_tel is set and not empty
  if (typeof siteSettings?.whatsapp_tel !== 'string' || siteSettings.whatsapp_tel.trim() === "") {
    console.log('WhatsAppButton - Not showing, condition not met');
    return null;
  }

  return (
    <a
      href={`https://wa.me/${siteSettings.whatsapp_tel.replace(/[^0-9]/g, '')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-50 transition-all duration-300 hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}