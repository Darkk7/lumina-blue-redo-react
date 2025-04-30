"use client";

import React from "react";
import { useSiteSettings } from '../context/SiteSettingsContext';
import { FaTooth, FaSpa, FaHeartbeat, FaQuestionCircle } from 'react-icons/fa'; // Example icons

// Map service titles to icons
const iconMap = {
  'Dental': FaTooth,
  'Spa': FaSpa,
  'Health': FaHeartbeat,
  // Add more mappings as needed
};

function getIconComponent(title) {
  return iconMap[title] || FaQuestionCircle;
}

const ServiceCard = ({ title, description }) => {
  const Icon = getIconComponent(title);
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
      <Icon className="text-4xl text-primary mb-2" />
      <h3 className="text-2xl font-semibold text-primary mb-4 text-center">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

const ServicesPage = () => {
  const { siteSettings, isLoading, error } = useSiteSettings();

  if (isLoading) {
    return (
      <section className="w-full bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4 flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center min-h-[300px]">
          <p className="text-red-600">Error loading services information</p>
        </div>
      </section>
    );
  }

  if (!siteSettings?.services || siteSettings.services.length === 0) {
    return (
      <section className="w-full bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center min-h-[300px]">
          <p className="text-gray-600">No services information available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-black">
          {siteSettings.service_description?.welcome_title}
        </h2>
        <h3 className="text-1xl font-bold text-center mb-12 text-black">
          {siteSettings.service_description?.welcome_text}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteSettings.services.map((service, index) => (
            <ServiceCard
              key={service.id || index}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
