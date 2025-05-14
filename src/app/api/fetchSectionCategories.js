import axios from 'axios';
import getTodayKey from './getTodayKey';

const fetchSectionCategories = async () => {
  const ocumailUrl = 'https://www.ocumail.com/api'; // Replace with the appropriate URL based on your environment
  const apiKey = getTodayKey();

  try {
    const response = await axios.get(`${ocumailUrl}/section_categories.json`, {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        api_key: apiKey
      }
    });
    console.log(response.data);
    // You can now use response.data in your React component
  } catch (error) {
    console.error('Error fetching section categories:', error);
  }
};

export default fetchSectionCategories;
