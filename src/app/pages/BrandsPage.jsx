"use client"

import Image from "next/image";

const BrandsPage = () => {
  const brands = [
    { src: "/images/OakleyEyewear.png", alt: "Oakley" },
    { src: "/images/CooperVisionBrand.png", alt: "CooperVision" },
    { src: "/images/NikeEyewear.png", alt: "Nike" },
    { src: "/images/PoliceEyewear.png", alt: "Police" },
    { src: "/images/HoyaBrand.png", alt: "Hoya" },
  ];

  return (
    <section id="brands" className="w-full bg-white py-16 px-4 sm:px-8 lg:px-16 text-center">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
        {brands.map((brand, index) => (
          <div key={index} className="flex justify-center items-center">
            <Image
              src={brand.src}
              alt={brand.alt}
              width={200}  // Adjusted image width for mobile
              height={200}  // Adjusted image height for mobile
              className="object-contain"  // Ensures images are not stretched
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandsPage;
