"use client";

import { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp, FaPinterest } from 'react-icons/fa';

const ConnectWithUsPage = ({ practiceId }) => {
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    instagram: "",
    linkedin: "",
    whatsapp: "",
    pinterest: ""
  });

  useEffect(() => {
    const fetchPracticeDetails = async () => {
      try {
        const response = await fetch('https://passport.nevadacloud.com/api/v1/practice', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjo3NSwic3ViIjo3NSwiZXhwIjoxNzQ1ODM0NTg2fQ.0dzAy88E2zP-Cxgy5t5uwbtm3hhLAFOTuPkdNSvN11U',
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        });

        const data = await response.json();

        if (Array.isArray(data)) {
          const practice = data.find(p => p.id === practiceId);
          
          if (practice) {
            setSocialLinks({
              facebook: practice.facebook_url || "",
              instagram: practice.instagram_url || "",
              linkedin: practice.linkedin_url || "",
              whatsapp: practice.whatsapp_tel || "",
              pinterest: practice.pinterest_url || ""
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch practice details:", error);
      }
    };

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
        {socialLinks.facebook && (
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl text-primary hover:text-primary transition"
          >
            <FaFacebook />
          </a>
        )}
        {socialLinks.instagram && (
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl text-primary hover:text-primary transition"
          >
            <FaInstagram />
          </a>
        )}
        {socialLinks.linkedin && (
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl text-primary hover:text-primary transition"
          >
            <FaLinkedin />
          </a>
        )}
        {socialLinks.whatsapp && (
          <a
            href={`https://wa.me/${socialLinks.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl text-primary hover:text-primary transition"
          >
            <FaWhatsapp />
          </a>
        )}
        {socialLinks.pinterest && (
          <a
            href={socialLinks.pinterest}
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
