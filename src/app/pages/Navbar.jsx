"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

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

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full fixed top-0 left-0 z-10 flex justify-between items-center py-4 px-40 transition-all ${
        isSticky ? "bg-white shadow-lg text-black" : "bg-transparent"
      }`}
    >
      <Image
        src={
          isScrolled
            ? "/images/IMAGEEYECAREWHITEBACKGROUND.png"
            : "/images/IMAGEEYECARELOGOTOPLEFT.png"
        }
        alt="PracticeLogo"
        width={200}
        height={200}
        className="text-2xl font-bold"
      />
      <nav className="flex gap-8 text-xl font-medium">
        <ul className="flex gap-4">
          <li>
            <Link href="/" className="hover:text-primary">Home</Link>
          </li>          
          <li>
            <Link href="/#about" className="hover:text-primary">About</Link>
          </li>
          <li>
            <Link href="/services" className="hover:text-primary">Services</Link>
          </li>          
          <li>
            <Link href="/team" className="hover:text-primary">Team</Link>
          </li>          
          <li>
            <Link href="/testimonials" className="hover:text-primary">Feedback</Link>
          </li>
          <li>
            <Link href="/pages/info-centre" className="hover:text-primary">Info Centre</Link>
          </li>
          <li>
            <Link href="/pages/info-centre" className="hover:text-primary">News Feed</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
