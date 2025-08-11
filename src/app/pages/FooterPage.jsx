"use client";

import { FaFacebook, FaInstagram, FaLinkedin, FaPinterest, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import { useSiteSettings } from "../context/SiteSettingsContext";
import Link from 'next/link';

const FooterPage = () => {
  const { siteSettings } = useSiteSettings();

  return (
    <footer className="w-full py-12" style={{ backgroundColor: "#363636" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo with text */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img src={siteSettings.about.logo_light} alt="Logo" className="h-12 w-auto" />
            </div>
            <p className="text-white">
            Stay connected to our practice via our social platforms.
            </p>
            <div className="flex space-x-4">
              {siteSettings.facebook_url && (
                <a href={siteSettings.facebook_url} className="text-white hover:text-primary">
                  <FaFacebook className="h-6 w-6" />
                </a>
              )}
              {siteSettings.instagram_url && (
                <a href={siteSettings.instagram_url} className="text-white hover:text-primary">
                  <FaInstagram className="h-6 w-6" />
                </a>
              )}
              {siteSettings.linkedin_url && (
                <a href={siteSettings.linkedin_url} className="text-white hover:text-primary">
                  <FaLinkedin className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href={`${siteSettings.practiceId}`} className="text-white hover:text-primary">Home</Link></li>
              <li><Link href="/#about" className="text-white hover:text-primary">About</Link></li>
              <li><Link href="/#services" className="text-white hover:text-primary">Services</Link></li>
              <li><Link href="/#team" className="text-white hover:text-primary">Team</Link></li>
              <li><Link href="/#testimonials" className="text-white hover:text-primary">Feedback</Link></li>
            </ul>
          </div>

          {/* Column 3: Latest Blog Posts */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Blog Posts</h3>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-2">
                <a href="#" className="text-white hover:text-primary">
                  <p className="font-medium">Understanding Different Types of Lenses</p>
                  <p className="text-sm text-white">June 15, 2023</p>
                </a>
              </div>
              <div>
                <a href="#" className="text-white hover:text-primary">
                  <p className="font-medium">How Often Should You Get an Eye Exam?</p>
                  <p className="text-sm text-white">May 28, 2023</p>
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Get In Touch */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Get In Touch</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <FaMapMarkerAlt className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                <p className="text-white">{siteSettings.address_1}</p>
              </div>
              <div className="flex items-center">
                <FaPhone className="h-5 w-5 text-primary mr-3" />
                <a href={`tel:${siteSettings.tel}`} className="text-white hover:text-primary">{siteSettings.tel}</a>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="h-5 w-5 text-primary mr-3" />
                <a href={`mailto:${siteSettings.email}`} className="text-white hover:text-primary">{siteSettings.email}</a>
              </div>              
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white text-sm">
              &copy; {new Date().getFullYear()}. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#privacy" className="text-white hover:text-primary text-sm">Privacy Policy</a>
              <a href="#paia" className="text-white hover:text-primary text-sm">PAIA Policy</a>
              <a href="#news" className="text-white hover:text-primary text-sm">News Feed</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;