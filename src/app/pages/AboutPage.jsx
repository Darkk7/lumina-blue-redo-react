"use client";

import React from "react";
import Image from "next/image";
import { useSiteSettings } from '../context/SiteSettingsContext';

const AboutPage = () => {
  const { siteSettings } = useSiteSettings();

  return (
    <section id="about" className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-4xl font-bold text-black">About Our Practice</h2>
            <p className="text-gray-600 leading-relaxed">
              {siteSettings.aboutText}
            </p>
          </div>
          <div className="w-full md:w-1/2 h-[500px] relative rounded-lg overflow-hidden">
            <Image
              src="https://s3.eu-west-2.amazonaws.com/ocumailuserdata/1606406649_67_about_banner.png"
              alt="About Our Practice"
              fill
              style={{ objectFit: "contain" }}
              className="rounded-lg"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;