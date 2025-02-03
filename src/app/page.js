"use client"

import React, { useState } from "react";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import FooterPage from "./pages/FooterPage";

const App = () => {
  const [customerCode, setCustomerCode] = useState('');

  return (
    <div>
      <Navbar />
      <Home customerCode={customerCode} setCustomerCode={setCustomerCode} />
      <FooterPage />
    </div>
  );
};

export default App;