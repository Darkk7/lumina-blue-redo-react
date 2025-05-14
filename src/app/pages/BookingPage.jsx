"use client";

import React, { useState } from "react";
import { useSiteSettings } from "../context/SiteSettingsContext";

const BookingPage = () => {
  const { siteSettings } = useSiteSettings();
  const [formData, setFormData] = useState({
    appointmentType: "",
    name: "",
    email: "",
    mobile: "",
    comments: "",
    date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <section id="booking" className="section cta pt-0 pb-0">
      <div className="book flex flex-col lg:flex-row" style={{ minHeight: "681px" }}>
        <div className="map lg:w-1/2 relative">
        <iframe
  src={`https://maps.google.com/maps?q=${siteSettings.address_1}&output=embed`}
  width="100%"
  height="100%"
  style={{ border: 0 }}
  allowFullScreen
></iframe>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-6 bg-white shadow-md rounded">
              <h5 className="secondary-color text-gray-800">Physical Address</h5>
              <ul className="list-unstyled">
                <li className="text-gray-500">{siteSettings.address_1}</li>
              </ul>
              <h5 className="secondary-color text-gray-800">Trading Hours</h5>
              {console.log('Working Hours:', siteSettings.working_hours)}
              <ul className="list-unstyled">
                {siteSettings.working_hours.map((schedule, index) => {
                  const days = schedule.days;
                  let displayDays = '';

                  if (days.includes(0) && days.includes(1) && days.includes(2) && days.includes(3) && days.includes(4)) {
                    displayDays = 'Monday - Friday';
                  } else if (days.includes(5)) {
                    displayDays = 'Saturday';
                  } else if (days.includes(6)) {
                    displayDays = 'Sunday';
                  }
                  else if (days.includes(7)) {
                    displayDays = 'Public Holidays';
                  }

                  return (
                    <li key={index} className="text-gray-500">
                      {schedule.open ? `${displayDays}: ${schedule.start} - ${schedule.end}` : `${displayDays}: Closed`}
                    </li>
                  );
                })}
              </ul>
              <h5 className="secondary-color text-gray-800">Contact Details</h5>
              <ul className="list-unstyled">
                <li className="text-gray-500"> {siteSettings.tel} </li>
                <li className="text-gray-500"> {siteSettings.email} </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container lg:w-1/2 p-8">
          <h3 id="book_appointment" className="text-2xl mb-4 font-bold text-center text-gray-800">
            <span className="text-primary">Book</span> Your Appointment
          </h3>
          <form className="form bg-white rounded px-8 pt-6 pb-8 mb-4" id="booking_form" name="booking_form">
            <div className="mb-4">
              <select
                id="appt_type"
                name="appointmentType"
                value={formData.appointmentType}
                onChange={handleInputChange}
                className="form-control w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-500"
              >
                <option disabled value="" className="placeholder-gray-500">Select appointment type</option>
                <option value="consult" className="text-gray-800">Full examination</option>
                <option value="drivers" className="text-gray-800">Driver's screening</option>
              </select>
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-control w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-control w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="mobile"
                placeholder="Contact Number"
                value={formData.mobile}
                onChange={handleInputChange}
                className="form-control w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-500"
              />
            </div>
            <div className="mb-4">
              <textarea
                name="comments"
                placeholder="Additional Comments"
                value={formData.comments}
                onChange={handleInputChange}
                className="form-control w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-500"
                rows="4"
              ></textarea>
            </div>
            <div className="mb-4">
              <input
                type="date"
                name="date"
                placeholder="Select a date"
                value={formData.date}
                onChange={handleInputChange}
                className="form-control w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-500"
              />
            </div>
            <div className="text-right">
              <input
                id="booking_button"
                type="submit"
                className="btn btn--primary mr-2 p-2 bg-blue-500 text-white rounded"
                value="Book Appointment"
              />
              <input
                id="booking_call_me"
                type="button"
                className="btn btn--secondary p-2 bg-gray-500 text-white rounded"
                value="Request call"
              />
            </div>
          </form>
          <div className="box mt-8">
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingPage;