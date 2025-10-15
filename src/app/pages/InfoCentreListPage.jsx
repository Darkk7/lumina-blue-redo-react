import { useEffect, useState } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { useSiteSettings } from '../context/SiteSettingsContext';
import Link from 'next/link';
import Navbar from './Navbar';

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
          (item) => item.section_category_id === parseInt(category) && item.enabled === true
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

  // Function to get the base path (with customer code or practice ID)
  const getBasePath = () => {
    if (isCustomerCodeRoute && customerCode) {
      return `/${customerCode}/info_centre`;
    }
    return `/${effectivePracticeId}/info_centre`;
  };

  const handleExplore = (itemId, itemName) => {
    const basePath = getBasePath();
    router.push(`${basePath}/${category}/${itemId}`);
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

  // Get the current path segments to determine if we're using a customer code
  const pathname = usePathname();
  const pathSegments = pathname ? pathname.split('/').filter(Boolean) : [];
  const isCustomerCodeRoute = pathSegments[0] && !/^\d+$/.test(pathSegments[0]);
  const customerCode = isCustomerCodeRoute ? pathSegments[0] : null;
  const effectivePracticeId = customerCode || siteSettings?.practiceId;

  if (!sectionItems.length && !categoryDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">No items found in this category</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar practiceId={siteSettings?.practiceId} />
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
      <div className="py-6 pb-0">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="text-center">
              <div className="text-xl font-medium">
                <Link
                  href={getBasePath()}
                  className="text-primary underline hover:text-primary-dark transition-colors duration-200"
                  style={{ color: siteSettings?.primary_color }}
                >
                  Back To Info Centre
                </Link>                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sectionItems.map((item) => (
              <Link
                key={item.id}
                href={`${getBasePath()}/${category}/${item.id}`}
                className="bg-white rounded-lg shadow-md p-6 block hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-[200px] w-full mb-4 rounded-lg overflow-hidden">
                  <img
                    src={item.thumbnail_img_url || `https://www.ocumail.com${item.imgurl}`}
                    alt={item.name}
                    className="w-full h-full object-cover"                    
                  />
                </div>
                <h2 className="text-2xl font-bold text-black mb-4">{item.name}</h2>
                <p
                  className="text-gray-600 mb-4 line-clamp-2"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'normal',
                    lineClamp: '2',
                  }}
                >
                  {item.body}
                </p>
                <div className="mt-auto">
                  <span className="inline-block w-full text-sm bg-primary text-white px-6 py-3 rounded-full shadow-md hover:bg-opacity-90 transition-transform transform hover:scale-105 text-center whitespace-nowrap overflow-hidden text-ellipsis">
                    Explore {item.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>        
      </div>
    </main>
  );
};

export default InfoCentreListPage;
