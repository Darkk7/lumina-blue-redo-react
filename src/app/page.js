"use client"

import React from "react";
import Navbar from "./pages/Navbar";
import HomePage from "./pages/HomePage";
import CounterPage from "./pages/CounterPage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ConnectWithUsPage from "./pages/ConnectWithUsPage";
import TeamPage from "./pages/TeamPage";
import BrandsPage from "./pages/BrandsPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import FooterPage from "./pages/FooterPage";
import { useEffect, useState } from 'react';

const App = () => {

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [primaryColor, setPrimaryColor] = useState('orange');
  const [address, setAddress] = useState('');
  const [currentTeamMember, setCurrentTeamMember] = useState(0);

  return (
    <div>
      <Navbar />
      <HomePage />
      <CounterPage />
      <AboutPage />
      <ServicesPage />
      <ConnectWithUsPage />
      <TeamPage />
      <BrandsPage />
      <TestimonialsPage />
      <FooterPage />
    </div>
  );
};

export default App;
