"use client"

import Image from "next/image";
import { useSiteSettings } from '../context/SiteSettingsContext';

const BrandsPage = () => {

  const { siteSettings } = useSiteSettings();

  return (
    <section id="brands" className="w-full bg-gray-100 py-16 px-4 sm:px-8 lg:px-16 text-center">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
        {siteSettings && siteSettings.brands && siteSettings.brands.filter(brand => brand.show).map(brand => (
            <BrandCard
              key={brand.id}
              image={brand.img}
              title={brand.name}
            />
          ))}
      </div>
    </section>
  );
};

const BrandCard = ({ image, title }) => (
  <div className="bg-white shadow-lg p-6 rounded-lg">
    <Image src={image} alt={title} layout="responsive" width={16} height={9} className="w-full h-auto mb-4" />
    <h3 className="text-2xl font-semibold text-primary mb-4">{title}</h3>
  </div>
);

export default BrandsPage;
