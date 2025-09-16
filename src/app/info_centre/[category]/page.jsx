import Link from "next/link";
import Image from "next/image";
import Navbar from "../../pages/Navbar";
import refractiveData from '../data/refractive_conditions.json';
import rxLensData from '../data/rx_lens_options.json';
import contactLensesData from '../data/contact_lenses.json';

const formatCategoryName = (str) => {
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const getCategories = (categoryName) => {
  if (!categoryName) {
    console.error("Category name is undefined");
    return [];
  }

  const data = dataMapping[categoryName.toLowerCase()];
  if (!data) {
    console.warn(`No data found for category: ${categoryName}`);
    return [];
  }

  return Object.keys(data).map(key => ({
    id: key,
    title: data[key].title,
    image: data[key].banner,
    description: data[key].description
  }));
};

export default function CategoryPage({ params }) {
  const category = params.category || 'default_category';

  const categories = getCategories(category);

  const { practiceId } = useSiteSettings();

  return (
    <div>
      
      {/* Background Image Section */}
      <div className="w-full h-[600px] bg-[url('https://www.imageeyecareoptometrists.com/assets/info_centre_banner-4940284541b3ff321b2a3d735fc5ef1caa0f4c66de9804905118656edf31c88d.jpg')] bg-cover bg-center text-center text-white">
        <div className="bg-black bg-opacity-50 h-full flex flex-col items-center justify-center p-4">
          <h1 className="text-6xl font-bold mb-4">{formatCategoryName(category)}</h1>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((item) => (
            <Link
              key={item.id}
              href={`/website/${practiceId}/info_centre/${category}/${item.title.toLowerCase().replace(/ /g, '_')}`}
              as={`/website/${practiceId}/info_centre/${category}/${item.title.toLowerCase().replace(/ /g, '_')}`}
              className="block"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 h-full">
                <div className="relative h-56">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-3 text-primary">{item.title}</h3>
                  {item.description && (
                    <p className="text-gray-600">{item.description}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
