import Link from "next/link";
import Image from "next/image";
import Navbar from "../../../pages/Navbar";
import FooterPage from "../../../pages/FooterPage";
import data from '../../data/refractive_conditions.json';
import contactLensesData from '../../data/contact_lenses.json';

const getConditionContent = (condition) => {
  const normalizedCondition = condition.toLowerCase().replace(/_/g, '');
  return data[normalizedCondition] || null;
};

export default function SubcategoryPage({ params }) {
  const { category, subcategory } = params;

  let conditionContent;

  if (category === 'contact_lenses') {
    const subcategoryKey = subcategory.replace(/_/g, ' ').toLowerCase(); // Normalize the key
    conditionContent = contactLensesData[subcategoryKey];
  } else {
    conditionContent = getConditionContent(subcategory);
  }

  if (!conditionContent) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-primary">Content Not Found</h1>
        </div>
      </div>
    );
  }

  if (category === 'contact_lenses') {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        
        {/* Banner Section */}
        {conditionContent.banner && (
          <div 
            className="w-full h-[400px] bg-cover bg-center text-center text-white relative"
            style={{ backgroundImage: `url(${conditionContent.banner})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h1 className="text-5xl font-bold">{conditionContent.title}</h1>
            </div>
          </div>
        )}

        {/* White Page Content */}
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
                <span className="text-gray-600">{conditionContent.title}</span>
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold text-primary">{conditionContent.title}</h2>
                <p className="text-gray-600 leading-relaxed text-lg">{conditionContent.description}</p>
                {conditionContent.benefits && (
                  <ul>
                    {conditionContent.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
        <FooterPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      {/* Banner Section */}
      {conditionContent.banner && (
        <div 
          className="w-full h-[400px] bg-cover bg-center text-center text-white relative"
          style={{ backgroundImage: `url(${conditionContent.banner})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-5xl font-bold">{conditionContent.title}</h1>
          </div>
        </div>
      )}

      {/* White Page Content */}
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
              <span className="text-gray-600">{conditionContent.title}</span>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {conditionContent.sections && conditionContent.sections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h2 className="text-3xl font-semibold text-primary">{section.title}</h2>
                <p className="text-gray-600 leading-relaxed text-lg">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FooterPage />
    </div>
  );
}