"use client"

import React from "react";
import Navbar from "../../pages/Navbar";
import BlogHomePage from "../../pages/BlogHomePage";
import FooterPage from "../../pages/FooterPage";
import { useEffect, useState } from 'react';
import Link from "next/link";
import InfoCentreHomePage from "../InfoCentreHomePage";

const BlogHome = () => {

  return (
    <div>
      <Navbar />
      <BlogHomePage />
      <FooterPage />
    </div>
  );
};

export default BlogHome;
