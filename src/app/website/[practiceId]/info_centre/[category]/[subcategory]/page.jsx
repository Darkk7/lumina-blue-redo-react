"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import Navbar from '../../../../../pages/Navbar';
import { useSiteSettings } from '../../../../../context/SiteSettingsContext';
import '../../../../../pages/simon_dev/style.css';

export default function SubcategoryPage() {
  const { practiceId, category, subcategory } = useParams();
  const { siteSettings } = useSiteSettings();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getLink = (path) => {
    if (!siteSettings?.practiceId) {
      return path;
    }
    return `/website/${siteSettings.practiceId}${path}`;
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);

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
        const attributes = attributesResponse.data;

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
    if (loading) return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;
    if (error) return <p className="text-red-600 p-4">{error}</p>;

    return (
      <div className="space-y-12">
        {/* Overview */}
        {content.overview && (
          <div
            className="prose prose-lg max-w-3xl mx-auto text-gray-700 leading-relaxed text-justify"
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
                    <div className="flex justify-left">
                      <h3 className="inline-block px-1 text-2xl font-bold text-gray-900 pb-2 border-b-2 border-primary">
                        {titleAttr.data}
                      </h3>
                    </div>
                  )}

                  {/* Section Body + Image */}
                  <div className="flex flex-col items-center space-y-6">
                    {bodyAttr && (
                      <div
                        className="prose prose-lg max-w-3xl text-gray-700 leading-relaxed text-justify"
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

        {/* References */}
        {content.attributes.some(attr => attr.name.startsWith('Reference.')) && (
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
    <div className="main bg-gray-400">
      <Navbar />
      
      {/* Keep the original banner section */}
      {content?.banner && (
        <div 
          className="w-full h-[400px] bg-cover bg-center text-center text-white relative"
          style={{ backgroundImage: `url(https://www.eyecareportal.com${content.banner})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-5xl font-bold ">{content.name}</h1>
          </div>
        </div>
      )}

      {/* Content Section with SimonPage styling */}
      <div className="content-container">
        {/* Keep the original breadcrumb */}
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8 flex justify-center">
            <div className="text-sm">
              <Link
                href={`/website/${practiceId}/info_centre`}
                className="text-primary hover:text-primary-dark underline"
              >
                Info Centre
              </Link>
              <span className="text-primary mx-2">{'>'}</span>
              <Link
                href={`/website/${practiceId}/info_centre/${category}`}
                className="text-primary hover:text-primary-dark underline"
              >
                {category
                  .split('_')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </Link>
              <span className="text-primary mx-2">{'>'}</span>
              <span className="text-gray-600">{content?.name}</span>
            </div>
          </div>

          {/* Main Content with SimonPage styling */}
          <div className="bg-white rounded-lg shadow-lg p-10 max-w-4xl mx-auto border-2 border-gray-500">
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
  );
}