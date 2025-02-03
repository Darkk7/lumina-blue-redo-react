import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import Link from "next/link";

//My testing purposes
const mockData = {
  A018: {
    bannerImage: "https://example.com/banner-a018.png",
    primaryColor: "#FF5733",
    secondaryColor: "#33FF57",
    welcomeText: "Welcome to A018's Practice!",
    buttonText: "Book Now",
  },
  TOM001: {
    bannerImage: "https://example.com/banner-tom001.png",
    primaryColor: "#0000FF",
    secondaryColor: "#FFC300",
    welcomeText: "Welcome to TOM001's Practice!",
    buttonText: "Schedule Appointment",
  },
  R003: {
    bannerImage: "https://example.com/banner-r003.png",
    primaryColor: "#900C3F",
    secondaryColor: "#DAF7A6",
    welcomeText: "Welcome to R003's Practice!",
    buttonText: "Reserve Your Spot",
  },
  R004: {
    bannerImage: "https://example.com/banner-r004.png",
    primaryColor: "#581845",
    secondaryColor: "#FF5733",
    welcomeText: "Welcome to R004's Practice!",
    buttonText: "Get Started",
  },
};

export default function HomePage({ customerCode }) {
  const [customerData, setCustomerData] = useState({
    bannerImage: "https://s3.eu-west-2.amazonaws.com/luminablue-blogs/1721909136_67_banner.png",
    secondaryColor: "#e58825",
    welcomeText: "Serving the community for over 80 years delivering the highest quality care and products for our customers",
    buttonText: "Make A Booking",
  });
  const [currentTeamMember, setCurrentTeamMember] = useState(0);
  const [teamTitle, setTeamTitle] = useState('');
  const [teamDescription, setTeamDescription] = useState('');

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = mockData[customerCode];
        if (data) {
          setCustomerData(data);
        } else {
          console.error("Customer code not found in mock data");
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    if (customerCode) {
      fetchCustomerData();
    }
  }, [customerCode]);

  useEffect(() => {
    setTeamTitle('Meet Our Vibrant Team');
  });

  useEffect(() => {
    setTeamDescription('We like to think we have have something pretty special here at Image Eyecare Optometry - an energetic team, committed to patient care, customer experience and doing good work.');
  });

  const teamMembers = [
    { img: "/images/DrYonelaDube.png", name: "Dr Yonela Dube", role: "Paediatric Optometrist" },
    { img: "/images/JillWalker.png", name: "Jill Walker", role: "Practice Manager" },
    { img: "/images/MorneDuPlessis.png", name: "Morne Du Plessis", role: "Optical Dispenser" },
  ];

  const nextMember = () => {
    setCurrentTeamMember((prevIndex) => (prevIndex + 1) % teamMembers.length);
  };

  const prevMember = () => {
    setCurrentTeamMember(
      (prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length
    );
  };

  return (
    <div>
      {/* Home Page Section */}
      <div
        className="w-full h-[600px] bg-cover bg-center text-center text-white"
        style={{
          backgroundImage: `url(${customerData.bannerImage})`,
        }}
      >
        <div
          className="bg-black bg-opacity-50 h-full flex flex-col items-center justify-center p-4"
          style={{
            backgroundColor: customerData.primaryColor,
          }}
        >
          <p className="text-3xl mb-8">{customerData.welcomeText}</p>
          <button
            className="px-6 py-3 text-white font-semibold rounded-lg hover:bg-white hover:text-primary hover:border-orange-500 border-1 transition"
            style={{
              backgroundColor: customerData.secondaryColor,
            }}
          >
            <Link href="/#booking">{customerData.buttonText} </Link>
          </button>
        </div>
      </div>

      {/* Counter Section */}
      <section className="w-full bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto text-center px-4 md:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Counter Content */}
            <Counter
              image="/images/GlassesInCase.svg"
              count="821"
              label="Number of brands"
            />
            <Counter
              image="/images/Specs.svg"
              count="1550"
              label="Frame stock"
            />
            <Counter
              image="/images/Suns.svg"
              count="780"
              label="Sunglasses stock"
            />
            <Counter
              image="/images/Established.svg"
              count="1957"
              label="Year (trading since)"
            />
          </div>
        </div>
      </section>
      
      <AboutSection />
      
      <ConnectWithUs />

      <Team teamTitle={teamTitle} teamDescription={teamDescription} teamMembers={teamMembers} />
      
      <Services />

      <Testimonials />

      <Brands />

      <Bookings />

    </div>
  );
}

const Counter = ({ image, count, label }) => (
  <div className="flex flex-col items-center">
    <div className="flex items-center justify-center h-20">
      <Image src={image} alt={label} width={50} height={50} className="mb-4" />
    </div>
    <p className="text-4xl font-bold text-primary">{count}</p>
    <p className="text-md text-black">
      <i>{label}</i>
    </p>
  </div>
);

const AboutSection = () => (
  <section
    id="about"
    className="w-full bg-white text-center flex flex-col lg:flex-row items-center lg:items-stretch"
  >
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
        Established in 1957, Image Eyecare is a third generation optometry
        practice serving the Port Elizabeth community for over 60 years. The
        practice Owner, Dr. Paul Ketz, is a pioneer in software research and
        development and has become recognized as an authority and clinical
        adviser to suppliers and many eye care professionals internationally.
        <br />
        <br />
        The practice ethos of professionalism and care has improved the quality
        of life for many patients and all staff are NCDFSA registered. Please
        note that this is a marketing demonstration practice and does not
        actually see patients.
      </p>
    </div>
  </section>
);

const ConnectWithUs = () => (
  <section className="relative w-full bg-cover bg-center py-16 text-center" style={{ backgroundImage: "url('/images/FramesBG.png')" }}>
    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
    <h2 className="text-4xl font-bold mb-8 text-white relative z-10">Connect With Us</h2>
    <p className="text-1xl mb-8 text-white relative z-10">
      Follow us on Facebook, Instagram, and LinkedIn to stay updated with our
      latest news and offerings.
    </p>
    <div className="flex justify-center gap-8 relative z-10">
      <SocialLink
        href="https://facebook.com"
        icon={<FaFacebook />}
        label="Facebook"
      />
      <SocialLink
        href="https://instagram.com"
        icon={<FaInstagram />}
        label="Instagram"
      />
      <SocialLink
        href="https://linkedin.com"
        icon={<FaLinkedin />}
        label="LinkedIn"
      />
    </div>
  </section>
);

const Team = ({ teamTitle, teamDescription, teamMembers }) => (

  
  <div className="w-full bg-gray-50 py-12">
  <div className="container mx-auto px-6">
    <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
      {teamTitle}
    </h1>
    <p className="text-1xl text-center text-gray-800 mb-8"> {teamDescription} </p>
    <div className="flex justify-center gap-8">
      {teamMembers.map((member, index) => (
        <div key={index} className="bg-white shadow-lg p-6 rounded-lg text-center w-64">
          <img
            src={member.img}
            alt={member.name}
            className="w-41 h-41 rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-semibold text-primary mb-2">
            {member.name}
          </h2>
          <h3 className="text-lg font-medium text-gray-600 mb-4">
            {member.role}
          </h3>
        </div>
      ))}
    </div>        
  </div>
</div>
);

const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Visit our ${label} page`}
    className="text-4xl text-primary hover:text-primary transition"
  >
    {icon}
  </a>
);

const Services = () => (
  <section id="services" className="w-full bg-white py-12">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Our Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ServiceCard
          title="Comprehensive Eye Exams"
          description="We provide a range of eye examinations. Having your eyes tested regularly can also result in early detection of a serious health risk. Our aim is to make clear and comfortable vision a reality for all our patients based on each patient’s needs"
        />
        <ServiceCard
          title="Visual Acuity Tests"
          description="This test is used to measure the sharpness and clarity of your vision. Testing both your near and distance vision using eye charts and different lenses we can determine how to improve your vision."
        />
        <ServiceCard
          title="Frame Selection And Assistance"
          description="Frames are more than just corrective eyewear; they become part of your daily appurtenance. Our team are here to help choose the perfect frame to meet your needs and preferences"
        />
        <ServiceCard
          title="Contact Lens Consultation"
          description="Starting with an eye health assessment we can determine if you are able to wear Contact Lenses. Once you are cleared you are fitted and the particular types of lenses are discussed to determine the best option for your lifestyle."
        />
        <ServiceCard
          title="Frame and Spectacle Adjustments and Repairs"
          description="From time to time you may want your Frames adjusted or repaired. Our skilled opticians can adjust the bridge, nose pads and temples to ensure the proper fit to your face."
        />
        <ServiceCard
          title="Frame Sales"
          description="We have a wide range or frames from a variety of brands to choose from. These frames can be fitted with lenses to meet all your needs such as, indoor use, outdoor use, ready, driving and more."
        />
      </div>
    </div>
  </section>
);

const ServiceCard = ({ title, description }) => (
  <div className="bg-white shadow-lg p-6 rounded-lg">
    <h3 className="text-2xl font-semibold text-primary mb-4">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Testimonials = () => (
  <section id="testimonials" className="w-full bg-gray-100 py-16 text-center">
    <h2 className="text-4xl font-bold mb-8 text-black">Clients Reviews</h2>
    <p className="text-1xl mb-8 text-black">
      Some of the recent feedback from our customers.
    </p>
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      navigation
      loop
      autoplay={{
        delay: 5000,
        disableOnInteraction: true,
      }}
      className="flex justify-center items-center"
    >
      <SwiperSlide>
        <div className="p-6 bg-white shadow-lg rounded-lg w-80 mx-auto">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/PiersThomson.png"
              alt="Piers Thomson"
              width={90}
              height={90}
              className="rounded-full"
            />
          </div>
          <p className="text-gray-600 italic">
            "First time visit. Best eye test I've had since a kid."
          </p>
          <p className="text-black mt-4 font-semibold">Piers Thomson</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="p-6 bg-white shadow-lg rounded-lg w-80 mx-auto">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/MariaGrobler.png"
              alt="Maria Grobler"
              width={90}
              height={90}
              className="rounded-full"
            />
          </div>
          <p className="text-gray-600 italic">
            "Friendly staff and informative consultation."
          </p>
          <p className="text-black mt-4 font-semibold">Maria Grobler</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="p-6 bg-white shadow-lg rounded-lg w-80 mx-auto">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/JohnOlivier.png"
              alt="John Olivier"
              width={90}
              height={90}
              className="rounded-full"
            />
          </div>
          <p className="text-gray-600 italic">
            "I would not consider ever going anywhere else!"
          </p>
          <p className="text-black mt-4 font-semibold">John Olivier</p>
        </div>
      </SwiperSlide>
    </Swiper>   
  </section>
);

const Brands = () => (
  <section id="brands" className="w-full bg-white py-16 text-center">   
    <div className="max-w-6xl mx-auto px-4 md:px-0">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
        <div className="flex justify-center items-center">
          <Image
            src="/images/OakleyEyewear.png"
            alt="Oakley"
            width={200}
            height={200}
          />
        </div>
        <div className="flex justify-center items-center">
          <Image
            src="/images/CooperVisionBrand.png"
            alt="CooperVision"
            width={200}
            height={200}
          />
        </div>
        <div className="flex justify-center items-center">
          <Image
            src="/images/NikeEyewear.png"
            alt="Nike"
            width={200}
            height={200}
          />
        </div>
        <div className="flex justify-center items-center">
          <Image
            src="/images/PoliceEyewear.png"
            alt="Police"
            width={200}
            height={200}
          />
        </div>
        <div className="flex justify-center items-center">
          <Image
            src="/images/HoyaBrand.png"
            alt="Hoya"
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  </section>
);


const Bookings = () => (
  <section id="booking" className="w-full py-16 bg-white">
    <h2 className="text-4xl font-bold mb-8 text-black text-center">Book an Appointment</h2>
    <div className="max-w-6xl mx-auto px-4 md:px-0 flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2">
        <div className="relative">
          <iframe
            src="https://maps.google.com/maps?q=190+Circular+Drive,+Lorraine,+Port+Elizabeth&output=embed"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
          ></iframe>
          <div className="absolute bottom-4 left-4 bg-white p-4 shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold text-black">Our Location</h3>
            <p className="text-sm text-gray-600">190 Circular Drive, Lorraine</p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-center text-black">
        <form className="w-full max-w-md space-y-6">
          <select
            type="text"
            placeholder="Select Appointment Type"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select Appointment Type</option>
            <option value="eye-exam">Full Examination</option>
            <option value="contact-lenses">Driver's Screening</option>
          </select>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="w-full">
            <PhoneInput
              country={'za'}
              inputClass="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              containerClass="w-full"
              buttonClass="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <textarea
            placeholder="Additional Comments"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
          <input
            type="date"
            placeholder="Select Appointment Date"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <h2 className="mt-4 text-lg font-semibold">Select Available Time</h2>

          <div className="mt-2">
            <label htmlFor="appointment-time" className="sr-only">Select Time</label>
            <select
              id="appointment-time"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">-- Select Time --</option>
              <option value="09:00 AM">09:00</option>
              <option value="09:30 AM">09:30</option>
              <option value="10:00 AM">10:00</option>
              <option value="10:30 AM">10:30</option>
              <option value="11:00 AM">11:00</option>
              <option value="11:30 AM">11:30</option>
              <option value="12:00 PM">12:00</option>
              <option value="12:30 PM">12:30</option>
              <option value="01:00 PM">13:00</option>
              <option value="01:30 PM">13:30</option>
              <option value="02:00 PM">14:00</option>
              <option value="02:30 PM">14:30</option>
              <option value="03:00 PM">15:00</option>
              <option value="03:30 PM">15:30</option>
              <option value="04:00 PM">16:00</option>
              <option value="04:30 PM">16:30</option>                  
            </select>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-lg hover:bg-gray-600 transition"
            >
              Book Appointment
            </button>
            <button
              type="submit"
              className="w-full py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Request a Call
            </button>
            <Link href="/pages/settings"> Settings </Link>
          </div>
        </form>
      </div>

      {/* Practice Details Card */}
      <div className="w-full md:w-1/2 mt-8 md:mt-0">
        <div className="bg-white p-4 shadow-lg rounded-lg min-h-[450px] flex flex-col justify-center">
          <p className="text-base mt-2 text-gray-600"><strong className="text-primary">Physical Address</strong> <br /> <br /> 190 Circular Drive, Lorraine, Port Elizabeth</p>
          <p className="text-base text-gray-600"><strong className="text-primary"> <br /> Trading Hours  </strong></p>          
          <p className="text-gray-600">
          <br /> Monday - Friday: 9:00 AM - 6:00 PM <br/>
            Saturday: 9:00 AM - 1:00 PM <br/>
            Sunday: Closed <br />
          <br />
          </p>
          <p className="text-base text-gray-600 mt-2"><strong className="text-primary">Contact Details <br /></strong></p>
          <p className="text-base text-gray-600"> <br />  041 880 0051 </p>
          <p className="text-base text-gray-600"> info@imageeyecareoptometrists.com</p>
        </div>
      </div>

      

    </div>
  </section>
);


const FooterPage = () => (
  <footer className="w-full py-8 bg-white">
    <div className="flex justify-between items-center max-w-6xl mx-auto">
      
      <div className="text-blue-500">
        <a href="#privacy" className="hover:text-primary mx-2">Privacy</a> |
        <a href="#paia" className="hover:text-primary mx-2">PAIA</a> |
        <a href="#blogs" className="hover:text-primary mx-2">Blogs</a>
      </div>

      <div className="text-blue-500 text-md">
        © {new Date().getFullYear()}. All Rights Reserved.
      </div>

      <div className="flex gap-4">
        <a
          href="https://www.facebook.com/profile.php?id=100076291605685"
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl text-primary hover:text-primary transition"
        >
          <FaFacebook />
        </a>
        <a
          href="https://www.instagram.com/nevada_cloud/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl text-primary hover:text-primary transition"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.linkedin.com/company/nevada-cloud/posts/?feedView=all"
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl text-primary hover:text-primary transition"
        >
          <FaLinkedin />
        </a>
      </div>
    </div>
  </footer>
);