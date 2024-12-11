import React from "react";
import { FaRegEye, FaGlasses } from 'react-icons/fa';
import { GiGearHammer, GiSpectacleLenses } from "react-icons/gi";
import { LuHandHelping } from "react-icons/lu";
import { PiProjectorScreenChart } from "react-icons/pi";

export default function ServicesPage() {
  return (
    <div className="w-full bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Our Services
        </h1>
        <p className="text-1xl text-center text-gray-800 mb-8"> Our team of experts offer a wide range of services and products to cater for your individual needs. </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <div className="text-center mb-4">
              <FaRegEye className="text-primary text-4xl mx-auto" />
            </div>
            <h2 className="text-2xl font-semibold text-primary mb-4 text-center">Comprehensive Eye Examinations</h2>
            <p className="text-gray-600 text-center">
            We provide a range of eye examinations.
            Having your eyes tested regularly can also result in early detection of a serious health risk.
            Our aim is to make clear and comfortable vision a reality for all our patients based on each patient’s needs
            </p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <div className="text-center mb-4">
              <PiProjectorScreenChart className="text-primary text-4xl mx-auto" />
            </div>
            <h2 className="text-2xl font-semibold text-primary mb-4 text-center">Visual Acuity Tests</h2>
            <p className="text-gray-600 text-center">
            This test is used to measure the sharpness and clarity of your vision. 
            Testing both your near and distance vision using eye charts and different lenses we can determine how to improve your vision.
            </p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <div className="text-center mb-4">
              <LuHandHelping className="text-primary text-4xl mx-auto" />
            </div>
            <h2 className="text-2xl font-semibold text-primary mb-4 text-center">Frame Selection And Assistance</h2>
            <p className="text-gray-600 text-center">
            Frames are more than just corrective eyewear; they become part of your daily appurtenance. 
            Our team are here to help choose the perfect frame to meet your needs and preferences
            </p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <div className="text-center mb-4">
              <GiSpectacleLenses className="text-primary text-4xl mx-auto" />
            </div>
            <h2 className="text-2xl font-semibold text-primary mb-4 text-center">Contact Lens Consultation</h2>
            <p className="text-gray-600 text-center">
            Starting with an eye health assessment we can determine if you are able to wear Contact Lenses. 
            Once you are cleared you are fitted and the particular types of lenses are discussed to determine the best option for your lifestyle.
            </p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <div className="text-center mb-4">
              <GiGearHammer className="text-primary text-4xl mx-auto" />
            </div>
            <h2 className="text-2xl font-semibold text-primary mb-4 text-center">Frame And Spectacle Adjustments And Repairs</h2>
            <p className="text-gray-600 text-center">
            From time to time you may want your Frames adjusted or repaired. 
            Our skilled opticians can adjust the bridge, nose pads and temples to ensure the proper fit to your face.
            </p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <div className="text-center mb-4">
              <FaGlasses className="text-primary text-4xl mx-auto" />
            </div>
            <h2 className="text-2xl font-semibold text-primary mb-4 text-center">Frame Sales</h2>
            <p className="text-gray-600 text-center">
            We have a wide range or frames from a variety of brands to choose from. 
            These frames can be fitted with lenses to meet all your needs such as, indoor use, outdoor use, ready, driving and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
