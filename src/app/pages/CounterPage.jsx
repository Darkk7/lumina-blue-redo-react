"use client";

import Image from "next/image";
import { useEffect } from 'react';
import { useSiteSettings } from '../context/SiteSettingsContext';

const Counter = ({ image, count, label }) => (
  <div className="flex flex-col items-center">
    <div className="flex items-center justify-center h-20">
      <Image src={image} alt={label} width={50} height={50} className="mb-4" />
    </div>
    <p className="text-4xl font-bold text-primary">{count}</p>
    <p className="text-md text-black">
      <i>{label}</i>
    </p>
  </div>
);

const CounterPage = () => {
  const { siteSettings } = useSiteSettings();
  const { counterSettings } = siteSettings;
  const { brands, frames, customers, experience } = counterSettings;

  return (
    <section className="w-full bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <Counter
            image="/images/BrandsIcon.svg"
            count={brands}
            label="Brands"
          />
          <Counter
            image="/images/FramesIcon.svg"
            count={frames}
            label="Frame Stock"
          />
          <Counter
            image="/images/HappyCustomers.svg"
            count={customers}
            label="Happy Customers"
          />
          <Counter
            image="/images/Experience.svg"
            count={experience}
            label="Years Experience"
          />
        </div>
      </div>
    </section>
  );
};

export default CounterPage;
