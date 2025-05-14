"use client";

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSiteSettings } from '../context/SiteSettingsContext';
import Image from 'next/image';

const TeamPage = () => {
  const { siteSettings, isLoading, error } = useSiteSettings();

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
    <section className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl text-black font-bold text-center mb-8">{siteSettings.team?.team_title || "Our Team"} </h1>
        <h2 className="text-1xl text-gray-500 font-bold text-center mb-8">{siteSettings.team?.description}</h2>
        <Slider {...settings}>
          {(siteSettings.member?.member || []).map((member, index) => {
            const [isBioVisible, setIsBioVisible] = React.useState(false);
            
            return (
              <div key={index} className="p-4">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative h-64">
                    <Image
                      src={member?.img || '/default-team-member.jpg'}
                      alt={member?.name || 'Team Member'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl text-primary font-semibold mb-2">{member?.name || 'Unknown'}</h3>
                    <p className="text-gray-600 mb-4">{member?.qualification || 'Position not specified'}</p>
                    <div className="mt-4">
                      <button
                        onClick={() => setIsBioVisible(!isBioVisible)}
                        className="px-6 py-2 bg-primary text-white font-semibold rounded-md hover:bg-white hover:text-primary hover:border-primary border-2 border-transparent transition-all"
                      >
                        {isBioVisible ? 'Hide Bio' : 'View Bio'}
                      </button>
                      {isBioVisible && (
                        <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                          <p className="text-gray-500">{member?.description || 'No bio available'}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default TeamPage;