"use client";

import React from "react";
import Image from "next/image";
import { useSiteSettings } from '../context/SiteSettingsContext';

const CustomPanelPage = () => {
  const { siteSettings, isLoading, error } = useSiteSettings();

  if (isLoading) {
    return (
      <section id="about" className="w-full bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="about" className="w-full bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center min-h-[300px]">
          <p className="text-red-600">Error loading practice information</p>
        </div>
      </section>
    );
  }

  if (!siteSettings?.service_description) {
    return (
      <section id="about" className="w-full bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center min-h-[300px]">
          <p className="text-gray-600">Practice information not available</p>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="w-full overflow-hidden bg-white py-12 flex items-center justify-center min-h-[600px] relative">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black opacity-50 z-[1]"></div>
        <Image 
          src="/images/FramesBG.png"
          alt="Placeholder Panel Background"
          fill
          className="object-cover opacity-90"
          priority
        />
      </div>
      <div className="w-full max-w-6xl mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center">
          <div className="w-full space-y-6">
            <h2 className="text-4xl text-center font-bold text-white"> {siteSettings.service_description?.custom_heading_text} </h2>
          </div>
          <div className="w-full space-y-6">
            <h2 className="text-1xl text-center font-bold text-white"> {siteSettings.service_description?.custom_body_text} </h2>
          </div>
          <div className="w-full flex justify-center mt-8">
            <a
              href={siteSettings.service_description?.custom_button_url || '#'}
              className="px-8 py-3 bg-primary text-white font-semibold rounded-md hover:bg-white hover:text-primary hover:border-primary border-2 border-transparent transition-all"
            >
              {siteSettings.service_description?.custom_button_text || 'Learn More'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomPanelPage;