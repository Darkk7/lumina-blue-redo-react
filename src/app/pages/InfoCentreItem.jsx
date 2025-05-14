import axios from 'axios';
import { useEffect, useState } from 'react';

const InfoCentreItem = () => {
  const [categories, setCategories] = useState([]);
  const [mainRelativeUrlPath, setMainRelativeUrlPath] = useState('');
  const [practiceId, setPracticeId] = useState('');
  const [loadWebsiteConfig, setLoadWebsiteConfig] = useState(false);

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

  return (
    <div className="article">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 sheet primary-color-border-top bg-white">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCentreItem;
