import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useSiteSettings } from "../context/SiteSettingsContext";
import Navbar from "./Navbar";

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
        let allCategories = await response.json();
        // Sort categories by orderby in ascending order (lower numbers first)
        allCategories.sort((a, b) => (a.orderby || 0) - (b.orderby || 0));
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
          setTimeout(() => handleCategoryClick(id), 3000);
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
      <Navbar practiceId={siteSettings?.practiceId} />
      {/* Hero Section */}
      <div className="w-full h-[500px] bg-[url('https://www.imageeyecareoptometrists.com/assets/info_centre_banner-4940284541b3ff321b2a3d735fc5ef1caa0f4c66de9804905118656edf31c88d.jpg')] bg-cover bg-center text-white">
        <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-center px-4">Welcome To Our Info Centre</h1>
        </div>
      </div>

      {/* Stacked Category Blocks */}
      <div className="py-16 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto space-y-20">
          {categories.map((category, index) => {
            // Get the current path segments
            const pathSegments = typeof window !== 'undefined' 
              ? window.location.pathname.split('/').filter(Boolean)
              : [];
            
            // Check if we're in a customer code route (first segment is not a number)
            const isCustomerCodeRoute = pathSegments[0] && !/^\d+$/.test(pathSegments[0]);
            const basePath = isCustomerCodeRoute ? pathSegments[0] : siteSettings?.practiceId;
            
            return (
              <div key={category.id} className="w-full p-6 bg-white rounded-lg border border-gray-200 shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
                <div className="w-full flex flex-col md:flex-row items-center">
                  {/* Image Section - Order changes based on index */}
                  <div className={`w-full md:w-1/2 ${index % 2 !== 0 ? 'md:order-2' : ''} p-4`}>
                    <Link 
                      href={`/${basePath}/info_centre/${category.id}`}
                      onClick={() => handleCategoryClick(category.id)}
                      className="block"
                    >
                      <div className="relative h-64 w-full rounded-xl overflow-hidden shadow-md">
                        {category.thumbnailImgUrl && (
                          <Image
                            src={category.thumbnailImgUrl}
                            alt={category.name}
                            layout="fill"
                            className="object-cover transition-transform duration-300 transform hover:scale-110"
                            priority
                          />
                        )}
                      </div>
                    </Link>
                  </div>

                  {/* Text Section - Order changes based on index */}
                  <div className={`w-full md:w-1/2 p-4 text-center md:text-left ${index % 2 !== 0 ? 'md:order-1' : ''}`}>
                    <Link 
                      href={`/${basePath}/info_centre/${category.id}`}
                      onClick={() => handleCategoryClick(category.id)}
                      className="block"
                    >
                      <h2 className="text-3xl font-bold text-gray-800 mb-4">{category.name}</h2>
                      <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                        Learn more about {category.name}.
                      </p>
                      <span className="inline-block bg-primary text-white px-6 py-3 rounded-full shadow-md hover:bg-opacity-90 transition-transform transform hover:scale-105">
                        Explore {category.name}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default InfoCentreHomePage;
