import React from 'react';
import Navbar from '../../../pages/Navbar';
import FooterPage from '../../../pages/FooterPage';

const MyopiaPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-primary">Myopia (Short-sightedness)</h1>
        <p>Myopia, also known as short-sightedness, is a common vision condition where you can see objects near to you clearly, but objects farther away are blurry.</p>
        <h2 className="text-2xl font-semibold mt-4">Symptoms</h2>
        <p>Common symptoms include squinting, eye strain, headaches, and difficulty seeing objects at a distance.</p>
        <h2 className="text-2xl font-semibold mt-4">Treatment Options</h2>
        <p>Treatment options include prescription eyeglasses, contact lenses, and in some cases, refractive surgery like LASIK.</p>
      </div>
      <FooterPage />
    </div>
  );
};

export default MyopiaPage;
