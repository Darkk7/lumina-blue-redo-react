import React from "react";

export default function AboutPage() {
  return (
    <section id="about" className="w-full bg-white text-center flex flex-col lg:flex-row items-center lg:items-stretch">
      <div className="lg:w-1/2 flex justify-center items-end mb-4 lg:mb-0">
        <img
          src="/images/PaulKetz.png"
          alt="Image Eyecare Practice"
          className="w-full h-auto max-w-md rounded-lg"
        />
      </div>
      <div className="lg:w-1/2 text-center lg:text-left px-4 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-4 text-black">About Our Practice</h2>
        <p className="text-gray-600 max-w-prose leading-loose">
          Established in 1957, Image Eyecare is a third generation optometry practice serving the Port Elizabeth community for over 60 years.
          The practice Owner, Dr. Paul Ketz, is a pioneer in software research and development and has become recognized as an authority and clinical adviser to suppliers and many eye care professionals internationally.
          <br/>
          <br/>
          The practice ethos of professionalism and care has improved the quality of life for many patients and all staff are NCDFSA registered.
          Please note that this is a marketing demonstration practice and does not actually see patients.
        </p>
      </div>
    </section>
  );
}