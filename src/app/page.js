"use client"

import React, { useState } from "react";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import FooterPage from "./pages/FooterPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InfoCentre from './website/67/info_centre/InfoCentre';

const App = () => {
  const [customerCode, setCustomerCode] = useState('');

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home customerCode={customerCode} setCustomerCode={setCustomerCode} />} />
        <Route path="/website/:practiceId/info_centre" element={<InfoCentre />} />
      </Routes>
      <FooterPage />
    </Router>
  );
};

export default App;