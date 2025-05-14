"use client";

import { FaFacebook, FaInstagram, FaLinkedin, FaPinterest, FaWhatsapp } from 'react-icons/fa';
import { useSiteSettings } from "../context/SiteSettingsContext";

const FooterPage = () => {
  const { siteSettings } = useSiteSettings();

  return (
    <footer className="w-full py-8 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto px-4 md:px-0">
        {/* Left aligned links */}
        <div className="text-blue-500 mb-4 md:mb-0">
          <a href="#privacy" className="hover:text-primary mx-2">Privacy</a> |
          <a href="#paia" className="hover:text-primary mx-2">PAIA</a> |
          <a href="#blogs" className="hover:text-primary mx-2">News Feed</a>
        </div>

        {/* Copyright text */}
        <div className="text-blue-500 text-md mb-4 md:mb-0 text-center">
          {new Date().getFullYear()}. All Rights Reserved.
        </div>

        {/* Right aligned social icons */}
        <div className="flex gap-4">
          {typeof siteSettings.facebook_url === 'string' && siteSettings.facebook_url.trim() !== "" && (
            <a
              href={siteSettings.facebook_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-4xl text-primary hover:text-primary transition"
            >
              <FaFacebook />
            </a>
          )}
          {typeof siteSettings.instagram_url === 'string' && siteSettings.instagram_url.trim() !== "" && (
            <a
              href={siteSettings.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-4xl text-primary hover:text-primary transition"
            >
              <FaInstagram />
            </a>
          )}
          {typeof siteSettings.linkedin_url === 'string' && siteSettings.linkedin_url.trim() !== "" && (
            <a
              href={siteSettings.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-4xl text-primary hover:text-primary transition"
            >
              <FaLinkedin />
            </a>
          )}
          {typeof siteSettings.whatsapp_url === 'string' && siteSettings.whatsapp_url.trim() !== "" && (
            <a
              href={siteSettings.whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-4xl text-primary hover:text-primary transition"
            >
              <FaWhatsapp />
            </a>
          )}
          {typeof siteSettings.pinterest_url === 'string' && siteSettings.pinterest_url.trim() !== "" && (
            <a
              href={siteSettings.pinterest_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-4xl text-primary hover:text-primary transition"
            >
              <FaPinterest />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;
