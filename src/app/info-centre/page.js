"use client"

import React from "react";
import { useEffect, useState } from 'react';
import Link from "next/link";

const InfoCentreHome = () => {

  return (
    <div>
      <h1> Hello World </h1>

      <Link href="/info-centre/item"> Go To Item </Link>
    </div>
  );
};

export default InfoCentreHome;
