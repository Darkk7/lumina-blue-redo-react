"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSiteSettings } from "../context/SiteSettingsContext";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [licenseType, setLicenseType] = useState(null); // NEW
  const { siteSettings } = useSiteSettings();
  const pathname = usePathname();

  // Fetch license info
  useEffect(() => {
    async function fetchLicense() {
      if (!siteSettings?.practiceId) return;

      try {
        const res = await fetch(`/api/website/${siteSettings.practiceId}/check_licence`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        setLicenseType(data.product_type || null);
      } catch (err) {
        console.error("License fetch error:", err);
      }
    }

    fetchLicense();
  }, [siteSettings?.practiceId]);

  // Scroll handling
useEffect(() => {
  const handleScroll = () => {
    // If menu is open on mobile, keep sticky and ignore scroll
    if (isMenuOpen) {
      setIsSticky(true);
      setIsScrolled(true);
      return;
    }

    // Otherwise, sticky depends on scroll position
    if (window.scrollY > window.innerHeight * 0.2) {
      setIsSticky(true);
      setIsScrolled(true);
    } else {
      setIsSticky(false);
      setIsScrolled(false);
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, [isMenuOpen]);

// Menu toggle
const handleMenuToggle = () => {
  setIsMenuOpen(prev => {
    const menuState = !prev;

    if (menuState) {
      // Menu opened =>always sticky
      setIsSticky(true);
    } else {
      //Depends on position
      setIsSticky(window.scrollY > window.innerHeight * 0.2);
    }

    return menuState;
  });
};

 

  const getLink = (path) => {
    if (!siteSettings?.practiceId) return path;
    return `/website/${siteSettings.practiceId}${path}`;
  };

  // Decide whether to show NEWS FEED
  const showNewsFeed = licenseType !== "Comprehensive";

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 flex justify-between items-center py-4 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 transition-all ${
        isSticky ? "bg-white shadow-lg text-black" : "bg-transparent text-white"
      }`}
    >
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <Link href={getLink("/")} className="flex-shrink-0">
          <Image
            src={
              isSticky || isMenuOpen
                ? siteSettings.about.logo_dark ||
                  "https://s3.eu-west-2.amazonaws.com/ocumailuserdata/1689179837_67_logo_dark_wide.png"
                : siteSettings.about.logo_light ||
                  "https://s3.eu-west-2.amazonaws.com/ocumailuserdata/1689179856_67_logo_light_wide.png"
            }
            alt="PracticeLogo"
            width={160}
            height={45}
            className="h-auto max-h-12 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
<nav className="hidden navfix1:flex items-center font-medium ml-2 sm:ml-4 md:ml-6 lg:ml-8">
        <ul className="flex items-center 
        space-x-4 
        lg:space-x-1 lg:text-sm 
        navfix2:space-x-4 navfix2:text-base"
        >


            <li>
              <Link href={getLink("/")} className="hover:text-primary whitespace-nowrap px-2">
                <b>HOME</b>
              </Link>
            </li>
            <li>
              <Link href={getLink("/#about")} className="hover:text-primary whitespace-nowrap px-2">
                <b>ABOUT</b>
              </Link>
            </li>
            <li>
              <Link href={getLink("/#services")} className="hover:text-primary whitespace-nowrap px-2">
                <b>SERVICES</b>
              </Link>
            </li>
            <li>
              <Link href={getLink("/#team")} className="hover:text-primary whitespace-nowrap px-2">
                <b>TEAM</b>
              </Link>
            </li>
            <li>
              <Link href={getLink("/#testimonials")} className="hover:text-primary whitespace-nowrap px-2">
                <b>FEEDBACK</b>
              </Link>
            </li>
            <li>
              <Link href={getLink("/info_centre")} className="hover:text-primary whitespace-nowrap px-2">
                <b>INFO CENTRE</b>
              </Link>
            </li>

            {showNewsFeed && (
              <li>
                <Link href={getLink("/blog")} className="hover:text-primary whitespace-nowrap px-2">
                  <b>NEWS FEED</b>
                </Link>
              </li>
            )}
          </ul>

          {isSticky && (
            <div className="ml-4">
              <Link
                href={siteSettings?.booking_url || "#booking"}
                className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-white hover:text-primary hover:border-primary border-2 border-transparent transition-all whitespace-nowrap"
              >
                MAKE A BOOKING
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="navfix1:hidden">
          <button className="text-3xl focus:outline-none" onClick={handleMenuToggle} aria-label="Toggle menu">
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-white z-40 mt-16 overflow-y-auto transition-all duration-300 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <ul className="flex flex-col space-y-6 text-lg font-medium items-center">
            <li>
              <Link href={getLink("/")} className="block py-2 hover:text-primary " onClick={handleMenuToggle}>
                <b>HOME</b>
              </Link>
            </li>
            <li>
              <Link href={getLink("/#about")} className="block py-2 hover:text-primary " onClick={handleMenuToggle}>
                <b>ABOUT</b>
              </Link>
            </li>
            <li>
              <Link href={getLink("/#services")} className="block py-2 hover:text-primary" onClick={handleMenuToggle}>
                <b>SERVICES</b>
              </Link>
            </li>
            <li>
              <Link href={getLink("/#team")} className="block py-2 hover:text-primary" onClick={handleMenuToggle}>
                <b>TEAM</b>
              </Link>
            </li>
            <li>
              <Link href={getLink("/#testimonials")} className="block py-2 hover:text-primary" onClick={handleMenuToggle}>
                <b>FEEDBACK</b>
              </Link>
            </li>
            <li>
              <Link href={getLink("/info_centre")} className="block py-2 hover:text-primary" onClick={handleMenuToggle}>
                <b>INFO CENTRE</b>
              </Link>
            </li>

            {showNewsFeed && (
              <li>
                <Link href={getLink("/blog")} className="block py-2 hover:text-primary" onClick={handleMenuToggle}>
                  <b>NEWS FEED</b>
                </Link>
              </li>
            )}

            {isSticky && (
              <li className="mt-6">
                <Link
                  href={siteSettings?.booking_url || "#"}
                  className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-white hover:text-primary hover:border-primary border-2 border-transparent transition-all"
                  onClick={handleMenuToggle}
                >
                  <b>MAKE A BOOKING</b>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
