"use client"

import React, { useState } from "react";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import CounterPage from "./pages/CounterPage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ConnectWithUsPage from "./pages/ConnectWithUsPage";
import TeamPage from "./pages/TeamPage";
import BrandsPage from "./pages/BrandsPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import FooterPage from "./pages/FooterPage";

const App = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [primaryColor, setPrimaryColor] = useState('orange');
  const [address, setAddress] = useState('');
  const [currentTeamMember, setCurrentTeamMember] = useState(0);
  const [showCounterPanel, setShowCounterPanel] = useState(true);
  const [showTeamPanel, setShowTeamPanel] = useState(true);
  const [customerCode, setCustomerCode] = useState(''); // Add this line

  const renderCounterPanel = () => {
    if (showCounterPanel) {
      return <CounterPage />;
    }
    return null;
  }

  const renderTeamPanel = () => {
    if (showTeamPanel) {
      return <TeamPage />;
    }
    return null;
  }

  return (
    <div>
      
      <Navbar />
      <Home customerCode={customerCode} setCustomerCode={setCustomerCode} />
      <FooterPage />

    </div>
  );
};

export default App;
