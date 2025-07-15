"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSiteSettings } from "../context/SiteSettingsContext";
import { usePathname } from "next/navigation";
import { Bold } from "lucide-react";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { siteSettings } = useSiteSettings();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.2) {
        setIsSticky(true);
        setIsScrolled(true);
      } else {
        setIsSticky(false);
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getLink = (path) => {
    if (!siteSettings?.practiceId) {
      return path;
    }

    return `/website/${siteSettings.practiceId}${path}`;
  };

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 flex justify-between items-center py-4 px-6 md:px-40 transition-all ${
        isSticky ? "bg-white shadow-lg text-black" : "bg-transparent text-white"
      }`}
    >
      <Link href={getLink("/")}>
        <Image
          src={
            isSticky
              ? (siteSettings.about.logo_dark || "https://s3.eu-west-2.amazonaws.com/ocumailuserdata/1689179837_67_logo_dark_wide.png")
              : (siteSettings.about.logo_light || "https://s3.eu-west-2.amazonaws.com/ocumailuserdata/1689179856_67_logo_light_wide.png")
          }
          alt="PracticeLogo"
          width={200}
          height={200}
          className="text-2xl font-bold"
        />
      </Link>

      <nav className="hidden md:flex gap-9 font-medium">
        <ul className="flex gap-8 items-center">
          <li>
            <Link href={getLink("/")} className="hover:text-primary">
              <b> HOME </b>
            </Link>
          </li>
          <li>
            <Link href={getLink("/#about")} className="hover:text-primary">
              <b>ABOUT</b>
            </Link>
          </li>
          <li>
            <Link href={getLink("/#services")} className="hover:text-primary">
              <b>SERVICES</b>
            </Link>
          </li>
          <li>
            <Link href={getLink("/#team")} className="hover:text-primary">
              <b>TEAM</b>
            </Link>
          </li>
          <li>
            <Link href={getLink("/#testimonials")} className="hover:text-primary">
              <b>FEEDBACK</b>
            </Link>
          </li>
          <li>
            <Link href={getLink("/info_centre")} className="hover:text-primary">
              <b>INFO CENTRE</b>
            </Link>
          </li>
          <li>
            <Link href={getLink("/blog")} className="hover:text-primary">
              <b>NEWS FEED</b>
            </Link>
          </li>
          {isSticky && (
            <li className="ml-4">
              <Link
                href={siteSettings?.booking_url || '#'}
                className="px-6 py-2 bg-primary text-white font-semibold rounded-md hover:bg-white hover:text-primary hover:border-primary border-2 border-transparent transition-all"
              >
                <b>MAKE A BOOKING</b>
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {/* Mobile Navbar */}
      <div className="md:hidden">
        <button
          className="text-3xl focus:outline-none"
          onClick={handleMenuToggle}
        >
          ☰
        </button>
      </div>

      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden absolute top-16 left-0 w-full bg-white shadow-lg z-10`}
      >
        <ul className="flex flex-col items-center gap-4 py-4 text-xl font-medium">
          <li>
            <Link
              href={getLink("/")}
              className={`hover:text-primary ${!isSticky ? "text-black" : ""}`}
              onClick={handleMenuToggle}
            >
              <b>HOME</b>
            </Link>
          </li>
          <li>
            <Link
              href={getLink("/#about")}
              className={`hover:text-primary ${!isSticky ? "text-black" : ""}`}
              onClick={handleMenuToggle}
            >
              <b>ABOUT</b>
            </Link>
          </li>
          <li>
            <Link
              href={getLink("/services")}
              className={`hover:text-primary ${!isSticky ? "text-black" : ""}`}
              onClick={handleMenuToggle}
            >
              <b>SERVICES</b>
            </Link>
          </li>
          <li>
            <Link
              href={getLink("/team")}
              className={`hover:text-primary ${!isSticky ? "text-black" : ""}`}
              onClick={handleMenuToggle}
            >
              <b>TEAM</b>
            </Link>
          </li>
          <li>
            <Link
              href={getLink("/testimonials")}
              className={`hover:text-primary ${!isSticky ? "text-black" : ""}`}
              onClick={handleMenuToggle}
            >
              <b>FEEDBACK</b>
            </Link>
          </li>
          <li>
            <Link
              href={getLink("/info_centre")}
              className={`hover:text-primary ${!isSticky ? "text-black" : ""}`}
              onClick={handleMenuToggle}
            >
              <b>INFO CENTRE</b>
            </Link>
          </li>
          <li>
            <Link
              href={getLink("/blog")}
              className={`hover:text-primary ${!isSticky ? "text-black" : ""}`}
              onClick={handleMenuToggle}
            >
              <b>NEWS FEED</b>
            </Link>
          </li>
          {isSticky && (
            <li className="mt-4">
              <Link
                href={siteSettings?.booking_url || '#'}
                className="px-6 py-2 bg-primary text-white font-semibold rounded-md hover:bg-white hover:text-primary hover:border-primary border-2 border-transparent transition-all"
                onClick={handleMenuToggle}
              >
                <b>MAKE A BOOKING</b>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
