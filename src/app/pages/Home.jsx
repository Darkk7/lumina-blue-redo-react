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
  const [customerData, setCustomerData] = useState({    
    bannerImage: "https://s3.eu-west-2.amazonaws.com/luminablue-blogs/1721909136_67_banner.png",
    secondaryColor: "var(--primary-color)",
    welcomeText: "Serving the community for over 80 years delivering the highest quality care and products for our customers",
    buttonText: "Make A Booking",
  });

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = mockData[customerCode];
        if (data) {
          setCustomerData(data);
        } else {
          console.error("Customer code not found in mock data");
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    if (customerCode) {
      fetchCustomerData();
    }
  }, [customerCode]);

  return (
    <div>
      {/* Home Page Section */}
      <div
        className="w-full h-[600px] bg-cover bg-center text-center text-white"
        style={{
          backgroundImage: `url(${customerData.bannerImage})`,
        }}
      >
        <div
          className="bg-black bg-opacity-50 h-full flex flex-col items-center justify-center p-4"
          style={{
            backgroundColor: customerData.primaryColor,
          }}
        >
          <p className="text-3xl mb-8">{customerData.welcomeText}</p>
          <button
            className="px-6 py-3 text-white font-semibold rounded-lg hover:bg-white hover:text-primary hover:border-orange-500 border-1 transition"
            style={{
              backgroundColor: customerData.secondaryColor,
            }}
          >
            <Link href="/#booking">{customerData.buttonText} </Link>
          </button>
        </div>
      </div>
      
      <CounterPage />
      <AboutPage />
      <ServicesPage />
      <ConnectWithUsPage />
      <TeamPage />
      <RecentBlogs />
      <BrandsPage />
      <TestimonialsPage /> 
      <BookingPage />   
    </div>
  );
}