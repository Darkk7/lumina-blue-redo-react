"use client";

import Image from "next/image";
import { useSiteSettings } from "../context/SiteSettingsContext";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";

const ReviewCard = ({ image, title, comments, className = "" }) => (
  <div className={`h-full ${className}`}>
    <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col transition-all duration-300 hover:shadow-lg">
      {/* Testimonial Text at the top */}
      <p className="text-gray-600 text-center mb-6 flex-1">
        "{comments}"
      </p>
      
      {/* Image in the middle */}
      <div className="relative w-20 h-20 mx-auto mb-4">
        <Image
          src={image || '/placeholder-avatar.png'}
          alt={title}
          fill
          className="object-cover rounded-full"
          sizes="80px"
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
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef(null);
  
  // Get all available reviews
  const allReviews = useMemo(() => {
    return siteSettings?.reviews?.review || [];
  }, [siteSettings]);

  // Function to get 3 random reviews
  const getRandomReviews = useCallback(() => {
    if (allReviews.length <= 3) return allReviews;
    const shuffled = [...allReviews].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, [allReviews]);

  // Set up the interval to cycle through reviews
  useEffect(() => {
    if (allReviews.length === 0) return;

    const cycleReviews = () => {
      setIsAnimating(true);
      timeoutRef.current = setTimeout(() => {
        setCurrentReviews(getRandomReviews());
        setIsAnimating(false);
      }, 500); // Half a second for the fade out animation
    };

    // Initial set of reviews
    setCurrentReviews(getRandomReviews());
    
    // Set up interval for cycling (every 7 seconds)
    const interval = setInterval(cycleReviews, 7000);
    
    // Clean up
    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[300px]">
              {isLoading ? (
                <div className="col-span-3 text-center py-12">Loading reviews...</div>
              ) : error ? (
                <div className="col-span-3 text-center py-12 text-red-500">Error loading reviews: {error}</div>
              ) : currentReviews.length > 0 ? (
                currentReviews.map((review) => (
                  <div key={review.id} className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                    <ReviewCard
                      image={review.img}
                      title={review.patient_name}
                      comments={review.review_comments}
                      className="animate-fadeIn"
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-12 text-gray-500">No reviews available.</div>
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
