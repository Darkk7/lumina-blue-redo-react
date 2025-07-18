"use client"

import Image from "next/image";
import { useSiteSettings } from '../context/SiteSettingsContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BrandsPage = () => {
  const { siteSettings } = useSiteSettings();

  if (!siteSettings || !siteSettings.brands || siteSettings.brands.length === 0) {
    return (

      <section id="brands" className="w-full bg-gray-100 py-16 px-4 sm:px-8 lg:px-16 text-center">
        <p>Loading...</p>
      </section>
    )
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    rows: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          rows: 2
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          rows: 2
        }
      }
    ]
  };

  return (
    <section id="brands" className="w-full bg-gray-100 py-16 px-4 sm:px-8 lg:px-16 text-center">
      <h2 className="text-3xl font-bold text-black mb-12">Our Brands</h2>
      <div className="max-w-7xl mx-auto px-4">
        <Slider {...settings}>
          {siteSettings && siteSettings.brands && siteSettings.brands
            .filter(brand => brand.show)
            .map(brand => (
              <div key={brand.id} className="px-2">
                <BrandCard
                  image={brand.img}
                  title={brand.name}
                />
              </div>
            ))}
        </Slider>
      </div>
    </section>
  );
};

const BrandCard = ({ image, title }) => (
  <div className="bg-white shadow-lg p-4 rounded-lg h-full flex items-center justify-center">
    <div className="relative w-full h-24">
      <Image 
        src={image} 
        alt={title} 
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
        className="object-contain p-2"
        priority={false}
      />
    </div>
  </div>
);

export default BrandsPage;
