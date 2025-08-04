"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import Navbar from '../../../pages/Navbar';
import FooterPage from '../../../pages/FooterPage';

export default function SubcategoryPage() {
  const { category, subcategory } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First get the section item details
        const itemsResponse = await axios.get('https://www.ocumail.com/api/section_items');
        const items = itemsResponse.data;
        
        // Try to find the item by name first
        const itemByName = items.find(i => 
          i.section_category_id === parseInt(category) &&
          i.name.toLowerCase() === subcategory.toLowerCase()
        );

        // If not found by name, try to find by ID
        const itemById = items.find(i => 
          i.section_category_id === parseInt(category) &&
          i.id === parseInt(subcategory)
        );

        // Use the found item
        const item = itemByName || itemById;

        if (!item) {
          throw new Error('Item not found');
        }

        // Now fetch the item's attributes
        const attributesResponse = await axios.get(`https://www.ocumail.com/api/item_attributes/${item.id}`);
        const attributes = attributesResponse.data;

        // Create content object
        setContent({
          id: item.id,
          name: item.name,
          banner: attributes.find(attr => attr.name === 'bannerImg')?.data || '',
          overview: attributes.find(attr => attr.name === 'Overview')?.data || '',
          attributes: attributes.filter(attr => attr.name !== 'Overview' && attr.name !== 'bannerImg')
        });
      } catch (error) {
        console.error('Error fetching content:', error);
        setError('Failed to load content');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [category, subcategory]);

  const renderContent = () => {
    if (!content) return null;
    if (loading) return <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>;
    if (error) return <p className="text-red-600">{error}</p>;

    return (
      <div className="space-y-8">
        {/* Overview */}
        {content.overview && (
          <div dangerouslySetInnerHTML={{ __html: content.overview }} />
        )}

        {/* Sections */}
        {content.attributes.map(attr => {
          if (!attr.name.includes('.')) return null;
          
          const sectionNumber = parseInt(attr.name.split('.')[1]) || 0;
          if (sectionNumber === 0) return null;

          return (
            <div key={attr.id} className="space-y-4">
              {attr.name.endsWith('.Title') && (
                <h2 className="text-2xl font-bold text-black mb-4">{attr.data}</h2>
              )}
              {attr.name.endsWith('.Body') && (
                <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: attr.data }} />
              )}
              {attr.name.endsWith('.Image') && (
                <div className="relative h-[300px] mb-8 rounded-lg overflow-hidden">
                  <img
                    src={attr.data}
                    alt="Section Image"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          );
        })}

        {/* References */}
        {content.attributes.find(attr => attr.name === 'Reference.1.Title') && (
          <div className="mt-8 border-t pt-8">
            <h3 className="text-xl font-semibold mb-4">References</h3>
            <div className="space-y-4">
              {content.attributes
                .filter(attr => attr.name.startsWith('Reference.') && attr.name.endsWith('.Title'))
                .map((titleAttr, index) => {
                  const urlAttr = content.attributes.find(
                    attr => attr.name === titleAttr.name.replace('.Title', '.Url')
                  );
                  return (
                    <div key={titleAttr.id} className="flex items-center">
                      <span className="text-gray-600">{index + 1}. </span>
                      <a
                        href={urlAttr?.data}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 ml-2"
                      >
                        {titleAttr.data}
                      </a>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      
      {/* Banner Section */}
      {content?.banner && (
        <div 
          className="w-full h-[400px] bg-cover bg-center text-center text-white relative"
          style={{ backgroundImage: `url(${content.banner})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-5xl font-bold">{content.name}</h1>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto border-t border-2 border-primary">
          {/* Breadcrumb */}
          <div className="mb-8">
            <div className="text-sm">
              <Link href="/info_centre" className="text-primary hover:text-primary-dark underline">
                Info Centre
              </Link>
              <span className="text-primary mx-2">{'>'}</span>
              <Link href={`/info_centre/${category}`} className="text-primary hover:text-primary-dark underline">
                {category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Link>
              <span className="text-primary mx-2">{'>'}</span>
              <span className="text-gray-600">{content?.name}</span>
            </div>
          </div>

          {/* Content Sections */}
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-600">{error}</div>
          ) : (
            renderContent()
          )}
        </div>
      </div>
      <FooterPage />
    </main>
  );
}