"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "../../Navbar";

const InfoCentrePageRestyling = () => {
  const tabColors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-red-500',
    'bg-yellow-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-orange-500',
    'bg-teal-500',
    'bg-cyan-500'
  ];

  const tabLinks = [
    { href: "/pages/info_centre", text: "Info Centre" },
    { href: "/refractive-conditions", text: "Refractive Conditions" },
    { href: "/rx-lens-options", text: "Rx Lens Options" },
    { href: "/contact-lenses", text: "Contact Lenses" },
    { href: "/cooper-vision", text: "Cooper Vision" },
    { href: "/pharmaceuticals", text: "Pharmaceuticals" },
    { href: "/external-lid-pathology", text: "External & Lid Pathology" },
    { href: "/anterior-corneal-pathology", text: "Anterior & Corneal Pathology" },
    { href: "/posterior-retinal-pathology", text: "Posterior & Retinal Pathology" },
    { href: "/general-eyecare", text: "General Eyecare" }
  ];

  const TabNavigation = () => (
    <div className="flex flex-wrap -mb-px">
      {tabLinks.map((link, index) => (
        <Link 
          key={link.href} 
          href={link.href}
          className={`relative ${tabColors[index]} text-white px-6 py-3 rounded-t-lg 
            hover:brightness-110 transition-all
            ${index > 0 ? '-ml-4' : ''} 
            transform hover:translate-y-[-2px] hover:z-10
            z-${index}`}
          style={{
            clipPath: 'polygon(0 0, 95% 0, 100% 100%, 5% 100%)',
            marginBottom: '-1px'
          }}
        >
          <div className="whitespace-nowrap">{link.text}</div>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="bg-white">
      <Navbar />

      {/* Background Image Section */}
      <div className="w-full h-[300px] md:h-[600px] bg-[url('https://www.imageeyecareoptometrists.com/assets/info_centre_banner-4940284541b3ff321b2a3d735fc5ef1caa0f4c66de9804905118656edf31c88d.jpg')] bg-cover bg-center text-center text-white">
        <div className="bg-black bg-opacity-50 h-full flex flex-col items-center justify-center p-4">
          <p className="text-3xl md:text-6xl mb-4 md:mb-8">Short-Sightedness</p>
        </div>
      </div>

      {/* Content Section with gray background */}
      <div className="bg-gray-100 py-8">
        {/* White content area */}
        <div className="bg-white max-w-7xl mx-auto shadow-lg">
          {/* Main Content */}
          <div className="w-full p-8 text-gray-900">
            {/* Tab Navigation at top of content */}
            <div className="w-full overflow-x-auto mb-6">
              <TabNavigation />
            </div>

            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-gray-900">Understanding Short-Sightedness</h2>
            <p className="mb-4">
              Short-sightedness, also known as myopia, is a common vision condition where close objects appear clearly, but distant objects appear blurry. This occurs when the shape of the eye causes light rays to bend (refract) incorrectly, focusing images in front of your retina instead of on your retina.
            </p>
            <h3 className="text-xl md:text-2xl font-semibold mb-2">Causes of Short-Sightedness</h3>
            <p className="mb-4">
              Myopia can develop in both children and adults. Several factors contribute to its development, including:
            </p>
            <ul className="list-disc ml-4 md:ml-8 mb-4">
              <li>Genetics: A family history of myopia increases the risk.</li>
              <li>Close-up Activities: Spending significant time on close-up activities such as reading or using digital devices.</li>
              <li>Environmental Factors: Limited time spent outdoors may contribute to the development of myopia.</li>
            </ul>
            <h3 className="text-xl md:text-2xl font-semibold mb-2">Symptoms</h3>
            <p className="mb-4">
              Common symptoms of short-sightedness include:
            </p>
            <ul className="list-disc ml-4 md:ml-8 mb-4">
              <li>Blurred vision when looking at distant objects.</li>
              <li>Need to squint or partially close the eyelids to see clearly.</li>
              <li>Headaches caused by eyestrain.</li>
              <li>Difficulty seeing while driving, especially at night.</li>
            </ul>
            <h3 className="text-xl md:text-2xl font-semibold mb-2">Diagnosis</h3>
            <p className="mb-4">
              An eye examination by an optometrist or ophthalmologist can diagnose myopia. During the exam, various tests are conducted to measure how your eyes focus light and determine the power of any corrective lenses you may need.
            </p>
            <h3 className="text-xl md:text-2xl font-semibold mb-2">Treatment Options</h3>
            <p className="mb-4">
              There are several treatments available for short-sightedness, including:
            </p>
            <ul className="list-disc ml-4 md:ml-8 mb-4">
              <li>Prescription Glasses or Contact Lenses: These are the most common and effective ways to correct myopia.</li>
              <li>Refractive Surgery: Procedures such as LASIK or PRK can reshape the cornea to correct myopia.</li>
              <li>Orthokeratology: Specially designed contact lenses that temporarily reshape the cornea.</li>
            </ul>
            <h3 className="text-xl md:text-2xl font-semibold mb-2">Prevention</h3>
            <p className="mb-4">
              While myopia cannot always be prevented, certain practices may help reduce the risk or slow its progression:
            </p>
            <ul className="list-disc ml-4 md:ml-8 mb-4">
              <li>Limit time spent on close-up activities and take regular breaks.</li>
              <li>Encourage outdoor activities.</li>
              <li>Regular eye examinations to monitor eye health and vision changes.</li>
            </ul>
            <h3 className="text-xl md:text-2xl font-semibold mb-2">Living with Short-Sightedness</h3>
            <p className="mb-4">
              Most people with myopia can manage their condition effectively with the right corrective measures. It's essential to follow your eye care professional's recommendations and keep up with regular eye check-ups.
            </p>
            <p className="mb-4">
              Understanding and managing short-sightedness can greatly improve your quality of life. For more information or to schedule an eye exam, visit your local eye care provider.
            </p>

            {/* Tab Navigation at bottom of content */}
            <div className="w-full overflow-x-auto mt-6">
              <TabNavigation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCentrePageRestyling;