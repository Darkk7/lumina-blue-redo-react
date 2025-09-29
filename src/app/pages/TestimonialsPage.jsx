"use client";

import Image from "next/image";
import { useSiteSettings } from "../context/SiteSettingsContext";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";

const ReviewCard = ({ image, title, comments, className = "" }) => (
  <div className={`h-full ${className}`}>
    <div className="bg-white p-8 rounded-xl shadow-md h-full flex flex-col transition-all duration-300 hover:shadow-lg">
      {/* Testimonial Text at the top */}
      <p className="text-gray-600 text-center mb-10 flex-1 text-lg leading-relaxed flex items-center">
        <span className="inline-block">"{comments}"</span>
      </p>
      
      {/* Image in the middle */}
      <div className="relative w-28 h-28 mx-auto mb-8">
        <Image
          src={image || '/placeholder-avatar.png'}
          alt={title}
          fill
          className="object-cover rounded-full"
          sizes="112px"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/placeholder-avatar.png';
          }}
        />
      </div>
      
      {/* Name and title at the bottom */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
      </div>
    </div>
  </div>
);

const TestimonialsPage = () => {
  const { siteSettings, isLoading, error } = useSiteSettings();
  const [currentReviews, setCurrentReviews] = useState([]);
  
  // Get all available reviews
  const allReviews = useMemo(() => {
    return siteSettings?.reviews?.review || [];
  }, [siteSettings]);

  // Function to get 4 random reviews
  const getRandomReviews = useCallback(() => {
    if (allReviews.length <= 4) return [...allReviews];
    const shuffled = [...allReviews].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  }, [allReviews]);

  // Set up the interval to cycle through reviews
  useEffect(() => {
    if (allReviews.length === 0) return;

    const cycleReviews = () => {
      setCurrentReviews(prevReviews => {
        if (prevReviews.length < 2) return getRandomReviews();
        // Rotate the array to switch places
        return [...prevReviews.slice(1), prevReviews[0]];
      });
    };

    // Initial set of reviews
    setCurrentReviews(getRandomReviews());
    
    // Set up interval for cycling (every 7 seconds)
    const interval = setInterval(cycleReviews, 7000);
    
    // Clean up
    return () => clearInterval(interval);
  }, [allReviews, getRandomReviews]);

  return (
    <div className="w-full">
      {/* Primary Color Panel */}
      <div className="w-full bg-primary pt-20 pb-60 relative">
        <div className="absolute top-0 left-0 right-0 pt-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">What do our patients say?</h1>
            <div className="w-20 h-1 bg-white mx-auto"></div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <section className="w-full py-20 px-4 bg-gray-50 -mt-52">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[400px]">
              {isLoading ? (
                <div className="col-span-4 text-center py-12">Loading reviews...</div>
              ) : error ? (
                <div className="col-span-4 text-center py-12 text-red-500">Error loading reviews: {error}</div>
              ) : currentReviews.length > 0 ? (
                currentReviews.map((review) => (
                  <div key={review.id} className="transition-all duration-500">
                    <ReviewCard
                      image={review.img}
                      title={review.patient_name}
                      comments={review.review_comments}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-4 text-center py-12 text-gray-500">No reviews available.</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;

<style jsx global>{`
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }
`}</style>
