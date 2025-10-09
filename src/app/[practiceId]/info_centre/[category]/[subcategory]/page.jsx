"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import Navbar from '../../../../pages/Navbar';
import { useSiteSettings } from '../../../../context/SiteSettingsContext';


export default function SubcategoryPage() {
  const { practiceId, category, subcategory } = useParams();
  const { siteSettings } = useSiteSettings();
  const [content, setContent] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);

        // First, fetch the category details
        const categoryResponse = await axios.get('https://www.ocumail.com/api/section_categories');
        const categories = categoryResponse.data;
        const currentCategory = categories.find(cat => cat.id === parseInt(category));
        
        if (!currentCategory) {
          throw new Error('Category not found');
        }
        
        setCategoryDetails(currentCategory);

        // Then fetch the section items
        const itemsResponse = await axios.get('https://www.ocumail.com/api/section_items');
        const items = itemsResponse.data;

        const itemByName = items.find(i => 
          i.section_category_id === parseInt(category) &&
          i.name.toLowerCase() === subcategory.toLowerCase()
        );

        const itemById = items.find(i =>
          i.section_category_id === parseInt(category) &&
          i.id === parseInt(subcategory)
        );

        const item = itemByName || itemById;

        if (!item) {
          throw new Error('Item not found');
        }

        const attributesResponse = await axios.get(`https://www.ocumail.com/api/item_attributes/${item.id}`);
        let attributes = attributesResponse.data;

        // Process attributes to modify image paths in the data field, but skip the Overview content
        attributes = attributes.map(attr => {
          if (attr.name === 'Overview') {
            // Leave Overview content as-is since it contains full URLs
            return attr;
          }
          
          if (attr.data && typeof attr.data === 'string') {
            let modifiedData = attr.data.replace(/src=["']([^"']+)["']/g, (match, src) => {
              const filename = src.split('/').pop().split('\\').pop();
              return `src="/images/Body/${filename}"`;
            });
            return { ...attr, data: modifiedData };
          }
          return attr;
        });

        // Find banner image URL from attributes
        const bannerImgAttr = attributes.find(attr => attr.name === 'bannerImg');
        const bannerUrl = bannerImgAttr?.data || '';
        
        // Check if there's an Overview attribute
        const overviewAttr = attributes.find(attr => attr.name === 'Overview');
        
        setContent({
          id: item.id,
          name: item.name,
          banner: bannerUrl,
          overview: overviewAttr?.data || '',
          hasOverview: !!overviewAttr,
          // Only include non-Overview, non-banner attributes if there's no Overview
          attributes: overviewAttr 
            ? [] 
            : attributes.filter(attr => !['Overview', 'bannerImg'].includes(attr.name))
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
    if (loading) return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;
    if (error) return <p className="text-red-600 p-4">{error}</p>;

    return (
      <div className="space-y-12">
        {content.hasOverview ? (
          // Render Overview content if available - with reset-styles class
          <div 
            className="reset-styles max-w-6xl mx-auto"
            dangerouslySetInnerHTML={{ __html: content.overview }}
          />
        ) : (
          // Otherwise render section-based content
          <>
            {/* Overview text if available but not using full Overview content */}
            {content.overview && (
              <div
                className="reset-styles max-w-3xl mx-auto text-justify"
                dangerouslySetInnerHTML={{ __html: content.overview }}
              />
            )}

            {/* Sections */}
            {content.attributes
              .filter(attr => attr.name.includes('.') &&
                            !attr.name.startsWith('Reference.') &&
                            !['bannerImg', 'Overview'].includes(attr.name))
              .sort((a, b) => {
                const getSectionNumber = (name) => {
                  const match = name.match(/\.(\d+)\./);
                  return match ? parseInt(match[1]) : 0;
                };
                return getSectionNumber(a.name) - getSectionNumber(b.name);
              })
              .map((attr, idx, arr) => {
            const sectionNumber = parseInt(attr.name.split('.')[1]) || 0;
            if (sectionNumber === 0) return null;

            const isNewSection = idx === 0 ||
              (parseInt(arr[idx-1]?.name.split('.')[1]) || 0) !== sectionNumber;

            if (isNewSection) {
              // Find all attributes for this section
              const sectionAttrs = content.attributes.filter(a =>
                a.name.startsWith(`Section.${sectionNumber}.`)
              );

              const titleAttr = sectionAttrs.find(a => a.name.endsWith('.Title'));
              const bodyAttr = sectionAttrs.find(a => a.name.endsWith('.Body'));
              const imageAttr = sectionAttrs.find(a => a.name.endsWith('.Image'));

              return (
                <div key={`section-${sectionNumber}`} className="space-y-8">
                  {/* Section Title */}
                  {titleAttr && (
                    <div className="flex justify-center">
                      <h3 className="inline-block px-1 text-3xl font-bold text-gray-900 pb-2 border-b-2 border-primary">
                        {titleAttr.data}
                      </h3>
                    </div>
                  )}

                  {/* Section Body + Image */}
                  <div className="flex flex-col items-center space-y-6">
                    {bodyAttr && (
                      <div
                        className="reset-styles max-w-full p-3"
                        dangerouslySetInnerHTML={{ __html: bodyAttr.data }}
                      />
                    )}

                    {imageAttr && (
                      <div className="my-4 flex justify-center">
                        <img
                          src={imageAttr.data}
                          alt=""
                          className="rounded-lg shadow-md max-w-2xl w-full h-auto object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            }
              return null;
            })}
          </>
        )}

        {/* References - Show only if not using Overview content or if explicitly included in Overview */}
        {!content.hasOverview && content.attributes.some(attr => attr.name.startsWith('Reference.')) && (
          <div className="mt-12 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">References</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              {content.attributes
                .filter(attr => attr.name.startsWith('Reference.') && attr.name.endsWith('.Title'))
                .sort((a, b) => {
                  const numA = parseInt(a.name.match(/Reference\.(\d+)/)[1]);
                  const numB = parseInt(b.name.match(/Reference\.(\d+)/)[1]);
                  return numA - numB;
                })
                .map((titleAttr) => {
                  const refNum = titleAttr.name.match(/Reference\.(\d+)/)[1];
                  const urlAttr = content.attributes.find(
                    attr => attr.name === `Reference.${refNum}.Url`
                  );
                  return (
                    <li key={titleAttr.id} className="ml-4 pl-2">
                      {urlAttr ? (
                        <a
                          href={urlAttr.data}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {titleAttr.data}
                        </a>
                      ) : (
                        <span>{titleAttr.data}</span>
                      )}
                    </li>
                  );
                })}
            </ol>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <style jsx global>{`
        .reset-styles {
          all: revert;
        }
        
        .reset-styles h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
        }
        
        .reset-styles h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.75em 0;
        }
        
        .reset-styles h3 {
          font-size: 1.17em;
          font-weight: bold;
          margin: 1em 0;
        }
        
        .reset-styles h4 {
          font-size: 1em;
          font-weight: bold;
          margin: 1.33em 0;
        }
        
        .reset-styles h5 {
          font-size: 0.83em;
          font-weight: bold;
          margin: 1.67em 0;
        }
        
        .reset-styles h6 {
          font-size: 0.67em;
          font-weight: bold;
          margin: 2.33em 0;
        }
        
        .reset-styles p {
          margin: 1em 0;
        }
        
        .reset-styles ul, .reset-styles ol {
          margin: 1em 0;
          padding-left: 40px;
        }
        
        .reset-styles ul {
          list-style-type: disc;
        }
        
        .reset-styles ol {
          list-style-type: decimal;
        }
        
        .reset-styles li {
          display: list-item;
        }
        
        .reset-styles strong, .reset-styles b {
          font-weight: bold;
        }
        
        .reset-styles em, .reset-styles i {
          font-style: italic;
        }
        
        .reset-styles a {
          color: #0000EE;
          text-decoration: underline;
        }
        
        .reset-styles a:visited {
          color: #551A8B;
        }
        
        .reset-styles blockquote {
          margin: 1em 40px;
        }
        
        .reset-styles table {
          border-collapse: collapse;
        }
        
        .reset-styles img {
          max-width: 100%;
          height: auto;
        }
      `}</style>
      
      <div className="main bg-gray-400">
        <Navbar />
        
        {/* Keep the original banner section */}
        {content?.banner && (
          <div 
            className="w-full h-[400px] bg-cover bg-center text-center text-white relative"
            style={{ backgroundImage: content.banner ? `url(${content.banner})` : 'none' }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h1 className="text-5xl text-white font-bold ">{content.name}</h1>
            </div>
          </div>
        )}

        {/* Content Section with SimonPage styling */}
        <div className="content-container">
          {/* Enhanced Breadcrumb Navigation */}
          <div className="container mx-auto px-4 py-6">
            <div className="mb-8 flex justify-center">
              <div className="text-xl font-medium">
                <Link
                  href={`/${practiceId}/info_centre`}
                  className="text-primary underline hover:text-primary-dark transition-colors duration-200"
                >
                  Back To Info Centre
                </Link>
                <span className="text-primary mx-3">›</span>
                <Link
                  href={`/${practiceId}/info_centre/${category}`}
                  className="text-primary underline hover:text-primary-dark transition-colors duration-200"
                >
                  Back To {categoryDetails?.name || category}
                </Link>
                <span className="text-primary mx-3">›</span>
                <span className="text-gray-700">{content?.name || subcategory}</span>
              </div>
            </div>

            {/* Main Content with SimonPage styling */}
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-5xl mx-auto border-2 border-gray-500">
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
        </div>
      </div>
    </>
  );
}