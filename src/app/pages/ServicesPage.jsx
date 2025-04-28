"use client";

import React from "react";
import { useSiteSettings } from '../context/SiteSettingsContext';
import { FaEye, FaGlasses, FaUserMd, FaHeartbeat, FaRegSmile, FaTools } from "react-icons/fa";

const ServiceCard = ({ title, description, Icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
    <Icon className="text-primary text-5xl mb-4" />
    <h3 className="text-2xl font-semibold text-primary mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// Helper function to choose an icon based on service title
const getServiceIcon = (title) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("eye") || lowerTitle.includes("exam")) return FaEye;
  if (lowerTitle.includes("glasses") || lowerTitle.includes("spectacle")) return FaGlasses;
  if (lowerTitle.includes("consultation") || lowerTitle.includes("doctor")) return FaUserMd;
  if (lowerTitle.includes("health") || lowerTitle.includes("vision")) return FaHeartbeat;
  if (lowerTitle.includes("care") || lowerTitle.includes("wellness")) return FaRegSmile;
  return FaTools; // default/fallback icon
};

const ServicesPage = () => {
  const { siteSettings } = useSiteSettings();
  const { services } = siteSettings;

  return (
    <section className="w-full bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id || index}
              title={service.title}
              description={service.description}
              Icon={getServiceIcon(service.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
