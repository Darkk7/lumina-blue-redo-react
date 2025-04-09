"use client";

import Image from "next/image";
import { useSiteSettings } from "../context/SiteSettingsContext";
import { useState, useEffect } from "react";

const ReviewCard = ({ image, title, comments }) => (
  <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center">
    <Image
      src={image}
      alt={title}
      layout="intrinsic"
      width={64}
      height={48}
      className="mb-4"
    />
    <h3 className="text-2xl font-semibold text-primary mb-4">{title}</h3>
    <p className="text-gray-600">{comments}</p>
  </div>
);

const TestimonialsPage = () => {
 
  const { siteSettings, isLoading, error } = useSiteSettings();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    if (isLoading || error || !siteSettings?.reviews?.review?.length) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) =>
        (prev + 1) % siteSettings.reviews.review.length
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [isLoading, error, siteSettings]);

  return (
    <section id="testimonials" className="w-full bg-gray-100 py-16 text-center px-4">
      <h2 className="text-4xl font-bold mb-8 text-black">Clients' Reviews</h2>
      <p className="text-xl mb-8 text-black">
        Some of the recent feedback from our customers. Please rate your
        experience with our practice online.
      </p>
      <div className="flex justify-center items-center gap-8 flex-col sm:flex-row">
        <div className="p-6 bg-white shadow rounded-lg w-full sm:w-96">
          {isLoading ? (
            <p>Loading reviews...</p>
          ) : error ? (
            <p>Error loading reviews: {error}</p>
          ) : siteSettings?.reviews?.review?.length > 0 ? (
            <ReviewCard
              key={siteSettings.reviews.review[currentTestimonial].id}
              image={siteSettings.reviews.review[currentTestimonial].img}
              title={siteSettings.reviews.review[currentTestimonial].patient_name}
              comments={siteSettings.reviews.review[currentTestimonial].review_comments}
            />
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsPage;
