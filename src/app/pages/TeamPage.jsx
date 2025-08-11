"use client";

import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSiteSettings } from '../context/SiteSettingsContext';
import Image from 'next/image';

const TeamPage = () => {
  const { siteSettings, isLoading, error } = useSiteSettings();
  const [selectedMember, setSelectedMember] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const openBioPanel = (member) => {
    setSelectedMember(member);
    setIsPanelOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when panel is open
  };

  const closeBioPanel = () => {
    setIsPanelOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
    // Delay resetting selectedMember to allow animation to complete
    setTimeout(() => setSelectedMember(null), 300);
  };

  if (isLoading) {
    return (
      <section className="w-full bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center min-h-[300px]">
          <p className="text-red-600">Error loading team information</p>
        </div>
      </section>
    );
  }

  if (!siteSettings?.member?.member || siteSettings.member.member.length === 0) {
    return (
      <section className="w-full bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center min-h-[300px]">
          <p className="text-gray-600">No team members available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-16 relative" id="team">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl text-black font-bold text-center mb-8 pt-8">
          {siteSettings.team?.team_title || "Our Team"}
        </h1>
        <p className="text-gray-500 font-bold text-center mb-8">
          {siteSettings.team?.description}
        </p>
        <Slider {...settings}>
          {(siteSettings.member?.member || []).map((member, index) => (
            <div key={index} className="p-4">
              <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                <div className="relative h-64 flex-shrink-0">
                  <Image
                    src={member?.img || '/default-team-member.jpg'}
                    alt={member?.name || 'Team Member'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl text-primary font-semibold mb-2">
                    {member?.name || 'Unknown'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {member?.qualification || 'Position not specified'}
                  </p>
                  <div className="mt-auto">
                    <button
                      onClick={() => openBioPanel(member)}
                      className="w-full px-6 py-2 bg-primary text-white font-semibold rounded-md hover:bg-white hover:text-primary hover:border-primary border-2 border-transparent transition-all"
                    >
                      View Bio
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Bio Panel Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isPanelOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeBioPanel}
      ></div>

      {/* Bio Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {selectedMember && (
          <div className="h-full flex flex-col">
            {/* Header with full-width image */}
            <div className="relative w-full bg-gray-100" style={{ minHeight: '20rem' }}>
              <div className="absolute inset-0 flex items-center justify-center px-4">
                <div className="relative w-full h-full max-w-4xl mx-auto">
                  <Image
                    src={selectedMember.img || '/default-team-member.jpg'}
                    alt={selectedMember.name || 'Team Member'}
                    fill
                    className="object-contain"
                    sizes="(max-width: 800px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
              <button
                onClick={closeBioPanel}
                className="absolute top-4 right-4 bg-primary rounded-full w-10 h-10 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors shadow-md z-10"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
              {/* Full-width header */}
              <div className="w-full bg-gray-900 text-white p-6">
                <h2 className="text-2xl font-bold text-center sm:text-left">
                  Meet {selectedMember.name || 'Our Team Member'}
                </h2>
              </div>
              
              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-line">
                    {selectedMember.description || 'No bio available for this team member.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamPage;