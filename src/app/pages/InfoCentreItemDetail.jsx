import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const InfoCentreItemDetail = () => {
  const { itemId } = useParams();
  const [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(`https://www.ocumail.com/api/section_item/${itemId}`);
        if (!response.ok) {
          console.error('Failed to fetch item details:', response.statusText);
          return;
        }
        const data = await response.json();
        setItemDetails(data);
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    };

    if (itemId) {
      fetchItemDetails();
    }
  }, [itemId]);

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
