"use client";

import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const CounterPage = () => {
  
  const [primaryColor, setPrimaryColor] = useState('orange');

  useEffect(() => {
    setPrimaryColor('orange');
  }, []);

  return (
    <>
      {/* Counter Section */}
      <section className="w-full bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-between space-x-8">
            {/* Counter 1 */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-20">
              <Image
                src="/images/GlassesInCase.svg"
                alt="Number of Brands"
                width={50}
                height={50}
                className="text-orange-500 mb-4"
              />
              </div>
              <p className="text-4xl font-bold text-primary">821</p>
              <p className="text-md text-black"><i>Number of brands</i></p>
            </div>
            {/* Counter 2 */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-20">
                <Image
                  src="/images/Specs.svg"
                  alt="Frame Stock"
                  width={50}
                  height={50}
                  className="mb-4"
                />
              </div>
              <p className="text-4xl font-bold text-primary">1550</p>
              <p className="text-md text-black"><i>Frame stock</i></p>
            </div>
            {/* Counter 3 */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-20">
                <Image
                  src="/images/Suns.svg"
                  alt="Sunglasses Stock"
                  width={50}
                  height={50}
                  className="mb-4"
                />
              </div>
              <p className="text-4xl font-bold text-primary">780</p>
              <p className="text-md text-black"><i>Sunglasses stock</i></p>
            </div>
            {/* Counter 4 */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-20">
                <Image
                  src="/images/Established.svg"
                  alt="Established Year"
                  width={50}
                  height={50}
                  className="mb-4"
                />
              </div>
              <p className="text-4xl font-bold text-primary">1957</p>
              <p className="text-md text-black"><i>Year (trading since)</i></p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CounterPage;
