import axios from 'axios';
import { useEffect, useState } from 'react';

const InfoCentre = () => {
  const [categories, setCategories] = useState([]);
  const [mainRelativeUrlPath, setMainRelativeUrlPath] = useState('');
  const [practiceId, setPracticeId] = useState('');
  const [loadWebsiteConfig, setLoadWebsiteConfig] = useState(false);

  useEffect(() => {
    axios.get('/api/section_items') // Use the section_items endpoint
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
            {categories.map(curCat => {
              const link = loadWebsiteConfig
                ? `${mainRelativeUrlPath}info_centre/list/${curCat.id}`
                : `${mainRelativeUrlPath}info_centre/list/${curCat.id}/${practiceId}`;

              return (
                <a key={curCat.id} className="col-md-4 col-ld-4 category-item primary-color" href={link} style={{ textDecoration: 'none' }}>
                  <img className='img-responsive' src={curCat.thumbnail_img_url} alt="info thumbnail" />
                  <h4 id="info-centre-home-headings">{curCat.name}</h4>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCentre;
