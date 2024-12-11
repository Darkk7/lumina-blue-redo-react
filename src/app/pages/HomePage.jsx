import React from "react";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="w-full h-[600px] bg-[url('https://s3.eu-west-2.amazonaws.com/luminablue-blogs/1721909136_67_banner.png')] bg-cover bg-center text-center text-white">
      <div className="bg-black bg-opacity-50 h-full flex flex-col items-center justify-center p-4">
        <p className="text-3xl mb-8">
          Serving the community for over 75 years delivering the highest quality care and products for our customers
        </p>
        <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-white hover:text-primary hover:border-orange-500 border-1 transition">
          Make A Booking
        </button>
      </div>
    </div>
  );
}