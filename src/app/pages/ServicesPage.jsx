"use client";

import React from "react";
import { useSiteSettings } from '../context/SiteSettingsContext';
import { 
  FaEye, 
  FaGlasses, 
  FaUserMd, 
  FaHeartbeat, 
  FaRegSmile, 
  FaTools, 
  FaChild, 
  FaExclamationTriangle, 
  FaCarAlt, 
  FaPlusCircle,
  FaSearch,
  FaHandHoldingHeart
} from "react-icons/fa";

// Helper function to choose an icon based on service title
const getServiceIcon = (title) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("eye exam") || lowerTitle.includes("examinations")) return FaEye; // Comprehensive Eye Examinations
  if (lowerTitle.includes("myopia")) return FaSearch; // Myopia Control
  if (lowerTitle.includes("frame") && (lowerTitle.includes("selection") || lowerTitle.includes("assistance"))) return FaGlasses; // Frame Sales, Selection and Assistance
  if (lowerTitle.includes("contact lens")) return FaRegSmile; // Contact Lens Consultation
  if (lowerTitle.includes("adjustments") || lowerTitle.includes("repairs")) return FaTools; // Frame and Spectacle Adjustments and Repairs
  if (lowerTitle.includes("paediatric") || lowerTitle.includes("children")) return FaChild; // Paediatric Optometry
  if (lowerTitle.includes("glaucoma")) return FaExclamationTriangle; // Glaucoma Testing
  if (lowerTitle.includes("drivers licence") || lowerTitle.includes("traffic")) return FaCarAlt; // Drivers Licence Screening
  if (lowerTitle.includes("diabetic") || lowerTitle.includes("retinopathy")) return FaHandHoldingHeart; // Diabetic Retinopathy Screening
  return FaTools; // default/fallback icon
};

const ServiceCard = ({ title, description, Icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
    <Icon className="text-primary text-5xl mb-4" />
    <h3 className="text-2xl font-semibold text-primary mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

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
