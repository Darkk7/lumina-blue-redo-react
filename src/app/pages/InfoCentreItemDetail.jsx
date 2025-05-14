import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const InfoCentreItemDetail = () => {
  const { itemId } = useParams();
  const [itemDetails, setItemDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(`https://www.ocumail.com/api/section_item/${itemId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch item details');
        }
        const data = await response.json();
        setItemDetails(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching item details:', error);
        setError('Failed to load item. Retrying...');
        setTimeout(fetchItemDetails, 3000); // Retry after 3 seconds
      }
    };

    if (itemId) {
      fetchItemDetails();
    }
  }, [itemId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!itemDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="item-detail">
      <h1>{itemDetails.name}</h1>
      <p>{itemDetails.description}</p>
      {/* Add more fields as necessary */}
    </div>
  );
};

export default InfoCentreItemDetail;
