import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSiteSettings } from '../context/SiteSettingsContext';
import Link from 'next/link';

const InfoCentreListPage = () => {
  const router = useRouter();
  const { category } = useParams();
  const { siteSettings } = useSiteSettings();
  const [sectionItems, setSectionItems] = useState([]);
  const [categoryName, setCategoryName] = useState('');
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

  const handleExplore = (itemId, itemName) => {
    router.push(`/info_centre/${category}/${itemId}`);
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
                {item.image && (
                  <div className="relative h-[200px] mb-4 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
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
                <button
                  onClick={() => handleExplore(item.id, item.name)}
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
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default InfoCentreListPage;
