"use client";

import { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp, FaPinterest } from 'react-icons/fa';
import { useSiteSettings } from "../context/SiteSettingsContext";

const ConnectWithUsPage = ({ practiceId }) => {
  const { siteSettings } = useSiteSettings();
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    instagram: "",
    linkedin: "",
    whatsapp: "",
    pinterest: ""
  });

  useEffect(() => {
    if (practiceId) {
      fetchPracticeDetails();
    }
  }, [practiceId]);

  return (
    <section
      className="relative w-full bg-cover bg-center py-16 text-center"
      style={{ backgroundImage: "url('/images/FramesBG.png')" }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      <h2 className="text-4xl font-bold mb-8 text-white relative z-10">
        Connect With Us
      </h2>
      <p className="text-1xl mb-8 text-white relative z-10">
        Immerse yourself in our vibrant online community by following us on platforms such as Facebook, Instagram, LinkedIn, WhatsApp, Pinterest, and more.
      </p>
      <div className="flex justify-center gap-8 relative z-10">
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

      </div>
    </section>
  );
};

export default ConnectWithUsPage;
