"use client";

import React from "react";
import { useSiteSettings } from '../context/SiteSettingsContext';
import Head from 'next/head';
import { getServiceImage } from '../../utils/imagePaths';

//Ico moon font
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

    .icon-comprehensiveeyeexams:before {
      content: "\e935";
    }
    .icon-visualacuity:before {
      content: "\e934";
    }
    .icon-lens-holder:before {
      content: "\e919";
    }
    .icon-lens-holder-1:before {
      content: "\e938";
    }
    .icon-repairing-service:before {
      content: "\e92c";
    }
    .icon-repair_1:before {
      content: "\e92b";
    }
    .icon-eyeglasses:before {
      content: "\e902";
    }
    .icon-eyeglasses-of-thin-shape:before {
      content: "\e903";
    }
    .icon-contactlens:before {
      content: "\e900";
    }
    .icon-driverlicense:before {
      content: "\e901";
    }
    .icon-filters:before {
      content: "\e904";
    }
    .icon-filters-1:before {
      content: "\e904";
    }
    .icon-foroptero:before {
      content: "\e906";
    }
    .icon-glaucoma:before {
      content: "\e907";
    }
    .icon-ophthalmology:before {
      content: "\e91a";
    }
    .icon-optometry:before {
      content: "\e91b";
    }
    .icon-paediatric_1:before {
      content: "\e928";
    }
    .icon-paediatric_2:before {
      content: "\e929";
    }
    .icon-paediatric_3:before {
      content: "\e92a";
    }
    .icon-skippers:before {
      content: "\e92d";
    }
    .icon-view:before {
      content: "\e92e";
    }
  `}</style>
);

const ServiceCard = ({ title, description, iconClass, imageName, categoryId, serviceKey }) => {
  const { siteSettings } = useSiteSettings();
  const practiceId = siteSettings?.practiceId;
  const primaryColor = siteSettings?.primaryColor || 'blue-600';
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isTruncated, setIsTruncated] = React.useState(false);
  const descriptionRef = React.useRef(null);

  // Check if text needs to be truncated
  React.useEffect(() => {
    if (descriptionRef.current) {
      const needsTruncation = descriptionRef.current.scrollHeight > 100; // Adjust height as needed
      setIsTruncated(needsTruncation && !isExpanded);
    }
  }, [description, isExpanded]);

  // Toggle expanded state
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  // Determine what to render based on available props
  const renderVisual = () => {
    if (serviceKey && practiceId && categoryId) {
      const imagePath = getServiceImage(practiceId, categoryId, serviceKey);
      
      return (
        <div className="w-16 h-16 mb-4 flex items-center justify-center">
          <div className="w-full h-full flex items-center justify-center">
            <img 
              src={imagePath} 
              alt={title}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                console.error(`Failed to load image: ${imagePath}`);
                e.target.style.display = 'none';
                const fallback = e.target.nextElementSibling;
                if (fallback) {
                  fallback.style.display = 'block';
                }
              }}
            />
            <span 
              className={`icon ${iconClass || 'icon-eye'}`} 
              style={{ display: 'none' }}
            ></span>
          </div>
        </div>
      );
    } else if (iconClass) {
      return (
        <div className="text-5xl text-primary mb-4">
          <span className={`icon ${iconClass}`}></span>
        </div>
      );
    }
    
    return (
      <div className="text-4xl text-gray-400 mb-4">
        <span className="icon icon-eye"></span>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 h-full">
      {renderVisual()}
      <h3 className="text-2xl font-semibold text-black mb-3">{title}</h3>
      <div 
        ref={descriptionRef}
        className={`text-gray-600 text-left w-full ${isTruncated ? 'line-clamp-3' : ''} transition-all duration-200`}
      >
        {description}
      </div>
      {isTruncated && (
        <button 
          onClick={toggleExpand}
          className="mt-2 text-primary text-sm font-medium self-start"
        >
          Read More
        </button>
      )}
      {!isTruncated && isExpanded && (
        <button 
          onClick={toggleExpand}
          className="mt-2 text-primary text-sm font-medium self-start"
        >
          Show Less
        </button>
      )}
    </div>
  );
};

const ServicesPage = () => {
  const { siteSettings } = useSiteSettings();
  const services = siteSettings?.services || [];
  
  if (services.length > 0) {
  } else {
  }

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
            {services.map((service, index) => {
              
              const props = {
                title: service.service_title || service.title,
                description: service.long_description || service.short_description || service.description,
                iconClass: service.icon_desc || service.iconDescription,
                imageName: service.image_name || service.imageName
              };
              
              return <ServiceCard key={service.id} {...props} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
