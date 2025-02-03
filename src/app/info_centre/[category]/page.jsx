import Link from "next/link";
import Image from "next/image";
import Navbar from "../../pages/Navbar";

// Format the category name for display
const formatCategoryName = (str) => {
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function CategoryPage({ params }) {
  const category = params.category;
  
  const getCategories = (categoryName) => {
    if (categoryName === 'refractive_conditions') {
      return [
        { 
          id: 1, 
          title: "Myopia", 
          image: "https://ocumail-content.s3.eu-west-2.amazonaws.com/info_thumb_refconditions_myopia.jpg"
        },
        { 
          id: 2, 
          title: "Hyperopia", 
          image: "https://ocumail-content.s3.eu-west-2.amazonaws.com/info_thumb_refconditions_hyperopia.jpg"
        },
        { 
          id: 3, 
          title: "Astigmatism", 
          image: "https://ocumail-content.s3.eu-west-2.amazonaws.com/info_thumb_refconditions_astig.jpg"
        },
        { 
          id: 4, 
          title: "Emmetropia", 
          image: "https://ocumail-content.s3.eu-west-2.amazonaws.com/info_thumb_refconditions_emmetropia.jpg"
        },
        { 
          id: 5, 
          title: "Presbyopia", 
          image: "https://ocumail-content.s3.eu-west-2.amazonaws.com/info_thumb_refconditions_presbyopia.jpg"
        },
      ];
    }
    return [
      { id: 1, title: "Test 1" },
      { id: 2, title: "Test 2" },
      { id: 3, title: "Test 3" },
      { id: 4, title: "Test 4" },
    ];
  };

  const categories = getCategories(category);

  return (
    <div>
      <Navbar />
      
      {/* Background Image Section */}
      <div className="w-full h-[600px] bg-[url('https://www.imageeyecareoptometrists.com/assets/info_centre_banner-4940284541b3ff321b2a3d735fc5ef1caa0f4c66de9804905118656edf31c88d.jpg')] bg-cover bg-center text-center text-white">
        <div className="bg-black bg-opacity-50 h-full flex flex-col items-center justify-center p-4">
          <h1 className="text-6xl font-bold mb-4">Welcome To Our Info Centre</h1>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary">
          {formatCategoryName(category)}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((item) => (
            <Link
              key={item.id}
              href={`/info_centre/${category}/${item.title.toLowerCase().replace(/ /g, '_')}`}
              className="block"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 h-full">
                <div className="relative h-56">
                  <Image
                    src={item.image || 'https://www.imageeyecareoptometrists.com/assets/info_centre_banner-4940284541b3ff321b2a3d735fc5ef1caa0f4c66de9804905118656edf31c88d.jpg'}
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
