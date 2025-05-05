"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import Link from "next/link";
import CounterPage from "./CounterPage";
import CustomPanelPage from "./CustomPanelPage";
import YouTubePanelPage from "./YouTubePanelPage";
import GoogleSectionPage from "./GoogleSectionPage";
import AboutPage from "./AboutPage";
import ServicesPage from "./ServicesPage";
import TeamPage from "./TeamPage";
import RecentBlogs from "./RecentBlogs";
import BrandsPage from "./BrandsPage";
import BookingPage from "./BookingPage";
import TestimonialsPage from "./TestimonialsPage";
import ConnectWithUsPage from "./ConnectWithUsPage";
import { useSiteSettings } from '../context/SiteSettingsContext';

export default function HomePage({ customerCode }) {
  const { siteSettings, isLoading, error } = useSiteSettings();

  if (!siteSettings?.banners || siteSettings.banners.length === 0) {
    return (
      <div className="w-full h-[600px] bg-cover bg-center text-center text-white">
        <p>No banner information available</p>
      </div>
    );
  }

  return (
    <div>
      {/* Home Page Section */}
      {siteSettings.banners.length > 0 && (
        <div
          className="w-full h-[600px] bg-cover bg-center text-center text-white"
          style={{
            backgroundImage: `url(${siteSettings.banners[0].bannerImg})`,
          }}
        >
          <div
            className="bg-black bg-opacity-50 h-full flex flex-col items-center justify-center p-4"
            style={{
              fontFamily: siteSettings.banners[0].titleGoogleFont || 'inherit'
            }}
          >
            <p style={{ fontSize: `${siteSettings.banners[0].titleFontSize}px` }}>
              {siteSettings.banners[0].title}
            </p>
            <p style={{ fontSize: `${siteSettings.banners[0].textFontSize}px` }}>
              {siteSettings.banners[0].text || "Serving the community for over 80 years delivering the highest quality care and products for our customers"}
            </p>
            <br></br>
            <button
              className="px-8 py-3 bg-primary text-white font-semibold rounded-md hover:bg-white hover:text-primary hover:border-primary border-2 border-transparent transition-all"
            >
              <Link href={siteSettings.banners[0].buttonLink || "/#booking"}>{siteSettings.banners[0].buttonText || "Make A Booking"}</Link>
            </button>
          </div>
        </div>
      )}
      {siteSettings.show_counters_panel && <CounterPage />}
      {siteSettings.show_custom_panel && <CustomPanelPage />}
      <AboutPage />
      {siteSettings.show_youtube_panel && <YouTubePanelPage />}
      <ServicesPage />
      {siteSettings.show_socials_panel && <ConnectWithUsPage />}
      {siteSettings.show_teams_panel && <TeamPage />}      
      <BrandsPage />
      <TestimonialsPage />
      <BookingPage />
    </div>
  );
}