import React, { useState } from 'react';
import { useRouter } from 'next/router';

const InfoCentreItem = ({ sectionItemId, subCategories }) => {
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const router = useRouter();

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
    router.push(`/website/67/info_centre/${sectionItemId}`);
  };

  return (
    <div>
      <h1>Info Centre</h1>
      <div>
        <h2>Subcategories</h2>
        <ul>
          {subCategories.map((subCategory) => (
            <li key={subCategory.id}>
              <button onClick={() => handleSubCategoryClick(subCategory)}>
                {subCategory.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedSubCategory && (
        <div>
          <h3>Selected Subcategory Content</h3>
          <pre>{JSON.stringify(selectedSubCategory, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default InfoCentreItem;
