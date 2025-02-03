"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../Navbar";
import FooterPage from "../../FooterPage";
import { useMediaQuery } from '@mui/material';

const InfoCentrePageHotLinks = () => {
  const [isBottom, setIsBottom] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const isMobile = useMediaQuery('(max-width:768px)');

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

      {/* Cards Section */}
      {!isMobile && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-8 text-black">
          {tabLinks.map((link, index) => (
            <div key={index} className="w-full">
              <div onClick={() => toggleSubLinks(index)} className="cursor-pointer">
                <div className="w-full h-14 flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md text-center hover:bg-gradient-to-b hover:from-orange-400 hover:to-orange-500 transition duration-300">
                  <div className="text-xs font-semibold">{link.text}</div>
                </div>
              </div>
              {/* Sub-links Section */}
              {openIndex === index && link.subLinks.length > 0 && (
                <div className="pl-4 pt-2 space-y-2 max-h-28 overflow-y-auto">
                  {link.subLinks.map((subLink, subIndex) => (
                    <Link key={subIndex} href={subLink.href}>
                      <div className="w-full h-8 flex items-center justify-start p-4 bg-gray-200 rounded-lg shadow-md text-left hover:bg-gradient-to-b hover:from-orange-200 hover:to-orange-300 transition duration-300">
                        <div className="text-xs font-medium">{subLink.text}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* A4 Size Page Section */}
      <div className="w-full bg-gray-100 flex justify-center p-8 text-black">
      <div className="w-full max-w-[21cm] h-[29.7cm] bg-white shadow-md p-8 overflow-hidden flex flex-col gap-6">
        
        <h1 className="text-2xl font-bold text-center">Understanding Myopia</h1>

        {/* Section: What is Myopia */}
        <div>
          <h2 className="text-xl font-semibold">What is Myopia?</h2>
          <p className="text-sm">
            Myopia, commonly known as near-sightedness, is a refractive error where distant objects appear blurry while close objects can be seen clearly. 
            This occurs when light entering the eye focuses in front of the retina instead of directly on it. 
            The term "myopia" is derived from the Greek word "muopia," meaning "to close the eyes."
          </p>
          <img src="myopia-diagram.jpg" alt="Diagram illustrating myopia" className="w-full h-32 object-cover mt-2" />
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Learn More</button>
        </div>

        {/* Section: Signs and Symptoms */}
        <div>
          <h2 className="text-xl font-semibold">Signs and Symptoms</h2>
          <p className="text-sm">
            The primary symptom of myopia is blurred distance vision. In children, this often becomes evident when they struggle to read the classroom board 
            or recognize distant objects. Adults may notice difficulty driving, especially at night. Other symptoms can include eye strain and headaches.
          </p>
          <img src="child-squinting.jpg" alt="Child squinting to see distant object" className="w-full h-32 object-cover mt-2" />
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Learn More</button>
        </div>

        {/* Section: Detection and Prevention */}
        <div>
          <h2 className="text-xl font-semibold">Detection and Prevention</h2>
          <p className="text-sm">
            Myopia is typically detected through comprehensive eye examinations, which may include visual acuity tests, retinoscopy, and autorefraction. 
            While there is no universally accepted method to prevent myopia, managing near-point visual stress—such as taking regular breaks during close work—may help.
          </p>
          <img src="eye-exam.jpg" alt="Optometrist performing an eye examination" className="w-full h-32 object-cover mt-2" />
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Learn More</button>
        </div>

        {/* Section: Treatment Options */}
        <div>
          <h2 className="text-xl font-semibold">Treatment Options</h2>
          <p className="text-sm">
            The most common treatments for myopia include prescription glasses and contact lenses. Refractive surgeries, such as LASIK, are available for 
            those seeking a permanent solution. Additionally, orthokeratology (Ortho-K) involves wearing specially designed contact lenses overnight to temporarily reshape the cornea.
          </p>
          <img src="glasses.jpg" alt="Various types of corrective lenses" className="w-full h-32 object-cover mt-2" />
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Learn More</button>
        </div>

        {/* Section: Managing Myopia Progression */}
        <div>
          <h2 className="text-xl font-semibold">Managing Myopia Progression</h2>
          <p className="text-sm">
            Specialized spectacle lenses, such as MiYOSMART, use innovative technology to not only correct vision but also manage myopia progression. 
            These lenses provide clear vision while addressing the factors that contribute to the worsening of myopia.
          </p>
          <img src="miyosmart-lenses.jpg" alt="MiYOSMART spectacle lenses" className="w-full h-32 object-cover mt-2" />
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Learn More</button>
        </div>

      </div>
    </div>

    

      {/* Mobile Hot Links Section */}
      {isMobile && (
        <div className="grid grid-cols-1 gap-4 p-8 text-black">
          {tabLinks.map((link, index) => (
            <div key={index} className="w-full">
              <div onClick={() => toggleSubLinks(index)} className="cursor-pointer">
                <div className="w-full h-14 flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md text-center hover:bg-gradient-to-b hover:from-orange-400 hover:to-orange-500 transition duration-300">
                  <div className="text-xs font-semibold">{link.text}</div>
                </div>
              </div>
              {/* Sub-links Section */}
              {openIndex === index && link.subLinks.length > 0 && (
                <div className="pl-4 pt-2 space-y-2 max-h-28 overflow-y-auto">
                  {link.subLinks.map((subLink, subIndex) => (
                    <Link key={subIndex} href={subLink.href}>
                      <div className="w-full h-8 flex items-center justify-start p-4 bg-gray-200 rounded-lg shadow-md text-left hover:bg-gradient-to-b hover:from-orange-200 hover:to-orange-300 transition duration-300">
                        <div className="text-xs font-medium">{subLink.text}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <FooterPage />
    </div>

  );

};

export default InfoCentrePageHotLinks;