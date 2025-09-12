"use client";

import { useEffect, useState, useRef } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp, FaPinterest, FaTiktok, FaGoogle } from 'react-icons/fa';
import { useSiteSettings } from "../context/SiteSettingsContext";

const ConnectWithUsPage = ({ practiceId }) => {
  const { siteSettings } = useSiteSettings();
  const [offsetY, setOffsetY] = useState(0);
  const animationFrameId = useRef();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (animationFrameId.current) {
        window.cancelAnimationFrame(animationFrameId.current);
      }
      
      animationFrameId.current = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        if (Math.abs(currentScrollY - lastScrollY.current) > 3) {
          setOffsetY(currentScrollY * 0.2); // Slower parallax effect (0.2 multiplier)
          lastScrollY.current = currentScrollY;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId.current) {
        window.cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden py-16 text-center">
      {/* Background with Parallax Effect */}
      <div className="absolute inset-0 w-full h-full">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url('/images/FramesBG.png')",
            backgroundSize: 'cover',
            backgroundPosition: `center ${-offsetY}px`,
            backgroundRepeat: 'no-repeat',
            willChange: 'transform',
            transform: `translate3d(0, 0, 0)` // Force hardware acceleration
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
      </div>

      <h2 className="text-4xl font-bold mb-8 text-white relative z-10 pt-8">
        Connect With Us
      </h2>
      <p className="mb-8 text-white relative z-10 px-4">
        Immerse yourself in our vibrant online community by following us on platforms such as Facebook, Instagram, LinkedIn, WhatsApp, Pinterest, and more.
      </p>
      <div className="flex flex-wrap justify-center gap-8 relative z-10 pb-8 px-4">
      {siteSettings.facebook_url && siteSettings.facebook_url.trim() !== "" && (
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

      {typeof siteSettings.whatsapp_tel === 'string' && siteSettings.whatsapp_tel.trim() !== "" && (
        <a
          href={siteSettings.whatsapp_tel}
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

      {typeof siteSettings.tiktok_url === 'string' && siteSettings.tiktok_url.trim() !== "" && (
        <a
          href={siteSettings.tiktok_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl text-primary hover:text-primary transition"
        >
          <FaTiktok />
        </a>
      )}

      {typeof siteSettings.google_business_profile_url === 'string' && siteSettings.google_business_profile_url.trim() !== "" && (
        <a
          href={siteSettings.google_business_profile_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl text-primary hover:text-primary transition"
        >
          <FaGoogle />
        </a>
      )}
      </div>
    </section>
  );
};

export default ConnectWithUsPage;
