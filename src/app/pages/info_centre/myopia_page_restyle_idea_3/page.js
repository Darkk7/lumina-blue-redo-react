"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../Navbar";
import FooterPage from "../../FooterPage";
import { useMediaQuery } from '@mui/material';

const InfoCentrePageSidebar = () => {
  const [isBottom, setIsBottom] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const isMobile = useMediaQuery('(max-width:768px)');
  const isTablet = useMediaQuery('(max-width:1024px)');

  const tabLinks = [
    { 
      href: "/pages/info_centre", 
      text: "Info Centre", 
      subLinks: [
        { href: "/pages/info_centre_1", text: "Overview" },
        { href: "/pages/info_centre_2", text: "Resources" }
      ]
    },
    { 
      href: "/refractive-conditions", 
      text: "Refractive Conditions", 
      subLinks: [
        { href: "/refractive_conditions_1", text: "Myopia" },
        { href: "/refractive_conditions_2", text: "Hyperopia" },
        { href: "/refractive_conditions_3", text: "Astigmatism" },
        { href: "/refractive_conditions_4", text: "Presbyopia" },
        { href: "/refractive_conditions_5", text: "Emmetropia" },
        { href: "/refractive_conditions_6", text: "Anisometropia" },
        { href: "/refractive_conditions_7", text: "Amblyopia" },
        { href: "/refractive_conditions_8", text: "Cataracts" },
        { href: "/refractive_conditions_9", text: "Glaucoma" },
        { href: "/refractive_conditions_10", text: "Keratoconus" }
      ]
    },
    { href: "/rx-lens-options", text: "Rx Lens Options", subLinks: [] },
    { href: "/contact-lenses", text: "Contact Lenses", subLinks: [] },
    { href: "/cooper-vision", text: "Cooper Vision", subLinks: [] },
    { href: "/pharmaceuticals", text: "Pharmaceuticals", subLinks: [] },
    { 
      href: "/external-lid-pathology", 
      text: "External & Lid Pathology", 
      subLinks: [
        { href: "/external_lid_pathology_1", text: "Blepharitis" },
        { href: "/external_lid_pathology_2", text: "Stye" }
      ]
    },
    { 
      href: "/anterior-corneal-pathology", 
      text: "Anterior & Corneal Pathology", 
      subLinks: [
        { href: "/anterior_corneal_pathology_1", text: "Keratitis" },
        { href: "/anterior_corneal_pathology_2", text: "Corneal Ulcers" }
      ]
    },
    { href: "/posterior-retinal-pathology", text: "Posterior & Retinal Pathology", subLinks: [] },
    { href: "/general-eyecare", text: "General Eyecare", subLinks: [] },
  ];

  const handleScroll = () => {
    const isAtBottom =
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.scrollHeight;
    setIsBottom(isAtBottom);
  };

  const toggleSubLinks = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-white">
      <Navbar />

      {/* Background Image Section */}
      <div className="w-full h-[300px] md:h-[600px] bg-[url('https://www.imageeyecareoptometrists.com/assets/info_centre_banner-4940284541b3ff321b2a3d735fc5ef1caa0f4c66de9804905118656edf31c88d.jpg')] bg-cover bg-center text-center text-white">
        <div className="bg-black bg-opacity-50 h-full flex flex-col items-center justify-center p-4">
          <p className="text-3xl md:text-6xl mb-4 md:mb-8">Short-Sightedness</p>
        </div>
      </div>

      {/* Page Content */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="md:w-64 w-full h-[calc(100vh-100px)] overflow-y-auto bg-gray-200 p-4 mb-8 md:mb-0">
          <div className="text-lg font-semibold mb-6 text-black">Info Centre</div>
          <div className="space-y-4">
            {tabLinks.map((link, index) => (
              <div key={index}>
                <div
                  onClick={() => toggleSubLinks(index)}
                  className="cursor-pointer p-2 rounded-md bg-gray-200 hover:bg-gray-300"
                >
                  <div className="text-sm text-black">{link.text}</div>
                </div>
                {openIndex === index && link.subLinks.length > 0 && (
                  <div className="pl-4 pt-2 space-y-2">
                    {link.subLinks.map((subLink, subIndex) => (
                      <Link key={subIndex} href={subLink.href}>
                        <div className="p-2 text-xs bg-gray-100 rounded-md hover:bg-gray-200 text-black">
                          {subLink.text}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8 bg-gray-100 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-6 text-black">Understanding Myopia</h1>
          <p>
            {/* Your main content goes here */}
            This is where the main content related to Myopia would be displayed. You can add multiple sections or information related to your topic.
          </p>
        </div>
      </div>

      <FooterPage />
    </div>
  );
};

export default InfoCentrePageSidebar;
