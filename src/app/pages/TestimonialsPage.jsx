"use client";

import Image from "next/image";
import { useEffect, useState } from 'react';

const TestimonialsPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      img: "/images/PiersThomson.png",
      text: "First time visit. Best eye test I've had since a kid.",
      name: "Piers Thomson",
    },
    {
      img: "/images/MariaGrobler.png",
      text: "Friendly staff and informative consultation.",
      name: "Maria Grobler",
    },
    {
      img: "/images/JohnOlivier.png",
      text: "I would not consider ever going anywhere else!",
      name: "John Olivier",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prevTestimonial) => 
        (prevTestimonial + 1) % testimonials.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="w-full bg-gray-100 py-16 text-center">
      <h2 className="text-4xl font-bold mb-8 text-black">Clients Reviews</h2>
      <p className="text-1xl mb-8 text-black">
        Some of the recent feedback from our customers. Please rate your experience with our practice online.
      </p>
      <div className="flex justify-center items-center gap-8">
        <div className="p-6 bg-white shadow rounded-lg w-96">
          <div className="flex justify-center mb-4">
            <Image
              src={testimonials[currentTestimonial].img}
              alt="Client"
              width={90}
              height={90}
              className="rounded-full"
            />
          </div>
          <p className="text-gray-600 italic">
            "{testimonials[currentTestimonial].text}"
          </p>
          <p className="text-black mt-4 font-semibold">
            {testimonials[currentTestimonial].name}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsPage;
