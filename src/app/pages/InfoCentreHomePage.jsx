"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

const InfoCentreHomePage = () => {
  const categories = [
    {
      id: 29,
      imgSrc: "https://ocumail-content.s3.eu-west-2.amazonaws.com/Refractive-conditions-thumb.jpg",
      title: "Refractive conditions",
    },
    {
      id: 30,
      imgSrc: "https://ocumail-content.s3.eu-west-2.amazonaws.com/Info-centre-thumbnails-cat-rxlenses.jpg",
      title: "Rx lens options",
    },
    {
      id: 37,
      imgSrc: "https://ocumail-content.s3.eu-west-2.amazonaws.com/Info_thumb_cat_contactlenses.jpg",
      title: "Contact lenses",
    },
    {
      id: 34,
      imgSrc: "https://ocumail-content.s3.eu-west-2.amazonaws.com/Cooper-Vision-thumb.jpg",
      title: "Cooper Vision",
    },
    {
      id: 36,
      imgSrc: "https://ocumail-content.s3.eu-west-2.amazonaws.com/Info-centre-cat-pharma.jpg",
      title: "Pharmaceuticals",
    },
    {
      id: 31,
      imgSrc: "https://ocumail-content.s3.eu-west-2.amazonaws.com/External-%26-lid-pathology-thumb.jpg",
      title: "External & lid pathology",
    },
    {
      id: 32,
      imgSrc: "https://ocumail-content.s3.eu-west-2.amazonaws.com/Anterior-%26-corneal-pathology-thumb.jpg",
      title: "Anterior & corneal pathology",
    },
    {
      id: 33,
      imgSrc: "https://ocumail-content.s3.eu-west-2.amazonaws.com/Posterior-%26-retinal-pathology-thumb.jpg",
      title: "Posterior & retinal pathology",
    },
    {
      id: 35,
      imgSrc: "https://ocumail-content.s3.eu-west-2.amazonaws.com/General-Eyecare-thumb.jpg",
      title: "General Eyecare",
    },
  ];

  return (
    <div>
      {/* Background Image Section */}
      <div className="w-full h-[600px] bg-[url('https://www.imageeyecareoptometrists.com/assets/info_centre_banner-4940284541b3ff321b2a3d735fc5ef1caa0f4c66de9804905118656edf31c88d.jpg')] bg-cover bg-center text-center text-white">
        <div className="bg-black bg-opacity-50 h-full flex flex-col items-center justify-center p-4">
          <p className="text-7xl mb-8">
            Welcome To Our Info Centre
          </p>
          <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-white hover:text-primary hover:border-orange-500 border-1 transition">
            Make A Booking
          </button>
        </div>
      </div>

      {/* Categories Cards Section */}
      <div className="py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              key={category.id}
            >
              <Link
                href={`/info_centre/list/${category.id}`}
                className="block text-center no-underline"
              >
                <Image
                  className="w-full h-48 object-cover"
                  src={category.imgSrc}
                  alt={`${category.title} thumbnail`}
                  width={300}
                  height={200}
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-primary">{category.title}</h4>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoCentreHomePage;
