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
  FaHandHoldingHeart,
  FaWrench,
  FaBinoculars,
  FaScrewdriver,
  FaEyeDropper
} from "react-icons/fa";

const getServiceIcon = (title, icons) => {
  if (!icons) return FaTools;
  const lowerTitle = title.toLowerCase().replace(/\s+/g, '');
  const iconEntry = icons.find(iconObj => iconObj.icon.name.toLowerCase().includes(lowerTitle));
  return iconEntry ? iconEntry.icon : FaTools;
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
  const services = siteSettings.services;

  return (
    <section className="w-full bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-5 text-black">
      {siteSettings.service_description?.welcome_title}
        </h2>
      <h2 className="text-1xl font-bold text-center mb-12 text-gray-500">
      {siteSettings.service_description?.welcome_text}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id || index}
              title={service.title}
              description={service.description}
              Icon={getServiceIcon(service.title, [
                { icon: FaEye },
                { icon: FaGlasses },
                { icon: FaUserMd },
                { icon: FaHeartbeat },
                { icon: FaRegSmile },
                { icon: FaTools },
                { icon: FaChild },
                { icon: FaExclamationTriangle },
                { icon: FaCarAlt },
                { icon: FaPlusCircle },
                { icon: FaSearch },
                { icon: FaHandHoldingHeart },
                { icon: FaWrench },
                { icon: FaBinoculars },
                { icon: FaScrewdriver },
                { icon: FaEyeDropper }
              ])}
              image={`/images/${services.icon_desc}.svg`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
