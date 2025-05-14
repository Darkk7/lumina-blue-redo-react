import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from "next/link";
import { useSiteSettings } from "../context/SiteSettingsContext";

const InfoCentreListPage = () => {
  const { siteSettings } = useSiteSettings();
  const params = useParams();
  console.log('Params:', params);
  const { category } = params;
  const [sectionItems, setSectionItems] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    console.log('Category:', category);
    const categoryNameFromUrl = new URLSearchParams(window.location.search).get('name');
    if (categoryNameFromUrl) {
      setCategoryName(categoryNameFromUrl);
    }
    if (category) {
      const fetchSectionItems = async () => {
        try {
          const response = await fetch('https://www.ocumail.com/api/section_items');
          console.log('API Response Status:', response.status);
          if (!response.ok) {
            console.error('Failed to fetch section items:', response.statusText);
            return;
          }
          const data = await response.json();
          console.log('Fetched Data:', data);
          const filteredItems = data.filter(item => item.section_category_id === parseInt(category));
          console.log('Filtered Items:', filteredItems);
          setSectionItems(filteredItems);
        } catch (error) {
          console.error('Error fetching section items:', error);
        }
      };
      fetchSectionItems();
    }
  }, [category]);

  useEffect(() => {
    console.log('Section Items:', sectionItems);
  }, [sectionItems]);

  const handleItemClick = (itemId) => {
    // Navigate to the detail page for the clicked item
    window.location.href = `/info-centre/item/${itemId}`;
  };

  if (!sectionItems.length && !categoryName) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Category not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="min-h-screen bg-gray-50">
          {/* Banner Section */}
          <div className="w-full h-[400px] bg-[url('https://www.imageeyecareoptometrists.com/assets/info_centre_banner-4940284541b3ff321b2a3d735fc5ef1caa0f4c66de9804905118656edf31c88d.jpg')] bg-cover bg-center text-center text-white">
            <div className="bg-black bg-opacity-50 h-full flex flex-col items-center justify-center p-4">
              <h1 className="text-5xl font-bold mb-4">{categoryName}</h1>
            </div>
          </div>

          {/* Content Section */}
          <div className="container mx-auto py-12 px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sectionItems.map((item) => (
                <div key={item.id} onClick={() => handleItemClick(item.id)} className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer">
                  <div className="relative w-full h-64">
                    {item.imgurl ? (
                      <Image
                        src={item.imgurl}
                        alt={item.name}
                        layout="fill"
                        objectFit="cover"
                        quality={80}
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-200">
                        <p className="text-gray-500"> No Image Available </p>
                      </div>
                    )}
                  </div>
                  <div className="p-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{item.name}</h2>
                    <p className="text-gray-600 mb-4"> Learn More about .... </p>
                    <Link
                      href={`/website/${siteSettings?.practiceId}/info_centre/${category.id}`}
                      className="inline-block bg-primary text-white px-6 py-3 rounded-full shadow-md hover:bg-opacity-90 transition-transform"
                    >
                      <span>Explore {item.name}</span>
                      <span className="ml-2 inline-block">→</span>
                    </Link>
                    {item.linkurl && (
                      <a
                        href={item.linkurl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-primary text-white px-6 py-3 rounded-full shadow-md hover:bg-opacity-90 transition-transform"
                      >
                        <span>Learn More</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InfoCentreListPage;
