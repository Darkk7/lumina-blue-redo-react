"use client"

import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const FooterPage = () => {
  return (
    <footer className="w-full py-8 bg-white">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Left aligned links */}
        <div className="text-blue-500">
          <a href="#privacy" className="hover:text-primary mx-2">Privacy</a> |
          <a href="#paia" className="hover:text-primary mx-2">PAIA</a> |
          <a href="#blogs" className="hover:text-primary mx-2">Blogs</a>
        </div>

        {/* Copyright text */}
        <div className="text-blue-500 text-md">
          © {new Date().getFullYear()}. All Rights Reserved.
        </div>

        {/* Right aligned social icons */}
        <div className="flex gap-4">
          <a
            href="https://www.facebook.com/profile.php?id=100076291605685"
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl text-primary hover:text-primary transition"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.instagram.com/nevada_cloud/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl text-primary hover:text-primary transition"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/company/nevada-cloud/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl text-primary hover:text-primary transition"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;
