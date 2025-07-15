"use client";

import React from "react";
import Image from "next/image";
import { useSiteSettings } from '../context/SiteSettingsContext';

const YouTubePanelPage = () => {
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
      <div className="w-full max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left-side content */}
          <div className="w-full aspect-video">
            <iframe
              className="w-full h-full rounded-lg shadow-lg"
              src={siteSettings.service_description?.youtube_video_url || 'https://www.youtube.com/embed/default'}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          {/* Right-side content */}
          <div className="flex flex-col space-y-6">
            <h2 className="text-4xl font-bold text-black">
              {siteSettings.service_description?.youtube_header_text}
            </h2>
            <p className="text-gray-500">
              {siteSettings.service_description?.youtube_body_text}
            </p>
            <div>
              <a
                href={siteSettings.service_description?.youtube_button_url || '#'}
                className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-md hover:bg-white hover:text-primary hover:border-primary border-2 border-transparent transition-all"
              >
                {siteSettings.service_description?.youtube_button_text || 'Learn More'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubePanelPage;