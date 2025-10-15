import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useSiteSettings } from "../context/SiteSettingsContext";
import Navbar from "./Navbar";

// Fallback image URL
const FALLBACK_IMAGE = 'https://via.placeholder.com/800x500.png?text=Image+Not+Available';

const InfoCentreHomePage = () => {
  const { siteSettings } = useSiteSettings();
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://www.ocumail.com/api/section_categories');
        if (!response.ok) {
          const errorMessage = `Network response was not ok: ${response.statusText}`;
          console.error(errorMessage);
          setError(errorMessage);
          setLoading(false);
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
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getCategoryDescription = (categoryName) => {
    const descriptions = {
      'Refractive conditions': 'Unlock the mystery of blurry vision! Discover how nearsightedness, farsightedness, and astigmatism shape your world and the innovative solutions to see clearly again.',
      'Rx lens options': 'Your vision, your way! Explore the perfect lens match for your lifestyle, from sleek single vision to versatile progressives - clarity has never looked so good!',
      'External & lid pathology': "Don't let eye irritation slow you down! Get the lowdown on common eyelid conditions and how to keep your eyes feeling fresh and comfortable.",
      'Anterior & corneal pathology': 'The window to your soul deserves the best care! Learn how to protect and treat the delicate front surface of your eyes for lasting comfort and vision.',
      'Posterior & retinal pathology': 'See the bigger picture of eye health! Explore essential insights about retinal conditions and how early detection can save your sight.',
      'CooperVision': 'Experience vision freedom with CooperVision! Discover how their innovative contact lenses bring comfort and clarity to every blink.',
      'General Eyecare': 'Bright eyes start here! Your go-to guide for keeping your vision sharp and your eyes healthy at every stage of life.',
      'Pharmaceuticals': "Your eyes' best defense! Navigate the world of eye medications with confidence, knowing what works and why.",
      'Contact Lenses': 'Freedom to see, freedom to be! Find your perfect contact lens match and embrace life without the frames.'
    };

    return descriptions[categoryName] || `Discover more about ${categoryName} and how it impacts your vision.`;
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-700 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 max-w-md bg-white rounded-lg shadow-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
                            src={category.thumbnailImgUrl || FALLBACK_IMAGE}
                            alt={category.name}
                            layout="fill"
                            className="object-cover transition-transform duration-300 transform hover:scale-110"
                            priority
                            onError={(e) => {
                              // Prevent infinite loop by setting a flag
                              if (e.target.src !== FALLBACK_IMAGE) {
                                e.target.src = FALLBACK_IMAGE;
                              }
                            }}
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
                        {getCategoryDescription(category.name)}
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
