"use client";

import Image from "next/image";
import { useSiteSettings } from "../context/SiteSettingsContext";
import { useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ReviewCard = ({ image, title, comments }) => (
  <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center mx-2 h-[300px]">
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section id="testimonials" className="w-full bg-white py-16 text-center px-4">
      <h2 className="text-4xl font-bold mb-8 text-black">Clients' Reviews</h2>
      <p className="text-xl mb-8 text-black">
        Some of the recent feedback from our customers. Please rate your
        experience with our practice online.
      </p>
      <div className="max-w-6xl mx-auto">
        {isLoading ? (
          <p>Loading reviews...</p>
        ) : error ? (
          <p>Error loading reviews: {error}</p>
        ) : siteSettings?.reviews?.review?.length > 0 ? (
          <Slider {...settings}>
            {siteSettings.reviews.review.map((review, index) => (
              <ReviewCard
                key={index}
                image={review.img}
                title={review.patient_name}
                comments={review.review_comments}
              />
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
