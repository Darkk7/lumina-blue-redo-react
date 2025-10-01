"use client"

import React, { useState } from "react";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import FooterPage from "./pages/FooterPage";
import InfoCentreListPage from "./pages/InfoCentreListPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  const [customerCode, setCustomerCode] = useState('');

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home customerCode={customerCode} setCustomerCode={setCustomerCode} />} />
        <Route path="/:practiceId/info_centre" element={<InfoCentreListPage />} />
      </Routes>
      <FooterPage />
    </Router>
  );
};

export default App;