import axios from 'axios';
import { useEffect, useState } from 'react';

const InfoCentreItem = () => {
  const [categories, setCategories] = useState([]);
  const [mainRelativeUrlPath, setMainRelativeUrlPath] = useState('');
  const [practiceId, setPracticeId] = useState('');
  const [loadWebsiteConfig, setLoadWebsiteConfig] = useState(false);
  const [selectedItemContent, setSelectedItemContent] = useState(null); // State for JSON content

  useEffect(() => {
    axios.get('/api/section_categories') // Use the section_items endpoint
      .then(response => {
        // Assuming the response has the structure you need
        setCategories(response.data.section_categories_data); // Adjust based on actual data structure
        setMainRelativeUrlPath(response.data.main_relative_url_path); // Adjust based on actual data structure
        setPracticeId(response.data.practice_id); // Adjust based on actual data structure
        setLoadWebsiteConfig(response.data.load_website_config); // Adjust based on actual data structure
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleItemClick = (itemId) => {
    axios.get(`/api/section_items/${itemId}`) // Fetch JSON content for the clicked item
      .then(response => {
        setSelectedItemContent(response.data); // Update state with the fetched content
      })
      .catch(error => console.error('Error fetching item content:', error));
  };

  return (
    <div className="article">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 sheet primary-color-border-top bg-white">
            <ul>
              {categories.map(category => (
                <li key={category.id}>
                  <h3>{category.name}</h3>
                  <ul>
                    {category.items.map(item => (
                      <li key={item.id} onClick={() => handleItemClick(item.id)}>
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            {selectedItemContent && (
              <div className="json-content">
                <pre>{JSON.stringify(selectedItemContent, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCentreItem;
