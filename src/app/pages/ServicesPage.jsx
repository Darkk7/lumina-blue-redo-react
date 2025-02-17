"use client";

import React from "react";
import { useSiteSettings } from '../context/SiteSettingsContext';

const ServiceCard = ({ title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h3 className="text-2xl font-semibold text-primary mb-4">{title}</h3>
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
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
