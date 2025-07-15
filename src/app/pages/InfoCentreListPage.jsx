import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSiteSettings } from '../context/SiteSettingsContext';
import Link from 'next/link';

const InfoCentreListPage = () => {
  const { category } = useParams();
  const { siteSettings } = useSiteSettings();
  const [sectionItems, setSectionItems] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSectionItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://www.ocumail.com/api/section_items');
        if (!response.ok) {
          throw new Error('Failed to fetch section items');
        }
        const allItems = await response.json();
        console.log('Raw API Response:', allItems);
        const filteredItems = allItems.filter(
          (item) => item.section_category_id === parseInt(category)
        );
        setSectionItems(filteredItems);

        if (filteredItems.length > 0) {
          setCategoryName(filteredItems[0].category_name);
        }
      } catch (error) {
        console.error('Error fetching section items:', error);
        setError('Failed to load category items');
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchSectionItems();
    }
  }, [category]);

  const handleItemClick = async (itemId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://www.ocumail.com/api/item_attributes/${itemId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch item attributes');
      }
      const data = await response.json();
      setSelectedItem(data);
    } catch (error) {
      console.error('Error fetching item content:', error);
      setError('Failed to load item content');
      setSelectedItem(null);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (!selectedItem) return null;

    if (loading) {
      return (
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      );
    }

    if (error) {
      return <div className="text-red-600 text-center">{error}</div>;
    }

    const sortedAttributes = selectedItem.sort((a, b) => {
      const aSection = parseInt(a.name.split('.')[1]) || 0;
      const bSection = parseInt(b.name.split('.')[1]) || 0;
      return aSection - bSection;
    });

    return (
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        {sortedAttributes.find(attr => attr.name === 'Overview')?.data && (
          <div
            className="mb-8"
            dangerouslySetInnerHTML={{ __html: sortedAttributes.find(attr => attr.name === 'Overview').data }}
          />
        )}

        {sortedAttributes.map(attr => {
          const sectionNumber = parseInt(attr.name.split('.')[1]) || 0;
          if (sectionNumber > 0) {
            return (
              <div key={attr.id} className="mb-8">
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
    );
  };

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

  if (!sectionItems.length && !categoryName) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">No items found in this category</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Hero Banner */}
      <div className="w-full h-[500px] bg-[url('https://www.imageeyecareoptometrists.com/assets/info_centre_banner-4940284541b3ff321b2a3d735fc5ef1caa0f4c66de9804905118656edf31c88d.jpg')] bg-cover bg-center text-white">
        <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-center px-4">{categoryName}</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="py-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">{categoryName}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectionItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-black mb-4">{item.name}</h2>
                <p
                  className="text-gray-600 mb-4"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'normal',
                  }}
                >
                  {item.body}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleItemClick(item.id)}
                    className="w-full sm:w-[200px] text-sm bg-primary text-white px-6 py-3 rounded-full shadow-md hover:bg-opacity-90 transition-transform transform hover:scale-105 text-center"
                  >
                    Explore {item.name}
                  </button>
                  {item.linkurl && (
                    <a
                      href={item.linkurl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-[200px] text-sm bg-primary text-white px-6 py-3 rounded-full shadow-md hover:bg-opacity-90 transition-transform text-center"
                    >
                      Learn More
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {renderContent()}
        </div>
      </div>
    </main>
  );
};

export default InfoCentreListPage;
