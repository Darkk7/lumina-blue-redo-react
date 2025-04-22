"use client";

import Image from "next/image";
import Link from "next/link";
import { useSiteSettings } from '../context/SiteSettingsContext';

const InfoCentreHomePage = () => {
  const { siteSettings } = useSiteSettings();
  
  const categories = [
    { id: 29, imgSrc: "https://ocumail-content.s3.eu-west-2.amazonaws.com/Refractive-conditions-thumb.jpg", path: "refractive_conditions", title: "Refractive conditions" },
    { id: 30, imgSrc: "https://ocumail-content.s3.eu-west-2.amazonaws.com/Info-centre-thumbnails-cat-rxlenses.jpg", path: "rx_lens_options", title: "Rx lens options" },
    { id: 37, imgSrc: "https://ocumail-content.s3.eu-west-2.amazonaws.com/Info_thumb_cat_contactlenses.jpg", path: "contact_lenses", title: "Contact lenses" },
    { id: 34, imgSrc: "https://ocumail-content.s3.eu-west-2.amazonaws.com/Cooper-Vision-thumb.jpg", path: "cooper_vision", title: "Cooper Vision" },
    { id: 36, imgSrc: "https://ocumail-content.s3.eu-west-2.amazonaws.com/Info-centre-cat-pharma.jpg", path: "pharmaceuticals", title: "Pharmaceuticals" },
    { id: 31, imgSrc: "https://ocumail-content.s3.eu-west-2.amazonaws.com/External-%26-lid-pathology-thumb.jpg", path: "external_and_lid_pathology", title: "External & lid pathology" },
    { id: 32, imgSrc: "https://ocumail-content.s3.eu-west-2.amazonaws.com/Anterior-%26-corneal-pathology-thumb.jpg", path: "anterior_and_corneal_pathology", title: "Anterior & corneal pathology" },
    { id: 33, imgSrc: "https://ocumail-content.s3.eu-west-2.amazonaws.com/Posterior-%26-retinal-pathology-thumb.jpg", path: "posterior_and_retinal_pathology", title: "Posterior & retinal pathology" },
    { id: 35, imgSrc: "https://ocumail-content.s3.eu-west-2.amazonaws.com/General-Eyecare-thumb.jpg", path: "general_eyecare", title: "General Eyecare" }
  ];

  return (
    <div>
      {/* Background Image Section */}
      <div className="w-full h-[600px] bg-[url('https://www.imageeyecareoptometrists.com/assets/info_centre_banner-4940284541b3ff321b2a3d735fc5ef1caa0f4c66de9804905118656edf31c88d.jpg')] bg-cover bg-center text-center text-white">
        <div className="bg-black bg-opacity-50 h-full flex flex-col items-center justify-center p-4">
          <h1 className="text-6xl font-bold mb-4">Welcome To Our Info Centre</h1>
        </div>
      </div>

      {/* Categories Cards Section */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/website/${siteSettings?.practiceId}/info_centre/${category.path}`}
              className="block"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 h-full">
                <div className="relative h-56">
                  <Image
                    src={category.imgSrc}
                    alt={category.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-center text-2xl font-semibold mb-3 text-primary">{category.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoCentreHomePage;
