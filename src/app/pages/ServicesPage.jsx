"use client";

import React, { useEffect, useState } from "react";
import { useSiteSettings } from '../context/SiteSettingsContext';
import { getServiceImage } from '../../utils/imagePaths';

// IcoMoon font
const IcomoonStyles = () => (
  <style jsx global>{`
    @font-face {
      font-family: 'icomoon';
      src: url('https://dl.dropbox.com/s/x3qnbrfeo2d3bfp/icomoon.eot?ty6f5v');
      src: url('https://dl.dropbox.com/s/x3qnbrfeo2d3bfp/icomoon.eot?ty6f5v#iefix') format('embedded-opentype'),
           url('https://dl.dropbox.com/s/6bfb63btid4kjpx/icomoon.ttf?ty6f5v') format('truetype'),
           url('https://dl.dropbox.com/s/irn7sila6z5fy2b/icomoon.woff?ty6f5v') format('woff'),
           url('https://dl.dropbox.com/s/l8b3q7nwzgy6f1r/icomoon.svg?ty6f5v#icomoon') format('svg');
      font-weight: normal;
      font-style: normal;
      font-display: block;
    }

    .icon {
      font-family: 'icomoon' !important;
      speak: never;
      font-style: normal;
      font-weight: normal;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      
    }

    .icon-comprehensiveeyeexams:before { content: "\e935"; }
    .icon-visualacuity:before { content: "\e934"; }
    .icon-lens-holder:before { content: "\e919"; }
    .icon-lens-holder-1:before { content: "\e938"; }
    .icon-repairing-service:before { content: "\e92c"; }
    .icon-repair_1:before { content: "\e92b"; }
    .icon-eyeglasses:before { content: "\e902"; }
    .icon-eyeglasses-of-thin-shape:before { content: "\e903"; }
    .icon-contactlens:before { content: "\e900"; }
    .icon-driverlicense:before { content: "\e901"; }
    .icon-filters:before { content: "\e904"; }
    .icon-filters-1:before { content: "\e904"; }
    .icon-foroptero:before { content: "\e906"; }
    .icon-glaucoma:before { content: "\e907"; }
    .icon-ophthalmology:before { content: "\e91a"; }
    .icon-optometry:before { content: "\e91b"; }
    .icon-paediatric_1:before { content: "\e928"; }
    .icon-paediatric_2:before { content: "\e929"; }
    .icon-paediatric_3:before { content: "\e92a"; }
    .icon-skippers:before { content: "\e92d"; }
    .icon-view:before { content: "\e92e"; }
  `}</style>
);

// ServiceCard
const ServiceCard = ({ title, description, iconId, iconClass, imageName, iconsMap }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const resolvedIcon = iconId && iconsMap ? iconsMap[iconId] : iconClass || 'icon-eye';

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const renderVisual = () => {
    const imagePath = imageName
      ? `https://raw.githubusercontent.com/sim0n-sk8/emailAssets/main/reportRedo/assets/${imageName}.png`
      : null;

    return (
      <div className="w-full h-40 mb-4 relative rounded-lg overflow-hidden">
        {imagePath && !imageError ? (
          <img
            src={imagePath}
            alt={title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full  ">
<span className={`icon text-primary text-5xl ${resolvedIcon}`} />
          </div>
        )}
      </div>
    );
  };

  // Determine if description is long enough to need truncation
  const isLongDescription = description && description.length > 100;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 h-full ">
      {renderVisual()}
      <h3 className="text-2xl font-semibold text-black mb-3">{title}</h3>

      <div className={`text-gray-600 text-left w-full transition-all duration-200 ${!isExpanded && isLongDescription ? 'line-clamp-3' : ''}`}>
        {description}
      </div>

      {isLongDescription && (
        <button
          onClick={toggleExpand}
          className="mt-2 text-primary text-sm font-medium self-start"
        >
          {isExpanded ? 'Show Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};


// ServicesPage
const ServicesPage = () => {
  const { siteSettings } = useSiteSettings();
  const services = siteSettings?.services || [];
  const practiceId = siteSettings?.practiceId;
  const [iconsMap, setIconsMap] = useState({});

  useEffect(() => {
  const fetchIcons = async () => {
    if (!practiceId) return;
    try {
      const res = await fetch(`/api/website/${practiceId}/icons`);
      if (!res.ok) throw new Error(`API returned status ${res.status}`);
      const data = await res.json();
      setIconsMap(data.iconsMap || {});
    } catch (err) {
      console.error("Failed to fetch icons:", err);
      setIconsMap({}); // fallback
    }
  };
  fetchIcons();
}, [practiceId]);


  return (
    <>
      <IcomoonStyles />
      <section className="w-full bg-gray-50 py-16 px-4" id="services">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 pt-8" style={{ textTransform: 'capitalize' }}>
            {siteSettings.service_description?.welcome_title || 'Our Services'}
          </h2>
          <p className="text-lg text-center mb-12 text-gray-600 max-w-5xl mx-auto">
            {siteSettings.service_description?.welcome_text || 'Professional eye care services tailored to your needs'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.service_title || service.title}
                description={service.long_description || service.short_description || service.description}
                iconId={service.icon_id}
                iconClass={service.icon_desc || service.iconDescription}
                imageName={service.image_name || service.imageName || 'Arch'}
                categoryId={service.category_id}
                serviceKey={service.service_key}
                iconsMap={iconsMap}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
