"use client"

import React from "react";
import Navbar from "../../pages/Navbar";
import InfoCentreHomePage from "../../pages/InfoCentreHomePage";
import FooterPage from "../../pages/FooterPage";
import { useEffect, useState } from 'react';
import Link from "next/link";

const InfoCentreHome = () => {

  return (
    <div>
      <Navbar />
      <InfoCentreHomePage />
      <FooterPage />
    </div>
  );
};

export default InfoCentreHome;
