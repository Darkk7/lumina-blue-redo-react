import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchSectionCategories from '../../../api/fetchSectionCategories';

const InfoCentre = () => {
  const { practiceId } = useParams();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchSectionCategories(practiceId);
        setCategories(data);
      } catch (error) {
        console.error('Failed to load section categories:', error);
      }
    };

    loadCategories();
  }, [practiceId]);

  return (
    <div>
      <h1>Info Centre for Practice {practiceId}</h1>
      <ul>
        {Array.isArray(categories) && categories.map((category, index) => (
          <li key={index}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default InfoCentre;
