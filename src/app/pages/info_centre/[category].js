// pages/info_centre/[category].js
import { useRouter } from 'next/router';
import Image from 'next/image';
import Navbar from '../Navbar';
import categories from '../../../data/categories';

const CategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;
  const selectedCategory = categories.find(cat => cat.path === category);

  if (!selectedCategory) {
    return <h1>Category not found</h1>;
  }

  return (
    <div>
      <Navbar />
      {/* Background Image Section */}
      <div className="w-full h-[600px] bg-[url('https://www.imageeyecareoptometrists.com/assets/info_centre_banner-4940284541b3ff321b2a3d735fc5ef1caa0f4c66de9804905118656edf31c88d.jpg')] bg-cover bg-center text-center text-white">
        <div className="bg-black bg-opacity-50 h-full flex flex-col items-center justify-center p-4">
          <p className="text-6xl mb-8">{selectedCategory.title}</p>
        </div>
      </div>

      {/* Additional content specific to the category can go here */}
    </div>
  );
};

export default CategoryPage;
