import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

const InfoCentreItem = () => {
  const { category, itemId } = useParams();
  const [itemContent, setItemContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`https://www.ocumail.com/api/section_items/${itemId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch item content');
        }
        const data = await response.json();
        // Find the specific item's content
        const content = data.find(item => item.id === parseInt(itemId));
        if (content) {
          setItemContent(content);
        }
      } catch (error) {
        console.error('Error fetching item content:', error);
        setError('Failed to load item content');
      } finally {
        setLoading(false);
      }
    };

    if (itemId) {
      fetchItemContent();
    }
  }, [itemId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  if (!itemContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Content Not Found</p>
      </div>
    );
  }

  // Sort the attributes properly
  const sortedAttributes = itemContent.attributes.sort((a, b) => {
    const aSection = parseInt(a.name.split('.')[1]) || 0;
    const bSection = parseInt(b.name.split('.')[1]) || 0;
    return aSection - bSection;
  });

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Banner Section */}
      {itemContent.banner && (
        <div 
          className="w-full h-[400px] bg-cover bg-center text-center text-white relative"
          style={{ backgroundImage: `url(${itemContent.banner})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-5xl font-bold">{itemContent.title}</h1>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto border-t border-2 border-primary">
          {/* Breadcrumb */}
          <div className="mb-8">
            <div className="text-sm">
              <Link href="/pages/info_centre" className="text-primary hover:text-primary-dark underline">
                Info Centre
              </Link>
              <span className="text-primary mx-2">{'>'}</span>
              <Link href={`/info_centre/${category}`} className="text-primary hover:text-primary-dark underline">
                {category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Link>
              <span className="text-primary mx-2">{'>'}</span>
              <span className="text-gray-600">{itemContent.title}</span>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {sortedAttributes.map(attr => {
              const sectionNumber = parseInt(attr.name.split('.')[1]) || 0;
              if (sectionNumber > 0) {
                return (
                  <div key={attr.id}>
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
              }
              return null;
            })}

            {/* References */}
            {sortedAttributes.find(attr => attr.name === 'Reference.1.Title') && (
              <div className="mt-8 border-t pt-8">
                <h3 className="text-xl font-semibold mb-4">References</h3>
                <div className="space-y-4">
                  {sortedAttributes
                    .filter(attr => attr.name.startsWith('Reference.') && attr.name.endsWith('.Title'))
                    .map((titleAttr, index) => {
                      const urlAttr = sortedAttributes.find(
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
        </div>
      </div>
    </main>
  );
};

export default InfoCentreItem;
