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
    <section id="brands" className="w-full bg-gray-100 py-16 text-center">
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-8">
        {brands.map((brand, index) => (
          <div key={index} className="flex justify-center items-center">
            <Image src={brand.src} alt={brand.alt} width={250} height={250} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandsPage;
