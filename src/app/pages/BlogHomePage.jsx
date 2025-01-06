"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

const BlogHomePage = () => {
  const blogs = [
    {
      id: 1,
      imgSrc: "https://s3.eu-west-2.amazonaws.com/luminablue-blogs/uploads/OcuMarketing-campaign-header-BLAKC-FRIDAY700.jpg",
      title: "BLACK FRIDAY DEALS",
    },
    {
      id: 2,
      imgSrc: "https://s3.eu-west-2.amazonaws.com/luminablue-blogs/uploads/glasses-v-contact-lenses-thumb.png",
      title: "Pros and Cons of Spectacle Lenses and Contact Lenses",
    },
    {
      id: 3,
      imgSrc: "https://ocumail-content.s3.eu-west-2.amazonaws.com/Info-centre-thumbnails-cat-rxlenses.jpg",
      title: "Dangers of over-the-counter readers",
    },
    {
      id: 4,
      imgSrc: "https://ocumail-content.s3.eu-west-2.amazonaws.com/Info-centre-thumbnails-cat-rxlenses.jpg",
      title: "How chronic conditions can affect your vision",
    },
    {
      id: 5,
      imgSrc: "https://ocumail-content.s3.eu-west-2.amazonaws.com/Info-centre-thumbnails-cat-rxlenses.jpg",
      title: "Does sunglasses actually protect your vision?",
    },
  ];

  return (
    <div>
      {/* Background Image Section */}
      <div className="w-full h-[600px] bg-[url('https://www.imageeyecareoptometrists.com/assets/info_centre_banner-4940284541b3ff321b2a3d735fc5ef1caa0f4c66de9804905118656edf31c88d.jpg')] bg-cover bg-center text-center text-white">
        <div className="bg-black bg-opacity-50 h-full flex flex-col items-center justify-center p-4">
          <p className="text-6xl mb-8">
            Image Eye Care News Feed
          </p>          
        </div>
      </div>

      {/* Blog Cards Section */}
      <div className="py-8 px-6">  {/* Added padding to the sides here */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              key={blog.id}
            >
              <Link
                href={`/info_centre/list/${blog.id}`}
                className="block text-center no-underline"
              >
                <div className="relative w-auto h-0 pb-[56.25%]">  {/* Using padding-bottom for a 16:9 aspect ratio */}
                  <Image
                    className="absolute top-0 left-0 w-auto h-auto object-cover"
                    src={blog.imgSrc}
                    alt={`${blog.title} thumbnail`}
                    layout="fill"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-primary">{blog.title}</h4>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogHomePage;
