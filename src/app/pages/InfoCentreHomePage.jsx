import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useSiteSettings } from "../context/SiteSettingsContext";
import FooterPage from "./FooterPage";

const InfoCentreHomePage = () => {
  const { siteSettings } = useSiteSettings();
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://www.ocumail.com/api/section_categories');
        if (!response.ok) {
          console.error('Network response was not ok:', response.statusText);
          return;
        }
        const allCategories = await response.json();
        const ids = allCategories.map(category => category.id);

        const fetchedCategories = await Promise.all(
          ids.map(async (id) => {
            const response = await fetch(`https://www.ocumail.com/api/section_categories/${id}`);
            if (!response.ok) {
              if (response.status === 404) {
                alert('The requested item could not be found. Please check the ID or try another item.');
                window.location.href = '/info-centre';
              } else {
                console.error(`Network response was not ok for ID: ${id}`, response.statusText);
              }
              return null;
            }
            const data = await response.json();
            return {
              id: data.id,
              name: data.name,
              thumbnailImgUrl: data.thumbnail_img_url,
            };
          })
        );
        setCategories(fetchedCategories.filter(category => category !== null));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = async (id) => {
    setSelectedCategoryId(id);
    try {
      const response = await fetch(`https://www.ocumail.com/api/section_items/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          console.warn('The requested item could not be found. Retrying...');
          setTimeout(() => handleCategoryClick(id), 3000); // Retry after 3 seconds
        } else {
          console.error(`Network response was not ok for ID: ${id}`, response.statusText);
        }
        return;
      }
      const data = await response.json();
      setSubcategories(data.items);
    } catch (error) {
      console.error(`Error fetching subcategories for ID: ${id}`, error);
      setTimeout(() => handleCategoryClick(id), 3000);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="w-full h-[500px] bg-[url('https://www.imageeyecareoptometrists.com/assets/info_centre_banner-4940284541b3ff321b2a3d735fc5ef1caa0f4c66de9804905118656edf31c88d.jpg')] bg-cover bg-center text-white">
        <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-center px-4">Welcome To Our Info Centre</h1>
        </div>
      </div>

      {/* Stacked Category Blocks */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-20">
          {categories.map((category, index) => (
            <div
              id={`category-${category.id}`}
              key={category.id}
              className={`flex flex-col md:flex-row ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              } items-center gap-8 p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl ${index % 2 === 1 ? "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400" : "bg-gradient-to-r from-white via-white to-white"}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {/* Image Section */}
              <div className="w-full md:w-1/2">
                <div className="relative h-64 w-full rounded-xl overflow-hidden shadow-md">
                  {category.thumbnailImgUrl && (
                    <Image
                      src={category.thumbnailImgUrl}
                      alt={category.name}
                      layout="fill"
                      className="object-cover transition-transform duration-300 transform hover:scale-110"
                    />
                  )}
                </div>
              </div>

              {/* Text Section */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{category.name}</h2>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  Learn more about {category.name}.
                </p>
                <Link
                  href={`/website/${siteSettings?.practiceId}/info_centre/${category.id}?name=${encodeURIComponent(category.name)}`}
                  className="inline-block bg-primary text-white px-6 py-3 rounded-full shadow-md hover:bg-opacity-90 transition-transform transform hover:scale-105"
                >
                  <span>Explore {category.name}</span>
                  <span className="ml-2 inline-block">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Carousel (Optional - Just add for smaller screen users) */}
      <div className="md:hidden py-12 px-4">
        <div className="overflow-x-scroll flex space-x-6">
          {categories.map((category) => (
            <div key={category.id} className="flex-shrink-0 w-60">
              <Link
                href={`/website/${siteSettings?.practiceId}/info_centre/${category.id}?name=${encodeURIComponent(category.name)}`}
                className="block bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="relative h-48 w-full">
                  {category.thumbnailImgUrl && (
                    <Image
                      src={category.thumbnailImgUrl}
                      alt={category.name}
                      layout="fill"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
                  <p className="text-gray-500 text-sm">Learn more about {category.name.toLowerCase()}.</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default InfoCentreHomePage;
