"use client"

import React from "react";
import Navbar from "../../Navbar";
import BlogList from "../../BlogList";
import FooterPage from "../../FooterPage";
import { useEffect, useState } from 'react';
import Link from "next/link";

const BlogListItem = () => {

  return (
    <div>
      <Navbar />
      <BlogList />
      <FooterPage />
    </div>
  );
};

export default BlogListItem;
