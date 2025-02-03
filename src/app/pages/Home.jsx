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
import BrandsPage from "./BrandsPage";
import TestimonialsPage from "./TestimonialsPage";
import ConnectWithUsPage from "./ConnectWithUsPage";

// Mock data for testing
const mockData = {
  A018: {
    bannerImage: "https://example.com/banner-a018.png",
    primaryColor: "#FF5733",
    secondaryColor: "#33FF57",
    welcomeText: "Welcome to A018's Practice!",
    buttonText: "Book Now",
  },
  TOM001: {
    bannerImage: "https://example.com/banner-tom001.png",
    primaryColor: "#0000FF",
    secondaryColor: "#FFC300",
    welcomeText: "Welcome to TOM001's Practice!",
    buttonText: "Schedule Appointment",
  },
  R003: {
    bannerImage: "https://example.com/banner-r003.png",
    primaryColor: "#900C3F",
    secondaryColor: "#DAF7A6",
    welcomeText: "Welcome to R003's Practice!",
    buttonText: "Reserve Your Spot",
  },
  R004: {
    bannerImage: "https://example.com/banner-r004.png",
    primaryColor: "#581845",
    secondaryColor: "#FF5733",
    welcomeText: "Welcome to R004's Practice!",
    buttonText: "Get Started",
  },
};

export default function HomePage({ customerCode }) {
  const [customerData, setCustomerData] = useState({
    bannerImage: "https://s3.eu-west-2.amazonaws.com/luminablue-blogs/1721909136_67_banner.png",
    secondaryColor: "#e58825",
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
      <BrandsPage />
      <TestimonialsPage />      
    </div>
  );
}