"use client";

import { useState, useEffect } from 'react';

const categories = {
  refractive_conditions: {
    title: "Refractive Conditions",
    sections: [
      { id: 1, title: "Myopia", content: "Details about Myopia..." },
      { id: 2, title: "Hyperopia", content: "Details about Hyperopia..." },
      { id: 3, title: "Astigmatism", content: "Details about Astigmatism..." },
      { id: 4, title: "Presbyopia", content: "Details about Presbyopia..." },
      { id: 5, title: "Emmetropia", content: "Details about Emmetropia..." }
    ]
  },
  rx_lens_options: {
    title: "Rx Lens Options",
    sections: [
      { id: 1, title: "Single Vision", content: "Details about Single Vision Lenses..." },
      { id: 2, title: "Progressives", content: "Details about Progressive Lenses..." }
    ]
  },
  contact_lenses: {
    title: "Contact Lenses",
    sections: [
      { id: 1, title: "Soft Contact Lenses", content: "Information about soft contact lenses..." },
      { id: 2, title: "RGP Lenses", content: "Information about rigid gas permeable lenses..." }
    ]
  },
  cooper_vision: {
    title: "Cooper Vision",
    sections: [
      { id: 1, title: "Products", content: "Cooper Vision product information..." },
      { id: 2, title: "Technology", content: "Cooper Vision technology details..." }
    ]
  },
  pharmaceuticals: {
    title: "Pharmaceuticals",
    sections: [
      { id: 1, title: "Eye Drops", content: "Information about eye drops..." },
      { id: 2, title: "Medications", content: "Information about eye medications..." }
    ]
  },
  external_and_lid_pathology: {
    title: "External & Lid Pathology",
    sections: [
      { id: 1, title: "Blepharitis", content: "Information about blepharitis..." },
      { id: 2, title: "Chalazion", content: "Information about chalazion..." }
    ]
  },
  anterior_and_corneal_pathology: {
    title: "Anterior & Corneal Pathology",
    sections: [
      { id: 1, title: "Keratitis", content: "Information about keratitis..." },
      { id: 2, title: "Corneal Ulcer", content: "Information about corneal ulcers..." }
    ]
  },
  posterior_and_retinal_pathology: {
    title: "Posterior & Retinal Pathology",
    sections: [
      { id: 1, title: "Retinal Detachment", content: "Information about retinal detachment..." },
      { id: 2, title: "Macular Degeneration", content: "Information about macular degeneration..." }
    ]
  },
  general_eyecare: {
    title: "General Eyecare",
    sections: [
      { id: 1, title: "Eye Examinations", content: "Information about eye examinations..." },
      { id: 2, title: "Eye Health", content: "General eye health information..." }
    ]
  }
};

const InfoCentreListPage = ({ categoryPath }) => {
  const category = categories[categoryPath];

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Category not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <div className="w-full h-[400px] bg-[url('https://www.imageeyecareoptometrists.com/assets/info_centre_banner-4940284541b3ff321b2a3d735fc5ef1caa0f4c66de9804905118656edf31c88d.jpg')] bg-cover bg-center text-center text-white">
        <div className="bg-black bg-opacity-50 h-full flex flex-col items-center justify-center p-4">
          <h1 className="text-5xl font-bold mb-4">{category.title}</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {category.sections.map((section) => (
            <div 
              key={section.id} 
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h2 className="text-2xl font-semibold mb-4 text-primary">{section.title}</h2>
              <p className="text-gray-600">{section.content}</p>
              <button className="mt-4 text-primary hover:text-primary-dark transition-colors">
                Read More {'>'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoCentreListPage;
