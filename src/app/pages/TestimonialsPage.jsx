"use client";

import Image from "next/image";
import { useSiteSettings } from "../context/SiteSettingsContext";
import { useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ReviewCard = ({ image, title, comments }) => (
  <div className="bg-white p-6 rounded-lg flex flex-col items-center mx-2 h-[300px]">
    <div className="relative w-16 h-12 mb-4">
      <Image
        src={image}
        alt={title}
        fill
        className="object-contain"
        sizes="64px"
      />
    </div>
    <h3 className="text-2xl font-semibold text-primary mb-4">{title}</h3>
    <p className="text-gray-600 overflow-y-auto flex-1 w-full text-center">{comments}</p>
  </div>
);

const TestimonialsPage = () => {
  const { siteSettings, isLoading, error } = useSiteSettings();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
  };

  return (
    <section id="testimonials" className="w-full py-16 text-center px-4">
      <h1 className="text-3xl font-bold mb-8 text-black">Clients' Reviews</h1>
      <p className="text-lg text-center mb-12 text-gray-600 max-w-5xl mx-auto">
        Some of the recent feedback from our customers. Please rate your
        experience with us via Google.
      </p>
      <div className="max-w-6xl mx-auto bg-">
        {isLoading ? (
          <p>Loading reviews...</p>
        ) : error ? (
          <p>Error loading reviews: {error}</p>
        ) : siteSettings?.reviews?.review?.length > 0 ? (
          <Slider {...sliderSettings}>
            {siteSettings.reviews.review.map((review, index) => (
              <div key={index} className="flex flex-col items-center mx-2">
                <ReviewCard
                  image={review.img}
                  title={review.patient_name}
                  comments={review.review_comments}
                />
              </div>
            ))}
          </Slider>
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </section>
  );
};

export default TestimonialsPage;
