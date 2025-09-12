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
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    rows: 2,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          rows: 2
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          rows: 2
        }
      }
    ]
  };

  return (
    <section id="brands" className="w-full bg-gray-100 py-16 px-4 sm:px-8 lg:px-16 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-black mb-5">Our Brands</h2>
      <p className="text-lg text-center mb-12 text-gray-600 max-w-3xl mx-auto"></p>
      <div className="max-w-7xl mx-auto px-4">
        <Slider {...settings} className="[&_.slick-slide]:px-3">
          {siteSettings && siteSettings.brands && siteSettings.brands
            .filter(brand => brand.show)
            .map(brand => (
              <div key={brand.id} className="h-full">
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
  <div className="bg-white shadow-lg p-6 rounded-lg h-full flex items-center justify-center my-4">
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