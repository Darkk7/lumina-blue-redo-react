import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSiteSettings } from '../context/SiteSettingsContext';
import Link from 'next/link';

const InfoCentreListPage = () => {
  const router = useRouter();
  const { category } = useParams();
  const { siteSettings } = useSiteSettings();
  const [sectionItems, setSectionItems] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First, fetch the category details
        const categoryResponse = await fetch('https://www.ocumail.com/api/section_categories');
        if (!categoryResponse.ok) {
          throw new Error('Failed to fetch category details');
        }
        const categories = await categoryResponse.json();
        const currentCategory = categories.find(cat => cat.id === parseInt(category));
        
        if (!currentCategory) {
          throw new Error('Category not found');
        }
        
        setCategoryDetails(currentCategory);
        
        // Then fetch the section items for this category
        const itemsResponse = await fetch('https://www.ocumail.com/api/section_items');
        if (!itemsResponse.ok) {
          throw new Error('Failed to fetch section items');
        }
        const allItems = await itemsResponse.json();
        const filteredItems = allItems.filter(
          (item) => item.section_category_id === parseInt(category)
        );
        setSectionItems(filteredItems);
        
      } catch (error) {
        console.error('Error:', error);
        setError(error.message || 'Failed to load category data');
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchCategoryDetails();
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

  if (!sectionItems.length && !categoryDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">No items found in this category</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Hero Banner */}
      <div 
        className="w-full h-[500px] bg-cover bg-center text-white"
        style={{
          backgroundImage: `url(${categoryDetails?.banner_img_url || 'https://www.imageeyecareoptometrists.com/assets/info_centre_banner-4940284541b3ff321b2a3d735fc5ef1caa0f4c66de9804905118656edf31c88d.jpg'})`
        }}
      >
        <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-center px-4">
            {categoryDetails?.name || 'Info Centre'}
          </h1>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="py-8 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="text-center">
              <div className="text-sm">
                <Link
                  href={`/website/${siteSettings.practiceId}/info_centre`}
                  className="text-primary hover:text-primary-dark underline"
                >
                  Info Centre
                </Link>                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectionItems.map((item) => (
              <Link
                key={item.id}
                href={`/website/${siteSettings?.practiceId}/info_centre/${category}/${item.id}`}
                className="bg-white rounded-lg shadow-md p-6 block"
              >
                <div className="relative h-[200px] mb-4 rounded-lg overflow-hidden">
                  <img
                    src={item.thumbnail_img_url || `https://www.ocumail.com${item.imgurl}`}
                    alt={item.name}
                    className="w-full h-full object-cover"                    
                  />
                </div>
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
                <span className="w-full sm:w-[200px] text-sm bg-primary text-white px-6 py-3 rounded-full shadow-md hover:bg-opacity-90 transition-transform transform hover:scale-105 text-center block">
                  Explore {item.name}
                </span>
              </Link>
            ))}
          </div>        
      </div>
    </main>
  );
};

export default InfoCentreListPage;
