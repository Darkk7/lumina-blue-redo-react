"use client"

import Image from 'next/image';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`w-full fixed top-0 left-0 z-10 flex justify-between items-center py-4 px-40 transition-all ${
        isSticky ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <Image
        src={isScrolled ? "/images/IMAGEEYECAREWHITEBACKGROUND.png" : "/images/IMAGEEYECARELOGOTOPLEFT.png"}
        alt="PracticeLogo"
        width={200}
        height={200}
        className="text-2xl font-bold"
      />
      <nav className="flex gap-8 text-xl font-medium">
        <a
          href="#home"
          className={`hover:text-primary ${isScrolled ? 'text-black' : 'text-white'}`}
        >
          Home
        </a>
        <a
          href="#about"
          className={`hover:text-primary ${isScrolled ? 'text-black' : 'text-white'}`}
        >
          About
        </a>
        <a
          href="#services"
          className={`hover:text-primary ${isScrolled ? 'text-black' : 'text-white'}`}
        >
          Services
        </a>
        <a
          href="#team"
          className={`hover:text-primary ${isScrolled ? 'text-black' : 'text-white'}`}
        >
          Team
        </a>
        <a
          href="#testimonials"
          className={`hover:text-primary ${isScrolled ? 'text-black' : 'text-white'}`}
        >
          Feedback
        </a>
        <a
          href="#"
          className={`hover:text-primary ${isScrolled ? 'text-black' : 'text-white'}`}
        >
          Info Centre
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
