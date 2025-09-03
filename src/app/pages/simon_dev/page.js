"use client"

import React from "react";
import Navbar from "../Navbar";
import SimonPage from "../SimonPage";
import FooterPage from "../FooterPage";
import { useEffect, useState } from 'react';
import Link from "next/link";

const SimonPg = () => {

  return (
    <div>
      <Navbar />
      <SimonPage />
      <FooterPage />
    </div>
  );
};

export default SimonPg;
