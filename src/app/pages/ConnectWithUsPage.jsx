"use client"

import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const ConnectWithUsPage = () => {
  return (
    <section className="relative w-full bg-cover bg-center py-16 text-center" style={{ backgroundImage: "url('/images/FramesBG.png')" }}>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      
      <h2 className="text-4xl font-bold mb-8 text-white relative z-10">Connect With Us</h2>
      <p className="text-1xl mb-8 text-white relative z-10">Immerse yourself in our vibrant online community by following us on platforms such as Facebook, Instagram, LinkedIn, and more.</p>
      <div className="flex justify-center gap-8 relative z-10">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl text-primary hover:text-primary transition"
        >
          <FaFacebook />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl text-primary hover:text-primary transition"
        >
          <FaInstagram />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl text-primary hover:text-primary transition"
        >
          <FaLinkedin />
        </a>
      </div>
    </section>
  );
};

export default ConnectWithUsPage;
