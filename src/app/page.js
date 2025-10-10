"use client"

import React, { useState, useEffect } from "react";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import FooterPage from "./pages/FooterPage";
import InfoCentreListPage from "./pages/InfoCentreListPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Image from 'next/image';

const App = () => {
  const [customerCode, setCustomerCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {isLoading && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
          <div className="text-center">
            {/* Logo - Replace with your actual logo */}
            <div className="mb-6">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={120} 
                height={120} 
                className="mx-auto"
                priority
              />
            </div>
            
            {/* Loading spinner and text */}
            <div className="flex items-center justify-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
              <span className="text-gray-800 text-lg font-medium">Loading...</span>
            </div>
          </div>
        </div>
      )}
      
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home customerCode={customerCode} setCustomerCode={setCustomerCode} />} />
          <Route path="/:practiceId/info_centre" element={<InfoCentreListPage />} />
        </Routes>
        <FooterPage />
      </div>
    </Router>
  );
};

export default App;